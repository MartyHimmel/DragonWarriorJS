export default {
    screenTilesWide: 25,
    screenTileHigh: 15,
    tileWidth: 32,
    tileHeight: 32,
    lastMoveTime: Date.now(),
    lastUpdateTime: Date.now(),
    sprites: {
        battle: 'assets/sprites/battle.png',
        characters: 'assets/sprites/characters.png',
        enemies: 'assets/sprites/monsters.png',
        tiles: 'assets/sprites/tiles.png',
        title: 'assets/sprites/title.png',
    },
    titleScreen1: {
        x: 0,
        y: 0,
        width: 248,
        height: 240,
    },
    titleScreen2: {
        x: 249,
        y: 0,
        width: 248,
        height: 240,
    },
    titleScreenStar: [
        { x: 531, y: 228, width: 8,  height: 12 },
        { x: 540, y: 216, width: 14, height: 24 },
        { x: 555, y: 198, width: 28, height: 42 },
        { x: 584, y: 180, width: 36, height: 60 },
    ],
};
