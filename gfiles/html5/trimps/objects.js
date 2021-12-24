var holidayObj = {
    holiday: "",
    lastCheck: null,
    holidays: {
        Eggy: {
            check: function(day, month){
                if (month == 3) return true;
            }
        },
        Pumpkimp: {
            check: function(day, month){
                if (month == 9 || (month == 10 && day <= 5)) return true;
            }
        },
        Snowy: {
            check: function(day, month){
                if ((month == 11 && day >= 15) || (month == 0 && day <= 15)) return true;
            }
        }
    },
    checkActive: function(name){
        return (this.holiday == name);
    },
    checkAll: function(){
        var date = new Date();
        if (this.lastCheck != null && ((date.getTime() - this.lastCheck.getTime()) < 120000)) return;
        this.lastCheck = date;
        var day = date.getUTCDate();
        var month = date.getUTCMonth();
        for (var holiday in this.holidays){
            if (this.holidays[holiday].check(day, month)){
                if (!this.holiday){
                    message("Loaded " + holiday + " event!", "Notices");
                }
                this.holiday = holiday;
                return;
            }
        }
        if (this.holiday){
            message(this.holiday + " event has come to an end!", "Notices");
        }
        this.holiday = "";
        return;
    }
}

var alchObj = {
    tab: document.getElementById('alchemyTab'),
    load: function(){
        if (game.global.potionData != null) this.potionsOwned = game.global.potionData;
        else {
            for (var x = 0; x < this.potionsOwned.length; x++){
                this.potionsOwned[x] = 0;
                this.potionAuto[x] = 0;
            }
        }
        if (game.global.potionAuto != null) this.potionAuto = game.global.potionAuto;
        if (this.potionsOwned.length < this.potionNames.length){
            var need = this.potionNames.length - this.potionsOwned.length;
            for (var x = 0; x < need; x++){
                this.potionsOwned.push(0);
                this.potionAuto.push(0);
            }
        }
        this.tab.style.display = (game.global.alchemyUnlocked || game.global.challengeActive == "Alchemy") ? 'table-cell' : 'none';
        this.unlock();
    },
    rewards: {
        Metal: "Potatoes",
        Wood: "Mushrooms",
        Food: "Seaweed",
        Gems: "Firebloom",
        Any: "Berries",
    },
    potionNames: ["Herby Brew", "Gaseous Brew", "Potion of Finding", "Potion of the Void", "Potion of Strength", "Elixir of Crafting", "Elixir of Finding", "Elixir of Accuracy"],
    potionsOwned: [0,0,0,0,0,0,0,0],
    potionAuto: [0,0,0,0,0,0,0,0],
    getRunetrinketMult: function(chance){
        var notFind = 100 - chance;
        notFind *= Math.pow(0.99, this.potionsOwned[2]);
        return (100 - notFind);
    },
    getRunetrinketBonusAmt: function(){
        var world = (game.global.world < 101) ? 101 : game.global.world;
        var orig = game.portal.Observation.getDropChance(world);
        var newMult = game.portal.Observation.getDropChance(world, true);
        return orig - newMult;
    },
    potions: [
        {
            challenge: true,
            cost: [["Potatoes",5,10]],
            description: "Increases all Herbs found by 100% (compounding). <span class='red'>Increases Enemy Attack/Health by 75% (compounding)</span>",
            effectText: "+#% Herbs found",
            enemyMult: 1.75,
            effectComp: 2,
        },
        {
            challenge: true,
            cost: [["Mushrooms",5,5]],
            description: "Increases all Radon gained by 10% (compounding). <span class='red'>Increases Enemy Attack/Health by 30% (compounding)</span>",
            effectText: "+#% Radon",
            enemyMult: 1.3,
            effectComp: 1.10,
        },
        {
            challenge: true,
            cost: [["Seaweed",5,4]],
            description: "Increases all non-radon resources earned by 25% additively. Reduces chance to not find a Runetrinket by 1% (compounding). <span class='red'>Increases the cost of all other Potions by 50% (compounding)</span>",
            effectText: "+#% res",
            effect: 0.25,
        },

        {
            challenge: true,
            cost: [["Firebloom",5,4]],
            description: "Nullifies 5% (compounding) of increased enemy stats from Potions while in Void Maps. <span class='red'>Increases the cost of all other Potions by 50% (compounding)</span>",
            effectText: "#% nullified void stats",
            effectComp: 0.95,
            inverseComp: true
        },
        {
            challenge: true,
            cost: [["Berries",5,4]],
            description: "Increases Trimp Attack/Health by 15% additively. <span class='red'>Increases the cost of all other Potions by 50% (compounding)</span>",
            effectText: "+#% Stats",
            effect: 0.15,
        },
        {
            challenge: false,
            cost: [["Potatoes",2000,4],["Berries",1000,4],["Seaweed",1000,4]],
            description: "Increases all housing by 5% (compounding).",
            effectText: "+#% housing",
            effectComp: 1.05,
        },
        {
            challenge: false,
            cost: [["Mushrooms",10000,4],["Potatoes",3000,4]],
            description: "Increases all non-radon resources by 5% (compounding).",
            effectText: "+#% resources",
            effectComp: 1.05,
        },
        {
            challenge: false,
            cost: [["Firebloom",7000,4],["Seaweed",3000,4]],
            description: "Increases Crit Damage by 25%.",
            effectText: "+#% Crit Damage",
            effect: 0.25,
        }
    ],
    allPotionGrowth: 1.5,
    getPotionCost: function(potionName, getText){
        var index = this.potionNames.indexOf(potionName);
        if (index == -1) return "";
        var potion = this.potions[index];
        var cost = potion.cost;
        var costObj = [];
        var costText = "";
        var owned = 0;
        var thisOwned = this.potionsOwned[index];
        if (potion.challenge && !potion.enemyMult){
            for (var y = 0; y < this.potionsOwned.length; y++){
                if (this.potions[y].challenge != (game.global.challengeActive == "Alchemy")) continue;
                if (y != index && !this.potions[y].enemyMult) owned += this.potionsOwned[y]; //no cost increase for enemyMult potions
            }
        }
        for (var x = 0; x < cost.length; x++){
            var thisCost = Math.ceil(cost[x][1] * Math.pow(cost[x][2], thisOwned));
            if (potion.challenge) thisCost *= Math.pow(this.allPotionGrowth, owned);
            if (getText){
                var ownedName = (game.global.challengeActive == "Alchemy") ? "cowned" : "owned";
                var color = (game.herbs[cost[x][0]][ownedName] < thisCost) ? "red" : "green";
                costText += "<span class='" + color + "'>" + prettify(thisCost) + " " + cost[x][0] + "</span>";
                if (cost.length == x + 2){
                    if (cost.length > 2) costText += ",";
                    costText += " and ";
                }
                else if (cost.length != x + 1) costText += ", ";
            }
            else costObj.push([cost[x][0], thisCost]);
        }
        if (getText) return costText;
        return costObj;
    },
    getPotionEffect: function(potionName){
        if (game.global.universe != 2) return 1;
        var index = this.potionNames.indexOf(potionName);
        if (index == -1) return 1;
        var potion = this.potions[index];
        var onChallenge = (game.global.challengeActive == "Alchemy");
        if (potion.challenge && !onChallenge) return 1;
        if (!potion.effect && !potion.effectComp) return 1;
        var owned = this.potionsOwned[index];
        if (potion.effect) return 1 + (potion.effect * owned);
        return Math.pow(potion.effectComp, owned);

    },
    getRadonMult: function(){
        if (game.global.challengeActive != "Alchemy") return 1;
        var base = 51;
        base *= this.getPotionEffect("Gaseous Brew");
        return base;
    },
    getPotionCount: function(potionName){
        return this.potionsOwned[this.potionNames.indexOf(potionName)];
    },
    getEnemyStats: function(map, voidMap){
        //Challenge only
        var baseMod = 0.1;
        baseMod *= Math.pow(this.potions[0].enemyMult, this.potionsOwned[0]); //Herby Brew
        baseMod *= Math.pow(this.potions[1].enemyMult, this.potionsOwned[1]); //Gaseous Brew
        if (voidMap) {
            baseMod *= 10;
            if (this.potionsOwned[3] > 0) baseMod *= this.getPotionEffect("Potion of the Void");
            return baseMod;
        }
        if (map) return baseMod * 3;
        return baseMod;
    },
    unlock: function(){
        if (typeof game.global.messages.Loot.alchemy === 'undefined') game.global.messages.Loot.alchemy = true;
    },
    mapCleared: function(mapObj){
        if (game.global.universe != 2) return;
        if (game.global.challengeActive != "Alchemy" && !game.global.alchemyUnlocked) return;
        if (!mapObj || !mapObj.location) return;
        var resType = game.mapConfig.locations[mapObj.location].resourceType;
        if (resType == "Scaling") resType = getFarmlandsResType(mapObj);
        var resource = this.rewards[resType];
        if (!resource) return;
        var amt = this.getDropRate(mapObj.level);
        if (mapObj.location == "Farmlands") amt *= 1.5;
        if (amt <= 0) return;
        if (game.global.challengeActive == "Alchemy"){
            game.herbs[resource].cowned += amt;
        }
        else{
            game.herbs[resource].owned += amt;
        }
        message("You found " + prettify(amt) + " " + resource + "!", "Loot", "*leaf3", "alchemy", "alchemy");
        this.openPopup(true);
    },
    canAffordPotion: function(potionName){
        var cost = this.getPotionCost(potionName);
        if (!cost) return false;
        var owned = (game.global.challengeActive == "Alchemy") ? "cowned" : "owned";

        for (var x = 0; x < cost.length; x++){
            var resOwned = game.herbs[cost[x][0]][owned];
            if (resOwned < cost[x][1]) return false;
        }
        return true;
    },
    craftPotion: function(potionName){
        if (!this.canAffordPotion(potionName)) return;
        var cost = this.getPotionCost(potionName);
        var ownedName = (game.global.challengeActive == "Alchemy") ? "cowned" : "owned";
        for (var x = 0; x < cost.length; x++){
            game.herbs[cost[x][0]][ownedName] -= cost[x][1];
        }
        var index = this.potionNames.indexOf(potionName);
        this.potionsOwned[index]++;
        game.global.potionData = this.potionsOwned;
        this.openPopup(true);
    },
    zoneScale: 1.14,
    extraMapScale: 1.25,
    getDropRate: function(mapLevel){
        var world = game.global.world;
        var dif = mapLevel - world;
        if (dif < 0) return 0;
        var base = ((2 + (Math.floor(world / 10) * 5)) * Math.pow(this.zoneScale, world));
        base = Math.floor(base * Math.pow(this.extraMapScale, dif));
        base *= this.getPotionEffect("Herby Brew");
        return base;
    },
    openPopup: function(updateOnly){
        if (updateOnly && (lastTooltipTitle != "Alchemy" || !game.global.lockTooltip)) return;
        var herbContainer = (updateOnly) ? document.getElementById('alchHerbContainer') : null;
        if (updateOnly && !herbContainer) updateOnly = false;
        var text = (updateOnly) ? "" : "<div class='alchemyTitle'>Herbs</div><div id='alchHerbContainer'>";
        var ownedName = (game.global.challengeActive == "Alchemy") ? "cowned" : "owned";
        for (var herb in game.herbs){
            text += "<div class='alchemyPopupHerb'><span class='alchemyPopupName'>" + herb + "</span><br/>" + prettify(game.herbs[herb][ownedName]) + "</div>";
        }
        if (updateOnly){
            herbContainer.innerHTML = text;
        }
        else text += "</div>";
        text += "<div class='alchemyTitle'>Crafts</div>";
        text += "<table id='alchemyCraftTable'><tbody><tr>"
        var count = 0;
        for (var x = 0; x < this.potions.length; x++){
            var potion = this.potions[x];
            if ((game.global.challengeActive == "Alchemy") != potion.challenge) continue;
            if (count % 5 == 0) text += "</tr><tr>";
            
            var name = this.potionNames[x];
            var effectAmt = this.getPotionEffect(name);
            if (potion.inverseComp) effectAmt = 1 - effectAmt;
            else effectAmt--;
            var effectText = prettify(this.potionsOwned[x]) + " owned, " + potion.effectText.replace("#", prettify((effectAmt) * 100));
            if (name == "Potion of Finding") effectText += ", +" + this.getRunetrinketBonusAmt().toFixed(2) + "% RT chance"
            var btnClass = (this.canAffordPotion(name)) ? "colorSuccess" : "colorDisabled";
            if (updateOnly){
                var craftBtn = document.getElementById('alchCraftBtn' + x);
                if (!craftBtn) {
                    cancelTooltip();
                    console.log('button not found for refresh');
                    return;
                }
                swapClass('color', btnClass, craftBtn);
                document.getElementById('alchPotionEffect' + x).innerHTML = effectText;
                document.getElementById('alchPotionCost' + x).innerHTML = this.getPotionCost(name, true);
            }
            else
            text += "<td class='alchemyPopupCraft " + ((potion.enemyMult) ? 'brew' : 'potion') + "'><div class='alchemyPopupName'>" + name + "</div><span id='alchCraftBtn" + x + "' onclick='alchObj.craftPotion(\"" + name + "\")' class='btn btn-sm " + btnClass + "' style='width: 80%; margin-left: 10%;'>Craft</span><br/><span id='alchPotionEffect" + x + "' class='alchemyPotionEffect'>" + effectText + "</span><br/><span id='alchPotionCost" + x + "' class='alchemyCraftCost'>" + this.getPotionCost(name, true) + "</span><div class='alchemyAuto'>AutoCraft up to: <input value='" + this.potionAuto[x] + "' type='number' id='potionAuto" + x + "' /></div><span class='alchemyCraftDescription'>" + potion.description + "</span></td>";
            
            count++;
        }
        text += "</tr></tbody></table><div id='alchBottomText'>";
        if (updateOnly) text = "";
        if (game.global.challengeActive == "Alchemy"){
            text += "<div class='alchemyEnemyStats'>Enemies in this dimension are enchanted, gaining +" + prettify(this.getEnemyStats(false, false) * 100) + "% enemy stats in World, +" + prettify(this.getEnemyStats(true, false) * 100) + "% in Maps, and +" + prettify(this.getEnemyStats(true, true) * 100) + "% in Void Maps. All Radon drops are increased by " + prettify((this.getRadonMult() - 1)  * 100) + "%.";
            text += "</div>";
        }
        text += "<div class='alchemyTitle'>Drop Rates</div><table id='alchemyDropsTable'><tbody>";
        var row1 = "<tr><td style='font-weight: bold; font-style: italic'>Map Level</td>";
        var row2 = "<tr><td style='font-weight: bold; font-style: italic'>Drop Amt</td>";
        for (var y = game.global.world - 1; y <= game.global.world + 10; y++){
            row1 += "<td>" + y + "</td>";
            row2 += "<td>" + prettify(this.getDropRate(y)) + "</td>";
        }
        text += row1 + "</tr>" + row2 + "</tr></tbody></table>";
        if (updateOnly){
            document.getElementById('alchBottomText').innerHTML = text;
            return;
        }
        text += "</div>";
        tooltip('confirm', null, 'update', text, 'alchObj.save()', 'Alchemy', 'Save and Close')
    },
    autoCraft: function(){
        //called once every 2 seconds after alchemy is unlocked or during challenge
        var onChallenge = (game.global.challengeActive == "Alchemy");
        for (var x = 0; x < this.potions.length; x++){
            var potion = this.potions[x];
            if ((potion.challenge) != onChallenge) continue;
            if (this.potionsOwned[x] >= this.potionAuto[x]) continue;
            if (this.canAffordPotion(this.potionNames[x])) this.craftPotion(this.potionNames[x]);
        }
    },
    save: function(){
        for (var x = 0; x < this.potions.length; x++){
            var elem = document.getElementById('potionAuto' + x);
            if (!elem) continue;
            var val = elem.value;
            if (!val || isNumberBad(val)) continue;
            this.potionAuto[x] = val;
        }
        game.global.potionAuto = this.potionAuto;
    },
    portal: function(){
        for (var x = 0; x < this.potions.length; x++){
            if (this.potions[x].challenge) this.potionsOwned[x] = 0;
        }
        for (var herb in game.herbs){
            game.herbs[herb].cowned = 0;
        }
        if (!game.global.alchemyUnlocked) this.tab.style.display = 'none';
        game.global.potionData = this.potionsOwned;
    }
}

var autoBattle = {
    frameTime: 300,
    speed: 1,
    enemyLevel: 1,
    maxEnemyLevel: 1,
    autoLevel: true,
    dust: 0,
    shards: 0,
    shardDust: 0,
    trimp: null,
    enemy: null,
    seed: 4568654,
    enemiesKilled: 0,
    sessionEnemiesKilled: 0,
    sessionTrimpsKilled: 0,
    maxItems: 4,
    notes: "&nbsp;",
    popupMode: "items",
    battleTime: 0,
    lastSelect: "",
    lastActions: [],
    activeContract: "",
    lootAvg: {
        accumulator: 0,
        counter: 0
    },
    presets: {
        names: ["Preset 1", "Preset 2", "Preset 3"],
        p1: [],
        p2: [],
        p3: []
    },
    rings: {
        level: 1,
        mods: ["attack"]
    },
    template: function(){
        return {
            level: 1,
            isTrimp: false,
            baseHealth: 50,
            health: 50,
            maxHealth: 50,
            baseAttack: 5,
            attack: 5,
            baseAttackSpeed: 5000,
            attackSpeed: 5000,
            lastAttack: 0,
            shockChance: 0,
            shockMod: 0,
            bleedChance: 0,
            bleedMod: 0,
            bleedTime: 0,
            poisonChance: 0,
            poisonTime: 0,
            poisonMod: 0,
            poisonStack: 2,
            poisonRate: 1,
            poisonTick: 1000,
            poisonHeal: 0,
            defense: 0,
            lifesteal: 0,
            shockResist: 0,
            poisonResist: 0,
            bleedResist: 0,
            lifestealResist: 0,
            slowAura: 1,
            damageTakenMult: 1,
            enrageMult: 1.25,
            enrageFreq: 60,
            explodeDamage: 0,
            explodeFreq: -1,
            lastExplode: 0,
            berserkMod: -1,
            berserkStack: 0,
            ethChance: 0,
            dmgTaken: 0,
            dustMult: 0,
            gooStored: 0,
            lastGoo: -1,
            bleed: {
                time: 0,
                mod: 0
            },
            poison: {
                time: 0,
                mod: 0,
                lastTick: 0,
                stacks: 0,
                expired: false,
                hitsAtMax: 0
            },
            shock: {
                time: 0,
                mod: 0,
                count: 0,
            }
        }
    },
    unlockAllItems: function(){
        for (var item in this.items){
            this.items[item].owned = true;
        }
    },

    resetAll: function(){
        this.enemyLevel = 1;
        this.maxEnemyLevel = 1;
        this.autoLevel = true;
        this.dust = 0;
        this.shards = 0;
        this.trimp = null;
        this.enemy = null;
        this.enemiesKilled = 0;
        this.lastActions = [];
        this.activeContract = "";
        this.resetStats();
        this.rings = this.getFreshRings();
        for (var item in this.items){
            item = this.items[item];
            item.owned = (item.zone) ? false : true;
            item.equipped = false;
            item.hidden = false;
            item.level = 1;
        }
        for (var bonus in this.bonuses){
            this.bonuses[bonus].level = 0;
        }
        for (var oneTimer in this.oneTimers){
            this.oneTimers[oneTimer].owned = false;
        }
        for (var setting in this.settings){
            this.settings[setting].enabled = this.settings[setting].default;
        }
        this.items.Sword.equipped = true;
        this.items.Pants.equipped = true;
        this.presets.p1 = [];
        this.presets.p2 = [];
        this.presets.p3 = [];
        this.resetCombat();
    },
    save: function(){
        var data = {};
        data.enemyLevel = this.enemyLevel;
        data.dust = this.dust;
        data.shards = this.shards;
        data.enemiesKilled = this.enemiesKilled;
        data.maxEnemyLevel = this.maxEnemyLevel;
        data.autoLevel = this.autoLevel;
        data.lastActions = this.lastActions;
        data.presets = this.presets;
        data.activeContract = this.activeContract;
        data.items = {};
        data.rings = this.rings;
        for (var item in this.items){
            var thisItem = this.items[item];
            if (!thisItem.owned) continue;
            data.items[item] = {};
            var saveItem = data.items[item];    
            saveItem.equipped = thisItem.equipped;
            saveItem.owned = thisItem.owned;
            saveItem.level = thisItem.level;
            saveItem.hidden = thisItem.hidden;
        }
        data.bonuses = {};
        for (var bonus in this.bonuses){
            var thisBonus = this.bonuses[bonus];
            if (thisBonus.level == 0) continue;
            data.bonuses[bonus] = thisBonus.level;
        }
        data.oneTimers = {};
        for (var oneTimer in this.oneTimers){
            var thisOneTimer = this.oneTimers[oneTimer];
            if (!thisOneTimer.owned) continue;
            data.oneTimers[oneTimer] = true;
        }
        data.settings = {};
        for (var setting in this.settings){
            if (setting == "practice") continue;
            var thisSetting = this.settings[setting];
            if (thisSetting.enabled == thisSetting.default) continue;
            data.settings[setting] = thisSetting.enabled; 
        }
        game.global.autoBattleData = data;
    },
    load: function(){
        var data = game.global.autoBattleData;
        var tab = document.getElementById('autoBattleTab');
        var canAb = (game.global.highestRadonLevelCleared >= 74);
        if (!canAb || !data || !data.items){
            this.resetAll();
            if (!canAb) tab.style.display = 'none';
            else tab.style.display = 'table-cell';
            return;
        }
        tab.style.display = 'table-cell';
        this.enemyLevel = data.enemyLevel;
        this.dust = data.dust;
        this.shards = data.shards ? data.shards : 0;
        this.enemiesKilled = data.enemiesKilled;
        this.maxEnemyLevel = data.maxEnemyLevel;
        this.autoLevel = data.autoLevel;
        if (data.rings && data.rings.level) this.rings = data.rings;
        else this.rings = this.getFreshRings();
        if (data.activeContract) this.activeContract = data.activeContract;
        if (data.presets) this.presets = data.presets;
        else{
            this.presets.p1 = [];
            this.presets.p2 = [];
            this.presets.p3 = [];
        }
        if (data.lastActions) this.lastActions = data.lastActions;
        for (var x = 0; x < this.lastActions.length; x++){
            if (!this.lastActions[x][6]) this.lastActions[x][6] = 0;
        }
        for (var item in this.items){
            var saveItem = data.items[item];
            var thisItem = this.items[item];
            if (!saveItem) {
                //thisItem.owned = false;
                thisItem.equipped = false;
                thisItem.level = 1;
                thisItem.hidden = false;
                continue;
            }
            
            thisItem.owned = saveItem.owned;
            thisItem.equipped = saveItem.equipped;
            thisItem.level = saveItem.level;
            if (typeof saveItem.hidden !== 'undefined')
            thisItem.hidden = saveItem.hidden;
        }
        for (var bonus in this.bonuses){
            if (!data.bonuses || !data.bonuses[bonus]){
                this.bonuses[bonus].level = 0;
                continue;
            }
            this.bonuses[bonus].level = data.bonuses[bonus];
        }
        for (var oneTimer in this.oneTimers){
            if (!data.oneTimers || !data.oneTimers[oneTimer]){
                this.oneTimers[oneTimer].owned = false;
                continue;
            }
            this.oneTimers[oneTimer].owned = true;
        }
        for (var setting in this.settings){
            if (!data.settings || typeof data.settings[setting] == 'undefined'){
                this.settings[setting].enabled = this.settings[setting].default;
                continue;
            }
            this.settings[setting].enabled = data.settings[setting];
        }
        if (!this.presets.names) this.presets.names = ["Preset 1", "Preset 2", "Preset 3"];
        game.stats.saHighestLevel.valueTotal = this.maxEnemyLevel;
        this.resetCombat(true);
    },
    firstUnlock: function(){
        this.load();
        tooltip('hide');
        tooltip('confirm', null, 'update', "<i>\"As you approach the infinitely tall Spire, a Trimp rushes out and embraces Scruffy. Scruffy introduces you to Huffy, who seems to have also realized that Druopitee is kind of a prick. Huffy lets you know that he managed to destroy the Corruption device at the top, but that it was now crawling with horrible shadowy enemies. Huffy lets you know that he is shielded from the Portal inside the Spire, but that even when you Portal and forget him, he can use your subconscious to help direct him in cleansing the Spire and finding artifacts to make your Trimps stronger.\"</i><br/><br/>You've finally made it to Huffy and the first Spire in this Universe. Huffy needs your help removing all of the Enemies! Check out the new tab titled 'SA' to get started.<br/><br/><b>A tip for once you're in</b>: Huffy has figured out how to put on Pants and a Sword but is struggling beyond that. Click two other items to equip them ASAP!", null, 'Spire Assault Unlocked!', 'Continue', false, true);
    },
    savePreset: function(slot){
        this.presets[slot] = [];
        for (var item in this.items){
            if (this.items[item].equipped) this.presets[slot].push(item);
        }
        this.presets[slot].push(["level", this.enemyLevel]);
        if (this.rings.mods.length) {
            var ringMods = ["ring"];
            for (var x = 0; x < this.rings.mods.length; x++){
                ringMods.push(this.rings.mods[x]);
            }
            this.presets[slot].push(ringMods);
        }
        this.popup(true, false, true);
    },
    loadPreset: function(slot){
        var preset = this.presets[slot];
        var plength = preset.length;
        var maxAdd = this.getMaxItems();
        var added = 0;
        for (var item in this.items){
            this.items[item].equipped = false;
            if (this.settings.loadHide.enabled) this.items[item].hidden = (this.items[item].owned) ? true : false;
        }
        for (var x = 0; x < plength; x++){
            var thisPreset = preset[x];
            if (Array.isArray(thisPreset)){
                if (this.settings.loadLevel.enabled && thisPreset[0] == "level" && thisPreset[1] <= this.maxEnemyLevel){
                    this.enemyLevel = thisPreset[1];
                }
                else if (this.settings.loadRing.enabled && thisPreset[0] == "ring"){
                    for (var y = 1; y < thisPreset.length; y++){
                        this.changeRing(null, y - 1, thisPreset[y])
                    }
                }
                continue;
            }
            if (!this.items[thisPreset] || !this.items[thisPreset].owned) continue;
            if (added >= maxAdd) continue;
            this.items[thisPreset].equipped = true;
            this.items[thisPreset].hidden = false;
            added++;
        }
        this.popupMode = 'items';
        this.resetCombat(true);
        this.popup(true, false, true);
    },
    getItemOrder: function(){
        var items = [];
        for (var item in this.items){
            items.push({name: item, zone: (this.items[item].zone) ? this.items[item].zone : 0})
        }
        function itemSort(a,b){
            if (a.zone > b.zone) return 1;
	        if (a.zone < b.zone) return -1;
        }
        items.sort(itemSort);
        return items;
    },
    getContracts: function(){
        var items = this.getItemOrder();
        var contracts = [];
        for (var x = 0; x < items.length; x++){
            if (!this.items[items[x].name].owned) {
                contracts.push(items[x].name)
                if (contracts.length >= 3) return contracts;
            }
        }
        return contracts;
    },
    contractPrice: function(item){
        var itemObj = this.items[item];
        var dif = itemObj.zone - 75
        var total = (100 * Math.pow(1.2023, dif));
        if (itemObj.dustType == "shards") total /= 1e9;
        return total;
    },
    oneTimerPrice: function(item){
        var itemObj = this.oneTimers[item];
        var allItems = this.getItemOrder();
        var index = itemObj.requiredItems - 1;
        if (itemObj.useShards) index++;
        if (index <= 6) return 10000;
        var lastItem = allItems[index];
        var contractPrice = this.contractPrice(lastItem.name);
        if (itemObj.useShards) return Math.ceil(contractPrice / 2);
        return Math.ceil(contractPrice * 1000) / 10;
    },
    toggleSetting: function(which){
        var setting = this.settings[which];
        if (setting.enabled == setting.text.length - 1) setting.enabled = 0;
        else setting.enabled++;
        if (setting.onToggle) setting.onToggle();
        this.popup(true, false, true);
    },
    settings: {
        loadHide: {
            enabled: 1,
            default: 1,
            text: ["Leave Items on Preset Load", "Hide Unused Items on Preset Load"]
        },
        loadLevel: {
            enabled: 1,
            default: 1,
            text: ["Leave Enemy Level on Preset Load", "Set Enemy Level on Preset Load"]
        },
        loadRing: {
            enabled: 1,
            default: 1,
            text: ["Leave Ring on Preset Load", "Load Ring Mods on Preset Load"],
            hideUnless: function(){
                return (autoBattle.oneTimers.The_Ring.owned);
            }
        },
        practice: {
            enabled: 0,
            default: 0,
            text: ["Practice Off - 10x Speed, no Dust or Progress", "Practice On - 10x Speed, no Dust or Progress"],
            onToggle: function(){
                if (this.enabled) autoBattle.speed = 10;
                else autoBattle.speed = 1;
                autoBattle.resetCombat(true);
            }
        }
    },
    items: {
        //Starting items
        Menacing_Mask: {
            owned: true,
            equipped: false,
            hidden: false,
            level: 1,
            description: function(){
                return "-" + prettify((1 - this.trimpAttackSpeed()) * 100) + "% Huffy Attack Time, +" + prettify((1 - this.enemyAttackSpeed()) * -100) + "% Enemy Attack Time.";
            },
            upgrade: "-2% Huffy Attack Time, +2% Enemy Attack Time (compounding)",
            trimpAttackSpeed: function(){
                return Math.pow(0.98, this.level);
            },
            enemyAttackSpeed: function(){ 
                return 1.05 * Math.pow(1.02, (this.level - 1));
            },
            doStuff: function(){
                autoBattle.trimp.attackSpeed *= this.trimpAttackSpeed();
                autoBattle.enemy.attackSpeed *= this.enemyAttackSpeed();
            },
            priceMod: 5
        },
        Sword: {
            owned: true,
            equipped: true,
            hidden: false,
            level: 1,
            description: function(){
                return "+" + this.effect() + " attack damage.";
            },
            upgrade: "+1 attack damage",
            effect: function(){
                return this.level;
            },
            doStuff: function(){
                autoBattle.trimp.attack += this.effect();
            },
            priceMod: 2.5
        },
        Armor: {
            owned: true,
            equipped: false,
            hidden: false,
            level: 1,
            description: function(){
                return "+" + prettify(this.effect()) + " base health.";
            },
            upgrade: "+20 base health",
            effect: function(){
                return 20 * this.level;
            },
            doStuff: function(){
                autoBattle.trimp.maxHealth += this.effect();
            },
            priceMod: 5
        },
        Rusty_Dagger: {
            owned: true,
            equipped: false,
            hidden: false,
            level: 1,
            description: function(){
                return "Can create a Bleed on the Enemy for 10 seconds. +" + prettify(this.bleedMod() * 100) + "% Bleed Damage" + ((this.level >= 5) ? ", +" + prettify(this.attack()) + " Attack" : "") + ". +" + prettify(this.bleedChance()) + "% Bleed Chance, doubled if the Enemy is Shocked or Poisoned.";
            },
            upgrade: "+10 Attack and +20% Bleed Damage per 5 levels. +5% Bleed Damage and +3% Bleed Chance",
            attack: function(){
                return Math.floor(this.level / 5) * 10;
            },
            bleedChance: function(){
                return 17 + (3 * this.level);
            },
            bleedMod: function(){
                var val = 0.1 + (0.05 * this.level);
                val += (Math.floor(this.level / 5) * 0.2);
                return val;
            },
            doStuff: function(){
                autoBattle.trimp.attack += this.attack();
                autoBattle.trimp.bleedMod += this.bleedMod();
                if (autoBattle.trimp.bleedTime < 10000) autoBattle.trimp.bleedTime = 10000;
                autoBattle.trimp.bleedChance += (autoBattle.enemy.poison.time > 0 || autoBattle.enemy.shock.time > 0) ? (this.bleedChance() * 2) : this.bleedChance();
            },
            startPrice: 25,
            priceMod: 4
        },
        Fists_of_Goo: {
            owned: true,
            equipped: false,
            hidden: false,
            level: 1,
            description: function(){
                return "Can create a Poison on the Enemy for 10 seconds. +" + prettify(this.effect()) + " Poison Damage. +25% Poison Chance, doubled if the enemy is bleeding or shocked."
            },
            upgrade: "+1 poison damage",
            effect: function(){
                return this.level;
            },
            doStuff: function(){
                autoBattle.trimp.poisonMod += this.effect();
                autoBattle.trimp.poisonChance += (autoBattle.enemy.shock.time > 0 || autoBattle.enemy.bleed.time > 0) ? 50 : 25;
                if (autoBattle.trimp.poisonTime < 10000) autoBattle.trimp.poisonTime = 10000;
            },
            priceMod: 6,
            startPrice: 50
        },
        Battery_Stick: {
            owned: true,
            equipped: false,
            hidden: false,
            level: 1,
            description: function(){
                return "Can create a Shock on the Enemy for 10 seconds. +" + prettify(this.shockMod() * 100) + "% Shock Damage. +35% Shock Chance, doubled if the enemy is bleeding or poisoned.";
            },
            upgrade: "+10% Shock Damage",
            shockMod: function(){
                return 0.15 + (0.1 * this.level);
            },
            doStuff: function(){
                autoBattle.trimp.shockChance += (autoBattle.enemy.bleed.time > 0 || autoBattle.enemy.poison.time > 0) ? 70 : 35;
                autoBattle.trimp.shockMod += this.shockMod();
                autoBattle.trimp.shockTime = 10000;
            },
            startPrice: 25,
            priceMod: 4
        },
        Pants: {
            owned: true,
            equipped: true,
            hidden: false,
            level: 1,
            description: function(){
                return "+" + prettify(this.effect()) + " Defense."
            },
            upgrade: "+1 Defense",
            effect: function(){
                return this.level;
            },
            doStuff: function(){
                autoBattle.trimp.defense += this.effect();
            },
        },
        //unlockables

        //raincoat, 75
        //pouch 78
        Chemistry_Set: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 81,
            description: function(){
                var stacks = this.poisonStack();
                return "+50% Poison Chance if the Enemy is not already Poisoned. +" + this.defenseEffect() + " Defense if the Enemy is Poisoned. +" + prettify(this.poisonChance()) + "% Poison Chance. Poisons you inflict can stack " + stacks + " more time" + needAnS(stacks) + ".";
            },
            upgrade: "+1 Max Poison Stack per 4 levels. +1 Defense, +4% standard Poison Chance",
            defenseEffect: function(){
                return this.level;
            },
            poisonChance: function(){
                return 6 + (this.level * 4);
            },
            poisonStack: function(){
                var levels = Math.floor(this.level / 4);
                return 1 + levels;
            },
            doStuff: function(){
                if (autoBattle.enemy.poison.time > 0) autoBattle.trimp.defense += this.defenseEffect();
                else autoBattle.trimp.poisonChance += 50;
                autoBattle.trimp.poisonChance += this.poisonChance();
                autoBattle.trimp.poisonStack += this.poisonStack();
            },
            priceMod: 4,
            startPrice: 200
        },
        //bad medkit - 84
        Comfy_Boots: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 87,
            description: function(){
                return "+" + prettify(this.defense()) + " Defense. +" + prettify(this.resistance()) + "% to all Resistances.";
            },
            upgrade: "+2 Defense, +5% Resist",
            defense: function(){
                return 2 + (this.level * 2);
            },
            resistance: function(){
                return (this.level * 5);
            },
            doStuff: function(){
                autoBattle.trimp.defense += this.defense();
                var res = this.resistance();
                autoBattle.trimp.bleedResist += res;
                autoBattle.trimp.poisonResist += res;
                autoBattle.trimp.shockResist += res;
            },
            startPrice: 430
        },
        //Labcoat 90
        Lifegiving_Gem: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 93,
            description: function(){
                return "Increases Dust gained from Enemies by " + prettify(this.effect() * 100) + "% PLUS your Lifesteal amount when the Enemy dies."
            },
            upgrade: "+10% Dust Gained",
            effect: function(){
                return 0.2 + (0.1 * this.level);
            },
            dustIncrease: function(){
                return this.effect() + Math.max(0, (autoBattle.trimp.lifesteal - autoBattle.enemy.lifestealResist));
            },
            startPrice: 650,
            priceMod: 4
        },
        Mood_Bracelet: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 95,
            description: function(){
                return "-" + prettify((1 - this.effect()) * 100) + "% Attack Time and +" + prettify(this.defense()) + " Defense if the Enemy is not Bleeding."
            },
            upgrade: "-3% Attack Time (compounding), +4 Defense",
            effect: function(){
                return 0.8765 * Math.pow(0.97, this.level);
            },
            defense: function(){
                return 6 + (4 * this.level);
            },
            doStuff: function(){
                if (autoBattle.enemy.bleed.time <= 0){
                    autoBattle.trimp.attackSpeed *= this.effect();
                    autoBattle.trimp.defense += this.defense();
                }
            },
            priceMod: 4,
            startPrice: 1100
        },
        Hungering_Mold: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 98,
            description: function(){
                return "Heal for " + prettify(this.healAmt()) + " per stack of Poison whenever one of your Poisons deals damage. Your Poisons tick " + prettify((1 - this.tickMult()) * 100) + "% faster.";
            },
            upgrade: "+0.5 Heal on Poison Tick, +1% Poison Tick Speed",
            healAmt: function(){
                return 0.5 + (0.5 * this.level);
            },
            tickMult: function(){
                return 0.909 * Math.pow(0.99, this.level);
            },
            doStuff: function(){
                autoBattle.trimp.poisonTick *= this.tickMult();
                autoBattle.trimp.poisonHeal += this.healAmt();
            },
            priceMod: 5,
            startPrice: 2000
        },
        Recycler: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 100,
            description: function(){
                return "+" + prettify(this.effect() * 100) + "% Lifesteal. Huffy's Lifesteal heals twice as much off of Bleed damage.";
            },
            upgrade: "+5% Lifesteal",
            effect: function(){
                return 0.2 + (0.05 * this.level);
            },
            doStuff: function(){
                autoBattle.trimp.lifesteal += this.effect();
            },
            startPrice: 2800,
            priceMod: 5
        },
        Shining_Armor: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 103,
            description: function(){
                return "+" + prettify(this.defense()) + " Defense. +" + prettify(this.health()) + " Health.";
            },
            upgrade: "+6 defense, +100 health",
            defense: function(){
                return 14 + (6 * this.level);
            },
            health: function(){
                return 200 + (this.level * 100);
            },
            doStuff: function(){
                autoBattle.trimp.defense += this.defense();
                autoBattle.trimp.maxHealth += this.health();
            },
            priceMod: 5,
            startPrice: 4000
        },
        Shock_and_Awl:{
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 105,
            description: function(){
                return "Can create a Shock on an enemy for 20 seconds. +" + prettify(this.attack()) + " Attack, +" + prettify(this.shockChance()) + "% Shock Chance, +" + prettify(this.shockMod() * 100) + "% Shock Damage. -25% Attack Time if the Enemy is not Shocked, +25% Lifesteal if the Enemy is Shocked.";
            },
            upgrade: "+4 Attack, +10% Shock Chance, +10% Shock Damage",
            attack: function(){
                return 6 + (4 * this.level);
            },
            shockChance: function(){
                return 20 + (10 * this.level);
            },
            shockMod: function(){
                return .40 + (.1 * this.level);
            },
            doStuff: function(){
                if (autoBattle.trimp.shockTime < 20000) autoBattle.trimp.shockTime = 20000;
                autoBattle.trimp.shockMod += this.shockMod();
                autoBattle.trimp.shockChance += this.shockChance();
                autoBattle.trimp.attack += this.attack();
                if (autoBattle.enemy.shock.time <= 0) autoBattle.trimp.attackSpeed *= 0.75;
                else autoBattle.trimp.lifesteal += 0.25;
            },
            priceMod: 5,
            startPrice: 5750
        },
        //spiked gloves - 108
        Tame_Snimp: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 110,
            description: function(){
                return "Can create a Poison on the Enemy for 10 seconds. +" + prettify(this.poisonChance()) + "% Poison Chance, +" + prettify(this.poisonMod()) + " Poison Damage. Enemy Attack is reduced by 15% while the Enemy is Poisoned.";
            },
            upgrade: "+10% Poison Chance, +2 Poison Damage",
            poisonChance: function(){
                return 30 + (10 * this.level);
            },
            poisonMod: function(){
                return 5 + (2 * this.level);
            },
            doStuff: function(){
                if (autoBattle.enemy.poison.time > 0) autoBattle.enemy.attack *= 0.85;
                if (autoBattle.trimp.poisonTime < 10000) autoBattle.trimp.poisonTime = 10000;
                autoBattle.trimp.poisonChance += this.poisonChance();
                autoBattle.trimp.poisonMod += this.poisonMod();
            },
            priceMod: 5.5,
            startPrice: 15000
        },
        Lich_Wraps: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 113,
            description: function(){
                return "When Poisoned, Bleeding, or Shocked, gain +" + prettify(this.attack()) + " Attack, -15% Attack Time, +" + prettify(this.lifesteal() * 100) + "% Lifesteal, and take " + prettify((1 - this.damageTakenMult()) * 100) + "% less damage from all sources.";
            },
            upgrade: "+6 Attack, +6% Lifesteal, -3% damage taken (compounding, never reaching 75%)",
            damageTakenMult: function(){
                return (((0.825 * Math.pow(0.93, (this.level - 1))) / 1.5) + 0.25);
            },
            attack: function(){
                return 9 + (6 * this.level);
            },
            lifesteal: function(){
                return 0.09 + (0.06 * this.level);
            },
            doStuff: function(){
                if (autoBattle.trimp.bleed.time > 0 || autoBattle.trimp.shock.time > 0 || autoBattle.trimp.poison.time > 0){
                    autoBattle.trimp.damageTakenMult *= this.damageTakenMult();
                    autoBattle.trimp.attack += this.attack();
                    autoBattle.trimp.lifesteal += this.lifesteal();
                    autoBattle.trimp.attackSpeed *= 0.85;
                }
            },
            priceMod: 4,
            startPrice: 25000

        },
        Wired_Wristguards: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 115,
            description: function(){
                return "+" + prettify(this.defense()) + " Defense, +" + prettify(this.shockChance()) + "% Shock Chance, +" + prettify(this.shockMod() * 100) + "% Shock Damage, +50% to all Resistances. If the Enemy is Shocked, increase its Attack Time by " + prettify((this.enemySpeed() - 1) * 100) + "%.";
            },
            upgrade: "+3 Defense, +15% Shock Chance, +15% Shock Damage, +2% Enemy Attack Time",
            defense: function(){
                return 7 + (3 * this.level);
            },
            shockChance: function(){
                return 25 + (15 * this.level);
            },
            shockMod: function(){
                return 0.25 + (0.15 * this.level);
            },
            enemySpeed: function(){
                return 1.18 + (0.02 * this.level);
            },
            doStuff: function(){
                autoBattle.trimp.defense += this.defense();
                autoBattle.trimp.shockChance += this.shockChance();
                autoBattle.trimp.shockMod += this.shockMod();
                autoBattle.trimp.shockResist += 50;
                autoBattle.trimp.poisonResist += 50;
                autoBattle.trimp.bleedResist += 50;
                if (autoBattle.enemy.shock.time > 0){
                    autoBattle.enemy.attackSpeed *= this.enemySpeed();
                }
            },
            startPrice: 44000,
            priceMod: 4.5
        },

        Sword_and_Board: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 120,
            description: function(){
                return "+" + prettify(this.attack()) + " Attack, +" + prettify(this.defense()) + " Defense, +" + prettify(this.health()) + " Health, +" + prettify(this.resists()) + "% to all Resistances.";
            },
            upgrade: "+5 Attack, +50 Health, +4 Defense, +10% Resists",
            attack: function(){
                return 10 + (5 * this.level);
            },
            defense: function(){
                return 6 + (4 * this.level);
            },
            health: function(){
                return 350 + (50 * this.level);
            },
            resists: function(){
                return 10 + (10 * this.level);
            },
            doStuff: function(){
                autoBattle.trimp.attack += this.attack();
                autoBattle.trimp.defense += this.defense();
                autoBattle.trimp.maxHealth += this.health();
                var resists = this.resists();
                autoBattle.trimp.shockResist += resists;
                autoBattle.trimp.poisonResist += resists;
                autoBattle.trimp.bleedResist += resists;
            },
            priceMod: 5,
            startPrice: 90000
        },
        Bilious_Boots: {
            owned: false,
            euipped: false,
            hidden: false,
            level: 1,
            zone: 122,
            description: function(){
                return "+" + prettify(this.poisonMod()) + " Poison Damage, +1 Max Poison Stack, +" + prettify(this.health()) + " Health, +" + prettify(this.resists()) + "% to all Resistances.";
            },
            upgrade: "+3 Poison Damage, +50 Health, +10% Resists",
            poisonMod: function(){
                return 7 + (3 * this.level);
            },
            health: function(){
                return 150 + (50 * this.level);
            },
            resists: function(){
                return 10 + (10 * this.level);
            },
            doStuff: function(){
                var resists = this.resists();
                autoBattle.trimp.shockResist += resists;
                autoBattle.trimp.poisonResist += resists;
                autoBattle.trimp.bleedResist += resists;
                autoBattle.trimp.poisonMod += this.poisonMod();
                autoBattle.trimp.maxHealth += this.health();
                autoBattle.trimp.poisonStack++;
            },
            priceMod: 5,
            startPrice: 100000
        },
        Bloodstained_Gloves: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 123,
            description: function(){
                return "+" + prettify(this.bleedChance()) + "% to Bleed Chance, +" + prettify(this.attack()) + " Attack, -25% Enemy Attack Time, -25% Enemy Attack Damage. Fills up " + prettify(this.barFill() * 100) + "% of your Attack Speed bar whenever you cause or receive a Bleed.";
            },
            upgrade: "+5% Bleed Chance, +2 Attack, +5% bar filled on Bleed",
            attack: function(){
                return 6 + (this.level * 2)
            },
            onBleed: function(){
                autoBattle.trimp.lastAttack += (autoBattle.trimp.attackSpeed * this.barFill());
            },
            bleedChance: function(){
                return 25 + (5 * this.level);
            },
            barFill: function(){
                return 0.20 + (0.05 * this.level);
            },
            doStuff: function(){
                autoBattle.trimp.bleedChance += this.bleedChance();
                autoBattle.enemy.attackSpeed *= 0.75;
                autoBattle.enemy.attack *= 0.75;
                autoBattle.trimp.attack += this.attack();
            },
            startPrice: 160000
        },
        Unlucky_Coin: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 125,
            description: function(){
                return "+" + prettify(this.attack()) + " Attack. +" + prettify(this.lifesteal() * 100) + "% Lifesteal if the Enemy is not Poisoned or Bleeding.";
            },
            upgrade: "+4 Attack, +10% Lifesteal",
            attack: function(){
                return 11 + (this.level * 4);
            },
            lifesteal: function(){
                return 0.2 + (this.level * .1);
            },
            doStuff: function(){
                autoBattle.trimp.attack += this.attack();
                if (autoBattle.enemy.bleed.time <= 0 && autoBattle.enemy.poison.time <= 0){
                    autoBattle.trimp.lifesteal += this.lifesteal();
                }
            },
            priceMod: 5,
            startPrice: 400000
        },
        Eelimp_in_a_Bottle: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 130,
            description: function(){
                return "+" + prettify(this.shockChance()) + "% Shock Chance, +" + prettify(this.shockMod() * 100) + "% Shock Damage, +" + prettify(this.shockResist()) + "% Shock Resist. -" + prettify((1 - this.attackSpeed()) * 100) + "% Attack Time if the Enemy is Shocked. When you Shock an Enemy, they lose all progress towards their attack. +" + prettify(this.attack()) + " Attack for each time you've Shocked this Enemy (up to 10 times).";
            },
            upgrade: "+5% Shock Chance, +5% Shock Damage, -5% Attack Time, +5% Shock Resist, +1 Attack per Shock",
            attackSpeed: function(){
                return 0.9 * Math.pow(0.95, this.level);
            },
            shockChance: function(){
                return 35 + (5 * this.level);
            },
            shockMod: function(){
                return .65 + (.1 * this.level);
            },
            shockResist: function(){
                return 10 + (5 * this.level);
            },
            attack: function(){
                return 2 + this.level;
            },
            doStuff: function(){
                autoBattle.trimp.shockMod += this.shockMod();
                autoBattle.trimp.shockChance += this.shockChance();
                if (autoBattle.enemy.shock.time >= 0) autoBattle.trimp.attackSpeed *= this.attackSpeed();
                autoBattle.trimp.attack += (Math.min(10, autoBattle.enemy.shock.count) * this.attack());
                autoBattle.trimp.shockResist += this.shockResist();
            },
            priceMod: 5,
            startPrice: 1000000
        },        
        Big_Cleaver: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 133,
            description: function(){
                return "Can create a Bleed on the Enemy for 10 seconds. +100% Bleed Chance if the Enemy is at full Health, otherwise +25%. +" + prettify(this.attack()) + " Attack if the Enemy is Bleeding. +" + prettify(this.bleedMod() * 100) + "% Bleed Damage, +" + prettify(this.health()) + " Health.";
            },
            upgrade: "+2 Attack, +25% Bleed Damage, +100 Health",
            attack: function(){
                return 30 + (this.level * 2);
            },
            bleedMod: function(){
                return 1 + (0.25 * this.level);
            },
            health: function(){
                return 500 + (100 * this.level);
            },
            doStuff: function(){
                if (autoBattle.enemy.health == autoBattle.enemy.maxHealth) autoBattle.trimp.bleedChance += 100;
                else autoBattle.trimp.bleedChance += 25;
                autoBattle.trimp.maxHealth += this.health();
                if (autoBattle.enemy.bleed.time > 0) autoBattle.trimp.attack += this.attack();
                autoBattle.trimp.bleedMod += this.bleedMod();
                if (autoBattle.trimp.bleedTime <= 10000) autoBattle.trimp.bleedTime = 10000;
            },
            priceMod: 4,
            startPrice: 3000000
        },
        The_Globulator: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 135,
            description: function(){
                return "+" + prettify(this.defense()) + " Defense and +" + prettify(this.health()) + " Max Health if the Enemy is Poisoned. On adding a new Poison Stack to an Enemy that hasn't had poisons expire, heal for half of this item's Max Health. If the Enemy is at Max Poison Stacks, non-Lifesteal healing effects on you are doubled. +" + prettify(this.poisonMod()) + " Poison Damage."
            },
            upgrade: "+5 Defense, +500 Health, +10 Poison Damage",
            defense: function(){
                return 25 + (5 * this.level);
            },
            health: function(){
                return 500 + (500 * this.level);
            },
            poisonMod: function(){
                return 15 + (10 * this.level);
            },
            onPoisonStack: function(stacks){
                if (stacks == 1) autoBattle.trimp.maxHealth += this.health();
                if (autoBattle.enemy.poison.expired) return;
                autoBattle.trimp.health += (this.health() / 2);
                if (autoBattle.trimp.health > autoBattle.trimp.maxHealth) autoBattle.trimp.health = autoBattle.trimp.maxHealth;
            },
            doStuff: function(){
                if (autoBattle.enemy.poison.time > 0){
                    autoBattle.trimp.maxHealth += this.health();
                    autoBattle.trimp.defense += this.defense();
                }
                autoBattle.trimp.poisonMod += this.poisonMod();
            },
            startPrice: 5e6,
            priceMod: 10
        },
        Metal_Suit: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 138,
            description: function(){
                return "+" + prettify(this.defense()) + " Defense, +" + prettify(this.health()) + " Health, +" + prettify(this.resist()) + "% Bleed Resist. If Huffy has an item that can create a Bleed, gain +" + prettify(this.attack()) + " Attack."
            },
            upgrade: "+30 Defense, +1000 Health, +20% Bleed Resist, +5 Attack",
            attack: function(){
                return 10 + (5 * this.level);
            },
            defense: function(){
                return (-10 + (this.level * 30));
            },
            health: function(){
                return (-500 + (this.level * 1000));
            },
            resist: function(){
                return 30 + (20 * this.level);
            },
            doStuff: function(){
                if (autoBattle.items.Rusty_Dagger.equipped || autoBattle.items.Big_Cleaver.equipped) autoBattle.trimp.attack += this.attack();
                autoBattle.trimp.maxHealth += this.health();
                autoBattle.trimp.defense += this.defense();
                autoBattle.trimp.bleedResist += this.resist();
            },
            priceMod: 10,
            startPrice: 6e6
        },
        Nozzled_Goggles: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 140,
            description: function(){
                return "The Enemy is always Shocked, taking at least " + prettify(this.shockMod() * 100) + "% more damage. +" + prettify(this.health()) + " Health, +" + prettify(this.resist()) +  "% Poison Resist, +3 Maximum Poison Stacks.";
            },
            upgrade: "+20% PermaShock Damage, +500 Health, 20% Poison Resist",
            shockMod: function(){
                return (0.2 * this.level);
            },
            health: function(){
                return (-500 + (this.level * 1000));
            },
            resist: function(){
                return (20 * this.level);
            },
            doStuff: function(){
                var enemy = autoBattle.enemy;
                if (enemy.shock.time <= 0 || enemy.shock.mod < this.shockMod()){
                    enemy.shock.time = 9999999;
                    enemy.shock.mod = this.shockMod();
                }
                autoBattle.trimp.maxHealth += this.health();
                autoBattle.trimp.poisonResist += this.resist();
                autoBattle.trimp.poisonStack += 3;
            },
            startPrice: 7e6,
            priceMod: 10
        },
        Sundering_Scythe: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 143,
            description: function(){
                return "-" + prettify((1 - this.attackTime()) * 100) + "% Attack Time, +" + prettify(this.attack()) + " Attack, +" + prettify(this.health()) + " Health, +" + prettify(this.lifesteal() * 100) + "% Lifesteal. Your Shocks last a maximum of 10 seconds, and your Bleeds can be reapplied when below 5 seconds.";
            },
            upgrade: "-5% Attack Time, +5 Attack, +250 Health, +5% Lifesteal",
            attackTime: function(){
                return 0.842 * Math.pow(0.95, this.level);
            },
            attack: function(){
                return 15 + (5 * this.level);
            },
            health: function(){
                return 500 + (250 * this.level);
            },
            lifesteal: function(){
                return 0.15 + (0.05 * this.level);
            },
            doStuff: function(){
                autoBattle.trimp.attackSpeed *= this.attackTime();
                autoBattle.trimp.attack += this.attack();
                autoBattle.trimp.maxHealth += this.health();
                autoBattle.trimp.lifesteal += this.lifesteal();
            },
            startPrice: 15e6,
            priceMod: 10
        },
        //Shank 145
        Plague_Bringer: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 148,
            description: function(){
                return "Your Poisons tick +" + prettify((1 - this.tickMult()) * 100) + "% faster. +" + prettify(this.eachPoison()) + " Poison Damage for every percentage point of Bleed or Shock resist on the Enemy. Heal for " + prettify(this.healAmt()) + " per stack of Poison when your Poisons deal damage." 
            },
            upgrade: "+2% Poison Tick Rate, +0.05 Poison Damage per Enemy Resist, +5 Heal on Poison Tick",
            tickMult: function(){
                return 0.816 * Math.pow(0.98, this.level);
            },
            eachPoison: function(){
                return 0.05 + (0.05 * this.level);
            },
            healAmt: function(){
                return 5 + (5 * this.level);
            },
            poisonMod: function(){
                var res = autoBattle.enemy.bleedResist + autoBattle.enemy.shockResist;
                return Math.floor(res * this.eachPoison());
            },
            doStuff: function(){
                autoBattle.trimp.poisonMod += this.poisonMod();
                autoBattle.trimp.poisonTick *= this.tickMult();
                autoBattle.trimp.poisonHeal += this.healAmt();
            },
            startPrice: 70e6,
            priceMod: 10
        },
        Very_Large_Slime: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 150,
            description: function(){
                return "Can create a Poison for 20 seconds. +" + prettify(this.poisonChance()) + "% Poison Chance, +" + prettify(this.poisonMod()) + " Poison Damage, +" + prettify(this.defense()) + " Defense, +" + prettify(this.health()) + " Health. Every third hit against an Enemy with Max Poison Stacks adds another Max Stack (up to +" + prettify(this.maxStacks()) + " Max Stacks)."; 
            },
            upgrade: "+15% Poison Chance, +20 Poison Damage, +50 Defense, +500 Health, +2 Max Stacks",
            poisonChance: function(){
                return 35 + (15 * this.level);
            },
            poisonMod: function(){
                return 10 + (20 * this.level);
            },
            defense: function(){
                return 50 + (50 * this.level);
            },
            health: function(){
                return 500 + (500 * this.level);
            },
            maxStacks: function(){
                return 8 + (this.level * 2);
            },
            doStuff: function(){
                autoBattle.trimp.poisonChance += this.poisonChance();
                autoBattle.trimp.poisonMod += this.poisonMod();
                if (autoBattle.trimp.poisonTime < 20000) autoBattle.trimp.poisonTime = 20000;
                autoBattle.trimp.defense += this.defense();
                autoBattle.trimp.maxHealth += this.health();
                autoBattle.trimp.poisonStack += Math.min(this.maxStacks(), Math.floor(autoBattle.enemy.poison.hitsAtMax / 3));
            },
            startPrice: 100e6,
            priceMod: 10
        },
        //Monkimp Paw, 155
        Grounded_Crown: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 160,
            description: function(){
                return "+" + prettify(this.attack()) + " Attack, +" + prettify(this.shockMod() * 100) + "% Shock Damage, +" + prettify(this.defense()) + " Defense, +" + prettify(this.health()) + " Health. If the Enemy is Poisoned or Bleeding, Huffy loses 20% of his Max Health per second.";
            },
            upgrade: "+50 Attack, +50% Shock Damage, +50 Defense, +1000 Health",
            attack: function(){
                return 50 + (50 * this.level);
            },
            shockMod: function(){
                return 0.5 + (0.5 * this.level);
            },
            defense: function(){
                return (50 * this.level);
            },
            health: function(){
                return 500 + (1000 * this.level);
            },
            afterCheck: function(){
                if (autoBattle.enemy.poison.time > 0 || autoBattle.enemy.bleed.time > 0){
                    var mod = 20 / autoBattle.frameTime;
                    autoBattle.trimp.health -= (autoBattle.trimp.maxHealth * mod * autoBattle.trimp.damageTakenMult);
                    if (autoBattle.trimp.health < 0.01) autoBattle.trimp.health = 0;
                }
            },
            doStuff: function(){
                
                autoBattle.trimp.attack += this.attack();
                autoBattle.trimp.shockMod += this.shockMod();
                autoBattle.trimp.defense += this.defense();
                autoBattle.trimp.maxHealth += this.health();
            },
            startPrice: 650e6,
            priceMod: 10
        },
        Fearsome_Piercer: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 165,
            description: function(){
                return "+" + prettify(this.attack()) + " Attack, +" + prettify(this.lifesteal() * 100) + "% Lifesteal, +" + prettify(this.bleedMod() * 100) + "% Bleed Damage, +" + prettify(this.bleedChance()) + "% Bleed Chance. If you have an item that can cause a Bleed, the Enemy starts combat with 25% less Max Health."
            },
            upgrade: "+75 Attack, +10% Lifesteal, +75% Bleed Damage, +50% Bleed Chance",
            attack: function(){
                return 125 + (75 * this.level);
            },
            lifesteal: function(){
                return 0.3 + (0.1 * this.level);
            },
            bleedMod: function(){
                return 0.25 + (0.75 * this.level);
            },
            bleedChance: function(){
                return 25 + (50 * this.level);
            },
            onEnemy: function(){
                if (autoBattle.items.Rusty_Dagger.equipped || autoBattle.items.Big_Cleaver.equipped || autoBattle.items.Bag_of_Nails.equipped){
                    autoBattle.enemy.baseHealth *= 0.75;
                    autoBattle.enemy.maxHealth *= 0.75;
                    autoBattle.enemy.health = autoBattle.enemy.maxHealth;
                }
            },
            doStuff: function(){
                autoBattle.trimp.attack += this.attack();
                autoBattle.trimp.lifesteal += this.lifesteal();
                autoBattle.trimp.bleedMod += this.bleedMod();
                autoBattle.trimp.bleedChance += this.bleedChance();
            },
            startPrice: 1.5e9,
            priceMod: 10
        },
        Bag_of_Nails: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 168,
            startPrice: 2.7e9,
            priceMod: 10,
            description: function(){
                return "Can create a Bleed on the Enemy for 10 seconds. Enemies are unaffected by your Slow Aura, but deal 25% less damage while Bleeding. +" + prettify(this.attack()) + " Attack, +" + prettify(this.bleedMod() * 100) + "% Bleed Damage, +" + prettify(this.health()) + " Health."
            },
            upgrade: "+100 Attack, +75% Bleed Damage, +500 Health",
            attack: function(){
                return 150 + (this.level * 100);
            },
            bleedMod: function(){
                return 1.25 + (0.75 * this.level);
            },
            health: function(){
                return 500 + (500 * this.level);
            },
            doStuff: function(){
                if (autoBattle.enemy.bleed.time > 0){
                    autoBattle.enemy.attack *= 0.75;
                    autoBattle.enemy.noSlow = true;
                }
                else autoBattle.enemy.noSlow = false;
                autoBattle.trimp.attack += this.attack();
                autoBattle.trimp.bleedMod += this.bleedMod();
                autoBattle.trimp.maxHealth += this.health();
                if (autoBattle.trimp.bleedTime <= 10000) autoBattle.trimp.bleedTime = 10000;
            }
        },
        Blessed_Protector: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 170,
            description: function(){
                return "+" + prettify(this.health()) + " Health, +" + prettify(this.defense()) + " Defense, +" + prettify(this.lifesteal() * 100) + "% Lifesteal. Huffy gains 0.5% increased Attack for each % of his missing Health. When Huffy is below 50% Health, take 30% less damage from all sources. " 
            },
            upgrade: "+1000 Health, +100 Defense, +25% Lifesteal",
            health: function(){
                return 1000 + (1000 * this.level);
            },
            defense: function(){
                return 100 + (100 * this.level);
            },
            lifesteal: function(){
                return 0.25 + (0.25 * this.level);
            },
            afterCheck: function(){
                var healthPct = autoBattle.trimp.health / autoBattle.trimp.maxHealth;
                if (healthPct < 0.5){
                    autoBattle.trimp.damageTakenMult *= 0.7;
                }
                if (healthPct < 1){
                    var boost = (1 - healthPct);
                    boost = (1 + (boost * 0.5));
                    autoBattle.trimp.attack *= boost;
                }
            },
            doStuff: function(){
                autoBattle.trimp.maxHealth += this.health();
                autoBattle.trimp.defense += this.defense();
                autoBattle.trimp.lifesteal += this.lifesteal();
            },
            startPrice: 4e9,
            priceMod: 10
        },
        The_Doomspring:{
            description: function(){
                var stack = prettify((1 - this.attackTime()) * 100);
                return "+" + prettify(this.health()) + " Health, -" + stack + "% Attack Time. For every 15000 damage taken this battle, -" + stack + "% more Attack Time. Stacks up to " + this.stacks() + " times.";
            },
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 180,
            upgrade: "-5% Attack Time, +1500 Health, +1 stacks",
            attackTime: function(){
                return 0.842 * Math.pow(0.95, this.level);
            },
            health: function(){
                return 1500 + (1500 * this.level);
            },
            stacks: function(){
                return 2 + this.level;
            },
            doStuff: function(){
                var stacks = Math.floor(autoBattle.trimp.dmgTaken / 15000) + 1;
                var maxStacks = this.stacks();
                if (stacks > maxStacks) stacks = maxStacks;
                autoBattle.trimp.attackSpeed *= Math.pow(this.attackTime(), stacks);
                autoBattle.trimp.maxHealth += this.health();
            },
            dustType: "shards",
            startPrice: 22,
            priceMod: 15
        },
        Snimp__Fanged_Blade: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 185,
            description: function(){
                return "+" + prettify(this.attack()) + " Attack, +" + this.poisonStack() + " Max Poison Stacks. If the enemy is Poisoned, +" + prettify(this.bleedMod() * 100) + "% Bleed Damage. If the enemy is Bleeding, +" + prettify(this.poisonMod()) + " Poison Damage.";
            },
            upgrade: "+250 Attack, +5 Max Poison Stacks, +200% Bleed Damage, +250 Poison Damage",
            attack: function(){
                return 250 + (250 * this.level);
            },
            poisonMod: function(){
                return 250 * this.level;
            },
            bleedMod: function(){
                return 1 + (2 * this.level);
            },
            poisonStack: function(){
                return 5 * this.level;
            },
            doStuff: function(){
                autoBattle.trimp.attack += this.attack();
                autoBattle.trimp.poisonStack += this.poisonStack();
                if (autoBattle.enemy.poison.time > 0) autoBattle.trimp.bleedMod += this.bleedMod();
                if (autoBattle.enemy.bleed.time > 0) autoBattle.trimp.poisonMod += this.poisonMod();
            },
            dustType: "shards",
            startPrice: 159,
            priceMod: 15
        },
        //Dopp signet 190
        Wrath_Crafted_Hatchet:{
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 195,
            description: function(){
                return "+" + prettify(this.attack()) + " Attack, +" + prettify(this.health()) + " Health, +" + prettify(this.defense()) + " Defense, -" + prettify((1 - this.attackTime()) * 100) + "% Attack Time.";
            },
            upgrade: "+750 Attack, +2000 Health, +200 Defense, -5% Attack Time",
            attack: function(){
                return 1250 + (750 * this.level);
            },
            attackTime: function(){
                return 0.842 * Math.pow(0.95, this.level);
            },
            health: function(){
                return 2000 + (2000 * this.level);
            },
            defense: function(){
                return 200 + (200 * this.level);
            },
            doStuff: function(){
                autoBattle.trimp.attack += this.attack();
                autoBattle.trimp.maxHealth += this.health();
                autoBattle.trimp.attackSpeed *= this.attackTime();
                autoBattle.trimp.defense += this.defense();
            },
            dustType: "shards",
            startPrice: 400,
            priceMod: 15
        },
        //basket of souls 200
        Goo_Golem: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 205,
            description: function(){
                return "+" + prettify(this.health()) + " Health, +" + prettify(this.poisonMod()) + " Poison Damage, +" + prettify(this.poisonStack()) + " Max Poison Stacks. If the Enemy is Poisoned, all damage Huffy takes is stored in the Golem, and Huffy takes 10% of the Golem's stored damage every second.";
            },
            upgrade: "+1000 Health, +400 Poison Damage, +5 Max Poison Stacks",
            health: function(){
                return 2000 + (1000 * this.level);
            },
            poisonMod: function(){
                return 400 * this.level;
            },
            poisonStack: function(){
                return 5 + (5 * this.level);
            },
            active: function(){
                if (this.equipped && autoBattle.enemy.poison.time > 0) return true;
                return false;
            },
            doStuff: function(){
                autoBattle.trimp.maxHealth += this.health();
                autoBattle.trimp.poisonMod += this.poisonMod();
                autoBattle.trimp.poisonStack += this.poisonStack();
                if (autoBattle.battleTime > autoBattle.trimp.lastGoo + 1000){     
                    if (autoBattle.trimp.lastGoo == -1) autoBattle.trimp.lastGoo = autoBattle.battleTime;
                    else autoBattle.trimp.lastGoo += 1000;
                    var dmg = autoBattle.trimp.gooStored * 0.1;
                    autoBattle.trimp.gooStored -= dmg;
                    autoBattle.damageCreature(autoBattle.trimp, dmg, true);
                }
            },
            dustType: "shards",
            startPrice: 2500,
            priceMod: 15
        },
        Omni_Enhancer: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 210,
            description: function(){
                return "+" + prettify(this.attack()) + " Attack, +" + prettify(this.bleedMod() * 100) + "% Bleed Damage, +" + prettify(this.shockMod() * 100) + "% Shock Damage, +" + prettify(this.poisonMod()) + " Poison Damage, +1 Poison Stack Rate, and Poisons tick 10% faster.";
            },
            upgrade: "+2500 Attack, +300% Bleed Damage, +300% Shock Damage, +1000 Poison Damage",
            attack: function(){
                return 2500 + (2500 * this.level);
            },
            bleedMod: function(){
                return 4 + (3 * this.level);
            },
            shockMod: function(){
                return 4 + (3 * this.level);
            },
            poisonMod: function(){
                return (1000 * this.level);
            },
            doStuff: function(){
                autoBattle.trimp.attack += this.attack();
                autoBattle.trimp.bleedMod += this.bleedMod();
                autoBattle.trimp.shockMod += this.shockMod();
                autoBattle.trimp.poisonMod += this.poisonMod();
                autoBattle.trimp.poisonTick *= 0.9;
                autoBattle.trimp.poisonRate++;
            },
            dustType: "shards",
            startPrice: 6300,
            priceMod: 15
        },
        //Final calc items
        Bad_Medkit: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 84,
            description: function(){
                return "Causes Bleeds you generate from other items to last at least " + this.bleedTime() + " seconds. +" + prettify(this.bleedChance()) + "% Bleed Chance. +" + prettify(this.lifesteal() * 100) + "% Lifesteal if the enemy is Bleeding.";
            },
            upgrade: "+1s Minimum Bleed Time, +4% Bleed Chance, +2.5% Lifesteal",
            bleedTime: function(){
                return 11 + (1 * this.level);
            },
            lifesteal: function(){
                return 0.175 + (0.025 * this.level);
            },
            bleedChance: function(){
                return 21 + (this.level * 4);
            },
            doStuff: function(){
                if (autoBattle.trimp.bleedTime > 0 && autoBattle.trimp.bleedTime < (this.bleedTime() * 1000)) autoBattle.trimp.bleedTime = this.bleedTime() * 1000;
                if (autoBattle.enemy.bleed.time > 0) autoBattle.trimp.lifesteal += this.lifesteal();
                autoBattle.trimp.bleedChance += this.bleedChance();
            },
            startPrice: 300
        },
        Putrid_Pouch: {
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 78,
            description: function(){
                return "-10% Attack Time and +" + prettify(this.defense()) + " Defense if the Enemy is Poisoned. Causes Poisons you generate from other items to last at least " + prettify(this.poisonTime() / 1000) + " seconds. +" + prettify(this.poisonChance()) + "% Poison Chance.";
            },
            upgrade: "+1s Poison Duration, +6% Poison Chance, +3 Defense",
            poisonTime: function(){
                return 19000 + (this.level * 1000);
            },
            poisonChance: function(){
                return 14 + (this.level * 6);
            },
            defense: function(){
                return 7 + (3 * this.level);
            },
            doStuff: function(){
                if (autoBattle.enemy.poison.time > 0){
                    autoBattle.trimp.attackSpeed *= 0.9;
                    autoBattle.trimp.defense += this.defense();
                }
                var poisonTime = this.poisonTime();
                if (autoBattle.trimp.poisonTime > 0 && autoBattle.trimp.poisonTime < poisonTime) autoBattle.trimp.poisonTime = poisonTime;
                autoBattle.trimp.poisonChance += this.poisonChance();
            },
            startPrice: 150,
            priceMod: 4
        },
        Raincoat: { //After all bleed chance
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 75,
            description: function(){
                return "If you have a chance to cause Bleeding, gain +" + prettify(this.defense()) + " Defense, +" + prettify(this.health()) + " Health, +" + prettify(this.lifesteal() * 100) + "% Lifesteal, and +" + prettify(this.bleedDamage() * 100) + "% Bleed Damage.";
            },
            upgrade: "+2 defense, +20 health, +2.5% Lifesteal, +10% Bleed Damage",
            defense: function(){
                return 4 + (this.level * 2);
            },
            health: function(){
                return 20 + (20 * this.level);
            },
            lifesteal: function(){
                return 0.125 + (0.025 * this.level)
            },
            bleedDamage: function(){
                return 0.2 + (0.1 * this.level);
            },
            doStuff: function(){
                var bleedChance = autoBattle.trimp.bleedChance;
                if (autoBattle.items.Sacrificial_Shank.equipped) bleedChance = Math.floor(bleedChance * 0.75);
                if (bleedChance > autoBattle.enemy.bleedResist && autoBattle.trimp.bleedTime > 0 && autoBattle.trimp.bleedMod > 0){
                    autoBattle.trimp.defense += this.defense();
                    autoBattle.trimp.maxHealth += this.health();
                    autoBattle.trimp.lifesteal += this.lifesteal();
                    autoBattle.trimp.bleedMod += this.bleedDamage();
                }
            },
            startPrice: 100,
            priceMod: 4
        },
        Labcoat: { //after all poison chance
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 90,
            description: function(){
                return "If you have a chance to cause Poison, gain +" + prettify(this.health()) + " Health, -" + prettify((1 - this.attackTime()) * 100) + "% Attack Time, and +" + prettify(this.poisonMod()) + " Poison Damage.";
            },
            upgrade: "+25 Health, -1% Attack Time, +1 Poison Damage",
            health: function(){
                return 25 + (25 * this.level);
            },
            attackTime: function(){
                return Math.pow(0.99, this.level);
            },
            poisonMod: function(){
                return 1 + this.level;
            },
            doStuff: function(){
                var poisonChance = autoBattle.trimp.poisonChance;
                if (autoBattle.items.Sacrificial_Shank.equipped) poisonChance = Math.floor(poisonChance * 0.75);
                if (poisonChance > autoBattle.enemy.poisonResist && autoBattle.trimp.poisonMod > 0 && autoBattle.trimp.poisonTime > 0){
                    autoBattle.trimp.maxHealth += this.health();
                    autoBattle.trimp.attackSpeed *= this.attackTime();
                    autoBattle.trimp.poisonMod += this.poisonMod();
                }
            },
            startPrice: 1500,
            priceMod: 4.5
        },
        Aegis: { //after all health
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 118,
            description: function(){
                return "+" + this.defenseEffect() + " Defense. If Huffy's Health % is higher than Enemy Health %, gain +" + prettify(this.shockChance()) + "% Shock Chance, +" + prettify(this.shockMod() * 100) + "% Shock Damage, 15s Shock Time. Otherwise, this item's Defense is doubled and gain +" + prettify(this.lifestealEffect() * 100) + "% Lifesteal.";
            },
            upgrade: "+4 Defense, +10% Shock Chance, +10% Shock Damage, +10% Lifesteal",
            defenseEffect: function(){
                return 6 + (4 * this.level);
            },
            shockChance: function(){
                return 15 + (10 * this.level);
            },
            shockMod: function(){
                return 0.15 + (0.1 * this.level);
            },
            lifestealEffect: function(){
                return 0.05 + (0.1 * this.level);
            },
            doStuff: function(){
                var hufPct = autoBattle.trimp.health / autoBattle.trimp.maxHealth;
                var enemyPct = autoBattle.enemy.health / autoBattle.enemy.maxHealth;
                if (hufPct > enemyPct){
                    autoBattle.trimp.shockChance += this.shockChance();
                    autoBattle.trimp.shockMod += this.shockMod();
                    if (autoBattle.trimp.shockTime < 15000) autoBattle.trimp.shockTime = 15000;
                    autoBattle.trimp.defense += this.defenseEffect();
                }
                else{
                    autoBattle.trimp.lifesteal += this.lifestealEffect();
                    autoBattle.trimp.defense += (this.defenseEffect() * 2);
                }
            },
            priceMod: 8,
            startPrice: 65000,
        },
        Sacrificial_Shank: { //after all status chances
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 145,
            enemyReduced: 0,
            description: function(){
                return "Multiply Huffy's and the Enemy's highest status effect chance (before resists) by 0.75. -" + prettify((1 - this.attackTime()) * 100) + "% Attack Time, +" + prettify(this.resist()) + " to all Resists, and +" + prettify(this.lifesteal() * 100) + "% Lifesteal per 10% Huffy or Enemy status chance lost.";
            },
            upgrade: "-1% Attack Time, +1% Resists, +1% Lifesteal per 10% status chance lost",
            attackTime: function(){
                return Math.pow(0.99, this.level);
            },
            resist: function(){
                return (1 * this.level);
            },
            lifesteal: function(){
                return (0.01 * this.level);
            },
            onEnemy: function(){
                var toReduce = ["poisonChance", "bleedChance", "shockChance"];
                var totalReduce = 0;
                var highestElem = "";
                var highestChance = 0;
                for (var x = 0; x < toReduce.length; x++){
                    var name = toReduce[x];
                    if (autoBattle.enemy[name] > highestChance) {
                        highestChance = autoBattle.enemy[name];
                        highestElem = name;
                    }
                }
                var thisReduce = autoBattle.enemy[highestElem] * 0.25;
                if (thisReduce > 0){
                    autoBattle.enemy[highestElem] -= thisReduce;
                    totalReduce += thisReduce;
                }
                this.enemyReduced = totalReduce;
            },
            doStuff: function(){
                var toReduce = ["poisonChance", "bleedChance", "shockChance"];
                var totalReduce = this.enemyReduced;
                var highestElem = "";
                var highestChance = 0;
                for (var x = 0; x < toReduce.length; x++){
                    var name = toReduce[x];
                    if (autoBattle.trimp[name] > highestChance) {
                        highestChance = autoBattle.trimp[name];
                        highestElem = name;
                    }
                }
                var thisReduce = autoBattle.trimp[highestElem] * 0.25;
                if (thisReduce > 0){
                    autoBattle.trimp[highestElem] -= thisReduce;
                    totalReduce += thisReduce;
                }
                totalReduce = Math.floor(totalReduce / 10);
                if (totalReduce <= 0) return;
                autoBattle.trimp.attackSpeed *= Math.pow(this.attackTime(), totalReduce);
                autoBattle.trimp.lifesteal += (this.lifesteal() * totalReduce);
                autoBattle.trimp.poisonResist += (this.resist() * totalReduce);
                autoBattle.trimp.bleedResist += (this.resist() * totalReduce);
                autoBattle.trimp.shockResist += (this.resist() * totalReduce);
            },
            startPrice: 2500000,
            priceMod: 4
        },
        Basket_of_Souls: { //after all additive lifesteal and health (before monkimp)
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 200,
            description: function(){
                return "+" + prettify(this.health()) + " Health, +" + prettify(this.defense()) + " Defense, +" + prettify(this.lifesteal() * 100) + "% Lifesteal, +" + prettify(this.bleedMod() * 100) + "% Bleed Damage, +" + prettify(this.shockMod() * 100) + "% Shock Damage. Multiplies Huffy's Max Health by his Lifesteal value, then multiplies his Lifesteal by 0.5."
            },
            upgrade: "+1000 Health, +300 Defense, +100% Lifesteal, +200% Bleed Damage, +200% Shock Damage",
            health: function(){
                return 2000 + (1000 * this.level);
            },
            defense: function(){
                return 300 + (200 * this.level);
            },
            lifesteal: function(){
                return 2 + (this.level);
            },
            bleedMod: function(){
                return 3 + (2 * this.level);
            },
            shockMod: function(){
                return 3 + (2 * this.level);
            },
            doStuff: function(){
                autoBattle.trimp.maxHealth += this.health();
                autoBattle.trimp.defense += this.defense();
                autoBattle.trimp.lifesteal += this.lifesteal();
                autoBattle.trimp.bleedMod += this.bleedMod();
                autoBattle.trimp.shockMod += this.shockMod();
                if (autoBattle.items.Monkimp_Paw.equipped) autoBattle.trimp.lifesteal *= 0.75; //monkimp paw special interaction
                autoBattle.trimp.maxHealth *= autoBattle.trimp.lifesteal;
                autoBattle.trimp.lifesteal *= 0.5;
            },
            dustType: "shards",
            startPrice: 1000,
            priceMod: 15
            
        },
        Monkimp_Paw: { //after basket of souls
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 155,
            description: function(){
                return "+" + prettify(this.attack()) + " Attack, removes a fourth of your total Lifesteal."
            },
            upgrade: "+100 Attack",
            attack: function(){
                return (100 * this.level);
            },
            doStuff: function(){
                autoBattle.trimp.attack += this.attack();
                if (!autoBattle.items.Basket_of_Souls.equipped) autoBattle.trimp.lifesteal *= 0.75; //basket of souls special interaction
                if (autoBattle.trimp.lifesteal < 0) autoBattle.trimp.lifesteal = 0;
            },
            startPrice: 200e6,
            priceMod: 10
        },
        Spiked_Gloves: { //after all attack
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 108,
            description: function(){
                return "+" + this.formatEffect() + "% Attack damage.";
            },
            upgrade: "+5% attack damage",
            formatEffect: function(){
                return prettify(this.effect() * 100);
            },
            effect: function(){
                return .2 + (0.05 * this.level);
            },
            doStuff: function(){
                autoBattle.trimp.attack *= (1 + this.effect());
            },
            startPrice: 10000,
            priceMod: 6,
        },
        Doppelganger_Signet: { //actual final attack item
            owned: false,
            equipped: false,
            hidden: false,
            level: 1,
            zone: 190,
            longText: true,
            description: function(){
                return "Summon a Doppelganger which grants you 50% damage reduction, 2x Attack, and +1 Poison Stack Rate while it is alive. Your Doppelganger will explode after taking damage equal to your Max Health or if it would kill the Enemy, redealing all damage dealt so far this fight, and shredding 50% Enemy Defense.";
            },
            onDeath: function(){
                var damageDealt = autoBattle.enemy.dmgTaken;
                autoBattle.damageCreature(autoBattle.enemy, damageDealt, false, true);
                autoBattle.enemy.defense *= 0.5;
                autoBattle.trimp.doppDown = true;
            },
            doStuff: function(){
                if (autoBattle.trimp.doppDown) return;
                autoBattle.trimp.attack *= 2;
                autoBattle.trimp.damageTakenMult *= 0.5;
                autoBattle.trimp.poisonRate++;
                if (autoBattle.trimp.dmgTaken >= autoBattle.trimp.maxHealth || autoBattle.enemy.dmgTaken >= autoBattle.enemy.health) this.onDeath();
            },
            noUpgrade: true,
            dustType: "shards"
        },

    },
    bonuses: {
        Extra_Limbs: {
            description: function(){
                return "Huffy can equip 1 additional item.<br/><br/>"
            },
            level: 0,
            price: 100,
            priceMod: 100
        },
        Radon: {
            description: function(){
                return "Increase all Radon earned by +10% per level.<br/>"
            },
            getMult: function(){
                return 1 + (this.level * 0.1);
            },
            level: 0,
            price: 30000,
            priceMod: 3
        },
        Stats: {
            description: function(){
                return "Increases Attack and Health in U2 by +10% per level.<br/>"
            },
            getMult: function(){
                return 1 + (this.level * 0.1);
            },
            level: 0,
            price: 20000,
            priceMod: 3
        },
        Scaffolding: {
            description: function(){
                return "Each level adds +100% Housing and increases the bonus of all other Scaffolds by 10%."
            },
            getMult: function(){
                return 1 + (this.level * Math.pow(1.1, this.level - 1))
            },
            level: 0,
            price: 50,
            useShards: true,
            priceMod: 10
        }
    },
    oneTimers: {
        Gathermate: {
            get description(){
                return "Gather 5% more Food, Wood, and Metal in U2 for each Spire Assault level cleared.";
            },
            owned: false,
            getMult: function(){
                return 1 + (0.05 * (autoBattle.maxEnemyLevel - 1));
            },
            requiredItems: 7
        },
        Smithriffic: {
            description: "Get an extra Smithy when completing Melting Point.",
            owned: false,
            requiredItems: 11
        },
        Championism: {
            description: "Unlock a new Perk!",
            owned: false,
            onPurchase: function(){
                game.portal.Championism.radLocked = false;
            },
            requiredItems: 15
        },
        Master_of_Arms: {
            description: "Huffy gains +200 Health, +10 Attack, and +2 Poison Damage.",
            owned: false,
            requiredItems: 19
        },
        Artisan: {
            get description(){
                return "All U2 Equipment costs 1% less for each SA level cleared. (Currently " + prettify((1 - this.getMult()) * 100) + "% cheaper)";
            },
            owned: false,
            getMult: function(){
                return Math.pow(0.99, autoBattle.maxEnemyLevel - 1);
            },
            requiredItems: 21
        },
        Battlescruff: {
            description: "Increases all Scruffy XP gained by +2% for each Spire Assault level cleared.",
            owned: false,
            requiredItems: 23
        },
        Collectology: {
            description: "Collectors add 2 Hubs each PLUS another extra Hub for every 30 Spire Assault levels cleared.",
            owned: false,
            requiredItems: 28,
            getHubs: function(){
                return 2 + Math.floor((autoBattle.maxEnemyLevel - 1) / 30);
            }
        },
        Dusty_Tome: {
            description: "+5% Dust found on all levels per Spire Assault level cleared.",
            owned: false,
            requiredItems: 32
        },
        Whirlwind_of_Arms: {
            description: "+1000 Health, +25 Attack, +10 Poison Damage.",
            owned: false,
            requiredItems: 34
        },
        Nullicious: {
            description: "Increase the base Nu value of U2 Heirlooms by 0.5% per Spire Assault level cleared.",
            owned: false,
            requiredItems: 36,
            getMult: function(){
                return 1 + ((autoBattle.maxEnemyLevel - 1) * 0.005);
            }
        },
        Suprism: {
            description: "Increases Prismatic Shield by 3% per Spire Assault level cleared.",
            getMult: function(){
                return ((autoBattle.maxEnemyLevel -1) * 0.03);
            },
            owned: false,
            requiredItems: 39,
        },
        The_Ring: {
            description: "Unlock The Ring.",
            owned: false,
            requiredItems: 42,
            useShards: true,
            onPurchase: function(){
                document.getElementById('autoBattleRingBtn').style.display = 'inline-block';
            }
        },
        Mass_Hysteria: {
            description: "Frenzy is always active.",
            owned: false,
            requiredItems: 45,
            useShards: true
        },
        Burstier: {
            description: "Gamma Burst now triggers at 4 stacks.",
            owned: false,
            requiredItems: 48,
            useShards: true
        }
    },
    fight: function(){
        if (!this.trimp || !this.enemy) this.resetCombat();
        this.enemy.lastAttack += this.frameTime;
        this.trimp.lastAttack += this.frameTime;

        this.enemy.maxHealth = this.enemy.baseHealth;
        this.trimp.maxHealth = this.trimp.baseHealth;
        this.enemy.attackSpeed = this.enemy.baseAttackSpeed;
        this.trimp.attackSpeed = this.trimp.baseAttackSpeed;
        this.trimp.attack = this.trimp.baseAttack;
        this.enemy.attack = this.enemy.baseAttack;

        this.trimp.shockChance = 0;
        this.trimp.shockMod = 0;
        this.trimp.shockTime = 0;
        
        this.trimp.bleedChance = 0;
        this.trimp.bleedMod = 0;
        this.trimp.bleedTime = 0;

        this.trimp.poisonChance = 0;
        this.trimp.poisonTime = 0;
        this.trimp.poisonMod = 0;
        this.trimp.poisonStack = 2;
        this.trimp.poisonTick = 1000;
        this.trimp.poisonHeal = 0;
        this.trimp.poisonRate = 1;

        this.trimp.shockResist = 0;
        this.trimp.poisonResist = 0;
        this.trimp.bleedResist = 0;

        this.trimp.defense = 0;
        this.trimp.lifesteal = 0;
        this.trimp.damageTakenMult = 1;
        this.trimp.slowAura = 1;

        this.trimp.dustMult = 0;
        
        this.checkItems();

        var trimpAttackTime = this.trimp.attackSpeed;
        if (this.trimp.lastAttack >= trimpAttackTime){
            this.trimp.lastAttack -= trimpAttackTime;
            this.attack(this.trimp, this.enemy);
        }
        this.checkPoison(this.trimp);
        if (this.trimp.bleed.time > 0) this.trimp.bleed.time -= this.frameTime;
        if (this.trimp.shock.time > 0) this.trimp.shock.time -= this.frameTime;
        if (this.enemy.health <= 0) {
            this.enemyDied();
            return;
        }
        if (this.trimp.health <= 0){
            this.trimpDied();
            return;
        }
        if (!this.enemy.noSlow) this.enemy.attackSpeed *= this.trimp.slowAura;
        var enemyAttackTime = this.enemy.attackSpeed;
        if (this.enemy.lastAttack >= enemyAttackTime){
            this.enemy.lastAttack -= enemyAttackTime;
            this.attack(this.enemy, this.trimp);
        }
        if (this.enemy.explodeFreq != -1){
            this.enemy.lastExplode += this.frameTime;
            if (this.enemy.lastExplode >= this.enemy.explodeFreq){
                this.enemy.lastExplode -= this.enemy.explodeFreq;
                var dmg = (this.enemy.explodeDamage * this.getAttack(this.enemy)) - this.trimp.defense;
                this.damageCreature(this.trimp, dmg);
            }
        }
        this.checkPoison(this.enemy);
        if (this.enemy.bleed.time > 0) this.enemy.bleed.time -= this.frameTime;
        if (this.enemy.shock.time > 0 && this.enemy.shock.time != 9999999) this.enemy.shock.time -= this.frameTime;
        if (this.trimp.health > this.trimp.maxHealth) this.trimp.health = this.trimp.maxHealth;
        if (this.enemy.health > this.enemy.maxHealth) this.enemy.health = this.enemy.maxHealth;
        if (this.trimp.health <= 0){
            this.trimpDied();
            return;
        }
        if (this.enemy.health <= 0) {
            this.enemyDied();
            return;
        }
    },
    checkItems: function(){
        if (this.oneTimers.Master_of_Arms.owned){
            this.trimp.maxHealth += 200;
            this.trimp.attack += 10;
            this.trimp.poisonMod += 2;
        }
        if (this.oneTimers.Whirlwind_of_Arms.owned){
            this.trimp.maxHealth += 1000;
            this.trimp.attack += 25;
            this.trimp.poisonMod += 10;
        }
        for (var x = 0; x < this.rings.mods.length; x++){
            var modObj = this.ringStats[this.rings.mods[x]];
            modObj.doStuff(this.getRingStatAmt(modObj));
        }
        var ringDmg = this.getRingStatusDamage();
        if (ringDmg > 0){
            ringDmg /= 100;
            this.trimp.bleedMod += ringDmg;
            this.trimp.shockMod += ringDmg;
            this.trimp.poisonMod += this.getRingPoisonDamage();
        }
        var ringChance = this.getRingStatusChance();
        if (ringChance > 0){
            this.trimp.bleedChance += ringChance;
            this.trimp.shockChance += ringChance;
            this.trimp.poisonChance += ringChance;
        }
        for (var item in this.items){
            var itemObj = this.items[item];
            if (!itemObj.equipped) continue;
            if (itemObj.doStuff)  itemObj.doStuff();
        }

        if (this.items.Sundering_Scythe.equipped && this.trimp.shockTime > 10000) this.trimp.shockTime = 10000;
        if (this.items.Blessed_Protector.equipped) this.items.Blessed_Protector.afterCheck();
        if (this.items.Grounded_Crown.equipped) this.items.Grounded_Crown.afterCheck();
        
        this.trimp.attackSpeed *= this.enemy.slowAura;
        if (this.trimp.attackSpeed <= 500){
            this.trimp.slowAura += ((500 - this.trimp.attackSpeed) / 1000)
            this.trimp.attackSpeed = 500;
        }
    },
    damageCreature: function(creature, dmg, fromGoo, ignoreEth){
        dmg *= creature.damageTakenMult;
        if (creature.isEthereal && !ignoreEth) creature.health += dmg;
        else {
            if (!fromGoo && creature.isTrimp && this.items.Goo_Golem.equipped && this.items.Goo_Golem.active()){
                creature.gooStored += dmg;
            }
            else {
                creature.health -= dmg;
                creature.dmgTaken += dmg;
            }
        }
        return dmg;
    },
    checkPoison: function(creature){
        var opponent = creature.isTrimp ? this.enemy : this.trimp;
        if (creature.poison.time > 0){
            creature.poison.lastTick += this.frameTime;
            var tickTime = opponent.poisonTick;
            if (creature.poison.lastTick >= tickTime){
                var shockMod = 1;
                if (creature.shock.time > 0){
                    shockMod += creature.shock.mod;
                }
                creature.poison.lastTick -= tickTime;
                creature.poison.time -= tickTime;
                var dmg = (creature.poison.mod * creature.poison.stacks * shockMod)
                dmg = this.damageCreature(creature, dmg);
                if (opponent.poisonHeal) {
                    var healFor = (opponent.poisonHeal * creature.poison.stacks);
                    if (this.items.The_Globulator.equipped) healFor *= 2;
                    this.trimp.health += healFor;
                    if (this.trimp.health > this.trimp.maxHealth) this.trimp.health = this.trimp.maxHealth;
                }
                if (creature.poison.time <= 0){
                    creature.poison.time = 0;
                    creature.poison.mod = 0;
                    creature.poison.lastTick = 0;
                    creature.poison.stacks = 0;
                    creature.poison.expired = true;
                    creature.poison.hitsAtMax = 0;
                }
            }
        }
    },
    getAttack: function(fighterObj){
        if (fighterObj.isTrimp) return fighterObj.attack;
        return fighterObj.attack * this.getEnrageMult() * this.getBerserkMult();
    },
    getBerserkMult: function(){
        if (this.enemy.berserkMod == -1) return 1;
        return Math.pow(this.enemy.berserkMod, Math.floor(this.enemy.berserkStack / this.enemy.berserkEvery));
    },
    rollDamage: function(attacker){
        var baseAttack = this.getAttack(attacker);
        var attack = baseAttack * 0.2;
        var roll = Math.floor(Math.random() * 201);
        roll -= 100;
        roll /= 100;
        return (baseAttack + (attack * roll));
    },
    attack: function(attacker, defender){
        var damage = this.rollDamage(attacker);
        var shockMod = 1;
        if (defender.shock.time > 0){
            shockMod = (1 + defender.shock.mod);
            damage *= shockMod;
        }
        damage -= defender.defense;
        if (damage < 0) damage = 0;
        damage = this.damageCreature(defender, damage);
        var atkLifesteal = attacker.lifesteal - defender.lifestealResist;
        if (atkLifesteal > 0){
            attacker.health += (damage * atkLifesteal);
            if (attacker.health > attacker.maxHealth) attacker.health = attacker.maxHealth;
        }
        if (attacker.bleed.time > 0){
            var attackerShock = 1;
            if (attacker.shock.time > 0){
                attackerShock = (1 + attacker.shock.mod);
            }
            var bdamage = this.getAttack(defender) * attacker.bleed.mod * attackerShock;
            bdamage -= attacker.defense;
            bdamage = this.damageCreature(attacker, bdamage);
            var defLifesteal = defender.lifesteal - attacker.lifestealResist;
            if (defLifesteal > 0){
                var healAmt = (bdamage * defLifesteal);
                if (defender.isTrimp && this.items.Recycler.equipped) healAmt *= 2;
                defender.health += healAmt;
                if (defender.health > defender.maxHealth) defender.health = defender.maxHealth;
            }
            if (attacker.bleed.time <= 0){
                attacker.bleed.time = 0;
                attacker.bleed.mod = 0;
            } 
        }
        var bleedChance = attacker.bleedChance - defender.bleedResist;
        if (bleedChance > 0 && attacker.bleedMod > 0 && attacker.bleedTime > 0 && (defender.bleed.time <= 0 || this.items.Sundering_Scythe.equipped && defender.bleed.time <= 5000)){
            var roll = Math.floor(Math.random() * 100);
            if (roll < bleedChance){
                if (this.items.Bloodstained_Gloves.equipped) this.items.Bloodstained_Gloves.onBleed();
                if (this.items.Bag_of_Nails.equipped) this.enemy.noSlow = true;
                if (defender.bleed.mod < attacker.bleedMod) defender.bleed.mod = (1 + attacker.bleedMod);
                if (defender.bleed.time < attacker.bleedTime) defender.bleed.time = attacker.bleedTime;
            }
        }
        var poisonChance = attacker.poisonChance - defender.poisonResist;
        if (poisonChance > 0 && attacker.poisonMod > 0 && attacker.poisonTime > 0){
            var roll = Math.floor(Math.random() * 100);
            if (roll < poisonChance){
                if (defender.poison.time < attacker.poisonTime) defender.poison.time = attacker.poisonTime;
                var stackRate = attacker.poisonRate;
                for (var x = 0; x < stackRate; x++){
                    defender.poison.mod = attacker.poisonMod;
                    if (defender.poison.stacks < attacker.poisonStack){
                        defender.poison.stacks++;
                        if (attacker.isTrimp && this.items.The_Globulator.equipped) this.items.The_Globulator.onPoisonStack(defender.poison.stacks);
                    }
                    else defender.poison.hitsAtMax++;
                }
            }
        }
        var shockChance = attacker.shockChance - defender.shockResist;
        if (shockChance > 0 && attacker.shockMod > 0 && attacker.shockTime > 0 && (defender.shock.time <= 0 || (defender.shock.time == 9999999 && attacker.shockMod > defender.shock.mod))){
            var roll = Math.floor(Math.random() * 100);
            if (roll < shockChance){
                if (attacker.isTrimp && this.items.Eelimp_in_a_Bottle.equipped) defender.lastAttack = 0;
                defender.shock.time = attacker.shockTime;
                defender.shock.mod = attacker.shockMod;
                defender.shock.count++;
            }
        }
        if (attacker.berserkMod != -1) attacker.berserkStack++;
        if (attacker.ethChance > 0) {
            var ethRoll = Math.floor(Math.random() * 100);
            if (ethRoll < attacker.ethChance) attacker.isEthereal = true;
            else attacker.isEthereal = false;
        }
    },
    resetCombat: function(resetStats){
        this.trimp = this.template();
        this.trimp.isTrimp = true;
        this.enemy = this.template();
        this.battleTime = 0;
        this.checkItems();
        this.trimp.health = this.trimp.maxHealth;
        this.enemy.level = this.enemyLevel;
        var atkSpdLevel = Math.min(this.enemyLevel, 29);
        this.enemy.baseAttackSpeed *= Math.pow(0.98, atkSpdLevel);
        if (this.enemyLevel >= 30){
            atkSpdLevel = this.enemyLevel - 29;
            this.enemy.slowAura = Math.pow(1.01, atkSpdLevel);
        }
        this.enemy.baseHealth *= Math.pow(1.205, (this.enemyLevel));
        this.enemy.baseAttack += (2 * (this.enemyLevel - 1));
        this.enemy.baseAttack *= Math.pow(1.04, this.enemyLevel);
        if (this.enemyLevel >= 50){
            var newLev = this.enemyLevel - 49;
            this.enemy.baseHealth *= Math.pow(1.1, newLev);
            this.enemy.baseAttack *= Math.pow(1.1, newLev);
        }
        this.enemy.defense += (0.5 * this.enemyLevel);
        this.enemy.poisonResist += this.enemyLevel;
        this.enemy.bleedResist += this.enemyLevel;
        this.enemy.shockResist += this.enemyLevel;
        if (this.enemyLevel >= 15) this.enemy.lifestealResist += (0.03 * (this.enemy.level - 14))
        if (this.enemyLevel >= 30) this.enemy.enrageMult = 1.5;
        this.setProfile();
        this.enemy.maxHealth = this.enemy.baseHealth;
        this.enemy.health = this.enemy.baseHealth;
        if (this.items.Fearsome_Piercer.equipped) this.items.Fearsome_Piercer.onEnemy();
        if (this.items.Sacrificial_Shank.equipped) this.items.Sacrificial_Shank.onEnemy();
        
        this.fight();
        if (resetStats) this.resetStats();
    },
    setProfile: function(){
        this.profile = "";
        if (this.enemyLevel == 1) return;
        var seed = this.seed;
        
        seed += (100 * this.enemyLevel);
        if (this.enemyLevel >= 51) seed += 3125; //Generated with Shold brain RNG
        var doubleResist = true;
        if (this.enemyLevel > 50){
            doubleResist = getRandomIntSeeded(seed++, 0, 100);
            doubleResist = (doubleResist < 20);
        }
        if (this.enemyLevel <= 50) doubleResist = true;
        var effects = ["Healthy", "Fast", "Strong", "Defensive"];
        if (this.enemyLevel > 5) {
            effects.push("Poisoning", "Bloodletting", "Shocking", "Lifestealing");
        }
        if (this.enemyLevel > 10){
            effects.push("Poison Resistant", "Shock Resistant", "Bleed Resistant");
        }
        if (this.enemyLevel > 20){
            effects.push("Enraging");
        }
        if (this.enemyLevel > 50){
            effects.push("Explosive", "Berserking", "Slowing", "Ethereal");
        }
        var effectsCount;
        if (this.enemyLevel < 25) effectsCount = Math.ceil((this.enemyLevel + 1) / 5);
        else effectsCount = 4 + (Math.ceil((this.enemyLevel - 19) / 10));
        var selectedEffects = [];
        var selectedEffectsCount = [];
        var maxEffectStack = 1;
        maxEffectStack += Math.floor(this.enemyLevel / 10);
        var healthMult = 1;
        var attackMult = 1;
        for (var x = 0; x < effectsCount; x++){
            var roll = getRandomIntSeeded(seed++, 0, effects.length);
            var effect = effects[roll];
            if (!doubleResist && effect.search("Resistant") != -1){
                var offset = this.enemyLevel % 3;
                roll = getRandomIntSeeded(seed++, 0, 100);
                if (roll >= 40){
                    if (offset == 0) effect = "Poison Resistant";
                    if (offset == 1) effect = "Shock Resistant";
                    if (offset == 2) effect = "Bleed Resistant";
                }
            }
            var checkSelected = selectedEffects.indexOf(effect);
            if (checkSelected == -1){
                selectedEffects.push(effect);
                selectedEffectsCount.push(1);
                checkSelected = selectedEffects.length - 1;
            }
            else {
                selectedEffectsCount[checkSelected]++;
            }
            if (selectedEffectsCount[checkSelected] >= maxEffectStack) {
                effects.splice(effects.indexOf(effect), 1);
            }
            var totalStacks = selectedEffectsCount[checkSelected];
            var repeatMod = 1;
            if (totalStacks > 1){
                repeatMod *= Math.pow(0.5, (totalStacks - 1));
            }
            switch(effect){
                case "Healthy":
                    var mod = this.enemyLevel / 30;
                    healthMult += Math.min(1, mod);
                    if (selectedEffectsCount[checkSelected] >= 4) effects.splice(effects.indexOf(effect), 1);
                    break;
                case "Strong":
                    var mod = this.enemyLevel / 30;
                    attackMult += Math.min(1, mod);
                    if (selectedEffectsCount[checkSelected] >= 4) effects.splice(effects.indexOf(effect), 1);
                    break;
                case "Fast":
                    var mod = Math.pow(0.98, this.enemyLevel);
                    this.enemy.baseAttackSpeed *= Math.max(0.5, mod);
                    if (selectedEffectsCount[checkSelected] >= 2) effects.splice(effects.indexOf(effect), 1);
                    break;
                case "Poisoning":
                    this.enemy.poisonChance += Math.ceil(this.enemyLevel * 3 * repeatMod);
                    this.enemy.poisonMod += (Math.ceil((this.enemyLevel / 5) * repeatMod));
                    if (this.enemyLevel >= 30) this.enemy.poisonMod += (this.enemyLevel - 29);
                    if (totalStacks == 1) this.enemy.poisonStack += (Math.floor(this.enemyLevel / 10));
                    else this.enemy.poisonStack++;
                    this.enemy.poisonTime = 2500 + (Math.ceil(this.enemyLevel / 5) * 2500);
                    break;
                case "Bloodletting":
                    this.enemy.bleedChance += Math.ceil(this.enemyLevel * 3 * repeatMod);
                    this.enemy.bleedMod += Math.ceil(Math.min(2, (this.enemyLevel / 20)) * repeatMod);
                    this.enemy.bleedTime = 8000;
                    break;
                case "Shocking":
                    this.enemy.shockChance += Math.ceil(this.enemyLevel * 3 * repeatMod);
                    this.enemy.shockMod += Math.ceil(Math.min(2.5, (this.enemyLevel / 15)) * repeatMod);
                    this.enemy.shockTime = 8000;
                    break;
                case "Poison Resistant":
                    this.enemy.poisonResist += (10 * this.enemyLevel);
                    effects.splice(effects.indexOf(effect), 1);
                    if (!doubleResist || selectedEffects.indexOf('Bleed Resistant') != -1) effects.splice(effects.indexOf('Shock Resistant'), 1);
                    if (!doubleResist || selectedEffects.indexOf('Shock Resistant') != -1) effects.splice(effects.indexOf('Bleed Resistant'), 1);
                    break;
                case "Bleed Resistant":
                    this.enemy.bleedResist += (10 * this.enemyLevel);
                    effects.splice(effects.indexOf(effect), 1);
                    if (!doubleResist || selectedEffects.indexOf('Poison Resistant') != -1) effects.splice(effects.indexOf('Shock Resistant'), 1);
                    if (!doubleResist || selectedEffects.indexOf('Shock Resistant') != -1) effects.splice(effects.indexOf('Poison Resistant'), 1);
                    break;
                case "Shock Resistant":
                    this.enemy.shockResist += (10 * this.enemyLevel);
                    effects.splice(effects.indexOf(effect), 1);
                    if (!doubleResist || selectedEffects.indexOf('Bleed Resistant') != -1) effects.splice(effects.indexOf('Poison Resistant'), 1);
                    if (!doubleResist || selectedEffects.indexOf('Poison Resistant') != -1) effects.splice(effects.indexOf('Bleed Resistant'), 1);
                    break;
                case "Defensive":
                    this.enemy.defense += Math.ceil((this.enemy.level * 0.75) * Math.pow(1.05, this.enemy.level));
                    break;
                case "Lifestealing":
                    this.enemy.lifesteal += Math.min(1, (this.enemyLevel / 50));
                    break;
                case "Enraging":
                    this.enemy.enrageFreq -= 10;
                    this.enemy.enrageMult += 0.1;
                    if (selectedEffectsCount[checkSelected] >= 2) effects.splice(effects.indexOf(effect), 1);
                    break;
                case "Slowing":
                    this.enemy.slowAura += 0.1;

                    break;
                case "Explosive":
                    var count = selectedEffectsCount[checkSelected];
                    if (count >= 3) effects.splice(effects.indexOf(effect), 1);
                    if (count == 1) {
                        this.enemy.explodeDamage = 1.5;
                        this.enemy.explodeFreq = 20000;
                    }
                    else {
                        this.enemy.explodeDamage += 0.3;
                        this.enemy.explodeFreq -= 5000;
                    }
                    effects.splice(effects.indexOf('Berserking'));
                    effects.splice(effects.indexOf('Ethereal'));
                    break;
                case "Berserking":
                    var count = selectedEffectsCount[checkSelected];
                    if (count >= 3) effects.splice(effects.indexOf(effect), 1);
                    if (count == 1) {
                        this.enemy.berserkMod = 1.05;
                        this.enemy.berserkEvery = 4;
                    }
                    else {
                        this.enemy.berserkMod += 0.05;
                        this.enemy.berserkEvery--;
                    }
                    effects.splice(effects.indexOf('Explosive'));
                    effects.splice(effects.indexOf('Ethereal'));
                    break;
                case "Ethereal":
                    var count = selectedEffectsCount[checkSelected];
                    if (count >= 3) effects.splice(effects.indexOf(effect), 1);
                    if (count == 1) {
                        this.enemy.ethChance = 10;
                    }
                    else {
                        this.enemy.ethChance += 5;
                    }
                    effects.splice(effects.indexOf('Explosive'));
                    effects.splice(effects.indexOf('Berserking'));
                    break;
            }
        }
        this.enemy.baseHealth *= healthMult;
        this.enemy.baseAttack *= attackMult;
        for (var x = 0; x < selectedEffects.length; x++){
            this.profile += selectedEffects[x];
            if (selectedEffectsCount[x] > 1) this.profile += " x" + selectedEffectsCount[x] + "";
            this.profile += ", ";
        }
        this.profile = this.profile.substring(0, this.profile.length - 2)
    },
    trimpDied: function(){
        this.sessionTrimpsKilled++;
        this.lootAvg.counter += this.battleTime;
        this.resetCombat();
        if (this.sessionEnemiesKilled < this.sessionTrimpsKilled) swapClass('abTab', 'abTabLosing', document.getElementById('autoBattleTab'));
        this.popup(true, true);
        //this.notes += "Trimp Died. "
    },
    getDustMult: function(){
        var amt = 1;
        if (this.items.Lifegiving_Gem.equipped){
            amt *= (1 + this.items.Lifegiving_Gem.dustIncrease());
        }
        if (this.oneTimers.Dusty_Tome.owned){
            amt += (0.05 * (this.maxEnemyLevel - 1));
        }
        amt += this.trimp.dustMult;
        // if (this.items.Corrupted_Gem.equipped){
        //     amt *= (1 + this.items.Corrupted_Gem.dustIncrease());
        // }
        return amt;
    },
    getEnrageMult: function(){
        var enrages = Math.floor(this.battleTime / (this.enemy.enrageFreq * 1000));
        if (enrages < 1) return 1;
        return Math.pow(this.enemy.enrageMult, enrages);
    },
    getDustReward: function(){
        var amt = (1 + ((this.enemy.level - 1) * 5)) * Math.pow(1.19, (this.enemy.level - 1));
        if (this.enemy.level >= 50) amt *= Math.pow(1.1, (this.enemy.level - 49));
        amt *= this.getDustMult();
        return amt;
    },
    enemyDied: function(){
        //this.notes += "Enemy Died. "
        this.sessionEnemiesKilled++;
        game.stats.saKills.value++;
        if (this.sessionEnemiesKilled >= 100 && this.sessionTrimpsKilled == 0 && this.enemyLevel >= 5) giveSingleAchieve("Huffstle");
        if (this.enemyLevel >= 20 && this.trimp.shockTime <= 0 && this.trimp.bleedTime <= 0 && this.trimp.poisonTime <= 0) giveSingleAchieve("Just Smack It");
        var amt = this.getDustReward();
        if (this.speed == 1) {
            this.dust += amt;
            game.stats.saDust.value += amt;
            if (this.enemyLevel > 50){
                this.shardDust += amt;
                if (this.shardDust >= 1e9){
                    var shardAmt = Math.floor(this.shardDust / 1e9);
                    this.shards += shardAmt;
                    this.shardDust -= 1e9 * shardAmt;
                    game.stats.saShards.value += shardAmt;
                }
            }
            
        }
        this.lootAvg.accumulator += amt;
        this.lootAvg.counter += this.battleTime;
        if (this.enemy.level == this.maxEnemyLevel && this.speed == 1){
            this.enemiesKilled++;
            if (this.enemiesKilled >= this.nextLevelCount()) {
                this.maxEnemyLevel++;
                game.stats.saHighestLevel.valueTotal = this.maxEnemyLevel;
                if (this.autoLevel) this.enemyLevel++;
                this.enemiesKilled = 0;
                this.resetStats();
            }
        }
        if (this.sessionEnemiesKilled > this.sessionTrimpsKilled) swapClass('abTab', 'abTabWinning', document.getElementById('autoBattleTab'));
        this.resetCombat();
        this.checkLastActions();
        this.popup(true, false, false, false, true);
    },
    nextLevelCount: function(){
        if (this.enemyLevel < 20) return 10 * this.enemyLevel;
        return (190 + (15 * (this.enemyLevel - 19)))
    },
    update: function(){
        if (game.global.highestRadonLevelCleared < 74) return;
        if (usingRealTimeOffline && this.speed > 1){
            this.settings.practice.enabled = 0;
            this.speed = 1;
        }
        for (var x = 0; x < this.speed; x++){
            this.fight();
            this.popup(true, true);
            this.battleTime += this.frameTime;
        }
    },    
    getMaxItems: function(){
        return this.maxItems + this.bonuses.Extra_Limbs.level;
    },
    getDustPs: function() {
        var dps = 0;
        if (this.lootAvg.accumulator == 0){
            if (!this.enemy) return 0;
            if (this.sessionTrimpsKilled > 0) return 0;
            if (this.enemy.health >= this.enemy.maxHealth) return 0;
            if (this.enemy.health <= 0 || this.trimp.health <= 0) return 0;
            var enPct = this.enemy.health / this.enemy.maxHealth;
            var tpPct = this.trimp.health / this.trimp.maxHealth;
            if (enPct > tpPct) return 0;
            var reward = this.getDustReward();
            dps = (1000 * ((reward * (1 - enPct)) / this.battleTime));
        }
        else dps = (1000 * (this.lootAvg.accumulator / this.lootAvg.counter));
        if (dps < 0.01) dps = 0;
        return dps;
    },
    resetStats: function(){
        this.sessionEnemiesKilled = 0;
        this.sessionTrimpsKilled = 0;
        this.lootAvg.accumulator = 0;
        this.lootAvg.counter = 0;
        this.battleTime = 0;
        swapClass('abTab', 'abTabNone', document.getElementById('autoBattleTab'));
    },
    //popup stuff
    equip: function(item){
        var itemObj = this.items[item];
        if (!itemObj.equipped){
            var count = this.countEquippedItems();
            if (count >= this.getMaxItems()) {
                this.notes = "<span class='red'>You can only equip " + this.getMaxItems() + " items at a time.</span>";
                return;
            }
        }
        if (!itemObj) return;
        itemObj.equipped = !itemObj.equipped;
        if (itemObj.hidden) this.restore(item);
        this.resetCombat(true);
        this.popup(true);
    },
    countEquippedItems: function(){
        var count = 0;
        for (var ck in this.items){
            if (this.items[ck].equipped) count++;
        }
        return count;
    },
    countOwnedItems: function(){
        var count = 0;
        for (var ck in this.items){
            if (this.items[ck].owned) count++;
        }
        return count;
    },
    getBonusCost: function(what){
        var bonus = this.bonuses[what];
        return Math.ceil(bonus.price * Math.pow(bonus.priceMod, bonus.level));
    },
    buyBonus: function(what){
        var bonus = this.bonuses[what];
        var cost = this.getBonusCost(what);
        if (bonus.useShards){
            if (this.shards < cost) return;
            this.shards -= cost;
        }
        else{
            if (this.dust < cost) return;
            this.dust -= cost;
        }
        bonus.level++;
        this.saveLastAction('bonus', what, cost);
        this.popup(true, false, true);
    },
    buyOneTimer: function(what){
        var bonus = this.oneTimers[what];
        var cost = this.oneTimerPrice(what);
        if (bonus.useShards){
            if (this.shards < cost) return;
            this.shards -= cost;
        }
        else{
            if (this.dust < cost) return;
            this.dust -= cost;
        }
        bonus.owned = true;
        if (bonus.onPurchase) bonus.onPurchase();
        this.saveLastAction('oneTimer', what, cost);
        this.popup(true, false, true);
    },
    hoverItem: function(item, upgrade){
        var itemObj = this.items[item];
        if (!itemObj) return;
        if (upgrade){
            this.notes = itemObj.upgrade + " per level";
        }
        else{
            this.notes = itemObj.description();
        }
        this.popup(true, true);
    },
    upgradeCost: function(item){
        var itemObj = this.items[item];
        if (!itemObj) return;
        var priceMod = 3;
        if (itemObj.priceMod) priceMod = itemObj.priceMod;
        var startPrice = 5;
        if (itemObj.startPrice) startPrice = itemObj.startPrice;
        return startPrice * Math.pow(priceMod, itemObj.level - 1);
    },
    upgrade: function(item){
        var itemObj = this.items[item];
        if (!itemObj) return; 
        var cost = this.upgradeCost(item);
        var currency = (this.items[item].dustType == "shards") ? this.shards : this.dust;
        if (currency < cost) return;
        this.saveLastAction("upgrade", item);
        if (this.items[item].dustType == "shards") this.shards -= cost;
        else this.dust -= cost;
        
        itemObj.level++;
        this.popup(false, false, true);
    },
    checkLastActions: function(){
        var somethinGood = false;
        for (var x = 0; x < this.lastActions.length; x++){
            if (this.lastActions[x][2] > this.dust || this.lastActions[x][6] > this.shards) {
                somethinGood = true;
                break;
            }
        }
        if (!somethinGood) this.lastActions = [];
    },
    saveLastAction: function(type, what, cost){
        var useShards = false;
        if (type == "ring" || ((type == "contract" || type == "cancelContract") && this.items[what].dustType == "shards")) useShards = true;
        if (type == "oneTimer" && this.oneTimers[what].useShards) useShards = true;
        else if (type == "bonus" && this.bonuses[what].useShards) useShards = true;
        if (type == "bonus" || type == "oneTimer" || type == "contract"){
            for (var x = 0; x < this.lastActions.length; x++){
                if (useShards) this.lastActions[x][6] -= cost;
                else this.lastActions[x][2] -= cost;
            }
            return;
        }
        if (type == "cancelContract"){
            for (var x = 0; x < this.lastActions.length; x++){
                if (useShards) this.lastActions[x][6] += cost;
                else this.lastActions[x][2] += cost;
            }
            return;
        }
        var lastLastAction = (this.lastActions.length) ? this.lastActions[this.lastActions.length - 1] : [];
        if (lastLastAction && lastLastAction[0] == 'upgrade' && type == 'upgrade' && lastLastAction[1] == what) lastLastAction[5]++;
        else if (lastLastAction && lastLastAction[0] == 'ring' && type == 'ring') lastLastAction[5]++;
        else if (type == "ring") this.lastActions.push(['ring', null, this.dust, this.maxEnemyLevel, this.enemiesKilled, 1, this.shards])
        else this.lastActions.push([type, what, this.dust, this.maxEnemyLevel, this.enemiesKilled, 1, this.shards]);
        if (this.lastActions.length > 3) this.lastActions.splice(0,1);
    },
    restoreLastAction: function(){
        var action = this.lastActions.splice(this.lastActions.length - 1, 1)[0];
        this.dust = action[2];
        this.shards = (action[6]) ? action[6] : 0;
        this.maxEnemyLevel = action[3];
        this.enemiesKilled = action[4];
        if (action[0] == "upgrade"){
            this.items[action[1]].level -= action[5];
        }
        else if (action[0] == "contract"){
            this.items[action[1]].equipped = false;
            this.items[action[1]].owned = false;
        }
        else if (action[0] == "ring"){
            this.rings.level -= action[5];
            var removeMods = this.rings.mods.length - this.getRingSlots();
            if (removeMods > 0){
                autoBattle.rings.mods.splice(autoBattle.rings.mods.length - removeMods, removeMods);
            }
        }
        if (this.enemyLevel > this.maxEnemyLevel) this.enemyLevel = this.maxEnemyLevel;
        this.confirmUndo = false;
        this.resetStats();
        this.resetCombat();
        this.checkLastActions();
        this.popup(false, false, true);
    },
    confirmUndo: false,
    confirmUndoClicked: function(){
        this.confirmUndo = !this.confirmUndo;
        this.popup(false, false, true);
    },
    levelDown: function(){
        if (this.enemyLevel > 1) {
            this.enemyLevel--;
            this.autoLevel = false;
            this.resetCombat(true);
        }
        this.updatePopupBtns();
    },
    levelUp: function(){

        if (this.enemyLevel < this.maxEnemyLevel){
            this.enemyLevel++;
            this.resetCombat(true);
        }
        this.updatePopupBtns();
    },
    toggleAutoLevel: function(){
        this.autoLevel = !this.autoLevel;
        if (this.autoLevel && this.enemyLevel != this.maxEnemyLevel){
            this.enemyLevel = this.maxEnemyLevel;
            this.resetCombat(true);
        }
        this.updatePopupBtns();
    },
    updatePopupBtns: function(){
        var downBtn = document.getElementById('abDecreaseLevel');
        var upBtn = document.getElementById('abIncreaseLevel');
        var autoBtn = document.getElementById('abAutoLevel');
        if (!downBtn || !upBtn || !autoBtn) return;
        var downBtnColor = (this.enemyLevel > 1) ? "autoItemUpgrade" : "autoColorGrey";
        var upBtnColor = (this.enemyLevel < this.maxEnemyLevel) ? "autoItemUpgrade" : "autoColorGrey";
        var autoBtnColor = (this.autoLevel) ? "autoItemEquipped" : "autoItemHide";
        swapClass("auto", downBtnColor, downBtn);
        swapClass("auto", upBtnColor, upBtn);
        swapClass("auto", autoBtnColor, autoBtn);
        autoBtn.innerHTML = "AutoLevel " + ((this.autoLevel) ? "On" : "Off");
    },
    swapPopup: function(to){
        if (to == "rings" && !this.oneTimers.The_Ring.owned) return;
        this.hideMode = false;
        this.popupMode = to;
        this.notes = "";
        this.confirmUndo = false;
        this.popup(false, false, true);
    },
    toggleHideMode: function(){
        this.hideMode = !this.hideMode;
        this.popupMode = "items";
        this.popup(false, false, true)
    },
    hide: function(itemName){
        this.items[itemName].hidden = true;
        if (this.items[itemName].equipped) this.items[itemName].equipped = false;
        this.popup(false, false, true);
    },
    restore: function(itemName){
        this.items[itemName].hidden = false;
        this.popup(false, false, true);
    },
    completedVoidMap: function(zone){
        if (!this.activeContract) return;
        var item = this.items[this.activeContract];
        if (zone < item.zone) return;
        //completed contract
        item.owned = true;
        message("You have fulfilled your Contract, and Huffy has gained access to " + this.cleanName(this.activeContract) + "!", "Notices");
        this.activeContract = "";
        this.popup(false,false,true);
    },
    abandonContract: function(){
        if (!this.activeContract) return;
        var price = this.contractPrice(this.activeContract);
        if (this.items[this.activeContract].dustType == "shards"){
            this.shards += price;
        }
        else{
            this.dust += price;
        }
        this.saveLastAction('cancelContract', this.activeContract, price);
        this.activeContract = "";
        this.popup(false,false,true);
    },
    acceptContract: function(item){
        if (this.activeContract) return;
        var price = this.contractPrice(item);
        var currency = (this.items[item].dustType == "shards") ? this.shards : this.dust;
        if (currency < price) return;
        this.saveLastAction('contract', item, price);
        if (this.items[item].dustType == "shards") this.shards -= price;
        else this.dust -= price; 
        this.activeContract = item;
        this.popup(false, false, true);
    },
    renamePresetTooltip: function(which){
        var text = "Rename Preset " + which + "<br/><input style='width: 75%; margin-left: 12.5%' id='abPresetNameInput' value='" + this.presets.names[which - 1] + "'/>"
        return text;
    },
    cleanName: function(name){
        return name.split("__").join("-").split("_").join(' ')
    },
    savePresetName: function(which){
        var input = document.getElementById('abPresetNameInput');
        if (!input) return;
        var value = input.value;
        if (value.length < 1) return;
	    value = htmlEncode(value.substring(0, 25));
        this.presets.names[which - 1] = value;
        autoBattle.popup(false,false,false,true);
    },
    help: function(){
        var text = "<ul>";
        text += "<li><b>Click on an item name to equip it. You can have 4 items equipped at the start</b>, but you can purchase 'Extra Limbs' under the Bonus button if you want some more!</li>";
        text += "<li>Huffy can progress to the next level of the Spire after killing the amount of Enemies listed next to your total Dust at the top of the SA window (\"Kill X\"). Huffy must be fighting at your highest reached level in order to progress this counter, otherwise it will say \"Farming\".</li>";
        text += "<li>Equipping or Unequipping an item will reset your \"Session Score\" at the top of the SA window.</li>";
        text += "<li>You can unlock new items for Huffy to use through the 'Contracts' tab. Once you have enough Dust to start a Contract, you'll need to complete a Void Map at or above the specified Zone in U2 to complete it and unlock the item.</li>";
        text += "<li>Defense is a flat damage reduction. Damage taken is equal to (Enemy Attack * Shock Modifier) - Defense.</li>";
        text += "<li>Lifesteal works on Bleed damage but not Poison damage. Lifesteal is based on final damage after Shock and Defense.</li>";
        text += "<li>Shock boosts Poison and Bleed damage as well as normal attack damage.</li>";
        text += "<li>Shocks and Bleeds cannot be applied while the Enemy already has that status effect. Poison can.</li>";
        text += "<li>Resistance against an effect works by subtracting your current resist from the Enemy's chance to cause that effect. If the Enemy has a 50% Poison Chance and you have 25% Poison Resist, the Enemy will have an effective 25% Poison Chance.</li>";      
        text += "<li>Enemy Affixes per level are based on a seed, but everyone has the same seed and sees the same affixes each level. Feel free to discuss strategy with others!</li>";
        text += "<li>Enemies gain +1 Affix every 5 Levels until 20, then gain +1 Affix every 10 Levels</li>";
        text += "<li>Huffy's minimum Attack Time is 0.5 seconds. Any reductions to Attack Time below 0.5 seconds will be converted to Slow Aura, making the Enemy attack up to 50% slower.</li>";
        text += "<li>The Dust reward formula is (1 + ((EnemyLevel - 1) * 5)) * (1.19^(EnemyLevel - 1))</li>";
        text += "<li>The Spire Assault window can be opened with hotkey \"i\"</li>";
        text += "</ul>";
        tooltip('confirm', null, 'update', text, 'autoBattle.popup()', "Spire Assault Help/FAQ", 'Back to Spire Assault', true);
        var elem = document.getElementById('tooltipDiv');
        swapClass('tooltipExtra', 'tooltipExtraLg', elem);
        elem.style.top = "10%";
        elem.style.left = "25%";
    },
    getFreshRings: function(){
        return {
            level: 1,
            mods: []
        }
    },

    getRingStatusDamage: function(){
        if (!this.oneTimers.The_Ring.owned) return 0;
        return this.rings.level * 25 * Math.pow(1.5, Math.floor(this.rings.level / 10));
    },
    getRingPoisonDamage: function(){
        if (!this.oneTimers.The_Ring.owned) return 0;
        return this.rings.level * 15 * Math.pow(5, Math.floor(this.rings.level / 10));
    },
    getRingStatusChance: function(){
        if (this.rings.level < 10) return 0;
        var calcLevel = this.rings.level - 9;
        return calcLevel * 20 * Math.pow(1.25, Math.floor(calcLevel / 10));
    },
    getRingStatAmt: function(modObj){
        return modObj.baseGain * this.rings.level * Math.pow(modObj.perTen, Math.floor(this.rings.level / 10))
    },
    getRingSlots: function(){
        var amt = Math.floor((this.rings.level - 5) / 10) + 1;
        if (amt > 2) amt = 2;
        return amt;
    },
    levelRing: function(){
        var cost = this.getRingLevelCost();
        if (this.shards < cost) return;
        this.saveLastAction("ring", null, cost);
        this.shards -= cost;
        this.rings.level++;
        var slots = this.getRingSlots();
        if (this.rings.mods.length < slots){
            var availableMods = this.getAvailableRingMods();
            var randomMod = availableMods[Math.floor(Math.random() * availableMods.length)];
            this.rings.mods.push(randomMod);
        }
        this.popup(false, false, true);
    },
    getAvailableRingMods: function(){
        var availableMods = [];
        var keys = Object.keys(autoBattle.ringStats);
        for (var x = 0; x < keys.length; x++){
            if (this.rings.mods.indexOf(keys[x]) == -1) availableMods.push(keys[x]);
        }
        return availableMods;
    },
    changeRing: function(elem, slot, useValue){
        var availableMods = this.getAvailableRingMods();
        if (!useValue) useValue = elem.value;
        if (availableMods.indexOf(useValue) == -1) return;
        if (slot > this.getRingSlots() - 1) return;
        this.rings.mods[slot] = useValue;
        this.resetCombat();
        this.popup(false, false, true);
    },
    getRingLevelCost: function(){
        return Math.ceil(15 * Math.pow(2, this.rings.level));
    },
    getRingUi: function(){
        var text = "<div class='ringContainer' style='text-align: center;'><span style='font-size: 1.2em'>The Ring - Level " + this.rings.level + "</span><br/>";
        text += "+ " + prettify(this.getRingStatusDamage()) + "% Bleed/Shock Damage<br/>";
        text += "+ " + prettify(this.getRingPoisonDamage()) + " Poison Damage<br/>";
        var chance = this.getRingStatusChance();
        if (chance > 0) text += "+ " + prettify(this.getRingStatusChance()) + "% Status Chance<br/>";
        for (var x = 0; x < this.rings.mods.length; x++){
            var mod = this.ringStats[this.rings.mods[x]];
            var amt = this.getRingStatAmt(mod);
            text += mod.formatEffect(amt) + "<br/>";
        }
        text += "</div><div class='ringContainer'>";
        if (this.rings.level < 5) text += "Level The Ring to 5 to earn your first customizable slot!";
        else{
            text += "<span style='font-size: 1.2em'>Customizable Slots:</span>"
            var slots = this.getRingSlots();
            var availableMods = this.getAvailableRingMods();
            var options = "";
            for (var x = 0; x < availableMods.length; x++){
                options += "<option value='" + availableMods[x] + "'>" + this.ringStats[availableMods[x]].name + "</option>";
            }
            for (var x = 0; x < slots; x++){
                text += "<select class='autoRingSelect' id='ringSlot" + x + "' onchange='autoBattle.changeRing(this, " + x + ")' value='" + this.rings.mods[x] + "'>";
                text += "<option selected='selected' value='" + this.rings.mods[x] + "'>" + this.ringStats[this.rings.mods[x]].name + "</option>";
                text += options;
                text += "</select>";
            }
            if (this.rings.level < 15) text += "Unlock another slot at Level 15!"
            
        }
        text += "</div><div class='ringContainer' style='text-align: center; padding-top: 2em;'><span class='btn btn-lg autoItemUpgrade' onclick='autoBattle.levelRing()' style='width: 90%'>Level Up! (" + prettify(this.getRingLevelCost()) + " Shards)</span><br/>";
        text += "Every level increases stats of all mods on The Ring.<br/>Every 10 levels, gains a bigger boost in power!<br/>"
        if (this.rings.level < 10) text += "Gains status chance starting at Level 10.<br/>" 
        text += "</div>";
        return text;
    },
    ringStats: {
            attack: {
                formatEffect: function(amt){
                    return "+ " + prettify(amt) + " Attack";
                },
                name: "Attack",
                doStuff: function(amt){
                    autoBattle.trimp.attack += amt;
                },
                baseGain: 50,
                perTen: 5
            },
            health: {
                formatEffect: function(amt){
                    return "+ " + prettify(amt) + " Health";
                },
                name: "Health",
                doStuff: function(amt){
                    autoBattle.trimp.maxHealth += amt;
                },
                baseGain: 200,
                perTen: 5,
            },
            defense: {
                formatEffect: function(amt){
                    return "+ " + prettify(amt) + " Defense";
                },
                name: "Defense",
                doStuff: function(amt){
                    autoBattle.trimp.defense += amt;
                },
                baseGain: 25,
                perTen: 2.5,
            },
            lifesteal: {
                formatEffect: function(amt){
                    return "+ " + prettify(amt) + "% Lifesteal";
                },
                name: "Lifesteal",
                doStuff: function(amt){
                    amt /= 100;
                    autoBattle.trimp.lifesteal += amt;
                },
                baseGain: 2.5,
                perTen: 4,
            },
            dustMult: {
                formatEffect: function(amt){
                    return "+ " + prettify(amt) + "% Dust Mult";
                },
                name: "Dust Mult",
                doStuff: function(amt){
                    amt /= 100;
                    autoBattle.trimp.dustMult += amt;
                },
                baseGain: 5,
                perTen: 2,
            }
    },
    getCurrencyName: function(item){
        var curName = this.items[item].dustType ? this.items[item].dustType : "dust";
        return curName.charAt(0).toUpperCase() + curName.slice(1);
    },
    updateBonusPrices: function(){
        for (var bonus in this.bonuses){
            var bonusObj = this.bonuses[bonus];
            if (bonusObj.useShards && this.maxEnemyLevel < 51) continue;
            var cost = this.getBonusCost(bonus);
            var costColor = ((!bonusObj.useShards && cost <= this.dust) || (bonusObj.useShards && cost <= this.shards)) ? "green" : "red";
            var elem = document.getElementById(bonus + "BonusPrice");
            if (!elem) return false;
            elem.className = costColor;
        }
        var oneCount = 0;
        var ownedItems = this.countOwnedItems();
        for (var oneTime in this.oneTimers){
            var oneObj = this.oneTimers[oneTime];
            if (oneObj.owned) continue;
            oneCount++;
            if (this.maxEnemyLevel >= 51 && oneCount >= 3) break;
            if (oneCount >= 4) break;
            var cost = this.oneTimerPrice(oneTime);
            var costColor = ((!oneObj.useShards && cost <= this.dust) || (oneObj.useShards && cost <= this.shards)) ? "green" : "red";
            if (ownedItems < oneObj.requiredItems){
                continue;
            }
            var elem = document.getElementById(oneTime + "BonusPrice");
            if (!elem) return false;
            elem.className = costColor;
        }
        return true;
    },
    hideMode: false,
    popup: function(updateOnly, statsOnly, itemsOnly, leaveMode, fromBattle){
        if (fromBattle){
            if (this.popupMode == "bonuses" && !this.updateBonusPrices()){
                itemsOnly = true;
                statsOnly = false;
            }
            else{
                statsOnly = true;
                itemsOnly = false;
            }
        }
        if (!updateOnly && !statsOnly && !itemsOnly) {
            if (!leaveMode) this.popupMode = "items";
            this.hideMode = false;
            this.confirmUndo = false;
        }
        if ((updateOnly || itemsOnly) && (lastTooltipTitle != "Spire Assault" || !game.global.lockTooltip)) return;
        if (usingRealTimeOffline){
            cancelTooltip();
            return;
        }
        var text = "";
        var totalFights = this.sessionEnemiesKilled + this.sessionTrimpsKilled;
        var pctWon = (totalFights > 0) ? "(" + Math.round((this.sessionEnemiesKilled / totalFights) * 100) + "%)" : "&nbsp;";
        var dustPs = this.getDustPs();
        var shardText = "";
        if (this.maxEnemyLevel > 50){
            shardText = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + prettify(this.shards) + " Shards";
            if (this.enemyLevel > 50){
                shardText += " (";
                var shardsPs = dustPs / 1e9;
                if (shardsPs >= 0.01 || shardsPs == 0) shardText += prettify(shardsPs) + " per sec)";
                else {
                    shardsPs = 1 / shardsPs;
                    shardText += "1 per " + prettify(shardsPs) + " sec)";
                }
            }
        }
        var topText = prettify(this.dust) + " Dust (" + prettify(dustPs) + " per sec)" + shardText + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + ((this.settings.practice.enabled == 1) ? "<b style='color: #921707'>Practicing</b>" : ((this.enemyLevel == this.maxEnemyLevel) ? "Kill " + (this.nextLevelCount() - this.enemiesKilled) : "Farming")) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Enemies Killed: " + this.sessionEnemiesKilled + "&nbsp;" + pctWon + "&nbsp;&nbsp;&nbsp;Fights Lost: " + this.sessionTrimpsKilled + "<br/>Enemy Level " + this.enemy.level + ((this.profile) ? " (" + this.profile + ")" : "") + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        var buttons = "";

        if (!(updateOnly && statsOnly)) buttons = "<div id='abLevelButtons'><span id='abDecreaseLevel' onclick='autoBattle.levelDown()' class='btn-md btn auto'>- Decrease Enemy Level -</span><span onclick='autoBattle.toggleAutoLevel()' id='abAutoLevel' class='btn btn-md auto'>Set AutoLevel On</span><span onclick='autoBattle.levelUp()' id='abIncreaseLevel' class='btn btn-md auto'>+ Increase Enemy Level +</span><span id='abHelpBtn' onclick='autoBattle.help()' class='icomoon icon-question-circle'></span><span id='abCloseBtn' onclick='cancelTooltip()' class='icomoon icon-close'></span></div>";
        text = "<div class='noselect'><div id='autoDust'>" + topText + "</div>" + buttons + "<div class='autoBattleTopName'>Huffy</div><div class='autoBattleTopName'>Enemy</div>";
        if (updateOnly || itemsOnly) document.getElementById('autoDust').innerHTML = topText;
        var trimpAttackTime = (this.trimp.attackSpeed);
        var enemyAttackTime = (this.enemy.attackSpeed);

        var hpPct = Math.min(100, ((this.trimp.health / this.trimp.maxHealth) * 100)).toFixed(2);
        var EhpPct = Math.min(100, ((this.enemy.health / this.enemy.maxHealth) * 100)).toFixed(2);
        var atkPct = Math.min(100, ((this.trimp.lastAttack / (trimpAttackTime / 1000)) / 10)).toFixed(2);
        var EatkPct = Math.min(100, ((this.enemy.lastAttack / (enemyAttackTime / 1000)) / 10)).toFixed(2);
        if ((updateOnly && statsOnly) || itemsOnly){
            document.getElementById('autoBattleTrimpHealthBar').style.width = hpPct + "%";
            document.getElementById('autoBattleTrimpAttackBar').style.width = atkPct + "%";
            document.getElementById('autoBattleTrimpHealth').innerHTML = prettify(this.trimp.health);
            document.getElementById('autoBattleTrimpHealthMax').innerHTML = prettify(this.trimp.maxHealth);
            document.getElementById('autoBattleEnemyHealthBar').style.width = EhpPct + "%";
            document.getElementById('autoBattleEnemyAttackBar').style.width = EatkPct + "%";
            document.getElementById('autoBattleEnemyHealth').innerHTML = prettify(this.enemy.health);
            document.getElementById('autoBattleEnemyHealthMax').innerHTML = prettify(this.enemy.maxHealth);
        }
        else{
            text += '<div class="autoBattleBarHolder"><div style="width: ' + hpPct + '%" class="progress-bar percentColorBlue" id="autoBattleTrimpHealthBar" role="progressbar"><span class="noselect innerFightBar"><span id="autoBattleTrimpHealth">' + prettify(this.trimp.health) + '</span>/<span id="autoBattleTrimpHealthMax">' + prettify(this.trimp.maxHealth) + '</span></span></div></div>';
            text += '<div class="autoBattleBarHolder"><div style="width: ' + EhpPct + '%" class="progress-bar rightBar percentColorBlue" id="autoBattleEnemyHealthBar" role="progressbar"><span class="noselect innerFightBar"><span id="autoBattleEnemyHealth">' + prettify(this.enemy.health) + '</span>/<span id="autoBattleEnemyHealthMax">' + prettify(this.enemy.maxHealth) + '</span></span></div></div>';
            text += '<div class="autoBattleBarHolder"><div style="width: ' + atkPct + '%" class="progress-bar percentColorYellow" id="autoBattleTrimpAttackBar" role="progressbar"><span class="innerFightBar">&nbsp;</span></div></div>';
            text += '<div class="autoBattleBarHolder"><div style="width: ' + EatkPct + '%" class="progress-bar rightBar percentColorYellow" id="autoBattleEnemyAttackBar" role="progressbar"><span class="innerFightBar">&nbsp;</span></div></div>';
        }
        var statsText = "";
        var things = ["trimp", "enemy"];
        for (var x = 0; x < things.length; x++){
            var fighterName = things[x];
            var fighterObj = this[fighterName];
            var opponentObj = (fighterObj.isTrimp) ? this.enemy : this.trimp;
            var attackTime = (fighterName == "trimp") ? trimpAttackTime : enemyAttackTime;
            attackTime /= 1000;
            var baseAttack = this.getAttack(fighterObj);
            var attackText = prettify(baseAttack) + " (" + prettify(baseAttack * 0.8) + " - " + prettify(baseAttack * 1.2) + ")";
            var dustBdText = (fighterName == "trimp") ? "<b>Dust Mult: </b>" + prettify(this.getDustMult() * 100) + "%" : "<b>Dust Value:</b> " + prettify(this.getDustReward());
            var lifestealFinal = Math.max(fighterObj.lifesteal - opponentObj.lifestealResist, 0) * 100;
            var lifestealDisplay;
            if (lifestealFinal <= 0 && fighterObj.lifesteal > 0) lifestealDisplay = prettify(lifestealFinal) + "% (" + prettify((fighterObj.lifesteal - opponentObj.lifestealResist) * 100) + "%)";
            else lifestealDisplay = prettify(lifestealFinal) + "%";

            statsText += "<div class='autoStats'><div class='autoStatsBreakup'><b>Attack:</b> " + attackText + "<br/><b>Attack Time:</b> " + prettify(attackTime) + "<br/><b>Defense:</b> " + prettify(fighterObj.defense) + "<br/><b>Lifesteal:</b> " + lifestealDisplay;
            statsText += "</div>";
            statsText += "<div class='autoStatsBreakup'>" + dustBdText + "<br/><b>Poison Resist:</b> " + prettify(fighterObj.poisonResist) + "%<br/><b>Bleed Resist:</b> " + prettify(fighterObj.bleedResist) + "%<br/><b>Shock Resist:</b> " + prettify(fighterObj.shockResist) + "%";
            statsText += "</div>";
            statsText += "<div class='autoStatsBreakup'>";
            if (fighterObj.isTrimp) statsText += "<b>Time:</b> " + formatSecondsAsClock(this.battleTime / 1000, 2) + "<br/>";
            else {
                var enrageFreq = this.enemy.enrageFreq;
                var baseMult = this.enemy.enrageMult;
                baseMult = (baseMult - 1) * 100;
                var currentMult = this.getEnrageMult();
                if (currentMult > 1) statsText += "<b>Enraged!</b> +" + prettify((currentMult - 1) * 100) + "% Attack. " + prettify(baseMult) + "% more every " + enrageFreq + " seconds.";
                else statsText += "<b>Enrages</b> every " + enrageFreq + " seconds, increasing Attack by " + prettify(baseMult) + "%.";
            }
            statsText += "<br/>";
            if (fighterObj.slowAura > 1)
            statsText += "<b>Slowing Aura:</b> " + prettify((fighterObj.slowAura - 1) * 100) + "%";
            statsText += "<br/>";
            if (fighterObj.lifestealResist)
            statsText += "<b>Lifesteal Resist:</b> " + prettify(fighterObj.lifestealResist * 100) + "%";
            statsText += "</div>";
            statsText += "<br/><b>Poisoned:</b> ";
            if (fighterObj.poison.time > 0){
                var timeText = (opponentObj.poisonTick != 1000) ? " every " + prettify(opponentObj.poisonTick / 1000) + " sec" : "every second";
                statsText += prettify(fighterObj.poison.mod * fighterObj.poison.stacks) + " damage " + timeText + " for " + (fighterObj.poison.time / 1000).toFixed(1) + " sec. (" + fighterObj.poison.stacks + "/" + opponentObj.poisonStack + ")";
            }
            else statsText += "None";
            statsText += "<br/><b>Bleed:</b> ";
            if (fighterObj.bleed.time > 0){
                statsText += "Taking " + prettify(fighterObj.bleed.mod * 100) + "% attack damage after each attack for " + (fighterObj.bleed.time / 1000).toFixed(1) + " sec.";
            }
            else statsText += "None";
            statsText += "<br/><b>Shock:</b> ";
            if (fighterObj.shock.time > 0){
                var shockTime = (fighterObj.shock.time == 9999999) ? "<span class='icomoon icon-infinity'></span>" : (fighterObj.shock.time / 1000).toFixed(1);
                statsText += "Taking " + prettify(fighterObj.shock.mod * 100) + "% more damage for " + shockTime + " sec.";
            }
            else statsText += "None";
            
            statsText += "<br/>"
            var freePmod = 0;
            if (this.oneTimers.Master_of_Arms.owned) freePmod += 2;
            if (this.oneTimers.Whirlwind_of_Arms.owned) freePmod += 10;
            var ringStatusChance = this.getRingStatusChance();
            var ringPoison = this.getRingPoisonDamage();
            var ringBleedShock = this.getRingStatusDamage();
            if (fighterObj.poisonChance > 0 && fighterObj.poisonTime > 0 && fighterObj.poisonMod > 0){
                statsText += prettify(fighterObj.poisonChance - opponentObj.poisonResist) + "% chance to poison for " + prettify(fighterObj.poisonTime / 1000) + " sec, dealing " + prettify(fighterObj.poisonMod) + " damage per second, stacking up to " + fighterObj.poisonStack + " times.";
            }
            else if ((fighterObj.poisonChance > 0 && (!ringStatusChance || ringStatusChance < fighterObj.poisonChance)) || fighterObj.poisonTime > 0 || (fighterObj.poisonMod > freePmod && (!ringPoison || ringPoison + freePmod < fighterObj.poisonMod))){
                statsText += "<span class='abError'>"
                if (fighterObj.poisonTime <= 0) statsText += "*You need an item that can create a Poison (Like Fists of Goo) to Poison.";
                else if (fighterObj.poisonChance <= 0 && (!this.rings.poison.poisonChance || this.rings.poison.poisonChance < fighterObj.poisonChance)) statsText += "*You need an item that grants Poison Chance to Poison.";
                else if (fighterObj.poisonMod <= 0) statsText += "*You need an item that grants Poison Damage to Poison.";
                statsText += "</span>";
            }
            statsText += "<br/>";
            if (fighterObj.bleedChance > 0 && fighterObj.bleedTime > 0 && fighterObj.bleedMod > 0){
                statsText += prettify(fighterObj.bleedChance - opponentObj.bleedResist) + "% chance to bleed enemies for " + prettify(fighterObj.bleedTime / 1000) + " sec, dealing attack damage plus " + prettify(fighterObj.bleedMod * 100) + "% after each enemy attack.";
            }
            else if ((fighterObj.bleedChance > 0 && (!ringStatusChance || ringStatusChance < fighterObj.bleedChance)) || fighterObj.bleedTime > 0 || (fighterObj.bleedMod > 0 && (!ringBleedShock || ringBleedShock / 100 < fighterObj.bleedMod))){
                statsText += "<span class='abError'>"
                if (fighterObj.bleedTime <= 0) statsText += "*You need an item that can create a Bleed (Like Rusty Dagger) to cause Bleeding.";
                else if (fighterObj.bleedChance <= 0) statsText += "*You need an item that grants Bleed Chance to cause Bleeding.";
                else if (fighterObj.bleedMod <= 0) statsText += "*You need an item that grants Bleed Damage to cause Bleeding.";
                statsText += "</span>";
            }
            statsText += "<br/>";
            
            if (fighterObj.shockChance > 0 && fighterObj.shockTime > 0 && fighterObj.shockMod > 0){
                statsText += prettify(fighterObj.shockChance - opponentObj.shockResist) + "% chance to shock for " + prettify(fighterObj.shockTime / 1000) + " sec, causing enemies to take " + prettify(fighterObj.shockMod * 100) + "% more damage from all sources.";
            }
            else if ((fighterObj.shockChance > 0 && (!ringStatusChance || ringStatusChance < fighterObj.shockChance)) || fighterObj.shockTime > 0 || (fighterObj.shockMod > 0 && (!ringBleedShock || ringBleedShock / 100 < fighterObj.shockMod))){
                statsText += "<span class='abError'>"
                if (fighterObj.shockTime <= 0 && !this.items.Nozzled_Goggles.equipped) statsText += "*You need an item that can create a Shock (Like Battery Stick) to Shock.";
                else if (fighterObj.shockChance <= 0) statsText += "*You need an item that grants Shock Chance to Shock.";
                else if (fighterObj.shockMod <= 0) statsText += "*You need an item that grants Shock Damage to Shock.";
                statsText += "</span>";
            }
            statsText += "<br/>";
            if (fighterName == "trimp"){
                if (this.items.Doppelganger_Signet.equipped){
                    statsText += "Doppelganger ";
                    if (this.trimp.doppDown) statsText += " Dead!";
                    else statsText += "Health: " + prettify(this.trimp.maxHealth - this.trimp.dmgTaken);
                    statsText += "&nbsp;&nbsp;&nbsp;&nbsp;"
                }
                if (this.items.Goo_Golem.equipped && this.items.Goo_Golem.active()){
                    statsText += "Goo Golem: " + prettify(this.trimp.gooStored) + " Stored";
                }
            }
            else if (this.enemyLevel > 50){
                if (fighterObj.explodeFreq != -1){
                    var explodeIn = ((fighterObj.explodeFreq - fighterObj.lastExplode) / 1000).toFixed(1);
                    statsText += "<b>Special:</b> Explodes for " + prettify(fighterObj.explodeDamage * 100) + "% attack damage in " + explodeIn + " sec";
                }
                else if (fighterObj.berserkMod != -1){
                    var mult = this.getBerserkMult();
                    statsText += "<b>Special:</b> Gains x" + fighterObj.berserkMod + " damage after every " + fighterObj.berserkEvery + " attacks. Currently x" + prettify(mult) + ".";
                }
                else if (fighterObj.ethChance > 0){
                    statsText += "<b>Special:</b> " + fighterObj.ethChance + "% chance per attack to turn ethereal, healing from all damage taken. ";
                    if (fighterObj.isEthereal) statsText += "**ETHEREAL**"
                }
                statsText += "<br/>";
            }
            statsText += "</div>"; 
    
        }
        if (updateOnly && statsOnly){
            var elem = document.getElementById('autoBattleStatsText');
            var notesElem = document.getElementById('autoBattleNotes');
            if (elem){
                if (notesElem) notesElem.innerHTML = this.notes;
                elem.innerHTML = statsText;
                if (!itemsOnly) return;
            }
        }
        text += "<div id='autoBattleStatsText'>" + statsText + "</div>";
        var itemsText = "Items (" + this.countEquippedItems() + "/" + this.getMaxItems() + " Equipped)"; 
        text += "<div id='autoBattleMenuButtons'><span id='abItemsBtn' onclick='autoBattle.swapPopup(\"items\")' class='btn btn-lg autoItemUpgrade darkBorder'>" + itemsText + "</span><span onclick='autoBattle.swapPopup(\"bonuses\")' class='btn btn-lg colorNavy'>Bonuses</span><span onclick='autoBattle.swapPopup(\"contracts\")' class='btn btn-lg colorVoidy darkBorder'>Contracts</span><span onclick='autoBattle.swapPopup(\"hidden\")' class='btn btn-lg autoColorOrange darkBorder'>Hidden Items</span><span class='btn btn-lg autoItemHide darkBorder' onclick='autoBattle.toggleHideMode()'>Hide Items</span>";
        text += "<span id='autoBattleRingBtn' onclick='autoBattle.swapPopup(\"rings\")' style='display: " + ((this.oneTimers.The_Ring.owned) ? 'inline-block' : 'none') + "' class='btn btn-lg autoColorTeal active darkBorder'>The Ring</span>";
        text += "<span onclick='autoBattle.swapPopup(\"other\")' class='btn btn-lg autoColorGrey active darkBorder'>Misc</span></div>";
        var notesElem = document.getElementById('autoBattleNotes');
        if (!notesElem || !itemsOnly) text +=  "<div id='autoBattleNotes'" + ((this.popupMode == "items" || this.popupMode == "hidden") ? "" : " style='display: none'") + ">" + this.notes + "</div>";
        if (this.popupMode == "items" || this.popupMode == "hidden") {
            if (notesElem) notesElem.style.display = 'block';
        }
        else if (notesElem && itemsOnly) notesElem.style.display = 'none';
        var extraClass = (this.popupMode == "other" || this.popupMode == "bonuses" || this.popupMode == "rings") ? "modeLg" : "modeNone";
        text += "<div id='autoItemsDiv' class='niceScroll " + extraClass + "'>"
        var itemsElem = document.getElementById('autoItemsDiv');
        if (itemsOnly && itemsElem){
            text = "";
            document.getElementById('abItemsBtn').innerHTML = itemsText;
            swapClass('mode', extraClass, itemsElem)
        }
        if (this.popupMode == "items" || this.popupMode == "hidden"){
            var itemList = this.getItemOrder();
            var line1 = "";
            var line2 = "";
            var count = 1;
            var total = 0;
            for (x = 0; x < itemList.length; x++){
                var item = itemList[x].name;
                var itemObj = this.items[item];
                if (!itemObj.owned) continue;
                if (itemObj.hidden != (this.popupMode == "hidden")) continue;
                if (count > 7){
                    text += "<div>" + line1 + "</div><div>" + line2 + "</div>";
                    line1 = "";
                    line2 = "";
                    count = 1;
                }
                
                var equipClass = (itemObj.equipped) ? "Equipped" : "NotEquipped"; 
                var upgradeCost = prettify(this.upgradeCost(item)) + " " + this.getCurrencyName(item);
                line1 += "<div class='autoItem autoItem" + equipClass + "' onclick='autoBattle.equip(\"" + item + "\")' onmouseover='autoBattle.hoverItem(\"" + item + "\")'>" + this.cleanName(item) + ((itemObj.noUpgrade) ? "" : " Lv " + itemObj.level) + "</div>";
                if (this.popupMode == "items"){
                    if (this.hideMode)
                        line2 += "<div class='autoItem autoItemHide' onclick='autoBattle.hide(\"" + item + "\")'>Hide</div>";
                    else if (itemObj.noUpgrade) line2 += "<div class='autoItem autoColorGrey'>Unupgradable</div>"
                    else 
                        line2 += "<div class='autoItem autoItemUpgrade' onclick='autoBattle.upgrade(\"" + item + "\")' onmouseover='autoBattle.hoverItem(\"" + item + "\", true)'>Upgrade (" + upgradeCost + ")</div>";
                }
                else if (this.popupMode == "hidden")
                    line2 += "<div class='autoItem autoItemRestore' onclick='autoBattle.restore(\"" + item + "\")'>Restore</div>";
                count++;
                total++
            }
            if (total == 0){
                if (this.popupMode == "hidden") line1 += "<br/><b style='color: white; padding: 2%;'>You have no hidden items right now, but can hide items you're no longer using using the 'Hide Items' button above.</b>";
                else line1 += "<br/><b>All of your items are hidden!</b>";
            }

            text += "<div>" + line1 + "</div><div>" + line2 + "</div><br/></div>";
        }
        else if (this.popupMode == "bonuses"){
            for (var bonus in this.bonuses){
                var bonusObj = this.bonuses[bonus];
                if (bonusObj.useShards && this.maxEnemyLevel < 51) continue;
                var cost = this.getBonusCost(bonus);
                var costText = ((!bonusObj.useShards && cost <= this.dust) || (bonusObj.useShards && cost <= this.shards)) ? "green" : "red";
                costText = "<span id='" + bonus + "BonusPrice' class='" + costText + "'>" + prettify(cost) + " " + ((bonusObj.useShards) ? "Shards" : "Dust") + "</span>";
                text += "<div id='" + bonus + "BonusBox' onclick='autoBattle.buyBonus(\"" + bonus + "\")' class='autoBonusBox'>" + this.cleanName(bonus) + "<br/>Level: " + bonusObj.level + " - " + costText + "<br/>" + bonusObj.description() + "<br/>Unlimited Purchases</div>";
            }
            var oneCount = 0;
            var ownedItems = this.countOwnedItems();
            for (var oneTime in this.oneTimers){
                var oneObj = this.oneTimers[oneTime];
                if (oneObj.owned) continue;
                oneCount++;
                if (this.maxEnemyLevel >= 51 && oneCount >= 3) break;
                if (oneCount >= 4) break;
                var cost = this.oneTimerPrice(oneTime);
                var costText = ((!oneObj.useShards && cost <= this.dust) || (oneObj.useShards && cost <= this.shards)) ? "green" : "red";

                costText = "<span id='" + oneTime + "BonusPrice' class='" + costText + "'>" + prettify(cost) + " " + ((oneObj.useShards) ? "Shards" : "Dust") + "</span>";
                if (ownedItems < oneObj.requiredItems){
                    var need = (oneObj.requiredItems - ownedItems);
                    text += "<div class='autoBonusBox autoOneTimerNotOwned' style='padding-top: 2%'><br/>Complete " + need + " more Contract" + needAnS(need) + " to reveal this bonus!</div>";
                }
                else text += "<div onclick='autoBattle.buyOneTimer(\"" + oneTime + "\")' class='autoBonusBox autoOneTimerNotOwned'>" + this.cleanName(oneTime) + "<br/>" + costText + "<br/>" + oneObj.description + "</div>";
            }
            text += "<br/>";
            for (var oneTime in this.oneTimers){
                var oneObj = this.oneTimers[oneTime];
                if (!oneObj.owned) continue;
                text += "<div class='autoBonusBox autoOneTimerOwned'>" + this.cleanName(oneTime) + "<br/><span class='green'>Owned!</span><br/>" + oneObj.description + "</div>";
            }
            text += "</div>";
        }
        else if (this.popupMode == "contracts"){
            var contracts = this.getContracts();
            for (var x = 0; x < contracts.length; x++){
                var item = contracts[x];
                var itemObj = this.items[item];
                var accepted = (this.activeContract == item) ? " accepted" : "";
                var description;
                if (accepted) description = "You have paid the Dust and accepted this Contract.<br/>Huffy will gain access to this item as soon as you<br/><b style='font-size:1.3em'>Complete a U2 Z" + itemObj.zone + "+ Void Map</b>";
                else description = itemObj.description();
                var extraClass = "";
                if (itemObj.longText) extraClass = " descriptionSm";
                text += "<div class='contractBox" + accepted + "'><div class='contractTitle'>" + this.cleanName(item) + "</div><div class='contractDescription" + extraClass + "'>" + description + "</div>";
                if (accepted) text += "<span onclick='autoBattle.abandonContract()' class='btn btn-lg autoItemHide'>Abandon and Refund</span>";
                else if (!this.activeContract) text += "<span onclick='autoBattle.acceptContract(\"" + item + "\")' class='btn btn-lg colorVoidy'>Accept (" + prettify(this.contractPrice(item)) + " " + this.getCurrencyName(item) + ", Complete a Z" + itemObj.zone + " Void Map)</span>";
                else text += "<span class='btn btn-lg autoColorGrey'>Other Contract in Progress</span>";
                text += "</div>";
            }
            if (contracts.length < 3){
                var extraText = (contracts.length == 0) ? "There are no Contracts left to complete! Huffy is geared to the teeth!" : "&nbsp;";
                text += "<div class='contractBox' style='width: " + (33.3 * (3 - contracts.length)).toFixed(2) + "%'><div class='contractTitle'>&nbsp;</div><div class='contractDescription'>" + extraText + "</div><span class='btn btn-lg colorVoidy' style='visibility: hidden'>&nbsp</span>"
            }
        }
        else if (this.popupMode == "other"){
            text += "<div class='abOptions'>Settings:&nbsp;";
            for (var setting in this.settings){
                var thisSetting = this.settings[setting];
                if (typeof thisSetting.hideUnless !== 'undefined' && !thisSetting.hideUnless()) continue;
                var className = (thisSetting.enabled) ? "autoItemEquipped" : "autoItemHide";
                text += "<span class='btn btn-md " + className + "' onclick='autoBattle.toggleSetting(\"" + setting + "\")'>" + thisSetting.text[thisSetting.enabled] + "</span>";
            }
            text += "</div>";
            text += "<div class='abMiscBox'><b style='font-size: 1.1em;'>Undo last change</b><br/>";
            var action = this.lastActions[this.lastActions.length - 1];
            if (action){
                if (!this.confirmUndo) text += "<span class='btn autoItemUpgrade btn-md' onclick='autoBattle.confirmUndoClicked()'>Undo</span>";
                else text += "<b>Are you sure?!</b><br/><span class='btn autoItemUpgrade btn-md' onclick='autoBattle.restoreLastAction()'>Yes, Undo</span><span class='btn autoItemHide btn-md' onclick='autoBattle.confirmUndoClicked()'>No, Cancel</span>";
                text += "<br/>";
                if (action[0] == "ring"){
                    text += "Downgrade your ring by " + action[5] + " level" + needAnS(action[5]);
                }
                else {
                    var itemName = this.cleanName(action[1]);
                    text += "Downgrade " + itemName + " by " + action[5] + " level" + needAnS(action[5]);
                }
                text += ", and <b>SET YOUR DUST TO " + prettify(action[2]);
                if (this.maxEnemyLevel >= 51) text += " AND SHARDS TO " + prettify(action[6]);
                text += "</b> (The amount you had the moment before the upgrade).";
                if (this.maxEnemyLevel > action[3]) text += " Your progress will be set back to level " + action[3] + ".";
                else if (this.enemiesKilled > action[4]) text += " Your kill counter will be reduced by " + prettify(this.enemiesKilled - action[4]) + ".";
                text += "<br/>";
            }
            else text += "Undoing your last 3 actions would still leave you with less currency than you have now."
            text += "</div>"
            for (var x = 1; x <= 3; x++){
                var pname = 'p' + x;
                var preset = this.presets[pname];
                text += "<div class='abMiscBox preset'><b style='font-size: 1.1em;'>" + this.presets.names[x-1] + "</b><br/>";
                text += "<span class='btn autoItemEquipped btn-md' onclick='autoBattle.savePreset(\"p" + x + "\")'>Save</span>";
                if (preset.length) text += "<span class='btn autoItemUpgrade btn-md' onclick='autoBattle.loadPreset(\"p" + x + "\")'>Load</span>";
                text += "<span class='btn autoColorOrange btn-md' onclick='tooltip(\"Rename SA Preset\", null, \"update\", " + x + ")'>Rename</span>";
                text += "<div class='presetItems'>";
                var pname = 'p' + x;
                var preset = this.presets[pname];
                if (!preset.length) text += "Nothing Yet";
                for (var y = 0; y < preset.length; y++){
                    if (Array.isArray(preset[y])){
                        if (preset[y][0] == "level" && this.settings.loadLevel.enabled) text += ". Level " + preset[y][1];
                        if (preset[y][0] == "ring" && this.settings.loadRing.enabled){
                            text += ". Ring: ";
                            for (var z = 1; z < preset[y].length; z++){
                                if (z != 1) text += ", ";
                                text += autoBattle.ringStats[preset[y][z]].name
                            }
                        }
                        continue;
                    }
                    if (!this.items[preset[y]] || !this.items[preset[y]].owned) continue;
                    if (y != 0) text += ", ";
                    text += this.cleanName(preset[y]);
                }
                text += "</div>";

                text += "</div>";
            }
            text += "</div>";
        }
        else if (this.popupMode == "rings"){
            text += this.getRingUi();
        }        
        if (itemsOnly && itemsElem){
            itemsElem.innerHTML = text;
        }
        else text += "</div>";
        var scrollTop = 0;
        if (itemsElem){
            scrollTop = itemsElem.scrollTop;
        }
        if (!(itemsOnly && itemsElem)) tooltip('confirm', null, 'update', text, '', 'Spire Assault', 'Close', false, true)
        if (!(updateOnly && statsOnly)) this.updatePopupBtns();
        if (scrollTop > 0){
            itemsElem = document.getElementById('autoItemsDiv');
            if (itemsElem){
                itemsElem.scrollTop = scrollTop;
            }
        }
    }
}