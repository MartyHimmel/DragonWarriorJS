import GameState from '../state.js';

export default {
    characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,""\'\'?!*&()-:; ',
    arrow: { x: 0, y: 6 },
    quickStat: {
        width: 4,
        height: 6,
        x: 3,
        y: 2,
        layout: [
            0, 4, 4, 2,
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
        arrowStartX: 8.5,
        arrowStartY: 2,
        layout: [
            0, 1, 4, 4, 4, 4, 1, 2,
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
                }
            },
            {
                arrowX: 4.5,
                arrowY: 3,
                name: 'door',
                action: player => {
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
};
