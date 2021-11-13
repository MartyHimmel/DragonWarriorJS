import Data from './data.js';
import Game from './game.js';
import config from './config.js';

export default {
    handleState() {

    },

    drawQuickStatBox() {
        const menu = Data.menus.quickStat;
        const leftEdge = 3 * config.tileWidth;
        const topEdge = 2 * config.tileHeight;

        this.drawBorder(menu, leftEdge, topEdge);
        menu.text.forEach(textData => {
            const x = leftEdge + (textData.x * config.tileWidth);
            const y = topEdge + (textData.y * config.tileHeight);
            this.displayText(textData, x, y);
        });
    },

    drawBorder(menu, x, y) {
        menu.layout.forEach((frame, index) => {
            const posX = (index % menu.width) * config.tileWidth + x;
            const posY = Math.floor(index / menu.width) * config.tileHeight + y;

            this.drawFrame(frame, posX, posY);
        });
    },

    drawFrame(frameNumber, posX, posY) {
        const imgX = (frameNumber % 3) * config.tileWidth;
        const imgY = Math.floor(frameNumber / 3) * config.tileHeight;

        Game.context.drawImage(Game.imgMenu, imgX, imgY, config.tileWidth, config.tileHeight,
            posX, posY, config.tileWidth, config.tileHeight);
    },

    displayText(textData, x, y) {
        let displayText = textData.display().split('');

        if (textData?.align === 'right') {
            displayText = displayText.reverse();
            x -= config.fontWidth;
        }

        displayText.forEach((character, index) => {
            let posX = x + (index * config.fontWidth);

            if (textData?.align === 'right') {
                posX = x - (index * config.fontWidth);
            }

            this.displayCharacter(character, posX, y);
        });
    },

    displayCharacter(character, posX, posY) {
        if (!Data.menus.characters.includes(character)) {
            character = ' ';
        }

        const characterIndex = Data.menus.characters.indexOf(character);
        let imgX = (characterIndex % 13) * config.fontWidth;
        let imgY = Math.floor(characterIndex / 13) * config.fontHeight;
        Game.context.drawImage(Game.imgFont, imgX, imgY, config.fontWidth, config.fontHeight,
            posX, posY, config.fontWidth, config.fontHeight);
    }
};
