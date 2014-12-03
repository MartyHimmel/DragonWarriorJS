/*
References
##########
https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame?redirectlocale=en-US&redirectslug=DOM%2Fwindow.requestAnimationFrame
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage
*/

Game = {
	state: "",
	possible_states: ["exploration", "combat"],
	canvas: null,
	context: null,
	img_characters: null,
	img_enemies: null,
	img_tiles: null,

	begin: function () {
		var self = this,
			keysDown = {};

		function draw () {
			self.clear();
			map.draw_viewport(map.current_map, player.offset_x, player.offset_y);
			npc.draw_npcs();
		}

		function update () {
			delta_time = Date.now();
			map.check_location();
			player.load_player();

			if (self.state === "exploration") {
				if (38 in keysDown) { // Player holding up
					player.move("up");
				} else if (40 in keysDown) { // Player holding down
					player.move("down");
				} else if (37 in keysDown) { // Player holding left
					player.move("left");
				} else if (39 in keysDown) { // Player holding right
					player.move("right");
				} else {
					player.draw_player();
				}
			}

			if (self.state === "combat") {
				combat.draw_screen();
				self.draw_enemy(combat.enemy_ptr);
				if (combat.initiative_round === true) {
					combat.initiative();
				}
				if (combat.player_turn === false) {
					setTimeout(function() {
						combat.enemy_attack();
					}, 1000);
				}

				if (88 in keysDown) { // Player presses 'x'
					combat.enemy_ptr = null;
					self.change_state("exploration");
				}
			}
		}

		function main() {
			requestAnimationFrame(main);
			if (self.state === "exploration") {
				draw();
			}
			update();
			display_output();
		}

		function load_images() {
			self.img_characters = new Image();
			self.img_characters.src = config.sprites.characters;
			self.img_enemies = new Image();
			self.img_enemies.src = config.sprites.enemies;
			self.img_tiles = new Image();
			self.img_tiles.src = config.sprites.tiles;
		}

		// Main game window
		document.title = text.game_title;
		this.canvas = document.getElementById("game");
		this.context = this.canvas.getContext("2d");
		load_images();

		// Keyboard inputs
		window.addEventListener("keydown", function(e) {
			keysDown[e.keyCode] = true;
		});
		window.addEventListener("keyup", function(e) {
			delete keysDown[e.keyCode];
		});

		// Start the game!
		player.name = prompt(text.name_prompt);
		if (player.name === "") { player.name = text.default_player_name; }
		Game.change_state("exploration");
		map.load_map("World");
		player.load_player();
		player.set_current_tile();
		add_text(text.welcome);
		main();
	},

	change_state: function (input) {
		if (this.possible_states.indexOf(input) > -1) {
			this.state = input;
			change_command_set();
		}
	},

	clear: function () {
		return this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},

	// call frame from characters.png - starts with frame 0
	draw_character: function (frame_number, pos_x, pos_y) {
		var image_x = (frame_number % 16) * tile_width,
		    image_y = Math.floor(frame_number / 16) * tile_height;

		this.context.drawImage(this.img_characters, image_x, image_y, tile_width, tile_height,
			pos_x, pos_y, tile_width, tile_height);
	},

	draw_enemy: function (enemy) {
		var tile_x = enemy.x,
		    tile_y = enemy.y,
		    tile_width = enemy.width,
		    tile_height = enemy.height,
		    pos_x = (this.canvas.width / 2) - tile_width,
		    pos_y = (this.canvas.height / 2) - tile_height;

		this.context.drawImage(this.img_enemies, tile_x, tile_y, tile_width, tile_height,
			pos_x, pos_y, tile_width * 2, tile_height *2);
	},

	// draw single tile frame from sprite sheet
	draw_tile: function (x, y, frame_number) {
		// find horizontal and vertical position of tile to be drawn
		var pos_x = (frame_number % 12) * tile_width,
		    pos_y = Math.floor(frame_number / 12) * tile_height;

		this.context.drawImage(this.img_tiles, pos_x, pos_y, tile_width, tile_height,
			x, y, tile_width, tile_height);
	},

	// TODO: for handling menu system displaying text, etc.
	process_script: function (script_command) {
		if (typeof script_command !== 'undefined') {
			// Display raw text
            if (typeof script_command.text !== 'undefined' &&
                typeof text.script[script_command.text] !== 'undefined') {

				if (text.script[script_command.text] instanceof Array) {
					text.script[script_command.text].forEach(function (element, index, array) {
						add_text(element);
					});
				} else {
					add_text(text.script[script_command.text]);
				}
			}

			//TODO: menu support
			//yes/no
			//item selection
		}
	},

	random_number: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
};