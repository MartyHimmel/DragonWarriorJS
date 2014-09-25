var player = {
	"name": "",

	// Map collision tiles
	"collide_tiles": [1, 2, 5, 9, 10, 11, 17, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],

	// Last direction the character was facing
	"character_state": "",

	// Flags
	"rescued_princess": false,
	"carrying_princess": false,
	"created_rainbow_bridge": false,
	"green_dragon_is_alive": true,
	"golem_is_alive": true,
	"has_erdricks_armor": false,
	"has_erdricks_token": false,

	// Screen position
	"x": 0,
	"y": 0,

	// Map position
	"offset_x": 0,
	"offset_y": 0,

	// Tile number at player's location - see map_functions.js for tile definitions
	"current_tile": 0,

	// movement speed - ms per step (1000 / movement = number of tiles moved per second)
	"movement": 150,
	"steps": 0,
	"visibility": 0,
	"radiant_in_effect": false,
	"radiant_step_counter": 0,

	// Equipment
	"weapon": "None",
	"armor": "None",
	"shield": "None",
	"inventory": [],

	// Stats
	"level": 1,
	"max_hp": 0,
	"current_hp": 15,
	"max_mp": 0,
	"current_mp": 0,
	"strength": 0,
	"agility": 0,
	"attack_power": 0,
	"defense_power": 0,

	"status": "",

	"experience": 0,
	"gold": 0,

	// Draw player and animations
	// -------------------------------------------------------------------

	character_frame: function(frame_number, pos_x, pos_y) {
		var img = new Image();
		img.src = "assets/sprites/characters.png";

		var image_x = (frame_number % 16) * tile_width;
		var image_y = Math.floor(frame_number / 16) * tile_height;
		context.drawImage(img, image_x, image_y, tile_width, tile_height, pos_x, pos_y, tile_width, tile_height);
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

	// Map positioning
	// -------------------------------------------------------------------

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

	// Movement and collision
	// -------------------------------------------------------------------
	
	move: function(direction) {
		this.set_current_tile();
		map.set_zone();
		switch(direction) {
			case "up":
				this.character_state = "up";
				this.draw_player("up");
				if (this.collide_up() === false) {
					if (delta_time - time > this.movement) {
						if (this.offset_y > 0 && this.y === 6 * tile_height) {
							this.offset_y -= 1;
							this.steps++;
						} else {
							this.y -= tile_height;
							this.steps++;
						}
						if (combat.random_encounter() === true) {
							change_state("combat");
						}
						time = Date.now();
					}
				}
				break;
			case "down":
				this.character_state = "down";
				this.draw_player("down");
				if (this.collide_down() === false) {
					if (delta_time - time > this.movement) {
						if (this.offset_y < map.boundary_bottom && this.y === 6 * tile_height) {
							this.offset_y += 1;
							this.steps++;
						} else {
							this.y += tile_height;
							this.steps++;
						}
						if (combat.random_encounter() === true) {
							change_state("combat");
						}
						time = Date.now();
					}
				}
				break;
			case "left":
				this.character_state = "left";
				this.draw_player("left");
				if (this.collide_left() === false) {
					if (delta_time - time > this.movement) {
						if (this.offset_x > 0 && this.x === 12 * tile_width) {
							this.offset_x -= 1;
							this.steps++;
						} else {
							this.x -= tile_width;
							this.steps++;
						}
						if (combat.random_encounter() === true) {
							change_state("combat");
						}
						time = Date.now();
					}
				}
				break;
			case "right":
				this.character_state = "right";
				this.draw_player("right");
				if (this.collide_right() === false) {
					if (delta_time - time > this.movement) {
						if (this.offset_x < map.boundary_right && this.x === 12 * tile_width) {
							this.offset_x += 1;
							this.steps++;
						} else {
							this.x += tile_width;
							this.steps++;
						}
						if (combat.random_encounter() === true) {
							change_state("combat");
						}
						time = Date.now();
					}
				}
				break;
		}
	},

	set_current_tile: function() {
		this.current_tile = maps[map.current_map].layout[(player.offset_x + (player.x / tile_width)) +
				((player.offset_y + (player.y / tile_height)) * maps[map.current_map].width)] - 1;
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
		if (this.experience < 7) this.level = 1;
		else if (this.experience < 23) this.level = 2;
		else if (this.experience < 47) this.level = 3;
		else if (this.experience < 110) this.level = 4;
		else if (this.experience < 220) this.level = 5;
		else if (this.experience < 450) this.level = 6;
		else if (this.experience < 800) this.level = 7;
		else if (this.experience < 1300) this.level = 8;
		else if (this.experience < 2000) this.level = 9;
		else if (this.experience < 2900) this.level = 10;
		else if (this.experience < 4000) this.level = 11;
		else if (this.experience < 5500) this.level = 12;
		else if (this.experience < 7500) this.level = 13;
		else if (this.experience < 10000) this.level = 14;
		else if (this.experience < 13000) this.level = 15;
		else if (this.experience < 16000) this.level = 16;
		else if (this.experience < 19000) this.level = 17;
		else if (this.experience < 22000) this.level = 18;
		else if (this.experience < 26000) this.level = 19;
		else if (this.experience < 30000) this.level = 20;
		else if (this.experience < 34000) this.level = 21;
		else if (this.experience < 38000) this.level = 22;
		else if (this.experience < 42000) this.level = 23;
		else if (this.experience < 46000) this.level = 24;
		else if (this.experience < 50000) this.level = 25;
		else if (this.experience < 54000) this.level = 26;
		else if (this.experience < 58000) this.level = 27;
		else if (this.experience < 62000) this.level = 28;
		else if (this.experience < 65535) this.level = 29;
		else if (this.experience >= 65535) this.level = 30;
	},

	set_max_hp: function() {
		switch (this.level) {
			case 1: this.max_hp = 15; break;
			case 2: this.max_hp = 22; break;
			case 3: this.max_hp = 24; break;
			case 4: this.max_hp = 31; break;
			case 5: this.max_hp = 35; break;
			case 6: this.max_hp = 38; break;
			case 7: this.max_hp = 40; break;
			case 8: this.max_hp = 46; break;
			case 9: this.max_hp = 50; break;
			case 10: this.max_hp = 54; break;
			case 11: this.max_hp = 62; break;
			case 12: this.max_hp = 63; break;
			case 13: this.max_hp = 70; break;
			case 14: this.max_hp = 78; break;
			case 15: this.max_hp = 86; break;
			case 16: this.max_hp = 92; break;
			case 17: this.max_hp = 100; break;
			case 18: this.max_hp = 115; break;
			case 19: this.max_hp = 130; break;
			case 20: this.max_hp = 138; break;
			case 21: this.max_hp = 149; break;
			case 22: this.max_hp = 158; break;
			case 23: this.max_hp = 165; break;
			case 24: this.max_hp = 170; break;
			case 25: this.max_hp = 174; break;
			case 26: this.max_hp = 180; break;
			case 27: this.max_hp = 189; break;
			case 28: this.max_hp = 195; break;
			case 29: this.max_hp = 200; break;
			case 30: this.max_hp = 210; break;
		}
	},
	
	set_max_mp: function() {
		switch (this.level) {
			case 1: this.max_mp = 0; break;
			case 2: this.max_mp = 0; break;
			case 3: this.max_mp = 5; break;
			case 4: this.max_mp = 16; break;
			case 5: this.max_mp = 20; break;
			case 6: this.max_mp = 24; break;
			case 7: this.max_mp = 26; break;
			case 8: this.max_mp = 29; break;
			case 9: this.max_mp = 36; break;
			case 10: this.max_mp = 40; break;
			case 11: this.max_mp = 50; break;
			case 12: this.max_mp = 58; break;
			case 13: this.max_mp = 64; break;
			case 14: this.max_mp = 70; break;
			case 15: this.max_mp = 72; break;
			case 16: this.max_mp = 95; break;
			case 17: this.max_mp = 100; break;
			case 18: this.max_mp = 108; break;
			case 19: this.max_mp = 115; break;
			case 20: this.max_mp = 128; break;
			case 21: this.max_mp = 135; break;
			case 22: this.max_mp = 146; break;
			case 23: this.max_mp = 153; break;
			case 24: this.max_mp = 161; break;
			case 25: this.max_mp = 161; break;
			case 26: this.max_mp = 168; break;
			case 27: this.max_mp = 175; break;
			case 28: this.max_mp = 180; break;
			case 29: this.max_mp = 190; break;
			case 30: this.max_mp = 200; break;
		}
	},
	
	set_strength: function() {
		switch (this.level) {
			case 1: this.strength = 4; break;
			case 2: this.strength = 5; break;
			case 3: this.strength = 7; break;
			case 4: this.strength = 7; break;
			case 5: this.strength = 12; break;
			case 6: this.strength = 16; break;
			case 7: this.strength = 18; break;
			case 8: this.strength = 22; break;
			case 9: this.strength = 30; break;
			case 10: this.strength = 35; break;
			case 11: this.strength = 40; break;
			case 12: this.strength = 48; break;
			case 13: this.strength = 52; break;
			case 14: this.strength = 60; break;
			case 15: this.strength = 68; break;
			case 16: this.strength = 72; break;
			case 17: this.strength = 72; break;
			case 18: this.strength = 85; break;
			case 19: this.strength = 87; break;
			case 20: this.strength = 92; break;
			case 21: this.strength = 95; break;
			case 22: this.strength = 97; break;
			case 23: this.strength = 99; break;
			case 24: this.strength = 103; break;
			case 25: this.strength = 113; break;
			case 26: this.strength = 117; break;
			case 27: this.strength = 125; break;
			case 28: this.strength = 130; break;
			case 29: this.strength = 135; break;
			case 30: this.strength = 140; break;
		}
	},

	set_agility: function() {
		switch (this.level) {
			case 1: this.agility = 4; break;
			case 2: this.agility = 4; break;
			case 3: this.agility = 6; break;
			case 4: this.agility = 8; break;
			case 5: this.agility = 10; break;
			case 6: this.agility = 10; break;
			case 7: this.agility = 17; break;
			case 8: this.agility = 20; break;
			case 9: this.agility = 22; break;
			case 10: this.agility = 31; break;
			case 11: this.agility = 35; break;
			case 12: this.agility = 40; break;
			case 13: this.agility = 48; break;
			case 14: this.agility = 55; break;
			case 15: this.agility = 64; break;
			case 16: this.agility = 70; break;
			case 17: this.agility = 78; break;
			case 18: this.agility = 84; break;
			case 19: this.agility = 86; break;
			case 20: this.agility = 88; break;
			case 21: this.agility = 90; break;
			case 22: this.agility = 90; break;
			case 23: this.agility = 94; break;
			case 24: this.agility = 98; break;
			case 25: this.agility = 100; break;
			case 26: this.agility = 105; break;
			case 27: this.agility = 107; break;
			case 28: this.agility = 115; break;
			case 29: this.agility = 120; break;
			case 30: this.agility = 130; break;
		}
	},
	
	set_attack_power: function() {
		this.attack_power = this.strength + weapon_list[this.weapon].attack;
	},

	set_defense_power: function() {
		this.defense_power = Math.floor(this.agility / 2) + armor_list[this.armor].defense +
			shield_list[this.shield].defense;
	},

	set_spells: function() {
		if (game_state === "combat") {
			if (player.level >= 3 && getId('spell').options.length < 1)
				add_option("Heal", "Heal", 'spell');
			if (player.level >= 4 && getId('spell').options.length < 2)
				add_option("Hurt", "Hurt", 'spell');
			if (player.level >= 7 && getId('spell').options.length < 3)
				add_option("Sleep", "Sleep", 'spell');
			if (player.level >= 10 && getId('spell').options.length < 4)
				add_option("Stopspell", "Stopspell", 'spell');
			if (player.level >= 17 && getId('spell').options.length < 5)
				add_option("Healmore", "Healmore", 'spell');
			if (player.level >= 19 && getId('spell').options.length < 6)
				add_option("Hurtmore", "Hurtmore", 'spell');
		}
		if (game_state === "exploration") {
			if (player.level >= 3 && getId('spell').options.length < 1)
				add_option("Heal", "Heal", 'spell');
			if (player.level >= 9 && getId('spell').options.length < 2)
				add_option("Radiant", "Radiant", 'spell');
			if (player.level >= 12 && getId('spell').options.length < 3)
				add_option("Outside", "Outside", 'spell');
			if (player.level >= 13 && getId('spell').options.length < 4)
				add_option("Return", "Return", 'spell');
			if (player.level >= 15 && getId('spell').options.length < 5)
				add_option("Repel", "Repel", 'spell');
			if (player.level >= 17 && getId('spell').options.length < 6)
				add_option("Healmore", "Healmore", 'spell');
		}
	},

	// Item management
	// -------------------------------------------------------------------

	add_item: function(item) {
		this.inventory.push(item);
	},

	remove_item: function(item) {
		
	},

	// Non-static stat changes (combat or shop related)
	// -------------------------------------------------------------------

	gain_hp: function(amount) {
		this.current_hp += amount;
		if (this.current_hp > this.max_hp) {
			this.current_hp = this.max_hp;
		}
	},

	lose_hp: function(amount) {
		this.current_hp -= amount;
		if (this.current_hp < 0) {
			this.current_hp = 0;
		}
	},

	gain_mp: function(amount) {
		this.current_mp += amount;
		if (this.current_mp > this.max_mp) {
			this.current_mp = this.max_mp;
		}
	},

	lose_mp: function(amount) {
		this.current_mp -= amount;
		if ( this.current_mp < 0) {
			this.current_mp = 0;
		}
	},

	add_experience: function(amount) {
		this.experience += amount;
		if (this.experience >= 65535) {
			this.experience = 65535;
		}
	},

	add_gold: function(amount) {
		this.gold += amount;
		if (this.gold > 99999) {
			this.gold = 99999;
		}
	},

	remove_gold: function(amount) {
		this.gold -= amount;
		if (this.gold < 0) {
			this.gold = 0;
		}
	}
};