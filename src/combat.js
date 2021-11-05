import Game from './game.js';
import config from './config.js';
import map from './map.js';
import player from './player.js';
import text from './text.js';

export default {
	enemy_ptr: null, // current enemy player is fighting
	enemy_id: "",
	enemy_max_hp: 0, // randomized at start of battle
	enemy_current_hp: 0,
	enemy_spell_blocked: false,
	gold_reward: 0, // randomized at start of battle
	enemy_status: "",
	player_turn: true,
	random_num: 0,
	initiative_round: true,

	// Check for random encounters at each step in player.move()
	random_encounter: function() {
		if (map.map_ptr.type === "world" || map.map_ptr.type === "dungeon") {
			if (player.current_tile === 16 ||
				player.current_tile === 20) {
				this.random_num = Game.random_number(1, 8);
				if (this.random_num === 1) {
					this.random_enemy();
					return true;
				}
			}
			if (player.current_tile === 3 ||
				player.current_tile === 8 ||
				player.current_tile === 15 ||
				player.current_tile ===  21) {
				this.random_num = Game.random_number(1, 16);
				if (this.random_num === 1) {
					this.random_enemy();
					return true;
				}
			}
			if (player.current_tile === 14) {
				this.random_num = Game.random_number(1, 24);
				if (this.random_num === 1) {
					this.random_enemy();
					return true;
				}
			}
		}
	},

	random_enemy: function() {
		var rand = Game.random_number(0, 4),
		    enemy_list = [];

		switch (map.current_zone) {
			case 0:	 enemy_list = [0, 1, 0, 1, 0];      break;
			case 1:	 enemy_list = [1, 0, 1, 2, 1];      break;
			case 2:	 enemy_list = [0, 3, 2, 3, 1];      break;
			case 3:	 enemy_list = [1, 1, 2, 3, 4];      break;
			case 4:	 enemy_list = [3, 4, 5, 5, 6];      break;
			case 5:	 enemy_list = [3, 4, 5, 6, 11];     break;
			case 6:	 enemy_list = [5, 6, 11, 12, 14];   break;
			case 7:	 enemy_list = [11, 12, 13, 14, 14]; break;
			case 8:	 enemy_list = [13, 15, 18, 18, 25]; break;
			case 9:	 enemy_list = [15, 21, 18, 21, 25]; break;
			case 10: enemy_list = [21, 22, 23, 26, 28]; break;
			case 11: enemy_list = [23, 26, 27, 28, 16]; break;
			case 12: enemy_list = [26, 27, 28, 29, 31]; break;
			case 13: enemy_list = [29, 30, 31, 31, 32]; break;
			case 14: enemy_list = [8, 9, 10, 11, 12];   break;
			case 15: enemy_list = [17, 18, 19, 20, 23]; break;
			case 16: enemy_list = [29, 30, 31, 32, 33]; break;
			case 17: enemy_list = [32, 33, 34, 34, 35]; break;
			case 18: enemy_list = [32, 35, 36, 36, 37]; break;
			case 19: enemy_list = [3, 4, 6, 7, 7];      break;
		}

		this.load_enemy(enemy_list[rand]);
	},

	load_enemy: function(id) {
		this.initiative_round = true;
		this.enemy_ptr = config.enemies[id];
		this.enemy_id = text.enemies[this.enemy_ptr.id];

		// check if enemy HP is a range or set number
		if (this.enemy_ptr.hp instanceof Array) {
			this.enemy_current_hp = Game.random_number(this.enemy_ptr.hp[0], this.enemy_ptr.hp[1]);
		} else {
			this.enemy_current_hp = this.enemy_ptr.hp;
		}
		this.enemy_max_hp = this.enemy_current_hp;

		// check if enemy gold dropped is a range or set number
		if (this.enemy_ptr.gold instanceof Array) {
			this.gold_reward = Game.random_number(this.enemy_ptr.gold[0], this.enemy_ptr.gold[1]);
		} else {
			this.gold_reward = this.enemy_ptr.gold;
		}

		Game.display_text(text.combat.enemy.near, { enemy: this.enemy_id });
	},

	// Draw functions
	// -------------------------------------------------------------------

	draw_screen: function() {
		if (config.maps[map.current_map].type === 'dungeon') {
			Game.clear();
			Game.context.fillStyle = "#FFFFFF";
			Game.context.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
			return;
		}

		let screenX = (Game.canvas.width / 2) - (Game.img_battle.width / 2);
		let screenY = (Game.canvas.height / 2) - (Game.img_battle.height / 2);

		Game.context.drawImage(Game.img_battle, 0, 0, Game.img_battle.width, Game.img_battle.width,
			screenX, screenY, Game.img_battle.width, Game.img_battle.width);
	},

	// Combat functions
	// -------------------------------------------------------------------

	initiative: function() {
		var enemy_agility = this.enemy_ptr.agility,
		    enemy_strength = this.enemy_ptr.strength,
		    rand1 = Game.random_number(0, 255),
		    rand2 = Game.random_number(0, 255),
		    rand3 = Game.random_number(1, 100);

		if (player.strength > (2 * enemy_strength)) {
			if (rand3 <= 25) {
				Game.display_text(text.combat.enemy.run, { enemy: this.enemy_id });
				Game.change_state("exploration", 500);
			}
		}

		if ((player.agility * rand1) < (enemy_agility * rand2 * 0.25)) {
			Game.display_text(text.combat.enemy.strike_first, { enemy: this.enemy_id, player_name: player.name });
			this.player_turn = false;
		} else {
			Game.display_text(text.combat.prompt);
		}

		this.initiative_round = false;
	},

	player_attack: function() {
		var hit = false,
		    damage = 0;

		if (this.player_turn === true) {
			Game.display_text(text.combat.player.attack, { player_name: player.name });
			if (Game.random_number(1, 64) > this.enemy_ptr.dodge) {
				hit = true;
			}

			if (hit) {
				if (Game.random_number(1, 32) === 1 && this.enemy_ptr !== (38 || 39)) {
					Game.display_text(text.combat.player.hit_critical);
					damage = Math.floor(Game.random_number(player.attack_power / 2, player.attack_power));
				} else {
					damage = Math.floor(Game.random_number((player.attack_power - this.enemy_ptr.agility) / 4,
						(player.attack_power - this.enemy_ptr.agility) / 2));
				}

				if (damage < 0) { damage = 0; }
				Game.display_text(text.combat.player.hit, { enemy: this.enemy_id, number: damage});
				this.enemy_current_hp -= damage;

				if (this.enemy_current_hp <= 0) {
					this.player_turn = true;
					this.victory();
				} else {
					this.player_turn = false;
				}
			} else {
				Game.display_text(text.combat.enemy.dodge);
				this.player_turn = false;
			}
		}
	},

	use_item: function() {

	},

	cast_spell: function() {

	},

	player_run: function() {
		if (this.player_turn === true) {
			var modifier = 0,
			    rand1 = Game.random_number(0, 255),
			    rand2 = Game.random_number(0, 255),
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

			Game.display_text(text.combat.player.run, { player_name: player.name });
			this.player_turn = false;

			if (this.enemy_status === "sleep") {
				this.player_turn = true;
				Game.change_state("exploration", 500);
			}

			if ((player.agility * rand1) < (enemy_agility * rand2 * modifier)) {
				Game.display_text(text.combat.player.run_blocked);
			} else {
				this.player_turn = true;
				Game.change_state("exploration", 500);
			}
		}
	},

	player_died: function() {
		Game.display_text(text.dead);
	},

	victory: function() {
		var current_level = player.level;

		Game.display_text(text.combat.victory.defeated, { enemy: this.enemy_id });
		Game.display_text(text.combat.victory.gain_exp, { number: this.enemy_ptr.experience });
		Game.display_text(text.combat.victory.gain_gold, { number: this.gold_reward });

		player.add_experience(this.enemy_ptr.experience);
		player.add_gold(this.gold_reward);
		player.load_player();

		if (player.level === (current_level + 1)) {
			this.player_level_up();
		}

		Game.change_state("exploration", 1000);
	},

	player_level_up: function() {
		Game.display_text(text.combat.victory.next_level);
		if (typeof config.levels[player.level - 1].spells_learned !== 'undefined') {
			Game.display_text(text.combat.victory.gain_spell);
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

				for (i=0; i< this.enemy_ptr.special.length; i++) {
					if (Game.random_number(1, 4) <= this.enemy_ptr.special_probability[i]) {
						special = this.enemy_ptr.special[i];
						if (special === "breathe_fire" || special === "breathe_fire2") {
							Game.display_text(text.combat.enemy.fire, { enemy: this.enemy_id });

							//Erdricks armor reduces damage by 1/3
							if (special === "breathe_fire2") {
								//used by Dragon Lord in final form only
								breath_min_dmg = player.has_erdricks_armor ? 42 : 65;
								breath_max_dmg = player.has_erdricks_armor ? 48 : 72;
							} else {
								breath_min_dmg = player.has_erdricks_armor ? 10 : 16;
								breath_max_dmg = player.has_erdricks_armor ? 14 : 23;
							}

							damage = Game.random_number(breath_min_dmg, breath_max_dmg);
							Game.display_text(text.combat.enemy.hit, { number: damage });
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

							Game.display_text(text.combat.enemy.cast, { enemy: this.enemy_id, spell: text.spells[special] });
							//TODO: actually cast the spell
						}

						used_special = true;
					}
				}
			}

			//Regular attack
			if (!used_special) {
				Game.display_text(text.combat.enemy.attack, { enemy: this.enemy_id });

				if (player.defense_power >= enemy_strength) {
					damage = Math.floor(Game.random_number(0, ((enemy_strength + 4) / 6)));
				} else {
					damage = Math.floor(Game.random_number(((enemy_strength - (player.defense_power / 2)) / 4),
						((enemy_strength - (player.defense_power / 2)) / 2)));
				}

				Game.display_text(text.combat.enemy.hit, { number: damage });
				player.lose_hp(damage);
			}
		}

		this.player_turn = true;
	}
};
