/**
 * Game data that should be written to a save file
 */
export default {
    player: {
        name: '',

        // Stats
        level: 1,
        maxHp: 15,
        currentHp: 15,
        maxMp: 0,
        currentMp: 0,
        strength: 0,
        agility: 0,
        attackPower: 0,
        defensePower: 0,

        // Equipment
        weapon: 'none',
        armor: 'none',
        shield: 'none',
        inventory: [],

        spells: [],

        experience: 0,
        gold: 0,
    },

    rescuedPrincess: false,
    carryingPrincess: false,
    createdRainbowBridge: false,
    greenDragonIsAlive: true,
    golemIsAlive: true,
    hasErdricksArmor: false,
    hasErdricksToken: false,
    doorsOpened: [],
    chestsOpened: [],
};
