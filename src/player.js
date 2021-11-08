import Data from './data.js';
import Game from './game.js';
import GameState from './state.js';
import combat from './combat.js';
import config from './config.js';
import map from './map.js';
import script from './script.js';
import text from './text.js';
import { addOption } from './utils.js';

export default {
	// Map collision tiles
	collide_tiles: [1, 2, 5, 9, 10, 11, 17, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],

	// Last direction the character was facing
	facingDirection: '',

	// Screen position
	x: 0,
	y: 0,

	// Map position
	offset_x: 0,
	offset_y: 0,

	// Tile number at player's location - see map.js for tile definitions
	current_tile: 0,

	// movement speed - frames per step (60 / movement = number of tiles moved per second)
	movement: 12,
	steps: 0,
	visibility: 0,
	radiant_in_effect: false,
	radiant_step_counter: 0,

	status: '',
	spell_blocked: false,

	// Draw player and animations
	// -------------------------------------------------------------------

	animate_player: function(frame1, frame2) {
		let drawFrame = ((Date.now() % 1000) < 500) ? frame1 : frame2;
		Game.draw_character(drawFrame, this.x, this.y);
	},

	draw_player: function () {
		switch (this.facingDirection) {
			case "left":
				if (GameState.carryingPrincess) {
					this.animate_player(66, 67);
				} else if (GameState.player.weapon === "none" && GameState.player.shield === "none") {
					this.animate_player(2, 3);
				} else if (GameState.player.weapon !== "none" && GameState.player.shield === "none") {
					this.animate_player(18, 19);
				} else if (GameState.player.weapon === "none" && GameState.player.shield !== "none") {
					this.animate_player(34, 35);
				} else {
					this.animate_player(50, 51);
				}
				break;
			case "right":
				if (GameState.carryingPrincess) {
					this.animate_player(70, 71);
				} else if (GameState.player.weapon === "none" && GameState.player.shield === "none") {
					this.animate_player(6, 7);
				} else if (GameState.player.weapon !== "none" && GameState.player.shield === "none") {
					this.animate_player(22, 23);
				} else if (GameState.player.weapon === "none" && GameState.player.shield !== "none") {
					this.animate_player(38, 39);
				} else {
					this.animate_player(54, 55);
				}
				break;
			case "up":
				if (GameState.carryingPrincess) {
					this.animate_player(68, 69);
				} else if (GameState.player.weapon === "none" && GameState.player.shield === "none") {
					this.animate_player(4, 5);
				} else if (GameState.player.weapon !== "none" && GameState.player.shield === "none") {
					this.animate_player(20, 21);
				} else if (GameState.player.weapon === "none" && GameState.player.shield !== "none") {
					this.animate_player(36, 37);
				} else {
					this.animate_player(52, 53);
				}
				break;
			case "down":
			/* falls through */
			default:
				if (GameState.carryingPrincess) {
					this.animate_player(64, 65);
				} else if (GameState.player.weapon === "none" && GameState.player.shield === "none") {
					this.animate_player(0, 1);
				} else if (GameState.player.weapon !== "none" && GameState.player.shield === "none") {
					this.animate_player(16, 17);
				} else if (GameState.player.weapon === "none" && GameState.player.shield !== "none") {
					this.animate_player(32, 33);
				} else {
					this.animate_player(48, 49);
				}
				break;
		}
	},

	// Map positioning
	// -------------------------------------------------------------------

	set_position: function(map_name) {
		var map = Data.maps[map_name];

		this.steps = 0;

		if (typeof map.player_offset !== 'undefined' && map.player_offset instanceof Array && map.player_offset.length === 2) {
			this.offset_x = map.player_offset[0];
			this.offset_y = map.player_offset[1];
		} else {
			this.offset_x = 0;
			this.offset_y = 0;
		}

		if (typeof map.player_start !== 'undefined' && map.player_start instanceof Array && map.player_start.length === 2) {
			this.set_xy(map.player_start[0], map.player_start[1]);
		} else {
			this.set_xy(12, 6);
		}
	},

	set_offsets: function(offset_x, offset_y) {
		this.offset_x = offset_x;
		this.offset_y = offset_y;
	},

	set_xy: function(x, y) {
		this.x = x * config.tileWidth;
		this.y = y * config.tileHeight;
	},

	// Movement and collision
	// -------------------------------------------------------------------

	move: function (direction) {
		let x = this.offset_x + (this.x / config.tileWidth);
		let y = this.offset_y + (this.y / config.tileHeight);
		let prev_steps = this.steps;

		this.set_current_tile();
		map.set_zone();

		this.facingDirection = direction;
		this.draw_player();

		switch (direction) {
			case 'left':
				if (!this.willCollide(x - 1, y) && this.canMove()) {
					if (this.offset_x > 0 && this.x === 12 * config.tileWidth) {
						this.offset_x -= 1;
					} else {
						this.x -= config.tileWidth;
					}
					this.steps++;
				}
				break;
			case 'right':
				if (!this.willCollide(x + 1, y) && this.canMove()) {
					if (this.offset_x < map.boundary_right && this.x === 12 * config.tileWidth) {
						this.offset_x += 1;
					} else {
						this.x += config.tileWidth;
					}
					this.steps++;
				}
				break;
			case 'up':
				if (!this.willCollide(x, y - 1) && this.canMove()) {
					if (this.offset_y > 0 && this.y === 6 * config.tileHeight) {
						this.offset_y -= 1;
					} else {
						this.y -= config.tileHeight;
					}
					this.steps++;
				}
				break;
			case 'down':
				if (!this.willCollide(x, y + 1) && this.canMove()) {
					if (this.offset_y < map.boundary_bottom && this.y === 6 * config.tileHeight) {
						this.offset_y += 1;
					} else {
						this.y += config.tileHeight;
					}
					this.steps++;
				}
				break;
		}

		if (this.steps > prev_steps) {
			if (combat.random_encounter() === true) {
				Game.change_state('combat');
			}
		}
	},

	canMove() {
		return config.frameNumber % this.movement == 0;
	},

	set_current_tile: function() {
		this.current_tile = map.map_ptr.layout[(this.offset_x + (this.x / config.tileWidth)) +
				((this.offset_y + (this.y / config.tileHeight)) * map.map_ptr.width)] - 1;
	},

	willCollide: function (x, y) {
		var next_tile = map.map_ptr.layout[x + (y * map.map_ptr.width)] - 1;
		if (this.collide_tiles.indexOf(next_tile) > -1 || map.get_npc(x, y) !== null) {
			return true;
		}
		return false;
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

			if (GameState.player.experience < level.required_exp) {
				break;
			}

			if (level.spells_learned) {
				level.spells_learned.forEach(spellId => {
					GameState.player.spells[spellId] = Data.spells[spellId];
				});
			}
		}

		GameState.player.level = i;
	},

	set_max_hp: function() {
		GameState.player.maxHp = Data.levels[GameState.player.level - 1].max_hp;
	},

	set_max_mp: function() {
		GameState.player.maxMp = Data.levels[GameState.player.level - 1].max_mp;
	},

	set_strength: function() {
		GameState.player.strength = Data.levels[GameState.player.level - 1].strength;
	},

	set_agility: function() {
		GameState.player.agility = Data.levels[GameState.player.level - 1].agility;
	},

	set_attack_power: function() {
		GameState.player.attackPower = GameState.player.strength + Data.weapons[GameState.player.weapon].attack;
	},

	set_defense_power: function() {
		GameState.player.defensePower = Math.floor(GameState.player.agility / 2) +
			Data.armors[GameState.player.armor].defense +
			Data.shields[GameState.player.shield].defense;
	},

	set_spells: function() {
		var self = this;

		Object.keys(GameState.player.spells).forEach(function (spellId) {
			let spell = GameState.player.spells[spellId];
			if ((Game.state === "combat" && spell.show_in_combat) || (Game.state === "exploration" && spell.show_in_explore)) {
				addOption(text.spells[spellId], text.spells[spellId], "spell");
			}
		});
	},

	// Item management
	// -------------------------------------------------------------------

	door: function () {
		var x = this.offset_x + (this.x / config.tileWidth),
			y = this.offset_y + (this.y / config.tileHeight),
			door = null;

		switch (this.facingDirection) {
			case "left":  door = map.get_door(x - 1, y); break;
			case "right": door = map.get_door(x + 1, y); break;
			case "up":    door = map.get_door(x, y - 1); break;
			case "down":  door = map.get_door(x, y + 1); break;
		}

		if (door !== null) {
			//TODO: check for (and use) keys!
			GameState.doorsOpened.push(door.id);
			map.refresh_map();
		}
	},

	talk: function () {
		var x = this.offset_x + (this.x / config.tileWidth),
			y = this.offset_y + (this.y / config.tileHeight),
			character = null;

		switch (this.facingDirection) {
			case "left":  character = map.get_npc(x - 1, y); break;
			case "right": character = map.get_npc(x + 1, y); break;
			case "up":    character = map.get_npc(x, y - 1); break;
			case "down":  character = map.get_npc(x, y + 1); break;
		}

		if (character !== null && typeof character.talk === 'function') {
			character.talk(script);
		}
	},

	add_item: function(item) {
		GameState.player.inventory.push(item);
	},

	remove_item: function(item) {

	},

	// Non-static stat changes (combat or shop related)
	// -------------------------------------------------------------------

	gain_hp: function(amount) {
		GameState.player.currentHp += amount;
		if (GameState.player.currentHp > GameState.player.maxHp) {
			GameState.player.currentHp = GameState.player.maxHp;
		}
	},

	lose_hp: function(amount) {
		GameState.player.currentHp -= amount;
		if (GameState.player.currentHp < 0) {
			GameState.player.currentHp = 0;
		}
	},

	gain_mp: function(amount) {
		GameState.player.currentMp += amount;
		if (GameState.player.currentMp > GameState.player.maxMp) {
			GameState.player.currentMp = GameState.player.maxMp;
		}
	},

	lose_mp: function(amount) {
		GameState.player.currentMp -= amount;
		if ( GameState.player.currentMp < 0) {
			GameState.player.currentMp = 0;
		}
	},

	add_experience: function(amount) {
		GameState.player.experience += amount;
		if (GameState.player.experience >= 65535) {
			GameState.player.experience = 65535;
		}
	},

	add_gold: function(amount) {
		GameState.player.gold += amount;
		if (GameState.player.gold > 99999) {
			GameState.player.gold = 99999;
		}
	},

	remove_gold: function(amount) {
		GameState.player.gold -= amount;
		if (GameState.player.gold < 0) {
			GameState.player.gold = 0;
		}
	}
};
