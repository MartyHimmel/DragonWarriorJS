import config from './config.js';
import Data from './data.js';
import Game from './game.js';
import Player from './player.js';
import SaveState from './save-state.js';
import text from './text.js';

export default {
    charactersPerLine: (Data.menus.output.width - 2) * 2,
    outputText: [],
    selectedOptionIndex: 0,
    currentMenu: '',
    showText: false,
    actionTarget: null,

    handleState() {
        switch(this.currentMenu) {
            case 'exploration':
                this.drawQuickStatBox();
                this.drawExplorationMenu();
                this.drawArrow();
                break;
            case 'status':
                this.drawQuickStatBox();
                this.drawExplorationMenu();
                this.drawStatusMenu();
                break;
            case 'combat':
                this.drawQuickStatBox();
                this.drawCombatMenu();
                this.drawOutputWindow();
                this.drawArrow();
                break;
            case 'action':
                this.drawQuickStatBox();
                this.drawOutputWindow();
                break;
            case 'spells':
                this.drawQuickStatBox();
                this.drawExplorationMenu();
                this.drawSpellMenu('showInExploration');
                this.drawArrow();
                break;
            case 'output':
            default:
                this.drawOutputWindow();
                break;
        }

        const currentOptionIndexIsEven = (this.selectedOptionIndex % 2 == 0);

        if ('Escape' in Game.keysDown || ('Enter' in Game.keysDown && this.isLastWindow())) {
            this.close();
            this.closeOutputWindow();
            Game.changeState('exploration');
        }

        if (!this.isLastWindow()) {
            const halfOptionsCount = Math.floor(Data.menus[this.currentMenu].options.length / 2);

            if ('Enter' in Game.keysDown) {
                Data.menus[this.currentMenu].options[this.selectedOptionIndex].action(this.actionTarget);
            } else if ('ArrowUp' in Game.keysDown && this.nextSelectionInRange(-1)) {
                this.selectedOptionIndex -= 1;
            } else if ('ArrowDown' in Game.keysDown && this.nextSelectionInRange(1)) {
                this.selectedOptionIndex += 1;
            } else if ('ArrowLeft' in Game.keysDown && this.nextSelectionInRange(-halfOptionsCount)) {
                this.selectedOptionIndex -= halfOptionsCount;
            } else if ('ArrowRight' in Game.keysDown && this.nextSelectionInRange(halfOptionsCount)) {
                this.selectedOptionIndex += halfOptionsCount;
            }
        }

        Game.keysDown = {};

        if (this.showText && this.outputText.length) {
            this.drawOutputWindow();
        }
    },

    nextSelectionInRange(indexDelta) {
        const nextIndex = this.selectedOptionIndex + indexDelta;
        return nextIndex >= 0 && nextIndex < Data.menus[this.currentMenu].options.length;
    },

    drawQuickStatBox() {
        this.drawMenu(Data.menus.quickStat);
    },

    drawMenu(menu) {
        this.drawBackground(menu);
        if (menu.text) {
            this.drawMenuText(menu);
        } else {
            this.drawOutputText();
        }
    },

    drawBackground(menu) {
        const height = menu.height ?? Math.floor(menu.text[menu.text.length - 1].y) + 1;
        let backgroundTiles = Array(menu.width * height).fill(4);

        // Top border
        backgroundTiles[0] = 0;
        backgroundTiles.fill(1, 1, menu.width - 1);
        backgroundTiles[menu.width - 1] = 2;

        // Left and right borders
        for (let i = 1; i < height - 1; i++) {
            backgroundTiles[i * menu.width] = 3;
            backgroundTiles[i * menu.width + menu.width - 1] = 5;
        }

        // Bottom border
        backgroundTiles[menu.width * (height - 1)] = 6;
        backgroundTiles.fill(7, menu.width * (height - 1) + 1, menu.width * height - 1);
        backgroundTiles[menu.width * height - 1] = 8;

        backgroundTiles.forEach((frame, index) => {
            const posX = (menu.x + index % menu.width) * config.tileWidth;
            const posY = Math.floor(menu.y + index / menu.width) * config.tileHeight;

            this.drawFrame(frame, posX, posY);
        });
    },

    drawFrame(frameNumber, posX, posY) {
        const imgX = (frameNumber % 3) * config.tileWidth;
        const imgY = Math.floor(frameNumber / 3) * config.tileHeight;

        Game.context.drawImage(Game.imgMenu, imgX, imgY, config.tileWidth, config.tileHeight,
            posX, posY, config.tileWidth, config.tileHeight);
    },

    drawMenuText(menu) {
        menu.text.forEach(textData => {
            const x = (menu.x * config.tileWidth) + (textData.x * config.tileWidth);
            const y = (menu.y * config.tileHeight) + (textData.y * config.tileHeight);
            this.displayText(textData, x, y);
        });
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

            this.displayTextCharacter(character, posX, y);
        });
    },

    addText(text) {
        let words = text.split(' ');
        let line = '';
        words.forEach(word => {
            if (line.length + word.length + 1 > this.charactersPerLine) {
                this.outputText.push(line);
                line = '';
            }

            line += word + ' ';
        });
        this.outputText.push(line);
        this.outputText = this.outputText.slice(Math.max(this.outputText.length - 8, 0));
    },

    drawOutputText() {
        this.outputText.forEach((line, lineIndex) => {
            for (let i = 0; i < line.length; i++) {
                const baseX = (Data.menus.output.x + (i / 2) + 0.5) % this.charactersPerLine;
                const baseY = Data.menus.output.y + 0.5 + (lineIndex / 2);

                this.displayTextCharacter(line[i], baseX * config.tileWidth, baseY * config.tileHeight);
            }
        });
    },

    displayTextCharacter(character, posX, posY) {
        if (!Data.menus.characters.includes(character)) {
            character = ' ';
        }

        const characterIndex = Data.menus.characters.indexOf(character);
        let imgX = (characterIndex % 13) * config.fontWidth;
        let imgY = Math.floor(characterIndex / 13) * config.fontHeight;
        Game.context.drawImage(Game.imgFont, imgX, imgY, config.fontWidth, config.fontHeight,
            posX, posY, config.fontWidth, config.fontHeight);
    },

    drawExplorationMenu() {
        this.drawMenu(Data.menus.exploration);
    },

    isLastWindow() {
        const menus = ['', 'status'];
        return menus.includes(this.currentMenu);
    },

    drawArrow() {
        if (this.isLastWindow() || Game.frameInRange(0, 14) || Game.frameInRange(30, 44)) {
            return;
        }

        const imgX = Data.menus.arrow.x * config.fontWidth;
        const imgY = Data.menus.arrow.y * config.fontHeight;

        const currentMenu = Data.menus[this.currentMenu];
        const posX = (currentMenu.x + currentMenu.options[this.selectedOptionIndex].arrowX) * config.tileWidth;
        const posY = (currentMenu.y + currentMenu.options[this.selectedOptionIndex].arrowY) * config.tileHeight;

        Game.context.drawImage(Game.imgFont, imgX, imgY, config.fontWidth, config.fontHeight,
            posX, posY, config.fontWidth, config.fontHeight);
    },

    clearOutputText() {
        this.outputText = [];
    },

    drawOutputWindow() {
        this.drawMenu(Data.menus.output);
    },

    openOutputWindow() {
        this.showText = true;
        this.drawOutputWindow();
    },

    closeOutputWindow() {
        this.showText = false;
        this.clearOutputText();
    },

    drawStatusMenu() {
        this.drawMenu(Data.menus.status);
    },

    drawCombatMenu() {
        this.drawMenu(Data.menus.combat);
    },

    open(type = 'output', target = null) {
        this.currentMenu = type;
        this.actionTarget = target;
        this.selectedOptionIndex = 0;
        Game.keysDown = {};
    },

    change(type) {
        this.currentMenu = type;
        Game.keysDown = {};
    },

    close() {
        this.currentMenu = '';
        this.actionTarget = null;
        this.selectedOptionIndex = 0;
        Game.keysDown = {};
    },

    drawSpellMenu(condition) {
        let spellsLearned = Data.levels
            .slice(0, SaveState.player.level)
            .filter(level => level.spells_learned) // Get spells up to player level
            .map(level => level.spells_learned[0]) // Get spell references as string
            .filter(spellName => Data.spells[spellName][condition]); // Limit menu to matching combat/exploration condition

        Data.menus.spells.options = spellsLearned.map((spell, index) => {
            return { arrowX: 0.5, arrowY: index + 1, name: spell, action(player) { player.castSpell(spell); } };
        });

        Data.menus.spells.text = [Data.menus.spells.text[0]];
        Data.menus.spells.options.forEach((option, index) => {
            Data.menus.spells.text.push({ x: 1, y: index + 1, align: 'left', display() { return option.name.toUpperCase(); } });
        });

        if (!Data.menus.spells.options.length) {
            Game.display_text(text.menu.spell.none_learned, {player_name: SaveState.player.name});
            this.change('');
            return;
        }

        this.drawMenu(Data.menus.spells);
    },
};
