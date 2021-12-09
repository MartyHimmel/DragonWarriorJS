import Data from '../data.js';
import Game from '../game.js';
import State from '../State.js';
import config from '../config.js';

export default class Menu extends State {
    data = {};
    selectedOptionIndex = 0;

    constructor(data = {}) {
        super();
        this.data = data;
    }

    render() {
        this.drawBackground();
        this.drawTitle();
        this.drawText()
        this.drawArrow();
    }

    drawBackground() {
        const height = this.data.height ?? Math.floor(this.data.options[this.data.options.length - 1].y) + 1;
        let backgroundTiles = Array(this.data.width * height).fill(4);

        // Top border
        backgroundTiles[0] = 0;
        backgroundTiles.fill(1, 1, this.data.width - 1);
        backgroundTiles[this.data.width - 1] = 2;

        // Left and right borders
        for (let i = 1; i < height - 1; i++) {
            backgroundTiles[i * this.data.width] = 3;
            backgroundTiles[i * this.data.width + this.data.width - 1] = 5;
        }

        // Bottom border
        backgroundTiles[this.data.width * (height - 1)] = 6;
        backgroundTiles.fill(7, this.data.width * (height - 1) + 1, this.data.width * height - 1);
        backgroundTiles[this.data.width * height - 1] = 8;

        backgroundTiles.forEach((frame, index) => {
            const posX = (this.data.x + index % this.data.width) * config.tileWidth;
            const posY = Math.floor(this.data.y + index / this.data.width) * config.tileHeight;

            this.drawFrame(frame, posX, posY);
        });
    }

    drawFrame(frameNumber, posX, posY) {
        const imgX = (frameNumber % 3) * config.tileWidth;
        const imgY = Math.floor(frameNumber / 3) * config.tileHeight;

        Game.context.drawImage(Game.imgMenu, imgX, imgY, config.tileWidth, config.tileHeight,
            posX, posY, config.tileWidth, config.tileHeight);
    }

    drawTitle() {
        if (!this.data.title) {
            return;
        }

        const x = (this.data.x + this.data.title.x) * config.tileWidth;
        const y = (this.data.y + this.data.title.y) * config.tileHeight;
        this.displayText(this.data.title, x, y);
    }

    drawText() {
        if (this.data.options) {
            this.data.options.forEach(option => {
                const x = (this.data.x + option.x) * config.tileWidth;
                const y = (this.data.y + option.y) * config.tileHeight;
                this.displayText(option, x, y);
            });
        }
    }

    displayText(option, x, y) {
        let displayText = option.display().split('');

        if (option?.align === 'right') {
            displayText = displayText.reverse();
            x -= config.fontWidth;
        }

        displayText.forEach((character, index) => {
            let posX = x + (index * config.fontWidth);

            if (option?.align === 'right') {
                posX = x - (index * config.fontWidth);
            }

            this.drawTextCharacter(character, posX, y);
        });
    }

    drawTextCharacter(character, posX, posY) {
        if (!Data.menus.characters.includes(character)) {
            character = ' ';
        }

        const characterIndex = Data.menus.characters.indexOf(character);
        let imgX = (characterIndex % 13) * config.fontWidth;
        let imgY = Math.floor(characterIndex / 13) * config.fontHeight;
        Game.context.drawImage(Game.imgFont, imgX, imgY, config.fontWidth, config.fontHeight,
            posX, posY, config.fontWidth, config.fontHeight);
    }

    drawArrow() {
        if (!this.data.options?.[this.selectedOptionIndex].action || Game.frameInRange(0, 14) || Game.frameInRange(30, 44)) {
            return;
        }

        const imgX = Data.menus.arrow.x * config.fontWidth;
        const imgY = Data.menus.arrow.y * config.fontHeight;

        const posX = (this.data.x + this.data.options[this.selectedOptionIndex].x - 0.5) * config.tileWidth;
        const posY = (this.data.y + this.data.options[this.selectedOptionIndex].y) * config.tileHeight;

        Game.context.drawImage(Game.imgFont, imgX, imgY, config.fontWidth, config.fontHeight,
            posX, posY, config.fontWidth, config.fontHeight);
    }

    nextSelectionInRange(indexDelta) {
        const nextIndex = this.selectedOptionIndex + indexDelta;
        return nextIndex >= 0 && nextIndex < this.data.options.length;
    }
}
