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

//Spoilers ahead, proceed with caution
function newGame () {
var toReturn = {
	global: {
		//New and accurate version
		stringVersion: '5.6.4',
		//Leave 'version' at 4.914 forever, for compatability with old saves
		version: 4.914,
		isBeta: false,
		betaV: 0,
		killSavesBelow: 0.13,
		uniqueId: new Date().getTime() + "" + Math.floor(Math.random() * 1e10),
		playerGathering: "",
		playerModifier: 1,
		buildingsQueue: [],
		timeLeftOnCraft: 0,
		crafting: "",
		timeLeftOnTrap: -1,
		world: 1,
		universe: 1,
		gridArray: [],
		mapGridArray: [],
		mapsOwnedArray: [],
		currentMapId: "",
		lastClearedCell: -1,
		lastClearedMapCell: -1,
		pauseFight: true,
		soldierHealth: 0,
		soldierHealthMax: 0,
		soldierHealthRemaining: 0,
		soldierCurrentAttack: 0,
		soldierCurrentBlock: 0,
		soldierEnergyShield: 0,
		soldierEnergyShieldMax: 0,
		shieldLayersUsed: 0,
		fighting: false,
		health: 50,
		attack: 6,
		block: 0,
		autoBattle: false,
		autoCraftModifier: 0,
		start: new Date().getTime(),
		time: 0,
		portalTime: new Date().getTime(),
		lastFightUpdate: "",
		battleCounter: 0,
		firing: false,
		mapsActive: false,
		preMapsActive: false,
		switchToMaps: false,
		switchToWorld: false,
		lookingAtMap: "",
		mapsOwned: 0,
		totalMapsEarned: 0,
		freshFight: false,
		tab: "All",
		repeatMap: false,
		buyAmt: 1,
		numTab: 1,
		spreadsheetMode: false,
		lockTooltip: false,
		portalActive: false,
		mapsUnlocked: false,
		lastOnline: 0,
		buyTab: "all",
		nextQueueId: 0,
		kongBonusMode: false,
		canRespecPerks: true,
		respecActive: false,
		heliumLeftover: 0,
		viewingUpgrades: false,
		totalPortals: 0,
		totalRadPortals: 0,
		lastCustomAmt: 1,
		trapBuildAllowed: false,
		trapBuildToggled: false,
		lastSkeletimp: 0,
		pp: [],
		highestLevelCleared: 0,
		highestRadonLevelCleared: 0,
		b: 0,
		challengeActive: "",
		selectedChallenge: "",
		lastOfflineProgress: "",
		sLevel: 0,
		portalColor: 0,
		totalGifts: 0,
		brokenPlanet: false,
		formation: 0,
		bestHelium: 0,
		tempHighHelium: 0,
		totalHeliumEarned: 0,
		bestRadon: 0,
		tempHighRadon: 0,
		totalRadonEarned: 0,
		radonLeftover: 0,
		newUniverse: 1,
		removingPerks: false,
		lastBreedTime: 0,
		antiStacks: 0,
		prisonClear: 0,
		frugalDone: false,
		glassDone: false,
		lastUnlock: 0,
		lowestGen: -1,
		breedBack: -1,
		titimpLeft: 0,
		mapBonus: 0,
		mapRunCounter: 0,
		mapCounterGoal: 0,
		slowDone: false,
		turkimpTimer: 0,
		statsMode: "current",
		achievementBonus: 0,
		lastLowGen: 0,
		presimptStore: "food",
		lastWarp: 0,
		zoneStarted: new Date().getTime(),
		mapStarted: new Date().getTime(),
		bionicOwned: 0,
		roboTrimpLevel: 0,
		roboTrimpCooldown: 0,
		useShriek: false,
		usingShriek: false,
		autoUpgrades: false,
		autoUpgradesAvailable: false,
		autoPrestiges: 0,
		autoStorage: false,
		autoStorageAvailable: false,
		totalVoidMaps: 0,
		voidMapsToggled: false,
		voidBuff: "",
		lastVoidMap: 0,
		voidSeed: Math.floor(Math.random() * 1000000),
		scrySeed: Math.floor(Math.random() * 1000000),
		heirloomSeed: Math.floor(Math.random() * 1000000),
		coreSeed: Math.floor(Math.random() * 1000000),
		heirloomBoneSeed: Math.floor(Math.random() * 1000000),
		bestHeirloomSeed: Math.floor(Math.random() * 1000000),
		eggSeed: Math.floor(Math.random() * 1000000),
		mutationSeed: Math.floor(Math.random() * 1000000),
		enemySeed: Math.floor(Math.random() * 1000000),
		u2WorldSeed: Math.floor(Math.random() * 1000000),
		reincarnateSeed: Math.floor(Math.random() * 1000000),
		heirloomsExtra: [],
		heirloomsCarried: [],
		StaffEquipped: {},
		ShieldEquipped: {},
		CoreEquipped: {},
		nullifium: 0,
		maxCarriedHeirlooms: 1,
		selectedHeirloom: [],
		lastPortal: -1,
		lastRadonPortal: 0,
		addonUser: false,
		eggLoc: -1,
		researched: false,
		bonePortalThisRun: false,
		maxSplit: 1,
		maxSoldiersAtStart: -1,
		playFabLoginType: -1,
		lastCustomExact: 1,
		voidMaxLevel: -1,
		voidMaxLevel2: -1,
		rememberInfo: false,
		spireActive: false,
		spireDeaths: 0,
		Geneticistassist: false,
		GeneticistassistSetting: -1,
		GeneticistassistSteps: [-1, 1, 10, 30],
		spireRows: 0,
		goldenUpgrades: 0,
		voidDeaths: 0,
		essence: 0,
		spentEssence: 0,
		skeleSeed: Math.floor(Math.random() * 1000000),
		decayDone: false,
		dailyChallenge: {},
		recentDailies: [],
		dailyHelium: 0,
		breedTime: 1,
		magmite: 0,
		magmaFuel: 0,
		generatorMode: 1, //0 passive, 1 active, 2 hybrid
		trimpsGenerated: 0,
		timeSinceLastGeneratorTick: -1,
		canMagma: true,
		lastBonePresimpt: 0,
		runningChallengeSquared: false,
		totalSquaredReward: 0,
		ArchaeologyDone: false,
		archString: "",
		archThresh: 50,
		trackedAchieve: null,
		mayhemCompletions: 0,
		pandCompletions: 0,
		perkPresetU1: {
			perkPreset1: {},
			perkPreset2: {},
			perkPreset3: {}
		},
		perkPresetU2: {
			perkPreset1: {},
			perkPreset2: {},
			perkPreset3: {}
		},
		improvedAutoStorage: false,
		firstCustomAmt: -1,
		firstCustomExact: -1,
		autoGolden: -1,
		autoGoldenU2: -1,
		autoStructureSetting: {enabled: false},
		autoStructureSettingU2: {enabled: false},
		autoJobsSetting: {enabled: false},
		autoJobsSettingU2: {enabled: false},
		autoEquipSetting: {enabled: false},
		autoEquipSettingU2: {enabled: false},
		autoEquipUnlocked: false,
		passive: true,
		spiresCompleted: 0,
		lastSpireCleared: 0,
		sugarRush: 0,
		holidaySeed: Math.floor(Math.random() * 100000),
		hideMapRow: false,
		mapExtraBonus: "",
		realBreedTime: 0,
		fluffyExp: 0,
		fluffyExp2: 0,
		fluffyPrestige: 0,
		fluffyPrestige2: 0,
		selectedMapPreset: 1,
		runFluffyExp: 0,
		runTokens: 0,
		bestTokens: 0,
		genPaused: false,
		canMapAtZone: false,
		capTrimp: false,
		lastSoldierSentAt: new Date().getTime(),
		supervisionSetting: 100,
		canScryCache: false,
		waitToScry: false,
		waitToScryMaps: false,
		freeTalentRespecs: 3,
		genStateConfig: [],
		uberNature: "",
		//For the log notation base 
		logNotBase: 10,
		lowestShield: 100,
		hemmTimer: 150,
		armyAttackCount: 0,
		fightAttackCount: 0,
		mapHealthActive: false,
		voidPowerActive: false,
		stormDone: false,
		exterminateDone: false,
		parityBonus: 1,
		hazShieldCredit: 0,
		zoneRes: [0],
		alchemyUnlocked: false,
		farmlandsUnlocked: false,
		potionData: null,
		potionAuto: null,
		autoBattleData: null,
		canGuString: false,
		guString: "",
		lastU2Voids: 0,
		lastHeirlooms: {
			u1: {
				Shield: -1,
				Staff: -1
			},
			u2: {
				Shield: -1,
				Staff: -1
			}
		},
		mapPresets: {
			p1: {
				loot: 0,
				difficulty: 0,
				size: 0,
				biome: "Random",
				specMod: "0",
				perf: false,
				extra: 0,
				offset: 'd'
			},
			p2: {
				loot: 0,
				difficulty: 0,
				size: 0,
				biome: "Random",
				specMod: "0",
				perf: false,
				extra: 0,
				offset: 'd'	
			},
			p3: {
				loot: 0,
				difficulty: 0,
				size: 0,
				biome: "Random",
				specMod: "0",
				perf: false,
				extra: 0,
				offset: 'd'
			},
			p4: {
				loot: 0,
				difficulty: 0,
				size: 0,
				biome: "Random",
				specMod: "0",
				perf: false,
				extra: 0,
				offset: 'd'
			},
			p5: {
				loot: 0,
				difficulty: 0,
				size: 0,
				biome: "Random",
				specMod: "0",
				perf: false,
				extra: 0,
				offset: 'd'	
			}
		},
		mapPresets2: {
			p1: {
				loot: 0,
				difficulty: 0,
				size: 0,
				biome: "Random",
				specMod: "0",
				perf: false,
				extra: 0,
				offset: 'd'
			},
			p2: {
				loot: 0,
				difficulty: 0,
				size: 0,
				biome: "Random",
				specMod: "0",
				perf: false,
				extra: 0,
				offset: 'd'	
			},
			p3: {
				loot: 0,
				difficulty: 0,
				size: 0,
				biome: "Random",
				specMod: "0",
				perf: false,
				extra: 0,
				offset: 'd'
			},
			p4: {
				loot: 0,
				difficulty: 0,
				size: 0,
				biome: "Random",
				specMod: "0",
				perf: false,
				extra: 0,
				offset: 'd'
			},
			p5: {
				loot: 0,
				difficulty: 0,
				size: 0,
				biome: "Random",
				specMod: "0",
				perf: false,
				extra: 0,
				offset: 'd'	
			}
		},
		lootAvgs: {
			food: {average:0, accumulator: 0},
			wood: {average:0, accumulator: 0},
			metal: {average:0, accumulator: 0},
			gems: {average:0, accumulator: 0},
			fragments: {average:0, accumulator: 0},
			science: {average:0, accumulator: 0}
		},
		menu: {
			buildings: true,
			jobs: false,
			upgrades: false
		},
		messages: {
			Story: {
				enabled: true
			},
			Loot: {
				enabled: true,
				primary: true,
				secondary: true,
				bone: true,
				exotic: true,
				helium: true,
				essence: true,
				token: true,
				magma: true,
				events: true,
				cache: true,
				exp: true,
				//runetrinkets: true,
			},
			Unlocks: {
				enabled: true,
				repeated: true,
				unique: true
			},
			Combat: {
				enabled: true,
				trimp: true,
				enemy: true
			},
			Notices: {
				enabled: true
			}
		},
		prestige: {
			attack: 13,
			health: 14,
			cost: 57,
			block: 10
		},
		difs: {
			attack: 0,
			health: 0,
			block: 0,
			trainers: 0
		},
		getEnemyAttack: function (level, name, ignoreImpStat) {
			var world = getCurrentMapObject();
			var amt = 0;
			world = (game.global.mapsActive) ? world.level : game.global.world;
			var attackBase = (game.global.universe == 2) ? 750 : 50;
			amt += attackBase * Math.sqrt(world) * Math.pow(3.27, world / 2);
			amt -= 10;
			if (world == 1){
				amt *= 0.35;
				amt = (amt * 0.20) + ((amt * 0.75) * (level / 100));
			}
			else if (world == 2){
				amt *= 0.5;
				amt = (amt * 0.32) + ((amt * 0.68) * (level / 100));
			}
			else if (world < 60)
				amt = (amt * 0.375) + ((amt * 0.7) * (level / 100));
			else{
				amt = (amt * 0.4) + ((amt * 0.9) * (level / 100));
				amt *= Math.pow(1.15, world - 59);
			}
			if (world < 60) amt *= 0.85;
			if (world > 6 && game.global.mapsActive) amt *= 1.1;
			if (!ignoreImpStat)
				amt *= game.badGuys[name].attack;
			if (game.global.universe == 2){
				var part1 = (world > 40) ? 40 : world;
				var part2 = (world > 60) ? 20 : world - 40;
				var part3 = (world - 60);
				if (part2 < 0) part2 = 0;
				if (part3 < 0) part3 = 0;
				amt *= Math.pow(1.5, part1);
				amt *= Math.pow(1.4, part2);
				amt *= Math.pow(1.32, part3);
			}
			return Math.floor(amt);
		},
		getEnemyHealth: function (level, name, ignoreImpStat) {
			var world = getCurrentMapObject();
			world = (game.global.mapsActive) ? world.level : game.global.world;
			var amt = 0;
			var healthBase = (game.global.universe == 2) ? 10e7 : 130;
			amt += healthBase * Math.sqrt(world) * Math.pow(3.265, world / 2);
			amt -= 110;
			if (world == 1 || world == 2 && level < 10){
				amt *= 0.6;
			amt = (amt * 0.25) + ((amt * 0.72) * (level / 100));
			}
			else if (world < 60)
				amt = (amt * 0.4) + ((amt * 0.4) * (level / 110));
			else{
				amt = (amt * 0.5) + ((amt * 0.8) * (level / 100));
				amt *= Math.pow(1.1, world - 59);
			}
			if (world < 60) amt *= 0.75;
			if (world > 5 && game.global.mapsActive) amt *= 1.1;
			if (!ignoreImpStat)
				amt *= game.badGuys[name].health;
			if (game.global.universe == 2){
				var part1 = (world > 60) ? 60 : world;
				var part2 = (world - 60);
				if (part2 < 0) part2 = 0;
				amt *= Math.pow(1.4, part1);
				amt *= Math.pow(1.32, part2);
			}
			return Math.floor(amt);
		}
	},
	herbs: {
		Potatoes: {
			owned: 0,
			cowned: 0,
		},
		Mushrooms: {
			owned: 0,
			cowned: 0,
		},
		Seaweed: {
			owned: 0,
			cowned: 0,
		},
		Firebloom: {
			owned: 0,
			cowned: 0,
		},
		Berries: {
			owned: 0,
			cowned: 0,
		},
	},
	empowerments: {
		Poison: {
			description: function () {
				return "When this Empowerment is active, each successful attack by your Trimps stacks a debuff on the enemy, causing it to take <b>" + this.formatModifier(this.getModifier()) + "%</b> of the damage you dealt every attack until it dies. Each attack by your Trimps will further add to the poison effect.";
			},
			upgradeDescription: function () {
				return "Increases the percentage of damage that sticks to enemies as poison during the Empowerment of Poison by <b>" + this.formatModifier(this.baseModifier) + "%</b>. You currently poison for <b>" + this.formatModifier(this.getModifier()) + "%</b>, and next level will cause you to poison for <b>" + this.formatModifier(this.getModifier(1)) + "%</b>.";
			},
			baseModifier: 0.01,
			getModifier: function (change) {
				if (!change) change = 0;
				return ((this.getLevel() + change) * this.baseModifier);
			},
			formatModifier: function (number){
				return prettify(number * 100);
			},
			getDamage: function(){
				if (getEmpowerment() == "Poison" && getUberEmpowerment() == "Poison") return (this.currentDebuffPower * 2);
				return this.currentDebuffPower;
			},
			getLevel: function(){
				var level = this.level;
				if (game.talents.nature2.purchased) level += 5;
				return level;
			},
			getRetainBonus: function(){
				var extra = 0;
				if (game.talents.nature2.purchased){
					extra += 5;
				}
				if (Fluffy.isRewardActive('naturesWrath')){
					extra += 10;
				}
				return extra;
			},
			color: "#33bb33",
			currentDebuffPower: 0,
			level: 1,
			retainLevel: 0,
			tokens: 0,
			nextUberCost: 0,
			enlightenDesc: "your Trimps deal 3x damage, and Poison Nature stacks deal 2x damage"
		},
		Wind: {
			description: function () {
				return "When this Empowerment is active, each successful attack by your Trimps stacks a debuff on the enemy, causing winds to swell and knock extra resources into your reach. Each stack increases Helium gained from the World by <b>" + this.formatModifier(this.getModifier(0, true)) + "%</b> and increases all other basic resources gained from all sources by <b>" + this.formatModifier(this.getModifier()) + "%</b> until that enemy dies (maximum of " + this.stackMax() + " stacks). This bonus does not apply to Fragments, and the helium bonus does not apply to maps.";
			},
			upgradeDescription: function () {
				return "Increases the amount of extra Helium you find in the World by <b>" + this.formatModifier(this.baseModifier) + "%</b> and non-Helium basic resources from all sources by <b>" + this.formatModifier(this.baseModifier * 10) + "%</b> per stack when the Empowerment of Wind is active. Your current bonus is <b>" + this.formatModifier(this.getModifier(0, true)) + "%</b> Helium, and next level will bring your bonus to <b>" + this.formatModifier(this.getModifier(1, true)) + "%</b> extra helium. Non-Helium resource gain is always " + ((Fluffy.isRewardActive('naturesWrath')) ? "double" : "10x") + " that of Helium, and the Helium bonus does not apply in maps.";
			},
			baseModifier: 0.001,
			getModifier: function (change, forHelium) {
				if (!change) change = 0;
				var mod = ((this.getLevel() + change) * this.baseModifier);
				if (!forHelium) mod *= 10;
				if (forHelium && Fluffy.isRewardActive("naturesWrath")){
					mod *= 5;
				}
				return mod;
			},
			formatModifier: function (number) {
				return prettify(number * 100);
			},
			getCombatModifier: function (forHelium) {
				var mod = this.currentDebuffPower * this.getModifier(0, forHelium);
				return mod;
			},
			getLevel: function(){
				var level = this.level;
				if (game.talents.nature2.purchased) level += 5;
				return level;
			},
			getRetainBonus: function(){
				var extra = 0;
				if (game.talents.nature2.purchased){
					extra += 5;
				}
				if (getUberEmpowerment() == "Wind"){
					extra += 5;
				}
				return extra;
			},
			currentDebuffPower: 0,
			color: "#337733",
			level: 1,
			retainLevel: 0,
			stackMax: function(){
				return (getUberEmpowerment() == "Wind") ? 300 : 200;
			},
			tokens: 0,
			nextUberCost: 0,
			enlightenDesc: "you gain a 10x increase in all non-Helium loot, Wind stacks accumulate twice as fast, Wind can stack to 300, Wind gains an additional 5% stack transfer rate, and your Trimps gain access to the Wind Formation. This new Formation prevents any enemies in Wind Zones from falling below 1HP before they have 300 stacks of Wind. Wind Formation also grants all bonuses of Scrying Formation and allows collection of Dark Essence with no Trimp stat penalty",
			formationDesc: "You have been Enlightened by Wind! While in this Formation in a Wind Zone, enemies will never fall below 1HP before they have 300 stacks of Wind.<br/><br/>This Formation also allows collection of Dark Essence, and grants all bonuses of the Scryer Formation."
		},
		Ice: {
			description: function () {
				return "When this Empowerment is active, enemies will be Chilled each time your Trimps attack. The Chill debuff stacks, reduces the damage that enemy deals by <b>" + this.formatModifier(this.getModifier()) + "%</b> (compounding) per stack, and increases the damage your Trimps deal to that enemy by " + ((Fluffy.isRewardActive('naturesWrath')) ? " twice that amount (with diminishing returns, max of +200% attack)" : "the same amount (with diminishing returns, max of 100%)") + " until it dies." + this.overkillDesc();
			},
			upgradeDescription: function () {
				return "Reduces the enemy's damage dealt from each stack of Chilled when the Empowerment of Ice is active by <b>" + this.formatModifier(1 - this.baseModifier) + "%</b> (compounding), and increases the damage your Trimps deal to that enemy by " + ((Fluffy.isRewardActive('naturesWrath')) ? " twice that amount (with diminishing returns, max of +200% attack)" : "the same amount (with diminishing returns, max of 100%)") + ". Your current bonus is <b>" + this.formatModifier(this.getModifier()) + "%</b>, and next level will bring your bonus to <b>" + this.formatModifier(this.getModifier(1)) + "%</b>." + this.overkillDesc();
			},
			overkillDesc: function(){
				var level = this.getLevel();
				if (level < 50) return "<div style='margin-top: 10px'><b>You will earn +1 Overkill during Ice Zones once you reach Level 50, and a second Overkill cell at Level 100!</b></div>";
				else if (level < 100) return "<div style='margin-top: 10px'><b>You are earning +1 Overkill during Ice Zones! Earn another at Level 100!</b></div>";
				else return "<div style='margin-top: 10px'><b>Your Ice level is" + ((level > 100) ? " over" : "") + " 100, and you are gaining an additional 2 cells of Overkill during Ice Zones!</b></div>";
			},
			baseModifier: 0.01,
			getModifier: function (change) {
				if (!change) change = 0;
				return Math.pow(1 - this.baseModifier, (this.getLevel() + change));
			},
			getCombatModifier: function () {
				return Math.pow(this.getModifier(), this.currentDebuffPower);
			},
			getDamageModifier: function() {
				var mod = 1 - this.getCombatModifier();
				if (Fluffy.isRewardActive('naturesWrath')) mod *= 2;
				return mod;
			},
			formatModifier: function (number){
				return prettify((1 - number) * 100);
			},
			getLevel: function(){
				var level = this.level;
				if (game.talents.nature2.purchased) level += 5;
				return level;
			},
			getRetainBonus: function(){
				var extra = 0;
				if (game.talents.nature2.purchased){
					extra += 5;
				}
				return extra;
			},
			color: "#3333bb",
			currentDebuffPower: 0,
			level: 1,
			retainLevel: 0,
			tokens: 0,
			nextUberCost: 0,
			get enlightenDesc(){
				return "your Trimps gain +2 maximum Overkill cells " + ((game.global.spiresCompleted >= 2) ? " and +0.25% increased Fluffy Exp per Ice level <b>(currently " + prettify(game.empowerments.Ice.getLevel() * 0.25) + "%)</b>" : "") + " for your entire run. In Ice Zones, Ice stacks accumulate twice as fast, and if an enemy is hit by your Trimps while it has 20 or more stacks of Ice and is below 50% health, it will instantly shatter! The shards of Ice from the shattered enemy destroy everything in their path, triggering your maximum Overkill regardless of your damage";
			}
		}
	},
	singleRunBonuses: {
		goldMaps: {
			name: "Golden Maps",
			text: "+100% Map Loot",
			cost: 20,
			confirmation: "You are about to purchase Golden Maps for 20 bones. All of your current and future maps will gain +100% loot added to their normal loot roll <b>until your next Portal</b>. Is this what you wanted to do?", 
			owned: false,
			fire: function () {
				game.unlocks.goldMaps = true;
				refreshMaps();
			}
		},
		quickTrimps: {
			name: "Quick Trimps",
			text: "+100% Breed Speed",
			cost: 20,
			confirmation: "You are about to purchase Quick Trimps for 20 bones. This will cause your Trimps to breed twice as fast <b>until your next Portal</b>. Is this what you wanted to do?",
			owned: false,
			fire: function () {
				swapClass("psColor", "psColorOrange", document.getElementById("trimpsPs"));
			},
			reset: function () {
				swapClass("psColor", "psColorWhite", document.getElementById("trimpsPs"));
			},
			load: function () {
				this.fire();
			}
		},
		sharpTrimps: {
			name: "Sharp Trimps",
			text: "+50% Trimp Damage",
			cost: 25,
			confirmation: "You are about to purchase Sharp Trimps for 25 bones. This will cause your Trimps to deal 50% more damage <b>until your next Portal</b>. Is this what you wanted to do?",
			owned: false,
			fire: function () {
				swapClass("attackColor", "attackColorOrange", document.getElementById("goodGuyAttack"));
			},
			reset: function () {
				swapClass("attackColor", "attackColorNormal", document.getElementById("goodGuyAttack"));
			},
			load: function () {
				this.fire();
			}

		},
		heliumy: {
			get name(){ 
				return (game.global.universe == 2) ? "Radonculous" : "Heliumy";
			},
			get text(){
				return "+25% " + heliumOrRadon();
			},
			cost: 100,
			get confirmation(){
				return "You are about to purchase " + this.name + " for 100 bones. This will cause you to earn 25% more " + heliumOrRadon() + " from all sources <b>until your next Portal</b>. Is this what you wanted to do?"
			},
			owned: false,
			fire: function () {
				swapClass("hePhColor", "hePhColorOrange", document.getElementById("heliumPh"));
			},
			reset: function () {
				swapClass("hePhColor", "hePhColorNormal", document.getElementById("heliumPh"));
			},
			load: function () {
				this.fire();
			}
		}
	},
	options: {
		displayed: false,
		menu: {
			autoSave: {
				enabled: 1,
				extraTags: "popular general",
				description: "Automatically save the game once per minute",
				titles: ["Not Saving", "Auto Saving"],
				onToggle: function () {
					var elem = document.getElementById("saveIndicator");
					if (this.enabled) elem.innerHTML = "<span class='autosaving'>(AutoSaving)</span>";
					else elem.innerHTML = "<span class='notAutosaving'>(Not AutoSaving)</span>";
				}
			},
			usePlayFab: {
				enabled: 0,
				extraTags: "popular general cloud",
				description: "When the game saves, every 30 minutes also back up a copy online with PlayFab. While using this setting, you will be asked if you want to download your online save if it is ever ahead of the version on your computer. You can also manually import your save from PlayFab through the Import menu.",
				titles: ["Not Saving Online", "Saving with PlayFab"],
				onToggle: function () {
					var indicatorElem = document.getElementById("playFabIndicator");
					if (this.enabled == 1) indicatorElem.className = "icomoon icon-wifi iconStateGood";
					else indicatorElem.className = "";
				},
				//lockUnless: function (){return false}
			},
			standardNotation: {
				enabled: 1,
				extraTags: "layout",
				description: "Swap between Standard Formatting (12.7M, 540B), Engineering Notation (12.7e6, 540e9), Scientific Notation (1.27e7, 5.40e11), Alphabetic Notation (12.7b, 540c), Hybrid Notation (Standard up to e96, then Engineering. Mimics Standard pre 4.6), and Logarithmic Notation (10^7.10, 10^8.73). Hold Ctrl while clicking Logarithmic Notation to change the base.",
				titles: ["Scientific Notation", "Standard Formatting", "Engineering Notation", "Alphabetic Notation", "Hybrid Notation", "Logarithmic Notation"],
				onToggle: function () {
					document.getElementById("tab5Text").innerHTML = "+" + prettify(game.global.lastCustomAmt);
				}
			},
			tooltips: {
				enabled: 1,
				extraTags: "alerts",
				description: "<p><b>Showing Tooltips<b> will ensure that all tooltips are shown when you mouse over them.</p><p><b>Shift for Tooltips</b> will hide most tooltips by default, unless you are holding your shift key. Keep this setting in mind when unlocking new things to do, as much of the game is explained in tooltips!</p>",
				titles: ["Shift for Tooltips", "Showing Tooltips"]
			},
			tooltipPosition: {
				enabled: 0,
				extraTags: "alerts",
				description: "Toggle the position of your tooltips between top right, centered above or centered below the mouse.",
				titles: ["Top Right Tips", "Center Bottom Tips", "Center Top Tips"]
			},
			queueAnimation: {
				enabled: 1,
				extraTags: "layout animation performance",
				description: "Toggle on or off the building queue blue color animation.",
				titles: ["No Queue Animation", "Queue Animation"]
			},
			barOutlines: {
				enabled: 1,
				extraTags: "layout",
				description: "Toggle on or off a black bar at the end of all progress bars. Can help discern where the progress bar ends.",
				titles: ["No Outline", "Outline"],
				onToggle: function () {
					var outlineStyle = (this.enabled) ? "2px solid black" : "none";
					var bars = document.getElementsByClassName("progress-bar");
					for (var x = 0; x < bars.length; x++){
						bars[x].style.borderRight = outlineStyle;
					}
				}
			},
			menuFormatting: {
				enabled: 1,
				extraTags: "layout",
				description: "Toggle on or off large number formatting for jobs and buildings on the left menu.",
				titles: ["No Menu Formatting", "Formatting Menu"]
			},
			formatPerkLevels: {
				enabled: 1,
				extraTags: "layout",
				description: "Toggle on or off large number formatting for Perk levels.",
				titles: ["No Perk Formatting", "Formatting Perk Levels"]
			},
			smallPerks: {
				extraTags: "layout",
				enabled: 0,
				description: "Shrink the size of perk buttons in the Portal and View Perks windows. <b>Large Perk Buttons</b> is default and fits 5 buttons per row. <b>Small Perk Buttons</b> shrinks the size to fit 6 per row, and <b>Tiny Perk Buttons</b> fits 7 per row.",
				titles: ["Large Perk Buttons", "Small Perk Buttons", "Tiny Perk Buttons"]
			},
			progressBars: {
				enabled: 1,
				extraTags: "performance",
				description: "Toggle progress bars to on, off, or performance. Performance and off will reduce CPU usage.",
				titles: ["No Progress Bars", "Progress Bars", "Performance Bars"],
				onToggle: function () {
				var bars = document.getElementsByClassName("progress-bar");
					for (var x = 0; x < bars.length; x++){
						if (this.enabled == 2) bars[x].className += " noTransition";
						else {
							bars[x].className = bars[x].className.replace(" noTransition", "");
							if (this.enabled == 0) bars[x].style.width = "0%";
						}
					}
				}
			},
			confirmhole: {
				enabled: 1,
				extraTags: "alerts",
				description: "Toggles on or off the confirmation popup on scary purchases like Wormholes.",
				titles: ["Not Confirming", "Confirming"],
			},
			lockOnUnlock: {
				enabled: 0,
				extraTags: "qol",
				description: "Enables/disables the locking of buildings, jobs, upgrades, and equipment for 1 second after unlocking something new. Useful to prevent accidental purchases.",
				titles: ["Not Locking", "Locking"],
			},
			achievementPopups: {
				enabled: 1,
				extraTags: "alerts",
				description: "Decide whether or not you want popups on completing an achievement.",
				titles: ["No Achieve Popup", "Popup Achievements"]
			},
			mapLoot: {
				enabled: 0,
				extraTags: "qol",
				description: "<p>Choose which upgrades you want first if it has been a while since you last ran maps.</p><p><b>Tier first</b> will cause maps to drop all items for the lowest tier before moving to the next. (Greatsword II -> Breastplate II -> Shield III)</p><p><b>Equip first</b> will start from Shield and drop all available Shield prestiges before continuing to Dagger and so on. (Shield III -> Shield IV -> Dagger III)</p>",
				titles: ["Tier First", "Equip First"],
				secondLocation: ["togglemapLoot2", "togglemapLootCM"]
			},
			repeatUntil: {
				enabled: 0,
				description: "<p><b>Repeat Forever</b> will cause the map to continually repeat if Repeat Maps is enabled.</p><p><b>Repeat to 10</b> will repeat unless you have 10 Map Bonus stacks.</p><p><b>Repeat for Items</b> will repeat unless there are no more special items left for that level of map.</p><p><b>Repeat for Any</b> will repeat unless there are no special items available AND you can not earn more Map Bonus stacks.</p><p><b>This setting only matters if Repeat is on. Toggling Repeat off will still leave the map when it is finished no matter what.</b></p>",
				get titles(){
					var arr = ["Repeat Forever", "Repeat to 10", "Repeat for Items", "Repeat for Any"];
					if (this.enabled == 0 && game.global.mapCounterGoal > game.global.mapRunCounter){
						var count = (game.global.mapCounterGoal - game.global.mapRunCounter);
						arr[0] = "Repeat " + count + " Time" + needAnS(count);
					}
					return arr;
				},
				onToggle: function(){
					game.global.mapCounterGoal = 0;
				},
				locked: true,
				secondLocation: ['togglerepeatUntilCM']
			},
			exitTo: {
				enabled: 0,
				description: "Choose whether to go to the Maps Screen or World after completing a map.",
				titles: ["Exit to Maps", "Exit to World"],
				locked: true,
				secondLocation: ['toggleexitToCM']
			},
			repeatVoids: {
				enabled: 0,
				description: "Decide if you want to continue running the rest of your Void Maps after finishing one.",
				titles: ["One Void Map", "Finish All Voids"],
				locked: true,
				secondLocation: ['togglerepeatVoidsCM']
			},
			boneAlerts: {
				enabled: 1,
				extraTags: "alerts",
				description: "Hide popup confirmation messages when spending rare resources in the Bone Trader or Heirlooms menus.",
				titles: ["Not Confirming Rare", "Confirming Rare Stuff"]
			},
			showAlerts: {
				enabled: 1,
				extraTags: "alerts",
				description: "Toggle on or off the display of yellow alert icons when unlocking something new.",
				titles: ["Not Alerting", "Alerting"]
			},
			showFullBreed: {
				enabled: 0,
				extraTags: "popular general",
				description: "Display time to breed a full group of soldiers next to the current breed timer.",
				titles: ["Less Breed Timer", "More Breed Timer"]
			},
			darkTheme: {
				extraTags: "general",
				enabled: 1,
				description: "Toggle between the default Trimps theme, a custom dark theme made by u/Grabarz19, a gradient theme by u/5h3i1ah, and the default theme with a black background.",
				titles: ["Black Background", "Default Theme", "Dark Theme", "Gradient Theme"],
				//styleName index should always be equal to title index minus 2, and should match the css file name
				styleNames: ["dark", "gradient"],
				removeStyles: function () {
					for (var x = 0; x < this.styleNames.length; x++){
						var link = document.getElementById(this.styleNames[x] + "Theme");
						if (!link) continue;
						document.head.removeChild(link);
					}
					document.getElementById("innerWrapper").style.backgroundColor = "initial";
				},
				applyStyle: function (titleIndex){
					var styleName = this.styleNames[titleIndex - 2];
					var link = document.createElement('link');
					link.type = 'text/css';
					link.rel = 'stylesheet';
					link.href = 'css/' + styleName + '.css';
					link.id = styleName + 'Theme';
					document.head.appendChild(link);
				},
				onToggle: function () {
					this.removeStyles();
					if (this.enabled == 1) return;
					if (this.enabled == 0){
						document.getElementById("innerWrapper").style.backgroundColor = "black";
						return;
					}
					this.applyStyle(this.enabled);
				}
			},
			fadeIns: {
				enabled: 1,
				extraTags: "layout performance animation",
				description: "Toggle on or off the fade in effect on elements.",
				titles: ["Not Fading", "Fading"]
			},
			extraStats: {
				enabled: 1,
				extraTags: "layout",
				description: "Toggle on or off adding extra information to map items.",
				titles: ["Minimalist Maps", "Extra Map Info"],
				onToggle: function () {
					refreshMaps();
				}
			},
			useAverages: {
				extraTags: "popular general",
				enabled: 0,
				description: "Toggle whether or not loot from maps and the world should be counted in the loot breakdown and tooltip calculations. Calculates a moving average of the loot. If you want to clear the average, try toggling it off and on again.",
				titles: ["Not Averaging", "Averaging"],
				onToggle: function () {
					for (var item in game.global.lootAvgs){
						game.global.lootAvgs[item] = {
							average: 0,
							accumulator: 0
						};
					}
					document.getElementById('gemsPs').style.display = 'block';
				}
			},
			voidPopups: {
				extraTags: "alerts",
				enabled: 1,
				description: "Decide whether or not you want popups on looting an Heirloom.",
				titles: ["No Heirloom Pop", "Popping Heirlooms"]
			},
			detailedPerks: {
				extraTags: "qol",
				enabled: 0,
				description: "Decide whether or not to show extra information on Perk buttons",
				titles: ["Minimal Perk Info", "Extra Perk Info"]
			},
			alwaysAbandon: {
				extraTags: "general",
				enabled: 0,
				description: "Decide whether or not to wait for soldiers to die on switching between maps and world. Toggling this on will automatically abandon your soldiers.",
				titles: ["Wait to Travel", "Auto Abandon"]
			},
			extraMapBtns: {
				extraTags: "layout",
				enabled: 0,
				description: "Toggle the button menu to the right of the map grid",
				titles: ["Less Map Buttons", "Extra Map Buttons"],
				onToggle: function () {
					if (!game.global.mapsActive) return;
					var setTo = (this.enabled) ? ["8", "2"] : ["10", "off"];
					swapClass("col-xs", "col-xs-" + setTo[0], document.getElementById("gridContainer"));
					swapClass("col-xs", "col-xs-" + setTo[1], document.getElementById("extraMapBtns"));
				},
				lockUnless: function () {
					return (game.global.totalPortals > 0)
				},
				secondLocation: ["toggleextraMapBtnsCM"]
			},
			GeneticistassistTarget: {
				enabled: 0,
				disableOnUnlock: false,
				extraTags: "popular general",
				description: "Customize your three available Geneticistassist targets, choose options for firing and sending, and decide whether or not Geneticistassist should start automatically when unlocked each run.",
				titles: ["Geneticistassist Settings"],
				lockUnless: function () {
					return (game.global.Geneticistassist);
				}
			},
			liquification: {
				enabled: 1,
				extraTags: "general",
				description: "Enable or disable Liquification. Nothing in game should be impossible to complete with Liquification enabled, but if you just want to slow things down then you have every right to do so.",
				titles: ["Liquification Off", "Liquification On"],
				lockUnless: function () {
					return (game.global.spiresCompleted > 0);
				}

			},
			overkillColor: {
				enabled: 1,
				extraTags: "layout",
				description: "Choose if you would like to see a different cell color for cells that you overkilled. <b>No Overcolors</b> will not change any colors based on Overkill. <b>Normal Overkill Colors</b> is the default setting, and shows a special color for cells that were Overkilled. <b>Connected Overkill Colors</b> will show the Overkill cell colors for all cells while Overkilling.",
				titles: ["No Overcolors", "Normal Overkill Colors", "Connected Overkill Colors"],
				lockUnless: function () {
					return (!game.portal.Overkill.locked)
				},
			},
			forceQueue: {
				enabled: 0,
				extraTags: "qol",
				get description() {
					var appliesTo = " only to Warpstation";
					if (game.global.improvedAutoStorage) appliesTo = " to Warpstation and AutoStorage";
					return "Choose whether or not to force instant-craft buildings to use the queue. Currently applies " + appliesTo + ". May be useful for double checking prices before building!";
				},
				titles: ["Not Forcing Queue", "Forcing Queue"],
				lockUnless: function () {
					return (game.global.sLevel >= 4);
				}
			},
			mapsOnSpire: {
				enabled: 1,
				extraTags: "other",
				description: "Choose whether you would like the game to pause combat by sending you to maps when you reach a Spire. <b>Keep Fighting at Spires</b> will not interrupt you when reaching a Spire, <b>Map at Spires</b> will send you to maps on every Spire, <b>Map at Top 2 Spires</b> will send you to maps at the highest and second highest level Spire reached, and <b>Map at Top Spire</b> will switch to maps only on the single highest Spire reached.",
				titles: ["Keep Fighting at Spires", "Map at Spires", "Map at Top 2 Spires", "Map at Top Spire"],
				lockUnless: function () {
					return (game.global.highestLevelCleared >= 199);
				},
				secondLocation: ["togglemapsOnSpireCM"]
			},
			mapAtZone: {
				enabled: 0,
				extraTags: "other",
				description: "When enabled, you will automatically abandon your Trimps in the World and enter the Map Chamber as soon as you hit your specified Zone number.<br/><br/><b>Configure with hotkey Z</b>",
				get titles(){
					var nextZone = "";
					var setZone = this.getSetZone();
					if (setZone.length == 1) nextZone = setZone[0].world;
					else {
						for (var x = 0; x < setZone.length; x++){
							if (game.global.world < setZone[x].world || (game.global.world == setZone[x].world && (game.global.lastClearedCell + 2) < setZone[x].cell)){
								nextZone = setZone[x].world;
								if (x < setZone.length - 1) nextZone += "+";
								break;
							}
						}
						if (nextZone == "") 
							nextZone = (setZone.length) ? setZone[0].world : "one";
					}
					if (game.talents.maz.purchased){
						nextZone += " (";
						if (game.global.universe == 2) nextZone += this.U2Mode.toUpperCase();
						else nextZone += this.U1Mode.toUpperCase();
						nextZone += ")";
					}
					return ["No Map At Zone", "Map At Z" + nextZone];
				},
				setZone: [{world: 200}],
				setZoneB: [{world: 200}],
				setZoneU2: [{world: 10}],
				setZoneU2B: [{world: 10}],
				U1Mode: 'a',
				U2Mode: 'a',
				getMaxSettings: function(){
					if (game.global.universe == 1) return 6;
					if (game.global.universe == 2) return 7;
				},
				getSetZone: function(){
					if (game.global.universe == 2){
						if (this.U2Mode == 'a') return this.setZoneU2;
						return this.setZoneU2B;
					}
					if (this.U1Mode == 'a') return this.setZone;
					return this.setZoneB;
				},
				swapPreset: function(){
					cancelTooltip();
					if (game.global.universe == 2){
						this.U2Mode = (this.U2Mode == 'a') ? 'b' : 'a';
					}
					else{
						this.U1Mode = (this.U1Mode == 'a') ? 'b' : 'a';
					}
					tooltip('Set Map At Zone', null, 'update');
				},
				storeSetting: function(setting){
					if (game.global.universe == 2){
						if (this.U2Mode == 'a') {
							this.setZoneU2 = setting;
							return;
						}
						this.setZoneU2B = setting;
						return;
					}
					if (this.U1Mode == 'a') {
						this.setZone = setting;
						return;
					}
					this.setZoneB = setting;
				},
				addRow: function(){
					for (var x = 0; x < this.getMaxSettings(); x++){
						var elem = document.getElementById('mazWorld' + x);
						if (!elem) continue;
						if (elem.value == -1) {
							var parent = document.getElementById('mazRow' + x);
							if (parent){
								parent.style.display = 'block';
								elem.value = game.global.world + 1;
								updateMazPreset(x);
								break;
							}
						}
					}
					var btnElem = document.getElementById('mazAddRowBtn');
					for (var y = 0; y < this.getMaxSettings(); y++){
						var elem = document.getElementById('mazWorld' + y);
						if (elem && elem.value == "-1"){			
							btnElem.style.display = 'inline-block';
							return;
						}
					}
					btnElem.style.display = 'none';
				},
				removeRow: function(index){
					var elem = document.getElementById('mazRow' + index);
					if (!elem) return;
					document.getElementById('mazWorld' + index).value = -1;
					var checkBox = document.getElementById('mazCheckbox' + index);
					swapClass("icon-", "icon-checkbox-unchecked", checkBox);
					checkBox.setAttribute('data-checked', false);
					checkBox = document.getElementById('mazEnableSetting' + index);
					swapClass("icon-", "icon-checkbox-checked", checkBox);
					checkBox.setAttribute('data-checked', true);
					document.getElementById('mazPreset' + index).value = 0;
					document.getElementById('mazRepeat' + index).value = 0;
					document.getElementById('mazRepeatUntil' + index).value = 0;
					elem.style.display = 'none';
					var btnElem = document.getElementById('mazAddRowBtn');
					btnElem.style.display = 'inline-block';
				},
				save: function(){
					var setting = [];
					var error = "";
					loop1: 
					for (var x = 0; x < this.getMaxSettings(); x++){
						var world = document.getElementById('mazWorld' + x);
						if (!world || world.value == "-1") {
							continue;
						};
						world = parseInt(world.value, 10);
						var check = readNiceCheckbox(document.getElementById('mazCheckbox' + x));
						var preset = parseInt(document.getElementById('mazPreset' + x).value, 10);
						var repeat = parseInt(document.getElementById('mazRepeat' + x).value, 10);
						var until = parseInt(document.getElementById('mazRepeatUntil' + x).value, 10);
						var exit = parseInt(document.getElementById('mazExit' + x).value, 10);
						var bwWorld = parseInt(document.getElementById('mazBwWorld' + x).value, 10);
						var cell = parseInt(document.getElementById('mazCell' + x).value, 10);
						var enableCheck = readNiceCheckbox(document.getElementById('mazEnableSetting' + x));
						var times = parseInt(document.getElementById('mazTimes' + x).value, 10);
						var through = parseInt(document.getElementById('mazThrough' + x).value, 10);
						var rx = parseInt(document.getElementById('mazRx' + x).value, 10);
						if (isNaN(through) || through > 1000) through = 1000;
						else if (through < 10) through = 10;
						if (isNaN(world) || world < 10){
							error += " Preset " + (x + 1) + " needs a value for Start Zone that's greater than 10.";
							continue;
						}
						else if (world > 1000) {
							error += " Preset " + (x + 1) + " needs a value for Start Zone that's less than 1000.";
							continue;
						}
						if (times != -1 && times != 1 && times != 2 && times != 3 && times != 5 && times != 10 && times != 30) times = -1;
						if (cell < 1) cell = 1;
						if (cell > 100) cell = 100;
						for (var y = 0; y < setting.length; y++){
							//No reason to run if one finishes before the other starts
							if (through < setting[y].start || setting[y].through < world) continue;
							//Only run conflict detection if both presets match on cell
							if (setting[y].cell == cell){
								var errorText = " Preset " + (x + 1) + " and Preset " + (y + 1) + " would conflict with this setup."
								//If both presets repeat, check for conflicts
								if (times != -1 && setting[y].times != -1){
									//Repeat every zone always conflicts
									if (times == 1 || setting[y].times == 1){
										error += errorText;
										continue loop1;
									}
									//Repeat every 2 zones always conflicts with 1, 3, and 5. Conflicts with 2 and 10 if both starts are odd or even.
									else if (times == 2){
										//If preset y repeats every 2, 10 or 30, check that one world is odd and one is even
										if (setting[y].times == 10 || setting[y].times == 2 || setting[y].times == 30){
											if ((world % 2) == (setting[y].world % 2)){
												error += errorText;
												continue loop1;
											}
										}
										//If preset y repeats at anything other than 0, 2, 10 or 30, it fails
										else {
											error += errorText;
											continue loop1;
										}
									}
									//Repeat every 3 zones always conflicts with anything that doesn't repeat every 3 or 30 zones
									else if (times == 3){
										//If both presets repeat every 3 zones, see if they would intersect
										if (setting[y].times == 3 || setting[y].times == 30){
											if (setting[y].world % 3 == world % 3) {
												error += errorText;
												continue loop1;
											}
										}
										//If preset y repeats at anything other than 3, it will conflict
										else{
											error += errorText;
											continue loop1;
										}
									}
									//Repeat every 5 zones always conflicts with 1, 2, 3.
									else if (times == 5){
										//If preset y doesn't repeat, or repeats at 5 or 10 or 30, check if both worlds % 5 match
										if (setting[y].times == 5 || setting[y].times == 10 || setting[y].times == 30){
											var intersect = ((world - setting[y].world) % 5);
											if (intersect == 0) {
												error += errorText;
												continue loop1;
											}
										}
										//Anything else fails
										else {
											error += errorText;
											continue loop1;
										}
									}
									//Repeat every 10 zones conflicts with 2 if both are even or odd, conflicts with 3 always, conflicts with 5 if both % 5 match, conflicts with 10 or 30 if both % 10 match
									//Repeat every 30 zones conflicts with 2 if both are even or odd, conflicts with 3 if both % 3 match, conflicts with 5 if both % 5 match, conflicts with 10 if both % 10 match, and 30 if both % 30 match
									else if (times == 10 || times == 30){
										if (setting[y].times == 2){
											if ((world % 2) == (setting[y].world % 2)){
												error += errorText;
												continue loop1;
											}
										}
										//3 For 10
										else if (times == 10 && setting[y].times == 3){
											error += errorText;
											continue loop1;
										}
										//3 For 30
										else if (setting[y].times == 3){
											if (setting[y].world % 3 == world % 3){
												error += errorText;
												continue loop1;
											}
										}
										else if (setting[y].times == 5){
											if ((world % 5) == (setting[y].world % 5)){
												error += errorText;
												continue loop1;
											}
										}
										//10 for 10 and 30, and 30 for 10
										else if (setting[y].times == 10 || (setting[y].times == 30 && times == 10)){
											if ((world % 10) == (setting[y].world % 10)){
												error += errorText;
												continue loop1;
											}
										}
										else if (setting[y].times == 30){
											if ((world % 30) == (setting[y].world % 30)){
												error += errorText;
												continue loop1;
											}
										}
									}
								}
								else {
									//Either none repeats or only 1 repeats
									if (setting[y].world == world) {
										error += " Preset " + (x + 1) + " and Preset " + (y + 1) + " cannot exit at the same Zone and Cell number.";
										continue loop1;
									}
									//If this preset doesn't repeat and y does, and if y starts on a lower zone than this preset, check for conflict
									if (setting[y].times != -1 && times == -1 && setting[y].world < world){
										if ((world - setting[y].world) % setting[y].times == 0){
											error += errorText;
											continue loop1;
										}
									}
									//If this preset repeats and y does not, and if this preset starts at a lower zone than y, check for conflict
									if (setting[y].times == -1 && times != -1 && world < setting[y].world){
										if ((setting[y].world - world) % times == 0){
											error += errorText;
											continue loop1;
										}
									}
								}
							}
						}
						var presetMax = 9;
						if (preset == 5 && (game.global.universe != 2 || game.global.highestRadonLevelCleared < 69)) preset = 0;
						if (preset < 0 || preset > presetMax) preset = 0;
						if (repeat < 0 || repeat > 2) repeat = 0;
						if (until < 0 || until > 9) until = 0;
						if (until == 5 && preset != 3) until = 0;
						if (exit < 0 || exit > 2) exit = 0;
						if (until == 9 && isNaN(rx) || rx < 1) rx = 10;
						if (rx > 9999) rx = 9999;
						if (!bwWorld || preset != 3 || isNaN(bwWorld) || bwWorld < 125 || bwWorld > 1000) bwWorld = 125;
						if (bwWorld > 125){
							var adj = bwWorld - 125;
							if (bwWorld % 15 != 0) bwWorld = 125 + (Math.floor(adj / 15) * 15);
						}
						var thisSetting = {
							world: world,
							through: through,
							cell: cell,
							check: check,
							preset: preset,
							repeat: repeat,
							until: until,
							exit: exit,
							bwWorld: bwWorld,
							times: times,
							on: enableCheck
						};
						if (rx && until == 9) thisSetting.rx = rx;
						setting.push(thisSetting);
					}
					if (error){
						var elem = document.getElementById('mazError');
						if (elem) elem.innerHTML = error;
						return;
					}
					setting.sort(function(a, b){if (a.world == b.world) return (a.cell > b.cell) ? 1 : -1; return (a.world > b.world) ? 1 : -1});
					this.storeSetting(setting);
					this.enabled = 1;
					toggleSetting('mapAtZone', null, false, true);
					cancelTooltip(true);
				},
				secondLocation: ["togglemapAtZone2", "togglemapAtZoneCM"],
				lockUnless: function () {
					return game.global.canMapAtZone;
				}
			},
			timestamps: {
				enabled: 0,
				extraTags: "qol",
				description: "Choose whether or not to display timestamps in the message log. <b>Local Timestamps</b> will log the current time according to your computer, <b>Run Timestamps</b> will log how long it has been since your run started. Note that toggling this setting will not add or remove timestamps from previous messages, but will add or remove them to or from any new ones.",
				titles: ["No Timestamps", "Local Timestamps", "Run Timestamps"]
			},
			gaFire: {
				enabled: 1,
				locked: true,
				extraTags: "qol",
				description: "<p>Toggle between <b>Limited GA Firing</b>, <b>Geneticistassist Fire</b> and <b>No GA Firing</b>.</p><p><b>Limited GA Firing</b> will prevent Geneticistassist from firing Farmers, Lumberjacks, or Miners.</p><p><b>Geneticistassist Fire</b> is the default value, and allows Geneticistassist to fire anything.</p><p><b>No GA Firing</b> prevents your Geneticistassist from being able to fire anything at all, including other Geneticists.</p>",
				titles: ["Limited GA Firing", "Geneticistassist Fire", "No GA Firing"],
				lockUnless: function () {
					return game.global.Geneticistassist
				}
			},
			tinyButtons: {
				enabled: 0,
				extraTags: "layout",
				description: "Shrink the buttons in the menu where you purchase Buildings, Upgrades, Jobs, and Equipment. <b>Large Buttons</b> is default and fits 4 buttons per row. <b>Small Buttons</b> shrinks the size to fit 5 per row, and <b>Tiny Buttons</b> fits 6 per row. Small and Tiny may not be readable on small screens.",
				titles: ["Large Buttons", "Small Buttons", "Tiny Buttons"],
				onToggle: function () {
					var classNames = ["buttonSizeLarge", "buttonSizeSmall", "buttonSizeTiny"];
					swapClass("buttonSize", classNames[this.enabled], document.getElementById('buyHere'));
				}
			},
			masteryTab: {
				enabled: 1,
				extraTags: "alerts",
				description: "Choose what you would like to see on your Mastery Tab! <b>No Mastery Info</b> will keep the tab clean and static. <b>Alert Mastery</b> will show an alert on the tab as soon as a new Mastery becomes affordable. <b>Show Essence</b> will always show your total amount of unspent essence on the tab. <b>Hybrid Essence</b> will show your total amount of unspent essence on the tab, but will switch to the alert icon once you have enough essence for a new Mastery.",
				titles: ["No Mastery Info", "Alert Mastery", "Show Essence", "Hybrid Alerts"],
				lockUnless: function () {
					return (game.global.highestLevelCleared >= 180)
				},
				onToggle: function () {
					updateTalentNumbers();
				}
			},
			bigPopups: {
				enabled: 1,
				lockUnless: function () {
					return (game.global.highestLevelCleared >= 79);
				},
				get description(){
					var text = "<p>This setting applies to big popups that occur after hitting certain milestones each portal. This setting will currently block: the Improbability popup";
					if (game.global.highestLevelCleared >= 199) text += ", the popup at Corruption";
					if (game.global.highestLevelCleared >= 219) text += ", the popup at The Spire";
					if (game.global.highestLevelCleared >= 249) text += ", and the popup on reaching Magma.";
					text += "</p><p>Note that this setting only blocks large popups once your Highest Zone Reached is 20 Zones past the location of the popup</p>";
					return text;
				},
				extraTags: "alerts popups",
				titles: ["Block Big Popups", "Allow Big Popups"]

			},
			generatorStart: {
				enabled: 0,
				extraTags: "general",
				get description(){
					var text = "<p>Choose what mode the Dimensional Generator should start each run on. <b>Default Generator</b> will continue with whatever setting you were using at the end of your last run. <b>The Rest of The Settings<b> are named by what mode will be set to active at the start of each run.</p>";
					if (game.permanentGeneratorUpgrades.Supervision.owned) text += "<p><b>Hold Ctrl while clicking to open the Generator State Configuration menu</b></p>";
					return text;
				},
				get titles () {
					var arr = ["Default Generator", "Gain Fuel", "Gain Mi"];
					if (game.permanentGeneratorUpgrades.Hybridization.owned) arr.push("Hybrid");
					return arr;
				},
				lockUnless: function () {
					return (game.global.highestLevelCleared >= 229);
				},
				secondLocation: ["togglegeneratorStartPopup"]
			},
			showSnow: {
				enabled: 1,
				lockUnless: function(){
					return holidayObj.checkActive("Snowy");
				},
				extraTags: "general",
				description: "Disable the snow effect in the world. <b>This will take effect on the next Zone after this setting is changed</b>. This setting is temporary, and will melt when the snow does.",
				titles: ["No Snow", "Show Snow"]
			},
			showHoliday: {
				enabled: 1,
				extraTags: "general",
				description: "<p>Choose between <b>Show Pumpkimps</b>, <b>Bordered Pumpkimps</b>, and <b>No Pumpkimps</b>. This setting applies only to the visual effect of Pumpkimp Zones in the world, does not apply to maps, and has no impact on how many Pumpkimps or Pumpkimp Zones actually spawn. This setting is temporary and will rot away after the Pumpkimp season!</p><p><b>Show Pumpkimps</b> is the default, and displays Pumpkimp Zones as normal.</p><p><b>Bordered Pumpkimps</b> displays Pumpkimp cells by changing the border color instead of the background color.</p><p><b>No Pumpkimps</b> will not show any indicator at all that a world Zone is a Pumpkimp Zone. Pumpkimps will still spawn at the same rate.</p>",
				titles: ["No Pumpkimps", "Show Pumpkimps", "Bordered Pumpkimps"],
				lockUnless: function(){
					return (holidayObj.checkActive("Pumpkimp"));
				}
			},
			geneSend: {
				enabled: 0,
				locked: true,
				extraTags: "other",
				description: "<p>When <b>Using Gene Send</b> is enabled, as long as you have one Geneticist, AutoFight will automatically send soldiers to fight if they have been breeding for longer than your Geneticistassist setting.</p><p>When <b>Enforce Gene Send</b> is enabled, as long as you have one Geneticist, AutoFight will never send a group of Trimps to fight unless you are at max population or you have reached your set Geneticistassist timer.</p><p>Finally, if you choose <b>Wait For Gene Send</b> and have at least one Geneticist, AutoFight will only send Trimps to fight after they have been breeding long enough to reach your set Geneticistassist timer. This guarantees that Anticipation and Geneticist levels build up for as long as your set timer, but may result in no soldiers being sent for some time while you sit at full population.</p>",
				titles: ["No Gene Sending", "Using Gene Send", "Enforce Gene Send", "Wait For Gene Send"]
			},
			fireForJobs: {
				enabled: 0,
				extraTags: "other",
				description: "When enabled, hiring Trimps for jobs with scaling price increases (Trainer, Explorer, etc) while you have no workspaces will attempt to fire Farmers, Lumberjacks and Miners until you have enough room.",
				titles: ["Not Firing For Jobs", "Firing For Jobs"]
			},
			ctrlGigas: {
				enabled: 0,
				extraTags: "other",
				description: "When enabled, all Gigastation purchases will act as if the Ctrl key was held, regardless of whether or not it actually was held. When disabled, you will have to hold Ctrl to tell Gigastations to automatically purchase Warpstations (See Gigastation tooltip for more info).",
				lockUnless: function () {
					return (game.global.highestLevelCleared >= 60);
				},
				titles: ["Dynamic Giga Ctrl", "Always Giga Ctrl"]
			},
			showHeirloomAnimations: {
				enabled: 1,
				extraTags: "performance",
				description: "Enable/Disable animations on Heirlooms.",
				lockUnless: function () {
					return (game.global.highestLevelCleared >= 499);
				},
				titles: ["No Heirloom Animations", "Heirloom Animations"]
			},
			hotkeys: {
				enabled: 1,
				extraTags: "other",
				description: "Enable or disable hotkeys.",
				titles: ["Disable Hotkeys", "Enable Hotkeys"]
			},
			climbBw: {
				enabled: 0,
				extraTags: "qol",
				description: "Decide whether or not you want your Trimps to automatically run the next Bionic Wonderland once they&apos;ve gotten all of the items from their current one. Repeat Maps must be toggled on for Climb BW to work.",
				titles: ["Don&apos;t Climb BW", "Climb BW"],
				secondLocation: ["toggleclimbBwCM", "toggleclimbBw2"],
				lockUnless: function(){
					return (game.global.highestLevelCleared >= 124);
				}
			},
			offlineProgress: {
				enabled: 1,
				extraTags: "other",
				description: "<p><b>No Offline Progress</b> will cause no extra resources to be earned and no time to be warped when you return to the game. The Portal and Zone timers will not advance while offline, and the game will be in the same state you left it when you come back. This can be useful for speedrun achievements or if you just really really don&apos;t trust your Trimps when you&apos;re gone.</p><p><b>Hybrid Offline</b> combines Time Warp and Trustworthy Trimps into the best offline experience that Science can buy. Time Warp caps at 24 hours, so using Hybrid Offline will grant Trustworthy Trimps at the beginning of your Time Warp for all offline time over 24 hours, and will also grant Trustworthy Trimps for any extra time should you choose to end Time Warp early. Note that the Portal Time and Time in Zone clocks will advance for all time granted by Trustworthy Trimps and by Time Warp.</p><p><b>Time Warp Only</b> will grant up to 24 hours of your offline progress as Time Warp without granting any extra resources from Trustworthy Trimps at the beginning (for time over 24 hours), or at the end (for canceled Time Warp time). This can also be useful for timed runs or tracking stats, as the time added will be capped to however much time you spend in Time Warp.</p><p><b>Trustworthy Trimps Only</b> will skip Time Warp when you come back and grant resources for all time offline from Trustworthy Trimps. For when you want to get back in the game as soon as possible!</p><p style=&apos;text-align: center&apos;><b>This setting can be changed from the Time Warp screen<br/>or in Settings -> Other</b></p>",
				//description: "Disables or enables earning resources while offline. <b>Warning: If this is toggled off, no resources will be earned from Trustworthy Trimps when coming back to the game after being offline.</b> This also stops the current run timer when offline and can be helpful if you are analysing stats and do not want resources counted when there is no timer running",
				titles: ["No Offline Progress", "Hybrid Offline", "Time Warp Only", "Trustworthy Trimps Only"],
				secondLocation: ["toggleofflineProgresstimewarp"]
			},
			archAutomator: {
				enabled: 0,
				extraTags: "other",
				description: "Customize the Archaeology Automator. Has no effect unless running the Archaeology Challenge.",
				titles: ["Archaeology Automator"],
				lockUnless: function(){
					return (game.global.highestRadonLevelCleared >= 94);
				}
			},
			hideCompleteAchieves: {
				enabled: 1,
				extraTags: "layout",
				description: "Show or hide completed achievements.",
				titles: ["Hiding Achieves", "Showing all Achieves"]
			},
			sealedSpire: {
				enabled: 0,
				extraTags: "other",
				description: "Your Spire is Sealed, but you can look at it here if you want to.",
				titles: ["View the Spire"],
				lockUnless: function(){
					return (playerSpire.sealed);
				},
				onToggle: function(){
					playerSpire.openPopup();
				}
			},
			saveOnPause: {
				enabled: 1,
				extraTags: "other",
				description: "Save when pausing the game. Note that regardless of this setting, the game will not be saved on pause if AutoSave is disabled.",
				titles: ["Don't Save on Pause", "Save on Pause"]
			},
			pauseGame: {
				enabled: 0,
				extraTags: "other",
				description: "Pause your game. This will pause all resource gathering, offline progress, and timers. (Hotkey: Space)",
				titles: ["Not Paused", "Paused"],
				timeAtPause: 0,
				onToggle: function () {
					if (this.enabled) {
						this.timeAtPause = new Date().getTime();
						if (game.options.menu.autoSave.enabled == 1 && game.options.menu.saveOnPause.enabled == 1) save(false, true);
						swapClass("timer", "timerPaused", document.getElementById("portalTimer"));
						handlePauseMessage(true);
					}
					else if (this.timeAtPause) {
						var now = new Date().getTime();
						var dif = now - this.timeAtPause;
						game.global.portalTime += dif;
						game.global.lastSkeletimp += dif;
						game.global.zoneStarted += dif;
						game.global.mapStarted += dif;
						game.global.lastGeneratorTick += dif;
						game.global.lastSoldierSentAt += dif;
						if (game.portal.Frenzy.frenzyStarted != -1) game.portal.Frenzy.frenzyStarted += dif;
						this.timeAtPause = 0;
						game.global.time = 0;
						game.global.lastOnline = now;
						game.global.start = now;
						swapClass("timer", "timerNotPaused", document.getElementById("portalTimer"));
						handlePauseMessage(false);
					}
				},
				locked: true
			},
			disablePause: {
				enabled: 1,
				extraTags: "other",
				description: "You can pause the game by clicking the run timer in the bottom right of the screen. This setting allows you to remove that ability!",
				titles: ["Disable Pausing", "Enable Pausing"]
			},
			deleteSave: {
				enabled: 0,
				extraTags: "reset hard wipe clear other",
				description: "Delete your save and start fresh. Your Trimps will not be happy.",
				titles: ["Delete Save"],
				onToggle: function () {
					cancelTooltip();
					tooltip('Reset', null, 'update');
					game.global.lockTooltip = true;
					tooltipUpdateFunction = "";
					this.enabled = 0;
				}
			}
		}
	},
	talents: {
		portal: {
			description: "Unlock Portal immediately after clearing Z20.",
			name: "Portal Generator",
			tier: 1,
			purchased: false,
			icon: "eye-open",
		},
		bionic: {
			description: "<p>Automatically pick up each level of Bionic Wonderland (BW) as you pass a BW Zone. Will not work if you have already missed any BWs this run, or if you reach a Zone higher than any BW you have ever cleared before.</p><p>In addition, give all current and future copies of Bionic Wonderland the 'Fast Attacks' special modifier.</p>",
			name: "Bionic Magnet I",
			onPurchase: function (clear) {
				addMapModifier('Bionic', 'fa');
			},
			onRespec: function () {
				addMapModifier('Bionic', null, true);
			},
			tier: 1,
			purchased: false,
			icon: "magnet"
		},
		turkimp: {
			description: "Increases the chance of finding a Turkimp by 33%, the bonus time from each Turkimp by 5 minutes, and increases the time cap by 10 minutes.",
			name: "Turkimp Tamer I",
			tier: 1,
			purchased: false,
			icon: "*spoon-knife"
		},
		housing: {
			description: "Unlock Mansion, Hotel, Nursery, Resort, Gateway, Wormhole, and Collector automatically when passing the Zone they drop at.",
			name: "Home Detector",
			tier: 1,
			purchased: false,
			icon: "home"
		},
		bounty: {
			description: "Unlock Bounty immediately after clearing Z15.",
			name: "Bounty Hunter",
			tier: 1,
			purchased: false,
			icon: "th-large",
		},
		explorers: {
			description: "Automatically picks up SpeedExplorer books when you pass their Zone.",
			name: "Explorer Aura I",
			tier: 1,
			purchased: false,
			icon: "*map-signs"
		},
		voidPower: {
			description: "Your Trimps gain 15% attack and health inside Void Maps.",
			name: "Void Power I",
			tier: 2,
			purchased: false,
			icon: "*heart5",
			getTotalVP: function(){
				return (game.talents.voidPower2.purchased) ? ((game.talents.voidPower3.purchased) ? 65 : 35) : 15;
			}
		},
		pierce: {
			description: "Reduce the amount of enemy damage that can pierce block by 25%.",
			name: "Metallic Coat",
			tier: 2,
			purchased: false,
			icon: "tint"
		},
		heirloom: {
			description: "You can spend an extra 10% of your Nu on your Heirlooms, bringing the total to 60%.",
			name: "Heirnuum I",
			tier: 2,
			purchased: false,
			icon: "grain"
		},
		herbalist: {
			get description(){ 
				return "Your Trimps learn to harvest special Herbs while collecting Food! Increases Trimp Attack by a number based on your total stored food. Grants +30% Attack at " + prettify(1e25) + " Food, or +300% at " + prettify(1e250) + ". At your current total of " + prettify(game.resources.food.owned) + " Food, <b>you " + ((this.purchased) ? "are gaining" : "would gain") + " +" + prettify((this.getBonus() - 1) * 100) + "% Trimp Attack</b>.";
			},
			getBonus: function(){
				if (game.resources.food.owned < 1) return 1;
				var amt = 1 + (log10(game.resources.food.owned) / 83.3);
				if (amt < 1 || isNumberBad(amt)) return 1;
				return amt;
			},
			name: "Herbalist",
			tier: 2,
			purchased: false,
			icon: "*tree",
		},
		headstart: {
			description: "Corruption begins 5 levels earlier, at Zone 176.",
			name: "Headstart I",
			tier: 2,
			purchased: false,
			icon: "road"
		},
		scry: {
			get description(){
				return "When fighting Corrupted " + ((game.global.spiresCompleted >= 2) ? "or Healthy " : "") + "cells in Scryer Formation, grants 50% more Dark Essence and doubles your attack.";
			},
			name: "Scryhard I",
			tier: 2,
			purchased: false,
			icon: "*spinner9"
		},
		voidPower2: {
			description: "Your Trimps gain an additional 20% attack and health inside Void Maps.",
			name: "Void Power II",
			tier: 3,
			purchased: false,
			icon: "*heart5",
			requires: "voidPower"
		},
		mapLoot: {
			description: "Reduces the starting point of the Low Map Level Loot Penalty by 1 level. This allows you to earn the same amount of loot by doing a map at your current Zone number, or at your current Zone number minus 1.",
			name: "Map Reducer I",
			tier: 3,
			purchased: false,
			icon: "*gift2"
		},
		skeletimp: {
			description: "Double the chance for a Megaskeletimp to appear instead of a Skeletimp.",
			name: "King of Bones I",
			tier: 3,
			purchased: false,
			icon: "italic",
		},
		mapHealth: {
			description: "Your Trimps gain +100% health in maps.",
			name: "Safe Mapping",
			tier: 3,
			purchased: false,
			icon: "*map-signs"
		},
		headstart2: {
			description: "Corruption begins an additional 10 levels earlier, at Zone 166.",
			name: "Headstart II",
			tier: 3,
			purchased: false,
			icon: "road",
			requires: "headstart"
		},
		daily: {
			description: "Gain +50% attack when running a Daily Challenge.",
			name: "Legs for Days",
			tier: 3,
			purchased: false,
			icon: "*calendar4"
		},
		hyperspeed: {
			description: "Reduce the time in between fights and attacks by 100ms.",
			name: "Hyperspeed I",
			tier: 4,
			purchased: false,
			icon: "fast-forward"
		},
		blacksmith: {
			get description () {
				return "Each cleared Zone through Z" + Math.floor((getHighestLevelCleared(false, true) + 1) / 2) + " (half of your highest Zone reached) will drop all available equipment prestiges from maps.";
			},
			name: "Blacksmithery I",
			tier: 4,
			purchased: false,
			icon: "*hammer2"
		},
		turkimp2: {
			description: "Learn to grow your own Turkimp, increasing the bonus from +50% to +100%, and making the Turkimp bonus available permanently.",
			name: "Turkimp Tamer II",
			tier: 4,
			purchased: false,
			requires: "turkimp",
			icon: "*spoon-knife",
			onPurchase: function(){
				document.getElementById("turkimpBuff").style.display = "block";
				if (game.global.playerGathering) setGather(game.global.playerGathering);
			},
			onRespec: function(){
				if (game.global.turkimpTimer <= 0)
					document.getElementById("turkimpBuff").style.display = "none";
				if (game.global.playerGathering) setGather(game.global.playerGathering);

			}
		},
		magimp: {
			description: "Grants a 2% chance to find a Randimp in World and Maps. Randimps will grant the bonus of a random World or Map Exotic Import (based on current location) on death.",
			name: "Randimp",
			tier: 4,
			purchased: false,
			icon: "*dice"
		},
		headstart3: {
			description: "Corruption begins an additional 15 levels earlier, at Zone 151.",
			name: "Headstart III",
			tier: 4,
			purchased: false,
			icon: "road",
			requires: "headstart2"
		},
		mapBattery: {
			description: "Doubles the Zone bonus for completing maps once you reach 10 stacks.",
			name: "Map Battery",
			tier: 4,
			purchased: false,
			icon: "*battery-3"
		},
		hyperspeed2: {
			get description(){
				var percent = 50;
				if (game.talents.liquification3.purchased) percent = 75;
				return "Reduce the time in between fights and attacks by an additional 100ms through Z" + Math.floor((getHighestLevelCleared(false, true) + 1) * (percent / 100)) + " (" + percent + "% of your highest Zone reached).";
			},
			name: "Hyperspeed II",
			tier: 5,
			purchased: false,
			requires: "hyperspeed",
			icon: "fast-forward"
		},
		blacksmith2: {
			get description () {
				return "Each cleared Zone through Z" + Math.floor((getHighestLevelCleared(false, true) + 1) * 0.75) + " (75% of your highest Zone reached) will drop all available equipment prestiges from maps.";
			},
			name: "Blacksmithery II",
			requires: "blacksmith",
			tier: 5,
			purchased: false,
			icon: "*hammer2"
		},
		skeletimp2: {
			description: "Reduce the minimum time between Skeletimp spawns by 10 minutes.",
			name: "King of Bones II",
			tier: 5,
			purchased: false,
			icon: "italic",
			requires: "skeletimp"
		},
		quickGen: {
			description: "Increase the amount of speed that the Dimensional Generator gains per Zone by 50%. In addition, completing a Void Map at or above Z230 grants +10 Magmite.",
			name: "Expert Gen",
			tier: 5,
			purchased: false,
			icon: "*diamonds"
		},
		magmaFlow: {
			description: "Cause two extra Magma cells to appear on any Zone that already has Magma.",
			name: "Magma Flow",
			tier: 5,
			purchased: false,
			icon: "*fire",
		},
		explorers2: {
			description: "Start with an extra SpeedExplorer book after each Portal.",
			name: "Explorer Aura II",
			tier: 5,
			purchased: false,
			requires: "explorers",
			icon: "*map-signs"
		},
		voidPower3: {
			description: "Your Trimps gain an additional 30% attack and health inside Void Maps, and all current and future Void Maps gain the 'Fast Attacks' special modifier.",
			name: "Void Power III",
			onPurchase: function (clear) {
				if(game.global.world > 1)
				addMapModifier('Void', 'fa');
			},
			onRespec: function () {
				addMapModifier('Void', null, true);
			},
			tier: 6,
			purchased: false,
			icon: "*heart5",
			requires: "voidPower2"
		},
		blacksmith3: {
			get description () {
				return "Each cleared Zone through Z" + Math.floor((getHighestLevelCleared(false, true) + 1) * 0.9) + " (90% of your highest Zone reached) will drop all available equipment prestiges from maps.";
			},
			name: "Blacksmithery III",
			requires: "blacksmith2",
			tier: 6,
			purchased: false,
			icon: "*hammer2"
		},
		heirloom2: {
			description: "You can spend another extra 10% of your Nu on your Heirlooms, bringing the total to 70%.",
			name: "Heirnuum II",
			tier: 6,
			purchased: false,
			requires: "heirloom",
			icon: "grain"
		},
		liquification: {
			get description () {
				if (game.global.universe == 2) return "This Mastery is currently disabled in Universe 2";
				var text = (this.purchased) ? "This mastery is increasing " : "This mastery would increase ";
				var totalSpires = game.global.spiresCompleted;
				var fluffyCount = Fluffy.isRewardActive("liquid");
				var fluffyText = "Y";
				if (fluffyCount > 0){
					if (fluffyCount == 1) fluffyText = "Counting your Fluffy bonus as half of a Spire, y";
					else fluffyText = "Counting your two Fluffy bonuses as one Spire, y"
					totalSpires += (fluffyCount * 0.5);
				}
				return "Increase your Liquification bonus by 5%, as if you had completed 1 extra Spire. " + fluffyText + "ou have completed " + totalSpires + " unique Spire" + ((totalSpires == 1) ? "" : "s") + ", giving you " + (totalSpires * 5) + "% of your highest Zone reached (through Z" + Math.floor((totalSpires / 20) * (getHighestLevelCleared(false, true) + 1)) + "). " + text + " your bonus to " + ((totalSpires + 1) * 5) + "% of your highest Zone reached (through Z" + Math.floor(((totalSpires + 1) / 20) * (getHighestLevelCleared(false, true) + 1)) + ").";
			},
			name: "Liquification I",
			tier: 6,
			purchased: false,
			icon: "*water"
		},
		maz:{
			description: "Unlock a second preset to use with Map At Zone!",
			name: "Map at Zonier",
			tier: 6,
			purchased: false,
			onRespec: function(){
				game.options.menu.mapAtZone.U1Mode = 'a';
				game.options.menu.mapAtZone.U2Mode = 'a';
			},
			icon: "*map-o"
		},
		scry2: {
			description: "Complete an entire Void Map in Scryer Formation to earn an additional 50% Helium.",
			name: "Scryhard II",
			tier: 6,
			purchased: false,
			icon: "*spinner9",
			requires: "scry"
		},
		magmamancer: {
			description: "Magmamancers will now increase Trimp Attack by the same amount that they increase Metal. In addition, start every post-magma Zone with 5 minutes of credit already applied to your Magmamancers.",
			name: "Magmamancermancy",
			tier: 7,
			purchased: false,
			icon: "*fire2"
		},
		mapLoot2: {
			description: "Reduces the min and max number of cells by 5 when creating maps.",
			name: "Map Reducer II",
			tier: 7,
			purchased: false,
			requires: "mapLoot",
			icon: "*gift2"
		},
		nature: {
			description: "Increase your token trading ratio from 10:5 to 10:8.",
			name: "Natural Diplomacy I",
			tier: 7,
			purchased: false,
			icon: "*tree3"
		},
		deciBuild: {
			description: "Buildings in the queue are constructed 10 at a time. In addition, buildings added to the queue via AutoStructure are added 10 at a time if needed.",
			name: "Deca Build",
			tier: 7,
			purchased: false,
			icon: "*hammer"
		},
		stillRowing: {
			description: "Increase the looting bonus for completing a full row in a Spire by 50%, from 2% extra loot to 3%.",
			name: "Still Rowing I",
			tier: 7,
			purchased: false,
			icon: "align-justify"
		},
		patience: {
			description: "Anticipation can now reach 45 stacks.",
			name: "Patience",
			tier: 7,
			purchased: false,
			icon: "*clock2"
		},
		voidSpecial: {
			get description() {
				var text = "<p>Receive 1 free Void Map after using your Portal for each 100 Zones cleared last run. " + heliumOrRadon() + " from Void Maps is also increased by 0.25% for each Zone cleared last run.</p>";
				var amt = (getLastPortal() * 0.0025);
				text += "<p>You reached <b>Z" + getLastPortal() + "</b> last Portal, ";
				if (this.purchased) text += " earning you a bonus of ";
				else text += " which would earn you a bonus of ";
				text +=  prettify(amt * 100) + "% extra " + heliumOrRadon() + " and " + Math.floor(getLastPortal() / 100) + " Void Maps.</p>";
				text += "<p>Your value for \"Last Portal Zone\" only changes if you Portal after Z99 or collect an Heirloom, meaning it won't be reset by early restarts.</p>"
				return text;
			},
			name: "Void Specialization I",
			tier: 8,
			purchased: false,
			icon: "*feed"
		},
		healthStrength: {
			description: "Your Trimps gain 15% additive damage per Healthy cell in your current Zone.",
			name: "Strength in Health I",
			tier: 8,
			purchased: false,
			icon: "*aid-kit"
		},
		nature2: {
			description: "Add 5 levels to the Upgrade and Stack Transfer of all 3 Empowerments of Nature, without increasing the costs.",
			name: "Natural Diplomacy II",
			tier: 8,
			purchased: false,
			requires: "nature",
			icon: "*tree3"
		},
		liquification2: {
			get description () {
				if (game.global.universe == 2) return "This Mastery is currently disabled in Universe 2";
				var text = (this.purchased) ? "This mastery is increasing " : "This mastery would increase ";
				var totalSpires = game.global.spiresCompleted;
				if (game.talents.liquification.purchased) totalSpires++;
				var fluffyCount = Fluffy.isRewardActive("liquid");
				var fluffyText = "";
				if (fluffyCount > 0){
					if (fluffyCount == 1) fluffyText = " and your Fluffy bonus as half of a Spire";
					else fluffyText += " and your two Fluffy bonuses as another"
					totalSpires += (fluffyCount * 0.5);
				}
				return "Increase your Liquification bonus by another 5%, as if you had completed 1 extra Spire. Counting Liquification I as one Spire" + fluffyText + ", you have completed the equivalent of " + totalSpires + " unique Spire" + ((totalSpires == 1) ? "" : "s") + ", giving you " + (totalSpires * 5) + "% of your highest Zone reached (through Z" + Math.floor((totalSpires / 20) * (getHighestLevelCleared(false, true) + 1)) + "). " + text + " your bonus to " + ((totalSpires + 1) * 5) + "% of your highest Zone reached (through Z" + Math.floor(((totalSpires + 1) / 20) * (getHighestLevelCleared(false, true) + 1)) + ").";
			},
			name: "Liquification II",
			tier: 8,
			requires: "liquification",
			purchased: false,
			icon: "*water"
		},
		stillRowing2: {
			description: "Your Trimps will now gain attack equal to 2x their looting bonus from each Spire row cleared.",
			name: "Still Rowing II",
			tier: 8,
			purchased: false,
			requires: "stillRowing",
			icon: "align-justify"
		},
		amalg: {
			description: "Causes the 50% damage bonus from each Amalgamator to be compounding rather than additive.",
			name: "Amalgagreater",
			tier: 8,
			purchased: false,
			icon: "scale"
		},
		voidSpecial2: {
			get description(){
				var petName = Fluffy.getName();
				var stackLevel = (game.global.universe == 2) ? 17 : 6;
				var resName = heliumOrRadon();
				if (game.global.universe == 2 && Fluffy.getLevel() < 15){
					//no spoilers
					petName = "Fluffy";
					stackLevel = 6;
					resName = "Helium";
				}
				 var text = "<p>Gain a second Void Map per 100 Zones cleared last run, but the first one is earned at Z50 (then 150, 250 etc). In addition, if " + petName + "'s level " + stackLevel + " bonus is active, this allows " + petName + " to stack 1 additional Void Map, adding another 50% " + resName + " bonus to the stack.</p>";
				 text += "<p>You reached <b>Z" + getLastPortal() + "</b> last Portal,";
				 if (this.purchased) text += " earning you a bonus of ";
				 else text += " which would earn you a bonus of ";
				 var maps = Math.floor((getLastPortal() + 50) / 100);
				 text += maps + " more Void Maps (" + (maps + Math.floor((getLastPortal()) / 100)) + " including Void Specialization I).</p>";
				 text += "<p>Your value for \"Last Portal Zone\" only changes if you Portal after Z99 or collect an Heirloom, meaning it won't be reset by early restarts.</p>"
				 return text;
			},
			name: "Void Specialization II",
			tier: 9,
			purchased: false,
			icon: "*feed",
			requires: "voidSpecial"
		},
		bionic2: {
			description: "Adds Prestigious to Bionic Wonderland maps. This will make every Bionic Wonderland have two Prestige upgrades, including your first run that normally just has a RoboTrimp upgrade. In addition, gain +50% attack whenever you're in a map that is higher than your current World.",
			name: "Bionic Magnet II",
			tier: 9,
			purchased: false,
			onPurchase: function () {
				refreshMaps();
			},
			afterRespec: function () {
				refreshMaps();
			},
			icon: "magnet"
		},
		fluffyExp: {
			get description(){
				var prestige = Fluffy.getCurrentPrestige();
				return "" + Fluffy.getName() + " gains +25% more Exp per Zone for each completed Evolution. " + Fluffy.getName() + " has Evolved " + prestige + " time" + needAnS(prestige) + ", " + ((this.purchased) ? "earning" : "which would earn") + " you a bonus of +" + prettify(prestige * 25) + "% Exp.";
			},
			get name(){
				var name = Fluffy.getName();
				return name.substring(0, name.length - 1) + "focus";
			},
			tier: 9,
			purchased: false,
			icon: "*library"
		},
		fluffyAbility: {
			get description(){
				return "Gain one extra " + Fluffy.getName() + " ability. This works as if " + Fluffy.getName() + " Evolved, but doesn't increase " + Fluffy.getName() + "'s damage bonus.";
			},
			get name(){
				var name = Fluffy.getName();
				return name.substring(0, name.length - 1) + "finity";
			},
			tier: 9,
			purchased: false,
			icon: "*infinity"
		},
		overkill: {
			description: "Allows you to Overkill yet another cell.",
			name: "Excessive",
			tier: 9,
			purchased: false,
			icon: "*fighter-jet"
		},
		crit: {
			get description(){
				var text = "<p>Adds +1 to your MegaCrit modifier, and adds 50% of your Shield Heirloom's Crit Chance to your Crit Chance again.</p>";
				if (getHeirloomBonus("Shield", "critChance") > 0) text += "<p>Your Shield currently has a bonus of " + getHeirloomBonus("Shield", "critChance") + "%, so this Mastery " + ((this.purchased) ? "is giving you" : "would give you") + " +" + (getHeirloomBonus("Shield", "critChance") / 2) + "% additional Crit Chance.</p>";
				else text += "<p>However, you do not currently have Crit Chance on your Shield.</p>";
				return text;
			},
			name: "Charged Crits",
			tier: 9,
			purchased: false,
			icon: "*power"
		},
		voidMastery: {
			get description(){
				var voidStackCount = Fluffy.getVoidStackCount();
				var text = "<p>Grants 3 spectacular bonuses to your Void Maps";
				if (game.global.universe == 2 && !Fluffy.isRewardActive('void')) text += ", though the first two are currently incompatible with Scruffy. Scruffy tries but seriously just can't figure out the whole stacking thing yet.";
				else text += "!";
				var petName = Fluffy.getName();
				var stackLevel = (game.global.universe == 2) ? 17 : 6;
				var resName = heliumOrRadon();
				if (game.global.universe == 2 && Fluffy.getLevel() < 15){
					//no spoilers
					petName = "Fluffy";
					stackLevel = 6;
					resName = "Helium";
				}
				text += "</p><p>1. The " + petName + " bonus for stacked Void Maps calculates with compounding gains, rather than additive. Each Void Map in the stack increases the " + resName + " gain from the stack by x1.5 rather than +50%.</p>";
				text += "<p>2. If " + petName + "'s level " + stackLevel + " bonus is active, allows Void Maps to infinitely stack. HOWEVER, this requires that the bonus " + resName + " does not increase past the amount that " + petName + " can normally stack, which for you would cap the bonus to a " + voidStackCount + " stack. To clarify, a 100 stack or a " + voidStackCount + " stack map would both grant " + prettify((Math.pow(1.5, voidStackCount - 1) - 1) * 100) + "% bonus " + heliumOrRadon() + " to each map in the stack, but the entire stack will still be completed instantly and each map in the stack will receive the maximum bonus.</p>";
				text += "<p>3. Your Trimps gain 5x damage inside Void Maps</p>";
				return text;
			},
			name: "Master of the Void",
			tier: 10,
			purchased: false,
			requires: "voidSpecial2",
			icon: "*podcast"
		},
		healthStrength2: {
			get description(){
				var text = "<p>Adds 1 extra Healthy cell for every Spire completed this run. Healthy cells will also drop an additional 20% of the Zone's value in Helium, bringing the total up to 65%. Spire I will count for 1 Healthy cell once Healthy cells begin to appear in the World, but does not cause them to start spawning earlier.</p>";
				text += "<p>On your current run, you have cleared " + ((game.global.lastSpireCleared == 0) ? "no Spires" : "through Spire " + romanNumeral(game.global.lastSpireCleared)) + ", so this Mastery is granting " + game.global.lastSpireCleared + " extra Healthy cell" + needAnS(game.global.lastSpireCleared) + ". On your current Zone, you're finding " + mutations.Healthy.cellCount() + " Healthy cells.</p>";
				return text;
			},
			name: "Strength in Health II",
			tier: 10,
			purchased: false,
			requires: "healthStrength",
			icon: "*aid-kit"
		},
		stillMagmamancer: {
			description: "Start every post-magma Zone with an additional 60 seconds of credit already applied to your Magmamancers per Spire row completed this run. In addition, every 2 Spires you complete this run increases the maximum time that Magmamancers can stack by 10 minutes!",
			name: "Still Magmamancing",
			tier: 10,
			purchased: false,
			requires: ["stillRowing2", "magmamancer"],
			icon: "*equalizer"
		},
		liquification3: {
			get description () {
				if (game.global.universe == 2) return "Liquification is disabled in Universe 2, but <b>Hyperspeed II's bonus will now function up to 75% of your Highest Zone Reached (through Z" + Math.floor(game.global.highestRadonLevelCleared * 0.75) + ") rather than a measly 50%</b>";
				var text = (this.purchased) ? "This mastery is increasing " : "This mastery would increase ";
				var totalSpires = game.global.spiresCompleted;
				if (game.talents.liquification.purchased) totalSpires++;
				if (game.talents.liquification2.purchased) totalSpires++;
				var fluffyCount = Fluffy.isRewardActive("liquid");
				var fluffyText = "";
				if (fluffyCount > 0){
					if (fluffyCount == 1) fluffyText = " and your Fluffy bonus as half of a Spire";
					else fluffyText += " and your two Fluffy bonuses as another"
					totalSpires += (fluffyCount * 0.5);
				}
				return "Increase your Liquification bonus by <b>10%</b>, as if you had completed <b>2 extra Spires</b>. In addition, <b>Hyperspeed II's bonus will also now function up to 75% of your Highest Zone Reached (through Z" + Math.floor(game.global.highestLevelCleared * 0.75) + ") rather than a measly 50%</b>.<br/><br/>Counting Liquification I and II as two Spires" + fluffyText + ", you have completed the equivalent of " + totalSpires + " unique Spire" + ((totalSpires == 1) ? "" : "s") + ", giving you " + (totalSpires * 5) + "% of your highest Zone reached (through Z" + Math.floor((totalSpires / 20) * (getHighestLevelCleared(false, true) + 1)) + "). " + text + " your bonus to " + ((totalSpires + 2) * 5) + "% of your highest Zone reached (through Z" + Math.floor(((totalSpires + 2) / 20) * (getHighestLevelCleared(false, true) + 1)) + ").";
			},
			name: "Liquification III",
			tier: 10,
			purchased: false,
			requires: "liquification2",
			icon: "*water"
		},
		mesmer: {
			get description(){
				var number = (game.global.highestRadonLevelCleared >= 49) ? "2/3" : "2";
				var totalDesc = (game.global.highestRadonLevelCleared >= 49) ? "<span class='icomoon icon-infinity'></span>" : "2";
				var challengeList = (game.global.highestRadonLevelCleared >= 49) ? "Trappapalooza, " : "";
				challengeList += "Trapper, Coordinate, Trimp, Obliterated or Eradicated"
				var text = "<p>Triples the Challenge<sup>" + number + "</sup> bonus for all Challenge<sup>" + number + "</sup>s that have normal reward scaling (Does not include " + challengeList + ").</p>";
				var currentC2 = countChallengeSquaredReward(true);
				text += "<p>You currently have a C<sup>" + totalDesc + "</sup> bonus of " + prettify(currentC2) + "%.";
				totalDesc = "Challenge<sup>" + totalDesc + "</sup> bonus "
				if (this.purchased){
					var newVal = countChallengeSquaredReward(true, "noMesmer");
					text += " Removing this Mastery would reduce your bonus by " + prettify(currentC2 - newVal) + "%, bringing your total " + totalDesc + "down to " + prettify(newVal) + "%.</p>";
				}
				else{
					var newVal = countChallengeSquaredReward(true, "mesmer");
					text += " Purchasing this Mastery would increase your bonus by " + prettify(newVal - currentC2) + "%, bringing your total " + totalDesc + "up to " + prettify(newVal) + "%.</p>";
				}
				return text;
			},
			name: "Mesmer",
			tier: 10,
			purchased: false,
			icon: "*shrink",
			onPurchase: function(){
				countChallengeSquaredReward();
			},
			afterRespec: function(){
				countChallengeSquaredReward();
			}
		},
		angelic: {
			description: "Your Trimps heal for 50% of their remaining health immediately before each attack. Due to the intense amount of evil present, Trimps cannot heal in never-before-cleared Spires.",
			name: "Angelic",
			tier: 10,
			purchased: false,
			icon: "*star-half-empty"
		}
		//don't forget to add new talent tier to getHighestTalentTier()
	},
	//portal
	portal: {
		Looting_II: {
			level: 0,
			locked: true,
			priceBase: 100000,
			heliumSpent: 0,
			tooltip: "Apply your skills at salvaging things from the Spire to increase all loot gained by 0.25% per level. The price for this perk increases additively, and each level will cost exactly 10000 more than the previous level.",
			additive: true,
			additiveInc: 10000,
			modifier: 0.0025
		},
		Carpentry_II: {
			level: 0,
			locked: true,
			priceBase: 100000,
			heliumSpent: 0,
			tooltip: "You've learned to look more objectively at the no longer mysterious building designs, allowing you to increase housing space by 0.25% per level. This multiplies on top of Carpentry I, but the bonus stacks additively. The price for this perk also increases additively, and each level will cost exactly 10000 more than the previous level.",
			additive: true,
			additiveInc: 10000,
			modifier: 0.0025
		},
		Motivation_II: {
			level: 0,
			locked: true,
			priceBase: 50000,
			heliumSpent: 0,
			tooltip: "Corruption and impending doom are great motivators to work a bit harder! Increases Trimp gather speed by 1% per level. The price for this perk increases additively, and each level will cost exactly 1000 more than the previous level.",
			additive: true,
			additiveInc: 1000,
			modifier: 0.01
		},
		Power_II: {
			level: 0,
			locked: true,
			priceBase: 20000,
			heliumSpent: 0,
			tooltip: "You find strength in the desire to some day return home. Anger your Trimps by making them listen to you talk about it all the time, increasing their damage by 1% per level. The price for this perk increases additively, and each level will cost exactly 500 more than the previous level.",
			additive: true,
			additiveInc: 500,
			modifier: 0.01
		},
		Toughness_II: {
			level: 0,
			locked: true,
			priceBase: 20000,
			heliumSpent: 0,
			tooltip: "You feel more grounded as you remember where you came from. Spread your toughness to your Trimps, increasing health by 1% per level. The price for this perk increases additively, and each level will cost exactly 500 more than the previous level.",
			additive: true,
			additiveInc: 500,
			modifier: 0.01
		},
		Capable: {
			level: 0,
			locked: true,
			priceBase: 1e8,
			heliumSpent: 0,
			tooltip: "You can sense great power within Fluffy, but he'll need some training. Each level of Capable allows Fluffy to gain 1 level of Experience. Respeccing to remove Capable will temporarily remove any bonuses associated with Fluffy's level and Experience, but all Exp will be saved until you add points back. Each level of Capable is 10x more expensive than the last, and buying the first level will allow Fluffy to take Portals with you. <b>Maximum of 10 levels.</b>",
			max: 10,
			specialGrowth: 10,
			onChange: function(){
				Fluffy.handleBox();
			}
		},
		Cunning: {
			level: 0,
			locked: true,
			modifier: 0.25,
			priceBase: 1e11,
			heliumSpent: 0,
			get tooltip(){
				return "Fluffy demands more helium! Each level of Cunning will increase the final amount of Experience Fluffy gains from each Zone by " + Math.round(this.modifier * 100) + "% (additive)."
			}
		},
		Curious: {
			level: 0,
			locked: true,
			modifier: 80,
			priceBase: 1e14,
			heliumSpent: 0,
			get tooltip() {
				return "Fluffy is coming along, but he's coming along slowly. Each point of Curious will speed up Fluffy's progression by adding " + this.modifier + " Exp to the base amount he gains per Zone clear."
			}
		},
		Classy: {
			level: 0,
			locked: true,
			modifier: 3,
			priceBase: 1e17,
			heliumSpent: 0,
			get tooltip() {
				var level = (this.levelTemp) ? this.level + this.levelTemp : this.level;
				return "Reduce the Zone that Fluffy can start earning Experience at by " + this.modifier + "." + " With " + level + " level" + needAnS(level) + " in Classy, Fluffy will start earning Experience at Z" + (301 - (level * this.modifier)) + ". <b>Maximum of 75 levels.</b>";
			},
			max: 75
		},
		Overkill: {
			level: 0,
			locked: true,
			radLocked: true,
			priceBase: 1000000,
			heliumSpent: 0,
			radLevel: 0,
			radSpent: 0,
			tooltip: "You have overcome the otherworldly objective of obtaining Overkill, outstanding! Each level of this perk will allow 0.5% of your overkill damage to harm the next enemy. If this damage kills the next enemy, you will lose no time moving through that cell. <b>Maximum of 30 levels.</b>",
			max: 30
		},
		Resourceful: {
			level: 0,
			locked: true,
			modifier: 0.05,
			priceBase: 50000,
			heliumSpent: 0,
			tooltip: "Spending time with limited maps has taught you how to be more resourceful. Each level will allow you to spend 5% fewer resources <b>than the current cost</b> per level on all structures."
		},
		Coordinated: {
			level: 0,
			locked: true,
			priceBase: 150000,
			modifier: 0.98,
			heliumSpent: 0,
			currentSend: 1,
			onChange: function (overrideLevel) {
				var newValue = 1;
				var level = (overrideLevel) ? this.level + this.levelTemp : this.level;
				var currentMod = 0.25 * Math.pow(this.modifier, level);
				currentMod += 1;
				for (var x = 0; x < game.upgrades.Coordination.done; x++){
					newValue = Math.ceil(newValue * currentMod);
				}
				if (overrideLevel) return newValue;
				this.currentSend = newValue;
			},
			tooltip: "Use knowledge gained while studying Coordinated Bad Guys to reduce the amount of Trimps required per level of Coordination by 2% <b>of current amount (compounding)</b>, while keeping the stat bonus the same."
		},
		Siphonology: {
			level: 0,
			locked: true,
			max: 3,
			priceBase: 100000,
			heliumSpent: 0,
			tooltip: "Use strategies discovered in alternate dimensions to siphon Map Bonus Damage stacks from lower level maps. For each level of Siphonology, you will earn stacks from maps one level lower than your current Zone number. <b>Maximum of 3 levels.</b>",
		},
		Anticipation: {
			level: 0,
			locked: true,
			max: 10,
			modifier: 0.02,
			priceBase: 1000,
			heliumSpent: 0,
			onChange: function () {
				if (this.level <= 0) {
					game.global.antiStacks = 0;
					updateAntiStacks();
				}
			},
			get tooltip(){
				var time = game.talents.patience.purchased ? 45 : 30;
				return "Use your experiences in understanding the attention span of Trimps to increase the damage dealt by all soldiers based on how long it took to get an army together. Increases damage by 2% per level per second up to " + time + " seconds. <b>Maximum of 10 levels.</b>"
			}
		},
		Resilience: {
			level: 0,
			locked: true,
			radLocked: true,
			radLevel: 0,
			radSpent: 0,
			modifier: 0.1,
			priceBase: 100,
			heliumSpent: 0,
			tooltip: "Use your acquired skills in Trimp strengthening to gain a 10% <b>compounding</b> increase to total Trimp health."
		},
		Meditation: {
			level: 0,
			locked: true,
			modifier: 1,
			priceBase: 75,
			heliumSpent: 0,
			max: 7,
			tooltip: "Your experiences in the Dimension of Strong Things have taught you the value of taking your time. Every level of Meditation will increase your Trimps' gather speed by 1% for every 10 minutes spent on the same Zone, up to 1 hour, even when offline. This bonus is reset after clearing the current Zone. <b>Maximum of 7 levels.</b>",
			getBonusPercent: function (justStacks) {
				var timeOnZone = getGameTime() - game.global.zoneStarted;
				timeOnZone = Math.floor(timeOnZone / 600000);
				if (timeOnZone > 6) timeOnZone = 6;
				else if (timeOnZone <= 0) return 0;
				if (justStacks) return timeOnZone;
				return (timeOnZone * this.modifier * getPerkLevel("Meditation"));
			}
		},
		Relentlessness:{
			level: 0,
			locked: true,
			modifier: 0.05,
			otherModifier: 0.3,
			priceBase: 75,
			heliumSpent: 0,
			tooltip: "You've seen too many Trimps fall, it's time for more aggressive training. Bringing back these memories will cause your Trimps to gain a 5% chance to critically strike for +130% damage at level 1, and they will gain an additional 5% crit chance and 30% crit damage per level. <b>Maximum of 10 levels.</b>",
			max: 10
		},
		Masterfulness: {
			radLocked: true,
			priceBase: 100e21,//sx
			radLevel: 0,
			max: 10,
			radSpent: 0,
			specialGrowth: 50,
			tooltip: "Each level of Masterfulness grants +1 to levels of both Greed and Tenacity beyond their caps. Maximum of 10 levels."
		},
		Greed: {
			priceBase: 10e9,
			radLocked: true,
			radLevel: 0,
			radSpent: 0,
			getMult: function(){
				return Math.pow(this.getBonusAmt(), getPerkLevel("Greed") + getPerkLevel("Masterfulness"));
			},
			getBonusAmt: function(){
				var tribs = game.buildings.Tribute.owned;
				if (tribs > 1250) tribs = 1250;
				tribs -= 600;
				var mod = 1.025;
				if (tribs <= 0) return mod;
				mod += (0.00015 * tribs); //+0.015% per tribute above 600
				mod += (Math.floor(tribs / 25) * 0.0035); //+0.35% per 25 tributes above 600
				return mod;
			},
			tooltip: "Feeling poor? Just get more resources! Each level increases all loot gained by 2.5% (compounding). Starting once you have 600 Tributes, every Tribute you purchase (up to 1250) will <b>add</b> 0.015% to the compounding bonus. Every 25th Tribute you purchase will also add an additional 0.35% to the compounding bonus. For example: If you have 750 Tributes, you'll earn a 6.8% compounding Loot bonus for each level of Greed. <b>Maximum of 40 levels.</b>",
			max: 40
		},
		Tenacity: {
			priceBase: 50e6,
			radLocked: true,
			radLevel: 0,
			radSpent: 0,
			timeLastZone: -1,
			getMult: function(){
				return Math.pow(this.getBonusAmt(), getPerkLevel("Tenacity") + getPerkLevel("Masterfulness"));
			},
			getCarryoverMult: function(){
				var mult = 0.5
				mult += 0.15 * Fluffy.isRewardActive('tenacity');
				return mult;
			},
			getTime: function(){
				var minutes = getZoneMinutes();
				var lastZone = this.timeLastZone;
				if (lastZone == -1) lastZone = 0;
				if (lastZone > 120) lastZone = 120;
				minutes += (lastZone * this.getCarryoverMult());
				if (minutes > 120) minutes = 120;
				return minutes;
			},
			getBonusAmt: function(){
				var time = this.getTime();
				if (time <= 60){
					time *= (10 / 6)
				}
				else {
					time -= 60;
					time *= (2 / 6);
					time += 100;
				}
				return (1.1 + (Math.floor(time / 4) * 0.01));
			},
			tooltip: "If things seem tough, just try hitting them harder. Each level increases your Trimps' Attack by 10% (compounding). For every 4 minutes you spend on one Zone, 1% is <b>added</b> to the compounding bonus, with a max of 2 hours. When you clear a Zone, you carry 50% of the time you spent last Zone (up to 2 hours) with you to the new Zone. For example: If you have spent an hour on one Zone, you'll earn a 25% compounding Attack bonus for each level of Tenacity. <b>Maximum of 40 levels.</b>",
			max: 40
		},
		Criticality: {
			modifier: 0.1,
			priceBase: 100,
			radLocked: true,
			radLevel: 0,
			radSpent: 0,
			tooltip: "When your Critical Strikes just aren't doing enough, try Criticality! Each level increases your Trimps' Critical Strike Damage by 10% (additive).",
		},
		Equality: {
			modifier: 0.9,
			priceBase: 1,
			radLocked: true,
			radLevel: 0,
			radSpent: 0,
			tooltip: "Produce a Calming Aura from your Portal Device, reducing the Attack of Bad Guys AND Trimps by 10% (compounding). You can enable Equality Scaling, which causes Equality to start inactive and gain one level each time your Trimps die up to your purchased Perk level.",
			getModifier: function(isTrimp){
				var modifier = this.modifier;
				if (!isTrimp) return modifier;
				var tempModifier = 1 - this.modifier;
				tempModifier *= (game.heirlooms.Shield.inequality.currentBonus / 1000);
				modifier += tempModifier;
				return modifier;
			},
			getMult: function(isTrimp){
				return Math.pow(this.getModifier(isTrimp), this.getActiveLevels());
			},
			getActiveLevels: function(){
				var perkLevel = getPerkLevel("Equality");
				if (this.scalingActive && this.scalingCount < perkLevel) return this.scalingCount;
				if (!this.scalingActive && this.disabledStackCount > -1) return this.disabledStackCount;
				return perkLevel;
			},
			specialGrowth: 1.5,
			scalingActive: false,
			scalingSetting: 5,
			reversingSetting: 5,
			scalingReverse: true,
			disabledStackCount: -1,
			scalingCount: 0
		},
		Carpentry: {
			level: 0,
			locked: true,
			radLocked: true,
			radLevel: 0,
			radSpent: 0,
			modifier: 0.1,
			priceBase: 25,
			heliumSpent: 0,
			tooltip: "You've built quite a few houses and you're getting pretty good at it. Bringing your expertise in construction back through the portal will allow you to house 10% more Trimps per level <b>than the current amount (compounds)</b>."
		},
		Artisanistry: {
			level: 0,
			locked: true,
			modifier: 0.05,
			priceBase: 15,
			radLevel: 0,
			radSpent: 0,
			radLocked: true,
			heliumSpent: 0,
			tooltip: "You're beginning to notice ways to make equally powerful equipment with considerably fewer resources. Bringing back these new ideas will allow you to spend 5% fewer resources <b>than the current cost</b> per level on all equipment."
		},
		Range: {
			level: 0,
			locked: true,
			modifier: 2,
			max: 10,
			priceBase: 1,
			radLevel: 0,
			radSpent: 0,
			radLocked: true,
			heliumSpent: 0,
			tooltip: "Use your new-found leadership skills in order to increase the minimum damage your Trimps deal by 2% per level. Stacks up to 10 times, doesn't affect max damage. At 10 levels, you will get a minimum of 100% benefit from all attack damage per strike.",
		},
		Agility: {
			level: 0,
			modifier: 0.05,
			priceBase: 4,
			heliumSpent: 0,
			tooltip: "Crank your portal into overdrive, increasing the clock speed of the Universe. Each level reduces the time between Trimp and Bad Guy attacks by 5% <b>of the current time (compounds)</b>. <b>Maximum of 20 levels.</b>",
			max: 20,
			radLevel: 0,
			radSpent: 0,
			locked: false,
			radLocked: false
		},
		Bait: {
			level: 0,
			modifier: 1,
			priceBase: 4,
			heliumSpent: 0,
			tooltip: "A few of these in your traps are sure to bring in extra Trimps. Each level allows traps to catch $modifier$ extra Trimp.",
			radLevel: 0,
			radSpent: 0,
			locked: false,
			radLocked: false
		},
		Trumps: {
		//fiveTrimpMax worldUnlock
			level: 0,
			modifier: 1,
			priceBase: 3,
			heliumSpent: 0,
			tooltip: "Practicing aggressive strategizing allows you to earn $modifier$ extra max population from each battle territory bonus.",
			radLevel: 0,
			radSpent: 0,
			locked: false,
			radLocked: false
		},
		//breed main
		Pheromones: {
			level: 0,
			modifier: 0.1,
			priceBase: 3,
			heliumSpent: 0,
			tooltip: "Bring some pheromones with you to ensure that your Trimps will permanently breed 10% faster.",
			radLevel: 0,
			radSpent: 0,
			locked: false,
			radLocked: false
		},
		//trapThings main
		Packrat: {
			modifier: 0.2,
			heliumSpent: 0,
			tooltip: "Study the ancient, secret Trimp methods of hoarding. Each level increases the amount of stuff you can shove in each Barn, Shed, and Forge by 20%.",
			priceBase: 3,
			level: 0,
			radLevel: 0,
			radSpent: 0,
			locked: false,
			radLocked: false
		},
		//updatePs updates
		//gather main
		Motivation: {
			modifier: 0.05,
			heliumSpent: 0,
			tooltip: "Practice public speaking with your Trimps. Each level increases the amount of resources that workers produce by 5%.",
			priceBase: 2,
			level: 0,
			radLevel: 0,
			radSpent: 0,
			locked: false,
			radLocked: false
		},
		//startFight main
		Power: {
			level: 0,
			modifier: 0.05,
			priceBase: 1,
			heliumSpent: 0,
			tooltip: "Trimps learn through example. Spending some time bench pressing dead Elephimps should inspire any future Trimps to become stronger too. Adds 5% attack permanently to your Trimps.",
			radLevel: 0,
			radSpent: 0,
			locked: false,
			radLocked: false
		},
		//startFight main
		Toughness: {
			modifier: 0.05,
			priceBase: 1,
			heliumSpent: 0,
			tooltip: "Pay your Trimps to knock you around a little bit. By learning to not be such a wuss, your Trimps will be less wussy as well. Adds 5% health permanently to your Trimps.",
			level: 0,
			radLevel: 0,
			radSpent: 0,
			locked: false,
			radLocked: false
		},
		//rewardResources main
		Looting: {
			modifier: 0.05,
			priceBase: 1,
			heliumSpent: 0,
			get tooltip(){return "Walk back through the empty Zones, learning how to milk them for every last drop. Each level permanently increases the amount of resources gained from battle (Including " + heliumOrRadon(false, true) + ") by 5%."},
			level: 0,
			radLevel: 0,
			radSpent: 0,
			locked: false,
			radLocked: false
		},
		Prismal: {
			modifier: 0.01,
			priceBase: 1,
			radLocked: false,
			radLevel: 0,
			radSpent: 0,
			tooltip: "Crystallize some Radon, creating an interdimensional Prism that you can carry back through Portals. Each level adds 1% to your Trimps' Prismatic Shield and makes your Trimps feel 5% more comfortable in battle. Once you have 20 or more points of Prismal, you will automatically collect Prismalicious from the Prismatic Palace after completing Z20. <b>Maximum of 100 levels.</b>",
			max: 100,
			onChange: function(){
				if (!game.upgrades.Prismatic.done) document.getElementById("blockDiv").style.visibility = "visible";
			}
		},
		Hunger: {
			radLocked: true,
			priceBase: 1000000,
			radLevel: 0,
			radSpent: 0,
			tooltip: "If Soldiers get hungry, the enemies are free food! Use your extra Overkill damage to process World enemies into healthy free-range meat! Each level of Hunger will allow your Trimps to turn 3% of their Overkill damage into some permanent damage. <b>Maximum of 30 levels.</b>",
			max: 30,
			getMult: function(){
				if (this.storedDamage < 1) return 1;
				var amt = ((log10(this.storedDamage) / 80) * (this.radLevel / 30));
				amt += 1;
				if (amt < 1 || isNumberBad(amt)) return 1;
				return amt;
			},
			storedDamage: 0
		},
		Championism: {
			radLocked: true,
			priceBase: 1e9,
			radLevel: 0,
			radSpent: 0,
			baseStats: 0.01,
			statsPerLevel: 0.005,
			get tooltip(){
				var extra = (this.levelTemp) ? this.levelTemp : 0;
				var text = "Huffy has learned much from Assaulting his Spire, now store some of that knowledge in your Portal! Gain " + (this.baseStats * 100) + "% attack and health plus another " + (this.statsPerLevel * 100) + "% per Spire Assault level cleared, compounding per perk level. "
				if (this.radLevel + extra > 0) text += "<br/><br/>You are currently gaining " + formatMultAsPercent(this.getMult(0, extra), true) + " attack and health. Your next Spire Assault level will increase this bonus to " + formatMultAsPercent(this.getMult(1, extra), true) + ", or your next perk level will increase this bonus to " + formatMultAsPercent(this.getMult(0, 1 + extra), true) + ".";
				return text;
			},
			getMult: function(addAb, addLev){
				var level = this.radLevel;
				var abLevel = autoBattle.maxEnemyLevel - 1;
				if (addAb) abLevel += addAb;
				if (addLev) level += addLev;
				var base = this.baseStats + (this.statsPerLevel * abLevel);
				return Math.pow(1 + base, level);
			},
			specialGrowth: 5,
		},
		Frenzy: {
			radLocked: true,
			priceBase: 1e15,
			radLevel: 0,
			radSpent: 0,
			tooltip: "Each level grants your Trimps a 0.1% chance on attack to enter a Frenzy for 5 seconds per perk level, granting +50% attack (additive) per perk level. If your Trimps die while Frenzied, half of the remaining time on Frenzy is removed. Frenzy time can be refreshed once half of its total time has elapsed, but only if the group of Trimps that earned the buff has not died yet.",
			frenzyStarted: -1,
			deathless: true,
			//in seconds
			frenzyLeft: function(){
				if (this.frenzyStarted == -1) return 0;
				var timeSince = Math.floor((new Date().getTime() - this.frenzyStarted) / 1000);
				var remaining = this.frenzyTime() - timeSince;
				if (remaining <= 0) return 0;
				return remaining;
			},
			drawStacks: function(){
				if (this.frenzyStarted == -1 || autoBattle.oneTimers.Mass_Hysteria.owned) manageStacks(null, null, true, 'frenzyPerkStacks', null, null, true);
				else{
					var icon = "";
					if (this.canRecharge()) icon = 'icon-star-full';
					else if (this.deathless) icon = 'icon-star-half-empty';
					else icon = 'icon-star-empty';
					manageStacks('Frenzied', this.frenzyLeft(), true, 'frenzyPerkStacks', 'icomoon ' + icon, this.stackTooltip('frenzy'), false);
				}
			},
			stackTooltip: function(){
				var timeLeft = this.frenzyLeft();
				if (timeLeft <= 0) return "Your Trimps are no longer frenzied!";
				var rechargeTime = Math.ceil(timeLeft - (this.frenzyTime() / 2));
				var text = "Your Trimps are frenzied for " + timeLeft + " second" + needAnS(timeLeft) + "! They are dealing " + prettify((this.getAttackMult() - 1) * 100) + "% more damage.<br/><br/>";
				if (!this.deathless) text += "Your Trimps have died under this Frenzy buff and will be unable to recharge it.";
				else if (rechargeTime < 0) text += "Your Trimps are able to refresh this Frenzy buff!";
				else text += "The Trimps that earned this Frenzy buff are still alive, and they will be able to refresh its duration starting in " + rechargeTime + " second" + needAnS(rechargeTime) + ".";
				return text;
			},
			frenzyActive: function(){
				if (game.global.universe == 1) return false;
				if (this.radLevel <= 0) return false;
				if (game.global.challengeActive == "Berserk") return false;
				if (autoBattle.oneTimers.Mass_Hysteria.owned) return true;
				if (this.frenzyStarted == -1) return false;
				return true;
			},
			getAttackMult: function(){
				if (!this.frenzyActive()) return 1;
				return 1 + (0.5 * this.radLevel);
			},
			canRecharge: function(){
				if (!this.deathless) return false;
				if (this.frenzyLeft() < (this.frenzyTime() / 2)) return true;
				return false;
			},
			frenzyTime: function(){
				return this.radLevel * 5;
			},
			trimpAttacked: function(){
				if (game.global.challengeActive == "Berserk") return;
				if (autoBattle.oneTimers.Mass_Hysteria.owned) return;
				if (this.frenzyLeft() > 0 && !this.canRecharge()) return;
				var chance = this.radLevel;
				var roll = Math.floor(Math.random() * 1000);
				if (roll < chance){
					this.frenzyStarted = new Date().getTime();
					this.deathless = true;
					this.drawStacks();
				}
			},
			beforeAttack: function(){
				this.drawStacks();
				if (this.frenzyStarted == -1) return;
				if (this.frenzyLeft() > 0) return;
				this.frenzyStarted = -1;
			},
			trimpDied: function(){
				this.deathless = false;
				if (this.frenzyStarted == -1) return;
				var timeLeft = this.frenzyLeft();
				if (timeLeft > 1) this.frenzyStarted -= (timeLeft * 500);
				else this.frenzyStarted = -1
				this.drawStacks();
			}
		},
		Observation: {
			radLocked: true,
			priceBase: 5e18,
			radLevel: 0,
			max: 50,
			radSpent: 0,
			get tooltip(){
				var useTemp = false;
				if (game.global.viewingUpgrades || portalWindowOpen) useTemp = true;
				var perkLevel = this.radLevel + 1;
				if (useTemp) perkLevel += this.levelTemp;
				var text = "Grants your Trimps the ability to locate small Runetrinkets around the World. For each level of this perk, your Trimps will gain a chance per Zone cleared above Z100 to find a Runetrinket. Each Runetrinket increases your Trimps' attack, health, and gathered primary resources by 1% (additive) per perk level. You can store a maximum of " + this.trinketsPerLevel + " Runetrinkets per perk level, reducing levels in this perk will deactivate any trinkets above cap but not lose them. Runetrinkets persist through Portal and never reset. The chance to find a Runetrinket increases by about 50% per level of this Perk, and scales as the Zone number increases (up to Z200). You'll also find 1 guaranteed Runetrinket every 25 Zones above Z100 for every 2 levels of this perk.";
				text += "<br/><br/>You have " + prettify(this.trinkets) + " Runetrinket" + needAnS(this.trinkets) + ".";
				text += " You are currently gaining " + formatMultAsPercent(this.getMult(useTemp), true) + " attack, health, and gathered resources and you can store a total of " + prettify(perkLevel * 1000) + " Runetrinkets.<br/><br/>" + this.getChanceText(useTemp);
				return text;
			},
			specialGrowth: 2,
			trinkets: 0,
			trinketsPerLevel: 1000,
			seed: Math.floor(Math.random() * 1e6),
			getChanceText: function(useTemp){
				var chance = this.getDropChance(game.global.world + 1, false, useTemp);
				if (chance <= 0){
					return "You will have a <b>" + prettify(this.getDropChance(101, false, useTemp)) + "%</b> chance to find a Runetrinket at Z100.";
				}
				return "You have a <b>" + prettify(chance) + "%</b> chance to find a Runetrinket at the end of this Zone.";
			},
			getMult: function(useTemp){
				var perkLevel = this.radLevel + 1;
				if (useTemp) perkLevel += this.levelTemp;
				var trinkets = this.trinkets;
				var cap = perkLevel * this.trinketsPerLevel;
				if (trinkets > cap) trinkets = cap;
				return 1 + ((trinkets * perkLevel) / 100);
			},
			getDropChance: function(forceWorld, ignoreAlch, useTemp){
				var perkLevel = this.radLevel + 1;
				if (useTemp) perkLevel += this.levelTemp;
				var useWorld = (forceWorld) ? forceWorld : game.global.world;
				if (useWorld < 101) return 0;
				if (useWorld > 201) useWorld = 200;
				var zones = useWorld - 100;
				var chance = ((1 + ((perkLevel - 1) / 2)) * Math.pow(1.03, zones));
				if (game.global.challengeActive == "Alchemy" && !ignoreAlch) chance = alchObj.getRunetrinketMult(chance);
				return chance;
			},
			giveTrinket: function(amt){
				if (!amt) amt = 1;
				var cap = (this.trinketsPerLevel * (this.radLevel + 1));
				if (this.trinkets >= cap) return;
				if (this.trinkets + amt > cap) amt = cap - this.trinkets;
				this.trinkets += amt;
				message("You found " + amt + " Runetrinket" + needAnS(amt) + "!", "Loot", "*link4", "runetrinket", "runetrinket");
				if (this.trinkets >= 7500) giveSingleAchieve("Heavy Trinker");
			},
			onNextWorld: function(){
				var seed = this.seed++;
				var roll = getRandomIntSeeded(seed, 0, 10000);
				var chance = this.getDropChance() * 100;
				if (roll < chance) this.giveTrinket();
				if (game.global.world > 100 && game.global.world % 25 == 0){
					var free = Math.floor(this.radLevel / 2);
					if (free > 0) this.giveTrinket(free);
				}
			},
			onChange: function(){
				if (typeof game.global.messages.Loot.runetrinket === 'undefined') game.global.messages.Loot.runetrinket = true;
			}
		}
	},
	c2: {
		Discipline: 0,
		Metal: 0,
		Size: 0,
		Balance: 0,
		Meditate: 0,
		Trimp: 0,
		Trapper: 0,
		Electricity: 0,
		Coordinate: 0,
		Slow: 0,
		Nom: 0,
		Mapology: 0,
		Toxicity: 0,
		Watch: 0,
		Lead: 0,
		Obliterated: 0,
		Eradicated: 0,
		//U2
		Unlucky: 0,
		Downsize: 0,
		Transmute: 0,
		Unbalance: 0,
		Duel: 0,
		Trappapalooza: 0,
		Wither: 0,
		Quest: 0,
		Storm: 0,
		Berserk:0,
		Glass: 0
	},
	challenges: {
		Daily: {
			get description(){
				return (isSaving) ? "" : getDailyChallenge(0);
			},
			filter: function () {
				if (portalUniverse == 2){
					return (game.global.highestRadonLevelCleared >= 29);
				}
				return (game.global.highestLevelCleared >= 99);
			},
			allowU2: true,
			start: function () {
				startDaily();
			},
			abandon: function () {
				abandonDaily();
			},
			getCurrentReward: function(){
				var res = (game.global.universe == 2) ? game.resources.radon.owned : game.resources.helium.owned + game.stats.spentOnWorms.value;
				var value = getDailyHeliumValue(countDailyWeight()) / 100;
				if (res > 0) res = Math.floor(res * value);
				return res;
			},
			fireAbandon: true,
			get unlockString(){
				return (portalUniverse == 2) ? "reach Zone 30" : "reach Zone 100";
			}
		},
		Discipline: {
			description: "Tweak the portal to bring you back to a universe where Trimps are less disciplined, in order to teach you how to be a better Trimp trainer. Your Trimps' minimum damage will be drastically lower, but their high end damage will be considerably higher. Completing The Dimension Of Anger will cause Trimp damage to return to normal.",
			filter: function () {
				return (getTotalPerkResource(true) >= 30);
			},
			onComplete: function(){
				game.global.challengeActive = "";
				game.challenges.Discipline.completed = true;
				unlockPerk("Range");
				message("You have completed the <b>Discipline Challenge!</b> You have unlocked a new perk, and your Trimps have regained their Discipline.", "Notices");
			},
			allowSquared: true,
			squaredDescription: "Tweak the portal to bring you back to a universe where Trimps are less disciplined, in order to teach you how to be a better Trimp trainer. Your Trimps' minimum damage will be drastically lower, but their high end damage will be considerably higher.",
			unlocks: "Range",
			unlockString: "have 30 total Helium"
		},
		Metal: {
			description: "Tweak the portal to bring you to an alternate reality, where the concept of Miners does not exist, to force yourself to become frugal with equipment crafting strategies. If you complete The Dimension Of Anger without disabling the challenge, miners will re-unlock.",
			completed: false,
			filter: function () {
				return (getHighestLevelCleared(true) >= 24);
			},
			abandon: function () {
				game.worldUnlocks.Miner.fire();
				if (this.heldBooks >= 1){
					game.upgrades.Speedminer.locked = 0;
					if (this.heldBooks > 1){
						game.upgrades.Speedminer.allowed += this.heldBooks - 1;
					}
					unlockUpgrade("Speedminer");
				}
				if (this.heldMegaBooks >= 1){
					game.upgrades.Megaminer.locked = 0;
					if (this.heldMegaBooks > 1){
						game.upgrades.Megaminer.allowed += this.heldMegaBooks - 1;
					}
					unlockUpgrade("Megaminer");
				}
				if (this.holdMagma)
					unlockUpgrade("Magmamancers");
			},
			onComplete: function(){
				game.global.challengeActive = "";
				game.challenges.Metal.abandon();
				unlockPerk("Artisanistry");
				game.challenges.Metal.completed = true;
				message("You have completed the <b>Metal Challenge!</b> You have unlocked a new perk, and Miners have returned to your game.", "Notices");
			},

			allowSquared: true,
			squaredDescription: "Tweak the portal to bring you to alternate reality, where the concept of Miners does not exist, to force yourself to become frugal with equipment crafting strategies.",
			fireAbandon: false,
			heldBooks: 0,
			heldMegaBooks: 0,
			holdMagma: false,
			unlocks: "Artisanistry",
			unlockString: "reach Zone 25"
		},
		Size: {
			description: "Tweak the portal to bring you to an alternate reality, where Trimps are bigger and stronger, to force yourself to figure out a way to build larger housing. Your Trimps will gather 50% more resources, but your housing will fit 50% fewer Trimps. If you complete The Dimension of Anger without disabling the challenge, your stats will return to normal.",
			completed: false,
			filter: function () {
				return (getHighestLevelCleared(true) >= 34);
			},
			abandon: function () {
				game.jobs.Farmer.modifier *= (2/3);
				game.jobs.Lumberjack.modifier *= (2/3);
				game.jobs.Miner.modifier *= (2/3);
				game.resources.trimps.maxMod = 1;
			},
			start: function () {
				game.jobs.Farmer.modifier *= 1.5;
				game.jobs.Lumberjack.modifier *= 1.5;
				game.jobs.Miner.modifier *= 1.5;
				game.resources.trimps.maxMod = 0.5;
			},
			onComplete: function (){
				game.global.challengeActive = "";
				game.challenges.Size.abandon();
				game.challenges.Size.completed = true;
				unlockPerk("Carpentry");
				message("You have completed the <b>Size Challenge!</b> You have unlocked a new perk, and your Trimps have been reduced down to their normal size.", "Notices");
			},
			allowSquared: true,
			squaredDescription: "Tweak the portal to bring you to an alternate reality, where Trimps are bigger and stronger, to force yourself to figure out a way to build larger housing. Your Trimps will gather 50% more resources, but your housing will fit 50% fewer Trimps.",
			fireAbandon: true,
			unlocks: "Carpentry",
			unlockString: "reach Zone 35"
		},
		Balance: {
			description: "Your scientists have discovered a chaotic dimension filled with helium. All enemies have 100% more health, enemies in world deal 17% more damage, and enemies in maps deal 135% more damage. Starting at Zone 6, every time an enemy in the world is slain you will gain a stack of 'Unbalance'. Every time an enemy in a map is slain, you will lose a stack of Unbalance. Each stack of Unbalance reduces your health by 1%, but increases your Trimps' gathering speed by 1%. Unbalance can only stack to 250. Completing <b>Zone 40</b> with this challenge active will grant an additional 100% of all helium earned up to that point. This challenge is repeatable!",
			completed: false,
			filter: function () {
				return (getHighestLevelCleared(true) >= 39);
			},
			balanceStacks: 0,
			addStack: function () {
				this.balanceStacks++;
				if (this.balanceStacks > 250) this.balanceStacks = 250;
				else {
					game.global.soldierHealthMax *= 0.99;
					if (game.global.soldierHealth > game.global.soldierHealthMax) game.global.soldierHealth = game.global.soldierHealthMax;
				}
				if (this.balanceStacks > this.highestStacks) this.highestStacks = this.balanceStacks;
			},
			removeStack: function () {
				this.balanceStacks--;
				if (this.balanceStacks < 0) this.balanceStacks = 0;
				else {
					game.global.soldierHealthMax /= 0.99;
				}
			},
			abandon: function () {
				this.balanceStacks = 0;
				updateBalanceStacks();
			},
			getHealthMult: function (formatText) {
				var num = Math.pow(0.99, this.balanceStacks);
				if (formatText) return Math.floor((1 - num) * 100) + "%";
				return num;
			},
			getGatherMult: function (formatText) {
				if (formatText) return this.balanceStacks + "%";
				return ((this.balanceStacks * 0.01) + 1);
			},
			onComplete: function(){
				if (game.challenges.Balance.highestStacks <= 100) giveSingleAchieve("Underbalanced");
				var reward = game.challenges.Balance.heldHelium;
				message("You have completed the Balance challenge! You have been rewarded with " + prettify(reward) + " Helium, and you may repeat the challenge.", "Notices");
				game.challenges.Balance.abandon();
				game.global.challengeActive = "";
				addHelium(reward);
			},
			allowSquared: true,
			squaredDescription: "Your scientists have discovered a chaotic dimension filled with unharvestable but pretty helium. All enemies have 100% more health, enemies in world deal 17% more damage, and enemies in maps deal 135% more damage. Starting at Zone 6, every time an enemy in the world is slain you will gain a stack of 'Unbalance'. Every time an enemy in a map is slain, you will lose a stack of Unbalance. Each stack of Unbalance reduces your health by 1%, but increases your Trimps' gathering speed by 1%. Unbalance can only stack to 250.",
			highestStacks: 0,
			fireAbandon: true,
			heldHelium: 0,
			heliumThrough: 40,
			unlockString: "reach Zone 40"
		},
		Scientist: {
			get description (){
				var is5 = (game.global.highestLevelCleared >= 129 && game.global.sLevel >= 4);
				return "Attempt modifying the portal to " + ((is5) ? "retain positive qualities from previous dimensions" : "harvest resources when travelling") + ". Until you perfect the technique, you will start with <b>_</b> science but will be unable to research or hire scientists" + ((is5) ? " and <b style='color: maroon'>all enemy damage will be 10X higher</b>" : "") + ". Choose your upgrades wisely! Clearing <b>'The Block' (11)</b> with this challenge active will cause you to * each time you use your portal."
			},
			mustRestart: true,
			completed: false,
			heldBooks: 0,
			filter: function (fromCheck) {
				if (portalUniverse == 2) return false;
				if (game.global.sLevel == 0) return (game.global.highestLevelCleared >= 39);
				else if (game.global.sLevel == 1) return (game.global.highestLevelCleared >= 49);
				else if (game.global.sLevel == 2) {
					return (game.global.highestLevelCleared >= 89);
				}
				else if (game.global.sLevel == 3){
					 return (game.global.highestLevelCleared >= 109);
				}
				else if (game.global.sLevel >= 4){
					return (game.global.highestLevelCleared >= 129);
				}
				else return true;
			},
			onComplete: function(){
				game.global.challengeActive = "";
				game.global.sLevel = getScientistLevel();
				game.challenges.Scientist.abandon();
				message("You have completed the <b>Scientist Challenge!</b> From now on, you'll " + getScientistInfo(game.global.sLevel, true) + " every time you portal. You've unlocked Scientists, and <b>Don't forget that you can click Research on your Science again!</b>", "Notices");
			},
			abandon: function () {
				game.worldUnlocks.Scientist.fire();
				document.getElementById("scienceCollectBtn").style.display = "block";
				for (var x = 0; x < this.heldBooks; x++){
					unlockUpgrade("Speedscience");
				}
				message("You can research science again!", "Notices");
				if (game.global.sLevel >= 4) {
					if (game.buildings.Warpstation.craftTime > 0){
						game.buildings.Warpstation.craftTime = 0;
						addNewSetting('forceQueue');
					}
					document.getElementById("autoPrestigeBtn").style.display = "block";
				}
			},
			start: function () {
				document.getElementById("scienceCollectBtn").style.display = "none";
				game.resources.science.owned = getScientistInfo(getScientistLevel());
				game.global.autoUpgrades = false;
				game.global.autoPrestiges = 0;
				toggleAutoPrestiges(true);
				toggleAutoUpgrades(true);
			},
			onLoad: function () {
				document.getElementById("scienceCollectBtn").style.display = "none";
			},
			fireAbandon: false,
			unlockString: function () {
				if (game.global.sLevel == 0) return "reach Zone 40";
				else if (game.global.sLevel == 1) return "reach Zone 50";
				else if (game.global.sLevel == 2) return "reach Zone 90";
				else if (game.global.sLevel == 3) return "reach Zone 110";
				else if (game.global.sLevel >= 4) return "reach Zone 130";
			}
		},
		Meditate: {
			description: "Visit a dimension where everything is stronger, in an attempt to learn how to better train your Trimps. All enemies will have +100% health and +50% attack, but your Trimps will gather 25% faster. Completing <b>'Trimple of Doom' (33)</b> will return the world to normal.",
			completed: false,
			filter: function () {
				return (getHighestLevelCleared(true) >= 44);
			},
			onComplete: function(){
				game.global.challengeActive = "";
				unlockPerk("Meditation");
				message("You have completed the 'Meditate' challenge! The dimension has returned to normal, and you have unlocked a new perk!", "Notices");
			},
			allowSquared: true,
			squaredDescription: "Visit a dimension where everything is stronger, in an attempt to learn how to better train your Trimps. All enemies will have +100% health and +50% attack, but your Trimps will gather 25% faster.",
			unlocks: "Meditation",
			unlockString: "reach Zone 45"
		},
		Decay: {
			description: "Tweak the portal to bring you to an alternate reality, where added chaos will help you learn to create a peaceful place. You will gain 10x loot (excluding helium), 10x gathering, and 5x Trimp attack, but a stack of Decay will accumulate every second. Each stack of Decay reduces loot, gathering, and Trimp attack by 0.5% of the current amount. These stacks reset each time a Blimp is killed and cap at 999. Completing <b>Zone 55</b> with this challenge active will allow you to select the Gardens biome when creating maps, and all future Gardens maps created will gain +25% loot.",
			completed: false,
			decayValue: 0.995,
			abandon: function () {
				updateDecayStacks();
			},
			maxStacks: 999,
			fireAbandon: true,
			stacks: 0,
			filter: function () {
				return (getHighestLevelCleared(true) >= 54);
			},
			onComplete: function(){
				game.challenges.Decay.completed = true;
				game.global.decayDone = true;
				game.global.challengeActive = "";
				game.challenges.Decay.abandon();
				message("You have completed the Decay challenge! All stats have been returned to normal, and you can now create more powerful Gardens maps at will!", "Notices")	
			},
			completeAfterZone: 55,
			unlockString: "reach Zone 55",
		},
		Trimp: {
			description: "Tweak the portal to bring you to a dimension where Trimps explode if more than 1 fights at a time. You will not be able to learn Coordination, but completing <b>'The Block' (11)</b> will teach you how to keep your Trimps alive for much longer.",
			completed: false,
			heldBooks: 0,
			fireAbandon: true,
			allowSquared: true,
			squaredDescription: "Tweak the portal to bring you to a dimension where Trimps explode if more than 1 fights at a time. You will not be able to learn Coordination.",
			replaceSquareThresh: 40,
			replaceSquareReward: 3,
			replaceSquareGrowth: 3,
			unlocks: "Resilience",
			filter: function () {
				return (getHighestLevelCleared(true) >= 59);
			},
			abandon: function () {
				if (game.challenges.Trimp.heldBooks > 1)
					game.upgrades.Coordination.allowed += game.challenges.Trimp.heldBooks - 1;
				if (game.challenges.Trimp.heldBooks > 0)
					unlockUpgrade("Coordination");
				document.getElementById("realTrimpName").innerHTML = "Trimps";
			},
			start: function () {
				document.getElementById("realTrimpName").innerHTML = "Trimp";
			},
			onLoad: function () {
				this.start();
			},
			onComplete: function(){
				game.global.challengeActive = "";
				game.challenges.Trimp.abandon();
				unlockPerk("Resilience");
				message("You have completed the <b>Trimp Challenge!</b> You have unlocked the 'Resilience' perk, and your Trimps can fight together again.", "Notices");
			},
			unlockString: "reach Zone 60"
		},
		Trapper: {
			description: "Travel to a dimension where Trimps refuse to breed in captivity, teaching yourself new ways to take advantage of situations where breed rate is low. Clearing <b>'Trimple Of Doom' (33)</b> with this challenge active will return your breeding rate to normal. Note that any bonuses that cause housing to come prefilled with Trimps will not work in a dimension where Trimps cannot breed.",
			completed: false,
			heldBooks: 0,
			fireAbandon: true,
			allowSquared: true,
			squaredDescription: "Travel to a dimension where Trimps refuse to breed in captivity, good luck!",
			replaceSquareThresh: 50,
			replaceSquareGrowth: 2,
			unlocks: "Anticipation",
			filter: function () {
				return (getHighestLevelCleared(true) >= 69);
			},
			start: function () {
				document.getElementById('trimpsBreedingTitle').innerHTML = "bored";
			},
			onLoad: function () {
				this.start();
			},
			abandon: function () {
				document.getElementById('trimpsBreedingTitle').innerHTML = "breeding";
				for (var x = 0; x < game.challenges.Trapper.heldBooks; x++){
					unlockUpgrade("Potency");
				}
			},
			onComplete: function(){
				game.global.challengeActive = "";
				game.challenges.Trapper.abandon();
				unlockPerk("Anticipation");
				message("You have completed the 'Trapper' challenge! Your Trimps now remember how to breed, and you have unlocked a new perk!", "Notices");
			},
			unlockString: "reach Zone 70"
		},
		Electricity: {
			description: "Use the keys you found in the Prison to bring your portal to an extremely dangerous dimension. In this dimension enemies will electrocute your Trimps, stacking a debuff with each attack that damages Trimps for 10% of total health per turn per stack, and reduces Trimp attack by 10% per stack. Clearing <b>'The Prison' (80)</b> will reward you with an additional 200% of all helium earned up to but not including Zone 80. This is repeatable!",
			completed: false,
			hasKey: false,
			filter: function () {
				return (portalUniverse == 1 && game.global.prisonClear > 0);
			},
			fireAbandon: true,
			abandon: function () {
				game.challenges.Electricity.stacks = 0;
				updateElectricityStacks();
			},
			onComplete: function(){
				var reward = Math.floor(game.challenges.Electricity.heldHelium * 2);
				if (game.global.challengeActive == "Electricity") message("You have completed the Electricity challenge! You have been rewarded with " + prettify(reward) + " Helium, and you may repeat the challenge.", "Notices");
				game.challenges.Electricity.heldHelium = 0;
				game.global.challengeActive = "";
				addHelium(reward);
				game.challenges.Electricity.stacks = 0;
				updateElectricityStacks();
				refreshMaps();
			},
			heldHelium: 0,
			heliumThrough: 79,
			allowSquared: true,
			attacksInARow: 0,
			squaredDescription: "Use the keys you found in the Prison to bring your portal to an extremely dangerous dimension. In this dimension enemies will electrocute your Trimps, stacking a debuff with each attack that damages Trimps for 10% of total health per turn per stack, and reduces Trimp attack by 10% per stack.",
			stacks: 0,
			unlockString: "clear 'The Prison' at Zone 80"
		},
		Frugal: {
			description: "Bring yourself to a dimension where Equipment is cheap but unable to be prestiged, in order to teach yourself better resource and equipment management. Completing <b>'Dimension of Anger' (20)</b> with this challenge active will return missing books to maps, and your new skills in Frugality will permanently cause MegaBooks to increase gather speed by 60% instead of 50%.",
			completed: false,
			filter: function () {
				return (getHighestLevelCleared(true) >= 99);
			},
			start: function (reset) {
				var mod = (reset) ? 1.2 : 1.1;
				for (var item in game.equipment){
					var cost = (item == "Shield") ? "wood" : "metal";
					game.equipment[item].cost[cost][1] = mod;
				}
			},
			onLoad: function () {
				this.start();
			},
			onComplete: function(){
				game.global.challengeActive = "";
				game.global.frugalDone = true;
				game.challenges.Frugal.abandon();
				message("You have completed the 'Frugal' challenge! You can once again find equipment upgrades in maps, and Megabooks now increase gather rates by an extra 10%!", "Notices");
			},
			fireAbandon: true,
			abandon: function () {
				this.start(true);
			},
			unlockString: "reach Zone 100"
		},
		Life: {
			description: "Explore a dimension that is normally populated by the Undead, but is currently plagued by a quickly moving virus that can bring things back to life. All enemies in this dimension have 500% extra attack and 1000% extra health. Attacking a normal undead enemy gives your Trimps 1 stack of Unliving, which increases Trimp attack and health by 10% (additive) per stack. Trimps can have a maximum of 150 stacks of Unliving, and attacking a Living enemy will remove 5 stacks of Unliving. Completing <b>Zone 110</b> will reward you with an additional 400% of all helium earned up to that point. This is repeatable!",
			completed: false,
			filter: function () {
				return (getHighestLevelCleared(true) >= 109)
			},
			heliumMultiplier: 4,
			heldHelium: 0,
			heliumThrough: 110,
			unlockString: "reach Zone 110",
			stacks: 150,
			maxStacks: 150,
			fireAbandon: true,
			lowestStacks: 150,
			getHealthMult: function(forDisplay){
				var mult = (this.stacks / 10);
				if (forDisplay) return (prettify(mult * 100) + "%");
				return 1 + mult;
			},
			arrayHolder: [[]],
			start: function () {
				updateLivingStacks();
			},
			abandon: function () {
				if (document.getElementById('livingBuff')) document.getElementById('goodGuyName').removeChild(document.getElementById('livingBuff'));
			}
		},
		Mapocalypse: {
			description: "Experience a slightly distorted version of the 'Electricity' dimension, to help understand the relationship between maps and the world. Everything will work exactly the same as Electricity, but all maps will have an extra 300% difficulty. Clearing <b>'The Prison' (80)</b> will cause the world to return to normal. You <b>will</b> receive the Helium reward from Electricity.",
			completed: false,
			filter: function () {
				return (getHighestLevelCleared(true) >= 114);
			},
			fireAbandon: true,
			abandon: function () {
				for (var x = 0; x < game.global.mapsOwnedArray.length; x++){
					game.global.mapsOwnedArray[x].difficulty = parseFloat(game.global.mapsOwnedArray[x].difficulty) - this.difficultyIncrease;
				}
			},
			onComplete: function(){
				var reward = Math.floor(game.challenges.Electricity.heldHelium * 2);
				message("You have completed the Mapocalypse challenge! You have unlocked the 'Siphonology' Perk, and have been rewarded with " + prettify(reward) + " Helium.", "Notices");
				unlockPerk("Siphonology");
				game.challenges.Mapocalypse.abandon();
				game.challenges.Electricity.heldHelium = 0;
				game.global.challengeActive = "";
				addHelium(reward);
				game.challenges.Electricity.stacks = 0;
				updateElectricityStacks();
				refreshMaps();
			},
			unlocks: "Siphonology",
			unlockString: "reach Zone 115",
			difficultyIncrease: 3
		},
		Coordinate: {
			description: "Visit a dimension where Bad Guys are Coordinated but never fast, to allow you to study naturally evolved Coordination. Completing <b>'Dimension of Anger' (20)</b> with this challenge active will cause all enemies to lose their Coordination.",
			completed: false,
			allowSquared: true,
			squaredDescription: "Visit a dimension where Bad Guys are Coordinated but never fast, chip 'em down!",
			replaceSquareFreq: 3,
			replaceSquareThresh: 30,
			filter: function () {
				return (getHighestLevelCleared(true) >= 119);
			},
			onComplete: function(){
				game.global.challengeActive = "";
				unlockPerk("Coordinated");
				message("You have completed the 'Coordinate' challenge! The Bad Guys on this world no longer fight together, and have regained their speed. You have unlocked the 'Coordinated' perk!", "Notices");
			},
			unlocks: "Coordinated",
			unlockString: "reach Zone 120"
		},
		Crushed: {
			description: "Journey to a dimension where the atmosphere is rich in helium, but Bad Guys have a 50% chance to Critical Strike for +400% damage unless your Block is as high as your current Health. Clearing <b>Bionic Wonderland (Z125)</b> will reward you with an additional 400% of all helium earned up to but not including Z125. This challenge is repeatable.",
			completed: false,
			filter: function () {
				return (getHighestLevelCleared(true) >= 124);
			},
			critsTaken: 0,
			fireAbandon: true,
			abandon: function () {
				document.getElementById("badCrit").innerHTML = "";
				document.getElementById("badCanCrit").style.display = "none";
			},
			onComplete: function(){
				var heliumAdded = (game.challenges.Crushed.heldHelium * 4);
				message("You have completed the Crushed challenge! You have been rewarded with " + prettify(heliumAdded) + " Helium.", "Notices");
				game.challenges.Crushed.heldHelium = 0;
				game.global.challengeActive = "";
				addHelium(heliumAdded);
				if (game.challenges.Crushed.critsTaken == 0) giveSingleAchieve("Thick Skinned");
				game.challenges.Crushed.abandon();
			},
			heldHelium: 0,
			heliumThrough: 124,
			unlockString: "reach Zone 125"
		},
		Slow: {
			description: "Legends tell of a dimension inhabited by incredibly fast Bad Guys, where blueprints exist for a powerful yet long forgotten weapon and piece of armor. All Bad Guys will attack first in this dimension, but clearing <b>Zone 120</b> with this challenge active will forever-after allow you to create these new pieces of equipment.",
			completed: false,
			allowSquared: true,
			squaredDescription: "Legends tell of a dimension inhabited by incredibly fast Bad Guys, and you seem to want to go there to prove something. All Bad Guys will attack first in this dimension, watch your health!",
			filter: function () {
				return (getHighestLevelCleared(true) >= 129);
			},
			onComplete: function(){
				message("You have completed the Slow challenge! You have found the patterns for the Gambeson and the Arbalest!", "Notices");
				game.global.challengeActive = "";
				if (!game.global.slowDone){
					unlockEquipment("Arbalest");
					unlockEquipment("Gambeson");
				}
				game.global.slowDone = true;
			},
			unlockString: "reach Zone 130"
		},
		Nom: {
			description: "Travel to a dimension where Bad Guys enjoy the taste of Trimp. Whenever a group of Trimps dies, the Bad Guy will eat them, gaining 25% (compounding) more attack damage and healing for 5% of their maximum health. The methane-rich atmosphere causes your Trimps to lose 5% of their total health after each attack, but the Bad Guys are too big and slow to attack first. Clearing <b>Zone 145</b> will reward you with an additional 450% of all helium earned up to that point. This is repeatable!",
			completed: false,
			allowSquared: true,
			squaredDescription: "Travel to a dimension where Bad Guys enjoy the taste of Trimp. Whenever a group of Trimps dies, the Bad Guy will eat them, gaining 25% (compounding) more attack damage and healing for 5% of their maximum health. The methane-rich atmosphere causes your Trimps to lose 5% of their total health after each attack, but the Bad Guys are too big and slow to attack first.",
			heliumMultiplier: 4.5,
			filter: function () {
				return (getHighestLevelCleared(true) >= 144);
			},
			heldHelium: 0,
			heliumThrough: 145,
			unlockString: "reach Zone 145"
		},
		Mapology: {
			description: "Travel to a dimension where maps are scarce, in an attempt to learn to be more resourceful. You will earn one map Credit for each World Zone you clear, and it costs 1 credit to run 1 map. Completing <b>Zone 100</b> with this challenge active will return you to your original dimension. Double prestige from Scientist IV will not work during this challenge.",
			completed: false,
			filter: function () {
				return (getHighestLevelCleared(true) >= 149);
			},
			fireAbandon: true,
			allowSquared: true,
			squaredDescription: "Travel to a dimension where maps are scarce, in an attempt to learn to be more resourceful. You will earn one map Credit for each World Zone you clear, and it costs 1 credit to run 1 map. <b>Double prestige from Scientist IV and the Blacksmithery mastery will not function while this challenge is active.</b>",
			abandon: function (){
				document.getElementById("mapCreditsLeft").innerHTML = "";
			},
			onLoad: function () {
				updateMapCredits();
			},
			onComplete: function(){
				message("You have completed the Mapology challenge! You have unlocked the 'Resourceful' Perk! Cheaper stuff!", "Notices");
				game.global.challengeActive = "";
				unlockPerk("Resourceful");
				game.challenges.Mapology.abandon();
			},
			unlocks: "Resourceful",
			credits: 0,
			unlockString: "reach Zone 150"
		},
		Toxicity: {
			description: "Travel to a dimension rich in helium, but also rich in toxic Bad Guys. All Bad Guys have 5x attack and 2x health. Each time you attack a Bad Guy, your Trimps lose 5% of their health, and toxins are released into the air which reduce the breeding speed of your Trimps by 0.3% (of the current amount), but also increase all resources obtained by 0.15% (including Helium), stacking up to 1500 times. These stacks will reset when you clear a Zone. Completing <b>Zone 165</b> with this challenge active will reward you with an additional 400% of all helium earned up to that point. This is repeatable!",
			completed: false,
			filter: function () {
				return (getHighestLevelCleared(true) >= 164);
			},
			highestStacks: 0,
			heldHelium: 0,
			heliumThrough: 165,
			heliumMultiplier: 4,
			stacks: 0,
			maxStacks: 1500, //Changing this breaks the feat spaghetti
			stackMult: 0.997,
			lootMult: 0.15,
			allowSquared: true,
			squaredDescription: "Travel to a dimension filled with the glory that comes from killing toxic Bad Guys. All Bad Guys have 5x attack and 2x health. Each time you attack a Bad Guy, your Trimps lose 5% of their health, and toxins are released into the air which reduce the breeding speed of your Trimps by 0.3% (of the current amount), but also increase all loot found by 0.15%, stacking up to 1500 times. These stacks will reset when you clear a Zone.",
			unlockString: "reach Zone 165"
		},
		Devastation: {
			description: "Travel to a harsh dimension where Trimps are penalized for the mistakes of previous generations. If your army is killed at any point, any overkill damage will be applied 750% to the next group of Trimps to fight. Completing <b>Imploding Star (Zone 170)</b> will return the world to normal.",
			completed: false,
			filter: function () {
				return (getHighestLevelCleared(true) >= 169);
			},
			onComplete: function(){
				message("You have completed the Devastation challenge! Your world has been returned to normal, and you have unlocked the Overkill perk!", "Notices");
				game.global.challengeActive = "";
				unlockPerk("Overkill");
				addNewSetting('overkillColor');
				refreshMaps();
			},
			lastOverkill: -1,
			unlocks: "Overkill",
			unlockString: "reach Zone 170"
		},
		Watch: {
			description: "Travel to a strange dimension where life is easier but harder at the same time. At the end of each World Zone any available equipment upgrades will drop, and any unassigned Trimps will be split evenly amongst Farmer, Lumberjack, and Miner. However, resource production and drops from all sources will be halved, and all enemies will deal 25% more damage. Completing <b>Zone 180</b> with this challenge active will reward you with an additional 200% of all helium earned up to that point.",
			filter: function () {
				return (getHighestLevelCleared(true) >= 179);
			},
			allowSquared: true,
			squaredDescription: "Travel to a strange dimension where life is easier but harder at the same time. At the end of each World Zone any available equipment upgrades will drop, and any unassigned Trimps will be split evenly amongst Farmer, Lumberjack, and Miner. However, resource production and drops from all sources will be halved, and all enemies will deal 25% more damage. Relax and let the Trimps figure it out for themselves, you know you want to.",
			heliumMultiplier: 2,
			heldHelium: 0,
			heliumThrough: 180,
			unlockString: "reach Zone 180",
			enteredMap: false
		},
		Lead: {
			description: "Travel to a dimension where life is easier or harder depending on the time. Odd numbered Zones will cause double resources to be earned from all sources, and will give your Trimps 50% extra attack. Starting an even numbered Zone will cause all enemies to gain 200 stacks of <b>Momentum</b>. Clearing a World cell will cause 1 stack to be lost, and each stack will increase the enemy's damage and health by 4%, and block pierce by 0.1%. If your Trimps attack without killing their target, they will lose 0.03% of their health per enemy stack. Completing <b>Zone 180</b> with this challenge active will reward you with an additional 300% of all helium earned up to that point.",
			filter: function () {
				return (getHighestLevelCleared(true) >= 179);
			},
			heliumMultiplier: 3,
			stacks: 0,
			heldHelium: 0,
			allowSquared: true,
			squaredDescription: "Travel to a dimension where life is easier or harder depending on the time. Odd numbered Zones will cause double resources to be earned from all sources, and will give your Trimps 50% extra attack. Starting an even numbered Zone will cause all enemies to gain 200 stacks of <b>Momentum</b>. Clearing a World cell will cause 1 stack to be lost, and each stack will increase the enemy's damage and health by 4%, and block pierce by 0.1%. If your Trimps attack without killing their target, they will lose 0.03% of their health per enemy stack.",
			heliumThrough: 180,
			unlockString: "reach Zone 180",
			fireAbandon: true,
			abandon: function () {
				if (document.getElementById('determinedBuff')) document.getElementById('determinedBuff').style.display = "none";
			}
		},
		Corrupted: {
			get description(){ return "Travel to a dimension where enemies have 3X attack and Corruption runs rampant, beginning at Z60. The Corruption in this dimension grants helium, but 50% less than normal. Improbabilities and Void Maps will still not gain strength or double reward until Z" + mutations.Corruption.start(true) + ". Completing <b>Zone 190</b> with this challenge active will reward you with an extra 200% helium earned from any source up to that point, and will instantly transport you back to your normal dimension."},
			filter: function () {
				return (getHighestLevelCleared(true) >= 189);
			},
			heliumMultiplier: 2,
			heldHelium: 0,
			heliumThrough: 190,
			hiredGenes: false,
			unlockString: "reach Zone 190"
		},
		Domination: {
			description: "Travel to a dimension where the strongest Bad Guys gain strength from those weaker than them. Most Bad Guys have 90% less health and attack, but the final Bad Guy in every World Zone and Map has 2.5x more damage, 7.5x more health, and heals for 5% every time they attack your Trimps. But they also drop three times as much Helium! Clearing <b>Zone 215</b> will also reward you with an extra 100% of helium earned from any source up to that point, and will instantly teleport you back to your normal dimension!",
			filter: function () {
				return (getHighestLevelCleared(true) >= 214);
			},
			heliumMultiplier: 1,
			heldHelium: 0,
			heliumThrough: 215,
			unlockString: "reach Zone 215",
			fireAbandon: true,
			abandon: function(){
				var elem = document.getElementById('dominationDebuffContainer');
				if (elem) elem.style.display = 'none';
			}
		},
		Obliterated: {
			get squaredDescription() {
				var num = prettify(1e12);
				return "Against your better judgement, travel to a dimension that's simply just not very friendly. Liquimps are unable to liquify, enemies have " + num + "x attack and health, and equipment is " + num + "x more expensive. Every 10 Zones, enemy attack and health will increase by another 10x."
			},
			filter: function () {
				return (getHighestLevelCleared(true) >= 424);
			},
			replaceSquareFreq: 1,
			replaceSquareThresh: 10,
			onlySquared: true,
			allowSquared: true,
			fireAbandon: true,
			unlockString: "reach Zone 425",
			mustRestart: true,
			zoneScaling: 10,
			zoneScaleFreq: 10
		},
		Eradicated: {
			get squaredDescription() {
				var num = prettify(game.challenges.Eradicated.scaleModifier);
				return "If you thought Obliterated was not very friendly, wait until you see this dimension! Liquimps are unable to liquify, enemies have " + num + "x attack and health, and equipment is " + num + "x more expensive. Every 2 Zones, enemy attack and health will increase by another " + game.challenges.Eradicated.zoneScaling + "x. <b>However, you'll earn 1 extra Coordination per Zone you clear! Oh and Magma, Corruption, and Nature start at Z1.</b>"
			},
			filter: function () {
				return (game.global.totalSquaredReward >= 4500);
			},
			replaceSquareFreq: 1,
			replaceSquareThresh: 2,
			replaceSquareReward: 10,
			replaceSquareGrowth: 2,
			scaleModifier: 1e20,
			onlySquared: true,
			allowSquared: true,
			fireAbandon: true,
			unlockString: "reach 4500% Challenge<sup>2</sup> bonus",
			mustRestart: true,
			zoneScaling: 3,
			zoneScaleFreq: 2,
			start: function(){
				startTheMagma();
			}
		},
		Experience: {
			description: "Fluffy tells you about a special dimension with some interesting sights he'd like to see. Starting at Z300, any Map at World level or higher has a 20% chance to contain a Wonder. Clearing that cell will grant Fluffy 3 Zones worth of Exp, but will also increase Enemy Attack and Health by 15% (compounding) for the rest of the Challenge. Once a Wonder is found, another cannot be found for 5 more World Zones. Completing Bionic Wonderland XXXIII (L605) or higher while at or above Z601 in the World will complete the Challenge. When the Challenge ends, Fluffy gains an extra 5% of all Experience earned during the Challenge for every Wonder he saw, plus another 50% for every BW tier above XXXIII this Challenge was completed on (up to +350% for XL). The Challenge will also automatically complete with no extra bonus from Bionic Wonderlands after beating World Z700. This Challenge can be repeated!",
			wonders: 0,
			nextWonder: 300,
			completeAfterZone: 700,
			heldExperience: 0,
			unlockString: "reach Zone 600",
			fireAbandon: true,
			onMapEnemyKilled: function(mapLevel){
				if (game.global.world < this.nextWonder) return;
				if (mapLevel < game.global.world) return;
				var mapObj = getCurrentMapObject();
				var chance = 5 * mapObj.size;
				var roll = Math.floor(Math.random() * chance);
				if (roll == 0){
					this.nextWonder = game.global.world + 5;
					this.wonders++;
					message("Fluffy has Experienced the Wonder of " + mapObj.name + "!", "Notices");
					Fluffy.rewardExp(3);
					this.drawStacks();
				}
			},
			start: function(){
				this.drawStacks();
			},
			onNextWorld: function(){
				this.drawStacks();
			},
			onLoad: function(){
				this.drawStacks();
			},
			abandon: function(){
				this.clearStacks();
			},
			onComplete: function(mapLevel){
				game.global.challengeActive = "";
				var extraTiers = Math.floor((mapLevel - 605) / 15);
				if (extraTiers > 7) extraTiers = 7;
				if (!extraTiers) extraTiers = 0;
				var xp = this.heldExperience;
				xp *= this.getFinalXpMult(extraTiers);
				if (Fluffy.canGainExp()){
					game.global.fluffyExp += xp;
					Fluffy.getBestExpStat().value += xp;
				}
				
				message("You have completed the Experience Challenge! Fluffy has gained an additional " + prettify(xp) + " Experience (" + prettify(this.heldExperience) + " earned, " + prettify(this.wonders * 5) + "% from " + this.wonders + " Wonder" + needAnS(this.wonders) + " + " + prettify(extraTiers * 50) + "% from extra BW tiers), and your World has been returned to normal.", "Notices");
				this.wonders = 0;
				this.heldExperience = 0;
				this.clearStacks();
			},
			filter: function(){
				return (getHighestLevelCleared(true) >= 599)
			},
			clearStacks: function(){
				manageStacks(null, null, true, 'experienceWonderStacks', null, null, true);
			},
			drawStacks: function(){
				var color = (this.nextWonder == 300) ? "Grey" : (game.global.world >= this.nextWonder) ? "Green" : "Red";
				manageStacks('Wonders Experienced', this.wonders, true, 'experienceWonderStacks', 'icomoon icon-pictures', this.wonderTooltip(), false, false, 'xpColor');
				swapClass('xpColor', 'xpColor' + color, document.getElementById('experienceWonderStacks'));
			},
			getFinalXpMult: function(extraTiers){
				var addBw = 0;
				if (extraTiers && extraTiers > 0){					
					addBw = (extraTiers * 0.5);
				}
				return (this.wonders * 0.05) + addBw;
			},
			getEnemyMult: function(){
				return Math.pow(1.15, this.wonders);
			},
			wonderTooltip: function(){
				var text = "Fluffy has seen " + this.wonders + " Wonder" + needAnS(this.wonders) + ", bringing the extra Experience bonus at the end of the Challenge to " + prettify(this.getFinalXpMult() * 100) + "% of all Exp earned. Enemies have +" + prettify((this.getEnemyMult() - 1) * 100) + "% increased Attack and Health.<br/><br/>";
				if (this.nextWonder == 300) text += "The first Wonder can be seen starting at Z300."
				else if (game.global.world <= this.nextWonder) text += "Fluffy last saw a Wonder on Z" + (this.nextWonder - 5) + ", and the next one is available at Z" + this.nextWonder + ".";
				else text += "Fluffy thinks you could find a Wonder now if you ran a few maps!";
				if (this.heldExperience > 0){
					text += "<br/><br/>Fluffy has earned a total of " + prettify(this.heldExperience) + " Exp so far, and will gain an extra " + prettify(this.heldExperience * this.getFinalXpMult()) + "&nbsp;-&nbsp;" + prettify(this.heldExperience * this.getFinalXpMult(7)) + " Exp on completion (depending on BW tier)."
				}
				return text;
			}
		},
		//U2 Challenges
		Unlucky: {
			description: "Your Trimps will never get far in this harsh Universe without learning how to control their luck. Tweak your Portal to bring you to a an alternate reality where your Trimps' minimum damage will be drastically lower, but their high end damage will be considerably higher. Each time your Trimps attack, 5 alternate timelines will open up. If the first digit of your Trimps' minimum attack is even, the timeline where your Trimps did the most damage will become reality. If the first digit is odd, the timeline where your Trimps did the least amount of damage will instead become reality. Clearing the <b>Dimension of Rage (Zone 15)</b> will complete this Challenge!",
			squaredDescription: "Tweak your Portal to bring you to a an alternate reality where your Trimps' minimum damage will be drastically lower, but their high end damage will be considerably higher. Each time your Trimps attack, 5 alternate timelines will open up. If the first digit of your Trimps' minimum attack is even, the timeline where your Trimps did the most damage will become reality. If the first digit is odd, the timeline where your Trimps did the least amount of damage will instead become reality.",
			filter: function () {
				return (getHighestLevelCleared(true) >= 14);
			},
			completeAfterMap: "Dimension of Rage",
			onComplete: function(){
				game.global.challengeActive = "";
				game.challenges.Unlucky.completed = true;
				unlockPerk("Range");
				message("You have completed the <b>Unlucky Challenge!</b> You have unlocked a new perk, and your Trimps' damage has normalized.", "Notices");
			},
			allowU2: true,
			blockU1: true,
			allowSquared: true,
			unlocks: "Range",
			unlockString: "reach Zone 15",
			lastHitLucky: false
		},
		Downsize: {
			description: "Tweak the portal to bring you to an alternate reality, where Trimps are incredibly antisocial and refuse to share a house with any other Trimps. Each housing building will only provide 1 Trimp, but the morale boost and smaller society causes all Trimps to gather 5x as many resources per second. Clearing <b>Prismatic Palace (Zone 20)</b> will complete this Challenge!",
			squaredDescription: "Tweak the portal to bring you to an alternate reality, where Trimps are incredibly antisocial and refuse to share a house with any other Trimps. Each housing building will only provide 1 Trimp, but the morale boost and smaller society causes all Trimps to gather 5x as many resources per second.",
			completed: false,
			filter: function () {
				return (getHighestLevelCleared(true) >= 19);
			},
			completeAfterMap: "Prismatic Palace",
			onComplete: function (){
				var buildings = game.buildings;
				var hutCount = buildings.Hut.owned;
				if (buildings.House.owned == hutCount && buildings.Mansion.owned == hutCount && buildings.Hotel.owned == hutCount && buildings.Resort.owned == hutCount)
					giveSingleAchieve("Perfectly Balanced");
				game.global.challengeActive = "";
				game.challenges.Downsize.completed = true;
				unlockPerk("Carpentry");
				message("You have completed the <b>Downsize Challenge!</b> You have unlocked a new perk, and your Trimps are once again willing to share houses.", "Notices");
			},
			allowU2: true,
			blockU1: true,
			allowSquared: true,
			unlocks: "Carpentry",
			unlockString: "reach Zone 20"
		},
		Transmute: {
			description: "Tweak the portal to bring you to an alternate reality where Metal cannot drop or be gathered at all. At the end of each Zone, your Food, Wood, and Science are completely consumed and 75% of the net amount of consumed resources become Metal. Clearing <b>Zone 25</b> will complete this Challenge!",
			squaredDescription: "Tweak the portal to bring you to an alternate reality where Metal cannot drop or be gathered at all. At the end of each Zone, your Food, Wood, and Science are completely consumed and 75% of the net amount of consumed resources become Metal.",
			completed: false,
			filter: function () {
				return (getHighestLevelCleared(true) >= 24);
			},
			abandon: function () {
				game.worldUnlocks.Miner.fire();
				if (this.heldBooks >= 1){
					game.upgrades.Speedminer.locked = 0;
					if (this.heldBooks > 1){
						game.upgrades.Speedminer.allowed += this.heldBooks - 1;
					}
					unlockUpgrade("Speedminer");
				}
				if (this.holdMagma)
					unlockUpgrade("Magmamancers");
			},
			onComplete: function(){
				game.global.challengeActive = "";
				game.challenges.Transmute.abandon();
				unlockPerk("Artisanistry");
				game.challenges.Transmute.completed = true;
				message("You have completed the <b>Transmute Challenge!</b> You have unlocked a new perk, and Miners have returned to your game.", "Notices");
				var jobCount = 0;
				for (var job in game.jobs) jobCount += game.jobs[job].owned; //Dragimp adds 1
				if (jobCount - game.jobs.Dragimp.owned - game.jobs.Amalgamator.owned == 0 && game.stats.trimpsFired.value == 0) giveSingleAchieve("Resourceyphobe");
			},
			onNextWorld: function(){
				var resCount = game.resources.food.owned + game.resources.wood.owned + game.resources.science.owned;
				game.resources.food.owned = 0;
				game.resources.wood.owned = 0;
				game.resources.science.owned = 0;
				resCount *= 0.75;
				addResCheckMax("metal", resCount, false, false, false, true);
			},
			completeAfterZone: 25,
			allowU2: true,
			blockU1: true,
			allowSquared: true,
			fireAbandon: false,
			heldBooks: 0,
			holdMagma: false,
			unlocks: "Artisanistry",
			unlockString: "reach Zone 25"
		},
		Unbalance: {
			description: "Your scientists have discovered a new chaotic dimension! All enemies have 50% more attack, enemies in world have 100% more health, and enemies in maps have 200% more health. Starting at Zone 6, every time an enemy in the world is slain you will gain a stack of 'Unbalance'. Every time an enemy in a map is slain, you will lose a stack of Unbalance. Each stack of Unbalance reduces your attack by 1%, but increases your Trimps' gathering speed by 1%. Unbalance can stack to 500. Clearing <b>Zone 35</b> will complete this Challenge!",
			squaredDescription: "Travel to a fun chaotic dimension! All enemies have 50% more attack, enemies in world have 100% more health, and enemies in maps have 200% more health. Starting at Zone 6, every time an enemy in the world is slain you will gain a stack of 'Unbalance'. Every time an enemy in a map is slain, you will lose a stack of Unbalance. Each stack of Unbalance reduces your attack by 1%, but increases your Trimps' gathering speed by 1%.",
			completed: false,
			blockU1: true,
			allowU2: true,
			allowSquared: true,
			filter: function () {
				return (getHighestLevelCleared(true) >= 34);
			},
			balanceStacks: 0,
			addStack: function () {
				this.balanceStacks++;
				if (this.balanceStacks > 500) this.balanceStacks = 500;
				if (this.balanceStacks > this.highestStacks) this.highestStacks = this.balanceStacks;
			},
			removeStack: function () {
				this.balanceStacks--;
				if (this.balanceStacks < 0) this.balanceStacks = 0;
			},
			abandon: function () {
				this.balanceStacks = 0;
				updateBalanceStacks();
			},
			getAttackMult: function (formatText) {
				var num = Math.pow(0.99, this.balanceStacks);
				if (formatText) return Math.floor((1 - num) * 100) + "%";
				return num;
			},
			getGatherMult: function (formatText) {
				if (formatText) return this.balanceStacks + "%";
				return ((this.balanceStacks * 0.01) + 1);
			},
			onComplete: function(){
				if (this.balanceStacks >= 500) giveSingleAchieve("Upsized");
				message("You have completed the Unbalance challenge! You have unlocked the Equality Perk!", "Notices");
				game.challenges.Unbalance.abandon();
				game.global.challengeActive = "";
				unlockPerk("Equality");
				document.getElementById("equalityTab").style.display = "table-cell";
			},
			highestStacks: 0,
			fireAbandon: true,
			unlockString: "reach Zone 35",
			completeAfterZone: 35,
			unlocks: "Equality"
		},
		Bublé: {
			description: "Tweak the portal to bring you to an alternate reality where Trimps really really don't like taking damage. Your Trimps start in this reality with an extra 250% Prismatic Shield, but as soon as they take any damage to health at all, they will refuse to fight again and the challenge will end. Clearing <b>Zone 40</b> without failing will complete this Challenge - granting an additional 500% of all Radon earned up to that point. Failing this Challenge will grant an additional 200% of all Radon earned up to the spot where you failed.",
			completed: false,
			allowU2: true,
			blockU1: true,
			heldHelium: 0,
			heliumThrough: 40,
			fireAbandon: true,
			abandon: function(){
				this.onFail();
			},
			filter: function () {
				return (getHighestLevelCleared(true) >= 39);
			},
			onFail: function(){
				var reward = game.challenges.Bublé.heldHelium * 2;
				message("Oh no, you failed the Bublé challenge! You have been rewarded with " + prettify(reward) + " extra Radon, and you may try again.", "Notices");
				game.global.challengeActive = "";
				addHelium(reward);
			},
			onComplete: function(){
				if (game.global.canRespecPerks && !game.global.bonePortalThisRun && game.portal.Prismal.radLevel == 0) giveSingleAchieve("Unpoppable");
				var reward = game.challenges.Bublé.heldHelium;
				reward *= 5;
				message("You have completed the Bublé challenge! You're a hero among Trimps! You have been rewarded with " + prettify(reward) + " extra Radon, and you may repeat the challenge.", "Notices");
				game.global.challengeActive = "";
				addHelium(reward);			
			},
			unlockString: "reach Zone 40",
			completeAfterZone: 40
		},
		Duel: {
			description: "It's your Trimps vs the Bad Guys! Both teams start with 50 points, and both teams' Crit Chance is locked to the amount of points the OTHER team has. Getting a Critical Strike steals 1 point from the other team, winning a battle steals 2 points, and winning a battle in one hit steals 5 points. Any team below 20 points gains 10x health, any team below 10 points always attacks first, and any team above 50 points gains 3x damage. Clearing <b>Zone 45</b> will complete this Challenge!",
			squaredDescription: "It's your Trimps vs the Bad Guys! Both teams start with 50 points, and both teams' Crit Chance is locked to the amount of points the OTHER team has. Getting a Critical Strike steals 1 point from the other team, winning a battle steals 2 points, and winning a battle in one hit steals 5 points. Any team below 20 points gains 10x health, Enemies attack first when less than 10 points (<b>Trimps cannot become Fast on this Challenge in Challenge<sup>3</sup> mode!</b>), and any team above 50 points gains 3x damage.",
			completed: false,
			allowU2: true,
			blockU1: true,
			fireAbandon: true,
			trimpStacks: 50,
			enemyStacks: 50,
			lowestTrimpStacks: 50,
			healthMult: 10,
			allowSquared: true,
			abandon: function(){
				manageStacks(null, null, true, 'trimpDuelPoints', null, null, true);
				manageStacks(null, null, false, 'enemyDuelPoints', null, null, true);
			},
			drawStacks: function(){
				if (this.trimpStacks < this.lowestTrimpStacks) this.lowestTrimpStacks = this.trimpStacks;
				manageStacks('Duel Points', this.trimpStacks, true, 'trimpDuelPoints', 'icomoon icon-abacus', this.stackTooltip(true), false);
				manageStacks('Duel Points', this.enemyStacks, false, 'enemyDuelPoints', 'icomoon icon-abacus', this.stackTooltip(false), false);
			},
			stackTooltip: function(isTrimp){
				var name = (isTrimp) ? "Your Trimps" : "The Bad Guys";
				var stacks = (isTrimp) ? this.trimpStacks : this.enemyStacks;
				var text = name + " have " + stacks + " Duel Points.";
				if (stacks > 50) text += " " + name + " have 3x attack for being over 50 points.";
				else if (stacks < 10) text += " " + name + " always attack first and have 10x health for being below 10 points.";
				else if (stacks < 20) text += " " + name + " have 10x health for being below 20 points.";
				text += "<br/><br/>" + name + " have " + ((isTrimp) ? this.enemyStacks : this.trimpStacks) + "% Crit Chance based on " + ((isTrimp) ? "enemy" : "your") + " stacks.";
				return text;
			},
			onComplete: function(){
				if (this.lowestTrimpStacks >= 20) giveSingleAchieve("Pwnd");
				message("You have completed the Duel challenge! You have unlocked the Criticality Perk!", "Notices");
				game.challenges.Duel.abandon();
				game.global.challengeActive = "";
				unlockPerk("Criticality");
			},
			filter: function() {
				return (getHighestLevelCleared(true) >= 44);
			},
			unlocks: "Criticality",
			unlockString: "reach Zone 45",
			completeAfterZone: 45
		},
		Melt: {
			description: "Tweak the portal to bring you to an alternate reality, where there's plenty of risk and Radon. You will gain 10x loot (excluding Radon), 10x gathering, and 5x Trimp attack, but a stack of Melt will accumulate every second. Each stack of Melt reduces loot, gathering, and Trimp attack by 1% of the current amount. These stacks reset each time a Zone is cleared and cap at 500. Clearing <b>Melting Point (Zone 50) <i>or</i> Zone 55</b> will complete this Challenge - granting an additional 400% of all Radon collected through Z50. This Challenge is repeatable!",
			completed: false,
			abandon: function () {
				this.stacks = 0;
				updateDecayStacks();
			},
			decayValue: 0.99,
			fireAbandon: true,
			allowU2: true,
			blockU1: true,
			stacks: 0,
			heldHelium: 0,
			heliumThrough: 50,
			maxStacks: 500,
			largestStacks: 0,
			filter: function () {
				return (getHighestLevelCleared(true) >= 49);
			},
			onComplete: function(){
				if (this.largestStacks <= 150) giveSingleAchieve("Solid");
				var reward = game.challenges.Melt.heldHelium;
				reward *= 4;
				message("You have completed the Melt challenge! You have been rewarded with " + prettify(reward) + " Radon, and you may repeat the challenge.", "Notices");
				game.global.challengeActive = "";
				game.challenges.Melt.abandon();
				addHelium(reward);			
			},
			unlockString: "reach Zone 50",
			completeAfterMap: "Melting Point",
			completeAfterZone: 55
		},
		Trappapalooza: {
			description: "Travel to a dimension where Trimps refuse to breed in captivity, teaching you to stop breeding such weak Trimps. Trimps also seem to release an unfortunate burst of radiation when Trapped in this reality, instantly destroying 10% of your stored Food, Wood, Metal, and Science. So like, be careful of that. Clearing <b>Melting Point (Zone 50)</b> will complete this Challenge!",
			squaredDescription: "Travel to a dimension where Trimps refuse to breed in captivity, teaching you to stop breeding such weak Trimps. Trimps also release an unfortunate burst of radiation when Trapped in this reality, instantly destroying 10% of your stored Food, Wood, Metal, and Science. But you know to be careful of that.",
			completed: false,
			heldBooks: 0,
			fireAbandon: true,
			allowU2: true,
			blockU1: true,
			allowSquared: true,
			replaceSquareThresh: 50,
			replaceSquareGrowth: 2,
			replaceSquareReward: 3,
			unlocks: "Resilience",
			completeAfterMap: "Melting Point",
			trappedAt50: false,
			filter: function () {
				return (getHighestLevelCleared(true) >= 59);
			},
			start: function () {
				document.getElementById('trimpsBreedingTitle').innerHTML = "bored";
			},
			onLoad: function () {
				this.start();
			},
			abandon: function () {
				document.getElementById('trimpsBreedingTitle').innerHTML = "breeding";
				for (var x = 0; x < game.challenges.Trappapalooza.heldBooks; x++){
					unlockUpgrade("Potency");
				}
			},
			onComplete: function(){
				if (!this.trappedAt50) giveSingleAchieve("Coastapalooza");
				game.global.challengeActive = "";
				game.challenges.Trappapalooza.abandon();
				unlockPerk("Resilience");
				message("You have completed the 'Trappapalooza' challenge! Your Trimps now remember how to breed, and you have unlocked a new perk!", "Notices");
			},
			unlockString: "reach Zone 60"
		},
		Quagmire: {
			description: "Travel to an extremely muddy dimension. It's hard to walk out here, making Agility difficult. Your Trimps start each run with 100 stacks of Motivated, increasing all Loot gained by 40% per stack (including Radon). After each Zone, your Trimps gain 1 stack of Exhausted, reducing Trimp damage and breed speed by 10% per stack in the World, and 5% per stack in maps (compounding). For every 10 stacks of Exhausted, your Trimps will also attack 100ms slower. You'll also have access to run a special map called 'The Black Bog', which will always scale to Zone level and is such a terrifying map that Exotic Imp-orts are unable to spawn there. Completing 'The Black Bog' will reduce your Trimps' Exhausted by 1 stack, but will also reduce their Motivated by 1 stack. Exhausted stacks can be negative, and will increase damage and breed speed. Completing Z70 or reaching 0 Motivated stacks with this Challenge active will end the Challenge, returning the World to normal. If the Challenge is ended by completing Z70, you will gain an additional 250% of all Radon earned.",
			motivatedStacks: 100,
			exhaustedStacks: 0,
			completed: false,
			blockU1: true,
			allowU2: true,
			allowSquared: false,
			completeAfterZone: 70,
			heldHelium: 0,
			heliumThrough: 70,
			unlockString: " reach Zone 70",
			fireAbandon: true,
			filter: function(){
				return (getHighestLevelCleared(true) >= 69);
			},
			start: function(){
				createMap(-1, "The Black Bog", "Darkness", 10, 150, 3, true);
				this.drawStacks();
			},
			onComplete: function(){
				var reward = game.challenges.Quagmire.heldHelium;
				reward *= 2.5;
				message("You have completed the Quagmire challenge! You have gained an extra " + prettify(reward) + " Radon, and your world has been returned to normal.", "Notices");
				addHelium(reward);
				game.challenges.Quagmire.abandon();
			},
			drawStacks: function(){
				manageStacks('Motivated', this.motivatedStacks, true, 'quagmireMotivatedStacks', 'glyphicon glyphicon-gift iconPadLeft', this.stackTooltip("Motivated"), false);
				manageStacks('Exhausted', this.exhaustedStacks, true, 'quagmireExhaustedStacks', 'glyphicon glyphicon-bed iconPadLeft', this.stackTooltip("Exhausted"), false);
			},
			onLoad: function() {
				this.drawStacks();
			},
			onNextWorld: function(){
				this.exhaustedStacks++;
				this.drawStacks();
			},
			stackTooltip: function(which){
				if (which == "Motivated"){
					return "Your Trimps are Motivated, increasing all Loot gained (including Radon) by " + prettify((game.challenges.Quagmire.getLootMult() - 1) * 100) + "%.";
				}
				var exhaustMult = game.challenges.Quagmire.getExhaustMult();
				if (exhaustMult < 1) return "Your Trimps are exhausted, having only " + prettify(exhaustMult * 100) + "% of their normal damage and breed speed.";
				return "Your Trimps are not at all exhausted, and have " + prettify((exhaustMult - 1) * 100) + "% more damage and breed speed.";
			},
			abandon: function(){
				this.motivatedStacks = 100;
				this.exhaustedStacks = 0;
				game.global.challengeActive = "";
				manageStacks('Motivated', null, true, 'quagmireMotivatedStacks', null, null, true);
				manageStacks('Exhausted', null, true, 'quagmireExhaustedStacks', null, null, true);
				this.removeBog();
			},
			getSpeedPenalty: function(){
				if (this.exhaustedStacks < 10) return 0;
				var slowCount = Math.floor(this.exhaustedStacks / 10);
				return (slowCount * 100);
			},
			getLootMult: function(){
				return 1 + (this.motivatedStacks * 0.4);
			},
			removeBog: function(){
				var bogMap = this.getBogMap();
				if (!bogMap) return;
				if (game.global.mapsActive && game.global.currentMapId == bogMap.id){
					mapsClicked(true);
				}
				bogMap.noRecycle = false;
				recycleMap(getMapIndex(bogMap.id), false, false, true);
				if (game.global.preMapsActive) mapsSwitch(true, true);
			},
			getBogMap: function(){
				for (var x = 0; x < game.global.mapsOwnedArray.length; x++){
					if (game.global.mapsOwnedArray[x].location == "Darkness"){
						return game.global.mapsOwnedArray[x];
					}
				}
				return false;
			},
			getExhaustMult: function(){
				if (this.exhaustedStacks == 0) return 1;
				var mult = 1;
				var mod = (game.global.mapsActive) ? 0.05 : 0.1;
				if (this.exhaustedStacks < 0) mult = Math.pow((1 + mod), Math.abs(this.exhaustedStacks));
				else mult = Math.pow((1 - mod), this.exhaustedStacks);
				return mult;
			}
		},
		Wither: {
			description: "Travel to an ultra scary alternate reality with horrific Bad Guys. Enemies heal for 25% of their maximum health before each attack. If an enemy ever heals itself back to 100% health, your army will fall to despair and instantly wither away. Every enemy slain by your Trimps in the World or World-level Maps grants 1 stack of Hardness to your Trimps (stacking up to 10,000 and increasing Health by 0.1% per stack) and 1 stack of Horror to all enemies (increasing Attack by 0.05% per stack). Whenever a group of Trimps is killed by Wither, Trimps lose half of their stacks of Hardness and block the enemy's ability to heal and Wither for an amount of cells equal to 10% of the Hardness stacks lost. Clearing <b>Zone 70</b> will complete this Challenge.",
			squaredDescription: "Travel to an ultra scary alternate reality with horrific Bad Guys. Enemies heal for 25% of their maximum health before each attack. If an enemy ever heals itself back to 100% health, your army will fall to despair and instantly wither away. Every enemy slain by your Trimps in the World or World-level Maps grants 1 stack of Hardness to your Trimps (stacking up to 10,000 and increasing Health by 0.1% per stack) and 1 stack of Horror to all enemies (increasing Attack by 0.05% per stack). Whenever a group of Trimps is killed by Wither, Trimps lose half of their stacks of Hardness and block the enemy's ability to heal and Wither for an amount of cells equal to 10% of the Hardness stacks lost. Plaguebringer is disabled during Wither<sup>3</sup>",
			completed: false,
			blockU1: true,
			allowU2: true,
			allowSquared: true,
			unlocks: "Tenacity",
			completeAfterZone: 70,
			unlockString: " reach Zone 70",
			fireAbandon: true,
			trimpStacks: 0,
			enemyStacks: 0,
			healImmunity: 0,
			onComplete: function(){
				if (this.trimpStacks >= 10000) giveSingleAchieve("Witherproof");
				message("You have completed the Wither challenge! Your world has been returned to normal, and you have unlocked the Tenacity perk!", "Notices");
				game.global.challengeActive = "";
				unlockPerk("Tenacity");
				game.challenges.Wither.abandon();
			},
			filter: function() {
				return (getHighestLevelCleared(true) >= 69);
			},
			addStacks: function(){
				if (!game.global.mapsActive || getCurrentMapObject().level >= game.global.world){
					if (this.trimpStacks < 10000){
						if (game.global.soldierHealth > 0){
							var increase = this.getTrimpHealthMult();
							this.trimpStacks++;
							increase = ((this.getTrimpHealthMult() / increase) - 1);
							addSoldierHealth(increase);
						}
						else{
							this.trimpStacks++;
						}
					}
					this.enemyStacks++;
				}
				if (this.healImmunity > 0) this.healImmunity--;
				this.drawStacks();
			},
			witherTrimps: function(){
				var lostStacks = Math.ceil(this.trimpStacks * 0.5);
				this.healImmunity = Math.floor(lostStacks * 0.1);
				this.trimpStacks -= lostStacks;
				this.drawStacks();
			},
			abandon: function(){
				var healthReduce = (1 / this.getTrimpHealthMult()) - 1;
				if (healthReduce < 0)
					addSoldierHealth(healthReduce);
				this.trimpStacks = 0;
				this.enemyStacks = 0;
				this.healImmunity = 0;
				manageStacks(null, null, true, 'witherHardenedStacks', null, null, true);
				manageStacks(null, null, false, 'witherHorrorStacks', null, null, true);
				manageStacks(null, null, true, 'witherImmunityStacks', null, null, true);
			},
			drawStacks: function(){
				manageStacks('Hardened', this.trimpStacks, true, 'witherHardenedStacks', 'glyphicon glyphicon-heart', this.stackTooltip(true), false);
				manageStacks('Horror', this.enemyStacks, false, 'witherHorrorStacks', 'glyphicon glyphicon-screenshot', this.stackTooltip(false), false);
				if (this.healImmunity > 0)
					manageStacks('Wither Immunity', this.healImmunity, true, 'witherImmunityStacks', 'icomoon icon-plus', 'Enemies cannot heal or inflict Wither while your Trimps have Wither Immunity.')
				else
					manageStacks(null, null, true, 'witherImmunityStacks', null, null, true);
			},
			onLoad: function() {
				this.drawStacks();
			},
			stackTooltip: function(isTrimp){
				var name = (isTrimp) ? "Your Trimps" : "The Bad Guys";
				var buffName = (isTrimp) ? "Hardened" : "Horror";
				var stat = (isTrimp) ? "Health" : "Attack";
				var stacks = (isTrimp) ? this.trimpStacks : this.enemyStacks;
				var mult = (isTrimp) ? this.getTrimpHealthMult() : this.getEnemyAttackMult();
				mult = prettify((mult - 1) * 100);
				var text = name + " have " + stacks + " stack" + needAnS(stacks) + " of " + buffName + ", increasing their " + stat + " by " + mult + "%.";
				return text;
			},
			getEnemyAttackMult: function(){
				return (1 + (0.0005 * this.enemyStacks)); 
			},
			getTrimpHealthMult: function(){
				return (1 + (0.001 * this.trimpStacks));
			}
		},
		Revenge: {
			description: "Travel to an exceptionally harsh dimension filled with vengeful creatures, including the Trimps. Enemies have 10x health on even zone numbers. If your army is killed at any point, any overkill damage will be applied 750% to the next group of Trimps to fight. Any time a group of Trimps is killed by this Overkill damage, your Trimps gain a stack of 'Revenge', increasing their Attack and Health by 20% (additive). However if your Trimps ever reach 20 stacks of Revenge, you will instantly fail the Challenge. Clearing <b>Zone 80</b> with less than 20 stacks of Revenge will complete this Challenge.",
			completed: false,
			blockU1: true,
			allowU2: true,
			filter: function () {
				return (getHighestLevelCleared(true) >= 79);
			},
			onComplete: function(){
				if (this.stacks == 19) giveSingleAchieve("Close Call");
				message("You have completed the Revenge challenge! Your world has been returned to normal, and you have unlocked the Hunger perk!", "Notices");
				game.global.challengeActive = "";
				unlockPerk("Hunger");
			},
			onFail: function(){
				message("You have failed the Revenge Challenge! Better luck next time!", "Notices");
				this.stacks = 0;
				game.global.challengeActive = "";
				this.abandon();
			},
			addStack: function(){
				this.stacks++;
				if (this.stacks >= 20) this.onFail();
				else this.drawStacks();
			},
			fireAbandon: true,
			abandon: function(){
				manageStacks(null, null, true, 'revengeChallengeStacks', null, null, true);
			},
			drawStacks: function(){
				manageStacks('Revenge', this.stacks, true, 'revengeChallengeStacks', 'icomoon icon-bomb', this.stackTooltip(true), false);
			},
			onLoad: function(){
				this.drawStacks();
			},
			stackTooltip: function(){
				var text = "Your Trimps have been killed by enemy overkill damage " + this.stacks + " time" + needAnS(this.stacks);
				text += "<br/><br/>Your Trimps have " + prettify(this.getMult()) + "x Attack and Health, but you will fail the challenge if they get " + (20 - this.stacks) + " more stack" + needAnS(20 - this.stacks) + "!";
				return text;
			},
			getMult: function(){
				return 1 + (this.stacks * .2);
			},
			stacks: 0,
			lastOverkill: -1,
			completeAfterZone: 80,
			unlocks: "Hunger",
			unlockString: "reach Zone 80"
		},
		Quest: {
			description: "Travel to an alternate reality where Trimps really love questing. Enemies in this reality gain 10% extra health each zone starting at Z6 (compounding). However, you'll also get a random Quest each Zone starting at 6. Completing this quest will grant a 2x Radon multiplier for the rest of the Zone (does not stack), and will increase your Trimps' attack by 10% for the rest of the Challenge (compounding). Check messages or the Zone info tooltip for quest progress. Clearing <b>Zone 85</b> will complete this Challenge, returning Trimp Attack and Enemy Health to normal.",
			get squaredDescription(){
				return "Travel to an alternate reality where Trimps really love questing. Enemies in this reality gain 10% extra health each zone starting at Z" + this.getQuestStartZone(true) + " (compounding). However, you'll also get a random Quest each Zone starting at the same Zone. Your Quest start Zone is always equal to your highest Zone on C3 minus 80, but never lower than 6. Completing this quest will grant a 2x Radon multiplier for the rest of the Zone (does not stack), and will increase your Trimps' attack by 10% for the rest of the Challenge (compounding). Check messages or the Zone info tooltip for quest progress.";
			},
			completed: false,
			allowU2: true,
			blockU1: true,
			completeAfterZone: 85,
			questId: -1,
			questComplete: false,
			questProgress: 0,
			resource: "",
			finishedQuests: 0,
			questsMade: 0,
			allowSquared: true,
			questDescriptions: ["Quintuple (x5) your {resource}", "Double your {resource}", "Complete 5 Maps at Zone level", "One-shot 5 world enemies", "Don't let your shield break before Cell 100", "Don't run a map before Cell 100", "Buy a Smithy"],
			filter: function(){
				return (getHighestLevelCleared(true) >= 84);
			},
			getAttackMult: function(){
				return Math.pow(1.1, this.finishedQuests);
			},
			getHealthMult: function(){
				var questStart = this.getQuestStartZone();
				if (game.global.world < questStart) return 1;
				return Math.pow(1.1, game.global.world - questStart - 1);
			},
			checkQuest: function(){
				if (this.questId == -1) return;
				if (this.questComplete) return;
				if (this.questId <= 1){ //resource gain quests
					var owned = game.resources[this.resource].owned;
					if (owned >= this.questProgress) this.completeQuest();
				}
				else if (this.questId <= 3){ //Check if quest progress >= 5
					if (this.questProgress >= 5) this.completeQuest();
				}
				else if (this.questId <= 5){ //Complete 99th cell with 0 questProgress
					if (this.questProgress == 0) this.completeQuest();
				}
				else if (this.questId == 6){ //Only called when buying smithy, complete the quest
					this.completeQuest();
				}
			},
			onStartFight: function(){
				if (this.questId == -1) return;
				if (this.questComplete) return;
				if (this.questId < 2) return; //resource quests checked from gather
				if (this.questId <= 3) this.checkQuest();
				else if (this.questId <= 5 && game.global.lastClearedCell == 98) this.checkQuest();
				//Do nothing for 6, checkQuest called from smithy purchase
			},
			getQuestProgress: function(){
				if (this.questId == -1) return "";
				if (this.questComplete) return "Quest Complete!";
				if (this.questId <= 1){
					return prettify(game.resources[this.resource].owned) + " / " + prettify(this.questProgress) + " " + this.resource;
				}
				if (this.questId <= 3){
					return this.questProgress + " / 5";
				}
				if (this.questId <= 5){
					if (this.questProgress > 0) return "Failed!";
					return "Still Earnable!";
				}
				if (this.questId == 6){
					return "0 / 1";
				}
			},
			completeQuest: function(){			
				this.questComplete = true;
				this.finishedQuests++;
				if (this.finishedQuests == 80 && this.questsMade == 80) giveSingleAchieve("Level Up");
				message("You have completed your quest! You've completed " + this.finishedQuests + " / " + this.questsMade + " quests.", "Notices", "*question2", "questMessage questSuccess")
			},
			failQuest: function(){
				message("Oh no, you failed your quest! You've completed " + this.finishedQuests + " / " + this.questsMade + " quests.", "Notices", "*exclamation", "questMessage questFail")
			},
			disableOverkill: function(){
				return false;
				if (!game.global.challengeActive == "Quest" || this.questComplete || game.global.mapsActive || this.questId != 3) return false;
				return true;
			},
			getNextQuest: function(){
				if (this.questId != -1 && !this.questComplete) this.failQuest();
				var quests = [];
				for (var y = 0; y < this.questDescriptions.length; y++){
					if (y != 6 || this.questId != 6) quests.push(y);
				}
				var roll = Math.floor(seededRandom(game.global.u2WorldSeed++) * quests.length);
				roll = quests[roll];
				this.questId = roll;
				this.questComplete = false;
				this.questsMade++;
				if (roll <= 1){
					var resCheck = ["food", "wood", "metal", "gems", "science"];
					var res = [];
					for (var x = 0; x < resCheck.length; x++){
						if (game.resources[resCheck[x]].owned > 0) res.push(resCheck[x]);
					}
					if (res.length == 0){
						res.push("food");
						game.resources.food.owned = 5;
					}
					var resRoll = Math.floor(seededRandom(game.global.u2WorldSeed++) * res.length);
					this.resource = res[resRoll];
					var mult = (roll == 0) ? 5 : 2;
					this.questProgress = game.resources[res[resRoll]].owned * mult;
				}
				else{
					this.questProgress = 0;
					this.res = "";
				}
				message("You have a new quest! <b>" + this.getQuestDescription() + "</b>. Good luck!", "Notices", "*exclamation", "questMessage questNew")
			},
			getQuestDescription: function(addProgress){
				if (this.questId == -1) "No active quest";
				var desc = this.questDescriptions[this.questId];
				if (this.questId <= 1) desc = desc.replace("{resource}", this.resource);
				if (addProgress) desc += ". Progress: " + this.getQuestProgress();
				return desc;
			},
			getQuestStartZone: function(desc){
				var questStart = (desc ||game.global.runningChallengeSquared) ? game.c2.Quest - 80 : 6;
				if (questStart < 6) questStart = 6;
				return questStart;
			},
			onNextWorld: function(){
				var questStart = this.getQuestStartZone();
				if (game.global.world >= questStart){
					this.getNextQuest();
				}
			},
			onComplete: function(){
				message("You have completed the Quest challenge! Your World has been returned to normal and you have unlocked the Greed Perk!", "Notices");
				game.global.challengeActive = "";
				unlockPerk("Greed");
			},
			unlockString: "reach Zone 85",
			unlocks: "Greed"
		},
		Archaeology: {
			description: "Travel to a dimension with lots of buried Relics. When starting this challenge, you'll be granted access to 5 special new upgrades called Relics that grant a compounding increase to your Attack, Breed Speed, Radon, Resource Gain (Food, Wood, Metal, Science and Gems), and one that decreases Enemy Attack. These upgrades all cost science and increase in cost whenever any of them are purchased. However, your Attack, Breed Speed, Radon, Resource Gain, and Enemy Health Relics all decrease by 1 Relic level every Zone and can go negative. All Radon drops have a base increase of +200% in this dimension. Completing <b>Z90</b> with this Challenge active will grant an additional +500% of all Radon earned. After the first time you complete this Challenge, you'll gain the ability to create maps with Small and Large Research Caches! After the second time you complete this Challenge, you'll unlock powerful customization for AutoGold.",
			completed: false,
			blockU1: true,
			allowU2: true,
			allowSquared: false,
			completeAfterZone: 90,
			heldHelium: 0,
			heliumThrough: 90,
			unlockString: " reach Zone 90",
			fireAbandon: true,
			pauseAuto: false,
			overZero: false,
			points: {
				attack: 0,
				enemyAttack: 0,
				radon: 0,
				science: 0,
				breed: 0
			},
			purchases: 0,
			filter: function(){
				return (getHighestLevelCleared(true) >= 89);
			},
			automatorTooltip: function(){
				var text = "<div id='ArchaeologyAutomatorError' style='color: red'></div>";
				text += "<div>The Archaeology Automator is any Archaeologist's best friend (once they figure out how to use it)! Below you'll need to enter a string for the Automator to parse. Your string should be separated by commas, and will indicate priority for Relic purchases.<br/><br/>An example of a viable string would be '-10a,5s,5r,10s,10r,5a'. <b>Use 'a' for trimp Attack, 'e' for Enemy attack, 'r' for Radon, 's' for reSource, and 'b' for Breed speed.</b><br/><br/>As previously stated, each rule (separated by commas) in this string dictates the priority of that particular upgrade. With the given example string, the Automator will first buy Trimp Attack Relics until they're at or above -10, then will attempt to get the Resource Relic up to positive 5 points, then it will do the same with Radon. Once all of these Relics lose a point, the Automator will go back and fill Attack back up to -10 first, then Resource back up to 5, then Radon back to 5, then will move on to trying to get Resource to 10. Each time points are lost in a Relic, or if the Automator string is modified, the Automator will start back at the first rule and work its way back up.</div>";
				var selectedPerc = game.global.archThresh;
				var options = "<option value='0.1'" + ((selectedPerc == 0.1) ? " selected" : "") + ">0.1%</option><option value='1'" + ((selectedPerc == 1) ? " selected" : "") + ">1%</option><option value='5'" + ((selectedPerc == 5) ? " selected" : "") + ">5%</option><option value='10'" + ((selectedPerc == 10) ? " selected" : "") + ">10%</option><option value='25'" + ((selectedPerc == 25) ? " selected" : "") + ">25%</option><option value='50'" + ((selectedPerc == 50) ? " selected" : "") + ">50%</option><option value='99'" + ((selectedPerc == 99) ? " selected" : "") + ">99%</option>";
				text += "<br/>Purchase when the Relic cost is less than or equal to <select id='ArchaeologyAutomatorSelect'>" + options + "</select> of your total Science";
				text += "<br/><input style='width: 100%' value='" + game.global.archString + "' type='text' id='ArchaeologyAutomatorInput'/>"
				return text;
			},
			getDefs: function(){
				return {
					a: "attack",
					e: "enemyAttack",
					r: "radon",
					b: "breed",
					s: "science"
				}
			},
			saveAutomator: function(){
				var elem = document.getElementById('ArchaeologyAutomatorInput');
				var error = "";
				var val = "";
				if (elem !== null) val = htmlEncode(elem.value);
				val = val.replace(/\s/g, '')
				if (val == "" || !val){
					game.global.archString = "";
					return;
				}
				var defs = this.getDefs();
				var split = val.split(',');
				if (!split.length) {
					game.global.archString = "";
					cancelTooltip();
					return;
				}
				if (split.length > 25){
					error += "You can only have a maximum of 25 separate Automator rules for this Challenge. You currently have " + split.length + " in your string.<br/>"
				}
				for (var x = 0; x < split.length; x++){
					var rule = split[x];
					rule = rule.split(/(\d+)/);
					var letter = rule[2];
					var number = parseInt(rule[1], 10);
					if (isNumberBad(number)){
						error += "Unable to parse number in rule " + (x + 1) + " at '" + split[x] + "'. Please make sure this is a valid number.<br/>";
						continue;
					}
					if (rule[0] == "-") number *= -1;
					if (!defs[letter]) {
						error += "Unable to parse rule " + (x + 1) + " at '" + split[x] + "'. Please use a, e, r, s, or b as the only letters in your string.<br/>";
						continue;
					}
					if (number > 50) {
						error += "Rule " + (x + 1) + " is attempting to set a value of " + number + ", but the maximum Relic level is 50. Please use a number less than or equal to 50.<br/>";
						continue;
					}
				}
				if (error != "") {
					var errElem = document.getElementById('ArchaeologyAutomatorError');
					if (!errElem) return;
					errElem.innerHTML = error;
					return;
				}
				var selectElem = document.getElementById("ArchaeologyAutomatorSelect");
				var thresh = (selectElem == null) ? 50 : parseInt(selectElem.value, 10);
				game.global.archString = val;
				game.global.archThresh = thresh;
				cancelTooltip();
			},
			checkAutomator: function(makePurchase){
				if (this.pauseAuto || game.global.archString == "") return "off";
				var costMax = game.resources.science.owned;
				costMax *= (game.global.archThresh / 100);
				var nextCost = this.getNextCost();		
				var defs = this.getDefs();
				var split = game.global.archString.split(',');
				for (var x = 0; x < split.length; x++){
					var rule = split[x];
					rule = rule.split(/(\d+)/);
					var letter = rule[2];
					var number = parseInt(rule[1], 10);
					if (rule[0] == "-") number *= -1;
					var points = this.getPoints(defs[letter]);
					if (points < number) {
						if (nextCost > costMax) return defs[letter] + "RelicCost";
						if (makePurchase) buyUpgrade(defs[letter] + "Relic", undefined, true);
						return defs[letter];
					}
				}
				return "satisfied";
			},
			getTooltip: function(what){
				var cap = what[0].toUpperCase() + what.slice(1);
				var extra = "";
				if (cap == "Breed") {
					cap = "Breed Speed";
				}
				else if (cap == "Science"){
					cap = "Resource Gain"
					extra = " (Food, Wood, Metal, Science, and Gems)";
				}
				var text;
				var statPercent = prettify((this.getStatMult(what) - 1) * 100);
				if (what == "enemyAttack"){
					text = "Decreases all Enemy Attack by " + Math.floor((this.getBaseStatMult(what) -1) * 100) + "%. You currently have " + ((statPercent >= 0) ? "+" : "") + statPercent + "% to Enemy Attack.";
				}
				else{
					text = "Increases all " + cap + extra + " by " + Math.floor((this.getBaseStatMult(what) -1) * 100) + "%. You currently have " + ((statPercent >= 0) ? "+" : "") + statPercent + "% to " + cap + ".";
				}
				text += "<br/><br/><b>Hold Ctrl while clicking any relic upgrade to access the Relic Automator!</b>";
				text += "<br/><br/>You have discovered " + (this.getPoints(what) + game.global.world - 1) + " of these Relics and " + this.purchases + " total Relics. Each Relic has a max of 50 positive levels at a time. Cost increases based on total purchased Relics.";
				return text;
			},
			buyRelic: function(what, noTip){
				var increase = game.upgrades[what].relic;
				this.points[increase]++;
				if (this.points[increase] >= 1) this.overZero = true;
				this.purchases++;
				this.updateButton(increase);
				if (!noTip)
				tooltip(what, "upgrades", "update");
			},
			updateButton: function(what){
				var ownedElem = document.getElementById(what + "RelicOwned");
				if (ownedElem != null)
					ownedElem.innerHTML = this.points[what];
			},
			getBaseStatMult: function(what){
				if (what == "breed") return 1.1;
				return 1.05;
			},
			getStatMult: function(what, forcePoints){
				var points = (typeof forcePoints === 'undefined') ? this.points[what] : forcePoints;
				if (what == "enemyAttack") points *= -1;
				var amt = Math.pow(this.getBaseStatMult(what), points);
				if (what == "radon") amt *= 3;
				return amt;
			},
			getNextCost: function(){
				return (Math.floor(Math.pow(1.1, this.purchases) * 1e6));
			},
			getPoints: function(what){
				return this.points[what];
			},
			start: function(){
				for (var item in this.points){
					unlockUpgrade(item + "Relic");
				}
			},
			onComplete: function(){
				var reward = game.challenges.Archaeology.heldHelium;
				reward *= 5;
				if (this.overZero == false) giveSingleAchieve("Unassisted");
				message("You have completed the Archaeology Challenge! You have gained an extra " + prettify(reward) + " Radon, and your world has been returned to normal.", "Notices");
				addHelium(reward);
				if (game.global.ArchaeologyDone && !game.global.canGuString){
					game.global.canGuString = true;
					message("Now that you've mastered the skill of Archaeology, you've gained the ability to use a more powerful Custom Golden Upgrade automator! See the AutoGold tooltip or Ctrl Click AutoGold for more info.", "Notices");
				}
				if (!game.global.ArchaeologyDone){
					message("You've gained the ability to create Small and Large Research Caches in Maps!", "Notices");
					game.global.ArchaeologyDone = true;
				}
				game.challenges.Archaeology.abandon();
			},
			onNextWorld: function(){
				for (var item in this.points){
					this.points[item]--;
					this.updateButton(item);
				}
			},
			abandon: function(){
				game.global.challengeActive = "";
				for (var item in this.points){
					game.upgrades[item + "Relic"].locked = 1;
				}
				drawAllUpgrades();
			},
		},
		Mayhem: {
			get description(){
				var text = "";
				if (game.global.mayhemCompletions >= this.maxRuns) text += "<b>NOTICE: You have already completed Mayhem " + this.maxRuns + " times, and will no longer gain a bonus for future runs.</b><br/>";
				text += "Travel to a very hectic dimension. The final Cell of each Zone is a Poisonous boss enemy, and all Map enemies are also Poisonous. Poisonous Enemies stack 20% of their damage on your Trimps as poison, which is taken as damage after each attack until your Trimps die. Each Zone starts with " + this.getStartStacks() + " stacks of Mayhem, and each stack increases the damage and health of the final Cell Boss Enemy for that Zone by 10%. Completing a map reduces the Mayhem stacks for that Zone by 1 and an additional 1 for each level of the Map above the Zone's level (For example, a level 15 map will remove 3 stacks per completion when at Z13). Completing <b>Z100</b> with this Challenge active will grant your Trimps a permanent, stacking, additive <b>" + prettify((game.global.mayhemCompletions * 10) + 10) + "%</b> bonus to Radon or Helium, and Trimp Attack and Health in Universes 1 and 2. Each time Mayhem is completed, the reward for next time increases by an additional 10% and Enemies gain 3x damage and health for all future runs of Mayhem. The amount of Mayhem stacks that each Zone starts with is always equal to 1000 minus 5 for each highest Zone cleared above Z100 in this Universe (You have cleared Z" + game.global.highestRadonLevelCleared + " and start each Zone with " + this.getStartStacks() + " stacks)";
				text += " <b>You have completed Mayhem " + game.global.mayhemCompletions + " / " + this.maxRuns + " maximum times. Your Trimps have +" + prettify((this.getTrimpMult() - 1) * 100) + "% Attack, Health, and Helium or Radon, and your next run of Mayhem will spawn Bad Guys with " + prettify(Math.pow(3, game.global.mayhemCompletions)) + "x Attack and Health.</b>";
				return text;
			},
			stacks: 1000,
			poison: 0,
			filter: function(){
				return (getHighestLevelCleared(true) >= 99);
			},
			getEnemyMult: function(){
				return Math.pow(3, game.global.mayhemCompletions);
			},
			getBossMult: function(){
				if (this.stacks <= 0) this.stacks = 0;
				return 1 + (0.1 * this.stacks);
			},
			getTrimpMult: function(){
				var comps = game.global.mayhemCompletions;
				return 1 + (((comps / 2) * (comps + 1)) / 10);
			},
			onNextWorld: function(){
				this.stacks = this.getStartStacks();
				this.drawStacks();
			},
			getStartStacks: function(){
				var start = 1000;
				var lvls = (game.global.highestRadonLevelCleared - 100);
				if (lvls < 0) lvls = 0;
				start -= (lvls * 5);
				if (start < 100) start = 100;
				return start;
			},
			clearedMap: function(level){
				var dif = level - game.global.world + 1;
				if (dif > 0){
					this.stacks -= dif;
					if (this.stacks <= 0) this.stacks = 0;
					this.drawStacks();
				}
				if (this.stacks <= 0) this.stacks = 0;
				if (game.global.lastClearedCell == 98){
					var cell = game.global.gridArray[99];
					if (cell.health < 0) return;
					cell.maxHealth = cell.preMayhemHealth * this.getBossMult();
					if (cell.health > cell.maxHealth)
						cell.health = cell.maxHealth;
				}
			},
			abandon: function(){
				manageStacks(null, null, true, 'mayhemChallengeStacks', null, null, true);
				manageStacks(null, null, true, 'mayhemPoisonStacks', null, null, true);
			},
			drawStacks: function(){
				manageStacks('Mayhem', this.stacks, true, 'mayhemChallengeStacks', 'icomoon icon-bomb', this.stackTooltip(), false);
				if (this.poison > 0){
					manageStacks('Poison', prettify(this.poison), true, 'mayhemPoisonStacks', 'icomoon icon-flask', this.poisonTooltip(), false);
				}
				else {
					manageStacks(null, null, true, 'mayhemPoisonStacks', null, null, true);
				}
			},
			onLoad: function(){
				this.drawStacks();
			},
			poisonTooltip: function(){
				return "Your Trimps are Poisoned! They take <b>" + prettify(this.poison) + "</b> damage after each attack. Poison bypasses Prismatic Shield!";
			},
			stackTooltip: function(){
				var text = "The Final Enemy of this Zone has " + this.stacks + " stacks of Mayhem, granting +" + prettify((this.getBossMult() - 1) * 100) + "% Damage and Health. Complete Maps to lower these stacks.";
				return text;
			},
			onComplete: function(){
				var oldAmt = this.getTrimpMult();
				if (game.global.mayhemCompletions < this.maxRuns) {
					game.global.mayhemCompletions++;
					var newAmt = this.getTrimpMult();
					message("You have completed the Mayhem Challenge! Your Trimps have gained +" + prettify((newAmt - oldAmt) * 100) + "% Helium or Radon and Trimp Attack and Health in Universe 1 and 2, and future runs of this Challenge will be 3x more difficult. You have now completed Mayhem " + game.global.mayhemCompletions + " time" + needAnS(game.global.mayhemCompletions) + ". Your new total Mayhem bonus is +" + prettify((newAmt - 1) * 100) + "%", "Notices");
				}
				else message("You completed Mayhem again, just for fun!", "Notices");
				if (game.global.mayhemCompletions >= 25) giveSingleAchieve("Peace");
				game.global.challengeActive = "";
				game.challenges.Mayhem.abandon();
			},
			completed: false,
			maxRuns: 25,
			blockU1: true,
			allowU2: true,
			allowSquared: false,
			completeAfterZone: 100,
			unlockString: " reach Zone 100",
		},
		Storm: {
			get description(){
				return game.challenges.Storm.getDesc();
			},
			getDesc: function(forC3){
				var text = "Travel to a dimension that storms year-round. Trimps gain Storm stacks after every attack, damaging them for " + prettify(this.alphaLoss * 100) + "% of their max hp per stack. Enemies gain Cloudy stacks after every attack. Every " + this.mutationThresh + " Cloudy particles causes a Stormcloud on that enemy, causing them to gain max hp and damage, and take extra damage from gamma bursts. Cloudy stacks stick around after bad guys die, and each new group of bad guys start with a Cloudy stack for each Stormcloud on the previous enemy. Cloudy stacks cannot accrue and Stormclouds have no effect in maps, but Trimps in maps have -0.05% attack per Cloudy stack on the enemy. Defeating an enemy in a map will remove 1 Cloudy stack.";
				if (!forC3) text += " Completing <b>Z105</b> with this Challenge active will return the Dimension to normal" + ((game.global.stormDone) ? "." : " and reward you with a brand new building to help with the weather!");
				return text;
			},
			completed: false,
			blockU1: true,
			allowU2: true,
			allowSquared: true,
			get squaredDescription(){
				return game.challenges.Storm.getDesc(true);
			},
			completeAfterZone: 105,
			unlockString: " reach Zone 105",
			fireAbandon: true,
			filter: function(){
				return (getHighestLevelCleared(true) >= 104);
			},
			alpha: 0,
			beta: 0,
			mutations: 0,
			alphaLoss: 0.05,
			mutationThresh: 5,
			mutationAttack: 1.05,
			mutationHealth: 1.2,
			mutationGammaMult: 1.4,
			cellStartAttack: -1,
			cellStartHealth: -1,
			totalClouds: 0,
			mutated: false,
			drawStacks: function(){
				manageStacks('Static', this.alpha, true, 'stormAlphaStacks', 'icomoon icon-bolt', this.stackTooltip('alpha'), false);
				if (this.beta > 0){
					manageStacks('Cloudy', this.beta, false, 'stormBetaStacks', 'icomoon icon-cloudy2', this.stackTooltip('beta'), false);
				}
				else {
					manageStacks(null, null, false, 'stormBetaStacks', null, null, true);
				}
				if (this.mutations > 0){
					manageStacks('Stormcloud', this.mutations, false, 'stormMutationStacks', 'icomoon icon-lightning', this.stackTooltip('mutations'), false);
				}
				else {
					manageStacks(null, null, false, 'stormMutationStacks', null, null, true);
				}
			},
			stackTooltip: function(type){
				if (type == 'alpha') return "Your Trimps are taking " + prettify(this.alphaLoss * this.alpha * 100) + "% of their max health as damage after each attack.";
				if (type == 'beta') return "This enemy is amassing clouds! For every " + this.mutationThresh + " Cloudy stacks, this enemy will gain 1 Stormcloud.";
				if (type == 'mutations') return "This enemy is engulfed by the Storm! It has " + prettify((this.getHealthMult() - 1) * 100) + "% extra health, " + prettify((this.getAttackMult() - 1) * 100) + "% extra attack, and takes " + prettify((this.getGammaMult() - 1) * 100) + "% extra damage from Gamma Bursts.";
			},
			enemyAttacked: function(cell){
				this.beta++;
				if (this.beta > this.mutationThresh * 50) this.beta = this.mutationThresh * 50;
				this.checkMutate(cell);
			},
			getAttackMult: function(){
				return (Math.pow(this.mutationAttack, this.mutations));
			},
			getHealthMult: function(){
				return (Math.pow(this.mutationHealth, this.mutations));
			},
			getGammaMult: function(){
				return (Math.pow(this.mutationGammaMult, this.mutations));
			},
			getMapMult: function(){
				return Math.pow(0.9995, this.beta);
			},
			checkMutate: function(cell){
				this.mutations = Math.floor(this.beta / this.mutationThresh);
				if (this.mutations > 0) this.mutated = true;
				if (!cell || cell.health <= 0) return;
				var startHealth = cell.maxHealth;
				cell.maxHealth = this.cellStartHealth * this.getHealthMult();
				var healthChange = cell.maxHealth - startHealth;
				if (healthChange > 0) cell.health += healthChange;
				if (cell.health > cell.maxHealth) cell.health = cell.maxHealth;
				cell.attack = this.cellStartAttack * this.getAttackMult();
				updateAllBattleNumbers();
			},
			enemyDied: function(){
				if (game.global.mapsActive){
					this.beta--;
					if (this.beta < 0) this.beta = 0;
				}
				else{
					this.beta = this.mutations;
					this.cellStartHealth = -1;
					this.cellStartAttack = -1;
				}
				this.checkMutate(getCurrentWorldCell());
				this.drawStacks();
			},
			abandon: function(){
				var cell = getCurrentWorldCell();
				if (!cell) return;
				if (this.cellStartHealth > 0) cell.maxHealth = this.cellStartHealth;
				if (cell.health > cell.maxHealth) cell.health = cell.maxHealth;
				if (this.cellStartAttack > 0) cell.attack = this.cellStartAttack;
				updateAllBattleNumbers();
				manageStacks(null, null, false, 'stormMutationStacks', null, null, true);
				manageStacks(null, null, false, 'stormBetaStacks', null, null, true);
				manageStacks(null, null, true, 'stormAlphaStacks', null, null, true);
			},
			onComplete: function(){
				if (!this.mutated) giveSingleAchieve("Clear Skies");
				message("You have completed the Storm Challenge and unlocked the Antenna building!", "Notices");
				unlockBuilding('Antenna');
				game.global.stormDone = true;
				game.challenges.Storm.abandon();
				game.global.challengeActive = "";
			}
		},
		Insanity: {
			get description(){
				return "Travel to a dimension where instability takes over the mind. Maps above your World level have a chance to spawn a Horrimp in each cell, with the chance based on both actual map level and its level relative to your current World Zone. Horrimps are stronger than regular imps and when killed, give you a stack of Insanity. Maximum stacks is 500. Insanity decreases your health by 1% (compounding) but increases all resources gained (including radon) by 13.133% (additive). Every map (n below map level) ran reduces your current insanity by 2n and your maximum insanity by n. Challenge ends after clearing Z110. Completing this challenge will reward you with an additional 500% of all Radon earned and a feeling of deep satisfaction.";
			},
			completed: false,
			blockU1: true,
			allowU2: true,
			heliumThrough: 110,
			heldHelium: 0,
			completeAfterZone: 110,
			unlockString: " reach Zone 110",
			fireAbandon: true,
			filter: function(){
				return (getHighestLevelCleared(true) >= 109);
			},
			insanity: 0,
			maxInsanity: 500,
			highestLevel: 0,
			drawStacks: function(){
				manageStacks('Insanity', this.insanity, true, 'insanityStacks', 'icomoon icon-grin', this.stackTooltip(), false);
			},
			stackTooltip: function(type){
				var text = toZalgo("YOU ARE GOING CRAZY.", 99, 5);
				var mapObj = getCurrentMapObject();
				if (game.global.mapsActive && mapObj) text += "<br/><br/>You have a " + prettify(this.getHorrimpChance(mapObj.level)) + "% chance per cell to find a Horrimp.";
				if (this.insanity <= 0) return text;
				var showLoot = (this.insanity == 500) ? 66.6666 : this.getLootMult().toFixed(4);
				text += "<br/><br/>Your Trimps have x" + (this.getHealthMult()).toFixed(4) + " health and x" + showLoot + " loot.";
				return text;
			},
			getHealthMult: function(){
				return Math.pow(0.99, this.insanity);
			},
			getLootMult: function(){
				return 1 + (this.insanity * 0.1313332);
			},
			addStack: function(){
				this.insanity++;
				if (game.global.soldierHealth > 0){
					game.global.soldierHealthMax *= 0.99;
					if (game.global.soldierHealth > game.global.soldierHealthMax) game.global.soldierHealth = game.global.soldierHealthMax;
				}
				if (this.insanity > this.maxInsanity) this.insanity = this.maxInsanity;
				this.drawStacks();
			},
			completeMap: function(level){
				var oldInsanity = this.insanity;
				level = game.global.world - level;
				if (level <= 0) return;
				this.insanity -= (level * 2);
				this.maxInsanity -= level;
				if (this.maxInsanity < 1) this.maxInsanity = 1;
				if (this.insanity <= 0) this.insanity = 0;
				var dif = oldInsanity - this.insanity;
				if (game.global.soldierHealth > 0 && dif > 0){
					game.global.soldierHealthMax /= Math.pow(0.99, dif);
				}
				this.drawStacks();
			},
			getHorrimpChance: function(level){
				if (level > this.highestLevel) this.highestLevel = level;
				level = level - game.global.world;
				if (level <= 0) return 0;
				var world = game.global.world;
				if (world > 100) world = 100;
				return (level * 9 * (world / 100));
			},
			abandon: function(){
				this.insanity = 0;
				manageStacks(null, null, true, 'insanityStacks', null, null, true);
			},
			onLoad: function(){
				this.drawStacks();
			},
			onComplete: function(){
				if (this.highestLevel <= 50 && this.insanity == 500) giveSingleAchieve("Actually Insane");
				var reward = game.challenges.Insanity.heldHelium;
				reward *= 5;
				message("You have completed the Insanity challenge! You have gained an extra " + prettify(reward) + " Radon, and your world has been returned to normal.", "Notices");
				addHelium(reward);
				game.challenges.Insanity.abandon();
				game.global.challengeActive = "";
			},
			start: function(){
				this.drawStacks();
			}
		},
		Berserk: {
			get description(){
				return "Travel to a dimension filled with lots of mild annoyances, sure to drive your Trimps berserk. All enemies in this dimension have 50% more attack and health. Every time your Trimps attack they have a 5% chance to become Frenzied, causing all kills to heal for 1% of max health, and also stack +50% attack and -2% max health, up to 25 times. If a frenzied group dies or is abandoned, your Trimps gain a permanent Weakened stack, reducing health by 4.99% per stack when outside of frenzy. If weakened stacks reach 20, Trimps can no longer become frenzied. Due to this dimension's annoying nature, the Angelic Mastery does not work. Completing Z115 will unlock a new perk!";
			},
			completed: false,
			blockU1: true,
			allowU2: true,
			allowSquared: true,
			squaredDescription: "Travel to a dimension filled with lots of mild annoyances, sure to drive your Trimps berserk. All enemies in this dimension have 50% more attack and health. Every time your Trimps attack they have a 5% chance to become Frenzied, causing all kills to heal for 1% of max health, and also stack +50% attack and -2% max health, up to 25 times. If a frenzied group dies or is abandoned, your Trimps gain a permanent Weakened stack, reducing health by 4.99% per stack when outside of frenzy. If weakened stacks reach 20, Trimps can no longer become frenzied. Due to this dimension's annoying nature, the Angelic Mastery and Frenzy Perk do not work.",
			completeAfterZone: 115,
			unlockString: " reach Zone 115",
			fireAbandon: true,
			filter: function(){
				return (getHighestLevelCleared(true) >= 114);
			},
			weakened: 0,
			frenzyStacks: 0,
			startHealth: 0,
			fullWeakAt: -1,
			unlocks: "Frenzy",
			drawStacks: function(){
				var weakenedIcon = (this.weakened < 7) ? "icon-battery2" : (this.weakened < 14) ? "icon-battery3" : (this.weakened < 19) ? "icon-battery4" : "icon-battery5";
				manageStacks('Weakened', this.weakened, true, 'weakenedStacks', 'icomoon ' + weakenedIcon, this.stackTooltip('weakened'), false);
				var frenzyIcon = (this.frenzyStacks < 1) ? "icon-star-empty" : (this.frenzyStacks < 25) ? "icon-star-half" : "icon-star-full";
				manageStacks('Frenzied', this.frenzyStacks, true, 'frenzyStacks', 'icomoon ' + frenzyIcon, this.stackTooltip('frenzy'), false);
			},
			stackTooltip: function(type){
				if (type == 'frenzy') {
					if (this.frenzyStacks <= 0) return "Your Trimps are currently chillin, but they have a 5% chance per attack to enter a frenzy!";
					return "Your Trimps are in a wild frenzy! They currently have -" + prettify((1 - this.getHealthMult()) * 100) + "% max health, +" + prettify((this.getAttackMult() - 1) * 100) + "% attack, and heal for 1% of their maximum health after killing an enemy.";
				}
				if (this.weakened == 0) return "Your Trimps currently are not weakened! Keep it up, save your Frenzied Trimps!";
				if (this.weakened < 20) return "When not frenzied, your Trimps have -" + prettify((1 - this.getHealthMult(true)) * 100) + "% health.<br/><br/><b>Be careful! At 20 stacks, your Trimps will no longer be able to become frenzied.</b>";
				return "Your Trimps have -" + prettify((1 - this.getHealthMult(true)) * 100) + "% health and can no longer become frenzied.";
			},
			getHealthMult: function(getWeak){
				if (this.frenzyStacks == 0 || getWeak)	return 1 - (this.weakened * .0499);
				return 1 - (this.frenzyStacks * 0.02);
			},
			getAttackMult: function(){
				return 1 + (0.5 * this.frenzyStacks);
			},
			enemyDied: function(){
				if (this.frenzyStacks <= 0) return;
				var oldBonus = this.getHealthMult();
				this.frenzyStacks++;
				if (this.frenzyStacks > 25) this.frenzyStacks = 25;
				if (game.global.soldierHealth > 0){
					game.global.soldierHealth += (game.global.soldierHealthMax * 0.01);
					this.updateHealth(oldBonus);
				}
				this.drawStacks();
			},
			trimpDied: function(){
				if (this.frenzyStacks <= 0) return;
				this.weakened++;
				if (this.weakened == 20) this.fullWeakAt = game.global.world;
				if (this.weakened > 20) this.weakened = 20;
				this.frenzyStacks = 0;
				this.drawStacks();
			},
			attacked: function(){
				if (this.frenzyStacks > 0) return;
				if (this.weakened >= 20) return;
				var oldBonus = this.getHealthMult();
				if (Math.floor(Math.random() * 100) < 5) this.frenzyStacks = 1
				else return;
				this.updateHealth(oldBonus);
				this.drawStacks();
			},
			updateHealth: function(oldBonus){
				if (game.global.soldierHealth <= 0) return;
				var newBonus = this.getHealthMult();
				game.global.soldierHealthMax *= (newBonus / oldBonus);
				if (game.global.soldierHealth > game.global.soldierHealthMax) game.global.soldierHealth = game.global.soldierHealthMax;
				updateAllBattleNumbers();
			},
			abandon: function(){
				if (game.global.soldierHealth > 0) {
					game.global.soldierHealthMax /= this.getHealthMult();
					if (game.global.soldierHealth > game.global.soldierHealthMax) game.global.soldierHealth = game.global.soldierHealthMax;
				}
				this.frenzyStacks = 0;
				this.weakened = 0;
				manageStacks(null, null, true, 'frenzyStacks', null, null, true);
				manageStacks(null, null, true, 'weakenedStacks', null, null, true);
			},
			onLoad: function(){
				this.drawStacks();
			},
			onComplete: function(){
				if (this.weakened == 20 && this.fullWeakAt < 100) giveSingleAchieve("You're Doing it Wrong");
				unlockPerk("Frenzy");
				message("You have completed the Berserk challenge! You have unlocked the Frenzy Perk and your world has been returned to normal.", "Notices");
				game.challenges.Berserk.abandon();
				game.global.challengeActive = "";
			},
			start: function(){
				this.drawStacks();
			}
		},
		Exterminate: {
			get description(){
				return "Travel to a dimension filled with nasty bugs. All non-special World enemies are high attack, low health, fast bug enemies. Whenever a group of Trimps kills a bug enemy, that group of Trimps will become Experienced until death, allowing them to attack first against fast enemies. However, wasting time in Maps allows the swarm to grow, granting +50% permanent additive attack and health to all World enemies per map started in this Universe. Completing Z120 with this Challenge active will unlock a special new Building!";
			},
			completed: false,
			blockU1: true,
			allowU2: true,
			completeAfterZone: 120,
			unlockString: " reach Zone 120",
			fireAbandon: true,
			filter: function(){
				return (getHighestLevelCleared(true) >= 119);
			},
			swarmStacks: 0,
			experienced: false,
			achieveDone: false,
			drawStacks: function(){
				if (this.experienced) manageStacks('Experienced', -1, true, 'experiencedStacks', 'icomoon icon-graduate', this.stackTooltip('experienced'), false);
				else manageStacks(null, null, true, 'experiencedStacks', null, null, true);
				if (this.swarmStacks > 0) manageStacks('The Swarm Grows', this.swarmStacks, false, 'swarmStacks', 'icomoon icon-bug', this.stackTooltip('swarm'), false);
				else manageStacks(null, null, true, 'swarmStacks', null, null, true);
			},
			stackTooltip: function(type){
				if (type == "experienced") return "This group of Trimps has killed a bug and knows their weakness, allowing them to attack first.";
				return "All World enemies in this dimension" + ((!game.global.mapsActive) ? " have grown while you were " : " are growing while you are ") + "in maps, granting +" + prettify((this.getSwarmMult() - 1) * 100) + "% attack and health.";
			},
			abandon: function(){
				this.swarmStacks = 0;
				this.experienced = false;
				manageStacks(null, null, true, 'experiencedStacks', null, null, true);
				manageStacks(null, null, false, 'swarmStacks', null, null, true);
			},
			onLoad: function(){
				this.drawStacks();
			},
			killedBug: function(){
				if (game.global.challengeActive != "Exterminate") return;
				this.experienced = true;
				this.drawStacks();
			},
			trimpDied: function(){
				this.experienced = false;
				this.drawStacks();
			},
			startedMap: function(){
				this.swarmStacks++;
				this.drawStacks();
			},
			getSwarmMult: function(){
				return 1 + (0.5 * this.swarmStacks);
			},
			onComplete: function(){
				if (this.achieveDone) giveSingleAchieve("The Tortoise and the Bugs");
				game.global.exterminateDone = true;
				unlockBuilding("Hub");
				message("You have completed the Exterminate Challenge! You have unlocked the Hub, a revolutionary new way to store your extra Trimps!", "Notices");
				game.challenges.Exterminate.abandon();
				game.global.challengeActive = "";
			}
		},
		Nurture: {
			get description(){
				return "Travel to a dimension filled with gigantic monsters. All enemies have 2x attack, World enemies have 2x health and map enemies have 10x health. Luckily, Scruffy has a brother in this dimension who will help you out if you level him up! You'll gain access to the special Laboratory building while on this challenge, which will give bonus Exp to Scruffy's brother, Cruffys. Check the Scruffy and Laboratory tooltips while on this Challenge for more info. Clearing <b>Z135</b> with this Challenge active will grant an additional 400% of all Radon earned up until that point, and will (mostly) return the world to normal." + ((game.portal.Observation.radLocked) ? " <b>Complete this Challenge with Cruffys at Level 10 or higher to earn a new Perk!</b>" : "");
			},
			completed: false,
			blockU1: true,
			allowU2: true,
			heliumThrough: 135,
			heldHelium: 0,
			completeAfterZone: 135,
			unlockString: " reach Zone 130.",
			fireAbandon: true,
			rewardsList: ["cruf1", "cruf2", "cruf3", "cruf4", "cruf5", "cruf6", "cruf7", "cruf8", "cruf9", "cruf10"],
			totalXp: 0,
			firstLevelXp: 300000,
			growth: 2.5,
			level: 0,
			cruffysUntil: false,
			achieveDone: false,
			getLevel: function(){
				return this.level;
			},
			getRadonMult: function(){
				var level = this.getLevel();
				var mult = 1;
				if (level >= 1) mult *= 1.5;
				if (level >= 2) mult *= 2;
				if (level >= 3) mult *= 2.5;
				if (level >= 4) mult *= 3;
				if (level >= 6) mult *= 1.75;
				if (level >= 7) mult *= 2;
				if (level >= 8) mult *= 1.1;
				if (level >= 9) mult *= 1.1;
				if (level >= 10) mult *= Math.pow(1.04, (level - 9));
				return mult;
			},
			getResourceBoost: function(){
				var level = this.getLevel();
				var mult = 1;
				if (level >= 3) mult += 0.15;
				if (level >= 7) mult += 0.25;
				if (level >= 9) mult += 0.2;
				if (level >= 10) mult += (0.1 * (level - 9));
				return mult;
			},
			getStatBoost: function(){
				var level = this.getLevel();
				var mult = 1;
				if (level >= 2) mult += 0.05;
				if (level >= 6) mult += 0.1;
				if (level >= 9) mult += 0.2;
				if (level >= 10) mult += (0.1 * (level - 9));
				return mult;
			},
			countBonusZones: function(){
				var level = this.getLevel();
				var bonus = 0;
				if (level >= 8) bonus += 5;
				if (level >= 9) bonus += 5;
				if (level >= 10) bonus += Math.floor((level - 9) / 2);
				if (bonus > 15) bonus = 15;
				return bonus;
			},
			boostsActive: function(){
				if (game.global.universe != 2) return false;
				if (game.global.challengeActive == "Nurture" || (this.cruffysUntil && game.global.world <= this.cruffysUntil)) return true;
				return false;
			},
			getExp: function(){
				var exp = this.getNextExp();
				return [this.getLevel(), exp[0], exp[1]]
			},
			getNextExp: function(){
				var level = this.getLevel();
				var experience = this.totalXp;
				var removeExp = 0;
				if (level > 0){
					removeExp = Math.floor(this.firstLevelXp * ((Math.pow(this.growth, level) - 1) / (this.growth - 1)));
				}
				var totalNeeded = Math.floor(this.firstLevelXp * ((Math.pow(this.growth, level + 1) - 1) / (this.growth - 1)));
				totalNeeded -= removeExp;
				experience -= removeExp;
				return [experience, totalNeeded];
			},
			gaveExp: function(reward){
				if (this.level >= 19) return;
				this.totalXp += reward * game.buildings.Laboratory.getExpMult();
				this.calculateLevel();
				if (this.level >= 19 && game.global.world <= 69) this.achieveDone = true;
			},
			calculateLevel: function(){
				this.level = Math.floor(log10(((this.totalXp / this.firstLevelXp) * (this.growth - 1)) + 1) / log10(this.growth));
				if (this.level > 19) this.level = 19;
			},
			filter: function(){
				return (getHighestLevelCleared(true) >= 129);
			},
			abandon: function(){
				var world = Math.min(135, game.global.world);
				this.cruffysUntil = world + this.countBonusZones();
				game.buildings.Laboratory.locked = 1;
				drawAllBuildings();
			},
			onLoad: function(){
				Fluffy.cruffysToggled = true;
				this.calculateLevel();
				Fluffy.updateExp();
			},
			onComplete: function(){
				var reward = game.challenges.Nurture.heldHelium;
				reward *= 4;
				message("You have completed the Nurture challenge! You have gained an extra " + prettify(reward) + " Radon, and your world has been returned to normal.", "Notices");
				addHelium(reward);
				game.challenges.Nurture.abandon();
				game.global.challengeActive = "";
				if (game.portal.Observation.radLocked && this.getLevel() >= 10) {
					unlockPerk("Observation");
					if (game.portal.Observation.trinkets == 0) game.portal.Observation.trinkets = 10;
					message("You have also unlocked the Observation Perk!", "Notices");
				}
				if (this.achieveDone) giveSingleAchieve("Nurtured AF");
			},
			start: function(){
				unlockBuilding("Laboratory");
				Fluffy.cruffysToggled = true;
				Fluffy.updateExp();
			}
		},
		Pandemonium: {
			get description(){
				var text = "";
				if (game.global.pandCompletions >= this.maxRuns) text += "<b>NOTICE: You have already completed Pandemonium " + this.maxRuns + " times, and will no longer gain a bonus for future runs.</b><br/>";
				text += "Travel to a chaotically windy dimension. Map enemies at or below World level will obliterate 75% of your Metal, Wood and Food after each enemy killed. For each map level above world level, 5% (additively) fewer resources will be destroyed, with +10 map enemies destroying only 25%. You start the Challenge with 100 stacks of Order. Each Zone, 10% of your current Order stacks will be converted into Pandemonium stacks on the Enemy. Each Pandemonium stack increases Enemy's attack and health by 100% per stack, and has 10x effect on the final boss of each Zone. The final boss is a Windy enemy who will blow away 1% of your Food, Wood and Metal per stack of Pandemonium per attack. Completing a map grants you 1 Order stack for each level above your World Zone (Max 100), and reduces enemy Pandemonium by the same amount. Completing <b>Z150</b> with this Challenge active will grant your Trimps a permanent, stacking, additive <b>" + prettify((game.global.pandCompletions * 10) + 10) + "%</b> bonus to Helium or Radon, Trimp Attack, Trimp Health, and Resources Gathered in Universe 1 and 2. Each time Pandemonium is completed, the reward for next time increases by an additional 10%, Enemies gain 5x damage and health, and Equipment is 5x more expensive for all future runs of Pandemonium. Starting on your fourth run, the Wind will be too strong for Trimps to hold a Shield. Another piece of equipment will be disabled every 2 completions after Shield is lost.";
				var scaleMult = this.getEnemyMult();
				text += " <b>You have completed Pandemonium " + game.global.pandCompletions + " / " + this.maxRuns + " maximum times. Your Trimps have +" + prettify((this.getTrimpMult() - 1) * 100) + "% Attack, Health, Radon or Helium, and gathered resources in U1 and U2, and your next run of Pandemonium will spawn Bad Guys with " + prettify(scaleMult) + "x Attack and Health";
				var disabledCount = this.disabledEquipCount();
				if (disabledCount == 0) text += " and all Equipment will be " + prettify(scaleMult) + "x more expensive.</b>";
				else text += ", all Equipment will be " + prettify(scaleMult) + "x more expensive, and the first " + disabledCount + " Equipment" + needAnS(disabledCount) + " will be disabled.</b>";
				return text;
			},
			pandemonium: 0,
			order: 100,
			blockedEquips: [],
			fireAbandon: true,
			isEquipBlocked: function(which){
				var equips = ["Shield", "Dagger", "Boots", "Mace", "Helmet", "Polearm", "Pants", "Battleaxe", "Shoulderguards", "Greatsword", "Breastplate"];
				var index = equips.indexOf(which);
				if (index == -1) return false;
				var blocked = this.disabledEquipCount();
				if (index >= blocked) return false;
				return true;
			},
			unlockEquips: function(){
				var equips = ["Shield", "Dagger", "Boots", "Mace", "Helmet", "Polearm", "Pants", "Battleaxe", "Shoulderguards", "Greatsword", "Breastplate"];
				var blocked = this.disabledEquipCount();
				for (var x = 0; x < blocked; x++){
					var equipName = equips[x];
					var worldUnlock = game.worldUnlocks[equipName];
					if (worldUnlock.world > game.global.world) continue;
					unlockEquipment(equipName);
				}
			},
			filter: function(){
				return (getHighestLevelCleared(true) >= 149);
			},
			getEnemyMult: function(){
				return Math.pow(5, game.global.pandCompletions);
			},
			getBossMult: function(){
				return (1 + (this.pandemonium * 10)) * this.getEnemyMult();
			},
			getTrimpMult: function(){
				var comps = game.global.pandCompletions;
				return 1 + (((comps / 2) * (comps + 1)) / 10);
			},
			getPandMult: function(){
				return (1 + this.pandemonium) * this.getEnemyMult();
			},
			bossShredMult: function(){
				var amt = (0.01 * this.pandemonium);
				if (amt > 1) amt = 1;
				return amt;
			},
			mapShredMult: function(mapLevel){
				var dif = mapLevel - game.global.world;
				return (0.75 - (dif * 0.05));
			},
			onNextWorld: function(){
				if (this.order == 0){
					this.drawStacks();
					return;
				}
				var remove = Math.ceil(this.order * 0.1);
				this.order -= remove;
				this.pandemonium += remove;
				this.drawStacks();
			},
			onBossAttack: function(){
				this.shredResources(this.bossShredMult());
				this.drawStacks();
			},
			onMapEnemyKilled: function(level){
				this.shredResources(this.mapShredMult(level));
			},
			shredResources: function(mult){
				buyAutoEquip();
				autoUpgrades();
				buyAutoStructures();
				if (mult > 1) mult = 1;
				var toRemove = ["food", "wood", "metal"];
				for (var x = 0; x < toRemove.length; x++){
					var name = toRemove[x];
					var removeAmt = game.resources[name].owned * mult;
					game.resources[name].owned -= removeAmt;
					if (game.resources[name].owned < 0) game.resources[name].owned = 0;
					addAvg(name, (removeAmt * -1));
				}
			},
			clearedMap: function(level){
				var dif = level - game.global.world;
				if (this.order + dif > 100) dif = 100 - this.order;
				if (dif > 0){
					this.order += dif;
					this.pandemonium -= dif;
					if (this.pandemonium < 0 || this.order > 100){
						this.pandemonium = 0;
						this.order = 100;
					}
				}
				this.drawStacks();
				var cell = game.global.gridArray[game.global.lastClearedCell + 1];
				if (cell.health < 0) return;
				if (cell.preMayhemHealth){
					if (game.global.lastClearedCell == 98) cell.maxHealth = cell.preMayhemHealth * this.getBossMult();
					else cell.maxHealth = cell.preMayhemHealth * this.getPandMult();
				}
				if (cell.maxHealth != -1 && cell.health > cell.maxHealth)
					cell.health = cell.maxHealth;
			},
			abandon: function(){
				manageStacks(null, null, true, 'pandOrderStacks', null, null, true);
				manageStacks(null, null, false, 'pandPandStacks', null, null, true);
				this.unlockEquips();
			},
			drawStacks: function(){
				manageStacks('Order', this.order, true, 'pandOrderStacks', 'icomoon icon-yingyang', this.orderTooltip(), false);
				if (this.pandemonium > 0){
					manageStacks('Pandemonium', this.pandemonium, false, 'pandPandStacks', 'icomoon icon-network', this.pandTooltip(), false);
				}
				else {
					manageStacks(null, null, false, 'pandPandStacks', null, null, true);
				}
			},
			onLoad: function(){
				this.drawStacks();
			},
			disabledEquipCount: function(){
				var count = game.global.pandCompletions - 2;
				if (count <= 0) return 0;
				return Math.min(11, Math.ceil(count / 2));
			},
			start: function(){
				this.drawStacks();
			},
			pandTooltip: function(){
				if (!game.global.mapsActive && game.global.lastClearedCell == 98) return "This Boss Enemy will shred " + prettify(this.bossShredMult() * 100) + "% of your resources with each Attack, and has " + prettify(1000 * this.pandemonium) + "% increased Attack and Health. Completing maps will remove some of these stacks.";
				return "This Enemy has " + prettify(100 * this.pandemonium) + "% more Attack and Health. Completing maps will remove some of these stacks.";
			},
			orderTooltip: function(){
				if (this.order == 0) return "There is no Order. Your Trimps are in full blown panic and one of them seems to have stolen your shoe.";
				return "10% of these stacks will convert into Pandemonium stacks when this Zone is completed. Increases the orderliness of your Trimps by " + prettify(Math.pow(1.1111111, this.order)) + "%.";
			},
			onComplete: function(){
				game.challenges.Pandemonium.abandon();
				var oldAmt = this.getTrimpMult();
				if (game.global.pandCompletions < this.maxRuns) {
					game.global.pandCompletions++;
					var newAmt = this.getTrimpMult();
					message("You have completed the Pandemonium Challenge! Your Trimps have gained +" + prettify((newAmt - oldAmt) * 100) + "% Radon or Helium, Damage, Health and Gathered Resources in Universe 1 and 2, and future runs of this Challenge will be 5x more difficult. You have now completed Pandemonium " + game.global.pandCompletions + " time" + needAnS(game.global.pandCompletions) + ". Your new total Pandemonium bonus is +" + prettify((newAmt - 1) * 100) + "%", "Notices");
				}
				else message("You completed Pandemonium again, just for fun!", "Notices");
				game.global.challengeActive = "";
				
			},
			completed: false,
			maxRuns: 25,
			blockU1: true,
			allowU2: true,
			allowSquared: false,
			completeAfterZone: 150,
			unlockString: " reach Zone 150",
		},
		Alchemy: {
			get description(){
				// + ((!game.global.alchemyUnlocked) ? " <b>Complete a Z155 Void Map with 15 or more Gaseous Brews and no Potions of the Void while on this Challenge to unlock the permanent skill of Alchemy.</b>" : "")
				return "Travel to a dimension where maps are filled with useful herbs. Collect different herbs from different types of maps, and use Alchemy to create powerful potions to strengthen your Trimps. Clearing <b>Z155</b> with this Challenge active will grant an additional 400% of all Radon earned up until that point, and will return the world to normal. You can repeat this challenge!" + ((!game.global.farmlandsUnlocked) ? " <b>Complete this Challenge once to unlock the ability to create a brand new type of map that should greatly aid your Alchemy.</b>" : "");
			},
			completed: false,
			blockU1: true,
			allowU2: true,
			heliumThrough: 155,
			heldHelium: 0,
			completeAfterZone: 155,
			unlockString: " reach Zone 155.",
			fireAbandon: true,
			filter: function(){
				return (getHighestLevelCleared(true) >= 154);
			},
			abandon: function(){
				if (!game.global.alchemyUnlocked) alchObj.tab.style.display = 'none';
				cancelTooltip();
			},
			onLoad: function(){

			},
			onComplete: function(){
				var reward = game.challenges.Alchemy.heldHelium;
				reward *= 4;
				message("You have completed the Alchemy challenge! You have gained an extra " + prettify(reward) + " Radon, and your world has been returned to normal.", "Notices");
				if (!game.global.farmlandsUnlocked){
					game.global.farmlandsUnlocked = true;
					message("You have unlocked the ability to create Farmlands Maps! Farmlands Maps have +100% Loot in Universe 2 and rotate between the other map types based on the zone at which they're run. See the Map Creation biome selection tooltip for more info!", "Notices");
				}
				addHelium(reward);
				game.challenges.Alchemy.abandon();
				game.global.challengeActive = "";
			},
			start: function(){
				alchObj.tab.style.display = 'table-cell';
			}
		},
		Hypothermia: {
			description: "Travel to a dimension where heat is hard to come by. Every time you start a new Zone with enough Wood your Trimps will automatically construct a Bonfire, which will generate 1 Ember Stack per Zone per active Bonfire. Ember stacks increase Radon earned by +300% (additive) and Enemy Stats by 3% (compounding). Ember stacks reduce gathered and looted Wood by 5% (compounding) in the World, and reduce wood in Maps only when a Bonfire is currently burning. Bonfires burn for 5 Zones each before they burn out, but only 1 will burn out every 5 Zones. The amount of Wood required to build a Bonfire increases every time one is built. In addition, the air is so cold that the door to your ship has frozen shut, and Perks cannot be modified while this Challenge is active. Completing <b>Frozen Castle</b> with this Challenge active will grant you an additional 400% of all Radon earned up to that point and return the world to normal. Completing Z200 without clearing Frozen Castle will fail the Challenge. The first time you complete this Challenge unlocks a new Perk!",
			completed: false,
			blockU1: true,
			allowU2: true,
			failAfterZone: 200,
			heliumThrough: 200,
			heldHelium: 0,
			unlockString: " reach Zone 175.",
			fireAbandon: true,
			bonfires: 0,
			totalBonfires: 0,
			lastBurn: 0,
			embers: 0,
			filter: function(){
				return (getHighestLevelCleared(true) >= 174);
			},
			start: function(){
				this.drawStacks();
			},
			onLoad: function(){
				this.drawStacks();
			},
			getEnemyMult: function(){
				return Math.pow(1.03, this.embers);
			},
			abandon: function(){
				manageStacks(null, null, true, 'hypoBonfireStacks', null, null, true);
				manageStacks(null, null, true, 'hypoEmberStacks', null, null, true);
			},
			onFail: function(){
				message("You completed Z200 without completing Frozen Castle, and have failed Hypothermia! Your world has been returned to normal.", "Notices");
				game.challenges.Hypothermia.abandon();
				game.global.challengeActive = "";
			},
			onComplete: function(){
				var reward = game.challenges.Hypothermia.heldHelium;
				reward *= 4;
				if (game.portal.Masterfulness.radLocked){
					message("You have completed your first Hypothermia challenge! You have gained an extra " + prettify(reward) + " Radon, unlocked the Masterfulness Perk, and your world has been returned to normal!", "Notices");
					game.portal.Masterfulness.radLocked = false;
				}
				else message("You have completed the Hypothermia challenge! You have gained an extra " + prettify(reward) + " Radon, and your world has been returned to normal.", "Notices");
				addHelium(reward);
				game.challenges.Hypothermia.abandon();
				game.global.challengeActive = "";
				if (this.embers >= 400) giveSingleAchieve("Burn Baby Burn");
				
			},
			drawStacks: function(){
				manageStacks('Bonfires', this.bonfires, true, 'hypoBonfireStacks', 'icomoon icon-fire', this.bonfireTooltip(), false);
				manageStacks('Embers', this.embers, true, 'hypoEmberStacks', 'icomoon icon-fire2', this.emberTooltip(), false);
			},
			getBonfireLength: function(){
				return 5;
			},
			bonfireTooltip: function(){
				if (this.bonfires == 0) return "You have no Bonfires. Your Trimps are sad and cold. Next Bonfire will be constructed at " + prettify(this.bonfirePrice()) + " Wood.";
				var bonfireLength = this.getBonfireLength();
				return "You have " + this.bonfires + " Bonfire" + needAnS(this.bonfires) + ". Your Trimps will automatically construct another Bonfire once you start a Zone with " + prettify(this.bonfirePrice()) + " total Wood. Your next bonfire will expire at the start of Zone " + (this.lastBurn + bonfireLength) + ".";
			},
			emberTooltip: function(){
				return "You have " + this.embers + " Ember" + needAnS(this.embers) + ", increasing your Radon gain by " + prettify((this.getRadonMult() - 1) * 100) + "% and Enemy stats by " + prettify((this.getEnemyMult() - 1) * 100) + "%. All wood gathered and looted from the World is reduced by " + prettifyTiny(this.getWoodMult(true)) + ", wood from Maps is reduced by the same amount but only when a Bonfire is burning.";
			},
			getRadonMult: function(){
				return 1 + (3 * this.embers);
			},
			getWoodMult: function(checkBurning){
				if (!checkBurning && game.global.mapsActive && this.bonfires == 0) return 1;
				return Math.pow(0.95, this.embers);
			},
			onNextWorld: function(){
				//expire bonfires
				if (this.bonfires > 0){
					this.embers += this.bonfires;
					var burnFreq = this.getBonfireLength();
					if (this.lastBurn + burnFreq <= game.global.world){
						this.bonfires--;
						this.lastBurn = game.global.world;
					}
				}
				//buy new
				var price = this.bonfirePrice();
				if (game.resources.wood.owned >= price){
					this.addBonfire();
					game.resources.wood.owned -= price;
				}
				this.drawStacks();
			},
			bonfirePrice: function(){
				return Math.pow(100, this.totalBonfires) * 1e10;
			},
			addBonfire: function(){
				if (this.bonfires == 0) this.lastBurn = game.global.world;
				this.bonfires++;
				this.totalBonfires++;
				this.drawStacks();
			}
		},
		Glass: {
			get description() {
				return "Travel to a dimension with fragile but dangerous Enemies. All Bad Guys are Fast and have x100 Attack. Hitting a Bad Guy without killing it creates a stack of Glass. Each Glass stack increases the base Enemy Attack multiplier by +1x. Every 100 Glass, Enemy Attack doubles. Every 1000 Glass, Enemy Health doubles. Every " + prettify(10000) + " Glass, Enemies gain a Crystallized stack and Glass stacks reset to 0. Each Crystallized stack reduces Enemy Health by 20% (compounding) but also gives them a 10% chance to reflect an attack, and reaching 10 Crystallized stacks fails this Challenge. Killing an Enemy at or above World level removes two stacks of Glass plus one for every Crystallized stack on the Enemy, but Crystallized can never be removed. Completing <b>Z175</b> with this Challenge active will permanently cause all Radon earned to be increased by 10% (compounding) per Zone above Z175.";
			},
			get squaredDescription() {
				return "Travel to a dimension with fragile but dangerous Enemies. All Bad Guys are Fast and have x100 Attack. Hitting a Bad Guy without killing it creates a stack of Glass. Each Glass stack increases the base Enemy Attack multiplier by +1x. Every 100 Glass, Enemy Attack doubles. Every 1000 Glass, Enemy Health doubles. Every " + prettify(10000) + " Glass, Enemies gain a Crystallized stack and Glass stacks reset to 0. Each Crystallized stack reduces Enemy Health by 20% (compounding) but also gives them a 10% chance to reflect an attack, and reaching 10 Crystallized stacks fails this Challenge. Killing an Enemy at or above World level removes two stacks of Glass plus one for every Crystallized stack on the Enemy, but Crystallized can never be removed.";
			},
			filter: function () {
				return (getHighestLevelCleared(true) >= 174);
			},
			shards: 0,
			crystals: 0,
			blockU1: true,
			allowU2: true,
			allowSquared: true,
			fireAbandon: true,
			allowMesmer: true,
			unlockString: "reach Zone 175",
			cellStartHealth: 0,
			completeAfterZone: 175,
			highestGlass: 0,
			onEnemyKilled: function(){
				if (this.shards <= 0) return;
				if (game.global.mapsActive && getCurrentMapObject().level < game.global.world) return;
				this.shards -= (2 + this.crystals);
				if (this.shards < 0) this.shards = 0;
				this.drawStacks();
			},
			notOneShot: function(){		
				this.shards++;
				if (this.shards >= 10000){
					this.shards = 0;
					this.crystals++;
					this.updateCellHealth();
					if (this.crystals == 10){
						abandonChallenge();
						message("You hit 10 Crystallized stacks and have failed the Glass Challenge! Your World has been returned to normal.", "Notices");
						return;
					}
				}
				if (this.shards > this.highestGlass) this.highestGlass = this.shards;
				if (this.shards % 1000 == 0) this.updateCellHealth();
				this.drawStacks();
			},
			abandon: function(){
				this.shards = 0;
				this.crystals = 0;
				this.updateCellHealth();
				manageStacks(null, null, false, 'glassShardStacks', null, null, true);
				manageStacks(null, null, false, 'glassCrystalStacks', null, null, true);
			},
			checkReflect: function(cell, trimpAttack){
				if (this.crystals <= 0) return;
				var reflectChance = (this.reflectChance() * 10) - 1;
				var roll = Math.floor(Math.random() * 10);
				if (roll <= reflectChance){
					reduceSoldierHealth(Math.min(cell.maxHealth, trimpAttack));
				}
			},
			onComplete: function(){
				message("You have completed the Glass Challenge! Your World has been returned to normal, and from now on every Zone above Z175 will grant an extra 10% compounding Radon per Zone!", "Notices");
				game.global.challengeActive = "";
				this.abandon();
				game.global.glassDone = true;
				if (this.highestGlass < 3) giveSingleAchieve("Unbreakable");
			},
			onLoad: function(){
				this.drawStacks();
			},
			start: function(){
				this.drawStacks();
			},
			updateCellHealth: function(){
				var cell = (game.global.mapsActive) ? game.global.mapGridArray[game.global.lastClearedMapCell + 1] : game.global.gridArray[game.global.lastClearedCell + 1];
				if (!cell || cell.health <= 0) return;
				var startHealth = cell.maxHealth;
				cell.maxHealth = this.cellStartHealth * this.healthMult();
				var healthChange = cell.maxHealth - startHealth;
				if (healthChange > 0) cell.health += healthChange;
				if (cell.health > cell.maxHealth) cell.health = cell.maxHealth;
			},
			drawStacks: function(){
				manageStacks('Glass', this.shards, false, 'glassShardStacks', 'icomoon icon-tint', this.shardTooltip(), false, true);
				manageStacks('Crystallized', this.crystals, false, 'glassCrystalStacks', 'icomoon icon-glass3', this.crystalTooltip(), false);
			},
			attackMult: function(){
				return Math.pow(2, Math.floor(this.shards / 100)) * (100 + this.shards);
			},
			shardHealthMult: function(){
				return Math.pow(2, Math.floor(this.shards / 100));
			},
			crystalHealthMult: function(){
				return Math.pow(0.8, this.crystals);
			},
			healthMult: function(){
				return this.shardHealthMult() * this.crystalHealthMult();
			},
			shardTooltip: function(){
				var doubles = Math.floor(this.shards / 100);
				return "Enemies gain a stack of Glass when hit but not killed. Enemies have " + prettify(100 + this.shards) + "x base attack, doubled " + doubles + " time" + needAnS(doubles) + ", bringing total Enemy Attack to +" + prettify((this.attackMult() - 1) * 100) + "%. Enemy Health increased by +" + prettify((this.healthMult() - 1) * 100) + "%. Remove two stacks of Glass when killing any Enemy at or above World Level.";
			},
			reflectChance: function(){
				return 0.1 * this.crystals;
			},
			crystalTooltip: function(){
				return "Enemies gain a stack of Crystalized on reaching 10,000 Glass. " + prettify(this.reflectChance() * 100) + "% chance of reflecting an attack, and Health reduced by " + prettify((1 - this.healthMult()) * 100) + "%. Challenge will fail on reaching 10 Crystallized stacks. Enemies killed at or above World Level cause " + (2 + this.crystals) + " stacks of Glass to be removed.";
			}
			
		},
	},
	stats:{
		trimpsKilled: {
			title: "Dead Trimps",
			value: 0,
			valueTotal: 0
		},
		battlesWon: {
			title: "Battles Won",
			value: 0,
			valueTotal: 0
		},
		battlesLost: {
			title: "Battles Lost",
			value: 0,
			valueTotal: 0
		},
		gemsCollected: {
			title: "Gems Collected",
			value: 0,
			valueTotal: 0,
			display: function () {
				return ((this.value + this.valueTotal) > 0)
			}
		},
		mapsCleared: {
			title: "Maps Cleared",
			value: 0,
			valueTotal: 0
		},
		zonesCleared: {
			title: "Zones Cleared",
			value: 0,
			valueTotal: 0
		},
		trimpsFired: {
			title: "Trimps Fired",
			value: 0,
			valueTotal: 0,
			//This stat was added in 3.6 and the numbers will look bad for a few months.
			//Open maybe 10/21/16ish
			display: function () {return false;}
		},
		spentOnWorms: {
			title: "Wormholed Helium",
			display: function () {
				return ((this.value + this.valueTotal) > 0)
			},
			displayCurrent: function(){
				return (game.global.universe == 1);
			},
			value: 0,
			valueTotal: 0
		},
		goldenUpgrades: {
			title: "Golden Upgrades",
			display: function () {
				return (this.value > 0 || this.valueTotal > 0);
			},
			value: 0,
			valueTotal: 0
		},
		heliumHour: {
			get title(){ 
				var abv = (game.global.universe == 2) ? "Rn" : "He";
				return abv + "/Hour this Run"
			},
			display: function () {
				var resOwned = (game.global.universe == 2) ? game.resources.radon.owned : game.resources.helium.owned;
				return (resOwned > 0);
			},
			value: function (useTemp) {
				var timeThisPortal = new Date().getTime() - game.global.portalTime;
				if (timeThisPortal < 1) return 0;
				timeThisPortal /= 3600000;
				var resToUse;
				if (game.global.universe == 2){
					resToUse = (useTemp) ? game.global.tempHighRadon : game.resources.radon.owned;
				}
				else{
					resToUse = (useTemp) ? game.global.tempHighHelium : game.resources.helium.owned;
				}
				return Math.floor(resToUse / timeThisPortal);
			}
		},
		bestHeliumHourThisRun: {
			get title(){ 
				var abv = (game.global.universe == 2) ? "Rn" : "He";
				return "Best " + abv + "/Hour this Run"
			},
			display: function () {
				return (this.storedValue > 0);
			},
			storedValue: 0,
			atZone: 0,
			value: function () {
				return prettify(game.stats.bestHeliumHourThisRun.storedValue) + ", Z:" + game.stats.bestHeliumHourThisRun.atZone;
			},
			evaluate: function () { //called from portalTime
				var heHr = game.stats.heliumHour.value();
				if (heHr > this.storedValue){
					this.storedValue = heHr;
					this.atZone = game.global.world;
				}
			},
			onPortal: function () {
				this.storedValue = 0;
				this.atZone = 0;
			},
			noFormat: true
		},
		totalHelium: {
			title: "Total Helium Earned",
			display: function () {
				return (game.global.totalHeliumEarned > 0);
			},
			valueTotal: function () {
				return game.global.totalHeliumEarned;
			}
		},
		bestHeliumHour: {
			title: "Best He/Hour all Runs",
			display: function () {
				return (this.valueTotal > 0);
			},
			valueTotal: 0
		},
		dailyBonusHelium: {
			title: "Daily Challenge Helium",
			display: function () {
				return (this.value > 0 || this.valueTotal > 0);
			},
			displayCurrent: function(){
				return (game.global.universe == 1);
			},
			value: 0,
			valueTotal: 0
		},
		totalRadon: {
			title: "Total Radon Earned",
			display: function () {
				return (game.global.totalRadonEarned > 0);
			},
			valueTotal: function () {
				return game.global.totalRadonEarned;
			}
		},
		bestRadonHour: {
			title: "Best Rn/Hour all Runs",
			display: function () {
				return (this.valueTotal > 0);
			},
			valueTotal: 0
		},
		dailyBonusRadon: {
			title: "Daily Challenge Radon",
			display: function () {
				return (this.value > 0 || this.valueTotal > 0);
			},
			displayCurrent: function(){
				return (game.global.universe == 2);
			},
			value: 0,
			valueTotal: 0
		},
		zonesLiquified: {
			title: "Zones Liquified",
			display: function() {
				return (this.value > 0 || this.valueTotal > 0)
			},
			value: 0,
			valueTotal: 0
		},
		highestVoidMap: {
			title: "Highest Void Map Clear",
			display: function () {
				return (this.value > 0 || this.valueTotal > 0);
			},
			displayCurrent: function(){
				return (game.global.universe == 1);
			},
			value: 0,
			valueTotal: 0,
			noAdd: true,
			evaluate: function() { //called on completion of void map
				if (game.global.universe == 2){
					game.stats.highestVoidMap2.evaluate();
					return;
				}
				if (game.global.world > this.value) this.value = game.global.world;
				if (game.global.world > this.valueTotal) this.valueTotal = game.global.world;
			}
		},
		highestVoidMap2: {
			title: "Highest U2 Void Map",
			display: function () {
				return (this.value > 0 || this.valueTotal > 0);
			},
			displayCurrent: function(){
				return (game.global.universe == 2);
			},
			value: 0,
			valueTotal: 0,
			noAdd: true,
			evaluate: function() { //called on completion of void map
				if (game.global.world > this.value) this.value = game.global.world;
				if (game.global.world > this.valueTotal) this.valueTotal = game.global.world;
			}
		},
		totalVoidMaps: {
			title: "Total Void Maps Cleared",
			display: function () {
				return (this.value > 0 || this.valueTotal > 0);
			},
			value: 0,
			valueTotal: 0,
		},
		totalHeirlooms: { //added from createHeirloom to value
			title: "Heirlooms Found",
			display: function () {
				return (this.value > 0 || this.valueTotal > 0);
			},
			value: 0,
			valueTotal: 0
		},
		coresFound: {
			title: "Cores Found",
			display: function (){
				return (this.value > 0 || this.valueTotal > 0);
			},
			displayCurrent: function(){
				return (game.global.universe == 1);
			},
			value: 0,
			valueTotal: 0
		},
		cellsOverkilled: {
			title: "World Cells Overkilled",
			display: function () {
				return (this.value > 0 || this.valueTotal > 0);
			},
			displayCurrent: function(){
				return (game.global.universe == 1);
			},
			value: 0,
			valueTotal: 0
		},
		trimpsGenerated: {
			title: "Trimps from Generator",
			display: function() {
				return (this.value > 0 || this.valueTotal > 0);
			},
			displayCurrent: function(){
				return (game.global.universe == 1);
			},
			value: 0,
			valueTotal: 0
		},
		decayedNurseries: {
			title: "Burned Nurseries",
			display: function() {
				return (this.value > 0 || this.valueTotal > 0);
			},
			displayCurrent: function(){
				return (game.global.universe == 1);
			},
			value: 0,
			valueTotal: 0
		},
		bestTokens: {
			get title () {
				if (game.global.statsMode == "current") return "Tokens This Run"
				return "Most Tokens";
			},
			display: function () {
				return (this.value > 0 || this.valueTotal > 0)
			},
			displayCurrent: function(){
				return (game.global.universe == 1);
			},
			value: 0,
			valueTotal: 0,
			noAdd: true,
			keepHighest: true
		},
		amalgamators: {
			title: "Amalgamators Befriended",
			display: function () {
				return (this.value > 0 || this.valueTotal > 0)
			},
			displayCurrent: function(){
				return (game.global.universe == 1);
			},
			value: 0,
			valueTotal: 0
		},
		bestFluffyExp: {
			get title () {
				 if (game.global.statsMode == "current") return "Fluffy Exp This Run"
				 return "Best Fluffy Exp"
			},
			display: function () {
				return (this.value > 0 || this.valueTotal > 0)
			},
			displayCurrent: function(){
				return (game.global.universe == 1);
			},
			value: 0,
			valueTotal: 0,
			noAdd: true,
			keepHighest: true
		},
		bestFluffyExp2: {
			get title () {
				 if (game.global.statsMode == "current") return "Scruffy Exp This Run"
				 return "Best U2 Scruffy Exp"
			},
			display: function () {
				return (this.value > 0 || this.valueTotal > 0)
			},
			displayCurrent: function(){
				return (game.global.universe == 2);
			},
			value: 0,
			valueTotal: 0,
			noAdd: true,
			keepHighest: true
		},
		fluffyExpHour: {
			get title() { 
				return Fluffy.getName() + " Exp/Hr this Run"
			},
			display: function () {
				return (Fluffy.getBestExpStat().value > 0);
			},
			value: function () {
				var timeThisPortal = new Date().getTime() - game.global.portalTime;
				if (timeThisPortal < 1) return 0;
				timeThisPortal /= 3600000;
				return Math.floor(Fluffy.getBestExpStat().value / timeThisPortal);
			}
		},
		bestFluffyExpHourThisRun: {
			get title(){
				return "Best " + Fluffy.getName() + " Exp/Hr this Run"
			},
			display: function () {
				return (this.storedValue > 0);
			},
			storedValue: 0,
			atZone: 0,
			value: function () {
				return prettify(game.stats.bestFluffyExpHourThisRun.storedValue) + ", Z:" + game.stats.bestFluffyExpHourThisRun.atZone;
			},
			evaluate: function () { //called from portalTime
				var xpHr = game.stats.fluffyExpHour.value();
				if (xpHr > this.storedValue){
					this.storedValue = xpHr;
					this.atZone = game.global.world;
				}
			},
			onPortal: function () {
				this.storedValue = 0;
				this.atZone = 0;
			},
			noFormat: true
		},
		bestFluffyExpHour: {
			title: "Best Fluffy Exp/Hr",
			display: function () {
				return (this.valueTotal > 0);
			},
			valueTotal: 0
		},
		bestFluffyExpHour2: {
			title: "Best Scruffy Exp/Hr",
			display: function () {
				return (this.valueTotal > 0);
			},
			valueTotal: 0
		},
		fluffyPats: {
			title: "Fluffy Pats",
			display: function(){
				return (this.valueTotal > 0);
			},
			valueTotal: 0
		},
		scruffyPats: {
			title: "Scruffy Pats",
			display: function(){
				return (this.valueTotal > 0);
			},
			valueTotal: 0
		},
		totalPortals: {
			title: "Total Portals Used",
			displayCurrent: function(){
				return game.global.universe == 1;
			},
			display: function () {
				return (game.global.totalPortals > 0);
			},
			valueTotal: function () {
				return game.global.totalPortals;
			}
		},
		totalRadPortals: {
			title: "Total Radon Portals",
			displayCurrent: function(){
				return game.global.universe == 2;
			},
			display: function () {
				return (game.global.totalRadPortals > 0);
			},
			valueTotal: function () {
				return game.global.totalRadPortals;
			}
		},
		planetsBroken: {
			title: "Planets Broken",
			display: function () {
				return (this.valueTotal > 0);
			},
			valueTotal: 0
		},
		highestLevel: {
			title: "Highest Zone",
			valueTotal: function () {
				return game.global.highestLevelCleared + 1;
			}
		},
		highestRadLevel: {
			title: "Highest Zone U2",
			valueTotal: function () {
				return game.global.highestRadonLevelCleared + 1;
			},
			display: function(){
				return (game.global.highestRadonLevelCleared > 0);
			}
		},
		tdKills: {
			title: "Trap/Tower Kills",
			value: 0,
			valueTotal: 0,
			display: function(){
				return (playerSpire.initialized);
			}
		},
		saDust: {
			title: "SA Dust Earned",
			value: 0,
			valueTotal: 0,
			display: function(){
				return (game.global.highestRadonLevelCleared >= 74);
			}
		},
		saShards: {
			title: "SA Shards Earned",
			value: 0,
			valueTotal: 0,
			display: function(){
				return (this.value + this.valueTotal > 0);
			}
		},
		saKills: {
			title: "SA Enemies Killed",
			value: 0,
			valueTotal: 0,
			display: function(){
				return (game.global.highestRadonLevelCleared >= 74);
			}
		},
		saHighestLevel: {
			title: "SA Highest Level",
			valueTotal: 0,
			display: function(){
				return (game.global.highestRadonLevelCleared >= 74);
			}
		}
	},
	generatorUpgrades: {
		Efficiency: {
			base: 5e8,
			baseCost: 8,
			upgrades: 0,
			modifier: 1,
			tickAtFuel: function(fuel){
				return Math.floor(Math.sqrt(fuel) * ((this.base * 0.1 * this.upgrades) + this.base));
			},
			cost: function(){
				return this.baseCost + (8 * this.upgrades);
			},
			description: function(){
				var burnRate = getFuelBurnRate();
				return "Your Generator currently grants " + prettify(scaleNumberForBonusHousing(this.tickAtFuel(burnRate))) + " Max Trimps per tick at " + burnRate + " fuel (the amount of fuel needed to tick). Purchase this to increase the Generator's efficiency by 10% (additive)";
			}
		},
		Capacity: {
			base: 3,
			baseCost: 32,
			upgrades: 0,
			modifier: 3,
			baseIncrease: 0.4,
			cost: function(){
				return this.baseCost + (32 * this.upgrades);
			},
			nextModifier: function(){
				return this.baseIncrease + this.modifier;
			},
			description: function(){
				return "Your Generator can currently store " + prettify(this.modifier) + " fuel. Purchase this to increase the fuel capacity by " + prettify(this.baseIncrease) + ". The more fuel you have in storage, the more housing you'll create per tick!";
			}
		},
		Supply: {
			base: 0.2,
			baseCost: 64,
			baseIncrease: 0.02,
			upgrades: 0,
			modifier: 0.2,
			cost: function(){
				return this.baseCost + (64 * this.upgrades);
			},
			nextModifier: function(){
				return this.baseIncrease + this.modifier;
			},
			description: function(){
				var currentAmt = this.modifier;
				var maxZone = ((currentAmt - 0.2) / 0.01) + mutations.Magma.start();
				return "The Magma at Zone " + mutations.Magma.start() + " contains 0.2 fuel per cell, and each Zone after that can drop 0.01 more. Your generator can currently only harvest a max of " + prettify(this.modifier) + " per cell, meaning some fuel after Z" + prettify(maxZone) + " will be unharvestable. Purchase this upgrade to increase the amount you can harvest per cell by <b>0.02</b>, taking advantage of <b>2 extra Zones</b>.";
			}
		},
		Overclocker: {
			base: 0.5,
			baseCost: 512,
			baseIncrease: 0.01,
			upgrades: 0,
			modifier: 0.5,
			cost: function () {
				return this.baseCost + (32 * this.upgrades);
			},
			nextModifier: function () {
				if (this.upgrades == 0) return this.modifier;
				return this.modifier * (1 - this.baseIncrease);
			},
			description: function () {
				var requires = "<p class='" + ((game.permanentGeneratorUpgrades.Hybridization.owned && game.permanentGeneratorUpgrades.Storage.owned) ? "green" : "red") + "'>Requires Hybridization and Storage.</p>";
				var text = requires + "<p>The first level of this upgrade will cause the Dimensional Generator to overclock instead of wasting fuel whenever you find more fuel than you can store. Overclocking will cause an instant Generator tick at a base of 50% effectiveness.</p><p>Every upgrade purchased after the first will reduce the Overclocking penalty by 1%, compounding.</p>";
				if (this.upgrades > 0)
					text += "<p>Your current Overclocker effectiveness is " + ((1 - this.modifier) * 100).toFixed(2) + "%. Next level, your Overclocker effectiveness will be " + ((1 - (this.modifier * (1 - this.baseIncrease))) * 100).toFixed(2) + "%.</p>";
				return text;
			}
		}
	},
	permanentGeneratorUpgrades: {
		Hybridization: {
			description: "Unlock the ability to switch your Dimensional Generator to Hybrid mode. Hybrid mode will automatically switch to Gain Fuel when fuel is below max, and Gain Mi when fuel is full.",
			cost: 300,
			owned: false
		},
		Storage: {
			description: "Unlock extra fuel storage. This storage will always be equal to your normal fuel cap and will only store extra fuel above your normal cap. Fuel in this extra storage does not increase generator Trimps/tick, but acts as nice padding to help prevent wasted fuel. Hybrid mode will attempt to fill your extra storage halfway.",
			cost: 600,
			owned: false
		},
		Shielding: {
			description: "Reduce the amount of Magmite that decays after each portal by 10% (additive)",
			cost: 1050,
			owned: false
		},
		Slowburn: {
			description: "Reduce the rate of fuel consumption per tick by 0.1, from 0.5 to 0.4",
			cost: 1875,
			owned: false
		},
		Supervision: {
			description: "<p>Gain 3 Automation/Micromanagement tools for your Generator!</p><ul><li>Gain the ability to pause the Dimensional Generator by clicking the clock.</li><li>Get a sweet button to configure specific Zones to switch Generator states at. You'll also gain the ability to Ctrl + Click the Generator Start setting in the Settings menu to open up the same interface.</li><li>Add a Slider to your Generator window, allowing you to lower your maximum fuel capacity and gain greater control over Overclocker. Lowering your capacity below your stored amount of fuel will not waste any fuel, but the first time Overclocker is triggered, all extra fuel will be consumed.</li></ul>",
			cost: 2000,
			owned: false,
			onPurchase: function() {
				var elem = document.getElementById('generatorWindow');
				if (elem != null)
					elem.innerHTML = getGeneratorHtml();
				updateGeneratorInfo();
			}
		},
		Simulacrum: {
			description: "All new generated dimensions now come with copies of your Trimps inside them. Gone are the days of ramping up breeding to fill your dimensions with Trimps!",
			cost: 2500,
			owned: false
		}
	},
	//Total 4448% after 4.6
	tierValues: [0, 0.3, 1, 2.5, 5, 10, 20, 40, 80, 160, 250, 400, 750, 1200, 2000],
	//rip colorsList, 11/28/15 - 11/28/17. He served us well until it became obvious that CSS was better.
	//colorsList: ["white", "#155515", "#151565", "#551555", "#954515", "#651515", "#951545", "#35a5a5", "#d58565", "#d53535"],
	achievements: {
		zones: {
			finished: 0,
			title: "Zone Progress",
			description: function (number) {
				return "Complete Zone " + this.breakpoints[number];
			},
			progress: function () {
				if (this.breakpoints.length > this.finished) return game.global.highestLevelCleared + " / " + this.breakpoints[this.finished];
				return "Highest is " + game.global.highestLevelCleared;
			},
			evaluate: function () { return game.global.highestLevelCleared},
			breakpoints: [2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 350, 400, 450, 500],
			tiers: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8],
			names: ["This is Easy", "Blimp Slayer", "Groundbreaker", "The Beginning", "Determined", "Professor", "Trimp Aficionado", "Slayer of Planets", "Motivated", "Electric", "Stronk", "Endurance", "Unwavering", "Coordinated", "Resolved", "Steadfast", "Grit", "Perseverance", "Persistence", "Tenacity", "The Instigator", "The Destroyer", "The Eradicator", "The Exterminator", "Heat Maker", "Heat Hater", "Heat Breaker", "Heat Slayer", "Heat Expert", "Heat Bender", "Volcanic", "Magma Master", "Acre of Nature", "Aspirer", "Insane", "Spire Master"],
			icon: "icomoon icon-compass2",
			newStuff: [],
		},
		zones2: {
			finished: 0,
			title: "Zone Progress: U2",
			description: function (number) {
				return "Complete Zone " + this.breakpoints[number] + " in Universe 2";
			},
			display: function () {
				return (this.finished > 0 || game.global.universe == 2);
			},
			progress: function () {
				if (this.breakpoints.length > this.finished) return game.global.highestRadonLevelCleared + " / " + this.breakpoints[this.finished];
				return "Highest is " + game.global.highestRadonLevelCleared;
			},
			evaluate: function() {return game.global.highestRadonLevelCleared;},
			breakpoints: [2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 225, 250],
			tiers: [9, 9, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 14, 14],
			names: ["This is Harder", "Second Coming", "Blimp Destroyer", "Improbable Again", "Unstoppable", "Progresser", "Fifty Fifty", "Actually Unbroken", "Lucky 7D", "Apt", "The Unshocked", "Universalist", "Through the Unknown", "Swarming", "Steamroller", "Universal Destroyer", "Eater of Zones", "Bringer of Progress", "Major Zonage", "Master of Alchemy", "Ballistic", "Neverending Journey", "Zone Eater", "Zone Feaster"],
			icon: "icomoon icon-navigation",
			newStuff: [],
			size: 1.4
		},
		damage: {
			finished: 0,
			title: "Trimp Damage",
			description: function (number) {
				return "Reach " + prettify(this.breakpoints[number]) + " displayed damage";
			},
			progress: function () {
				if (this.breakpoints.length > this.finished) return prettify(this.highest) + " / " + prettify(this.breakpoints[this.finished]);
				return "Highest is " + prettify(this.highest);
			},
			highest: 0,
			breakpoints: [100, 100000, 1e+11, 1e+17, 1e+23, 1e+29, 1e+35, 1e+41, 1e+47, 1e+53, 1e+60, 1e+67],
			tiers: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
			names: ["Lead Trimps", "Silver Trimps", "Golden Trimps", "Copper Trimps", "Platinum Trimps", "Iron Trimps", "Steel Trimps", "Obsidian Trimps", "Cobalt Trimps", "Topaz Trimps", "Diamond Trimps", "Transcendental Trimps"],
			icon: "icomoon icon-bomb",
			newStuff: []
		},
		trimps: {
			finished: 0,
			highest: 0,
			title: "Trimps Owned",
			description: function (number) {
				return "Have  " + prettify(this.breakpoints[number]) + " total Trimps";
			},
			progress: function () {
				if (this.breakpoints.length > this.finished) return prettify(Math.floor(this.highest)) + " / " + prettify(this.breakpoints[this.finished]);
				return "Highest is " + prettify(Math.floor(this.highest));
			},
			breakpoints: [50, 150, 300, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000, 100000000000],
			tiers: [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4],
			names: ["Too Many Trimps", "Overcrowding", "This Is Trimp", "It Takes a Tribe", "It Takes a Town", "It Takes a City", "A Milli Trimpi", "Trimpsponential Growth", "MMMEGATRIMPS", "It Takes a Nation", "It Takes a Planet", "It Takes a Universe"],
			icon: "icomoon icon-group",
			newStuff: []
		},
		housing: {
			finished: 0,
			title: "Real Estate",
			description: function (number) {
				if (number == 9) return "Use the Dimensional Generator";
				return "Build your first  " + this.breakpoints[number];
			},
			breakpoints: ["Hut", "House", "Mansion", "Hotel", "Resort", "Gateway", "Wormhole", "Collector", "Warpstation", "Generator"],
			tiers: [1, 1, 1, 1, 2, 2, 2, 2, 3, 5],
			names: ["Tiny Homes", "Residential Development", "Taste for Luxury", "Fancy", "The Skyline", "Dimensional Drift", "Too Cool For Helium", "Space From Stars", "To Infinity and Beyond", "Mass Generation"],
			icon: "icomoon icon-building-o",
			newStuff: []
		},
		portals: {
			finished: 0,
			title: "Total Portals",
			description: function (number) {
				var s = (number > 0) ? "s" : "";
				return "Use the Portal " + prettify(this.breakpoints[number]) + " time" + s;
			},
			display: function () {
				return (game.global.totalPortals > 0);
			},
			progress: function () {
				if (this.breakpoints.length > this.finished) return this.evaluate() + " / " + this.breakpoints[this.finished];
				return this.evaluate() + " total";
			},
			evaluate: function () { return game.global.totalPortals},
			breakpoints: [1, 3, 10, 20, 50, 100, 200, 500],
			tiers: [1, 2, 2, 2, 3, 3, 4, 4],
			names: ["A Trimp Through Time", "When The Wild Things Are", "A Time Like No Other", "Venti Timeachino", "Time of Your Life", "Centennial Trimper", "Amnesia", "Dedicated Traveller"],
			icon: "icomoon icon-history",
			newStuff: []
		},
		totalZones: {
			finished: 0,
			title: "Total Zone Clears",
			description: function (number) {
				return "Clear  " + prettify(this.breakpoints[number]) + " total Zones";
			},
			evaluate: function () {
				return game.stats.zonesCleared.value + game.stats.zonesCleared.valueTotal;
			},
			progress: function () {
				if (this.breakpoints.length > this.finished) return this.evaluate() + " / " + this.breakpoints[this.finished];
				return prettify(this.evaluate()) + " total";
			},
			breakpoints: [30, 70, 130, 200, 400, 777, 1000, 1500, 10000, 50000],//total Zones according to stats
			tiers: [2, 2, 3, 3, 3, 4, 4, 5, 7, 7],
			names: ["Pathfinder", "Bushwhacker", "Pioneer", "Seeker", "Adventurer", "Lucky Resolve", "GigaClearer", "Globetrotter", "Vanquisher", "Conquistador"],
			icon: "icomoon icon-globe3",
			newStuff: []
		},
		totalMaps: {
			finished: 0,
			title: "Total Map Clears",
			description: function (number) {
				return "Clear  " + prettify(this.breakpoints[number]) + " total Maps";
			},
			display: function () {
				return (this.evaluate() > 0);
			},
			progress: function () {
				if (this.breakpoints.length > this.finished) return prettify(this.evaluate()) + " / " + prettify(this.breakpoints[this.finished]);
				return prettify(this.evaluate()) + " total";
			},
			evaluate: function () {
				return game.stats.mapsCleared.value + game.stats.mapsCleared.valueTotal;
			},
			breakpoints: [50, 100, 2000, 5000, 10000, 20000, 50000, 100000],//total maps according to stats
			tiers: [1, 2, 2, 3, 3, 4, 4, 5],
			names: ["Map Maker", "Map Runner", "Map Destroyer", "Map Annihilator", "Map Slaughterer", "Map Commander", "Maptain", "Cartographer"],
			icon: "icomoon icon-map4",
			newStuff: []
		},
		totalHelium: {
			finished: 0,
			title: "Helium Collection",
			description: function (number) {
				return "Gather " + prettify(this.breakpoints[number]) + " total Helium";
			},
			progress: function (){
				if (this.breakpoints.length > this.finished) return prettify(Math.floor(this.evaluate() * 10000) / 10000) + " / " + prettify(this.breakpoints[this.finished]);
				return prettify(this.evaluate()) + " total";
			},
			evaluate: function () {
				return game.global.totalHeliumEarned;
			},
			display: function () {
				return (game.global.totalHeliumEarned > 0);
			},
			breakpoints: [100, 10e2, 10e3, 10e4, 10e5, 10e6, 10e7, 10e8, 10e10, 10e11, 10e13, 10e15],
			tiers: [1, 2, 3, 4, 5, 6, 6, 7, 7, 7, 8, 8],
			names: ["Cool", "Crisp", "Brisk", "Chilly", "Frosty", "Frigid", "Frozen", "Gelid", "Glacial", "Freaking Cold", "Arctic", "Absolute Zero"],
			icon: "glyphicon glyphicon-oil",
			newStuff: []
		},
		totalRadon: {
			finished: 0,
			title: "Radon Collection",
			description: function (number) {
				return "Gather " + prettify(this.breakpoints[number]) + " total Radon";
			},
			progress: function (){
				if (this.breakpoints.length > this.finished) return prettify(Math.floor(this.evaluate() * 10000) / 10000) + " / " + prettify(this.breakpoints[this.finished]);
				return prettify(this.evaluate()) + " total";
			},
			evaluate: function () {
				return game.global.totalRadonEarned;
			},
			display: function () {
				return (game.global.totalRadonEarned > 0 || game.global.universe == 2);
			},
			breakpoints: [100, 1e4, 5e5, 1e7, 1e9, 1e11, 1e13, 1e16, 1e19, 1e21, 1e24],
			tiers: [9, 9, 10, 10, 10, 11, 12, 12, 13, 13, 13],
			names: ["Radon Runner", "The Irradiated", "Radelicious", "Radon Quixote", "Radon Racer", "Raging Radon", "Radon Wrangler", "All Said and Radone", "Radominating", "Rads to Riches", "Radonculous"],
			icon: "icomoon icon-battery",
			newStuff: []
		},
		heliumHour: {
			finished: 0,
			title: "Helium Per Hour",
			description: function (number) {
				return "Reach " + prettify(this.breakpoints[number]) + " Helium Per Hour";
			},
			progress: function () {
				if (this.breakpoints.length > this.finished) return prettify(Math.floor(this.evaluate() * 10000) / 10000) + " / " + prettify(this.breakpoints[this.finished]);
				return "Currently at " + prettify(this.evaluate());
			},
			evaluate: function () {
				return game.stats.heliumHour.value();
			},
			display: function () {
				return (game.global.totalHeliumEarned > 0);
			},
			breakpoints: [10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e9, 1e11, 1e13, 1e15, 5e17],
			tiers: [2, 3, 3, 4, 4, 5, 6, 7, 7, 8, 8, 9],
			names: ["Coldlector", "Centelium", "Frosty Tanker", "Blimp Snatcher", "Squeaky Dasher", "Quick N Cool", "Hour Bender", "Acquired Frost", "Vacuum", "Levitator", "Soarer", "Cool Runnings"],
			icon: "icomoon icon-cloudy2",
			newStuff: []
		},
		totalHeirlooms: {
			finished: 0,
			title: "Heirloom Collection",
			description: function (number) {
				var number = this.breakpoints[number];
				var s = (number > 1) ? "s" : "";
				return "Collect " + prettify(number) + " Heirloom" + s;
			},
			progress: function () {
				if (this.breakpoints.length > this.finished) return this.evaluate() + " / " + this.breakpoints[this.finished];
				return prettify(this.evaluate()) + " total";
			},
			evaluate: function () {
				return game.stats.totalHeirlooms.value + game.stats.totalHeirlooms.valueTotal;
			},
			display: function () {
				return (game.global.totalPortals >= 5);
			},
			breakpoints: [1, 10, 40, 100, 500, 1111, 2000, 5000, 10000],
			tiers: [2, 2, 3, 3, 4, 5, 6, 7, 8],
			names: ["Finder", "Gatherer", "Accumulator", "Fancier", "Aficionado", "Devotee", "Connoisseur", "Expert", "Curator"],
			icon: "icomoon icon-archive",
			newStuff: []
		},
		totalGems: {
			finished: 0,
			title: "Gem Collection",
			description: function (number) {
				var number = this.breakpoints[number];
				var s = (number > 1) ? "s" : "";
				return "Collect  " + prettify(number) + " Gem" + s;
			},
			progress: function () {
				if (this.breakpoints.length > this.finished) return prettify(this.evaluate()) + " / " + prettify(this.breakpoints[this.finished]);
				return prettify(this.evaluate()) + " total";
			},
			evaluate: function () {
				return game.stats.gemsCollected.value + game.stats.gemsCollected.valueTotal;
			},
			breakpoints: [1, 1e+9, 1e+21, 1e+30, 1e+39, 1e+48],//total gems according to statistics
			tiers: [1, 2, 3, 4, 5, 6],
			names: ["What's This For?", "Collector of Shinies", "Dragimp Lover", "Expert of Shinies", "Jeweller", "Gemaster"],
			icon: "icomoon icon-diamond",
			newStuff: []
		},
		dailyHelium: {
			finished: 0,
			title: "Daily Bonus",
			description: function (number) {
				var number = this.breakpoints[number];
				return "Earn " + prettify(number) + " Helium from the Daily Challenge";
			},
			evaluate: function () {
				return game.stats.dailyBonusHelium.value + game.stats.dailyBonusHelium.valueTotal;
			},
			progress: function () {
				if (this.breakpoints.length > this.finished) return prettify(this.evaluate()) + " / " + prettify(this.breakpoints[this.finished]);
				return prettify(this.evaluate()) + " total";
			},
			breakpoints: [5e5, 1e6, 5e6, 2.5e7, 2e9, 1e12, 1e15, 1e21],
			display: function () {
				return (game.global.highestLevelCleared >= 99);
			},
			tiers: [3, 4, 5, 6, 7, 8, 8, 9],
			names: ["Daytermined", "Daydicated", "Daystiny", "Daylighted", "Daystroyer", "Daylusional", "Dayrailed", "Daypocalyptic"],
			icon: "icomoon icon-sun",
			newStuff: []
		},
		humaneRun: {
			finished: 0,
			title: "Humane Run",
			description: function (number){
				var number = this.breakpoints[number];
				return "<span style='font-size: .8em'>Reach Z" + number + " after losing no more than one fight per Zone.</span>";
			},
			evaluate: function () {
				if (!this.earnable || game.stats.battlesLost.value > this.lastZone + 1) return 0;
				return game.global.world;
			},
			progress: function () {
				if (!this.earnable && this.lastZone == -1) return "You need to portal to become eligible";
				if (!this.earnable) return "You lost more than once on Z" + this.lastZone;
				if (game.stats.battlesLost.value > this.lastZone + 1) return "You lost too many fights!";
				if (game.stats.battlesLost.value == this.lastZone + 1) return "You've lost once this Zone, be careful!";
				return "Still Earnable!";
			},
			earnable: true,
			lastZone: 0,
			breakpoints: [5, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 600],
			tiers: [1, 4, 5, 6, 7, 7, 7, 7, 8, 8, 8, 9],
			names: ["Sitter", "Watchdog", "Nanny", "Caretaker", "Supervisor", "Advocate", "Guardian", "Coddler", "Savior", "Defender", "Trimp Lover", "Righteous"],
			icon: "glyphicon glyphicon-eye-open",
			newStuff: []
		},
		mapless: {
			finished: 0,
			title: "Mapless Drifter",
			description: function (number){
				var number = this.breakpoints[number];
				return "<span style='font-size: .8em'>Reach U2 Z" + number + " without ever entering a Map.</span>";
			},
			evaluate: function () {
				if (!this.earnable || game.global.universe == 1) return 0;
				return game.global.world;
			},
			progress: function () {
				if (game.global.universe == 1) return "You must be in Universe 2!"
				if (!this.earnable && this.lastZone == -1) return "You need to portal to become eligible";
				if (!this.earnable) return "You ran a Map on Z" + this.lastZone;
				return "Still Earnable!";
			},
			display: function(){
				return (game.global.highestRadonLevelCleared > 1 || game.global.universe == 2);
			},
			earnable: true,
			lastZone: 0,
			breakpoints: [20, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150, 175],
			tiers: [10, 10, 11, 11, 11, 11, 11, 12, 12, 13, 13, 13],
			names: ["Map Misser", "Map Lacker", "Mapophobia", "GPS", "Undisoriented", "Need No Map", "The Efficient", "Bulldozer", "Worldly", "Big Pusher", "Defragmented", "Stubborn"],
			icon: "icomoon icon-map-signs",
			newStuff: []
		},
		shielded: {
			finished: 0,
			title: "Shielded",
			description: function (number){
				var number1 = this.breakpoints[number];
				var number2 = this.breakpoints2[number];
				return "<span style='font-size: .8em'>Reach U2 Z" + number1 + " without your Shield falling below " + number2 + "%.</span>";
			},
			evaluate: function (number) {
				if (game.global.universe == 1) return 0;
				var nextBreakpoint = (number) ? this.breakpoints2[number] : this.breakpoints2[this.finished];
				if (game.global.lowestShield < nextBreakpoint) return 0;
				return game.global.world;
			},
			progress: function (index) {
				if (index < this.finished) return "Already earned!";
				if (game.global.universe == 1) return "You must be in Universe 2!";
				var breakpoint2 = this.breakpoints2[index];
				if (game.global.lowestShield < breakpoint2) return "Your Shield has already hit " + game.global.lowestShield + "% this run.";
				return "Still Earnable! Lowest is " + game.global.lowestShield + "%";
			},
			display: function(){
				return (game.global.highestRadonLevelCleared >= 1);
			},
			breakpoints: [40, 50, 60, 70, 80, 90, 100, 125, 150, 175, 200, 225],
			breakpoints2: [25, 35, 45, 50, 50, 50, 60, 60, 70, 70, 70, 75],
			tiers: [11, 11, 11, 11, 12, 12, 12, 13, 13, 13, 14, 14],
			names: ["Crumb of Comfort", "Common Comfort", "Controlled Comfort", "Certain Comfort", "Copious Comfort", "Critical Comfort", "Cosmic Comfort", "Colossal Comfort", "Ceaseless Comfort", "Complete Comfort", "Couple-Cent Comfort", "Crazy Comfort"],
			icon: "icomoon icon-shield2",
			newStuff: []
		},
		blockTimed: {
			finished: 0,
			title: "Speed: The Block",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "Clear The Block in less than " + number + " from start of run";
			},
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			display: function () {
				return (game.global.totalPortals >= 1 || this.finished >= 1);
			},
			u: 1,
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [480, 240, 120, 60],//In minutes
			tiers: [1, 1, 2, 2],
			names: ["Block Hobbyist", "Block Apprentice", "Block Professional", "Block Rockstar"],
			icon: "icomoon icon-alarmclock",
			newStuff: []
		},
		wallTimed: {
			finished: 0,
			title: "Speed: The Wall",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "Clear The Wall in less than " + number + " from start of run";
			},
			display: function () {
				return (game.global.highestLevelCleared >= 10 && (game.global.totalPortals >= 1 || this.finished >= 1));
			},
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			u: 1,
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [480, 240, 120, 60],//In minutes
			tiers: [2, 2, 2, 3],
			names: ["Wall Novice", "Wall Student", "Wall Contender", "Wall Scaler"],
			icon: "icomoon icon-alarmclock",
			newStuff: []
		},
		angerTimed: {
			finished: 0,
			title: "Speed: Anger",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "Clear DoA in less than " + number + " from start of run";
			},
			display: function () {
				return (game.global.highestLevelCleared >= 14 && (game.global.totalPortals >= 1 || this.finished >= 1));
			},
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			u: 1,
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [480, 240, 120, 60, 1],//In minutes
			tiers: [2, 2, 3, 3, 8],
			names: ["Angry Jogger", "Angry Runner", "Angry Sprinter", "Angry Racer", "Angry Teleporter"],
			icon: "icomoon icon-alarmclock",
			newStuff: []
		},
		doomTimed: {
			finished: 0,
			title: "Speed: Doom",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "Clear ToD in less than " + number + " from start of run";
			},
			display: function () {
				return (game.global.highestLevelCleared >= 19 && (game.global.totalPortals >= 1 || this.finished >= 1));
			},
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			u: 1,
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [480, 240, 120, 60],//In minutes
			tiers: [2, 3, 3, 4],
			names: ["Walk to Doom", "Trot to Doom", "Canter to Doom", "Gallop to Doom"],
			icon: "icomoon icon-alarmclock",
			newStuff: []
		},
		prisonTimed: {
			finished: 0,
			title: "Speed: The Prison",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "Clear Prison in less than " + number + " from start of run";
			},
			display: function () {
				return (game.global.highestLevelCleared >= 32 && (game.global.totalPortals >= 1 || this.finished >= 1));
			},
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			u: 1,
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [480, 360, 240, 180, 150, 120, 105, 90, 10], //In minutes
			tiers: [3, 4, 4, 5, 5, 5, 6, 6, 8],
			names: ["Prison Odyssey", "Prison Expedition", "Prison Adventure", "Prison Trek", "Prison Tour", "Prison Road Trip", "Prison Hike", "Prison Jog", "Prison Sprint"],
			icon: "icomoon icon-alarmclock",
			newStuff: []
		},
		bionicTimed: {
			finished: 0,
			title: "Speed: Bionic",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "<span style='font-size: .8em'>Clear Bionic Wonderland in less than " + number + " from start of run</span>";
			},
			display: function () {
				return (game.global.highestLevelCleared >= 79);
			},
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			u: 1,
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [1440, 1200, 720, 480, 210, 150], //In minutes
			tiers: [4, 4, 5, 5, 6, 6],
			names: ["Lover of Bots", "Friend of Bots", "Acquaintance of Bots", "Bot Disliker", "Bot Hater", "Bot Slayer"],
			icon: "icomoon icon-alarmclock",
			newStuff: []
		},
		starTimed: {
			finished: 0,
			title: "Speed: Star",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "<span style='font-size: .8em'>Clear Imploding Star in less than " + number + " from start of run</span>";
			},
			display: function () {
				return (game.global.highestLevelCleared >= 124);
			},
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			u: 1,
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [1680, 1080, 390, 180, 150, 50, 5], //In minutes
			tiers: [5, 5, 5, 6, 6, 7, 8],
			names: ["Cosmic Curiosity", "Star Struck", "Space Speeder", "Intense Inertia", "Stellar Striker", "Insane Imploder", "Born Imploded"],
			icon: "icomoon icon-alarmclock",
			newStuff: []
		},
		spireTimed: {
			finished: 0,
			title: "Speed: Spire",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "<span style='font-size: .8em'>Clear the Spire in less than " + number + " from start of run</span>";
			},
			display: function () {
				return (game.global.highestLevelCleared >= 169);
			},
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			u: 1,
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [1300, 900, 500, 200, 175, 60, 2],
			tiers: [6, 6, 6, 7, 7, 7, 8],
			names: ["Spire Trialer", "Spire Rider", "Spire Strider", "Spire Glider", "Spire Flier", "Inspired", "Spire Spirer"],
			icon: "icomoon icon-alarmclock",
			newStuff: []
		},
		spire2Timed: {
			finished: 0,
			title: "Speed: Spire II",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "<span style='font-size: .8em'>Clear Spire II in less than " + number + " from start of run</span>";
			},
			display: function () {
				return (game.global.highestLevelCleared >= 269);
			}, 
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			u: 1,
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [500, 200, 120, 60, 10],
			tiers: [6, 7, 8, 8, 9],
			names: ["Toxic Treader", "Toxic Trotter", "Toxic Traveller", "Toxic Tempo", "Toxic Teleporter"],
			icon: "icomoon icon-alarmclock",
			newStuff: []
		},
		spire3Timed: {
			finished: 0,
			title: "Speed: Spire III",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "<span style='font-size: .8em'>Clear Spire III in less than " + number + " from start of run</span>";
			},
			display: function () {
				return (game.global.highestLevelCleared >= 369);
			}, 
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			u: 1,
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [480, 240, 120, 80, 20],
			tiers: [6, 7, 8, 8, 9],
			names: ["Chillin", "Arctic Accelerator", "Rimy Runner", "Subzero Sprinter", "Frigid and Furious"],
			icon: "icomoon icon-alarmclock",
			newStuff: []
		},
		spire4Timed: {
			finished: 0,
			title: "Speed: Spire IV",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "<span style='font-size: .8em'>Clear Spire IV in less than " + number + " from start of run</span>";
			},
			display: function () {
				return (game.global.highestLevelCleared >= 469);
			}, 
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			u: 1,
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [4320, 2880, 1440, 300, 60, 30, 11],
			tiers: [8, 8, 8, 8, 9, 9, 10],
			names: ["Windy Walker", "Gusty Gait", "Breeze Breaker", "Zippy Zephyr", "Temporal Tempest", "Stratus Screamer", "Tearin\' Tornado"],
			icon: "icomoon icon-alarmclock",
			newStuff: []
		},
		spire5Timed: {
			finished: 0,
			title: "Speed: Spire V",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "<span style='font-size: .8em'>Clear Spire V in less than " + number + " from start of run</span>";
			},
			display: function () {
				return (game.global.highestLevelCleared >= 569);
			}, 
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			u: 1,
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [1440, 360, 120, 40, 20],
			tiers: [8, 9, 9, 10, 10],
			names: ["actiVe", "resolVed", "traVeler", "driVen", "triVialized"],
			icon: "icomoon icon-alarmclock",
			newStuff: []
		},
		bigWallTimed: {
			finished: 0,
			title: "U2 Speed: Big Wall",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "<span style='font-size: .8em'>Clear Big Wall in less than " + number + " from start of run</span>";
			},
			display: function () {
				return (game.global.universe == 2 || game.global.highestRadonLevelCleared >= 6);
			},
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			u: 2,
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [100, 50, 10, 4],//In minutes
			tiers: [9, 9, 10, 11],
			names: ["Big Wall Crawler", "Big Wall Scholar", "Big Wall Mauler", "Big Wall Baller"],
			icon: "icomoon icon-clock2",
			newStuff: []
		},
		palaceTimed: {
			finished: 0,
			title: "U2 Speed: Palace",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "<span style='font-size: .8em'>Clear Prismatic Palace in less than " + number + " from start of run</span>";
			},
			display: function () {
				return (game.global.highestRadonLevelCleared >= 20);
			},
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			u: 2,
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [180, 90, 40, 12],//In minutes
			tiers: [10, 10, 11, 12],
			names: ["Peasant", "Jester", "Advisor", "Ruler"],
			icon: "icomoon icon-clock2",
			newStuff: []
		},
		atlantrimpTimed: {
			finished: 0,
			title: "U2 Speed: Atlantrimp",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "<span style='font-size: .8em'>Clear Atlantrimp in less than " + number + " from start of run</span>";
			},
			display: function () {
				return (game.global.highestRadonLevelCleared >= 32);
			},
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			u: 2,
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [240, 60, 20],//In minutes
			tiers: [10, 11, 12],
			names: ["Sinker", "Floater", "Swimmer"],
			icon: "icomoon icon-clock2",
			newStuff: []
		},
		meltingTimed: {
			finished: 0,
			title: "U2 Speed: Melting",
			description: function (number) {
				number = formatMinutesForDescriptions(this.breakpoints[number]);
				return "<span style='font-size: .8em'>Clear Melting Point in less than " + number + " from start of run</span>";
			},
			display: function () {
				return (game.global.highestRadonLevelCleared >= 49);
			},
			evaluate: function () {
				return getMinutesThisPortal();
			},
			progress: function () {
				return "Best run is " + formatMinutesForDescriptions(this.highest);
			},
			u: 2,
			highest: 0,
			reverse: true,
			timed: true,
			showAll: true,
			breakpoints: [360, 100, 45, 30],//In minutes
			tiers: [11, 12, 12, 12],
			names: ["Thawed", "Tempered", "Melty", "Molten"],
			icon: "icomoon icon-clock2",
			newStuff: []
		},
		oneOffs: {
			//Turns out this method of handling the feats does NOT scale well... adding stuff to the middle is a nightmare
			finished: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			title: "Feats",
			get descriptions () {
				return ["Complete the Dimension of Anger before buying Bounty", "Reach Z30 with no respec and 60 or less He spent", "Have over " + prettify(1e6) + " traps at once", "Die 50 times to a single Voidsnimp", "Beat Balance, never having more than 100 stacks", "Reach Zone 10 with 5 or fewer dead Trimps", "Reach exactly 1337 He/Hr", "Attack 20 times without dying in Electricity", "Create a perfect Map", "Use up all 7 Daily Challenges", "Equip a magnificent or better Staff and Shield", "Reach Z60 with 1000 or fewer dead Trimps", "Reach Z120 without using manual research", "Reach Z75 without buying any housing", "Find an uncommon heirloom at Z146 or higher", "Spend over " + prettify(250e3) + " total He on Wormholes", "Reach Z60 with rank III or lower equipment", "Kill an Improbability in one hit", "Beat a Lv 60+ Destructive Void Map with no deaths", "Beat Crushed without being crit past Z5", "Kill an enemy with 100 stacks of Nom", "Break the Planet with 5 or fewer lost battles", "Reach Z60 without hiring a single Trimp", "Complete a Zone above 99 without falling below 150 stacks on Life", "Spend at least 10 minutes breeding an army with Geneticists", "Beat Toxicity, never having more than 400 stacks", "Own 100 of all housing buildings", "Overkill every possible world cell before Z60", "Complete Watch without entering maps or buying Nurseries", "Complete Lead with 100 or fewer lost battles", "Build your 10th Spire Floor", "Kill " + prettify(1e6) + " enemies in your Spire", "Equip a Magmatic Staff and Shield", "Bring a world enemy's attack below 1", "Complete Lead with 1 or fewer Gigastations", "Complete Corrupted without Geneticists", "Complete a Void Map at Z215 on Domination", "Complete The Spire with 0 deaths", "Overkill an Omnipotrimp", "Defeat a Healthy enemy with 200 stacks of wind", "Build up a Poison debuff that's 1000x higher than your attack", "Earn a Challenge<sup>2</sup> bonus of 2000%", "Complete a Bionic Wonderland map 45 levels higher than your Zone number", "Beat the Spire with no respec and " + prettify(100e6) + " or less He Spent", "Defeat an enemy on Obliterated", "Find an Amalgamator on Z1", "Get 10 Red Crits in a row", "Beat Z75 on the Scientist V challenge", "Gain at least 01189998819991197253 He from one Bone Portal", "Kill an Enemy on Eradicated", "Complete Spire V with no deaths", "Build your 20th Spire Floor", "Complete a Bionic Wonderland map 200 levels higher than your Zone number", "Complete Spire II on the Coordinate challenge", "Beat Spire II with no respec and " + prettify(1e9) + " or less He spent", "Beat Imploding Star on Obliterated", "Close 750 Nurseries at the same time", "Earn Dark Essence with no respec and 0 He spent", "Reach Magma on Obliterated", "Break the Planet on Eradicated"];
			},
			tiers: [2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9],
			description: function (number) {
				return this.descriptions[number];
			},
			filters: [19, 29, 29, -1, 39, 59, -1, 79, -1, 99, 124, 59, 119, 74, -1, -1, 59, 59, 59, 124, 144, 59, 59, 109, -1, 164, 59, -1, 179, 179, 199, 199, 229, 245, 179, 189, 214, 199, 229, 299, 235, 65, 169, 199, 424, 349, -1, 129, 399, 549, 599, 199, 324, 299, 299, 424, 229, 179, 424, 549],
			filterLevel: function(){
				return game.global.highestLevelCleared;
			},
			icon: "icomoon icon-flag",
			names: ["Forgot Something", "Underachiever", "Hoarder", "Needs Block", "Underbalanced", "Peacekeeper", "Elite Feat", "Grounded", "Maptastic", "Now What", "Swag", "Workplace Safety", "No Time for That", "Tent City", "Consolation Prize", "Holey", "Shaggy", "One-Hit Wonder", "Survivor", "Thick Skinned", "Great Host", "Unbroken", "Unemployment", "Very Sneaky", "Extra Crispy", "Trimp is Poison", "Realtor", "Gotta Go Fast", "Grindless", "Leadership", "Defender", "Stoned", "Swagmatic", "Brr", "Unsatisfied Customer", "Organic Trimps", "Fhtagn", "Invincible", "Mighty", "Mother Lode", "Infected", "Challenged", "Bionic Sniper", "Nerfed", "Obliterate", "M'Algamator", "Critical Luck", "AntiScience", "HeMergency", "Eradicate", "Invisible", "Power Tower", "Bionic Nuker", "Hypercoordinated", "Nerfeder", "Imploderated", "Wildfire", "Unessenceted", "Melted", "Screwed"],
			newStuff: []
		},
		oneOffs2: {
			//Turns out this method of handling the feats does NOT scale well... adding stuff to the middle is a nightmare. Yet I copy/pasted it again for Universe 2 and probably will do the same for U3. Oh well.
			finished: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			title: "U2 Feats",
			display: function(){
				return (Fluffy.checkU2Allowed());
			},
			get descriptions () {
				return ["Reach exactly 1337 Rn/Hr", "One-shot a Dimension of Rage enemy on Unlucky while Unlucky", "Complete Downsize with an equal amount of Huts, Houses, Mansions, Hotels and Resorts", "Complete Transmute without hiring a single Trimp", "Complete Unbalance with 500 stacks of Unbalance", "Complete Bublé without using Prismal or respeccing Perks", "Complete Duel without ever falling below 20 points", "Complete Melt without ever having more than 150 stacks", "Complete Trappapalooza without Trapping on or above Z50", "Complete Wither with " + prettify(10000) + " stacks of Hardened", "Reach a session score of 100-0 at L5+ in SA", "Kill a L20+ SA Enemy without Shock, Bleed or Poison", "Complete Revenge with exactly 19 stacks", "Complete 80/80 quests on Quest", "Complete Archaeology without ever having more than 0 of one Relic", "Complete Storm without ever encountering a Stormcloud", "Complete Insanity with 500 stacks without running a map above lvl 50", "Finish Berserk after reaching 20 Weakened Stacks before Z100", "Reach 100 Swarm Stacks by Z120 then complete Exterminate", "Reach L19 Cruffys by Z70 then complete Nurture", "Collect 7500 Runetrinkets", "Complete all 25 Mayhems", "Complete a Z155 Void Map with 10 Gas Brews and 0 Void Pots", "Complete Hypothermia with at least 400 Embers", "Complete Glass without ever having more than 2 stacks"];
			},
			tiers: [10,10,10,11,11,11,11,11,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,14,14],
			description: function (number) {
				return this.descriptions[number];
			},
			filters: [-1,14,19,24,34,39,44,49,59,69,75,75,79,84,94,104,109,114,119,135,135,100,150,175,175],
			filterLevel: function(){
				return game.global.highestRadonLevelCleared;
			},
			icon: "glyphicon glyphicon-flag",
			names: ["Eliter Feat", "Don't Need Luck", "Perfectly Balanced", "Resourceyphobe", "Upsized", "Unpoppable", "Pwnd", "Solid", "Coastapalooza", "Witherproof", "Huffstle", "Just Smack It", "Close Call", "Level Up", "Unassisted", "Clear Skies", "Actually Insane", "You're Doing it Wrong", "The Tortoise and the Bugs", "Nurtured AF", "Heavy Trinker", "Peace", "Mad Scientist", "Burn Baby Burn", "Unbreakable"],
			newStuff: []
		},
	},

	heirlooms: { //Basic layout for modifiers. Steps can be set specifically for each modifier, or else default steps will be used
		//NOTE: currentBonus is the only thing that will persist!
		values: [10, 20, 30, 50, 150, 300, 800, 2000, 5000, 15000, 100000, 750000],
		recycleOverride: [-1,-1,-1,-1,-1,-1,-1,-1,-1,25e4,1e6, 7.5e7],
		coreValues: function(tier){
			return Math.floor(Math.pow(10, tier) * 20) * 2;
		},
		slots: [1,2,3,3,3,4,4,5,5,6,6,7],
		defaultSteps: [[3, 6, 1], [3, 6, 1], [3, 6, 1], [6, 12, 1], [16, 40, 2], [32, 80, 4], [64, 160, 8], [128, 320, 16], [256, 640, 32], [512, 1280, 64], [1024, 2560, 128], [2048, 5120, 256]],
		rarityNames: ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Magnificent', 'Ethereal', 'Magmatic', 'Plagued', 'Radiating', 'Hazardous', 'Enigmatic'],
		rarities:[[5000,3500,1500],[1000,5000,4000],[-1,3500,5000,1500],[-1,2000,4000,4000],[-1,1500,3000,5000,500],[-1,800,2000,6000,1000,200],[-1,400,1000,7000,1000,500,100],[-1,200,500,6000,2200,800,300],[-1,-1,-1,5000,3000,1700,300],[-1,-1,-1,2500,5000,2000,500],[-1,-1,-1,-1,7000,2400,500,100],[-1,-1,-1,-1,6000,3170,680,150],[-1,-1,-1,-1,3000,5000,1650,350],[-1,-1,-1,-1,-1,4500,3000,2000,500],[-1,-1,-1,-1,-1,1500,2000,5000,1500],[-1,-1,-1,-1,-1,-1,1000,6000,3000],[-1,-1,-1,-1,-1,-1,-1,-1,7500,2500],[-1,-1,-1,-1,-1,-1,-1,-1,5000,5000],[-1,-1,-1,-1,-1,-1,-1,-1,-1,10000],[-1,-1,-1,-1,-1,-1,-1,-1,-1,8500,1500],[-1,-1,-1,-1,-1,-1,-1,-1,-1,7000,3000],[-1,-1,-1,-1,-1,-1,-1,-1,-1,3000,7000],[-1,-1,-1,-1,-1,-1,-1,-1,-1,1000,8500,500],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9000,1000],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7000,3000]],
		rarityBreakpoints:[41,60,80,100,125,146,166,181,201,230,300,400,500,600,700,1,40,80,100,135,175,200,225,250],
		universeBreakpoints: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2],
		priceIncrease: [1.5, 1.5, 1.25, 1.19, 1.15, 1.12, 1.1, 1.06, 1.04, 1.03, 1.02, 1.015],
		canReplaceMods: [true, true, true, true, true, true, true, true, false, false, false, false],
		Core: {
			fireTrap: {
				name: "Fire Trap Damage",
				currentBonus: 0,
				steps: [[10,25,1],[10,25,1],[10,25,1],[25,50,1],[50,100,2],[100,199,3],[200,400,4]]
			},
			poisonTrap: {
				name: "Poison Trap Damage",
				currentBonus: 0,
				steps: [-1,[10,25,1],[10,25,1],[25,50,1],[50,100,2],[100,199,3],[200,400,4]]
			},
			lightningTrap: {
				name: "Lightning Trap Damage",
				currentBonus: 0,
				steps: [-1,-1,[1,10,1],[10,20,1],[20,50,2],[50,100,2],[100,199,3]],
				specialDescription: function (modifier) {
					return "Increases the damage dealt by Lightning Trap" + ((playerSpireTraps.Lightning.level >= 4) ? ", Shocked, and its column boost to Fire and Poison Traps " : " and Shocked ") + "by " + prettify(modifier) + "%.";
				},
			},
			runestones: {
				name: "Runestone Drop Rate",
				currentBonus: 0,
				steps: [[10,25,1],[10,25,1],[10,25,1],[25,50,1],[50,100,2],[100,199,3],[200,400,4]]
			},
			strengthEffect: {
				name: "Strength Tower Effect",
				currentBonus: 0,
				steps: [[1,10,1],[1,10,1],[1,10,1],[10,20,1],[20,50,2],[50,100,2],[100,199,3]],
				specialDescription: function (modifier) {
					return "Increases the damage dealt by Fire Traps on the same Floor as a Strength Tower by " + prettify(modifier) + "%. Does not increase the world bonus to Trimps.";
				},
			},
			condenserEffect: {
				name: "Condenser Effect",
				currentBonus: 0,
				steps: [-1,[1,5,0.25],[1,5,0.25],[5,10,0.25],[5,15,0.5],[10,20,0.5],[20,30,0.5]],
				max: [-1,10,10,15,25,35,50],
				specialDescription: function(modifier) {
					return "Increases the amount of Poison damage compounded by the Condenser Tower by " + prettify(modifier) + "%. Does not increase the world bonus to Trimps.";
				}
			},
		},
		Staff: {
			metalDrop: {
				name: "Metal Drop Rate",
				currentBonus: 0,
			},
			foodDrop: {
				name: "Food Drop Rate",
				currentBonus: 0,
			},
			woodDrop: {
				name: "Wood Drop Rate",
				currentBonus: 0,
			},
			gemsDrop: {
				name: "Gem Drop Rate",
				currentBonus: 0,
			},
			fragmentsDrop: {
				name: "Fragment Drop Rate",
				currentBonus: 0,
			},
			FarmerSpeed: {
				name: "Farmer Efficiency",
				currentBonus: 0,
			},
			LumberjackSpeed: {
				name: "Lumberjack Efficiency",
				currentBonus: 0,
			},
			MinerSpeed: {
				name: "Miner Efficiency",
				currentBonus: 0,
			},
			DragimpSpeed: {
				name: "Dragimp Efficiency",
				currentBonus: 0,
			},
			ExplorerSpeed: {
				name: "Explorer Efficiency",
				currentBonus: 0,
			},
			ScientistSpeed: {
				name: "Scientist Efficiency",
				currentBonus: 0,
			},
			FluffyExp: {
				heirloopy: true,
				get name(){
					return "Pet (" + Fluffy.getName() + ") Exp";
				},
				currentBonus: 0,
				steps: [-1, -1, -1, -1, -1, -1, -1, -1, [25, 50, 1],[50,100,1],[75,200,1],[124,400,1.2]]
			},
			ParityPower: {
				name: "Parity Power",
				currentBonus: 0,
				steps: [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,[200,500,10]]
			},
			empty: {
				name: "Empty",
				currentBonus: 0,
			}
		},
		Shield: {
			playerEfficiency: {
				name: "Player Efficiency",
				currentBonus: 0,
				steps: [[8,16,1],[8,16,1],[8,16,1],[16,32,2],[32,64,4],[64,128,8],[128,256,16],[256,512,32],[512,1024,64],[1024,2048,128],[2048,4096,256],[4096,8192,512]]
			},
			trainerEfficiency: {
				name: "Trainer Efficiency",
				currentBonus: 0,
				steps: [[10,20,1],[10,20,1],[10,20,1],[20,40,2],[40,60,2],[60,80,2],[80,100,2],[100,120,2],[120,140,2],-1,-1,-1]
			},
			storageSize: {
				name: "Storage Size",
				currentBonus: 0,
				steps: [[32,64,4],[32,64,4],[32,64,4],[64,128,4],[128,256,8],[256,512,16],[512,768,16],[768,1024,16],[1024,1280,16],-1,-1,-1]
			},
			breedSpeed: {
				name: "Breed Speed",
				currentBonus: 0,
				steps: [[5,10,1],[5,10,1],[5,10,1],[10,20,1],[70,100,3],[100,130,3],[130,160,3],[160,190,3],[190,220,3],[220,280,5],[260, 360, 10],[300,400,10]]
			},
			trimpHealth: {
				name: "Trimp Health",
				currentBonus: 0,
				steps: [[6,20,2],[6,20,2],[6,20,2],[20,40,2],[50,100,5],[100,150,5],[150,200,5],[200,260,6],[260,356,8],[360,460,10],[600,750,10],[800,1100,20]]
			},
			trimpAttack: {
				name: "Trimp Attack",
				currentBonus: 0,
				steps: [[6,20,2],[6,20,2],[6,20,2],[20,40,2],[50,100,5],[100,150,5],[150,200,5],[200,260,6],[260,356,8],[360,460,10],[600,750,10],[800,1100,20]]
			},
			trimpBlock: {
				name: "Trimp Block",
				currentBonus: 0,
				steps: [[4,7,1],[4,7,1],[4,7,1],[7,10,1],[28,40,1],[48,60,1],[68,80,1],[88,100,1],[108,120,1],-1,-1,-1]
			},
			critDamage: {
				name: "Crit Damage, additive",
				currentBonus: 0,
				steps: [[40,60,5],[40,60,5],[40,60,5],[60,100,5],[100,200,10],[200,300,10],[300,400,10],[400,500,10],[500,650,15],[650,850,20],[850,1100,25],[1100,1700,50]],
				filter: function () {
					return (!game.portal.Relentlessness.locked);
				}
			},
			critChance: {
				name: "Crit Chance, additive",
				currentBonus: 0,
				heirloopy: true,
				steps: [[1.4,2.6,0.2],[1.4,2.6,0.2],[1.4,2.6,0.2],[2.6,5,0.2],[5,7.4,0.2],[7.4,9.8,0.2],[9.8,12.2,0.2],[12.3,15.9,0.3],[20,30,0.5],[30,50,0.5],[50,80,0.25],[80,95,0.3]],
				filter: function () {
					return (!game.portal.Relentlessness.locked);
				},
				max: [30,30,30,30,30,30,30,30,100,125,200,260]
			},
			voidMaps: {
				name: "Void Map Drop Chance",
				currentBonus: 0,
				heirloopy: true,
				specialDescription: function(modifier){
					return "*Void Map Drop Chance on Hazardous and higher Heirlooms has a lower percentage than previous Heirloom tiers, but also causes 1 extra Void Map to drop every 10th zone you clear."
				},
				steps: [[5,7,0.5],[5,7,0.5],[5,7,0.5],[8,11,0.5],[12,16,0.5],[17,22,0.5],[24,30,0.5],[32,38,0.5],[40,50,0.25],[50,60,0.25],[5,7,0.1],[8,12,0.1]],
				max: [50,50,50,50,50,50,50,50,80,99,40,50]
			},
			plaguebringer: {
				name: "Plaguebringer",
				currentBonus: 0,
				heirloopy: true,
				specialDescription: function (modifier) {
					return modifier + "% of all non-lethal damage and nature stacks you afflict on your current enemy are copied onto the next enemy. Plaguebringer damage cannot bring an enemy below 5% health, but nature stacks will continue to accumulate."
				},
				steps: [-1, -1, -1, -1, -1, -1, -1, -1, [1, 15, 0.5],[15,30,0.5],[30,45,0.5],[40,50,0.5]],
				max: [0,0,0,0,0,0,0,0,75,100,125,150]
			},
			prismatic: {
				name: "Prismatic Shield",
				currentBonus: 0,
				noScaleU2: true,
				specialDescription: function(){
					return "ADDS this amount on to your total Prismatic Shield. This modifier can only function in the Radon Universe."
				},
				steps: [-1,-1,-1,-1,-1,-1, -1,-1,-1,[10,50,1],[10,40,1],[30,60,2]],
				max:[0,0,0,0,0,0,0,0,0,250,500,750]
			},
			gammaBurst: {
				name: "Gamma Burst",
				currentBonus: 0,
				stacks: 0,
				specialDescription: function(modifier){
					return "Each attack by your Trimps adds 1 stack of Charging. When Charging reaches 5 stacks, your Trimps will release a burst of energy, dealing " + prettify(modifier) + "% of their attack damage. Stacks reset after releasing a Burst or when your Trimps die.";
				},
				steps: [-1,-1,-1,-1,-1,-1, -1,-1,-1,[1000,2000,100],-1,-1],
			},
			inequality: {
				name: "Inequality",
				currentBonus: 0,
				specialDescription: function(){
					return "Reduces the Equality penalty on your Trimps by this amount without changing Enemy reduction.";
				},
				steps: [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,[50,200,0.25]],
				max:[0,0,0,0,0,0,0,0,0,0,0,400]
			},
			empty: {
				name: "Empty",
				currentBonus: 0,
				rarity: 1
			}
		}

	},
	trimpDeathTexts: ["ceased to be", "bit the dust", "took a dirt nap", "expired", "kicked the bucket", "evaporated", "needed more armor", "exploded", "melted", "fell over", "swam the river Styx", "turned into jerky", "forgot to put armor on", "croaked", "flatlined", "won't follow you to battle again", "died. Lame", "lagged out", "imp-loded"],
	badGuyDeathTexts: ["slew", "killed", "destroyed", "extinguished", "liquidated", "vaporized", "demolished", "ruined", "wrecked", "obliterated"],

	settings: {
		speed: 10,
		speedTemp: 0,
		slowdown: false,
                ewma_alpha: 0.05,
                ewma_ticks: 10, // 1 second
	},

	resources: {
		food: {
			owned: 0,
			max: 500
		},
		wood: {
			owned: 0,
			max: 500
		},
		metal: {
			owned: 0,
			max: 500
		},
		trimps: {
			owned: 0,
			max: 10,
			maxMod: 1,
			realMax: function () {
				//Mirror any changes here to canCommitCarpentry to check leveltemps
				var num = this.max;
				if (game.global.challengeActive == "Downsize"){
					num = game.global.totalGifts + game.unlocks.impCount.TauntimpAdded + 10;
					num += countTotalHousingBuildings();
				}
				num *= this.maxMod;
				if (getPerkLevel("Carpentry") > 0) num = Math.floor(num * (Math.pow(1 + game.portal.Carpentry.modifier, getPerkLevel("Carpentry"))));
				if (getPerkLevel("Carpentry_II") > 0) num = Math.floor(num * (1 + (game.portal.Carpentry_II.modifier * getPerkLevel("Carpentry_II"))));
				num = Math.floor(num * alchObj.getPotionEffect("Elixir of Crafting"));
				if (autoBattle.bonuses.Scaffolding.level > 0) num = Math.floor(num * autoBattle.bonuses.Scaffolding.getMult());
				return num;
			},
			working: 0,
			speed: 5,
			get employed () {
				var total = 0;
				for (var job in game.jobs) {
					total += game.jobs[job].owned;
				}
				total -= game.jobs.Dragimp.owned;
				return total;
			},
			set employed (value) {
				console.warn('employed is now a getter, and does not need to be set');
				return;
			},
			soldiers: 0,
			maxSoldiers: 1,
			getCurrentSend: function (checkLevelTemp) {
				var amt = (getPerkLevel("Coordinated")) ? ((checkLevelTemp) ? game.portal.Coordinated.onChange(true) : game.portal.Coordinated.currentSend) : game.resources.trimps.maxSoldiers;
				if (game.jobs.Amalgamator.owned > 0) {
					amt *= game.jobs.Amalgamator.getPopulationMult();
				}
				return amt;
			},
			potency: 0.0085
		},
		science: {
			owned: 0,
			max: -1
		},
		gems: {
			owned: 0,
			max: -1
		},
		fragments: {
			owned: 0,
			max: -1
		},
		helium: {
			owned: 0,
			max: -1
		},
		radon: {
			owned: 0,
			max: -1
		}
	},
	equipment: {
		Shield: {
			locked: 1,
			tooltip: "A big, wooden shield. Adds $healthCalculated$ health to each soldier per level.",
			blocktip: "A big, wooden shield. Adds $blockCalculated$ block to each soldier per level.",
			modifier: 1,
			level: 0,
			cost: {
				wood: [40, 1.2]
			},
			oc: 40,
			health: 4,
			healthCalculated: 4,
			blockNow: false,
			block: 1.5,
			blockCalculated: 1.5,
			prestige: 1
		},
		Dagger: {
			locked: 1,
			tooltip: "Better than nothing. Adds $attackCalculated$ attack to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [40, 1.2]
			},
			oc: 40,
			attack: 2,
			attackCalculated: 2,
			prestige: 1
		},
		Boots: {
			locked: 1,
			tooltip: "At least their feet will be safe. Adds $healthCalculated$ health to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [55, 1.2]
			},
			oc: 55,
			health: 6,
			healthCalculated: 6,
			prestige: 1
		},
		//2
		Mace: {
			locked: 1,
			tooltip: "It's kind of heavy for your Trimps, but they'll manage. Adds $attackCalculated$ attack to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [80, 1.2]
			},
			oc: 80,
			attack: 3,
			attackCalculated: 3,
			prestige: 1
		},
		Helmet: {
			locked: 1,
			tooltip: "Provides a decent amount of protection to the Trimps' heads, adding $healthCalculated$ health to each soldier per level.",
			modifier: 1,
			level: 0,
			cost: {
				metal: [100, 1.2]
			},
			oc: 100,
			health: 10,
			healthCalculated: 10,
			prestige: 1
		},
		//3
		Polearm: {
			locked: 1,
			tooltip: "This thing is big and pointy. It adds $attackCalculated$ attack to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [140, 1.2]
			},
			oc: 140,
			attack: 4,
			attackCalculated: 4,
			prestige: 1
		},
		Pants: {
			locked: 1,
			tooltip: "Pants designed specificially for the little Trimps! Adds $healthCalculated$ health to each soldier per level.",
			modifier: 1,
			level: 0,
			cost: {
				metal: [160, 1.2]
			},
			oc: 160,
			health: 14,
			healthCalculated: 14,
			prestige: 1
		},
		//4
		Battleaxe: {
			locked: 1,
			tooltip: "This weapon is pretty intimidating, but your Trimps think they can handle it. Adds $attackCalculated$ attack to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [230, 1.2]
			},
			oc: 230,
			attack: 7,
			attackCalculated: 7,
			prestige: 1
		},
		Shoulderguards: {
			locked: 1,
			tooltip: "These shoulderguards will help keep your Trimps' necks and shoulders safe, and they look cool too. Adds $healthCalculated$ health to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [275, 1.2]
			},
			oc: 275,
			health: 23,
			healthCalculated: 23,
			prestige: 1
		},
		//5
		Greatsword: {
			locked: 1,
			tooltip: "This sword looks sweet. Seriously, if you could see it you'd think it looked sweet. Trust me. Adds $attackCalculated$ attack to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [375, 1.2]
			},
			oc: 375,
			attack: 9,
			attackCalculated: 9,
			prestige: 1
		},
		Breastplate: {
			locked: 1,
			tooltip: "Some real, heavy duty armor. Everyone looks badass in heavy duty armor. Adds $healthCalculated$ health to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [415, 1.2]
			},
			oc: 415,
			health: 35,
			healthCalculated: 35,
			prestige: 1
		},
		Arbalest: {
			locked: 1,
			tooltip: "A powerful ranged weapon. Your Trimps can do some damage with this sucker. Adds $attackCalculated$ attack to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [450, 1.2]
			},
			oc: 450,
			attack: 15,
			attackCalculated: 15,
			prestige: 1
		},
		Gambeson: {
			locked: 1,
			tooltip: "A cozy and thick padded jacket that goes under the breastplate. Your Trimps think they're great! Adds $healthCalculated$ health to each soldier per level.",
			modifier: 1,
			level: 0,
			cost: {
				metal: [500, 1.2]
			},
			oc: 500,
			health: 60,
			healthCalculated: 60,
			prestige: 1
		}
	},

	badGuys: {
		Liquimp: {
			location: "None",
			locked: 1,
			attack: 3,
			health: 200,
			fast: true,
			loot: function () {
				rewardLiquidZone();
			}
		},
		//Special Mobs for Exterminate
		Arachnimp: {
			location: "Exterminate",
			locked: 0,
			attack: 3e3,
			health: 0.1,
			fast: true,
			loot: function(){
				game.challenges.Exterminate.killedBug();
			}
		},
		Beetlimp: {
			location: "Exterminate",
			locked: 0,
			attack: 1e3,
			health: 0.2,
			fast: true,
			loot: function(){
				game.challenges.Exterminate.killedBug();
			}
		},
		Mantimp: {
			location: "Exterminate",
			locked: 0,
			attack: 3e3,
			health: 0.1,
			fast: true,
			loot: function(){
				game.challenges.Exterminate.killedBug();
			}
		},
		Butterflimp: {
			location: "Exterminate",
			locked: 0,
			attack: 2e3,
			health: 0.1,
			fast: true,
			loot: function(){
				game.challenges.Exterminate.killedBug();
			}
		},
		//Special Mob for Insanity
		Horrimp: {
			location: "None",
			locked: 1,
			attack: 15,
			health: 60,
			fast: true,
			loot: function(){
				game.challenges.Insanity.addStack();
			}
		},
		Presimpt: {
			location: "World",
			get locked(){
				return (holidayObj.checkActive("Snowy") ? 0 : 1);
			},
			attack: 1.1,
			health: 1.5,
			fast: false,
			loot: function () {
				//Happy Politically Correct Holidays, everyone!
				givePresimptLoot();
			}
		},
		Turkimp: {
			location: "World",
			locked: 1,
			attack: 1,
			health: 1.6,
			fast: false,
			loot: function () {
				//Happy Thanksgiving and stuff.
				//Also, happy post thanksgiving and stuff.
				//Also, happy normal days now I guess
				activateTurkimpPowers();
			}
		},
		Magimp: {
			location: "All",
			//Renamed from magimp to randimp to prevent confusion with magnimp
			displayName: "Randimp",
			locked: 1,
			attack: 1, 
			health: 1,
			fast: false,
			loot: function(level){
				var imports = [];
				for (var item in game.unlocks.imps){
					var badGuy = game.badGuys[item];
					if (((game.global.mapsActive && badGuy.location == "Maps") || (!game.global.mapsActive && badGuy.location == "World")) && badGuy.world <= game.global.world){
						imports.push(item);
					}
				}
				var enemySeed = (game.global.mapsActive) ? Math.floor(Math.random() * 10000000) : game.global.enemySeed++;
				var selected = imports[getRandomIntSeeded(enemySeed, 0, imports.length)];
				game.badGuys[selected].loot(level, true);
			}
		},
		Pumpkimp: {
			location: "Maps",
			get locked(){
				return (holidayObj.checkActive("Pumpkimp") ? 0 : 1);
			},
			attack: 0.9,
			health: 1.5,
			fast: false,
			loot: function () {
				//Happy Halloween and stuff.
				givePumpkimpLoot();
			}
		},
		Squimp: {
			location: "All",
			attack: 0.8,
			health: 0.7,
			fast: true
		},
		Elephimp: {
			location: "All",
			attack: 0.9,
			health: 1.3,
			fast: false
		},
		Turtlimp: {
			location: "All",
			attack: 0.9,
			health: 1.3,
			fast: false
		},
		Chimp: {
			location: "All",
			attack: 1,
			health: 1,
			fast: false
		},
		Penguimp: {
			location: "All",
			attack: 1.1,
			health: 0.7,
			fast: false
		},
		Snimp: {
			location: "All",
			attack: 1.05,
			health: 0.8,
			fast: true
		},
		Gorillimp: {
			location: "All",
			attack: 0.9,
			health: 1.1,
			fast: true
		},
		Shrimp: {
			location: "Sea",
			attack: 0.8,
			health: 0.9,
			fast: true
		},
		Mountimp: {
			location: "Mountain",
			attack: 0.5,
			health: 2,
			fast: false
		},
		Frimp: {
			location: "Forest",
			attack: 0.75,
			health: 1.2,
			fast: true
		},
		Chickimp: {
			location: "Sea",
			attack: 0.8,
			health: 1.1,
			fast: true,
			loot: function (level) {
				var amt = rewardResource("food", 0.5, level, true);
				message("That Chickimp dropped " + prettify(amt) + " food!", "Loot", "apple", null, 'primary');
			}
		},
		Hippopotamimp: {
		   location: "Sea",
		   attack: 1.4,
		   health: 1.1,
		   fast: false
		},
		Onoudidimp: {
			location: "Mountain",
			attack: 0.8,
			health: 1.4,
			fast: false
		},
		//Honorary Imps
		Kittimp: {
			//Designed by K1d_5h31d0n
			location: "Forest",
			location2: "Mountain",
			attack: 1,
			health: 0.85,
			fast: true,
			loot: function (level) {
				var amt = rewardResource("food", 0.5, level, true);
				message("You hear nearby Kittimps running away in fear and decide to check out their former home. There, you find a prey pile with " + prettify(amt) + " food!", "Loot", "apple", null, 'primary');
			}
		},
		Grimp: {
			//Designed by Grabarz
			location: "Forest",
			attack: 1.1,
			health: 1.5,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("wood", 0.5, level, true);
				message("That Grimp dropped " + prettify(amt) + " wood!", "Loot", "tree-deciduous", null, 'primary');
			}
		},
		Golimp: {
			//Designed by Syc_Golem
			location: "Depths",
			attack: 1.2,
			health: 1.4,
			fast: false,
			loot: function (level) {
				var random = Math.floor(Math.random() * 5);
				var amt;
				var res;
				var icon;
				var tag;
				if (random === 0) {
					amt = rewardResource("fragments", 1, level, true);
					res = "fragments";
					icon = "th";
					tag = "secondary";
				}
				else {
					amt = rewardResource("metal", 0.3, level, true);
					res = "bars of metal";
					icon = "*cubes";
					tag = "primary";
				}
				message("The Golimp fell to pieces! You manage to grab " + prettify(amt) + " " + res + " before it begins pulling itself together.", "Loot", icon, null, tag);
			}
		},
		Seirimp: {
			//Designed by Seiyria
			location: "Mountain",
			attack: 1.15,
			health: 1.4,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("metal", 0.5, level, true);
				message("That Seirimp dropped " + prettify(amt) + " metal! Neat-O.", "Loot", "*cubes", null, 'primary');
			}
		},
		Slagimp: {
			location: "Depths",
			attack: 0.9,
			health: 1,
			fast: true,
			loot: function (level) {
				var amt = rewardResource("gems", 0.3, level, true);
				message("That Slagimp fell over, and " + prettify(amt) + " gems popped out! How about that?!", "Loot", "*diamond", null, 'secondary');
			}
		},
		Moltimp: {
			location: "Depths",
			attack: 1.2,
			health: 0.7,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("metal", 0.2, level, true);
				message("The Moltimp thanked you for the combat, and handed you " + prettify(amt) + " bars of metal! Then he died.", "Loot", "*cubes", null, 'primary');
			}
		},
		Lavimp: {
			location: "Depths",
			attack: 1,
			health: 0.8,
			fast: true
		},
		Flowimp: {
			location: "Plentiful",
			attack: 1.3,
			health: 0.95,
			fast: false
		},
		Kangarimp: {
			location: "Plentiful",
			attack: 0.95,
			health: 0.95,
			fast: true
		},
		Gnomimp: {
			location: "Plentiful",
			attack: 0.8,
			health: 1,
			fast: false
		},
		Slosnimp: {
			location: "Plentiful",
			attack: 1.05,
			health: 0.8,
			fast: false
		},
		Entimp: {
			location: "Plentiful",
			attack: 0.6,
			health: 1.3,
			fast: true,
			loot: function (level) {
				var amt = rewardResource("wood", 0.35, level, true);
				message("The Entimp is no more. You manage to salvage " + prettify(amt) + " logs of wood from his trunk!", "Loot", "tree-deciduous", null, 'primary');
			}
		},
		Squirrimp: {
			location: "Plentiful",
			attack: 1,
			health: 1.1,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("food", 0.35, level, true);
				message("Time for some stew! You scored " + prettify(amt) + " food from that Squirrimp!", "Loot", "apple", null, 'primary');
			}
		},
		Gravelimp: {
			location: "Plentiful",
			attack: 0.8,
			health: 1.4,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("metal", 0.35, level, true);
				message("You sift through the Gravelimp, and manage to find " + prettify(amt) + " bars of metal! Good on you!", "Loot", "*cubes", null, 'primary');
			}
		},
		Blimp: {
			location: "World",
			last: true,
			world: 5,
			attack: 1.2,
			health: 2,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("food", 2, level);
				rewardResource("wood", 2, level);
				rewardResource("metal", 2, level);
				message("That Blimp dropped " + prettify(amt) + " Food, Wood and Metal! That should be useful.", "Loot", "piggy-bank", null, 'primary');
				if (game.global.runningChallengeSquared) return;
				var minLevel = (game.global.universe == 2) ? 16 : 21;
				if (game.global.world >= minLevel && (getTotalPortals() >= 1 || game.global.portalActive)){
					if (game.resources.helium.owned == 0) fadeIn("helium", 10);
					amt = 1;
					if (game.global.challengeActive == "Domination") amt *= 3;
					amt = rewardResource("helium", amt, level);
					message("You were able to extract " + prettify(amt) + " " + heliumOrRadon(true) + "s from that Blimp!", "Loot", heliumIcon(true), "helium", "helium");
					if (game.global.world >= 40 && game.global.challengeActive == "Balance") {
						game.challenges.Balance.onComplete();
					}
				}
			}
		},
		Cthulimp: {
			location: "Void",
			last: true,
			world: 6,
			attack: 2,
			health: 5,
			fast: true,
			loot: function (level, fromFluffy, fluffyCount) {
				// if (game.global.challengeActive == "Alchemy" && !game.global.alchemyUnlocked && game.global.world == 155 && alchObj.getPotionCount("Potion of the Void") == 0 && alchObj.getPotionCount("Gaseous Brew") >= 15){
				// 	game.global.alchemyUnlocked = true;
				// 	message("You have successfully cleared a Z155 Void Map on Alchemy with " + alchObj.getPotionCount("Gaseous Brew") + " Gaseous Brews and no Potions of the Void! The Void recognizes your superiority, and has granted you the ability to use Alchemy in any dimension of this Universe.", "Notices");
				// }
				if (game.global.universe == 2) autoBattle.completedVoidMap(game.global.world);
				if (game.global.challengeActive == "Alchemy" && game.global.world == 155 && alchObj.getPotionCount('Gaseous Brew') >= 10 && alchObj.getPotionCount('Potion of the Void') == 0) giveSingleAchieve("Mad Scientist");
				if (game.resources.helium.owned == 0) fadeIn("helium", 10);
				var amt = (game.global.world >= 60 && game.global.universe == 1) ? 10 : 2;
				if (mutations.Magma.active()) amt *= 3;
				if (game.global.challengeActive == "Domination"){
					amt *= 3;
					if (game.global.world == 215) giveSingleAchieve("Fhtagn");
				}
				var percentage = 1;
				var rewardPercent = 1;
				if (game.global.universe == 1 && game.global.world >= mutations.Corruption.start(true)){
					rewardPercent = 2;
					percentage = (game.global.challengeActive == "Corrupted") ? 0.075 : 0.15;
					var corrCount = mutations.Corruption.cellCount();
					if (mutations.Healthy.active()) corrCount -= mutations.Healthy.cellCount();
					percentage *= corrCount;
					if (mutations.Healthy.active()){
						var healthyValue = (game.talents.healthStrength2.purchased) ? 0.65 : 0.45;
						amt *= ((mutations.Healthy.cellCount() * healthyValue) + percentage + 1);
					}
					else {
						amt *= (percentage + 1);
					}
				}
				if (game.talents.voidSpecial.purchased){
					amt *= ((getLastPortal() * 0.0025) + 1);
				}

				var fluffyBonus = 1;
				if (fromFluffy){
					var maxFloof = Fluffy.getVoidStackCount() - 1;
					var countFloof = (fluffyCount > maxFloof) ? maxFloof : fluffyCount;
					if (game.talents.voidMastery.purchased){
						fluffyBonus = Math.pow(1.5, countFloof);
					}
					else{
						fluffyBonus = (1 + (0.5 * countFloof));
					}
					amt *= fluffyBonus;
					amt *= fluffyCount;
				}
				var bonusMagmite = 10;
				if (fluffyCount) bonusMagmite *= fluffyCount;
				if (game.talents.quickGen.purchased && game.global.world >= 230 && game.global.universe == 1){
					game.global.magmite += bonusMagmite;
					updateGeneratorInfo();
				}
				if (game.talents.scry2.purchased && game.global.canScryCache) amt *= 1.5;

				//Void map helium modifiers above here
				
				if (game.global.runningChallengeSquared)
					amt = 0;
				else
					amt = rewardResource("helium", amt, level, false, rewardPercent);
				
				game.stats.highestVoidMap.evaluate();
				game.stats.totalVoidMaps.value += (fromFluffy && fluffyCount) ? fluffyCount : 1;
				var msg = "Cthulimp and the map it came from crumble into the darkness. You find yourself instantly teleported to ";				
				if (fromFluffy && fluffyCount == 1){
					msg = "Before you even realized you were in a new Void Map, Fluffy snuck to the end and quickly stole all the loot.";
					if (!game.global.runningChallengeSquared) msg += " You gained another " + prettify(amt) + " " + heliumOrRadon() + "!";
					message(msg, "Loot", heliumIcon(true), "helium", "helium");
					return;
				}
				else if (fromFluffy){
					msg = "Before you even realize what's happening, " + Fluffy.getName() + " has entered and cleared the remaining " + fluffyCount + " Void Maps and quickly stole all the loot!";
					if (!game.global.runningChallengeSquared) msg += " After earning a bonus on each of +" + prettify((fluffyBonus - 1) * 100) + "% " + heliumOrRadon() + ", you've earned an additional " + prettify(amt) + " " + heliumOrRadon() + "!";
					message(msg, "Loot", heliumIcon(true), "helium", "helium");
					return;
				}
				if (game.options.menu.repeatVoids.enabled && game.global.totalVoidMaps > 1){
					msg += "the next Void map";
				}
				else {
					msg += ((game.options.menu.exitTo.enabled) ? "the world " : "your map chamber");
				}
				if (game.global.runningChallengeSquared) msg += ".";
				else msg += " with an extra " + prettify(amt) + " " + heliumOrRadon() + "!";
				message(msg, "Loot", heliumIcon(true), "helium", "helium");
				
			}
		},
		Shadimp: {
			location: "Void",
			world: 6,
			attack: 1.2,
			health: 1.3,
			fast: true
		},
		Voidsnimp: {
			location: "Void",
			world: 6,
			attack: 2.1,
			health: 0.5,
			fast: true
		},
		Megablimp: {
			location: "Hell",
			last: true,
			world: 15,
			attack: 1.1,
			health: 4,
			fast: false,
			loot: function (level) {
				checkAchieve("angerTimed");
				if (game.upgrades.Bounty.done == 0) giveSingleAchieve("Forgot Something");
			}
		},
		Dragimp: {
			location: "World",
			world: 17,
			attack: 1,
			health: 1.5,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("gems", 0.35, level, false);
				message("That Dragimp dropped " + prettify(amt) + " gems!", "Loot", "*diamond", null, 'secondary');
			}
		},
		Mitschimp: {
			location: "Block",
			last: true,
			world: 10,
			attack: 1.2,
			health: 2.5,
			fast: false,
			loot: function (level) {
				checkAchieve("blockTimed");
				var amt = rewardResource("wood", 2, level, true);
				message("Mitschimp dropped " + prettify(amt) + " wood!", "Loot", "tree-deciduous", null, 'primary');
			}
		},
		Brickimp: {
			location: "Wall",
			last: true,
			world: 7,
			attack: 1.2,
			health: 2.5,
			fast: false,
			loot: function (level) {
				if (game.global.universe == 1)
					checkAchieve("wallTimed")
				else if (game.global.universe == 2)
					checkAchieve("bigWallTimed");
			}
		},
		Prismimp: {
			location: "Prismatic",
			world: 20,
			attack: 1.3,
			health: 2,
			fast: true,
			loot: function(level){
				var amt = rewardResource("gems", 1, level, true);
				message("That Prismimp dropped " + prettify(amt) + " gems, how sweet of it!", "Loot", "*diamond", null, 'secondary');
			}
		},
		Rainbimp: {
			location: "Prismatic",
			world: 20,
			attack: 2,
			health: 4,
			fast: false,
			loot: function(level){
				var amt = rewardResource("gems", 4, level, true);
				message("You feel bad about slaying an incredibly rare Rainbimp, but at least he dropped " + prettify(amt) + " gems! Totally worth.", "Loot", "*diamond", null, 'secondary');	
			}
		},
		Lightimp: {
			location: "Prismatic",
			world: 20,
			attack: 3,
			health: 6,
			fast: false,
			last: true,
			loot: function(level){
				var amt = rewardResource("gems", 6, level, true);
				message("The Lightimp's light floats up and away, unbothered by the fact that you just killed its body. Since it doesn't want the body anymore, you break it down in to " + prettify(amt) + " gems!", "Loot", "*diamond", null, 'secondary');
				checkAchieve("palaceTimed");
			}
		},
		Meltimp: {
			location: "Melting",
			world: 50,
			attack: 3,
			health: 6,
			fast: false,
			last: true,
			loot: function(level){
				var amt = rewardResource("metal", 5, level, true);
				message("What a surprise, the Meltimp is melting! You find a healthy stack of " + prettify(amt) + " metal where it used to be!", "Loot", "*cubes", null, 'primary');
				checkAchieve("meltingTimed");
			}
		},
		Sweltimp: {
			location: "Melting",
			world: 50,
			attack: 1.3,
			health: 2,
			fast: true,
			loot: function(level){
				var amt = rewardResource("metal", 2, level, true);
				message("That Sweltimp chucked " + prettify(amt) + " bars of metal right at your head! You'll take it though, thanks guy!", "Loot", "*cubes", null, 'primary');
			}
		},
		Indianimp: {
			location: "Doom",
			last: true,
			world: 33,
			attack: 1.07,
			health: 0.9,
			fast: true,
			loot: function (level) {
				checkAchieve("doomTimed");
				var amt = rewardResource("metal", 2, level, true);
				message("Indianimp dropped " + prettify(amt) + " metal!", "Loot", "*cubes", null, 'primary');
				if (game.global.runningChallengeSquared) return;
				if (game.global.challengeActive == "Trapper"){
					game.challenges.Trapper.onComplete();
				}
				if (game.global.challengeActive == "Meditate"){
					game.challenges.Meditate.onComplete();
				}
			}
		},
		Poseidimp: {
			location: "Atlantis",
			last: true,
			world: 33,
			attack: 1.25,
			health: 2,
			fast: true,
			loot: function (level) {
				checkAchieve("atlantrimpTimed");
				var amt = rewardResource("food", 2, level, true);
				var text = "Poseidimp explodes into a swirling tornado of fish and aquatic life. You catch some of it and bring back " + prettify(amt) + " Food!";
				message(text, "Loot", "apple", null, 'primary');
			}
		},
		Warden: {
			location: "Prison",
			last: true,
			world: 80,
			attack: 2,
			health: 3,
			fast: false,
			loot: function (level) {
				checkAchieve("prisonTimed");
				if (game.global.runningChallengeSquared) return;
				if (game.global.challengeActive == "Electricity" || game.global.challengeActive == "Mapocalypse") {
					game.challenges[game.global.challengeActive].onComplete();
				}
			}
		},
		//Putting Bionic Wonderland stuff right.... here cause why not
		Robotrimp: {
			location: "Bionic",
			last: true,
			world: 125,
			attack: 2.1,
			health: 2.9,
			fast: false,
			loot: function (level) {
				var mapLevel = game.global.mapsOwnedArray[getMapIndex(game.global.currentMapId)].level;
				if (mapLevel >= game.global.world + 45) giveSingleAchieve("Bionic Sniper");
				if (mapLevel >= game.global.world + 200) giveSingleAchieve("Bionic Nuker");
				if (game.global.challengeActive == "Experience" && mapLevel >= 605 && game.global.world > 600) game.challenges.Experience.onComplete(mapLevel);
				checkAchieve("bionicTimed");
				var amt1 = rewardResource("wood", 1, level, true);
				var amt2 = rewardResource("food", 1, level, true);
				message("Robotrimp discombobulated. Loot inspection reveals: " + prettify(amt1) + " wood and " + prettify(amt2) + " food. Splendiferous.", "Loot", "*cogs", null, 'primary');
				if (game.global.challengeActive == "Crushed") {
					game.challenges.Crushed.onComplete();
				}
			}
		},
		Mechimp: {
			location: "Bionic",
			world: 125,
			attack: 1,
			health: 1.5,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("metal", .25, level, true);
				message("Mechimp disengaged. Reward encountered: " + prettify(amt) + " bars of metal. Huzzah.", "Loot", "*cubes", null, 'primary');
			}
		},
		Destructimp: {
			location: "Bionic",
			world: 125,
			attack: 1.4,
			health: 0.8,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("metal", .25, level, true);
				message("Destructimp shorted out. Salvage results: " + prettify(amt) + " bars of metal. Acceptable.", "Loot", "*cubes", null, 'primary');
			}
		},
		Terminatimp: {
			location: "Bionic",
			world: 125,
			attack: 1.2,
			health: 1.2,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("metal", .25, level, true);
				message("Terminatimp Terminated. Findings: " + prettify(amt) + " bars of metal. Hasta la Vista.", "Loot", "*cubes", null, 'primary');
			}
		},
		Autoimp: {
			location: "Bionic",
			world: 125,
			attack: 1.4,
			health: 1.3,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("metal", .5, level, true);
				message("Autoimp force quit. Memory dump provides " + prettify(amt) + " bars of metal and no clues. It's a feature!", "Loot", "*cubes", null, 'primary');
			}
		},
		Artimp: {
			location: "Bionic",
			world: 125,
			attack: 1.3,
			health: 1.5,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("metal", 0.3, level, true);
				message("The Artimp wordlessly sputters, whirrs, beeps, then drops " + prettify(amt) + " perfect cubes of metal on the ground. Cubist art is your favorite!", "Loot", "*cubes", null, 'primary');
			}
		},
		//End Bionic Wonderland stuff
		//Start Imploding Star stuff
		Neutrimp: {
			location: "Star",
			last: true,
			world: 170,
			attack: 1.3,
			health: 2.5,
			fast: true,
			loot: function (level) {
				checkAchieve("starTimed");
				var amt1 = rewardResource("wood", 1.5, level, true);
				var amt2 = rewardResource("metal", 1.5, level, true);
				message("The Neutrimp gasps, shimmers, squeaks, then poofs into a quickly dispersing purple cloud. You spend a few moments trying to make sense of what you've just seen, but look around and find " + prettify(amt1) + " wood and " + prettify(amt2) + " metal instead!", "Loot", "*cogs", null, 'primary');
				if (game.global.challengeActive == "Devastation") {
					game.challenges.Devastation.onComplete();
				}
				if (game.global.challengeActive == "Obliterated"){
					giveSingleAchieve("Imploderated")
				}
			}
		},
		Fusimp: {
			location: "Star",
			world: 170,
			attack: 1.4,
			health: 1.8,
			fast: true,
			loot: function (level) {
				var amt = rewardResource("metal", .5, level, true);
				message("The Fusimp explodes, leaving behind " + prettify(amt) + " bars of metal and a nice dose of radiation.", "Loot", "*cubes", null, 'primary');
			}
		},
		Hydrogimp: {
			location: "Star",
			world: 170,
			attack: 1.8,
			health: 2.2,
			fast: false,
			loot: function (level) {
				var amt = rewardResource("food", 1, level, true);
				message("Before you can blink, the Hydrogimp vaporizes. That's fine though, it left " + prettify(amt) + " food for you!", "Loot", "apple", null, 'primary');
			}
		},
		Carbimp: {
			location: "Star",
			world: 170,
			attack: 1,
			health: 4,
			fast: true,
			loot: function (level) {
				var amt = rewardResource("wood", 1, level, true);
				message("The Carbimp begins to crackle and shrink. Within a few seconds, all that's left is " + prettify(amt) + " wood.", "Loot", "tree-deciduous", null, 'primary');
			}
		},
		//End Imploding Star stuff
		Improbability: {
			locked: 1,
			location: "World",
			last: true,
			world: 59,
			attack: 1.2,
			health: 6,
			fast: true,
			loot: function (level) {
				if (game.global.spireActive) return;
				if (!game.global.brokenPlanet && game.global.universe == 1) planetBreaker();
				if (game.global.runningChallengeSquared) return;
				var amt = (game.global.world >= mutations.Corruption.start(true)) ? 10 : 5;
				if (game.global.universe == 2) amt = 1;
				if (game.global.challengeActive == "Domination") amt *= 3;
				if (getTotalPortals() > 0 || game.global.portalActive){
					amt = rewardResource("helium", amt, level);
					message("You managed to steal " + prettify(amt) + " " + heliumOrRadon(true) + "s from that Improbability. That'll teach it.", "Loot", heliumIcon(true), 'helium', 'helium');
				}
				if (game.global.challengeActive == "Slow" && game.global.world == 120){
					game.challenges.Slow.onComplete();
				}
				else if ((game.global.challengeActive == "Life" && game.global.world == 110) || (game.global.challengeActive == "Nom" && game.global.world == 145) || (game.global.challengeActive == "Toxicity" && game.global.world == 165) || ((game.global.challengeActive == "Watch" || game.global.challengeActive == "Lead") && game.global.world >= 180) || (game.global.challengeActive == "Corrupted" && game.global.world >= 190) || (game.global.challengeActive == "Domination" && game.global.world >= 215)){
					var challenge = game.global.challengeActive;
					if (game.global.challengeActive == "Watch" && !game.challenges.Watch.enteredMap && game.buildings.Nursery.purchased == 0) giveSingleAchieve("Grindless");
					if (game.global.challengeActive == "Lead" && game.upgrades.Gigastation.done <= 1) giveSingleAchieve("Unsatisfied Customer");
					if (game.global.challengeActive == "Lead" && game.stats.battlesLost.value <= 100) giveSingleAchieve("Leadership");
					if (game.global.challengeActive == "Corrupted" && !game.challenges.Corrupted.hiredGenes && game.jobs.Geneticist.owned == 0) giveSingleAchieve("Organic Trimps");
					if (game.global.challengeActive == "Toxicity" && game.challenges.Toxicity.highestStacks <= 400) giveSingleAchieve("Trimp is Poison");
					if (game.global.challengeActive == "Life"){
						if (game.challenges.Life.lowestStacks == 150) giveSingleAchieve("Very Sneaky");
						game.challenges.Life.abandon();
					}
					var reward = (game.challenges[challenge].heliumMultiplier) ? game.challenges[challenge].heliumMultiplier : 2;
					reward = game.challenges[challenge].heldHelium * reward;
					message("You have completed the " + challenge + " challenge! You have been rewarded with " + prettify(reward) + " Helium, and you may repeat the challenge.", "Notices");
					game.challenges[challenge].heldHelium = 0;
					game.global.challengeActive = "";
					addHelium(reward);
					if (challenge == "Domination") game.challenges.Domination.abandon();
				}
				else if (game.global.challengeActive == "Mapology" && game.global.world == 100){
					game.challenges.Mapology.onComplete();
				}
			}
		},
		Omnipotrimp: {
			locked: 1,
			location: "World",
			last: true,
			world: 59,
			attack: 1.2,
			health: 6,
			fast: true,
			loot: function (level) {
				if (game.global.spireActive){
					return;
				}
				if (game.global.challengeActive == "Eradicated" && game.global.world >= 59 && !game.global.brokenPlanet) planetBreaker();
				if (!game.global.runningChallengeSquared){
					var amt = 30;
					amt = rewardResource("helium", amt, level);
					message("You managed to steal " + prettify(amt) + " " + heliumOrRadon(true) + " from that Omnipotrimp. That'll teach it.", "Loot", heliumIcon(true), 'helium', 'helium');
				}
				if (game.global.world % 5 == 0){
					message("The Omnipotrimp explodes, killing all of your soldiers!", "Combat", null, null, 'trimp');
					game.stats.trimpsKilled.value += game.resources.trimps.soldiers;
					game.global.soldierHealth = 0;
					game.global.fighting = false;
					game.resources.trimps.soldiers = 0;
					updateGoodBar();
				}
			}
		},
		Mutimp: {
			location: "World",
			locked: 1,
			attack: 3,
			health: 6,
			fast: true,
			loot: function (level) {
				amt = rewardResource("metal", 5, level);
				message("Radioactive waste spills to the ground as the Mutimp falls. You send a few Trimps to grab the shiny stuff in the toxic sludge, which ends up being " + prettify(amt) + " bars of metal!", "Loot", "*cubes", null, 'primary');
			}
		},
		Hulking_Mutimp: {
			location: "World",
			locked: 1,
			attack: 5,
			health: 12,
			fast: true,
			loot: function (level) {
				amt = rewardResource("metal", 8, level);
				message("Radioactive waste spills to the ground as the Hulking Mutimp falls. You send a few Trimps to grab the shiny stuff in the toxic sludge, which ends up being " + prettify(amt) + " bars of metal!", "Loot", "*cubes", null, 'primary');
			}
		},
		Darknimp: {
			location: "Darkness",
			locked: 0,
			last: true,
			fast: true,
			attack: 2,
			health: 3,
			world: 6,
			loot: function(){
				if (game.global.challengeActive == "Quagmire"){
					message("You have completed The Black Bog! 1 stack of Exhausted and Motivated have been removed from your Trimps.", "Notices");
					game.challenges.Quagmire.motivatedStacks--;
					game.challenges.Quagmire.exhaustedStacks--;
					if (game.challenges.Quagmire.motivatedStacks <= 0) game.challenges.Quagmire.abandon();
					else game.challenges.Quagmire.drawStacks();
				}
			}
		},
		Freezo: {
			location: "Frozen",
			locked: 0,
			last: true,
			fast: false,
			world: -1,
			attack: 3,
			health: 4,
			loot: function(){
				createHeirloom(null, false, false, true);
				var rarity = getHeirloomRarity(game.global.world, game.global.heirloomSeed, false, true);
				rarity = game.heirlooms.rarityNames[rarity];
				message("You have completed the Frozen Castle! The map has melted, but you managed to find a " + rarity + " Heirloom!", "Notices");			
				if (game.global.challengeActive == "Hypothermia") game.challenges.Hypothermia.onComplete();
			}
		},
		Frosnimp: {
			location: "Frozen",
			attack: 1.5,
			health: 1,
			fast: true
		},
		//Exotics
		Goblimp: {
			location: "Maps",
			locked: 1,
			world: 6,
			attack: 1,
			health: 1,
			dropDesc: "Drops 6x Gems",
			fast: false,
			loot: function (level, fromMagimp) {
				var name = (fromMagimp) ? "Randimp" : "Goblimp";
				var amt = rewardResource("gems", 3, level, true);
				message("That " + name + " dropped " + prettify(amt) + " gems! What a bro!", "Loot", "*diamond", "exotic", 'exotic');
				game.unlocks.impCount.Goblimp++;
			}
		},
		Feyimp: {
			location: "World",
			locked: 1,
			world: 1,
			attack: 1,
			health: 1,
			dropDesc: "Drops 15x Gems",
			fast: false,
			loot: function (level, fromMagimp) {
				var name = (fromMagimp) ? "Randimp" : "Feyimp";
				if (game.resources.gems.owned == 0) fadeIn("gems", 10);
				var amt = rewardResource("gems", 7.5, level);
				message("That " + name + " gave you " + prettify(amt) + " gems! Thanks " + name + "!", "Loot", "*diamond", "exotic", "exotic");
				game.unlocks.impCount.Feyimp++;
			}
		},
		Flutimp: {
			location: "Maps",
			locked: 1,
			world: 6,
			attack: 1,
			health: 1,
			fast: false,
			dropDesc: "Drops Fragments",
			loot: function (level, fromMagimp) {
				var name = (fromMagimp) ? "Randimp" : "Flutimp";
				var amt = rewardResource("fragments", 1, level, true);
				message("You stole " + prettify(amt) + " fragments from that " + name + "! It really didn't look like she needed them though, don't feel bad.", "Loot", "th", "exotic", "exotic");
				game.unlocks.impCount.Flutimp++;
			}
		},
		Tauntimp: {
			location: "World",
			locked: 1,
			world: 1,
			attack: 1,
			health: 1,
			fast: false,
			dropDesc: "Grants an extra 0.3% of current Trimps",
			loot: function (level, fromMagimp) {
				var name = (fromMagimp) ? "Randimp" : "Tauntimp";
				var amt = Math.ceil(game.resources.trimps.max * 0.003);
				if (game.global.challengeActive == "Downsize"){
					amt = game.global.totalGifts + game.unlocks.impCount.TauntimpAdded + 10;
					amt += countTotalHousingBuildings();
					amt = Math.ceil(amt * 0.003);
				}
				game.unlocks.impCount.Tauntimp++;
				game.unlocks.impCount.TauntimpAdded += amt;
				amt = (game.global.challengeActive == "Trapper" || game.global.challengeActive == "Trappapalooza") ? addMaxHousing(amt, false) : addMaxHousing(amt, true);
				var msg = "It's nice, warm, and roomy in that dead " + name + ". ";
				if (game.global.challengeActive != "Trapper" && game.global.challengeActive != "Trappapalooza"){
					msg += "You found ";
					if (amt == 1) msg += prettify(amt) + " Trimp inside, and it looks hella bored.";
					else msg += prettify(amt) + " Trimps inside, and they all seem content to stay living there!";
					message(msg, "Loot", "gift", "exotic", "exotic");
				}
				else {
					message(msg + " There's enough room for " + prettify(amt) + " Trimp" + ((amt == 1) ? "" : "s") + " to live inside" + ((amt == 1) ? ", though it will be quite lonely." : "!"), "Loot", "gift", "exotic", "exotic");
				}
			}
		},
		Whipimp: {
			location: "World",
			locked: 1,
			world: 1,
			attack: 1,
			health: 1,
			fast: false,
			dropDesc: "Grants 0.3% Trimp resource production speed",
			loot: function (level, fromMagimp) {
				var name = (fromMagimp) ? "Randimp" : "Whipimp";
				game.unlocks.impCount.Whipimp++;
				game.jobs.Farmer.modifier *= 1.003;
				game.jobs.Lumberjack.modifier *= 1.003;
				game.jobs.Miner.modifier *= 1.003;
				game.jobs.Scientist.modifier *= 1.003;
				game.jobs.Dragimp.modifier *= 1.003;
				game.jobs.Explorer.modifier *= 1.003;
				var amt = Math.pow(1.003, game.unlocks.impCount.Whipimp);
				amt = (amt - 1) * 100;
				var s = (game.unlocks.impCount.Whipimp == 1) ? "" : "s";
				message("Seeing the " + name + s + " fall is causing all of your Trimps to work " + amt.toFixed(2) + "% harder!", "Loot", "star", "exotic", "exotic");
			}
		},
		Venimp: {
			location: "World",
			locked: 1,
			world: 1,
			attack: 1,
			health: 1,
			fast: false,
			dropDesc: "Grants 0.3% Trimp breed speed",
			loot: function (level, fromMagimp) {
				var name = (fromMagimp) ? "Randimp" : "Venimp";
				game.unlocks.impCount.Venimp++;
				var amt = Math.pow(1.003, game.unlocks.impCount.Venimp);
				amt = (amt - 1) * 100;
				message("The ground up " + name + " now increases your Trimps' breed speed by " + amt.toFixed(2) + "%!", "Loot", "glass", "exotic", "exotic");
			}
		},
		Jestimp: {
			location: "Maps",
			locked: 1,
			world: 1,
			attack: 1,
			health: 1,
			fast: false,
			dropDesc: "45 seconds of production for 1 random resource",
			loot: function (level, fromMagimp) {
				var name = (fromMagimp) ? "Randimp" : "Jestimp";
				var eligible = ["food", "wood", "metal", "science"];
				if (game.jobs.Dragimp.owned > 0) eligible.push("gems");
				var roll = Math.floor(Math.random() * eligible.length);
				var item = eligible[roll];
				var amt = simpleSeconds(item, 45);
				amt = scaleToCurrentMap(amt);
				addResCheckMax(item, amt, null, null, true);
				message("That " + name + " gave you " + prettify(amt) + " " + item + "!", "Loot", "*dice", "exotic", "exotic");
				game.unlocks.impCount.Jestimp++;
			}
		},
		Titimp: {
			location: "Maps",
			locked: 1,
			world: 1,
			attack: 1,
			health: 1,
			fast: false,
			dropDesc: "+100% damage for 30 seconds in maps",
			loot: function (level, fromMagimp) {
				var name = (fromMagimp) ? "Randimp" : "Titimp";
				var timeRemaining = parseInt(game.global.titimpLeft, 10);
				if (timeRemaining > 0) {
					timeRemaining += 30;
					if (timeRemaining > 45) timeRemaining = 45;
				}
				else timeRemaining = 30;
				game.global.titimpLeft = timeRemaining;
				var roll = Math.floor(Math.random() * 100);
				var text = "That " + name + " made your Trimps super strong!";
				if (roll == 1 && !fromMagimp) text += " (Titimp wishes to remind you that his name is pronounced \"Tie Timp\")";
				message(text, "Loot", "*hammer", "exotic", "exotic");
			}
		},
		Chronoimp: {
			location: "Maps",
			locked: 1,
			world: 1,
			attack: 1,
			health: 1,
			fast: false,
			dropDesc: "5 seconds of production for all basic resources",
			loot: function (level, fromMagimp) {
				var name = (fromMagimp) ? "Randimp" : "Chronoimp";
				var eligible = ["food", "wood", "metal", "science"];
				if (game.jobs.Dragimp.owned > 0) eligible.push("gems");
				var cMessage = "That " + name + " dropped ";
				for (var x = 0; x < eligible.length; x++){
					var item = eligible[x];
					var amt = simpleSeconds(item, 5);
					amt = scaleToCurrentMap(amt);
					addResCheckMax(item, amt, null, null, true);
					cMessage += prettify(amt) + " " + item;
					if (x == (eligible.length - 1)) cMessage += "!";
					else if (x == (eligible.length - 2)) cMessage += ", and ";
					else cMessage += ", ";
				}
				message(cMessage, "Loot", "hourglass", "exotic", "exotic");
				game.unlocks.impCount.Chronoimp++;
			}
		},
		Magnimp: {
			location: "World",
			locked: 1,
			world: 1,
			attack: 1,
			health: 1,
			fast: false,
			dropDesc: "0.3% extra loot from maps and Zones (Not Helium)",
			loot: function (level, fromMagimp) {
				var name = (fromMagimp) ? "Randimp" : "Magnimp";
				game.unlocks.impCount.Magnimp++;
				var amt = Math.pow(1.003, game.unlocks.impCount.Magnimp);
				amt = (amt - 1) * 100;
				message("You killed a " + name + "! The strong magnetic forces now increase your loot by " + amt.toFixed(2) + "%!", "Loot", "magnet", "exotic", "exotic");
			}
		},
		Skeletimp: {
			location: "World",
			locked: 1,
			world: 1,
			attack: 0.77,
			health: 2,
			fast: false,
			loot: function () {
				message("Your Trimps managed to pull 1 perfectly preserved bone from that Skeletimp!", "Loot", "italic", null, "bone");
				game.global.b++;
				game.global.lastSkeletimp = new Date().getTime();
				updateSkeleBtn();
			}
		},
		Megaskeletimp: {
			location: "World",
			locked: 1,
			world: 1,
			attack: 0.99,
			health: 2.5,
			fast: false,
			loot: function () {
				message("That was a pretty big Skeletimp. Your Trimps scavenged the remains and found 2 perfectly preserved bones!", "Loot", "italic", null, "bone");
				game.global.b += 2;
				game.global.lastSkeletimp  = new Date().getTime();
				updateSkeleBtn();
			}
		}

	},

	mapConfig: {
		names: {
			prefix: ["Whispering", "Sandy", "Little", "Big", "Rancid", "Tired", "Laughing", "Weeping", "Windy", "Terrible", "Nasty", "Dirty",
			"Red", "Black", "Singing", "Fiery", "Rocky", "Haunted", "Forgotten", "Miserable", "Cursed", "Tainted", "Blessed", "Sacred",
			"Abandoned", "Natural", "Enchanted", "Magical", "Calm", "Rugged", "Violent", "Weird", "Secret", "Forbidden", "Bewitched",
			"Dark", "Light", "Magnificent", "Evil", "Holy", "Hallowed", "Desecrated", "Silent", "Eternal", "Underground", "Temperate", "Chilly",
			"Muddy", "Dank", "Steamy", "Humid", "Dry", "Putrid", "Foul", "Dangerous", "Marred", "Blighted", "Crystal", "Frozen", "Simple", "Timeless"],
			suffix: ["Creek.Sea", "Coast.Sea", "Swamp.Sea", "Forest.Forest", "Mountain.Mountain", "Beach.Sea", "Hill.Mountain", "Butte.Mountain",
			"Ridge.Mountain", "Mesa.Mountain", "Valley.Depths", "Peak.Mountain", "Canyon.Depths", "Plateau.Mountain", "Crag.Depths",
			"Crater.Depths", "Oaks.Forest",  "Volcano.Mountain", "Glacier.Sea",  "Brook.Sea", "Cave.Depths",  "Sea.Sea", "Ocean.Sea",
			"Lake.Sea", "Jungle.Forest", "Island.Sea", "Ruins.Depths", "Temple.Depths", "Bog.Sea", "Grove.Forest", "Jungle.Forest",
			"Thicket.Forest", "Woods.Forest", "Oasis.Forest", "Mineshaft.Depths", "Tunnel.Depths", "Depths.Depths", "Cavern.Depths",
			"Gardens.Plentiful", "Gardens.Plentiful", "Gardens.Plentiful", "Gardens.Plentiful", "Gardens.Plentiful", "Gardens.Plentiful",
			"Gardens.Plentiful", "Gardens.Plentiful", "Gardens.Plentiful", "Farms.Farmlands"]
		},
		locations: {
		//Add new resources to function getMapIcon in updates.js to get icons on maps
			Sea: {
				resourceType: "Food"
			},
			Mountain: {
				resourceType: "Metal"
			},
			Forest: {
				resourceType: "Wood"
			},
			Depths: {
				resourceType: "Gems"
			},
			Plentiful: {
				resourceType: "Any"
			},
			Farmlands: {
				resourceType: "Scaling"
			},
			Hell: {
				resourceType: "Metal",
				upgrade: "Portal"
			},
			Prismatic: {
				resourceType: "Any",
				upgrade: "Prismalicious"
			},
			Block: {
				resourceType: "Wood",
				upgrade: "Shieldblock"
			},
			Wall: {
				resourceType: "Food",
				upgrade: "Bounty"
			},
			Melting: {
				resourceType: "Metal",
				upgrade: "SmithFree"
			},
			Doom: {
				resourceType: "Metal",
				upgrade: [ "AncientTreasure", "Relentlessness"]
			},
			Atlantis: {
				resourceType: "Food",
				upgrade: ["AncientTreasure"]
			},
			Prison: {
				resourceType: "Food",
				upgrade: "Keys"
			},
			Bionic: {
				resourceType: "Any",
				upgrade: ["roboTrimp", "Geneticistassist"]
			},
			Void: {
				resourceType: "Any",
				upgrade: ["AutoStorage", "Heirloom", "ImprovedAutoStorage", "MapAtZone", "AutoEquip"]
			},
			Frozen: {
				resourceType: "Any"
			},
			Star: {
				resourceType: "Metal"
			},
			Darkness: {
				resourceType: "Any"
			},
			All: {
				resourceType: "Metal"
			}
		},
		sizeBase: 50,
		sizeRange: 25,
		difficultyBase: 1.2,
		difficultyRange: 0.45,
		lootBase: 1.3,
		lootRange: 0.3
	},

	mapUnlocks: {
		roboTrimp: {
			world: 125,
			level: "last",
			icon: "*chain",
			title: "RoboTrimp",
			canRunWhenever: true,
			filterUpgrade: true,
			specialFilter: function (world) {
				var tier = Math.floor((world - 125) / 15);
				return ((game.global.bionicOwned == tier + 1) || (game.global.roboTrimpLevel == tier));
			},
			getShriekValue: function () {
				var level = game.global.roboTrimpLevel;
				if (level == 0) return 1;
				if (level == 1) return 0.85;
				return (0.85 * Math.pow(0.90, level - 1));
			},
			createMap: function(tier) {
				game.global.bionicOwned++;
				if (game.global.bionicOwned == 1)
					message("You found a map to the Bionic Wonderland. Sounds fun!", "Story");
				else
					message("You found a map to an even more advanced version of the Bionic Wonderland! Looks scary... Your scientists remind you that you can only carry 3 of these incredibly heavy, metallic maps at a time.", "Story");
				var roman = romanNumeral(tier + 1);
				createMap(((tier * 15) + 125), "Bionic Wonderland " + roman, "Bionic", 3, 100, 2.6, true);
				purgeBionics();
			},
			fire: function (fromTalent) {
				var level = game.global.mapsOwnedArray[getMapIndex(game.global.currentMapId)].level;
				var bionicTier = parseInt(((level - 125) / 15), 10) + 1;
				if (level + 15 < (getObsidianStart() + 100) && bionicTier == game.global.bionicOwned) {
					this.createMap(bionicTier);
				}
				if (fromTalent === true) return;
				if (bionicTier - 1 == game.global.roboTrimpLevel) {
					checkNewBionicUpgrades(level);
					if (game.global.roboTrimpLevel == 0){
						cancelTooltip();
						var text = "There seems to be a small RoboTrimp that you appear to have orphaned. You decide to take him with you, since you're pretty good at training stuff. He deals <b>20%</b> extra damage for you, and has a special ability. You can learn more about the special ability by hovering over the new <span class='icomoon icon-chain'></span> icon by your soldiers.<br/><br/>You also found a map to a more powerful version of the Bionic Wonderland. You would bet there's another RoboTrimp who needs 'rescuing' in there.";
						if (game.options.menu.tooltips.enabled == 0) text += '<br/><br/><b>Just a heads up</b>: You have tooltips disabled, so you will need to hold shift when you mouse over the <span class="icomoon icon-chain"></span> to read about it.';
						text += "<br/><br/><b>Special Bionic Wonderland QOL Bonuses</b><br/>You will also find some special new Quality of Life bonuses in Bionic Wonderland maps! If you see a Bionic Wonderland map with a yellow background, that means there's a permanent QOL unlock inside. For your first map, you've unlocked Foremany!<br/><br/><b>Foremany</b><br/>" + game.bwRewards.Foremany.description;
						tooltip('confirm', null, 'update', text, null, 'RoboTrimp');
						game.global.roboTrimpLevel = 1;
						document.getElementById("chainHolder").style.visibility = 'visible';
					}
					else {
						game.global.roboTrimpLevel++;
						var values = game.global.roboTrimpLevel;
						values = [(values) * 20, ((1 - this.getShriekValue()) * 100).toFixed(1)];
						message("<span class='icomoon icon-chain'></span> Hey look, another baby RoboTrimp! You decide to add him to your collection. You now deal " + Math.floor(values[0]) + "% extra damage thanks to your pets, and MagnetoShriek now removes " + Math.floor(values[1]) + "% of an Improbability's attack", "Notices");
						for (var reward in game.bwRewards){
							if (level == game.bwRewards[reward].requires) {
								if (game.bwRewards[reward].fire && typeof game.bwRewards[reward].fire === 'function') game.bwRewards[reward].fire();
								message("You also just unlocked " + reward + "!", "Notices")
							}
						}
					}
				}
			}
		},
		Geneticistassist: {
			//depricated upgrade, leave in for compatibility in case someone was on this map
			world: 170,
			level: 79,
			icon: "*clipboard",
			title: "Geneticistassist",
			canRunOnce: true,
			filterUpgrade: true,
			specialFilter: function (){
				return false;
			},
			fire: function () {
				// tooltip('The Geneticistassist', null, 'update');
				// game.global.Geneticistassist = true;
				// unlockJob("Geneticist");
				// addNewSetting("GeneticistassistTarget");
				// addNewSetting("geneSend");
			}
		},
		AutoStorage: {
			world: 50,
			level: "last",
			icon: "*eye4",
			title: "Auspicious Presence",
			canRunOnce: true,
			filterUpgrade: true,
			specialFilter: function(world) {
				return !game.global.autoStorageAvailable;
			},
			fire: function(){
				var text = "From the void, an auspicious presence reaches out and fills your mind. You feel at peace with the world. It asks you what you desire most, and without a second thought you reply that you wish your Trimps were smart enough to manage storage structures on their own. The presence lets you know that it is done, then dissipates. You instantly regret not asking to go home.";
				tooltip('confirm', null, 'update', text, null, 'Auspicious Presence');
				game.global.autoStorageAvailable = true;
				document.getElementById("autoStorageBtn").style.display = "block";
				createHeirloom();
				message("You found an Heirloom!", "Loot", "*archive", null, "secondary", null, null, true);
			}
		},
		ImprovedAutoStorage: {
			world: 100,
			level: "last",
			icon: "*eye4",
			title: "Auspicious Presence Part II",
			canRunOnce: true,
			filterUpgrade: true,
			specialFilter: function(world) {
				return !game.global.improvedAutoStorage;
			},
			fire: function(){
				var text = "<p>From the void, an auspicious presence reaches out and fills your mind. You feel at peace with the world. It asks you what you desire most. Wait... hasn't this happened before? Last time you asked for your Trimps to be smart enough to manage storage structures on their own. You can make it better this time! You excitedly ask for your Trimps to waste less resources when managing resources on their own. The presence lets you know that it is done, then dissipates. You get serious déjà-vu while regretting not asking to go home.</p><p style='font-weight: bold'>From now on, storage facilities will be constructed instantly. If you collect more resources from one source than you can hold, the extra resources will be used to build new storage facilities without wasting any resources. You may not be home, but your Trimps are now quite talented!</p>";
				tooltip('confirm', null, 'update', text, null, 'Auspicious Presence Part II', null, null, true);
				enableImprovedAutoStorage();
				createHeirloom();
				message("You found an Heirloom!", "Loot", "*archive", null, "secondary");
			}
		},
		MapAtZone: {
			world: 150,
			level: "last",
			icon: "*eye4",
			title: "Auspicious Presence Part III",
			canRunOnce: true,
			filterUpgrade: true,
			specialFilter: function(world) {
				return !game.global.canMapAtZone;
			},
			fire: function(){
				var text = "<p>From the void, an auspicious presence reaches out and fills your mind. You feel at peace with the world. It asks you what you desire most. Wait... how many times has this happened now? You're fairly positive that there was something you regretted not asking last time, but you can't quite remember. You've asked for Trimps to be able to manage storage structures, and you've asked for them to be better at managing those structures. Even though you're content with your storage solutions, you suddenly realize the perfect request! You wish the Trimps would stop pushing so far through the Zones while you're sleeping, so you ask for a way to tell the Trimps to stop fighting at a Zone of your choosing. The presence lets you know that it is done, then dissipates. You realize as soon as it leaves that you could have asked to go home, but you don't really want to anymore. Next time you'll make sure to ask for invincible Trimps though, that may have been a better choice.</p><p style='font-weight: bold'>From now on, you have access to the Map At Zone setting. This setting can be accessed through the Map Sidebar, Settings, or the 'Configure Maps' popup!</p>";
				tooltip('confirm', null, 'update', text, null, 'Auspicious Presence Part III', null, null, true);
				game.global.canMapAtZone = true;
				addNewSetting("mapAtZone");
				createHeirloom();
				message("You found an Heirloom!", "Loot", "*archive", null, "secondary");
			}
		},
		AutoEquip: {
			world: 350,
			level: "last",
			icon: "*eye4",
			title: "Auspicious Presence Part IV",
			canRunOnce: true,
			filterUpgrade: true,
			specialFilter: function(world){
				return !game.global.autoEquipUnlocked;
			},
			fire: function(){
				var text = "<p>From the void, an auspicious presence reaches out and fills your mind. You feel at peace with the world. It asks you what you desire most. Wait... This has DEFINITELY happened before... hasn't it? You're pretty sure it has, but you have no actual memory of it. But you do... but also you don't. Wait, who even are you? Where are you? What are you?</p><p>You sit on the ground and contemplate things for a few hours while the Auspicious Presence waits patiently. You finally stand up and demand that the Trimps become smart enough to level up their own equipment! You can't see how this could go badly. The presence lets you know that it is done, then it dissipates. As soon as it is gone, you realize you could have just asked for invincible Trimps, but you're pretty sure you'll remember next time.</p><p style='font-weight: bold'>From now on, you have access to AutoEquip!</p>";
				tooltip('confirm', null, 'update', text, null, 'Auspicious Presence Part IV', null, null, true);
				game.global.autoEquipUnlocked = true;
				toggleAutoEquip(true);
				createHeirloom();
				message("You found an Heirloom!", "Loot", "*archive", null, "secondary");
			}
		},
		AncientTreasure: {
			world: 33,
			level: "last",
			icon: "piggy-bank",
			title: "Ancient Treasure",
			canRunOnce: true,
			filterUpgrade: true,
			specialFilter: function(world) {
				return !game.portal.Relentlessness.locked;
			},
			fire: function(){
				addResCheckMax("food", game.resources.food.owned);
				addResCheckMax("wood", game.resources.wood.owned);
				addResCheckMax("metal", game.resources.metal.owned);
				var text;
				if (game.global.universe == 2) text = "You heroically slay the mighty Poseidimp, and do a little ransacking in celebration. You come across a strange, brightly glowing chest that seems to be calling you to it. You go over and carefully open it up to see it filled to the brim with the exact amount of resources you currently already had. Your Food, Wood, and Metal have been doubled!";
				else text = "After barely escaping a fierce boulder, you check out the relic you found in there. It glows extremely bright for a few seconds before disappearing, and you look at your storages to see that your Food, Wood, and Metal have been doubled!";
				message(text, "Story", "piggy-bank", "highlightStoryMessage");
			}
		},
		SmithFree: {
			world: 50,
			level: "last",
			icon: "*home5",
			title: "SmithFree",
			filterUpgrade: true,
			canRunOnce: true,
			fire: function(){
				var toAdd = (autoBattle.oneTimers.Smithriffic.owned) ? 2 : 1; 
				game.buildings.Smithy.owned += toAdd;
				game.buildings.Smithy.purchased += toAdd;
				if (game.global.challengeActive == "Quest" && game.challenges.Quest.questId == 6) game.challenges.Quest.checkQuest();
				var a = (toAdd == 2) ? "two" : "a";
				var it = (toAdd == 2) ? "them" : "it";
				var appear = (toAdd == 2) ? "appear" : "appears";
				message("At the end of that very hot map, you find " + a + " tiny, dehydrated Smithy building" + needAnS(toAdd) + ". You bring " + it + " back to your town and drop " + it + " in a glass of water, and " + a + " full-sized Smithy" + needAnS(toAdd) + " instantly " + appear + "!", "Story", "*home5", "highlightStoryMessage");
			}
		},
		Heirloom: {
			world: 6,
			level: "last",
			icon: "*archive",
			title: "Heirloom",
			filterUpgrade: true,
			canRunWhenever: true,
			fire: function () {
				createHeirloom();
				if (game.global.world >= 60 && game.global.voidDeaths == 0 && game.global.voidBuff == "bleed") giveSingleAchieve("Survivor");
				message("You found an Heirloom!", "Loot", "*archive", null, "secondary");
			}
		},
		Keys: {
			world: 80,
			level: "last",
			icon: "*key4",
			title: "The Warden's Keys",
			filterUpgrade: true,
			canRunOnce: true,
			specialFilter: function () {
				return (game.global.prisonClear == 0);
			},
			fire: function () {
				message("You have slain the Warden and taken his keys. How weird would it be if they fit in that key hole on the portal?", "Story");
				game.challenges.Electricity.hasKey = true;
				game.global.prisonClear++;
			}
		},
		Relentlessness: {
			world: 33,
			level: "last",
			icon: "compressed",
			title: "Unleash the Crit",
			filterUpgrade: true,
			canRunOnce: true,
			specialFilter: function () {
				return game.portal.Relentlessness.locked;
			},
			fire: function () {
				message("You've never been here before. Like, ever. This entire place felt cold and unfamiliar. Where are you? Why have so many Trimps had to fall to get here? You're suddenly angry, it's time to take a stand.", "Story");
				message("You have permanantly unlocked a new Perk, Relentlessness, which will remain unlocked through portals.", "Notices");
				game.portal.Relentlessness.locked = false;
			}
		},
		Portal: {
			world: -1,
			level: "last",
			icon: "repeat",
			title: "Portal",
			filterUpgrade: true,
			canRunOnce: true,
			fire: function (level, fromGenerator) {
				if (!this.canRunOnce) return;
				var color = (game.global.universe == 2) ? "blue" : "green";
				var resource = heliumOrRadon();
				var messageText = (fromGenerator) ? "The world feels a little bit less angry as you fire off your handy Portal Generator. You can tell that somewhere in some dimension, a Megablimp is no more. In front of you, " + ((game.global.runningChallengeSquared) ? "a " + color + ", shining box appears" : "45 " + resource + " and a " + color + ", shining box appear") + " on the ground. In tiny writing on the box, you can make out the words 'Time portal. THIS SIDE UP'." : "Don't ever let anyone tell you that you didn't just kill that Megablimp. Because you did. As he melts away into nothingness, you notice a " + color + ", shining box on the ground. In tiny writing on the box, you can make out the words 'Time portal. THIS SIDE UP'.";
				message(messageText, "Story");
				game.global.portalActive = true;
				fadeIn("portalBtn", 10);
				if (game.global.runningChallengeSquared) return;
				fadeIn("helium", 10);
				addHelium(45);
				if (!fromGenerator){
					message("<span class='" + heliumIcon() + "'></span> You were able to extract 45 " + heliumOrRadon(true) + "s from that Blimp! Now that you know how to do it, you'll be able to extract " + resource + " from normal Blimps.", "Story");
				}
				if (game.global.challengeActive == "Metal"){
					game.challenges.Metal.onComplete();
				}
				if (game.global.challengeActive == "Size"){
					game.challenges.Size.onComplete();
				}
				if (game.global.challengeActive == "Discipline"){
					game.challenges.Discipline.onComplete();
				}
				if (game.global.challengeActive == "Frugal"){
					game.challenges.Frugal.onComplete();
				}
				if (game.global.challengeActive == "Coordinate"){
					game.challenges.Coordinate.onComplete();
				}
			}
		},
		Prismalicious: {
			world: -1,
			level: "last",
			icon: "*shield2",
			title: "Prismalicious",
			filterUpgrade: true,
			canRunOnce: true,
			message: "Oh goodness, another Prism to polish!",
			fire: function(){
				unlockUpgrade("Prismalicious");
			}
		},
		Shieldblock: {
			world: 10,
			message: "That thing dropped a book. Doesn't look like an ordinary book. Looks... blockier...",
			level: "last",
			icon: "book",
			title: "Shieldblock",
			filterUpgrade: true,
			canRunOnce: true,
			fire: function () {
				unlockUpgrade("Shieldblock");
				if (game.global.runningChallengeSquared) return;
				if (game.global.challengeActive == "Scientist"){
					game.challenges.Scientist.onComplete();
				}
				if (game.global.challengeActive == "Trimp"){
					game.challenges.Trimp.onComplete();
				}
			}
		},
		Bounty: {
			world: -1,
			message: "It's all shiny and stuff. You're pretty sure you've never seen a book this shiny.",
			level: "last",
			icon: "book",
			title: "Bounty",
			filterUpgrade: true,
			canRunOnce: true,
			fire: function () {
				if (!this.canRunOnce) return;
				unlockUpgrade("Bounty");
			}
		},
		Supershield: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Shield!",
			level: "last",
			icon: "book",
			title: "Supershield",
			prestige: true,
			last: 1,
			fire: function () {
				unlockUpgrade("Supershield");
			}
		},
		Dagadder: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Dagger!",
			level: "last",
			icon: "book",
			title: "Dagadder",
			prestige: true,
			last: 1,
			fire: function () {
				unlockUpgrade("Dagadder");
			}
		},
		Bootboost: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Boots!",
			level: "last",
			icon: "book",
			title: "Bootboost",
			prestige: true,
			last: 1,
			fire: function () {
				unlockUpgrade("Bootboost");
			}
		},
		Megamace: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Mace!",
			level: "last",
			icon: "book",
			title: "Megamace",
			prestige: true,
			last: 2,
			fire: function () {
				unlockUpgrade("Megamace");
			}
		},
		Hellishmet: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Helmet!",
			level: "last",
			icon: "book",
			title: "Hellishmet",
			prestige: true,
			last: 2,
			fire: function () {
				unlockUpgrade("Hellishmet");
			}
		},
		Polierarm: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Polearm!",
			level: "last",
			icon: "book",
			title: "Polierarm",
			prestige: true,
			last: 3,
			fire: function () {
				unlockUpgrade("Polierarm");
			}
		},
		Pantastic: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Pants!",
			level: "last",
			icon: "book",
			title: "Pantastic",
			prestige: true,
			last: 3,
			fire: function () {
				unlockUpgrade("Pantastic");
			}
		},
		Axeidic: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Battleaxe!",
			level: "last",
			icon: "book",
			title: "Axeidic",
			prestige: true,
			last: 4,
			fire: function () {
				unlockUpgrade("Axeidic");
			}
		},
		Smoldershoulder: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Shoulderguards!",
			level: "last",
			icon: "book",
			title: "Smoldershoulder",
			prestige: true,
			last: 4,
			fire: function () {
				unlockUpgrade("Smoldershoulder");
			}
		},
		Greatersword: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Greatsword!",
			level: "last",
			icon: "book",
			title: "Greatersword",
			prestige: true,
			last: 5,
			fire: function () {
				unlockUpgrade("Greatersword");
			}
		},
		Bestplate: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Breastplate!",
			title: "Bestplate",
			level: "last",
			icon: "book",
			prestige: true,
			last: 5,
			fire: function () {
				unlockUpgrade("Bestplate");
			}
		},
		Harmbalest: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Arbalest!",
			title: "Harmbalest",
			level: "last",
			specialFilter: function () {
				return (game.equipment.Arbalest.locked == 0);
			},
			icon: "book",
			prestige: true,
			last: 5,
			fire: function () {
				unlockUpgrade("Harmbalest");
			}
		},
		GambesOP: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Gambeson!",
			title: "GambesOP",
			level: "last",
			specialFilter: function () {
				return (game.equipment.Gambeson.locked == 0);
			},
			icon: "book",
			prestige: true,
			last: 5,
			fire: function () {
				unlockUpgrade("GambesOP");
			}
		},
		Speedexplorer: {
			world: -1,
			specialFilter: function (mapLevel) {
				var booksNeeded = Math.floor((mapLevel - this.next) / 10);
				return (booksNeeded > 0);
			},
			addToCount: true,
			level: [10, 20],
			icon: "book",
			title: "A well-hidden book",
			next: 10,
			fire: function (unused, fromAuto) {
				var mapLevel;
				if (!fromAuto){
					if (!getCurrentMapObject() || !getCurrentMapObject().level) return;
					var mapLevel = getCurrentMapObject().level;
				}
				else{
					mapLevel = game.global.world;
				}
				var booksNeeded = Math.floor((mapLevel - this.next) / 10);
				if (booksNeeded > 0){
					for (var x = 0; x < booksNeeded; x++) {
						unlockUpgrade("Speedexplorer");
						this.next += 10;
					}
					var copy = (booksNeeded == 1) ? "copy" : booksNeeded + " copies";
					message("The " + copy + " of 'Speedexplorer' under these bushes will certainly be useful!", "Unlocks", null, null, 'repeated', convertUnlockIconToSpan(this));
				}
			}
		},
		TheBlock: {
			world: -1,
			message: "Holy cowimp! A unique map!",
			level: [10, 20],
			icon: "th-large",
			title: "The Block",
			startAt: 11,
			blockU2: true,
			canRunOnce: true,
			fire: function () {
				message("You just made a map to The Block!", "Story");
				createMap(11, "The Block", "Block", 2, 100, 1.3, true, true);
			}
		},
		TheWall: {
			world: -1,
			message: "Oh snap! Another unique map!",
			level: [10, 20],
			icon: "th-large",
			title: "The Wall",
			blockU2: true,
			startAt: 15,
			canRunOnce: true,
			fire: function () {
				message("You just made a map to The Wall!", "Story");
				createMap(15, "The Wall", "Wall", 2, 100, 1.5, true, true);
			}
		},
		BigWall: {
			world: -1,
			message: "Oh snap! Another unique map!",
			level: [10, 20],
			icon: "th-large",
			title: "Big Wall",
			blockU1: true,
			startAt: 7,
			canRunOnce: true,
			fire: function () {
				message("You just made a map to Big Wall!", "Story");
				createMap(7, "Big Wall", "Wall", 4, 150, 3.5, true, true);
			}
		},
		ThePrison: {
			startAt: 80,
			level: [1, 10],
			icon: "th-large",
			canRunOnce: true,
			blockU2: true,
			title: "The Prison",
			fire: function () {
				game.global.mapsUnlocked = true;
				createMap(80, "The Prison", "Prison", 2.6, 100, 2.6, true);
				message("You found The Prison! You have a bad feeling about going in...", "Story");
			}
		},
		BionicWonderland: {
			startAt: 125,
			level: [1, 15],
			icon: "th-large",
			blockU2: true,
			canRunOnce: true,
			title: "Bionic Wonderland",
			fire: function () {
				message("You found a map to the Bionic Wonderland. Sounds fun!", "Story");
				game.global.bionicOwned++;
				createMap(125, "Bionic Wonderland", "Bionic", 3, 100, 2.6, true);
			}
		},
		ImplodingStar: {
			startAt: 170,
			level: [1, 15],
			icon: 'th-large',
			blockU2: true,
			canRunOnce: true,
			title: 'Imploding Star',
			fire: function () {
				message("You found a map to an Imploding Star inside of a supercooled dimension. The temperature there is perfect!", "Story");
				createMap(170, "Imploding Star", "Star", 3, 100, 3.2, true);
			}
		},
		Mansion: {
			world: -1,
			startAt: 8,
			message: "You found plans for a Mansion! Your Trimps will be pretty stoked",
			level: [10, 20],
			icon: "*home4",
			title: "Mansion",
			canRunOnce: true,
			fire: function () {
				if (!this.canRunOnce) return;
				unlockBuilding("Mansion");
			}
		},
		Hotel: {
			world: -1,
			startAt: 14,
			message: "You found plans for a hotel! (A decent hotel, too)",
			level: [10, 20],
			icon: "*office",
			title: "The Trimps' Guide to Cheap Hotel Construction",
			canRunOnce: true,
			fire: function () {
				if (!this.canRunOnce) return;
				unlockBuilding("Hotel");
			}
		},
		UberHut: {
			world: -1,
			startAt: 18,
			message: "This extremely technical book will teach anyone who can understand the big words how to make bigger huts.",
			level: [10, 20],
			icon: "book",
			title: "Hut hut hut",
			canRunOnce: true,
			fire: function () {
				unlockUpgrade("UberHut");
			}
		},
		UberHouse: {
			world: -1,
			startAt: 29,
			message: "This book talks about adding a second floor to your homes! Mind... blown...",
			level: [10, 20],
			icon: "book",
			title: "A Tale of Two Stories",
			canRunOnce: true,
			fire: function () {
				unlockUpgrade("UberHouse");
			}
		},
		UberMansion: {
			world: -1,
			startAt: 34,
			message: "This book will teach you how to make your Trimps share their mansions!",
			level: [10, 20],
			icon: "book",
			title: "Sharing is Caring",
			canRunOnce: true,
			fire: function () {
				unlockUpgrade("UberMansion");
			}
		},
		UberHotel: {
			world: -1,
			startAt: 40,
			message: "This book will teach you how to build smaller hotel rooms!",
			level: [5, 10],
			icon: "book",
			title: "The Art of Tiny Hotel Rooms",
			canRunOnce: true,
			fire: function () {
				unlockUpgrade("UberHotel");
			}
		},
		UberResort: {
			world: -1,
			startAt: 47,
			level: [5, 10],
			message: "Wow! This book! It's so Resortsfull!",
			icon: "book",
			title: "Time for a better vacation",
			canRunOnce: true,
			fire: function () {
				unlockUpgrade("UberResort");
			}
		},
		Resort: {
			world: -1,
			startAt: 25,
			message: "You found plans for a huge resort!",
			level: [10, 20],
			icon: "*building",
			title: "Time for a vacation",
			canRunOnce: true,
			fire: function () {
				if (!this.canRunOnce) return;
				unlockBuilding("Resort");
			}
		},
		Gateway: {
			world: -1,
			startAt: 30,
			message: "You found a key to Dimension ZZZ!",
			level: [10, 20],
			icon: "cog",
			title: "Transgalactic Gateway",
			canRunOnce: true,
			fire: function () {
				if (!this.canRunOnce) return;
				unlockBuilding("Gateway");
			}
		},
		Wormhole: {
			world: -1,
			startAt: 37,
			blockU2: true,
			message: "You found a crystal powerful enough to create wormholes!",
			level: [10, 20],
			icon: "link",
			title: "Inter-Dimensional Hole-Maker",
			canRunOnce: true,
			fire: function () {
				if (!this.canRunOnce) return;
				unlockBuilding("Wormhole");
			}
		},
		Collector: {
			world: -1,
			startAt: 50,
			message: "You found plans for some sort of overly complicated solar panel.",
			level: [3, 19],
			icon: "dashboard",
			title: "Collector",
			canRunOnce: true,
			fire: function () {
				if (!this.canRunOnce) return;
				unlockBuilding("Collector");
			}
		},
		Trapstorm: {
			world: -1,
			startAt: 10,
			message: "A book that teaches your Foremen a new skill. Riveting.",
			level: [5, 15],
			icon: "book",
			title: "Trapstorm",
			canRunOnce: true,
			fire: function () {
				unlockUpgrade("Trapstorm");
			}
		},

		Nursery: {
			world: -1,
			startAt: 23,
			blockU2: true,
			message: "You found blueprints for some sort of nursery that can harness more power from gems.",
			level: [5, 20],
			icon: "home",
			title: "Nursery",
			canRunOnce: true,
			fire: function () {
				unlockBuilding("Nursery");
			}
		},
		//This one is for all maps
		gems: {
			world: -1,
			level: [0, 7],
			icon: "*diamond",
			title: "Gems",
			repeat: 5,
			fire: function (level) {
				var amt = rewardResource("gems", 0.5, level, true);
				message("You found " + prettify(amt) + " gems! Terrific!", "Loot", "*diamond", null, "secondary");
			}
		},
		//This one is for depths maps
		Gems: {
			world: -1,
			level: [0, 4],
			repeat: 3,
			icon: "*diamond",
			title: "Gems",
			filter: true,
			fire: function (level) {
				var amt = rewardResource("gems", 0.5, level, true);
				message("You found " + prettify(amt) + " gems! Terrific!", "Loot", "*diamond", null, "secondary");
			}
		},
		Any: {
			world: -1,
			level: [0, 2],
			icon: "*leaf2",
			title: "Food/Wood/Metal",
			repeat: 2,
			filter: true,
			fire: function (level) {
				var rand = Math.floor(Math.random() * 3);
				switch(rand) {
					case 0:
						game.mapUnlocks.Food.fire(level);
						break;
					case 1:
						game.mapUnlocks.Wood.fire(level);
						break;
					case 2:
						game.mapUnlocks.Metal.fire(level);
						break;
				}
			}
		},
		Metal: {
			world: -1,
			level: [0, 2],
			icon: "*cubes",
			title: "Metal",
			repeat: 2,
			filter: true,
			fire: function (level) {
				if (game.global.challengeActive == "Transmute"){
					message("As expected, there was no Metal here.", "Loot", "*cubes", null, "primary");
					return;
				}
				var amt = rewardResource("metal", 0.5, level, true);
				message("You just found " + prettify(amt) + " bars of metal! Convenient!", "Loot", "*cubes", null, "primary");
			}
		},
		Food: {
			world: -1,
			level: [0, 2],
			icon: "apple",
			title: "Food",
			repeat: 2,
			filter: true,
			fire: function (level) {
				var amt = rewardResource("food", 0.5, level, true);
				message("That guy just left " + prettify(amt) + " food on the ground! Sweet!", "Loot", "apple", null, "primary");
			}
		},
		Wood: {
			world: -1,
			level: [0, 2],
			icon: "tree-deciduous",
			title: "Wood",
			repeat: 2,
			filter: true,
			fire: function (level) {
				var amt = rewardResource("wood", 0.5, level, true);
				message("You just found " + prettify(amt) + " wood! That's pretty neat!", "Loot", "tree-deciduous", null, "primary");
			}
		}
	},

	//if you put a function in here as fire, you won't have anything unlocked, the name is just for funsies
	//-1 is all worlds, -2 is even world numbers, -3 is odd world numbers, -5 is every 5th world
	//min is inclusive, max is exclusive. too lazy to fix
	//More important stuff should be towards the top in case of bailouts
	worldUnlocks: {
		Shield: {
			message: "You found plans for a shield! It even tells you how to upgrade it, if you have enough wood. That was nice of that Bad Guy.",
			world: 1,
			title: "New Armor",
			level: 4,
			icon: "question-sign"
		},
		Boots: {
			message: "You found plans for Boots! Swell!",
			world: 1,
			level: 49,
			title: "New Armor",
			icon: "question-sign"
		},
		Dagger: {
			message: "You found plans for a Dagger! Fancy!",
			world: 1,
			level: 19,
			title: "New Weapon",
			icon: "question-sign"
		},
		Mace: {
			message: "You found plans for a mace!",
			world: 2,
			level: 19,
			title: "New Weapon",
			icon: "question-sign"
		},
		Helmet: {
			message: "You found plans for a helmet!",
			world: 2,
			level: 49,
			title: "New Armor",
			icon: "question-sign"
		},
		Polearm: {
			message: "You found plans for a Polearm!",
			world: 3,
			level: 19,
			title: "New Weapon",
			icon: "question-sign"
		},
		Pants: {
			message: "You found plans for Pants!",
			world: 3,
			level: 49,
			title: "New Armor",
			icon: "question-sign"
		},
		Battleaxe: {
			message: "You found plans for a Battleaxe!",
			world: 4,
			level: 19,
			title: "New Weapon",
			icon: "question-sign"
		},
		Shoulderguards: {
			message: "You found plans for Shoulderguards!",
			world: 4,
			level: 49,
			title: "New Armor",
			icon: "question-sign"
		},
		Greatsword: {
			message: "You found plans for a Greatsword!",
			world: 5,
			level: 19,
			title: "New Weapon",
			icon: "question-sign"
		},
		Breastplate: {
			message: "You found plans for a Breastplate!",
			world: 5,
			level: 49,
			title: "New Armor",
			icon: "question-sign"
		},
		//Non Equipment
		Bloodlust: {
			message: "You found an ancient book titled Bloodlust. You should look at it or something.",
			world: 1,
			level: 9,
			icon: "book",
			title: "Bloodlust",
			fire: function() {
				unlockUpgrade("Bloodlust");
			}
		},
		Efficiency: {
			message: "Hey, this book might be for you!",
			world: -2,
			level: 9,
			icon: "book",
			title: "Efficiency",
			fire: function() {
				unlockUpgrade("Efficiency");
			}
		},
		Gym: {
			message: "Hey look, plans for a new Gym!",
			world: 2,
			level: 4,
			blockU2: true,
			icon: "home",
			title: "New Building",
			fire: function() {
				unlockBuilding("Gym");
				document.getElementById("blockDiv").style.visibility = "visible";
			}
		},
		Prism1: {
			message: "You find a small handcut gem that seems to coat you in a bubble of light when you hold it! You should have your Scientists research some way to polish it.",
			world: 2,
			level: 4,
			blockU1: true,
			icon: "*shield2",
			title: "Better than block",
			fire: function() {
				unlockUpgrade("Prismatic");
			}
		},
		TrainTacular: {
			message: "This book is for your Trainers!",
			world: -5,
			blockU2: true,
			level: 9,
			icon: "book",
			title: "TrainTacular",
			fire: function () {
				unlockUpgrade("TrainTacular");
			}
		},
		Smithy: {
			message: "Your equipment isn't going to cut it in this Universe. Better get someone to ugprade it for you!",
			world: 5,
			level: 9,
			blockU1: true,
			icon: "book",
			title: "Smithy",
			fire: function(){
				unlockBuilding("Smithy");
			}
		},
		Warpstation: {
			message: "Time to colonize the galaxy.",
			world: 60,
			level: 19,
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			title: "The Galaxy will be your Ocean",
			icon: "*rocket4",
			fire: function () {
				unlockBuilding("Warpstation");
			}
		},
		Gymystic: {
			world: -5,
			blockU2: true,
			startAt: 25,
			lastAt: 55,
			level: 44,
			icon: "book",
			message: "Trimp cave paintings predicted the existence of a book such as this one, you had no idea it actually existed. It smells dusty.",
			title: "Some old, dusty book",
			fire: function () {
				unlockUpgrade("Gymystic");
			}
		},
		Gymystic2: {
			world: -25,
			blockU2: true,
			startAt: 75,
			lastAt: 150,
			level: 54,
			icon: "book",
			displayAs: "Gymystic",
			message: "Trimp cave paintings predicted the existence of a book such as this one, you had no idea it actually existed. It smells dusty.",
			title: "Some old, dusty book",
			fire: function () {
				unlockUpgrade("Gymystic");
			}
		},
		Meteorologists: {
			world: 30,
			blockU1: true,
			level: 19,
			icon: "*radio2",
			canRunOnce: true,
			displayAs: "Meteorologists",
			message: "You've found an ancient relic that looks like some sort of mechanical dish. Perhaps you could train your Trimps to use this to your advantage!",
			title: "Mechanical Dish",
			fire: function(){
				this.canRunOnce = false;
				if (!game.global.runningChallengeSquared || game.global.stormDone)
					unlockJob("Meteorologist");
			}
		},
		Dominance: {
			world: 70,
			level: 44,
			icon: "book",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			title: "Formation",
			fire: function () {
				unlockUpgrade("Dominance");
			}
		},
		Barrier: {
			world: 80,
			level: 44,
			icon: "book",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			title: "Formation",
			fire: function () {
				unlockUpgrade("Barrier");
			}
		},
		Potency: {
			message: "This book will help your Trimps make more Trimps!",
			world: -5,
			level: 29,
			icon: "book",
			title: "Trimpma Sutra",
			fire: function () {
				if (game.global.challengeActive == "Trapper" || game.global.challengeActive == "Trappapalooza"){
					message("Your Scientists let you know that your Trimps won't understand the book, but they offer to hold on to it for you for later. How nice of them!", "Notices");
					game.challenges[game.global.challengeActive].heldBooks++;
					return;
				}
				unlockUpgrade("Potency");
			}
		},
/* 		SuperShriek: {
			message: "This book will help your RoboTrimp shriek louder!",
			world: 183,
			level: 5,
			icon: "book",
			title: "MagnetoShriek is love, MagnetoShriek is life",
			fire: function () {
				unlockUpgrade("SuperShriek");
			}
		}, */
		//19 is for Armor
		Miner: {
			message: "You found an ancient book about mining. With some research you should be able to teach the Trimps to mine!",
			world: 1,
			level: 29,
			icon: "book",
			title: "Miner",
			fire: function () {
				if (game.global.challengeActive == "Metal" || game.global.challengeActive == "Transmute"){
					var challenge = game.challenges[game.global.challengeActive];
					message("Your Trimps simply do not understand what this book is talking about. It's blowing their minds. What is a 'Miner'?!", "Notices");
					challenge.fireAbandon = true;
					return;
				}
				unlockUpgrade("Miners");
			}
		},
		Trainer: {
			message: "You found a book about proper physical training!",
			blockU2: true,
			world: 3,
			level: 3,
			icon: "book",
			title: "Step Up Your Block Game!",
			fire: function () {
				unlockUpgrade("Trainers");
			}
		},
		Scientist: {
			message: "You found a book about Einstrimp!",
			world: 1,
			level: 39,
			icon: "book",
			title: "Scientist",
			fire: function () {
				if (game.global.challengeActive == "Scientist"){
					message("Your Trimps think they're too good at Science to read your dumb book. They're already working on Portal technology!", "Notices");
					game.challenges.Scientist.fireAbandon = true;
					return;
				}
				unlockUpgrade("Scientists");
			}
		},
		Explorer: {
			message: "You found a book detailing the intricacies of solo exploration!",
			world: 15,
			level: 39,
			icon: "book",
			title: "Explorer",
			fire: function () {
				if (game.upgrades.Explorers.allowed === 0) unlockUpgrade("Explorers");
			}
		},
		Speedscience: {
			message: "You found a book called Speedscience! What do you think it could possibly do?!",
			brokenPlanet: -1,
			world: -2,
			level: 39,
			icon: "book",
			title: "Speedscience",
			fire: function () {
			if (game.global.challengeActive == "Scientist"){
				message("You found a book called Speedscience, but you haven't found anyone to read it. Such a shame.", "Notices");
				game.challenges.Scientist.heldBooks++;
				return;
			}
				unlockUpgrade("Speedscience");
			}
		},
		Megascience: {
			message: "You found a book called Megascience! It seems to fade in and out of reality.",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			world: -2,
			level: 39,
			icon: "book",
			title: "Megascience",
			blockU2: true,
			fire: function () {
				unlockUpgrade("Megascience");
			}
		},
		Gigastation: {
			message: "You found blueprints detailing how to upgrade your Warpstation. Blimey!",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			world: -1,
			startAt: 61,
			lastAt: 69,
			level: 19,
			icon: "*make-group",
			title: "Gigastation",
			fire: function () {
				unlockUpgrade("Gigastation");
			}
		},
		Gigastation2: {
			message: "You found blueprints detailing how to upgrade your Warpstation. Blimey!",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			world: -2,
			startAt: 70,
			lastAt: 78,
			level: 19,
			icon: "*make-group",
			displayAs: "Gigastation",
			title: "Gigastation",
			fire: function () {
				unlockUpgrade("Gigastation");
			}
		},
		Gigastation3: {
			message: "You found blueprints detailing how to upgrade your Warpstation. Blimey!",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			world: -33,
			startAt: 81,
			lastAt: 90,
			level: 19,
			icon: "*make-group",
			title: "Gigastation",
			displayAs: "Gigastation",
			fire: function () {
				unlockUpgrade("Gigastation");
			}
		},
		Gigastation4: {
			message: "You found blueprints detailing how to upgrade your Warpstation. Blimey!",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			world: -5,
			startAt: 95,
			lastAt: 170,
			level: 19,
			icon: "*make-group",
			title: "Gigastation",
			displayAs: "Gigastation",
			fire: function () {
				unlockUpgrade("Gigastation");
			}
		},
		Gigastation5: {
			message: "You found blueprints detailing how to upgrade your Warpstation. Blimey!",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			world: -10,
			startAt: 180,
			lastAt: 229,
			level: 19,
			icon: "*make-group",
			displayAs: "Gigastation",
			title: "Gigastation",
			fire: function () {
				unlockUpgrade("Gigastation");
			}
		},
		Magmamancer: {
			message: "You find a smouldering book that looks like it was pushed from the core of this planet. Inside are drawings of Trimps performing rituals with Gems and Magma. It's very hot to the touch, but you take it with you as you haven't had new reading material in a while.",
			world: 230,
			level: 90,
			icon: "book",
			blockU2: true,
			title: "Magmamancers",
			fire: function () {
				if (game.global.challengeActive == "Metal" || game.global.challengeActive == "Transmute"){
					var challenge = game.challenges[game.global.challengeActive];
					challenge.holdMagma = true;
					message("This book really doesn't help too much while you're dealing with the minerlessness of this dimension. Better let your scientists hold this one for you for a bit.", "Notices");
					return;
				}
				unlockUpgrade("Magmamancers");
			}
		},
		//49 is for weapon
		Speedfarming:{
			message: "You found a book called Speedfarming! It looks delicious!",
			brokenPlanet: -1,
			world: -1,
			level: 79,
			icon: "book",
			title: "Speedfarming",
			fire: function () {
				unlockUpgrade("Speedfarming");
			}
		},
		Megafarming:{
			message: "You found a book called Megafarming! It indicates that you should actually water your crops. Brilliant!",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			world: -1,
			level: 79,
			icon: "book",
			title: "Megafarming",
			blockU2: true,
			fire: function () {
				unlockUpgrade("Megafarming");
			}
		},

		Speedlumber: {
			message: "You found a book called Speedlumber! It looks long.",
			brokenPlanet: -1,
			world: -1,
			level: 69,
			icon: "book",
			title: "Speedlumber",
			fire: function () {
				unlockUpgrade("Speedlumber");
			}
		},
		Megalumber: {
			message: "You found a book called Megalumber! The quote on the back reads 'How much wood could a Wood Trimp chop if a Wood Trimp could chop wood?'",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			world: -1,
			level: 69,
			icon: "book",
			title: "Megalumber",
			blockU2: true,
			fire: function () {
				unlockUpgrade("Megalumber");
			}
		},
		Speedminer: {
			message: "You found a book called Speedminer!",
			brokenPlanet: -1,
			world: -1,
			level: 59,
			icon: "book",
			title: "Speedminer",
			fire: function() {
				if (game.global.challengeActive == "Metal" || game.global.challengeActive == "Transmute"){
					var challenge = game.challenges[game.global.challengeActive];
					if (game.jobs.Scientist.owned > 0){
						var notS = (game.jobs.Scientist.owned == 1) ? "s" : "";
						message("Your Scientist" + needAnS(game.jobs.Scientist.owned) + " stare" + notS + " blankly at you for a moment, then slowly and quietly place" + notS + " the new book on the shelves.", "Notices");
					}
					else{
						message("You don't have any Scientists to not know how to handle this book, so everything's chill.", "Notices");
					}
					challenge.heldBooks++;
					return;
				}
				unlockUpgrade("Speedminer");
			}
		},
		Megaminer: {
			message: "You found a book called Megaminer! The front is really shiny and has a Trimp on it. Creepy, it seems to follow your eyes.",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			world: -1,
			level: 59,
			icon: "book",
			title: "Megaminer",
			blockU2: true,
			fire: function() {
				if (game.global.challengeActive == "Metal"){
					message("Your scientists appreciate the fact that you've managed to find another useless book, but they make sure to let you know it's still useless.", "Notices");
					game.challenges.Metal.heldMegaBooks++;
					return;
				}
				unlockUpgrade("Megaminer");
			}
		},
		Geneticist: {
			message: "Your Trimps report a strange bronze object on the floor, and you decide to come look at it. It looks freaky, so you ask one of your Trimps to pick it up first. He instantly starts itching his face and babbling off a bunch of science stuff, so you let another Trimp touch it and he does the same. This seems to make your Trimps smarter than Scientists, but may cause side effects.",
			brokenPlanet: 1,
			addClass: "brokenUpgrade",
			world: 70,
			level: 49,
			title: "The Great Bell of Trimp",
			icon: "bell",
			fire: function () {
				unlockJob("Geneticist");
			}
		},
		Foreman: {
			message: "You found a crafting foreman! He will build buildings automatically for you!",
			world: -1,
			level: 89,
			icon: "user",
			title: "Foreman",
			fire: function () {
				game.global.autoCraftModifier += 0.25;
				updateForemenCount();
			}
		},
		Anger: {
			world: 20,
			level: 99,
			blockU2: true,
			icon: "eye-open",
			title: "The End Of The Road",
			fire: function () {
				message(	"You look down and see a green gem that seems to stare back. You pick it up and feel adrenaline surge through your body. Probably best to bring this back to the lab for some research.", "Story");
				unlockUpgrade("Anger");
			}
		},
		Rage: {
			world: 15,
			level: 99,
			blockU1: true,
			icon: "eye-open",
			title: "The Start Of A Journey",
			fire: function(){
				message("You look down and see a blue gem that seems to stare back. You pick it up and are immediately overwhelmed by feelings of intense power. You figure this could be used to focus your Portal Generator in this Universe.", "Story");
				unlockUpgrade("Rage");
			}
		},
		PrismaticPalace: {
			world: 20,
			level: 99,
			blockU1: true,
			icon: "certificate",
			title: "The Prismatic Palace Awaits...",
			fire: function () {
				message("You found a map to a strange place. Better go kill stuff in it!", "Story");
				createMap(20, "Prismatic Palace", "Prismatic", 4, 100, 4, true, true);
			}
		},
		MeltingPoint: {
			world: 50,
			level: 55,
			blockU1: true,
			icon: "*map",
			title: "Not a place to get fondue",
			fire: function () {
				message("This map is hot to the touch. Better go inside!", "Story");
				createMap(50, "Melting Point", "Melting", 4, 100, 3.5, true, true);
			}
		},
		Coordination: {
			message: "You find an ancient book titled Coordination. Exciting.",
			world: -1,
			level: 99,
			get icon (){
				return (game.global.world == mutations.Magma.start() - 1) ?  "*archive2" : "book";
			},
			title: "Coordination",
			fire: function() {
				if (game.global.challengeActive == "Trimp"){
					if (!checkIfLiquidZone())
						message("Your scientists don't think that it's a very smart idea to try any of the suggestions in this book.", "Notices");
					game.challenges.Trimp.heldBooks ++;
					return;
				}
				unlockUpgrade("Coordination");
			}
		},
		Blockmaster: {
			message: "You found a book discussing tactics for better blocking!",
			blockU2: true,
			world: 4,
			level: 29,
			icon: "book",
			title: "Blockmaster",
			fire: function () {
				unlockUpgrade("Blockmaster");
			}
		},
		Egg: {
			message: "This egg looks crazy. Seriously, guys, come look at this crazy egg!",
			world: 17,
			level: 55,
			icon: "record",
			title: "Egg",
			fire: function () {
				if (game.upgrades.Egg.allowed === 0) unlockUpgrade("Egg");
			}
		},
		Doom: {
			world: 33,
			level: [15, 50],
			icon: "th-large",
			title: "Too dark to see",
			blockU2: true,
			fire: function () {
				createMap(33, "Trimple Of Doom", "Doom", 3, 100, 1.8, true);
				message("There is something strange about this map. It doesn't seem to reflect any light at all, just pure darkness.", "Story");
			}
		},
		Atlantrimp: {
			world: 33,
			level: [15, 50],
			blockU1: true,
			icon: "th-large",
			title: "It's a wet map",
			fire: function () {
				createMap(33, "Atlantrimp", "Atlantis", 3, 100, 1.8, true);
				message("You found an incredibly wet map. It seems to actually be generating water out of nothing, making storage very difficult without flooding the surrounding area. You're sure your Scientists can handle it though, they seem pretty smart.", "Story");
			}
		},
		Worshipper: {
			message: "Having some Trimps Worship Scruffy might help him grow stronger quicker!",
			world: 50,
			level: [10,70],
			blockU1: true,
			icon: "*library",
			title: "Cult of Scruffy",
			fire: function(){
				unlockJob("Worshipper");
			}
		},
		FirstMap: {
			world: 6,
			level: [1, 5],
			icon: "th-large",
			title: "Tricky Paradise",
			fire: function () {
				game.global.mapsUnlocked = true;
				unlockMapStuff();
				createMap(6, "Tricky Paradise", "Plentiful", 1.2, 45, 0.85);
				message("You found your first map! Travel to your map chamber to check it out.", "Story");
			}
		},
		easterEgg: {
			world: -1,
			get locked(){
				return ((holidayObj.checkActive("Eggy") ? 0 : 1));
			},
			level: [0, 99],
			title: "Colored Egg",
			icon: "*droplet",
			addClass: function () {
				return "easterEgg easterEgg" + getRandomIntSeeded(game.global.eggSeed + 1, 0, 4);
			},
			chance: 0.2,
			fire: function (){}
		},
		//Multiples
		Map: {
			world: -1,
			startAt: 6,
			level: [0, 20],
			repeat: 10,
			icon: "th",
			title: "Map Fragments",
			fire: function() {
				var amt = rewardResource("fragments");
				message("You found " + prettify(amt) + " map fragments!", "Loot", "th", null, "secondary");
			}
		},
		//portal Trumps
		fiveTrimpMax: {
			world: -1,
			level: [10, 20],
			icon: "gift",
			title: "Battle Territory Bonus!",
			repeat: 45,
			fire: function () {
				var amt = 5 + (game.portal.Trumps.modifier * getPerkLevel("Trumps"));
				game.global.totalGifts += amt;
				amt = addMaxHousing(amt, bwRewardUnlocked("AutoStructure"));
				message("You have cleared enough land to support " + prettify(amt) + " more Trimps!", "Loot", "gift", null, "secondary");
			}
		},
		fruit: {
			world: -1,
			level: [0, 4],
			icon: "apple",
			title: "Food",
			repeat: 9,
			fire: function (level) {
				var amt = rewardResource("food", 0.5, level);
				message("That guy just left " + prettify(amt) + " food on the ground! Sweet!", "Loot", "apple", null, 'primary');
			}
		},
		groundLumber: {
			world: -1,
			level: [0, 2],
			icon: "tree-deciduous",
			title: "Wood",
			repeat: 8,
			fire: function (level) {
				var amt = rewardResource("wood", 0.5, level);
				message("You just found " + prettify(amt) + " wood! That's pretty neat!", "Loot", "tree-deciduous", null, 'primary');
			}
		},
		freeMetals: {
			world: -1,
			level: [3, 5],
			title: "Metal",
			icon: "*cubes",
			repeat: 6,
			fire: function (level) {
				if (game.global.challengeActive == "Transmute"){
					message("As expected, there was no Metal here.", "Loot", "*cubes", null, "primary");
					return;
				}
				var amt = rewardResource("metal", 0.5, level);
				message("You just found " + prettify(amt) + " bars of metal! Convenient!", "Loot", "*cubes", null, 'primary');
			}
		},
		spireMetals: {
			world: -1,
			start: 200,
			level: [1,4],
			repeat: 4,
			fire: function (level) {
				if (game.global.challengeActive == "Transmute"){
					message("As expected, there was no Metal here.", "Loot", "*cubes", null, "primary");
					return;
				}
				if (!game.global.spireActive) return;
				var amt = rewardResource("metal", 25, level);
				message("There sure is a lot of metal just tossed around in this Spire! You just found " + prettify(amt) + " more!", "Loot", "*safe", "spireMetalsMsg", "primary");
			},
			specialFilter: function (){
				return checkIfSpireWorld();
			},
			title: "Spire Metal",
			icon: "*safe",
			addClass: "spireMetals"
		}
	},
	//buildings with percent = true cannot have multiple purchases at a time
	buildings: {
		Trap: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 5,
			tooltip: function () {
				var catchAmt = (getPerkLevel("Bait") + 1);
				var s = (catchAmt > 1) ? "s" : "";
				return "Each Trap allows you to catch " + prettify(catchAmt) + " thing" + s + ".";
			},
			cost: {
				food: 10,
				wood: 10
			},
			first: function () {
				if (document.getElementById("trimps").style.visibility == "hidden") fadeIn("trimps", 10);
			}
		},
		Barn: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 10,
			tooltip: "Increases your maximum food by 100%.",
			percent: true,
			cost: {
				food: function () {
					return calculatePercentageBuildingCost("Barn", "food", 0.25);
				}
			},
			increase: {
				what: "food.max.mult",
				by: 2
			}
		},
		Shed: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 10,
			percent: true,
			tooltip: "Increases your maximum wood by 100%.",
			cost: {
				wood: function () {
					return calculatePercentageBuildingCost("Shed", "wood", 0.25);
				}
			},
			increase: {
				what: "wood.max.mult",
				by: 2
			}
		},
		Forge: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 10,
			percent: true,
			tooltip: "Increases your maximum metal by 100%.",
			cost: {
				metal: function () {
					return calculatePercentageBuildingCost("Forge", "metal", 0.25);
				}
			},
			increase: {
				what: "metal.max.mult",
				by: 2
			}
		},
		Hut: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 10,
			AP: true,
			tooltip: "Has room for $incby$ more lovely Trimp{s}. All Trimp housing has enough workspaces for only half of the Trimps that can live there.",
			cost: {
				food: [125, 1.24],
				wood: [75, 1.24]
			},
			increase: {
				what: "trimps.max",
				by: 3
			}
		},
		House: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 20,
			AP: true,
			tooltip: "A better house for your Trimps! Each house supports up to $incby$ more Trimp{s}.",
			cost: {
				food: [1500, 1.22],
				wood: [750, 1.22],
				metal: [150, 1.22]
			},
			increase: {
				what: "trimps.max",
				by: 5
			}
		},
		Mansion: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 60,
			AP: true,
			tooltip: "A pretty sick mansion for your Trimps to live in. Each Mansion supports $incby$ more Trimp{s}.",
			cost: {
				gems: [100, 1.2],
				food: [3000, 1.2],
				wood: [2000, 1.2],
				metal: [500, 1.2]

			},
			increase: {
				what: "trimps.max",
				by: 10
			}
		},
		Hotel: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 120,
			AP: true,
			tooltip: "A fancy hotel for many Trimps to live in. Complete with room service and a mini bar. Supports $incby$ Trimp{s}.",
			cost: {
				gems: [2000, 1.18],
				food: [10000, 1.18],
				wood: [12000, 1.18],
				metal: [5000, 1.18]

			},
			increase: {
				what: "trimps.max",
				by: 20
			}
		},
		Resort: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 240,
			AP: true,
			tooltip: "A huge resort for your Trimps to live in. Sucks for the ones still stuck in huts. Supports $incby$ Trimp{s}.",
			cost: {
				gems: [20000, 1.16],
				food: [100000, 1.16],
				wood: [120000, 1.16],
				metal: [50000, 1.16]

			},
			increase: {
				what: "trimps.max",
				by: 40
			}
		},
		Gateway: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 480,
			AP: true,
			tooltip: "A Gateway to another dimension, where your Trimps can sleep and work. Supports $incby$ Trimp{s}.",
			cost: {
				fragments: [3000, 1.14],
				gems: [20000, 1.14],
				metal: [75000, 1.14]
			},
			increase: {
				what: "trimps.max",
				by: 100
			}
		},
		Wormhole: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 600,
			blockU2: true,
			AP: true,
			tooltip: "Use your crazy, helium-cooled, easy-to-aim wormhole generator to create easy-to-travel links to other colonizable planets where your Trimps can sleep and work. Each supports $incby$ Trimps. <b>This building costs helium to create.</b>",
			cost: {
				helium: [10, 1.075],
				metal: [100000, 1.1]
			},
			increase:{
				what: "trimps.max",
				by: 1500
			}
		},
		Collector: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 1200,
			AP: true,
			tooltip: "Each collector allows you to harvest more of the power of your home star, allowing your Trimps to colonize a larger chunk of your solar system. Each supports $incby$ Trimp{s}.",
			cost: {
				gems: [500000000000, 1.12]
			},
			increase: {
				what: "trimps.max",
				by: 5000
			}
		},
		Warpstation: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 1200,
			origTime: 1200,
			AP: true,
			blockU2: true,
			tooltip: "Create a gigantic Warpstation, capable of housing tons of Trimps and instantly transporting them back to the home planet when needed. Supports $incby$ Trimps.",
			cost: {
				gems: [100000000000000, 1.4],
				metal: [1000000000000000, 1.4]
			},
			increase: {
				what: "trimps.max",
				by: 10000
			}
		},
		Hub: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 1,
			AP: false,
			blockU1: true,
			tooltip: "<p>Cannot be purchased directly. Level is always equal to your total amount of Huts, Houses, Mansions, Hotels, Resorts, Gateways, and Collectors. Supports $incby$ Trimps.</p><p>Automatically unlocks on reaching Zone 60 in Universe 2</p>",
			increase: {
				what: "trimps.max",
				by: 25000
			},
			onUnlock: function(){
				var buildings = game.buildings;
				var collectors = buildings.Collector.owned;
				if (autoBattle.oneTimers.Collectology.owned) collectors *= autoBattle.oneTimers.Collectology.getHubs();
				var total = buildings.Hut.owned + buildings.House.owned + buildings.Mansion.owned + buildings.Hotel.owned + buildings.Resort.owned + buildings.Gateway.owned + collectors;
				addMaxHousing(this.increase.by * total, bwRewardUnlocked("AutoStructure"));
				this.owned = total;
				this.purchased = total;
			}
		},
		Gym: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 20,
			AP: true,
			blockU2: true,
			tooltip: "A building where your Trimps can work out. Each Gym increases the amount of damage each trimp can block by $incby$~",
			cost: {
				wood: [400, 1.185]
			},
			increase: {
			what: "global.block",
			by: 4
			},
			fire: function () {
				if (game.upgrades.Gymystic.done === 0) return;
				var oldBlock = game.buildings.Gym.increase.by;
				game.buildings.Gym.increase.by *= (game.upgrades.Gymystic.modifier + (0.01 * (game.upgrades.Gymystic.done - 1)));
				game.global.block += ((game.buildings.Gym.increase.by - oldBlock) * (game.buildings.Gym.owned));
			}
		},
		Smithy: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 120,
			AP: true,
			blockU1: true,
			tooltip: "Build a Smithy to help produce better Equipment for your Trimps. Each Smithy in your village increases Trimp Attack and Health by 25% (compounding).",
			cost: {
				get gems(){var exp = (Fluffy.isRewardActive('smithy')) ? 40 : 50; return [500, exp]},
				get metal() {var exp = (Fluffy.isRewardActive('smithy')) ? 40 : 50; return [10000, exp]},
				get wood(){var exp = (Fluffy.isRewardActive('smithy')) ? 40 : 50; return [5000, exp]}
			},
			getMult: function(){
				return Math.pow(1.25, this.owned);
			},
			fire: function(){
				addSoldierHealth(0.25);
				if (game.global.challengeActive == "Quest" && game.challenges.Quest.questId == 6) game.challenges.Quest.checkQuest();
			}
		},
		Tribute: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 120,
			AP: true,
			tooltip: "Pay a tribute of food to your Dragimp, increasing his appetite and his speed. He will gather gems 5% faster (compounding).",
			cost: {
				food: [10000, 1.05]
			},
			increase: {
				what: "Dragimp.modifier.mult",
				by: 1.05
			}
		},
		Nursery: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 120,
			AP: true,
			blockU2: true,
			get tooltip () {
				if (mutations.Magma.active())
					return "<p>Magma is generally not conductive to a healthy Nursery environment. Each Nursery will still increase Trimps per second from breeding by 1% (compounding), but 10% of your active Nurseries will shut down each Zone as the Magma moves closer. Safety first!</p><p>You have purchased " + prettify(this.purchased) + " total Nurseries.</p>";
				return "Construct a gem-powered nursery, where baby Trimps can grow up faster. Increases Trimps per second from breeding by 1% (compounding).";

			},
			cost: {
				gems: [400000, 1.06],
				wood: [1000000, 1.06],
				metal: [500000, 1.06]
			}
		},
		Microchip: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 1000,
			blockU1: true,
			tooltip: function () {
				var text = "Unlocks a" + ((game.buildings.Microchip.owned == 0) ? "" : "nother") + " Scientist level, upgrading your portal and <b>allowing you to " + getScientistInfo(game.buildings.Microchip.purchased + 1, true) + " every time you Portal to this Universe</b>.<br/><br/>Microchips attach directly to your Portal Device, and only ever have to be purchased once. Your Portal Device has room for 5 total Microchips."
				return text;
			},
			cost: {
				science: [1000000, 1000]
			},
			fire: function(){
				if (this.owned == 5) {
					this.locked = 1;
					var elem = document.getElementById('Microchip');
					if (elem) document.getElementById('buildingsHere').removeChild(elem);
				}
				if (this.owned > 5) this.owned = 5;
			}
		},
		Antenna: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 100000,
			blockU1: true,
			tooltip: function(){
				var text = "<p>Build an antenna for your Meteorologists to use in their meteorological duties. Each Antenna increases the bonus granted per Meteorologist by a flat 0.05% (20 Antennas would double their bonus), but only 1 Antenna can be built for every 5 Zones completed above Z100 in Universe 2 on your highest run ever. Thanks to the extra-dimensional origin of the Antenna design, these Antennas persist in the world when you use your Time Portal!</p>";
				text += "<p>Once 5 antennas have been built, your Trimps can use the new advanced weather data to increase the yield of crops, granting 50% of the Meteorologist's bonus percentage to Food income as well.</p>"
				text += "<p>Once 10 Antennas have been built, your Soldiers can use the data to always properly dress for the weather, granting 50% of the Meteorologist's bonus percentage to Soldier Health.</p>";
				text += "<p>Once 15 Antennas have been built, the network will be strong enough to locate rich mineral deposits all over the planet, granting 50% of the Meteorologist's bonus percentage to Mining income!</p>";
				text += "<p>Once 20 Antennas have been built, the network becomes so strong that all non-Radon Meteorologist bonuses are increased to 75% of the Meteorologist's bonus! For each 5 Antennas built after 20, the Meteorologists' non-Radon bonuses are increased by another 25%.</p>"
				return text;
			},
			cost: {
				metal: [1e30,50]
			},
			getExtraMult: function(){
				if (this.owned < 20) return 0.5;
				return 0.5 + (0.25 * Math.floor((this.owned - 15)/5));
			}
		},
		Laboratory: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 1000,
			blockU1: true,
			AP: true,
			tooltip: function(){
				var lab = game.buildings.Laboratory;
				var text = "Build a giant Laboratory that Cruffys can use for research. Each Laboratory constructed increases Cruffys' Exp gain by 10% (compounding), but will pollute the world with toxic waste and research chemicals, increasing all Enemy attack and health by 3.5% (compounding).";
				if (lab.owned > 0) text += "<br/><br/><b>Currently increasing Cruffys' Exp by " + prettify(100 * (lab.getExpMult() - 1)) + "% and Enemy attack and health by " + prettify(100 * (lab.getEnemyMult() - 1)) + "%.</b>"
				return text;
			},
			getExpMult: function(){
				return Math.pow(1.1, this.owned);
			},
			getEnemyMult: function(){
				return Math.pow(1.035, this.owned);
			},
			cost: {
				metal: [100, 1.5],
				food: [100, 1.5]
			}
		}
	},
//jobs
	jobs: {
		Farmer: {
			locked: 1,
			owned: 0,
			tooltip: "Train one of your Trimps in the ancient art of farming. Each Farmer harvests $modifier$ food per second.",
			cost: {
				food: 5
			},
			increase: "food",
			modifier: 0.5
		},
		Lumberjack: {
			locked: 1,
			owned: 0,
			tooltip: "Show a Trimp how to cut one of those weird trees down. Each Lumberjack hauls back $modifier$ logs per second.",
			cost: {
				food: 5
			},
			increase: "wood",
			modifier: 0.5
		},
		Miner: {
			locked: 1,
			owned: 0,
			tooltip: "Send your misbehaving Trimps to the mines for some therapeutic work. Each Miner can find and smelt $modifier$ bars of metal per second.",
			cost: {
				food: 20
			},
			increase: "metal",
			modifier: 0.5
		},
		Scientist: {
			locked: 1,
			owned: 0,
			tooltip: "It takes some patience, but you can teach these Trimps to do some research for you. Each Scientist records $modifier$ units of pure science each second.",
			cost: {
				food: 100
			},
			increase: "science",
			modifier: 0.5
		},
		Trainer: {
			locked: 1,
			allowAutoFire: true,
			owned: 0,
			blockU2: true,
			tooltip: function () {
				var text = "Each trainer will increase the base amount your soldiers can block by ";
				var heirloomBonus = getHeirloomBonus("Shield", "trainerEfficiency");
				var modifier = game.jobs.Trainer.modifier;
				if (heirloomBonus > 0){
					modifier = calcHeirloomBonus("Shield", "trainerEfficiency", modifier).toFixed(1);
					return text + modifier + "%. (" + game.jobs.Trainer.modifier + "% increased by " + heirloomBonus + "% thanks to " + game.global.ShieldEquipped.name + ")";
				}
				return text + modifier + "%.";
			},
			cost: {
				food: [750, 1.1]
			},
			increase: "custom",
			modifier: 20
		},
		Explorer: {
			locked: 1,
			allowAutoFire: true,
			owned: 0,
			tooltip: "Each explorer will find an average of $modifier$ fragments each second.",
			cost: {
				food: [15000, 1.1]
			},
			increase: "fragments",
			modifier: 0.4
		},
		Dragimp: {
			locked: 1,
			owned: 0,
			increase: "gems",
			modifier: 0.5
		},
		Geneticist: {
			locked: 1,
			allowAutoFire: true,
			owned: 0,
			blockU2: true,
			get tooltip (){
				var text = "<p>Each Geneticist will increase the health of each Trimp by 1% (compounding), but slows the rate at which baby Trimps grow by 2% (compounding).</p>"
				if (this.owned > 0) {
					var breedMult = Math.pow(.98, game.jobs.Geneticist.owned);
					var breedDisplay = (breedMult > 0.0001) ? breedMult.toFixed(4) : breedMult.toExponential(3);
					var healthMult = Math.pow(1.01, this.owned);
					var healthDisplay = prettify((healthMult * 100) - 100) + "%";
					text += "<p>Owning " + prettify(this.owned) + " Geneticist" + ((this.owned == 1) ? "" : "s") + " multiplies your breed speed by " + breedDisplay + ", and adds " + healthDisplay + " Health.</p>";
				}
				return text;
			},
			cost: {
				food: [1000000000000000, 1.03],
			},
			increase: "custom",
			modifier: 1
		},
		Magmamancer: {
			locked: 1,
			owned: 0,
			blockU2: true,
			allowAutoFire: true,
			get tooltip(){
				var timeStr;
				var max = 120;
				var timeOnZone = Math.floor((getGameTime() - game.global.zoneStarted) / 60000);
				if (game.talents.magmamancer.purchased) timeOnZone += 5;
				if (game.talents.stillMagmamancer.purchased){
					timeOnZone = Math.floor(timeOnZone + game.global.spireRows);
					var extraMax = game.global.spireRows * 0.5;
					max = Math.floor((extraMax + max) / 10) * 10;
				}
				var bonus = (this.getBonusPercent() - 1) * 100;

				if (timeOnZone >= max)
					timeStr = "over " + max + " minutes (Max)";
				else{
					var remaining = 10 - (timeOnZone % 10);
					var nextBonus = ((this.getBonusPercent(false, Math.floor(timeOnZone / 10) + 1) - 1) * 100);
					timeStr = prettify(timeOnZone) + " minute" + ((timeOnZone == 1) ? "" : "s") + ". In " + prettify(remaining) + " minute" + ((remaining == 1) ? "" : "s") + ", this bonus will increase to " + prettify(nextBonus) + "%";
					if (timeOnZone < 10) bonus = 0;
				}
				var currentMag = (((1 - Math.pow(0.9999, this.owned)) * 3));
				var nextMag = (((1 - Math.pow(0.9999, this.owned + 1)) * 3));
				var nextBonus = (1 - (currentMag / nextMag)) * 100;
				var textString = "<p>Train a Magmamancer to craft pickaxe heads infused with Gems and Magma, custom for the unique rocks in each Zone. The more Magmamancers you have and the longer you spend in one Zone, the more Metal your Trimps will be able to gather!</p><p>For each 10 minutes you spend in a Zone with Magmamancers up to " + max + " minutes, your Magmamancer bonus will increase by 20% (compounding). Your current bonus is <b>" + prettify(bonus) + "%</b>, and " + ((game.talents.magmamancer.purchased) ? "counting your Magmamancermancy " + ((game.talents.stillMagmamancer.purchased) ? " Masteries" : " Mastery") + " " : "") + "you've been on this Zone for " + timeStr + ".</p>";
				if (this.owned > 0) textString += "<p>Your next Magmamancer will increase the total bonus by " + prettify(nextBonus) + "% (compounding, hold Ctrl to see formula)</p>";
				else textString += "<p>After training your first Magmamancer, your bonus metal will be " + prettify((nextMag * (Math.pow(1.2, this.getBonusPercent(true)) - 1)) * 100) + "%. (Hold Ctrl to see formula)</p>";
				if (ctrlPressed) textString += "<b><p>M = Magmamancer count. T = Time on Zone in minutes, divided by 10, rounded down.</p><p>Metal/Sec *= 1 + (((1 - (0.9999 ^ M)) * 3) * ((1.2 ^ T) - 1))</p><b>";
				return textString;
			},
			cost: {
				gems: [1e60, 1.01]
			},
			increase: "custom",
			modifier: 1,
			getBonusPercent: function (justStacks, forceTime) {
				var boostMult = 0.9999;
				var boostMax = 3;
				var expInc = 1.2;
				var timeMax = 12;
				var timeOnZone;
				if (typeof forceTime === 'undefined'){
					var timeOnZone = getGameTime() - game.global.zoneStarted;
					if (game.talents.magmamancer.purchased) timeOnZone += 300000;
					if (game.talents.stillMagmamancer.purchased){
						timeOnZone = Math.floor(timeOnZone + (60000 * game.global.spireRows));
						var extraMax = game.global.spireRows * 0.05;
						timeMax = Math.floor(extraMax + timeMax);
					}
					timeOnZone = Math.floor(timeOnZone / 600000);
					
					if (timeOnZone > timeMax) timeOnZone = timeMax;
					else if (timeOnZone <= 0) return 1;
				}
				else timeOnZone = forceTime;
				if (justStacks) return timeOnZone;
				return 1 + ((((1 - Math.pow(boostMult, this.owned)) * boostMax)) * (Math.pow(expInc, timeOnZone) - 1));
			}
		},
		Amalgamator: {
			locked: 1,
			owned: 0,
			allowAutoFire: true,
			get tooltip(){
				var ratio = this.getTriggerThresh();
				var currentRatio = (game.resources.trimps.realMax() / game.resources.trimps.getCurrentSend());
				var text = "<p>Amalgamators cannot be hired or fired manually. They are magical beings that could barely be considered Trimps anymore, and they will automatically show up to your town whenever your total population to army size ratio rises above <b>" + prettify(ratio) + ":1</b>. Completing Spires II through V will each divide this ratio by 10. If your ratio ever falls below " + prettify(1e3) + ":1, an Amalgamator will leave. Your current ratio is <b>" + prettify(currentRatio) + ":1</b>. At your current army size, you need <b>" + prettify(ratio * game.resources.trimps.getCurrentSend()) + "</b> total Trimps to trigger the next Amalgamator.</p></p><p>Amalgamators fuse some of your spare Trimps to other soldiers, greatly strengthening them. Each Amalgamator increases the amount of Trimps that must be sent into each battle by 1000x (compounding), increases health by 40x (compounding), and increases damage by 50% " + ((game.talents.amalg.purchased) ? "(compounding)" : "(additive)") + ".</p><p>In addition, having at least one Amalgamator will cause Anticipation stacks to increase based on when the last soldiers were sent, rather than being based on time spent actually breeding.</p>";
				if (game.global.challengeActive == "Trimp"){
					text += "<p><i>" + toZalgo("This particular Universe seems to directly conflict with the Amalgamators, yet they're here and the Trimps they Amalgamate seem immune to the dimensional restrictions. Things are getting weird though.", 1, Math.ceil(game.global.world / 100)) + "</i></p>";
				}
				else
					text += "<p><i>Some say the Amalgamators are a curse, some say they're a blessing. The Amalgamators themselves mostly just say \"Blerghhhh\".</i></p>";
				return text;
			},
			cost: {
			},
			increase: "custom",
			populationModifier: 1000,
			healthModifier: 40,
			damageModifier: 0.5,
			fireThresh: 1e3,
			getTriggerThresh: function () {
				var startPoint = 1e10;
				var creditedSpires = game.global.lastSpireCleared;
				if (creditedSpires < 2) return startPoint;
				if (creditedSpires > 5) creditedSpires = 5;
				var reduction = Math.pow(10, (creditedSpires - 1));
				return (startPoint / reduction);
			},
			getFireThresh: function () {
				return this.fireThresh;
			},
			getHealthMult: function () {
				return Math.pow(this.healthModifier, this.owned);
			},
			getPopulationMult: function () {
				return Math.pow(this.populationModifier, this.owned);
			},
			getDamageMult: function () {
				if (game.talents.amalg.purchased) return Math.pow((1 + this.damageModifier), this.owned);
				return (this.owned * this.damageModifier) + 1;
			}
		},
		Meteorologist: {
			locked: 1,
			owned: 0,
			vestedHires: 0,
			blockU1: true,
			allowAutoFire: true,
			get tooltip(){
				var pct = (1 + (0.05 * game.buildings.Antenna.owned))
				var text = "<p>Increase the amount of Radon gained from all sources by " + prettify(pct) + "% per Meteorologist hired. Meteorologists require some time to get situated after being hired, and must be active for an entire Zone before they can start collecting any extra Radon.</p>";
				if (this.owned != this.vestedHires){
					var notVested = this.owned - this.vestedHires;
					text += "<p>You have " + this.owned + " Meteorologist" + needAnS(this.owned) + ", but " + notVested + " " + ((notVested == 1) ? "was" : "were") + " hired on this Zone and " + ((notVested == 1) ? "is" : "are") + " not yet available.</p>";
				}
				text += "<p>" + this.vestedHires + " Meteorologist" + needAnS(this.vestedHires) + " " + ((this.vestedHires == 1) ? "is" : "are") + " currently collecting, granting " + prettify(this.vestedHires * pct) + "% extra Radon.</p>";
				if (game.buildings.Antenna.owned >= 5 && this.vestedHires > 0){
					text += "<p>Thanks to your super cool Antenna array, you're also gaining +" + prettify((this.getExtraMult() - 1) * 100) + "% extra Food from gathering";
					if (game.buildings.Antenna.owned >= 10){
						text += ((game.buildings.Antenna.owned >= 15) ? ", " : " and ") + " Health for your Soldiers";
						if (game.buildings.Antenna.owned >= 15) text += ", and Metal from mining";
					}
					text += "!</p>";
				}
				return text;
			},
			increase: "custom",
			cost: {
				food: [1e6, 5]
			},
			getMult: function(){
				var pct = (0.01 + (0.0005 * game.buildings.Antenna.owned));
				return 1 + (this.vestedHires * pct);
			},
			getExtraMult: function(){
				var mult = this.getMult() - 1;
				mult *= game.buildings.Antenna.getExtraMult();
				return (1 + mult);
			},
			afterFire: function(){
				if (this.vestedHires > this.owned) this.vestedHires = this.owned;
			},
			onNextWorld: function(){
				this.vestedHires = this.owned;
			}
		},
		Worshipper: {
			locked: 1,
			owned: 0,
			blockU1: true,
			allowAutoFire: true,
			get tooltip(){
				return "Worshippers always cost 25% of the total amount of Food gathered and looted from World or Maps in your previous 4 Zones (not including current Zone). Each Worshipper grants a 0.5% chance to grant 25-50% of an entire Zone worth of Scruffy Exp per World Cell cleared. However, 2 Worshippers will stop Worshipping after each Zone cleared. Max of 50."
			},
			cost: {
				get food(){return game.jobs.Worshipper.getCost()},
			},
			getCost: function(){
				var num = 0;
				if (game.global.zoneRes.length >= 2){
					for (var x = 1; x < game.global.zoneRes.length; x++){
						num += game.global.zoneRes[x];
					}
				}
				num *= 0.25;
				return Math.max(num,1);
			},
			onNextWorld: function(){
				if (this.owned <= 2) this.owned = 0;
				else this.owned -= 2;
			},
			getXpChance: function(){
				return this.owned * 0.5;
			},
			getCellPenalty: function(){
				return this.owned * 0.0005;
			},
			max: 50,
			increase: "custom"
		}
	},

	goldenUpgrades: {
		Helium: {
			tooltip: function() {
				return "Increase " + heliumOrRadon() + " gain by " + prettify(game.goldenUpgrades.Helium.nextAmt() * 100) + "%.";
			},
			nextAmt: function() {
				return 0.01 * (game.global.goldenUpgrades + 1);
			},
			currentBonus: 0,
			purchasedAt: []
		},
		Battle: {
			tooltip: function() {
				return "Increase Trimp attack and health by " + prettify(game.goldenUpgrades.Battle.nextAmt() * 100) + "%.";
			},
			nextAmt: function() {
				return 0.03 * (game.global.goldenUpgrades + 1);
			},
			currentBonus: 0,
			purchasedAt: []
		},
		Void: {
			tooltip: function() {
				return "Decrease the minimum amount of enemies between Void Map drops by " + prettify(game.goldenUpgrades.Void.nextAmt() * 100) + "%.";
			},
			nextAmt: function() {
				return 0.02 * (game.global.goldenUpgrades + 1);
			},
			currentBonus: 0,
			purchasedAt: []
		}
	},

	upgrades: {
	//Archaeology Upgrades
		attackRelic: {
			name: "Attack Relic",
			isRelic: true,
			relic: "attack",
			get tooltip() {return game.challenges.Archaeology.getTooltip("attack")},
			locked: 1,
			done: 0,
			allowed: -1,
			cost: {
				resources: {
					get science(){ return game.challenges.Archaeology.getNextCost()}
				}
			},
			fire: function(){
				game.challenges.Archaeology.buyRelic("attack");
			}
		},
		enemyAttackRelic: {
			name: "Enemy Attack Relic",
			isRelic: true,
			relic: "enemyAttack",
			get tooltip() {return game.challenges.Archaeology.getTooltip("enemyAttack")},
			locked: 1,
			done: 0,
			allowed: -1,
			cost: {
				resources: {
					get science(){ return game.challenges.Archaeology.getNextCost()}
				}
			},
			fire: function(){
				game.challenges.Archaeology.buyRelic("enemyAttack");
			}
		},
		radonRelic: {
			name: "Radon Relic",
			isRelic: true,
			relic: "radon",
			get tooltip() {return game.challenges.Archaeology.getTooltip("radon")},
			locked: 1,
			done: 0,
			allowed: -1,
			cost: {
				resources: {
					get science(){ return game.challenges.Archaeology.getNextCost()}
				}
			},
			fire: function(){
				game.challenges.Archaeology.buyRelic("radon");
			}
		},
		scienceRelic: {
			name: "Resource Relic",
			isRelic: true,
			relic: "science",
			get tooltip() {return game.challenges.Archaeology.getTooltip("science")},
			locked: 1,
			done: 0,
			allowed: -1,
			cost: {
				resources: {
					get science(){ return game.challenges.Archaeology.getNextCost()}
				}
			},
			fire: function(){
				game.challenges.Archaeology.buyRelic("science");
			}
		},
		breedRelic: {
			name: "Breed Relic",
			isRelic: true,
			relic: "breed",
			get tooltip() {return game.challenges.Archaeology.getTooltip("breed")},
			locked: 1,
			done: 0,
			allowed: -1,
			cost: {
				resources: {
					get science(){ return game.challenges.Archaeology.getNextCost()}
				}
			},
			fire: function(){
				game.challenges.Archaeology.buyRelic("breed");
			}
		},
	//Important Upgrades
		Coordination: {
			locked: 1,
			tooltip: "This book will teach your soldiers how to utilize the buddy system. Fighting will now require <coord>% more Trimps (rounded up), but attack and health will grow for each new Trimp.",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: [250, 1.3],
					food: [600, 1.3],
					wood: [600, 1.3],
					metal: [300, 1.3]
				}
			},
			fire: function () {
				game.resources.trimps.maxSoldiers = Math.ceil(1.25 * game.resources.trimps.maxSoldiers);
				if (getPerkLevel("Coordinated")) game.portal.Coordinated.currentSend = Math.ceil(game.portal.Coordinated.currentSend * ((0.25 * Math.pow(game.portal.Coordinated.modifier, getPerkLevel("Coordinated"))) + 1));
			}
		},
		Gigastation: {
			locked: 1,
			allowed: 0,
			tooltip: "Prestige your Warpstation, increasing the amount of Trimps it can house by 20% and the base cost by 75%. There's no turning back, learning these blueprints will make your previous model of Warpstation obsolete but functional, and you will keep all Trimps housed there. Learning this will build one new Warpstation. <b>Holding Ctrl will cause as many Warpstations as you currently own to be purchased immediately after Gigastation, if you can afford them.</b>",
			done: 0,
			cost: {
				resources: {
					gems: [100000000000000, 1.75],
					metal: [1000000000000000, 1.75],
					science: [100000000000, 1.4]
				}
			},
			fire: function (heldCtrl, noTip) {
				if (game.buildings.Warpstation.purchased > game.buildings.Warpstation.owned){
					clearQueue('Warpstation');
				}
				var oldAmt = game.buildings.Warpstation.owned;
				game.global.lastWarp = game.buildings.Warpstation.owned;
				game.buildings.Warpstation.increase.by *= 1.20;
				game.buildings.Warpstation.cost.gems[0] *= 1.75;
				game.buildings.Warpstation.cost.metal[0] *= 1.75;
				game.buildings.Warpstation.purchased = 1;
				game.buildings.Warpstation.owned = 1;
				addMaxHousing(game.buildings.Warpstation.increase.by, bwRewardUnlocked("AutoStructure"));
				if (!noTip) noTip = false;
				if ((ctrlPressed || heldCtrl) && oldAmt > 1) buyBuilding("Warpstation", false, noTip, oldAmt - 1);
			}
		},

	//One Time Use Upgrades, in order of common unlock order
		Battle: { //0
			locked: 1,
			tooltip: "Figure out how to teach these Trimps to kill some Bad Guys.",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 10
				}
			},
			fire: function () {
				fadeIn("equipmentTitleDiv", 10);
				fadeIn("equipmentTab", 10);
				fadeIn("battleContainer", 10);
				buildGrid();
				liquifyZone();
				drawGrid();
				game.global.BattleClock = -1;
				fadeIn("metal", 10);
				if (game.global.slowDone) {
					unlockEquipment("Gambeson");
					unlockEquipment("Arbalest");
				}
				if (bwRewardUnlocked("AutoJobs")){
					unlockJob("Lumberjack");
					buyAutoJobs(true);
				}
				if (getEnergyShieldMult() > 0) document.getElementById("blockDiv").style.visibility = "visible"
			}
		},
		Bloodlust: { //1
			locked: 1,
			tooltip: "This book will teach your Trimps to Battle on their own.",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 60,
					food: 150
				}
			},
			fire: function () {
				game.global.autoBattle = true;
				pauseFight(true);
				fadeIn("pauseFight", 1);
			}
		},
		Prismatic: { //U2 W2
			locked: 1,
			allowed: 0,
			tooltip: "Polish the strange Prism you found. When your Trimps bring the polished Prism to Battle, they gain <b>50%</b> of their maximum Health as <b>Prismatic Shield</b>!. All enemy damage hits your Prismatic Shield before Health, and Prismatic Shield always regenerates to full after an enemy is killed.",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 3500,
					wood: 2500,
					metal: 1500
				}
			},
			fire: function(){
				updateAllBattleNumbers();
				document.getElementById("blockDiv").style.visibility = "visible";
			}
		},
		Blockmaster: { //4
			locked: 1,
			allowed: 0,
			tooltip: "This book will increase the block gained from each Gym by 50%.",
			done: 0,
			cost: {
				resources: {
					science: [750, 1.17],
					food: [2000, 1.17],
					metal: [1000, 1.17]
				}
			},
			fire: function () {
				game.global.block = Math.ceil(1.5 * game.global.block);
				game.buildings.Gym.increase.by = Math.ceil(1.5 * game.buildings.Gym.increase.by);
			}
		},
		Trapstorm: { //10
			locked: 1,
			allowed: 0,
			tooltip: "This book details the fine art of teaching your foremen to actually do stuff instead of just sitting around. When asked, your foremen will start construction on a new Trap if the queue is empty.",
			done: 0,
			cost: {
				resources: {
					science: 10000,
					food: 100000,
					wood: 100000

				}
			},
			fire: function () {
				game.global.trapBuildAllowed = true;
				fadeIn("autoTrapBtn", 10);
				toggleAutoTrap(true);
			}
		},
		Shieldblock: { //11
			locked: 1,
			allowed: 0,
			tooltip: "This book explains methods of using a shield to actually block damage. The current shield will need to be completely destroyed and rebuilt, but it will give block instead of health. <b>This is permanent</b>. $Your Shield Must be Prestige III or higher$",
			done: 0,
			specialFilter: function () {
				return (game.equipment.Shield.prestige >= 3) ? true : false;
			},
			cost: {
				resources: {
					science: 3000,
					wood: 10000
				}
			},
			fire: function () {
			var equipment = game.equipment.Shield;
				prestigeEquipment("Shield", false, true);
				equipment.blockNow = true;
				equipment.tooltip = game.equipment.Shield.blocktip;
				equipment.blockCalculated = Math.round(equipment.block * Math.pow(1.19, ((equipment.prestige - 1) * game.global.prestige.block) + 1));
				levelEquipment("Shield", 1);
			}
		},
		Bounty: { //15
			locked: 1,
			tooltip: "This book will teach your Farmers, Lumberjacks, Miners, Scientists, and Explorers to all be twice as productive.",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: [40000, 2],
					food: [100000, 2],
					wood: [100000, 2],
					metal: [100000, 2]
				}
			},
			fire: function () {
				game.jobs.Farmer.modifier *= 2;
				game.jobs.Lumberjack.modifier *= 2;
				game.jobs.Miner.modifier *= 2;
				game.jobs.Scientist.modifier *= 2;
				game.jobs.Explorer.modifier *= 2;

			}
		},
		Egg: { //17
			locked: 1,
			allowed: 0,
			tooltip: "Your top scientists are pretty sure this is a Dragimp egg. They know Dragimps love shiny things, maybe it'll come out for some gems.",
			done: 0,
			cost: {
				resources: {
					gems: 10000
				}
			},
			fire: function () {
				game.jobs.Dragimp.owned = 1;
				fadeIn("gemsPs", 10);
				unlockBuilding("Tribute");
			}
		},
		Prismalicious: { //U2 Z20 Prismatic Palace
			locked: 1,
			allowed: 0,
			tooltip: "Once again, this Prism will need to be polished before it can offer your Trimps any protection. After it's polished, this Prism will grant an additional 50% Prismatic Shield to your Trimps!",
			done: 0,
			cost: {
				resources: {
					science: 10000,
					gems: 10000,
					wood: 15000
				}
			},
			fire: function(){

			}
		},
		Anger: { //20
			locked: 1,
			allowed: 0,
			tooltip: "Your scientists are pissed. Not because of anything you did, but this gem seems to be making them mad. It'll take some research, but you think you can create a map to the place the gem originated from.",
			done: 0,
			cost: {
				resources: {
					science: 100000,
					fragments: 15
				}
			},
			fire: function () {
				message("You just made a map to the Dimension of Anger! Should be fun!", "Notices");
				createMap(20, "Dimension of Anger", "Hell", 3, 100, 2.5, true, true);
			}
		},
		Rage: {
			locked: 1,
			allowed: 0,
			tooltip: "Unsurprisingly, that Rage Gem you brought back has everyone up the walls. You should probably hurry up and figure out a way to extract the map from inside before your Scientists end up killing eachother.",
			done: 0,
			cost: {
				resources: {
					science: 100000,
					fragments: 15
				}
			},
			fire: function () {
				message("You just made a map to the Dimension of Rage! Sounds like a great time!", "Notices");
				createMap(15, "Dimension of Rage", "Hell", 3, 100, 6, true, true);
			}
		},
		Gymystic: { //25
			locked: 1,
			allowed: 0,
			tooltip: "This book will cause each gym you purchase to increase the block provided by all Gyms by 5%. Each consecutive level of this upgrade will increase the block provided by an additional 1%. <b>The extra block provided compounds per Gym.</b>",
			done: 0,
			cost: {
				resources: {
					wood: 1000000000,
					science: 5000000
				}
			},
			modifier: 1.05,
			fire: function () {
				var oldBlock = game.buildings.Gym.increase.by;
				var base = (game.upgrades.Blockmaster.done) ? 6 : 4;
				game.buildings.Gym.increase.by = base * Math.pow(game.upgrades.Gymystic.modifier + (0.01 * (game.upgrades.Gymystic.done)), game.buildings.Gym.owned);
				game.global.block += ((game.buildings.Gym.increase.by - oldBlock) * game.buildings.Gym.owned);
			}
		},
		SuperShriek: {
			locked: 1,
			allowed: 0,
			get tooltip (){
				var text = "This book will teach your Robotrimp how to do a much better job of shrieking, allowing MagnetoShriek to be used on multiple Corrupted cells in addition to Improbabilities. Upgraded MagnetoShriek starts off only being able to affect 1 cell at a time, but each use after purchasing this upgrade will extend the bonus by one additional cell, up to a max of 5 cells (resets on portal). <br/><br/> Each new Bionic Wonderland clear starting at Z185 will permanently increase the cell count cap by 1.";
				var cap = 5;
				if (game.global.roboTrimpLevel >= 5)
					cap += game.global.roboTrimpLevel - 4;
				var cleared = (game.global.roboTrimpLevel - 4);
				text += " <b>You have cleared " + cleared + " Bionic Wonderland" + ((cleared == 1) ? "" : "s") + " at 185 or higher, and your MagnetoShriek cell count cap will be " + cap + "</b>";
				return text;
			}
		},
	//Formations
		Formations: {
			locked: 1,
			allowed: 0,
			tooltip: "The air may be filled with pollution, but your Trimps seem to be getting smarter and a battle technique from what could only be a past life has crept into your memory. This would probably be a good opportunity to teach it to your Trimps. Once researched, you will be able to enter the 'Heap Formation'. This can be toggled to increase your Trimps' health by 4x, but reduce block and attack by half.",
			done: 0,
			cost: {
				resources: {
					science: 10000000000,
					food: 100000000000
				}
			},
			fire: function () {
				unlockFormation("start");
			}
		},
		Dominance: {
			locked: 1,
			allowed: 0,
			tooltip: "Another formation has crept back into your memory. Where are these coming from? Who are you? Who cares, this one will allow your Trimps to deal 4x damage at the cost of half health and block.",
			done: 0,
			cost: {
				resources: {
					science: 20000000000,
					food: 200000000000
				}
			},
			fire: function () {
				unlockFormation(2);
			}
		},
		Barrier: {
			locked: 1,
			allowed: 0,
			tooltip: "Woah, you just remembered that all Trimps lifting their shields in the same direction at the same time can produce a nice protecting wall. Seems like common sense now that you thought of it. This formation increases block by 4x and cuts the amount of block that enemies can pierce by 50%, at the cost of half attack and health.",
			done: 0,
			cost: {
				resources: {
					science: 40000000000,
					food: 400000000000
				}
			},
			fire: function () {
				unlockFormation(3);
			}
		},
	//Jobs, in order of unlock
		Miners: {
			locked: 1,
			tooltip: "You really don't like reading books, but it seems better than mining yourself.",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 60,
					wood: 300,
					metal: 100
				}
			},
			fire: function () {
				unlockJob("Miner");
				autoBalanceJob("Miner");
			}
		},
		Scientists: {
			locked: 1,
			tooltip: "You really don't believe it, but that book indicates that Trimps can be smart. Better read it and find out how.",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 100,
					food: 350
				}
			},
			fire: function () {
				unlockJob("Scientist");
				autoBalanceJob("Scientist");
			}
		},
		Trainers: {
			locked: 1,
			tooltip: "This book holds all of the secrets of upper management. Train your Trimps to train other Trimps.",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 500,
					food: 1000
				}
			},
			fire: function () {
				unlockJob("Trainer");
			}
		},
		Explorers: {
			locked: 1,
			tooltip: "This book will allow you to hire trimps who can create map fragments for you!",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 50000,
					fragments: 5
				}
			},
			fire: function () {
				unlockJob("Explorer");
				fadeIn("fragmentsPs", 10);
			}
		},
		Magmamancers: {
			locked: 1,
			tooltip: "Your scientists think they can study this book to figure out how to train Trimps as Magmamancers. According to your scientists, according to legend, Magmamancers require gems instead of food as sustainance and can increase the rate of Metal gathering more and more as they stay on the same Zone.",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 50e15,
					gems: 1e60
				}
			},
			fire: function () {
				unlockJob("Magmamancer");
			}
		},
	//Housing upgrades, in order of unlock
		UberHut: {
				locked: 1,
				allowed: 0,
				tooltip: "This book will increase the space gained from each Hut by 100%.",
				done: 0,
				cost: {
					resources: {
						science: 30000,
						food: 200000,
						metal: 100000
					}
				},
				fire: function () {
					addMaxHousing(game.buildings.Hut.owned * game.buildings.Hut.increase.by, bwRewardUnlocked("AutoStructure"));
					game.buildings.Hut.increase.by *= 2;
				}
			},
		UberHouse: {
				locked: 1,
				allowed: 0,
				tooltip: "This book will increase the space gained from each House by 100%.",
				done: 0,
				cost: {
					resources: {
						science: 300000,
						food: 2000000,
						metal: 1000000
					}
				},
				fire: function () {
					addMaxHousing(game.buildings.House.owned * game.buildings.House.increase.by, bwRewardUnlocked("AutoStructure"));
					game.buildings.House.increase.by *= 2;
				}
			},
		UberMansion: {
				locked: 1,
				allowed: 0,
				tooltip: "This book will increase the space gained from each Mansion by 100%.",
				done: 0,
				cost: {
					resources: {
						science: 3000000,
						food: 20000000,
						metal: 10000000
					}
				},
				fire: function () {
					addMaxHousing(game.buildings.Mansion.owned * game.buildings.Mansion.increase.by, bwRewardUnlocked("AutoStructure"));
					game.buildings.Mansion.increase.by *= 2;
				}
			},
		UberHotel: {
				locked: 1,
				allowed: 0,
				tooltip: "This book will increase the space gained from each Hotel by 100%.",
				done: 0,
				cost: {
					resources: {
						science: 30000000,
						food: 200000000,
						metal: 100000000
					}
				},
				fire: function () {
					addMaxHousing(game.buildings.Hotel.owned * game.buildings.Hotel.increase.by, bwRewardUnlocked("AutoStructure"));
					game.buildings.Hotel.increase.by *= 2;
				}
			},
		UberResort: {
				locked: 1,
				allowed: 0,
				tooltip: "This book will increase the space gained from each Resort by 100%.",
				done: 0,
				cost: {
					resources: {
						science: 300000000,
						food: 2000000000,
						metal: 1000000000
					}
				},
				fire: function () {
					addMaxHousing(game.buildings.Resort.owned * game.buildings.Resort.increase.by, bwRewardUnlocked("AutoStructure"));
					game.buildings.Resort.increase.by *= 2;
				}
			},
	//Equipment Prestiges
		Supershield: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your shield. This will bring your shield to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of stats given. @",
			done: 0,
			cost: {
				resources: {
					science: [1200, 1.7],
					gems: [40, 3]
				}
			},
			prestiges: "Shield",
			fire: function () {
				prestigeEquipment("Shield");
			}
		},
		Dagadder: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your dagger. This will bring your dagger to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of attack given. @",
			done: 0,
			cost: {
				resources: {
					science: [1250, 1.7],
					gems: [60, 3]
				}
			},
			prestiges: "Dagger",
			fire: function () {
				prestigeEquipment("Dagger");
			}
		},
		Bootboost: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your boots. This will bring your boots to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of health given. @",
			done: 0,
			cost: {
				resources: {
					science: [1300, 1.7],
					gems: [70, 3]
				}
			},
			prestiges: "Boots",
			fire: function () {
				prestigeEquipment("Boots");
			}
		},
		Megamace: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your mace. This will bring your mace to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of attack given. @",
			done: 0,
			cost: {
				resources: {
					science: [1400, 1.7],
					gems: [100, 3]
				}
			},
			prestiges: "Mace",
			fire: function () {
				prestigeEquipment("Mace");
			}
		},
		Hellishmet: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your helmet. This will bring your helmet to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of health given. @",
			done: 0,
			cost: {
				resources: {
					science: [1450, 1.7],
					gems: [150, 3]
				}
			},
			prestiges: "Helmet",
			fire: function () {
				prestigeEquipment("Helmet");
			}
		},
		Polierarm: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your polearm. This will bring your polearm to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of attack given. @",
			done: 0,
			cost: {
				resources: {
					science: [1550, 1.7],
					gems: [225, 3]
				}
			},
			prestiges: "Polearm",
			fire: function () {
				prestigeEquipment("Polearm");
			}
		},
		Pantastic: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your pants. This will bring your pants to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of health given. @",
			done: 0,
			cost: {
				resources: {
					science: [1600, 1.7],
					gems: [275, 3]
				}
			},
			prestiges: "Pants",
			fire: function () {
				prestigeEquipment("Pants");
			}
		},
		Axeidic: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your axe. This will bring your axe to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of attack given. @",
			done: 0,
			cost: {
				resources: {
					science: [1700, 1.7],
					gems: [400, 3]
				}
			},
			prestiges: "Battleaxe",
			fire: function () {
				prestigeEquipment("Battleaxe");
			}
		},
		Smoldershoulder: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your shoulderguards. This will bring your shoulderguards to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of health given. @",
			done: 0,
			cost: {
				resources: {
					science: [1750, 1.7],
					gems: [525, 3]
				}
			},
			prestiges: "Shoulderguards",
			fire: function () {
				prestigeEquipment("Shoulderguards");
			}
		},
		Greatersword: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your greatsword. This will bring your greatsword to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of attack given. @",
			done: 0,
			cost: {
				resources: {
					science: [1850, 1.7],
					gems: [650, 3]
				}
			},
			prestiges: "Greatsword",
			fire: function () {
				prestigeEquipment("Greatsword");
			}
		},
		Bestplate: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your breastplate. This will bring your breastplate to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of health given. @",
			done: 0,
			cost: {
				resources: {
					science: [1900, 1.7],
					gems: [800, 3]
				}
			},
			prestiges: "Breastplate",
			fire: function () {
				prestigeEquipment("Breastplate");
			}
		},
		Harmbalest: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your arbalest. This will bring your arbalest to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of attack given. @",
			done: 0,
			cost: {
				resources: {
					science: [1950, 1.7],
					gems: [810, 3]
				}
			},
			prestiges: "Arbalest",
			fire: function () {
				prestigeEquipment("Arbalest");
			}
		},
		GambesOP: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your gambeson. This will bring your gambeson to level 1 and vastly increase the cost of further upgrades, but will vastly increase the amount of health given. @",
			done: 0,
			cost: {
				resources: {
					science: [2000, 1.7],
					gems: [820, 3]
				}
			},
			prestiges: "Gambeson",
			fire: function () {
				prestigeEquipment("Gambeson");
			}
		},
	//Repeatable upgrades, in order of frequency (rarest first)
		Potency: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your trimps how to be 10% more efficient at making baby Trimps!",
			done: 0,
			cost: {
				resources: {
					science: [1000, 1.4],
					wood: [4000, 1.4]
				}
			},
			fire: function () {
				//psh
			}
		},
		TrainTacular: { //5
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trainers to increase block by an additional 5%!",
			done: 0,
			cost: {
				resources: {
					science: [1000, 1.7],
					food: [2000, 1.7],
					wood: [3000, 1.7],
					metal: [2000, 1.7]
				}
			},
			fire: function () {
				game.jobs.Trainer.modifier = Math.ceil(game.jobs.Trainer.modifier += 5);
			}
		},
		Efficiency: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach you how to be twice as productive in everything you do! Hurray! <b>Note that this applies only to your productivity, not workers.</b>",
			done: 0,
			cost: {
				resources: {
					science: [400, 1.25],
					food: [400, 1.2],
					wood: [400, 1.2],
					metal: [400, 1.2]
				}
			},
			fire: function () {
				game.global.playerModifier *= 2;
			}
		},
		Speedminer: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to mine 25% faster!",
			done: 0,
			cost: {
				resources: {
					science: [200, 1.4],
					metal: [500, 1.4]
				}
			},
			fire: function () {
				game.jobs.Miner.modifier *= 1.25;
			}
		},
		Speedlumber: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to cut wood 25% faster!",
			done: 0,
			cost: {
				resources: {
					science: [200, 1.4],
					wood: [500, 1.4]
				}
			},
			fire: function () {
				game.jobs.Lumberjack.modifier *= 1.25;
			}
		},
		Speedfarming: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to farm 25% faster!",
			done: 0,
			cost: {
				resources: {
					science: [200, 1.4],
					food: [500, 1.4]
				}
			},
			fire: function () {
				game.jobs.Farmer.modifier *= 1.25;
			}
		},
		Speedscience: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to science things 25% faster!",
			done: 0,
			cost: {
				resources: {
					science: [400, 1.4]
				}
			},
			fire: function () {
				game.jobs.Scientist.modifier *= 1.25;
			}
		},
		Speedexplorer: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to explore 300% more efficiently!",
			done: 0,
			cost: {
				resources: {
					science: [200, 28.9],
					fragments: [500, 4]
				}
			},
			fire: function () {
				game.jobs.Explorer.modifier *= 4;
			}
		},
		Megaminer: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to mine ?% faster!",
			done: 0,
			cost: {
				resources: {
					science: [10000000000, 1.4],
					metal: [100000000000, 1.4]
				}
			},
			fire: function () {
				var amt = (game.global.frugalDone) ? 1.6 : 1.5;
				game.jobs.Miner.modifier *= amt;
			}
		},
		Megalumber: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to chop wood ?% faster!",
			done: 0,
			cost: {
				resources: {
					science: [10000000000, 1.4],
					wood: [100000000000, 1.4]
				}
			},
			fire: function () {
				var amt = (game.global.frugalDone) ? 1.6 : 1.5;
				game.jobs.Lumberjack.modifier *= amt;
			}
		},
		Megafarming: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to farm ?% faster!",
			done: 0,
			cost: {
				resources: {
					science: [10000000000, 1.4],
					food: [100000000000, 1.4]
				}
			},
			fire: function () {
				var amt = (game.global.frugalDone) ? 1.6 : 1.5;
				game.jobs.Farmer.modifier *= amt;
			}
		},
		Megascience: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to science things ?% faster!",
			done: 0,
			cost: {
				resources: {
					science: [100000000000, 1.6]
				}
			},
			fire: function () {
				var amt = (game.global.frugalDone) ? 1.6 : 1.5;
				game.jobs.Scientist.modifier *= amt;
			}
		},
	},

	triggers: {
		Trap: {
			done: 0,
			message: function(){
				if (game.global.universe == 2) return "It's time to get some Trimps up in here.";
				return "Maybe there's something meaty and delicious here to Trap."
			},
			cost: {
				resources: {
					food: 5,
					wood: 5
				}
			},
			fire: function () {
				fadeIn("buyCol", 10);
				unlockBuilding("Trap");
				if (game.global.universe == 2){
					game.triggers.upgrades.done = 1;
					game.triggers.upgrades.fire();
				}
			}
		},
		wood: {
			done: 0,
			message: function(){
				if (game.global.universe == 2) return "Ah wood, the building material of kings. The building material of everyone else too, but still.";
				return "You'll need some wood to build stuff..."
			},
			cost: {
				resources: {
					food: 5
				}
			},
			fire: function () {
				fadeIn("wood", 10);

			}
		},
		Barn: {
			done: 0,
			message: function(){
				if (game.global.universe == 2) return "You almost forgot how to build a Barn, but now you remember. Proud of you!";
				return "The food stores are getting pretty full, maybe you should start thinking about a Barn."
			},
			cost: {
				resources: {
					food: 350
				}
			},
			fire: function () {
				unlockBuilding("Barn");
			}
		},
		Shed: {
			done: 0,
			message: function(){
				if (game.global.universe == 2) return "Wet wood won't work! Better get a Shed going.";
				return "A nice Shed would allow you to keep more wood on hand."
			},
			cost: {
				resources: {
					wood: 350
				}
			},
			fire: function () {
				unlockBuilding("Shed");
			}
		},
		Forge: {
			done: 0,
			message: function(){
				if (game.global.universe == 2) return "What better place to store metal than a building that can smelt it?";
				return "A nice Forge would allow you to store more metal."
			},
			cost: {
				resources: {
					metal: 350
				}
			},
			fire: function () {
				unlockBuilding("Forge");
			}
		},
		jobs: {
			done: 0,
			message: function(){
				if (game.global.universe == 2) return "You caught your very first Trimp in this new dimension! It can smell other Trimps on you and looks confused. You promptly send him off to work!";
				return "There's a weird impish little creature in the trap. A Trimp, you decide to call it. Since you're so creative, you could probably train this Trimp to help out."
			},
			cost: {
				resources: {
					trimps: 1
				}
			},
			fire: function () {
				fadeIn("jobsTab", 10);
				document.getElementById("trimpTitle").innerHTML = "Trimps";
				document.getElementById("empHide").style.visibility = "visible";
				unlockJob("Farmer");
				document.getElementById("jobsTitleDiv").style.display = "block";
				game.global.menu.jobs = true;
			}
		},
		Lumberjack: {
			done: 0,
			cost: {
				jobs: {
					Farmer: 1
				}
			},
			fire: function () {
				unlockJob("Lumberjack");
			}
		},
		upgrades: {
			done: 0,
			message: function(){
				if (game.global.universe == 2) return "Where would you be in life without Science? Not this dimension, that's for sure.";
				return "This planet feels so familiar, yet so foreign. Maybe it's time to start sciencing things."
			},
			cost: {
				resources: {
					trimps: 2,
					food: 15
				}
			},
			fire: function () {
				fadeIn("upgradesTab", 10);
				fadeIn("science", 10);
				document.getElementById("upgradesTitleDiv").style.display = "block";
				game.global.menu.upgrades = true;
			}
		},
		Battle: {
			done: 0,
			once: function() {document.getElementById("upgradesTitleSpan").innerHTML = "Upgrades";},
			message: function(){
				if (game.global.universe == 2) return "As you finally step out into the Battle Zones, the first thing you notice is that your Heirlooms feel weaker here. Oh well, 1000 more times into the fray... ";
				return "War... what is it good for? Exploration, or something."
			},
			cost: {
				special: function () {
					return (game.triggers.upgrades.done > 0 && game.resources.science.owned > 0 && game.triggers.jobs.done > 0);
				}
			},
			fire: function () {
				unlockUpgrade('Battle');
				document.getElementById("upgradesTitleSpan").innerHTML = "Upgrades";
			}
		},
		Hut: {
			done: 0,
			message: function(){
				if (game.global.universe == 2) return "The newly established Trimp zoning committee is too busy drooling to approve anything, so you take it on yourself to start building some Huts.";
				return "Doesn't seem like all of these little guys will fit in your ship. Luckily, you remember how to make small huts for shelter."
			},
			cost: {
				resources: {
					trimps: 8
				}
			},
			fire: function () {
				unlockBuilding('Hut');
			}
		},
		House: {
			done: 0,
			message: function(){
				if (game.global.universe == 2) return "The TZC has finally approved a House blueprint. To your surprise, it looks fairly decent! You decide to immediately build some.";
				return "It's starting to get pretty crowded up in here. Maybe you should start building some better housing."
			},
			cost: {
				resources: {
					trimps: 65
				}
			},
			fire: function () {
				unlockBuilding('House');
			}
		},
		breeding: {
			done: 0,
			message: function () {
				if (game.global.challengeActive == "Trapper" || game.global.challengeActive == "Trappapalooza") return "Your Trimps look really bored.";
				else if (game.global.universe == 2) return "Better hurry up to the fighting Zones so you don't have to sit around here all day watching Trimps breed.";
				else return "Apparently the Trimps breed if they're not working. Doesn't look pleasant.";
			},
			cost: {
				special: function () {
					return (game.resources.trimps.owned - game.resources.trimps.employed >= 2) ? true : false;
				}
			},
			fire: function () {
				document.getElementById("unempHide").style.visibility = "visible";
			}
		}
	},
	unlocks: {
		imps: {
			Goblimp: false,
			Feyimp: false,
			Flutimp: false,
			Tauntimp: false,
			Venimp: false,
			Whipimp: false,
			Jestimp: false,
			Titimp: false,
			Chronoimp: false,
			Magnimp: false,
		},
		impCount: {
			Goblimp: 0,
			Feyimp: 0,
			Flutimp: 0,
			Tauntimp: 0,
			TauntimpAdded: 0,
			Venimp: 0,
			Whipimp: 0,
			Jestimp: 0,
			Titimp: 0,
			Chronoimp: 0,
			Magnimp: 0
		}
	},
	bwRewards:{
		Foremany: {
			requires: 125,
			description: "Repurpose some of those RoboTrimps you found into an army of Robotic Foremen. Permanently adds 50000 Foreman to your town to aid in construction.",
			fire: function(){
				game.global.autoCraftModifier += 12500;
				updateForemenCount();
			}
		},
		AutoJobs: {
			requires: 140,
			description: "Unlock the Job Automator, the envy of Human Resourceimps across the Universe.",
			fire: function(){
				toggleAutoJobs(true);
			}
		},
		AutoStructure: {
			requires: 155,
			get description(){
				var text = "Unlock the AutoStructure tool, allowing you to automatically purchase structures. In addition, all housing and battle territory bonuses will come with ready-to-fight Trimps inside";
				if (game.global.highestLevelCleared >= 229) text += " (Not including the Dimensional Generator)";
				text += "!";
				return text;
			},
			fire: function(){
				toggleAutoStructure(true);
			}
		},
		Geneticistassist: {
			requires: 170,
			description: "Unlock Geneticistassist, the most powerful Geneticist Automator in this side of the galaxy!",
			fire: function() {
				tooltip('The Geneticistassist', null, 'update');
				game.global.Geneticistassist = true;
				unlockJob("Geneticist");
				addNewSetting("GeneticistassistTarget");
				addNewSetting("geneSend");
			}
		},
		DoubleBuild: {
			requires: 185,
			description: "Stacked items in the Building Queue will be constructed two at a time.",
		}
	},
	get workspaces () {
		return Math.ceil(this.resources.trimps.realMax() / 2) - this.resources.trimps.employed;
	},
	set workspaces (value) {
		console.warn('workspaces is now a getter, and does not need to be set');
		return;
	},
};
return toReturn;
}
var game = newGame();
