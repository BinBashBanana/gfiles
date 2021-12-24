var playerSpire = {
    layout: [],
    rowsAllowed: 1,
    resetToRows: 1,
    startingRunestones: 200,
    runestones: 200,
    spirestones: 0,
    spentOnUpgrades: 0,
    currentEnemies: 0,
    selectedTrap: "",
    enemiesKilled: 0,
    escapees: 0,
    difficulty: 1,
    difficultyHidden: 1,
    ticksSinceLastEnemy: 0,
    strengthLocations: [],
    lightColumns: [0, 0, 0, 0, 0],
    smallMode: false,
    popupOpen: false,
    initialized: false,
    wasCatchingUp: false,
    nextUpgrade: -1,
    nextTrap: -1,
    tutorialStep: 0,
    killedSinceLeak: 0,
    savedLayout1: [],
    savedLayout2: [],
    layout1Note: "",
    layout2Note: "",
    peakThreat: 0,
    nextIcon: 0,
    dontDraw: false,
    paused: false,
    tooltipUpdate: null,
    sealed: false,
    settings: {
        fctTrap: true,
        fctPoison: true,
        fctRs: true,
        fctStatic: false,
        chillGradient: true,
        enemyIcons: true,
        trapIcons: true,
        shockEffect: true,
        percentHealth: false
    },
    lootAvg: {
        accumulator: 0,
        average: 0,
        counter: 0,
        lastAvg: [0]
    },
    resetToDefault: function(){
        this.layout = [];
        this.rowsAllowed = 1;
        this.resetToRows = 1;
        this.startingRunestones = 200;
        this.runestones = 200;
        this.spirestones = 0;
        this.spentOnUpgrades = 0;
        this.currentEnemies = 0;
        this.selectedTrap = "";
        this.enemiesKilled = 0;
        this.escapees = 0;
        this.difficulty = 1;
        this.difficultyHidden = 1;
        this.ticksSinceLastEnemy = 0;
        this.strengthLocations = [];
        this.lightColumns = [0, 0, 0, 0, 0];
        this.smallMode = false;
        this.popupOpen = false;
        this.initialized = false;
        this.wasCatchingUp = false;
        this.nextUpgrade = -1;
        this.nextTrap = -1;
        this.tutorialStep = 0;
        this.killedSinceLeak = 0;
        this.savedLayout = [];
        this.savedLayout2 = [];
        this.layout1Note = "";
        this.layout2Note = "";
        this.nextIcon = 0;
        this.peakThreat = 0;
        this.paused = false;
        this.sealed = false;
        this.settings = {
            fctTrap: true,
            fctPoison: true,
            fctRs: true,
            fctStatic: false,
            chillGradient: true,
            shockEffect: true,
            enemyIcons: true,
            trapIcons: true,
            percentHealth: false,
        }
        this.lootAvg = {
            accumulator: 0,
            average: 0,
            counter: 0,
            lastAvg: [0]
        }
        for (var item in playerSpireTraps){
            playerSpireTraps[item].owned = 0;
            playerSpireTraps[item].level = 1;
            playerSpireTraps[item].locked = true;
        }
        document.getElementById('playerSpireTab').style.display = 'none';
        playerSpire.closePopup();
    },
    init: function(){
        this.resetToDefault();
        if (game.global.spiresCompleted < 1) return;
        if (this.popupOpen)
            this.openPopup();
        else this.closePopup();
        if (this.smallMode)
            this.shrink();
        else this.enlarge();
        var layout = [];
        var totalCells = this.rowsAllowed * 5;
        for (var x = 0; x < totalCells; x++){
            layout.push({trap: {}, occupiedBy: {}});
        }
        this.layout = layout;
        playerSpireTraps.Fire.locked = false;
        playerSpireTraps.Frost.locked = false;
        this.initialized = true;
        this.drawSpire();
        this.drawInfo();
        document.getElementById('playerSpireTab').style.display = 'table-cell';
    },
    get maxEnemies(){
        var max = 1 + Math.ceil(this.rowsAllowed * 2.5);
        return max;
    },
    get killPercent(){
        var total = this.escapees + this.enemiesKilled;
        if (total == 0) return "0%";
        return prettify((this.enemiesKilled / total) * 100) + "%"
    },
    get difficultyMod(){
        var mod = this.difficulty;
        if (this.tutorialStep >= 4) this.addRow();
        if (mod < 1) mod = 1;
        return mod;
    },
    getNextRowCost: function(){
        var costs = [ //Spire I: 20. II: 200. III: 2k. IV: 20k. V: 200k
            -1, 6, 14, 20, 60, 200, 400, 800, 1600, 2500, 5500, 10e3, 25e3, 55e3, 100e3, 150e3, 200e3, 1e6, 2e6, 4e6
        ];
        if (this.rowsAllowed >= 20) return -1;
        return costs[this.rowsAllowed];
    },
    saveLayout: function(slot){
        var saveLayout = [];
        for (var x = 0; x < this.layout.length; x++){
            var toAdd = this.layout[x].trap.name ? this.layout[x].trap.name : "";
            saveLayout.push(toAdd);
        }
        this['savedLayout' + slot] = saveLayout;
        var noteElem = document.getElementById('spireLayoutNoteInput');
        if (noteElem){
            var note = noteElem.value;
            if (!note) {
                this['layout' + slot + 'Note'] = "";
            }
            if (note.length > 250) note = note.substring(0, 250);
            this['layout' + slot + 'Note'] = htmlEncode(note)
        }
    },
    loadLayout: function(slot){
        if (slot <= 0 || slot > 3) return false;
        var savedLayout = this["savedLayout" + slot];
        if ((this.runestones + this.getCurrentLayoutPrice()) < this.getSavedLayoutPrice(slot)) return false;
        this.resetTraps();
        for (var x = 0; x < savedLayout.length; x++){
            if (!savedLayout[x]) continue;
            this.buildTrap(x, savedLayout[x]);
        }
        return true;
    },
    getSavedLayoutPrice: function(slot){
        var layoutCost = 0;
        var tempTraps = {};
        var savedLayout = this['savedLayout' + slot];
        for (var x = 0; x < savedLayout.length; x++){
            if (!savedLayout[x]) continue;
            if (!tempTraps[savedLayout[x]]) tempTraps[savedLayout[x]] = 0;
            layoutCost += this.getTrapCost(savedLayout[x], false, tempTraps[savedLayout[x]]);
            tempTraps[savedLayout[x]]++;
        }
        return layoutCost;
    },
    getCurrentLayoutPrice: function(){
        var price = 0;
        var tempTraps = {};
        for (var item in playerSpireTraps){
            tempTraps[item] = 0;
        }
        for (var x = 0; x < this.layout.length; x++){
            var cell = this.layout[x];
            if (cell.trap.name && tempTraps[item] >= 0){
                price += this.getTrapCost(cell.trap.name, false, tempTraps[cell.trap.name]);
                tempTraps[cell.trap.name]++;
            }
        }
        return price;
    },
    presetTooltip: function(slot){
        var title = "Trap Layout " + slot;
        var text = "<b>This saved layout contains:</b><br/><br/>";
        var traps = {};
        var layout = this["savedLayout" + slot];
        var hasTraps = false;
        for (var item in playerSpireTraps){
            traps[item] = 0;
        }
        for (var x = 0; x < layout.length; x++){
            if (!layout[x]) continue;
            hasTraps = true;
            traps[layout[x]]++;
        }
        var cost = this.getSavedLayoutPrice(slot);
        var curCost = this.getCurrentLayoutPrice();
        for (var item in traps){
            if (traps[item] == 0) continue;
            var color = playerSpireTraps[item].color;
            text += "<span class='playerSpireTooltipTrapName' style='background-color: " + color + "'>" + item + "&nbsp;x" + traps[item] + "</span> ";
        }
        text += "<br/><br/>";
        text += "Total Cost: " + prettify(cost) + " Rs<br/>Value of Current Traps: " + prettify(curCost) + " Rs<br/>";
        var dif = (curCost - cost);
        if (dif < 0) text += "Remaining Cost: " + prettify(Math.abs(dif));
        else text += "Refund: " + prettify(dif);
        text += " Rs";
        if (!hasTraps) text = "This layout is currently empty. You can save your current setup to this layout, and load it later!";
        else if (this['layout' + slot + 'Note'].length) text += "<br/><br/><b>You wanted to remind yourself:</b><br/>" + this['layout' + slot + 'Note'];
        text += "<br/>";
        var noLoad = false;
        if (dif < 0 && this.runestones < Math.abs(dif)){
            text += "<span class='red'>You cannot afford to load this Trap layout.</span>";
            noLoad = true;
        }
        else if (layout.length > this.layout.length){
            text += "<span class='red'>You don't have enough Floors available in your Spire to load this layout.</span>";
            noLoad = true;
        }
        text += "<br/><br/><div class='spirePresetBtns'><span onclick='tooltip(\"confirm\", null, \"update\", \"Are you sure you want to save your current Spire layout to Preset " + slot + "? This will overwrite your currently saved layout.<br/><br/>If you want, you can also type a note to your future self below!<br/><br/><input maxlength=\\\"250\\\" style=\\\"width: 100%\\\" id=\\\"spireLayoutNoteInput\\\"/><br/>\", \"playerSpire.saveLayout(" + slot + ")\", \"Save to Layout " + slot + "?\")'>Save Current Layout Here</span>";
        if (hasTraps && layout.length <= this.layout.length && !noLoad)
            text += "<span onclick='tooltip(\"confirm\", null, \"update\", \"Are you sure you want to load layout " + slot + "? This will remove all Traps and Towers currently placed in your Spire!\", \"playerSpire.loadLayout(" + slot + ")\", \"Load Layout " + slot + "?\")'>Load This Layout</span>";
        text += "</div>";
        tooltip(title, 'customText', 'lock', text, "", "center");
    },
    settingsTooltip: function(){
        var text = "<div id='spireSettingsTooltip'>";
        text += "<b style='margin-bottom: 1vw'>Floating Combat Text</b>";
        text += "<span class='spireOption'>Make Static:" + buildNiceCheckbox('spirefctStatic', '', this.settings.fctStatic) + "</span>";
        text += "<span class='spireOption'>Trap Damage: " + buildNiceCheckbox('spirefctTrap', '', this.settings.fctTrap) + "</span>";
        if (!playerSpireTraps.Poison.locked)
            text += "<span class='spireOption'>Poison Tick: " + buildNiceCheckbox('spirefctPoison', '', this.settings.fctPoison) + "</span>";
        text += "<span class='spireOption'>Runestones: " + buildNiceCheckbox('spirefctRs', '', this.settings.fctRs) + "</span>";
        text += "<b style='margin-top: 0; margin-bottom: 1vw'>Visual Settings</b>";
        text += "<span class='spireOption'>Trap Icons: " + buildNiceCheckbox('spiretrapIcons', '', this.settings.trapIcons) + "</span>";
        text += "<span class='spireOption'>Enemy Icons: " + buildNiceCheckbox('spireenemyIcons', '', this.settings.enemyIcons) + "</span>";
        text += "<span class='spireOption'>Chill Effect: " + buildNiceCheckbox('spirechillGradient', '', this.settings.chillGradient) + "</span>";
        if (!playerSpireTraps.Lightning.locked)
        text += "<span class='spireOption'>Shock Effect: " + buildNiceCheckbox('spireshockEffect', '', this.settings.shockEffect) + "</span>";
        text += "<span class='spireOption'>Health as %: " + buildNiceCheckbox('spirepercentHealth', '', this.settings.percentHealth) + "</span>";
        text += "</div>";
        tooltip("Spire Settings", 'customText', 'lock', text, "<span class='btn btn-info' onclick='playerSpire.saveSettings()'>Save</span><span class='btn btn-danger' onclick='cancelTooltip()'>Cancel</span>", "hi", "hi");
    },
    saveSettings: function(){
        for (var item in this.settings){
            var elem = document.getElementById('spire' + item);
            if (elem){
                this.settings[item] = readNiceCheckbox(elem);
            }
        }
        this.drawSpire();
        this.drawInfo();
        cancelTooltip();
    },
    rewardRunestones: function(amt){
        this.runestones += amt;
        this.lootAvg.accumulator += amt;
        this.updateRunestones();
    },
    getRsPs: function() {
        if (!this.lootAvg.lastAvg.length) return 0;
        var avg = 0;
        for (var x = 0; x < this.lootAvg.lastAvg.length; x++){
            avg += this.lootAvg.lastAvg[x];
        }
        avg /= this.lootAvg.lastAvg.length;
        return (avg > 0.01) ? avg : 0;
    },
    updateRsPs: function(){
        var elem = document.getElementById('RsPs');
        if (elem)
            elem.innerHTML = prettify(this.getRsPs());
    },
    curateAvgs: function() {
        this.lootAvg.counter++;
        if (this.lootAvg.counter < 10) return;
        this.lootAvg.counter = 0;
        var alpha = 0.05;
        this.lootAvg.average = this.lootAvg.average * (1 - alpha) + this.lootAvg.accumulator * alpha / 10;
        this.lootAvg.accumulator = 0;
        if (this.lootAvg.lastAvg && this.lootAvg.lastAvg.length >= 20) this.lootAvg.lastAvg.splice(0, 1);
        this.lootAvg.lastAvg.push(Math.floor(this.lootAvg.average * 100) / 100);
        this.updateRsPs();
        if (game.stats.tdKills.value + game.stats.tdKills.valueTotal >= 1e6) giveSingleAchieve("Stoned");
    },
    addRow: function(force){
        var cost = this.getNextRowCost();
        if (cost == -1) return;
        if (!force && this.spirestones < cost) return;
        if (!force && this.difficulty < (100 * (this.rowsAllowed + 1))) return;
        this.rowsAllowed++;
        if (this.rowsAllowed == 10) giveSingleAchieve("Defender");
        if (this.rowsAllowed == 20) giveSingleAchieve("Power Tower");
        this.spirestones -= cost;
        if (this.spirestones < 0) this.spirestones = 0;
        for (var x = 0; x < 5; x++){
            this.layout.push({occupiedBy: {}, trap: {}})
        }
        this.drawSpire();
        this.drawInfo();
    },
    getUpgradesHtml: function(){
        var html = "";
        var cheapestTrap = -1;
        if (this.tutorialStep < 4) return "";
        for (var trapItem in playerSpireTraps){
            var trap = playerSpireTraps[trapItem];
            if (trap.locked) continue;
            if (!trap.upgrades || trap.upgrades.length < trap.level) continue;
            var nextUpgrade = trap.upgrades[trap.level - 1];
            if ((nextUpgrade.cost > this.runestones || game.global.highestLevelCleared + 1 < nextUpgrade.unlockAt) && this.smallMode) continue;
            var trapText = trap.isTower ? " Tower " : " Trap ";
            var style = (nextUpgrade.cost > this.runestones || (game.global.highestLevelCleared + 1 < nextUpgrade.unlockAt)) ? "grey" : trap.color;
            var upgradeClass;
            var text;
            if (this.smallMode){
                upgradeClass = 'spireTrapBoxSmall';
                text = trapItem + " " + romanNumeral(trap.level + 1);
            }
            else{
                upgradeClass = 'playerSpireUpgrade spireTrapBox';
                text = trapItem + trapText + romanNumeral(trap.level + 1)
            }
            html += "<div onmouseover='playerSpire.upgradeTooltip(\"" + trapItem + "\", event)' onmouseout='tooltip(\"hide\")' onclick='playerSpire.buyUpgrade(\"" + trapItem + "\")' style='background-color: " + style + "' class='" + upgradeClass + "'>" + text + "</div>";
            if (this.runestones < nextUpgrade.cost && (cheapestTrap == -1 || nextUpgrade.cost < cheapestTrap)) cheapestTrap = nextUpgrade.cost;
        }
        if (this.smallMode && html.length) html = "<hr/>" + html;
        this.nextUpgrade = cheapestTrap;
        return html;
    },
    resetUpgrades: function(){
        for (var trap in playerSpireTraps){
            var trapObj = playerSpireTraps[trap];
            trapObj.level = 1;
        }
        this.runestones += this.spentOnUpgrades;
        this.spentOnUpgrades = 0;
        this.drawInfo();
    },
    redrawUpgrades: function(){
        var elem = document.getElementById('playerSpireUpgradesArea');
        if (elem == null){
            this.drawInfo();
            return;
        }
        elem.innerHTML = this.getUpgradesHtml();
    },
    checkRedrawUpgrades: function(){
        //only needed if drawInfo isn't being called, basically just for killedEnemy()
        if (this.nextUpgrade != -1 && this.runestones >= this.nextUpgrade) this.redrawUpgrades();
    },
    checkUpdateTrapColors: function(){
        if (this.nextTrap != -1 && this.runestones >= this.nextTrap) this.updateTrapColors();
    },
    updateTrapColors: function(){
        var cheapestTrap = -1;
        for (var item in playerSpireTraps){
            var trap = playerSpireTraps[item];
            if (trap.locked) continue;
            var cost = this.getTrapCost(item);
            var color = (this.runestones >= cost) ? trap.color : "grey";
            var elem = document.getElementById(item + "TrapBox");
            if (elem) elem.style.backgroundColor = color;
            if (this.runestones < cost && (cheapestTrap == -1 || cost < cheapestTrap)) cheapestTrap = cost;
        }
        this.nextTrap = cheapestTrap;
    },
    buyUpgrade: function(trapName, confirmed){
        var trapObj = playerSpireTraps[trapName];
        if (!trapObj.upgrades || trapObj.upgrades.length < trapObj.level) return;
        var upgrade = trapObj.upgrades[trapObj.level - 1];
        if (this.runestones < upgrade.cost) return;
        if (game.global.highestLevelCleared + 1 < upgrade.unlockAt) return;
        if (!confirmed){
            var trapText = trapName + ((trapObj.isTower) ? " Tower" : " Trap");
            var tipText = "Are you sure you want to upgrade your " + trapText + "? This upgrade is non-refundable!<br/><br/><i>\"" + upgrade.description + "\"</i><br/><br/><b>Cost: " + prettify(upgrade.cost) + " Rs</b>";
            tooltip("confirm", null, "update", tipText, "playerSpire.buyUpgrade('" + trapName + "', true)", "Upgrade " + trapText + "?");
            return;
        }
        this.runestones -= upgrade.cost;
        this.spentOnUpgrades += upgrade.cost;
        if (this.runestones + this.getCurrentLayoutPrice() < 200) this.runestones = 200 - this.getCurrentLayoutPrice();
        trapObj.level++;
        this.drawInfo();
        this.drawSpire();
    },
    rewardSpirestones: function(spireNumber){
        var reward = Math.floor(Math.pow(10, spireNumber - 1) * 20);
        this.spirestones += reward;
        if (this.tutorialStep >= 4) this.addRow();
        this.updateSpirestoneText();
        return reward;
    },
    giveSpirestones: function(count){
        this.spirestones += count;
        if (this.tutorialStep >= 4) this.addRow();
        this.updateSpirestoneText();
    },
    updateSpirestoneText: function() {
        var elem = document.getElementById('spirestoneBox');
        if (elem) elem.innerHTML = this.getSpirestoneHtml();
    },
    getSpirestoneHtml: function() {
        var text = ((this.smallMode) ? "Ss: " : "Spirestones: ") + prettify(this.spirestones);
        var nextCost = this.getNextRowCost();
        if (nextCost == -1 || this.tutorialStep < 3) return text;
        text += " / " + prettify(nextCost) + "</span>"
        return text;
    },
    canSeal: function(){
        return (playerSpireTraps.Strength.owned >= 10 && playerSpireTraps.Knowledge.owned >= 10 && playerSpireTraps.Condenser.owned >= 10);
    },
    seal: function(){
        this.sealed = true;
        this.clearEnemies();
        playerSpireTraps.Knowledge.owned = 11;
        playerSpireTraps.Strength.owned = 11;
        playerSpireTraps.Condenser.owned = 11;
        document.getElementById('playerSpireTab').style.display = 'none';
    },
    unseal: function(){
        playerSpireTraps.Knowledge.owned = 10;
        playerSpireTraps.Strength.owned = 10;
        playerSpireTraps.Condenser.owned = 10;
        this.sealed = false;
        document.getElementById('playerSpireTab').style.display = 'table-cell';
        this.drawInfo();
    },
    togglePause: function(){
        this.paused = !this.paused;
        this.drawInfo();
        this.updateTabColor();
    },
    infoTooltip: function(what, event){
        var tooltipText = "";
        switch(what){
            case "Runestones":
                var curCost = this.getCurrentLayoutPrice();
                var upgradeCost = this.spentOnUpgrades;
                var remaining = this.runestones;
                tooltipText = "Runestones (Rs) are earned by killing Bad Guys in your Spire, and the amount of Runestones gained is directly proportional to the Max Health of the slain Bad Guy.<br/><br/>You have found " + prettify(curCost + upgradeCost + remaining) + " total Runestones.<br/><br/>" + prettify(upgradeCost) + " Runestones have been spent on Upgrades.<br/><br/>" + prettify(curCost) + " Runestones have been spent on Traps/Towers in your current layout.";
                if (game.heirlooms.Core.runestones.currentBonus > 0) tooltipText += "<br/><br/>You are earning " + prettify(game.heirlooms.Core.runestones.currentBonus) + "% more Runestones from all sources thanks to your Spire Core!";
                break;
            case "Threat":
                tooltipText = "Threat rises as you kill Bad Guys in your Spire, and falls as they escape. Threat is an average of kills/escapes over some time and may not always rise immediately after a kill or fall immediately after an escape, but will always stay near what your Spire can handle.<br/><br/>More Threat means Healthier Bad Guys, which means more Runestones. Threat is also required for adding additional Floors to your Spire, increasing by 100 Threat required per Floor.<br/><br/>The highest Threat your Spire has ever reached is: <b>" + prettify(Math.floor(this.peakThreat)) + "</b><br/><br/>Displayed As: <b>Current Threat</b> / <b>Threat Required for Next Floor</b>";
                break;
            case "Enemies":
                tooltipText = "The amount of enemies currently allowed in your Spire.<br/><br/>Your Spire can hold 1 Bad Guy, plus an additional 2.5 Bad Guys for each Floor in your Spire (rounded up).";
                if (playerSpireTraps.Frost.level >= 7 && playerSpireTraps.Frost.owned) tooltipText += "<br/><br/>You have an additional " + playerSpireTraps.Frost.owned + " Maximum Enemies allowed in your Spire, thanks to Frost IV.";
                tooltipText += "<br/><br/>Displayed As: <b>Current Enemies in Spire</b> / <b>Maximum Enemies Allowed in Spire</b>"
                break;
            case "Spirestones":
                tooltipText = "Spirestones (Ss) can only be earned by recycling Spire Cores found from Spires in the World, and can be used to add Floors to your Spire or upgrade other Cores.<br/><br/>Displayed As: <b>Current Spirestones</b> / <b>Spirestones Required for Next Floor</b>"
                break;
            default:
                break;
        }

        tooltip(what, 'customText', event, tooltipText, "");
        tooltipUpdateFunction = function(){playerSpire.infoTooltip(what, event)};
    },
    drawInfo: function(){
        if (!this.popupOpen) return;
        if (this.sealed){
            document.getElementById('playerSpireInfoPanel').innerHTML = "<div style='text-align: center; font-weight: bold'>The Spire is Sealed, but you are still earning bonuses from having 11 of each Tower.<br/><br/>You can unseal the Spire if you want to, but will lose your 11th towers.<br/><br/><div onclick='playerSpire.unseal()' id='unsealSpireBtn' class='spireControlBox'>Unseal Spire</div></div><span id='playerSpireCloseBtn' class='icomoon icon-close' onclick='playerSpire.closePopup()'></span>"
            return;
        }
        if (this.smallMode){
            this.drawSmallInfo();
            return;
        }
        var elem = document.getElementById('playerSpireInfoPanel');
        var infoHtml = "";
        infoHtml += "<div id='playerSpireInfoTop'>";
        infoHtml += "<span onmouseover='playerSpire.infoTooltip(\"Runestones\", event)' onmouseout='tooltip(\"hide\")'>Runestones: <span id='playerSpireRunestones'>" + prettify(this.runestones) + "</span><br/>Runestones per Second: <span id='RsPs'>" + prettify(this.getRsPs()) + "</span></span>";
        infoHtml += "<br/><span onmouseover='playerSpire.infoTooltip(\"Enemies\", event)' onmouseout='tooltip(\"hide\")'>Enemies: <span id='playerSpireCurrentEnemies'>" + this.currentEnemies + "</span> / <span id='playerSpireMaxEnemies'>" + this.maxEnemies + "</span></span>";
        infoHtml += "<br/><span onmouseover='playerSpire.infoTooltip(\"Spirestones\", event)' onmouseout='tooltip(\"hide\")' id='spirestoneBox'>" + this.getSpirestoneHtml() + "</span><br/><span onmouseover='playerSpire.infoTooltip(\"Threat\", event)' onmouseout='tooltip(\"hide\")' id='playerSpireDifficulty'>" + this.getDifficultyHtml() + "</span></div>";
        infoHtml += "<div id='spireTrapsWindow'>";
        infoHtml += "<div onclick='playerSpire.shrink()' id='shrinkSpireBox' class='spireControlBox'>Shrink Window</div>";
        infoHtml += "<div onclick='playerSpire.settingsTooltip()' id='spireSettingsBox' class='spireControlBox'>Settings</div>"
        infoHtml += "<div onclick='tooltip(\"confirm\", null, \"update\", \"Are you sure you want to sell all Traps and Towers? You will get back 100% of Runestones spent on them.<br/><br/>" + ((this.paused) ? "" : "<b>Protip:</b> Pause your Spire before selling your defenses if you want to avoid leaking!") + "\", \"playerSpire.resetTraps()\", \"Sell All?\")' class='spireControlBox'>Sell All</div>";
        infoHtml += "<div onclick='playerSpire.togglePause()' id='pauseSpireBtn' class='spireControlBox spirePaused" + ((this.paused) ? "Yes'>Unpause" : "'>Pause Spire") + "</div>";      
        infoHtml += "<div class='spireControlBoxDbl'><div onclick='playerSpire.presetTooltip(1)'>Layout 1</div><div onclick='playerSpire.presetTooltip(2)'>Layout 2</div></div>"
        infoHtml += "<div onclick='playerSpire.selectTrap(\"shiftUp\")' onmouseout='tooltip(\"hide\")' onmouseover='playerSpire.trapTooltip(\"shiftUp\", event)' id='sellTrapBox' class='spireControlBox" + ((this.selectedTrap == "shiftUp") ? " selected" : "") + "'>Shift Up</div>";
        infoHtml += "<div onclick='playerSpire.selectTrap(\"shiftDown\")' onmouseout='tooltip(\"hide\")' onmouseover='playerSpire.trapTooltip(\"shiftDown\", event)' id='sellTrapBox' class='spireControlBox" + ((this.selectedTrap == "shiftDown") ? " selected" : "") + "'>Shift Down</div>";

        
        // infoHtml += "<div onclick='playerSpire.resetUpgrades()' class='spireControlBox'>Reset Upgrades</div>";
        // infoHtml += "<div onclick='tooltip(\"confirm\", null, \"update\", \"Are you sure you want to reset EVERYTHING? This includes Floors, upgrades, and runestones!\", \"playerSpire.init()\", \"Reset Spire?\")' class='spireControlBox'>Reset EVERYTHING</div>";
        // infoHtml += "<div onclick='playerSpire.clearEnemies()' class='spireControlBox'>Clear Enemies</div>";

        infoHtml += "<br/><hr/>"
        infoHtml += "<div onclick='playerSpire.selectTrap(\"sell\")' onmouseout='tooltip(\"hide\")' onmouseover='playerSpire.trapTooltip(\"sell\", event)' style='padding-top: 1.35vw' id='sellTrapBox' class='spireTrapBox" + ((this.selectedTrap == "sell") ? " selected" : "") + "'>Sell a Trap/Tower</div>";
        var cheapestTrap = -1;
        for (var item in playerSpireTraps){
            var trap = playerSpireTraps[item];
            if (trap.locked) continue;
            var trapText = trap.isTower ? "Tower" : "Trap";
            trapText += " " + romanNumeral(trap.level);
            var trapIcon = "";
            if (this.settings.trapIcons) trapIcon = "<span class='icomoon icon-" + trap.icon + "'></span> ";
            var cost = this.getTrapCost(item);
            var color = (this.runestones >= cost) ? trap.color : "grey";
            var costText = prettify(this.getTrapCost(item)) + " Rs";
            if (trap.isTower && trap.owned >= 10) {
                costText = "Max Level"
                color = "grey";
            }
            infoHtml += "<div style='background-color: " + color + "' onmouseout='tooltip(\"hide\")' onmouseover='playerSpire.trapTooltip(\"" + item + "\", event)' onclick='playerSpire.selectTrap(\"" + item + "\")' id='" + item + "TrapBox' class='spireTrapBox" + ((item == this.selectedTrap) ? " selected" : "") + "'>" + trapIcon + item + " " + trapText + "<br/>" + costText + "</div>"
            if (this.runestones < cost && (cheapestTrap == -1 || cost < cheapestTrap)) cheapestTrap = cost;
        }
        this.nextTrap = cheapestTrap;
        infoHtml += "</div><hr/>"; //spireTrapsWindow
        infoHtml += "<span id='playerSpireCloseBtn' class='icomoon icon-close' onclick='playerSpire.closePopup()'></span>";
        infoHtml += "<div id='playerSpireUpgradesArea'>";
        infoHtml += this.getUpgradesHtml();
        if (this.canSeal()){
            infoHtml += "<div id='spireSealInfo' style='font-weight: bold; text-align: center;'>You now have 10 of each Tower and have successfully reinforced every floor of this Spire. Your Trimps would be incredibly proud of you if they could process such strong emotions, for this was no small feat! Your Scientists can now construct one more of each Tower for free, but doing so will seal the Spire. If you choose to Seal the Spire, you'll earn World bonuses as if you had 11 of each Tower, but enemies will no longer spawn in the Spire.<br/>NOTE: Sealing the Spire will remove the tab used to access this window, but a Setting will be added under Other should you want to unseal it for any reason.<br/><div onclick='playerSpire.seal()' id='sealSpireBtn' class='spireControlBox'>Seal Spire</div></div>"
        }
        infoHtml += "</div>"; //playerSpireUpgradesArea
        elem.innerHTML = infoHtml;
    },
    drawSmallInfo: function(){
        var elem = document.getElementById('playerSpireSmallPanel');
        var html = "<div id='playerSpireInfoTopSm'>";
        html += "<span onmouseover='playerSpire.infoTooltip(\"Runestones\", event)' onmouseout='tooltip(\"hide\")'>Rs: <span id='playerSpireRunestones'>" + prettify(this.runestones) + "</span><br/>";
        html += "Rs/S: <span id='RsPs'>" + prettify(this.getRsPs()) + "</span></span><br/>"
        html += "<span onmouseover='playerSpire.infoTooltip(\"Enemies\", event)' onmouseout='tooltip(\"hide\")'>E: <span id='playerSpireCurrentEnemies'>" + this.currentEnemies + "</span> / <span id='playerSpireMaxEnemies'>" + this.maxEnemies + "</span></span><br/>";
        html += "<span onmouseover='playerSpire.infoTooltip(\"Spirestones\", event)' onmouseout='tooltip(\"hide\")' id='spirestoneBox'>" + this.getSpirestoneHtml() + "</span><br/>"
        html += "<span onmouseover='playerSpire.infoTooltip(\"Threat\", event)' onmouseout='tooltip(\"hide\")' id='playerSpireDifficulty'>" + this.getDifficultyHtml() + "</span><br/>";
        html += "</div>"; //playerSpireInfoTopSm
        html += "<div onclick='playerSpire.enlarge()' id='shrinkSpireBox' class='spireControlBoxSmall'>Enlarge</div>";
        html += "<hr style='margin: 2%'/>";
        html += "<div onclick='playerSpire.selectTrap(\"sell\")' id='sellTrapBox' onmouseout='tooltip(\"hide\")' onmouseover='playerSpire.trapTooltip(\"sell\", event)' class='spireTrapBoxSmall" + ((this.selectedTrap == "sell") ? " selected" : "") + "'>Sell</div>";
        var cheapestTrap = -1;
        for (var item in playerSpireTraps){
            if (playerSpireTraps[item].locked) continue;
            var cost = this.getTrapCost(item);
            var color = (this.runestones >= cost) ? playerSpireTraps[item].color : "grey";
            if (playerSpireTraps[item].isTower && playerSpireTraps[item].owned >= 10) color = "grey";
            var trapIcon = "";
            if (this.settings.trapIcons) trapIcon = "<span class='icomoon icon-" + playerSpireTraps[item].icon + "'></span> ";
            html += "<div style='background-color: " + color + "' onmouseout='tooltip(\"hide\")' onmouseover='playerSpire.trapTooltip(\"" + item + "\", event)' onclick='playerSpire.selectTrap(\"" + item + "\")' id='" + item + "TrapBox' class='spireTrapBoxSmall" + ((item == this.selectedTrap) ? " selected" : "") + "'>" + trapIcon + item + "</div>";
            if (this.runestones < cost && (cheapestTrap == -1 || cost < cheapestTrap)) cheapestTrap = cost;
        }
        html += "<div id='playerSpireUpgradesArea'>" + this.getUpgradesHtml() + "</div>";
        this.nextTrap = cheapestTrap;
        html += "<span id='playerSpireCloseBtnSm' class='icomoon icon-close' onclick='playerSpire.closePopup()'></span>";
        elem.innerHTML = html;
    },
    resetStats: function(){
        this.escapees = 0;
        this.enemiesKilled = 0;
        this.lootAvg.accumulator = 0;
        this.lootAvg.average = 0;
        this.updateKills();
        this.updateRsPs();
    },
    resetTraps: function(){
        var refund = 0;
        for (var x = 0; x < this.layout.length; x++){
            var cell = this.layout[x];
            if (cell.trap.name){
                playerSpireTraps[cell.trap.name].owned--;
                refund += this.getTrapCost(cell.trap.name);
            }
            cell.trap = {};
        }
        for (var trap in playerSpireTraps){
            playerSpireTraps[trap].owned = 0;
        }
        this.runestones += refund;
        this.strengthLocations = [];
        this.lightColumns = [0, 0, 0, 0, 0];
        this.drawSpire();
        this.drawInfo();
    },
    clearEnemies: function(){
        for (var x = 0; x < this.layout.length; x++){
            var cell = this.layout[x];
            cell.occupiedBy = {};
        }
        this.drawSpire();
        this.resetStats();
        this.currentEnemies = 0;
        this.drawInfo();
    },
    shrink: function(){
        this.smallMode = true;
        document.getElementById('playerSpireInfoPanel').style.display = 'none';
        var popoutElem = document.getElementById('playerSpirePopout');
        popoutElem.style.left = "2.5%";
        document.getElementById('playerSpireSmallPanel').style.display = 'inline-block';
        document.getElementById('playerSpireSpirePanel').style.width = "calc(27vw - 4px)";
        document.getElementById('floatingCombatText').style.width = "calc(26vw - 4px)";
        this.drawSmallInfo();
    },
    enlarge: function(){
        this.smallMode = false;
        document.getElementById('playerSpireInfoPanel').style.display = 'inline-block';
        var smallElem = document.getElementById('playerSpireSmallPanel');
        smallElem.innerHTML = "";
        smallElem.style.display = 'none';
        document.getElementById('playerSpirePopout').style.left = "5%";
        document.getElementById('playerSpireSpirePanel').style.width = "calc(30vw - 4px)";
        document.getElementById('floatingCombatText').style.width = "calc(29vw - 4px)";
        this.drawInfo();

    },
    updateTabColor: function(){
        var tabClass = (this.paused) ? 'pausedSpire' : 'pausedSpireNo';
        swapClass('pausedSpire', tabClass, document.getElementById('playerSpireTab'));
    },
    closePopup: function() {
        this.popupOpen = false;
        document.getElementById('playerSpirePopout').style.display = 'none';
        this.updateTabColor();
    },
    openPopup: function(){
        this.popupOpen = true;
        document.getElementById('playerSpirePopout').style.display = 'block';
        this.drawSpire();
        this.drawInfo();
    },
    trapTooltip: function(which, event){
        if (which == "sell"){
            tooltip("Sell Trap/Tower", 'customText', event, "Sell a Trap or Tower! You'll get back 100% of what you spent on the last Trap or Tower of that type.<br/><br/>(Hotkey 0 or ')")
            return;
        }
        if (which == "shiftUp"){
            tooltip("Shift Up", 'customText', event, "Shift your Traps and Towers up one cell!<br/><br/>Click this to select Shift Up Mode, then click a Trap or Tower in your Spire. The Trap/Tower you select and all Traps/Towers after it will shift up one cell until the first empty space is hit.<br/><br/>If there is no empty space, your last Trap/Tower will be sold.")
            return;
        }
        if (which == "shiftDown"){
            tooltip("Shift Down", 'customText', event, "Shift your Traps and Towers down one cell!<br/><br/>Click this to select Shift Down Mode, then click a Trap or Tower in your Spire. The Trap/Tower you select and all Traps/Towers before it will shift down one cell until the first empty space is hit.<br/><br/>If there is no empty space, your first Trap/Tower will be sold.")
            return;
        }
        var trapText = playerSpireTraps[which].isTower ? " Tower" : " Trap";
        var cost = this.getTrapCost(which);
        var costText = (cost > this.runestones) ? "<span style='color: red'>" : "<span style='color: green'>";
        costText += prettify(cost) + " Runestones";
        if (cost > this.runestones) costText += " (" + calculateTimeToMax(null, this.lootAvg.average, (cost - this.runestones)) + ")";
        else{
            var costPct = (cost / this.runestones) * 100;
            if (costPct < 0.01) costPct = 0;
            costText += " (" + prettify(costPct) + "%)";
        } 
        costText += "</span>";
        tooltip(which + trapText, 'customText', event, playerSpireTraps[which].description, costText);
        tooltipUpdateFunction = function(){playerSpire.trapTooltip(which, event)};
    },
    upgradeTooltip: function(which, event){
        var trap = playerSpireTraps[which];
        if (!trap.upgrades || trap.upgrades.length < trap.level) return;
        var upgrade = trap.upgrades[trap.level - 1];
        var text = upgrade.description;
        var title = which + ((trap.isTower) ? " Tower " : " Trap ") + romanNumeral(trap.level + 1);
        var cost = "<span style='color: ";
        cost += (this.runestones >= upgrade.cost) ? "green" : "red";
        cost += "'>" + prettify(upgrade.cost) + " Runestones";
        if (upgrade.cost > this.runestones) cost += " (" + calculateTimeToMax(null, this.lootAvg.average, (upgrade.cost - this.runestones)) + ")";
        else{
            var costPct = (upgrade.cost / this.runestones) * 100;
            if (costPct < 0.01) costPct = 0;
            cost += " (" + prettify(costPct) + "%)";
        } 
        cost += "</span>";
        if (upgrade.unlockAt != -1)
            cost += ", <span style='color: " + ((game.global.highestLevelCleared + 1 >= upgrade.unlockAt) ? "green" : "red") + "'>Reach Z" + upgrade.unlockAt + "</span>";
        tooltip(title, 'customText', event, text, cost);
        tooltipUpdateFunction = function(){playerSpire.upgradeTooltip(which, event)};
    },
    selectTrap: function(which){
        this.selectedTrap = which;
        this.drawInfo();
    },

    drawSpire: function(){
        if (!this.popupOpen) return;
        if (this.dontDraw) return;
        var layout = this.layout;
        var layoutHtml = "";
        var rowHtml = "";
        for (var x = layout.length - 1; x >= 0; x--){
            var cellWrapper = "<div onmouseover='playerSpire.checkDragTraps(" + x + ", event)' onmousedown='playerSpire.buildTrap(\"" + x + "\")' id='playerSpireCell" + x + "' class='noselect playerSpireCell'";
            cellWrapper += " style='";
            cellWrapper += this.getSetTrapBgColor(x);
            cellWrapper += "'><span id='playerSpireCell" + x + "enemy'>"
            var iconText = "";
            if (this.settings.trapIcons){
                iconText = "<span id='spireTrapIcon" + x + "' class='spireTrapIcon'>"
                if (layout[x].trap.name)
                    iconText += this.getTrapIcon(x);
                iconText += "</span>"
            }
            rowHtml = cellWrapper + this.getEnemyHtml(x) + "</span>" + iconText + "</div>" + rowHtml;
            if (x % 5 == 0){
            layoutHtml += rowHtml;
            rowHtml = "";
            }
        }
        var tutorialHeight = 84 - (playerSpire.rowsAllowed * 4.5);
        layoutHtml += "<div id='playerSpireTutorial' style='height: " + tutorialHeight + "vh' class='niceScroll'>" + this.updateTutorial(true) + "</div>"
        document.getElementById("playerSpireSpireSpirePanel").innerHTML = layoutHtml;
    },
    updateTutorial: function(textOnly){
        var elem = document.getElementById('playerSpireTutorial');
        if (!elem || this.tutorialStep >= 8) return "";
        var currentStep = this.tutorialStep;
        switch(currentStep){
            case 0:
                if (this.layout[0].trap.name == "Frost" && this.layout[1].trap.name == "Fire"){
                    this.tutorialStep++;
                }
                break;
            case 1:
                if (playerSpireTraps.Frost.owned + playerSpireTraps.Fire.owned >= 5){
                    this.tutorialStep++;
                    playerSpireTraps.Strength.locked = false;
                    this.addRow(true);
                }
                break;
            case 2:
                if (this.difficulty >= 300){
                    this.tutorialStep++;
                    this.addRow(true);
                }
                break;
            case 3:
                if (this.difficulty >= 400 && this.spirestones >= 20){
                    this.tutorialStep++;
                    this.addRow();
                }
                break;
            case 4:
                if (playerSpireTraps.Frost.level >= 2){
                    this.tutorialStep++;
                }
                break;
            case 5:
                if (playerSpireTraps.Poison.locked && game.global.spiresCompleted >= 2) {
                    playerSpireTraps.Poison.locked = false;
                    playerSpireTraps.Condenser.locked = false;
                    this.drawInfo();
                }
                if (this.rowsAllowed >= 6 && game.global.spiresCompleted >= 2){
                    this.tutorialStep++;
                }
                break;
            case 6:
                if (playerSpireTraps.Lightning.locked && game.global.spiresCompleted >= 3) {
                    playerSpireTraps.Lightning.locked = false;
                    playerSpireTraps.Knowledge.locked = false;
                    this.drawInfo();
                }
                if (this.rowsAllowed >= 11 && game.global.spiresCompleted >= 3){
                    this.tutorialStep++;
                }
                break;
            case 7: 
                if (this.rowsAllowed >= 13){
                    this.tutorialStep++;
                }
                break;
            default:
                break;
        }
        if (currentStep != this.tutorialStep){
            this.drawInfo();
            this.drawSpire();
        }
        var tutorialSteps = [
            "<p>Welcome to your Spire! You've killed Druopitee and stolen some Spirestones: ancient construction materials that duplicate themselves across dimensions, traditionally used to create powerful Spires. Druopitee thought that he was the only one who could build tall buildings, but you're on a mission to prove him wrong!</p><p>You were able to finish constructing the first Floor of your very own Spire with the Spirestones you found, and you still have a few left over to try to make it even taller. You had your Trimps build a wall around the entire town, making your new Spire the only entrance and exit point. You feel super safe for a few seconds, and your Trimps are super stoked on their new fortress.</p><p>After those few seconds are up, you see that the Spire is attracting a decent amount of unwanted attention from jealous enemies, who seem to take your Spire as a challenge.</p><p>Luckily, your Scientists have managed to come up with a few Trap designs that can hopefully stop the flow of enemies into your town.</p><p class='spireQuest'>Try placing a Frost Trap in the leftmost cell of your Spire, and a Fire Trap directly to the right of it.</p>",
            "<p>Perfect, everything seems to be working just as your Scientists explained. The Frost Trap slows the enemies down, and the Fire Trap finishes them off.</p><p>Unfortunately, it seems like each enemy you kill in here makes your Spire a more important target, causing stronger and stronger enemies to come through.</p><p>Fortunately though, your Magical Spire Traps convert Bad Guys into a new type of resource whenever they kill one, which your Scientists call 'Runestones'. Even more fortunately, larger enemies with more Max Health convert into larger amounts of Runestones! As your Spire's Threat increases, so will your Runestones per second, and so will your Spire's defenses (if you're doing your job).</p><p style='text-decoration: underline'>You don't have to stay here while Runestones build up, you can go back to leading your Trimps while your Traps do some work. The enchanted Spirestones copy your progress to all possible dimensions, so you won't even lose your Traps if you Portal!</p><p class='spireQuest'>Keep an eye on your Runestones, and add more Traps whenever you can. Try to fill this entire Floor with Traps!</p>",
            "<p>You're a natural Spiarchitect! Your Scientists have finally finished adding the second Floor of your Spire, and the added height seems to be attracting even more enemies. Cool, more Runestones for you! You're starting to really like the idea of enemies constantly climbing to their demise in the teeth of your Traps.</p><p>While you're appreciating your deadly handiwork, a small group of Scientists runs up to you and shares some new research. They say that the Runestones can also be used to create mini-towers that broadcast their energy to all Trimps in the World. Wasting no time, they hand you the schematics for the Strength Tower, which increases the effect of all Fire Traps on its Floor, and grants all of your Trimps an attack bonus.</p><p class='spireQuest'>Continue placing more Traps and Towers to fill out your Spire, and raise your Threat level to 300.</p>",
            "<p>Beautiful. It seems like you're getting the hang of this!</p><p>You've finished constructing the third Floor of your Spire, but it seems as if you've used up your entire intial supply of Spirestones. You'll need to clear a Spire and crush its Core to earn more! Note that you'll find considerably better Cores worth more Spirestones from more difficult Spires.</p><p class='spireQuest'>Collect 20 Spirestones and raise your Spire's Threat to 400 to build your fourth Floor.</p>",
            "<p>It's getting huge! However, the Traps are getting more expensive as you place more and more of them. At this rate you'll never be able to afford enough Strength Towers to make a huge impact on your Trimps.</p><p>You consult with your Scientists, who tell you that they can create upgrades for your Traps, but that they need to study corpses of high level enemies in order to exploit their weaknesses.</p><p class='spireQuest'>Raise your Highest Zone Reached to Z230, and upgrade your Frost Trap.</p>",
            "<p>Wow, look at that thing slow!</p><p>You seem to have a pretty decent understanding of how to manage your Spire, and I believe you can handle it on your own for a while. Continue to raise your HZE to unlock more upgrades, collect Spirestones to add more Floors and enemies, and tweak your Trap layout every once in a while to make sure you're getting as many Runestones as you can, you'll definitely need them later.</p><p>Your Scientists let you know that they can possibly forge a new Trap and Tower, but they need to study a Core from a higher level Spire first.</p><p class='spireQuest'>Complete Spire II to unlock Poison Trap and Condenser Tower! Once you have your new Traps, raise your Spire's Threat to 600 and build your sixth Floor.<br/><br/>Remember that you have to satisfy both the Threat and Spirestone requirements to add a new Floor!</p>",
            "<p>You've got a new Trap and Tower, your Spire is still growing, and your power is growing with it! Your Trimps are slightly annoyed that they have to clean up the occasional Bad Guy that makes it through the Spire and into the town, but they can handle it. They all agree that life in general is just more fun when there's a giant Spire grinding Bad Guys at the entrance to their town.</p><p>While you're feeling comfortable maintaining your Spire's defenses with the tools you have, you still feel like there's something missing. Your Scientists say that they could perhaps create one more Trap and Tower, but again they'll need to study a Core from an even higher Spire.</p><p class='spireQuest'>Clear Spire III to unlock the Lightning Trap and Knowledge Tower, then raise your Spire's Threat to 1100 and build your eleventh Floor.</p>",
            "<p>And that's about all there is to teach you! The rest of the management of your Spire is left in your more-than-capable hands.</p><p>Raise your HZE, clear Spires, buy upgrades, build Floors, and come up with the perfect layout for your Spire.</p><p class='spireQuest'>I'll hang out and make sure everything's OK until you reach Threat level 1300 and build your thirteenth Floor, and then you'll be on your own.</p>"
        ];
        var text = (this.tutorialStep < 8) ? tutorialSteps[this.tutorialStep] : "";
        if (textOnly) return text;
        elem.innerHTML = text;
    },
    getSetTrapBgColor: function(cellNumber, elem){
        //Elem is optional, will set on the element instead of getting html
        var trap = this.layout[cellNumber].trap;
        var bgColor = trap.name ? playerSpireTraps[trap.name].color : "#000";
        var layout = this.layout;
        var dblPoisonColor = "";
        if (playerSpireTraps.Poison.level >= 3 && trap.name == "Poison"){
            var dblPoisonCount = 0;
            if (cellNumber > 0 && this.layout[cellNumber - 1].trap.name == "Poison") dblPoisonCount++;
            if (cellNumber + 1 < this.layout.length && this.layout[cellNumber + 1].trap.name == "Poison") dblPoisonCount++;
            var barColor = "#012b13";
            if (dblPoisonCount > 0){
                dblPoisonColor = "linear-gradient(" + barColor + " 20%, " + bgColor + " 20%";
                if (dblPoisonCount == 2) dblPoisonColor += ", " + bgColor + " 30%, " + barColor + " 30%, " + barColor + " 50%, " + bgColor + " 50%";
                dblPoisonColor += ")";
            }
        }
        var secondGradient = "";
        var lightStacks = (playerSpireTraps.Lightning.level >= 4) ? this.lightColumns[this.getColFromCell(cellNumber)] : 0;
        if (lightStacks && (trap.name == "Poison" || trap.name == "Fire")){
            var pct = (100 - (lightStacks * 2)) + "%";
            secondGradient = "linear-gradient(to right, rgba(0,0,0,0) " + pct + ", " + playerSpireTraps.Lightning.color + " " + pct + ")";
        }
        if ((!trap.name || trap.name == "Fire") && this.strengthLocations.indexOf(this.getRowFromCell(cellNumber)) != -1){
            var setting = (trap.name) ? "linear-gradient(#7F0505, #630202 75%, #684112 75%)" : "linear-gradient(#000 75%, #684112 75%)";
            if (secondGradient) setting = secondGradient + ", " + setting;
            if (elem) elem.style.backgroundImage = setting;
            else return "background-image: " + setting;
        }
        else if (playerSpireTraps.Frost.level >= 4 && (!trap.name || trap.name == "Poison") && layout.length > cellNumber + 1 && playerSpire.layout[cellNumber + 1].trap.name && playerSpire.layout[cellNumber + 1].trap.name == "Frost"){
            var setting = "linear-gradient(";
            if (dblPoisonColor) setting = dblPoisonColor.substring(0, dblPoisonColor.length - 1) + ", ";
            setting += bgColor + " 73%, " + playerSpireTraps.Frost.color + " 73%)";
            if (secondGradient) setting = secondGradient + ", " + setting;
            if (elem) elem.style.backgroundImage = setting;
            else return "background-image: " + setting;
        }
        else if (dblPoisonColor){
            if (secondGradient) dblPoisonColor = secondGradient + ", " + dblPoisonColor;
            if (elem) elem.style.backgroundImage = dblPoisonColor;
            else return "background-image: " + dblPoisonColor;
        }
        else if (secondGradient){
            secondGradient = secondGradient.replace("rgba(0,0,0,0)", bgColor);
            if (elem) elem.style.backgroundImage = secondGradient;
            else return "background-image: " + secondGradient;
        }
        else if (elem){
            elem.style.backgroundColor = bgColor;
            elem.style.backgroundImage = "none";
        }
        else return "background-color: " + bgColor;
    },
    getEnemyHtml: function(cellNumber){
        var cell = this.layout[cellNumber];
        var color = "";
        var iconColor = "#000";
        if (cell.occupiedBy.dead){
            color = "#350e0d";
        }
        else if (!cell.occupiedBy.name) return "";
        else {
            var healthPct = Math.ceil(cell.occupiedBy.health / cell.occupiedBy.maxHealth * 100);
            color = "#009681";
            iconColor = "#42f1d9";
            if (healthPct <= 20){
                color = "#541411";
                iconColor = "#ec352c";
            }
            else if (healthPct <= 50){
                color = "#861d18";
                iconColor = "#ff584f";
            }
            else if (healthPct < 75){
                color = "#b55b1b";
                iconColor = "#fb9b57"
            }
        }
        var cellHtml = "<span ";
        var cellClass = "playerSpireEnemy";
        if (cell.occupiedBy.slowedFor && this.settings.chillGradient){
            var pct = cell.occupiedBy.slowedFor * 10;
            var freezeColor = cell.occupiedBy.slowMod == 1 ? playerSpireTraps.Frost.color : playerSpireTraps.Knowledge.color;
            var gradient = freezeColor + " 0%, ";
            var lastPct = 0;
            if (pct > 100) pct = 100;
            var bars = Math.floor(pct / 10);
            var borderColor = cell.occupiedBy.slowMod == 1 ? "#0470CE" : "#7e4fd4";
            for (var x = 0; x < bars; x++){
                //if (x != 0) gradient += freezeColor + " " + lastPct + "%, ";
                lastPct += 10;
                gradient += borderColor + " " + (lastPct) + "%";
                if (x != 9) gradient += ", " + freezeColor + " " + (lastPct) + "%, "
            }
            if (bars != 10) gradient += color + " " + lastPct + "%";
            cellHtml += "style='background-image: linear-gradient(to right, " + gradient + ");";
        }
        else cellHtml += "style='background-color: " + color + ";";
        if (this.settings.shockEffect && cell.occupiedBy.shockTurns != null && cell.occupiedBy.shockTurns >= 0) cellClass += " shocked"
        var innerText = (cell.occupiedBy.dead) ? "<span class='icomoon icon-skeletor'></span>" : ((this.settings.percentHealth) ? prettify((cell.occupiedBy.health / cell.occupiedBy.maxHealth) * 100) + "%" : prettify(cell.occupiedBy.health));
        innerText = "<span class='playerSpireEnemyText'>" + innerText + "</span>";
        if (cell.occupiedBy.name && this.settings.enemyIcons){
            innerText += "<span class='icomoon icon-" + cell.occupiedBy.name + " spireUniqueIcon' style='color: " + iconColor + "'></span>"
        }
        cellHtml += "' class='" + cellClass + "'>" + innerText + "</span>";
        return cellHtml;

    },
    checkDragTraps: function(cell, event){
        if (event.buttons) this.buildTrap(cell);
    },
    drawSpireCell: function(cellNumber){
        if (!this.popupOpen) return;
        var elem = document.getElementById('playerSpireCell' + cellNumber);
        if (!elem) return;
        this.drawTrapIcon(cellNumber);
        this.getSetTrapBgColor(cellNumber, elem);
        this.drawEnemy(cellNumber);
    },
    getTrapIcon: function(cellNumber){
        var trap = this.layout[cellNumber].trap;
        if (!trap.name) return "";
        var trapIcon = "icomoon icon-" + playerSpireTraps[trap.name].icon;
        return "<span class='" + trapIcon + "'></span>";
    },
    drawTrapIcon: function(cellNumber){
        if (!this.settings.trapIcons) return;
        var elem = document.getElementById('spireTrapIcon' + cellNumber);
        if (!elem) return;
        elem.innerHTML = this.getTrapIcon(cellNumber);
    },
    drawEnemy: function(cellNumber){
        if (!this.popupOpen) return;
        var elem = document.getElementById('playerSpireCell' + cellNumber + 'enemy');
        if (!elem) return;
        elem.innerHTML = this.getEnemyHtml(cellNumber);
    },
    getThreatChange: function(isKill, enemy, location){
        var base = 2;
        if (!isKill){
            var healthPct = Math.ceil((enemy.health / enemy.maxHealth) / 0.15);
            base *= healthPct;
        }
        else{
            if (this.killedSinceLeak > 100) base *= 2;
            if (this.killedSinceLeak > 250) base *= 2;
            if (this.difficultyHidden > 300){
                var row = this.getRowFromCell(location);
                row = (this.rowsAllowed - row + 1) / this.rowsAllowed;
                base *= row;
            }
            else base *= 0.5;
        }
        var enemyMod = 1 / (this.currentEnemies / 5);
        if (enemyMod > 1) enemyMod = 1;
        base *= enemyMod;
        //console.log(((isKill) ? "kill" : "leak"), prettify(enemy.health / enemy.maxHealth * 100), location, base);
        return base;
    },
    enemyEscaped: function(enemy, location, catchingUp){
        this.currentEnemies--;
        this.updateEnemyCount();
        this.escapees++;
        this.killedSinceLeak = 0;
        
        if (enemy.toxicity > 0 && playerSpireTraps.Poison.level >= 6){
            var toxReward = enemy.toxicity * 0.1;
            toxReward = calcHeirloomBonus("Core", "runestones", toxReward);
            this.rewardRunestones(toxReward);
            if (!catchingUp && this.settings.fctRs)
                TDFloatingText.spawnFloatingText(location, playerSpireTraps.Poison.color, -0.05, 3.5, "+ " + prettify(toxReward) + " Rs");
        }
        this.difficultyHidden -= this.getThreatChange(false, enemy, location);
        if (this.difficultyHidden < 1) this.difficultyHidden = 1;
        if (this.difficultyHidden < this.difficulty)
            this.difficulty += ((this.difficultyHidden - this.difficulty) / 10);
        if (this.difficulty < 1) this.difficulty = 1;
        this.updateKills();
    },
    getRsReward: function(enemy, rsBonus){
        var reward = Math.ceil(enemy.maxHealth / 600);
        if (enemy.threat){
            reward += enemy.threat / 20;
            reward *= Math.pow(1.00116, enemy.threat);
        }
        if (rsBonus > 0){
            //Send rsBonus as the integer, EG 20 for 20%
            reward *= (1 + (rsBonus / 100));
        }
        if (enemy.slowTot && playerSpireTraps.Frost.level >= 5){
            var mult = playerSpireTraps.Frost.rsPerSlow();
            reward *= (1 + (enemy.slowTot * (mult / 100)))
        }
        return reward;
    },
    killedEnemy: function(enemy, location, rsBonus, catchingUp){
        this.killedSinceLeak++;
        var reward = this.getRsReward(enemy, rsBonus);
        reward = calcHeirloomBonus("Core", "runestones", reward);
        this.rewardRunestones(reward);
        this.layout[location].occupiedBy = {dead: true};
        this.currentEnemies--;
        this.updateEnemyCount();
        this.enemiesKilled++;
        game.stats.tdKills.value++;

        //Increase Threat
        this.difficultyHidden += this.getThreatChange(true, enemy, location);
        if (this.difficulty < this.difficultyHidden)
            this.difficulty += ((this.difficultyHidden - this.difficulty) / 10);

        if (this.difficulty > this.peakThreat) this.peakThreat = this.difficulty;
        
        this.updateKills();
        if (!catchingUp && this.settings.fctRs)
            TDFloatingText.spawnFloatingText(location, "black", -0.1, 7, "+ " + prettify(reward) + " Rs");
        this.checkRedrawUpgrades();
        this.checkUpdateTrapColors();
    },
    updateRunestones: function(){
        var elem = document.getElementById('playerSpireRunestones');
        if (elem)
            elem.innerHTML = prettify(this.runestones);
    },
    updateEnemyCount: function(){
        var elem1 = document.getElementById('playerSpireCurrentEnemies');
        if (elem1)
            elem1.textContent = this.currentEnemies;
        var elem2 = document.getElementById('playerSpireMaxEnemies');
        if (elem2)
            elem2.textContent = this.maxEnemies;
    },
    updateDifficultyMod: function(){
        var elem = document.getElementById('playerSpireDifficulty');
        if (elem)
            elem.textContent = this.getDifficultyHtml();
    },
    getDifficultyHtml: function() {
        var text = ((this.smallMode) ? "T: " : "Threat: ") + prettify(Math.floor(this.difficulty));
        var nextCost = (this.rowsAllowed < 20 && this.tutorialStep > 1) ? " / " + prettify(100 * (this.rowsAllowed + 1)) : "";
        return text + nextCost;
    },
    updateKills: function(){
        var elem1 = document.getElementById('playerSpireKilled');
        if (elem1)
            elem1.textContent = prettify(this.enemiesKilled);
        var elem2 = document.getElementById('playerSpireEscapees');
        if (elem2)
            elem2.textContent = prettify(this.escapees);
        var elem3 = document.getElementById('playerSpireKillPct');
        if (elem3)
            elem3.textContent = this.killPercent;
    },
    spawnEnemy: function(catchingUp){
        var health = this.getEnemyHealth();
        var icons = ["spades", "diamonds", "clubs", "heart"];
        var icon;
        if (this.nextIcon < icons.length) icon = icons[this.nextIcon];
        else icon = icons[0];
        this.nextIcon++;
        if (this.nextIcon >= icons.length) this.nextIcon = 0;
        this.layout[0].occupiedBy = {name: icon, maxHealth: health, health: health, toxicity: 0, threat: this.difficulty};
        this.currentEnemies++;
        var enemy = this.layout[0].occupiedBy;
        if (this.layout[0].trap.name) this.triggerTrap(this.layout[0].trap, enemy, 0);
        if (enemy.toxicity){
            enemy.health -= enemy.toxicity;
            if (!catchingUp && this.settings.fctPoison)
                TDFloatingText.spawnFloatingText(0, playerSpireTraps.Poison.color, -1.5, 45, prettify(enemy.toxicity));
        }
        if (enemy.health <= 0){
            this.killedEnemy(enemy, 0, 0, catchingUp);
        }   
        if (!catchingUp){
            this.updateEnemyCount();
            this.drawEnemy(0);
        }
    },
    getEnemyHealth: function() {
        var difficultyMod = this.difficultyMod;
        var scaledMod = Math.pow(1.012, difficultyMod);
        var health = 10 + (difficultyMod * 4) + scaledMod;
        var difPct = 0.00053 * this.difficulty;
        if (difPct > 0.85) difPct = 0.85;
        if (difPct < 0.15) difPct = 0.15;
        health = (health * (1 - difPct)) + (Math.random() * difPct * health);
        return Math.floor(health);
    },
    sellTrap: function(cell){
        cell = parseInt(cell, 10);
        var trapToSell = this.layout[cell].trap.name;
        if (trapToSell){
            var cost = this.getTrapCost(trapToSell, true);
            this.layout[cell].trap = {};
            this.runestones += cost;
            playerSpireTraps[trapToSell].owned--;
            if (trapToSell == "Strength"){
                this.removeStrength(cell);
                var row = this.getRowFromCell(cell);
                for (var x = (row * 5); x < ((row * 5) + 5); x++){
                    if (x !== cell)
                        this.drawSpireCell(x);
                }
            }
            if (trapToSell == "Lightning"){
                this.removeLightning(cell);
                this.redrawColumn(cell);
            }
            if (trapToSell == "Frost" && cell != 0){
                this.drawSpireCell(cell - 1);
            }
            if (trapToSell == "Poison"){
                if (cell != 0) this.drawSpireCell(cell - 1);
                if (cell != this.layout.length - 1) this.drawSpireCell(cell + 1);
            }
            this.drawSpireCell(cell);
            this.drawInfo();

        }
    },
    buildTrap: function(cell, forceTrap){
        var trap = this.selectedTrap;
        if (forceTrap != null) trap = forceTrap;
        if (trap == "shiftUp"){
            this.dontDraw = true;
            this.shiftUp(cell);
            this.dontDraw = false;
            this.drawSpire();
            return;
        }
        if (trap == "shiftDown"){
            this.dontDraw = true;
            this.shiftDown(cell);
            this.dontDraw = false;
            this.drawSpire();
            return;
        }
        cell = parseInt(cell, 10);
        var redrawSpire = false;
        var redrawCol = false;
        if (trap == "sell"){
            this.sellTrap(cell);
            return;
        }
        if (!trap) return;
        var oldTrap = this.layout[cell].trap.name;
        if (trap == oldTrap) return;
        if (playerSpireTraps[trap].isTower && playerSpireTraps[trap].owned >= 10) return;
        var cost = this.getTrapCost(trap);
        var refund = 0;
        if (oldTrap) refund = this.getTrapCost(oldTrap, true);
        if (this.runestones + refund < cost) return;
        if (trap == "Strength"){
            if (this.addStrength(cell) == -1) return;
            redrawSpire = true;
        }
        if (trap == "Lightning"){
            this.addLightning(cell);
            redrawCol = true;
        }
        if (oldTrap){
            playerSpireTraps[oldTrap].owned--;
            if (oldTrap == "Strength"){
                this.removeStrength(cell);
                redrawSpire = true;
            }
            if (oldTrap == "Lightning"){
                this.removeLightning(cell);
                redrawCol = true;
            }
        }
        playerSpireTraps[trap].owned++;
        this.runestones += refund - cost;
        this.layout[cell].trap = {name: trap};
        if (redrawSpire) this.drawSpire();
        else{
            if (redrawCol)
                this.redrawColumn(cell);
            else
                this.drawSpireCell(cell);

            if ((trap == "Frost" || oldTrap == "Frost") && cell != 0){
                this.drawSpireCell(cell - 1);
            }
            if ((trap == "Poison" || oldTrap == "Poison")){
                if (cell != 0) this.drawSpireCell(cell - 1);
                if (cell != this.layout.length - 1) this.drawSpireCell(cell + 1);
            }
        }
        this.drawInfo();
    },
    shiftUp: function(fromCell){
        fromCell = parseInt(fromCell, 10);
        if (fromCell + 1 >= this.layout.length || fromCell < 0) return;
        var startCell = this.layout.length - 1;
        for (var x = fromCell; x < this.layout.length; x++){
            if (!this.layout[x].trap.name){
                startCell = x;
                break;
            }
        }
        for (var x = startCell; x > fromCell; x--){
            var trap = this.layout[x].trap;
            if (x == this.layout.length - 1 && trap.name){
                this.sellTrap(x);
            }
            if (x > 0 && this.layout[x - 1].trap.name){
                var trapSave = this.layout[x - 1].trap.name;
                this.sellTrap(x - 1);
                this.buildTrap(x, trapSave);
            }
        }
    },
    shiftDown: function(fromCell){
        fromCell = parseInt(fromCell, 10);
        if (fromCell >= this.layout.length || fromCell < 0) return;
        var startCell = 0;
        for (var x = fromCell; x >= 0; x--){
            if (!this.layout[x].trap.name){
                startCell = x;
                break;
            }
        }
        for (var x = startCell; x <= fromCell - 1; x++){
            var trap = this.layout[x].trap;
            if (x == 0 && trap.name){
                this.sellTrap(x);
            }
            if (x < this.layout.length - 1 && this.layout[x + 1].trap.name){
                var trapSave = this.layout[x + 1].trap.name;
                this.sellTrap(x + 1);
                this.buildTrap(x, trapSave);
            }
        }
    },
    addStrength: function(cell){
        var row = this.getRowFromCell(cell);
        if (this.strengthLocations.indexOf(row) != -1){
            return -1;
        }
        this.strengthLocations.push(row);
    },
    removeStrength: function(cell){
        var row = this.getRowFromCell(cell);
        var index = this.strengthLocations.indexOf(row);
        this.strengthLocations.splice(index, 1);
    },
    addLightning: function(cell){
        var col = this.getColFromCell(cell);
        this.lightColumns[col]++;
    },
    removeLightning: function(cell){
        var col = this.getColFromCell(cell);
        if (this.lightColumns[col] > 0)
            this.lightColumns[col]--;
    },
    redrawColumn: function(cell){
        var col = this.getColFromCell(cell);
        for (var x = 0; x < this.rowsAllowed; x++){
            this.drawSpireCell((x * 5) + col);
        }
    },
    triggerTrap: function(trap, enemy, cellNumber, catchingUp){
        var trapConfig = playerSpireTraps[trap.name];
        if (!trapConfig.noDirectDamage){
            var trapDmg = playerSpireTraps[trap.name].totalDamage(enemy, cellNumber);
            enemy.health -= trapDmg;
            if (!catchingUp && this.settings.fctTrap)
                TDFloatingText.spawnFloatingText(cellNumber, trapConfig.color, -0.5, 25, prettify(trapDmg));
        }
        if (typeof trapConfig.extraEffect !== 'undefined') trapConfig.extraEffect(enemy, cellNumber)
        if (trap.name != "Lightning" && enemy.shockTurns >= 0) enemy.shockTurns--;
    },
    getTrapCost: function(trap, forRefund, levelOverride){
        var trapCfg = playerSpireTraps[trap];
        var level;
        if (levelOverride != null)
            level = levelOverride;
        else
            level = (forRefund) ? trapCfg.owned - 1 : trapCfg.owned;
        var amt = Math.floor(Math.pow(trapCfg.costIncrease, level) * trapCfg.baseCost);
        return amt;
    },
    getRowFromCell: function(cell){
        return Math.floor(cell / 5); 
    },
    getColFromCell: function(cell){
        return cell % 5;  
    },
    moveEnemies: function(catchingUp){
        if (this.sealed) return;
        if (this.paused) return;
        var layout = playerSpire.layout;
        var totalEnemies = 0;
        var cells = layout.length;
        if (!playerSpire.popupOpen) catchingUp = true;
        for (var x = cells - 1; x >= 0; x--){
            var drawCell = false;
            if (layout[x].occupiedBy.dead){
                drawCell = true;
                layout[x].occupiedBy = {};
            }
            if (layout[x].occupiedBy.name){
                totalEnemies++;
                var newLocation;
                var enemy = layout[x].occupiedBy;
                var slowed = false;
                if (enemy.slowedFor && enemy.slowedFor > 0){
                    if (enemy.canMoveIn > 0){
                        enemy.canMoveIn--;
                        slowed = true;
                    }
                    else if (x == cells - 1 || !layout[x + 1].occupiedBy.name){
                        enemy.canMoveIn = enemy.slowMod;
                        enemy.slowedFor--;
                    }
                }
                if (slowed && playerSpireTraps.Frost.level >= 5){
                    enemy.slowTot = (enemy.slowTot) ? enemy.slowTot + 1 : 1;
                }
                if (!slowed && x == cells - 1){
                    playerSpire.enemyEscaped(layout[x].occupiedBy, x, catchingUp);
                    layout[x].occupiedBy = {};
                    drawCell = true;
                }
                else{
                    if (!slowed && !layout[x + 1].occupiedBy.name){
                        layout[x + 1].occupiedBy = enemy;
                        layout[x].occupiedBy = {};
                        newLocation = x + 1;
                    }
                    else newLocation = x;
                    enemy = layout[newLocation].occupiedBy;
                    var trap = layout[newLocation].trap;
                    var rsBonus = 0;
                    if (trap.name){
                        playerSpire.triggerTrap(trap, enemy, newLocation, catchingUp);
                        if (trap.name == "Fire" && playerSpireTraps.Fire.level >= 4){
                            var healthPct = (enemy.health / enemy.maxHealth);
                            if (healthPct <= 0.2) enemy.health = 0;
                        }
                        if (trap.name == "Fire" && playerSpireTraps.Fire.level >= 7){
                            rsBonus = 20;
                        }
                    }
                    if (enemy.toxicity && enemy.health > 0){
                        enemy.health -= enemy.toxicity;
                        if (!catchingUp && this.settings.fctPoison)
                            TDFloatingText.spawnFloatingText(newLocation, playerSpireTraps.Poison.color, -1.5, 45, prettify(enemy.toxicity));
                    }
                    if (enemy.health <= 0) {
                        playerSpire.killedEnemy(enemy, newLocation, rsBonus, catchingUp)
                        totalEnemies--;
                    }
                    drawCell = true;
                    if (!catchingUp){
                        if (newLocation != x) playerSpire.drawEnemy(newLocation);
                    }
                }
            }
            if (drawCell && !catchingUp) playerSpire.drawEnemy(x);
        }
        playerSpire.currentEnemies = totalEnemies;
        if (totalEnemies < playerSpire.maxEnemies && playerSpire.ticksSinceLastEnemy > 1){
            playerSpire.spawnEnemy(catchingUp);
            playerSpire.ticksSinceLastEnemy = 0;
        }
        else playerSpire.ticksSinceLastEnemy++;
        if (!catchingUp)
            playerSpire.updateDifficultyMod();
        if (!catchingUp && playerSpire.wasCatchingUp) {
            playerSpire.drawSpire();
            playerSpire.drawInfo();
        }
        playerSpire.wasCatchingUp = catchingUp;
        playerSpire.curateAvgs();
        playerSpire.updateTutorial();
    },
    save: function(){
        var saveObject = {main: {}, traps: {}, settings: {}};
        saveObject.main.layout = this.layout;
        saveObject.main.rowsAllowed = this.rowsAllowed;
        saveObject.main.runestones = this.runestones;
        saveObject.main.spirestones = this.spirestones;
        saveObject.main.maxEnemies = this.maxEnemies;
        saveObject.main.currentEnemies = this.currentEnemies;
        saveObject.main.enemiesKilled = this.enemiesKilled;
        saveObject.main.escapees = this.escapees;
        saveObject.main.ticksSinceLastEnemy = this.ticksSinceLastEnemy;
        saveObject.main.smallMode = this.smallMode;
        saveObject.main.popupOpen = this.popupOpen;
        saveObject.main.strengthLocations = this.strengthLocations;
        saveObject.main.lightColumns = this.lightColumns;
        saveObject.main.initialized = this.initialized;
        saveObject.main.difficulty = this.difficulty;
        saveObject.main.tutorialStep = this.tutorialStep;
        saveObject.main.lootAvg = this.lootAvg;
        saveObject.main.killedSinceLeak = this.killedSinceLeak;
        saveObject.main.nextIcon = this.nextIcon;
        saveObject.main.spentOnUpgrades = this.spentOnUpgrades;
        saveObject.main.savedLayout1 = this.savedLayout1;
        saveObject.main.savedLayout2 = this.savedLayout2;
        saveObject.main.layout1Note = this.layout1Note;
        saveObject.main.layout2Note = this.layout2Note;
        saveObject.main.spirestones = this.spirestones;
        saveObject.main.difficultyHidden = this.difficultyHidden;
        saveObject.main.peakThreat = this.peakThreat;
        saveObject.main.paused = this.paused;
        saveObject.main.sealed = this.sealed;
        saveObject.settings = this.settings;

        for (var item in playerSpireTraps){
            saveObject.traps[item] = {
                owned: playerSpireTraps[item].owned,
                level: playerSpireTraps[item].level,
                locked: playerSpireTraps[item].locked
            };
        }
        return saveObject;
    },
    load: function(saveObj){
        if (!saveObj.main.initialized) {
            return;
        }
        for (var item in saveObj.main){
            if (typeof this[item] === 'undefined') continue;
            this[item] = saveObj.main[item];
        }
        for (var item in saveObj.settings){
            if (typeof this.settings[item] === 'undefined') continue;
            this.settings[item] = saveObj.settings[item];
        }
        for (var item in saveObj.traps){
            if (typeof saveObj.traps[item].owned === 'undefined') continue;
            playerSpireTraps[item].owned = saveObj.traps[item].owned;
            playerSpireTraps[item].level = saveObj.traps[item].level;
            playerSpireTraps[item].locked = saveObj.traps[item].locked;
        }
        if (this.smallMode && ((this.canSeal() && !this.sealed) || this.sealed)) this.smallMode = false;
        if (this.popupOpen)
            this.openPopup();
        else this.closePopup();
        if (this.smallMode)
            this.shrink();
        else this.enlarge();
        if (this.difficultyHidden == 1) this.difficultyHidden = this.difficulty;
        this.drawSpire();
        this.drawInfo();
        this.initalized = true;
        if (!this.sealed) document.getElementById('playerSpireTab').style.display = 'table-cell';
        else document.getElementById('playerSpireTab').style.display = 'none';
        this.updateTabColor();
    }

}

var playerSpireTraps = {
    Fire: {
        color: "#7F0505",
        baseCost: 100,
        costIncrease: 1.5,
        icon: "fire",
        upgrades: [
            {   //level 2
                description: "All Fire Traps gain <b>10x</b> damage.", //500 
                unlockAt: 250,
                cost: 5e4
            },
            {
                //level 3
                description: "All Fire Traps gain <b>5x</b> damage.", //2500
                unlockAt: 300,
                cost: 5e6
            },
            {
                //level 4
                description: "<b>Double</b> the damage of all Fire Traps, and all Fire Traps will instantly kill any enemy that has 20% or less health.", //5000
                unlockAt: 375,
                cost: 2.5e7
            },
            {
                //level 5
                description: "<b>Double</b> the damage of all Fire Traps.",
                unlockAt: 425,
                cost: 7.5e7
            },
            {
                //level 6
                description: "<b>Dectuple</b> the damage of all Fire Traps.", //50k
                unlockAt: 500,
                cost: 5e9
            },
            {
                //level 7
                description: "<b>Dectuple</b> the damage of all Fire Traps once more, and all enemies drop 20% extra Runestones when they die on a Fire Trap.", //500k
                unlockAt: 590,
                cost: 5e11
            },
            {
                //level 8
                description: "All Fire Traps gain <b>100x</b> damage.", //5m
                unlockAt: 650,
                cost: 1e14
            }

        ],
        level: 1,
        locked: false,
        damage: 50,
        owned: 0,
        get description(){
            var desc = "Deals " + prettify(this.totalDamage()) + " damage when stepped on.";
            if (this.level >= 4) desc += "<br/><br/>If an enemy with 20% health or less steps on a Fire Trap, it dies instantly.";
            if (this.level >= 7) desc += "<br/><br/>All Fire Traps grant 20% extra Runestones when they get the killing blow on an enemy.";
            desc += "<br/><br/>(Hotkey 1)";
            return desc;
        },
        totalDamage: function (enemy, cell){
            var effect = (enemy && enemy.shockTurns && enemy.shockTurns > 0) ? playerSpireTraps.Lightning.shockedDamage() : 0;
            var level = this.level;
            var dmgs = [50, 500, 2500, 5e3, 10e3, 10e4, 10e5, 10e7];
            var dmg;
            if (level > dmgs.length)
                dmg = dmgs[dmgs.length - 1];
            else
                dmg = dmgs[this.level - 1];
            var row = playerSpire.getRowFromCell(cell);
            if (playerSpire.strengthLocations.indexOf(row) != -1) dmg = calcHeirloomBonus("Core", "strengthEffect", (dmg * 2));
            if (playerSpireTraps.Frost.level >= 3 && enemy && enemy.slowedFor && enemy.slowMod == 1){
                dmg *= 1.25;
            }
            if (effect > 0) dmg *= effect;
            dmg *= playerSpireTraps.Lightning.getColBonus(cell);
            dmg = calcHeirloomBonus("Core", "fireTrap", dmg);
            return dmg;
        },
    },
    Frost: {
        color: "#02437C",
        baseCost: 100,
        costIncrease: 5,
        icon: "snow",
        upgrades: [
            {
                //level 2
                description: "Multiply Frost Trap damage <b>by 5</b>, and increase the duration of Chilled by 1 cell.",
                unlockAt: 230,
                cost: 1e4
            },
            {
                //level 3
                description: "Multiply Frost Trap damage <b>by 10</b>. Chilled enemies now take 25% more damage from Fire Traps.",
                unlockAt: 275,
                cost: 5e5
            },
            {
                //level 4
                description: "Multiply Frost Trap damage <b>by 5</b>. If there is a Poison Trap directly before a Frost Trap, that Poison Trap becomes 4x as effective.",
                unlockAt: 330,
                cost: 2.5e6
            },
            {
                //level 5
                description: "Multiply Frost Trap damage <b>by 2</b>, and each time an enemy can't move because it is slowed, that enemy becomes worth 2% more Runestones. This effect stacks additively.",
                unlockAt: 430,
                cost: 1e8
            },
            {
                //level 6
                description: "Multiply Frost Trap damage <b>by 5</b>, and increase the duration of Chilled by 1 cell.",
                unlockAt: 530,
                cost: 5e10,
            },
            {
                //level 7
                description: "Multiply Frost Trap damage <b>by 2</b>, and each time an enemy can't move because it is slowed, that enemy becomes worth +2% more Runestones. This effect stacks additively.",
                unlockAt: 630,
                cost: 5e13
            },
            {
                //level 8
                description: "Multiply Frost Trap damage <b>by 2</b>, and each time an enemy can't move because it is slowed, that enemy becomes worth +2% more Runestones. This effect stacks additively.",
                unlockAt: 730,
                cost: 1e18
            }
        ],
        level: 1,
        locked: false,
        owned: 0,
        damage: 10,
        get description() {
            var desc = "Deals " + prettify(this.totalDamage()) + " damage when stepped on, and causes the target to become Chilled, slowing movement to 50% speed for " + this.slowTurns() + " moves. This speed reduction causes the target to stay on each Trap for twice as long, triggering each Trap twice. Note that Frost Traps are coated with antifreeze, preventing chill effects from working while an enemy is standing on a Frost Trap."
            if (this.level >= 3) desc += "<br/><br/>Enemies chilled by Frost Traps take 25% extra damage from Fire Traps."
            if (this.level >= 4) desc += "<br/><br/>Any Poison Traps placed directly before a Frost Trap become 4x as effective.";
            if (this.level >= 5) desc += "<br/><br/>Each time an enemy can't move because it's slowed (from Chilled or Frozen), it becomes worth " + this.rsPerSlow() + "% more Runestones. This effect stacks additively."
            desc += "<br/><br/>(Hotkey 2)";
            return desc;
        },
        rsPerSlow: function(){
            if (this.level < 5) return 0;
            if (this.level == 7) return 4;
            if (this.level == 8) return 6;
            return 2;
        },
        slowTurns: function(){
            if (this.level < 2) return 3;
            if (this.level < 6) return 4;
            return 5;
        },
        totalDamage: function (enemy){
            var effect = (enemy && enemy.shockTurns && enemy.shockTurns > 0) ? playerSpireTraps.Lightning.shockedDamage() : 0;
            var level = this.level;
            var dmgs = [10, 50, 500, 2500, 5000, 25000, 50000, 100000];
            var dmg;
            if (level > dmgs.length)
                dmg = dmgs[dmgs.length - 1];
            else
                dmg = dmgs[this.level - 1];
            if (effect) dmg *= effect;
            return dmg;
        },
        extraEffect: function (enemy){
            var slowTurns = this.slowTurns();
            var effect = (enemy && enemy.shockTurns && enemy.shockTurns > 0) ? playerSpireTraps.Lightning.shockedEffect() : 0;
            if (effect > 0) slowTurns *= effect;
            slowTurns++; //to make up for stuff
            enemy.slowedFor = slowTurns;
            enemy.canMoveIn = 0;
            enemy.slowMod = 1;
        }
    },
    Poison: {
        color: "#008238",
        baseCost: 500,
        locked: true,
        costIncrease: 1.75,
        icon: "flask",
        upgrades: [
            {
                //Level 2
                description: "<b>Double</b> the amount of Toxicity added when an enemy steps on any Poison Trap.",
                unlockAt: 350,
                cost: 1e7
            },
            {
                //level 3
                description: "If there is a Poison Trap either directly before or after another Poison Trap, both Traps gain 3x damage. If a Poison Trap has Poison Traps on both sides of itself, it gains 9x damage instead.",
                unlockAt: 400,
                cost: 5e7
            },
            {
                //Level 4
                description: "<b>Double</b> the amount of Toxicity added when an enemy steps on any Poison Trap.",
                unlockAt: 450,
                cost: 7.5e8
            },
            {
                //Level 5
                description: "<b>Double</b> the amount of Toxicity added when an enemy steps on any Poison Trap. In addition, if the enemy has 75% or less health remaining, the final amount of Toxicity added is multiplied by 5.",
                unlockAt: 550,
                cost: 1e11
            },
            {
                //Level 6
                description: "<b>Double</b> the amount of Toxicity added when an enemy steps on any Poison Trap. In addition, if an enemy leaks, gain 10% of its total Toxicity as Runestones.",
                unlockAt: 600,
                cost: 1e12
            },
            {
                //Level 7
                description: "<b>Double</b> the amount of Toxicity added when an enemy steps on any Poison Trap.",
                unlockAt: 625,
                cost: 4e13
            },
            {
                //Level 8
                description: "<b>Triple</b> the amount of Toxicity added when an enemy steps on any Poison Trap.",
                unlockAt: 700,
                cost: 1e16
            },
            {
                //Level 9
                description: "<b>Quadruple</b> the amount of Toxicity added when an enemy steps on any Poison Trap.",
                unlockAt: 750,
                cost: 5e19
            }
        ],
        damage: 5,
        owned: 0,
        level: 1,
        noDirectDamage: true,
        get description() {
            var desc = "Adds " + prettify(this.totalDamage()) + " Toxicity when stepped on. Target will take damage equal to its total Toxicity each time it attempts to move.";
            if (this.level >= 3) desc += "<br/><br/>If a Poison Trap is placed directly next to another Poison Trap, both Traps gain 3x damage. If a Poison Trap has other Poison Traps on both sides of itself, it gains 9x damage instead."
            if (this.level >= 5) desc += "<br/><br/>If the enemy has 75% or less health remaining, " + prettify(this.totalDamage() * 5) + " Toxicity is added instead.";
            if (this.level >= 6) desc += "<br/><br/>If an enemy leaks, gain 10% of its total Toxicity as Runestones.";
            desc += "<br/><br/>(Hotkey 3)";
            return desc;
        },
        totalDamage: function (enemy, cell){
            var level = this.level;
            var dmgs = [5, 10, 10, 20, 40, 80, 160, 480, 1920];
            var dmg;
            if (level > dmgs.length)
                dmg = dmgs[dmgs.length - 1];
            else
                dmg = dmgs[this.level - 1];
            var effect = (enemy && enemy.shockTurns && enemy.shockTurns > 0) ? playerSpireTraps.Lightning.shockedDamage() : 0;
            if (effect > 0) dmg *= effect;
            if (cell != null && playerSpireTraps.Frost.level >= 4 && playerSpire.layout.length > cell + 1 && playerSpire.layout[cell + 1].trap.name && playerSpire.layout[cell + 1].trap.name == "Frost"){
                dmg *= 4;
            }
            if (this.level >= 3 && cell != null){
                var count = 0;
                if (cell > 0 && playerSpire.layout[cell - 1].trap.name == "Poison") count++;
                if (cell + 1 < playerSpire.layout.length && playerSpire.layout[cell + 1].trap.name == "Poison") count++;
                if (count == 1) dmg *= 3;
                if (count == 2) dmg *= 9;
            }
            if (this.level >= 5 && cell != null){
                var enemy = playerSpire.layout[cell].occupiedBy;
                if (enemy.name){
                    if ((enemy.health / enemy.maxHealth) <= 0.75){
                        dmg *= 5;
                    }
                }
            }
            dmg *= playerSpireTraps.Lightning.getColBonus(cell);
            dmg = calcHeirloomBonus("Core", "poisonTrap", dmg);
            return dmg;
        },
        extraEffect: function (enemy, cell){
            var dmg = this.totalDamage(enemy, cell);
            enemy.toxicity += dmg;
        }

    },
    Lightning: {
        color: "#a27d02",
        baseCost: 1000,
        locked: true,
        costIncrease: 3,
        icon: "bolt",
        getColBonus: function(cell){
            if (cell == null) return 1;
            if (this.level < 4) return 1;
            var col = playerSpire.getColFromCell(cell);
            var traps = playerSpire.lightColumns[col];
            return 1 + calcHeirloomBonus("Core", "lightningTrap", (traps * 0.1));
        },
        upgrades: [
            {
                //Level 2
                description: "Lightning Trap gains <b>10x</b> damage, and Lightning Trap now adds <b>2</b> stacks of Shocked.",
                unlockAt: 440,
                cost: 5e8
            },
            {
                //Level 3
                description: "Lightning Trap gains <b>10x</b> damage, and Shocked now causes the target to take 4x damage and Toxicity from Traps. Towers and slows are not boosted by this extra damage.",
                unlockAt: 500,
                cost: 5e9
            },
            {
                //Level 4
                description: "Lightning Trap increases the damage and effect of Fire and Poison Traps in its column by 10%, stacking additively with other Lightning Traps in the column.",
                unlockAt: 575,
                cost: 2.5e11
            },
            {
                //Level 5
                description: "Lightning Trap gains <b>10x</b> damage, and Lightning Trap now adds <b>3</b> stacks of Shocked.",
                unlockAt: 600,
                cost: 1e12
            },
            {
                //Level 6
                description: "Lightning Trap gains <b>10x</b> damage, and Shocked now causes the target to take 8x damage and Toxicity from Traps. Towers and slows are not boosted by this extra damage.",
                unlockAt: 675,
                cost: 1e15
            }
        ],
        damage: 50,
        level: 1,
        owned: 0,
        damageMod: 2,
        effectMod: 2,
        turns: 1,
        get description(){
            var shockTurns = this.shockTurns();
            var text = "Deals " + prettify(this.totalDamage()) + " damage when stepped on, and afflicts the target with " + shockTurns + " stack" + needAnS(shockTurns) + " of Shocked. 1 stack of Shocked is consumed each time an enemy steps on a Trap or Tower, causing that Bad Guy to take " + prettify(this.shockedDamage()) + "x damage and " + prettify(this.shockedEffect()) + "x effect from the Trap or Tower that consumed the stack of Shocked. Shocked can boost the damage but not the effect of other Lightning Traps."
            if (this.level >= 4) text += "<br/><br/>Each Lightning Trap increases the damage and effect of Fire and Poison Traps in its column by " + prettify(calcHeirloomBonus("Core", "lightningTrap", 10)) + "%, stacking additively.";
            text += "<br/><br/>(Hotkey 4)";
            return text;
        },
        shockedDamage: function(){
            var dmg = this.damageMod;
            if (this.level >= 3) dmg *= 2;
            if (this.level >= 6) dmg *= 2;
            dmg = calcHeirloomBonus("Core", "lightningTrap", dmg);
            return dmg;
        },
        shockedEffect: function(){
            return this.effectMod;
        },
        shockTurns: function(){
            var turns = this.turns;
            if (this.level >= 2) turns++;
            if (this.level >= 5) turns++;
            return turns;
        },
        totalDamage: function (enemy){
            var effect = (enemy && enemy.shockTurns && enemy.shockTurns > 0) ? playerSpireTraps.Lightning.shockedDamage() : 0;
            var level = this.level;
            var dmgs = [50, 500, 5000, 5000, 5e4, 5e5];
            var dmg;
            if (level > dmgs.length)
                dmg = dmgs[dmgs.length - 1];
            else
                dmg = dmgs[this.level - 1];
            if (effect) dmg *= effect;
            dmg = calcHeirloomBonus("Core", "lightningTrap", dmg);
            return dmg;
        },
        extraEffect: function (enemy){
            enemy.shockTurns = this.shockTurns();
        }
    },
    //Towers
    Strength: {
        color: "#684112",
        isTower: true,
        locked: true,
        baseCost: 3000,
        costIncrease: 100,
        icon: "gavel",
        upgrades: [
            {   //level 2
                description: "Each Strength Tower grants an additional 15% attack to your Trimps.", //500 
                unlockAt: -1,
                cost: 1e6
            },
            {
                //level 3
                description: "Each Strength Tower grants an additional 15% attack to your Trimps.", //5000
                unlockAt: -1,
                cost: 1e10
            },
            {
                //level 4
                description: "Each Strength Tower grants an additional 15% attack to your Trimps.", //50000
                unlockAt: -1,
                cost: 1e14
            },
            {
                //level 5
                description: "Each Strength Tower grants an additional 15% attack to your Trimps.", //500000
                unlockAt: -1,
                cost: 1e18
            },
        ],
        totalDamage: function (enemy, cell){
            var effect = (enemy && enemy.shockTurns && enemy.shockTurns > 0) ? playerSpireTraps.Lightning.shockedDamage() : 0;
            var row = playerSpire.getRowFromCell(cell);
            var startCell = row * 5;
            var dmg = 0;
            for (var x = startCell; x < startCell + 5; x++){
                if (playerSpire.layout.length <= x) continue;
                if (playerSpire.layout[x].trap.name == "Fire") dmg += playerSpireTraps.Fire.totalDamage(null, x);
            }
            if (playerSpireTraps.Frost.level >= 3 && enemy && enemy.slowedFor && enemy.slowMod == 1){
                dmg *= 1.25;
            }
            if (effect > 0) dmg *= effect;
            return dmg;
        },
        getWorldBonus: function(singleOnly){
            var mod = 30;
            if (this.level > 1) mod += ((this.level - 1) * 15);
            if (singleOnly) return mod;
            return (mod * this.owned);
        },
        damage: 0,
        level: 1,
        owned: 0,
        get description(){
            return "Increases the damage of all Fire Traps on the same Floor as a Strength Tower by " + prettify(calcHeirloomBonus("Core", "strengthEffect", 100)) + "%, and when stepped on deals damage equal to the combined damage of all Fire Traps on its Floor (max of 1 Strength Tower per Floor). In addition, this Tower increases the attack of your Trimps in Maps and the World by " + prettify(this.getWorldBonus(true)) + "% (additive with other Strength Towers).<br/><br/>Your Strength Towers are currently granting a total of <b>" + prettify(this.getWorldBonus()) + "%</b> attack to your Trimps.<br/><br/>(Hotkey 5)";
        }
    },
    Condenser: {
        color: "#262925",
        isTower: true,
        locked: true,
        baseCost: 6000,
        costIncrease: 100,
        icon: "funnel",
        upgrades: [
            {   //level 2
                get description(){ return "Each Condenser Tower grants an additional 5% " + heliumOrRadon() + " earned from all sources.";}, //500 
                unlockAt: -1,
                cost: 2e6
            },
            {
                //level 3
                get description(){ return "Each Condenser Tower grants an additional 5% " + heliumOrRadon() + " earned from all sources.";}, //5000
                unlockAt: -1,
                cost: 2e10
            },
            {
                //level 4
                get description(){ return "Each Condenser Tower grants an additional 5% " + heliumOrRadon() + " earned from all sources.";}, //50000
                unlockAt: -1,
                cost: 2e14
            },
            {
                //level 5
                get description(){ return "Each Condenser Tower grants an additional 5% " + heliumOrRadon() + " earned from all sources.";}, //500000
                unlockAt: -1,
                cost: 2e18
            },
        ],
        damage: 0,
        level: 1,
        owned: 0,
        getWorldBonus: function(singleOnly){
            var mod = 10;
            if (this.level > 1) mod += ((this.level - 1) * 5);
            if (singleOnly) return mod;
            return (mod * this.owned);
        },
        noDirectDamage: true,
        get description(){
            return "When stepped on, increases the target's Toxicity by  " + prettify(calcHeirloomBonus("Core", "condenserEffect", 25)) + "%. In addition, each Condenser Tower increases all " + heliumOrRadon() + " found by " + prettify(this.getWorldBonus(true)) + "% (additive with other Condenser Towers).<br/><br/>Your Condenser Towers are currently granting a total of <b>" + prettify(this.getWorldBonus()) + "%</b> additional " + heliumOrRadon() + " from all sources.<br/><br/>(Hotkey 6)";
        },
        extraEffect: function(enemy, cell){
            var effect = (enemy && enemy.shockTurns && enemy.shockTurns > 0) ? playerSpireTraps.Lightning.shockedEffect() : 1;
            var baseEffect = 0.25;
            baseEffect = calcHeirloomBonus("Core", "condenserEffect", baseEffect);
            var boost = (1 + (baseEffect * effect));
            if (enemy.toxicity) enemy.toxicity *= boost;
        },
    },
    Knowledge: {
        color: "#2b115b",
        isTower: true,
        locked: true,
        baseCost: 9000,
        costIncrease: 100,
        icon: "book2",
        upgrades: [
            {   //level 2
                get description(){ return "Each Knowledge Tower grants an additional 7.5% " + Fluffy.getName() + " Exp earned from all sources.";}, //500 
                unlockAt: -1,
                cost: 3e6
            },
            {
                //level 3
                get description(){ return "Each Knowledge Tower grants an additional 7.5% " + Fluffy.getName() + " Exp  earned from all sources.";}, //5000
                unlockAt: -1,
                cost: 3e10
            },
            {
                //level 4
                get description(){ return "Each Knowledge Tower grants an additional 7.5% " + Fluffy.getName() + " Exp earned from all sources.";}, //50000
                unlockAt: -1,
                cost: 3e14
            },
            {
                //level 4
                get description(){ return "Each Knowledge Tower grants an additional 7.5% " + Fluffy.getName() + " Exp earned from all sources.";}, //50000
                unlockAt: -1,
                cost: 3e18
            }
        ],
        damage: 0,
        level: 1,
        owned: 0,
        getWorldBonus: function(singleOnly){
            var mod = 15;
            if (this.level > 1) mod += ((this.level - 1) * 7.5);
            if (singleOnly) return mod;
            return (mod * this.owned);
        },
        noDirectDamage: true,
        get description(){
            return "When stepped on by a Chilled enemy, Chilled becomes Frozen, slowing the target to 33% speed for 5 moves. In addition, each Knowledge Tower increases " + Fluffy.getName() + "'s Experience gain by " + prettify(this.getWorldBonus(true)) + "% (additive with other Knowledge Towers). Note that Knowledge Towers are coated with antifreeze, preventing chill effects from working until the enemy steps off of this Tower.<br/><br/>Your Knowledge Towers are currently granting a total of <b>" + prettify(this.getWorldBonus()) + "%</b> additional " + Fluffy.getName() + " Exp.<br/><br/>(Hotkey 7)";
        },
        totalDamage: function (enemy){
            var level = this.level;
            var effect = (enemy && enemy.shockTurns && enemy.shockTurns > 0) ? playerSpireTraps.Lightning.shockedDamage() : 0;
            var dmg = this.damage + ((level - 1) * 10);
            if (effect > 0) dmg *= effect;
            return dmg;
        },
        extraEffect: function(enemy){
            var effect = (enemy && enemy.shockTurns && enemy.shockTurns > 0) ? playerSpireTraps.Lightning.shockedEffect() : 0;
            if (enemy.slowedFor && enemy.slowMod == 1){
                var slowTurns = 5;
                if (effect) slowTurns *= effect;
                slowTurns++;
                enemy.slowedFor = slowTurns;
                enemy.canMoveIn = 0;
                enemy.slowMod = 2;
            }
        }
    }
}

var TDFloatingText = (function(floatingCombatText) {
    //Floating combat text brought to you by your friendly neighborhood Grabarz
    var frameTime = 30;
    var elements = [];
    var interval = null;
 
    setFrameTime(frameTime);
    function setFrameTime(ft) {
        clearInterval(interval);
        interval = setInterval(update, ft);
        frameTime = ft;
    }
   
    function spawnFloatingText(cellNumber, color, speed, distance, text) {
        if (playerSpire.wasCatchingUp) return;
        var maxRows = 20;
        var maxCols = 5;
        var row = (playerSpire.rowsAllowed - Math.floor(cellNumber / 5)) - 1;
        var col = (cellNumber % 5);
        var elem = document.createElement("div");
        elem.className = "playerSpireCell floatingCombatText";
       
        elem.textContent = text;
        elem.style.position = "absolute";
        elem.style.color = color;
        elem.style.border = "none";
       
        var cellWidth = 1 / maxCols;
        var cellHeight = 1 / maxRows;
       
        var x = cellWidth * col;
        var y = cellHeight * row;

        if (playerSpire.settings.fctStatic){
            if (color == "black"){ 
                y += 0.02;
                distance = 5;
            }
            else if (playerSpireTraps.Poison.owned){
                if (color == playerSpireTraps.Poison.color){
                    if (speed == -0.05){ //Poison leak
                        y += 0.04;
                    }
                    else {
                        if (playerSpire.settings.fctTrap)
                        x -= 0.05;
                        speed = -0.5;
                        distance = 25;
                    }
                }
                else if (playerSpire.settings.fctPoison) x += 0.05;
            }
            y -= (0.001 * row);
        }
               
        elem.style.left = (x * 100) + "%";
        elem.style.top = (y * 100) + "%";
       
        floatingCombatText.appendChild(elem);
       
        elements.push({
            elem: elem,
            row: row,
            col: col,
            speed: speed,
            distanceLeft: distance,
            posY: 0
        });
    }
   
    function update() {
        var i;
        for(i = 0; i < elements.length; i++) {
            var element = elements[i];
            var speed = element.speed * (frameTime / 20);
           
            element.distanceLeft -= Math.abs(speed);
            if(element.distanceLeft <= 0) {
                elements.splice(i, 1);
                i--;
                floatingCombatText.removeChild(element.elem);
                continue;
            }
            if (!playerSpire.settings.fctStatic){
                element.posY += speed;
                element.elem.style.transform = "translateY(" + element.posY + "px)";
            }
        }
    }
   
    return {
        spawnFloatingText: spawnFloatingText,
        update: update,
        setFrameTime: setFrameTime
    }
})(document.getElementById("floatingCombatText"));