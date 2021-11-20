import GameState from '../state.js';
import text from '../text.js';

export default {
    characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,\u201C\u201D\u2018\u2019?!*&()-:; ',
    arrow: { x: 0, y: 6 },
    quickStat: {
        width: 4,
        height: 6,
        x: 3,
        y: 2,
        layout: [
            0, 1, 1, 2,
            3, 4, 4, 5,
            3, 4, 4, 5,
            3, 4, 4, 5,
            3, 4, 4, 5,
            6, 7, 7, 8,
        ],
        text: [
            { x: 1,    y: 0, align: 'left',  display() { return GameState.player.name.substr(0, 4); } },
            { x: 0.5,  y: 1, align: 'left',  display() { return 'LV'; } },
            { x: 3.5,  y: 1, align: 'right', display() { return GameState.player.level.toString(); } },
            { x: 0.5,  y: 2, align: 'left',  display() { return 'HP'; } },
            { x: 3.5,  y: 2, align: 'right', display() { return GameState.player.currentHp.toString(); } },
            { x: 0.5,  y: 3, align: 'left',  display() { return 'MP'; } },
            { x: 3.5,  y: 3, align: 'right', display() { return GameState.player.currentMp.toString(); } },
            { x: 0.5,  y: 4, align: 'left',  display() { return 'G'; } },
            { x: 3.5,  y: 4, align: 'right', display() { return GameState.player.gold.toString(); } },
            { x: 0.5,  y: 5, align: 'left',  display() { return 'E'; } },
            { x: 3.5,  y: 5, align: 'right', display() { return GameState.player.experience.toString(); } },
        ],
    },
    exploration: {
        width: 8,
        height: 5,
        x: 8,
        y: 1,
        layout: [
            0, 1, 1, 1, 1, 1, 1, 2,
            3, 4, 4, 4, 4, 4, 4, 5,
            3, 4, 4, 4, 4, 4, 4, 5,
            3, 4, 4, 4, 4, 4, 4, 5,
            6, 7, 7, 7, 7, 7, 7, 8,
        ],
        text: [
            { x: 2,  y: 0, align: 'left',  display() { return 'COMMAND'; } },
            { x: 1,  y: 1, align: 'left',  display() { return 'TALK'; } },
            { x: 5,  y: 1, align: 'left',  display() { return 'SPELL'; } },
            { x: 1,  y: 2, align: 'left',  display() { return 'STATUS'; } },
            { x: 5,  y: 2, align: 'left',  display() { return 'ITEM'; } },
            { x: 1,  y: 3, align: 'left',  display() { return 'STAIRS'; } },
            { x: 5,  y: 3, align: 'left',  display() { return 'DOOR'; } },
            { x: 1,  y: 4, align: 'left',  display() { return 'SEARCH'; } },
            { x: 5,  y: 4, align: 'left',  display() { return 'TAKE'; } },
        ],
        options: [
            {
                arrowX: 0.5,
                arrowY: 1,
                name: 'talk',
                action: player => {
                    player.talk();
                }
            },
            {
                arrowX: 4.5,
                arrowY: 1,
                name: 'spell',
                action: player => {
                }
            },
            {
                arrowX: 0.5,
                arrowY: 2,
                name: 'status',
                action: player => {
                    player.displayStatusMenu();
                }
            },
            {
                arrowX: 4.5,
                arrowY: 2,
                name: 'item',
                action: player => {
                }
            },
            {
                arrowX: 0.5,
                arrowY: 3,
                name: 'stairs',
                action: player => {
                    player.stairs();
                }
            },
            {
                arrowX: 4.5,
                arrowY: 3,
                name: 'door',
                action: player => {
                    player.door();
                }
            },
            {
                arrowX: 0.5,
                arrowY: 4,
                name: 'search',
                action: player => {
                }
            },
            {
                arrowX: 4.5,
                arrowY: 4,
                name: 'take',
                action: player => {
                }
            },
        ],
    },
    output: {
        width: 16,
        height: 5,
        x: 4,
        y: 9,
        layout: [
            0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
            3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5,
            3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5,
            3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5,
            6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8,
        ],
    },
    status: {
        width: 10,
        height: 11,
        x: 7,
        y: 2,
        layout: [
            0, 1, 1, 1, 1, 1, 1, 1, 1, 2,
            3, 4, 4, 4, 4, 4, 4, 4, 4, 5,
            3, 4, 4, 4, 4, 4, 4, 4, 4, 5,
            3, 4, 4, 4, 4, 4, 4, 4, 4, 5,
            3, 4, 4, 4, 4, 4, 4, 4, 4, 5,
            3, 4, 4, 4, 4, 4, 4, 4, 4, 5,
            3, 4, 4, 4, 4, 4, 4, 4, 4, 5,
            3, 4, 4, 4, 4, 4, 4, 4, 4, 5,
            3, 4, 4, 4, 4, 4, 4, 4, 4, 5,
            3, 4, 4, 4, 4, 4, 4, 4, 4, 5,
            6, 7, 7, 7, 7, 7, 7, 7, 7, 8,
        ],
        text: [
            { x: 5.5, y: 0.5, align: 'right', display() { return 'NAME:'; } },
            { x: 5.5, y: 0.5, align: 'left',  display() { return GameState.player.name.substr(0, 8); } },
            { x: 8,   y: 1.5, align: 'right', display() { return 'STRENGTH:'; } },
            { x: 9.5, y: 1.5, align: 'right', display() { return GameState.player.strength.toString(); } },
            { x: 8,   y: 2.5, align: 'right', display() { return 'AGILITY:'; } },
            { x: 9.5, y: 2.5, align: 'right', display() { return GameState.player.agility.toString(); } },
            { x: 8,   y: 3.5, align: 'right', display() { return 'MAXIMUM HP:'; } },
            { x: 9.5, y: 3.5, align: 'right', display() { return GameState.player.maxHp.toString(); } },
            { x: 8,   y: 4.5, align: 'right', display() { return 'MAXIMUM MP:'; } },
            { x: 9.5, y: 4.5, align: 'right', display() { return GameState.player.maxMp.toString(); } },
            { x: 8,   y: 5.5, align: 'right', display() { return 'ATTACK POWER:'; } },
            { x: 9.5, y: 5.5, align: 'right', display() { return GameState.player.attackPower.toString(); } },
            { x: 8,   y: 6.5, align: 'right', display() { return 'DEFENSE POWER:'; } },
            { x: 9.5, y: 6.5, align: 'right', display() { return GameState.player.defensePower.toString(); } },
            { x: 5,   y: 7.5, align: 'right', display() { return 'WEAPON:'; } },
            { x: 5,   y: 7.5, align: 'left',  display() { return text.weapons[GameState.player.weapon].split(' ')[0]; } },
            { x: 5,   y: 8  , align: 'left',  display() { return text.weapons[GameState.player.weapon].split(' ')[1] || ''; } },
            { x: 5,   y: 8.5, align: 'right', display() { return 'ARMOR:'; } },
            { x: 5,   y: 8.5, align: 'left',  display() { return text.armors[GameState.player.armor].split(' ')[0]; } },
            { x: 5,   y: 9,   align: 'left',  display() { return text.armors[GameState.player.armor].split(' ')[1] || ''; } },
            { x: 5,   y: 9.5, align: 'right', display() { return 'SHIELD:'; } },
            { x: 5,   y: 9.5, align: 'left',  display() { return text.shields[GameState.player.shield].split(' ')[0]; } },
            { x: 5,   y: 10,  align: 'left',  display() { return text.shields[GameState.player.shield].split(' ')[1] || ''; } },
        ],
    },
    combat: {
        width: 8,
        height: 3,
        x: 8,
        y: 1,
        layout: [
            0, 1, 1, 1, 1, 1, 1, 2,
            3, 4, 4, 4, 4, 4, 4, 5,
            6, 7, 7, 7, 7, 7, 7, 8,
        ],
        text: [
            { x: 2,  y: 0, align: 'left',  display() { return 'COMMAND'; } },
            { x: 1,  y: 1, align: 'left',  display() { return 'FIGHT'; } },
            { x: 5,  y: 1, align: 'left',  display() { return 'SPELL'; } },
            { x: 1,  y: 2, align: 'left',  display() { return 'RUN'; } },
            { x: 5,  y: 2, align: 'left',  display() { return 'ITEM'; } },
        ],
        options: [
            {
                arrowX: 0.5,
                arrowY: 1,
                name: 'fight',
                action(combat) {
                    combat.playerAttack();
                }
            },
            {
                arrowX: 4.5,
                arrowY: 1,
                name: 'spell',
                action(combat) {
                }
            },
            {
                arrowX: 0.5,
                arrowY: 2,
                name: 'run',
                action(combat) {
                    combat.playerRun();
                }
            },
            {
                arrowX: 4.5,
                arrowY: 2,
                name: 'item',
                action(combat) {
                }
            },
        ],
    },
};
