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
	"weapon": "none",
	"armor": "none",
	"shield": "none",
	"inventory": [],
	spells: {},

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

	status: "",
	spell_blocked: false,

	experience: 0,
	gold: 0,

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
		if ((Date.now() % 1000) < 500) {
			this.character_frame(frame1, this.x, this.y);
		} else {
			this.character_frame(frame2, this.x, this.y);
		}
	},

	draw_player: function(direction) {
		if (this.character_state === "up") { direction = "up"; }
		if (this.character_state === "down") { direction = "down"; }
		if (this.character_state === "") { direction = "down"; }
		if (this.character_state === "left") { direction = "left"; }
		if (this.character_state === "right") { direction = "right"; }
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
		var i, j, level, spellId;
		this.spells = {};
		for (i=0; i<config.levels.length; i++) {
			level = config.levels[i];
			if (this.experience < level.required_exp) {
				break;
			}
			if (typeof level.spells_learned !== 'undefined' && level.spells_learned instanceof Array) {
				for (j=0; j<level.spells_learned.length; j++) {
					spellId = level.spells_learned[j];
					this.spells[spellId] = config.spells[spellId];
				}
			}
		}
		this.level = i;
	},

	set_max_hp: function() {
		this.max_hp = config.levels[this.level - 1].max_hp;
	},

	set_max_mp: function() {
		this.max_mp = config.levels[this.level - 1].max_mp;
	},

	set_strength: function() {
		this.strength = config.levels[this.level - 1].strength;
	},

	set_agility: function() {
		this.agility = config.levels[this.level - 1].agility;
	},

	set_attack_power: function() {
		this.attack_power = this.strength + config.weapons[this.weapon].attack;
	},

	set_defense_power: function() {
		this.defense_power = Math.floor(this.agility / 2) + config.armors[this.armor].defense +
			config.shields[this.shield].defense;
	},

	set_spells: function() {
		var self = this;
		Object.keys(this.spells).forEach(function (spellId) {
			var spell = self.spells[spellId];
			if ((game_state === "combat" && spell.show_in_combat) || (game_state === "exploration" && spell.show_in_explore)) {
				add_option(text.spells[spellId], text.spells[spellId], "spell");
			}
		});
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