var combat = {
	// current enemy player is fighting
	"enemy_id": "",
	"enemy_current_hp": "", // randomized at start of battle
	"gold_reward": "", // randomized at start of battle
	"enemy_status": "",
	"text_line1": "",
	"text_line2": "",
	"text_line3": "",
	"text_line4": "",
	"text_line5": "",
	"player_turn": true,

	random_encounter: function() {
		if (maps[map.current_map].type === "world" || maps[map.current_map].type === "dungeon") {
			var encounter = random_number(0, 16);
			if (encounter < 2) {
				this.load_enemy(random_number(35, 39));
				return true;
			} else {
				return false;
			}
		}
	},

	load_enemy: function(id) {
		this.enemy_id = id;

		if (enemy[this.enemy_id].hp instanceof Array) {
			this.enemy_current_hp = random_number(enemy[this.enemy_id].hp[0], enemy[this.enemy_id].hp[1]);
		} else {
			this.enemy_current_hp = enemy[this.enemy_id].hp;
		}

		if (enemy[this.enemy_id].gold instanceof Array) {
			this.gold_reward = random_number(enemy[this.enemy_id].gold[0], enemy[this.enemy_id].gold[1]);
		} else {
			this.gold_reward = enemy[this.enemy_id].gold;
		}

		this.text_line1 = enemy[this.enemy_id].name + " draws near!";
		this.text_line2 = "";
		this.text_line3 = "Command?";
		this.text_line4 = "";
		this.text_line5 = "";
	},

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

	battle_text: function() {
		context.fillStyle = "#000000";
		context.font = "20px Arial";
		context.fillText(this.text_line1, 200, canvas.height - 100);
		context.fillText(this.text_line2, 200, canvas.height - 80);
		context.fillText(this.text_line3, 200, canvas.height - 60);
		context.fillText(this.text_line4, 200, canvas.height - 40);
		context.fillText(this.text_line5, 200, canvas.height - 20);
	},

	rotate_text: function() {
		this.text_line1 = this.text_line2;
		this.text_line2 = "";
		this.text_line2 = this.text_line3;
		this.text_line3 = "";
		this.text_line3 = this.text_line4;
		this.text_line4 = "";
		this.text_line4 = this.text_line5;
		this.text_line5 = "";
	},

	player_attack: function() {
		var hit = false;
		var damage = 0;
		
		if (this.player_turn === true) {
			this.rotate_text();
			this.text_line5 = player.name + " attacks!";
			if (random_number(1, 64) > enemy[this.enemy_id].dodge) {
				hit = true;
			}

			if (hit) {
				if (random_number(1, 32) === 1 && enemy[this.enemy_id] != (38 || 39)) {
					this.rotate_text();
					this.text_line5 = "Excellent move!";
					damage = Math.floor(random_number(player.attack_power() / 2, player.attack_power()));
					if (damage < 0) damage = 0;
					this.rotate_text();
					this.text_line5 = "The " + enemy[this.enemy_id].name + "'s Hit Points";
					this.rotate_text();
					this.text_line5 = "have been reduced by " + damage + ".";
					this.enemy_current_hp -= damage;
					if (this.enemy_current_hp <= 0) {
						this.victory();
					}
					this.player_turn = false;
				} else {
					damage = Math.floor(random_number((player.attack_power() - enemy[this.enemy_id].agility) / 4,
						(player.attack_power() - enemy[this.enemy_id].agility) / 2));
					if (damage < 0) damage = 0;
					this.rotate_text();
					this.text_line5 = "The " + enemy[this.enemy_id].name + "'s Hit Points";
					this.rotate_text();
					this.text_line5 = "have been reduced by " + damage + ".";
					this.enemy_current_hp -= damage;
					if (this.enemy_current_hp <= 0) {
						this.victory();
					}
					this.player_turn = false;
				}
			} else {
				this.rotate_text();
				this.text_line5 = "It is dodging!";
			}
		}
	},

	enemy_attack: function() {

	},

	player_run: function() {
		var modifier = 0;
		if (this.enemy_id >= 0 && this.enemy_id <= 20) modifier = 0.25;
		else if (this.enemy_id >= 20 && this.enemy_id <= 29) modifier = 0.375;
		else if (this.enemy_id >= 30 && this.enemy_id <= 34) modifier = 0.5;
		else if (this.enemy_id >= 35 && this.enemy_id <= 39) modifier = 1;

		this.rotate_text();
		this.text_line5 = player.name + " started to run away.";
		this.rotate_text();

		if (this.enemy_status === "sleep") {
			setTimeout(function() {
				change_state("exploration");
			}, 500);
		}

		if ((player.agility * random_number(0, 255)) <
			(enemy[this.enemy_id].agility * random_number(0, 255) * modifier)) {
			this.text_line5 = "But was blocked in front.";
			this.player_turn = false;
		} else {
			setTimeout(function() {
				change_state("exploration");
			}, 500);
		}
	},

	victory: function() {
		this.rotate_text();
		this.text_line5 = "Thou hast done well in";
		this.rotate_text();
		this.text_line5 = "defeating the " + enemy[this.enemy_id].name + ".";
		this.rotate_text();
		this.text_line5 = "";
		this.rotate_text();
		this.text_line5 = "Thy Experience increases by " + enemy[this.enemy_id].experience + ".";
		player.add_experience(enemy[this.enemy_id].experience);
		this.rotate_text();
		this.text_line5 = "Thy Gold increase by " + this.gold_reward + ".";
		player.add_gold(this.gold_reward);
		setTimeout(function() {
			change_state("exploration");
		}, 1000);
	}
};