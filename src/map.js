import Data from './data.js';
import Game from './game.js';
import GameState from './state.js';
import audio from './audio.js';
import config from './config.js';
import player from './player.js';

/*
References
##########
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
*/
export default {
	x: 0,
	y: 0,
	current_map: '',
	map_ptr: null,
	current_zone: 0,
	background_music: '',

	loadMap(map_name) {
		if (map_name === 'World') {
			//reset door flags when leaving towns.
			//TODO: don't reset all flags; some stay unlocked (e.g. throne room).
			GameState.doorsOpened = [];
		}

		player.steps = 0;
		player.setPosition(map_name);

		this.current_map = map_name;
		this.map_ptr = Data.maps[this.current_map];
		this.background_music = this.map_ptr.music;

		// audio.stop_music();
		// audio.play_map_music();
		this.refreshMap();
	},

	// refresh status of doors/treasure chests
	refreshMap() {
		if (typeof this.map_ptr.doors !== 'undefined') {
			this.map_ptr.doors.forEach((element, index, array) => {
				if (GameState.doorsOpened.indexOf(element.id) > -1) {
					this.map_ptr.layout[element.x + (element.y * this.map_ptr.width)] = Data.mapTiles.BRICK;
				} else {
					this.map_ptr.layout[element.x + (element.y * this.map_ptr.width)] = Data.mapTiles.DOOR;
				}
			});
		}

		if (typeof this.map_ptr.chests !== 'undefined') {
			this.map_ptr.chests.forEach((element, index, array) => {
				if (GameState.chestsOpened.indexOf(element.id) > -1) {
					this.map_ptr.layout[element.x + (element.y * this.map_ptr.width)] = Data.mapTiles.BRICK;
				} else {
					this.map_ptr.layout[element.x + (element.y * this.map_ptr.width)] = Data.mapTiles.CHEST;
				}
			});
		}
	},

	get_npc: function (x, y) {
		if (typeof this.map_ptr.npcs !== 'undefined') {
			let number_of_npcs = this.map_ptr.npcs.length;
			for (let i = 0; i < number_of_npcs; i++) {
				//TODO: consider visibility.
				if (this.map_ptr.npcs[i].x === x && this.map_ptr.npcs[i].y === y) {
					return this.map_ptr.npcs[i];
				}
			}
		}

		return null;
	},

	get_door(x, y) {
		if (typeof this.map_ptr.doors !== 'undefined') {
			let numberOfDoors = this.map_ptr.doors.length;

			for (let i = 0; i < numberOfDoors; i++) {
				//TODO: only consider if not already opened.
				if (this.map_ptr.doors[i].x === x && this.map_ptr.doors[i].y === y) {
					return this.map_ptr.doors[i];
				}
			}
		}

		return null;
	},

	drawViewport(map_name, posX, posY) {
		// Center on screen
		posX = posX - config.offsetX;
		posY = posY - config.offsetY;

		const screenTileCount = config.screenTilesWide * config.screenTileHigh;

		for (let i = 0; i < screenTileCount; i++) {
			Game.draw_tile(this.x, this.y, this.map_ptr.layout[posX + (posY * this.map_ptr.width)] - 1);
			this.x += config.tileWidth;
			posX++;
			if (this.x === config.screenTilesWide * config.tileWidth) {
				this.x = 0;
				this.y += config.tileHeight;
				posY++;
				posX -= config.screenTilesWide;
			}
		}

		this.y = 0;
	},

	setZone: function () {
		if (this.current_map === 'World') {
			// 16 tile square, break world into 8 x 8 grid
			const x_coord = Math.floor(player.x / 16);
			const y_coord = Math.floor(player.y / 16);
			const zone_map = [
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

	checkLocation() {
		let map = Data.maps[this.current_map];

		if (typeof map.map_links !== 'undefined' && map.map_links instanceof Array) {
			for (let i = 0; i < map.map_links.length; i++) {
				let link = map.map_links[i];

				if (player.steps === 0 ||
					(typeof link.x !== 'undefined' && player.x !== link.x) ||
					(typeof link.y !== 'undefined' && player.y !== link.y))
				{
					continue;
				}

				this.loadMap(link.map);

				if (typeof link.moveTo !== 'undefined' && link.moveTo instanceof Array && link.moveTo.length === 2) {
					player.setXY(link.moveTo[0], link.moveTo[1]);
				}
			}
		}
	}
};
