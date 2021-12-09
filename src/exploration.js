import Game from './game.js';
import Menu from './menu.js';
import player from './player.js';
import State from './State.js';
import map from './map.js';
import config from './config.js';
import ExplorationMenu from './menus/Exploration.js';
import QuickStatMenu from './menus/QuickStat.js';

export default class Exploration extends State {
    #idleFrames = 0;

    constructor() {
        super();
    }

    update() {
        if ('Enter' in Game.keysDown) {
            this.#idleFrames = 0;
            Game.states.push(new ExplorationMenu());
            Game.resetKeys();
        } else if ('ArrowUp' in Game.keysDown) {
            this.#idleFrames = 0;
            player.move('up');
        } else if ('ArrowDown' in Game.keysDown) {
            this.#idleFrames = 0;
            player.move('down');
        } else if ('ArrowLeft' in Game.keysDown) {
            this.#idleFrames = 0;
            player.move('left');
        } else if ('ArrowRight' in Game.keysDown) {
            this.#idleFrames = 0;
            player.move('right');
        } else {
            this.#idleFrames++;
        }

        map.checkLocation();
        player.load_player();
    }

    render() {
        Game.clear();
        map.render();
        this.drawNPCs();
        player.render();

        if (this.#idleFrames > 180) {
            (new QuickStatMenu()).render();
        }
    }

    drawNPCs() {
        if (typeof map.map_ptr.npcs !== 'undefined') {
            let number_of_npcs = map.map_ptr.npcs.length;

            //TODO: replace with a visible flag, which checks SaveState.rescuedPrincess.
            if (map.current_map === "Tantegel2F" && !SaveState.rescuedPrincess) {
                number_of_npcs--;
            }

            for (let i = 0; i < number_of_npcs; i++) {
                this.drawNPC(
                    map.map_ptr.npcs[i].type,
                    map.map_ptr.npcs[i].facing,
                    map.map_ptr.npcs[i].x,
                    map.map_ptr.npcs[i].y
                );
            }
        }
    }

    drawNPC(characterType, direction, x, y) {
        switch (characterType) {
            case "princess":
                if (direction === "down") {
                    this.animateNPC(80, 81, x, y);
                } else if (direction === "left") {
                    this.animateNPC(82, 83, x, y);
                } else if (direction === "up") {
                    this.animateNPC(84, 85, x, y);
                } else if (direction === "right") {
                    this.animateNPC(86, 87, x, y);
                }
                break;
            case "soldier":
                if (direction === "down") {
                    this.animateNPC(96, 97, x, y);
                } else if (direction === "left") {
                    this.animateNPC(98, 99, x, y);
                } else if (direction === "up") {
                    this.animateNPC(100, 101, x, y);
                } else if (direction === "right") {
                    this.animateNPC(102, 103, x, y);
                }
                break;
            case "townsman":
                if (direction === "down") {
                    this.animateNPC(8, 9, x, y);
                } else if (direction === "left") {
                    this.animateNPC(10, 11, x, y);
                } else if (direction === "up") {
                    this.animateNPC(12, 13, x, y);
                } else if (direction === "right") {
                    this.animateNPC(14, 15, x, y);
                }
                break;
            case "townswoman":
                if (direction === "down") {
                    this.animateNPC(24, 25, x, y);
                } else if (direction === "left") {
                    this.animateNPC(26, 27, x, y);
                } else if (direction === "up") {
                    this.animateNPC(28, 29, x, y);
                } else if (direction === "right") {
                    this.animateNPC(30, 31, x, y);
                }
                break;
            case "old_man":
                if (direction === "down") {
                    this.animateNPC(40, 41, x, y);
                } else if (direction === "left") {
                    this.animateNPC(42, 43, x, y);
                } else if (direction === "up") {
                    this.animateNPC(44, 45, x, y);
                } else if (direction === "right") {
                    this.animateNPC(46, 47, x, y);
                }
                break;
            case "merchant":
                if (direction === "down") {
                    this.animateNPC(56, 57, x, y);
                } else if (direction === "left") {
                    this.animateNPC(58, 59, x, y);
                } else if (direction === "up") {
                    this.animateNPC(60, 61, x, y);
                } else if (direction === "right") {
                    this.animateNPC(62, 63, x, y);
                }
                break;
            case "solider_2":
                if (direction === "down") {
                    this.animateNPC(72, 73, x, y);
                } else if (direction === "left") {
                    this.animateNPC(74, 75, x, y);
                } else if (direction === "up") {
                    this.animateNPC(76, 77, x, y);
                } else if (direction === "right") {
                    this.animateNPC(78, 79, x, y);
                }
                break;
            case "dragonlord":
                if (direction === "down") {
                    this.animateNPC(88, 89, x, y);
                } else if (direction === "left") {
                    this.animateNPC(90, 91, x, y);
                } else if (direction === "up") {
                    this.animateNPC(92, 93, x, y);
                } else if (direction === "right") {
                    this.animateNPC(94, 95, x, y);
                }
                break;
            case "trumpeteer":
                if (direction === "left") {
                    this.animateNPC(105, 105, x, y);
                } else if (direction === "right") {
                    this.animateNPC(104, 104, x, y);
                }
                break;
            case "king":
                this.animateNPC(106, 107, x, y);
                break;
        }
    }

    animateNPC(frame1, frame2, x, y) {
        x = (x - player.x + config.offsetX) * config.tileWidth;
        y = (y - player.y + config.offsetY) * config.tileHeight;

        const drawFrame = (Game.frameInRange(0, 14) || Game.frameInRange(30, 44)) ? frame1 : frame2;
        Game.drawCharacter(drawFrame, x, y);
    }
};
