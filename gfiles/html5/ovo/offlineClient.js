"use strict";

(function() {
	
	class OfflineClient
	{
		constructor()
		{
			// Create a BroadcastChannel, if supported.
			this._broadcastChannel = (typeof BroadcastChannel === "undefined" ? null : new BroadcastChannel("offline"));
			
			// Queue of messages received before a message callback is set.
			this._queuedMessages = [];
			
			// The message callback.
			this._onMessageCallback = null;
			
			// If BroadcastChannel is supported, listen for messages.
			if (this._broadcastChannel)
				this._broadcastChannel.onmessage = (e => this._OnBroadcastChannelMessage(e));
		}
		
		_OnBroadcastChannelMessage(e)
		{
			// Have a message callback set: just forward the call.
			if (this._onMessageCallback)
			{
				this._onMessageCallback(e);
				return;
			}
			
			// Otherwise the app hasn't loaded far enough to set a message callback.
			// Buffer the incoming messages to replay when the app sets a callback.
			this._queuedMessages.push(e);
		}
		
		SetMessageCallback(f)
		{
			this._onMessageCallback = f;
			
			// Replay any queued messages through the handler, then clear the queue.
			for (let e of this._queuedMessages)
				this._onMessageCallback(e);
			
			this._queuedMessages.length = 0;
		}
	};
	
	// Create the offline client ASAP so we receive and start queueing any messages the SW broadcasts.
	window.OfflineClientInfo = new OfflineClient();
	
}());

