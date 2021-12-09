import Data from '../data.js';
import Game from '../game.js';
import Menu from './Menu.js';

export default class Status extends Menu {
    constructor() {
        super(Data.menus.status);
    }

    update() {
        if ('Escape' in Game.keysDown || 'Enter' in Game.keysDown) {
            Game.states.pop(2);
            Game.resetKeys();
        }
    }
}
