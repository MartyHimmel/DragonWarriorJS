import Data from './data.js';
import GameState from './state.js';
import TitleScreen from './title-screen.js';
import config from './config.js';
import combat from './combat.js';
import map from './map.js';
import player from './player.js';
import text from './text.js';
import { addText, displayOutput } from './utils.js';

/*
References
##########
https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame?redirectlocale=en-US&redirectslug=DOM%2Fwindow.requestAnimationFrame
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage
*/

const Game = {
	state: '',
	possible_states: ['title', 'menu', 'exploration', 'combat'],
	canvas: null,
	context: null,
	img_characters: null,
	img_enemies: null,
	img_tiles: null,
	img_battle: null,
	keysDown: {},

	begin: function () {
		var self = this;
		let frameCount = 0;

		function main() {
			requestAnimationFrame(main);

			config.frameNumber++;
			if (config.frameNumber >= 60) {
				config.frameNumber = 0;
			}

			if (self.state === 'title') {
				frameCount++;
				if (frameCount < 240) {
					TitleScreen.drawTitle1();
					if ('Enter' in self.keysDown) {
						frameCount = 240;
						delete self.keysDown['Enter'];
					}
				} else {
					TitleScreen.drawTitle2();
					if ('Enter' in self.keysDown) {
						self.change_state('exploration');
						self.startGame();
					}
				}
				return;
			}

			if (self.state === 'exploration') {
				draw();
			}

			update();
			displayOutput();
		}

		function draw () {
			self.clear();
			map.drawViewport(map.current_map, player.offset_x, player.offset_y);
			self.draw_npcs();
		}

		function update () {
			map.check_location();
			player.load_player();

			if (self.state === 'exploration') {
				if ('ArrowUp' in self.keysDown) {
					player.move('up');
				} else if ('ArrowDown' in self.keysDown) {
					player.move('down');
				} else if ('ArrowLeft' in self.keysDown) {
					player.move('left');
				} else if ('ArrowRight' in self.keysDown) {
					player.move('right');
				} else {
					player.draw_player();
				}
			}

			if (self.state === 'combat') {
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

				// DEBUG shortcut
				if ('KeyX' in self.keysDown) {
					combat.enemy_ptr = null;
					self.change_state('exploration');
				}
			}
		}

		// Main game window
		document.title = text.game_title;
		this.canvas = document.getElementById('game');
		this.context = this.canvas.getContext('2d');
		this.load_images();

		// Keyboard inputs
		window.addEventListener('keydown', e => {
			this.keysDown[e.code] = true;
		});
		window.addEventListener('keyup', e => {
			delete this.keysDown[e.code];
		});

		// Start the game!
		this.change_state('title');
		main();
	},

	startGame() {
		GameState.player.name = prompt(text.name_prompt);
		if (GameState.player.name === '') { GameState.player.name = text.default_player_name; }
		map.load_map('World');
		player.load_player();
		player.set_current_tile();
		this.display_text(text.welcome);
	},

	load_images() {
		this.img_characters = new Image();
		this.img_characters.src = config.sprites.characters;
		this.img_enemies = new Image();
		this.img_enemies.src = config.sprites.enemies;
		this.img_tiles = new Image();
		this.img_tiles.src = config.sprites.tiles;
		this.img_battle = new Image();
		this.img_battle.src = config.sprites.battle;
		this.img_title = new Image();
		this.img_title.src = config.sprites.title;
	},

	changeCommandSet() {
		if (Game.state === 'exploration') {
			document.querySelector('#commands').innerHTML = `
				<input type="button" id="talk" value="Talk">
				<input type="button" id="door" value="Door"><br>
				<input type="button" id="search" value="Search">
				<input type="button" id="take" value="Take"><br>
				<select id="spell" size="6"></select>
				<select id="item" size="6"></select><br>
				<input type="button" id="cast_spell" value="Cast">
				<input type="button" id="use_item" value="Use">`;
		}

		if (Game.state === 'combat') {
			document.querySelector('#commands').innerHTML = `
				<input type="button" id="fight" value="Fight">
				<input type="button" id="run" value="Run"><br>
				<select id="spell" size="6"></select>
				<select id="item" size="6"></select>
				<input type="button" id="cast_spell" value="Cast">
				<input type="button" id="use_item" value="Use">`;
		}
	},

	change_state: function (input, delay) {
		if (this.possible_states.indexOf(input) > -1) {
			if (typeof delay !== 'undefined') {
				setTimeout(() => this.set_state(input), delay);
			} else {
				this.set_state(input);
			}
		}
	},

	set_state (input) {
		this.state = input;
		this.changeCommandSet();
	},

	clear() {
		return this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},

	display_text: function (format_string, params) {
		function format (format_string, params) {
	        function escapeRegExp(string) {
	            return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	        }

	        function replaceAll(string, find, replace) {
	            return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	        }

	        if (typeof params !== 'undefined') {
	            if (typeof params.player_name !== 'undefined') {
	                format_string = replaceAll(format_string, "<player_name>", params.player_name);
	            }
	            if (typeof params.enemy !== 'undefined') {
	                format_string = replaceAll(format_string, "<enemy>", params.enemy);
	            }
	            if (typeof params.number !== 'undefined') {
	                format_string = replaceAll(format_string, "<number>", params.number);
	            }
	            if (typeof params.spell !== 'undefined') {
	                format_string = replaceAll(format_string, "<spell>", params.spell);
	            }
	        }

	        return format_string;
	    }

		addText(format(format_string, params));
	},

	// Animation and rendering
	// -------------------------------------------------------------------

	animate_npc: function(frame1, frame2, x, y) {
		x = ((x-player.offset_x) * config.tileWidth);
		y = ((y-player.offset_y) * config.tileHeight);

		if ((Date.now() % 1000) < 500) {
			this.draw_character(frame1, x, y);
		} else {
			this.draw_character(frame2, x, y);
		}
	},

	// call frame from characters.png - starts with frame 0
	draw_character: function (frame_number, pos_x, pos_y) {
		var image_x = (frame_number % 16) * config.tileWidth,
		    image_y = Math.floor(frame_number / 16) * config.tileHeight;

		this.context.drawImage(this.img_characters, image_x, image_y, config.tileWidth, config.tileHeight,
			pos_x, pos_y, config.tileWidth, config.tileHeight);
	},

	draw_npcs: function() {
		let self = this;

		//TODO: refactor this
		function draw_npc (character_type, direction, x, y) {
			switch (character_type) {
				case "princess":
					if (direction === "down") {
						self.animate_npc(80, 81, x, y);
					} else if (direction === "left") {
						self.animate_npc(82, 83, x, y);
					} else if (direction === "up") {
						self.animate_npc(84, 85, x, y);
					} else if (direction === "right") {
						self.animate_npc(86, 87, x, y);
					}
					break;
				case "soldier":
					if (direction === "down") {
						self.animate_npc(96, 97, x, y);
					} else if (direction === "left") {
						self.animate_npc(98, 99, x, y);
					} else if (direction === "up") {
						self.animate_npc(100, 101, x, y);
					} else if (direction === "right") {
						self.animate_npc(102, 103, x, y);
					}
					break;
				case "townsman":
					if (direction === "down") {
						self.animate_npc(8, 9, x, y);
					} else if (direction === "left") {
						self.animate_npc(10, 11, x, y);
					} else if (direction === "up") {
						self.animate_npc(12, 13, x, y);
					} else if (direction === "right") {
						self.animate_npc(14, 15, x, y);
					}
					break;
				case "townswoman":
					if (direction === "down") {
						self.animate_npc(24, 25, x, y);
					} else if (direction === "left") {
						self.animate_npc(26, 27, x, y);
					} else if (direction === "up") {
						self.animate_npc(28, 29, x, y);
					} else if (direction === "right") {
						self.animate_npc(30, 31, x, y);
					}
					break;
				case "old_man":
					if (direction === "down") {
						self.animate_npc(40, 41, x, y);
					} else if (direction === "left") {
						self.animate_npc(42, 43, x, y);
					} else if (direction === "up") {
						self.animate_npc(44, 45, x, y);
					} else if (direction === "right") {
						self.animate_npc(46, 47, x, y);
					}
					break;
				case "merchant":
					if (direction === "down") {
						self.animate_npc(56, 57, x, y);
					} else if (direction === "left") {
						self.animate_npc(58, 59, x, y);
					} else if (direction === "up") {
						self.animate_npc(60, 61, x, y);
					} else if (direction === "right") {
						self.animate_npc(62, 63, x, y);
					}
					break;
				case "solider_2":
					if (direction === "down") {
						self.animate_npc(72, 73, x, y);
					} else if (direction === "left") {
						self.animate_npc(74, 75, x, y);
					} else if (direction === "up") {
						self.animate_npc(76, 77, x, y);
					} else if (direction === "right") {
						self.animate_npc(78, 79, x, y);
					}
					break;
				case "dragonlord":
					if (direction === "down") {
						self.animate_npc(88, 89, x, y);
					} else if (direction === "left") {
						self.animate_npc(90, 91, x, y);
					} else if (direction === "up") {
						self.animate_npc(92, 93, x, y);
					} else if (direction === "right") {
						self.animate_npc(94, 95, x, y);
					}
					break;
				case "trumpeteer":
					if (direction === "left") {
						self.animate_npc(105, 105, x, y);
					} else if (direction === "right") {
						self.animate_npc(104, 104, x, y);
					}
					break;
				case "king":
					self.animate_npc(106, 107, x, y);
					break;
			}
		}

		if (typeof map.map_ptr.npcs !== 'undefined') {
			let number_of_npcs = map.map_ptr.npcs.length;

			//TODO: replace with a visible flag, which checks GameState.rescuedPrincess.
			if (map.current_map === "Tantegel2F" && !GameState.rescuedPrincess) {
				number_of_npcs--;
			}

			for (let i = 0; i < number_of_npcs; i++) {
				draw_npc(
					map.map_ptr.npcs[i].type,
					map.map_ptr.npcs[i].facing,
					map.map_ptr.npcs[i].x,
					map.map_ptr.npcs[i].y
				);
			}
		}
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
		var pos_x = (frame_number % 12) * config.tileWidth,
		    pos_y = Math.floor(frame_number / 12) * config.tileHeight;

		this.context.drawImage(this.img_tiles, pos_x, pos_y, config.tileWidth, config.tileHeight,
			x, y, config.tileWidth, config.tileHeight);
	}
};

export default Game;
