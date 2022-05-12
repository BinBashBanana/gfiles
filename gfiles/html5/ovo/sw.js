"use strict";

const OFFLINE_DATA_FILE = "offline.js";
const CACHE_NAME_PREFIX = "c2offline";
const BROADCASTCHANNEL_NAME = "offline";
const CONSOLE_PREFIX = "[SW] ";
const LAZYLOAD_KEYNAME = "";

// Create a BroadcastChannel if supported.
const broadcastChannel = (typeof BroadcastChannel === "undefined" ? null : new BroadcastChannel(BROADCASTCHANNEL_NAME));

//////////////////////////////////////
// Utility methods
function PostBroadcastMessage(o)
{
	if (!broadcastChannel)
		return;		// not supported
	
	// Impose artificial (and arbitrary!) delay of 3 seconds to make sure client is listening by the time the message is sent.
	// Note we could remove the delay on some messages, but then we create a race condition where sometimes messages can arrive
	// in the wrong order (e.g. "update ready" arrives before "started downloading update"). So to keep the consistent ordering,
	// delay all messages by the same amount.
	setTimeout(() => broadcastChannel.postMessage(o), 3000);
};

function Broadcast(type)
{
	PostBroadcastMessage({
		"type": type
	});
};

function BroadcastDownloadingUpdate(version)
{
	PostBroadcastMessage({
		"type": "downloading-update",
		"version": version
	});
}

function BroadcastUpdateReady(version)
{
	PostBroadcastMessage({
		"type": "update-ready",
		"version": version
	});
}

function IsUrlInLazyLoadList(url, lazyLoadList)
{
	if (!lazyLoadList)
		return false;		// presumably lazy load list failed to load
	
	try {
		for (const lazyLoadRegex of lazyLoadList)
		{
			if (new RegExp(lazyLoadRegex).test(url))
				return true;
		}
	}
	catch (err)
	{
		console.error(CONSOLE_PREFIX + "Error matching in lazy-load list: ", err);
	}
	
	return false;
};

function WriteLazyLoadListToStorage(lazyLoadList)
{
	if (typeof localforage === "undefined")
		return Promise.resolve();		// bypass if localforage not imported
	else
		return localforage.setItem(LAZYLOAD_KEYNAME, lazyLoadList)
};

function ReadLazyLoadListFromStorage()
{
	if (typeof localforage === "undefined")
		return Promise.resolve([]);		// bypass if localforage not imported
	else
		return localforage.getItem(LAZYLOAD_KEYNAME);
};

function GetCacheBaseName()
{
	// Include the scope to avoid name collisions with any other SWs on the same origin.
	// e.g. "c2offline-https://example.com/foo/" (won't collide with anything under bar/)
	return CACHE_NAME_PREFIX + "-" + self.registration.scope;
};

function GetCacheVersionName(version)
{
	// Append the version number to the cache name.
	// e.g. "c2offline-https://example.com/foo/-v2"
	return GetCacheBaseName() + "-v" + version;
};

// Return caches.keys() filtered down to just caches we're interested in (with the right base name).
// This filters out caches from unrelated scopes.
async function GetAvailableCacheNames()
{
	const cacheNames = await caches.keys();
	const cacheBaseName = GetCacheBaseName();
	return cacheNames.filter(n => n.startsWith(cacheBaseName));
};

// Identify if an update is pending, which is the case when we have 2 or more available caches.
// One must be an update that is waiting, since the next navigate that does an upgrade will
// delete all the old caches leaving just one currently-in-use cache.
async function IsUpdatePending()
{
	const availableCacheNames = await GetAvailableCacheNames();
	return (availableCacheNames.length >= 2);
};

// Automatically deduce the main page URL (e.g. index.html or main.aspx) from the available browser windows.
// This prevents having to hard-code an index page in the file list, implicitly caching it like AppCache did.
async function GetMainPageUrl()
{
	const allClients = await clients.matchAll({
		includeUncontrolled: true,
		type: "window"
	});
	
	for (const c of allClients)
	{
		// Parse off the scope from the full client URL, e.g. https://example.com/index.html -> index.html
		let url = c.url;
		if (url.startsWith(self.registration.scope))
			url = url.substring(self.registration.scope.length);
		
		if (url && url !== "/")		// ./ is also implicitly cached so don't bother returning that
		{
			// If the URL is solely a search string, prefix it with / to ensure it caches correctly.
			// e.g. https://example.com/?foo=bar needs to cache as /?foo=bar, not just ?foo=bar.
			if (url.startsWith("?"))
				url = "/" + url;
			
			return url;
		}
	}
	
	return "";		// no main page URL could be identified
};

// Hack to fetch optionally bypassing HTTP cache until fetch cache options are supported in Chrome (crbug.com/453190)
function fetchWithBypass(request, bypassCache)
{
	if (typeof request === "string")
		request = new Request(request);
	
	if (bypassCache)
	{
		// bypass enabled: add a random search parameter to avoid getting a stale HTTP cache result
		const url = new URL(request.url);
		url.search += Math.floor(Math.random() * 1000000);

		return fetch(url, {
			headers: request.headers,
			mode: request.mode,
			credentials: request.credentials,
			redirect: request.redirect,
			cache: "no-store"
		});
	}
	else
	{
		// bypass disabled: perform normal fetch which is allowed to return from HTTP cache
		return fetch(request);
	}
};

// Effectively a cache.addAll() that only creates the cache on all requests being successful (as a weak attempt at making it atomic)
// and can optionally cache-bypass with fetchWithBypass in every request
async function CreateCacheFromFileList(cacheName, fileList, bypassCache)
{
	// Kick off all requests and wait for them all to complete
	const responses = await Promise.all(fileList.map(url => fetchWithBypass(url, bypassCache)));
	
	// Check if any request failed. If so don't move on to opening the cache.
	// This makes sure we only open a cache if all requests succeeded.
	let allOk = true;
	
	for (const response of responses)
	{
		if (!response.ok)
		{
			allOk = false;
			console.error(CONSOLE_PREFIX + "Error fetching '" + response.url + "' (" + response.status + " " + response.statusText + ")");
		}
	}
	
	if (!allOk)
		throw new Error("not all resources were fetched successfully");
	
	// Can now assume all responses are OK. Open a cache and write all responses there.
	// TODO: ideally we can do this transactionally to ensure a complete cache is written as one atomic operation.
	// This needs either new transactional features in the spec, or at the very least a way to rename a cache
	// (so we can write to a temporary name that won't be returned by GetAvailableCacheNames() and then rename it when ready).
	const cache = await caches.open(cacheName);
	
	try {
		return await Promise.all(responses.map(
			(response, i) => cache.put(fileList[i], response)
		));
	}
	catch (err)
	{
		// Not sure why cache.put() would fail (maybe if storage quota exceeded?) but in case it does,
		// clean up the cache to try to avoid leaving behind an incomplete cache.
		console.error(CONSOLE_PREFIX + "Error writing cache entries: ", err);
		caches.delete(cacheName);
		throw err;
	}
};

async function UpdateCheck(isFirst)
{
	try {
		// Always bypass cache when requesting offline.js to make sure we find out about new versions.
		const response = await fetchWithBypass(OFFLINE_DATA_FILE, true);
		
		if (!response.ok)
			throw new Error(OFFLINE_DATA_FILE + " responded with " + response.status + " " + response.statusText);
			
		const data = await response.json();
		
		const version = data.version;
		const fileList = data.fileList;
		const lazyLoadList = data.lazyLoad;
		const currentCacheName = GetCacheVersionName(version);
		
		const cacheExists = await caches.has(currentCacheName);

		// Don't recache if there is already a cache that exists for this version. Assume it is complete.
		if (cacheExists)
		{
			// Log whether we are up-to-date or pending an update.
			const isUpdatePending = await IsUpdatePending();
			if (isUpdatePending)
			{
				console.log(CONSOLE_PREFIX + "Update pending");
				Broadcast("update-pending");
			}
			else
			{
				console.log(CONSOLE_PREFIX + "Up to date");
				Broadcast("up-to-date");
			}
			return;
		}
		
		// Implicitly add the main page URL to the file list, e.g. "index.html", so we don't have to assume a specific name.
		const mainPageUrl = await GetMainPageUrl();
		
		// Prepend the main page URL to the file list if we found one and it is not already in the list.
		// Also make sure we request the base / which should serve the main page.
		fileList.unshift("./");
		
		if (mainPageUrl && fileList.indexOf(mainPageUrl) === -1)
			fileList.unshift(mainPageUrl);
		
		console.log(CONSOLE_PREFIX + "Caching " + fileList.length + " files for offline use");
		
		if (isFirst)
			Broadcast("downloading");
		else
			BroadcastDownloadingUpdate(version);
		
		// Note we don't bypass the cache on the first update check. This is because SW installation and the following
		// update check caching will race with the normal page load requests. For any normal loading fetches that have already
		// completed or are in-flight, it is pointless and wasteful to cache-bust the request for offline caching, since that
		// forces a second network request to be issued when a response from the browser HTTP cache would be fine.
		if (lazyLoadList)
			await WriteLazyLoadListToStorage(lazyLoadList);							// dump lazy load list to local storage#
		
		await CreateCacheFromFileList(currentCacheName, fileList, !isFirst);
		const isUpdatePending = await IsUpdatePending();
		
		if (isUpdatePending)
		{
			console.log(CONSOLE_PREFIX + "All resources saved, update ready");
			BroadcastUpdateReady(version);
		}
		else
		{
			console.log(CONSOLE_PREFIX + "All resources saved, offline support ready");
			Broadcast("offline-ready");
		}
	}
	catch (err)
	{
		// Update check fetches fail when we're offline, but in case there's any other kind of problem with it, log a warning.
		console.warn(CONSOLE_PREFIX + "Update check failed: ", err);
	}
};

self.addEventListener("install", event =>
{
	// On install kick off an update check to cache files on first use.
	// If it fails we can still complete the install event and leave the SW running, we'll just
	// retry on the next navigate.
	event.waitUntil(
		UpdateCheck(true)		// first update
		.catch(() => null)
	);
});

async function GetCacheNameToUse(availableCacheNames, doUpdateCheck)
{
	// Prefer the oldest cache available. This avoids mixed-version responses by ensuring that if a new cache
	// is created and filled due to an update check while the page is running, we keep returning resources
	// from the original (oldest) cache only.
	if (availableCacheNames.length === 1 || !doUpdateCheck)
		return availableCacheNames[0];
	
	// We are making a navigate request with more than one cache available. Check if we can expire any old ones.
	const allClients = await clients.matchAll();
	
	// If there are other clients open, don't expire anything yet. We don't want to delete any caches they
	// might be using, which could cause mixed-version responses.
	if (allClients.length > 1)
		return availableCacheNames[0];
	
	// Identify newest cache to use. Delete all the others.
	const latestCacheName = availableCacheNames[availableCacheNames.length - 1];
	console.log(CONSOLE_PREFIX + "Updating to new version");
	
	await Promise.all(
		availableCacheNames.slice(0, -1)
		.map(c => caches.delete(c))
	);
	
	return latestCacheName;
};

async function HandleFetch(event, doUpdateCheck)
{
	const availableCacheNames = await GetAvailableCacheNames();
	
	// No caches available: go to network
	if (!availableCacheNames.length)
		return fetch(event.request);
	
	const useCacheName = await GetCacheNameToUse(availableCacheNames, doUpdateCheck);
	const cache = await caches.open(useCacheName);
	const cachedResponse = await cache.match(event.request);
	
	if (cachedResponse)
		return cachedResponse;		// use cached response
	
	// We need to check if this request is to be lazy-cached. Send the request and load the lazy-load list
	// from storage simultaneously.
	const result = await Promise.all([fetch(event.request), ReadLazyLoadListFromStorage()]);
	const fetchResponse = result[0];
	const lazyLoadList = result[1];
	
	if (IsUrlInLazyLoadList(event.request.url, lazyLoadList))
	{
		// Handle failure writing to the cache. This can happen if the storage quota is exceeded, which is particularly
		// likely in Safari 11.1, which appears to have very tight storage limits. Make sure even in the event of an error
		// we continue to return the response from the fetch.
		try {
			// Note clone response since we also respond with it
			await cache.put(event.request, fetchResponse.clone());
		}
		catch (err)
		{
			console.warn(CONSOLE_PREFIX + "Error caching '" + event.request.url + "': ", err);
		}
	}
		
	return fetchResponse;
};

self.addEventListener("fetch", event =>
{
	/** NOTE (iain)
	 *  This check is to prevent a bug with XMLHttpRequest where if its
	 *  proxied with "FetchEvent.prototype.respondWith" no upload progress
	 *  events are triggered. By returning we allow the default action to
	 *  occur instead. Currently all cross-origin requests fall back to default.
	 */
	if (new URL(event.request.url).origin !== location.origin)
		return;
		
	// Check for an update on navigate requests
	const doUpdateCheck = (event.request.mode === "navigate");
	
	const responsePromise = HandleFetch(event, doUpdateCheck);

	if (doUpdateCheck)
	{
		// allow the main request to complete, then check for updates
		event.waitUntil(
			responsePromise
			.then(() => UpdateCheck(false))		 // not first check
		);
	}

	event.respondWith(responsePromise);
});