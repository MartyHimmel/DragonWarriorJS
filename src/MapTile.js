import config from './config.js';
import Game from './game.js';

export default class MapTile {
    constructor(x, y, frame) {
        this.x = x;
        this.y = y;
        this.frame = frame;
    }

    render() {
        const posX = (this.frame % 12) * config.tileWidth;
        const posY = Math.floor(this.frame / 12) * config.tileHeight;

        Game.context.drawImage(Game.imgTiles,
            posX, posY, config.tileWidth, config.tileHeight,
            this.x, this.y, config.tileWidth, config.tileHeight);
    }
}
