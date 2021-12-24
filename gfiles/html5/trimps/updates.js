/*		Trimps
		Copyright (C) 2019 Zach Hood

		This program is free software: you can redistribute it and/or modify
		it under the terms of the GNU General Public License as published by
		the Free Software Foundation, either version 3 of the License, or
		(at your option) any later version.

		This program is distributed in the hope that it will be useful,
		but WITHOUT ANY WARRANTY; without even the implied warranty of
		MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
		GNU General Public License for more details.

		You should have received a copy of the GNU General Public License
		along with this program (if you are reading this on the original
		author's website, you can find a copy at
		<trimps.github.io/license.txt>). If not, see
		<http://www.gnu.org/licenses/>. */


var customUp;
var tooltipUpdateFunction = "";
var lastMousePos = [];
var lastTooltipTitle = "";
var onShift;
var openTooltip = null;

//"onmouseover="tooltip('*TOOLTIP_TITLE*', 'customText', event, '*TOOLTIP_TEXT*');" onmouseout="tooltip('hide')""
//tooltip('confirm', null, 'update', '*TEXT STRING*', '*FUNCTION()*', '*TIP TITLE*', '*BUTTON TEXT*')
function tooltip(what, isItIn, event, textString, attachFunction, numCheck, renameBtn, noHide, hideCancel, ignoreShift) { //Now 20% less menacing. Work in progress.
	if (!game.options.menu.bigPopups.enabled && (
		what == "The Improbability" ||
		(what == "Corruption" && getHighestLevelCleared() >= 199) ||
		(what == "The Spire" && getHighestLevelCleared() >= 219) ||
		(what == "The Magma" && getHighestLevelCleared() >= 249)
	)){
		return;
	} 
	checkAlert(what, isItIn);
	if (game.global.lockTooltip && event != 'update') return;
	if (game.global.lockTooltip && isItIn && event == 'update') return;
	var elem = document.getElementById("tooltipDiv");
	swapClass("tooltipExtra", "tooltipExtraNone", elem);
	document.getElementById('tipText').className = "";
	var ondisplay = null; // if non-null, called after the tooltip is displayed
	openTooltip = null;
	if (what == "hide"){
		elem.style.display = "none";
		tooltipUpdateFunction = "";
		onShift = null;
		return;
	}
	if (event != 'lock' && (event != 'update' || isItIn) && !game.options.menu.tooltips.enabled && !shiftPressed && what != "Well Fed" && what != 'Perk Preset' && what != 'Activate Portal' && !ignoreShift) {
		var whatU = what, isItInU = isItIn, eventU = event, textStringU = textString, attachFunctionU = attachFunction, numCheckU = numCheck, renameBtnU = renameBtn, noHideU = noHide;
		var newFunction = function () {
			tooltip(whatU, isItInU, eventU, textStringU, attachFunctionU, numCheckU, renameBtnU, noHideU);
		};
		onShift = newFunction;
		return;
	}
	if (event != "update" && event != "screenRead"){
		var whatU = what, isItInU = isItIn, eventU = event, textStringU = textString, attachFunctionU = attachFunction, numCheckU = numCheck, renameBtnU = renameBtn, noHideU = noHide;
		var newFunction = function () {
			tooltip(whatU, isItInU, eventU, textStringU, attachFunctionU, numCheckU, renameBtnU, noHideU);
		};
		tooltipUpdateFunction = newFunction;
	}
	var tooltipText;
	var costText = "";
	var toTip;
	var titleText;
	var tip2 = false;
	var noExtraCheck = false;
	if (isItIn !== null && isItIn != "maps" && isItIn != "customText" && isItIn != "dailyStack" && isItIn != "advMaps"){
		toTip = game[isItIn];
		toTip = toTip[what];
		if (typeof toTip === 'undefined') console.log(what);
		else {
			tooltipText = toTip.tooltip;
			if (typeof tooltipText === 'function') tooltipText = tooltipText();
			if (typeof toTip.cost !== 'undefined') costText = addTooltipPricing(toTip, what, isItIn);
			else if (what == "Hub") costText = "Purchase a Hut, House, Mansion, Hotel, Resort, or Gateway"

		}
	}
	if (isItIn == "advMaps"){
		var advTips = {
			Loot: "This slider allows you to fine tune the map Loot modifier. Moving this slider from left to right will guarantee more loot from the map, but increase the cost.",
			Size: "This slider allows you to fine tune the map Size modifier. Moving this slider from left to right will guarantee a smaller map, but increase the cost.",
			Difficulty: "This slider allows you to fine tune the map Difficulty modifier. Moving this slider from left to right will guarantee an easier map, but increase the cost.",
			get Biome(){
				var text = "<p>If you're looking to farm something specific, you can select the biome here. Anything other than random will increase the cost of the map.</p><ul>";
				text += "<li><b>Mountain</b> - Contains a lot of Metal</li><li><b>Forest</b> - A great place to find some Wood</li><li><b>Sea</b> - Just filled with food to catch</li><li><b>Depths</b> - Ancient Gem mines</li>";
				if (game.global.decayDone) text += "<li><b>Gardens</b> - 25% extra loot and a random assortment of resources</li>";
				if (game.global.farmlandsUnlocked) text += "<li><b>Farmlands</b> - 100% extra loot in Universe 2, 50% extra Herbs. Mimics Mountains on Z6, Forest on Z7, Sea on Z8, Depths at Z9, Gardens at Z10. Continues on rotating every World Zone."
				text += "</ul>";
				return text;
			},
			get Special_Modifier() {
				var text = "<p>Select a special modifier to add to your map from the drop-down below! You can only add one of these to each map. The following bonuses are currently available:</p><ul>"
				for (var item in mapSpecialModifierConfig){
					var bonusItem = mapSpecialModifierConfig[item];
					var unlocksAt = (game.global.universe == 2) ? bonusItem.unlocksAt2 : bonusItem.unlocksAt;
					if ((typeof unlocksAt === 'function' && !unlocksAt()) || unlocksAt == -1){
						continue;
					}
					else if (getHighestLevelCleared() + 1 < unlocksAt){
						text += "<li><b>Next modifier unlocks at Z" + unlocksAt + "</b></li>";
						break;
					}
					text += "<li><b>" + bonusItem.name + " (" + bonusItem.abv + ")</b> - " + bonusItem.description + "</li>";
				}
				return text;
			},
			Show_Hide_Map_Config: "Click this to collapse/expand the map configuration options.",
			Save_Map_Settings: "Click this to save your current map configuration settings to your currently selected preset. These settings will load by default every time you come in to the map chamber or select this preset.",
			Reset_Map_Settings: "Click this to reset all settings to their default positions. This will not clear your saved setting, which will still be loaded next time you enter the map chamber.",
			Extra_Zones: "<p>Create a map up to 10 Zones higher than your current Zone number. This map will gain +10% loot per extra level (compounding), and can drop Prestige upgrades higher than you could get from a world level map.</p><p>A green background indicates that you could afford a map at this Extra Zone amount with your selected Special Modifier and Perfect Sliders. A gold background indicates that you could afford that map with your selected Special Modifier and some combination of non-perfect sliders.</p><p>You can only use this setting when creating a max level map.</p>",
			Perfect_Sliders: "<p>This option takes all of the RNG out of map generation! If sliders are maxxed and the box is checked, you have a 100% chance to get a perfect roll on Loot, Size, and Difficulty.</p><p>You can only choose this setting if the sliders for Loot, Size, and Difficulty are at the max.</p>",
			Map_Preset: "You can save up to 5 different map configurations to switch between at will. The most recently selected setting will load each time you enter your map chamber."
		}
		if (what == "Special Modifier" && game.global.highestLevelCleared >= 149) {
			swapClass("tooltipExtra", "tooltipExtraLg", elem);
			renameBtn = "forceLeft";
		}
		noExtraCheck = true;
		tooltipText = advTips[what.replace(/ /g, '_').replace(/\//g, '_')];
	}
	if (isItIn == "dailyStack"){
		tooltipText = dailyModifiers[what].stackDesc(game.global.dailyChallenge[what].strength, game.global.dailyChallenge[what].stacks);
		costText = "";
		what = what[0].toUpperCase() + what.substr(1)
	}
	if (what == "Confirm Purchase"){
		if (attachFunction == "purchaseImport()" && !boneTemp.selectedImport) return;
		if (game.options.menu.boneAlerts.enabled == 0 && numCheck){
			eval(attachFunction);
			return;
		}
		var btnText = "Make Purchase";
		if (numCheck && game.global.b < numCheck){
			if (typeof kongregate === 'undefined') return;
			tooltipText = "You can't afford this bonus. Would you like to visit the shop?";
			attachFunction = "showPurchaseBones()";
			btnText = "Visit Shop";
		}
		else
		tooltipText = textString;
		costText += '<div class="maxCenter"><div id="confirmTooltipBtn" class="btn btn-info" onclick="' + attachFunction + '; cancelTooltip()">' + btnText + '</div><div class="btn btn-info" onclick="cancelTooltip()">Cancel</div></div>';
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "Trimps Info"){
		var kongMode = (document.getElementById('boneBtn') !== null);
		var text = '<div class="trimpsInfoPopup">Need help, found a bug or just want to talk about Trimps? Check out the <a href="https://www.reddit.com/r/trimps" target="_blank">/r/Trimps SubReddit</a>';
		if (kongMode) text += ' or the <a href="https://www.kongregate.com/forums/11405-trimps" target="_blank">Kongregate Forums</a>.<br/><br/>';
		else text +=' or come hang out in the new <a href="https://discord.gg/kSpNHte" target="_blank">Trimps Official Discord</a>!<br/><br/>';
		text += ' If you want to read about or discuss the finer details of Trimps mechanics, check out the <a href="https://trimps.wikia.com/wiki/Trimps_Wiki" target="_blank">community-created Trimps Wiki!</a><br/><br/>';
		if (kongMode) text += ' If you need to contact the developer for any reason, <a target="_blank" href="https://www.kongregate.com/accounts/Greensatellite/private_messages?focus=true">send a private message to GreenSatellite</a> on Kongregate.';
		else text += ' If you need to contact the developer for any reason, <a href="https://www.reddit.com/message/compose/?to=Brownprobe" target="_blank">click here to send a message on Reddit</a> or find Greensatellite in the Trimps Discord.<hr/><br/>' + "If you would like to make a donation to help support the development of Trimps, you can now do so with PayPal! If you want to contribute but can't afford a donation, you can still give back by joining the community and sharing your feedback or helping others. Thank you either way, you're awesome! <form id='donateForm' style='text-align: center' action='https://www.paypal.com/cgi-bin/webscr' method='post' target='_blank'><input type='hidden' name='cmd' value='_s-xclick'><input type='hidden' name='hosted_button_id' value='MGFEJS3VVJG6U'><input type='image' src='https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif' border='0' name='submit' alt='PayPal - The safer, easier way to pay online!'><img alt='' border='0' src='https://www.paypalobjects.com/en_US/i/scr/pixel.gif' width='1' height='1'></form>";
		text += '</div>';
		tooltipText = text;
		costText = '<div class="btn btn-info" onclick="cancelTooltip()">Close</div>';
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
		noExtraCheck = true;
	}
	if (what == "Fluffy"){
		if (event == 'update'){
			//clicked
			game.global.lockTooltip = true;
			elem.style.top = "25%";
			elem.style.left = "25%";
			swapClass('tooltipExtra', 'tooltipExtraLg', elem);
			var fluffyTip = Fluffy.tooltip(true);
			tooltipText = "<div id='fluffyTooltipTopContainer'>" + fluffyTip[0] + "</div>";
			tooltipText += "<div id='fluffyLevelBreakdownContainer' class='niceScroll'>" + fluffyTip[1] + "</div>";
			costText = '<div class="btn btn-danger btn-lg" onclick="cancelTooltip()">Close</div>';
			if (game.challenges.Nurture.boostsActive()){
				costText += "<span id='toggleCruffyTipBtn' class='btn btn-lg btn-primary' onclick='Fluffy.toggleCruffys()'>Show ";
				costText += (Fluffy.cruffysTipActive()) ? "Scruffy" : "Cruffys";
				costText += " Info</span>"
			}
			costText += "<span onclick='Fluffy.pat()' id='fluffyPatBtn' style='display: " + ((Fluffy.cruffysTipActive()) ? "none" : "inline-block") + "' class='btn btn-lg btn-warning'>Pat</span>";
			openTooltip = "Fluffy";
			setTimeout(Fluffy.refreshTooltip, 1000);
			ondisplay = function(){
				verticalCenterTooltip(false, true);
			};
		}
		else {
			//mouseover
			tooltipText = Fluffy.tooltip();
			costText = "Click for more detailed info"
		}
		if (Fluffy.cruffysTipActive()) what = "<b>IT'S CRUFFYS</b>";
		else what = Fluffy.getName();
	}
	if (what == "Scryer Formation"){
		tooltipText = "<p>Trimps lose half of their attack, health and block but gain 2x resources from loot (not including Helium) and have a chance to find Dark Essence above Z180 in the world. This formation must be active for the entire fight to receive any bonus from enemies, and must be active for the entire map to earn a bonus from a Cache.</p>";
		tooltipText += getExtraScryerText(4);
		tooltipText += "<br/>(Hotkeys: S or 5)";
		costText = "";
	}
	if (what == "First Amalgamator"){
		tooltipText = "<p><b>You found your first Amalgamator! You can view this tooltip again and track how many Amalgamators you currently have under 'Jobs'.</b></p>";
		tooltipText += game.jobs.Amalgamator.tooltip;
		costText = "<div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='cancelTooltip()'>Thanks for the help, tooltip, but you can go now.</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
		noExtraCheck = true;
		ondisplay = function () { verticalCenterTooltip() };
	}
	if (what == "Empowerments of Nature"){
		var active = getEmpowerment();
		if (!active) return;
		var emp = game.empowerments[active];
		if (typeof emp.description === 'undefined') return;
		var lvlsLeft = ((5 - ((game.global.world - 1) % 5)) + (game.global.world - 1)) + 1;
		tooltipText = "<p>The " + active + " Empowerment is currently active!</p><p>" + emp.description() + "</p><p>This Empowerment will end on Z" + lvlsLeft;
		if (game.global.challengeActive !== "Eradicated"){
			tooltipText += ", at which point you'll be able to fight a " + getEmpowerment(null, true) + " enemy to earn";
			var tokCount = rewardToken(emp, true, lvlsLeft);
			tooltipText += " " + prettify(tokCount) + " Token" + needAnS(tokCount) + " of " + active + ".</p>";
		}
		else tooltipText += ".</p>";
		costText = "";

	}
	if (what == "Finish Daily"){
		var reward = game.challenges.Daily.getCurrentReward();
		tooltipText = "Clicking <b>Finish</b> below will end your daily challenge and you will be unable to attempt it again. You will earn <b>" + prettify(reward) + " extra " + heliumOrRadon() + "!</b>";
		costText = '<div class="maxCenter"><div id="confirmTooltipBtn" class="btn btn-info" onclick="abandonChallenge(); cancelTooltip()">Finish</div><div class="btn btn-danger" onclick="cancelTooltip()">Cancel</div></div>';
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "Switch Daily"){
		var daysUntilReset = Math.floor(7 + textString);
		tooltipText = "Click to view " + ((textString == 0) ? "today" : dayOfWeek(getDailyTimeString(textString, false, true))) + "s challenge, which resets in less than " + daysUntilReset + " day" + ((daysUntilReset == 1) ? "" : "s") + ".";
		costText = "";
	}
	if (what == "Decay"){
		var challenge = game.challenges.Decay;
		if (game.global.challengeActive == "Melt"){
			challenge = game.challenges.Melt;
			what = "Melt";
		}
		var decayedAmt = ((1 - Math.pow(challenge.decayValue, challenge.stacks)) * 100).toFixed(2);
		tooltipText = "Things are quickly becoming tougher. Gathering, looting, and Trimp attack are reduced by " + decayedAmt + "%.";
		costText = "";
	}
	if (what == "Heirloom"){
		//attachFunction == location, numCheck == index
		tooltipUpdateFunction = "";
		tooltipText = displaySelectedHeirloom(false, 0, true, numCheck, attachFunction);
		costText = "";
		renameBtn = what;
		what = "";
		if (getSelectedHeirloom(numCheck, attachFunction).rarity == 8){
			ondisplay = function() {
				document.getElementById('tooltipHeirloomIcon').style.animationDelay = "-" + ((new Date().getTime() / 1000) % 30).toFixed(1) + "s";
			}
		}
		swapClass("tooltipExtra", "tooltipExtraHeirloom", elem);
		noExtraCheck = true;
	}
	if (what == "Respec"){
		tooltipText = "You can respec your perks once per portal. Clicking cancel after clicking this button will not consume your respec.";
		costText = "";
	}
	if (what == "Well Fed"){
		var tBonus = 50;
		if (game.talents.turkimp2.purchased) tBonus = 100;
		else if (game.talents.turkimp2.purchased) tBonus = 75;
		tooltipText = "That Turkimp was delicious, and you have leftovers. If you set yourself to gather Food, Wood, or Metal while this buff is active, you can share with your workers to increase their gather speed by " + tBonus + "%";
		costText = "";
	}
	if (what == "Geneticistassist"){
		tooltipText = "I'm your Geneticistassist! I'll hire and fire Geneticists until your total breed time is as close as possible to the target time you choose. I will fire a Farmer, Lumberjack, or Miner at random if there aren't enough workspaces, I will never spend more than 1% of your food on a Geneticist, and you can customize my target time options in Settings <b>or by holding Ctrl and clicking me</b>. I have uploaded myself to your portal and will never leave you.";
		costText = "";
	}
	if (what == "Welcome"){
		tooltipText = "Welcome to Trimps! This game saves using Local Storage in your browser. Clearing your cookies or browser settings will cause your save to disappear! Please make sure you regularly back up your save file by either using the 'Export' button in the bar below or the 'Online Saving' option under 'Settings'.<br/><br/><b>Chrome and Firefox are currently the only fully supported browsers.</b><br/><br/>";
		if (document.getElementById('boneBtn') !== null){
			tooltipText += "<b style='color: red'>Notice: Did you expect to see your save here?</b><br/>If this is your first time playing since November 13th 2017, check <a target='_blank' href='http://trimps.github.io'>http://trimps.github.io</a> (make sure you go to http, not https), and see if it's there. For more information, see <a target='_blank' href='http://www.kongregate.com/forums/11406-general-discussion/topics/941201-if-your-save-is-missing-after-november-13th-click-here?page=1#posts-11719541'>This Forum Thread</a>.<br/><br/>";
		}
		tooltipText += "<b>Would you like to enable online saving before you start?</b>";
		game.global.lockTooltip = true;
		costText = "<div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='cancelTooltip(); toggleSetting(\"usePlayFab\");'>Enable Online Saving</div><div class='btn btn-danger' onclick='cancelTooltip()'>Don't Enable</div></div>";
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "Trustworthy Trimps"){	
		if (usingScreenReader){
			setTimeout(function(){document.getElementById('screenReaderTooltip').innerHTML = textString;}, 2000);
			
			return;
		}
		tooltipText = textString;
		game.global.lockTooltip = true;
		costText = "<div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='cancelTooltip()'>Sweet, thanks.</div></div>";
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "Unequip Heirloom"){
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
		costText = "<div class='maxCenter'>";
		tooltipText = "<p>You have no more room to carry another Heirloom, ";
		if (game.global.maxCarriedHeirlooms > game.heirlooms.values.length){
			tooltipText += "and you've already purchased the maximum amount of slots.</p><p>Would you like to leave this Heirloom equipped "			
		}
		else if (game.global.nullifium < getNextCarriedCost()){
			tooltipText += "and don't have enough Nullifium to purchase another Carried slot.</p><p>Would you like to leave this Heirloom equipped "
		}
		else {
			tooltipText += "but you do have enough Nullifium to purchase another Carried slot!</p><p>Would you like to purchase another Carried slot, leave this Heirloom equipped, ";
			costText += "<div class='btn btn-success' onclick='cancelTooltip(); addCarried(true); unequipHeirloom();'>Buy a Slot (" + getNextCarriedCost() + " Nu)</div>";
		}
		tooltipText += "or put it in Temporary Storage? <b>If you use your Portal while this Heirloom is in Temporary Storage, it will be recycled!</b></p>";
		costText += "<div class='btn btn-info' id='confirmTooltipBtn' onclick='cancelTooltip()'>Leave it equipped</div><div class='btn btn-danger' onclick='cancelTooltip(); unequipHeirloom(null, \"heirloomsExtra\");'>Place in Temporary</div></div>";
	}
	if (what == "Configure AutoStructure"){
		tooltipText = "<p>Here you can choose which structures will be automatically purchased when AutoStructure is toggled on. Check a box to enable the automatic purchasing of that structure, set the dropdown to specify the cost-to-resource % that the structure should be purchased below, and set the 'Up To:' box to the maximum number of that structure you'd like purchased <b>(0&nbsp;for&nbsp;no&nbsp;limit)</b>. For example, setting the dropdown to 10% and the 'Up To:' box to 50 for 'House' will cause a House to be automatically purchased whenever the costs of the next house are less than 10% of your Food, Metal, and Wood, as long as you have less than 50 houses. \'W\' for Gigastation is the required minimum amount of Warpstations before a Gigastation is purchased.</p><table id='autoPurchaseConfigTable'><tbody><tr>";
		var count = 0;
		var setting, selectedPerc, checkbox, options;
		var settingGroup = getAutoStructureSetting();
		for (var item in game.buildings){
			var building = game.buildings[item];
			if (building.blockU2 && game.global.universe == 2) continue;
			if (building.blockU1 && game.global.universe == 1) continue;
			if (item == "Laboratory" && game.global.challengeActive != "Nurture") continue;
			if (!building.AP) continue;
			if (count != 0 && count % 2 == 0) tooltipText += "</tr><tr>";
			setting = settingGroup[item];
			selectedPerc = (setting) ? setting.value : 0.1;		
			checkbox = buildNiceCheckbox('structConfig' + item, 'autoCheckbox', (setting && setting.enabled));
			options = "<option value='0.1'" + ((selectedPerc == 0.1) ? " selected" : "") + ">0.1%</option><option value='1'" + ((selectedPerc == 1) ? " selected" : "") + ">1%</option><option value='5'" + ((selectedPerc == 5) ? " selected" : "") + ">5%</option><option value='10'" + ((selectedPerc == 10) ? " selected" : "") + ">10%</option><option value='25'" + ((selectedPerc == 25) ? " selected" : "") + ">25%</option><option value='50'" + ((selectedPerc == 50) ? " selected" : "") + ">50%</option><option value='99'" + ((selectedPerc == 99) ? " selected" : "") + ">99%</option>";
			var id = "structSelect" + item;
			tooltipText += "<td><div class='row'><div class='col-xs-5' style='padding-right: 5px'>" + checkbox + "&nbsp;&nbsp;<span>" + item + "</span></div><div style='text-align: center; padding-left: 0px;' class='col-xs-2'><select class='structSelect' id='" + id + "'>" + options + "</select></div><div class='col-xs-5 lowPad' style='text-align: right'>Up To: <input class='structConfigQuantity' id='structQuant" + item + "' type='number'  value='" + ((setting && setting.buyMax) ? setting.buyMax : 0 ) + "'/></div></div></td>";
			count++;
		}
		tooltipText += "</tr><tr>";
		if (game.global.universe == 1){
			tooltipText += "<tr>";
			//stupid gigas making this all spaghetti
			setting = settingGroup.Gigastation;
			selectedPerc = (setting) ? setting.value : 0.1;		
			checkbox = buildNiceCheckbox('structConfigGigastation', 'autoCheckbox', (setting && setting.enabled));
			options = "<option value='0.1'" + ((selectedPerc == 0.1) ? " selected" : "") + ">0.1%</option><option value='1'" + ((selectedPerc == 1) ? " selected" : "") + ">1%</option><option value='5'" + ((selectedPerc == 5) ? " selected" : "") + ">5%</option><option value='10'" + ((selectedPerc == 10) ? " selected" : "") + ">10%</option><option value='25'" + ((selectedPerc == 25) ? " selected" : "") + ">25%</option><option value='50'" + ((selectedPerc == 50) ? " selected" : "") + ">50%</option><option value='99'" + ((selectedPerc == 99) ? " selected" : "") + ">99%</option>";
			tooltipText += "<td><div class='row'><div class='col-xs-5' style='padding-right: 5px'>" + checkbox + "&nbsp;&nbsp;<span>Gigastation</span></div><div style='text-align: center; padding-left: 0px;' class='col-xs-2'><select class='structSelect' id='structSelectGigastation'>" + options + "</select></div><div class='col-xs-5 lowPad' style='text-align: right'>At W: <input class='structConfigQuantity' id='structQuantGigastation' type='number'  value='" + ((setting && setting.buyMax) ? setting.buyMax : 0 ) + "'/></div></div></td>";
			if (getHighestLevelCleared() >= 229){
				var nurserySetting = (typeof settingGroup.NurseryZones !== 'undefined') ? settingGroup.NurseryZones : 1;
				tooltipText += "<td><div class='row'><div class='col-xs-12' style='text-align: right; padding-right: 5px;'>Don't buy Nurseries Until Z: <input style='width: 20.8%; margin-right: 4%;' class='structConfigQuantity' id='structZoneNursery' type='number' value='" + nurserySetting + "'></div></div></td>";
			}
			tooltipText += "</tr>";
		}
		options = "<option value='0'>Apply Percent to All</option><option value='0.1'>0.1%</option><option value='1'>1%</option><option value='5'>5%</option><option value='10'>10%</option><option value='25'>25%</option><option value='50'>50%</option><option value='99'>99%</option>";
		tooltipText += "<tr style='text-align: center'>";
		tooltipText += "<td><span data-nexton='true' onclick='toggleAllAutoStructures(this)' class='btn colorPrimary btn-md toggleAllBtn'>Toggle All Structures On</span></td>";
		tooltipText += "<td><select class='toggleAllBtn' id='autoStructureAllPctSelect' onchange='setAllAutoStructurePercent(this)'>" + options + "</select></td>";

		tooltipText += "</tr></tbody></table>";
		costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info btn-lg' onclick='saveAutoStructureConfig()'>Apply</div><div class='btn-lg btn btn-danger' onclick='cancelTooltip()'>Cancel</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
		ondisplay = function(){
			verticalCenterTooltip(true);
		};
	}
	if (what == "AutoStructure"){
		tooltipText = "<p>Your mastery of this world has enabled your Foremen to handle fairly complicated orders regarding which buildings should be built. Click the cog icon on the right side of this button to tell your Foremen what you want and when you want it, then click the left side of the button to tell them to start or stop.</p>";
		costText = "";
	}
	if (what == "Configure AutoEquip"){
		tooltipText = "<p>Welcome to AutoEquip! <span id='autoTooltipHelpBtn' style='font-size: 0.6vw;' class='btn btn-md btn-info' onclick='toggleAutoTooltipHelp()'>Help</span></p><div id='autoTooltipHelpDiv' style='display: none'><p>Here you can choose which equipment will be automatically purchased when AutoEquip is toggled on. Check a box to enable the automatic purchasing of that equipment type, set the dropdown to specify the cost-to-resource % that the equipment should be purchased below, and set the 'Up To:' box to the maximum number of that equipment you'd like purchased (0 for no limit).</p><p>For example, setting the dropdown to 10% and the 'Up To:' box to 50 for 'Shield' will cause a Shield to be automatically purchased whenever the cost of the next Shield is less than 10% of your Wood, as long as you have less than 50 Shields.</p></div>";
		tooltipText += "<table id='autoPurchaseConfigTable'><tbody><tr>";
		var count = 0;
		var setting, selectedPerc, checkbox, options, type;
		var settingGroup = getAutoEquipSetting();
		for (var item in game.equipment){
			var equipment = game.equipment[item];
			if (count != 0 && count % 2 == 0) tooltipText += "</tr><tr>";
			setting = settingGroup[item];
			selectedPerc = (setting) ? setting.value : 0.1;
			type = ((equipment.health) ? "Armor" : "Wep");
			checkbox = buildNiceCheckbox('equipConfig' + item, 'autoCheckbox checkbox' + type, (setting && setting.enabled));
			options = "<option value='0.1'" + ((selectedPerc == 0.1) ? " selected" : "") + ">0.1%</option><option value='1'" + ((selectedPerc == 1) ? " selected" : "") + ">1%</option><option value='5'" + ((selectedPerc == 5) ? " selected" : "") + ">5%</option><option value='10'" + ((selectedPerc == 10) ? " selected" : "") + ">10%</option><option value='25'" + ((selectedPerc == 25) ? " selected" : "") + ">25%</option><option value='50'" + ((selectedPerc == 50) ? " selected" : "") + ">50%</option><option value='99'" + ((selectedPerc == 99) ? " selected" : "") + ">99%</option>";
			tooltipText += "<td><div class='row'><div class='col-xs-6' style='padding-right: 5px'>" + checkbox + "&nbsp;&nbsp;<span>" + item + "</span></div><div style='text-align: center; padding-left: 0px;' class='col-xs-2'><select class='equipSelect" + type + "' id='equipSelect" + item + "'>" + options + "</select></div><div class='col-xs-4 lowPad' style='text-align: right'>Up To: <input class='equipConfigQuantity' id='equipQuant" + item + "' type='number'  value='" + ((setting && setting.buyMax) ? setting.buyMax : 0 ) + "'/></div></div></td>";
			count++;
		}
		tooltipText += "</tr><tr><td></td></tr></tbody></table>";

		options = "<option value='0'>Apply Percent to All</option><option value='0.1'>0.1%</option><option value='1'>1%</option><option value='5'>5%</option><option value='10'>10%</option><option value='25'>25%</option><option value='50'>50%</option><option value='99'>99%</option>";
		tooltipText += "<table id='autoEquipMiscTable'><tbody><tr>";
		tooltipText += "<td><span data-nexton='true' onclick='uncheckAutoEquip(\"Armor\", this)' class='toggleAllBtn btn colorPrimary btn-md'>Toggle All Armor On</span></td>";
		tooltipText += "<td><select class='toggleAllBtn' onchange='setAllAutoEquipPercent(\"Armor\", this)'>" + options + "</select></td>";
		var highestTierOn = (settingGroup.highestTier === true);
		tooltipText += "<td><span data-on='" + (highestTierOn) + "' onclick='toggleAutoEquipHighestTier(this)' id='highestTierOnlyBtn' class='toggleAllBtn btn color" + ((highestTierOn) ? "Success" : "Danger") + " btn-md'>Only Buy From Highest Tier" + ((highestTierOn) ? " On" : " Off") + "</span></td>";
		tooltipText += "<td><span data-nexton='true' onclick='uncheckAutoEquip(\"Wep\", this)' class='toggleAllBtn btn colorPrimary btn-md'>Toggle All Weapons On</span></td>";
		tooltipText += "<td><select class='toggleAllBtn' onchange='setAllAutoEquipPercent(\"Wep\", this)'>" + options + "</select></td>";
		tooltipText += "</tr></tbody></table>";

		costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-lg btn-info' onclick='saveAutoEquipConfig()'>Apply</div><div class='btn btn-lg btn-danger' onclick='cancelTooltip()'>Cancel</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "25%";
		elem.style.top = "25%";
		ondisplay = function(){
			verticalCenterTooltip(false, true);
		};
	}
	if (what == "AutoEquip"){
		tooltipText = "<p>The Auspicious Presence has blessed your Trimps with the ability to automatically upgrade their own equipment! Click the cog icon on the right side of this button to tell your Trimps what they should upgrade and when to do it, then click the left side of the button to tell them to start or stop.</p>";
		costText = "";
	}
	if (what == "Configure Generator State"){
		geneMenuOpen = true;
		elem = document.getElementById('tooltipDiv2');
		tip2 = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
		tooltipText = "<div style='padding: 1.5vw;'><div style='color: red; font-size: 1.1em; text-align: center;' id='genStateConfigError'></div>"
		tooltipText += "<div id='genStateConfigTooltip'>" + getGenStateConfigTooltip() + "</div>";
		costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn-lg btn btn-info' onclick='saveGenStateConfig()'>Apply</div><div class='btn btn-lg btn-danger' onclick='cancelTooltip()'>Cancel</div></div>";
	}
	if (what == "Rename SA Preset"){
		what += " " + textString;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
		tooltipText = autoBattle.renamePresetTooltip(textString);
		costText = "<div class='maxCenter'><div id='confirmTooltipBtn' onclick='autoBattle.savePresetName(" + textString + ")' class='btn-lg btn autoItemEquipped'>Save</div><div class='btn btn-lg autoItemHide' onclick='autoBattle.popup(false,false,false,true);'>Cancel</div>";
	}
	if (what == "Configure AutoJobs"){
		tooltipText = "<div style='color: red; font-size: 1.1em; text-align: center;' id='autoJobsError'></div><p>Welcome to AutoJobs! <span id='autoTooltipHelpBtn' role='button' style='font-size: 0.6vw;' class='btn btn-md btn-info' onclick='toggleAutoTooltipHelp()'>Help</span></p><div id='autoTooltipHelpDiv' style='display: none'><p>The left side of this window is dedicated to jobs that are limited more by workspaces than resources. 1:1:1:1 will purchase all 4 of these ratio-based jobs evenly, and the ratio refers to the amount of workspaces you wish to dedicate to each job. You can use any number larger than 0. Ratio-based jobs will be purchased once at the end of every Zone AND once every 30 seconds, but not more often than once every 2 seconds.</p><p>The right side of this window is dedicated to jobs limited more by resources than workspaces. Set the dropdown to the percentage of resources that you'd like to be spent on each job, and add a max amount if you wish (0 for unlimited). Percentage-based jobs are purchased once every 2 seconds.</p></div><table id='autoStructureConfigTable' style='font-size: 1.1vw;'><tbody>";
		var percentJobs = ["Explorer"];
		if (game.global.universe == 1){
			if (game.global.highestLevelCleared >= 229)	percentJobs.push("Magmamancer");
			percentJobs.push("Trainer");
		}
		if (game.global.universe == 2 && game.global.highestRadonLevelCleared > 29) percentJobs.push("Meteorologist");
		if (game.global.universe == 2 && game.global.highestRadonLevelCleared > 49) percentJobs.push("Worshipper");
		var ratioJobs = ["Farmer", "Lumberjack", "Miner", "Scientist"];
		var count = 0;
		var sciMax = 1;
		var settingGroup = getAutoJobsSetting();
		for (var x = 0; x < ratioJobs.length; x++){
			tooltipText += "<tr>";
			var item = ratioJobs[x];
			var setting = settingGroup[item];
			var selectedPerc = (setting) ? setting.value : 0.1;
			var max;	
			var checkbox = buildNiceCheckbox('autoJobCheckbox' + item, 'autoCheckbox', (setting && setting.enabled));
			tooltipText += "<td style='width: 40%'><div class='row'><div class='col-xs-6' style='padding-right: 5px'>" + checkbox + "&nbsp;&nbsp;<span>" + item + "</span></div><div class='col-xs-6 lowPad' style='text-align: right'>Ratio: <input class='jobConfigQuantity' id='autoJobQuant" + item + "' type='number'  value='" + ((setting && setting.ratio) ? setting.ratio : 1 ) + "'/></div></div>"
			if (ratioJobs[x] == "Scientist"){
				max = ((setting && setting.buyMax) ? setting.buyMax : 0 );
				if (max > 1e4) max = max.toExponential().replace('+', '');
				sciMax = max;
				if (percentJobs.length < 4) tooltipText += "</td><td style='width: 60%'><div class='row' style='width: 50%; border: 0; text-align: left;'><span style='padding-left: 0.4vw'>&nbsp;</span>Up To: <input class='jobConfigQuantity' id='autoJobQuant" + item + "' value='" + prettify(max) + "'/></div></td>"
			}
			else tooltipText += "</td>";
			if (percentJobs.length > x){
				item = percentJobs[x];
				setting = settingGroup[item];
				selectedPerc = (setting) ? setting.value : 0.1;
				max = ((setting && setting.buyMax) ? setting.buyMax : 0 );
				if (max > 1e4) max = max.toExponential().replace('+', '');	
				checkbox = buildNiceCheckbox('autoJobCheckbox' + item, 'autoCheckbox', (setting && setting.enabled));	
				var options = "<option value='0.1'" + ((selectedPerc == 0.001) ? " selected" : "") + ">0.1%</option><option value='1'" + ((selectedPerc == .01) ? " selected" : "") + ">1%</option><option value='5'" + ((selectedPerc == .05) ? " selected" : "") + ">5%</option><option value='10'" + ((selectedPerc == .10) ? " selected" : "") + ">10%</option><option value='25'" + ((selectedPerc == .25) ? " selected" : "") + ">25%</option><option value='50'" + ((selectedPerc == .50) ? " selected" : "") + ">50%</option><option value='99'" + ((selectedPerc == .99) ? " selected" : "") + ">99%</option>";
				tooltipText += "<td style='width: 60%'><div class='row'><div class='col-xs-5' style='padding-right: 5px'>" + checkbox + "&nbsp;&nbsp;<span>" + item + "</span></div><div style='text-align: center; padding-left: 0px;' class='col-xs-2'><select  id='autoJobSelect" + item + "'>" + options + "</select></div><div class='col-xs-5 lowPad' style='text-align: right'>Up To: <input class='jobConfigQuantity' id='autoJobQuant" + item + "'  value='" + prettify(max) + "'/></div></div></td></tr>";	
			}
		}
		if (percentJobs.length >= 4) tooltipText += "<tr><td style='width: 40%'><div class='row'><div class='col-xs-6' style='padding-right: 5px'>&nbsp;</div><div class='col-xs-6 lowPad' style='text-align: right'>Up To: <input class='jobConfigQuantity' id='autoJobQuantScientist2' value='" + prettify(sciMax) + "'></div></div></td><td style='width: 60%'>&nbsp;</td></tr>";
		tooltipText += "<tr><td style='width: 40%'><div class='col-xs-7' style='padding-right: 5px'>Gather on Portal:</div><div class='col-xs-5 lowPad' style='text-align: right'><select style='width: 100%' id='autoJobSelfGather'><option value='0'>Nothing</option>";
		var values = ['Food', 'Wood', 'Metal', 'Science'];
		for (var x = 0; x < values.length; x++){
			tooltipText += "<option" + ((settingGroup.portalGather && settingGroup.portalGather == values[x].toLowerCase()) ? " selected='selected'" : "") + " value='" + values[x].toLowerCase() + "'>" + values[x] + "</option>";
		}
		tooltipText += "</select></div></td></tr>";
		tooltipText += "</tbody></table>";
		costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn-lg btn btn-info' onclick='saveAutoJobsConfig()'>Apply</div><div class='btn btn-lg btn-danger' onclick='cancelTooltip()'>Cancel</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
		ondisplay = function(){
			verticalCenterTooltip(true);
		};
	}
	if (what == "Archaeology Automator" && !isItIn){
		tooltipText = game.challenges.Archaeology.automatorTooltip();
		costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn-lg btn btn-info' onclick='game.challenges.Archaeology.saveAutomator()'>Apply</div><div class='btn btn-lg btn-danger' onclick='cancelTooltip()'>Cancel</div><div class='btn btn-lg btn-" + ((game.challenges.Archaeology.pauseAuto) ? 'primary' : 'warning') + "' onclick='game.challenges.Archaeology.pauseAuto = !game.challenges.Archaeology.pauseAuto; this.className = \"btn btn-lg btn-\" + ((game.challenges.Archaeology.pauseAuto) ? \"primary\" : \"warning\"); this.innerHTML = ((game.challenges.Archaeology.pauseAuto) ? \"Unpause Automator\" : \"Pause Automator\");'>" + ((game.challenges.Archaeology.pauseAuto) ? "Unpause" : "Pause") + " Automator</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
		ondisplay = function(){
			verticalCenterTooltip(true);
		};
	}
	if (what == "AutoJobs"){
		tooltipText = "<p>Your continued mastery of this world has enabled you to set rules for automatic job allocation. Click the cog icon on the right side of this button to tell your Human Resourceimps what you want and when you want it, then click the left side of the button to tell them to start or stop.</p>";
		costText = "";
	}
	if (what == "AutoGold"){
		var heName = heliumOrRadon();
		var voidHeName = (game.global.universe == 2) ? "Voidon" : "Voidlium";
		tooltipText = '<p>Thanks to your brilliant Scientists, you can designate Golden Upgrades to be purchased automatically! Toggle between: </p><p><b>AutoGold Off</b> when you\'re not feeling particularly trusting.</p><p><b>AutoGold ' + heName + ' (' + game.goldenUpgrades.Helium.purchasedAt.length + '/' + Math.round(game.goldenUpgrades.Helium.currentBonus * 100) + '%)</b> when you\'re looking to boost your Perk game. 4/5 Trimps agree that this will increase your overall ' + heliumOrRadon() + ' earned, though none of the 5 really understood the question.</p><p><b>AutoGold Battle (' + game.goldenUpgrades.Battle.purchasedAt.length + '/' + Math.round(game.goldenUpgrades.Battle.currentBonus * 100) + '%)</b> if your Trimps have a tendency to slack off when you turn your back.</p>';
		tooltipText += '<p><b>AutoGold Void (' + game.goldenUpgrades.Void.purchasedAt.length + '/' + Math.round(game.goldenUpgrades.Void.currentBonus * 100) + '%)</b> which comes in 2 different flavors';
		if (getTotalPortals() == 0) tooltipText += ", but you can't find Void Maps until you've found the Portal Device at least once, so you can't use them.</p>";
		else tooltipText += ':<br/><b>' + voidHeName + '</b> - Will entrust your Scientists with purchasing as many Golden Voids as possible (to reach 72%) before switching to Golden ' + heName + ', or...<br/><b>Voidtle</b> - Where your Scientists will again attempt to buy as many Golden Voids as possible (to reach 72%), but will instead switch to Golden Battle afterwards.</p>';
		if (game.global.canGuString) tooltipText += "<p><b>Custom AutoGold</b> - For the advanced Trimp commander/archaeologist who wants even more control. <b>Ctrl Click to customize your string</b></p>"
		tooltipText += '<p>Please allow 4 seconds for Trimp retraining after clicking this button before any Golden Upgrades are automatically purchased, and don\'t forget to frequently thank your scientists! Seriously, they get moody.</p>';
		costText = "";
	}
	if (what == "Unliving"){
		var stacks = game.challenges.Life.stacks;
		var mult = game.challenges.Life.getHealthMult(true);
		if (stacks > 130) tooltipText = "Your Trimps are looking quite dead, which is very healthy in this dimension. You're doing a great job!";
		else if (stacks > 75) tooltipText = "Your Trimps are starting to look more lively and slow down, but at least they're still fairly pale.";
		else if (stacks > 30) tooltipText = "The Bad Guys in this dimension seem to be way more dead than your Trimps!";
		else tooltipText = "Your Trimps look perfectly normal and healthy now, which is not what you want in this dimension.";
		tooltipText += " <b>Trimp attack and health increased by " + mult + ".</b>";
		costText = "";
	}
	if (what == "AutoGolden Unlocked"){
		tooltipText = "<p>Your Trimps have extracted and processed hundreds of Golden Upgrades by now, and though you're still nervous to leave things completely to them, you figure they can probably handle doing this on their own as well. You find the nearest Trimp and ask if he could handle buying Golden Upgrades on his own, as long as you told him which ones to buy. You can tell by the puddle of drool rapidly gaining mass at his feet that this is going to take either magic or a lot of hard work.</p><p>You can't find any magic anywhere, so you decide to found Trimp University, a school dedicated to teaching Trimps how to extract the might of Golden Upgrades without any assistance. Weeks go by while you and your Trimps work tirelessly to set up the University, choosing only the finest building materials and hiring only the most renowned Foremen to draw the plans. Just as you're finishing up, a Scientist stops by, sees what you're doing, and offers to just handle the Golden Upgrades instead. Probably should have just asked one of them first.</p><p><b>You have unlocked AutoGolden!</b></p>";
		costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='cancelTooltip()'>Close</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";

	}
	if (what == "Poisoned"){
		tooltipText = "This enemy is harmed by the Empowerment of Poison, and is taking " + prettify(game.empowerments.Poison.getDamage()) + " extra damage per turn.";
		costText = "";
	}
	if (what == "Chilled"){
		tooltipText = "This enemy has been chilled by the Empowerment of Ice, is taking " + prettify(game.empowerments.Ice.getDamageModifier() * 100) + "% more damage, and is dealing " + prettify((1 - game.empowerments.Ice.getCombatModifier()) * 100) + "% less damage with each normal attack." + game.empowerments.Ice.overkillDesc();
		costText = "";
	}
	if (what == "Breezy"){
		var heliumText = (!game.global.mapsActive)? "increasing all Helium gained by " + prettify(game.empowerments.Wind.getCombatModifier(true) * 100) + "% and all other" : "increasing all non-Helium ";
		tooltipText = "There is a rather large amount of Wind swelling around this enemy, " + heliumText + " resources by " + prettify(game.empowerments.Wind.getCombatModifier() * 100) + "%.";
		costText = "";
	}
	if (what == "Perk Preset"){
		if (textString == "Save"){
			what = "Save Perk Preset";
			tooltipText = "Click to save your current perk loadout to the selected preset";
		}
		else if (textString == "Rename"){
			what = "Rename Perk Preset";
			tooltipText = "Click to set a name for your currently selected perk preset";
		}
		else if (textString == "Load"){
			what = "Load Perk Preset";
			tooltipText = "Click to load your currently selected perk preset.";
			if (!game.global.respecActive) tooltipText += " <p class='red'>You must have your Respec active to load a preset!</p>";
		}
		else if (textString == "Import"){
			what = "Import Perk Preset";
			tooltipText = "Click to import a perk setup from a text string";
		}
		else if (textString == "Export"){
			what = "Export Perk Setup";
			tooltipText = "Click to export a copy of your current perk setup to share with friends, or to save and import later!"
		}
		else if (textString > 0 && textString <= 3){
			var presetGroup = (portalUniverse == 2) ? game.global.perkPresetU2 : game.global.perkPresetU1;
			var preset = presetGroup["perkPreset" + textString];
			if (typeof preset === 'undefined') return;
			what = (preset.Name) ? "Preset: " + preset.Name : "Preset " + textString;
			if (isObjectEmpty(preset)){
				tooltipText = "<span class='red'>This Preset slot is empty!</span> Select this slot and then click 'Save' to save your current Perk configuration to this slot. You'll be able to load this configuration back whenever you want, as long as you have your Respec active.";
			}
			else{
				tooltipText = "<p style='font-weight: bold'>This Preset holds:</p>";
				var count = 0;
				for (var item in preset){
					if (item == "Name") continue;
					tooltipText += (count > 0) ? ", " : "";
					tooltipText += '<b>' + item.replace('_', '&nbsp;') + ":</b>&nbsp;" + preset[item];
					count++;
				}
			}
		}
	}
	if (what == "Rename Preset"){
		what == "Rename Preset " + selectedPreset;
		var presetGroup = (portalUniverse == 2) ? game.global.perkPresetU2 : game.global.perkPresetU1;
		tooltipText = "Type a name below for your Perk Preset! This name will show up on the Preset bar and make it easy to identify which Preset is which."
		if (textString) tooltipText += " <b>Max of 1,000 for most perks</b>";
		var preset = presetGroup["perkPreset" + selectedPreset];
		var oldName = (preset && preset.Name) ? preset.Name : "";
		tooltipText += "<br/><br/><input id='renamePresetBox' maxlength='25' style='width: 50%' value='" + oldName + "' />";
		costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='renamePerkPreset()'>Apply</div><div class='btn btn-info' onclick='cancelTooltip()'>Cancel</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
		ondisplay = function() {
			var box = document.getElementById("renamePresetBox");
			// Chrome chokes on setSelectionRange on a number box; fall back to select()
			try { box.setSelectionRange(0, box.value.length); }
			catch (e) { box.select(); }
			box.focus();
		};
		noExtraCheck = true;

	}
	if (what == "UnlockedChallenge2"){
		what = "Unlocked Challenge<sup>2</sup>";
		tooltipText = "You hear some strange noises behind you and turn around to see three excited scientists. They inform you that they've figured out a way to modify The Portal to take you to a new type of challenging dimension, a system they proudly call 'Challenge<sup>2</sup>'. You will be able to activate and check out their new technology by clicking the 'Challenge<sup>2</sup>' button next time you go to use The Portal.";
		game.global.lockTooltip = true;
		costText = "<div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='cancelTooltip()'>Thanks, Scientists</div></div>";
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "UnlockedChallenge3"){
		what = "Unlocked Challenge<sup>3</sup>";
		tooltipText = "You hear some strange noises behind you and turn around to see nine excited scientists. They inform you that they've figured out a way to modify The Portal to take you to a new type of challenging dimension, a system they proudly call 'Challenge<sup>3</sup>'. It seems as if the difference between Challenge<sup>2</sup> and Challenge<sup>3</sup> allows them to combine multiplicatively into your Challenge<sup><span class='icomoon icon-infinity'></span></sup> bonus.";
		game.global.lockTooltip = true;
		costText = "<div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='cancelTooltip()'>Thanks, Scientists</div></div>";
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "Eggs"){
		tooltipText = '<span class="eggMessage">It seems as if some sort of animal has placed a bunch of brightly colored eggs in the world. If you happen to see one, you can click on it to send a Trimp to pick it up! According to your scientists, they have a rare chance to contain some neat stuff, but they will not last forever...</span>';
		game.global.lockTooltip = true;
		costText = "<div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='cancelTooltip()'>I'll keep an eye out.</div></div>";
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "Portal"){
		tooltipText = "The portal device you found shines " + ((game.global.universe == 1) ? "green" : "blue") + " in the lab. Such a familiar shade... (Hotkey: T)";
		costText = "";
	}
	if (what == "Repeat Map"){
		tooltipText = "Allow the Trimps to find their way back to square 1 once they finish without your help. They grow up so fast. <br/><br/>If you are <b>not</b> repeating, your current group of Trimps will not be abandoned after the map ends. (Hotkey: R)";
		costText = "";
	}
	if (what == "Challenge2"){
		var sup = (portalUniverse == 1 || game.global.highestRadonLevelCleared < 49) ? "2" : "3";
		what = "Challenge<sup>" + sup + "</sup>";
		tooltipText = "";
		var rewardEach = squaredConfig.rewardEach;
		var rewardGrowth = squaredConfig.rewardGrowth;
		var uniArray = countChallengeSquaredReward(false, false, true);
		if (game.talents.mesmer.purchased){
			rewardEach *= 3;
			rewardGrowth *= 3;
		}
		if (portalUniverse == 2 && game.global.highestRadonLevelCleared < 49){
			tooltipText = "<p><b style='color: #003b99'>Reach Zone 50 in Universe 2 to unlock Challenge<sup>3</sup>, which combine multiplicatively with your Challenge<sup>2</sup>. Just imagine the possibilities!</b></p>"
		}
		else{
			if (!textString)
				tooltipText = "<p>Click to toggle a challenge mode for your challenges!</p>";
			tooltipText += "<p>In Challenge<sup>" + sup + "</sup> mode, you can re-run some challenges in order to earn a permanent attack, health, and " + heliumOrRadon() + " bonus for your Trimps. MOST Challenge<sup>" + sup + "</sup>s will grant <b>" + rewardEach + "% " + ((sup == 2) ? "attack and health and " + prettify(rewardEach / 10) + "% increased " + heliumOrRadon() : "Challenge<sup>" + sup + "</sup> bonus") + " for every " + squaredConfig.rewardFreq + " Zones reached. Every " + squaredConfig.thresh + " Zones, " + ((sup == 2) ? "the attack and health bonus will increase by an additional " + rewardGrowth + "%, and the " + heliumOrRadon() + " bonus will increase by " + prettify(rewardGrowth / 10) + "%" : "this bonus will increase by an additional " + rewardGrowth + "%") + "</b>. This bonus is additive with all available Challenge<sup>" + sup + "</sup>s, and your highest Zone reached for each challenge is saved and used.</p><p><b>No Challenge<sup>" + sup + "</sup>s end at any specific Zone</b>, they can only be completed by using your portal or abandoning through the 'View Perks' menu. However, <b>no " + heliumOrRadon() + " can drop, and no bonus " + heliumOrRadon() + " will be earned during or after the run</b>. Void Maps will still drop heirlooms, and all other currency can still be earned.</p>";
		}
		if (game.global.highestRadonLevelCleared >= 49){		
			tooltipText += "<p><b>Challenge<sup>2</sup> stacks multiplicatively with Challenge<sup>3</sup>, creating one big, beautiful Challenge<sup><span class='icomoon icon-infinity'></span></sup> modifier</b>. You have a " + prettify(uniArray[0]) + "% bonus from Challenge<sup>2</sup> in Universe 1, and a " + prettify(uniArray[1]) + "% bonus from Challenge<sup>3</sup> in Universe 2. This brings your total Challenge<sup><span class='icomoon icon-infinity'></span></sup> bonus to <b>" + prettify(game.global.totalSquaredReward) + "</b>, granting " + prettify(game.global.totalSquaredReward) + "% extra attack and health, and " + prettify(game.global.totalSquaredReward / 10) + "% extra " + heliumOrRadon() + ".";
		}
		else
			tooltipText += "<p>You are currently gaining " + prettify(game.global.totalSquaredReward) + "% extra attack and health, and are gaining " + prettify(game.global.totalSquaredReward / 10) + "% extra " + heliumOrRadon() + " thanks to your Challenge<sup>" + sup + "</sup> bonus.</p>";
		if (game.talents.headstart.purchased) tooltipText += "<p><b>Note that your Headstart mastery will be disabled during Challenge<sup>" + sup + "</sup> runs.</b></p>";
		if (portalUniverse == 1 && uniArray[0] >= 35000){
			var color = (uniArray[0] >= 50000) ? " style='color: red;'" : "";
			tooltipText += "<p><b" + color + ">Note that Challenge<sup>2</sup> Bonus is capped at " + prettify(60000) + "%.</b></p>"
		}
		costText = "";
	}
	if (what == "Geneticistassist Settings"){
		if (isItIn == null){
			geneMenuOpen = true;
			elem = document.getElementById('tooltipDiv2');
			tip2 = true;
			var steps = game.global.GeneticistassistSteps;
			tooltipText = "<div id='GATargetError'></div><div>Customize the target thresholds for your Geneticistassist! Use a number between 0.5 and 5000 seconds for all 3 boxes. Each box corresponds to a Geneticistassist toggle threshold.</div><div style='width: 100%'><input class='GACustomInput' id='target1' value='" + steps[1] + "'/><input class='GACustomInput' id='target2' value='" + steps[2] + "'/><input class='GACustomInput' id='target3' value='" + steps[3] + "'/><hr class='noBotMarg'/><div class='maxCenter'>" + getSettingHtml(game.options.menu.gaFire, 'gaFire') + getSettingHtml(game.options.menu.geneSend, 'geneSend') + "</div><hr class='noTopMarg'/><div id='GADisableCheck'>" + buildNiceCheckbox('disableOnUnlockCheck', null, game.options.menu.GeneticistassistTarget.disableOnUnlock) + "&nbsp;Start disabled when unlocked each run</div></div>";
			costText = "<div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='customizeGATargets();'>Confirm</div> <div class='btn btn-danger' onclick='cancelTooltip()'>Cancel</div>"
			elem.style.left = "33.75%";
			elem.style.top = "25%";
		}
	}
	if (what == "Configure Maps"){
		if (isItIn == null){
			geneMenuOpen = true;
			elem = document.getElementById('tooltipDiv2');
			tip2 = true;
			var steps = game.global.GeneticistassistSteps;
			tooltipText = "<div id='GATargetError'></div><div>Customize your settings for running maps!</div>";
			tooltipText += "<hr class='noBotMarg'/><div class='maxCenter'>"
			var settingCount = 0;
			if (game.global.totalPortals >= 1) {
				tooltipText += getSettingHtml(game.options.menu.mapLoot, 'mapLoot', null, "CM");
				settingCount++;
			}
			if (game.global.totalPortals >= 5){
				tooltipText += getSettingHtml(game.options.menu.repeatVoids, 'repeatVoids', null, "CM");
				settingCount++;
			}
			if (settingCount % 2 == 0) tooltipText += "<br/><br/>";
			tooltipText += '<div class="optionContainer"><div class="noselect settingsBtn ' + ((game.global.repeatMap) ? "settingBtn1" : "settingBtn0") + '" id="repeatBtn2" onmouseover="tooltip(\'Repeat Map\', null, event)" onmouseout="tooltip(\'hide\')" onclick="repeatClicked()">' + ((game.global.repeatMap) ? "Repeat On" : "Repeat Off") + '</div></div>';
			settingCount++;
			if (settingCount % 2 == 0) tooltipText += "<br/><br/>";
			tooltipText += getSettingHtml(game.options.menu.repeatUntil, 'repeatUntil', null, "CM");
			settingCount++;
			if (settingCount % 2 == 0) tooltipText += "<br/><br/>";
			tooltipText += getSettingHtml(game.options.menu.exitTo, 'exitTo', null, "CM")
			settingCount++;
			if (game.options.menu.mapsOnSpire.lockUnless() && game.global.universe == 1){
				if (settingCount % 2 == 0) tooltipText += "<br/><br/>";
				tooltipText +=  getSettingHtml(game.options.menu.mapsOnSpire, 'mapsOnSpire', null, "CM");
				settingCount++;
			}
			if (game.global.canMapAtZone){
				if (settingCount % 2 == 0) tooltipText += "<br/><br/>";
				tooltipText +=  getSettingHtml(game.options.menu.mapAtZone, 'mapAtZone', null, "CM");
				settingCount++;
			}
			if (game.global.highestLevelCleared >= 124){
				if (settingCount % 2 == 0) tooltipText += "<br/><br/>";
				tooltipText +=  getSettingHtml(game.options.menu.climbBw, 'climbBw', null, "CM");
				settingCount++;
			}
			if (settingCount % 2 == 0) tooltipText += "<br/><br/>";
			tooltipText += getSettingHtml(game.options.menu.extraMapBtns, 'extraMapBtns', null, "CM")
			settingCount++;
			tooltipText += "</div>";
			costText = "<div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='cancelTooltip();'>Close</div></div>"
			elem.style.left = "33.75%";
			elem.style.top = "25%";
		}
	}
	if (what == "Set Map At Zone"){
		var maxSettings = game.options.menu.mapAtZone.getMaxSettings();
		tooltipText = "<div id='mazError'></div><div class='row mazRow titles'><div class='mazCheckbox' style='width: 6%'>Active?</div><div class='mazWorld'>Start<br/>Zone</div><div class='mazThrough'>End<br/>Zone</div><div class='mazCell'>Exit At<br/>Cell</div><div class='mazCheckbox'>Run Map?</div><div class='mazPreset'>Use<br/>Preset</div><div class='mazRepeat'>Map<br/>Repeat</div><div class='mazRepeatUntil'>Set<br/>Repeat Until</div><div class='mazExit'>Exit To</div><div class='mazTimes'>Zone<br/>Repeat</div></div>";
		var current = game.options.menu.mapAtZone.getSetZone();
		for (var x = 0; x < maxSettings; x++){
			var vals = {
				world: -1,
				cell: 1,
				check: false,
				preset: 0,
				repeat: 0,
				until: 0,
				exit: 0,
				bwWorld: 125,
				times: -1,
				on: true,
				through: 999,
				rx: 10
			}
			var style = "";
			if (current.length - 1 >= x){
				vals.world = current[x].world;
				vals.check = current[x].check;
				vals.preset = current[x].preset;
				vals.repeat = current[x].repeat;
				vals.until = current[x].until;
				vals.exit = current[x].exit;
				vals.bwWorld = current[x].bwWorld;
				vals.times = (current[x].times) ? current[x].times : -1;
				vals.cell = (current[x].cell) ? current[x].cell : 1;
				vals.on = (current[x].on === false) ? false : true;
				vals.through = (current[x].through) ? current[x].through : 999;
				vals.rx = (current[x].rx) ? current[x].rx : 10;
			}
			else style = " style='display: none' ";
			var presetDropdown = "<option value='0'" + ((vals.preset == 0) ? " selected='selected'" : "") + ">Preset 1</option><option value='1'" + ((vals.preset == 1) ? " selected='selected'" : "") + ">Preset 2</option><option value='2'" + ((vals.preset == 2) ? " selected='selected'" : "") + ">Preset 3</option><option value='6'" + ((vals.preset == 6) ? " selected='selected'" : "") + ">Preset 4</option><option value='7'" + ((vals.preset == 7) ? " selected='selected'" : "") + ">Preset 5</option><option value='3'" + ((vals.preset == 3) ? " selected='selected'" : "") + ">Run Bionic</option><option value='4'" + ((vals.preset == 4) ? " selected='selected'" : "") + ">Run Void</option>";
			if (game.global.universe == 2 && game.global.highestRadonLevelCleared >= 49) presetDropdown += "<option value='8'" + ((vals.preset == 8) ? " selected='selected'" : "") + ">Melting Point</option>";
			if (game.global.universe == 2 && game.global.highestRadonLevelCleared >= 69) presetDropdown += "<option value='5'" + ((vals.preset == 5) ? " selected='selected'" : "") + ">Black Bog</option>";
			if (game.global.universe == 2 && game.global.highestRadonLevelCleared >= 174) presetDropdown += "<option value='9'" + ((vals.preset == 9) ? " selected='selected'" : "") + ">Frozen Castle</option>";
			var repeatDropdown = "<option value='0'" + ((vals.repeat == 0) ? " selected='selected'" : "") + ">Don't Change</option><option value='1'" + ((vals.repeat == 1) ? " selected='selected'" : "") + ">Repeat On</option><option value='2'" + ((vals.repeat == 2) ? " selected='selected'" : "") + ">Repeat Off</option>";
			var repeatUntilDropdown = "<option value='0'" + ((vals.until == 0) ? " selected='selected'" : "") + ">Don't Change</option><option value='1'" + ((vals.until == 1) ? " selected='selected'" : "") + ">Repeat Forever</option><option value='2'" + ((vals.until == 2) ? " selected='selected'" : "") + ">Repeat to 10</option><option value='3'" + ((vals.until == 3) ? " selected='selected'" : "") + ">Repeat for Items</option><option value='4'" + ((vals.until == 4) ? " selected='selected'" : "") + ">Repeat for Any</option><option class='mazBwClimbOption' value='5'" + ((vals.until == 5) ? " selected='selected'" : "") + ">Climb BW to Level</option><option value='6'" + ((vals.until == 6) ? " selected='selected'" : "") + ">Repeat 25 Times</option><option value='7'" + ((vals.until == 7) ? " selected='selected'" : "") + ">Repeat 50 Times</option><option value='8'" + ((vals.until == 8) ? " selected='selected'" : "") + ">Repeat 100 Times</option><option value='9'" + ((vals.until == 9) ? " selected='selected'" : "") + ">Repeat X Times</option>"	
			var exitDropdown = "<option value='0'" + ((vals.exit == 0) ? " selected='selected'" : "") + ">Don't Change</option><option value='1'" + ((vals.exit == 1) ? " selected='selected'" : "") + ">Exit to Maps</option><option value='2'" + ((vals.exit == 2) ? " selected='selected'" : "") + ">Exit to World</option>";
			var timesDropdown = "<option value='-1'" + ((vals.times == -1) ? " selected='selected'" : "") + ">Just This Zone</option><option value='1'" + ((vals.times == 1) ? " selected='selected'" : "") + ">Run Every Zone</option><option value='2'" + ((vals.times == 2) ? " selected='selected'" : "") + ">Run Every Other Zone</option><option value='3'" + ((vals.times == 3) ? " selected='selected'" : "") + ">Run Every 3 Zones</option><option value='5'" + ((vals.times == 5) ? " selected='selected'" : "") + ">Run Every 5 Zones</option><option value='10'" + ((vals.times == 10) ? " selected='selected'" : "") + ">Run Every 10 Zones</option><option value='30'" + ((vals.times == 30) ? " selected='selected'" : "") + ">Run Every 30 Zones</option>";
			var className = (vals.preset == 3) ? "mazBwMainOn" : "mazBwMainOff";
			className += (vals.preset == 3 && vals.until == 5) ? " mazBwZoneOn" : " mazBwZoneOff"
			className += (vals.until == 9) ? " mazRxOn" : " mazRxOff";
			tooltipText += "<div id='mazRow" + x + "' class='row mazRow " + className + "'" + style + ">";
			tooltipText += "<div class='mazDelete' onclick='game.options.menu.mapAtZone.removeRow(" + x + ")'><span class='icomoon icon-cross'></span></div>";
			tooltipText += "<div class='mazCheckbox' style='text-align: center;'>" + buildNiceCheckbox("mazEnableSetting" + x, null, vals.on) + "</div>";
			tooltipText += "<div class='mazWorld'><input value='" + vals.world + "' type='number' id='mazWorld" + x + "'/></div>";
			tooltipText += "<div class='mazThrough'><input value='" + vals.through + "' type='number' id='mazThrough" + x + "'/></div>";
			tooltipText += "<div class='mazCell'><input value='" + vals.cell + "' type='number' id='mazCell" + x + "'/></div>";
			tooltipText += "<div class='mazCheckbox' style='text-align: center;'>" + buildNiceCheckbox("mazCheckbox" + x, null, vals.check) + "</div>";
			tooltipText += "<div class='mazPreset' onchange='updateMazPreset(" + x + ")'><select value='" + vals.preset + "' id='mazPreset" + x + "'>" + presetDropdown + "</select></div>"
			tooltipText += "<div class='mazRepeat'><select value='" + vals.repeat + "' id='mazRepeat" + x + "'>" + repeatDropdown + "</select></div>";
			tooltipText += "<div class='mazRepeatUntil' onchange='updateMazPreset(" + x + ")'><select value='" + vals.until + "' id='mazRepeatUntil" + x + "'>" + repeatUntilDropdown + "</select></div>";
			tooltipText += "<div class='mazRx'><div style='text-align: center;'>X Times</div><input value='" + vals.rx + "' type='number' id='mazRx" + x + "'/></div>";
			tooltipText += "<div class='mazExit'><select value='" + vals.exit + "' id='mazExit" + x + "'>" + exitDropdown + "</select></div>";
			tooltipText += "<div class='mazBwWorld'><div style='text-align: center;'>Exit After L</div><input value='" + vals.bwWorld + "' type='number' id='mazBwWorld" + x + "'/></div>";
			tooltipText += "<div class='mazTimes select'><select value='" + vals.times + "' id='mazTimes" + x + "'>" + timesDropdown + "</select></div>";
			tooltipText += "</div>"
		}
		tooltipText += "<div id='mazAddRowBtn' style='display: " + ((current.length < maxSettings) ? "inline-block" : "none") + "' class='btn btn-success btn-md' onclick='game.options.menu.mapAtZone.addRow()'>+ Add Row</div>"
		var currentPreset = ((game.global.universe == 1 && game.options.menu.mapAtZone.U1Mode == 'a') || (game.global.universe == 2 && game.options.menu.mapAtZone.U2Mode == 'a')) ? "a" : "b";
		tooltipText += "<div id='mazSwapPresetBtn' style='display: " + ((game.talents.maz.purchased) ? "inline-block" : "none") + "' class='btn btn-" + ((currentPreset == "a") ? "info" : "danger") + " btn-md' onclick='game.options.menu.mapAtZone.swapPreset()'>Swap to Preset " + ((currentPreset == "a") ? "B" : "A") + "</div>";
		costText = "<div class='maxCenter'><span class='btn btn-success btn-md' id='confirmTooltipBtn' onclick='game.options.menu.mapAtZone.save()'>Confirm</span><span class='btn btn-danger btn-md' onclick='cancelTooltip(true)'>Cancel</span></div>"
		game.global.lockTooltip = true;
		elem.style.top = "25%";
		elem.style.left = "17.5%";
		swapClass('tooltipExtra', 'tooltipExtraSuperLg', elem);
	}
	if (what == "Change Heirloom Icon"){
		var heirloom = getSelectedHeirloom();
		var icons = [];
		tooltipText = "<div style='width: 100%; height: 100%; background-color: black; text-align: center;'>";
		if (heirloom.type == "Shield"){
			icons = ["*shield3", "*shield", "*shield2",  "*heart3", "*star2", "*road2", "*fast-forward", "*trophy3", "*eraser"];
		}
		if (heirloom.type == "Staff"){
			icons = ["grain", "apple", "tree-deciduous", "*cubes", "*diamond", "*lab-flask", "*key", "*hour-glass", "*flag", "*feather", "*edit"];
		}
		if (heirloom.type == "Core"){
			icons = ["adjust", "*compass", "*cog", "*battery", "*adjust", "*cloud", "*yingyang"]
		}
		for (var x = 0; x < icons.length; x++){
			tooltipText += "<div class='heirloomChangeIcon heirloomRare" + heirloom.rarity + "' onclick='saveHeirloomIcon(\"" + icons[x] + "\")'>" + convertIconNameToSpan(icons[x]) + "</div>";
		}
		tooltipText += "</div>"
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
		costText = "<div class='maxCenter'><span class='btn btn-success btn-md' id='confirmTooltipBtn' onclick='cancelTooltip(true)'>Close</span>"
	}
	if (what == "Change Portal Color"){
		var tiers = 6;
		tooltipText = "<div style='width: 100%; height: 100%; background-color: black; text-align: center;'>";
		
		for (var x = 1; x < tiers + 1; x++){
			var selected = (game.global.portalColor == x || (game.global.portalColor == 0 && x == 6)) ? " selected" : "";
			tooltipText += "<div class='pointer portalPreview portalMk" + x + selected + "' onclick='savePortalColor(" + x + ")'>" + x + "</div>";
		}
		tooltipText += "</div>"
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
		costText = "<div class='maxCenter'><span class='btn btn-success btn-md' id='confirmTooltipBtn' onclick='cancelTooltip(true)'>Close</span>"
	}
	if (what == "Message Config"){
		tooltipText = "<div id='messageConfigMessage'>Here you can finely tune your message settings, to see only what you want from each category. Mouse over the name of a filter for more info.</div>";
		var msgs = game.global.messages;
		var toCheck = ["Loot", "Unlocks", "Combat"];
		tooltipText += "<div class='row'>";
		for (var x = 0; x < toCheck.length; x++){
			var name = toCheck[x];
			tooltipText += "<div class='col-xs-4'><span class='messageConfigTitle'>" + toCheck[x] + "</span><br/>";
			for (var item in msgs[name]){
				if (item == "essence" && game.global.highestLevelCleared < 179) continue;
				if (item == "magma" && game.global.highestLevelCleared < 229) continue;
				if (item == "cache" && game.global.highestLevelCleared < 59) continue;
				if (item == "token" && game.global.highestLevelCleared < 235) continue;
				if (item == "exp" && game.global.highestRadonLevelCleared < 49) continue;
				if (item == 'enabled') continue;
				var realName = item;
				if (item == "helium" && game.global.universe == 2) realName = "radon";
				tooltipText += "<span class='messageConfigContainer'><span class='messageCheckboxHolder'>" + buildNiceCheckbox(name + item, 'messageConfigCheckbox', (msgs[name][item])) + "</span><span onmouseover='messageConfigHover(\"" + name + item + "\", event)' onmouseout='tooltip(\"hide\")' class='messageNameHolder'> - " + realName.charAt(0).toUpperCase() + realName.substr(1) + "</span></span><br/>";
			}
			tooltipText += "</div>";
		}
		tooltipText += "</div>";
		ondisplay = function () {verticalCenterTooltip();};
		game.global.lockTooltip = true;
		elem.style.top = "25%";
		elem.style.left = "25%";
		swapClass('tooltipExtra', 'tooltipExtraLg', elem);
		costText = "<div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='cancelTooltip();configMessages();'>Confirm</div> <div class='btn btn-danger' onclick='cancelTooltip()'>Cancel</div>"
	}
	if (isItIn == "goldenUpgrades"){
		var upgrade = game.goldenUpgrades[what];
		var timesPurchased = upgrade.purchasedAt.length
		var s = (timesPurchased == 1) ? "" : "s";
		var three = (game.global.totalPortals >= 5 || (game.global.universe == 2 && game.global.totalRadPortals == 0)) ? "three" : "two";
		tooltipText += " <b>You can only choose one of these " + three + " Golden Upgrades. Choose wisely...</b><br/><br/> Each time Golden Upgrades are unlocked, they will increase in strength. You are currently gaining " + Math.round(upgrade.currentBonus * 100) + "% from purchasing this upgrade " + timesPurchased + " time" + s + " since your last portal.";
		if (what == "Void" && (parseFloat((game.goldenUpgrades.Void.currentBonus + game.goldenUpgrades.Void.nextAmt()).toFixed(2)) > 0.72)) tooltipText += "<br/><br/><b class='red'>This upgrade would put you over 72% increased Void Map chance, which would destabilize the universe. You don't want to destabilize the universe, do you?</b>";
		else if (what == "Void") tooltipText += "<br/><br/><b class='green'>Note: The absolute maximum value for Golden Void is +72%. Golden Void will no longer be able to be purchased if it would increase your bonus above 72%. Plan carefully!</b>";
		if (what == "Helium" && game.global.runningChallengeSquared) tooltipText += "<br/><br/><b class='red'>You can't earn helium while running a Challenge<sup>2</sup>!</b>";
		costText = "Free";
		if (getAvailableGoldenUpgrades() > 1) costText += " (" + getAvailableGoldenUpgrades() + " remaining)";
		var numeral = (usingScreenReader) ? prettify(game.global.goldenUpgrades + 1) : romanNumeral(game.global.goldenUpgrades + 1);
		if (game.global.universe == 2 && what == "Helium") what = "Radon";
		what = "Golden " + what + " (Tier " + numeral + ")";
	}
	if (isItIn == "talents"){
		var talent = game.talents[what];
		tooltipText = talent.description;
		var nextTalCost = getNextTalentCost();
		var thisTierTalents = countPurchasedTalents(talent.tier);
		if (ctrlPressed){
			var highestAffordable = getHighestPurchaseableRow();
			var highestIdeal = getHighestIdealRow();
			var isAffordable = (highestAffordable >= talent.tier);
			var isIdeal = (highestIdeal >= talent.tier);
			if (thisTierTalents == 6) {
				costText = "<span class='green'>You have already purchased this tier!</span>";
			}
			else if (isIdeal) {
				costText = "<span class='green'>You must buy this entire tier to be able to spend all of your Dark Essence.</span>"
			}
			else if (isAffordable) {
				costText = "<span class='green'>You can afford to purchase this entire tier!</span> <span class='red'>However, purchasing this entire tier right now may limit which other Masteries you can reach.</span>"
			}
			else {
				costText = "<span class='red'>You cannot afford to purchase this entire tier.</span>"
			}
		}
		else{
			if (talent.purchased)
				costText = "<span style='color: green'>Purchased</span>";
			else{
				var requiresText = false;
				if (typeof talent.requires !== 'undefined'){
					var requires;
					if (Array.isArray(talent.requires)) requires = talent.requires;
					else requires = [talent.requires];
					var needed = [];
					for (var x = 0; x < requires.length; x++){
						if (!game.talents[requires[x]].purchased){ 
							needed.push(game.talents[requires[x]].name);
						}
					}
					if (needed.length) requiresText = formatListCommasAndStuff(needed);
				}
				if (getAllowedTalentTiers()[talent.tier - 1] < 1 && thisTierTalents < 6){
					costText = "<span style='color: red'>Locked";
					var lastTierTalents = countPurchasedTalents(talent.tier - 1);
					if (lastTierTalents <= 1) costText += " (Buy " + ((lastTierTalents == 0) ? "2 Masteries" : "1 more Mastery") + " from Tier " + (talent.tier - 1) + " to unlock Tier " + talent.tier;
					else costText += " (Buy 1 more Mastery from Tier " + (talent.tier - 1) + " to unlock the next from Tier " + talent.tier;
					if (requiresText) costText += ". This Mastery also requires " + requiresText;
					costText += ")</span>"
				}
				else if (requiresText)
					costText = "<span style='color: red'>Requires " + requiresText + "</span>";
				else if (game.global.essence < nextTalCost && prettify(game.global.essence) != prettify(nextTalCost))
					costText = "<span style='color: red'>" + prettify(nextTalCost) + " Dark Essence (Use Scrying Formation to earn more)</span>";
				else {
					costText = prettify(nextTalCost) + " Dark Essence";
					if (canPurchaseRow(talent.tier)) {
						costText += "<br/><b style='color: black; font-size: 0.8vw;'>You can afford to purchase this whole row! Hold Ctrl when clicking to buy this entire row and any uncompleted rows before it.</b>";
					}

				}
			}
		}
		what = talent.name;
		noExtraCheck = true;
	}
	if (what == "Mastery"){
		tooltipText = "<p>Click to view your masteries.</p><p>You currently have " + prettify(game.global.essence) + "</b> Dark Essence.</p>"
	}
	if (what == "The Improbability"){		
		tooltipText = "<span class='planetBreakMessage'>That shouldn't have happened. There should have been a Blimp there. Something is growing unstable.</span>";
		if (!game.global.autoUpgradesAvailable) tooltipText += "<br/><br/><span class='planetBreakMessage'><b>Your Trimps seem to understand that they'll need to help out more, and you realize how to permanently use them to automate upgrades!<b></span><br/>";
		costText = "<span class='planetBreakDescription'><span class='bad'>Trimp breed speed reduced by a factor of 10. 20% of enemy damage can now penetrate your block.</span><span class='good'> You have unlocked a new upgrade to learn a Formation. Helium harvested per Zone is increased by a factor of 5. Equipment cost is dramatically cheaper. Creating modified maps is now cheaper, and your scientists have found new ways to improve maps! You have access to the 'Trimp' challenge!<span></span>";
		if (game.global.challengeActive == "Corrupted") costText += "<br/><br/><span class='corruptedBadGuyName'>Looks like the Corruption is starting early...</span>";
		costText += "<hr/><div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='cancelTooltip()'>I'll be fine</div><div class='btn btn-danger' onclick='cancelTooltip(); message(\"Sorry\", \"Notices\")'>I'm Scared</div></div>"
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "Corruption"){
		if (game.global.challengeActive == "Corrupted"){
			tooltipText = "<span class='planetBreakMessage'>Though you've seen the Corruption grow since the planet broke, you can now see a giant spire pumping out tons of the purple goo. Things seem to be absorbing it at a higher rate now.</span><br/>";
			costText += "<span class='planetBreakDescription'><span class='bad'>Improbabilities and Void Maps are now more difficult.</span> <span class='good'>Improbabilities and Void Maps now drop 2x helium.</span></span>";
		}
		else {
			tooltipText = (game.talents.headstart.purchased) ? "Off in the distance, you can see a giant spire grow larger as you approach it." : "You can now see a giant spire only about 20 Zones ahead of you.";
			tooltipText = "<span class='planetBreakMessage'>" + tooltipText + " Menacing plumes of some sort of goopy gas boil out of the spire and appear to be tainting the land even further. It looks to you like the Zones are permanently damaged, poor planet. You know that if you want to reach the spire, you'll have to deal with the goo.</span><br/>";
			costText = "<span class='planetBreakDescription'><span class='bad'>From now on as you press further through Zones, more and more corrupted cells of higher and higher difficulty will begin to spawn. Improbabilities and Void Maps are now more difficult.</span> <span class='good'>Improbabilities and Void Maps now drop 2x helium. Each corrupted cell will drop 15% of that Zone's helium reward.</span></span> ";
		}
		costText += "<hr/><div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='cancelTooltip()'>Bring it on</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "A Whole New World"){
		tooltipText = "<p>Fluffy has reached Evolution 8 Level 10! He levitates above the ground, then realizes he seems a bit like a showoff so he floats back down. He strikes a good balance between power and humility by just having his eyes glow a little bit; you have to admit it's a good look on him.</p><p>Anyways, Fluffy walks over to your Portal Device and gives it a good smack. He uses some nifty telepathic powers to inform you that you can now use your Portal Device to travel to a different Universe, one that he himself handpicked for its usefulness.</p><p>He continues to inform you that the Magma on this planet is beginning to harden, blocking later Spires behind impenetrable walls of Obsidian. If we want to have any hope of reaching them, we'll need a tremendous amount of energy from this new Universe!</p><p><b>You can now travel back and forth between Universe 1 - \"The Helium Universe\", and Universe 2 - \"The Radon Universe\". See the top left of your Portal for more information.</b></p>";
		costText += "<div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='cancelTooltip()'>Bring it on</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "Change Universe"){
		var nextUniverse, newResource, oldResource, oldPet, newPet;
		if (portalUniverse == 1){
			nextUniverse = "2";
			newResource = "Radon";
			oldResource = "Helium";
			oldPet = "Fluffy";
			newPet = "Scruffy";
		}
		else {
			nextUniverse = "1";
			newResource = "Helium";
			oldResource = "Radon";
			oldPet = "Scruffy";
			newPet = "Fluffy";
		}
		tooltipText = "Click this button to have your next Portal bring you to Universe " + nextUniverse + " - The " + newResource + " Universe. " + oldResource + " Perks and " + oldPet + " can't come with you, but " + oldPet + "'s good pal " + newPet + " will be waiting for you.";
		if (game.global.totalSquaredReward < 15000 && portalUniverse == 1) tooltipText += "<br/><br/><span style='color: red'>" + oldPet + " suggests having at least 15,000% Challenge<sup>2</sup> reward bonus before heading to Universe 2, but he trusts you to make your own decisions!</span>";
		if (portalUniverse == 1 && game.global.totalRadonEarned == 0) tooltipText += "<br/><br/><b>You will earn Radon instead of Helium in Universe 2. It's an entirely new Universe to explore!</b>"
	}
	if (what == "The Spire"){	
		tooltipText = "<span class='planetBreakMessage'>The Spire looms menacingly above you, and you take in a deep breath of corruption. You take a look back at your Trimps to help gather some courage, and you push the door open. You slowly walk inside and are greeted by an incredibly loud, deep, human voice.<br/><br/><b>Do you know what you face? If you are defeated ten times in this place, you shall be removed from this space. If you succeed, then you shall see the light of knowledge that you seek.</b><span>";
		tooltipText += "<br/><hr/><span class='planetBreakDescription'><span class='bad'>This Zone is considerably more difficult than the previous and next Zones. If 10 groups of Trimps die in combat while in the spire, the world will return to normal.</span> <span class='good'>Each cell gives more and more helium. Every 10th cell gives a larger reward, and increases all loot gained until your next portal by 2% (including helium).</span>";
		if (game.options.menu.mapsOnSpire.enabled) tooltipText += "<br/><hr/>You were moved to Maps to protect your limited chances at the spire. You can disable this in settings!";
		costText = "<div class='maxCenter'><div class='btn btn-info' onclick='startSpire(true)'>The Universe Awaits</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "The Magma"){
		tooltipText = "<p>You stumble across a large locked chest, unlike anything you've ever seen. The lock looks rusty, you smack it with a rock, and it falls right off. Immediately the ground shakes and cracks beneath your feet, intense heat hits your face, and Magma boils up from the core.</p><p>Where one minute ago there was dirt, grass, and noxious fog, there are now rivers of molten rock (and noxious fog). You'd really like to try and repair the planet somehow, so you decide to keep pushing on. It's been working out well so far, there was some useful stuff in that chest!</p><hr/>";
		tooltipText += "<span class='planetBreakDescription'><span class='bad'>The heat is tough on your Trimps, causing each Zone to reduce their attack and health by 20% more than the last. 10% of your Nurseries will permanently close after each Zone to avoid Magma flows, and Corruption has seeped into both Void and regular Maps, further increasing their difficulty. </span><span class='good'> However, the chest contained plans and materials for the <b>Dimensional Generator</b> building, <b>" + prettify(textString) + " Helium</b>, and <b>100 copies of Coordination</b>! In addition, all Zones are now worth <b>3x Helium</b>!<span></span>";
		costText += "<div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='cancelTooltip()'>K</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "Exit Spire"){
		tooltipText = "This will exit the spire, and you will be unable to re-enter until your next portal. Are you sure?";
		costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='cancelTooltip(); endSpire()'>Exit Spire</div><div class='btn btn-danger' onclick='cancelTooltip()'>Cancel</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "Confirm Respec Masteries"){
		if (!textString)
			tooltipText = "This will return all Dark Essence that was spent on Masteries at the cost of 20 bones. Are you sure?";
		else 
			tooltipText = "This will return all Dark Essence that was spent on Masteries, and will use " + ((game.global.freeTalentRespecs > 1) ? "one of " : "") + "your remaining " + game.global.freeTalentRespecs + " free Mastery Respec" + needAnS(game.global.freeTalentRespecs) + ".";
		costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='cancelTooltip(); respecTalents(true)'>Respec</div><div class='btn btn-danger' onclick='cancelTooltip()'>Cancel</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "Respec Masteries"){
		tooltipText = "<p>Click to Respec, refunding all Dark Essence that was spent on Masteries.<p>";
		if (game.global.freeTalentRespecs > 0) tooltipText += "<p>Your first 3 Respecs are free, and you still have " + game.global.freeTalentRespecs + " left! When there are no more left, each respec will cost 20 Bones."
		costText = (game.global.freeTalentRespecs > 0) ? "Free!" : ((game.global.b >= 20) ? "<span class='green'>" : "<span class='red'>") + "20 Bones</span>";
	}
	if (what == "The Geneticistassist"){
		tooltipText = "Greetings, friend! I'm your new robotic pal <b>The Geneticistassist</b> and I am here to assist you with your Geneticists. I will hang out in your Jobs tab, and will appear every run after Geneticists are unlocked. You can customize me in Settings under 'General'!";
		costText = "<div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='cancelTooltip()'>Thanks, Geneticistassist!</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "MagnetoShriek"){
		var shriekValue = ((1 - game.mapUnlocks.roboTrimp.getShriekValue()) * 100).toFixed(1);
		tooltipText = "Your pet RoboTrimp seems to be gifted at distorting the magnetic field around certain Bad Guys, especially Improbabilities. You can activate this ability once every 5 Zones in order to tell your RoboTrimp to reduce the attack damage of the next Improbability by " + shriekValue + "%. This must be reactivated each time it comes off cooldown.";
		tooltipText += "<span id='roboTrimpTooltipActive' style='font-weight: bold'><br/><br/>";
		tooltipText += (game.global.useShriek) ? "MagnetoShriek is currently active and will fire on the next Improbability." : "MagnetoShriek is NOT active and will not fire.";
		tooltipText += "</span>";
		costText = "";
		//elem.style.top = "55%";
	}
	if (what == "Reset"){
		tooltipText = "Are you sure you want to reset? This will really actually reset your game. You won't get anything cool. It will be gone. <b style='color: red'>This is not the soft-reset you're looking for. This will delete your save.</b>";
		costText="<div class='maxCenter'><div class='btn btn-danger' onclick='resetGame();unlockTooltip();tooltip(\"hide\")'>Delete Save</div> <div class='btn btn-info' onclick='cancelTooltip()'>Cancel</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "Fight"){
		tooltipText = "Send your poor Trimps to certain doom in the battlefield. You'll get cool stuff though, they'll understand. (Hotkey: F)";
		var currentSend = game.resources.trimps.getCurrentSend();
		costText = (currentSend > 1) ? "s" : "";
		costText = prettify(currentSend) + " Trimp" + costText;
	}
	if (what == "AutoFight"){
		tooltipText = "Allow the Trimps to start fighting on their own whenever their town gets overcrowded (Hotkey: A)";
		costText = "";
	}
	if (what == "New Achievements"){
		tooltipText = "The universe has taken an interest in your achievements, and has begun tracking them. You already have some completed thanks to your previous adventures, would you like to see them?";
		costText = "<div class='maxCenter'><div class='btn btn-success' onclick='toggleAchievementWindow(); cancelTooltip()'>Check Achievements</div> <div class='btn btn-danger' onclick='cancelTooltip()'>No, That Sounds Dumb</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "Upgrade Generator"){
		tooltipText = getGeneratorUpgradeHtml();
		costText = "<b style='color: red'>These upgrades persist through portal and cannot be refunded. Choose wisely! " + getMagmiteDecayAmt() + "% of your unspent Magmite will decay on portal.</b><br/><br/><div class='maxCenter'><span class='btn btn-info' onclick='cancelTooltip()'>Close</span></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
		ondisplay = function(){
			updateGeneratorUpgradeHtml();
			verticalCenterTooltip();
		};
		titleText = "<div id='generatorUpgradeTitle'>Upgrade Generator</div><div id='magmiteOwned'></div>";
	}
	if (what == "Queue"){
		tooltipText = "This is a building in your queue, you'll need to click \"Build\" to build it. Clicking an item in the queue will cancel it for a full refund.";
		costText = "";
	}
	if (what == "Toxic" && isItIn != "dailyStack"){
		tooltipText = "This Bad Guy is toxic. You will obtain " + (game.challenges.Toxicity.lootMult * game.challenges.Toxicity.stacks).toFixed(1) + "% more resources! Oh, also, this Bad Guy has 5x attack, 2x health, your Trimps will lose 5% health each time they attack, and the toxic air is causing your Trimps to breed " + (100 - (Math.pow(game.challenges.Toxicity.stackMult, game.challenges.Toxicity.stacks) * 100)).toFixed(2) + "% slower. These stacks will reset after clearing the Zone.";
		costText = "";
	}
	if (what == "Momentum"){
		var stacks = game.challenges.Lead.stacks;
		tooltipText = "This Bad Guy has " + prettify(stacks * 4) + "% more damage and health, pierces an additional " + (stacks * 0.1).toFixed(1) + "% block, and each attack that does not kill it will cause your Trimps to lose " + (stacks * 0.03).toFixed(2) + "% of their health.";
		costText = "";
	}
	if (what == "Custom"){
		customUp = (textString) ? 2 : 1;
		tooltipText = "Type a number below to purchase a specific amount. You can also use shorthand such as 2e5 and 200k to select that large number, or fractions such as 1/2 and 50% to select that fraction of your available workspaces."
		if (textString) tooltipText += " <b>Max of 1,000 for most perks</b>";
		tooltipText += "<br/><br/><input id='customNumberBox' style='width: 50%' value='" + ((!isNumberBad(game.global.lastCustomExact)) ? prettify(game.global.lastCustomExact) : game.global.lastCustomExact) + "' />";
		costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='numTab(5, " + textString + ")'>Apply</div><div class='btn btn-info' onclick='cancelTooltip()'>Cancel</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
		ondisplay = function() {
			var box = document.getElementById("customNumberBox");
			// Chrome chokes on setSelectionRange on a number box; fall back to select()
			try { box.setSelectionRange(0, box.value.length); }
			catch (e) { box.select(); }
			box.focus();
		};
		noExtraCheck = true;
	}
	if (what == "Max"){
		var forPortal = (textString) ? true : false;
		tooltipText = "No reason to spend everything in one place! Here you can set the ratio of your resources to spend when using the 'Max' button. Setting this to 0.5 will spend no more than half of your resources per click, etc."
		costText = "<ul id='buyMaxUl'><li onclick='setMax(1, " + forPortal + ")'>Max</li><li onclick='setMax(0.5, " + forPortal + ")'>0.5</li><li onclick='setMax(0.33, " + forPortal + ")'>0.33</li><li onclick='setMax(0.25, " + forPortal + ")'>0.25</li><li onclick='setMax(0.1, " + forPortal + ")'>0.1</li></ul>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "Export"){
		var saveText = save(true);
		if (textString){
			tooltipText = textString + "<br/><br/><textarea id='exportArea' spellcheck='false' style='width: 100%' rows='5'>" + saveText + "</textarea>";
			what = "Thanks!";
		}
		else
		tooltipText = "This is your save string. There are many like it but this one is yours. Save this save somewhere safe so you can save time next time. <br/><br/><textarea spellcheck='false' id='exportArea' style='width: 100%' rows='5'>" + saveText + "</textarea>";
		costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='cancelTooltip()'>Got it</div>";
		if (document.queryCommandSupported('copy')){
			costText += "<div id='clipBoardBtn' class='btn btn-success'>Copy to Clipboard</div>";
		}
		var saveName = 'Trimps Save P' + game.global.totalPortals;
		if (game.global.universe == 2 || game.global.totalRadPortals > 0){
			saveName += " " + game.global.totalRadPortals + " U" + game.global.universe;
		}
		saveName += " Z" + game.global.world;
		costText += "<a id='downloadLink' target='_blank' download='" + saveName + ".txt', href=";
		if (Blob !== null) {
			var blob = new Blob([saveText], {type: 'text/plain'});
			var uri = URL.createObjectURL(blob);
			costText += uri;
		} else {
			costText += 'data:text/plain,' + encodeURIComponent(saveText);
		}
		costText += " ><div class='btn btn-danger' id='downloadBtn'>Download as File</div></a>";
		costText += "</div>";
		ondisplay = tooltips.handleCopyButton();
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "Lost Time"){
		cancelTooltip();
		tooltipText = offlineProgress.getHelpText();
		elem = document.getElementById('tooltipDiv2');
		tip2 = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
		costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info btn-lg' onclick='cancelTooltip()'>Neat</div>";
	}
	if (what == "Export Perks"){
		tooltipText = "It may not look like much, but all of your perks are in here! You can share this string with friends, or save it to your computer to import later!<br/><br/><textarea spellcheck='false' id='exportArea' style='width: 100%' rows='5'>" + exportPerks() + "</textarea>";
		costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='cancelTooltip()'>Got it</div>";
		if (document.queryCommandSupported('copy')){
			costText += "<div id='clipBoardBtn' class='btn btn-success'>Copy to Clipboard</div>";
		}
		costText += "</div>";
		ondisplay = tooltips.handleCopyButton();
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "Import"){
		tooltipText = "Import your save string! It'll be fun, I promise.<br/><br/><textarea spellcheck='false' id='importBox' style='width: 100%' rows='5'></textarea>";
		costText="<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='cancelTooltip(); load(true);'>Import</div>"
		if (playFabId != -1) costText += "<div class='btn btn-primary' onclick='loadFromPlayFab()'>Import From PlayFab</div>";
		costText += "<div class='btn btn-info' onclick='cancelTooltip()'>Cancel</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
		ondisplay = function () {
			document.getElementById('importBox').focus();
		}
	}
	if (what == "Import Perks"){
		tooltipText = "Import your perks from a text string!<br/><br/><textarea spellcheck='false' id='perkImportBox' style='width: 100%' rows='5'></textarea>";
		costText = "<p class='red'></p>";
		costText += "<div id='confirmTooltipBtn' class='btn btn-info' onclick='this.previousSibling.innerText = importPerks()'>Import</div>";
		costText += "<div class='btn btn-info' onclick='cancelTooltip()'>Cancel</div></div>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
		ondisplay = function () {
			document.getElementById('perkImportBox').focus();
		};
	}
	if (what == "AutoPrestige"){
		tooltipText = '<p>Your scientists have come a long way since you first crashed here, and can now purchase prestige upgrades automatically for you with hardly any catastrophic mistakes. They understand the word "No" and the following three commands: </p><p><b>AutoPrestige All</b> will always purchase the cheapest prestige available first.</p><p><b>Weapons Only</b> as you may be able to guess, will only purchase Weapon prestiges.</p><p><b>Weapons First</b> will only purchase Weapon prestiges unless the cheapest Armor prestige is less than 5% of the cost of the cheapest Weapon. If there are no Weapon prestiges available, the cheapest Armor prestige will be purchased only if its cost is 5% or less of your total resources.</p>';
	}
	if (what == "AutoUpgrade"){
		tooltipText = "Your scientists can finally handle some upgrades on their own! Toggling this on will cause most upgrades to be purchased automatically. Does not include equipment prestiges or upgrades that would trigger a confirmation popup.";
	}
	if (what == "Recycle All"){
		tooltipText = "Recycle all maps below the selected level.";
	}
	if (what == "PlayFab Login"){
		var tipHtml = getPlayFabLoginHTML();
		tooltipText = tipHtml[0];
		costText = tipHtml[1];
		game.global.lockTooltip = true;
		elem.style.top = "15%";
		elem.style.left = "25%";
		swapClass('tooltipExtra', 'tooltipExtraLg', elem);
		noExtraCheck = true;
	}
	if (what == "PlayFab Conflict"){
		tooltipText = "It looks like your save stored at PlayFab is further along than the save on your computer.<br/><b>Your save on PlayFab has earned " + prettify(textString) + " total Helium, defeated Zone " + attachFunction + ", and cleared " + prettify(numCheck) + " total Zones. The save on your computer only has " + prettify(game.global.totalHeliumEarned) + " total Helium, has defeated Zone " + game.global.highestLevelCleared + ", and cleared " + prettify(game.stats.zonesCleared.value + game.stats.zonesCleared.valueTotal) + " total Zones.</b><br/>Would you like to Download your save from PlayFab, Overwrite your online save with this one, or Cancel and do nothing?";
		costText = "<span class='btn btn-primary' onclick='playFabFinishLogin(true)'>Download From PlayFab</span><span class='btn btn-warning' onclick='playFabFinishLogin(false)'>Overwrite PlayFab Save</span><span class='btn btn-danger' onclick='cancelPlayFab();'>Cancel</span>";
		game.global.lockTooltip = true;
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (what == "DominationDominating"){
		what = "Domination: Dominating";
		noExtraCheck = true;
		tooltipText = "This Bad Guy is Dominating! It has 2.5x attack, 7.5x health, and heals for 5% of its max health after each attack. However, it will also drop 3x Helium!"
		costText = "";
	}
	if (what == "DominationWeak"){
		what = "Domination: Weak";
		noExtraCheck = true;
		tooltipText = "This Bad Guy is having its power siphoned by an even worse Bad Guy! It deals 90% less damage and has 90% less health."
		costText = "";
	}
	if (what == "Fire Trimps"){
		if (!game.global.firing)
		tooltipText = "Activate firing mode, turning the job buttons red, and forcing them to fire trimps rather than hire them. The newly unemployed Trimps will start breeding instead of working, but you will not receive a refund on resources.";
		else
		tooltipText = "Disable firing mode";
		costText = "";
	}
	if (what == "Maps"){
		if (!game.global.preMapsActive)
		tooltipText = "Travel to the Map Chamber. Maps are filled with goodies, and for each max level map you clear you will gain a 20% stacking damage bonus for that Zone (stacks up to 10 times). (Hotkey: M)";
		else
		tooltipText = "Go back to the World Map. (Hotkey: M)";
		costText = "";
	}

	if (what == 'Error') {
		game.global.lockTooltip = true;
		var returnObj = tooltips.showError(textString);
		tooltipText = returnObj.tooltip;
		costText = returnObj.costText;
		ondisplay = tooltips.handleCopyButton();
		elem.style.left = "33.75%";
		elem.style.top = "25%";
	}
	if (isItIn == "jobs"){
		var buyAmt = game.global.buyAmt;
		if (buyAmt == "Max") buyAmt = calculateMaxAfford(game.jobs[what], false, false, true);
		if (game.global.firing && what != "Amalgamator"){
			var firstChar = what.charAt(0);
			var aAn = (firstChar == "A" || firstChar == "E" || firstChar == "I" || firstChar == "O" || firstChar == "U") ? " an " : " a ";
			tooltipText = "Fire " + aAn + " " + what + ". Refunds no resources, but frees up some workspace for your Trimps.";
			costText = "";
		}
		else{
			var workspaces = game.workspaces;
			var ignoreWorkspaces = (game.jobs[what].allowAutoFire && game.options.menu.fireForJobs.enabled);
			if (workspaces < buyAmt && !ignoreWorkspaces) buyAmt = workspaces;
			costText = getTooltipJobText(what, buyAmt);
		}
		if (what == "Amalgamator") {
			noExtraCheck = true;
			costText = "";
		}
		else if (buyAmt > 1) what += " X " + prettify(buyAmt);
	}
	if (isItIn == "buildings"){
		if (what != "Hub") costText = canAffordBuilding(what, false, true);
		if (game.global.buyAmt != 1) {
			if (game.buildings[what].percent || what == "Antenna"){
				tooltipText += " <b>You can only purchase 1 " + what + " at a time.</b>";
				what += " X 1";
			}
			else {
				what += " X " + prettify((game.global.buyAmt == "Max") ? calculateMaxAfford(game.buildings[what], true) : game.global.buyAmt);
			}
		}
	}
	if (what == "Scale Equality Scaling"){
		var state = game.portal.Equality.scalingActive ? "On" : "Off";
		if (textString) tooltipText = '<div style="font-size: 1.7vh"><div class="maxCenter"><div style="width: 50%; margin-left: 25%" role="button" class="noselect pointer portalThing thing perkColorOff changingOff equalityColor' + state + '" id="equalityScaling2" onclick="toggleEqualityScale()"><span class="thingName">Scale Equality</span><br><span class="thingOwned"><span id="equalityScalingState2">' + state + '</span></span></div></div><br/>';
		else tooltipText = "";
		tooltipText += "Change this Slider to change the maximum amount of attacks Trimps need to make in order to not trigger Equality Scaling. Setting this slider to 0 will increase scaling whenever a group of Trimps is one-shot, 1 will increase if Trimps attack one or fewer times, 5 will only increase if they attack 5 or fewer times, etc.<br/><br/><b>Your current setting is <span id='equalityCurrentScale'>" + game.portal.Equality.scalingSetting + "</span>.</b>";
		tooltipText += "<br/><input oninput='scaleEqualityScale(this)' onchange='scaleEqualityScale(this)' type='range' id='scaleEqualitySlider' min='0' max='10' value='" + game.portal.Equality.scalingSetting + "' />";
		tooltipText += "<br/>If Reversing is allowed, Equality stacks will also decrease after the set amount of attacks against the same bad guy.<br/><br/>" + buildNiceCheckbox("equalityReversing", null, game.portal.Equality.scalingReverse, "scaleEqualityScale(this, \"reverse\")") + " Allow Reversing<br/><b>Your current reversing setting is <span id='equalityCurrentScaleReverse'>" + game.portal.Equality.reversingSetting + "</span>.</b><br/><input oninput='scaleEqualityScale(this)' onchange='scaleEqualityScale(this)' type='range' id='scaleEqualitySliderReverse' min='1' max='10' value='" + game.portal.Equality.reversingSetting + "' />"
		var disabledStackCount = game.portal.Equality.disabledStackCount;
		var max = (game.portal.Equality.radLevel + 1);
		var text = disabledStackCount;
		if (disabledStackCount == -1){
			text = "Max (" + game.portal.Equality.radLevel + ")";
			disabledStackCount = max;
		}
		tooltipText += "<br/>You can also manually set how many stacks of Equality should be used if Scaling is disabled by changing the slider below. This allows you to customize exactly how many stacks of Equality to use without having to respec your Perks.<br/><br/><b>Your Equality stacks when Scaling is disabled will be <span id='equalityDisabledStackCount'>" + text + "</span>.</b><input oninput='scaleEqualityScale(this)' onchange='scaleEqualityScale(this)' type='range' id='equalityDisabledSlider' min='0' max='" + max + "' value='" + disabledStackCount + "' />";
		if (textString) tooltipText += "</div>";
		game.global.lockTooltip = true;
		elem.style.left = "4.5%";
		elem.style.top = "1%";
		swapClass('tooltipExtra', 'tooltipExtraEquality', elem);
		costText = "<div class='maxCenter'><div class='btn btn-info' id='confirmTooltipBtn' onclick='cancelTooltip()'>Done</div></div>";
		ondisplay = function(){
			verticalCenterTooltip();
		}
	}
	if (what == "Equality Scaling"){
		var activeLevels = game.portal.Equality.getActiveLevels();
		tooltipText = "<p>You can enable or disable Equality Scaling at any time.</p><p>With Equality Scaling On, each Portal starts with 0 levels of Equality active. If a group of Trimps dies after attacking <b>" + game.portal.Equality.scalingSetting + "</b> or fewer time" + needAnS(game.portal.Equality.scalingSetting) + ", one level of Equality will activate, up to your purchased level of Equality.";
		tooltipText += "</p><p><b>You currently have " + activeLevels + " stack" + needAnS(activeLevels) + " of Equality active.</b></p>";
		if (!textString) tooltipText += "<p><b>Ctrl Click this button to customize your Equality settings.</b></p>"
		else tooltipText += "<p>(Hotkey: E)</p>"
	}
	else if (isItIn == "portal"){
		var resAppend = (game.global.kongBonusMode) ? " Bonus Point" : " " + heliumOrRadon(true, true);
		var perkItem = game.portal[what];
		var price = getPortalUpgradePrice(what);
		if (!perkItem.max || perkItem.max > getPerkLevel(what, true) + perkItem.levelTemp) costText = prettify(price) + resAppend + needAnS(price);
		else costText = "";
		tooltipText += "<br/><br/><b>You have spent " + prettify(getSpentPerkResource(what, true) + perkItem.heliumSpentTemp) + " " + heliumOrRadon(false, true) + " on this Perk.</b>";
		if (game.global.buyAmt == "Max") what += " X " + getPerkBuyCount(what);
		else if (game.global.buyAmt > 1) what += " X " + game.global.buyAmt;
		what = what.replace("_", " ");
	}
	if (isItIn == "equipment"){
		costText = canAffordBuilding(what, false, true, true);
		if (what == "Shield" && game.equipment.Shield.blockNow){
			var blockPerShield = game.equipment.Shield.blockCalculated + (game.equipment.Shield.blockCalculated * game.jobs.Trainer.owned * (game.jobs.Trainer.modifier / 100));
			tooltipText += " (" + prettify(blockPerShield) + " after Trainers)";
		}
		if (game.global.buyAmt != 1) {
			what += " X " + ((game.global.buyAmt == "Max") ? calculateMaxAfford(game.equipment[what], false, true) : game.global.buyAmt);
		}
	}
	if (isItIn == "upgrades"){
		var mouseOverElem = (lastMousePos[0] && lastMousePos[1]) ? document.elementFromPoint(lastMousePos[0], lastMousePos[1]) : null;
		if (mouseOverElem && mouseOverElem.id == "upgradesHere"){
			cancelTooltip();
			return;
		}
		if (typeof tooltipText.split('@')[1] !== 'undefined'){
			var prestigeCost = "<b>You may not want to do this right away.</b> Your next " + game.upgrades[what].prestiges + " will grant " + getNextPrestigeValue(what) + ".";
			tooltipText = tooltipText.replace('@', prestigeCost);
		}
		if (typeof tooltipText.split('$')[1] !== 'undefined'){
			var upgradeTextSplit = tooltipText.split('$');
			var color = game.upgrades[what].specialFilter();
			color = color ? "green" : "red";
			tooltipText = upgradeTextSplit[0] + "<span style='color: " + color + "; font-weight: bold;'>" + upgradeTextSplit[1]  + "</span>";
		}
		if (typeof tooltipText.split('?')[1] !== 'undefined' && what != 'Dominance'){
			var percentNum = (game.global.frugalDone) ? '60' : '50';
			tooltipText = tooltipText.replace('?', percentNum);
		}
		if (what == "Coordination"){
			var coordReplace = (getPerkLevel("Coordinated")) ? (25 * Math.pow(game.portal.Coordinated.modifier, getPerkLevel("Coordinated"))).toFixed(3) : 25;
			tooltipText = tooltipText.replace('<coord>', coordReplace);
			if (!canAffordCoordinationTrimps()){
				var currentSend = game.resources.trimps.getCurrentSend();
				if (game.global.challengeActive == "Trappapalooza") currentSend *= 0.25;
				else currentSend *= 3;
				var trimpCount = (game.global.challengeActive == "Trappapalooza") ? (game.resources.trimps.owned - game.resources.trimps.employed) : game.resources.trimps.realMax();
				var amtToGo = Math.floor((currentSend) - trimpCount);
				var s = (amtToGo == 1) ? "" : "s";
				if (game.global.challengeActive == "Trappapalooza") tooltipText += " <b>You need " + prettify(currentSend) + " unemployeed Trimps available.";
				else tooltipText += " <b>You need enough room for " + prettify(currentSend) + " max Trimps.";
				tooltipText += " You are short " + prettify(Math.floor(amtToGo)) + " Trimp" + s + ".</b>";
			}
		}
		if (typeof game.upgrades[what].name !== 'undefined') what = game.upgrades[what].name;
	}
	if (isItIn == "maps"){
		tooltipText = "This is a map. Click it to see its properties or to run it. Maps can be run as many times as you want.";
		costText = "";
	}
	if (what == 'confirm'){
		if (!renameBtn) renameBtn = "Confirm";
		what = numCheck;
		tooltipText = textString;
		if (attachFunction == null) attachFunction = "";
		if (!noHide) attachFunction = attachFunction + "; cancelTooltip()";
		attachFunction = (attachFunction) ? ' onclick="' + attachFunction + '"' : "";
		if (what != 'Spire Assault') costText = ' <div class="maxCenter" id="confirmTipCost"><div id="confirmTooltipBtn" class="btn btn-info"' + attachFunction + '>' + renameBtn + '</div>';
		if (!hideCancel) costText += '<div class="btn btn-danger" onclick="cancelTooltip()">Cancel</div>';
		costText += '</div>';
		game.global.lockTooltip = true;
		if (numCheck == "Alchemy" || numCheck == "Spire Assault"){
			elem.style.top = "0%";
			elem.style.left = "5%";
			swapClass('tooltipExtra', 'tooltipExtraBiggest', elem);
		}
		else{
			elem.style.left = "33.75%";
			elem.style.top = "25%";
		}
	}
	if (isItIn == 'customText') {
		costText = (attachFunction) ? attachFunction : "";
		tooltipText = textString;
		noExtraCheck = true;
		if (event == "lock"){
			if (what == "Spire Settings"){
				swapClass('tooltipExtra', 'tooltipExtraLg', elem);
				elem.style.left = "25%";
			}
			else{
				elem.style.left = "33.75%";
			}
			elem.style.top = "25%";
			game.global.lockTooltip = true;
			if (!attachFunction) costText = '<div class="btn btn-danger" onclick="cancelTooltip()">Close</div>';
			event = 'update';
		}
		if (numCheck == "center"){
			ondisplay = function(){
				verticalCenterTooltip();
			}
		}
	}

	if (!noExtraCheck){
		var tipSplit = tooltipText.split('$');
		if (typeof tipSplit[1] !== 'undefined'){
			if (tipSplit[1] == 'incby'){
				var increase = toTip.increase.by;
				if (toTip.increase.what == "trimps.max" && game.global.challengeActive == "Downsize") increase = 1;
				if (getPerkLevel("Carpentry") && toTip.increase.what == "trimps.max") increase *= Math.pow(1.1, getPerkLevel("Carpentry"));
				if (getPerkLevel("Carpentry_II") && toTip.increase.what == "trimps.max") increase *= (1 + (game.portal.Carpentry_II.modifier * getPerkLevel("Carpentry_II")));
				increase *= alchObj.getPotionEffect("Elixir of Crafting");
				tooltipText = tipSplit[0] + prettify(increase) + tipSplit[2];
				tooltipText = tooltipText.replace('{s}', needAnS(increase));
			}
			else if (isItIn == "jobs" && toTip.increase != "custom"){
				var newValue = toTip[tipSplit[1]];
				if (getPerkLevel("Motivation") > 0) newValue *= (1 + (getPerkLevel("Motivation") * 0.05));
				if (getPerkLevel("Motivation_II") > 0) newValue *= (1 + (getPerkLevel("Motivation_II") * game.portal.Motivation_II.modifier));
				if (game.global.challengeActive == "Alchemy") newValue *= alchObj.getPotionEffect("Potion of Finding");
				newValue *= alchObj.getPotionEffect("Elixir of Finding");
				if (game.global.pandCompletions) newValue *= game.challenges.Pandemonium.getTrimpMult();
				if (!game.portal.Observation.radLocked && game.global.universe == 2 && game.portal.Observation.trinkets > 0) newValue *= game.portal.Observation.getMult();
				if (Fluffy.isRewardActive('gatherer')) newValue *= 2;
				tooltipText = tipSplit[0] + prettify(newValue) + tipSplit[2];
			}
			else
			tooltipText = tipSplit[0] + prettify(toTip[tipSplit[1]]) + tipSplit[2];
		}
		if (isItIn == "buildings" && what.split(' ')[0] == "Warpstation" && game.global.lastWarp) {
			tooltipText += "<b> You had " + game.global.lastWarp + " Warpstations when you purchased your last Gigastation (" + game.upgrades.Gigastation.done + ").</b>";
		}
		if (typeof tooltipText.split('~') !== 'undefined') {
			var percentIncrease = game.upgrades.Gymystic.done;
			var text = ".";
			if (percentIncrease > 0){
				percentIncrease += 4;
				text = " and increases the base block of all Gyms by " + percentIncrease + "% (compounding).";
			}
			tooltipText = tooltipText.replace('~', text);
		}
	}
	titleText = (titleText) ? titleText : what;
	lastTooltipTitle = titleText;
	var tipNum = (tip2) ? "2" : "";
	if (usingScreenReader){
		if (event == "screenRead") {
			document.getElementById("tipTitle" + tipNum).innerHTML = "";
			document.getElementById("tipText" + tipNum).innerHTML = "";
			document.getElementById("tipCost" + tipNum).innerHTML = "";
			var readText = "<p>" + titleText + ": ";
			if (costText) readText += "Costs " + costText;
			readText += "</p><p>" + tooltipText + "</p>";
			document.getElementById('screenReaderTooltip').innerHTML = readText;
			game.global.lockTooltip = false;
			return;
		}
		else{
			if (game.global.lockTooltip){
				document.getElementById('screenReaderTooltip').innerHTML = "Confirmation Popup is active. Press S to view the popup."
			}
			else{
				document.getElementById('screenReaderTooltip').innerHTML = "";
			}
			game.global.lockTooltip = false;
		}
	}
	document.getElementById("tipTitle" + tipNum).innerHTML = titleText;
	document.getElementById("tipText" + tipNum).innerHTML = tooltipText;
	document.getElementById("tipCost" + tipNum).innerHTML = costText;
	elem.style.display = "block";
	if (ondisplay !== null)
		ondisplay();
	if (event != "update") positionTooltip(elem, event, renameBtn);
}

function screenReaderAssert(text){
	var elem = document.getElementById('screenReaderTooltip');
	if (elem) elem.innerHTML = text;
}

function updateMazPreset(index){
	var preset = parseInt(document.getElementById('mazPreset' + index).value, 10);
	var newClass = (preset == 3) ? "mazBwMainOn" : "mazBwMainOff";
	var row = document.getElementById('mazRow' + index);
	swapClass('mazBwMain', newClass, row);
	var until = parseInt(document.getElementById('mazRepeatUntil' + index).value, 10);
	if (preset != 3 && until == 5){
		until = 0;
		document.getElementById('mazRepeatUntil' + index).selectedIndex = until;
	}
	newClass = (until == 9) ? 'mazRxOn' : 'mazRxOff';
	swapClass('mazRx', newClass, row);
	newClass = (preset == 3 && until == 5) ? 'mazBwZoneOn' : 'mazBwZoneOff';
	swapClass('mazBwZone', newClass, row);
}

function getExtraScryerText(fromForm){
	var tooltipText = "";
	var formName = (fromForm == 4) ? "Scryer" : "Wind";
	if (game.global.formation == fromForm){
		if (!isScryerBonusActive()) tooltipText += "<p>You recently switched to " + formName + " Formation and will <b>not</b> earn a bonus from this enemy.</p>";
		else tooltipText += "<p>You will earn a bonus from this enemy!</p>";
		if (game.global.mapsActive){
			var currentMap = getCurrentMapObject();
			if (currentMap.bonus && mapSpecialModifierConfig[currentMap.bonus].cache){
				if (game.global.canScryCache) tooltipText += "<p>You will earn a bonus from the Cache at the end of this map!</p>";
				else tooltipText += "<p>You completed some of this map outside of " + formName + " Formation, and will <b>not</b> earn a bonus from the Cache.</p>";
			}
			if (game.global.voidBuff && game.talents.scry2.purchased){
				if (game.global.canScryCache) tooltipText += "<p>You will earn bonus Helium at the end of this map from Scryhard II!</p>";
				else tooltipText += "<p>You completed some of this map outside of " + formName + " Formation, and will <b>not</b> earn a bonus to Helium from Scryhard II</p>";
			}
		}
	}
	if (game.global.world >= 181){
		var essenceRemaining = countRemainingEssenceDrops();
		tooltipText += "<p><b>" + essenceRemaining + " remaining " + ((essenceRemaining == 1) ? "enemy in your current Zone is" : "enemies in your current Zone are") + " holding Dark Essence. Your current enemy at this Zone would be worth " + prettify(calculateScryingReward()) + " Essence if it were holding any.</b></p>"
	}
	return tooltipText;
}

function swapNiceCheckbox(elem, forceSetting){
	//Send just the elem to swap the current state
	//Send elem and either true or false as forceSetting to force the checkbox to checked/unchecked
	var checked;
	if (typeof forceSetting === 'undefined') checked = !readNiceCheckbox(elem);
	else checked = (forceSetting == true);
	var newClass = (checked) ? "icon-checkbox-checked" : "icon-checkbox-unchecked";
	swapClass("icon-", newClass, elem);
	elem.setAttribute('data-checked', checked);
}

function formatListCommasAndStuff(list){
	var output = "";
	if (!Array.isArray(list)) return list;
	if (list.length == 1) return list[0];
	for (var x = 0; x < list.length; x++){
		output += list[x];
		if (x == 0 && list.length == 2) output += " and ";
		else if (x < list.length - 2) output += ", ";
		else if (x != list.length - 1) output += ", and "; //dat Oxford comma
	}
	return output;
}

function readNiceCheckbox(elem){
	return (elem.dataset.checked == "true");
}

function buildNiceCheckbox(id, extraClass, enabled, extraFunction){
	var html = (enabled) ? "icomoon icon-checkbox-checked' data-checked='true' " : "icomoon icon-checkbox-unchecked' data-checked='false' ";
	var defaultClasses = " niceCheckbox noselect";
	var title = enabled ? "Checked" : "Not Checked";
	extraClass = (extraClass) ? extraClass + defaultClasses : defaultClasses;
	html = "class='" + extraClass + " " + html;
	extraFunction = (extraFunction) ? " " + extraFunction + ";" : "";
	html = "<span title='" + title + "' id='" + id + "' " + html + onchange + " onclick='swapNiceCheckbox(this);" + extraFunction + "'></span>";
	return html;	
}

function checkAlert(what, isItIn){
	if (document.getElementById(what + "Alert") === null) return;
		if (typeof game[isItIn] !== 'undefined') game[isItIn][what].alert = false;
		else return;
		document.getElementById(what + "Alert").innerHTML = "";
		if (document.getElementById(isItIn + "Alert") !== null)	document.getElementById(isItIn + "Alert").innerHTML = "";
}

function countAlertsIn(where){
	var count = 0;
	where = game[where];
	for (var item in where){
		item = where[item];
		if (item.alert) count++;
	}
	return count;
}

function positionTooltip(elem, event, extraInf){
	var cordx = 0;
	var cordy = 0;
	var e = event || window.event;
	if (!e) return;
	if (e.pageX || e.pageY) {
		cordx = e.pageX;
		cordy = e.pageY;
	} else if (e.clientX || e.clientY) {
		cordx = e.clientX;
		cordy = e.clientY;
	}
	lastMousePos = [cordx, cordy];
	var bodw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
		bodh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
		tiph = Math.max(elem.clientHeight, elem.scrollHeight, elem.offsetHeight),
		tipw = bodw * .325,
		center = cordx - (tipw / 2),
		spacing = bodh * 0.04,
		setLeft,
		setTop,
		setting;
		if (extraInf == "Heirloom") setting = 1;
		else setting = game.options.menu.tooltipPosition.enabled;
	if (extraInf == "forceLeft") {
		elem.style.left = Math.floor(cordx - (bodw * .55)) + "px";
		elem.style.top = Math.floor(cordy - (tiph * 0.5)) + "px";
		return;
	}
	
	if (setting == 0) {
		setLeft = cordx + spacing;
		if ((setLeft + tipw) > bodw) setLeft = (bodw - tipw);
		setTop = cordy - tiph - spacing;
	}
	if ((setting >= 1) || (setTop < 0)){
		setLeft = center;
		if (setLeft < 0)
			setLeft = 0;
		else if (setLeft > (bodw - tipw))
			setLeft = bodw - tipw;
		var maxAbove = (cordy - tiph - spacing);
		if (setting == 1 ||  (maxAbove < 0)){
			setTop = cordy + spacing;
			if ((setTop + tiph) > bodh)
				setTop = maxAbove;
		}
		else
			setTop = maxAbove;
	}
	elem.style.left = Math.floor(setLeft) + "px";
	elem.style.top = Math.floor(setTop) + "px";
}

function addTooltipPricing(toTip, what, isItIn) {
	var costText = "";
	var price;
	var canAfford;
	var percentOfTotal = "";
	for (var cost in toTip.cost) {
		if (typeof toTip.cost[cost] === 'object' && typeof toTip.cost[cost][1] === 'undefined') {
			var costItem = toTip.cost[cost];
			for (var item in costItem) {
				price = costItem[item];
				if (isItIn == "upgrades" && game.upgrades[what].prestiges && (item == "metal" || item == "wood")){
					if (game.global.challengeActive == "Daily" && typeof game.global.dailyChallenge.metallicThumb !== 'undefined'){
						price *= dailyModifiers.metallicThumb.getMult(game.global.dailyChallenge.metallicThumb.strength);
					}
					if (autoBattle.oneTimers.Artisan.owned && game.global.universe == 2){
						price *= autoBattle.oneTimers.Artisan.getMult();
					}
					if (game.global.challengeActive == "Obliterated"){
						price *= 1e12;
					}
					if (game.global.challengeActive == "Eradicated"){
						price *= game.challenges.Eradicated.scaleModifier;
					}
					if (game.global.challengeActive == "Pandemonium"){
						price *= game.challenges.Pandemonium.getEnemyMult();
					}
					price *= Math.pow(1 - game.portal.Artisanistry.modifier, getPerkLevel("Artisanistry"));
				}
				if (typeof price === 'function') price = price();
				if (typeof price[1] !== 'undefined') price = resolvePow(price, toTip);
				var itemToCheck = game[cost];
				if (typeof itemToCheck[item] !== 'undefined'){
					canAfford = (itemToCheck[item].owned >= price) ? "green" : "red";
					if ((item == "food" || item == "wood" || item == "metal") && price > getMaxForResource(item))
						canAfford = "orange";
					if (typeof itemToCheck[item].owned !== 'undefined'){
						if (itemToCheck[item].owned < price && (typeof game.resources[item] !== 'undefined')){
							var thisPs = getPsString(item, true);
							if (thisPs > 0){
								percentOfTotal = calculateTimeToMax(null, thisPs, (price - itemToCheck[item].owned));
								percentOfTotal = "(" + percentOfTotal + ")";
							}
							else percentOfTotal = "(<span class='icomoon icon-infinity'></span>)"
						}
						else {
							percentOfTotal = (itemToCheck[item].owned > 0) ? prettify(((price / itemToCheck[item].owned) * 100).toFixed(1)) : 0;
							percentOfTotal = "(" + percentOfTotal + "%)";
						}
					}
					costText += '<span class="' + canAfford + '">' + item + ':&nbsp;' + prettify(price) + '&nbsp;' + percentOfTotal + '</span>, ';
				}
				else
				costText += item + ": " + prettify(price) + ", ";
			}
			continue;
		}
	}
	costText = costText.slice(0, -2);
	return costText;
}

function configMessages(){
	var toCheck = ["Loot", "Unlocks", "Combat"];
	for (var x = 0; x < toCheck.length; x++){
		var name = toCheck[x];
		for (var item in game.global.messages[name]){
			if (item == "enabled") continue;
			var checkbox = document.getElementById(name + item);
			if (checkbox == null) continue;
			game.global.messages[name][item] = readNiceCheckbox(checkbox);
		}
	}
}

function messageConfigHover(what, event){
	var text = "";
	var title = "";
	switch(what){
		case 'Lootprimary':
			text = "Log the common loot items: Food, Wood, and Metal.";
			title = "Primary";
			break;
		case 'Lootsecondary':
			text = "Log the less common loot items: Gems, Fragments, Territory Bonus, and others.";
			title = "Secondary";
			break;
		case 'Lootevents':
			text = "Log drops and messages from temporary events, such as holidays.";
			title = "Events";
			break;
		case 'Lootexotic':
			text = "Log the rewards granted by Exotic Imports.";
			title = "Exotic";
			break;
		case 'Loothelium':
			text = "Log " + heliumOrRadon() + " rewards.";
			title = heliumOrRadon();
			break;
		case 'Unlocksrepeated':
			text = "Log all unlocks that drop more than once per run, such as Speedfarming or Coordination.";
			title = "Repeated";
			break;
		case 'Unlocksunique':
			text = "Log all unlocks that only drop once per portal, such as Gyms or Miners.";
			title = "Unique";
			break;
		case 'Combattrimp':
			text = "Log all combat messages involving your Trimps.";
			title = "Trimp";
			break;
		case 'Combatenemy':
			text = "Log all combat messages involving the enemy.";
			title = "Enemy";
			break;
		case 'Lootessence':
			text = "Log all Dark Essence found by scrying.";
			title = "Dark Essence";
			break;
		case 'Lootmagma':
			text = "Log drops from Magma cells, including Fuel and Magmite.";
			title = "Magma";
			break;
		case 'Loottoken':
			text = "Log Nature Tokens.";
			title = "Token";
			break;
		case 'Lootcache':
			text = "Log drops from Caches in maps.";
			title = "Cache";
			break;
		case 'Lootbone':
			text = "Log Bone drops from Skeletimps.";
			title = "Bone";
			break;
		case 'Lootexp':
			text = "Log Exp gained by pets.";
			title = "Exp";
			break;
		default: return;
	}
	document.getElementById('messageConfigMessage').innerHTML = "<b>" + title + "</b> - " + text;
	tooltip(title, 'customText', event, text);
}

var geneMenuOpen = false;

// Correct function to call to cancel the current tooltip
function cancelTooltip(ignore2){
	unlockTooltip();
	tooltip("hide");
	if (!ignore2){
		 document.getElementById('tooltipDiv2').style.display = 'none';
		 geneMenuOpen = false;
	}
	tooltipUpdateFunction = "";
	document.getElementById("tipCost").innerHTML = "";
	document.getElementById("tipText").className = "";
	customUp = 0;
	lastMousePos = [0, 0];
	openTooltip = null;
}

function unlockTooltip(){
	game.global.lockTooltip = false;
}

function getPsString(what, rawNum) {
	if (what == "helium") return;
	var resOrder = ["food", "wood", "metal", "science", "gems", "fragments"];
	var books = ["farming", "lumber", "miner", "science"];
	var jobs = ["Farmer", "Lumberjack", "Miner", "Scientist", "Dragimp", "Explorer"];
	var index = resOrder.indexOf(what);
	var job = game.jobs[jobs[index]];
	var book = game.upgrades["Speed" + books[index]];
	var mBook = game.upgrades["Mega" + books[index]];
	var base = (what == "fragments") ? 0.4 : 0.5;
	var textString =  "<table class='bdTableSm table table-striped'><tbody>";
	//Add base
	textString += "<tr><td class='bdTitle'>Base</td><td class='bdPercent'></td><td class='bdNumber'>" + prettify(base) + "</td></tr>";
	//Add job count
	var currentCalc = job.owned * base;
	var s = job.owned == 1 ? "" : "s";
	textString += "<tr><td class='bdTitle'>" + jobs[index] + s + "</td><td class='bdPercent'>" + prettify(job.owned) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	//Add books
	if (typeof book !== 'undefined' && book.done > 0){
		var bookStrength = Math.pow(1.25, book.done);
		currentCalc *= bookStrength;
		bookStrength = prettify((bookStrength - 1) * 100) + "%";
		textString += "<tr><td class='bdTitle'>Speed" + books[index] + "</td><td class='bdPercent'>+ " + bookStrength + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Megabooks
	if (typeof mBook !== 'undefined' && mBook.done > 0){
		var mod = (game.global.frugalDone) ? 1.6 : 1.5;
		var mBookStrength = Math.pow(mod, mBook.done);
		currentCalc *= mBookStrength;
		mBookStrength = prettify((mBookStrength - 1) * 100) + "%";
		textString += "<tr><td class='bdTitle'>Mega" + books[index] + "</td><td class='bdPercent'>+ " + mBookStrength + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add bounty
	if (what != "gems" && game.upgrades.Bounty.done > 0){
		currentCalc *= 2;
		textString += "<tr><td class='bdTitle'>Bounty</td><td class='bdPercent'>+ 100%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Tribute
	if (what == "gems" && game.buildings.Tribute.owned > 0){
		var tributeStrength = Math.pow(game.buildings.Tribute.increase.by, game.buildings.Tribute.owned);
		currentCalc *= tributeStrength;
		tributeStrength = prettify((tributeStrength - 1) * 100) + "%";
		textString += "<tr><td class='bdTitle'>Tribute</td><td class='bdPercent'>+ " + tributeStrength + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Whipimp
	if (game.unlocks.impCount.Whipimp > 0){
		var whipStrength = Math.pow(1.003, game.unlocks.impCount.Whipimp);
		currentCalc *= (whipStrength);
		whipStrength = prettify((whipStrength - 1) * 100) + "%";
		textString += "<tr><td class='bdTitle'>Whipimp</td><td class='bdPercent'>+ " + whipStrength + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add motivation
	if (getPerkLevel("Motivation") > 0){
		var motivationStrength = (getPerkLevel("Motivation") * game.portal.Motivation.modifier);
		currentCalc  *= (motivationStrength + 1);
		motivationStrength = prettify(motivationStrength * 100) + "%";
		textString += "<tr><td class='bdTitle'>Motivation</td><td class='bdPercent'>+ " + motivationStrength + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (getPerkLevel("Motivation_II") > 0){
		var motivationStrength = (getPerkLevel("Motivation_II") * game.portal.Motivation_II.modifier);
		currentCalc  *= (motivationStrength + 1);
		motivationStrength = prettify(motivationStrength * 100) + "%";
		textString += "<tr><td class='bdTitle'>Motivation II</td><td class='bdPercent'>+ " + motivationStrength + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (!game.portal.Observation.radLocked && game.global.universe == 2 && game.portal.Observation.trinkets > 0){
		var mult = game.portal.Observation.getMult();
		currentCalc *= mult;
		textString += "<tr><td class='bdTitle'>Observation</td><td class='bdPercent'>" + formatMultAsPercent(mult) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Fluffy Gatherer
	if (Fluffy.isRewardActive('gatherer')) {
		currentCalc  *= 2;
		textString += "<tr><td class='bdTitle'>Gatherer (" + Fluffy.getName() + ")</td><td class='bdPercent'>+ 100%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";	
	}
	//Add Meditation
	if (getPerkLevel("Meditation") > 0){
		var meditation = game.portal.Meditation;
		var medStrength = meditation.getBonusPercent();
		if (medStrength > 0){
			currentCalc *= (1 + (medStrength * .01));
			textString += "<tr><td class='bdTitle'>Meditation</td><td class='bdPercent'>" + (meditation.getBonusPercent(true) * 10) + " minutes (+" + medStrength + "%)</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
		}
	}
	var potionFinding;
	if (game.global.challengeActive == "Alchemy") potionFinding = alchObj.getPotionEffect("Potion of Finding");
	if (potionFinding > 1 && what != "fragments" && what != "science"){
		currentCalc  *= potionFinding;
		textString += "<tr><td class='bdTitle'>Potion of Finding</td><td class='bdPercent'>+ " + prettify((potionFinding - 1) * 100) + "%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	potionFinding = alchObj.getPotionEffect("Elixir of Finding");
	if (potionFinding > 1 && what != "fragments" && what != "science"){
		currentCalc  *= potionFinding;
		textString += "<tr><td class='bdTitle'>Elixir of Finding</td><td class='bdPercent'>+ " + prettify((potionFinding - 1) * 100) + "%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Magmamancer
	if (game.jobs.Magmamancer.owned > 0 && what == "metal"){
		var manceStrength = game.jobs.Magmamancer.getBonusPercent();
		if (manceStrength > 1){
			currentCalc *= manceStrength;
			manceStrength = (manceStrength - 1) * 100;
			textString += "<tr><td class='bdTitle'>Magmamancers</td><td class='bdPercent'>" + (game.jobs.Magmamancer.getBonusPercent(true) * 10) + " minutes (+" + prettify(manceStrength) + "%)</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
		}
	}
	if (game.upgrades.Speedexplorer.done > 0 && what == "fragments"){
		var bonus = Math.pow(4, game.upgrades.Speedexplorer.done);
		currentCalc *= bonus;
		textString += "<tr><td class='bdTitle'>Speedexplorer</td><td class='bdPercent'>+ " + prettify((bonus - 1) * 100) + "%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Size (challenge)
	if (game.global.challengeActive == "Size"){
		currentCalc *= 1.5;
		textString += "<tr><td class='bdTitle'>Huge (Size)</td><td class='bdPercent'>+ 50%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}	//Add meditate (challenge)
	if (game.global.challengeActive == "Downsize"){
		currentCalc *= 5;
		textString += "<tr><td class='bdTitle'>Solitary (Downsize)</td><td class='bdPercent'>+ 400%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Meditate"){
		currentCalc *= 1.25;
		textString += "<tr><td class='bdTitle'>Meditate</td><td class='bdPercent'>+ 25%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Toxicity"){
		var toxMult = (game.challenges.Toxicity.lootMult * game.challenges.Toxicity.stacks) / 100;
		currentCalc *= (1 + toxMult);
		toxMult = (toxMult * 100).toFixed(1) + "%";
		textString += "<tr><td class='bdTitle'>Tweaky (Toxicity)</td><td class='bdPercent'>+ " + toxMult + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Balance" || game.global.challengeActive == "Unbalance"){
		var chal = game.challenges[game.global.challengeActive];
		currentCalc *= chal.getGatherMult();
		textString += "<tr><td class='bdTitle'>Strength (" + game.global.challengeActive + ")</td><td class='bdPercent'>+ " + chal.getGatherMult(true) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Decay"){
		currentCalc *= 10;
		textString += "<tr><td class='bdTitle'>Sanity (Decay)</td><td class='bdPercent'>x 10</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
		var stackStr = Math.pow(game.challenges.Decay.decayValue, game.challenges.Decay.stacks);
		currentCalc *= stackStr;
		textString += "<tr style='color: red'><td class='bdTitle'>Decay</td><td class='bdPercent'>x " + stackStr.toFixed(3) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Melt"){
		currentCalc *= 10;
		textString += "<tr><td class='bdTitle'>Sanity (Melt)</td><td class='bdPercent'>x 10</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
		var stackStr = Math.pow(game.challenges.Melt.decayValue, game.challenges.Melt.stacks);
		currentCalc *= stackStr;
		textString += "<tr style='color: red'><td class='bdTitle'>Melt</td><td class='bdPercent'>x " + stackStr.toFixed(3) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Watch"){
		currentCalc /= 2;
		textString += "<tr style='color: red'><td class='bdTitle'>Sleepy (Watch)</td><td class='bdPercent'>50%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Lead" && ((game.global.world % 2) == 1)){
		currentCalc *= 2;
		textString += "<tr><td class='bdTitle'>Determined (Lead)</td><td class='bdPercent'>+ 100%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Archaeology" && what != "fragments"){
		var mult = game.challenges.Archaeology.getStatMult("science");
		var count = game.challenges.Archaeology.getPoints("science");
		var style = (count < 0) ? " style='color: red'" : "";
		currentCalc *= mult;
		textString += "<tr" + style + "><td class='bdTitle'>Resource Relic</td><td class='bdPercent'>x " + prettify(mult) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Insanity"){
		var mult = game.challenges.Insanity.getLootMult();
		currentCalc *= mult;
		textString += "<tr><td class='bdTitle'>Insane (Insanity)</td><td class='bdPercent'>+ " + (100 * (mult - 1)).toFixed(4) + "%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.challenges.Nurture.boostsActive() && what != "fragments"){
		var mult = game.challenges.Nurture.getResourceBoost();
		currentCalc *= mult;
		textString += "<tr><td class='bdTitle'>Cruffys</td><td class='bdPercent'>" + formatMultAsPercent(mult) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.pandCompletions && what != "fragments"){
		var mult = game.challenges.Pandemonium.getTrimpMult();
		currentCalc *= mult;
		textString += "<tr><td class='bdTitle'>Pandemonium</td><td class='bdPercent'>" + formatMultAsPercent(mult) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Daily"){
		var mult = 0;
		if (typeof game.global.dailyChallenge.dedication !== 'undefined'){
			mult = dailyModifiers.dedication.getMult(game.global.dailyChallenge.dedication.strength);
			currentCalc *= mult;
			textString += "<tr><td class='bdTitle'>Dedicated (Daily)</td><td class='bdPercent'>+ " + prettify((mult * 100) - 100) + "%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
		}
		if (typeof game.global.dailyChallenge.famine !== 'undefined' && what != "fragments" && what != "science"){
			mult = dailyModifiers.famine.getMult(game.global.dailyChallenge.famine.strength);
			currentCalc *= mult;
			textString += "<tr style='color: red'><td class='bdTitle'>Famine (Daily)</td><td class='bdPercent'>" + prettify(mult * 100) + "%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
		}
	}
	if (game.global.challengeActive == "Hypothermia" && what == "wood"){
		var mult = game.challenges.Hypothermia.getWoodMult(true);
		currentCalc *= mult;
		textString += "<tr style='color: red'><td class='bdTitle'>Hypothermia</td><td class='bdPercent'>x " + prettify(mult) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if ((what == "food" && game.buildings.Antenna.owned >= 5) || (what == "metal" && game.buildings.Antenna.owned >= 15)){
		var mult = game.jobs.Meteorologist.getExtraMult();
		currentCalc *= mult;
		textString += "<tr><td class='bdTitle'>Antenna Network</td><td class='bdPercent'>+ " + prettify((mult - 1) * 100) + "%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if ((what == "food" || what == "metal" || what == "wood") && getParityBonus() > 1){
		var mult = getParityBonus();
		currentCalc *= mult;
		textString += "<tr><td class='bdTitle'>Parity (Staff)</td><td class='bdPercent'>+ " + prettify((mult - 1) * 100) + "%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if ((what == "food" || what == "metal" || what == "wood") && autoBattle.oneTimers.Gathermate.owned && game.global.universe == 2){
		var mult = autoBattle.oneTimers.Gathermate.getMult();
		currentCalc *= mult;
		textString += "<tr><td class='bdTitle'>Gathermate</td><td class='bdPercent'>" + formatMultAsPercent(mult) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (what != "fragments" && getEmpowerment() == "Wind"){
		var windMod = game.empowerments.Wind.getCombatModifier();
		currentCalc *= (1 + windMod);
		textString += "<tr><td class='bdTitle'>Swiftness (Wind)</td><td class='bdPercent'>+ " + prettify(windMod * 100) +"%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	var heirloomBonus = calcHeirloomBonus("Staff", jobs[index] + "Speed", 0, true);
	if (heirloomBonus > 0){
		currentCalc *= ((heirloomBonus / 100) + 1);
		heirloomBonus = prettify(heirloomBonus) + '%';
		textString += "<tr><td class='bdTitle'>Heirloom (Staff)</td><td class='bdPercent'>+ " + heirloomBonus + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add player
	if (game.global.playerGathering == what){
		if ((game.talents.turkimp2.purchased || game.global.turkimpTimer > 0) && (what == "food" || what == "wood" || what == "metal")){
			var tBonus = 50;
			if (game.talents.turkimp2.purchased) tBonus = 100;
			else if (game.talents.turkimp2.purchased) tBonus = 75;
			currentCalc *= (1 + (tBonus / 100));
			textString += "<tr><td class='bdTitle'>Sharing Food</td><td class='bdPercent'>+ " + tBonus + "%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
		}
		var playerStrength = getPlayerModifier();
		currentCalc += playerStrength;
		textString += "<tr><td class='bdTitle'>You</td><td class='bdPercent'>+ " + prettify(playerStrength) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";

	}
	//Add Loot	ALWAYS LAST
	if (game.options.menu.useAverages.enabled){
		var avg = getAvgLootSecond(what);
		if (avg > 0.001) {
			currentCalc += avg;
			textString += "<tr><td class='bdTitle'>Average Loot</td><td class='bdPercent'>+ " + prettify(avg) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
		}
	}
	if (rawNum) return currentCalc;
	textString += "</tbody></table>";
	game.global.lockTooltip = false;
	tooltip('confirm', null, 'update', textString, "getPsString('" + what + "')", what.charAt(0).toUpperCase() + what.substr(1, what.length) + " Per Second", "Refresh", true);
}

function getZoneMinutes(){
	return ((getGameTime() - game.global.zoneStarted) / 1000 / 60);
}

function getZoneSeconds(){
	return Math.floor((getGameTime() - game.global.zoneStarted) / 1000);
}


function getZoneStats(event, update) {
	if (!update && game.global.lockTooltip) return;
	var textString =  "<table class='bdTable table table-striped'><tbody>";
	textString += "<tr><td class='bdTitle bdZoneTitle' colspan='3'>Zone "  + game.global.world + ", Cell " + (game.global.lastClearedCell + 2) + "</td></tr>";
	textString += "<tr><td colspan='3'>You have been in this Zone for " + formatSecondsForZoneTime(getZoneSeconds()) + "</td></tr>";
	if (game.global.spireActive) textString += "<tr><td colspan='3'>" + game.global.spireDeaths + " group" + needAnS(game.global.spireDeaths) + " of Trimps" + ((game.global.spireDeaths == 1) ? " has" : " have") + " died in this Spire.</td></tr>";
	if ((game.global.mapsActive || game.global.preMapsActive) && game.global.currentMapId){
		var map = game.global.mapsOwnedArray[getMapIndex(game.global.currentMapId)];
		textString += "<tr><td class='bdTitle bdZoneTitle' colspan='3'>" + map.name + ", Level " + map.level;
		if (map.location == "Bionic" && game.talents.bionic2.purchased)
			textString += " (P, FA)";
		else if (map.bonus && typeof mapSpecialModifierConfig[map.bonus] !== 'undefined')
			textString += " (" + mapSpecialModifierConfig[map.bonus].abv + ")";
		textString += ", Cell " + (game.global.lastClearedMapCell + 2) + "</td></tr>";
		textString += '<tr><td><span class="' + getMapIcon(map) + '"></span> ' + ((map.location == "Void") ? voidBuffConfig[game.global.voidBuff].title : getMapIcon(map, true)) + '</td><td><span class="icomoon icon-gift2"></span>' + Math.floor(map.loot * 100) + '%</span> <span class="icomoon icon-cube2"></span>' + map.size + ' <span class="icon icon-warning"></span>' + Math.floor(map.difficulty * 100) + '%</td><td>' + ((map.location == "Void") ? '&nbsp' : ('Items: ' + addSpecials(true, true, map))) + '</td></tr>';
		textString += "<tr><td colspan='3'>You have been on this map for " + formatSecondsForZoneTime((getGameTime() - game.global.mapStarted) / 1000) + "</td></tr>";
		var stackedMaps = 0;
		if (Fluffy.isRewardActive('void')) stackedMaps = countStackedVoidMaps();
		if (map.location == "Void") textString += "<tr><td colspan='3'>You have " + game.global.totalVoidMaps + " Void Map" + ((game.global.totalVoidMaps == 1) ? "" : "s") + ((stackedMaps) ? " (" + stackedMaps + " stacked)." : "") + "</td></tr>";
	}
	if (game.global.challengeActive == "Quest" && game.global.world >= game.challenges.Quest.getQuestStartZone()){
		textString += "<tr><td class='bdTitle bdZoneTitle' colspan='3'>Quest: " + game.challenges.Quest.getQuestDescription(true) + "</td></tr>";
	}
	textString += "</tbody></table>";
	if (update) {
		document.getElementById("tipText").innerHTML = textString;
		return;
	}
	tooltip("World Info", "customText", event, textString)
	tooltipUpdateFunction = function() {
		getZoneStats(null, true);
	}

}

function countStackedVoidMaps(){
	var count = 0;
	for (var x = 0; x < game.global.mapsOwnedArray.length; x++){
		if (game.global.mapsOwnedArray[x].location == "Void") count++;
	}
	return count;
}

function getTrimpPs() {
	if (game.global.challengeActive == "Trapper" || game.global.challengeActive == "Trappapalooza") return;
	var trimps = game.resources.trimps;
	var base = 0.0085;
	var textString =  "<table class='bdTable table table-striped'><tbody>";
	//Add base
	textString += "<tr><td class='bdTitle'>Base</td><td class='bdPercent'></td><td class='bdNumber'>" + base + "</td></tr>";
	//Add job count
	var breeding = trimps.owned - trimps.employed;
	var currentCalc = breeding * base;
	textString += "<tr><td class='bdTitle'>Breeding</td><td class='bdPercent'>" + prettify(breeding) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	//Add Potency
	if (game.upgrades.Potency.done > 0){
		var potencyStrength = Math.pow(1.1, game.upgrades.Potency.done);
		currentCalc *= potencyStrength;
		potencyStrength = prettify((potencyStrength - 1) * 100) + "%";
		textString += "<tr><td class='bdTitle'>Potency</td><td class='bdPercent'>+ " + potencyStrength + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Nurseries
	if (game.buildings.Nursery.owned > 0){
		var nurseryStrength = Math.pow(1.01, game.buildings.Nursery.owned);
		currentCalc *= nurseryStrength;
		nurseryStrength = prettify((nurseryStrength - 1) * 100) + "%";
		textString += "<tr><td class='bdTitle'>Nurseries</td><td class='bdPercent'>+ " + nurseryStrength + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Venimp
	if (game.unlocks.impCount.Venimp > 0){
		var venimpStrength = Math.pow(1.003, game.unlocks.impCount.Venimp);
		currentCalc *= (venimpStrength);
		venimpStrength = prettify((venimpStrength - 1) * 100) + "%";
		textString += "<tr><td class='bdTitle'>Venimp</td><td class='bdPercent'>+ " + venimpStrength + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.brokenPlanet){
		currentCalc /= 10;
		textString += "<tr style='color: red'><td class='bdTitle'>Broken Planet</td><td class='bdPercent'>x 0.1</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";

	}
	//Add pheromones
	if (getPerkLevel("Pheromones") > 0){
		var PheromonesStrength = (getPerkLevel("Pheromones") * game.portal.Pheromones.modifier);
		currentCalc  *= (PheromonesStrength + 1);
		PheromonesStrength = prettify(PheromonesStrength * 100) + "%";
		textString += "<tr><td class='bdTitle'>Pheromones</td><td class='bdPercent'>+ " + PheromonesStrength + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Geneticist
	if (game.jobs.Geneticist.owned > 0) {
		var mult = Math.pow(.98, game.jobs.Geneticist.owned);
		currentCalc *= mult;
		var display = (mult > 0.0001) ? mult.toFixed(4) : mult.toExponential(3);
		textString += "<tr style='color: red'><td class='bdTitle'>Geneticist</td><td class='bdPercent'>x  " + display + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add quick trimps
	if (game.singleRunBonuses.quickTrimps.owned){
		currentCalc *= 2;
		textString += "<tr><td class='bdTitle'>Quick Trimps</td><td class='bdPercent'>+ 100%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Daily"){
		var mult = 0;
		if (typeof game.global.dailyChallenge.dysfunctional !== 'undefined'){
			mult = dailyModifiers.dysfunctional.getMult(game.global.dailyChallenge.dysfunctional.strength);
			currentCalc *= mult;
			textString += "<tr style='color: red'><td class='bdTitle'>Dysfunctional (Daily)</td><td class='bdPercent'>x  " + mult.toFixed(3) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>"
		}
		if (typeof game.global.dailyChallenge.toxic !== 'undefined'){
			mult = dailyModifiers.toxic.getMult(game.global.dailyChallenge.toxic.strength, game.global.dailyChallenge.toxic.stacks);
			currentCalc *= mult;
			textString += "<tr style='color: red'><td class='bdTitle'>Toxic (Daily)</td><td class='bdPercent'>x  " + mult.toFixed(3) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>"
		}
	}
	if (game.global.challengeActive == "Toxicity" && game.challenges.Toxicity.stacks > 0){
		var potencyMod = Math.pow(game.challenges.Toxicity.stackMult, game.challenges.Toxicity.stacks);
		currentCalc *= potencyMod;
		textString += "<tr style='color: red'><td class='bdTitle'>Toxic Air</td><td class='bdPercent'>x  " + potencyMod.toFixed(3) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>"
	}
	if (game.global.challengeActive == "Archaeology"){
		var mult = game.challenges.Archaeology.getStatMult("breed");
		var count = game.challenges.Archaeology.getPoints("breed");
		var style = (count < 0) ? " style='color: red'" : "";
		currentCalc *= mult;
		textString += "<tr" + style + "><td class='bdTitle'>Breed Relic</td><td class='bdPercent'>x  " + prettify(mult) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>"
	}
	if (game.global.challengeActive == "Quagmire" && game.challenges.Quagmire.exhaustedStacks != 0){
		var mult = game.challenges.Quagmire.getExhaustMult();
		currentCalc *= mult;
		var dispTotal = "";
		if (mult < 1){
			textString += "<tr style='color: red'>";
			dispTotal = "x " + prettify(mult);
		}
		else{
			textString += "<tr>";
			dispTotal = "+ " + prettify((mult - 1) * 100) + "%";
		}
		textString += "<td class='bdTitle'>Exhausted</td><td class='bdPercent'>" + dispTotal + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.voidBuff == "slowBreed"){
		currentCalc *= 0.2;
		textString += "<tr style='color: red'><td class='bdTitle'>Void Gas</td><td class='bdPercent'>x  0.2</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>"
	}
	var heirloomBonus = calcHeirloomBonus("Shield", "breedSpeed", 0, true);
	if (heirloomBonus > 0){
		currentCalc *= ((heirloomBonus / 100) + 1);
		heirloomBonus = prettify(heirloomBonus) + '%';
		textString += "<tr><td class='bdTitle'>Heirloom (Shield)</td><td class='bdPercent'>+ " + heirloomBonus + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>"
	}
	textString += "</tbody></table>";
	game.global.lockTooltip = false;
	tooltip('confirm', null, 'update', textString, "getTrimpPs()", "Trimps Per Second", "Refresh", true);
}

function getFluctuation(number, minFluct, maxFluct){
	var min = Math.floor(number * (1 - minFluct));
    var max = Math.ceil(number + (number * maxFluct));
	return "<td>" + prettify(min) + "</td><td>" + prettify(max) + "</td>";
}

function getBattleStatBd(what) {
	var equipment = {};
	var name = what.charAt(0).toUpperCase() + what.substr(1, what.length);
	if ((what == "block" || what == "shield") && game.global.universe == 2){
		what = "shield"
		name = "Prismatic Shield";
	}
	var textString =  "<div id='breakdownScrollWrapper' class='niceScroll'><table class='bdTableSm table table-striped'><tbody><tr><td></td><td>Base</td><td>Level</td><td>Item " + name + "</td><td>Total</td>" + ((what == "attack") ? "<td>Min</td><td>Max</td>" : "") + "</tr>";
	var currentCalc = 0;
	var maxFluct = 0.2;
	var minFluct = 0.2;
	var percent = 0;
	if (what == "health" || what == "attack"){
		currentCalc += (what == "health") ? 50 : 6;
		textString += "<tr><td class='bdTitle'>Base</td><td class='bdPercentSm'>" + prettify(currentCalc) + "</td><td></td><td></td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? "<td>-20%</td><td>+20%</td>" : "") + "</tr>";
		if (what == "attack"){
			//Discipline
			if (game.global.challengeActive == "Discipline" || game.global.challengeActive == "Unlucky"){
				minFluct = 0.995;
				maxFluct = 0.995;
				var title = (game.global.challengeActive == "Discipline") ? "Lack Discipline" : "Unharnessed Luck";
				textString += "<tr><td class='bdTitle'>" + title + "</td><td class='bdPercentSm'></td><td></td><td></td><td class='bdNumberSm'></td><td>-99.5%</td><td>+99.5%</td></tr>";
			}
			else {
				//Range
					if (getPerkLevel("Range") > 0){
						minFluct -= (0.02 * getPerkLevel("Range"));
						textString += "<tr><td class='bdTitle'>Range</td><td class='bdPercentSm'>+2% Min</td><td>" + getPerkLevel("Range") + "</td><td>+" + prettify(2 * getPerkLevel("Range")) + "% Min</td><td class='bdNumberSm'></td><td>-" + prettify(minFluct * 100) + "%</td><td>+" + prettify(maxFluct * 100) + "%</td></tr>";
					}
				//MinDamageDaily
					if (typeof game.global.dailyChallenge.minDamage !== 'undefined'){
						var addMin = dailyModifiers.minDamage.getMult(game.global.dailyChallenge.minDamage.strength);
						minFluct += addMin;
						if (minFluct > 1) minFluct = 1;
						textString += "<tr style='color: red'><td class='bdTitle'>Minimalist (Daily)</td><td class='bdPercentSm'>-" + prettify(addMin * 100) + "% Min</td><td></td><td></td><td class='bdNumberSm'></td><td>-" + prettify(minFluct * 100) + "%</td><td>+" + prettify(maxFluct * 100) + "%</td></tr>";
					}
				//MaxDamageDaily
					if (typeof game.global.dailyChallenge.maxDamage !== 'undefined'){
						var addMax = dailyModifiers.maxDamage.getMult(game.global.dailyChallenge.maxDamage.strength);
						maxFluct += addMax;
						textString += "<tr><td class='bdTitle'>Prodigal (Daily)</td><td class='bdPercentSm'>+" + prettify(addMax * 100) + "% Max</td><td></td><td></td><td class='bdNumberSm'></td><td>-" + prettify(minFluct * 100) + "%</td><td>+" + prettify(maxFluct * 100) + "%</td></tr>";
					}
			}
		}
		for (var equip in game.equipment){
			var temp = game.equipment[equip];
			if (typeof temp[what] === 'undefined' || temp.level <= 0 || temp.blockNow) continue;
			var equipStrength = temp[what + "Calculated"] * temp.level;
			currentCalc += equipStrength;
			percent = ((equipStrength / game.global[what]) * 100).toFixed(1) + "%";
			textString += "<tr><td class='bdTitle'>" + equip + "</td><td>" + prettify(temp[what + "Calculated"]) + "</td><td>" + temp.level + "</td><td>" + prettify(equipStrength) + " (" + percent + ")</td><td>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";
		}
	}
	else if (what == "block"){
		//Add Gym
		var gym = game.buildings.Gym;
		if (gym.owned > 0){
			var gymStrength = gym.owned * gym.increase.by;
			percent = ((gymStrength / game.global.block) * 100).toFixed(1) + "%";
			currentCalc += gymStrength;
			textString += "<tr><td class='bdTitle'>Gym</td><td>" + prettify(gym.increase.by) + "</td><td>" + prettify(gym.owned) + "</td><td>" + prettify(gymStrength) + " (" + percent + ")</td><td>" + prettify(currentCalc) + "</td></tr>";
		}
		var shield = game.equipment.Shield;
		if (shield.blockNow && shield.level > 0){
			var shieldStrength = shield.level * shield.blockCalculated;
			percent = ((shieldStrength / game.global.block) * 100).toFixed(1) + "%";
			currentCalc += shieldStrength;
			textString += "<tr><td class='bdTitle'>Shield</td><td>" + prettify(shield.blockCalculated) + "</td><td>" + prettify(shield.level) + "</td><td>" + prettify(shieldStrength) + " (" + percent + ")</td><td>" + prettify(currentCalc) + "</td></tr>";
		}
		var trainer = game.jobs.Trainer;
		if (trainer.owned > 0){
			var trainerStrength = trainer.owned * (trainer.modifier / 100);
			trainerStrength = calcHeirloomBonus("Shield", "trainerEfficiency", trainerStrength);
			currentCalc  = Math.floor(currentCalc * (trainerStrength + 1));
			trainerStrength = prettify(trainerStrength * 100) + "%";
			textString += "<tr><td class='bdTitle'>Trainers</td><td>" + prettify(calcHeirloomBonus("Shield", "trainerEfficiency", trainer.modifier)) + "%</td><td>" + prettify(trainer.owned) + "</td><td>+ " + trainerStrength + "</td><td>" + prettify(currentCalc) + "</td></tr>";
		}
	}
	else if (what == "shield"){
		if (game.upgrades.Prismatic.done){
			currentCalc += 0.5;
			textString += "<tr><td class='bdTitle'>Prismatic (Z2)</td><td>50%</td><td>1</td><td>50%</td><td>" + Math.round(currentCalc * 100) + "%</td></tr>";
		}
		if (game.upgrades.Prismalicious.done){
			currentCalc += 0.5;
			textString += "<tr><td class='bdTitle'>Prismalicious (Z20)</td><td>50%</td><td>1</td><td>50%</td><td>" + Math.round(currentCalc * 100) + "%</td></tr>";
		}
		if (Fluffy.isRewardActive("prism")){
			var thisAmt = Fluffy.isRewardActive("prism") * 0.25;
			currentCalc += thisAmt;
			textString += "<tr><td class='bdTitle'>Prisms (Scruffy)</td><td>25%</td><td>" + Fluffy.isRewardActive("prism") + "</td><td>" + prettify(thisAmt * 100) + "%</td><td>" + Math.round(currentCalc * 100) + "%</td></tr>";
		}
		if (getPerkLevel("Prismal") > 0){
			var thisAmt = (getPerkLevel("Prismal") * game.portal.Prismal.modifier);
			currentCalc += thisAmt;
			textString += "<tr><td class='bdTitle'>Prismal (Perk)</td><td>" + prettify(game.portal.Prismal.modifier * 100) + "%</td><td>" + getPerkLevel("Prismal") + "</td><td>" + prettify(thisAmt * 100) + "%</td><td>" + Math.round(currentCalc * 100) + "%</td></tr>";
		}
		if (game.global.challengeActive == "Bublé"){
			currentCalc += 2.5;
			textString += "<tr><td class='bdTitle'>Bublé (Challenge)</td><td>100%</td><td>&nbsp;</td><td>250%</td><td>" + Math.round(currentCalc * 100) + "%</td></tr>";

		}
		if (getHeirloomBonus("Shield", "prismatic") > 0){
			var bonus = getHeirloomBonus("Shield", "prismatic");
			currentCalc += (bonus / 100);
			textString += "<tr><td class='bdTitle'>Heirloom</td><td>&nbsp;</td><td>&nbsp;</td><td>" + prettify(bonus) + "%</td><td>" + Math.round(currentCalc * 100) + "%</td></tr>";
		}
		if (autoBattle.oneTimers.Suprism.owned){
			var bonus = autoBattle.oneTimers.Suprism.getMult();
			currentCalc += bonus;
			textString += "<tr><td class='bdTitle'>Suprism</td><td>3%</td><td>" + (autoBattle.maxEnemyLevel - 1) + "</td><td>" + prettify(bonus * 100) + "%</td><td>" + Math.round(currentCalc * 100) + "%</td></tr>";
		}
		if (Fluffy.isRewardActive('shieldlayer')){
			var layers = (Fluffy.isRewardActive('shieldlayer') + 1);
			currentCalc *= layers
			textString += "<tr class='shieldLayerCalcRow'><td class='bdTitle'>Shield Layer</td><td>&nbsp;</td><td>&nbsp;</td><td>x " + layers + "</td><td>" + Math.round(currentCalc * 100) + "%</td></tr>";
		}
		textString += "<tr><td colspan='5' style='font-weight: bold'>Your Prismatic Shield is equal to " + Math.round(currentCalc * 100) + "% of your Trimps' maximum Health. All enemy damage hits your Prismatic Shield before Health, and Prismatic Shield always regenerates to full after an enemy is killed.</td></tr>";
	}
	//Add coordination
	if (what != "shield"){
		currentCalc  *= game.resources.trimps.maxSoldiers;
		textString += "<tr><td class='bdTitle'>Soldiers</td><td class='bdPercentSm'></td><td></td><td>x " + prettify(game.resources.trimps.maxSoldiers) + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";
	}
	//Add smithy
	if ((what == "attack" || what == "health") && game.global.universe == 2 && game.buildings.Smithy.owned > 0){
		currentCalc *= game.buildings.Smithy.getMult();
		textString += "<tr><td class='bdTitle'>Smithy</td><td>x 1.25</td><td>" + game.buildings.Smithy.owned + "</td><td>+ " + prettify((game.buildings.Smithy.getMult() - 1) * 100) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";
	}
	//Add antenna
	if (what == "health" && game.buildings.Antenna.owned >= 10 && game.global.universe == 2){
		amt = game.jobs.Meteorologist.getExtraMult();
		var pct = (amt - 1) * 100;
		currentCalc *= amt;
		textString += "<tr><td class='bdTitle'>Antenna Array</td><td>" + prettify(pct) + "%</td><td></td><td>+ " + prettify(pct) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td></tr>";	
	}
	//Add achievements
	if (what == "attack" && game.global.achievementBonus > 0){
		currentCalc *= 1 + (game.global.achievementBonus / 100);
		textString += "<tr><td class='bdTitle'>Achievements</td><td class='bdPercentSm'></td><td></td><td>+ " + game.global.achievementBonus + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>"
	}
	//Add perk
	var perk = "";
	if (what == "health") perk = "Toughness";
	if (what == "attack") perk = "Power";
	if (perk && getPerkLevel(perk) > 0){
		var PerkStrength = (getPerkLevel(perk) * game.portal[perk].modifier);
		currentCalc  *= (PerkStrength + 1);
		PerkStrength = prettify(PerkStrength * 100) + "%";
		textString += "<tr><td class='bdTitle'>" + perk + "</td><td>" + (game.portal[perk].modifier * 100) + "%</td><td>" + getPerkLevel(perk) + "</td><td>+ " + PerkStrength + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";
	}
	perk = perk + "_II";
	if (game.portal[perk] && getPerkLevel(perk) > 0){
		var PerkStrength = (getPerkLevel(perk) * game.portal[perk].modifier);
		currentCalc  *= (PerkStrength + 1);
		PerkStrength = prettify(PerkStrength * 100) + "%";
		textString += "<tr><td class='bdTitle'>" + perk.replace('_', ' ') + "</td><td>" + (game.portal[perk].modifier * 100) + "%</td><td>" + prettify(getPerkLevel(perk)) + "</td><td>+ " + PerkStrength + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";
	}
	if (what == "attack" && getPerkLevel("Tenacity")){
		amt = game.portal.Tenacity.getMult();
		currentCalc *= amt;
		var mins = Math.floor(game.portal.Tenacity.getTime());
		textString += "<tr><td class='bdTitle'>Tenacity</td><td>x " + prettify(game.portal.Tenacity.getBonusAmt()) + "</td><td>" + (getPerkLevel("Tenacity") + getPerkLevel("Masterfulness")) + " (" + mins + " min" + needAnS(mins) + ")</td><td>+ " + prettify((amt -1 ) * 100) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	if (what == "attack" && getPerkLevel("Hunger")){
		amt = game.portal.Hunger.getMult();
		currentCalc *= amt;
		textString += "<tr><td class='bdTitle'>Hunger</td><td></td><td>" + getPerkLevel("Hunger") + "</td><td>+ " + prettify((amt -1 ) * 100) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";

	}
	//Add resilience
	if (what == "health" && getPerkLevel("Resilience") > 0){
		var resStrength = Math.pow(game.portal.Resilience.modifier + 1, getPerkLevel("Resilience"));
		currentCalc *= resStrength;
		resStrength = prettify((resStrength - 1) * 100) + "%";
		textString += "<tr><td class='bdTitle'>Resilience</td><td>" + (game.portal.Resilience.modifier * 100) + "%</td><td>" + getPerkLevel("Resilience") + "</td><td>+ " + resStrength + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add fluffy u2 healthy
	if (what == "health" && Fluffy.isRewardActive("healthy")){
		currentCalc *= 1.5;
		textString += "<tr><td class='bdTitle'>" + Fluffy.getName() + " is Life</td><td>+ 50%</td><td>&nbsp;</td><td>+ 50%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td></tr>";	
	}
	//Add Geneticist
	var geneticist = game.jobs.Geneticist;
	if (game.global.lastLowGen > 0 && what == "health"){
		var calcedGenes = game.global.lastLowGen;
		var geneticistStrength = Math.pow(1.01, calcedGenes);
		currentCalc  *= geneticistStrength;
		geneticistStrength = prettify((geneticistStrength * 100) - 100) + "%";
		textString += "<tr><td class='bdTitle'>Geneticists</td><td>1%</td><td>" + prettify(calcedGenes) + "</td><td>+ " + geneticistStrength + "</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Anticipation
	var anticipation = game.portal.Anticipation;
	if (getPerkLevel("Anticipation") > 0 && what == "attack"){
		var antiStrength = ((getPerkLevel("Anticipation") * anticipation.modifier * game.global.antiStacks) + 1);
		currentCalc *= antiStrength;
		antiStrength = prettify((antiStrength - 1) * 100) + "%";
		textString += "<tr><td class='bdTitle'>Anticipation</td><td>2% (x" + game.global.antiStacks + ")</td><td>" + prettify(getPerkLevel("Anticipation")) + "</td><td>+ " + antiStrength + "</td><td>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";

	}
	if (!game.portal.Observation.radLocked && game.global.universe == 2 && game.portal.Observation.trinkets > 0 && (what == "attack" || what == "health")){
		var obsMult = game.portal.Observation.getMult();
		currentCalc *= obsMult;
		textString += "<tr><td class='bdTitle'>Observation</td><td>" + (game.portal.Observation.radLevel + 1) + "%</td><td>" + prettify(game.portal.Observation.trinkets) + "</td><td>" + formatMultAsPercent(obsMult) + "</td><td>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";

	}
	//Add formations
	if (game.global.formation > 0 && game.global.formation != 5){
		var formStrength = 0.5;
		if ((game.global.formation == 1 && what == "health") || (game.global.formation == 2 && what == "attack") || (game.global.formation == 3 && what == "block")) formStrength = 4;
		currentCalc *= formStrength;
		textString += "<tr><td class='bdTitle'>Formation</td><td></td><td></td><td>x " + formStrength + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";

	}
	//Add Titimp
	if (game.global.titimpLeft > 1 && game.global.mapsActive && what == "attack"){
		currentCalc *= 2;
		textString += "<tr><td class='bdTitle'>Titimp</td><td></td><td></td><td>x 2</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	//Add map bonus
	if (!game.global.mapsActive && game.global.mapBonus > 0 && what == "attack"){
		var base = 0.2;
		var displayBase = "20%";
		if (game.talents.mapBattery.purchased && game.global.mapBonus == 10){
			base = 0.4;
			displayBase = "40%";
		}
		var mapBonusMult = base * game.global.mapBonus;
		currentCalc *= (1 + mapBonusMult);
		mapBonusMult *= 100;
		textString += "<tr><td class='bdTitle'>Map Bonus</td><td>" + displayBase + "</td><td>" + game.global.mapBonus + "</td><td>+ " + prettify(mapBonusMult) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	//Add RoboTrimp
	if (what == "attack" && game.global.roboTrimpLevel > 0){
		var roboTrimpMod = 0.2 * game.global.roboTrimpLevel;
		currentCalc *= (1 + roboTrimpMod);
		roboTrimpMod *= 100;
		textString += "<tr><td class='bdTitle'><span class='icomoon icon-chain'></span> RoboTrimp <span class='icomoon icon-chain'></span></td><td>20%</td><td>" + game.global.roboTrimpLevel + "</td><td>+ " + prettify(roboTrimpMod) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	if ((what == "attack" || what == "health") && game.global.mayhemCompletions){
		var mult = game.challenges.Mayhem.getTrimpMult();
		currentCalc  *= mult;
		textString += "<tr><td class='bdTitle'>Mayhem Completions</td><td>+ 10N%</td><td>" + game.global.mayhemCompletions + "</td><td>+ " + prettify((mult - 1) * 100) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";
	}
	if ((what == "attack" || what == "health") && game.global.pandCompletions){
		var mult = game.challenges.Pandemonium.getTrimpMult();
		currentCalc  *= mult;
		textString += "<tr><td class='bdTitle'>Pandemonium Completions</td><td>+ 10N%</td><td>" + game.global.pandCompletions + "</td><td>+ " + prettify((mult - 1) * 100) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";
	}
	if ((what == "attack" || what == "health") && autoBattle.bonuses.Stats.level > 0 && game.global.universe == 2){
		var mult = autoBattle.bonuses.Stats.getMult();
		currentCalc  *= mult;
		textString += "<tr><td class='bdTitle'>Spire Assault Stats</td><td>+ 10%</td><td>" + autoBattle.bonuses.Stats.level + "</td><td>+ " + prettify((mult - 1) * 100) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";
	}
	//Add challenges
	if (what == "health" && game.global.challengeActive == "Life"){
		currentCalc *= game.challenges.Life.getHealthMult();
		textString += "<tr><td class='bdTitle'>Unliving (Life)</td><td>10%</td><td>" + game.challenges.Life.stacks + "</td><td>+ " + game.challenges.Life.getHealthMult(true) + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (what == "attack" && game.global.challengeActive == "Life"){
		currentCalc *= game.challenges.Life.getHealthMult();
		textString += "<tr><td class='bdTitle'>Unliving (Life)</td><td></td><td></td><td>+ " + game.challenges.Life.getHealthMult(true) + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	if (what == "health" && game.global.challengeActive == "Duel" && game.challenges.Duel.trimpStacks < 20){
		currentCalc *= 10;
		textString += "<tr><td class='bdTitle'>Rallying Cry (Duel)</td><td>x 10</td><td></td><td>x 10</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (what == "attack" && game.global.challengeActive == "Duel" && game.challenges.Duel.trimpStacks > 50){
		currentCalc *= 3;
		textString += "<tr><td class='bdTitle'>Winning (Duel)</td><td>x 3</td><td></td><td>x 3</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	if (what == "health" && game.global.challengeActive == "Balance"){
		var mult = game.challenges.Balance.getHealthMult();
		currentCalc *= mult;
		var display = (mult > 0.0001) ? mult.toFixed(4) : mult.toExponential(3);
		textString += "<tr style='color: red'><td class='bdTitle'>Weakness (Balance)</td><td>1%</td><td>" + game.challenges.Balance.balanceStacks + "</td><td>x " + display + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (what == "attack" && game.global.challengeActive == "Lead" && ((game.global.world % 2) == 1)){
		currentCalc *= 1.5;
		textString += "<tr><td class='bdTitle'>Determined (Lead)</td><td></td><td></td><td>+ 50%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	if (what == "attack" && game.global.challengeActive == "Quagmire" && game.challenges.Quagmire.exhaustedStacks != 0){
		var mult = game.challenges.Quagmire.getExhaustMult();
		currentCalc *= mult;
		var dispPercent = "";
		var dispTotal = "";
		if (mult < 1){
			textString += "<tr style='color: red'>";
			dispPercent = (game.global.mapsActive) ? "-5%" : "-10%";
			dispTotal = "x " + prettify(mult);
		}
		else{
			textString += "<tr>";
			dispPercent = (game.global.mapsActive) ? "5%" : "10%";
			dispTotal = "+ " + prettify((mult - 1) * 100) + "%";
		}
		textString += "<td class='bdTitle'>Exhausted (Quagmire)</td><td>" + dispPercent + "</td><td>" + game.challenges.Quagmire.exhaustedStacks + "</td><td>" + dispTotal + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	if (what != "shield"){
		var heirloomBonus = calcHeirloomBonus("Shield", "trimp" + capitalizeFirstLetter(what), 0, true);
		if (heirloomBonus > 0){
			currentCalc *= ((heirloomBonus / 100) + 1);
			heirloomBonus = prettify(heirloomBonus) + '%';
			textString += "<tr><td class='bdTitle'>Heirloom (Shield)</td><td></td><td></td><td>+ " + heirloomBonus + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";
		}
	}
	if (game.global.challengeActive == "Decay" && what == "attack"){
		currentCalc *= 5;
		textString += "<tr><td class='bdTitle'>Sanity (Decay)</td><td></td><td></td><td class='bdPercent'>x 5</td><td class='bdNumber'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
		var stackStr = Math.pow(game.challenges.Decay.decayValue, game.challenges.Decay.stacks);
		currentCalc *= stackStr;
		textString += "<tr style='color: red'><td class='bdTitle'>Decay</td><td>x 0.995</td><td>" + game.challenges.Decay.stacks + "</td><td class='bdPercent'>x " + stackStr.toFixed(3) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	if (game.global.challengeActive == "Melt" && what == "attack"){
		currentCalc *= 5;
		textString += "<tr><td class='bdTitle'>Sanity (Melt)</td><td></td><td></td><td class='bdPercent'>x 5</td><td class='bdNumber'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
		var stackStr = Math.pow(game.challenges.Melt.decayValue, game.challenges.Melt.stacks);
		currentCalc *= stackStr;
		textString += "<tr style='color: red'><td class='bdTitle'>Melt</td><td>x 0.995</td><td>" + game.challenges.Melt.stacks + "</td><td class='bdPercent'>x " + stackStr.toFixed(3) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	if (game.global.challengeActive == "Quest" && game.challenges.Quest.finishedQuests > 0 && what == "attack"){
		amt = game.challenges.Quest.getAttackMult();
		currentCalc *= amt;
		textString += "<tr><td class='bdTitle'>Finished Quests!</td><td>x 1.1</td><td>" + game.challenges.Quest.finishedQuests + "</td><td class='bdPercent'>+ " + prettify((amt - 1) * 100) + "%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	if (game.global.challengeActive == "Revenge" && game.challenges.Revenge.stacks > 0 && (what == "attack" || what == "health")){
		amt = game.challenges.Revenge.getMult();
		currentCalc *= amt;
		textString += "<tr><td class='bdTitle'>Revenge</td><td>+ 20%</td><td>" + game.challenges.Revenge.stacks + "</td><td class='bdPercent'>+ " + prettify((amt - 1) * 100) + "%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";
	}
	if ((game.global.challengeActive == "Electricity" || game.global.challengeActive == "Mapocalypse") && what == "attack") {
		var mult = (1 - (game.challenges.Electricity.stacks * 0.1));
		currentCalc *= mult;

		textString += "<tr style='color: red'><td class='bdTitle'>" + game.global.challengeActive + "</td><td>-10%</td><td>" + game.challenges.Electricity.stacks.toString() + "</td><td class='bdPercent'>x " + mult.toFixed(1) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	if (game.global.challengeActive == "Archaeology" && what == "attack"){
		var mult = game.challenges.Archaeology.getStatMult(what);
		var count = game.challenges.Archaeology.getPoints(what);
		var style = (count < 0) ? " style='color: red'" : "";
		currentCalc *= mult;
		textString += "<tr><td" + style + " class='bdTitle'>Relic Strength</td><td>x1.05</td><td>" + count + "</td><td class='bdPercent'>x " + prettify(mult) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";
	}
	if (what == "attack" && game.global.challengeActive == "Storm" && game.global.mapsActive){
		var mult = game.challenges.Storm.getMapMult();
		currentCalc *= mult;
		textString += "<tr style='color: red'><td class='bdTitle'>Beta Trimps</td><td>-0.05%</td><td>" + game.challenges.Storm.beta + "</td><td>x " + prettify(mult) + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	if (what == "health" && game.global.challengeActive == "Insanity"){
		var mult = game.challenges.Insanity.getHealthMult();
		currentCalc *= mult;
		textString += "<tr style='color: red'><td class='bdTitle'>Insanity</td><td>x 0.99</td><td>" + game.challenges.Insanity.insanity + "</td><td>x " + prettify(mult) + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (what == "attack" && game.global.challengeActive == "Berserk" && game.challenges.Berserk.frenzyStacks > 0){
		var mult = game.challenges.Berserk.getAttackMult();
		currentCalc *= mult;
		textString += "<tr><td class='bdTitle'>Frenzied</td><td>+50%</td><td>" + game.challenges.Berserk.frenzyStacks + "</td><td>x " + prettify(mult) + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	if (what == "health" && game.global.challengeActive == "Berserk" && game.challenges.Berserk.frenzyStacks > 0){
		var mult = game.challenges.Berserk.getHealthMult();
		currentCalc *= mult;
		textString += "<tr style='color: red'><td class='bdTitle'>Frenzied</td><td>-2%</td><td>" + game.challenges.Berserk.frenzyStacks + "</td><td>x " + prettify(mult) + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td></tr>";
	}
	else if (what == "health" && game.global.challengeActive == "Berserk" && game.challenges.Berserk.weakened > 0){
		var mult = game.challenges.Berserk.getHealthMult();
		currentCalc *= mult;
		textString += "<tr style='color: red'><td class='bdTitle'>Weakened</td><td>-4.99%</td><td>" + game.challenges.Berserk.weakened + "</td><td>x " + prettify(mult) + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td></tr>";

	}
	if (what == "attack" && game.portal.Frenzy.frenzyActive()){
		var mult = game.portal.Frenzy.getAttackMult();
		currentCalc *= mult;
		textString += "<tr><td class='bdTitle'>Frenzied</td><td>+50%</td><td>" + getPerkLevel("Frenzy") + "</td><td>x " + prettify(mult) + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	if ((what == "attack" || what == "health") && getPerkLevel("Championism")){
		var mult = game.portal.Championism.getMult();
		currentCalc  *= mult;
		textString += "<tr><td class='bdTitle'>Championism</td><td>" + (1 + (0.5 * (autoBattle.maxEnemyLevel - 1))) + "%</td><td>" + getPerkLevel("Championism") + "</td><td>" + formatMultAsPercent(mult) + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";
	}
	if ((what == "attack" || what == "health") && game.global.challengeActive == "Alchemy" && game.global.universe == 2){
		var mult = alchObj.getPotionEffect("Potion of Strength");
		currentCalc  *= mult;
		textString += "<tr><td class='bdTitle'>Potion of Strength</td><td>+ 15%</td><td>" + alchObj.getPotionCount("Potion of Strength") + "</td><td>" + formatMultAsPercent(mult) + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";
	}
	if (game.global.challengeActive == "Daily"){
		var mult = 0;
		if (typeof game.global.dailyChallenge.weakness !== 'undefined' && what == "attack"){
			mult = dailyModifiers.weakness.getMult(game.global.dailyChallenge.weakness.strength, game.global.dailyChallenge.weakness.stacks);
			currentCalc *= mult;
			textString += "<tr style='color: red'><td class='bdTitle'>Weakness (Daily)</td><td>" + formatMultAsPercent(dailyModifiers.weakness.getMult(game.global.dailyChallenge.weakness.strength, 1)) + "</td><td>" + game.global.dailyChallenge.weakness.stacks + "</td><td class='bdPercent'>" + formatMultAsPercent(mult) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
		}
		if (typeof game.global.dailyChallenge.oddTrimpNerf !== 'undefined' && what == "attack" && (game.global.world % 2 == 1)){
			mult = dailyModifiers.oddTrimpNerf.getMult(game.global.dailyChallenge.oddTrimpNerf.strength);
			currentCalc *= mult;
			textString += "<tr style='color: red'><td class='bdTitle'>Oddly Weak (Daily)</td><td>" + formatMultAsPercent(mult) + "</td><td></td><td class='bdPercent'>" + formatMultAsPercent(mult) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
		}
		if (typeof game.global.dailyChallenge.evenTrimpBuff !== 'undefined' && what == "attack" && (game.global.world % 2 == 0)){
			mult = dailyModifiers.evenTrimpBuff.getMult(game.global.dailyChallenge.evenTrimpBuff.strength);
			currentCalc *= mult;
			textString += "<tr><td class='bdTitle'>Even Stronger (Daily)</td><td>" + formatMultAsPercent(mult) + "</td><td></td><td class='bdPercent'>" + formatMultAsPercent(mult) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
		}
		if (typeof game.global.dailyChallenge.rampage !== 'undefined' && what == "attack"){
			mult = dailyModifiers.rampage.getMult(game.global.dailyChallenge.rampage.strength, game.global.dailyChallenge.rampage.stacks);
			currentCalc *= mult;
			textString += "<tr><td class='bdTitle'>Rampage (Daily)</td><td>" + formatMultAsPercent(dailyModifiers.rampage.getMult(game.global.dailyChallenge.rampage.strength, 1)) + "</td><td>" + game.global.dailyChallenge.rampage.stacks + "</td><td class='bdPercent'>" + formatMultAsPercent(mult) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
		}
		if (typeof game.global.dailyChallenge.pressure !== 'undefined' && what == "health"){
			mult = dailyModifiers.pressure.getMult(game.global.dailyChallenge.pressure.strength, game.global.dailyChallenge.pressure.stacks);
			currentCalc *= mult;
			textString += "<tr style='color: red'><td class='bdTitle'>Pressure (Daily)</td><td>" + formatMultAsPercent(mult) + "</td><td></td><td class='bdPercent'>" + formatMultAsPercent(mult) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
		}
	}
	if (game.global.challengeActive == "Wither" && what == "health"){
		mult = game.challenges.Wither.getTrimpHealthMult();
		currentCalc *= mult;
		textString += "<tr><td class='bdTitle'>Hardness (Wither)</td><td>+ 0.1%</td><td>" + game.challenges.Wither.trimpStacks + "</td><td class='bdPercent'>" + formatMultAsPercent(mult) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add golden battle
	if (what != "block" && what != "shield" && game.goldenUpgrades.Battle.currentBonus > 0){
		amt = game.goldenUpgrades.Battle.currentBonus;
		currentCalc *= 1 + amt;
		textString += "<tr><td class='bdTitle'>Golden Battle</td><td></td><td></td><td>+ " + prettify(amt * 100) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";
	}
	//Masteries
	if (what == "attack" && game.talents.herbalist.purchased){
		amt = game.talents.herbalist.getBonus();
		currentCalc *= amt;
		amt = (amt - 1) * 100;
		textString += "<tr><td class='bdTitle'>Herbalist</td><td></td><td></td><td>+ " + prettify(amt) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	if (what != "block" && what != "shield" && game.talents.voidPower.purchased && game.global.voidBuff){
		amt = (game.talents.voidPower2.purchased) ? ((game.talents.voidPower3.purchased) ? 65 : 35) : 15;
		currentCalc *= (1 + (amt / 100));
		textString += "<tr><td class='bdTitle'>Void Power</td><td></td><td>" + ((game.talents.voidPower2.purchased) ? ((game.talents.voidPower3.purchased) ? "III" : "II") : "I") + "</td><td>+ " + amt + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";
	}
	if (what == "attack" && isScryerBonusActive() && game.talents.scry.purchased && !game.global.mapsActive && (getCurrentWorldCell().mutation == "Corruption" || getCurrentWorldCell().mutation == "Healthy")){
		currentCalc *= 2;
		textString += "<tr><td class='bdTitle'>Scryhard I</td><td>+100%</td><td></td><td>+ 100%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	if (what == "attack" && game.talents.daily.purchased && game.global.challengeActive == "Daily"){
		currentCalc *= 1.5;
		textString += "<tr><td class='bdTitle'>Legs for Days</td><td>+50%</td><td></td><td>+ 50%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	if (game.talents.magmamancer.purchased && what == "attack" && game.jobs.Magmamancer.getBonusPercent() > 1){
		amt = game.jobs.Magmamancer.getBonusPercent();
		currentCalc *= amt;
		textString += "<tr><td class='bdTitle'>Magmamancermancy</td><td></td><td></td><td>+ " + prettify((amt - 1) * 100) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	if (game.talents.stillRowing2.purchased && what == "attack" && game.global.spireRows >= 1){
		amt = game.global.spireRows * 0.06;
		currentCalc *= (amt + 1);
		textString += "<tr><td class='bdTitle'>Still Rowing II</td><td>6%</td><td>" + game.global.spireRows + "</td><td>+ " + prettify(amt * 100) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	if (game.talents.healthStrength.purchased && what == "attack" && mutations.Healthy.active()){
		var cellCount = mutations.Healthy.cellCount();
		amt = (0.15 * cellCount);
		currentCalc *= (amt + 1);
		textString += "<tr><td class='bdTitle'>Strength in Health</td><td>15%</td><td>" + cellCount + "</td><td>+ " + prettify(amt * 100) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	if (what == "attack" && game.global.mapsActive && game.talents.bionic2.purchased && getCurrentMapObject().level > game.global.world){
		currentCalc *= 1.5;
		textString += "<tr><td class='bdTitle'>Bionic Magnet II</td><td>+50%</td><td></td><td>+ 50%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	if (what == "attack" && game.global.voidBuff && game.talents.voidMastery.purchased){
		currentCalc *= 5;
		textString += "<tr><td class='bdTitle'>Master of the Void</td><td>x5</td><td></td><td>x 5</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";

	}
	if (what == "health" && game.talents.mapHealth.purchased && game.global.mapsActive){
		currentCalc *= 2;
		textString += "<tr><td class='bdTitle'>Safe Mapping</td><td>x 2</td><td class='bdNumberSm'>&nbsp;</td><td class='bdNumberSm'>x 2</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Pumpkimp buff
	if (game.global.sugarRush > 0 && what == "attack"){
		currentCalc *= sugarRush.getAttackStrength();
		textString += "<tr class='pumpkimpRow'><td class='bdTitle'>Sugar Rush</td><td>&nbsp;</td><td>&nbsp;</td><td>x " + sugarRush.getAttackStrength() + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";		
	}

	//Challenge^2 bonus
	if (game.global.totalSquaredReward > 0 && (what == "attack" || what == "health")){
		amt = game.global.totalSquaredReward;
		currentCalc *= (1 + (amt / 100));
		var c2Name = (game.global.highestRadonLevelCleared < 49) ? "2" : "<span class='icomoon icon-infinity'></span>";
		textString += "<tr><td class='bdTitle'>Challenge<sup>" + c2Name + "</sup> Rewards</td><td></td><td></td><td>+ " + prettify(amt) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>"
	}

	//Ice
	if (what == "attack" && (getEmpowerment() == "Ice")){
		amt = game.empowerments.Ice.getDamageModifier();
		currentCalc *= (1 + amt);
		textString += "<tr><td class='bdTitle'>Chilled Enemy</td><td></td><td></td><td>+ " + prettify(amt * 100) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>"

	}
	//Fluffy/Scruffy
	if (what == "attack" && Fluffy.isActive()){
		amt = Fluffy.getDamageModifier();
		currentCalc *= amt;
		textString += "<tr><td class='bdTitle'>" + Fluffy.getName() + "</td><td></td><td></td><td>+ " + prettify((amt -1 ) * 100) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>"
	}
	//Fluffy E8
	if (what == "attack" && Fluffy.isRewardActive('voidSiphon') && game.stats.totalVoidMaps.value){
		var voids = game.stats.totalVoidMaps.value;
		var voidWeight = 0.05;
		amt = voidWeight * voids;
		currentCalc *= (1 + amt);
		var voidE = ((game.talents.fluffyAbility.purchased) ? "8" : "9");
		textString += "<tr><td class='bdTitle'>Void Siphon (" + Fluffy.getName() + " E" + voidE + ")</td><td>+ " + (voidWeight * 100) + "%</td><td>" + voids + "</td><td>+ " + prettify(amt * 100) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>"
	}
	//Cruffys
	if (game.challenges.Nurture.boostsActive() && (what == "attack" || what == "health")){
		mult = game.challenges.Nurture.getStatBoost();
		currentCalc *= mult;
		textString += "<tr><td class='bdTitle'>Cruffys</td><td></td><td>" + game.challenges.Nurture.getLevel() + "</td><td class='bdPercent'>" + formatMultAsPercent(mult) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";
	}
	//Magma
	if (mutations.Magma.active() && (what == "attack" || what == "health")){
		mult = mutations.Magma.getTrimpDecay();
		var lvls = game.global.world - mutations.Magma.start() + 1;
		currentCalc *= mult;
		var display = (mult > 0.0001) ? mult.toFixed(4) : mult.toExponential(3);
		textString += "<tr style='color: red'><td class='bdTitle'>Overheating (Magma)</td><td>x 0.8</td><td>" + lvls + "</td><td class='bdPercent'>x " + display + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td>" + ((what == "attack") ? getFluctuation(currentCalc, minFluct, maxFluct) : "") + "</tr>";
	}
	//Amalgamator health
	if (what == "health" && game.jobs.Amalgamator.owned > 0){
		amt = game.jobs.Amalgamator.getHealthMult();
		currentCalc *= amt;
		textString += "<tr><td class='bdTitle'>Amalgamator</td><td>x " + prettify(game.jobs.Amalgamator.healthModifier) + "</td><td class='bdNumberSm'>" + prettify(game.jobs.Amalgamator.owned) + "</td><td class='bdNumberSm'>x " + prettify(amt) + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Gator attack
	if (what == "attack" && game.jobs.Amalgamator.owned > 0){
		amt = game.jobs.Amalgamator.getDamageMult();
		currentCalc *= amt;
		textString += "<tr><td class='bdTitle'>Amalgamator</td><td>+ " + prettify(game.jobs.Amalgamator.damageModifier * 100) + "%</td><td>" + game.jobs.Amalgamator.owned + "</td><td>+ " + prettify((amt -1 ) * 100) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>"
		
	}
	//Strength Towers - TD
	if (what == "attack" && playerSpireTraps.Strength.owned){
		amt = playerSpireTraps.Strength.getWorldBonus();
		currentCalc *= (1 + (amt / 100));
		textString += "<tr><td class='bdTitle'>Strength Tower" + needAnS(playerSpireTraps.Strength.owned) + "</td><td>+ " + prettify(playerSpireTraps.Strength.getWorldBonus(true)) + "%</td><td>" + playerSpireTraps.Strength.owned + "</td><td>+ " + prettify(amt) + "%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>"
		
	}
	if (what == "attack" && getUberEmpowerment() == "Poison"){
		currentCalc *= 3;
		textString += "<tr><td class='bdTitle'>Enlightened Poison</td><td>x 3</td><td></td><td>x 3</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>"
	}
	//Sharp Trimps - bones
	if (what == "attack" && game.singleRunBonuses.sharpTrimps.owned){
		currentCalc *= 1.5;
		textString += "<tr><td class='bdTitle'>Sharp Trimps</td><td></td><td></td><td>+ 50%</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>"
		
	}

	if (what == "attack" && game.global.challengeActive == "Unbalance"){
		var mult = game.challenges.Unbalance.getAttackMult()
		currentCalc *= mult;
		var display = (mult > 0.0001) ? mult.toFixed(4) : mult.toExponential(3);
		textString += "<tr style='color: red'><td class='bdTitle'>Weakness (Unbalance)</td><td>x 0.99</td><td>" + game.challenges.Unbalance.balanceStacks + "</td><td>x " + display + "</td><td class='bdNumberSm'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}
	if (what == "attack" && getPerkLevel("Equality") > 0){
		mult = game.portal.Equality.getMult(true);
		currentCalc *= mult;
		var display = prettifyTiny(mult);
		var modifier = game.portal.Equality.getModifier(true);
		var modDisplay = (modifier > 0.0001) ? modifier.toFixed(4) : modifier.toExponential(3);
		textString += "<tr style='color: red'><td class='bdTitle'>Equality</td><td>x " + modDisplay + "</td><td>" + game.portal.Equality.getActiveLevels() + "</td><td class='bdPercent'>x " + display + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td>" + getFluctuation(currentCalc, minFluct, maxFluct) + "</tr>";
	}

	//Crit
	if (what == "attack"){
		var critChance = getPlayerCritChance();
		var thisCritChance = 0;
		var critCalc = 0;
		var critMult = 0;
		var baseCritMult = getPlayerCritDamageMult();
		if (critChance < 0){
			//From reduced crit chance daily or maybe other stuff later
			critMult = 1;
			critCalc = currentCalc;
			textString += "<tr class='critRow'><td class='bdTitle'><span style='color: yellow;'>Crit!</span> Chance</td><td>0% (" + (critChance * 100).toFixed(1) + "% Total)</td><td class='bdTitle'><span style='color: yellow;'>Crit!</span> Damage</td><td>+ " + prettify((critMult - 1) * 100) + "%</td><td class='bdNumberSm'>" + prettify(critCalc) + "</td>" + getFluctuation(critCalc, minFluct, maxFluct) + "</tr>";
			textString += "<tr class='critRow'><td class='bdTitle'><span style='color: cyan;'>Weak!</span> Chance</td><td>" + (Math.abs(critChance) * 100).toFixed(1) + "%</td><td class='bdTitle'><span style='color: cyan;'>Weak!</span> Damage</td><td>x 0.2</td><td class='bdNumberSm'>" + prettify(currentCalc * 0.2) + "</td>" + getFluctuation((currentCalc * 0.2), minFluct, maxFluct) + "</tr>";
		}
		else {
			if (critChance > 0){
				critMult = baseCritMult;
				if (critChance >= 2) thisCritChance = 0;
				else if (critChance >= 1) thisCritChance = 1 - (critChance % 1);
				else thisCritChance = critChance;
				critCalc = currentCalc * critMult;
				textString += "<tr class='critRow'><td class='bdTitle'><span style='color: yellow;'>Crit!</span> Chance</td><td>" + (thisCritChance * 100).toFixed(1) + "%";
				if (critChance > 1) textString += " (" + (critChance * 100).toFixed(1) + "% Total)";
				textString += "</td><td class='bdTitle'><span style='color: yellow;'>Crit!</span> Damage</td><td>+ " + prettify((critMult - 1) * 100) + "%</td><td class='bdNumberSm'>" + prettify(critCalc) + "</td>" + getFluctuation(critCalc, minFluct, maxFluct) + "</tr>";
			}
			if (critChance > 1 && critChance < 3){
				if (critChance >= 2) thisCritChance = 1 - (critChance % 1);
				else thisCritChance = critChance - 1;
				critMult = getMegaCritDamageMult(2);
				critCalc = currentCalc * critMult * baseCritMult;
				textString += "<tr class='critRow'><td class='bdTitle'><span style='color: orange;'>CRIT!</span> Chance</td><td>" + (thisCritChance * 100).toFixed(1) + "%</td><td class='bdTitle'><span style='color: orange;'>CRIT!</span> Damage</td><td><span style='color: yellow;'>Crit!</span> x " + prettify(critMult) + "</td><td class='bdNumberSm'>" + prettify(critCalc) + "</td>" + getFluctuation(critCalc, minFluct, maxFluct) + "</tr>";
			}
			if (critChance > 2 && critChance < 4){
				if (critChance >= 3) thisCritChance = 1 - (critChance % 1);
				else thisCritChance = critChance - 2;
				critMult = getMegaCritDamageMult(3);
				critCalc = currentCalc * critMult * baseCritMult;
				textString += "<tr class='critRow'><td class='bdTitle'><span style='color: red;'>CRIT!!</span> Chance</td><td>" + (thisCritChance * 100).toFixed(1) + "%</td><td class='bdTitle'><span style='color: red;'>CRIT!!</span> Damage</td><td><span style='color: yellow;'>Crit!</span> x " + prettify(critMult) + "</td><td class='bdNumberSm'>" + prettify(critCalc) + "</td>" + getFluctuation(critCalc, minFluct, maxFluct) + "</tr>";
			}
			if (critChance > 3 && critChance < 5){
				if (critChance >= 4) thisCritChance = 1 - (critChance % 1);
				else thisCritChance = critChance - 3;
				critMult = getMegaCritDamageMult(4);
				critCalc = currentCalc * critMult * baseCritMult;
				textString += "<tr class='critRow'><td class='bdTitle'><span class='critTier4'>CRIT<span class='icomoon icon-atom'></span></span> Chance</td><td>" + (thisCritChance * 100).toFixed(1) + "%</td><td class='bdTitle'><span class='critTier4'>CRIT<span class='icomoon icon-atom'></span></span> Damage</td><td><span style='color: yellow;'>Crit!</span> x " + prettify(critMult) + "</td><td class='bdNumberSm'>" + prettify(critCalc) + "</td>" + getFluctuation(critCalc, minFluct, maxFluct) + "</tr>";
			}
			if (critChance > 4 && critChance < 6){
				if (critChance >= 5) thisCritChance = 1 - (critChance % 1);
				else thisCritChance = critChance - 4;
				critMult = getMegaCritDamageMult(5);
				critCalc = currentCalc * critMult * baseCritMult;
				textString += "<tr class='critRow'><td class='bdTitle'><span class='critTier5'><span class='icomoon icon-bomb'></span> CRIT</span> Chance</td><td>" + (thisCritChance * 100).toFixed(1) + "%</td><td class='bdTitle'><span class='critTier5'><span class='icomoon icon-bomb'></span> CRIT</span> Damage</td><td><span style='color: yellow;'>Crit!</span> x " + prettify(critMult) + "</td><td class='bdNumberSm'>" + prettify(critCalc) + "</td>" + getFluctuation(critCalc, minFluct, maxFluct) + "</tr>";
			}
			if (critChance > 5 && critChance < 7){
				if (critChance >= 6) thisCritChance = 1;
				else thisCritChance = critChance - 5;
				critMult = getMegaCritDamageMult(6);
				critCalc = currentCalc * critMult * baseCritMult;
				textString += "<tr class='critRow'><td class='bdTitle'><span class='critTier6'><span class='icomoon icon-diamond'></span> CRIT!</span> Chance</td><td>" + (thisCritChance * 100).toFixed(1) + "%</td><td class='bdTitle'><span class='critTier6'><span class='icomoon icon-diamond'></span> CRIT!</span> Damage</td><td><span style='color: yellow;'>Crit!</span> x " + prettify(critMult) + "</td><td class='bdNumberSm'>" + prettify(critCalc) + "</td>" + getFluctuation(critCalc, minFluct, maxFluct) + "</tr>";
			}
		}
	}
	textString += "</tbody></table></div>";
	game.global.lockTooltip = false;
	document.getElementById('tipText').className = "";
	tooltip('confirm', null, 'update', textString, "getBattleStatBd('" + what + "')", name, "Refresh", true);
	if (what == "attack" || what == "health"){
		verticalCenterTooltip(true);
	}
}

function formatMultAsPercent(mult, noSpace){
	var space = (noSpace) ? "" : " ";
	if (mult < 1)
		return "-" + space + prettify(100 * (1 - mult)) + "%";
	return "+" + space + prettify(100 * (mult - 1)) + "%";
}

function verticalCenterTooltip(makeLarge, makeSuperLarge){
	var tipElem = document.getElementById('tooltipDiv');
	if (makeLarge){
		swapClass('tooltipExtra', 'tooltipExtraLg', tipElem);
		tipElem.style.left = "25%";
	}
	if (makeSuperLarge){
		swapClass('tooltipExtra', 'tooltipExtraSuperLg', tipElem);
		tipElem.style.left = "17.5%";
	}
	var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	var settingsElem = document.getElementById('settingsRow');
	height -= Math.max(settingsElem.clientHeight, settingsElem.innerHeight || 0);
	var tipHeight = Math.max(tipElem.clientHeight, tipElem.innerHeight || 0);
	if (makeLarge && tipHeight / height > 0.95){
		document.getElementById('tipText').className = "tinyTextTip";
		tipHeight = Math.max(tipElem.clientHeight, tipElem.innerHeight || 0);
	}
	var dif = (height - tipHeight);
	tipElem.style.top = (dif > 0) ? (dif / 2) + "px" : "0";
}

function capitalizeFirstLetter(word){
	return word.charAt(0).toUpperCase() + word.slice(1);
}

function getMaxTrimps() {
	var trimps = game.resources.trimps;
	var base = 10;
	var textString =  "<table class='bdTable table table-striped'><tbody>";
	//Add base
	textString += "<tr><td class='bdTitle'>Base</td><td class='bdPercent'></td><td class='bdNumber'>" + base + "</td></tr>";
	//Add job count
	var housing = trimps.max - game.global.totalGifts - game.unlocks.impCount.TauntimpAdded - base - game.global.trimpsGenerated;
	if (game.global.challengeActive == "Downsize") housing = countTotalHousingBuildings();
	if (housing < 0) housing = 0;
	var currentCalc = housing + base;
	textString += "<tr><td class='bdTitle'>Housing</td><td class='bdPercent'>+ " + prettify(housing) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	//Add generatorUpgrades
	if (game.global.trimpsGenerated > 0){
		currentCalc += game.global.trimpsGenerated;
		textString += "<tr><td class='bdTitle'>Generated Housing</td><td class='bdPercent'>+ " + prettify(game.global.trimpsGenerated) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Territory Bonus
	if (game.global.totalGifts > 0){
		currentCalc += game.global.totalGifts;
		textString += "<tr><td class='bdTitle'>Territory Bonus</td><td class='bdPercent'>+ " + prettify(game.global.totalGifts) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Tauntimp
	if (game.unlocks.impCount.TauntimpAdded > 0){
		currentCalc += game.unlocks.impCount.TauntimpAdded;
		textString += "<tr><td class='bdTitle'>Tauntimp</td><td class='bdPercent'>+ " + prettify(game.unlocks.impCount.TauntimpAdded) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Carpentry
	if (getPerkLevel("Carpentry") > 0){
		var carpentryStrength = Math.pow(1.1, getPerkLevel("Carpentry"));
		currentCalc  *= (carpentryStrength);
		currentCalc = Math.floor(currentCalc);
		carpentryStrength = prettify((carpentryStrength - 1) * 100) + "%";
		textString += "<tr><td class='bdTitle'>Carpentry</td><td class='bdPercent'>+ " + carpentryStrength + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (getPerkLevel("Carpentry_II") > 0){
		var carpentryStrength = game.portal.Carpentry_II.modifier * getPerkLevel("Carpentry_II");
		currentCalc  *= (1 + carpentryStrength);
		currentCalc = Math.floor(currentCalc);
		carpentryStrength = prettify(carpentryStrength * 100) + "%";
		textString += "<tr><td class='bdTitle'>Carpentry II</td><td class='bdPercent'>+ " + carpentryStrength + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	var potionCrafting = alchObj.getPotionEffect("Elixir of Crafting");
	if (potionCrafting > 1){
		currentCalc  *= potionCrafting;
		currentCalc = Math.floor(currentCalc);
		textString += "<tr><td class='bdTitle'>Elixir of Crafting</td><td class='bdPercent'>+ " + prettify((potionCrafting - 1) * 100) + "%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.universe == 2 && autoBattle.bonuses.Scaffolding.level > 0){
		var mult = autoBattle.bonuses.Scaffolding.getMult();
		currentCalc *= mult;
		currentCalc = Math.floor(currentCalc);
		textString += "<tr><td class='bdTitle'>Scaffolding</td><td class='bdPercent'>+ " + prettify((mult - 1) * 100) + "%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Add Size Challenge
	if (game.global.challengeActive == "Size"){
		currentCalc = Math.floor(currentCalc / 2);
		textString += "<tr style='color: red'><td class='bdTitle'>Huge</td><td class='bdPercent'>x 0.5</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Daily"){
		if (typeof game.global.dailyChallenge.large !== 'undefined'){
			var mult = dailyModifiers.large.getMult(game.global.dailyChallenge.large.strength);
			currentCalc = Math.floor(currentCalc * mult);
			textString += "<tr style='color: red'><td class='bdTitle'>Large (Daily)</td><td class='bdPercent'>x " + mult.toFixed(2) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
		}
	}
	textString += "</tbody></table>";
	game.global.lockTooltip = false;
	tooltip('confirm', null, 'update', textString, "getMaxTrimps()", "Max Trimps", "Refresh", true);
}

function getMaxResources(what) {
	var structure;
	switch (what) {
		case "Food":
			structure = "Barn";
			break;
		case "Wood":
			structure = "Shed";
			break;
		case "Metal":
			structure = "Forge";
			break;
	}
	if (!structure) return;
	var structureObj = game.buildings[structure];
	var base = 500;
	var textString =  "<table class='bdTable table table-striped'><tbody>";
	//Add base
	var currentCalc = base;
	textString += "<tr><td class='bdTitle'>Base</td><td class='bdPercent'></td><td class='bdNumber'>" + base + "</td></tr>";
	//Add structure
	var structBonus = Math.pow(2, structureObj.owned);
	currentCalc *= structBonus;
	structBonus = prettify(structBonus * 100) + "%";
	textString += "<tr><td class='bdTitle'>" + structure + "</td><td class='bdPercent'>+ " + structBonus + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	//Add packrat
	if (getPerkLevel("Packrat")){
		var packAmt = (getPerkLevel("Packrat") * 0.2) + 1;
		currentCalc *= packAmt;
		packAmt = prettify((packAmt - 1) * 100) + '%';
		textString += "<tr><td class='bdTitle'>Packrat</td><td class='bdPercent'>+ " + packAmt + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (getHeirloomBonus("Shield", "storageSize") > 0){
		var hatAmt = calcHeirloomBonus("Shield", "storageSize", 0, true);
		currentCalc *= ((hatAmt / 100) + 1);
		hatAmt = prettify(hatAmt) + '%';
		textString += "<tr><td class='bdTitle'>Heirloom (Shield)</td><td class='bdPercent'>+ " + hatAmt + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	textString += "</tbody></table>";
	game.global.lockTooltip = false;
	tooltip('confirm', null, 'update', textString, "getMaxResources('" + what + "')", "Max " + what, "Refresh", true);
}

function getLootBd(what) {
    var map;
	var world;
	var level = "";
	var cell;
    if (game.global.mapsActive) {
        map = getCurrentMapObject();
		cell = game.global.lastClearedMapCell + 1;
        level = scaleLootLevel(cell, map.level);
		world = map.level;
    } else {
		cell = game.global.lastClearedCell + 1;
        level = scaleLootLevel(cell);
		world = game.global.world;
    }
	var textString = '	<div><ul id="lootBdTabs" class="nav nav-tabs nav-justified"><li role="presentation" onclick="getLootBd(\'Food/Wood/Metal\')"><a href="#">Food/Wood/Metal</a></li>';
	if (game.global.mapsUnlocked) textString += '<li role="presentation" onclick="getLootBd(\'Fragments\')"><a href="#">Fragments</a></li><li role="presentation" onclick="getLootBd(\'Gems\')"><a href="#">Gems</a></li>';
	if ((game.global.universe == 1 && game.global.world >= 20) || (game.global.universe == 2 && game.global.world > 15)) textString += '<li role="presentation" onclick="getLootBd(\'Helium\')"><a href="#">' + heliumOrRadon() + '</a></li>';
	textString += '</ul></div>';
	var name = (what == "Helium") ? heliumOrRadon() : what;
	textString +=  "<table class='bdTableSm table table-striped'><tbody><tr><td style='font-weight: bold; font-size: 1.1em'>" + name + "</td><td>Base</td><td>Amount</td><td>Line Total</td><td>Total</td></tr>";
	var currentCalc = 0;
	var percent = 0;
	var amt = 0;
	switch(what) {
		case "Food/Wood/Metal":
			var tempModifier = 0.5 * Math.pow(1.25, (game.global.world >= 59 && game.global.universe == 1) ? 59 : game.global.world);
			//Mega books
			if (game.global.world >= 60 && game.global.universe == 1) {
				if (game.global.frugalDone) tempModifier *= Math.pow(1.6, game.global.world - 59);
				else tempModifier *= Math.pow(1.5, game.global.world - 59);
			}
			//Bounty
			if (game.global.world >= 15) tempModifier *= 2;
			//Whipimp
			if (game.unlocks.impCount.Whipimp) tempModifier *= Math.pow(1.003, game.unlocks.impCount.Whipimp);
			var avgSec = tempModifier;
			if (game.global.world < 100)
				amt = avgSec * 3.5;
			else
				amt = avgSec * 5;
			amt = (amt * .8) + ((amt * .002) * (cell + 1));
			currentCalc = amt;
			textString += "<tr><td class='bdTitle'>Base</td><td></td><td></td><td>" + prettify(amt) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
			if ((game.talents.turkimp2.purchased || game.global.turkimpTimer > 0) && (game.global.playerGathering == "food" || game.global.playerGathering == "metal" || game.global.playerGathering == "wood")){
				//Average the bonus out amongst all 3 resources. I can't remember why turkimp2 is 1.249 instead of 1.25 but at this point I'm too scared to change it
				tBonus = 1.166;
				if (game.talents.turkimp2.purchased) tBonus = 1.333;
				else if (game.talents.turkimp2.purchased) tBonus = 1.249;
				currentCalc *= tBonus;
				textString += "<tr><td class='bdTitle'>Turkimp</td><td></td><td></td><td>+ " + prettify((tBonus - 1) * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
			}
			amt = game.resources.trimps.realMax() * 0.16;
			currentCalc *= amt;
			textString += "<tr><td class='bdTitle'>Trimps</td><td>0.16</td><td>" + prettify(game.resources.trimps.realMax()) + "</td><td>x " + prettify(amt) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
			break;
		case "Gems":
			level = (level - 400) * 1.35;
			if (level < 0) {
				level = 0;
			}
			amt = Math.round(0.5 * Math.pow(1.23, Math.sqrt(level)));
			amt += Math.round(0.5 * level);
			amt = (amt * .8) + ((amt * .002) * (cell + 1));
			currentCalc = amt;
			textString += "<tr><td class='bdTitle'>Base</td><td></td><td></td><td>" + prettify(amt) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
			if (game.jobs.Dragimp.owned >= 1){
				amt = 1.5 * game.jobs.Dragimp.modifier;
				amt = (amt * .8) + ((amt * .002) * (cell + 1));
				currentCalc += amt;
				textString += "<tr><td class='bdTitle'>Dragimp Scouting</td><td></td><td></td><td>+ " + prettify(amt) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
			}
			break;
		case "Fragments":
			amt = Math.floor(Math.pow(1.15, game.global.world) * game.global.world * game.global.world * 0.02);
			currentCalc = amt;
			textString += "<tr><td class='bdTitle'>Base</td><td></td><td></td><td>" + prettify(amt) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
			break;
		case "Helium":
			var level = scaleLootLevel(99);
			level = Math.round((level - 1900) / 100);
			level *= 1.35;
			if (level < 0) level = 0;
			var baseAmt = 0;
			if (game.global.universe == 2 || game.global.world < 59 || (game.global.world == 59 && game.global.mapsActive)) baseAmt = 1;
			else if (game.global.world < mutations.Corruption.start(true)) baseAmt = 5;
			else baseAmt = 10;
			var amt = baseAmt * Math.pow(1.23, Math.sqrt(level));
			amt += baseAmt * level;
			amt /= baseAmt;
			currentCalc = amt;
			textString += "<tr><td class='bdTitle'>Base</td><td></td><td></td><td>" + prettify(amt) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
			if (baseAmt >= 5){
				if (mutations.Magma.active()){
					currentCalc *= 15;
					textString += "<tr><td class='bdTitle'>Omnipotrimp Bonus</td><td></td><td></td><td>x 15</td><td>" + prettify(currentCalc) + "</td></tr>";
				}
				else {
					currentCalc *= 5;
					textString += "<tr><td class='bdTitle'>Improbability Bonus</td><td></td><td></td><td>x 5</td><td>" + prettify(currentCalc) + "</td></tr>";
				}
			}

			if (baseAmt >= 10){
				currentCalc *= 2;
				textString += "<tr><td class='bdTitle'>Corruption Bonus</td><td></td><td></td><td>x 2</td><td>" + prettify(currentCalc) + "</td></tr>";
			}
			if (getSLevel() >= 5){
				amt = Math.pow(1.005, game.global.world);
				currentCalc *= amt;
				textString += "<tr><td class='bdTitle'>Scientist V</td><td></td><td></td><td>x " + prettify(amt) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
			}
			if (game.goldenUpgrades.Helium.currentBonus > 0){
				amt = game.goldenUpgrades.Helium.currentBonus;
				currentCalc *= 1 + amt;
				textString += "<tr><td class='bdTitle'>Golden " + heliumOrRadon() + "</td><td></td><td></td><td>+ " + prettify(amt * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
			}
			if (game.talents.scry2.purchased && game.global.voidBuff && game.global.canScryCache){
				currentCalc *= 1.5;
				textString += "<tr><td class='bdTitle'>Scryhard II</td><td></td><td></td><td>+ 50%</td><td>" + prettify(currentCalc) + "</td></tr>";
			}
			if (game.global.voidBuff) {
				currentCalc *= 2;
				textString += "<tr><td class='bdTitle'>Void Map</td><td></td><td></td><td>x 2</td><td>" + prettify(currentCalc) + "</td></tr>";
			}
			var fluffyBonus = Fluffy.isRewardActive("helium");
			if (fluffyBonus > 0){
				currentCalc += (currentCalc * (0.25 * fluffyBonus));
				textString += "<tr><td class='bdTitle'>" + Fluffy.getName() + " " + heliumOrRadon() + "</td><td>25%</td><td>" + fluffyBonus + "</td><td>+ " + (25 * fluffyBonus) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
			}
			if (Fluffy.isRewardActive("radortle")){
				amt = Fluffy.getRadortleMult();
				currentCalc *= amt;
				textString += "<tr><td class='bdTitle'>" + Fluffy.getName() + " " + heliumOrRadon() + "</td><td>x 1.03</td><td>" + game.global.lastRadonPortal + "</td><td>+ " + prettify((amt - 1) * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
			}
			if (game.jobs.Meteorologist.vestedHires > 0){
				amt = game.jobs.Meteorologist.getMult();
				var pct = (1 + (0.05 * game.buildings.Antenna.owned));
				currentCalc *= amt;
				textString += "<tr><td class='bdTitle'>Meteorologists</td><td>" + prettify(pct) + "%</td><td>" + game.jobs.Meteorologist.vestedHires + "</td><td>+ " + prettify(pct * game.jobs.Meteorologist.vestedHires) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";

			}
			if (game.global.challengeActive == "Quest" && game.challenges.Quest.questComplete){
				currentCalc *= 2;
				textString += "<tr><td class='bdTitle'>Completed Quest!</td><td>+ 100%</td><td>&nbsp;</td><td>+ 100%</td><td>" + prettify(currentCalc) + "</td></tr>";
			}
			if (game.global.challengeActive == "Archaeology"){
				var points = game.challenges.Archaeology.getPoints('radon');
				var mult = game.challenges.Archaeology.getStatMult('radon');
				currentCalc *= mult;
				textString += "<tr><td class='bdTitle'>Radon Relic</td><td>x 1.05</td><td>" + points + "</td><td>x " + prettify(mult) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
			}
			if (game.global.universe == 2 && game.global.glassDone && game.global.world > 175){
				var mult = Math.pow(1.1, game.global.world - 175);
				currentCalc *= mult;
				textString += "<tr><td class='bdTitle'>Advanced Processing (Glass)</td><td>x 1.1</td><td>" + (game.global.world - 175) + "</td><td>x " + prettify(mult) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
			}
	}
	if (game.global.mapsActive && what != "Helium") {
		var compareLv = game.global.world;
		if (world > compareLv && map.location != "Bionic"){
			amt = Math.pow(1.1, (world - compareLv));
			currentCalc *= amt;
			textString += "<tr><td class='bdTitle'>Extra Map Zones</td><td>+10%</td><td>x " + (world - compareLv) + "</td><td>+ " + prettify((amt - 1) * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";			
		}
		else {
			if (game.talents.mapLoot.purchased)
				compareLv--;
			if (world < compareLv){
				//-20% loot compounding for each level below world
				amt = Math.pow(0.8, (compareLv - world));
				currentCalc *= amt;
				textString += "<tr style='color: red'><td class='bdTitle'>Low Map Level</td><td>-20%</td><td>" + (compareLv - world) + "</td><td>x " + prettify(amt) + "</td><td>" + prettify(currentCalc) + "</td></tr>";

			}
		}
		//Add map loot bonus
		currentCalc = Math.round(currentCalc * map.loot);
		textString += "<tr><td class='bdTitle'>Map Loot</td><td></td><td></td><td>+ " + Math.round((map.loot - 1) * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Insanity"){
		var mult = game.challenges.Insanity.getLootMult();
		currentCalc *= mult;
		textString += "<tr><td class='bdTitle'>Insane (Insanity)</td><td>+ 13.13%</td><td>" + game.challenges.Insanity.insanity + "</td><td>x " + mult.toFixed(4) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.challenges.Nurture.boostsActive() && what != "Helium"){
		var mult = game.challenges.Nurture.getResourceBoost();
		currentCalc *= mult;
		textString += "<tr><td class='bdTitle'>Cruffys</td><td>Lv " + game.challenges.Nurture.getLevel() + "</td><td></td><td>" + formatMultAsPercent(mult) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (getPerkLevel("Looting")){
		amt = (1 + (getPerkLevel("Looting") * game.portal.Looting.modifier));
		currentCalc *= amt;
		textString += "<tr><td class='bdTitle'>Looting (perk)</td><td>+ 5%</td><td>" + getPerkLevel("Looting") + "</td><td>+ " + prettify((amt - 1) * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (getPerkLevel("Looting_II")){
		amt = (1 + (getPerkLevel("Looting_II") * game.portal.Looting_II.modifier));
		currentCalc *= amt;
		textString += "<tr><td class='bdTitle'>Looting II (perk)</td><td>+ " + prettify(game.portal.Looting_II.modifier * 100) + "%</td><td>" + prettify(getPerkLevel("Looting_II")) + "</td><td>+ " + prettify((amt - 1) * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (getPerkLevel("Greed")){
		amt = game.portal.Greed.getMult();
		currentCalc *= amt;
		textString += "<tr><td class='bdTitle'>Greed (perk)</td><td>x" + " " + prettify(game.portal.Greed.getBonusAmt()) + "</td><td>" + (getPerkLevel("Greed") + getPerkLevel("Masterfulness")) + "</td><td>+ " + prettify((amt - 1) * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	var potionFinding = (game.global.challengeActive == "Alchemy") ? alchObj.getPotionEffect("Potion of Finding") : "";
	if (what != "Helium" && what != "Fragments" && potionFinding > 1){
		currentCalc *= potionFinding;
		textString += "<tr><td class='bdTitle'>Potion of Finding</td><td>+ 25%</td><td>" + alchObj.getPotionCount("Potion of Finding") + "</td><td>+ " + prettify((potionFinding - 1) * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	potionFinding = alchObj.getPotionEffect("Elixir of Finding");
	if (what != "Helium" && what != "Fragments" && potionFinding > 1){
		currentCalc *= potionFinding;
		textString += "<tr><td class='bdTitle'>Elixir of Finding</td><td>x 1.05</td><td>" + alchObj.getPotionCount("Elixir of Finding") + "</td><td>+ " + prettify((potionFinding - 1) * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	var gaseousPotion = alchObj.getRadonMult();
	if (what == "Helium" && gaseousPotion > 1){
		currentCalc *= gaseousPotion;
		textString += "<tr><td class='bdTitle'>Gaseous Brew</td><td>+ 10%</td><td>" + alchObj.getPotionCount("Gaseous Brew") + "</td><td>+ " + prettify((gaseousPotion - 1) * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Quagmire"){
		amt = game.challenges.Quagmire.getLootMult();
		currentCalc *= amt;
		textString += "<tr><td class='bdTitle'>Motivated (Quagmire)</td><td>+ 40%</td><td>" + game.challenges.Quagmire.motivatedStacks + "</td><td>+ " + prettify((amt - 1) * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (Fluffy.isRewardActive("wealthy") && what != "Helium"){
		currentCalc *= 2;
		textString += "<tr><td class='bdTitle'>Wealthy (" + Fluffy.getName() + ")</td><td>+ 100%</td><td>&nbsp;</td><td>+ 100%</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.unlocks.impCount.Magnimp && what != "Helium"){

		amt = Math.pow(1.003, game.unlocks.impCount.Magnimp);
		currentCalc = Math.floor(currentCalc * amt);
		textString += "<tr><td class='bdTitle'>Magnimp</td><td>+ 0.3%</td><td>" + game.unlocks.impCount.Magnimp + "</td><td>+ " + prettify((amt - 1)  * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";

	}
	if (game.global.challengeActive == "Toxicity"){
		var toxMult = (game.challenges.Toxicity.lootMult * game.challenges.Toxicity.stacks) / 100;
		currentCalc *= (1 + toxMult);
		toxMult = (toxMult * 100).toFixed(1) + "%";
		textString += "<tr><td class='bdTitle'>Tweaky (Toxicity)</td><td>+" + game.challenges.Toxicity.lootMult + "%</td><td>" + game.challenges.Toxicity.stacks + "</td><td>+ " + toxMult + "</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Decay" && what != "Helium"){
		currentCalc *= 10;
		textString += "<tr><td class='bdTitle'>Sanity (Decay)</td><td></td><td></td><td class='bdPercent'>x 10</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
		var stackStr = Math.pow(game.challenges.Decay.decayValue, game.challenges.Decay.stacks);
		currentCalc *= stackStr;
		textString += "<tr style='color: red'><td class='bdTitle'>Decay</td><td>x 0.995</td><td>" + game.challenges.Decay.stacks + "</td><td class='bdPercent'>x " + stackStr.toFixed(3) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Melt" && what != "Helium"){
		currentCalc *= 10;
		textString += "<tr><td class='bdTitle'>Sanity (Melt)</td><td></td><td></td><td class='bdPercent'>x 10</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
		var stackStr = Math.pow(game.challenges.Melt.decayValue, game.challenges.Melt.stacks);
		currentCalc *= stackStr;
		textString += "<tr style='color: red'><td class='bdTitle'>Melt</td><td>x 0.99</td><td>" + game.challenges.Melt.stacks + "</td><td class='bdPercent'>x " + stackStr.toFixed(3) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Watch" && what != "Helium"){
		currentCalc /= 2;
		textString += "<tr style='color: red'><td class='bdTitle'>Sleepy (Watch)</td><td></td><td></td><td class='bdPercent'>50%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Lead" && ((game.global.world % 2) == 1)){
		currentCalc *= 2;
		textString += "<tr><td class='bdTitle'>Determined (Lead)</td><td></td><td></td><td class='bdPercent'>+ 100%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Daily"){
		if (typeof game.global.dailyChallenge.famine !== 'undefined' && what != "Fragments" && what != "Helium"){
			mult = dailyModifiers.famine.getMult(game.global.dailyChallenge.famine.strength);
			currentCalc *= mult;
			textString += "<tr style='color: red'><td class='bdTitle'>Famine (Daily)</td><td class='bdPercent'>" + prettify(mult * 100) + "%</td><td></td><td>" + prettify(mult * 100) + "%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
		}
		if (typeof game.global.dailyChallenge.karma !== 'undefined' && what != "Helium"){
			mult = dailyModifiers.karma.getMult(game.global.dailyChallenge.karma.strength, game.global.dailyChallenge.karma.stacks);
			currentCalc *= mult;
			textString += "<tr><td class='bdTitle'>Karma (Daily)</td><td class='bdPercent'>x  " + mult.toFixed(3) + "</td><td></td><td>x  " + mult.toFixed(3) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>"
		}
	}
	if (game.global.challengeActive == "Archaeology" && what != "Helium" && what != "Fragments"){
		var points = game.challenges.Archaeology.getPoints('science');
		var mult = game.challenges.Archaeology.getStatMult('science');
		currentCalc *= mult;
		textString += "<tr><td class='bdTitle'>Resource Relic</td><td>x 1.05</td><td>" + points + "</td><td>x " + prettify(mult) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.spireRows > 0){
		var spireRowBonus = (game.talents.stillRowing.purchased) ? 0.03 : 0.02;
		amt = game.global.spireRows * spireRowBonus;
		currentCalc *= (1 + amt);
		textString += "<tr><td class='bdTitle'>Spire Rows</td><td>+ " + Math.round(spireRowBonus * 100) + "%</td><td>" + game.global.spireRows + "</td><td>+ " + prettify(amt * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.voidBuff && what == "Helium" && game.talents.voidSpecial.purchased){
		amt = (getLastPortal() * 0.0025);
		currentCalc *= (1 + amt);
		textString += "<tr><td class='bdTitle'>Void Special</td><td></td><td></td><td>+ " + prettify(amt * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (what != "Fragments" && getEmpowerment() == "Wind" && (what != "Helium" || !game.global.mapsActive)){
		var windMod;
		var baseMod = 0;
		if (what == "Helium"){
			windMod = game.empowerments.Wind.getCombatModifier(true);
			baseMod = game.empowerments.Wind.getModifier(0, true);
		}
		else{
			windMod = game.empowerments.Wind.getCombatModifier();
			baseMod *= game.empowerments.Wind.getModifier();
		}
		baseMod *= 100;
		currentCalc *= (1 + windMod);
		textString += "<tr><td class='bdTitle'>Swiftness (Wind)</td><td>" + prettify(baseMod) + "%</td><td>" + prettify(game.empowerments.Wind.currentDebuffPower) + "</td><td class='bdPercent'>+ " + prettify(windMod * 100) +"%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	if (what != "Helium" && isScryerBonusActive()){
		currentCalc *= 2;
		textString += "<tr><td class='bdTitle'>Formation</td><td></td><td></td><td>x 2</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (getUberEmpowerment() == "Wind" && what != "Helium" && what != "Fragments"){
		currentCalc *= 10;
		textString += "<tr><td class='bdTitle'>Enlightened Wind</td><td></td><td></td><td>x 10</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	var heirloomBonus = 0;
	if (what == "Food/Wood/Metal"){
		heirloomBonus = calcHeirloomBonus("Staff", "foodDrop", 0, true);
		if (heirloomBonus > 0){
			textString += "<tr><td class='bdTitle'>Heirloom - Food (Staff)</td><td></td><td></td><td>+ " + prettify(heirloomBonus) + "%</td><td>" + prettify(currentCalc * ((heirloomBonus / 100) + 1)) + "</td></tr>";
			heirloomBonus = 0;
		}
		heirloomBonus = calcHeirloomBonus("Staff", "woodDrop", 0, true);
		if (heirloomBonus > 0){
			textString += "<tr><td class='bdTitle'>Heirloom - Wood (Staff)</td><td></td><td></td><td>+ " + prettify(heirloomBonus) + "%</td><td>" + prettify(currentCalc * ((heirloomBonus / 100) + 1)) + "</td></tr>";
			heirloomBonus = 0;
		}
		heirloomBonus = calcHeirloomBonus("Staff", "metalDrop", 0, true);
		if (heirloomBonus > 0){
			textString += "<tr><td class='bdTitle'>Heirloom - Metal (Staff)</td><td></td><td></td><td>+ " + prettify(heirloomBonus) + "%</td><td>" + prettify(currentCalc * ((heirloomBonus / 100) + 1)) + "</td></tr>";
			heirloomBonus = 0;
		}
	}
	else if (what == "Fragments"){
		heirloomBonus = calcHeirloomBonus("Staff", "fragmentsDrop", 0, true);
		if (heirloomBonus > 0){
			textString += "<tr><td class='bdTitle'>Heirloom (Staff)</td><td></td><td></td><td>+ " + prettify(heirloomBonus) + "%</td><td>" + prettify(currentCalc * ((heirloomBonus / 100) + 1)) + "</td></tr>";
			heirloomBonus = 0;
		}
	}
	else if (what == "Gems"){
		heirloomBonus = calcHeirloomBonus("Staff", "gemsDrop", 0, true);
		if (heirloomBonus > 0){
			textString += "<tr><td class='bdTitle'>Heirloom (Staff)</td><td></td><td></td><td>+ " + prettify(heirloomBonus) + "%</td><td>" + prettify(currentCalc * ((heirloomBonus / 100) + 1)) + "</td></tr>";
			heirloomBonus = 0;
		}
	}
	if (game.global.totalSquaredReward > 0 && what == "Helium"){
		amt = game.global.totalSquaredReward / 1000;
		currentCalc *= (amt + 1);
		var c2Name = (game.global.highestRadonLevelCleared < 49) ? "2" : "<span class='icomoon icon-infinity'></span>";
		textString += "<tr><td class='bdTitle'>Challenge<sup>" + c2Name + "</sup> Reward</td><td></td><td></td><td>+ " + prettify(amt * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (what == "Helium" && playerSpireTraps.Condenser.owned){
		var amt = playerSpireTraps.Condenser.getWorldBonus();
		currentCalc *= (1 + (amt / 100));
		textString += "<tr><td class='bdTitle'>Condenser Tower" + needAnS(playerSpireTraps.Condenser.owned) + "</td><td>+ " + prettify(playerSpireTraps.Condenser.getWorldBonus(true)) + "%</td><td>" + playerSpireTraps.Condenser.owned + "</td><td>+" + prettify(amt) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.singleRunBonuses.heliumy.owned && what == "Helium"){
		currentCalc *= 1.25;
		textString += "<tr><td class='bdTitle'>" + game.singleRunBonuses.heliumy.name + "</td><td>25%</td><td></td><td>+ 25%</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.mayhemCompletions > 0 && what == "Helium"){
		var amt = game.challenges.Mayhem.getTrimpMult();
		currentCalc *= amt;
		textString += "<tr><td class='bdTitle'>Mayhem Completions</td><td>+ 10N%</td><td>" + game.global.mayhemCompletions + "</td><td>+ " + prettify((amt - 1) * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.pandCompletions > 0 && what == "Helium"){
		var amt = game.challenges.Pandemonium.getTrimpMult();
		currentCalc *= amt;
		textString += "<tr><td class='bdTitle'>Pandemonium Completions</td><td>+ 10N%</td><td>" + game.global.pandCompletions + "</td><td>+ " + prettify((amt - 1) * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (autoBattle.bonuses.Radon.level > 0 && game.global.universe == 2 && what == "Helium"){
		var amt = autoBattle.bonuses.Radon.getMult();
		currentCalc *= amt;
		textString += "<tr><td class='bdTitle'>Spire Assault Radon</td><td>+ 10%</td><td>" + autoBattle.bonuses.Radon.level + "</td><td>+ " + prettify((amt - 1) * 100) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.challengeActive == "Hypothermia" && what == "Food/Wood/Metal"){
		var mult = game.challenges.Hypothermia.getWoodMult();
		if (mult != 1){
			currentCalc *= mult;
			textString += "<tr style='color: red'><td class='bdTitle'>Hypothermia (Wood only)</td><td class='bdPercent'>x0.95</td><td>" + game.challenges.Hypothermia.embers + "</td><td>x " + prettify(mult) + "</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
		}
	}
	if (game.global.challengeActive == "Hypothermia" && what == "Helium"){
		var mult = game.challenges.Hypothermia.getRadonMult();
		currentCalc *= mult;
		textString += "<tr><td class='bdTitle'>Hypothermia</td><td class='bdPercent'>+300%</td><td>" + game.challenges.Hypothermia.embers + "</td><td>+ " + prettify((mult - 1) * 100) + "%</td><td class='bdNumber'>" + prettify(currentCalc) + "</td></tr>";
	}
	//Cruffys
	if (game.global.challengeActive == "Nurture" && what == "Helium"){
		var mult = game.challenges.Nurture.getRadonMult();
		currentCalc *= mult;
		textString += "<tr><td class='bdTitle'>Cruffys</td><td>Lv " + game.challenges.Nurture.getLevel() + "</td><td></td><td>x " + prettify(mult) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	//Bonus from Domination challenge, keep right above Corruption/Healthy stuff, as regular boss bonus does not affect it
	if (game.global.challengeActive == "Domination" && what == "Helium"){
		textString += "<tr><td class='bdTitle'>Domination (Boss Only)</td><td>x 3</td><td></td><td>x 3</td><td>" + prettify(currentCalc * 3) + "</td></tr>";
		if (game.global.voidBuff) currentCalc *= 3;
	}
	//Corruption - World
	var fullCorVal = currentCalc;
	if (what == "Helium" && !game.global.voidBuff && (game.global.world >= mutations.Corruption.start())){
		var corrVal = (game.global.challengeActive == "Corrupted") ? 7.5 : 15;
		var corrCount = mutations.Corruption.cellCount();
		if (mutations.Healthy.active()) corrCount -= mutations.Healthy.cellCount();
		var corrCalc = (corrVal / 100) * currentCalc;
		fullCorVal = currentCalc + (corrCalc * corrCount);
		textString += "<tr class='corruptedCalcRow'><td class='bdTitle' style='vertical-align: middle'>Corruption Value</td><td>" + corrVal + "%<br/>" + corrCount + " Cells</td><td>Per Cell:<br/>" + prettify(corrCalc) + "</td><td>Per Zone:<br/>" + prettify(Math.round(corrCalc * corrCount)) + "</td><td style='vertical-align: middle'>" + prettify(fullCorVal) + "</td></tr>";
		//<tr><td class='bdTitle'>Total Per Zone</td><td></td><td></td><td></td><td>" + prettify(currentCalc + (corrCalc * corrVal)) + "</td></tr>
	}
	//Healthy - World
	if (what == "Helium" && mutations.Healthy.active() && !game.global.voidBuff){
		var healthyCount = mutations.Healthy.cellCount();
		var healthyVal = 45;
		if (game.talents.healthStrength2.purchased) healthyVal = 65;
		var healthyCalc = (healthyVal / 100) * currentCalc;
		textString += "<tr class='healthyCalcRow'><td class='bdTitle' style='vertical-align: middle'>Healthy Value</td><td>" + healthyVal + "%<br/>" + healthyCount + " Cells</td><td>Per Cell:<br/>" + prettify(healthyCalc) + "</td><td>Per Zone:<br/>" + prettify(Math.round(healthyCalc * healthyCount)) + "</td><td style='vertical-align: middle'>" + prettify(fullCorVal + (healthyCalc * healthyCount)) + "</td></tr>";		
	}
	//Healthy - Void Maps

	if (what == "Helium" && game.global.voidBuff && mutations.Corruption.active()){
		var corruptedCells = mutations.Corruption.cellCount();
		if (mutations.Healthy.active()) corruptedCells -= mutations.Healthy.cellCount();
		var corrVal = (game.global.challengeActive == "Corrupted") ? 7.5 : 15;
		var percent = ((corrVal / 100) * (corruptedCells));
		

		if (mutations.Healthy.active()){
			textString += "<tr class='corruptedCalcRow mutationSumRow'><td class='bdTitle'>Corruption Value</td><td>" + corrVal + "%</td><td>" + corruptedCells + "</td><td>+ " + prettify(Math.round(percent * 100)) + "%</td><td></td></tr>";
			var healthyCells = mutations.Healthy.cellCount();
			var healthyVal = 45;
			if (game.talents.healthStrength2.purchased) healthyVal = 65;
			var healthyPercent = ((healthyVal / 100) * (healthyCells));
			textString += "<tr class='healthyCalcRow mutationSumRow'><td class='bdTitle'>Healthy Value</td><td>" + healthyVal + "%</td><td>" + healthyCells + "</td><td>+ " + prettify(Math.round(healthyPercent * 100)) + "%</td><td></td></tr>";
			var mutationPercent = (percent + healthyPercent);
			currentCalc *= (mutationPercent + 1);
			textString += "<tr class='mutationSumRow mutationTotalRow'><td class='bdTitle'>Mutation Total</td><td></td><td>" + (healthyCells + corruptedCells) + "</td><td>+ " + prettify(Math.round(mutationPercent * 100)) + "%</td><td>" + prettify(currentCalc) + "</td></tr>";
		}
		else {
			percent++;
			currentCalc *= percent;
			textString += "<tr class='corruptedCalcRow'><td class='bdTitle'>Corruption Value</td><td>" + corrVal + "%</td><td>" + corruptedCells + "</td><td>x " + prettify(percent) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
		}
	}
	if (what == "Helium" && game.global.mapsActive && game.global.voidBuff && map.stacked >= 1){
		var stacks = map.stacked;
		var maxStacks = Fluffy.getVoidStackCount() - 1;
		var countedStacks = (stacks > maxStacks) ? maxStacks : stacks;
		var bonusMod = (1 + (0.5 * countedStacks));
		if (game.talents.voidMastery.purchased) bonusMod = Math.pow(1.5, countedStacks);
		var flatBonus = currentCalc * bonusMod * stacks;
		currentCalc += flatBonus;
		textString += "<tr class='fluffyCalcRow'><td class='bdTitle'>Stacked Map" + needAnS(stacks) + " (Fluffy)</td><td>+ " + prettify((bonusMod - 1) * 100) + "%</td><td>" + stacks + " extra</td><td>+ " + prettify(flatBonus) + "</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	if (game.global.runningChallengeSquared && what == "Helium"){
		currentCalc = 0;
		textString += "<tr class='colorSquared'><td class='bdTitle'>Challenge²</td><td></td><td></td><td>0%</td><td>" + prettify(currentCalc) + "</td></tr>";
	}
	textString += "</tbody></table>";
	game.global.lockTooltip = false;
	tooltip('confirm', null, 'update', textString, "getLootBd('" + what + "')", name + " Loot Breakdown", "Refresh", true);
	verticalCenterTooltip();
}

function swapNotation(updateOnly){
	if (!updateOnly) game.options.menu.standardNotation.enabled = !game.options.menu.standardNotation.enabled;
	document.getElementById("notationBtn").innerHTML = (game.options.menu.standardNotation.enabled) ? "Standard Notation" : "Scientific Notation";
	if (game.global.fighting) updateAllBattleNumbers();
}

function prettifyTiny(number){
	return (number > 0.0001) ? number.toFixed(4) : number.toExponential(3);
}

function prettify(number) {
	var numberTmp = number;
	if (!isFinite(number)) return "<span class='icomoon icon-infinity'></span>";
	if (number >= 1000 && number < 10000) return Math.floor(number);
	if (number == 0) return prettifySub(0);
	if (number < 0) return "-" + prettify(-number);
	if (number < 0.005) return (+number).toExponential(2);

	var base = Math.floor(Math.log(number)/Math.log(1000));
	if (base <= 0) return prettifySub(number);

	if(game.options.menu.standardNotation.enabled == 5) {
		//Thanks ZXV
		var logBase = game.global.logNotBase;
		var exponent = Math.log(number) / Math.log(logBase);
		return prettifySub(exponent) + "L" + logBase;
	}


	number /= Math.pow(1000, base);
	if (number >= 999.5) {
		// 999.5 rounds to 1000 and we don’t want to show “1000K” or such
		number /= 1000;
		++base;
	}
	if (game.options.menu.standardNotation.enabled == 3){
		var suffices = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
		if (base <= suffices.length) suffix = suffices[base -1];
		else {
			var suf2 = (base % suffices.length) - 1;
			if (suf2 < 0) suf2 = suffices.length - 1;
			suffix = suffices[Math.ceil(base / suffices.length) - 2] + suffices[suf2];
		}
	}
	else {
		var suffices = [
			'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'Ud',
            'Dd', 'Td', 'Qad', 'Qid', 'Sxd', 'Spd', 'Od', 'Nd', 'V', 'Uv', 'Dv',
            'Tv', 'Qav', 'Qiv', 'Sxv', 'Spv', 'Ov', 'Nv', 'Tg', 'Utg', 'Dtg', 'Ttg',
            'Qatg', 'Qitg', 'Sxtg', 'Sptg', 'Otg', 'Ntg', 'Qaa', 'Uqa', 'Dqa', 'Tqa',
            'Qaqa', 'Qiqa', 'Sxqa', 'Spqa', 'Oqa', 'Nqa', 'Qia', 'Uqi', 'Dqi',
            'Tqi', 'Qaqi', 'Qiqi', 'Sxqi', 'Spqi', 'Oqi', 'Nqi', 'Sxa', 'Usx',
            'Dsx', 'Tsx', 'Qasx', 'Qisx', 'Sxsx', 'Spsx', 'Osx', 'Nsx', 'Spa',
            'Usp', 'Dsp', 'Tsp', 'Qasp', 'Qisp', 'Sxsp', 'Spsp', 'Osp', 'Nsp',
            'Og', 'Uog', 'Dog', 'Tog', 'Qaog', 'Qiog', 'Sxog', 'Spog', 'Oog',
            'Nog', 'Na', 'Un', 'Dn', 'Tn', 'Qan', 'Qin', 'Sxn', 'Spn', 'On',
            'Nn', 'Ct', 'Uc'
		];
		var suffix;
		if (game.options.menu.standardNotation.enabled == 2 || (game.options.menu.standardNotation.enabled == 1 && base > suffices.length) || (game.options.menu.standardNotation.enabled == 4 && base > 31))
			suffix = "e" + ((base) * 3);
		else if (game.options.menu.standardNotation.enabled && base <= suffices.length)
			suffix = suffices[base-1];
		else
		{
			var exponent = parseFloat(numberTmp).toExponential(2);
			exponent = exponent.replace('+', '');
			return exponent;
		}
	}
	return prettifySub(number) + suffix;
}

function romanNumeral(number){
//This is only accurate up to 399, but that's more than plenty for this game. Probably not the cleanest converter ever, but I thought of it myself, it works, and I'm proud.
	var numeral = "";
	while (number >= 100){
		number -= 100;
		numeral += "C";
	}
	//77
	if (number >= 90){
		number -= 90;
		numeral += "XC";
	}
	if (number >= 50){
		number -= 50;
		numeral += "L";
	}
	if (number >= 40){
		number -= 40;
		numeral += "XL";
	}
	while (number >= 10){
		number -= 10;
		numeral += "X";
	}
	if (number >= 9){
		number -= 9;
		numeral += "IX";
	}
	if (number >= 5){
		number -= 5;
		numeral += "V";
	}
	if (number >= 4){
		number -= 4;
		numeral += "IV";
	}
	while (number >= 1){
		number -= 1;
		numeral += "I";
	}
	return numeral;
}

function prettifySub(number){
	number = parseFloat(number);
	var floor = Math.floor(number);
	if (number === floor) // number is an integer, just show it as-is
		return number;
	var precision = 3 - floor.toString().length; // use the right number of digits

	return number.toFixed(3 - floor.toString().length);
}

function resetGame(keepPortal) {
	rewardingTimeoutHeirlooms = false;
	if (game.options.menu.pauseGame.enabled){
		game.options.menu.pauseGame.enabled = 0;
		game.options.menu.pauseGame.onToggle();
	}
	game.resources.trimps.soldiers = 0;
	game.global.autoBattle = false;
	document.getElementById("wood").style.visibility = "hidden";
	document.getElementById("metal").style.visibility = "hidden";
	document.getElementById("trimps").style.visibility = "hidden";
	document.getElementById("gems").style.visibility = "hidden";
	document.getElementById("fragments").style.visibility = "hidden";
	document.getElementById("buyCol").style.visibility = "hidden";
	document.getElementById("unempHide").style.visibility = "hidden";
	document.getElementById("empHide").style.visibility = "hidden";
	document.getElementById("upgradesTitleSpan").innerHTML = "Upgrades<br/>(Research first)";
	document.getElementById("science").style.visibility = "hidden";
	document.getElementById("battleContainer").style.visibility = "hidden";
	document.getElementById("pauseFight").style.display = "none";
	document.getElementById("blockDiv").style.visibility = "hidden";
	document.getElementById("badGuyCol").style.visibility = "hidden";
	document.getElementById("jobsHere").innerHTML = "";
	document.getElementById("jobsTab").style.visibility = "hidden";
	document.getElementById("upgradesTab").style.visibility = "hidden";
	document.getElementById("equipmentTab").style.visibility = "hidden";
	document.getElementById("foremenCount").innerHTML = "";
	document.getElementById("upgradesHere").innerHTML = "";
	document.getElementById("mapsBtn").style.display = "none";
	document.getElementById("grid").style.display = "block";
	document.getElementById("preMaps").style.display = "none";
	document.getElementById("mapGrid").style.display = "none";
	document.getElementById("buildingsHere").innerHTML = "";
	document.getElementById("grid").innerHTML = "";
	document.getElementById("equipmentHere").innerHTML = "";
	document.getElementById("queueItemsHere").innerHTML = "";
	var log = document.getElementById("log");
	log.innerHTML = "";
	log.scrollTop = log.scrollHeight;
	document.getElementById("worldNumber").innerHTML = "1";
	document.getElementById("mapsHere").innerHTML = "";
	document.getElementById("sciencePs").innerHTML = "+0/sec";
	document.getElementById("repeatBtn").style.display = "none";
	document.getElementById("helium").style.visibility = "hidden";
	document.getElementById("jobsTitleDiv").style.display = "none";
	document.getElementById("upgradesTitleDiv").style.display = "none";
	document.getElementById("equipmentTitleDiv").style.display = "none";
	document.getElementById("portalBtn").style.display = "none";
	document.getElementById("respecPortalBtn").style.display = "none";
	document.getElementById("battleHeadContainer").style.display = "block";
	document.getElementById("mapsCreateRow").style.display = "none";
	document.getElementById("worldName").innerHTML = "Zone";
	document.getElementById("wrapper").style.background = "url(css/bg2.png) center repeat-x";
	document.getElementById("wrapper").className = "wrapperUnbroken"
	document.getElementById("turkimpBuff").style.display = "none";
	document.getElementById("statsBtnRow").style.display = "block";
	document.getElementById("mapsBtnText").innerHTML = "Maps";
	document.getElementById("mapBonus").innerHTML = "";
	document.getElementById("roboTrimpTurnsLeft").innerHTML = "";
	swapClass("shriekState", "shriekStateCooldown", document.getElementById("chainHolder"));
	document.getElementById("chainHolder").style.visibility = "hidden";
	swapClass("dmgColor", "dmgColorWhite", document.getElementById("badGuyAttack"));
	document.getElementById("badCrit").innerHTML = "";
	document.getElementById("badCanCrit").style.display = "none";
	document.getElementById("autoUpgradeBtn").style.display = "none";
	document.getElementById("autoPrestigeBtn").style.display = "none";
	document.getElementById("voidBuff").innerHTML = "";
	document.getElementById("voidMapsHere").innerHTML = "";
	document.getElementById("heirloomWrapper").style.display = "none";
	document.getElementById("heirloomBtnContainer").style.display = "none";
	document.getElementById("goodGuyName").innerHTML = '<span id="realTrimpName">Trimps</span>&nbsp;(<span id="trimpsFighting">1</span>) <span id="anticipationSpan"></span> <span id="titimpBuff"></span> <span id="debuffSpan"></span>';
	document.getElementById("autoStorageBtn").style.display = "none";
	document.getElementById("repeatVoidsContainer").style.display = "none";
	document.getElementById('corruptionBuff').innerHTML = "";
	document.getElementById("portalTimer").className = "timerNotPaused";
	document.getElementById("grid").className = "";
	document.getElementById('exitSpireBtnContainer').style.display = "none";
	document.getElementById('badDebuffSpan').innerHTML = "";
	document.getElementById('heliumPh').innerHTML = "";
	document.getElementById("mapCreditsLeft").innerHTML = "";
	document.getElementById("swapToCurrentChallengeBtn").style.display = "none";
	document.getElementById('autoGoldenBtn').style.display = "none";
	document.getElementById('scienceCollectBtn').style.display = "block";
	document.getElementById('trimpsBreedingTitle').innerHTML = "breeding";
	document.getElementById('alchemyTab').style.display = 'none';
	document.getElementById("energyShield").style.width = "0%";
	document.getElementById("energyShieldLayer").style.width = "0%";
	document.getElementById("energyShieldLayer2").style.width = "0%";
	lookingAtCurrentChallenge = false;
	swapClass("col-xs", "col-xs-10", document.getElementById("gridContainer"));
	swapClass("col-xs", "col-xs-off", document.getElementById("extraMapBtns"));
	mutations.Magma.multiplier = -1;
	mutations.Magma.lastCalculatedMultiplier = -1;
	game.achievements.humaneRun.earnable = true;
	game.achievements.humaneRun.lastZone = 0;
	game.achievements.mapless.earnable = true;
	game.achievements.mapless.lastZone = 0;
	heirloomsShown = false;
	goldenUpgradesShown = false;
	game.global.selectedHeirloom = [];
	playFabLoginErrors = 0;

	setFormation("0");
	hideFormations();
	hideBones();
	cancelTooltip();

	for (var item in game.resources){
		var elem = document.getElementById(item + "Ps");
		if (elem !== null) elem.innerHTML = "+0/sec";
	}
	var gatherBtns = ["buildings", "food", "wood", "metal", "science", "trimps"];
	for (var gatherBtn in gatherBtns){
		setGather(gatherBtns[gatherBtn], true);
	}
	var messages = game.global.messages;
	var portal;
	var helium;
	var b;
	var imps;
	var highestLevel;
	var challenge = "";
	var sLevel = 0;
	var lastSkele;
	var bestHelium;
	var totalHeliumEarned;
	var options = game.options;
	var prison;
	var frugal;
	var slow;
	var stats;
	var repeat;
	var achieves;
	var pres;
	var roboTrimp;
	var autoStorage;
	var heirloomStuff = {};
	var lastPortal;
	var lastRadonPortal;
	var autoStorageActive;
	var autoPrestiges;
	var autoUpgrades;
	var heirloomBoneSeed;
	var voidMaxLevel;
	var voidMaxLevel2;
	var autoUpgradesAvailable;
	var rememberInfo;
	var playFabLoginType;
	var GeneticistassistSetting;
	var Geneticistassist
	var GeneticistassistSteps;
	var essence;
	var spentEssence;
	var talents;
	var decayDone;
	var recentDailies;
	var trapBuildToggled;
	var magmite;
	var genUpgrades;
	var permanentGenUpgrades;
	var genMode;
	var advMaps;
	var advMaps2;
	var lastBonePresimpt;
	var challengeSquared = false;
	var c2s;
	var perkPresetU1;
	var perkPresetU2;
	var improvedAutoStorage;
	var firstCustomAmt;
	var firstCustomExact;
	var autoStructureSetting;
	var autoStructureSettingU2;
	var autoEquipSetting;
	var autoEquipSettingU2;
	var autoEquipUnlocked;
	var pauseFightMember; //Member? I Member
	var autoGolden;
	var autoGoldenU2;
	var heirloomSeed;
	var empowerments;
	var spiresCompleted;
	var hideMapRow;
	var fluffyExp;
	var fluffyPrestige;
	var fluffyExp2;
	var fluffyPrestige2;
	var highestRadonLevel;
	var bestRadon;
	var tempHighRadon;
	var totalRadonEarned;
	var radonLeftover;
	var newUniverse;
	var canMapAtZone;
	var supervisionSetting;
	var autoJobs;
	var autoJobsU2;
	var freeTalentRespecs;
	var genStateConfig;
	var maxSplit;
	var logNotBase;
	var totalPortals;
	var totalRadPortals;
	var microchipLevel;
	var uniqueId;
	var lastHeirlooms;
	var oldUniverse;
	var ArchaeologyDone;
	var archString;
	var archThresh;
	var mayhemCompletions;
	var pandCompletions;
	var stormDone;
	var exterminateDone;
	var antennaLevel;
	var herbs;
	var potionData;
	var alchemyUnlocked;
	var farmlandsUnlocked;
	var potionAuto;
	var canGuString;
	var guString;
	var glassDone;
	var lastU2Voids;
	if (keepPortal){
		oldUniverse = game.global.universe;
		if (oldUniverse == 2 && (game.global.world > 25 || game.stats.totalVoidMaps.value > 0)) lastU2Voids = game.stats.totalVoidMaps.value;
		else lastU2Voids = game.global.lastU2Voids;
		portal = game.portal;
		helium = game.global.heliumLeftover;
		totalPortals = game.global.totalPortals;
		totalRadPortals = game.global.totalRadPortals;
		b = game.global.b;
		imps = game.unlocks.imps;
		highestLevel = game.global.highestLevelCleared;
		highestRadonLevel = game.global.highestRadonLevelCleared;
		newUniverse = game.global.newUniverse;
		sLevel = game.global.sLevel;
		lastSkele = game.global.lastSkeletimp;
		totalHeliumEarned = game.global.totalHeliumEarned;
		prison = game.global.prisonClear;
		frugal = game.global.frugalDone;
		slow = game.global.slowDone;
		glassDone = game.global.glassDone;
		autoStorage = game.global.autoStorageAvailable;
		autoUpgradesAvailable = game.global.autoUpgradesAvailable;
		decayDone = game.global.decayDone;
		if (game.global.dailyHelium) {
			if (game.global.universe == 1) game.global.tempHighHelium -= game.global.dailyHelium;
			else if (game.global.universe == 2) game.global.tempHighRadon -= game.global.dailyHelium;
		}
		bestHelium = (game.global.universe == 1 && game.global.tempHighHelium > game.global.bestHelium) ? game.global.tempHighHelium : game.global.bestHelium;
		bestRadon = (game.global.universe == 2 && game.global.tempHighRadon > game.global.bestRadon) ? game.global.tempHighRadon : game.global.bestRadon;
		if (game.global.universe == 1 && game.stats.bestHeliumHour.valueTotal < game.stats.heliumHour.value(true)){
			game.stats.bestHeliumHour.valueTotal = game.stats.heliumHour.value(true);
		}
		else if (game.global.universe == 2 && game.stats.bestRadonHour.valueTotal < game.stats.heliumHour.value(true)){
			game.stats.bestRadonHour.valueTotal = game.stats.heliumHour.value(true);
		}
		if (Fluffy.getBestExpStat().value > 0 && Fluffy.getBestExpHourStat().valueTotal < game.stats.fluffyExpHour.value()){
			Fluffy.getBestExpHourStat().valueTotal = game.stats.fluffyExpHour.value();
		}
		stats = game.stats;
		repeat = game.global.repeatMap;
		if (game.global.selectedChallenge) challenge = game.global.selectedChallenge;
		achieves = game.achievements;
		pres = game.global.presimptStore;
		roboTrimp = game.global.roboTrimpLevel;
		if (game.global.universe == 2){
			if (game.global.world < 25 && game.global.lastRadonPortal >= 25 && game.stats.totalHeirlooms.value == 0){
				lastRadonPortal = game.global.lastRadonPortal;
			}
			else{
				lastRadonPortal = game.global.world;
			}
			lastPortal = game.global.lastPortal;
		}
		else{
			if (game.global.world < 100 && game.global.lastPortal >= 100 && game.stats.totalHeirlooms.value == 0){
				lastPortal = game.global.lastPortal;
			}
			else{
				lastPortal = game.global.world;
			}
			lastRadonPortal = game.global.lastRadonPortal;
		}
		recentDailies = game.global.recentDailies;
		trapBuildToggled = game.global.trapBuildToggled;
		recycleAllExtraHeirlooms();
		heirloomStuff = {
			heirloomsCarried: game.global.heirloomsCarried,
			StaffEquipped: game.global.StaffEquipped,
			ShieldEquipped: game.global.ShieldEquipped,
			CoreEquipped: game.global.CoreEquipped,
			nullifium: game.global.nullifium,
			maxCarriedHeirlooms: game.global.maxCarriedHeirlooms,
		};
		perkPresetU1 = game.global.perkPresetU1;
		perkPresetU2 = game.global.perkPresetU2;
		autoStorageActive = game.global.autoStorage;
		autoPrestiges = game.global.autoPrestiges;
		autoUpgrades = game.global.autoUpgrades;
		heirloomBoneSeed = game.global.heirloomBoneSeed;
		heirloomSeed = game.global.heirloomSeed;
		voidMaxLevel = game.global.voidMaxLevel;
		voidMaxLevel2 = game.global.voidMaxLevel2;
		if (game.global.universe == 2){
			if (lastRadonPortal < voidMaxLevel2) {
				voidMaxLevel2 = Math.floor(voidMaxLevel2 * 0.95);
				if (voidMaxLevel2 < lastRadonPortal) voidMaxLevel2 = lastRadonPortal;
			}
		}
		else {
			if (lastPortal < voidMaxLevel) {
				voidMaxLevel = Math.floor(voidMaxLevel * 0.95);
				if (voidMaxLevel < lastPortal) voidMaxLevel = lastPortal;
			}
		}
		playFabLoginType = game.global.playFabLoginType;
		rememberInfo = game.global.rememberInfo;
		GeneticistassistSetting = game.global.GeneticistassistSetting;
		Geneticistassist = game.global.Geneticistassist;
		GeneticistassistSteps = game.global.GeneticistassistSteps;
		essence = game.global.essence;
		talents = game.talents;
		spentEssence = game.global.spentEssence;
		if (oldUniverse == 1){
			magmite = (game.global.magmite > 0) ? Math.floor(game.global.magmite * ((100 - getMagmiteDecayAmt()) / 100)) : 0;
		}
		else magmite = game.global.magmite;
		genUpgrades = game.generatorUpgrades;
		permanentGenUpgrades = game.permanentGeneratorUpgrades;
		genMode = game.global.generatorMode;
		advMaps = game.global.mapPresets;
		advMaps2 = game.global.mapPresets2;
		lastBonePresimpt = game.global.lastBonePresimpt;
		challengeSquared = game.global.runningChallengeSquared;
		improvedAutoStorage = game.global.improvedAutoStorage;
		c2s = game.c2;
		firstCustomAmt = (game.global.firstCustomAmt != -1) ? game.global.firstCustomAmt : game.global.lastCustomAmt;
		firstCustomExact = (game.global.firstCustomExact != -1) ? game.global.firstCustomExact: game.global.lastCustomExact;
		autoStructureSetting = game.global.autoStructureSetting;
		autoStructureSettingU2 = game.global.autoStructureSettingU2;
		autoEquipSetting = game.global.autoEquipSetting;
		autoEquipSettingU2 = game.global.autoEquipSettingU2;
		autoEquipUnlocked = game.global.autoEquipUnlocked;
		pauseFightMember = game.global.pauseFight;
		autoGolden = game.global.autoGolden;
		autoGoldenU2 = game.global.autoGoldenU2;
		empowerments = game.empowerments;
		for (var item in empowerments){
			empowerments[item].currentDebuffPower = 0;
		}
		spiresCompleted = game.global.spiresCompleted;
		hideMapRow = game.global.hideMapRow;
		fluffyExp = game.global.fluffyExp;
		fluffyPrestige = game.global.fluffyPrestige;
		fluffyExp2 = game.global.fluffyExp2;
		fluffyPrestige2 = game.global.fluffyPrestige2;
		tempHighRadon = game.global.tempHighRadon;
		totalRadonEarned = game.global.totalRadonEarned;
		radonLeftover = game.global.radonLeftover;
		canMapAtZone = game.global.canMapAtZone;
		supervisionSetting = game.global.supervisionSetting;
		freeTalentRespecs = game.global.freeTalentRespecs;
		genStateConfig = game.global.genStateConfig;
		maxSplit = game.global.maxSplit;
		logNotBase = game.global.logNotBase;
		if (!game.global.canMagma) {
			if (highestLevel > 229) highestLevel = 229;
			if (roboTrimp > 8) roboTrimp = 8;
		}
		autoJobs = game.global.autoJobsSetting;
		autoJobsU2 = game.global.autoJobsSettingU2;
		microchipLevel = game.buildings.Microchip.owned;
		uniqueId = game.global.uniqueId;
		lastHeirlooms = game.global.lastHeirlooms;
		ArchaeologyDone = game.global.ArchaeologyDone;
		archString = game.global.archString;
		archThresh = game.global.archThresh;
		mayhemCompletions = game.global.mayhemCompletions;
		pandCompletions = game.global.pandCompletions;
		stormDone = game.global.stormDone;
		exterminateDone = game.global.exterminateDone;
		antennaLevel = game.buildings.Antenna.owned;
		herbs = game.herbs;
		potionData = game.global.potionData;
		alchemyUnlocked = game.global.alchemyUnlocked;
		farmlandsUnlocked = game.global.farmlandsUnlocked;
		potionAuto = game.global.potionAuto;
		canGuString = game.global.canGuString;
		guString = game.global.guString;
	}
	game = null;
	game = newGame();
	game.global.autoSave = autoSave;
	game.global.messages = messages;
	game.options = options;
	if (keepPortal){
		game.herbs = herbs;
		game.global.potionData = potionData;
		game.global.potionAuto = potionAuto;
		game.global.alchemyUnlocked = alchemyUnlocked;
		game.global.farmlandsUnlocked = farmlandsUnlocked;
		game.global.canGuString = canGuString;
		game.global.guString = guString;
		game.achievements = achieves;
		calculateAchievementBonus();
		game.global.bestHelium = bestHelium;
		game.portal = portal;
		game.portal.Hunger.storedDamage = 0;
		game.portal.Frenzy.frenzyStarted = -1;
		game.portal.Tenacity.timeLastZone = -1;
		game.global.stormDone = stormDone;
		game.global.exterminateDone = exterminateDone;
		game.buildings.Antenna.owned = antennaLevel;
		game.buildings.Antenna.purchased = antennaLevel;
		game.global.b = b;
		game.global.heliumLeftover = helium;
		game.global.totalPortals = totalPortals;
		game.global.totalRadPortals = totalRadPortals;
		game.unlocks.imps = imps;
		game.global.highestLevelCleared = highestLevel;
		game.global.highestRadonLevelCleared = highestRadonLevel;
		game.global.challengeActive = challenge;
		game.global.universe = newUniverse;
		portalUniverse = newUniverse;
		game.global.recentDailies = recentDailies;
		if (challenge == "Daily") game.global.dailyChallenge = getDailyChallenge(readingDaily, true, false);
		game.global.sLevel = sLevel;
		game.global.lastSkeletimp = lastSkele;
		game.global.totalHeliumEarned = totalHeliumEarned;
		game.global.prisonClear = prison;
		game.global.frugalDone = frugal;
		game.global.glassDone = glassDone;
		game.global.slowDone = slow;
		game.global.autoStorageAvailable = autoStorage;
		game.global.roboTrimpLevel = roboTrimp;
		game.global.lastPortal = lastPortal;
		game.global.lastRadonPortal = lastRadonPortal;
		game.global.autoStorage = autoStorageActive;
		game.global.autoPrestiges = autoPrestiges;
		game.global.autoUpgrades = autoUpgrades;
		game.global.autoUpgradesAvailable = autoUpgradesAvailable;
		game.global.playFabLoginType = playFabLoginType;
		game.global.rememberInfo = rememberInfo;
		game.global.heirloomBoneSeed = heirloomBoneSeed;
		game.global.heirloomSeed = heirloomSeed;
		game.global.trapBuildToggled = trapBuildToggled;
		game.global.GeneticistassistSetting = (game.options.menu.GeneticistassistTarget.disableOnUnlock) ? -1 : GeneticistassistSetting;
		game.global.Geneticistassist = Geneticistassist;
		game.global.GeneticistassistSteps = GeneticistassistSteps;
		game.global.essence = essence;
		game.global.spentEssence = spentEssence;
		game.talents = talents;
		game.global.decayDone = decayDone;
		game.global.magmite = magmite;
		game.generatorUpgrades = genUpgrades;
		game.permanentGeneratorUpgrades = permanentGenUpgrades;
		game.global.generatorMode = genMode;
		game.global.mapPresets = advMaps;
		game.global.mapPresets2 = advMaps2;
		game.global.lastBonePresimpt = lastBonePresimpt;
		game.global.runningChallengeSquared = challengeSquared;
		game.global.perkPresetU1 = perkPresetU1;
		game.global.perkPresetU2 = perkPresetU2;
		game.global.autoGolden = autoGolden;
		game.global.autoGoldenU2 = autoGoldenU2;
		if (improvedAutoStorage)
			enableImprovedAutoStorage();
		game.global.lastCustomAmt = firstCustomAmt;
		game.global.lastCustomExact = firstCustomExact;
		game.global.autoStructureSetting = autoStructureSetting;
		game.global.autoStructureSettingU2 = autoStructureSettingU2;
		game.global.autoEquipSetting = autoEquipSetting;
		game.global.autoEquipSettingU2 = autoEquipSettingU2;
		game.global.autoEquipUnlocked = autoEquipUnlocked;
		game.global.pauseFight = pauseFightMember;
		game.empowerments = empowerments;
		game.global.spiresCompleted = spiresCompleted;
		game.global.hideMapRow = hideMapRow;
		game.global.fluffyExp = fluffyExp;
		game.global.fluffyPrestige = fluffyPrestige;
		game.global.fluffyExp2 = fluffyExp2;
		game.global.fluffyPrestige2 = fluffyPrestige2;
		game.global.bestRadon = bestRadon;
		game.global.tempHighRadon = tempHighRadon;
		game.global.totalRadonEarned = totalRadonEarned;
		game.global.radonLeftover = radonLeftover;
		game.global.canMapAtZone = canMapAtZone;
		game.global.supervisionSetting = supervisionSetting;
		game.global.autoJobsSetting = autoJobs;
		game.global.autoJobsSettingU2 = autoJobsU2;
		game.global.genStateConfig = genStateConfig;
		game.global.freeTalentRespecs = freeTalentRespecs;
		game.global.maxSplit = maxSplit;
		game.global.logNotBase = logNotBase;
		game.global.uniqueId = uniqueId;
		game.global.lastHeirlooms = lastHeirlooms;
		game.global.ArchaeologyDone = ArchaeologyDone;
		game.global.archString = archString;
		game.global.archThresh = archThresh;
		game.global.mayhemCompletions = mayhemCompletions;
		game.global.pandCompletions = pandCompletions;
		game.global.lastU2Voids = lastU2Voids;
		if (microchipLevel){
			game.buildings.Microchip.owned = microchipLevel;
			game.buildings.Microchip.purchased = microchipLevel;
		}
		for (var statItem in stats){
			statItem = stats[statItem];
			if (typeof statItem.value !== 'undefined' && typeof statItem.valueTotal !== 'undefined' && !statItem.noAdd) statItem.valueTotal += statItem.value;
			if (statItem.keepHighest && statItem.value > statItem.valueTotal) statItem.valueTotal = statItem.value;
			if (typeof statItem.value !== 'undefined' && typeof statItem.value !== 'function') statItem.value = 0;
			if (typeof statItem.onPortal === 'function') statItem.onPortal();
		}
		game.stats = stats;
		game.global.repeatMap = repeat;

		if (challenge !== "" && typeof game.challenges[challenge].start !== 'undefined') game.challenges[challenge].start();

		var afterPortalSLevel = getSLevel();
		if (afterPortalSLevel >= 1) applyS1();
		if (afterPortalSLevel >= 2) applyS2();
		if (afterPortalSLevel >= 3) applyS3();
		if (afterPortalSLevel >= 4) {
			game.buildings.Warpstation.craftTime = 0;
		}
		if (sLevel >= 4) document.getElementById("autoPrestigeBtn").style.display = "block";
		if (afterPortalSLevel >= 5) applyS5();
		if (game.global.autoUpgradesAvailable) document.getElementById("autoUpgradeBtn").style.display = "block";
		if (game.global.autoStorageAvailable) {
			document.getElementById("autoStorageBtn").style.display = "block";
			toggleAutoStorage(true);
		}
		game.portal.Coordinated.currentSend = 1;
		if (pres == "gems" || pres == "fragments"){
			pres = "food";
		}
		game.global.presimptStore = pres;
		for (var heirItem in heirloomStuff){
			game.global[heirItem] = heirloomStuff[heirItem];
		}
		if (game.global.totalPortals == 5) message("Heavy use of the portal has created a chance for the Void to seep into your world. Be alert.", "Story", null, "voidMessage");
		if (game.global.totalPortals >= 5) document.getElementById("heirloomBtnContainer").style.display = "block";
		recalculateHeirloomBonuses();
		game.global.voidMaxLevel = voidMaxLevel;
		game.global.voidMaxLevel2 = voidMaxLevel2;
		for (var cItem in c2s){
			game.c2[cItem] = c2s[cItem];
		}
		if (game.global.challengeActive == "Trapper" || game.global.challengeActive == "Trappapalooza"){
			getAutoJobsSetting().enabled = false;
		}
		alchObj.portal();
	}
	else {
		game.options.menu.darkTheme.enabled = 1;
		game.options.menu.darkTheme.removeStyles();
		game.options.menu.usePlayFab.enabled = 0;
		playerSpire.resetToDefault();
		toggleSetting("usePlayFab", null, false, true);
		playFabId = -1;
	}
	game.portal.Equality.scalingCount = 0;
	missingTrimps = new DecimalBreed(0);
	Fluffy.handleBox();
	Fluffy.checkAndRunVoidelicious();
	Fluffy.checkAndRunVoidance();
	numTab(1);
	document.getElementById("tab5Text").innerHTML = "+" + prettify(game.global.lastCustomAmt);
	pauseFight(true);
	repeatClicked(true);
	toggleAutoTrap(true);
	toggleAutoStructure(true);
	toggleAutoJobs(true);
	toggleAutoGolden(true);
	toggleAutoUpgrades(true);
	toggleAutoPrestiges(true);
	toggleAutoEquip(true);
	toggleVoidMaps(true);
	fireMode(true);
	setEmpowerTab();
	resetAdvMaps();
	cancelPortal();
	updateElectricityStacks();
	updateDecayStacks();
	updateAntiStacks();
	setNonMapBox();
	checkChallengeSquaredAllowed();
	initTalents();
	countChallengeSquaredReward();
	displayGoldenUpgrades();
	updateSkeleBtn();
	manageEqualityStacks();
	trackAchievement();
	filterTabs("all");
	Fluffy.calculateLevel();
	game.options.menu.tinyButtons.onToggle();
	if (keepPortal) checkAchieve("portals");
	document.getElementById("goodGuyAttack").innerHTML = "";
	document.getElementById("goodGuyBlock").innerHTML = "";
	document.getElementById("goodGuyBar").style.width = "0%";
	document.getElementById("goodGuyHealth").innerHTML = "0";
	document.getElementById("goodGuyHealthMax").innerHTML = "0";
	document.getElementById("trimpsFighting").innerHTML = "1";
	document.getElementById("critSpan").innerHTML = "";
	document.getElementById('togglemapAtZone2').style.display = (game.global.canMapAtZone) ? "block" : "none";
	document.getElementById('heliumName').innerHTML = heliumOrRadon();
	document.getElementById('goodGuyBlockName').innerHTML = (game.global.universe == 2) ? "<span class='energyShieldIcon icomoon icon-shield2'></span>" : "BLK";
	document.getElementById("energyShield").style.width = "0%";
	document.getElementById("energyShieldLayer").style.width = "0%";
	if (getAutoGoldenSetting() != -1)
		lastAutoGoldenToggle = new Date().getTime();
	if (game.talents.voidSpecial.purchased){
		var mapsToGive = Math.floor(getLastPortal() / 100);
		if (game.talents.voidSpecial2.purchased) mapsToGive += Math.floor((getLastPortal() + 50) / 100);
		for (var x = 0; x < mapsToGive; x++){
			createVoidMap();
		}
	}
	if (game.talents.explorers2.purchased){
		unlockUpgrade("Speedexplorer");
	}
	resetSingleBonusColors();
	lastAutoJob = 0;
	var ajSetting = getAutoJobsSetting();
	if (bwRewardUnlocked("AutoJobs") && ajSetting.portalGather){
		if (ajSetting.portalGather == "metal") fadeIn("metal", 10);
		setGather(ajSetting.portalGather);
	}
	document.getElementById('energyShield').style.width = "0%";
	setAdvMaps2UnlockText();
	if (game.global.universe == 2 && game.global.totalRadonEarned <= 0){
		game.global.messages.Story.enabled = true;
		filterMessage("Story", true);
	}
	if (game.global.universe == 2 && game.buildings.Microchip.owned < 5){
		unlockBuilding("Microchip");
	}
	if (game.global.universe == 2 && game.global.stormDone){
		unlockBuilding('Antenna');
	}
	if (bwRewardUnlocked("Foremany")) game.bwRewards.Foremany.fire();
	if (oldUniverse != game.global.universe){
		var oldSetting;
		var newSetting;
		if (oldUniverse == 1){
			oldSetting = game.global.lastHeirlooms.u1;
			newSetting = game.global.lastHeirlooms.u2;
		}
		else{
			oldSetting = game.global.lastHeirlooms.u2;
			newSetting = game.global.lastHeirlooms.u1;
		}
		if (game.global.ShieldEquipped.name) oldSetting.Shield = game.global.ShieldEquipped.id;
		else oldSetting.Shield = -1;
		if (game.global.StaffEquipped.name) oldSetting.Staff = game.global.StaffEquipped.id;
		else oldSetting.Staff = -1;
		if (newSetting.Shield != -1) equipHeirloomById(newSetting.Shield, "Shield");
		if (newSetting.Staff != -1) equipHeirloomById(newSetting.Staff, "Staff");
	}
	setUniverseStyle();
	if (Fluffy.isRewardActive("moreVoid") && game.global.lastU2Voids >= 5 && game.global.universe == 2){
		var freeMaps = Math.floor(game.global.lastU2Voids / 5);
		for (var x = 0; x < freeMaps; x++) createVoidMap();
		message("Scruffy gave you " + freeMaps + " free Void Maps!", "Notices");
	}
	setTrimpColSize();
	alchObj.tab.style.display = 'none';
	alchObj.load();
}

function setUniverseStyle(){
	if (game.global.universe == 1){
		document.getElementById('roboTrimpBtn').style.display = 'block';
		document.getElementById('damageDiv').style.width = '55%';
		document.getElementById('blockDiv').style.width = '28.33333333%';
	}
	else if (game.global.universe == 2){
		document.getElementById('roboTrimpBtn').style.display = 'none';
		document.getElementById('damageDiv').style.width = '65%';
		document.getElementById('blockDiv').style.width = '35%';
	}
}

function setTrimpColSize(){
	var colGoodGuyName = document.getElementById('colGoodGuyName');
	var colStances = document.getElementById('colStances');
	if (game.global.universe == 1){
		swapClass('col', 'col-xs-9', colGoodGuyName);
		swapClass('col', 'col-xs-3', colStances);
	}
	else{
		swapClass('col', 'col-xs-12', colGoodGuyName);
		swapClass('col', 'col-hidden', colStances);
	}
}

function resetSingleBonusColors(){
	for (var item in game.singleRunBonuses){
		item = game.singleRunBonuses[item];
		if (item.reset) item.reset();
	}
}

function loadSingleBonusColors(){
	for (var item in game.singleRunBonuses){
		item = game.singleRunBonuses[item];
		if (item.owned && item.load) item.load();
	}
}

function enableImprovedAutoStorage(){
	game.global.improvedAutoStorage = true;
	game.buildings.Barn.craftTime = 0;
	game.buildings.Shed.craftTime = 0;
	game.buildings.Forge.craftTime = 0;
}

function applyS1(){
	if (game.global.challengeActive != "Scientist") game.resources.science.owned += 5000;
	fadeIn("science", 10);
	document.getElementById("upgradesTitleSpan").innerHTML = "Upgrades";
	game.resources.wood.owned += 100;
	game.resources.food.owned += 100;
	game.buildings.Trap.owned += 10;
	fadeIn("trimps", 10);
	game.global.autoCraftModifier += 0.25;
	document.getElementById("foremenCount").innerHTML = (game.global.autoCraftModifier * 4) + " Foremen";
}

function applyS2(){
	game.triggers.upgrades.fire();
	if (game.global.challengeActive != "Frugal"){
		var toUnlock = ["Supershield", "Dagadder", "Bootboost", "Megamace", "Hellishmet", "Polierarm", "Pantastic", "Axeidic", "Smoldershoulder", "Greatersword", "Bestplate"];
		if (game.global.slowDone){
			toUnlock.push("Harmbalest");
			toUnlock.push("GambesOP");
		}
		for (var x = 0; x < toUnlock.length; x++){
			var upgradeToUnlock = game.mapUnlocks[toUnlock[x]];
			if (game.global.challengeActive == "Pandemonium" && upgradeToUnlock.prestige && game.challenges.Pandemonium.isEquipBlocked(game.upgrades[toUnlock[x]].prestiges)) continue;			
			upgradeToUnlock.fire();
			upgradeToUnlock.last += 5;
		}
	}
	game.buildings.Barn.owned = 5;
	game.buildings.Barn.purchased = 5;
	game.resources.food.max = 16000;
	game.buildings.Shed.owned = 5;
	game.buildings.Shed.purchased = 5;
	game.resources.wood.max = 16000;
	game.buildings.Forge.owned = 5;
	game.buildings.Forge.purchased = 5;
	game.resources.metal.max = 16000;
}

function applyS3(){
	game.global.playerModifier = 2;
	game.resources.trimps.owned = game.resources.trimps.realMax();
	if (document.getElementById("trimps").style.visibility == "hidden") fadeIn("trimps", 10);
}
//4.39Qi
function applyS5(){
	game.global.playerModifier = 10;
	game.buildings.Barn.owned = 50;
	game.buildings.Barn.purchased = 50;
	game.resources.food.max = 562949953421312000;
	game.buildings.Shed.owned = 50;
	game.buildings.Shed.purchased = 50;
	game.resources.wood.max = 562949953421312000;
	game.buildings.Forge.owned = 50;
	game.buildings.Forge.purchased = 50;
	game.resources.metal.max = 562949953421312000;
}


var pendingLogs = {
    Loot: [],
    Unlocks: [],
    Combat: [],
    Notices: [],
    all: [],
    RAF: null
};

var messageLock = false;
function message(messageString, type, lootIcon, extraClass, extraTag, htmlPrefix) {
	if (usingScreenReader){
		if (type == "Story") document.getElementById('srSumLastStory').innerHTML = "Z " + game.global.world + ": " + messageString;
		if (type == "Combat") document.getElementById('srSumLastCombat').innerHTML = messageString;
	}
	if (messageLock && type !== "Notices"){
		return;
	}
	if (extraTag && typeof game.global.messages[type][extraTag] !== 'undefined' && !game.global.messages[type][extraTag]){
		return;
	}
	var log = document.getElementById("log");
	if (typeof game.global.messages[type] === 'undefined') console.log(messageString, type, lootIcon, extraClass, extraTag, htmlPrefix);
	var displayType = (game.global.messages[type].enabled) ? "block" : "none";
	var prefix = "";
	var addId = "";
	if (messageString == "Game Saved!" || extraClass == 'save') {
		addId = " id='saveGame'";
		if (document.getElementById('saveGame') !== null){
			var needsScroll = ((log.scrollTop + 10) > (log.scrollHeight - log.clientHeight));
			var oldElem = document.getElementById('saveGame');
			log.removeChild(oldElem);
			log.appendChild(oldElem);
			if (messageString != "Game Saved!") messageString = "<span class='glyphicon glyphicon-off'></span>" + messageString;
			oldElem.innerHTML = messageString;
			if (needsScroll) log.scrollTop = log.scrollHeight;
			return;
		}
	}
    if (game.options.menu.timestamps.enabled){
        messageString = ((game.options.menu.timestamps.enabled == 1) ? getCurrentTime() : updatePortalTimer(true)) + " " + messageString;
    }
    if (!htmlPrefix){
        if (lootIcon && lootIcon.charAt(0) == "*") {
            lootIcon = lootIcon.replace("*", "");
            prefix =  "icomoon icon-";
        }
        else prefix = "glyphicon glyphicon-";
        if (type == "Story") messageString = "<span class='glyphicon glyphicon-star'></span> " + messageString;
        if (type == "Combat") messageString = "<span class='glyphicon glyphicon-flag'></span> " + messageString;
        if (type == "Loot" && lootIcon) messageString = "<span class='" + prefix + lootIcon + "'></span> " + messageString;
        if (type == "Notices"){
			if (lootIcon !== null) messageString = "<span class='" + prefix + lootIcon + "'></span> " + messageString;
			else messageString = "<span class='glyphicon glyphicon-off'></span> " + messageString;
        }
    }
    else messageString = htmlPrefix + " " + messageString;
    var messageHTML = "<p" + addId + " class='" + type + "Message message" +  " " + extraClass + "' style='display: " + displayType + "'>" + messageString + "</p>";
    pendingLogs.all.push(messageHTML);
    if (type != "Story"){
        var pendingArray = pendingLogs[type];
        pendingArray.push(pendingLogs.all.length - 1);
        if (pendingArray.length > 10){
            var index = pendingArray[0];
            pendingLogs.all.splice(index, 1)
            pendingArray.splice(0, 1);
            adjustMessageIndexes(index);
        }
	}
}

function adjustMessageIndexes(index){
    for (var item in pendingLogs){
        if (item == "all" || item == "RAF") continue;
        for (var x = 0; x < pendingLogs[item].length; x++){
            if (pendingLogs[item][x] > index)
                pendingLogs[item][x]--;
        }
    }
}

function postMessages(){
	if (usingRealTimeOffline) return;
    if (pendingLogs.RAF != null) cancelAnimationFrame(pendingLogs.RAF);

    if(pendingLogs.all.length < 1) {
        return;
    }

    pendingLogs.RAF = requestAnimationFrame(function() {
        var log = document.getElementById("log");
        var needsScroll = ((log.scrollTop + 10) > (log.scrollHeight - log.clientHeight));
        var pendingMessages = pendingLogs.all.join('');
        log.innerHTML += pendingMessages;
        pendingLogs.all = [];
        for (var item in pendingLogs){
            if (item == "all" || item == "RAF") continue;
            if (pendingLogs[item].length)
                trimMessages(item);
            pendingLogs[item] = [];
        }
        if (needsScroll) log.scrollTop = log.scrollHeight;
    });
}

function getCurrentTime(){
	var date = new Date();
	var seconds = date.getSeconds();
	var minutes = date.getMinutes();
	var hours = date.getHours();
	if (seconds <= 9) seconds = "0" + seconds;
	if (minutes <= 9) minutes = "0" + minutes;
	if (hours <= 9) hours = "0" + hours;
	return hours + ":" + minutes + ":" + seconds;
}

function nodeToArray(nodeList){
	for(var a=[], l=nodeList.length; l--; a[l]=nodeList[l]);
    return a;
}

function trimMessages(what){
	var log = document.getElementById("log");
	var toChange = document.getElementsByClassName(what + "Message");
	toChange = nodeToArray(toChange);
	var messageCount = toChange.length;
	if (messageCount > 20){
		for (var count = 0; count < (messageCount - 20); count++){
			log.removeChild(toChange[count]);
		}
	}
}

function filterMessage(what, updateOnly){ //send true for updateOnly
	var log = document.getElementById("log");
	var displayed = game.global.messages[what].enabled;
	if (!updateOnly){
		displayed = (displayed) ? false : true;
		game.global.messages[what].enabled = displayed;
	}
	var toChange = document.getElementsByClassName(what + "Message");
	var btnText = (displayed) ? what : what + " off";
	var btnElem = document.getElementById(what + "Filter");
	if (btnElem == null) return;
	btnElem.innerHTML = btnText;
	btnElem.className = "";
	btnElem.className = getTabClass(displayed);
	displayed = (displayed) ? "block" : "none";
	for (var x = 0; x < toChange.length; x++){
		toChange[x].style.display = displayed;
	}
	log.scrollTop = log.scrollHeight;
}

//
//Menu Stuff
var lastScrolls = {};
function filterTabs (what) {
	document.getElementById('talentsTab').style.display = (game.global.highestLevelCleared >= 180) ? "table-cell" : "none";
	document.getElementById('equalityTab').style.display = (game.global.universe == 2 && !game.portal.Equality.radLocked) ? "table-cell" : "none";
	var buyContainer = document.getElementById('buyContainer');
	buyContainer.style.height = (game.global.highestLevelCleared >= 180) ? "calc(99vh - 22.2vw - 175px)" : "calc(99vh - 20vw - 195px)";
	lastScrolls[game.global.buyTab] = buyContainer.scrollTop;
	enableDisableTab(game.global.buyTab, false);
	game.global.buyTab = what;
	enableDisableTab(what, true);
	var tabs = ["buildings", "jobs", "upgrades", "equipment", "talents", "nature"];
	for (var tab in tabs){
		tab = tabs[tab];
		document.getElementById(tab + "Container").style.display = ((what == "all" && tab != "talents" && tab != "nature") || tab == what) ? "block" : "none";
	}
	if (what == "talents") displayTalents();
	if (what == "nature") displayNature();
	if (lastScrolls[what]) buyContainer.scrollTop = lastScrolls[what];
}

function enableDisableTab(what, enable){
	var elem = document.getElementById(what + "Tab");
	if(enable)
		elem.className = elem.className.replace("tabNotSelected", "tabSelected");
	else
		elem.className = elem.className.replace("tabSelected", "tabNotSelected");
	//document.getElementById(what + "A").style.borderBottom = (enable) ? "0" : "1px solid #ddd";
}


function getTabClass(displayed){
	return (displayed) ? "btn btn-success logFlt" : "btn btn-danger logFlt";
}

function setMax(amount, forPortal){
	game.global.maxSplit = amount;
	cancelTooltip();
	var elemName = (forPortal) ? "ptab6Text" : "tab6Text";
	document.getElementById(elemName).innerHTML = (amount != 1) ? game.global.maxSplit : "Max";
	if (forPortal) displayPortalUpgrades(true);
}

function numTab(what, p) {
	var num = 0;
	if (what == 6 && game.global.buyAmt == "Max") tooltip('Max', null, 'update', p);
	if (what == 5){
		unlockTooltip();
		tooltip('hide');
		var numBox = document.getElementById("customNumberBox");
		if (numBox){
			num = numBox.value;
			game.global.lastCustomExact = num;
			if (game.global.firstCustomExact == -1) game.global.firstCustomExact = num;
			if (num.split('%')[1] == ""){
				num = num.split('%');
				num[0] = parseFloat(num[0]);
				if (num[0] <= 100 && num[0] >= 0){
					var workspaces = game.workspaces;
					num = Math.floor(workspaces * (num[0] / 100));
				}
				else num = 1;
			}
			else if (num.split('/')[1]){
				num = num.split('/');
				num[0] = parseFloat(num[0]);
				num[1] = parseFloat(num[1]);
				var workspaces = game.workspaces;
				num = Math.floor(workspaces * (num[0] / num[1]));
				if (num < 0 || num > workspaces) num = 1;
			}
			else {
				num = convertNotationsToNumber(num);
			}
		}
		else num = game.global.lastCustomAmt;
		if (num == 0) num = 1;
		if (!isNumberBad(num)) {
			var text = "+" + prettify(num);
			document.getElementById("tab5Text").innerHTML = text;
			document.getElementById("ptab5Text").innerHTML = text;
			game.global.buyAmt = num;
			game.global.lastCustomAmt = num;
			if (game.global.firstCustomAmt == -1) game.global.firstCustomAmt = num;
		}
		else {
			if (numBox.value == "pants" && game.global.sLevel >= 4) {
				//Dedicated to Sleeves, who would be upset if I never added a pants easter egg.
				pantsMode = true;
				message("Get a leg up with PANTS! Until your next trou... browser refresh, you can enable the useless but stylish PANTS ONLY AutoPrestige setting! Denim-ite!", "Notices");
				return;
			}
			message("Please use a number greater than 0!", "Notices");
			return;
		}
	}
	if (typeof what === 'undefined') what = game.global.numTab;
	else
	game.global.numTab = what;
	var tabType = (p) ? "ptab" : "tab";
	var count = 6;
	for (var x = 1; x <= count; x++){
		var thisTab = document.getElementById(tabType + x);
		if(what == x)
			thisTab.className = thisTab.className.replace("tabNotSelected", "tabSelected");
		else
			thisTab.className = thisTab.className.replace("tabSelected", "tabNotSelected");
		if (x == 5) continue;
		switch (x){
			case 1:
				num = 1;
				break;
			case 2:
				num = 10;
				break;
			case 3:
				num = 25;
				break;
			case 4:
				num = 100;
				break;
			case 6:
				num = 'Max';
		}
		if (x == what) game.global.buyAmt = num;
	}
	document.getElementById(tabType + "6Text").innerHTML = (what == 6 && game.global.maxSplit != 1) ? game.global.maxSplit : "Max";
	if (p) {
		displayPortalUpgrades(true);
	}
}

function convertNotationsToNumber(num){
	num = num.toLowerCase();
	if (num.split('e')[1]){
		num = Math.floor(parseFloat(num));
		return num;
	}
	var letters = num.replace(/[^a-z]/gi, "");
	var base = 0;
	if (letters.length){
		if (game.options.menu.standardNotation.enabled == 3){
			var suffices = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
			base = (suffices.indexOf(letters[0]) + 1);
			if (letters.length > 1) {
				base *= suffices.length;
				base += (suffices.indexOf(letters[1]) + 1);
			}
		}
		else {
			var suffices = [
				'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'Ud',
				'Dd', 'Td', 'Qad', 'Qid', 'Sxd', 'Spd', 'Od', 'Nd', 'V', 'Uv', 'Dv',
				'Tv', 'Qav', 'Qiv', 'Sxv', 'Spv', 'Ov', 'Nv', 'Tg', 'Utg', 'Dtg', 'Ttg',
				'Qatg', 'Qitg', 'Sxtg', 'Sptg', 'Otg', 'Ntg', 'Qaa', 'Uqa', 'Dqa', 'Tqa',
				'Qaqa', 'Qiqa', 'Sxqa', 'Spqa', 'Oqa', 'Nqa', 'Qia', 'Uqi', 'Dqi',
				'Tqi', 'Qaqi', 'Qiqi', 'Sxqi', 'Spqi', 'Oqi', 'Nqi', 'Sxa', 'Usx',
				'Dsx', 'Tsx', 'Qasx', 'Qisx', 'Sxsx', 'Spsx', 'Osx', 'Nsx', 'Spa',
				'Usp', 'Dsp', 'Tsp', 'Qasp', 'Qisp', 'Sxsp', 'Spsp', 'Osp', 'Nsp',
				'Og', 'Uog', 'Dog', 'Tog', 'Qaog', 'Qiog', 'Sxog', 'Spog', 'Oog',
				'Nog', 'Na', 'Un', 'Dn', 'Tn', 'Qan', 'Qin', 'Sxn', 'Spn', 'On',
				'Nn', 'Ct', 'Uc'
			];
			for (var x = 0; x < suffices.length; x++){
				if (suffices[x].toLowerCase() == letters){
					base = x + 1;
					break;
				}
			}
		}
		if (base) num = Math.round(parseFloat(num.split(letters)[0]) * Math.pow(1000, base));
	}
	if (!base) num = parseInt(num, 10);
	return num;
}

//Buildings Specific
function removeQueueItem(what, force) {
	if (game.options.menu.pauseGame.enabled && !force) return;
	var queue = document.getElementById("queueItemsHere");
	var elem;
	var multiCraftMax = 1;
	if (bwRewardUnlocked("DoubleBuild")) multiCraftMax = 2;
	if (game.talents.deciBuild.purchased) multiCraftMax = 10;
	if (what == "first"){
		elem = queue.firstChild;
		var name = game.global.buildingsQueue[0].split('.');
		if (name[1] > 1){
			var item = name[0];
			name[1] = parseInt(name[1], 10);
			if (multiCraftMax > name[1]){
				multiCraftMax = name[1];
			}
			name[1] -= multiCraftMax;
			if (multiCraftMax > 1){
				for (var x = 1; x < multiCraftMax; x++){
					buildBuilding(item);
				}
			}
			if (name[1] > 0){
				var newQueue = name[0] + "." + name[1];
				name = name[0] + " X" + name[1];
				game.global.buildingsQueue[0] = newQueue;
				elem.firstChild.innerHTML = name;
				checkEndOfQueue();
				return;
			}
		}
		queue.removeChild(elem);
		game.global.buildingsQueue.splice(0, 1);
		checkEndOfQueue();
		return;
	}
	var index = getQueueElemIndex(what, queue);
	elem = document.getElementById(what);
	if (!game.global.buildingsQueue[index]) index = 0;
	queue.removeChild(elem);
	refundQueueItem(game.global.buildingsQueue[index]);
	game.global.buildingsQueue.splice(index, 1);
	if (index === 0) {
		game.global.crafting = "";
		game.global.timeLeftOnCraft = 0;
	}
	checkEndOfQueue();
}

function getQueueElemIndex(id, queue){
	var childs = queue.getElementsByTagName('*');
	for (var i = 0, len = childs.length; i < len; i++){
		if (childs[i].id == id) return ((i - 2)/ 3);
	}
}

function checkEndOfQueue(){
	if (game.global.buildingsQueue.length === 0){
		document.getElementById("noQueue").style.display = "block";
		game.global.nextQueueId = 0;
		game.global.crafting = "";
	}
}

function addQueueItem(what) {
	var elem = document.getElementById("queueItemsHere");
	document.getElementById("noQueue").style.display = "none";
	var name = what.split('.');
	if (name[1] > 1) name = name[0] + " X" + prettify(name[1]);
	else name = name[0];
	elem.innerHTML += '<div class="queueItem" id="queueItem' + game.global.nextQueueId + '" onmouseover="tooltip(\'Queue\',null,event)" onmouseout="tooltip(\'hide\')" onClick="removeQueueItem(\'queueItem' + game.global.nextQueueId + '\'); cancelTooltip();"><span class="queueItemName">' + name + '</span><div id="animationDiv"></div></div>';
	if (game.global.nextQueueId === 0) setNewCraftItem();
	game.global.nextQueueId++;
}

function updateSkeleBtn(){
	document.getElementById("boneBtnContainer").style.display = "block";
	document.getElementById("boneBtnText").innerHTML = "Trade " + prettify(game.global.b) + " Bone" + (game.global.b == 1 ? "" : "s");
}

//
//Number updates
function updateLabels() { //Tried just updating as something changes, but seems to be better to do all at once all the time
	if (usingRealTimeOffline) return;
	var toUpdate;
	//Resources (food, wood, metal, trimps, science). Per second will be handled in separate function, and called from job loop.
	for (var item in game.resources){
		toUpdate = game.resources[item];
		if (!(toUpdate.owned > 0)){
			toUpdate.owned = parseFloat(toUpdate.owned);
			if (!(toUpdate.owned > 0)) toUpdate.owned = 0;
		}
		if (item == "radon") continue;
		if (item == "helium" && game.global.universe == 2) toUpdate = game.resources.radon;
		document.getElementById(item + "Owned").innerHTML = prettify(Math.floor(toUpdate.owned));
		if (toUpdate.max == -1 || document.getElementById(item + "Max") === null) continue;
		var newMax = toUpdate.max;
		if (item != "trimps")
			newMax = calcHeirloomBonus("Shield", "storageSize", (newMax * (game.portal.Packrat.modifier * getPerkLevel("Packrat") + 1)));
		else if (item == "trimps") newMax = toUpdate.realMax();
		document.getElementById(item + "Max").innerHTML = prettify(newMax);
		var bar = document.getElementById(item + "Bar");
		if (game.options.menu.progressBars.enabled){
			var percentToMax = ((toUpdate.owned / newMax) * 100);
			swapClass("percentColor", getBarColorClass(100 - percentToMax), bar);
			bar.style.width = percentToMax + "%";
		}
	}
	updateSideTrimps();
	//Buildings, trap is the only unique building, needs to be displayed in trimp area as well
	for (var itemA in game.buildings){
		toUpdate = game.buildings[itemA];
		if (toUpdate.locked == 1) continue;
		var elem = document.getElementById(itemA + "Owned");
		if (elem === null){
			unlockBuilding(itemA);
			elem = document.getElementById(itemA + "Owned");
		}
		elem.innerHTML = (game.options.menu.menuFormatting.enabled) ? prettify(toUpdate.owned) : toUpdate.owned;
		if (itemA == "Trap") {
			var trap1 = document.getElementById("trimpTrapText")
			if (trap1) trap1.innerHTML = prettify(toUpdate.owned);
			var trap2 = document.getElementById("trimpTrapText2")
			if (trap2) trap2.innerHTML = prettify(toUpdate.owned);
		}
	}
	//Jobs, check PS here and stuff. Trimps per second is handled by breed() function
	for (var itemB in game.jobs){
		toUpdate = game.jobs[itemB];
		if (toUpdate.locked == 1 && toUpdate.increase == "custom") continue;
		if (toUpdate.locked == 1) {
			if (game.resources[toUpdate.increase].owned > 0)
			updatePs(toUpdate, false, itemB);
			continue;
		}
		if (document.getElementById(itemB) === null) unlockJob(itemB);
		document.getElementById(itemB + "Owned").innerHTML = (game.options.menu.menuFormatting.enabled) ? prettify(toUpdate.owned) : toUpdate.owned;
		var perSec = (toUpdate.owned * toUpdate.modifier);
		updatePs(toUpdate, false, itemB);
	}
	//Upgrades, owned will only exist if 'allowed' exists on object
	for (var itemC in game.upgrades){
		toUpdate = game.upgrades[itemC];
		if (toUpdate.allowed - toUpdate.done >= 1) toUpdate.locked = 0;
		if (toUpdate.locked == 1) continue;
		if (document.getElementById(itemC) === null) unlockUpgrade(itemC, true);
	}
	//Equipment
	checkAndDisplayEquipment();
}

 function checkAndDisplayEquipment() {
	for (var itemD in game.equipment){
		var toUpdate = game.equipment[itemD];
		if (toUpdate.locked == 1) continue;
		if (document.getElementById(itemD) === null) drawAllEquipment();
		document.getElementById(itemD + "Owned").innerHTML = toUpdate.level;
	}
}

function updatePs(jobObj, trimps, jobName){ //trimps is true/false, send PS as first if trimps is true, like (32.4, true)
		if (usingRealTimeOffline) return;
		if (jobObj.increase == "custom" || (typeof jobObj.increase === 'undefined' && !trimps)) return;
		var psText;
		var elem;
		if (trimps) {
			psText = jobObj.toFixed(3);
			elem = document.getElementById("trimpsPs");
		}
		else{
			var increase = jobObj.increase;
			psText = (jobObj.owned * jobObj.modifier);
			//portal Motivation
			if (getPerkLevel("Motivation")) psText *= (1 + (getPerkLevel("Motivation") * game.portal.Motivation.modifier));
			if (getPerkLevel("Motivation_II")) psText *= (1 + (getPerkLevel("Motivation_II") * game.portal.Motivation_II.modifier));
			if (increase != "fragments" && increase != "science"){
				if (game.global.challengeActive == "Alchemy") psText *= alchObj.getPotionEffect("Potion of Finding");
				psText *= alchObj.getPotionEffect("Elixir of Finding");
			}
			if (game.global.pandCompletions && increase != "fragments") psText *= game.challenges.Pandemonium.getTrimpMult();
			if (!game.portal.Observation.radLocked && game.global.universe == 2 && game.portal.Observation.trinkets > 0) psText *= game.portal.Observation.getMult();
			if (increase == "food" || increase == "wood" || increase == "metal"){
				psText *= getParityBonus();
				if (autoBattle.oneTimers.Gathermate.owned && game.global.universe == 2) psText *= autoBattle.oneTimers.Gathermate.getMult();
			}
			if (getPerkLevel("Meditation") > 0) psText *= (1 + (game.portal.Meditation.getBonusPercent() * 0.01));
			if ((increase == "food" && game.buildings.Antenna.owned >= 5) || (increase == "metal" && game.buildings.Antenna.owned >= 15)) psText *= game.jobs.Meteorologist.getExtraMult();
			if (Fluffy.isRewardActive('gatherer')) psText *= 2;
			if (game.jobs.Magmamancer.owned > 0 && increase == "metal") psText *= game.jobs.Magmamancer.getBonusPercent();
			if (game.global.challengeActive == "Meditate") psText *= 1.25;
			else if (game.global.challengeActive == "Downsize") psText *= 5;
			if (game.global.challengeActive == "Toxicity"){
					var toxMult = (game.challenges.Toxicity.lootMult * game.challenges.Toxicity.stacks) / 100;
					psText *= (1 + toxMult);
			}
			if (game.global.challengeActive == "Balance"){
				psText *= game.challenges.Balance.getGatherMult();
			}
			if (game.global.challengeActive == "Unbalance"){
				psText *= game.challenges.Unbalance.getGatherMult();
			}
			if (game.global.challengeActive == "Decay"){
				var challenge = game.challenges[game.global.challengeActive];
				psText *= 10 * (Math.pow(challenge.decayValue, challenge.stacks));
			}
			if (game.global.challengeActive == "Daily"){
				if (typeof game.global.dailyChallenge.famine !== 'undefined' && increase != "fragments" && increase != "science"){
					psText *= dailyModifiers.famine.getMult(game.global.dailyChallenge.famine.strength);
				}
				if (typeof game.global.dailyChallenge.dedication !== 'undefined'){
					psText *= dailyModifiers.dedication.getMult(game.global.dailyChallenge.dedication.strength);
				}
			}
			if (game.global.challengeActive == "Archaeology" && increase != "fragments") psText *= game.challenges.Archaeology.getStatMult("science");
			if (game.global.challengeActive == "Insanity" && increase != "fragments") psText *= game.challenges.Insanity.getLootMult();
			if (game.challenges.Nurture.boostsActive() && increase != "fragments") psText *= game.challenges.Nurture.getResourceBoost();
			if (game.global.challengeActive == "Hypothermia" && increase == "wood") psText *= game.challenges.Hypothermia.getWoodMult(true);		
			if (game.global.challengeActive == "Watch") psText /= 2;
			if (game.global.challengeActive == "Lead" && ((game.global.world % 2) == 1)) psText *= 2;
			if (jobName != "Explorer" && getEmpowerment() == "Wind"){
				psText *= 1 + (game.empowerments.Wind.getCombatModifier());
			}
			psText = calcHeirloomBonus("Staff", jobName + "Speed", psText);
			if (game.global.playerGathering == increase){
				if ((game.talents.turkimp2.purchased || game.global.turkimpTimer > 0) && increase != "science"){
					var tBonus = 1.5;
					if (game.talents.turkimp2.purchased) tBonus = 2;
					else if (game.talents.turkimp2.purchased) tBonus = 1.75;
					psText *= tBonus;
				}
			psText += getPlayerModifier();
		}
			elem = document.getElementById(increase + "Ps");
			//Portal Packrat
			increase = game.resources[increase];
			if (increase.max != -1){
				var newMax = increase.max + (increase.max * game.portal.Packrat.modifier * getPerkLevel("Packrat"));
				newMax = calcHeirloomBonus("Shield", "storageSize", newMax);
				if (increase.owned >= newMax) psText = 0;
			}
			psText = psText;

		}
		if (game.options.menu.useAverages.enabled) psText = parseFloat(psText) + getAvgLootSecond(jobObj.increase);
		psText = prettify(psText);
		psText = "+" + psText + "/sec";
		elem.textContent = psText;
		swapClass('sizeSec', ((psText.replace('.','').length >= 11) ? 'sizeSecReduced' : 'sizeSecRegular'), elem);
}

function updateSideTrimps(){
	var trimps = game.resources.trimps;
	document.getElementById("trimpsEmployed").innerHTML = prettify(trimps.employed);
	var breedCount = (trimps.owned - trimps.employed > 2) ? prettify(Math.floor(trimps.owned - trimps.employed)) : 0;
	document.getElementById("trimpsUnemployed").innerHTML = breedCount;
	document.getElementById("maxEmployed").innerHTML = prettify(Math.ceil(trimps.realMax() / 2));
	var free = (Math.ceil(trimps.realMax() / 2) - trimps.employed);
	if (free < 0) free = 0;
	var s = (free > 1) ? "s" : "";
	document.getElementById("jobsTitleUnemployed").innerHTML = prettify(free) + " workspace" + s;
}

function unlockBuilding(what) {
	game.global.lastUnlock = new Date().getTime();
	var building = game.buildings[what];
	if (building.locked == 1) building.alert = true;
	building.locked = 0;
	if (building.onUnlock) building.onUnlock();
	drawAllBuildings();
}

function drawAllBuildings(){
	if (usingRealTimeOffline) return;
	var elem = document.getElementById("buildingsHere");
	elem.innerHTML = "";
	for (var item in game.buildings){
		building = game.buildings[item];
		if (building.locked == 1) continue;
		drawBuilding(item, elem);
		if (building.alert && game.options.menu.showAlerts.enabled){
			document.getElementById("buildingsAlert").innerHTML = "!";
			if (document.getElementById(item + "Alert")) document.getElementById(item + "Alert").innerHTML = "!";
		}
	}
	updateGeneratorInfo();
}

function drawBuilding(what, where){
	if (usingScreenReader){
		where.innerHTML += '<button class="thing noSelect pointer buildingThing" onclick="tooltip(\'' + what + '\',\'buildings\',\'screenRead\')">' + what + ' Info</button><button title="" onmouseout="tooltip(\'hide\')" class="thingColorCanNotAfford thing noselect pointer buildingThing" id="' + what + '" onclick="buyBuilding(\'' + what + '\')"><span class="thingName"><span id="' + what + 'Alert" class="alert badge"></span>' + what + '</span>, <span class="thingOwned" id="' + what + 'Owned">' + game.buildings[what].owned + '</span><span class="cantAffordSR">, Not Affordable</span><span class="affordSR">, Can Buy</span></button>';
		return;
	}
	where.innerHTML += '<div onmouseover="tooltip(\'' + what + '\',\'buildings\',event)" onmouseout="tooltip(\'hide\')" class="thingColorCanNotAfford thing noselect pointer buildingThing" id="' + what + '" onclick="buyBuilding(\'' + what + '\')"><span class="thingName"><span id="' + what + 'Alert" class="alert badge"></span>' + what + '</span><br/><span class="thingOwned" id="' + what + 'Owned">' + game.buildings[what].owned + '</span></div>';
}

function unlockJob(what) {
	game.global.lastUnlock = new Date().getTime();
	var job = game.jobs[what];
	if (job.locked == 1) job.alert = true;
	job.locked = 0;
	drawAllJobs();
}

function drawAllJobs(force){
	if (usingRealTimeOffline && !force) return;
	var elem = document.getElementById("jobsHere");
	elem.innerHTML = "";
	for (var item in game.jobs){
		if (game.jobs[item].locked == 1) continue;
		if (item == "Geneticist" && game.global.Geneticistassist){
			drawGeneticistassist(elem);
		}
		else
			drawJob(item, elem);
		if (game.jobs[item].alert && game.options.menu.showAlerts.enabled){
			document.getElementById("jobsAlert").innerHTML = "!";
			if (document.getElementById(item + "Alert")) document.getElementById(item + "Alert").innerHTML = "!";
		}
	}
}

function drawJob(what, where){
	if (usingScreenReader){
		where.innerHTML += '<button class="thing noSelect pointer jobThing" onclick="tooltip(\'' + what + '\',\'jobs\',\'screenRead\')">' + what + ' Info</button><button onmouseover="tooltip(\'' + what + '\',\'jobs\',event)" onmouseout="tooltip(\'hide\')" class="thingColorCanNotAfford thing noselect pointer jobThing" id="' + what + '" onclick="buyJob(\'' + what + '\')"><span class="thingName"><span id="' + what + 'Alert" class="alert badge"></span>' + what + '</span>, <span class="thingOwned" id="' + what + 'Owned">0</span><span class="cantAffordSR">, Not Affordable</span><span class="affordSR">, Can Buy</span></button>';
		return;
	}
	where.innerHTML += '<div onmouseover="tooltip(\'' + what + '\',\'jobs\',event)" onmouseout="tooltip(\'hide\')" class="thingColorCanNotAfford thing noselect pointer jobThing" id="' + what + '" onclick="buyJob(\'' + what + '\')"><span class="thingName"><span id="' + what + 'Alert" class="alert badge"></span>' + what + '</span><br/><span class="thingOwned" id="' + what + 'Owned">0</span></div>';
}

function drawGeneticistassist(where){
	where.innerHTML += '<div id="GeneticistassistContainer" class="thing"><div onmouseover="tooltip(\'Geneticist\',\'jobs\',event)" onmouseout="tooltip(\'hide\')" class="thingColorCanNotAfford thing noselect pointer jobThing" id="Geneticist" onclick="buyJob(\'Geneticist\')"><span class="thingName"><span id="GeneticistAlert" class="alert badge"></span>Geneticist</span><br/><span class="thingOwned" id="GeneticistOwned">0</span></div><div onmouseover="tooltip(\'Geneticistassist\',null,event)" onmouseout="tooltip(\'hide\')" class="thing thingColorNone noselect stateHappy pointer jobThing" id="Geneticistassist" onclick="toggleGeneticistassist()">Geneticistassist<span id="GAIndicator"></span><br/><span id="GeneticistassistSetting">&nbsp;</span></div></div>';
	toggleGeneticistassist(true);
}

function refreshMaps(){
	document.getElementById("mapsHere").innerHTML = "";
	document.getElementById("voidMapsHere").innerHTML = "";
	for (var item in game.global.mapsOwnedArray) {
			unlockMap(item);
	}
}

function getUniqueColor(item){
	if (!game.global.runningChallengeSquared) {
		if (item.name == "The Prison" && game.global.challengeActive == "Electricity")
			return " noRecycle";
		if (item.name == "The Prison" && game.global.challengeActive == "Mapocalypse")
			return " noRecycle";
		if (item.name == "Imploding Star" && game.global.challengeActive == "Devastation")
			return " noRecycle";
	}
	if (item.name == "Frozen Castle") return " noRecycle";

	if (item.location && game.mapConfig.locations[item.location].upgrade){
		var upgrade = game.mapConfig.locations[item.location].upgrade;
		if (!upgrade) return " noRecycleDone";
		upgrade = (Array.isArray(upgrade)) ? upgrade : [upgrade];
		for (var x = 0; x < upgrade.length; x++){
			var thisUpgrade = game.mapUnlocks[upgrade[x]];
			if (thisUpgrade.specialFilter){
				if (!thisUpgrade.specialFilter(item.level)) return " noRecycleDone";
				if (typeof thisUpgrade.canRunOnce === 'undefined') return " noRecycle";
			}
			if (thisUpgrade.canRunOnce) return " noRecycle";
		}
	}
	return " noRecycleDone";
}

function getMapIcon(mapObject, nameOnly) {
	var icon = mapObject.location;
	icon = game.mapConfig.locations[icon].resourceType;
	if (nameOnly) return icon;
	if (mapObject.voidBuff)
		return voidBuffConfig[mapObject.voidBuff].icon;
	if (icon == "Scaling") icon = getFarmlandsResType();
	switch (icon){
		case "Food":
			return "glyphicon glyphicon-apple";
		case "Metal":
			return "icomoon icon-cubes";
		case "Wood":
			return "glyphicon glyphicon-tree-deciduous";
		case "Gems":
			return "icomoon icon-diamond";
		case "Any":
			return "icomoon icon-leaf2";
	}
	return "icomoon icon-cubes";
}

function unlockMap(what) { //what here is the array index
	var item = game.global.mapsOwnedArray[what];
	var btnClass = "mapElementNotSelected thing noselect pointer mapThing";
	if (game.singleRunBonuses.goldMaps.owned && !item.noRecycle) btnClass += " goldMap";
	var level = item.level;
	var tooltip = "";
	var loc = "mapsHere";
	if (item.location == "Void") {
		btnClass += " voidMap";
		level = '<span class="glyphicon glyphicon-globe"></span>';
		tooltip = " onmouseover=\"tooltip('Void Map', 'customText', event, 'This Map will scale in level to your current Zone Number, enemies have a random buff, and the boss at the final cell will drop " + heliumOrRadon() + ". This map will disappear after it is completed once, and leaving the map will reset its progress.');\" onmouseout=\"tooltip('hide')\"";
		loc = "voidMapsHere";
	}
	if (item.location == "Darkness"){
		btnClass += " blackMap";
		level = '<span class="glyphicon glyphicon-globe"></span>';
		tooltip = " onmouseover=\"tooltip('Void Map', 'customText', event, 'This Map will scale in level to your current Zone Number. Completing this map will reduce your stacks of Exhausted and Motivated by 1.');\" onmouseout=\"tooltip('hide')\"";
	}
	else if (item.noRecycle) btnClass += getUniqueColor(item);
	var elem = document.getElementById(loc);
	var abbrev = (item.bonus) ? item.bonus : "";
	
	if (item.location == "Bionic"){
		if (game.talents.bionic2.purchased) abbrev = '<span class="mapSpec"> (P, FA)</span>';
		else abbrev = ((abbrev) ? getMapSpecTag(abbrev) : "");
		var nextBwReward = getNextLockedBwReward();
		if (nextBwReward != -1){
			nextBwReward = game.bwRewards[nextBwReward].requires;
			if (level >= nextBwReward) btnClass += " bwUpgradeAvailable";
		}
	}
	else abbrev = ((abbrev) ? getMapSpecTag(abbrev) : "");
	if (game.options.menu.extraStats.enabled) elem.innerHTML = '<div' + tooltip + ' class="' + btnClass + '" id="' + item.id + '" onclick="selectMap(\'' + item.id + '\')"><div class="onMapIcon"><span class="' + getMapIcon(item) + '"></span></div><div class="thingName onMapName">' + item.name + '</div><br/><span class="thingOwned mapLevel"><span class="stackedVoids">' + ((item.stacked) ? "(x" + (item.stacked + 1) + ") " : "") + '</span>Level ' + level + abbrev + '</span><br/><span class="onMapStats"><span class="icomoon icon-gift2"></span>' + Math.floor(item.loot * 100) + '% </span><span class="icomoon icon-cube2"></span>' + item.size + ' <span class="icon icon-warning"></span>' + Math.floor(item.difficulty * 100) + '%</div>' + elem.innerHTML;
	else elem.innerHTML = '<div' + tooltip + ' class="' + btnClass + '" id="' + item.id + '" onclick="selectMap(\'' + item.id + '\')"><span class="thingName">' + item.name + '</span><br/><span class="thingOwned mapLevel"><span class="stackedVoids">' + ((item.stacked) ? "(x" + (item.stacked + 1) + ") " : "") + '</span>Level ' + level + abbrev + '</span></div>' + elem.innerHTML;
	if (item.id == game.global.currentMapId) swapClass("mapElement", "mapElementSelected", document.getElementById(item.id));
}

function getMapSpecTag(modifier){
	return '<span class="mapSpec"> (' + mapSpecialModifierConfig[modifier].abv + ')</span>'
}

function unlockUpgrade(what, displayOnly) {
	if (!displayOnly) game.global.lastUnlock = new Date().getTime();
	if (getAvailableGoldenUpgrades() >= 1) displayGoldenUpgrades(true);
	var upgrade = game.upgrades[what];
	upgrade.locked = 0;
	if (upgrade.prestiges){
		var resName = (what == "Supershield") ? "wood" : "metal";
		upgrade.cost.resources[resName] = getNextPrestigeCost(what);
	}
	if (!displayOnly) {
		upgrade.allowed++;
		upgrade.alert = true;
	}
	drawAllUpgrades();
}

function drawAllUpgrades(){
	if (usingRealTimeOffline) return;
	var elem = document.getElementById("upgradesHere");
	elem.innerHTML = "";
	for (var item in game.upgrades){
		if (game.upgrades[item].locked == 1) continue;
		drawUpgrade(item, elem);
		if (game.upgrades[item].alert && game.options.menu.showAlerts.enabled){
			document.getElementById("upgradesAlert").innerHTML = "!";
			if (document.getElementById(item + "Alert")) document.getElementById(item + "Alert").innerHTML = "!";
		}
	}
	goldenUpgradesShown = false;
	displayGoldenUpgrades();
}



function drawUpgrade(what, where){
	var upgrade = game.upgrades[what];
	if (upgrade.prestiges && (!upgrade.cost.resources[metal] || !upgrade.cost.resources[wood])){
		var resName = (what == "Supershield") ? "wood" : "metal";
		upgrade.cost.resources[resName] = getNextPrestigeCost(what);
	}
	var done = upgrade.done;
	var dif = upgrade.allowed - done;
	if (dif >= 1) dif -= 1;
	var name = what;
	if (typeof upgrade.name !== 'undefined') name = upgrade.name;
	if (upgrade.isRelic) done = game.challenges.Archaeology.getPoints(upgrade.relic);
	if (usingScreenReader){
		where.innerHTML += '<button id="srTooltip' + what + '" class="thing noSelect pointer upgradeThing" onclick="tooltip(\'' + what + '\',\'upgrades\',\'screenRead\')">' + what + ' Info</button><button onmouseover="tooltip(\'' + what + '\',\'upgrades\',event)" onmouseout="tooltip(\'hide\')" class="thingColorCanNotAfford thing noselect pointer upgradeThing" id="' + what + '" onclick="buyUpgrade(\'' + what + '\')"><span id="' + what + 'Alert" class="alert badge"></span><span class="thingName">' + name + '</span>, <span class="thingOwned" id="' + what + 'Owned">' + done + '</span><span class="cantAffordSR">, Not Affordable</span><span class="affordSR">, Can Buy</span></button>';
	}
	else{
		where.innerHTML += '<div onmouseover="tooltip(\'' + what + '\',\'upgrades\',event)" onmouseout="tooltip(\'hide\')" class="thingColorCanNotAfford thing noselect pointer upgradeThing" id="' + what + '" onclick="buyUpgrade(\'' + what + '\')"><span id="' + what + 'Alert" class="alert badge"></span><span class="thingName">' + name + '</span><br/><span class="thingOwned" id="' + what + 'Owned">' + done + '</span></div>';
	}
	if (!upgrade.isRelic && dif >= 1) document.getElementById(what + "Owned").innerHTML = upgrade.done + "(+" + dif + ")";
}

function checkButtons(what) {
	var where = game[what];
	if (what == "jobs") {
		var workspaces = game.workspaces;
		for (var item in game.jobs){
			if (game.jobs[item].locked == 1) continue;
			if (workspaces <= 0 && !(game.jobs[item].allowAutoFire && game.options.menu.fireForJobs.enabled)) updateButtonColor(item, false, true);
			else updateButtonColor(item,canAffordJob(item, false, workspaces, true),true);
		}
		return;
	}
	if (what == "upgrades"){
		for (var itemA in game.upgrades){
			var thisUpgrade = game.upgrades[itemA];
			if (thisUpgrade.locked == 1) continue;
			if (itemA == "Coordination")
				updateButtonColor(itemA, (canAffordTwoLevel(thisUpgrade) && canAffordCoordinationTrimps()));
			else if (thisUpgrade.isRelic)
				updateButtonColor(itemA, (canAffordTwoLevel(thisUpgrade) && game.challenges.Archaeology.getPoints(thisUpgrade.relic) < 50))
			else
				updateButtonColor(itemA, canAffordTwoLevel(thisUpgrade));
		}
		return;
	}
	if (what == "buildings"){
		for (var itemBuild in game.buildings){
			var thisBuilding = game.buildings[itemBuild];
			if (thisBuilding.locked == 1) continue;
			var canAfford = canAffordBuilding(itemBuild, false, false, false, true);
/* 			if (itemBuild == "Nursery" && mutations.Magma.active())
				canAfford = false;
 */			updateButtonColor(itemBuild, canAfford);
		}
		return;
	}
	if (what == "equipment"){
		for (var itemEquip in game.equipment){
			var thisEquipment = game.equipment[itemEquip];
			if (thisEquipment.locked == 1) continue;
			updateButtonColor(itemEquip, canAffordBuilding(itemEquip, null, null, true, true));
		}
		return;
	}
	for (var itemB in where) {
		if (where[itemB].locked == 1) continue;
		var canAfford = true;
		for (var cost in where[itemB].cost) {
			var costItem = where[itemB].cost[cost];
			var numCost = (typeof costItem === 'function') ? costItem() : costItem;
			if (typeof costItem[1] !== 'undefined') numCost = resolvePow(costItem, where[itemB]);
			if (game.resources[cost].owned < numCost) {
				canAfford = false;
				break;
			}
		}
		if (canAfford === false) {
			updateButtonColor(itemB, false);
			continue;
		}
		updateButtonColor(itemB, true);
	}
}

function updateButtonColor(what, canAfford, isJob) {
	if (usingRealTimeOffline) return;
	if (what == "Amalgamator") return;
	var elem = document.getElementById(what);
	if (elem === null){
		return;
	}
	if (game.options.menu.lockOnUnlock.enabled == 1 && (new Date().getTime() - 1000 <= game.global.lastUnlock)) canAfford = false;
	if (game.global.challengeActive == "Archaeology" && game.upgrades[what] && game.upgrades[what].isRelic){
		var className = "thingColor" + ((canAfford) ? "CanAfford" : "CanNotAfford");
		var nextAuto = game.challenges.Archaeology.checkAutomator();
		if (nextAuto == "off") className += "RelicOff";
		else if (nextAuto == "satisfied") className += "RelicSatisfied";
		else if (nextAuto == what + "Cost") className += "RelicNextWaiting";
		else if (nextAuto + "Relic" == what) className += "RelicBuying";
		swapClass("thingColor", className, elem);
		return;
	}
	if (isJob && game.global.firing === true) {
		if(game.jobs[what].owned >= 1) {
			//note for future self:
			//if you need to add more states here, change these to use the swapClass func -grabz
			//with "thingColor" as first param
			swapClass("thingColor", "thingColorFiringJob", elem);
		}
		else{
			swapClass("thingColor", "thingColorCanNotAfford", elem);
		}
		return;
	}
	if (what == "Warpstation") {
		if(canAfford)
			elem.style.backgroundColor = getWarpstationColor();
		else
			elem.style.backgroundColor = "";
	}

	if(canAfford){
		if
			(what == "Gigastation" && (ctrlPressed || game.options.menu.ctrlGigas.enabled)) swapClass("thingColor", "thingColorCtrl", elem);
		else
		swapClass("thingColor", "thingColorCanAfford", elem);
	}
	else
		swapClass("thingColor", "thingColorCanNotAfford", elem);
}

function getWarpstationColor() {
	var amt = game.upgrades.Gigastation.done * 5;
	if (amt > 255) amt = 255;
	return "rgb(0, " + Math.floor(amt / 2) + ", " + amt + ")";

}

function unlockEquipment(what, fromCheck) {
	game.global.lastUnlock = new Date().getTime();
	var equipment = game.equipment[what];
	equipment.locked = 0;
	if (!fromCheck){
		drawAllEquipment();
		return;
	}
}

function drawAllEquipment(){
	if (usingRealTimeOffline) return;
	var elem = document.getElementById("equipmentHere");
	elem.innerHTML = "";
	for (var item in game.equipment){
		if (game.equipment[item].locked == 1) continue;
		drawEquipment(item, elem);
	}
}

function drawEquipment(what, elem){
	var numeral = "";
	var equipment = game.equipment[what];
	if (equipment.prestige > 1){
		numeral = (usingScreenReader) ? prettify(equipment.prestige) : romanNumeral(equipment.prestige);
	}
	if (usingScreenReader){
		elem.innerHTML += '<button class="thing noSelect pointer" onclick="tooltip(\'' + what + '\',\'equipment\',\'screenRead\')">' + what + ' Info</button><button onmouseover="tooltip(\'' + what + '\',\'equipment\',event)" onmouseout="tooltip(\'hide\')" class="noselect pointer thingColorCanNotAfford thing" id="' + what + '" onclick="buyEquipment(\'' + what + '\')"><span class="thingName">' + what + ' <span id="' + what + 'Numeral">' + numeral + '</span></span>, <span class="thingOwned">Level: <span id="' + what + 'Owned">0</span></span><span class="cantAffordSR">, Not Affordable</span><span class="affordSR">, Can Buy</span></button>';
		return;
	}
	elem.innerHTML += '<div onmouseover="tooltip(\'' + what + '\',\'equipment\',event)" onmouseout="tooltip(\'hide\')" class="noselect pointer thingColorCanNotAfford thing" id="' + what + '" onclick="buyEquipment(\'' + what + '\')"><span class="thingName">' + what + ' <span id="' + what + 'Numeral">' + numeral + '</span></span><br/><span class="thingOwned">Level: <span id="' + what + 'Owned">0</span></span></div>';
}

//isPrevious returns the previous color, used for swapping with str.replace to know which one was before
function getBarColorClass(percent) {
	if (percent > 50) return "percentColorBlue";
	else if (percent > 25) return "percentColorYellow";
	else if (percent > 10) return "percentColorOrange";
	else return "percentColorRed";
}

function displayPerksBtn(){
	var btn = document.getElementById("pastUpgradesBtn");
	if (game.global.totalPortals == 0){
		btn.className = "btn";
		btn.innerHTML = "???";
	}
	else {
		btn.className = "btn btn-primary";
		btn.innerHTML = "View Perks";
	}
}

var hasNewSetting = false;
function toggleSettingsMenu(){
	game.options.displayed = !game.options.displayed;
	var menuElem = document.getElementById("settingsHere");
	if (game.options.displayed) {
		var searchElem = document.getElementById('searchSettings');
		menuElem.style.display = "block";
		toggleSettingSection(true);
		settingTab(((hasNewSetting) ? "New" : "General"));
		return;
	}
	menuElem.style.display = "none";
	if (hasNewSetting) clearNewSettings();
}

function addNewSetting(name){
	game.options.menu[name].isNew = true;
	hasNewSetting = true;
	toggleSettingAlert();
}

function clearNewSettings(){
	for (var item in game.options.menu){
		if (game.options.menu[item].isNew) game.options.menu[item].isNew = false;
	}
	hasNewSetting = false;
	toggleSettingAlert();
	document.getElementById('NewTab').style.display = 'none';
}

function toggleSettingAlert(){
	var elem = document.getElementById('settingsAlert');
	if (elem == null) {
		if (hasNewSetting) document.getElementById('settingsText').innerHTML += ' <span class="alert" id="settingsAlert">!</span>';
		return;
	}
	if (hasNewSetting) elem.style.display = 'inline-block';
	else elem.style.display = 'none';
}

function displayAllSettings() {
	var settingsHere = document.getElementById("allSettingsHere");
	var html = "";
	for (var item in game.options.menu){
		var optionItem = game.options.menu[item];
		if (optionItem.locked) continue;
		if (typeof optionItem.lockUnless === 'function' && !optionItem.lockUnless()) continue;
		html += getSettingHtml(optionItem, item);
	}
	settingsHere.innerHTML = html;
}

function toggleSettingSection(toSearch){
	document.getElementById('searchSettingsWindow').style.display = (toSearch) ? "block" : "none";
	document.getElementById('allSettings').style.display = (toSearch) ? "none" : "block";
	document.getElementById(((toSearch) ? 'allSettingsHere' : 'settingSearchResults')).innerHTML = '';
	if (!toSearch) displayAllSettings();
	else searchSettings(document.getElementById('searchSettings'));
}

function settingTab(what){
	var elem = document.getElementById('searchSettings');
	elem.value = what;
	searchSettings(elem);
	clearSettingTabs();
	var tabElem = document.getElementById(what + "Tab");
	if (tabElem) swapClass('tab', 'tabSelected', tabElem);
	if (what == "New") document.getElementById('NewTab').style.display = "table-cell";
}

function clearSettingTabs(){
	var elems = document.getElementsByClassName('settingTab');
	for (var x = 0; x < elems.length; x++){
		swapClass('tab', 'tabNotSelected', elems[x])
	}
}

function searchSettings(elem){
	var search = elem.value.toLowerCase();
	var resultsElem = document.getElementById('settingSearchResults');
	if (search.length < 2) {
		resultsElem.innerHTML = "";
		return;
	}
	var results = [];
	for (var optionName in game.options.menu){
		var optionObject = game.options.menu[optionName];
		if (optionObject.locked) continue;
		if (typeof optionObject.lockUnless === 'function' && !optionObject.lockUnless()) continue;
		if (search == "new"){
			if (!optionObject.isNew) continue;
			results.push(optionName);
			continue;
		}
		if (optionObject.extraTags && optionObject.extraTags.search(search) != -1) results.push(optionName);
		else if (optionObject.description.toLowerCase().search(search) != -1) results.push(optionName);
		else {
			for (var x = 0; x < optionObject.titles.length; x++){
				if (optionObject.titles[x].toLowerCase().search(search) != -1){
					results.push(optionName);
					break;
				}
			}
		}
	}
	var text = "";
	var forceClass = "";
	if (results.length > 10) {
		if (results.length > 12) {
			resultsElem.innerHTML = "";
			return;
		}
		else forceClass = ' settingFit12';

	}
	clearSettingTabs();
	for (var x = 0; x < results.length; x++){
		text += getSettingHtml(game.options.menu[results[x]], results[x], forceClass);
	}
	resultsElem.innerHTML = text;
}

function getSettingHtml(optionItem, item, forceClass, appendId){
	if (!appendId) appendId = "";
	if (!forceClass) forceClass = "";
	var text = optionItem.titles[optionItem.enabled];
	return "<div class='optionContainer" + forceClass + "'><div id='toggle" + item + appendId + "' class='noselect settingsBtn settingBtn" + optionItem.enabled + "' onclick='toggleSetting(\"" + item + "\"" + ((appendId) ? "" : ", this") + ")' onmouseover='tooltip(\"" + text + "\", \"customText\", event, \"" + optionItem.description + "\")' onmouseout='tooltip(\"hide\")'>" + text + "</div></div>";
}

function saveLogarithmicSetting(){
	var val = document.getElementById('logBaseInput').value;
	if (isNumberBad(val)) return;
	val = Math.floor(val);
	if (val < 2) val = 2;
	game.global.logNotBase = val;
}

var lastPause = -1;
function toggleSetting(setting, elem, fromPortal, updateOnly, backwards, fromHotkey){
	if (setting == "GeneticistassistTarget") {
		tooltip('Geneticistassist Settings', null, 'update');
		return;
	}
	if (setting == "generatorStart" && ctrlPressed && game.permanentGeneratorUpgrades.Supervision.owned){
		tooltip("Configure Generator State", null, "update");
		return;
	}
	if (setting == "standardNotation" && ctrlPressed && game.options.menu[setting].enabled == 5){
		//configure logarithmic
		tooltip("confirm", null, 'update', "Enter a number here to use as the base for your logarithmic numbers! (Default is 10)<br/><br/><input id='logBaseInput' value='" + game.global.logNotBase + "' type='number'/>", "saveLogarithmicSetting()", "Configure Log", "Confirm");
		return;
	}
	if (setting == "archAutomator"){
		tooltip("Archaeology Automator", null, 'update');
		return;
	}
	if (setting == "pauseGame"){
		if (game.options.menu.disablePause.enabled == 0) return;
		if (new Date().getTime() - lastPause < 110) return;
		lastPause = new Date().getTime();
	}
	var menuOption = game.options.menu[setting];
	if (setting == "mapAtZone" && !updateOnly && (menuOption.enabled == 0 || fromHotkey)){
		tooltip('Set Map At Zone', null, 'update');
		return;
	}
	if (setting == "usePlayFab" && !updateOnly){
		if (menuOption.enabled == 0){
			authenticated = enablePlayFab();
			if (!authenticated) return;
		}
		else {
			game.global.playFabLoginType = -1;
			playFabId = -1;
		}
	}
	var toggles = menuOption.titles.length;
	if (!updateOnly){
		if (backwards && toggles > 2){
			menuOption.enabled--;
			if (menuOption.enabled < 0) menuOption.enabled = toggles - 1;
		}
		else {
			if (toggles == 2)	menuOption.enabled = (menuOption.enabled) ? 0 : 1;
			else {
				menuOption.enabled++;
				if (menuOption.enabled >= toggles) menuOption.enabled = 0;
			}
		}
		if (menuOption.onToggle) menuOption.onToggle();
	}
	else if (setting == "usePlayFab") menuOption.onToggle();
	if (fromPortal){
		document.getElementById('ptabInfoText').innerHTML = (menuOption.enabled) ? "Less Info" : "More Info";
		displayPortalUpgrades(true);
		return;
	}
	var menuElem = [];
	menuElem[0] = (elem) ? elem : document.getElementById("toggle" + setting);
	if (typeof menuOption.secondLocation !== 'undefined'){
		for (var z = 0; z < menuOption.secondLocation.length; z++){
			menuElem.push(document.getElementById(menuOption.secondLocation[z]));
		}
	}
	for (var x = 0; x < menuElem.length; x++){
		if (menuElem[x] === null) continue;
		menuElem[x].innerHTML = menuOption.titles[menuOption.enabled];
		swapClass("settingBtn", "settingBtn" + menuOption.enabled, menuElem[x]);
		if (setting == "deleteSave") return;
		if (!updateOnly && elem) cancelTooltip(true);
		menuElem[x].onmouseover = function(event) {tooltip(menuOption.titles[menuOption.enabled], "customText", event, menuOption.description)};
	}
	if (!updateOnly && elem) tooltip(menuOption.titles[menuOption.enabled], "customText", 'update', menuOption.description)
}

	function achievementCompatibilityUnlock() {
		checkAchieve("zones", null, false, true);
		checkAchieve("damage", calculateDamage(game.global.soldierCurrentAttack, true, true, true), false, true);
		checkAchieve("trimps", game.resources.trimps.owned, false, true);
		checkAchieve("portals", null, false, true);
		checkAchieve("totalZones", null, false, true);
		checkAchieve("totalMaps", null, false, true);
		game.stats.gemsCollected.value += game.resources.gems.owned;
		checkAchieve("totalGems", null, false, true);
		for (var item in game.achievements.housing.breakpoints){
			item = game.achievements.housing.breakpoints[item];
			if (game.buildings[item] && game.buildings[item].owned > 0) checkAchieve("housing", item, false, true);
			else break;
		}
		if (game.global.achievementBonus > 0){
			cancelTooltip();
			tooltip("New Achievements", null, 'update');
		}
	}

	function displayAchievementPopup(id, forHover, displayNumber, forTracker){
		if (!forHover && game.options.menu.achievementPopups.enabled == 0) return;
		var achievement = game.achievements[id];
		var index = achievement.newStuff.indexOf(displayNumber);
		if (index != -1) {
			var elem = document.getElementById(id + displayNumber + "Alert");
			if (elem) elem.style.display = "none";
			achievement.newStuff.splice(index, 1);
		}
		var location = (forTracker) ? "Tracker" : (forHover) ? "Hover" : "Popup";
		if (typeof displayNumber == 'undefined' && typeof achievement.finished === 'number') displayNumber = achievement.finished;
		var prog = (forTracker) ? document.getElementById("achievementTrackerProgress") : document.getElementById("achievementHoverProgress");
		var one = (typeof achievement.finished !== 'number');
		var titleElem = document.getElementById('achievement' + location + 'Title');
		if ((forHover || forTracker) && ((!one && !achievement.showAll && displayNumber > achievement.finished) || (one && (achievement.filterLevel() < achievement.filters[displayNumber] && !achievement.finished[displayNumber])))) {
			document.getElementById("achievement" + location).style.display = "block";
			document.getElementById("achievement" + location + "IconContainer").innerHTML = '<span class="achieveTier' + achievement.tiers[displayNumber] + ' icomoon icon-locked achievementPopupIcon"></span>';
			titleElem.innerHTML = "Locked";
			titleElem.className = 'achieveTier' + achievement.tiers[displayNumber];
			document.getElementById("achievement" + location + "Description").innerHTML = "Locked";
			document.getElementById("achievement" + location + "Reward").innerHTML = '<b>Reward:</b> +' + game.tierValues[achievement.tiers[displayNumber]] + "% Damage";
			prog.innerHTML = "";
			return;
		}
		document.getElementById("achievement" + location).style.display = "block";
		document.getElementById("achievement" + location + "IconContainer").innerHTML = '<span class="achieveTier' + achievement.tiers[displayNumber] + ' ' + achievement.icon + ' achievementPopupIcon"></span>';
		titleElem.innerHTML = achievement.names[displayNumber];
		titleElem.className = 'achieveTier' + achievement.tiers[displayNumber];
		document.getElementById("achievement" + location + "Description").innerHTML = achievement.description(displayNumber);
		document.getElementById("achievement" + location + "Reward").innerHTML = '<b>Reward:</b> +' + game.tierValues[achievement.tiers[displayNumber]] + "% Damage";
		if ((forHover || forTracker) && typeof achievement.progress !== 'undefined' && (typeof achievement.highest === 'undefined' || (achievement.highest > 0 || achievement.finished > 0))){
			if (!one && achievement.tiers.length == achievement.finished){
				prog.innerHTML = "Row Finished! (" + achievement.progress(displayNumber) + ")";
			}
			else{
				if (achievement.timed && displayNumber == achievement.finished){
					if (achievement.u != game.global.universe) prog.innerHTML = "You're in the wrong Universe! " + achievement.progress(displayNumber);
					else if (achievement.evaluate() >= achievement.breakpoints[displayNumber]) prog.innerHTML = "Progress: Too slow! " + achievement.progress(displayNumber);
					else prog.innerHTML = "Progress: " + achievement.progress(displayNumber);
				}
				else{
					prog.innerHTML = "Progress: " + achievement.progress(displayNumber);
				}
			}
		}
		else
			if (!one && achievement.tiers.length == achievement.finished){
				prog.innerHTML = "Row Finished!";
			}
			else prog.innerHTML = "";
	}

	function checkAchieve(id, evalProperty, doubleChecking, noDisplay) {
		if (id == "housing" && checkHousing(false, true) >= 100) giveSingleAchieve("Realtor");
		var achievement = game.achievements[id];
		if (typeof achievement.evaluate !== 'undefined') evalProperty = achievement.evaluate();
		if (achievement.timed && evalProperty < 0) return;
		if (typeof achievement.highest !== 'undefined') {
			if (achievement.reverse) {
				if (achievement.highest === 0 || evalProperty < achievement.highest) achievement.highest = evalProperty;
			}
			else {
				if (evalProperty > achievement.highest) achievement.highest = evalProperty;
			}
		}
		if (achievement.finished == achievement.tiers.length) return;
		if (typeof achievement.breakpoints[achievement.finished] === 'number'){
			if (!achievement.reverse){
				if (evalProperty < achievement.breakpoints[achievement.finished]) return;
			}
			else {
				if (evalProperty >= achievement.breakpoints[achievement.finished]) return;
			}
		}
		else if (evalProperty != achievement.breakpoints[achievement.finished]) return;
		if (!noDisplay) displayAchievementPopup(id, false, achievement.finished);
		achievement.newStuff.push(achievement.finished);
		achievement.finished++;
		checkAchieve(id, evalProperty, true, noDisplay);
		if (!doubleChecking) calculateAchievementBonus();
		if (trimpAchievementsOpen && !doubleChecking) displayAchievements();
	}

	function giveSingleAchieve(index){
		var area = (game.global.universe == 2) ? "oneOffs2" : "oneOffs";
		if (index == "Huffstle" || index == "Just Smack It" || index == "Heavy Trinker" || index == "Peace") area = "oneOffs2"; //U2 achievements but completable in U1
		var achievement = game.achievements[area];
		index = game.achievements[area].names.indexOf(index);
		if (index == -1 || achievement.finished[index]) return;
		displayAchievementPopup(area, false, index);
		achievement.newStuff.push(index);
		achievement.finished[index] = true;
		calculateAchievementBonus();
		if (trimpAchievementsOpen) displayAchievements();
	}

	function calculateAchievementBonus(){
		var totalBonus = 0;
		for (var item in game.achievements){
			var achievement = game.achievements[item];
			var one = (typeof achievement.finished !== 'number'); //Check for one-off achievement
			var count = (one) ? achievement.finished.length : achievement.finished;
			for (var x = 0; x < count; x++){
				if (one && !achievement.finished[x]) continue;
				totalBonus += game.tierValues[achievement.tiers[x]];
			}
		}
		game.global.achievementBonus = parseFloat(totalBonus.toFixed(1));
	}

	function displayAchievements(){
		var htmlString = "";
		var count = 0;
		if (usingScreenReader){ 
			htmlString += "<table class='screenReaderAchievements'><tbody><tr><td>Achievement Tier Values</td>";
			for (var y = 1; y < game.tierValues.length; y++){
				htmlString += "<td> Tier " + y + " is worth " + game.tierValues[y] + "% damage</td>";
			}
			htmlString += "</tr>";
		}
		for (var item in game.achievements) {
			count++;
			var achievement = game.achievements[item];
			if (typeof achievement.display !== 'undefined' && !achievement.display()) continue;
			var amount = achievement.tiers.length;
			var one = (typeof achievement.finished !== 'number');
			var hasProgress = (typeof achievement.progress !== 'undefined' && (typeof achievement.highest === 'undefined' || (achievement.highest > 0 || achievement.finished > 0)));
			var SRfinished = false;
			if (usingScreenReader){
				for (var x = 0; x < amount; x++){
					if (!one && achievement.finished > x && game.options.menu.hideCompleteAchieves.enabled == 0) continue;
					if (one && achievement.finished[x] && game.options.menu.hideCompleteAchieves.enabled == 0) continue;
					var locked = false;
					if (x == 0 && count != 1) htmlString += "</tr>";
					if (x == 0){ 
						htmlString += "<tr><td title='achievementGroup'>" + achievement.title;
						if (hasProgress && !one && achievement.tiers.length == achievement.finished){
							htmlString  += "<br/>Row Finished! (" + achievement.progress() + ")";
							SRfinished = true;
						}
						htmlString += "</td>";
					}
					if (one && achievement.filters[x] == -1 && !achievement.finished[x]) continue;
					htmlString += "<td>";
					if ((!one && achievement.finished == x) || (one && !achievement.finished[x] && achievement.filterLevel() >= achievement.filters[x])) {
						if (item == "humaneRun" || item == "mapless")
							htmlString += (achievement.evaluate() == 0) ? "Not complete, failed for this run." : "Not complete";
						else if (achievement.timed){
							if (game.global.universe != achievement.u) htmlString += "You're in the wrong Universe!";
							else if (achievement.evaluate() > achievement.breakpoints[achievement.finished]) htmlString += "This run is already too long!"
						}
						else
							htmlString += (one && !checkFeatEarnable(achievement.names[x])) ? "Not complete, failed for this run." : "Not complete";
					}
					else if ((one && achievement.finished[x]) || (!one && achievement.finished > x)) {
						htmlString += "Completed"
					}
					else{ 
						htmlString += "Locked";
						locked = true;
					}
					if (!locked) htmlString += "<br/>" + achievement.names[x];
					htmlString += ", Tier " + achievement.tiers[x];
					if (!locked){ 
						if (hasProgress && !SRfinished) {
							htmlString += "<br/>Progress: " + achievement.progress();
						}
						htmlString += "<br/>" + achievement.description(x);
					}
					htmlString += "</td>";
				}
				continue;
			}
			var titleClass = 'class="achievementTitle';
			if (amount > 48)
				titleClass += ' quinTall';
			else if (amount > 36)
				titleClass += ' quadTall';
			else if (amount > 24)
				titleClass += ' tripleTall';
			else if (amount > 12)
				titleClass += ' doubleTall';


			var tempHtmlString = '<div class="achievementsContainer"><div ' + titleClass + '">' + achievement.title + '</div><span class="littleAchievementWrapper">';
			var width = 7.3;
			var added = 0;
			for (var x = 0; x < amount; x++){
				if (!one && achievement.finished > x && game.options.menu.hideCompleteAchieves.enabled == 0) continue;
				if (one && achievement.finished[x] && game.options.menu.hideCompleteAchieves.enabled == 0) continue;
				added++;
				if (one && achievement.filters[x] == -1 && !achievement.finished[x]) continue;
				var displayColor = "achieveColorGrey";
				var borderStyle = "";
				var tierValue = "<span style='color: black;' class='{ICONCLASS}'></span>";
				if (game.global.trackedAchieve && item == game.global.trackedAchieve[0] && x == game.global.trackedAchieve[1]) tierValue += "<span style='color: black;' class='icomoon icon-map-pin pinnedAchieve'></span>"
				if ((!one && achievement.finished == x) || (one && !achievement.finished[x] && achievement.filterLevel() >= achievement.filters[x])) {
					if (item == "humaneRun" || item == "mapless" || item == "shielded")
						displayColor = (achievement.evaluate(x) == 0) ? "achieveColorRed" : "achieveColorYellow";
					else if (achievement.timed){
						displayColor = (game.global.universe != achievement.u || achievement.evaluate() >= achievement.breakpoints[achievement.finished]) ? "achieveColorRed": "achieveColorYellow";
					}
					else
						displayColor = (one && !checkFeatEarnable(achievement.names[x])) ? "achieveColorRed" : "achieveColorYellow";
				}
				else if ((one && achievement.finished[x]) || (!one && achievement.finished > x)) {
					displayColor = "achieveColorGreen";
					if (achievement.newStuff.length && achievement.newStuff.indexOf(x) != -1) tierValue = "<span id='" + item + x + "Alert' style='color: yellow;' class='icomoon icon-exclamation-circle'></span>&nbsp;" + tierValue;
				}
				else tierValue = "&nbsp;";
				var icon = (displayColor == "achieveColorRed") ? "icomoon icon-cross2" : achievement.icon;
				tierValue = tierValue.replace('{ICONCLASS}', icon);
				var sizeOvr = (achievement.size) ? " font-size: " + achievement.size + "vw;" : "";
				tempHtmlString += '<div onclick="startTrackAchieve(\'' + item + '\', ' + x + ')" onmouseover="displayAchievementPopup(\'' + item + '\', true, ' + x + ')" class="achievementContainer achieveTier' + achievement.tiers[x] + ' ' + displayColor + '" style="width: ' + width + '%;' + sizeOvr + '">' + tierValue + '</div>';
			}
			tempHtmlString += '</span><div id="' + item + 'Description" class="achievementDescription")"></div></div>';
			if (added > 0) htmlString += tempHtmlString;
		}
		if (usingScreenReader) htmlString += "</tr></tbody></table>";
		if (!htmlString) htmlString = "<br/><br/>You have completed every Achievement!";
		document.getElementById("achievementsHere").innerHTML = htmlString;
		document.getElementById("achievementTotalPercent").innerHTML = game.global.achievementBonus;
	}

	function getTierValues(){
		for (var x = 0; x < game.heirlooms.rarities.length; x++){
			var output = (x == game.heirlooms.rarities.length - 1) ? game.heirlooms.rarityBreakpoints[x - 1] + "+: " : "<" + game.heirlooms.rarityBreakpoints[x] + ": ";
			var value = 0;
			for (var y = 0; y < game.heirlooms.rarities[x].length; y++){
				var rarity = game.heirlooms.rarities[x][y];
				if (rarity == -1) continue;
				value += (rarity / 10000) * (game.heirlooms.values[y] / 2);
			}
			console.log(output + prettify(value));
		}
	}

	var trimpAchievementsOpen = false;
	function toggleAchievementWindow(){
		closeAchievementPopup();
		document.getElementById("achievementWrapper").style.display = (trimpAchievementsOpen) ? "none" : "block";
		document.getElementById("wrapper").style.display = (trimpAchievementsOpen) ? "block" : "none";
		trimpAchievementsOpen = !trimpAchievementsOpen;
		if (trimpAchievementHelpOn) toggleAchievementHelp();
		if (!trimpAchievementsOpen) return;
		displayAchievements();
		var fluff = [
			[", better get some more achievements", ", you'd do fine with a few more achievements", " but you wish you had a few more achievements"],
			[", your achievement game shows promise", " on your path to achievement", ", thanks to your achievements"],
			[", thanks to your bounty of achievements", ", must be all those achievements", ", you are one with the achievements", " and you water your achievements daily"],
			[", your Trimps are mighty impressed", ", your achievements are mind blowing", ". You wake up, achieve, then sleep", ", you have achievement in your blood"],
			[", your achievements are beyond mortal comprehension", ", Trimps far and wide tell stories of your achievement", ", you have achieved achievement", ", everything you touch turns to achievement"],
			[", your achievements have achieved achievement", ", news of your achievement spreads throughout the galaxy", ", achievements bend to your will", ", your achievements transcend reality"],
			[", word of your achievement spreads throughout the universe", ", everyone else is super jealous", ", the achievements of your achievements have achieved achievement", ", your achievements have gained sentience", ", everyone else just stays home", ", you appear if someone says 'Achievement' 3 times in a mirror"],
			[", news of your achievement spreads throughout the multiverse", ". It's actually over 9000", ", everyone else is legitimately impressed", ", your great great grand achievements have achieved achievement", ".<br/>If achievement was a game, you would win", ". You achieved enlightenment, then your enlightenment started achieving", ", your Trimps tell all their friends how cool you are", ", you now gain your sustenance from achievements", ", your achievements bring all the Trimps to the Barn"]
		];
		var fluffLevel = getAchievementStrengthLevel();
		fluff = fluff[fluffLevel];
		fluff = fluff[Math.floor(Math.random() * fluff.length)]
		document.getElementById("achievementFluff").innerHTML = fluff;
		document.getElementById("achievementTotalPercent").innerHTML = game.global.achievementBonus;
		setGoldenBonusAchievementText();
	}

	function checkFeatEarnable(which){
		var failables = {
			Underachiever: function (){
				return (game.global.world < 30 && game.global.canRespecPerks && !game.global.bonePortalThisRun && countHeliumSpent() <= 60);
			},
			Underbalanced: function () {
				return (game.global.challengeActive == "Balance" && !game.global.runningChallengeSquared && game.challenges.Balance.highestStacks <= 100);
			},
			Peacekeeper: function (){
				return (game.global.world < 10 && game.stats.trimpsKilled.value <= 5);
			},
			Workplace_Safety: function () {
				return (game.global.world < 60 && game.stats.trimpsKilled.value <= 1000);
			},
			No_Time_for_That: function () {
				return (game.global.world < 120 && !game.global.researched);
			},
			Tent_City: function () {
				return (game.global.world < 75 && checkHousing(true) == 0);
			},
			Shaggy: function () {
				return (game.global.world < 60 && getHighestPrestige() <= 3);
			},
			Thick_Skinned: function () {
				return (game.global.challengeActive == "Crushed" && game.challenges.Crushed.critsTaken == 0);
			},
			Great_Host: function () {
				return (game.global.challengeActive == "Nom");
			},
			Unemployment: function () {
				var jobCount = 0;
				for (var job in game.jobs) {
					jobCount += game.jobs[job].owned;
				}
				return (game.global.world < 60 && jobCount - game.jobs.Dragimp.owned - game.jobs.Amalgamator.owned == 0 && game.stats.trimpsFired.value == 0);
			},
			Trimp_is_Poison: function () {
				return (game.global.challengeActive == "Toxicity" && game.challenges.Toxicity.highestStacks <= 400);
			},
			Grindless: function () {
				return (game.global.challengeActive == "Watch" && !game.challenges.Watch.enteredMap && game.buildings.Nursery.purchased == 0);
			},
			Unsatisfied_Customer: function () {
				return (game.global.challengeActive == "Lead" && game.upgrades.Gigastation.done <= 1);
			},
			Organic_Trimps: function () {
				return (game.global.challengeActive == "Corrupted" && !game.challenges.Corrupted.hiredGenes && game.jobs.Geneticist.owned == 0);
			},
			Invincible: function () {
				return (game.global.world <= 200 && game.global.spireDeaths == 0);
			},
			Grounded: function () {
				return game.global.challengeActive == "Electricity";
			},
			Very_Sneaky: function () {
				return game.global.challengeActive == "Life";
			},
			Nerfed: function () {
				return (game.global.canRespecPerks && !game.global.bonePortalThisRun && countHeliumSpent() <= 100e6);
			},
			Obliterate: function () {
				return (game.global.challengeActive == "Obliterated");
			},
			M_Algamator: function () {
				return (game.global.world == 1);
			},
			Hypercoordinated: function () {
				return (game.global.challengeActive == "Coordinate")
			},
			Forgot_Something: function () {
				return (game.upgrades.Bounty.done == 0)
			},
			Unbroken: function () {
				return (game.stats.battlesLost.value <= 5);
			},
			Leadership: function () {
				return (game.stats.battlesLost.value <= 100 && game.global.challengeActive == "Lead");
			},
			AntiScience: function () {
				return (game.global.challengeActive == "Scientist" && game.global.highestLevelCleared >= 129 && game.global.sLevel >= 4)
			},
			Nerfeder: function () {
				return (game.global.canRespecPerks && !game.global.bonePortalThisRun && countHeliumSpent() <= 1e9);
			},
			Imploderated: function () {
				return (game.global.challengeActive == "Obliterated");
			},
			Fhtagn: function(){
				return (game.global.challengeActive == "Domination");
			},
			Eradicate: function(){
				return (game.global.challengeActive == "Eradicated");
			},
			Invisible: function(){
				return (game.global.world < 599 || (game.global.spireDeaths == 0 && game.global.spireActive));
			},
			Unessenceted: function(){
				return (game.global.canRespecPerks && !game.global.bonePortalThisRun && countHeliumSpent() <= 0)
			},
			Melted: function(){
				return (game.global.challengeActive == "Obliterated");
			},
			Screwed: function(){
				return (game.global.challengeActive == "Eradicated");
			},
			Don_t_Need_Luck: function(){
				return (game.global.challengeActive == "Unlucky");
			},
			Perfectly_Balanced: function(){
				return (game.global.challengeActive == "Downsize");
			},
			Resourceyphobe: function(){
				var jobCount = 0;
				for (var job in game.jobs) jobCount += game.jobs[job].owned;
				return (game.global.challengeActive == "Transmute" && (jobCount - game.jobs.Dragimp.owned - game.jobs.Amalgamator.owned == 0 && game.stats.trimpsFired.value == 0))
			},
			Upsized: function(){
				return (game.global.challengeActive == "Unbalance");
			},
			Unpoppable: function(){
				return (game.global.challengeActive == "Bublé" && (game.global.canRespecPerks && !game.global.bonePortalThisRun && game.portal.Prismal.radLevel == 0));
			},
			Pwnd: function(){
				return (game.global.challengeActive == "Duel" && game.challenges.Duel.lowestTrimpStacks >= 20);
			},
			Solid: function() {
				return (game.global.challengeActive == "Melt" && game.challenges.Melt.largestStacks <= 150);
			},
			Coastapalooza: function(){
				return (game.global.challengeActive == "Trappapalooza" && !game.challenges.Trappapalooza.trappedAt50);
			},
			Witherproof: function(){
				return (game.global.challengeActive == "Wither");
			},
			Close_Call: function(){
				return (game.global.challengeActive == "Revenge");
			},
			Level_Up: function(){
				var complete = game.challenges.Quest.finishedQuests;
				if (!game.challenges.Quest.questComplete) complete++;
				return (game.global.challengeActive == "Quest" && complete == (game.global.world - 5));
			},
			Unassisted: function(){
				return (game.global.challengeActive == "Archaeology" && game.challenges.Archaeology.overZero == false);
			},
			Clear_Skies: function(){
				return (game.global.challengeActive == "Storm" && !game.challenges.Storm.mutated);
			},
			Actually_Insane: function(){
				return (game.global.challengeActive == "Insanity" && (game.global.world < 50 || game.challenges.Insanity.insanity == 500) && game.challenges.Insanity.highestLevel <= 50);
			},
			You_re_Doing_it_Wrong: function(){
				return (game.global.challengeActive == "Berserk" && (game.global.world < 100 || (game.challenges.Berserk.fullWeakAt != -1 && game.challenges.Berserk.fullWeakAt < 100)));
			},
			The_Tortoise_and_the_Bugs: function(){
				return (game.global.challengeActive == "Exterminate" && (game.global.world < 120 || game.challenges.Exterminate.achieveDone));
			},
			Nurtured_AF: function(){
				return (game.global.challengeActive == "Nurture" && (game.global.world <= 69 || game.challenges.Nurture.achieveDone));
			},
			Mad_Scientist: function(){
				return (game.global.challengeActive == "Alchemy" && alchObj.getPotionCount("Potion of the Void") == 0);
			},
			Burn_Baby_Burn: function(){
				return (game.global.challengeActive == "Hypothermia");
			},
			Unbreakable: function(){
				return (game.global.challengeActive == "Glass" && !game.global.runningChallengeSquared && game.challenges.Glass.highestGlass < 3);
			}

		};
		which = which.replace(/ /g, '_').replace("'", '_');
		if (typeof failables[which] === 'function') return failables[which]();
		else return true;
	}

	function getWorldText(zoneNumber){
		var universe1 = {
			w2: "Your Trimps killed a lot of Bad Guys back there. It seems like you're getting the hang of this. However, the world is large, and there are many more Zones to explore. Chop chop.",
			get w3(){
				if (game.jobs.Scientist.owned > 0) return "By your orders, your scientists have begun to try and figure out how large this planet is.";
				return "This planet seems so cold and lonely without Science."
			},
			w4: "You order your Trimps to search the area for the keys to your ship, but nobody finds anything. Bummer.",
			w5: "Do you see that thing at the end of this Zone? It's huge! It's terrifying! You've never seen anything like it before, but you know that it is a Blimp. How did you know that? Stop knowing things and go kill it.",
			w6: "You step over the corpse of the Blimp as it rapidly deflates, and one of your Trimps chuckles at the sound produced. You all cross the sulfuric river to the next Zone, and can feel the presence of an ancient knowledge. Better explore.",
			w7: "Slow and steady wins the race. Unless you're racing someone who is actually trying.",
			w8: "Your settlement is getting crowded, there's Trimps in the streets, and you're taking heat. You feel a sudden strong desire to create a map, though you're not quite sure how that would help.",
			w9: "You can't shake the feeling that you've been here before. Déjà-vu?",
			w10: "Looks like another Blimp up ahead. Hard to tell from far away, but it looks like it has more heads than the last one.",
			w11: "You're unstoppable as long as nothing stops you. Unfortunately, it seems like something really wants to stop you.",
			w12: "Did you see that green light flash by? Weird. Oh well.",
			w13: "Your scientists have finally concluded their report on the analysis of the size of the world. According to the report, they're pretty sure it's infinitely large, but you're pretty sure they just got bored of checking.",
			w14: "You were trying to help bring back some of the Equipment your Trimps left on the ground in that last Zone, and you got a splinter. This planet is getting dangerous, stay alert.",
			w15: "Another day, another Blimp at the end of the Zone.",
			w16: "Seriously? Another Blimp so soon?",
			w17: "You climb a large cliff and look out over the new Zone. Red dirt, scorched ground, and devastation. Is that a Dragimp flying around out there?!",
			w18: "There seems to be a strange force urging you to keep going. The atmosphere is becoming... angrier. Part of you wants to turn around and go back, but most of you wants to keep going.",
			w19: "You look behind and see your kingdom. You have gems, a colony, and territory. You wonder if enough Trimps have already fallen in battle. After contemplation, one word falls out of your mouth as you begin to move forward. 'Nah'",
			w20: "You can sense that you're close to your goal.",
			get w22 () {
				if (game.global.challengeActive == "Trimp" && game.jobs.Amalgamator.owned > 0) return toZalgo("You hear a strange humming noise that seems to draw you towards it, though it also seems to come from no direction in particular. You can feel that it's being created by " + ((game.jobs.Amalgamator.owned == 1) ? "the" : "an") + " Amalgamator, though you've never heard such a sound before. It's both unsettling and enchanting, and the Universe seems to hate it.", 4, 1);
				return "Strange, the sky seems to be getting darker. You ask one of your Trimps for the time, but he doesn't know what a clock is.";
			},
			w25: "You're a rebel. The universe pointed you into that portal, but you kept pushing forward. You feel... less like you've been here before.",
			w27: "It seems like the further you press on, the less you know. You still feel an urge to use the portal, though the urge has begun to dwindle.",
			w29: "Your Trimps came up with a pretty catchy battle song that got stuck in your head. None of them survived the next fight though, and you can't remember most of it. Life's tough.",
			w33: "You climb over a large hill that was separating this Zone from the last. The sky is pitch black and lightning crackles in the distance. This is a site of heavy corruption.",
			w35: "You start to wonder how long you've been doing the same thing over and over. There must be something you can do to start to break the cycle. Perhaps you could alter the portal...",
			w40: "You can't help but notice that the Trimps seem to be the only creatures on this planet not immediately hostile towards outsiders. You ask a nearby Trimp soldier what he thinks you are, and he drools a bit.",
			w42: "The world seems so barren out this far. You feel like you're finally starting to get ahead of the curve, but you know by now not to get comfortable.",
			w44: "Each day and night seems to grow longer than the one before. Is time slowing down? Argh! You fall to your knees with a splitting headache and a strong desire to use the portal. After a few minutes, it passes and you forget what happened. What are we talking about?",
			w46: "All traces of hills and mountains have long since been trudged past. The world is flat and hostile. You wish your Trimps were better conversationalists.",
			w48: "As your Trimps scavenge every last bit of helium from that Blimp, one of them begins freaking out. He runs around waving his little arms and making funny noises for a while, eats some dirt, then takes a little nap. You wonder if that's normal. Yeah... probably fine.",
			w50: "It's been a long time since you've found any blueprints in the maps. You start to wonder where those things even come from.",
			w51: "Your scientists have detected an anomaly at the end of Zone 59. They recommend that you stop doing whatever it is that you're doing.",
			w53: "As you get closer to the anomaly, you start to notice more and more strange behaviour from your Trimps. Holes in your memory are starting to become noticeable as multiple existences blend into one. Trippy.",
			w54: "As you get closer to the anomaly, you start to notice more and more strange behaviour from your Trimps. Holes in your memory are starting to become noticeable as multiple existences blend into one. Trippy.",
			w56: "A loud boom echoes in the distance, and one of your Trimps runs up to you with outstretched arms, looking quite frightened. He probably just wants some armor and weapons! You hand him some gear, and he accepts it with excitement.",
			w58: "A huge storm has formed and daylight has become a luxury you have mostly forgotten about. Your Trimps seem to want to go back home, but you're pretty sure you're supposed to keep going this way, so you do. You're very close to the anomaly.",
			w59: "There it is. The anomaly is at the end of the Zone. You can see it but you don't know what you're seeing. Where did that... thing... come from?! This is highly Improbable.",
			w60: "The ground instantly cracks and large plumes of green gas escape from the planet's core to the atmosphere. The planet feels different. Everything feels different. This Universe has grown unstable, the planet has broken. What have you done?",
			w61: "Other than all the dead Trimps, that wasn't so bad.",
			get w65 () {
				if (game.global.challengeActive == "Trimp" && game.jobs.Amalgamator.owned > 0) return toZalgo("The Universe seems even more upset than you expected here, but your Amalgamator" + ((game.jobs.Amalgamator.owned == 1) ? " doesn't" : "s don't") + " really seem to care. You walk towards " + ((game.jobs.Amalgamator.owned == 1) ? "it" : "one") + " to get a better look, but find yourself further away than you were.", 2, 2);
				return "You feel more powerful than ever. The universe seems to be constantly adjusting itself to get rid of you, yet you rise against and persist. Something as tiny as you taking on an entire universe!";
			},
			w68: "You figure some entertainment wouldn't be awful, and decide to teach your Trimps how to play soccer. A few hours and zero progress later, you really regret that decision.",
			w70: "The Improbabilities haven't seemed to slow down. You know you need to figure out a plan, but you don't know what to plan for.",
			w72: "You slash through another Improbability with relative ease, but something isn't right. A sour smell hits your nose and in disgust, you whip around in search of the source. Oh, wait, it's just the Trimps.",
			w80: "When's the last time you made a map? You have a feeling you should probably do that.",
			w82: "Whew, that was an exhilarating kill. You decide to reward your Trimps with some Improbability stew. It's pretty tasty.",
			w83: "That stew was probably a bad idea. Anyone else feeling sick?",
			w85: "An ancient and fuzzy memory just crept back into your head. You're not quite sure where it came from, but you know the memory is yours. You remember being on a ship, and seeing this planet from orbit. There was someone with you!",
			w87: "Bits and pieces of memories continue trickling back in as you continue to put distance between yourself and the source of Anger. You can almost see in your mind who you came here with. Where could they be...",
			w90: "You decide to ask your scientists to come up with an extravagant machine that can scan your brain for old memories to see if there's anything helpful up there. They seem excited about a new project and quickly get to work.",
			w92: "You hear a huge explosion from the science lab and realize that the brain scan machine will probably never be finished.",
			get w95 () {
				if (game.global.challengeActive == "Trimp" && game.jobs.Amalgamator.owned > 0) return toZalgo(((game.jobs.Amalgamator.owned == 1) ? "The Amalgamator is" : "The Amalgamators are") + " starting to rapidly switch between different colors. It would be slightly entertaining if the fabric of existence wasn't falling apart around " + ((game.jobs.Amalgamator.owned == 1) ? "it." : "them."), 3, 2);
				return "Need some motivation? You can do it! Maybe.";
			},
			w100: "You stop dead in your tracks. You remember who you came here with, and you remember that you are not happy with Captain Druopitee for bringing you here. You know he landed with you. You know the ship is still here. He's here.",
			w105: "You call a meeting with all of your Trimps to explain the situation. After giving an extremely long, epic, and motivational speech but hearing no reaction from the crowd, you remember that your Trimps cannot understand you. Will you ever learn?",
			w106: "How long have you been trapped on this planet? Months? Decades? Travelling through time sure screws up your chronological perception.",
			w109: "Though you have no idea which direction your home planet is, you still believe the ship's GPS could get you home. Maybe Druopitee has the keys. You really want to find him.",
			w115: "You just remembered what a taco was. You could really use a taco right now.",
			w120: "Your stamina is quickly dwindling. Trying to keep up with so many more extra Trimps each Zone is beginning to wear you down. You'll need to practice fighting with stronger, smaller groups to succeed.",
			w123: "Woah, you have a lot of Trimps right now. You hadn't really stopped to think about just how many individual Trimps you have directly under your control in a while. Neat!",
			w125: "You smell metal and gears, and suddenly feel like you should run a map.",
			w130: "You decide to sit down and take a breather, when suddenly a Trimp comes waddle-galloping towards you holding a piece of paper. Hurriedly scrawled on the paper is a drawing of a strange weapon and piece of armor, along with numbers that seem to be dimensional coordinates. You would ask where he found it, but you know better by now.",
			w132: "You can't stop thinking about where that Trimp found the coordinates for the Slow dimension. Why can't whatever is helping you just come out and help you?",
			w135: "Ugh, your back is getting sore. It seems like travelling back in time does not reverse the ageing process for the traveller. Bummer.",
			w136: "One of your scientists has informed you that his team was able to successfully create a cure for a non-existent disease. He explains that it's best to be prepared. You sigh heavily.",
			w137: "One of your scientists has informed you that an outbreak of a new disease was detected in the laboratory. You go to check on your scientists, and it's quite obvious that they're faking it for attention. You sigh heavily.",
			w138: "You spot another scientist running full speed towards you. He hurriedly informs you that they discovered a new dimension near Zone 35 that is occupied by gigantic Trimps. You sigh heavily.",
			w139: "Another scientist is coming. You sigh heavily. He says something dumb. You decide to ignore the scientists for a little bit.",
			w140: "It sure is calm and peaceful now. You watch a Falcimp turn a few circles in the sky. You wouldn't mind having wings, but overall you're pretty happy with your species.",
			w143: "There's a scientist jumping around trying to get your attention. There's nothing interesting in the sky so you pretend to be fascinated with a rock. The scientist can see you're busy and waits patiently.",
			w145: "Your Scientists are not making it easy to ignore them. You not-so-calmly ask what they want. One of them explains that they discovered a new dimension with lots of extra helium. You'll probably check it out, but you won't tell them that.",
			w150: "Wow. These structures are getting expensive. There's probably a dimension for that...",
			w153: "You remember a person from your past. From your old life. There's someone you need to get back to. You'll make it back.",
			w156: "You watch in amazement as a Trimp grabs on to one of those weird tree things and swings around by its arms. These things are getting pretty strong.",
			w157: "You watch in less amazement as a Trimp tries to take a bite out of a very large rock. These things are not getting much smarter.",
			w159: "That's quite a sunset. You know once you finally make it out of here, you'll definitely never forget the sights. Unless, of course, you do.",
			w160: "A small horde of Trimps comes running up towards you, making excited sounding noises. One of them walks to the front of the loud congregation and proudly holds up a boot, slightly larger but the same style as your own. It must be Druopitee's, confirmation that you're heading the right direction. You reward the Trimp who found it with some food and a few pats on the head, then send the boot to the lab to look for any further clues. You wonder why he took his boot off.",
			w163: "Your scientists have informed you that half of the boot is now lost in another dimension, thanks to an 'important' test. The results were inconclusive. You ask them to please leave the remaining half in our current dimension, and they look disappointed.",
			w165: "What's this now?! You found a little green piece of metal. Your scientists tell you that it came from a toxic dimension, but that it is also from a dimension rich in helium. They let you know that they can tune your portal to travel to the dimension it originated from, should you want to check it out.",
			w166: "That last Improbability seemed like a nice guy.",
			w168: "Hopefully spaceships don't rust.",
			w170: "You reach the top of an incredibly large mountain. You can see at least 50 Zones sprawled out before you. About 30 Zones away, you can see a gigantic spire. It looks like architecture from your home world. You hope it's not a mirage...",
			w172: "Something smells purple. That's probably not good.",
			w174: "Strange smells continue to swell around you. Judging by changes in wind direction, the smells are coming from the spire. You still can't describe it other than purple.",
			w175: "Your Trimps seem happy. They're not used to having a purpose, and having one seems to positively affect them! You call a Trimp over and ask him how he's doing, then you remember that he can't talk.",
			w178: "You're still not quite sure what that smell is. You feel slightly more powerful, and you fear that your enemies may feel the same way.",
			get w180 () {
			if (game.global.challengeActive != "Corrupted") return "After clearing out the previous Zone, you decide to take a day hike to the top of another gigantic mountain to try to find more info about the smell. As you reach the top, your jaw drops. Clear as day, a healthy amount of purple goo is pouring into the atmosphere from the top of the spire. You can see the Zones in front of you beginning to change. This really can't be good.";
			return "After clearing out the previous Zone, you decide to take a day hike to the top of another gigantic mountain to try to find more info about the smell. As you reach the top, your jaw drops. Clear as day, a healthy amount of purple goo is pouring into the atmosphere from the top of the spire. This must be what's causing all of this Corruption you've been trudging through. The planet seems pretty heavily Corrupted already, you wonder if you're too late.";
			},
			w182: "Well, there's not really much doubt about it anymore. Some sort of intelligence is intentionally making life more difficult for you and your Trimps. You take this as a sign that you're pretty important, why else would something risk destroying an entire planet to stop you? Your parents would be so proud.",
			get w184 () {
					return "The corruption seems to be more pronounced the closer you get to the Spire. Looks like there's " + mutations.Corruption.cellCount() + " of em now."
				},
			w185: "You have trouble putting into words exactly what the Corruption does to the creatures on this planet. They seem to be stripped of all natural abilities and given powers that you didn't know could exist in the primary dimension.",
			w187: "None of these corrupted enemies seem to have eyes, so you decide to see if you can get away with flipping one off. As it reacts by roaring and stomping around in a rage, you realize that these things are powerful enough not to need eyes to observe the world. What <i>are</i> these?!",
			w190: "You awaken from your sleep in a cold sweat to a frantic and terrified noise from the back of the cave where you were sleeping. With urgency, you run to the source of the noise to make sure your Trimps are okay. As you reach the back, you see a handful of Trimps trying to use a small and very angry Snimp as a musical instrument. You put some sand in your ears and go back to sleep.",
			w193: "The corruption continues to thicken as you near the Spire. You're beginning to grow accustomed to the smell of the Spire, and really don't mind it anymore. It reminds you of blueberries. Evil blueberries.",
			w198: "You're so close to the source of corruption that you can taste it, and it doesn't taste good.",
			get w205 () {
				if (game.global.spireRows < 10)
					return "You look back at The Spire and feel kinda bad that there's still a ton of Corruption coming out of it, but you'll get him some time.";
				return "You don't miss Druopitee too much. You don't remember all that much to miss, but the point stands.";
			},
			get w210 () {
				if (game.global.spireRows < 10)
					return "It smells extra corrupt. That Spire can't be healthy for the environment.";
				return "There's still Corruption, but it feels less threatening. You feel more at peace with the planet and feel like you're on track to repairing it. Surely nothing else terrible will happen any time soon.";
			},
			get w220 () {
				if (game.global.spireRows < 10)
					return "Your Trimps seem content. They kinda wish that spire wasn't still pumping purple stuff into their world, but they don't mind too much.";
				return "Your Trimps seem content. You taught some basic puppetry to them and they've been putting on some great shows with defeated Snimps.";
			},
			w225: "You wake up in a sweat after a good night's sleep in a cool, dark cave. You dreamt that you were overheating, though that's never really been a problem before. Oh well, strange dreams and memories haven't really indicated anything important before, it's probably nothing.",
			w231: "It's pretty hot.",
			w232: "The heat intensifies as you move further and further through the Zones. Instinct says to turn away from the heat, but that wouldn't be any fun.",
			w234: ["As you finish clearing out the Zone, you notice a green cloud fall from the sky. It hovers above you for a few moments and shoots some sort of energy at you in a quick, painless burst. Seeming satisfied by the results of this blast, it hurriedly shoots forward a couple of Zones. Before you can even really think about what it could be, ten more green clouds of various sizes appear! They zip down, zap you, then zealously zoom off to the same zone. The clouds look toxic to you, but your Trimps seem to want to follow them.", "natureMessage poison"],
			w236: ["As you climb over a rather large mountain and into the next Zone, you see that the green clouds have finally made it to the ground. Your worries about their toxicity seem to have been needless though, as your Trimps appear to greatly enjoy this rare treat. You watch in amazement as your Trimps begin to grow spines that drip with toxic sludge, and they immediately use their new powers to try to stick each other. You bet they're a bit stronger now.", "natureMessage poison"],
			w240: ["You and your Trimps have been really enjoying the benefits of what your Scientists call an \"Empowerment of Nature\". However, something up ahead seems to be absorbing all of the Poisonous clouds. Oh no! Your scientists think this will be your last zone with the Poison Empowerment, but they seem convinced that there will be another Empowerment to take its place!", "natureMessage poison"],
			w241: ["As you reach the new Zone, you happen to see a Bad Guy finish absorbing the last bit of Poison in the entire Zone, leaving no trace of your new ally, Nature. Before you get too upset about the thought of having to tackle the Magma alone again, Wind floods in to take Poison's place. The spikes on your Trimps stop dripping sludge and begin to spin like propellers, the sound resembling a gigantic swarm of beeimps. These controllable Trimp-generated gusts of wind should be helpful for knocking extra resources into your reach, but you'll still need to deal with that Bad Guy that sucked in all of the Poison...", "natureMessage wind"],
			w243: ["The middle of these Windy Zones are the most beautiful you've seen yet. The Magma and Wind bring all sorts of nutrients and seeds here, leaving the area rich in plant biodiversity. For the first time since you arrived on this planet, you feel truly peaceful. Nature is repairing itself, and you've become one of its tools (but like in a good way).", "natureMessage wind"],
			get w244 () {
				if (game.jobs.Magmamancer.owned > 0)
					return "Your Magmamancers have figured out how to make little fountains in the Magma around the base. You like the effect.";
				return "You remember Magmamancers as being pretty cool.";
			},
			w245: ["Something in the next zone appears to be sucking up all of the Wind again. You've enjoyed all of the extra resources, but you're excited to see what Nature has next for you!", "natureMessage wind"],
			w246: ["Once again, a Bad Guy in this Zone has absorbed every trace of your Windy friends. But once again, Nature has replaced them with new, colder ones. Suddenly your Trimps\' new spikes stop spinning and start spewing snow! You feel incredibly cold, but your Trimps seem perfectly comfortable. This cold will surely slow down your enemies!", "natureMessage ice"],
			w248: ["While the Windy Zones were beautiful, the Ice Zones are nearly indescribable. Deep blues from the frozen ground contrast sharply with the fiery reds of the Magma rivers, and these two systems have equalized at a very comfortable ambient temperature. Your Trimps are too cold to touch though, your hand is still stuck to the one you high-fived at the start of the last zone.", "natureMessage ice"],
			w251: ["Right on cue, another enemy has absorbed the Empowerment of Ice, and Nature has reacted by refilling the Zone with familiar green clouds. Poison is back! Your Trimps\' spikes resume spewing toxic sludge, and finally the Trimp stuck to your hand warms up enough to fall off. No more high-fiving Trimps in the Ice Zones.", "natureMessage poison"],
			w255: "The Magma continues to sap your Trimps\' strength as you press through the Zones, but they seem to be adapting well in spirits. It seems like each generation likes the heat more and more.",
			w256: ["You're detecting a pattern here! Poison has once again given way to Wind, and you have a feeling that this Wind will soon give way to Ice. The Bad Guys can absorb as much Nature as they want! Their Tokens will only help you to strengthen Nature, and Nature will always be back. With your new ally, you can totally handle the Magma.", "natureMessage wind"],
			w261: "You asked that Omnipotrimp nicely not to explode after you killed it, but it exploded anyways. Pretty rude.",
			w264: ["Good job not high-fiving any Trimps so far this time. You are worried morale might fall if you spend too much time with such a difficult restriction, but you're pretty sure Poison is coming up soon.", "natureMessage ice"],
			w267: ["You're determined to repair the planet, and now that Nature is on your side you feel it might actually be possible. Either way, you know you must be doing something right to have earned the loyalty of Trimps and Nature.", "natureMessage poison"],
			w270: "This planet is really freaking big. You feel like you've been walking around it for years and still haven't seen everything there is to offer. Shouldn't there be another spire around here or something?",
			w277: "It's starting to smell purple again. You must be getting close to another spire.",
			get w283() {
				var soldiers = game.resources.trimps.getCurrentSend();
				return "During a boring night while waiting to cross a particularly rough Magma river, you managed to teach your Trimps how to stack on each other to create some funny shapes. You almost feel bad for the first Snimp to come across " + prettify(soldiers) + " Trimps stuck together in the shape of a humongous Mongooseimp.";
			},
			get w285(){
				if (game.global.spireRows >= 10)
					return "You can finally see it, clear as day. No more than 15 Zones in the distance stands a giant spire, even more menacing than the first. A loud, echoing voice booms from the tower, matching the tone and cadence of Druopitee himself. It's a little far away to hear perfectly, but it sounds like he's asking you nicely to please leave him be.";
				return "Something feels wrong, but you can't quite figure out what. You eventually find a pebble in your shoe and everything seems much better!";
			},
			get w286() {
				if (game.global.spireRows >= 10)
					return "You hear the voice again, and can tell there's definitely something weird about it - as if it was coming from a ghost or something. Though you suppose that makes sense, since you've already killed Druopitee.";
				return "You hear something rustling in a bush and get totally psyched up for something new and exciting. As you walk cautiously towards the bush, a Rabbimp quickly runs out and away."
			},
			get w290() {
				if (game.global.spireRows >= 10)
					return "As you get closer and closer to the spire, the voice gets clearer and clearer. You can pick up notes of terror from whatever being is up there, as if he wants to just be left alone to destroy the world. You don't feel much sympathy though.";
				return "You trip over a rock and stumble a bit, but fix your footing before totally falling over. You glance around and it doesn't seem like any of the Trimps noticed!";
			},
			get w295() {
				if (game.global.spireRows >= 10)
					return "You're now so close to this new spire that you can taste it, literally. These things are gross.";
				return "You wonder if you could get your scientists to invent chewing gum..."
			},
			get w298() {
				if (game.global.spireRows >= 10)
					return "The deranged spirit in the tower is now begging that you stay back. It obviously knows you destroyed the last tower and doesn't want you taking out another. Too bad, buddy. You're coming.";
				return "A voice in the back of your mind tells you there should be something big soon, but you see nothing. Oh well."
			},
			get w303() {
				if (game.global.spireRows >= 15 || Fluffy.getCapableLevel() > 0) return "You're glad you have Fluffy around now. He seems to be getting along well with the other Trimps, and seems happy to have found others like him. He doesn't seem to be any smarter than a normal Trimp so you're sure you'll get some entertainment out of him.";
				return "You wish you had a pet.";
			},
			get w315(){
				if (game.global.lastSpireCleared == 2) return "These healthy spots of land seem to be increasing as the Spire pumps more and more into the air! Hopefully that's a good thing. You ask Fluffy what he thinks and he nods in approval.";
				return "Geeze, this Corruption is starting to look pretty nasty. Those Spires need to fall soon...";
			},
			w340: "Watch your step, there's some Magma on the ground over there.",
			w350: "If Druopitee has really immortalized himself in an infinite amount of Spires, you might be here for a while.",
			get w360(){
				if (game.global.spireRows >= 15 || Fluffy.getCapableLevel() > 0) return "You attempt to put Fluffy through your rigorous Scientist training program, but he doesn't want to. He wouldn't have any trouble, but he doesn't want the label. You still couldn't be happier to have the little guy around!";
				return "You really feel like something is missing from your life. Everything feels hollow and sad.";
			},
			w375: "Should be coming up on another Spire Zone soon. You stop and sit beside a beautiful Magma river and wonder what kinds of crazy stuff could be waiting for you up there. Then you realize it's probably just another Spire, so you get up and keep moving.",
			w385: "Some familiar Spirish odors begin hitting your nostrils again and you sneeze, hilariously startling a few billion Trimps. Never gets old.",
			get w390(){
				if (game.global.lastSpireCleared == 2) return "You can finally see the next Spire in the distance, a thick purple cloud boiling out of the top. Hard to believe there's an infinite amount of these things, how big even is this planet?";
				return "Weird, you feel like you should be able to see the next Spire by now, but it's not there. Maybe you should have checked the other Spires a bit more thoroughly.";
			},
			get w395(){
				if (game.global.lastSpireCleared == 2) return "Ahh, that gross old taste of Spire. You'll never get used to that. Most of your Trimps are trying to stay under trees, but Fluffy is running around with his tongue out as if he was trying to catch snowflakes.";
				return "Did you leave the oven on? Oh yeah, you don't have an oven. Now you wonder what an oven even is. Oh well.";
			},
			get w405(){
				if (game.global.lastSpireCleared == 3) return "It really seemed like you weakened Druopitee back there. Maybe you'll be able to at least shut off any last conscious parts of him with just one more Spire?";
				return "You can't shake the feeling like you forgot to do something.";
			},
			get w415(){
				if (game.global.lastSpireCleared == 3) return "The Healthy mutation is starting to spread nicely now. The Bad Guys hurt quite a bit more, but you're pretty sure you're doing the right thing which kinda makes you feel good.";
				if (game.global.lastSpireCleared == 2) return "It seems like the Healthy mutation has stopped spreading. That's alright though, some other version of you will probably take care of it.";
				if (game.global.spireRows >= 15 || Fluffy.getCapableLevel() > 0) return "The land sure looks terrible and corrupted, but at least you have Fluffy.";
				return "What do you have against Fluffy?";
			},
			w430: "The Trimps tried tying two Turkimps to this tall tree, then the Turkimps thrashed those three trillion Trimps, throwing the Trimps tumbling towards the tall tree. The Trimps truly tried. Those Turkimps though... they tough.",
			w440: "Wow, you've gotten pretty far. You would have never guessed there'd be this many Zones out there, but here you are.",
			w450: "It's just about time for another Spire, don't you think?",
			w460: "This part of the world seems to be at a much higher elevation than any other part that you've been at. The air is strangely clear, and you can see more of the planet sprawled out around you than ever before. It feels good to see everything you're fighting for and feel like it's worth it.",
			w470: "This part of the world seems to be at a really low elevation, and lots of Corruption is building up in it. Gross.",
			get w485(){
				if (game.global.lastSpireCleared == 3) return "Once again, you can taste the Spire, it must just be over that next hill now. Fluffy seems excited.";
				return "Hey! Is that... oh, nope, just some dirt.";
			},
			get w495(){
				if (game.global.lastSpireCleared == 3) return "It's time. He's weak. You've got this. Time to make this planet Healthy again.";
				return "You're feeling rather itchy today. You ask some Trimps to scratch your back but they don't really want to.";
			},
			get w505(){
				if (game.global.lastSpireCleared == 4) return "Well you've totally 100% eradicated Druopitee's consciousness, now you figure it's just time to clear the rest of his brainless Echoes out of the remaining Spires.";
				return "Druopitee is just over there getting stronger, someone should really do something about him.";
			},
			w702: "The planet looks pretty charred. Fluffy looks proud of something but you're not sure what.",
			w707: "You feel like there is supposed to be something here that isn't. You wonder if you had something to do with that." 
		};
		var universe2 = {
			w2: "\"A journey of 1000 Zones begins with a single Zone.\" - Probably someone",
			w3: "While this Universe seems very similar to the one you were just in, it feels quite a bit different. You can't quite figure out what exactly is different, but it totally is.",
			w4: "You feel like you've climbed through these Zones thousands of times, but you can only clearly remember one time that felt like ages ago in a different Universe. You feel weird.",
			w5: "But have you been to this Universe before? You're really not quite sure. Every day that passes here makes your memories feel like another lifetime ago.",
			w6: "You decide to tell the story of your travels to your Trimps, so that someone will remember if your memory continues to get worse. You tell them about the massive armies, the Spires, Druopitee, Nature, and everything else you can think of. The Trimps seem excited by the tale, but they can't talk.",
			w7: "Scruffy runs up to inform you that you could run a regular map to find directions to something called \"Big Wall\". You remember a wall from before, but you don't remember finding it so soon. What else is going to be different?",
			w8: "At your request, your Scientists are running tests to try and identify further differences between your original Universe and this one. Unfortunately, they don't know anything about your old Universe and probably won't be able to spot any differences.",
			w9: "One thing you remember for sure about the last Universe is that you found a Portal device at the twentieth zone. However here, your Scientists have detected a massive portalesque energy reading on only the fifteenth Zone. Interesting.",
			w10: "You decide to try and stock up on some Helium in preparation for the supposed Portal device that you're quickly approaching. You ask a Scientist where you could find some and he scurries under a table. A more stoic Scientist informs you that Helium is incredibly volatile in this universe and that almost none can be found. That might throw a wrench in your plans...",
			w11: "Apparently a few elements have different properties here than back in the last Universe. Either that or the Trimps currently bathing in mercury are going to have a rough future.",
			w12: "You start to feel angry as you get closer to the fifteenth Zone. You're not sure if it's due to the energy your scientists detected, or the Trimps that keep throwing berries at your head. But one of them is definitely making you angry.",
			w13: "Scruffy informs you that there is one particular element regarded as king here, Radon. While highly volatile in your home Universe, it's a stable gas here with tremendous potential for power generation.",
			w14: "You ask Scruffy for more information on Radon, and he sits you down to tell you a story. He informs you that you're not the first human to come to their planet, that someone had been here 500 years ago who caused great harm to the planet. He set up giant Spires all around the World that harvested Radon from the atmosphere and beamed the power to a different Universe. You have a feeling that you know which Universe received this power, and you're starting to have a good idea of why Fluffy picked this particular Universe to send you to.",
			w15: "There is a device of great evil here. See if you can take it for yourself!",
			w20: "Holy cowimp, there's an Improbability at the end of this Zone! But the planet doesn't look broken, this is... improbable...",
			w22: "Your Scientists have confirmed that the Spires are indeed still active on this planet, but are incredibly far away in lands your Trimps are nowhere near powerful enough to survive in.",
			w24: "Knowing that Druopitee is in your Universe, you ask Scruffy who is manning the Spires. He hangs his head in shame and lets you know that there are 5 Trimps, previously friends of Scruffy's, that were enticed by Druopitee's magic. He doesn't seem to want to talk much more about it.",
			w26: "Your Trimps catch a bird and build a little home for it, but it flies away.",
			w28: "Your memories of the last Universe are fading and you have no idea how many times you've been here in this Universe. This could be your first or thousandth time here. Neat!",
			w30: "You're not sure how much more beautiful this Universe is than the last one, but it's hard not to stop and take in all the scenery every once in a while. Sprawling hills and flowing rivers in every direction make it almost worth the frankly ridiculous amount of enemies hiding everywhere.",
			w31: "You deserve hazard pay or something.",
			w32: "One of your regular Trimps seems to have picked up the ability to speak a few words from Scruffy. They're too dirty to repeat though.",
			w34: "As you reach the top of another in this seemingly infinite sea of hills, you notice a tiny tablet. It's written in some language you've never seen, so you figure you'll hold on to it and see if Scruffy can translate.",
			w35: "Scruffy seems to be avoiding you ever since you found the tablet. You're not like... 100% positive but you're pretty sure.",
			w36: "You finally catch Scruffy while he's eating and ask him about the tablet. He tells you it's not a big deal, but that him and his six friends were all given some \"enhancements\" by Druopitee 500 years ago. Together they helped carry out Druopitee's bidding, setting up seven different Spires, harvesting Radon, and beaming the Power away. Scruffy lets you know that Fluffy and himself eventually realized how much damage Druopitee was causing to their planet and rebelled against Druopitee and the other Five. This tablet was an order from Druopitee to apprehend them.",
			w37: "You just realized... you thought you named Fluffy Fluffy. That sneaky telepathic Trimp!",
			w38: "You haven't seen Scruffy around the town much since your last conversation. Telling stories about his old friends seems to be painful for him, though you'd expect him to have moved through the grief stages after 500 years.",
			w39: "You ask Scruffy why he's so conversational and Fluffy is not. Scruffy shows you a whole trove of books that Druopitee had left behind, that Scruffy had been reading for the past 500 years. You figure Fluffy spent most of that 500 years stuck in a time loop.",
			w40: "A Trimp eats a rock.",
			w42: "You wonder how Fluffy ended up in your Universe if he started out here. You'll ask Scruffy about it when he quits being all sulky.",
			w45: "Today, you held the first annual Trimp Toss. It was a pretty nice day.",
			w50: "This zone is really freaking hot.",
			w52: "You catch Scruffy helping a group of small Trimps across a river. What a cool dude.",
			w57: "A few of your Trimps are getting whiny so you take them for a walk. Seemed to do the trick, they just needed to burn some energy and pee.",
			w60: "Scruffy is finally in a good mood and seems quite a bit stronger than before, so you figure now is a good time to ask him about Fluffy. In exchange for his good mood, he agrees to tell you the rest of the story. According to him, Fluffy was stationed at the seventh Spire while Scruffy was at the sixth. Fluffy and Scruffy each destroyed their own Spires, but Fluffy was caught by Druopitee and took the fall for both of them. Druopitee left the six remaining enhanced Trimps to take care of the remaining five Spires, and took Fluffy with him. You ask what the names of the other five Trimps are and he tells you: Huffy, Stuffy, Buffy, Tuffy, and Puffy.",
			w61: "Scruffy finally seems more inspired than sad. Looks like he wants to go take down some bad guys.",
			w62: "It seems like you've gotta find Scruffy's 5 missing brothers. Scruffy reminds you that they were evil the last time he saw them and to be prepared, but that some may have changed sides since.",
			w65: "You wonder if Trimps came from this Universe, your original one, or somewhere else. Scruffy shrugs.",
			w67: "The weather is finally starting to cool back down, you and your Trimps are quite relieved.",
			get w69(){
				if (game.global.challengeActive == "Quagmire") return "Giggity";
				return "The Trimps are still enjoying the nice weather, and have even found a couple of sweet lakes to swim in!"
			},
			w70: "Your tenacity is inspiring.",
			w71: "You reach the top of a hill and can see the next 5 Zones stretched out in a valley ahead of you. Towards the end, you see the largest spire you've ever seen. In fact, you can't even see the top of it! It seems to stretch upward infinitely. You look to Scruffy who tells you that one belongs to Huffy. You really hope Huffy isn't evil...",
			w72: "You really don't like Druopitee. You've spent an unknown amount of lifetimes cleaning up his mess, and who knows how many different Universes he's corrupted.",
			w73: "Scruffy tells you that if any of his brothers have come around to the good side since he saw them last, Huffy was the one to do it. Huffy was also the most experienced in hand to hand combat, so you really hope you're not going to have to fight against him.",
			w74: "You're very close to the Spire. You feel like you should be able to smell the Corruption pumping out of it by now but you can't! You take that as a good sign.",
			w75: "As you approach the infinitely tall Spire, a Trimp rushes out and embraces Scruffy. Scruffy introduces you to Huffy, who seems to have also realized that Druopitee is kind of a prick. Huffy lets you know that he managed to destroy the Corruption device at the top, but that it was now crawling with horrible shadowy enemies. Huffy lets you know that he is shielded from the Portal inside the Spire, but that even when you Portal and forget him, he can use your subconscious to help direct him in cleansing the Spire and finding artifacts to make your Trimps stronger.",
			w77: "Huffy is cool and all but you miss Fluffy, you should go visit him soon.",
			w82: "You thought you saw Druopitee but it was just a tree. On closer inspection it doesn't even look anything like him at all.",
			w85: "This zone feels needy, like it wants your help with something.",
			w90: "As you clear another Zone, Scruffy sits you down for another story. Excited to hear more about Fluffy and Scruffy's history together, you listen intently. Scruffy just rambles about gems and how we could be rich selling jewelry then starts dancing. Seems like Scruffy's been fermenting berries again.",
			w93: "Scruffy created some sort of instrument out of a Snimp and some wood that he calls the Riflunger. It makes better music than you expected, but you wouldn't buy any albums.",
			w95: "Scruffy lets you know that Fluffy was the first modified Trimp created by Druopitee, and was always Druopitee's favorite. Druopitee was probably extra pissed when Fluffy was the one who rebelled and destroyed a couple Spires, that's probably why he was caged when you found him.",
			w100: "There is an extremely chaotic energy flowing around this Zone.",
			w101: "3 or 4 zones ahead of you, you see the biggest storm you've ever seen in your lives. You'd love to find some way to go around it, but it doesn't seem possible.",
			w105: "The storm is raging! Your Trimps are flying eachother as kites.",
			w107: "You hope Huffy is doing alright back there at the Spire, those Enemies looked pretty scary.",
			w110: "You feel a sudden urge to repeat something multiple times expecting different results and wonder what that's all about.",
			w112: "Scruffy tells you how glad he is that Huffy had come around, but that he's not as hopeful about Stuffy. Stuffy was stubborn and took any opportunity to prove his loyalty to Druopitee. Guess you'll have to find him and see.",
			w115: "You're having even more trouble than usual trying to control your Trimps here. You and Scruffy debate the pros and cons of asking your Scientists to come up with a mild tranquilizer to put in their food, but you're too busy herding them to come to any conclusion.",
			get w118(){
				if (game.global.challengeActive == "Nurture") return "Cruffys tells you about the time he put a bucket of water above one of Druopitee's doors as a prank and got banished from the dimension for it."
				return "Scruffy lets you know that they had another brother named Cruffys who was banished from this dimension before he even had a chance to be assigned a Spire."
			},
			w120: "This Zone is filled with bugs and is NOT a great spot to have a picnic.",
			get w124(){return "The next Zone is connected to this one by a large downward sloping hill. All " + prettify(game.resources.trimps.getCurrentSend()) + " of your Trimps all tuck themselves into a ball and roll down it, what a sight!"},
			get w130(){
				if (game.global.challengeActive == "Nurture") return "Scruffy plays his Riflunger while Cruffys sings, and you really wish you had some earplugs or something.";
				return "You wonder if you'll ever get the chance to meet Cruffys. Maybe your Portal can bring you to his dimension some day.";
			},
			w133: "Some new Trimp reinforcements have brought a Z1 Turtlimp up with them in a box. The Trimps take turns feeding it and they're doing a good job taking care of it!",
			w134: "One of the Trimps on feeding duty was a bit confused and seems to have eaten the Turtlimp.",
			get w140(){
				if (autoBattle.sessionEnemiesKilled > autoBattle.sessionTrimpsKilled) return "Huffy pops a quick message into your head to let you know he's doing fine in the Spire!";
				return "Huffy pops a message into your head stating that as much as he likes constantly losing, he would appreciate a little help!"
			},
			w150: "As you near a gigantic lake, you notice that this part of the World is becoming filled with wild varieties of plants you've never seen before. You've already taught your Trimps not to eat strange plants, but it looks like it's time for a reminder.",
			w155: "The plant biodiversity around this Zone is incredible, it feels like this Zone is its own isolated ecosystem. The ground around here must be extremely arable.",
			w160: "The lands ahead are barren and undeveloped, but you press on because Huffy really wants some new items."

		}
		var thisUniverse = (game.global.universe == 2) ? universe2 : universe1;
		if (typeof thisUniverse['w' + zoneNumber] !== 'undefined') return thisUniverse['w' + zoneNumber];
		return false;
	}

	function countTotalPossibleAchievePercent(){
		var total = 0;
		for (var item in game.achievements){
			var achieve = game.achievements[item];
			for (var x = 0; x < achieve.tiers.length; x++){
				total += game.tierValues[achieve.tiers[x]];
			}
		}
		return total;
	}

	function setGoldenBonusAchievementText(){
		var elem = document.getElementById('achievementGoldenBonusContainer');
		var tier = getAchievementStrengthLevel();
		var tiers = [15, 100, 300, 600, 1000, 2000];
		var freq = getGoldenFrequency(tier);
		var bonus = game.global.achievementBonus;
		if (tier <= 0) {
			elem.innerHTML = "";
			return false;
		}
		var html = "You will find one Golden Upgrade every " + freq + " Zones.";
		if (tier < tiers.length) html += " Frequency increases at " + tiers[tier] + "% bonus damage.";
		else {
			var count = countExtraAchievementGoldens();
			if (bonus <= 10000)
				html += " Start with 1 extra Golden Upgrade after each Portal for every 500% earned between 2000% and " + prettify(10000);
			else if (bonus <= 50000)
				html += " Start with 1 extra Golden Upgrade after each Portal for every 2000% earned between " + prettify(10000) + " and " + prettify(50000);
			else html += " Start with 1 extra Golden Upgrade after each Portal for every " + prettify(10000) + "% earned above " + prettify(50000);
			html += "%. Currently gaining " + count + " extra Golden Upgrade" + ((count == 1) ? "" : "s") + ".";
		}
		elem.innerHTML = html;
	}

	function getAchievementStrengthLevel(){
		var percent = game.global.achievementBonus;
		if (percent < 15) return 0;
		else if (percent < 100) return 1;
		else if (percent < 300) return 2;
		else if (percent < 600) return 3;
		else if (percent < 1000) return 4;
		else if (percent < 2000) return 5;
		else if (percent < 10000) return 6;
		return 7;
	}

	function countExtraAchievementGoldens(){
		var totalAchieves = game.global.achievementBonus;
		var bonus = 0;
		if (totalAchieves > 50000){
			bonus += Math.floor((totalAchieves - 50000) / 10000);
			totalAchieves = 50000;
		}
		if (totalAchieves > 10000){
			bonus += Math.floor((totalAchieves - 10000) / 2000);
			totalAchieves = 10000;
		}
		bonus += Math.floor((totalAchieves - 2000) / 500);
		return (bonus > 0) ? bonus : 0;
	}

	var trimpAchievementHelpOn = false;
	function toggleAchievementHelp(){
		document.getElementById("achievementHelp").style.color = (trimpAchievementHelpOn) ? "#202080" : "#6060C0";
		document.getElementById("achievementHeader").style.display = (trimpAchievementHelpOn) ? "block" : "none";
		document.getElementById("achievementHelpContainer").style.display = (trimpAchievementHelpOn) ? "none" : "block";
		trimpAchievementHelpOn = !trimpAchievementHelpOn;
	}

	function closeAchievementPopup(forHover){
		var location = (forHover) ? "Hover" : "Popup";
		document.getElementById("achievement" + location).style.display = "none";
	}

/* 	function showAchievementDescription(id, number){
		var elem = document.getElementById(id + "Description");
		var achievement = game.achievements[id];
		if (number > achievement.finished) return;
		elem.innerHTML = "<b>" + achievement.names[number] + ":</b> " + achievement.description(number) + "<br/><br/>";
	}

	function hideAchievementDescription(id){
		document.getElementById(id + "Description").innerHTML = "";
	} */

function updateDecayStacks(addStack){
	var elem = document.getElementById('decayStacks');
	if (game.global.challengeActive != "Decay" && game.global.challengeActive != "Melt"){
		if (elem == null) return;
		elem.style.display = "none";
		return;
	}
	var challenge = game.challenges[game.global.challengeActive];
	if (addStack && challenge.stacks < challenge.maxStacks && game.upgrades.Battle.done > 0) challenge.stacks++;
	if (elem == null){
		var icon = (game.global.challengeActive == "Melt") ? "icomoon icon-fire" : "glyphicon glyphicon-cloud";
		document.getElementById('debuffSpan').innerHTML += "<span id='decayStacks' onmouseout='tooltip(\"hide\")' class='badge antiBadge'><span id='decayStackCount'></span> <span class='" + icon + "'></span></span>";
		elem = document.getElementById('decayStacks');
	}
	if (game.global.challengeActive == "Melt"){
		if (challenge.stacks > challenge.largestStacks) challenge.largestStacks = challenge.stacks;
	}
	elem.setAttribute('onmouseover', 'tooltip("Decay", null, event)');
	document.getElementById('decayStackCount').innerHTML = challenge.stacks;
}

function swapClass(prefix, newClass, elem) {
if (elem == null) {
	console.log("swapClass, No element found. Prefix: " + prefix + ", newClass: " + newClass);
	return;
	}
  var className = elem.className;
  if (typeof className.split('newClass')[1] !== 'undefined') return;
  className = className.split(prefix);
  if(typeof className[1] === 'undefined') {
	  console.log("swapClass function error: Tried to replace a class that doesn't exist at [" + elem.className + "] using " + prefix + " as prefix and " + newClass + " as target class.");
	  elem.className += " " + newClass;
	  return;
  }
  var classEnd = className[1].indexOf(' ');
  if (classEnd >= 0)
  	className = className[0] + newClass + className[1].slice(classEnd, className[1].length);
  else
  	className = className[0] + newClass;
  elem.className = className;
}

function goRadial(elem, currentSeconds, totalSeconds, frameTime){
		if (!elem) return;
        if (currentSeconds <= 0) currentSeconds = 0;
        elem.style.transition = "";
        elem.style.transform = "rotate(" + timeToDegrees(currentSeconds, totalSeconds) + "deg)";
        setTimeout(
            (function(ft, cs, ts) {
                return function() {
                    elem.style.transform = "rotate(" + timeToDegrees(cs + ft / 1000, ts) + "deg)";
                    elem.style.transition = cs < 0.1 ? "" : "transform " + ft + "ms linear";
                }
            })(frameTime, currentSeconds, totalSeconds).bind(this)
        , 0);
}

function isObjectEmpty(obj){
	for (var item in obj){
		return false;
	}
	return true;
}

function timeToDegrees(currentSeconds, totalSeconds){
	var degrees = (360 * (currentSeconds / totalSeconds * 100) / 100);
	return degrees % 360;
}

// 431741580's code

var tooltips = {};
/**
 * Generates tooltip and text for error popup
 * @param  {String} textString String of error stack
 * @return {{tooltip: String, costText: String}}   tooltip to be shown[description]
 */
tooltips.showError = function (textString) {
	var tooltip = "<p>Well this is embarrassing. Trimps has encountered an error. Try refreshing the page.</p>";
	tooltip += "<p>It would be awesome if you post the following to the <a href='https://reddit.com/r/Trimps/'>trimps subreddit</a> or email it to trimpsgame@gmail.com</p>";
	tooltip += "Note: Saving has been disabled.<br/><br/><textarea id='exportArea' spellcheck='false' style='width: 100%' rows='5'>";
	var bugReport = "--BEGIN ERROR STACK--\n";
	bugReport += textString + '\n';
	bugReport += "--END ERROR STACK--\n\n";
	bugReport += "--BEGIN SAVE FILE--\n";
	var saveFile;
	try {
		saveFile = save(true);
		bugReport += saveFile + "\n";
	} catch (e) {
		bugReport += "While attempting to save, the following error occured\n"
		bugReport += e.stack + "\n";
	}
	bugReport += "--END SAVE FILE--";
	tooltip += bugReport;
	tooltip += "</textarea>";
	var costText = "<div class='maxCenter'><div id='confirmTooltipBtn' class='btn btn-info' onclick='cancelTooltip()'>Got it</div>";
	if (document.queryCommandSupported('copy')){
		costText += "<div id='clipBoardBtn' class='btn btn-success'>Copy to Clipboard</div>";
	}
	costText += "<a id='downloadLink' target='_blank' download='Trimps Bug Report', href=";
	if (Blob !== null) {
		var blob = new Blob([bugReport], {type: 'text/plain'});
		var uri = URL.createObjectURL(blob);
		costText += uri;
	} else {
		costText += 'data:text/plain,' + encodeURIComponent(bugReport);
	}
	costText += " ><div class='btn btn-danger' id='downloadBtn'>Download as file</div></a>";
	disableSaving = true;
	return {tooltip: tooltip, costText: costText};
};

function screenReaderSummary(){
	if (!usingScreenReader) return;
	var srSumWorldZone = document.getElementById('srSumWorldZone');
	var srSumWorldCell = document.getElementById('srSumWorldCell');
	var srSumMapName = document.getElementById('srSumMapName');
	var srSumMapCell = document.getElementById('srSumMapCell');
	var srSumMapNameContainer = document.getElementById('srSumMapNameContainer');
	var srSumMapCellContainer = document.getElementById('srSumMapCellContainer');
	var srSumTrimps = document.getElementById('srSumTrimps');
	var srSumBreed = document.getElementById('srSumBreed');
	var srSumAttackScore = document.getElementById('srSumAttackScore');
	var srSumHealthScore = document.getElementById('srSumHealthScore');
	var srSumBlock = document.getElementById('srSumBlock');
	var srSumChallengeContainer = document.getElementById('srSumChallengeContainer');
	var srSumChallenge = document.getElementById('srSumChallenge');

	srSumWorldZone.innerHTML = game.global.world;
	srSumWorldCell.innerHTML = game.global.lastClearedCell + 2;

	var cell = null;

	if (game.global.mapsActive){
		var map = getCurrentMapObject();
		srSumMapNameContainer.style.display = "table-row";
		srSumMapCellContainer.style.display = "table-row";
		srSumMapName.innerHTML = map.name;
		srSumMapCell.innerHTML = (game.global.lastClearedMapCell + 2) + " of " + map.size;
		cell = getCurrentMapCell();
	}
	else{
		srSumMapNameContainer.style.display = "none";
		srSumMapCellContainer.style.display = "none";
		srSumMapName.innerHTML = "None";
		srSumMapCell.innerHTML = "0";
		cell = getCurrentWorldCell();
	}

	srSumTrimps.innerHTML = prettify(game.resources.trimps.soldiers) + " Fighting, " + prettify(game.resources.trimps.owned) + " owned, " + prettify((game.resources.trimps.owned / game.resources.trimps.realMax()) * 100) + "% full";
	srSumBreed.innerHTML = srLastBreedTime;
	if (cell){
		var trimpAttack = calculateDamage(game.global.soldierCurrentAttack, false, true, false, false, true);
		var trimpHealth = game.global.soldierHealthMax;
		var cellAttack = calculateDamage(cell.attack, false, false, false, cell, true);
		cellAttack -= game.global.soldierCurrentBlock;
		var cellHealth = cell.maxHealth;
		srSumAttackScore.innerHTML = prettify(trimpAttack) + " ATK, " + prettify((trimpAttack / cellHealth) * 100) + "% of Enemy Health";
		srSumHealthScore.innerHTML = prettify(trimpHealth) + " HP, " + prettify((cellAttack / trimpHealth) * 100) + "% lost per Enemy Attack";
	}
	srSumBlock.innerHTML = prettify(game.global.soldierCurrentBlock);
	var resources = ["food", "wood", "metal", "science", "fragments", "gems"];
	for (var x = 0; x < resources.length; x++){
		var res = game.resources[resources[x]];
		var word = resources[x].charAt(0).toUpperCase() + resources[x].slice(1);
		var elem = document.getElementById("srSum" + word);
		var containerElem = document.getElementById("srSum" + word + "Container");
		if (res.owned <= 0) {
			containerElem.style.display = "none";
			continue;
		}
		containerElem.style.display = "table-row";
		var text = prettify(Math.floor(res.owned));
		var max = getMaxForResource(resources[x]);
		if (max && max > 0) text += ", " + prettify((res.owned / max) * 100) + "% full";
		elem.innerHTML = text;
	}

	if (game.global.challengeActive){
		var hasChallengeText = false;
		var challengeText = "";
		switch(game.global.challengeActive){
			case "Balance":
				hasChallengeText = true;
				challengeText = "Balance Stacks: " + game.challenges.Balance.balanceStacks;
				break;
			case "Unbalance":
				hasChallengeText = true;
				challengeText = "Unbalance stacks: " + game.challenges.Unbalance.balanceStacks;
				break;
		}

		srSumChallengeContainer.style.display = (hasChallengeText) ? "table-row" : "none";
		srSumChallenge.innerHTML = challengeText;
	}

}

/**
 * Generates a function to handle copy button on popups
 * @return {Function} Function to handle copy butons
 */
tooltips.handleCopyButton = function () {
	var ondisplay;
	if (document.queryCommandSupported('copy')){
		ondisplay = function(){
			document.getElementById('exportArea').select();
			document.getElementById('clipBoardBtn').addEventListener('click', function(event) {
				document.getElementById('exportArea').select();
				  try {
					document.execCommand('copy');
				  } catch (err) {
					document.getElementById('clipBoardBtn').innerHTML = "Error, not copied";
				  }
			});
		}
	} else {
		ondisplay = function () {document.getElementById('exportArea').select()};
	}
	return ondisplay;
};
