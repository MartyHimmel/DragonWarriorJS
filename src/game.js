import Data from './data.js';
import Exploration from './Exploration.js';
import SaveState from './save-state.js';
import TitleScreen from './TitleScreen.js';
import config from './config.js';
import combat from './combat.js';
import map from './map.js';
import player from './player.js';
import StateStack from './StateStack.js';
import TextDisplayMenu from './menus/TextDisplay.js';

/*
References
##########
https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame?redirectlocale=en-US&redirectslug=DOM%2Fwindow.requestAnimationFrame
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage
*/

const Game = {
	states: new StateStack(),
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

	begin() {
		// Setup
		document.title = Data.text.game_title;
		this.canvas = document.getElementById('game');
		this.canvas.width = config.canvasWidth;
		this.canvas.height = config.canvasHeight;
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
		this.states.push(new TitleScreen());
		this.main();
	},

	loadImages() {
		const images = {
			Characters: 'characters',
			Enemies: 'enemies',
			Tiles: 'tiles',
			Battle: 'battle',
			Title: 'title',
			Menu: 'menu',
			Font: 'font',
		};

		for (let name in images) {
			this['img' + name] = new Image();
			this['img' + name].src = config.sprites[images[name]];
		}
	},

	changeState(newState, delay = 0) {
		if (!this.possibleStates.includes(newState)) {
			return;
		}

		if (delay > 0) {
			setTimeout(() => this.state = newState, delay);
		} else {
			this.state = newState;
		}
	},

	main() {
		requestAnimationFrame(this.main.bind(this));
		this.tick();
		this.states.update();
		this.states.render();
		return;

		// if (this.state === 'combat') {
		// 	combat.handleState();
		// 	Menu.render();
		// }
	},

	tick() {
		this.frameNumber++;
		if (this.frameNumber >= 60) {
			this.frameNumber = 0;
		}
	},

	startGame() {
		SaveState.player.name = prompt(Data.text.name_prompt);
		if (SaveState.player.name === '') { SaveState.player.name = Data.text.default_player_name; }
		map.loadMap('World');
		player.load_player();
		player.setCurrentTile();
	},

	clear() {
		return this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},

	displayText(format_string, params) {
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

	    let menu = this.states.top();

	    if (menu.constructor.name !== 'TextDisplay') {
			menu = new TextDisplayMenu();
			this.states.push(menu);
		}

		menu.addText(format(format_string, params));
	},

	// call frame from characters.png - starts with frame 0
	drawCharacter(frame_number, posX, posY) {
		const imageX = (frame_number % 16) * config.tileWidth;
		const imageY = Math.floor(frame_number / 16) * config.tileHeight;

		this.context.drawImage(this.imgCharacters,
			imageX, imageY, config.tileWidth, config.tileHeight,
			posX, posY, config.tileWidth, config.tileHeight);
	},

	drawEnemy(enemy) {
		var tile_x = enemy.x,
		    tile_y = enemy.y,
		    tile_width = enemy.width,
		    tile_height = enemy.height,
		    pos_x = (this.canvas.width / 2) - tile_width,
		    pos_y = (this.canvas.height / 2) - tile_height;

		this.context.drawImage(this.imgEnemies, tile_x, tile_y, tile_width, tile_height,
			pos_x, pos_y, tile_width * 2, tile_height *2);
	},

	frameInRange(min, max) {
		return this.frameNumber >= min && this.frameNumber <= max;
	},

	resetKeys() {
		this.keysDown = {};
	},
};

export default Game;
