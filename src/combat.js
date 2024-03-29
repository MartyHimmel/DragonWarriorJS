import Data from './data.js';
import Game from './game.js';
import SaveState from './save-state.js';
import config from './config.js';
import map from './map.js';
import Menu from './menu.js';
import player from './player.js';
import { randomNumber } from './utils.js';

export default {
	enemy_ptr: null, // current enemy player is fighting
	enemy_id: '',
	enemy_max_hp: 0, // randomized at start of battle
	enemy_current_hp: 0,
	enemy_spell_blocked: false,
	gold_reward: 0, // randomized at start of battle
	enemy_status: '',
	player_turn: true,
	random_num: 0,
	initiative_round: true,

	handleState() {
		this.drawScreen();
		Game.drawEnemy(this.enemy_ptr);

		if (this.initiative_round === true) {
			this.initiative();
		}
		if (this.player_turn === false) {
			setTimeout(() => this.enemy_attack(), 1000);
		}
	},

	// Check for random encounters at each step in player.move()
	triggerRandomEncounter() {
		if (map.map_ptr.type === "world" || map.map_ptr.type === "dungeon") {
			if ([16, 20].includes(player.currentTile)) {
				this.random_num = randomNumber(1, 8);
				if (this.random_num === 1) {
					this.randomEnemy();
					return true;
				}
			}

			if ([3, 8, 15, 21].includes(player.currentTile)) {
				this.random_num = randomNumber(1, 16);
				if (this.random_num === 1) {
					this.randomEnemy();
					return true;
				}
			}

			if (player.currentTile === 14) {
				this.random_num = randomNumber(1, 24);
				if (this.random_num === 1) {
					this.randomEnemy();
					return true;
				}
			}
		}

		return false;
	},

	randomEnemy() {
		var rand = randomNumber(0, 4);
		this.loadEnemy(Data.enemyZones[map.current_zone][rand]);
	},

	loadEnemy(id) {
		this.initiative_round = true;
		this.enemy_ptr = Data.enemies[id];
		this.enemy_id = Data.text.enemies[this.enemy_ptr.id];

		// check if enemy HP is a range or set number
		if (this.enemy_ptr.hp instanceof Array) {
			this.enemy_current_hp = randomNumber(this.enemy_ptr.hp[0], this.enemy_ptr.hp[1]);
		} else {
			this.enemy_current_hp = this.enemy_ptr.hp;
		}
		this.enemy_max_hp = this.enemy_current_hp;

		// check if enemy gold dropped is a range or set number
		if (this.enemy_ptr.gold instanceof Array) {
			this.gold_reward = randomNumber(this.enemy_ptr.gold[0], this.enemy_ptr.gold[1]);
		} else {
			this.gold_reward = this.enemy_ptr.gold;
		}

		Game.displayText(Data.text.combat.enemy.near, { enemy: this.enemy_id });
	},

	// Combat functions
	// -------------------------------------------------------------------

	initiative() {
		let enemy_agility = this.enemy_ptr.agility;
		let enemy_strength = this.enemy_ptr.strength;
		let rand1 = randomNumber(0, 255);
		let rand2 = randomNumber(0, 255);
		let rand3 = randomNumber(1, 100);

		if (SaveState.player.strength > (2 * enemy_strength)) {
			if (rand3 <= 25) {
				Game.displayText(Data.text.combat.enemy.run, { enemy: this.enemy_id });
				Game.changeState('exploration', 500);
			}
		}

		if ((SaveState.player.agility * rand1) < (enemy_agility * rand2 * 0.25)) {
			Game.displayText(Data.text.combat.enemy.strike_first, { enemy: this.enemy_id, player_name: SaveState.player.name });
			this.player_turn = false;
		} else {
			Game.displayText(Data.text.combat.prompt);
		}

		this.initiative_round = false;
	},

	playerAttack() {
		let hit = false;
		let damage = 0;

		if (this.player_turn === true) {
			Game.displayText(Data.text.combat.player.attack, { player_name: SaveState.player.name });
			if (randomNumber(1, 64) > this.enemy_ptr.dodge) {
				hit = true;
			}

			if (!hit) {
				Game.displayText(Data.text.combat.enemy.dodge);
				this.player_turn = false;
				return;
			}

			if (randomNumber(1, 32) === 1 && this.enemy_ptr !== (38 || 39)) {
				Game.displayText(Data.text.combat.player.hit_critical);
				damage = Math.floor(randomNumber(SaveState.player.attackPower / 2, SaveState.player.attackPower));
			} else {
				damage = Math.floor(randomNumber((SaveState.player.attackPower - this.enemy_ptr.agility) / 4,
					(SaveState.player.attackPower - this.enemy_ptr.agility) / 2));
			}

			if (damage < 0) { damage = 0; }
			Game.displayText(Data.text.combat.player.hit, { enemy: this.enemy_id, number: damage});
			this.enemy_current_hp -= damage;

			if (this.enemy_current_hp <= 0) {
				this.player_turn = true;
				this.victory();
			} else {
				this.player_turn = false;
			}
		}
	},

	displaySpellList() {

	},

	displayItemsMenu() {

	},

	use_item: function() {

	},

	cast_spell: function() {

	},

	playerRun: function() {
		Menu.change('action');
		if (this.player_turn === true) {
			var modifier = 0,
			    rand1 = randomNumber(0, 255),
			    rand2 = randomNumber(0, 255),
			    enemy_agility = this.enemy_ptr.agility,
			    enemy_index = this.enemy_ptr.index;

			if (enemy_index >= 0 && enemy_index <= 20) {
				modifier = 0.25;
			} else if (enemy_index >= 20 && enemy_index <= 29) {
				modifier = 0.375;
			} else if (enemy_index >= 30 && enemy_index <= 34) {
				modifier = 0.5;
			} else {
				modifier = 1;
			}

			Game.displayText(Data.text.combat.player.run, { player_name: SaveState.player.name });
			this.player_turn = false;

			if (this.enemy_status === "sleep") {
				this.player_turn = true;
				Game.changeState('exploration', 500);
			}

			if ((SaveState.player.agility * rand1) < (enemy_agility * rand2 * modifier)) {
				Game.displayText(Data.text.combat.player.run_blocked);
				Menu.change('combat');
			} else {
				this.player_turn = true;
				Game.changeState('exploration', 500);
				Menu.close();
			}
		}
	},

	player_died: function() {
		Game.displayText(Data.text.dead);
	},

	victory: function() {
		var current_level = SaveState.player.level;

		Game.displayText(Data.text.combat.victory.defeated, { enemy: this.enemy_id });
		Game.displayText(Data.text.combat.victory.gain_exp, { number: this.enemy_ptr.experience });
		Game.displayText(Data.text.combat.victory.gain_gold, { number: this.gold_reward });

		player.add_experience(this.enemy_ptr.experience);
		player.add_gold(this.gold_reward);
		player.load_player();

		if (SaveState.player.level === (current_level + 1)) {
			this.player_level_up();
		}

		Game.changeState('exploration', 1000);
	},

	player_level_up: function() {
		Game.displayText(Data.text.combat.victory.next_level);
		if (typeof Data.levels[SaveState.player.level - 1].spells_learned !== 'undefined') {
			Game.displayText(Data.text.combat.victory.gain_spell);
		}
	},

	enemy_attack: function() {
		var i,
			special,
			used_special = false,
		    damage = 0,
		    enemy_strength,
		    breath_min_dmg,
		    breath_max_dmg;

		if (this.enemy_ptr === null) {
			return;
		}

		enemy_strength = this.enemy_ptr.strength;

		if (this.player_turn === false) {
			//Special move (spell, breathe fire)
			if (typeof this.enemy_ptr.special !== 'undefined' &&
				typeof this.enemy_ptr.special_probability !== 'undefined' &&
				this.enemy_ptr.special instanceof Array &&
				this.enemy_ptr.special_probability instanceof Array &&
				this.enemy_ptr.special.length === this.enemy_ptr.special_probability.length) {

				for (i = 0; i < this.enemy_ptr.special.length; i++) {
					if (randomNumber(1, 4) <= this.enemy_ptr.special_probability[i]) {
						special = this.enemy_ptr.special[i];
						if (special === "breathe_fire" || special === "breathe_fire2") {
							Game.displayText(Data.text.combat.enemy.fire, { enemy: this.enemy_id });

							//Erdricks armor reduces damage by 1/3
							if (special === "breathe_fire2") {
								//used by Dragon Lord in final form only
								breath_min_dmg = SaveState.hasErdricksArmor ? 42 : 65;
								breath_max_dmg = SaveState.hasErdricksArmor ? 48 : 72;
							} else {
								breath_min_dmg = SaveState.hasErdricksArmor ? 10 : 16;
								breath_max_dmg = SaveState.hasErdricksArmor ? 14 : 23;
							}

							damage = randomNumber(breath_min_dmg, breath_max_dmg);
							Game.displayText(Data.text.combat.enemy.hit, { number: damage });
							player.lose_hp(damage);

						} else {
							if ((special === "heal" || special === "healmore") && (this.enemy_current_hp > (this.enemy_current_hp / 4))) {
								//will only be used if the monster's HP is less than one-fourth of Max. HP
								continue;
							} else if (special === "sleep" && player.status === "sleep") {
								//will not be used if you are already asleep
								continue;
							} else if (special === "stopspell" && player.spell_blocked === true) {
								//will not be used if your spell has already been blocked
								continue;
							}

							Game.displayText(Data.text.combat.enemy.cast, { enemy: this.enemy_id, spell: Data.text.spells[special] });
							//TODO: actually cast the spell
						}

						used_special = true;
					}
				}
			}

			//Regular attack
			if (!used_special) {
				Game.displayText(Data.text.combat.enemy.attack, { enemy: this.enemy_id });

				if (SaveState.player.defensePower >= enemy_strength) {
					damage = Math.floor(randomNumber(0, ((enemy_strength + 4) / 6)));
				} else {
					damage = Math.floor(randomNumber(((enemy_strength - (SaveState.player.defensePower / 2)) / 4),
						((enemy_strength - (SaveState.player.defensePower / 2)) / 2)));
				}

				Game.displayText(Data.text.combat.enemy.hit, { number: damage });
				player.lose_hp(damage);
			}
		}

		this.player_turn = true;
	}
};
