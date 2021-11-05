import Game from './game.js';
import config from './config.js';
import player from './player.js';

/*
References
##########
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
*/
export default {
	vWidth: 25,
	vHeight: 15,
	x: 0,
	y: 0,
	current_map: '',
	map_ptr: null,
	boundary_right: '',
	boundary_bottom: '',
	current_zone: 0,
	background_music: '',

	// 0 roof bricks
	// 1 stone block
	// 2 shop counter
	// 3 brick, 1 in 16 encounter rate
	// 4 chest
	// 5 door
	// 6 stairs down
	// 7 stairs up
	// 8 barrier - damage floor 15 HP, 1 in 16 encounter rate
	// 9 shop sign
	// 10 inn sign
	// 11 coastline
	// 12 castle
	// 13 town
	// 14 grass - 1 in 24 encounter rate
	// 15 forest - 1 in 16 encounter rate
	// 16 hill - 1 in 8 encounter rate
	// 17 mountain
	// 18 cave
	// 19 outside stairs down
	// 20 desert - 1 in 8 encounter rate
	// 21 swamp - damage floor 2 HP, 1 in 16 encounter rate
	// 22 bridge
	// 23 princess in swamp cave
	// 24 water
	// 25 - 35 coastline

	load_map: function (map_name) {
		if (map_name === 'World') {
			//reset door flags when leaving towns.
			//TODO: don't reset all flags; some stay unlocked (e.g. throne room).
			player.doors_opened = [];
		}

		player.steps = 0;
		player.set_position(map_name);

		this.current_map = map_name;
		this.map_ptr = config.maps[this.current_map];
		this.boundary_right = this.map_ptr.width - this.vWidth;
		this.boundary_bottom = this.map_ptr.height - this.vHeight;
		this.background_music = this.map_ptr.music;

		//audio.stop_music();
		//audio.play_map_music();
		this.refresh_map();
	},

	// refresh status of doors/treasure chests
	refresh_map: function () {
		var self = this;

		if (typeof this.map_ptr.doors !== 'undefined') {
			this.map_ptr.doors.forEach(function (element, index, array) {
				if (player.doors_opened.indexOf(element.id) > -1) {
					self.map_ptr.layout[element.x + (element.y * self.map_ptr.width)] = 4;
				} else {
					self.map_ptr.layout[element.x + (element.y * self.map_ptr.width)] = 6;
				}
			});
		}

		if (typeof this.map_ptr.chests !== 'undefined') {
			this.map_ptr.chests.forEach(function (element, index, array) {
				if (player.chests_taken.indexOf(element.id) > -1) {
					self.map_ptr.layout[element.x + (element.y * self.map_ptr.width)] = 4;
				} else {
					self.map_ptr.layout[element.x + (element.y * self.map_ptr.width)] = 5;
				}
			});
		}
	},

	get_npc: function (x, y) {
		var number_of_npcs, i;

		if (typeof this.map_ptr.npcs !== 'undefined') {
			number_of_npcs = this.map_ptr.npcs.length;
			for (i=0; i<number_of_npcs; i++) {
				//TODO: consider visibility.
				if (this.map_ptr.npcs[i].x === x && this.map_ptr.npcs[i].y === y) {
					return this.map_ptr.npcs[i];
				}
			}
		}

		return null;
	},

	get_door: function (x, y) {
		var number_of_doors, i;

		if (typeof this.map_ptr.doors !== 'undefined') {
			number_of_doors = this.map_ptr.doors.length;
			for (i=0; i<number_of_doors; i++) {
				//TODO: only consider if not already opened.
				if (this.map_ptr.doors[i].x === x && this.map_ptr.doors[i].y === y) {
					return this.map_ptr.doors[i];
				}
			}
		}

		return null;
	},

	draw_viewport: function (map_name, offset_x, offset_y) {
		var i,
			vWidth = 25,
			vHeight = 15;

		for (i=0; i<(vWidth * vHeight); i++) {
			Game.draw_tile(this.x, this.y, this.map_ptr.layout[offset_x + (offset_y * this.map_ptr.width)] - 1);
			this.x += config.tile_width;
			offset_x++;
			if (this.x === vWidth * config.tile_width) {
				this.x = 0;
				this.y += config.tile_height;
				offset_y++;
				offset_x -= vWidth;
			}
		}

		this.y = 0;
	},

	set_zone: function () {
		if (this.current_map === 'World') {
			// 16 tile square, break world into 8 x 8 grid
			var x_coord = Math.floor(((player.x / config.tile_width) + (player.offset_x)) / 16),
				y_coord = Math.floor(((player.y / config.tile_width) + (player.offset_y)) / 16),
			    zone_map = [
					3,	3,	2,	2,	3,	5,	4,	5,
					3,	2,	1,	2,	3,	3,	4,	5,
					4,	1,	0,	0,	1,	3,	4,	5,
					5,	1,	1,	12,	9,	6,	6,	6,
					5,	5,	4,	12,	12,	7,	7,	7,
					10,	9,	8,	12,	12,	12,	8,	7,
					10,	10,	11,	12,	13,	13,	9,	8,
					11,	11,	12,	13,	13,	12,	9,	9,
				];
			this.current_zone = zone_map[x_coord + (y_coord * 8)];
		}
		if (this.map_ptr.type === 'dungeon') {
			this.current_zone = this.map_ptr.zone;
		}
	},

	check_location: function () {
		let map = config.maps[this.current_map];

		if (typeof map.map_links !== 'undefined' && map.map_links instanceof Array) {
			for (let i = 0; i < map.map_links.length; i++) {
				let link = map.map_links[i];

				if (player.steps === 0 ||
					(typeof link.offset_x !== 'undefined' && player.offset_x !== link.offset_x) ||
					(typeof link.offset_y !== 'undefined' && player.offset_y !== link.offset_y) ||
					(typeof link.x !== 'undefined' && player.x !== (link.x * config.tile_width)) ||
					(typeof link.y !== 'undefined' && player.y !== (link.y * config.tile_height)))
				{
					continue;
				}

				this.load_map(link.map);

				if (typeof link.set_offsets !== 'undefined' && link.set_offsets instanceof Array && link.set_offsets.length === 2) {
					player.set_offsets(link.set_offsets[0], link.set_offsets[1]);
				}

				if (typeof link.set_xy !== 'undefined' && link.set_xy instanceof Array && link.set_xy.length === 2) {
					player.set_xy(link.set_xy[0], link.set_xy[1]);
				}
			}
		}
	}
};
