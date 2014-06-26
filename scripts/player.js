var player = {
	// map collision tiles
	"collide_tiles": [1, 2, 5, 9, 10, 11, 17, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],

	// last direction the character was facing
	"character_state": "",

	// flags
	"rescued_princess": false,
	"carrying_princess": false,
	"created_rainbow_bridge": false,
	"green_dragon_is_alive": true,
	"golem_is_alive": true,
	"has_erdricks_armor": false,
	"has_erdricks_token": false,

	// screen position
	"x": "",
	"y": "",

	// map position
	"offset_x": "",
	"offset_y": "",

	// movement speed, divide number of ticks by this -> higher number = slower speed
	"movement": 6,
	"key_input": false,
	"steps": 0,
	"visibility": "",

	// equipment
	"weapon": "None",
	"armor": "None",
	"shield": "None",

	"current_hp": 15,
	"current_mp": 0,

	"experience": 0,
	"gold": 0,

	image: function() {
		var img = new Image();
		img.src = "assets/sprites/characters.png";
		return img;
	},

	character_frame: function(frame_number, pos_x, pos_y) {
		var image_x = (frame_number % 16) * tile_width;
		var image_y = Math.floor(frame_number / 16) * tile_height;
		context.drawImage(this.image(), image_x, image_y, tile_width, tile_height, pos_x, pos_y, tile_width, tile_height);
	},

	animate_player: function(frame1, frame2) {
		if ((Date.now() % 1000) < 500) this.character_frame(frame1, this.x, this.y);
		else this.character_frame(frame2, this.x, this.y);
	},

	draw_player: function(direction) {
		if (this.character_state === "up") direction = "up";
		if (this.character_state === "down") direction = "down";
		if (this.character_state === "") direction = "down";
		if (this.character_state === "left") direction = "left";
		if (this.character_state === "right") direction = "right";
		switch (direction) {
			case "up" :
				if (this.carrying_princess === true) {
					this.animate_player(68, 69);
				} else if (this.weapon === "None" && this.shield === "None") {
					this.animate_player(4, 5);
				} else if (this.weapon !== "None" && this.shield === "None") {
					this.animate_player(20, 21);
				} else if (this.weapon === "None" && this.shield !== "None") {
					this.animate_player(36, 37);
				} else {
					this.animate_player(52, 53);
				}
				break;
			case "down":
				if (this.carrying_princess === true) {
					this.animate_player(64, 65);
				} else if (this.weapon === "None" && this.shield === "None") {
					this.animate_player(0, 1);
				} else if (this.weapon !== "None" && this.shield === "None") {
					this.animate_player(16, 17);
				} else if (this.weapon === "None" && this.shield !== "None") {
					this.animate_player(32, 33);
				} else {
					this.animate_player(48, 49);
				}
				break;
			case "left":
				if (this.carrying_princess === true) {
					this.animate_player(66, 67);
				} else if (this.weapon === "None" && this.shield === "None") {
					this.animate_player(2, 3);
				} else if (this.weapon !== "None" && this.shield === "None") {
					this.animate_player(18, 19);
				} else if (this.weapon === "None" && this.shield !== "None") {
					this.animate_player(34, 35);
				} else {
					this.animate_player(50, 51);
				}
				break;
			case "right":
				if (this.carrying_princess === true) {
					this.animate_player(70, 71);
				} else if (this.weapon === "None" && this.shield === "None") {
					this.animate_player(6, 7);
				} else if (this.weapon !== "None" && this.shield === "None") {
					this.animate_player(22, 23);
				} else if (this.weapon === "None" && this.shield !== "None") {
					this.animate_player(38, 39);
				} else {
					this.animate_player(54, 55);
				}
				break;
		}
	},

	set_position: function(map_name) {
		this.steps = 0;
		this.offset_x = maps[map_name].pos_x;
		this.offset_y = maps[map_name].pos_y;
		this.x = maps[map_name].char_x * tile_width;
		this.y = maps[map_name].char_y * tile_height;
	},

	set_offsets: function(offset_x, offset_y) {
		this.offset_x = offset_x;
		this.offset_y = offset_y;
	},

	set_xy: function(x, y) {
		this.x = x * tile_width;
		this.y = y * tile_height;
	},
	
	move: function(direction) {
		this.key_input = true;
		switch(direction) {
			case "up":
				this.character_state = "up";
				this.draw_player("up");
				if (this.collide_up() === false) {
					if (ticks % this.movement === 0) {
						if (this.offset_y > 0 && this.y === 6 * tile_height) {
							this.offset_y -= 1;
							this.steps++;
						} else {
							this.y -= tile_height;
							this.steps++;
						}
					}
				}
				break;
			case "down":
				this.character_state = "down";
				this.draw_player("down");
				if (this.collide_down() === false) {
					if (ticks % this.movement === 0) {
						if (this.offset_y < map.boundary_bottom && this.y === 6 * tile_height) {
							this.offset_y += 1;
							this.steps++;
						} else {
							this.y += tile_height;
							this.steps++;
						}
					}
				}
				break;
			case "left":
				this.character_state = "left";
				this.draw_player("left");
				if (this.collide_left() === false) {
					if (ticks % this.movement === 0) {
						if (this.offset_x > 0 && this.x === 12 * tile_width) {
							this.offset_x -= 1;
							this.steps++;
						} else {
							this.x -= tile_width;
							this.steps++;
						}
					}
				}
				break;
			case "right":
				this.character_state = "right";
				this.draw_player("right");
				if (this.collide_right() === false) {
					if (ticks % this.movement === 0) {
						if (this.offset_x < map.boundary_right && this.x === 12 * tile_width) {
							this.offset_x += 1;
							this.steps++;
						} else {
							this.x += tile_width;
							this.steps++;
						}
					}
				}
				break;
		}
	},

	collide_right: function() {
		var next_tile = maps[map.current_map].layout[(player.offset_x + 1 + (player.x / tile_width)) +
				((player.offset_y + (player.y / tile_height)) * maps[map.current_map].width)] - 1;
		if (this.collide_tiles.indexOf(next_tile) > -1) {
			return true;
		} else {
			return false;
		}
	},

	collide_left: function() {
		var next_tile = maps[map.current_map].layout[(player.offset_x - 1 + (player.x / tile_width)) +
				((player.offset_y + (player.y / tile_height)) * maps[map.current_map].width)] - 1;
		if (this.collide_tiles.indexOf(next_tile) > -1) {
			return true;
		} else {
			return false;
		}
	},

	collide_down: function() {
		var next_tile = maps[map.current_map].layout[(player.offset_x + (player.x / tile_width)) +
				((player.offset_y + 1 + (player.y / tile_height)) * maps[map.current_map].width)] - 1;
		if (this.collide_tiles.indexOf(next_tile) > -1) {
			return true;
		} else {
			return false;
		}
	},

	collide_up: function() {
		var next_tile = maps[map.current_map].layout[(player.offset_x + (player.x / tile_width)) +
				((player.offset_y - 1 + (player.y / tile_height)) * maps[map.current_map].width)] - 1;
		if (this.collide_tiles.indexOf(next_tile) > -1) {
			return true;
		} else {
			return false;
		}
	},

	// stats and equipment
	level: function() {
		if (this.experience < 7) return 1;
		else if (this.experience < 23) return 2;
		else if (this.experience < 47) return 3;
		else if (this.experience < 110) return 4;
		else if (this.experience < 220) return 5;
		else if (this.experience < 3250) return 6;
		else if (this.experience < 800) return 7;
		else if (this.experience < 1300) return 8;
		else if (this.experience < 2000) return 9;
		else if (this.experience < 2900) return 10;
		else if (this.experience < 32000) return 11;
		else if (this.experience < 5500) return 12;
		else if (this.experience < 7500) return 13;
		else if (this.experience < 10000) return 14;
		else if (this.experience < 13000) return 15;
		else if (this.experience < 16000) return 16;
		else if (this.experience < 19000) return 17;
		else if (this.experience < 22000) return 18;
		else if (this.experience < 26000) return 19;
		else if (this.experience < 30000) return 20;
		else if (this.experience < 34000) return 21;
		else if (this.experience < 38000) return 22;
		else if (this.experience < 322000) return 23;
		else if (this.experience < 326000) return 24;
		else if (this.experience < 50000) return 25;
		else if (this.experience < 54000) return 26;
		else if (this.experience < 58000) return 27;
		else if (this.experience < 62000) return 28;
		else if (this.experience < 65535) return 29;
		else {
			this.experience = 65535;
			return 30;
		}
	},

	max_hp: function() {
		switch (this.level()) {
			case 1: return 15;
			case 2: return 22;
			case 3: return 24;
			case 4: return 31;
			case 5: return 35;
			case 6: return 38;
			case 7: return 40;
			case 8: return 46;
			case 9: return 50;
			case 10: return 54;
			case 11: return 62;
			case 12: return 63;
			case 13: return 70;
			case 14: return 78;
			case 15: return 86;
			case 16: return 92;
			case 17: return 100;
			case 18: return 115;
			case 19: return 130;
			case 20: return 138;
			case 21: return 149;
			case 22: return 158;
			case 23: return 165;
			case 24: return 170;
			case 25: return 174;
			case 26: return 180;
			case 27: return 189;
			case 28: return 195;
			case 29: return 200;
			case 30: return 210;
		}
	},
	
	max_mp: function() {
		switch (this.level()) {
			case 1: return 0;
			case 2: return 0;
			case 3: return 5;
			case 4: return 16;
			case 5: return 20;
			case 6: return 24;
			case 7: return 26;
			case 8: return 29;
			case 9: return 36;
			case 10: return 40;
			case 11: return 50;
			case 12: return 58;
			case 13: return 64;
			case 14: return 70;
			case 15: return 72;
			case 16: return 95;
			case 17: return 100;
			case 18: return 108;
			case 19: return 115;
			case 20: return 128;
			case 21: return 135;
			case 22: return 146;
			case 23: return 153;
			case 24: return 161;
			case 25: return 161;
			case 26: return 168;
			case 27: return 175;
			case 28: return 180;
			case 29: return 190;
			case 30: return 200;
		}
	},
	
	strength: function() {
		switch (this.level()) {
			case 1: return 4;
			case 2: return 5;
			case 3: return 7;
			case 4: return 7;
			case 5: return 12;
			case 6: return 16;
			case 7: return 18;
			case 8: return 22;
			case 9: return 30;
			case 10: return 35;
			case 11: return 40;
			case 12: return 48;
			case 13: return 52;
			case 14: return 60;
			case 15: return 68;
			case 16: return 72;
			case 17: return 72;
			case 18: return 85;
			case 19: return 87;
			case 20: return 92;
			case 21: return 95;
			case 22: return 97;
			case 23: return 99;
			case 24: return 103;
			case 25: return 113;
			case 26: return 117;
			case 27: return 125;
			case 28: return 130;
			case 29: return 135;
			case 30: return 140;
		}
	},

	agility: function() {
		switch (this.level()) {
			case 1: return 4;
			case 2: return 4;
			case 3: return 6;
			case 4: return 8;
			case 5: return 10;
			case 6: return 10;
			case 7: return 17;
			case 8: return 20;
			case 9: return 22;
			case 10: return 31;
			case 11: return 35;
			case 12: return 40;
			case 13: return 48;
			case 14: return 55;
			case 15: return 64;
			case 16: return 70;
			case 17: return 78;
			case 18: return 84;
			case 19: return 86;
			case 20: return 88;
			case 21: return 90;
			case 22: return 90;
			case 23: return 94;
			case 24: return 98;
			case 25: return 100;
			case 26: return 105;
			case 27: return 107;
			case 28: return 115;
			case 29: return 120;
			case 30: return 130;
		}
	},
	
	attack_power: function() {
		return this.strength() + weapon_list[this.weapon].attack;
	},

	defense_power: function() {
		return Math.floor(this.agility() / 2) + armor_list[this.armor].defense + shield_list[this.shield].defense;
	},

	gain_hp: function(amount) {
		return this.current_hp + amount;
	},

	lose_hp: function(amount) {
		return this.current_hp - amount;
	},

	gain_mp: function(amount) {
		return this.current_mp + amount;
	},

	lose_mp: function(amount) {
		return this.current_mp - amount;
	},

	gain_experience: function(exp) {
		return this.experience += exp;
	},

	add_gold: function(amount) {
		return this.gold += amount;
	},

	remove_gold: function(amount) {
		return this.gold -= amount;
	}
};