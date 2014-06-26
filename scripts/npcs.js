var npc = {
	"character_state": "",

	// image file
	image: function() {
		var img = new Image();
		img.src = "assets/sprites/characters.png";
		return img;
	},

	// Call frame from characters.png - starts with frame 0
	character_frame: function(frame_number, pos_x, pos_y) {
		var image_x = (frame_number % 16) * tile_width;
		var image_y = Math.floor(frame_number / 16) * tile_height;

		pos_x = pos_x * 32;
		pos_y = pos_y * 32;

		context.drawImage(this.image(), image_x, image_y, tile_width, tile_height, pos_x, pos_y, tile_width, tile_height);
	},

	animate_character: function(frame1, frame2, x, y) {
		if ((Date.now() % 1000) < 500) this.character_frame(frame1, x, y);
		else this.character_frame(frame2, x, y);
	},

	draw_character: function(character_type, direction, x, y) {
		this.character_state = direction;
		switch(character_type) {
			case "princess":
				if (this.character_state === "down") {
					this.animate_character(80, 81, x, y);
				}
				if (this.character_state === "left") {
					this.animate_character(82, 83, x, y);
				}
				if (this.character_state === "up") {
					this.animate_character(84, 85, x, y);
				}
				if (this.character_state === "right") {
					this.animate_character(86, 87, x, y);
				}
				break;
			case "soldier":
				if (this.character_state === "down") {
					this.animate_character(96, 97, x, y);
				}
				if (this.character_state === "left") {
					this.animate_character(98, 99, x, y);
				}
				if (this.character_state === "up") {
					this.animate_character(100, 101, x, y);
				}
				if (this.character_state === "right") {
					this.animate_character(102, 103, x, y);
				}
				break;
			case "townsman":
				if (this.character_state === "down") {
					this.animate_character(8, 9, x, y);
				}
				if (this.character_state === "left") {
					this.animate_character(10, 11, x, y);
				}
				if (this.character_state === "up") {
					this.animate_character(12, 13, x, y);
				}
				if (this.character_state === "right") {
					this.animate_character(14, 15, x, y);
				}
				break;
			case "townswoman":
				if (this.character_state === "down") {
					this.animate_character(24, 25, x, y);
				}
				if (this.character_state === "left") {
					this.animate_character(26, 27, x, y);
				}
				if (this.character_state === "up") {
					this.animate_character(28, 29, x, y);
				}
				if (this.character_state === "right") {
					this.animate_character(30, 31, x, y);
				}
				break;
			case "old_man":
				if (this.character_state === "down") {
					this.animate_character(40, 41, x, y);
				}
				if (this.character_state === "left") {
					this.animate_character(42, 43, x, y);
				}
				if (this.character_state === "up") {
					this.animate_character(44, 45, x, y);
				}
				if (this.character_state === "right") {
					this.animate_character(46, 47, x, y);
				}
				break;
			case "merchant":
				if (this.character_state === "down") {
					this.animate_character(56, 57, x, y);
				}
				if (this.character_state === "left") {
					this.animate_character(58, 59, x, y);
				}
				if (this.character_state === "up") {
					this.animate_character(60, 61, x, y);
				}
				if (this.character_state === "right") {
					this.animate_character(62, 63, x, y);
				}
				break;
			case "solider_2":
				if (this.character_state === "down") {
					this.animate_character(72, 73, x, y);
				}
				if (this.character_state === "left") {
					this.animate_character(74, 75, x, y);
				}
				if (this.character_state === "up") {
					this.animate_character(76, 77, x, y);
				}
				if (this.character_state === "right") {
					this.animate_character(78, 79, x, y);
				}
				break;
			case "dragonlord":
				if (this.character_state === "down") {
					this.animate_character(88, 89, x, y);
				}
				if (this.character_state === "left") {
					this.animate_character(90, 91, x, y);
				}
				if (this.character_state === "up") {
					this.animate_character(92, 93, x, y);
				}
				if (this.character_state === "right") {
					this.animate_character(94, 95, x, y);
				}
				break;
			case "trumpeteer":
				if (this.character_state === "left") {
					this.animate_character(105, 105, x, y);
				}
				if (this.character_state === "right") {
					this.animate_character(104, 104, x, y);
				}
				break;
			case "king":
				this.animate_character(106, 107, x, y);
				break;
		}
	},

	draw_npcs: function() {
		var number_of_npcs = maps[map.current_map].npcs.length;
		if (map.current_map === "Tantagel2F" && player.rescued_princess === "false") {
			number_of_npcs--;
		}
		for (var i = 0; i < number_of_npcs; i++) {
			this.draw_character(maps[map.current_map].npcs[i][0],
				maps[map.current_map].npcs[i][1],
				maps[map.current_map].npcs[i][2],
				maps[map.current_map].npcs[i][3]);
		}
	}
};