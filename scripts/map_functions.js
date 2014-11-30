var map = {
	vWidth: 25,
	vHeight: 15,
	x: 0,
	y: 0,
	current_map: "",
	boundary_right: "",
	boundary_bottom: "",
	current_zone: 0,
	background_music: "",

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
	// 25 coastline
	// 26 coastline
	// 27 coastline
	// 28 coastline
	// 29 coastline
	// 30 coastline
	// 31 coastline
	// 32 coastline
	// 33 coastline
	// 34 coastline
	// 35 coastline

	load_map: function(map_name) {
		var map = maps[map_name];
		player.steps = 0;
		player.set_position(map_name);
		this.current_map = map_name;
		this.boundary_right = map.width - this.vWidth;
		this.boundary_bottom = map.height - this.vHeight;
		this.background_music = map.music;
		//audio.stop_music();
		//audio.play_map_music();

		// refresh door status
		if (typeof map.doors !== 'undefined') {
			map.doors.forEach(function (element, index, array) {
				if (player.doors_opened.indexOf(element.id) > -1) {
					map.layout[element.x + (element.y * map.width)] = 4;
				}
			});
		}

		// refresh treasure chest status
		if (typeof map.chests !== 'undefined') {
			map.chests.forEach(function (element, index, array) {
				if (player.chests_taken.indexOf(element.id) > -1) {
					map.layout[element.x + (element.y * map.width)] = 4;
				}
			});
		}
	},

	map_frame: function(frame_number) {		// draw single tile frame from sprite sheet
		var img = new Image();
		img.src = "assets/sprites/tiles.png";

		// find horizontal and vertical position of tile to be drawn
		var pos_x = (frame_number % 12) * 16,
		    pos_y = Math.floor(frame_number / 12) * 16;

		// drawImage(image name, sprite sheet x pos, sprite sheet y pos, tile width, tile height,
		// draw to x position, draw to y position, scale x, scale y)
		context.drawImage(img, pos_x, pos_y, 16, 16,
			this.x, this.y, tile_width, tile_height);
	},

	draw_viewport: function(map_name, offset_x, offset_y) {
		var i,
			vWidth = 25,
			vHeight = 15;

		for (i = 0; i < vWidth * vHeight; i++) {
			this.map_frame(maps[map_name].layout[offset_x + (offset_y * maps[map_name].width)] - 1);
			this.x += tile_width;
			offset_x++;
			if (this.x === vWidth * tile_width) {
				this.x = 0;
				this.y += tile_height;
				offset_y++;
				offset_x -= vWidth;
			}
		}
		this.y = 0;
	},

	set_zone: function() {
		if (this.current_map === "World") {
			// 16 tile square, break world into 8 x 8 grid
			var x_coord = Math.floor(((player.x / tile_width) + (player.offset_x)) / 16);
			var y_coord = Math.floor(((player.y / tile_width) + (player.offset_y)) / 16);
			var zone_map = [
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
		if (maps[this.current_map].type === "dungeon") {
			this.current_zone = maps[this.current_map].zone;
		}
	},

	check_location: function() {
		if (this.current_map === "World") {
			if (player.offset_x === 35 && player.offset_y === 41 && player.steps !== 0) {
				this.load_map("Tantagel1F");
			}
			if (player.offset_x === 40 && player.offset_y === 39 && player.steps !== 0) {
				this.load_map("Brecconary");
			}
			if (player.offset_x === 96 && player.offset_y === 8 && player.steps !== 0) {
				this.load_map("Kol");
			}
			if (player.offset_x === 65 && player.offset_y === 100 && player.steps !== 0) {
				this.load_map("Cantlin");
			}
			if (player.offset_x === 0 && player.offset_y === 0 &&
				player.x === 6 * tile_width && player.y === 6 * tile_height && player.steps !== 0) {
				this.load_map("Garinham");
			}
			if (player.offset_x === 17 && player.offset_y === 87 && player.steps !== 0) {
				this.load_map("Hauksness");
			}
			if (player.offset_x === 94 && player.offset_y === 70 && player.steps !== 0) {
				this.load_map("Rimuldar");
			}
			if (player.offset_x === 20 && player.offset_y === 10 && player.steps !== 0) {
				this.load_map("ErdricksCaveB1");
			}
			if (player.offset_x === 96 && player.offset_y === 42 && player.steps !== 0) {
				this.load_map("SwampCave");
			}
			if (player.offset_x === 96 && player.offset_y === 47 && player.steps !== 0) {
				this.load_map("SwampCave");
				player.set_offsets(0, 17);
				player.set_xy(9, 13);
			}
			if (player.offset_x === 21 && player.offset_y === 55 && player.steps !== 0) {
				this.load_map("MountainCaveB1");
			}
			if (player.offset_x === 40 && player.offset_y === 46 && player.steps !== 0) {
				this.load_map("CharlockCastle1F");
			}
			if (player.offset_x === 73 && player.offset_y === 0 && player.y === 5 * tile_height && player.steps !== 0) {
				this.load_map("NorthShrine");
			}
			if (player.offset_x === 100 && player.offset_y === 107 && player.steps !== 0) {
				this.load_map("SouthShrine");
			}
		}
		if (this.current_map === "Tantagel1F") {
			if (player.offset_x > 28 || player.y < 6 * tile_height|| player.offset_y > 29) {
				this.load_map("World");
				player.set_offsets(35, 41);
			}
			if (player.offset_x === 6 && player.offset_y === 7 && player.steps !== 0) {
				this.load_map("Tantagel2F");
			}
			if (player.offset_x === 28 && player.offset_y === 29 && player.steps !== 0) {
				this.load_map("TantagelB1");
			}
		}
		if (this.current_map === "Tantagel2F") {
			if (player.x === 16 * tile_width && player.y === 11 * tile_height && player.steps !== 0) {
				this.load_map("Tantagel1F");
				player.set_offsets(6, 7);
			}
		}
		if (this.current_map === "TantagelB1") {
			if (player.x === 7 * tile_width && player.y == 6 * tile_height && player.steps !== 0) {
				this.load_map("Tantagel1F");
				player.set_offsets(28, 29);
			}
		}
		if (this.current_map === "Brecconary") {
			if (player.x !== 12 * tile_width || player.offset_y < 1) {
				this.load_map("World");
				player.set_offsets(40, 39);
			}
		}
		if (this.current_map === "Kol") {
			if(player.y > 8 * tile_height || player.x !== 12 * tile_width || player.offset_y < 2) {
				this.load_map("World");
				player.set_offsets(96, 8);
			}
		}
		if (this.current_map === "Cantlin") {
			if (player.y < 6 * tile_height || player.offset_y > 28 || player.x < 12 * tile_width || player.offset_x > 27) {
				this.load_map("World");
				player.set_offsets(65, 100);
			}
		}
		if (this.current_map === "Rimuldar") {
			if (player.x > 13 * tile_width || player.offset_x < 1 || player.offset_y < 1 || player.y > 6 * tile_height) {
				this.load_map("World");
				player.set_offsets(94, 70);
			}
		}
		if (this.current_map === "Garinham") {
			if (player.x !== 12 * tile_width || player.y > 7 * tile_height || player.offset_y < 1) {
				this.load_map("World");
				player.set_offsets(0, 0);
				player.set_xy(6, 6);
			}
			if (player.offset_x === 19 && player.offset_y === 1 && player.steps !== 0) {
				this.load_map("GarinhamsGraveB1");
			}
		}
		if (this.current_map === "Hauksness") {
			if (player.x !== 12 * tile_width || player.y !== 6 * tile_height) {
				this.load_map("World");
				player.set_offsets(17, 87);
			}
		}
		if (this.current_map === "ErdricksCaveB1") {
			if (player.x === 6 * tile_width && player.y === 2 * tile_height && player.steps !== 0) {
				this.load_map("World");
				player.set_offsets(20, 10);
			}
			if (player.x === 15 * tile_width && player.y === 11 * tile_height && player.steps !== 0) {
				this.load_map("ErdricksCaveB2");
				player.set_xy(14, 11);
			}
		}
		if (this.current_map === "ErdricksCaveB2") {
			if (player.x === 14 * tile_width && player.y === 11 * tile_height && player.steps !== 0) {
				this.load_map("ErdricksCaveB1");
				player.set_xy(15, 11);
			}
		}
		if (this.current_map === "SwampCave") {
			if (player.x === 9 * tile_width && player.y === 1 * tile_height && player.steps !== 0) {
				this.load_map("World");
				player.set_offsets(96, 42);
			}
			if (player.x === 9 * tile_width && player.y === 13 * tile_height && player.offset_y === 17 && player.steps !== 0) {
				this.load_map("World");
				player.set_offsets(96, 47);
			}
		}
		if (this.current_map === "GarinhamsGraveB1") {
			if (player.offset_y === 6 && player.x === 8 * tile_width && player.steps !== 0) {
				this.load_map("Garinham");
				player.set_offsets(19, 1);
			}
			if (player.offset_y === 7 && player.x === 3 * tile_width && player.y === 12 * tile_height && player.steps !== 0) {
				this.load_map("GarinhamsGraveB2");
			}
		}
		if (this.current_map === "GarinhamsGraveB2") {
			if (player.x === 16 * tile_width && player.y === 3 * tile_height && player.steps !== 0) {
				this.load_map("GarinhamsGraveB1");
				player.set_offsets(0, 7);
				player.set_xy(3, 12);
			}
			if (player.x === 17 * tile_width && player.y === 2 * tile_height && player.steps !== 0) {
				this.load_map("GarinhamsGraveB3");
			}
			if (player.x === 6 * tile_width && player.y === 2 * tile_height && player.steps !== 0) {
				this.load_map("GarinhamsGraveB3");
				player.set_xy(16, 2);
			}
			if (player.x === 6 * tile_width && player.y === 11 * tile_height && player.steps !== 0) {
				this.load_map("GarinhamsGraveB3");
				player.set_offsets(0, 7);
				player.set_xy(4, 11);
			}
			if (player.x === 17 * tile_width && player.y === 11 * tile_height && player.steps !== 0) {
				this.load_map("GarinhamsGraveB3");
				player.set_offsets(0, 7);
				player.set_xy(20, 7);
			}
			if (player.x === 10 * tile_width && player.y === 7 * tile_height && player.steps !== 0) {
				this.load_map("GarinhamsGraveB3");
				player.set_offsets(0, 6);
				player.set_xy(8, 6);
			}
		}
		if (this.current_map === "GarinhamsGraveB3") {
			if (player.x === 20 * tile_width && player.y === 2 * tile_height && player.steps !== 0) {
				this.load_map("GarinhamsGraveB2");
				player.set_xy(17, 2);
			}
			if (player.x === 16 * tile_width && player.y === 2 * tile_height && player.steps !== 0) {
				this.load_map("GarinhamsGraveB2");
				player.set_xy(6, 2);
			}
			if (player.x === 11 * tile_width && player.y === 6 * tile_height && player.offset_y === 0 && player.steps !== 0) {
				this.load_map("GarinhamsGraveB4");
			}
			if (player.x === 12 * tile_width && player.y === 6 * tile_height && player.offset_y === 4 && player.steps !== 0) {
				this.load_map("GarinhamsGraveB4");
				player.set_xy(12, 7);
			}
			if (player.x === 8 * tile_width && player.offset_y === 6 && player.steps !== 0) {
				this.load_map("GarinhamsGraveB2");
				player.set_xy(10, 7);
			}
			if (player.x === 4 * tile_width && player.y === 11 * tile_height && player.offset_y === 7 && player.steps !== 0) {
				this.load_map("GarinhamsGraveB2");
				player.set_xy(6, 11);
			}
			if (player.x === 20 * tile_width && player.y === 7 * tile_height && player.offset_y === 7 && player.steps !== 0) {
				this.load_map("GarinhamsGraveB2");
				player.set_xy(17, 11);
			}
		}
		if (this.current_map === "GarinhamsGraveB4") {
			if (player.x === 7 * tile_width && player.y === 7 * tile_height && player.steps !== 0) {
				this.load_map("GarinhamsGraveB3");
				player.set_xy(11, 6);
			}
			if (player.x === 12 * tile_width && player.y === 7 * tile_height && player.steps !== 0) {
				this.load_map("GarinhamsGraveB3");
				player.set_xy(12, 6);
				player.set_offsets(0, 4);
			}
		}
		if (this.current_map === "MountainCaveB1") {
			if (player.x === 6 * tile_width && player.y === 7 * tile_height && player.offset_y === 1 && player.steps !== 0) {
				this.load_map("World");
				player.set_offsets(21, 55);
			}
			if (player.x === 6 * tile_width && player.y === 1 * tile_height && player.steps !== 0) {
				this.load_map("MountainCaveB2");
			}
			if (player.x === 12 * tile_width && player.y === 6 * tile_height && player.offset_y === 0 && player.steps !== 0) {
				this.load_map("MountainCaveB2");
				player.set_xy(12, 6);
			}
			if (player.x === 18 * tile_width && player.y === 12 * tile_height && player.steps !== 0) {
				this.load_map("MountainCaveB2");
				player.set_xy(18, 12);
				player.set_offsets(0, 1);
			}
		}
		if (this.current_map === "MountainCaveB2") {
			if (player.x === 6 * tile_width && player.y === 1 * tile_height && player.steps !== 0) {
				this.load_map("MountainCaveB1");
				player.set_xy(6, 1);
				player.set_offsets(0, 0);
			}
			if (player.x === 12 * tile_width && player.y === 6 * tile_height && player.offset_y === 0 && player.steps !== 0) {
				this.load_map("MountainCaveB1");
				player.set_xy(12, 6);
				player.set_offsets(0, 0);
			}
			if (player.x === 18 * tile_width && player.y === 12 * tile_height && player.steps !== 0) {
				this.load_map("MountainCaveB1");
				player.set_xy(18, 12);
			}
		}
		if (this.current_map === "CharlockCastle1F") {
			if (player.x === 13 * tile_width && player.y === 4 * tile_height && player.steps !== 0) {
				// if player searches, stairs appear and player descends
			}
			if (player.x === 7 * tile_width && player.y === 6 * tile_height && player.offset_y === 11 && player.steps !== 0) {
				this.load_map("CharlockCastleB1");
				player.set_offsets(0, 7);
				player.set_xy(11, 7);
			}
			if (player.x === 18 * tile_width && player.y === 6 * tile_height && player.offset_y === 11 && player.steps !== 0) {
				this.load_map("CharlockCastleB1");
				player.set_offsets(0, 7);
				player.set_xy(20, 9);
			}
			if (player.y > 11 * tile_height) {
				this.load_map("World");
				player.set_offsets(40, 46);
			}
		}
		if (this.current_map === "CharlockCastleB1") {
			if (player.x === 12 * tile_width && player.y === 1 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastle1F");
				player.set_offsets(0, 0);
				player.set_xy(13, 4);
			}
			if (player.x === 11 * tile_width && player.y === 7 * tile_height && player.offset_y === 7 && player.steps !== 0) {
				this.load_map("CharlockCastle1F");
				player.set_offsets(0, 11);
				player.set_xy(7, 6);
			}
			if (player.x === 20 * tile_width && player.y === 9 * tile_height && player.offset_y === 7 && player.steps !== 0) {
				this.load_map("CharlockCastle1F");
				player.set_offsets(0, 11);
				player.set_xy(18, 6);
			}
			if (player.x === 18 * tile_width && player.y === 1 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB2");
				player.set_xy(15, 2);
			}
			if (player.x === 5 * tile_width && player.y === 5 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB2");
				player.set_xy(7, 2);
			}
			if (player.x === 16 * tile_width && player.offset_y === 2 && player.steps !== 0) {
				this.load_map("CharlockCastleB2");
				player.set_xy(11, 6);
			}
			if (player.x === 22 * tile_width && player.offset_y === 2 && player.steps !== 0) {
				this.load_map("CharlockCastleB2");
				player.set_xy(16, 10);
			}
			if (player.x === 17 * tile_width && player.offset_y === 4 && player.steps !== 0) {
				this.load_map("CharlockCastleB2");
				player.set_xy(15, 11);
			}
			if (player.x === 5 * tile_width && player.y === 8 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB2");
				player.set_xy(7, 3);
			}
			if (player.x === 11 * tile_width && player.y === 13 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB2");
				player.set_xy(12, 2);
			}
		}
		if (this.current_map === "CharlockCastleB2") {
			if (player.x === 15 * tile_width && player.y === 2 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB1");
				player.set_xy(18, 1);
			}
			if (player.x === 7 * tile_width && player.y === 2 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB1");
				player.set_xy(5, 5);
			}
			if (player.x === 11 * tile_width && player.y === 6 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB1");
				player.set_offsets(0, 2);
				player.set_xy(16, 6);
			}
			if (player.x === 16 * tile_width && player.y === 10 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB1");
				player.set_offsets(0, 2);
				player.set_xy(22, 6);
			}
			if (player.x === 15 * tile_width && player.y === 11 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB1");
				player.set_offsets(0, 4);
				player.set_xy(17, 6);
			}
			if (player.x === 7 * tile_width && player.y === 3 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB1");
				player.set_offsets(0, 7);
				player.set_xy(5, 8);
			}
			if (player.x === 12 * tile_width && player.y === 2 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB1");
				player.set_offsets(0, 7);
				player.set_xy(11, 13);
			}
			if (player.x === 16 * tile_width && player.y === 3 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB3");
				player.set_xy(9, 4);
			}
			if (player.x === 10 * tile_width && player.y === 2 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB3");
				player.set_xy(14, 2);
			}
			if (player.x === 7 * tile_width && player.y === 10 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB3");
				player.set_xy(12, 6);
			}
			if (player.x === 8 * tile_width && player.y === 11 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB3");
				player.set_xy(7, 11);
			}
		}
		if (this.current_map === "CharlockCastleB3") {
			if (player.x === 9 * tile_width && player.y === 4 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB2");
				player.set_xy(16, 3);
			}
			if (player.x === 14 * tile_width && player.y === 2 * tile_height && player.steps !== 0 ) {
				this.load_map("CharlockCastleB2");
				player.set_xy(10, 2);
			}
			if (player.x === 12 * tile_width && player.y === 6 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB2");
				player.set_xy(7, 10);
			}
			if (player.x === 7 * tile_width && player.y === 11 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB2");
				player.set_xy(8, 11);
			}
			if (player.x === 8 * tile_width && player.y === 8 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB4");
				player.set_xy(7, 11);
			}
			if (player.x === 14 * tile_width && player.y === 9 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB4");
				player.set_xy(14, 9);
			}
		}
		if (this.current_map === "CharlockCastleB4") {
			if (player.x === 7 * tile_width && player.y === 11 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB3");
				player.set_xy(8, 8);
			}
			if (player.x === 14 * tile_width && player.y === 9 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB3");
				player.set_xy(14, 9);
			}
			if (player.x === 9 * tile_width && player.y === 4 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB5");
				player.set_xy(16, 2);
			}
			if (player.x === 15 * tile_width && player.y === 3 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB5");
				player.set_xy(11, 2);
			}
		}
		if (this.current_map === "CharlockCastleB5") {
			if (player.x === 16 * tile_width && player.y === 2 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB4");
				player.set_xy(9, 4);
			}
			if (player.x === 11 * tile_width && player.y === 2 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB4");
				player.set_xy(15, 3);
			}
			if (player.x === 12 * tile_width && player.y === 7 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB6");
				player.set_xy(7, 2);
			}
			if (player.x === 7 * tile_width && player.y === 2 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB6");
				player.set_xy(7, 9);
			}
		}
		if (this.current_map === "CharlockCastleB6") {
			if (player.x === 7 * tile_width && player.y === 2 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB5");
				player.set_xy(12, 7);
			}
			if (player.x === 16 * tile_width && player.y === 2 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB6");
				player.set_xy(7, 2);
			}
			if (player.x === 7 * tile_width && player.y === 9 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB5");
				player.set_xy(7, 2);
			}
			if (player.x === 16 * tile_width && player.y === 9 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB7");
			}
		}
		if (this.current_map === "CharlockCastleB7") {
			if (player.x === 11 * tile_width && player.y === 13 * tile_height && player.steps !== 0) {
				this.load_map("CharlockCastleB6");
				player.set_xy(16, 9);
			}
		}
		if (this.current_map === "NorthShrine") {
			if (player.x === 11 * tile_width && player.y === 11 * tile_height && player.steps !== 0) {
				this.load_map("World");
				player.set_offsets(73, 0);
				player.set_xy(12, 5);
			}
		}
		if (this.current_map === "SouthShrine") {
			if (player.x === 8 * tile_width && player.y === 6 * tile_height && player.steps !== 0) {
				this.load_map("World");
				player.set_offsets(100, 107);
			}
		}
	}
};