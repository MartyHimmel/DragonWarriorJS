import Data from '../data.js';
import Game from '../game.js';
import Menu from './Menu.js';
import config from '../config.js';

export default class TextDisplay extends Menu {
    #charactersPerLine = (Data.menus.output.width - 2) * 2;
    #outputText = [];

    constructor() {
        super(Data.menus.output);
    }

    update() {
        if ('Enter' in Game.keysDown || 'Escape' in Game.keysDown) {
            Game.states.pop();
            Game.resetKeys();
        }
    }

    render() {
        super.render();
        this.#outputText.forEach((line, lineIndex) => {
            for (let i = 0; i < line.length; i++) {
                const baseX = (this.data.x + (i / 2) + 0.5) % this.#charactersPerLine;
                const baseY = this.data.y + 0.5 + (lineIndex / 2);

                this.drawTextCharacter(line[i], baseX * config.tileWidth, baseY * config.tileHeight);
            }
        });
    }

    addText(text) {
        let words = text.split(' ');
        let line = '';
        words.forEach(word => {
            if (line.length + word.length + 1 > this.#charactersPerLine) {
                this.#outputText.push(line);
                line = '';
            }

            line += word + ' ';
        });
        this.#outputText.push(line);
        this.#outputText = this.#outputText.slice(Math.max(this.#outputText.length - 8, 0));
    }
}
