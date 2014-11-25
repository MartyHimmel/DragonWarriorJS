var combat = {
	"enemy_id": 0, // current enemy player is fighting
	"enemy_current_hp": 0, // randomized at start of battle
	"gold_reward": 0, // randomized at start of battle
	"enemy_status": "",
	"player_turn": true,
	"random_num": 0,
	"initiative_round": true,

	// Check for random encounters at each step in player.move()
	random_encounter: function() {
		if (maps[map.current_map].type === "world" || maps[map.current_map].type === "dungeon") {
			if (player.current_tile === 16 ||
				player.current_tile === 20) {
				this.random_num = random_number(1, 8);
				if (this.random_num === 1) {
					this.random_enemy();
					return true;
				}
			}
			if (player.current_tile === 3 ||
				player.current_tile === 8 ||
				player.current_tile === 15 ||
				player.current_tile ===  21) {
				this.random_num = random_number(1, 16);
				if (this.random_num === 1) {
					this.random_enemy();
					return true;
				}
			}
			if (player.current_tile === 14) {
				this.random_num = random_number(1, 24);
				if (this.random_num === 1) {
					this.random_enemy();
					return true;
				}
			}
		}
	},

	random_enemy: function() {
		var rand = random_number(0, 4),
		    enemy_list = [];
		switch (map.current_zone) {
			case 0:		enemy_list = [0, 1, 0, 1, 0];		break;
			case 1:		enemy_list = [1, 0, 1, 2, 1];		break;
			case 2:		enemy_list = [0, 3, 2, 3, 1];		break;
			case 3:		enemy_list = [1, 1, 2, 3, 4];		break;
			case 4:		enemy_list = [3, 4, 5, 5, 6];		break;
			case 5:		enemy_list = [3, 4, 5, 6, 11];		break;
			case 6:		enemy_list = [5, 6, 11, 12, 14];	break;
			case 7:		enemy_list = [11, 12, 13, 14, 14];	break;
			case 8:		enemy_list = [13, 15, 18, 18, 25];	break;
			case 9:		enemy_list = [15, 21, 18, 21, 25];	break;
			case 10:	enemy_list = [21, 22, 23, 26, 28];	break;
			case 11:	enemy_list = [23, 26, 27, 28, 16];	break;
			case 12:	enemy_list = [26, 27, 28, 29, 31];	break;
			case 13:	enemy_list = [29, 30, 31, 31, 32];	break;
			case 14:	enemy_list = [8, 9, 10, 11, 12];	break;
			case 15:	enemy_list = [17, 18, 19, 20, 23];	break;
			case 16:	enemy_list = [29, 30, 31, 32, 33];	break;
			case 17:	enemy_list = [32, 33, 34, 34, 35];	break;
			case 18:	enemy_list = [32, 35, 36, 36, 37];	break;
			case 19:	enemy_list = [3, 4, 6, 7, 7];		break;
		}
		this.load_enemy(enemy_list[rand]);
	},

	load_enemy: function(id) {
		this.enemy_id = id;
		this.initiative_round = true;

		// check if enemy HP is a range or set number
		if (enemy[this.enemy_id].hp instanceof Array) {
			this.enemy_current_hp = random_number(enemy[this.enemy_id].hp[0], enemy[this.enemy_id].hp[1]);
		} else {
			this.enemy_current_hp = enemy[this.enemy_id].hp;
		}

		// check if enemy gold dropped is a range or set number
		if (enemy[this.enemy_id].gold instanceof Array) {
			this.gold_reward = random_number(enemy[this.enemy_id].gold[0], enemy[this.enemy_id].gold[1]);
		} else {
			this.gold_reward = enemy[this.enemy_id].gold;
		}

		add_text(enemy[this.enemy_id].name + " draws near!");
	},

	// Draw functions
	// -------------------------------------------------------------------

	draw_screen: function() {
		clear();
		context.fillStyle = "#FFFFFF";
		context.fillRect(0, 0, canvas.width, canvas.height);
	},

	draw_enemy: function() {
		var img = new Image();
		img.src = "assets/sprites/monsters.png";

		var tile_x = enemy[this.enemy_id].x;
		var tile_y = enemy[this.enemy_id].y;
		var tile_width = enemy[this.enemy_id].width;
		var tile_height = enemy[this.enemy_id].height;
		var pos_x = (canvas.width / 2) - tile_width;
		var pos_y = (canvas.height / 2) - tile_height;
		context.drawImage(img, tile_x, tile_y, tile_width, tile_height,
			pos_x, pos_y, tile_width * 2, tile_height *2);
	},

	// Combat functions
	// -------------------------------------------------------------------

	initiative: function() {
		var enemy_agility = enemy[this.enemy_id].agility,
		    enemy_strength = enemy[this.enemy_id].strength,
		    rand1 = random_number(0, 255),
		    rand2 = random_number(0, 255),
		    rand3 = random_number(1, 100);

		if (player.strength > (2 * enemy_strength)) {
			if (rand3 <= 25) {
				add_text("The " + enemy[this.enemy_id].name + " is running away.");
				setTimeout(function() {
					change_state("exploration");
				}, 500);
			}
		}

		if ((player.agility * rand1) < (enemy_agility * rand2 * 0.25)) {
			add_text("The " + enemy[this.enemy_id].name + " attacked before " +
				player.name + " was ready.");
			this.player_turn = false;
		} else {
			add_text(text.combat["player_prompt"]);
		}

		this.initiative_round = false;
	},

	player_attack: function() {
		var hit = false,
		    damage = 0;

		if (this.player_turn === true) {
			add_text(player.name + " attacks!");
			if (random_number(1, 64) > enemy[this.enemy_id].dodge) {
				hit = true;
			}

			if (hit) {
				if (random_number(1, 32) === 1 && enemy[this.enemy_id] !== (38 || 39)) {
					add_text(text.combat["player_hit_critical"]);
					damage = Math.floor(random_number(player.attack_power / 2, player.attack_power));
					if (damage < 0) damage = 0;
					add_text("The " + enemy[this.enemy_id].name + "'s Hit Points " +
						"have been reduced by " + damage + ".");
					this.enemy_current_hp -= damage;
					if (this.enemy_current_hp <= 0) {
						this.player_turn = true;
						this.victory();
					} else {
						this.player_turn = false;
					}
				} else {
					damage = Math.floor(random_number((player.attack_power - enemy[this.enemy_id].agility) / 4,
						(player.attack_power - enemy[this.enemy_id].agility) / 2));
					if (damage < 0) damage = 0;
					add_text("The " + enemy[this.enemy_id].name + "'s Hit Points " +
						"have been reduced by " + damage + ".");
					this.enemy_current_hp -= damage;
					if (this.enemy_current_hp <= 0) {
						this.player_turn = true;
						this.victory();
					} else {
						this.player_turn = false;
					}
				}
			} else {
				add_text(text.combat["enemy_dodge"]);
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
			var modifier = 0;
			var rand1 = random_number(0, 255);
			var rand2 = random_number(0, 255);
			var enemy_agility = enemy[this.enemy_id].agility;
			if (this.enemy_id >= 0 && this.enemy_id <= 20) modifier = 0.25;
			else if (this.enemy_id >= 20 && this.enemy_id <= 29) modifier = 0.375;
			else if (this.enemy_id >= 30 && this.enemy_id <= 34) modifier = 0.5;
			else modifier = 1;

			add_text(player.name + " started to run away.");
			this.player_turn = false;

			if (this.enemy_status === "sleep") {
				this.player_turn = true;
				setTimeout(function() {
					change_state("exploration");
				}, 500);
			}

			if ((player.agility * rand1) <
				(enemy_agility * rand2 * modifier)) {
				add_text(text.combat["player_run_blocked"]);
			} else {
				this.player_turn = true;
				setTimeout(function() {
					change_state("exploration");
				}, 500);
			}
		}
	},

	player_died: function() {
		add_text(text.combat["player_dead"]);
	},

	victory: function() {
		var current_level = player.level;
		add_text("Thou hast done well in");
		add_text("defeating the " + enemy[this.enemy_id].name + ".");
		add_text("Thy Experience increases by " + enemy[this.enemy_id].experience + ".");
		player.add_experience(enemy[this.enemy_id].experience);
		add_text("Thy Gold increase by " + this.gold_reward + ".");
		player.add_gold(this.gold_reward);
		player.load_player();
		if (player.level === current_level + 1) {
			this.player_level_up();
		}
		setTimeout(function() {
			change_state("exploration");
		}, 1000);
	},

	player_level_up: function() {
		add_text("Courage and wit have served thee well.");
		add_text("Thou hast been promoted to the next level.");
	},

	enemy_attack: function() {
		var hit = false;
		var damage = 0;
		var enemy_strength = enemy[this.enemy_id].strength;

		if (this.player_turn === false) {
			add_text(enemy[this.enemy_id].name + " attacks!");
			if (player.defense_power >= enemy_strength) {
				damage = Math.floor(random_number(0, ((enemy_strength + 4) / 6)));
				add_text("Thy Hit Points decreased by " + damage + ".");
				player.lose_hp(damage);
			} else {
				damage = Math.floor(random_number(((enemy_strength - (player.defense_power / 2)) / 4),
					((enemy_strength - (player.defense_power / 2)) / 2)));
				add_text("Thy Hit Points decreased by " + damage + ".");
				player.lose_hp(damage);
			}
		}
		this.player_turn = true;
	}
};