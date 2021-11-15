import Data from './data.js';
import Game from './game.js';
import Menu from './menu.js';
import map from './map.js';
import player from './player.js';

export default {
    handleState() {
        if ('Enter' in Game.keysDown) {
            Game.idleFrames = 0;
            Game.openMenu('exploration');
        } else if ('ArrowUp' in Game.keysDown) {
            Game.idleFrames = 0;
            player.move('up');
        } else if ('ArrowDown' in Game.keysDown) {
            Game.idleFrames = 0;
            player.move('down');
        } else if ('ArrowLeft' in Game.keysDown) {
            Game.idleFrames = 0;
            player.move('left');
        } else if ('ArrowRight' in Game.keysDown) {
            Game.idleFrames = 0;
            player.move('right');
        } else {
            Game.idleFrames++;
            player.draw_player();
        }

        if (Game.idleFrames > 180) {
            Menu.drawQuickStatBox();
        }
    },
};
