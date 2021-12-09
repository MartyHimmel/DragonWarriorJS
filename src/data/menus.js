import Data from '../data.js';
import SaveState from '../save-state.js';

export default {
    characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,\u201C\u201D\u2018\u2019?!*&()-:; ',
    arrow: { x: 0, y: 6 },
    main: {
        width: 12,
        x: 6,
        y: 3,
        options: [
            {
                x: 1,
                y: 1,
                align: 'left',
                display() {
                    return 'CONTINUE A QUEST';
                },
            },
            {
                x: 1,
                y: 2,
                align: 'left',
                display() {
                    return 'CHANGE MESSAGE SPEED';
                },
            },
            {
                x: 1,
                y: 3,
                align: 'left',
                display() {
                    return 'BEGIN A NEW QUEST';
                },
                action(menu) {
                    menu.newQuest();
                },
            },
            {
                x: 1,
                y: 4,
                align: 'left',
                display() {
                    return 'COPY A QUEST';
                },
            },
            {
                x: 1,
                y: 5,
                align: 'left',
                display() {
                    return 'ERASE A QUEST';
                },
            },
        ],
    },
    adventureLog: {
        width: 10,
        x: 10,
        y: 7,
        options: [
            {
                x: 1,
                y: 1,
                align: 'left',
                display() {
                    return 'ADVENTURE LOG 1';
                },
                action(menu) {
                    menu.newQuest();
                },
            },
            {
                x: 1,
                y: 2,
                align: 'left',
                display() {
                    return 'ADVENTURE LOG 2';
                },
                action(menu) {
                    menu.newQuest();
                },
            },
            {
                x: 1,
                y: 3,
                align: 'left',
                display() {
                    return 'ADVENTURE LOG 3';
                },
                action(menu) {
                    menu.newQuest();
                },
            },
        ],
    },
    enterName: {

    },
    nameKeyboard: {

    },
    messageSpeed: {

    },
    quickStat: {
        width: 4,
        height: 6,
        x: 3,
        y: 2,
        title: {
            x: 1,
            y: 0,
            align: 'left',
            display() {
                return SaveState.player.name.substr(0, 4);
            },
        },
        options: [
            { x: 0.5,  y: 1, align: 'left',  display() { return 'LV'; } },
            { x: 3.5,  y: 1, align: 'right', display() { return SaveState.player.level.toString(); } },
            { x: 0.5,  y: 2, align: 'left',  display() { return 'HP'; } },
            { x: 3.5,  y: 2, align: 'right', display() { return SaveState.player.currentHp.toString(); } },
            { x: 0.5,  y: 3, align: 'left',  display() { return 'MP'; } },
            { x: 3.5,  y: 3, align: 'right', display() { return SaveState.player.currentMp.toString(); } },
            { x: 0.5,  y: 4, align: 'left',  display() { return 'G'; } },
            { x: 3.5,  y: 4, align: 'right', display() { return SaveState.player.gold.toString(); } },
            { x: 0.5,  y: 5, align: 'left',  display() { return 'E'; } },
            { x: 3.5,  y: 5, align: 'right', display() { return SaveState.player.experience.toString(); } },
        ],
    },
    exploration: {
        width: 8,
        height: 5,
        x: 8,
        y: 1,
        title: {
            x: 2,
            y: 0,
            align: 'left',
            display() {
                return 'COMMAND';
            },
        },
        options: [
            {
                x: 1,
                y: 1,
                align: 'left',
                display() {
                    return 'TALK';
                },
                action(player) {
                    player.talk();
                },
            },
            {
                x: 1,
                y: 2,
                align: 'left',
                display() {
                    return 'STATUS';
                },
                action(player) {
                    player.displayStatusMenu();
                },
            },
            {
                x: 1,
                y: 3,
                align: 'left',
                display() {
                    return 'STAIRS';
                },
                action(player) {
                    player.stairs();
                },
            },
            {
                x: 1,
                y: 4,
                align: 'left',
                display() {
                    return 'SEARCH';
                },
                action(player) {
                    player.search();
                },
            },
            {
                x: 5,
                y: 1,
                align: 'left',
                display() {
                    return 'SPELL';
                },
                action(player) {
                    player.displayFieldSpells();
                },
            },
            {
                x: 5,
                y: 2,
                align: 'left',
                display() {
                    return 'ITEM';
                },
                action(player) {
                    player.displayItemsMenu();
                },
            },
            {
                x: 5,
                y: 3,
                align: 'left',
                display() {
                    return 'DOOR';
                },
                action(player) {
                    player.door();
                },
            },
            {
                x: 5,
                y: 4,
                align: 'left',
                display() {
                    return 'TAKE';
                },
                action(player) {
                    player.take();
                },
            },
        ],
    },
    output: {
        width: 16,
        height: 5,
        x: 4,
        y: 9,
    },
    status: {
        width: 10,
        height: 11,
        x: 7,
        y: 2,
        options: [
            { x: 5.5, y: 0.5, align: 'right', display() { return 'NAME:'; } },
            { x: 5.5, y: 0.5, align: 'left',  display() { return SaveState.player.name.substr(0, 8); } },
            { x: 8,   y: 1.5, align: 'right', display() { return 'STRENGTH:'; } },
            { x: 9.5, y: 1.5, align: 'right', display() { return SaveState.player.strength.toString(); } },
            { x: 8,   y: 2.5, align: 'right', display() { return 'AGILITY:'; } },
            { x: 9.5, y: 2.5, align: 'right', display() { return SaveState.player.agility.toString(); } },
            { x: 8,   y: 3.5, align: 'right', display() { return 'MAXIMUM HP:'; } },
            { x: 9.5, y: 3.5, align: 'right', display() { return SaveState.player.maxHp.toString(); } },
            { x: 8,   y: 4.5, align: 'right', display() { return 'MAXIMUM MP:'; } },
            { x: 9.5, y: 4.5, align: 'right', display() { return SaveState.player.maxMp.toString(); } },
            { x: 8,   y: 5.5, align: 'right', display() { return 'ATTACK POWER:'; } },
            { x: 9.5, y: 5.5, align: 'right', display() { return SaveState.player.attackPower.toString(); } },
            { x: 8,   y: 6.5, align: 'right', display() { return 'DEFENSE POWER:'; } },
            { x: 9.5, y: 6.5, align: 'right', display() { return SaveState.player.defensePower.toString(); } },
            { x: 5,   y: 7.5, align: 'right', display() { return 'WEAPON:'; } },
            { x: 5,   y: 7.5, align: 'left',  display() { return Data.text.weapons[SaveState.player.weapon].split(' ')[0]; } },
            { x: 5,   y: 8  , align: 'left',  display() { return Data.text.weapons[SaveState.player.weapon].split(' ')[1] || ''; } },
            { x: 5,   y: 8.5, align: 'right', display() { return 'ARMOR:'; } },
            { x: 5,   y: 8.5, align: 'left',  display() { return Data.text.armors[SaveState.player.armor].split(' ')[0]; } },
            { x: 5,   y: 9,   align: 'left',  display() { return Data.text.armors[SaveState.player.armor].split(' ')[1] || ''; } },
            { x: 5,   y: 9.5, align: 'right', display() { return 'SHIELD:'; } },
            { x: 5,   y: 9.5, align: 'left',  display() { return Data.text.shields[SaveState.player.shield].split(' ')[0]; } },
            { x: 5,   y: 10,  align: 'left',  display() { return Data.text.shields[SaveState.player.shield].split(' ')[1] || ''; } },
        ],
    },
    combat: {
        width: 8,
        height: 3,
        x: 8,
        y: 1,
        title: {
            x: 2,
            y: 0,
            align: 'left',
            display() {
                return 'COMMAND';
            },
        },
        options: [
            {
                x: 1,
                y: 1,
                align: 'left',
                display() {
                    return 'FIGHT';
                },
                action(combat) {
                    combat.playerAttack();
                },
            },
            {
                x: 1,
                y: 2,
                align: 'left',
                display() {
                    return 'RUN';
                },
                action(combat) {
                    combat.playerRun();
                },
            },
            {
                x: 5,
                y: 1,
                align: 'left',
                display() {
                    return 'SPELL';
                },
                action(combat) {
                    combat.displaySpellList();
                },
            },
            {
                x: 5,
                y: 2,
                align: 'left',
                display() {
                    return 'ITEM';
                },
                action(combat) {
                    combat.displayItemsMenu();
                },
            },
        ],
    },
    spells: {
        width: 6,
        x: 11,
        y: 2,
        title: {
            x: 1.5,
            y: 0,
            align: 'left',
            display() {
                return 'SPELL';
            }
        },
        options: [

        ],
    }
};
