import Game from './game.js';
import map from './map.js';
import menu from './menu.js';
import player from './player.js';

export default {
    handleState() {
        this.drawMap();

        if ('ArrowUp' in Game.keysDown) {
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
            menu.drawQuickStatBox();
        }
    },

    drawMap() {
        Game.clear();
        map.drawViewport(map.current_map, player.offset_x, player.offset_y);
        Game.drawNPCs();
    },
};
