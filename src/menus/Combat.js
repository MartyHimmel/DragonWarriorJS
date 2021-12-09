import Data from '../data.js';
import Game from '../game.js';
import Menu from './Menu.js';
import QuickStatMenu from './QuickStat.js';
import TextDisplayMenu from './TextDisplay.js';
import map from '../map.js';
import combat from '../combat.js';
import player from '../player.js';

export default class Combat extends Menu {
    #textDisplayMenu = null;
    #textMode = false;

    constructor() {
        super(Data.menus.combat);
        this.#textDisplayMenu = new TextDisplayMenu();
    }

    update() {
        if ('Escape' in Game.keysDown) {
            Game.states.pop();
            return;
        }

        const halfOptionsCount = Math.floor(this.data.options.length / 2);

        if ('Enter' in Game.keysDown) {
            this.data.options[this.selectedOptionIndex].action(combat);
        } else if ('ArrowUp' in Game.keysDown && this.nextSelectionInRange(-1) && this.selectedOptionIndex != halfOptionsCount) {
            this.selectedOptionIndex -= 1;
        } else if ('ArrowDown' in Game.keysDown && this.nextSelectionInRange(1) && this.selectedOptionIndex != (halfOptionsCount - 1)) {
            this.selectedOptionIndex += 1;
        } else if ('ArrowLeft' in Game.keysDown && this.nextSelectionInRange(-halfOptionsCount)) {
            this.selectedOptionIndex -= halfOptionsCount;
        } else if ('ArrowRight' in Game.keysDown && this.nextSelectionInRange(halfOptionsCount)) {
            this.selectedOptionIndex += halfOptionsCount;
        }

        Game.resetKeys();
    }

    render() {
        this.drawCombatWindow();
        this.drawEnemy();
        this.#textDisplayMenu.render();
        (new QuickStatMenu()).render();
        if (!this.#textMode) {
            super.render();
        }
    }

    drawCombatWindow() {
        if (Data.maps[map.current_map].type === 'dungeon') {
            this.drawDungeonScene()
            return;
        }

        this.drawWorldScene();
    }

    drawDungeonScene() {
        Game.clear();
        Game.context.fillStyle = "#000000";
        Game.context.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
    }

    drawWorldScene() {
        let screenX = (Game.canvas.width / 2) - (Game.imgBattle.width / 2);
        let screenY = (Game.canvas.height / 2) - (Game.imgBattle.height / 2);

        Game.context.drawImage(Game.imgBattle,
            0, 0, Game.imgBattle.width, Game.imgBattle.width,
            screenX, screenY, Game.imgBattle.width, Game.imgBattle.width);
    }

    drawEnemy() {
        Game.drawEnemy(combat.enemy_ptr);
    }
}
