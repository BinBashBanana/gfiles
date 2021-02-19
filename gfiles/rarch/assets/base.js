// please dont use IE
if (!window.fetch) {
	alert("Update your browser!");
	throw "Update your browser!";
}

var upload, smooth, doubleRes, resModifier, canvas, dateTime, saveState, loadState, exportState, importState, ffd, nulKeys, keybinds, pdKeys, search, queries, systems, fileExts, aCoreList, systemName, visibleCores, baseFsBundleDir, fsBundleDirs, fsBundleFiles, bundleCdn, consoleButton, wconsole, conw, loadStatus, mainArea, hoverMenu, romName;
bundleCdn = "https://cdn.jsdelivr.net/gh/BinBashBanana/gstore/rarch/";
upload = document.getElementById("upload");
smooth = document.getElementById("smooth");
doubleRes = document.getElementById("doubleres");
resModifier = 1;
canvas = document.getElementById("canvas");
dateTime = new Date();
saveState = document.getElementById("savestate");
loadState = document.getElementById("loadstate");
exportState = document.getElementById("exportstate");
importState = document.getElementById("importstate");
ffd = document.getElementById("ffd");
systemName = document.getElementById("systemname");
consoleButton = document.getElementById("consolebutton");
mainArea = document.getElementById("mainarea");
hoverMenu = document.getElementById("menu");
search = decodeURIComponent(window.location.search).substring(1).split("&");
nulKeys = 'input_ai_service = "nul"\ninput_ai_service_axis = "nul"\ninput_ai_service_btn = "nul"\ninput_ai_service_mbtn = "nul"\ninput_audio_mute = "nul"\ninput_audio_mute_axis = "nul"\ninput_audio_mute_btn = "nul"\ninput_audio_mute_mbtn = "nul"\ninput_cheat_index_minus = "nul"\ninput_cheat_index_minus_axis = "nul"\ninput_cheat_index_minus_btn = "nul"\ninput_cheat_index_minus_mbtn = "nul"\ninput_cheat_index_plus = "nul"\ninput_cheat_index_plus_axis = "nul"\ninput_cheat_index_plus_btn = "nul"\ninput_cheat_index_plus_mbtn = "nul"\ninput_cheat_toggle = "nul"\ninput_cheat_toggle_axis = "nul"\ninput_cheat_toggle_btn = "nul"\ninput_cheat_toggle_mbtn = "nul"\ninput_desktop_menu_toggle = "nul"\ninput_desktop_menu_toggle_axis = "nul"\ninput_desktop_menu_toggle_btn = "nul"\ninput_desktop_menu_toggle_mbtn = "nul"\ninput_disk_eject_toggle = "nul"\ninput_disk_eject_toggle_axis = "nul"\ninput_disk_eject_toggle_btn = "nul"\ninput_disk_eject_toggle_mbtn = "nul"\ninput_disk_next = "nul"\ninput_disk_next_axis = "nul"\ninput_disk_next_btn = "nul"\ninput_disk_next_mbtn = "nul"\ninput_disk_prev = "nul"\ninput_disk_prev_axis = "nul"\ninput_disk_prev_btn = "nul"\ninput_disk_prev_mbtn = "nul"\ninput_duty_cycle = "nul"\ninput_enable_hotkey = "nul"\ninput_enable_hotkey_axis = "nul"\ninput_enable_hotkey_btn = "nul"\ninput_enable_hotkey_mbtn = "nul"\ninput_exit_emulator = "nul"\ninput_exit_emulator_axis = "nul"\ninput_exit_emulator_btn = "nul"\ninput_exit_emulator_mbtn = "nul"\ninput_fps_toggle = "nul"\ninput_fps_toggle_axis = "nul"\ninput_fps_toggle_btn = "nul"\ninput_fps_toggle_mbtn = "nul"\ninput_frame_advance = "nul"\ninput_frame_advance_axis = "nul"\ninput_frame_advance_btn = "nul"\ninput_frame_advance_mbtn = "nul"\ninput_game_focus_toggle = "nul"\ninput_game_focus_toggle_axis = "nul"\ninput_game_focus_toggle_btn = "nul"\ninput_game_focus_toggle_mbtn = "nul"\ninput_grab_mouse_toggle = "nul"\ninput_grab_mouse_toggle_axis = "nul"\ninput_grab_mouse_toggle_btn = "nul"\ninput_grab_mouse_toggle_mbtn = "nul"\ninput_hold_fast_forward = "nul"\ninput_hold_fast_forward_axis = "nul"\ninput_hold_fast_forward_btn = "nul"\ninput_hold_fast_forward_mbtn = "nul"\ninput_hold_slowmotion = "nul"\ninput_slowmotion = "nul"\ninput_hold_slowmotion_axis = "nul"\ninput_hold_slowmotion_btn = "nul"\ninput_hold_slowmotion_mbtn = "nul"\ninput_hotkey_block_delay = "nul"\ninput_load_state_axis = "nul"\ninput_load_state_btn = "nul"\ninput_load_state_mbtn = "nul"\ninput_menu_toggle_axis = "nul"\ninput_menu_toggle_btn = "nul"\ninput_menu_toggle_mbtn = "nul"\ninput_movie_record_toggle = "nul"\ninput_movie_record_toggle_axis = "nul"\ninput_movie_record_toggle_btn = "nul"\ninput_movie_record_toggle_mbtn = "nul"\ninput_netplay_game_watch = "nul"\ninput_netplay_game_watch_axis = "nul"\ninput_netplay_game_watch_btn = "nul"\ninput_netplay_game_watch_mbtn = "nul"\ninput_netplay_host_toggle = "nul"\ninput_netplay_host_toggle_axis = "nul"\ninput_netplay_host_toggle_btn = "nul"\ninput_netplay_host_toggle_mbtn = "nul"\ninput_osk_toggle = "nul"\ninput_osk_toggle_axis = "nul"\ninput_osk_toggle_btn = "nul"\ninput_osk_toggle_mbtn = "nul"\ninput_overlay_next = "nul"\ninput_overlay_next_axis = "nul"\ninput_overlay_next_btn = "nul"\ninput_overlay_next_mbtn = "nul"\ninput_pause_toggle = "nul"\ninput_pause_toggle_axis = "nul"\ninput_pause_toggle_btn = "nul"\ninput_pause_toggle_mbtn = "nul"\ninput_player1_a_axis = "nul"\ninput_player1_a_btn = "nul"\ninput_player1_a_mbtn = "nul"\ninput_player1_b_axis = "nul"\ninput_player1_b_btn = "nul"\ninput_player1_b_mbtn = "nul"\ninput_player1_down_axis = "nul"\ninput_player1_down_btn = "nul"\ninput_player1_down_mbtn = "nul"\ninput_player1_gun_aux_a = "nul"\ninput_player1_gun_aux_a_axis = "nul"\ninput_player1_gun_aux_a_btn = "nul"\ninput_player1_gun_aux_a_mbtn = "nul"\ninput_player1_gun_aux_b = "nul"\ninput_player1_gun_aux_b_axis = "nul"\ninput_player1_gun_aux_b_btn = "nul"\ninput_player1_gun_aux_b_mbtn = "nul"\ninput_player1_gun_aux_c = "nul"\ninput_player1_gun_aux_c_axis = "nul"\ninput_player1_gun_aux_c_btn = "nul"\ninput_player1_gun_aux_c_mbtn = "nul"\ninput_player1_gun_dpad_down = "nul"\ninput_player1_gun_dpad_down_axis = "nul"\ninput_player1_gun_dpad_down_btn = "nul"\ninput_player1_gun_dpad_down_mbtn = "nul"\ninput_player1_gun_dpad_left = "nul"\ninput_player1_gun_dpad_left_axis = "nul"\ninput_player1_gun_dpad_left_btn = "nul"\ninput_player1_gun_dpad_left_mbtn = "nul"\ninput_player1_gun_dpad_right = "nul"\ninput_player1_gun_dpad_right_axis = "nul"\ninput_player1_gun_dpad_right_btn = "nul"\ninput_player1_gun_dpad_right_mbtn = "nul"\ninput_player1_gun_dpad_up = "nul"\ninput_player1_gun_dpad_up_axis = "nul"\ninput_player1_gun_dpad_up_btn = "nul"\ninput_player1_gun_dpad_up_mbtn = "nul"\ninput_player1_gun_offscreen_shot = "nul"\ninput_player1_gun_offscreen_shot_axis = "nul"\ninput_player1_gun_offscreen_shot_btn = "nul"\ninput_player1_gun_offscreen_shot_mbtn = "nul"\ninput_player1_gun_select = "nul"\ninput_player1_gun_select_axis = "nul"\ninput_player1_gun_select_btn = "nul"\ninput_player1_gun_select_mbtn = "nul"\ninput_player1_gun_start = "nul"\ninput_player1_gun_start_axis = "nul"\ninput_player1_gun_start_btn = "nul"\ninput_player1_gun_start_mbtn = "nul"\ninput_player1_gun_trigger = "nul"\ninput_player1_gun_trigger_axis = "nul"\ninput_player1_gun_trigger_btn = "nul"\ninput_player1_gun_trigger_mbtn = "nul"\ninput_player1_l2_axis = "nul"\ninput_player1_l2_btn = "nul"\ninput_player1_l2_mbtn = "nul"\ninput_player1_l3 = "nul"\ninput_player1_l3_axis = "nul"\ninput_player1_l3_mbtn = "nul"\ninput_player1_l_axis = "nul"\ninput_player1_l_btn = "nul"\ninput_player1_l_mbtn = "nul"\ninput_player1_l_x_minus_axis = "nul"\ninput_player1_l_x_minus_btn = "nul"\ninput_player1_l_x_minus_mbtn = "nul"\ninput_player1_l_x_plus_axis = "nul"\ninput_player1_l_x_plus_btn = "nul"\ninput_player1_l_x_plus_mbtn = "nul"\ninput_player1_l_y_minus_axis = "nul"\ninput_player1_l_y_minus_btn = "nul"\ninput_player1_l_y_minus_mbtn = "nul"\ninput_player1_l_y_plus_axis = "nul"\ninput_player1_l_y_plus_btn = "nul"\ninput_player1_l_y_plus_mbtn = "nul"\ninput_player1_left_axis = "nul"\ninput_player1_left_mbtn = "nul"\ninput_player1_r2_axis = "nul"\ninput_player1_r2_btn = "nul"\ninput_player1_r2_mbtn = "nul"\ninput_player1_r3 = "nul"\ninput_player1_r3_axis = "nul"\ninput_player1_r3_mbtn = "nul"\ninput_player1_r_axis = "nul"\ninput_player1_r_btn = "nul"\ninput_player1_r_mbtn = "nul"\ninput_player1_r_x_minus_axis = "nul"\ninput_player1_r_x_minus_btn = "nul"\ninput_player1_r_x_minus_mbtn = "nul"\ninput_player1_r_x_plus_axis = "nul"\ninput_player1_r_x_plus_btn = "nul"\ninput_player1_r_x_plus_mbtn = "nul"\ninput_player1_r_y_minus_axis = "nul"\ninput_player1_r_y_minus_btn = "nul"\ninput_player1_r_y_minus_mbtn = "nul"\ninput_player1_r_y_plus_axis = "nul"\ninput_player1_r_y_plus_btn = "nul"\ninput_player1_r_y_plus_mbtn = "nul"\ninput_player1_right_axis = "nul"\ninput_player1_right_mbtn = "nul"\ninput_player1_select_axis = "nul"\ninput_player1_select_btn = "nul"\ninput_player1_select_mbtn = "nul"\ninput_player1_start_axis = "nul"\ninput_player1_start_btn = "nul"\ninput_player1_start_mbtn = "nul"\ninput_player1_turbo = "nul"\ninput_player1_turbo_axis = "nul"\ninput_player1_turbo_btn = "nul"\ninput_player1_turbo_mbtn = "nul"\ninput_player1_up_axis = "nul"\ninput_player1_up_btn = "nul"\ninput_player1_up_mbtn = "nul"\ninput_player1_x_axis = "nul"\ninput_player1_x_btn = "nul"\ninput_player1_x_mbtn = "nul"\ninput_player1_y_axis = "nul"\ninput_player1_y_btn = "nul"\ninput_player1_y_mbtn = "nul"\ninput_poll_type_behavior = "nul"\ninput_recording_toggle = "nul"\ninput_recording_toggle_axis = "nul"\ninput_recording_toggle_btn = "nul"\ninput_recording_toggle_mbtn = "nul"\ninput_reset = "nul"\ninput_reset_axis = "nul"\ninput_reset_btn = "nul"\ninput_reset_mbtn = "nul"\ninput_rewind = "nul"\ninput_rewind_axis = "nul"\ninput_rewind_btn = "nul"\ninput_rewind_mbtn = "nul"\ninput_save_state_axis = "nul"\ninput_save_state_btn = "nul"\ninput_save_state_mbtn = "nul"\ninput_screenshot = "nul"\ninput_screenshot_axis = "nul"\ninput_screenshot_btn = "nul"\ninput_screenshot_mbtn = "nul"\ninput_send_debug_info = "nul"\ninput_send_debug_info_axis = "nul"\ninput_send_debug_info_btn = "nul"\ninput_send_debug_info_mbtn = "nul"\ninput_shader_next = "nul"\ninput_shader_next_axis = "nul"\ninput_shader_next_btn = "nul"\ninput_shader_next_mbtn = "nul"\ninput_shader_prev = "nul"\ninput_shader_prev_axis = "nul"\ninput_shader_prev_btn = "nul"\ninput_shader_prev_mbtn = "nul"\ninput_state_slot_decrease = "nul"\ninput_state_slot_decrease_axis = "nul"\ninput_state_slot_decrease_btn = "nul"\ninput_state_slot_decrease_mbtn = "nul"\ninput_state_slot_increase = "nul"\ninput_state_slot_increase_axis = "nul"\ninput_state_slot_increase_btn = "nul"\ninput_state_slot_increase_mbtn = "nul"\ninput_streaming_toggle = "nul"\ninput_streaming_toggle_axis = "nul"\ninput_streaming_toggle_btn = "nul"\ninput_streaming_toggle_mbtn = "nul"\ninput_toggle_fast_forward = "nul"\ninput_toggle_fast_forward_axis = "nul"\ninput_toggle_fast_forward_btn = "nul"\ninput_toggle_fast_forward_mbtn = "nul"\ninput_toggle_fullscreen = "nul"\ninput_toggle_fullscreen_axis = "nul"\ninput_toggle_fullscreen_btn = "nul"\ninput_toggle_fullscreen_mbtn = "nul"\ninput_toggle_slowmotion = "nul"\ninput_toggle_slowmotion_axis = "nul"\ninput_toggle_slowmotion_btn = "nul"\ninput_toggle_slowmotion_mbtn = "nul"\ninput_turbo_default_button = "nul"\ninput_turbo_mode = "nul"\ninput_turbo_period = "nul"\ninput_volume_down = "nul"\ninput_volume_down_axis = "nul"\ninput_volume_down_btn = "nul"\ninput_volume_down_mbtn = "nul"\ninput_volume_up = "nul"\ninput_volume_up_axis = "nul"\ninput_volume_up_btn = "nul"\ninput_volume_up_mbtn = "nul"\n';
keybinds = 'input_player1_start = "enter"\ninput_player1_select = "space"\ninput_player1_l = "e"\ninput_player1_l2 = "r"\ninput_player1_r = "p"\ninput_player1_r2 = "o"\ninput_player1_a = "h"\ninput_player1_b = "g"\ninput_player1_x = "y"\ninput_player1_y = "t"\ninput_player1_up = "up"\ninput_player1_left = "left"\ninput_player1_down = "down"\ninput_player1_right = "right"\ninput_player1_l_x_minus = "a"\ninput_player1_l_x_plus = "d"\ninput_player1_l_y_minus = "w"\ninput_player1_l_y_plus = "s"\ninput_player1_l3_btn = "x"\ninput_player1_r_x_minus = "j"\ninput_player1_r_x_plus = "l"\ninput_player1_r_y_minus = "i"\ninput_player1_r_y_plus = "k"\ninput_player1_r3_btn = "comma"\ninput_menu_toggle = "f1"\ninput_save_state = "f2"\ninput_load_state = "f3"\n';
pdKeys = [8, 9, 13, 19, 27, 32, 33, 34, 35, 36, 42, 44, 45, 91, 92, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135];
systems = {"genesis_plus_gx": "Genesis", "mupen64plus_next": "Nintendo 64", "nestopia": "NES", "parallel_n64": "Nintendo 64", "snes9x": "SNES", "vba_next": "GBA"};
visibleCores = ["genesis_plus_gx", "mupen64plus_next", "nestopia", "snes9x", "vba_next"];
fileExts = {"GBA": ".bin, .gb, .gbc, .gba", "Genesis": ".bin, .mdx, .md, .smd, .gen, .cue, .iso, .sms, .gg, .sg, .68k, .chd", "NES": ".bin, .nes, .fds, .unf, .unif", "Nintendo 64": ".bin, .n64, .v64, .z64, .u1, .ndd", "SNES": ".bin, .smc, .sfc, .swc, .fig, .bs, .st"};
baseFsBundleDir = "/home/web_user/retroarch/bundle";
var wasmReady, bundleReady

// make core lists
aCoreList = "";
for (var i = 0; i < visibleCores.length; i++) {
	aCoreList += '<li><a href="?core=' + visibleCores[i] + '">' + visibleCores[i] + ' (' + systems[visibleCores[i]] + ')</a></li>';
}

// query string into object
queries = {};
for (var i = 0; i < search.length; i++) {
	var p = search[i].split("=");
	queries[p[0]] = p[1];
}

// toggle between sharp and smooth canvas graphics
smooth.onclick = function() {
	if (this.checked) {
		canvas.className = "textureSmooth";
	} else {
		canvas.className = "texturePixelated";
	}
}

// higher resolution
doubleRes.onclick = function() {
	if (this.checked) {
		resModifier = 2;
		adjustCanvasSize();
	} else {
		resModifier = 1;
		adjustCanvasSize();
	}
}

// logging
var mario64p;
function log(log, userInput) {
	// sm64
	if ((systems[queries["core"]] == "Nintendo 64") && (!mario64p) && log.toLowerCase().includes("goodname:")) {
		mario64p = true;
		if (log.toLowerCase().includes("super mario 64")) alert("Remember: Every copy of Mario 64 is personalized.");
	}
	console.log(log);
	wconsole.textContent += (userInput ? "> " + userInput + "\n" + JSON.stringify(log) : log) + "\n";
	wconsole.scrollTo({top: wconsole.scrollHeight});
}

// xhr
function grab(url, type, success, fail) {
	var req = new XMLHttpRequest();
	req.open("GET", url, true);
	req.overrideMimeType("text/plain; charset=x-user-defined");
	req.responseType = type;
	req.onload = function() {
		if (req.status >= "400") {
			fail(req.status);
		} else {
			success(this.response);
		}
	}
	req.send();
}

// file reader
function readFile(file, callback) {
	var reader = new FileReader();
	reader.onload = function() {
		callback(this.result);
	}
	reader.readAsArrayBuffer(file);
}

// change background for status messages
function setStatus(message) {
	loadStatus = message;
	canvas.style.backgroundImage = 'url("data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150"><text style="font: 30px sans-serif;" fill="white" x="50%" y="40%" dominant-baseline="middle" text-anchor="middle">Loading</text><text style="font: 15px sans-serif;" fill="white" x="50%" y="60%" dominant-baseline="middle" text-anchor="middle">' + message + '</text></svg>') + '")';
}

// remove status messages
function removeStatus(message) {
	if (loadStatus === message) setStatus("");
}

// adjust canvas size to window
function adjustCanvasSize() {
	if (window.innerHeight >= window.innerWidth * (3/4)) {
		var s = window.innerWidth * resModifier;
		canvas.width = s;
		canvas.height = Math.floor(s * (3/4));
	} else {
		var s = window.innerHeight * resModifier;
		canvas.width = Math.floor(s * (4/3));
		canvas.height = s;
	}
}

window.addEventListener("load", function() {
	// console window
	conw = new jswindow({title: "Console", icon: "assets/terminal.svg"});
	
	wconsole = document.createElement("textarea");
	wconsole.classList.add("console");
	wconsole.setAttribute("spellcheck", "false");
	wconsole.setAttribute("readonly", "");
	
	wconsole.wconsolemarker = document.createElement("span");
	wconsole.wconsolemarker.classList.add("consolemarker");
	
	wconsole.wconsoleinput = document.createElement("input");
	wconsole.wconsoleinput.type = "text";
	wconsole.wconsoleinput.classList.add("consoleinput");
	wconsole.wconsoleinput.title = "You can type things here as though you were using the browser console.";
	wconsole.wconsoleinput.setAttribute("spellcheck", "false");
	wconsole.wconsolemarker.onclick = function() { wconsole.wconsoleinput.focus(); }
	wconsole.wconsoleinput.onkeydown = function(e) {
		if (e.keyCode == 13) {
			log(eval(this.value), this.value);
			this.value = "";
		}
	}
	
	conw.innerWindow.appendChild(wconsole);
	conw.innerWindow.appendChild(wconsole.wconsolemarker);
	conw.innerWindow.appendChild(wconsole.wconsoleinput);
	
	if (queries.hasOwnProperty("console")) conw.open({width: 450, height: 250, left: 100, top: 50});
	
	consoleButton.onclick = function() {
		conw.open({width: 450, height: 250, left: 100, top: 50});
		wconsole.wconsoleinput.focus();
		wconsole.scrollTo({top: wconsole.scrollHeight});
	}
	
	// on window resize
	window.addEventListener("resize", adjustCanvasSize, false);
	
	// load core
	if (queries["core"]) {
		// show hover menu
		hoverMenu.style.display = "block";
		
		var core = queries["core"];
		setStatus("Getting core");
		var script = document.createElement('script');
		script.type ='text/javascript';
		script.src = core + "_libretro.js";
		script.onload = function() {
			removeStatus("Getting core");
			
			// grab asset bundle
			if (queries.hasOwnProperty("nobundle")) {
				bundleReady = true;
			} else {
				prepareBundle();
			}
			
			// detect system for ROM upload
			systemName.textContent = systems[core];
			upload.setAttribute("accept", fileExts[systems[core]]);
			
			// when a rom is uploaded
			upload.onchange = function() {
				ffd.style.display = "none";
				let file = this.files[0];
				readFile(file, function(data) {
					log('Succesfully read ROM file "' + file.name + '"');
					romName = file.name.split(".")[0];
					initFromData(data);
				});
			}
			
			// file drop
			document.ondragenter = function(e) {
				if (e.dataTransfer.types.includes("Files")) ffd.classList.add("filehover");
			}
			ffd.ondragover = function(e) {
				e.preventDefault();
			}
			ffd.ondrop = function(e) {
				if (e.dataTransfer.types.includes("Files")) {
					e.preventDefault();
					ffd.style.display = "none";
					let file = event.dataTransfer.files[0];
					readFile(file, function(data) {
						log('Succesfully read ROM file "' + file.name + '"');
						romName = file.name.split(".")[0];
						initFromData(data);
					});
				}
			}
			
			// load rom if specified
			if (queries["rom"]) {
				var romloc = "roms/" + queries["rom"];
				grab(romloc, "arraybuffer", function(data) {
					log("Succesfully fetched ROM from " + romloc);
					romName = queries["rom"].split("/").slice(-1)[0].split(".")[0];
					initFromData(data);
				}, function(error) {
					alert("Could not get rom at " + romloc + " (Error " + error + ")");
					ffd.style.display = "block";
				});
			} else {
				// prompt user to upload ROM file
				ffd.style.display = "block";
			}
		}
		script.onerror = function() {
			// core loading error
			document.body.removeChild(script);
			alert('Could not load specified core "' + core + '". Here is a list of available cores.');
			ffd.innerHTML = "<ul>" + aCoreList + "</ul>";
			ffd.style.display = "block";
		}
		document.body.appendChild(script);
	} else {
		// no core specified
		ffd.innerHTML = "<ul>" + aCoreList + "</ul>";
		ffd.style.display = "block";
	}
}, false);

// runs after emulator starts
function afterStart() {
	// remove loading text
	canvas.style.background = "none";
	adjustCanvasSize();
	
	// functions for export/import save buttons
	saveState.classList.remove("disabled");
	importState.classList.remove("disabled");
	
	saveState.onclick = function() {
		Module._cmd_save_state();
		loadState.classList.remove("disabled");
		exportState.classList.remove("disabled");
	}
	loadState.onclick = function() {
		Module._cmd_load_state();
	}
	exportState.onclick = function() {
		var a = document.createElement('a');
		a.style.display = 'none';
		a.download = "game-save-"+romName+"-"+dateTime.getFullYear().toString()+"-"+(dateTime.getMonth()+1).toString()+"-"+dateTime.getDate().toString()+"-"+dateTime.getHours().toString()+"-"+dateTime.getMinutes().toString() + ".state";
		a.href = URL.createObjectURL(new Blob([FS.readFile("/home/web_user/retroarch/userdata/states/rom.state")], {type: "application/octet-stream"}));
		document.body.appendChild(a);
		a.click();
		window.setTimeout(function() {
			document.body.removeChild(a);
			URL.revokeObjectURL(a.href);
		}, 2000);
	}
	importState.onclick = function() {
		var input = document.createElement("input");
		input.type = "file";
		input.accept = ".bin, .state, .save, .dat, .gam, .sav, application/*";
		input.onchange = function() {
			readFile(this.files[0], function(data) {
				FS.writeFile("/home/web_user/retroarch/userdata/states/rom.state", new Uint8Array(data));
				loadState.classList.remove("disabled");
				exportState.classList.remove("disabled");
			});
		}
		input.click();
	}
}

// prepare FS with bundle
function prepareBundle() {
	setStatus("Getting assets");
	fsBundleDirs = [['', 'assets'], ['/assets', 'menu_widgets'], ['/assets', 'ozone'], ['/assets/ozone', 'png'], ['/assets/ozone/png', 'dark'], ['/assets/ozone/png', 'sidebar'], ['/assets', 'xmb'], ['/assets/xmb', 'monochrome'], ['/assets/xmb/monochrome', 'png']]
	FS.createPath("/", "home/web_user/retroarch/bundle", true, true);
	for (var i = 0; i < fsBundleDirs.length; i++) {
		FS.createPath(baseFsBundleDir + fsBundleDirs[i][0], fsBundleDirs[i][1], true, true);
	}
	
	grab(bundleCdn + "bundle/indexedfiles.txt", "text", function(data) {
		fsBundleFiles = data.split("\n");
		for (let i = 0; i < fsBundleFiles.length; i++) {
			grab(bundleCdn + "bundle" + fsBundleFiles[i], "arraybuffer", function(data) {
				FS.writeFile(baseFsBundleDir + fsBundleFiles[i], new Uint8Array(data));
				if (i == fsBundleFiles.length - 1) {
					bundleReady = true;
					removeStatus("Getting assets");
				}
			});
		}
	}, function(error) {
		log("Failed to get asset bundle, skipping");
		bundleReady = true;
		removeStatus("Getting assets");
	});
}

// start
function initFromData(data) {
	window.onbeforeunload = function() { return true; }
	function waitForReady() {
		if (wasmReady && bundleReady) {
			setStatus("Waiting for emulator");
			log("Initializing with " + data.byteLength + " bytes of data");
			
			// prevent defaults for key presses
			document.addEventListener("keydown", function(e) {
				if (pdKeys.includes(e.which)) e.preventDefault();
			}, false);
			
			// rom
			FS.createDataFile("/", "rom.bin", new Uint8Array(data), true, false);
			
			// config
			var config = nulKeys + keybinds;
			FS.createPath("/", "home/web_user/retroarch/userdata", true, true);
			FS.writeFile("/home/web_user/retroarch/userdata/retroarch.cfg", config);
			
			// start
			Module["callMain"](Module["arguments"]);
			adjustCanvasSize();
			
			window.setTimeout(afterStart, 2000);
			
		} else {
			window.setTimeout(waitForReady, 1000);
		}
	}
	waitForReady();
}

var Module = {
	canvas: canvas,
	noInitialRun: true,
	arguments: ["/rom.bin", "--verbose"],
	onRuntimeInitialized: function() {
		wasmReady = true;
	},
	print: function(text) {
		log("stdout: " + text);
	},
	printErr: function(text) {
		log("stderr: " + text);
	}
};