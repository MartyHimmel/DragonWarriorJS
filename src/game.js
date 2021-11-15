import Data from './data.js';
import Exploration from './exploration.js';
import GameState from './state.js';
import Menu from './menu.js';
import TitleScreen from './title-screen.js';
import config from './config.js';
import combat from './combat.js';
import map from './map.js';
import player from './player.js';
import text from './text.js';
import { displayOutput } from './utils.js';

/*
References
##########
https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame?redirectlocale=en-US&redirectslug=DOM%2Fwindow.requestAnimationFrame
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage
*/

const Game = {
	state: '',
	possibleStates: ['title', 'menu', 'exploration', 'combat'],
	canvas: null,
	context: null,
	imgCharacters: null,
	imgEnemies: null,
	imgTiles: null,
	imgBattle: null,
	imgMenu: null,
	imgFont: null,
	keysDown: {},
	frameNumber: 0,
	idleFrames: 0,

	begin: function () {
		var self = this;

		// Main game window
		document.title = text.game_title;
		this.canvas = document.getElementById('game');
		this.context = this.canvas.getContext('2d');
		this.loadImages();

		// Keyboard inputs
		window.addEventListener('keydown', e => {
			this.keysDown[e.code] = true;
		});
		window.addEventListener('keyup', e => {
			delete this.keysDown[e.code];
		});

		// Start the game!
		this.changeState('title');
		this.main();
	},

	main() {
		requestAnimationFrame(this.main.bind(this));

		this.frameNumber++;
		if (this.frameNumber >= 60) {
			this.frameNumber = 0;
		}

		if (this.state === 'title') {
			TitleScreen.handleState();
			return;
		}

		map.check_location();
		player.load_player();
		this.drawMap();

		if (this.state === 'exploration') {
			Exploration.handleState();
		} else if (this.state === 'menu') {
			player.draw_player();
			Menu.handleState();
		} else if (this.state === 'combat') {
			combat.handleState();
		}

		displayOutput();
	},

	drawMap() {
        Game.clear();
        map.drawViewport(map.current_map, player.offset_x, player.offset_y);
        Game.drawNPCs();
    },

	startGame() {
		GameState.player.name = prompt(text.name_prompt);
		if (GameState.player.name === '') { GameState.player.name = text.default_player_name; }
		map.load_map('World');
		player.load_player();
		player.set_current_tile();
	},

	loadImages() {
		this.imgCharacters = new Image();
		this.imgCharacters.src = config.sprites.characters;
		this.imgEnemies = new Image();
		this.imgEnemies.src = config.sprites.enemies;
		this.imgTiles = new Image();
		this.imgTiles.src = config.sprites.tiles;
		this.imgBattle = new Image();
		this.imgBattle.src = config.sprites.battle;
		this.imgTitle = new Image();
		this.imgTitle.src = config.sprites.title;
		this.imgMenu = new Image();
		this.imgMenu.src = config.sprites.menu;
		this.imgFont = new Image();
		this.imgFont.src = config.sprites.font;
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

	changeState(newState, delay = 0) {
		if (!this.possibleStates.includes(newState)) {
			return;
		}

		if (delay > 0) {
			setTimeout(() => this.setState(newState), delay);
		} else {
			this.setState(newState);
		}
	},

	setState(newState) {
		this.state = newState;
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

		Menu.addText(format(format_string, params));
	},

	// Animation and rendering
	// -------------------------------------------------------------------

	animateNPC: function(frame1, frame2, x, y) {
		x = (x - player.offset_x) * config.tileWidth;
		y = (y - player.offset_y) * config.tileHeight;

		const drawFrame = ((this.frameNumber % 60) < 30) ? frame1 : frame2;
		this.drawCharacter(drawFrame, x, y);
	},

	// call frame from characters.png - starts with frame 0
	drawCharacter: function (frame_number, pos_x, pos_y) {
		var image_x = (frame_number % 16) * config.tileWidth,
		    image_y = Math.floor(frame_number / 16) * config.tileHeight;

		this.context.drawImage(this.imgCharacters, image_x, image_y, config.tileWidth, config.tileHeight,
			pos_x, pos_y, config.tileWidth, config.tileHeight);
	},

	drawNPCs: function() {
		let self = this;

		//TODO: refactor this
		function drawNPC(characterType, direction, x, y) {
			switch (characterType) {
				case "princess":
					if (direction === "down") {
						self.animateNPC(80, 81, x, y);
					} else if (direction === "left") {
						self.animateNPC(82, 83, x, y);
					} else if (direction === "up") {
						self.animateNPC(84, 85, x, y);
					} else if (direction === "right") {
						self.animateNPC(86, 87, x, y);
					}
					break;
				case "soldier":
					if (direction === "down") {
						self.animateNPC(96, 97, x, y);
					} else if (direction === "left") {
						self.animateNPC(98, 99, x, y);
					} else if (direction === "up") {
						self.animateNPC(100, 101, x, y);
					} else if (direction === "right") {
						self.animateNPC(102, 103, x, y);
					}
					break;
				case "townsman":
					if (direction === "down") {
						self.animateNPC(8, 9, x, y);
					} else if (direction === "left") {
						self.animateNPC(10, 11, x, y);
					} else if (direction === "up") {
						self.animateNPC(12, 13, x, y);
					} else if (direction === "right") {
						self.animateNPC(14, 15, x, y);
					}
					break;
				case "townswoman":
					if (direction === "down") {
						self.animateNPC(24, 25, x, y);
					} else if (direction === "left") {
						self.animateNPC(26, 27, x, y);
					} else if (direction === "up") {
						self.animateNPC(28, 29, x, y);
					} else if (direction === "right") {
						self.animateNPC(30, 31, x, y);
					}
					break;
				case "old_man":
					if (direction === "down") {
						self.animateNPC(40, 41, x, y);
					} else if (direction === "left") {
						self.animateNPC(42, 43, x, y);
					} else if (direction === "up") {
						self.animateNPC(44, 45, x, y);
					} else if (direction === "right") {
						self.animateNPC(46, 47, x, y);
					}
					break;
				case "merchant":
					if (direction === "down") {
						self.animateNPC(56, 57, x, y);
					} else if (direction === "left") {
						self.animateNPC(58, 59, x, y);
					} else if (direction === "up") {
						self.animateNPC(60, 61, x, y);
					} else if (direction === "right") {
						self.animateNPC(62, 63, x, y);
					}
					break;
				case "solider_2":
					if (direction === "down") {
						self.animateNPC(72, 73, x, y);
					} else if (direction === "left") {
						self.animateNPC(74, 75, x, y);
					} else if (direction === "up") {
						self.animateNPC(76, 77, x, y);
					} else if (direction === "right") {
						self.animateNPC(78, 79, x, y);
					}
					break;
				case "dragonlord":
					if (direction === "down") {
						self.animateNPC(88, 89, x, y);
					} else if (direction === "left") {
						self.animateNPC(90, 91, x, y);
					} else if (direction === "up") {
						self.animateNPC(92, 93, x, y);
					} else if (direction === "right") {
						self.animateNPC(94, 95, x, y);
					}
					break;
				case "trumpeteer":
					if (direction === "left") {
						self.animateNPC(105, 105, x, y);
					} else if (direction === "right") {
						self.animateNPC(104, 104, x, y);
					}
					break;
				case "king":
					self.animateNPC(106, 107, x, y);
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
				drawNPC(
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

		this.context.drawImage(this.imgEnemies, tile_x, tile_y, tile_width, tile_height,
			pos_x, pos_y, tile_width * 2, tile_height *2);
	},

	// draw single tile frame from sprite sheet
	draw_tile: function (x, y, frame_number) {
		// find horizontal and vertical position of tile to be drawn
		var pos_x = (frame_number % 12) * config.tileWidth,
		    pos_y = Math.floor(frame_number / 12) * config.tileHeight;

		this.context.drawImage(this.imgTiles, pos_x, pos_y, config.tileWidth, config.tileHeight,
			x, y, config.tileWidth, config.tileHeight);
	},

	openMenu(type) {
		Menu.currentMenu = type;
		this.changeState('menu');
		this.keysDown = {};
	},
};

export default Game;
