import Data from '../data.js';
import Game from '../game.js';
import Menu from './Menu.js';
import QuickStatMenu from './QuickStat.js';
import player from '../player.js';

export default class Exploration extends Menu {
    constructor() {
        super(Data.menus.exploration);
    }

    update() {
        if ('Escape' in Game.keysDown) {
            Game.states.pop();
            return;
        }

        const halfOptionsCount = Math.floor(this.data.options.length / 2);

        if ('Enter' in Game.keysDown) {
            this.data.options[this.selectedOptionIndex].action(player);
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
        (new QuickStatMenu()).render();
        super.render();
    }
}
