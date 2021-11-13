import GameState from '../state.js';

export default {
    characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,""\'\'?!*&()-:; ',
    arrow: { x: 0, y: 6 },
    quickStat: {
        width: 4,
        height: 6,
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
};
