globalThis.WebSdkWrapper = (function () {
  function addScript(src, id, onload) {
    if (document.getElementById(id)) return;
    let fjs = document.getElementsByTagName("script")[0];
    let js = document.createElement("script");
    js.id = id;
    fjs.parentNode.insertBefore(js, fjs);
    js.onload = onload;
    js.src = src;
  }

  window.addEventListener("keydown", (ev) => {
    if (["ArrowDown", "ArrowUp", " "].includes(ev.key)) {
      ev.preventDefault();
    }
  });
  window.addEventListener("wheel", (ev) => ev.preventDefault(), {
    passive: false,
  });

  /*
  ==============  EVENT DISPATCHER  =================
  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  */
  const events = {};

  function listen(event, fn, { once = false } = {}) {
    events[event] = events[event] || [];
    events[event].push({
      fn,
      once,
    });
  }

  function listenOnce(event, fn) {
    listen(event, fn, { once: true });
  }

  function dispatch(event, ...data) {
    (events[event] || []).forEach((fnObj) => {
      fnObj.fn(...data);
    });
    events[event] = (events[event] || []).filter((fnObj) => !fnObj.once);
  }
  /*
  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  ==============  EVENT DISPATCHER  =================
  */
  let sdk;
  const sdkContext = {};
  let supportedNetworks = [
    {
      name: "Poki",
      get sdk() {
        return globalThis.PokiSDK;
      },
      scriptSrc: "//game-cdn.poki.com/scripts/v2/poki-sdk.js",
      hasAds: true,
      hasBanner: false,
      enableOnlyInProduction: false,
      implementation: {
        //async preInit(debug = false) {},
        init(debug = false) {
          return new Promise((resolve) => {
            sdk
              .init()
              .then(() => {
                sdkContext.hasAdblock = false;
                resolve();
              })
              .catch(() => {
                sdkContext.hasAdblock = true;
                resolve();
              });
            sdk.setDebug(debug);
          });
        },
        setUpEventListeners() {
          listen("loadingStart", () => {
            sdk.gameLoadingStart();
          });
          listen("loadingEnd", () => {
            sdk.gameLoadingFinished();
          });
          listen("gameplayStart", () => {
            if (sdkContext.gameplayStarted) return;
            sdkContext.gameplayStarted = true;
            sdk.gameplayStart();
          });
          listen("gameplayStop", () => {
            if (!sdkContext.gameplayStarted) return;
            sdkContext.gameplayStarted = false;
            sdk.gameplayStop();
          });
          listen("interstitial", () => {
            dispatch("adStarted", sdkContext.lastRequestedAd);
            sdk.commercialBreak().then(() => {
              dispatch("interstitialEnd", true);
            });
          });
          listen("rewarded", () => {
            dispatch("adStarted", sdkContext.lastRequestedAd);
            sdk.rewardedBreak().then((success) => {
              dispatch("rewardedEnd", success);
            });
          });
          listen("happyTime", (scale) => {
            sdk.happyTime(scale);
          });
        },
        hasAdblock() {
          return !!sdkContext.hasAdblock;
        },
      },
    },
    {
      name: "CrazyGames",
      get sdk() {
        if (!sdkContext.crazysdk)
          sdkContext.crazysdk = globalThis?.CrazyGames?.CrazySDK?.getInstance();
        return sdkContext.crazysdk;
      },
      scriptSrc: "//sdk.crazygames.com/crazygames-sdk-v1.js",
      hasAds: true,
      enableOnlyInProduction: false,
      hasBanner: true,
      implementation: {
        //async preInit(debug = false) {},
        init() {
          return new Promise((resolve) => {
            sdk.addEventListener("adblockDetectionExecuted", (event) => {
              sdkContext.hasAdblock = event.hasAdblock;
              resolve();
            });
            sdk.init();
          });
        },
        setUpEventListeners() {
          sdk.addEventListener("adStarted", () => {
            dispatch("adStarted", sdkContext.lastRequestedAd);
          });
          sdk.addEventListener("adFinished", () => {
            if (sdkContext.lastRequestedAd === "interstitial")
              dispatch("interstitialEnd", true);
            else dispatch("rewardedEnd", true);
          });
          sdk.addEventListener("adFinished", () => {
            if (sdkContext.lastRequestedAd === "interstitial")
              dispatch("interstitialEnd", true);
            else dispatch("rewardedEnd", true);
          });
          sdk.addEventListener("adError", () => {
            if (sdkContext.lastRequestedAd === "interstitial")
              dispatch("interstitialEnd", false);
            else dispatch("rewardedEnd", false);
          });
          listen("gameplayStart", () => {
            if (sdkContext.gameplayStarted) return;
            sdkContext.gameplayStarted = true;
            sdk.gameplayStart();
          });
          listen("gameplayStop", () => {
            if (!sdkContext.gameplayStarted) return;
            sdkContext.gameplayStarted = false;
            sdk.gameplayStop();
          });
          listen("interstitial", () => {
            sdkContext.lastRequestedAd = "interstitial";
            sdk.requestAd("midgame");
          });
          listen("rewarded", () => {
            sdkContext.lastRequestedAd = "rewarded";
            sdk.requestAd("rewarded");
          });
          listen("happyTime", () => {
            sdk.happytime();
          });
          listen("banner", (data) => {
            sdk.requestBanner(data);
          });
        },
        hasAdblock() {
          return !!sdkContext.hasAdblock;
        },
      },
    },
    {
      name: "GamePix",
      get sdk() {
        return globalThis.GamePix;
      },
      scriptSrc: "//integration.gamepix.com/sdk/v3/gamepix.sdk.js",
      hasAds: true,
      enableOnlyInProduction: true,
      hasBanner: false,
      implementation: {
        //async preInit(debug = false) {},
        //init() {},
        setUpEventListeners() {
          listen("loadingProgress", (progress) => {
            sdk.loading(progress);
          });
          listen("loadingEnd", () => {
            sdk.loaded();
          });
          sdk.pause = () => {
            dispatch("pause");
          };
          sdk.resume = () => {
            dispatch("resume");
          };
          listen("levelStart", (level) => {
            sdk.updateLevel(level);
          });
          listen("score", (score) => {
            sdk.updateScore(score);
          });
          listen("interstitial", () => {
            dispatch("adStarted", sdkContext.lastRequestedAd);
            sdk.interstitialAd().then(() => {
              dispatch("interstitialEnd", true);
            });
          });
          listen("rewarded", () => {
            dispatch("adStarted", sdkContext.lastRequestedAd);
            sdk.rewardAd().then((res) => {
              dispatch("rewardedEnd", res.success);
            });
          });
          listen("happyTime", () => {
            sdk.happyMoment();
          });
        },
        hasAdblock() {
          return false;
        },
      },
    },
    {
      name: "GameDistribution",
      get sdk() {
        return globalThis.gdsdk;
      },
      scriptSrc: "//html5.api.gamedistribution.com/main.min.js",
      hasAds: true,
      enableOnlyInProduction: true,
      hasBanner: false,
      implementation: {
        async preInit(debug = false, data) {
          sdkContext.errors = 0;
          window["GD_OPTIONS"] = {
            gameId: data.gameId,
            debug,
            testing: debug,
            onEvent: function (event) {
              switch (event.name) {
                case "SDK_GAME_START":
                  sdkContext.errors = 0;
                  // if (sdkContext.lastRequestedAd === "interstitial")
                  //   dispatch("interstitialEnd", true);
                  // else dispatch("rewardedEnd", true);
                  break;
                case "SDK_GAME_PAUSE":
                  dispatch("pause");
                  break;
                case "SDK_GDPR_TRACKING":
                  // this event is triggered when your user doesn't want to be tracked
                  break;
                case "SDK_GDPR_TARGETING":
                  // this event is triggered when your user doesn't want personalised targeting of ads and such
                  break;
                case "AD_ERROR":
                  sdkContext.errors += 1;
                  // if (sdkContext.errors >= 2) {
                  //   if (sdkContext.lastRequestedAd === "interstitial")
                  //     dispatch("interstitialEnd", false);
                  //   else dispatch("rewardedEnd", false);
                  // } else {
                  //   dispatch(sdkContext.lastRequestedAd);
                  // }
                  break;
              }
            },
          };
        },
        //init() {},
        setUpEventListeners() {
          listen("interstitial", () => {
            sdkContext.lastRequestedAd = "interstitial";
            dispatch("adStarted", sdkContext.lastRequestedAd);
            sdk
              .showAd()
              .then((response) => {
                dispatch("interstitialEnd", true);
              })
              .catch((error) => {
                dispatch("interstitialEnd", false);
              });
          });
          listen("rewarded", () => {
            sdkContext.lastRequestedAd = "rewarded";
            dispatch("adStarted", sdkContext.lastRequestedAd);
            sdk
              .showAd("rewarded")
              .then((response) => {
                dispatch("rewardedEnd", true);
              })
              .catch((error) => {
                dispatch("rewardedEnd", false);
              });
          });
        },
        hasAdblock() {
          return false;
        },
      },
    },
    {
      name: "GameMonetize",
      get sdk() {
        return globalThis.sdk;
      },
      scriptSrc: "//html5.api.gamedistribution.com/main.min.js",
      hasAds: true,
      enableOnlyInProduction: true,
      hasBanner: false,
      implementation: {
        async preInit(debug = false, data) {
          window["SDK_OPTIONS "] = {
            gameId: data.gameId,
            debug,
            testing: debug,
            onEvent: function (event) {
              switch (event.name) {
                case "SDK_GAME_START":
                  if (sdkContext.lastRequestedAd === "interstitial")
                    dispatch("interstitialEnd", true);
                  else dispatch("rewardedEnd", true);
                  break;
                case "SDK_GAME_PAUSE":
                  dispatch("pause");
                  break;
                case "SDK_GDPR_TRACKING":
                  // this event is triggered when your user doesn't want to be tracked
                  break;
                case "SDK_GDPR_TARGETING":
                  // this event is triggered when your user doesn't want personalised targeting of ads and such
                  break;
                case "AD_ERROR":
                  sdkContext.errors += 1;
                  if (sdkContext.errors >= 2) {
                    if (sdkContext.lastRequestedAd === "interstitial")
                      dispatch("interstitialEnd", false);
                    else dispatch("rewardedEnd", false);
                  } else {
                    dispatch(sdkContext.lastRequestedAd);
                  }
                  break;
              }
            },
          };
        },
        //init() {},
        setUpEventListeners() {
          listen("interstitial", () => {
            dispatch("adStarted", sdkContext.lastRequestedAd);
            sdk.showBanner();
          });
          listen("rewarded", () => {
            dispatch("adStarted", sdkContext.lastRequestedAd);
            sdk.showBanner();
          });
        },
        hasAdblock() {
          return false;
        },
      },
    },
    {
      name: "CoolMathGames",
      get sdk() {
        return null;
      },
      scriptSrc: null,
      hasAds: false,
      enableOnlyInProduction: true,
      hasBanner: false,
      implementation: {
        //async preInit(debug = false, data) {},
        init() {},
        setUpEventListeners() {
          listen("replayLevel", (level) => {
            parent.cmgGameEvent("replay", level.toString());
          });
          listen("gameplayStart", () => {
            parent.cmgGameEvent("start");
          });
          listen("levelStart", (level) => {
            parent.cmgGameEvent("start", level.toString());
          });
        },
        hasAdblock() {
          return false;
        },
      },
    },
  ];

  let currentSdk = null;
  let enabled = false;
  const Wrapper = {
    get enabled() {
      return enabled;
    },
    get currentSdk() {
      return currentSdk;
    },
    async init(name, debug = false, data = {}) {
      return new Promise(async (resolve) => {
        currentSdk = supportedNetworks.find(
          (x) => x.name.toLowerCase() === name.toLowerCase()
        );
        if (currentSdk) {
          enabled = true;
          if (currentSdk.enableOnlyInProduction && debug) {
            enabled = false;
            resolve();
          } else {
            if (currentSdk.implementation.preInit)
              await currentSdk.implementation.preInit(debug, data);
            if (currentSdk.scriptSrc) {
              addScript(
                currentSdk.scriptSrc,
                currentSdk.name + "-jssdk",
                async () => {
                  sdk = currentSdk.sdk;
                  currentSdk.implementation.setUpEventListeners();
                  if (currentSdk.implementation.init)
                    await currentSdk.implementation.init(debug, data);
                  resolve();
                }
              );
            } else {
              resolve();
            }
          }
        } else {
          resolve();
        }
      });
    },
    onPause(fn) {
      listen("pause", fn);
    },
    pause() {
      dispatch("pause");
    },
    onResume(fn) {
      listen("resume", fn);
    },
    resume() {
      dispatch("resume");
    },
    onMute(fn) {
      listen("mute", fn);
    },
    mute() {
      dispatch("mute");
    },
    onUnmute(fn) {
      listen("unmute", fn);
    },
    unmute() {
      dispatch("unmute");
    },
    onUnlockAllLevels(fn) {
      window.unlockAllLevels = fn;
    },
    hasAdblock() {
      if (currentSdk && currentSdk.implementation.hasAdblock)
        return currentSdk.implementation.hasAdblock();
      return false;
    },
    loadingStart() {
      dispatch("loadingStart");
    },
    loadingProgress(progress) {
      progress = Math.min(Math.max(0, progress), 100);
      dispatch("loadingProgress", progress);
    },
    loadingEnd() {
      dispatch("loadingEnd");
    },
    gameplayStart() {
      dispatch("gameplayStart");
    },
    gameplayStop() {
      dispatch("gameplayStop");
    },
    happyTime() {
      dispatch("happyTime");
    },
    levelStart(level) {
      dispatch("levelStart", level);
    },
    replayLevel(level) {
      dispatch("replayLevel", level);
    },
    score(score) {
      dispatch("score", score);
    },
    banner(data) {
      dispatch("banner", data);
    },
    interstitial() {
      sdkContext.lastRequestedAd = "interstitial";
      if (!currentSdk || !currentSdk.hasAds) {
        dispatch("adStarted", sdkContext.lastRequestedAd);
        return Promise.resolve(false);
      }
      return new Promise((resolve) => {
        let gameplayStarted = sdkContext.gameplayStarted;
        if (gameplayStarted) Wrapper.gameplayStop();
        Wrapper.mute();
        dispatch("interstitial");
        listenOnce("interstitialEnd", (...args) => {
          if (gameplayStarted) Wrapper.gameplayStart();
          Wrapper.unmute();
          resolve(...args);
        });
      });
    },
    rewarded() {
      sdkContext.lastRequestedAd = "rewarded";
      if (!currentSdk || !currentSdk.hasAds) {
        dispatch("adStarted", sdkContext.lastRequestedAd);
        return Promise.resolve(false);
      }
      return new Promise((resolve) => {
        let gameplayStarted = sdkContext.gameplayStarted;
        if (gameplayStarted) Wrapper.gameplayStop();
        Wrapper.mute();
        dispatch("rewarded");
        listenOnce("rewardedEnd", (...args) => {
          if (gameplayStarted) Wrapper.gameplayStart();
          Wrapper.unmute();
          resolve(...args);
        });
      });
    },
    onAdStarted(fn) {
      listen("adStarted", fn);
    },
    hasAds() {
      return currentSdk && currentSdk.hasAds ? 1 : 0;
    },
  };
  return Wrapper;
})();
