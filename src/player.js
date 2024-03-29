import Data from './data.js';
import Game from './game.js';
import SaveState from './save-state.js';
import Menu from './menu.js';
import CombatMenu from './menus/Combat.js';
import StatusMenu from './menus/Status.js';
import TextDisplayMenu from './menus/TextDisplay.js';
import combat from './combat.js';
import config from './config.js';
import map from './map.js';
import script from './script.js';

const stairTiles = [
	Data.mapTiles.STAIRS_UP,
	Data.mapTiles.STAIRS_DOWN,
	Data.mapTiles.STAIRS_DOWN_GRASS,
];

export default {
	isMoving: false,
	// Map collision tiles
	collisionTiles: [1, 2, 5, 9, 10, 11, 17, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],

	// Last direction the character was facing
	facingDirection: '',

	// Screen position
	x: 0,
	y: 0,

	// Tile number at player's location - see map.js for tile definitions
	currentTile: 0,

	// movement speed - frames per step (60 / movement = number of tiles moved per second)
	steps: 0,
	visibility: 0,
	radiant_in_effect: false,
	radiant_step_counter: 0,

	status: '',
	spell_blocked: false,

	render() {
		switch (this.facingDirection) {
			case "left":
				if (SaveState.carryingPrincess) {
					this.animatePlayer(66, 67);
				} else if (!this.hasWeapon() && !this.hasShield()) {
					this.animatePlayer(2, 3);
				} else if (this.hasWeapon() && !this.hasShield()) {
					this.animatePlayer(18, 19);
				} else if (!this.hasWeapon() && this.hasShield()) {
					this.animatePlayer(34, 35);
				} else {
					this.animatePlayer(50, 51);
				}
				break;
			case "right":
				if (SaveState.carryingPrincess) {
					this.animatePlayer(70, 71);
				} else if (!this.hasWeapon() && !this.hasShield()) {
					this.animatePlayer(6, 7);
				} else if (SaveState.player.weapon !== "none" && !this.hasShield()) {
					this.animatePlayer(22, 23);
				} else if (!this.hasWeapon() && this.hasShield()) {
					this.animatePlayer(38, 39);
				} else {
					this.animatePlayer(54, 55);
				}
				break;
			case "up":
				if (SaveState.carryingPrincess) {
					this.animatePlayer(68, 69);
				} else if (!this.hasWeapon() && !this.hasShield()) {
					this.animatePlayer(4, 5);
				} else if (SaveState.player.weapon !== "none" && !this.hasShield()) {
					this.animatePlayer(20, 21);
				} else if (!this.hasWeapon() && this.hasShield()) {
					this.animatePlayer(36, 37);
				} else {
					this.animatePlayer(52, 53);
				}
				break;
			case "down":
			default:
				if (SaveState.carryingPrincess) {
					this.animatePlayer(64, 65);
				} else if (!this.hasWeapon() && !this.hasShield()) {
					this.animatePlayer(0, 1);
				} else if (SaveState.player.weapon !== "none" && !this.hasShield()) {
					this.animatePlayer(16, 17);
				} else if (!this.hasWeapon() && this.hasShield()) {
					this.animatePlayer(32, 33);
				} else {
					this.animatePlayer(48, 49);
				}
				break;
		}
	},

	hasWeapon() {
		return SaveState.player.weapon !== 'none';
	},

	hasShield() {
		return SaveState.player.shield !== 'none';
	},

	animatePlayer(frame1, frame2) {
		const drawFrame = (Game.frameInRange(0, 14) || Game.frameInRange(30, 44)) ? frame1 : frame2;
		Game.drawCharacter(drawFrame, config.offsetX * config.tileWidth, config.offsetY * config.tileHeight);
	},

	// Map positioning
	// -------------------------------------------------------------------

	setPosition(map_name) {
		var map = Data.maps[map_name];
		this.steps = 0;
		this.setXY(map.player_start[0], map.player_start[1]);
	},

	setXY(x, y) {
		this.x = x;
		this.y = y;
	},

	// Movement and collision
	// -------------------------------------------------------------------

	move(direction) {
		let x = this.x;
		let y = this.y;
		let prev_steps = this.steps;

		this.setCurrentTile();
		map.setZone();

		this.facingDirection = direction;
		this.render();

		if (this.canMove()) {
			switch (direction) {
				case 'left':
					if (!this.willCollide(x - 1, y)) {
						this.x--;
						this.steps++;
					}
					break;
				case 'right':
					if (!this.willCollide(x + 1, y)) {
						this.x++;
						this.steps++;
					}
					break;
				case 'up':
					if (!this.willCollide(x, y - 1)) {
						this.y--;
						this.steps++;
					}
					break;
				case 'down':
					if (!this.willCollide(x, y + 1)) {
						this.y++;
						this.steps++;
					}
					break;
			}
		}

		if (this.steps > prev_steps && combat.triggerRandomEncounter()) {
			Game.states.push(new CombatMenu());
			Game.resetKeys();
		}
	},

	canMove() {
		return Game.frameNumber % config.movementSpeed == 0;
	},

	setCurrentTile() {
		this.currentTile = map.map_ptr.layout[this.x + (this.y * map.map_ptr.width)] - 1;
	},

	willCollide(x, y) {
		var next_tile = this.tileIndex(x, y);
		if (this.collisionTiles.indexOf(next_tile) > -1 || map.getNpcAt(x, y) !== null) {
			return true;
		}
		return false;
	},

	tileIndex(x, y) {
		return map.map_ptr.layout[x + (y * map.map_ptr.width)] - 1;
	},

	// Set stats
	// -------------------------------------------------------------------

	load_player: function() {
		this.set_level();
		this.set_max_hp();
		this.set_max_mp();
		this.set_strength();
		this.set_agility();
		this.set_attack_power();
		this.set_defense_power();
		this.set_spells();
	},

	set_level: function() {
		let i;

		for (i = 0; i < Data.levels.length; i++) {
			let level = Data.levels[i];

			if (SaveState.player.experience < level.required_exp) {
				break;
			}

			if (level.spells_learned) {
				level.spells_learned.forEach(spellId => {
					SaveState.player.spells[spellId] = Data.spells[spellId];
				});
			}
		}

		SaveState.player.level = i;
	},

	set_max_hp: function() {
		SaveState.player.maxHp = Data.levels[SaveState.player.level - 1].max_hp;
	},

	set_max_mp: function() {
		SaveState.player.maxMp = Data.levels[SaveState.player.level - 1].max_mp;
	},

	set_strength: function() {
		SaveState.player.strength = Data.levels[SaveState.player.level - 1].strength;
	},

	set_agility: function() {
		SaveState.player.agility = Data.levels[SaveState.player.level - 1].agility;
	},

	set_attack_power: function() {
		SaveState.player.attackPower = SaveState.player.strength + Data.weapons[SaveState.player.weapon].attack;
	},

	set_defense_power: function() {
		SaveState.player.defensePower = Math.floor(SaveState.player.agility / 2) +
			Data.armors[SaveState.player.armor].defense +
			Data.shields[SaveState.player.shield].defense;
	},

	set_spells: function() {
		var self = this;

		Object.keys(SaveState.player.spells).forEach(function (spellId) {
			let spell = SaveState.player.spells[spellId];

		});
	},

	// Item management
	// -------------------------------------------------------------------

	door() {
		let door = null;

		switch (this.facingDirection) {
			case 'left':  door = map.getDoorAt(this.x - 1, this.y); break;
			case 'right': door = map.getDoorAt(this.x + 1, this.y); break;
			case 'up':    door = map.getDoorAt(this.x, this.y - 1); break;
			case 'down':  door = map.getDoorAt(this.x, this.y + 1); break;
		}

		if (door !== null) {
			//TODO: check for (and use) keys!
			SaveState.doorsOpened.push(door.id);
			map.refreshMap();
		}
	},

	stairs() {
		if (stairTiles.includes(this.currentTile)) {

		}
	},

	talk() {
		const x = this.x;
		const y = this.y;
		let character = null;
		let offsetX = 0;
		let offsetY = 0;

		switch (this.facingDirection) {
			case 'left':  offsetX = -1; if (this.tileIndex(x - 1, y) == 2) { offsetX = -2; } break;
			case 'right': offsetX = 1;  if (this.tileIndex(x + 1, y) == 2) { offsetX = 2; }  break;
			case 'up':    offsetY = -1; if (this.tileIndex(x, y - 1) == 2) { offsetY = -2; } break;
			case 'down':  offsetY = 1;  if (this.tileIndex(x, y + 1) == 2) { offsetY = 2; }  break;
		}

		character = map.getNpcAt(x + offsetX, y + offsetY);

		Game.states.pop();
		Game.states.push(new TextDisplayMenu());

		if (character && typeof character.talk === 'function') {
			character.talk(script);
		} else {
			Game.displayText(Data.text.menu.talk_none);
		}
	},

	displayStatusMenu() {
		Game.states.push(new StatusMenu());
	},

	displayFieldSpells() {
		Menu.open('spells', this);
	},

	displayItemsMenu() {

	},

	search() {

	},

	take() {

	},

	add_item: function(item) {
		SaveState.player.inventory.push(item);
	},

	remove_item: function(item) {

	},

	// Non-static stat changes (combat or shop related)
	// -------------------------------------------------------------------

	gain_hp: function(amount) {
		SaveState.player.currentHp += amount;
		if (SaveState.player.currentHp > SaveState.player.maxHp) {
			SaveState.player.currentHp = SaveState.player.maxHp;
		}
	},

	lose_hp: function(amount) {
		SaveState.player.currentHp -= amount;
		if (SaveState.player.currentHp < 0) {
			SaveState.player.currentHp = 0;
		}
	},

	gain_mp: function(amount) {
		SaveState.player.currentMp += amount;
		if (SaveState.player.currentMp > SaveState.player.maxMp) {
			SaveState.player.currentMp = SaveState.player.maxMp;
		}
	},

	lose_mp: function(amount) {
		SaveState.player.currentMp -= amount;
		if ( SaveState.player.currentMp < 0) {
			SaveState.player.currentMp = 0;
		}
	},

	add_experience: function(amount) {
		SaveState.player.experience += amount;
		if (SaveState.player.experience >= 65535) {
			SaveState.player.experience = 65535;
		}
	},

	add_gold: function(amount) {
		SaveState.player.gold += amount;
		if (SaveState.player.gold > 99999) {
			SaveState.player.gold = 99999;
		}
	},

	remove_gold: function(amount) {
		SaveState.player.gold -= amount;
		if (SaveState.player.gold < 0) {
			SaveState.player.gold = 0;
		}
	},

	castSpell(spell) {
		// TODO - handle not enough MP
		if (SaveState.player.currentMp >= spell.cost) {
			spell.effect();
		}
	},
};
