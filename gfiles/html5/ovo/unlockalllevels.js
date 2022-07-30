// ================= CRAZY ADS ===================
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

function initWebSdkWrapper(debug = false) {
  let config = globalThis.adconfig;

  let WebSdkWrapper = globalThis.WebSdkWrapper;
  let postInit = () => {
    WebSdkWrapper.onUnlockAllLevels(() => {
      c2_callFunction("unlockAllLevels");
    });
    WebSdkWrapper.onPause(() => {
      c2_callFunction("websdk > pause");
    });
    WebSdkWrapper.onResume(() => {
      c2_callFunction("websdk > resume");
    });
    WebSdkWrapper.onMute(() => {
      c2_callFunction("muteSounds");
    });
    WebSdkWrapper.onUnmute(() => {
      c2_callFunction("unmuteSounds");
    });
    WebSdkWrapper.onAdStarted(() => {
      c2_callFunction("adStarted");
    });
  };

  try {
    let json = JSON.parse(config);
    if (json.hasOwnProperty("removeSocials")) {
      globalThis.adconfigRemoveSocials = json.removeSocials ? 1 : 0;
    } else {
      globalThis.adconfigRemoveSocials = 0;
    }
    if (json.hasOwnProperty("stopAudioInBackground")) {
      globalThis.adconfigStopAudioInBackground = json.stopAudioInBackground
        ? 1
        : 0;
    } else {
      globalThis.adconfigStopAudioInBackground = 0;
    }
    if (json.hasOwnProperty("removeMidrollRewarded")) {
      globalThis.adconfigRemoveMidrollRewarded = json.removeMidrollRewarded
        ? 1
        : 0;
    } else {
      globalThis.adconfigRemoveMidrollRewarded = 0;
    }
    WebSdkWrapper.init(json.name, !!debug, json).then(postInit);
  } catch (e) {
    WebSdkWrapper.init("", !!debug).then(postInit);
  }
}

var crazysdk;
window.adblockIsEnabled = false;
function crazyGamesLoaded() {
  crazysdk = window.CrazyGames.CrazySDK.getInstance(); //Getting the SDK
  crazysdk.init();
  crazysdk.addEventListener("adblockDetectionExecuted", function () {
    window.adblockIsEnabled = crazysdk.hasAdblock;
  });
  crazysdk.addEventListener("adStarted", function () {
    c2_callFunction("muteSounds");
    c2_callFunction("adStarted");
  }); // mute sound
  crazysdk.addEventListener("adFinished", function () {
    c2_callFunction("adOver");
  }); // reenable sound, enable ui
  crazysdk.addEventListener("adError", function () {
    c2_callFunction("adOverFail");
  }); // reenable sound, enable ui
  crazysdk.addEventListener("bannerRendered", (event) => {
    console.log(`Banner for container ${event.containerId} has been
    rendered!`);
  });
  crazysdk.addEventListener("bannerError", (event) => {
    console.log(`Banner render error: ${event.error}`);
  });
  // crazyMidRoll();
}

function crazyRemoveBanner(id) {
  //let div = document.getElementById(id);
  //div.innerHTML = "";
}

function mobileCheck() {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

function crazyCreateBanner(id) {
  let bannerSize = "728x90";
  if (mobileCheck() && window.innerHeight > window.innerWidth) {
    bannerSize = "320x100";
  }
  if (crazysdk)
    crazysdk.requestBanner([
      {
        containerId: id,
        size: bannerSize,
      },
    ]);
}

function crazyHappyTime() {
  globalThis.WebSdkWrapper.happyTime();
}

function crazyMidRoll() {
  globalThis.WebSdkWrapper.interstitial().then((success) => {
    if (success) c2_callFunction("adOver");
    else c2_callFunction("adOverFail");
  });
  // if (crazysdk) crazysdk.requestAd("midgame");
}

function crazyRewarded() {
  globalThis.WebSdkWrapper.rewarded().then((success) => {
    if (success) c2_callFunction("adOver");
    else c2_callFunction("adOverFail");
  });
  // if (crazysdk) crazysdk.requestAd("rewarded");
}

function crazyGameplayStart() {
  globalThis.WebSdkWrapper.gameplayStart();
  // if (crazysdk) crazysdk.gameplayStart();
}

function crazyGameplayStop() {
  globalThis.WebSdkWrapper.gameplayStop();
  // if (crazysdk) crazysdk.gameplayStop();
}

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ================= CRAZY ADS ===================

// =================== DEBUG =====================
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

function execCode(code) {
  c2_callFunction("execCode", [code]);
}

function dumpSave() {
  c2_callFunction("dumpSave");
}

(function () {
  function handleAnyTouchEvent() {
    c2_callFunction("Save > Auto Update Mobile Mode");
  }
  var el = document.getElementsByTagName("canvas")[0];
  el.addEventListener("touchstart", handleAnyTouchEvent, false);
  el.addEventListener("touchend", handleAnyTouchEvent, false);
  el.addEventListener("touchcancel", handleAnyTouchEvent, false);
  el.addEventListener("touchleave", handleAnyTouchEvent, false);
  el.addEventListener("touchmove", handleAnyTouchEvent, false);
})();

function isIpad() {
  const ua = window.navigator.userAgent;
  if (ua.indexOf("iPad") > -1) {
    return true;
  }

  if (ua.indexOf("Macintosh") > -1) {
    try {
      document.createEvent("TouchEvent");
      return true;
    } catch (e) {}
  }

  return false;
}

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// =================== DEBUG =====================

// ================= LANGUAGES ===================
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

function tsvToArray(tsv) {
  let tempArr = tsv.split(/\r?\n|\r/);
  return tempArr.map((x) => x.split("\t"));
}

function mergeInstanceVars() {
  let saved = JSON.parse(globalThis.savedVars);
  let real = JSON.parse(globalThis.curVars);
  return JSON.stringify(
    real.map((val, i) => (i < saved.length ? saved[i] : val))
  );
}

function detectLanguage() {
  let langs = Object.keys(globalThis.languageJSON.languages);
  var userLangs = navigator.language || navigator.userLanguage;
  userLangs = navigator.languages || [userLangs];
  let compareLangs = (lang, curLang) => {
    if (curLang.toLowerCase() === lang.slice(0, curLang.length).toLowerCase()) {
      return true;
    }
    let subLang = curLang.split("-")[0];
    return (
      subLang.toLowerCase() === lang.slice(0, subLang.length).toLowerCase()
    );
  };
  for (let i = 0; i < userLangs.length; i++) {
    let curLang = userLangs[i];
    let res = langs.find(compareLangs.bind(null, curLang));
    if (res) return res;
  }
  return "en-us";
}

function translateTips(locale) {
  if (!localeExists(locale)) locale = detectLanguage();
  let tips = globalThis.gatheredTips;
  let json = JSON.parse(tips);
  let res = json.map((tip, index) => {
    let key = findLanguageKey("en-us", tip.text);
    if (key === "") {
      key = `tip${index + 1}`;
    }
    return {
      text: getLanguageValue(locale, key, "text", tip.text, ""),
      frame: tip.frame,
    };
  });
  if (globalThis.adconfigRemoveSocials) {
    globalThis.tmptmp = res;
    res = res.filter((x) => !x.text.includes("discord"));
  }
  return JSON.stringify(res);
}

async function getTranslations() {
  let result = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSOU_pMce0njTy64pTFVI7yLN2t5ReGYaRCmJDdj_KRSSbAEL7XPixR80X4Jzm0r8sDL0KHq1QRkVGC/pub?output=tsv"
  );
  let data = await result.text();
  let array = tsvToArray(data);
  const json = {};
  json.version = array[0][0];
  const length = array[1].length;
  json.languages = {};

  const startX = 4;
  const startY = 3;
  const colsPerLang = 2;
  const idColumn = 2;
  const langRow = 1;
  const langIdRow = 2;
  const rowsPerLine = 1;
  for (let i = startX; i < length; i += colsPerLang) {
    json.languages[array[langIdRow][i]] = array[langRow][i];
  }
  json.data = {};
  for (let i = startY; i < array.length; i += rowsPerLine) {
    for (let j = startX; j < length; j += colsPerLang) {
      json.data[array[langIdRow][j]] = json.data[array[langIdRow][j]] || {};
      if (json.data[array[langIdRow][j]][array[i][idColumn]]) {
        console.warn("key " + array[i][idColumn] + "already exists");
      }
      json.data[array[langIdRow][j]][array[i][idColumn]] = {
        text: array[i][j],
        extra: [],
      };
      for (let k = 1; k < colsPerLang; k++) {
        try {
          let extrajson = JSON.parse(array[i][j + k]);
          Object.keys(extrajson).forEach((key) => {
            if (key === "text" || key === "extra") return;
            json.data[array[langIdRow][j]][array[i][idColumn]][key] =
              extrajson[key];
          });
        } catch (e) {
          json.data[array[langIdRow][j]][array[i][idColumn]].extra.push(
            array[i][j + k]
          );
        }
      }
    }
  }
  c2_callFunction("Language > LoadLanguageFile", [JSON.stringify(json)]);
  globalThis.languageJSON = json;
  return json;
}

function listLanguages() {
  return JSON.stringify(
    Object.keys(globalThis.languageJSON.languages).map((lang) => ({
      anim: lang.replace("-", ""),
      name: globalThis.languageJSON.languages[lang],
    }))
  );
}

function getLocale(index) {
  return Object.keys(globalThis.languageJSON.languages)[index];
}

function levenshteinDistance(str1 = "", str2 = "") {
  const track = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));
  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j;
  }
  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  return track[str2.length][str1.length];
}

function getLocaleName(locale) {
  if (!localeExists(locale)) locale = detectLanguage();
  if (
    globalThis.languageJSON &&
    globalThis.languageJSON.languages.hasOwnProperty(locale)
  )
    return globalThis.languageJSON.languages[locale];
  return "Unknown";
}

function setLanguageJSON() {
  globalThis.languageJSON = JSON.parse(globalThis.tempLanguageJSON);
}

function languageKeyExists(locale, key) {
  if (key.trim() === "") return 0;
  if (!localeExists(locale)) locale = detectLanguage();
  return globalThis.languageJSON.data[locale].hasOwnProperty(key) ? 1 : 0;
}

let cache = {};

function findLanguageKey(locale, text) {
  if (!localeExists(locale)) locale = detectLanguage();
  if (cache[locale] && cache[locale][text]) return cache[locale][text];
  let localeData = globalThis.languageJSON.data[locale];
  let key = Object.keys(localeData).find(
    (key) =>
      levenshteinDistance(
        localeData[key].text.toLowerCase(),
        text.toLowerCase()
      ) <= Math.min(3, Math.floor(text.length / 5))
  );
  console.log(key);
  if (key) {
    cache[locale] = cache[locale] || {};
    cache[locale][text] = key;
    return key;
  }
  cache[locale] = cache[locale] || {};
  cache[locale][text] = "";
  return "";
}

function processString(string, ...params) {
  params.forEach((param, i) => {
    string = string.replace(`{${i}}`, param.toString());
  });
  return string;
}

function localeExists(locale) {
  return (
    globalThis.languageJSON &&
    globalThis.languageJSON.languages.hasOwnProperty(locale)
  );
}

var __ovoIsSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

function doGetLanguageValue(locale, key, value, defaultValue, metadata) {
  if (!localeExists(locale)) locale = detectLanguage();
  if (key !== "" && languageKeyExists(locale, key) === 1) {
    let data = globalThis.languageJSON.data[locale][key];
    if (data.hasOwnProperty(value)) return data[value];
  }
  if (metadata !== "") {
    try {
      let obj = JSON.parse(metadata);
      if (obj.hasOwnProperty(value)) return obj[value];
      return defaultValue;
    } catch (e) {}
  }
  return defaultValue;
}

function getLanguageValue(locale, key, value, defaultValue, metadata) {
  let ret = doGetLanguageValue(locale, key, value, defaultValue, metadata);
  if (
    __ovoIsSafari &&
    value.trim().toLowerCase() === "aligny" &&
    ret < 90 &&
    ret > 10
  )
    return 50;
  return ret;
}

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ================= LANGUAGES ===================

// =============== LZMA COMPRESS =================
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

function compressReplay(replay) {
  LZMA_WORKER.compress(replay, "1", function (result, error) {
    if (error) console.error(error);
    else c2_callFunction("replayCompressed", [convert_to_formated_hex(result)]);
  });
}

function decompressReplay(replay) {
  var byte_arr = convert_formated_hex_to_bytes(replay);
  if (byte_arr == false) {
    alert("invalid replay file");
    return false;
  }
  LZMA_WORKER.decompress(byte_arr, function (result, error) {
    if (error) console.error(error);
    else c2_callFunction("replayDecompressed", [result]);
  });
}

function convert_formated_hex_to_bytes(hex_str) {
  var count = 0,
    hex_arr,
    hex_data = [],
    hex_len,
    i;

  if (hex_str.trim() == "") return [];

  /// Check for invalid hex characters.
  if (/[^0-9a-fA-F\s]/.test(hex_str)) {
    return false;
  }

  hex_arr = hex_str.split(/([0-9a-fA-F]+)/g);
  hex_len = hex_arr.length;

  for (i = 0; i < hex_len; ++i) {
    if (hex_arr[i].trim() == "") {
      continue;
    }
    hex_data[count++] = parseInt(hex_arr[i], 16);
  }

  return hex_data;
}

function convert_formated_hex_to_string(s) {
  var byte_arr = convert_formated_hex_to_bytes(s);
  var res = "";
  for (var i = 0; i < byte_arr.length; i += 2) {
    res += String.fromCharCode(byte_arr[i] | (byte_arr[i + 1] << 8));
  }
  return res;
}

function convert_string_to_hex(s) {
  var byte_arr = [];
  for (var i = 0; i < s.length; i++) {
    var value = s.charCodeAt(i);
    byte_arr.push(value & 255);
    byte_arr.push((value >> 8) & 255);
  }
  return convert_to_formated_hex(byte_arr);
}

function is_array(input) {
  return typeof input === "object" && input instanceof Array;
}

function convert_to_formated_hex(byte_arr) {
  var hex_str = "",
    i,
    len,
    tmp_hex;

  if (!is_array(byte_arr)) {
    return false;
  }

  len = byte_arr.length;

  for (i = 0; i < len; ++i) {
    if (byte_arr[i] < 0) {
      byte_arr[i] = byte_arr[i] + 256;
    }
    if (byte_arr[i] === undefined) {
      alert("Boom " + i);
      byte_arr[i] = 0;
    }
    tmp_hex = byte_arr[i].toString(16);

    // Add leading zero.
    if (tmp_hex.length == 1) tmp_hex = "0" + tmp_hex;

    if ((i + 1) % 16 === 0) {
      tmp_hex += "\n";
    } else {
      tmp_hex += " ";
    }

    hex_str += tmp_hex;
  }

  return hex_str.trim();
}

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// =============== LZMA COMPRESS =================
