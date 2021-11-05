import Game from './game.js';
import combat from './combat.js';
import player from './player.js';

export default {
    tile_width: 32,
    tile_height: 32,
    time: Date.now(),
    delta_time: Date.now(),
    sprites: {
        characters: 'assets/sprites/characters.png',
        enemies: 'assets/sprites/monsters.png',
        tiles: 'assets/sprites/tiles.png'
    },
    levels: [
        //TODO: needs to take this into account- http://www.gamefaqs.com/nes/563408-dragon-warrior/faqs/18342
        { max_hp: 15,  max_mp: 0,   strength: 4,   agility: 4,   required_exp: 0 },
        { max_hp: 22,  max_mp: 0,   strength: 5,   agility: 4,   required_exp: 7 },
        { max_hp: 24,  max_mp: 5,   strength: 7,   agility: 6,   required_exp: 23,    spells_learned: ['heal'] },
        { max_hp: 31,  max_mp: 16,  strength: 7,   agility: 8,   required_exp: 47,    spells_learned: ['hurt'] },
        { max_hp: 35,  max_mp: 20,  strength: 12,  agility: 10,  required_exp: 110 },
        { max_hp: 38,  max_mp: 24,  strength: 16,  agility: 10,  required_exp: 220 },
        { max_hp: 40,  max_mp: 26,  strength: 18,  agility: 17,  required_exp: 450,   spells_learned: ['sleep'] },
        { max_hp: 46,  max_mp: 29,  strength: 22,  agility: 20,  required_exp: 800 },
        { max_hp: 50,  max_mp: 36,  strength: 30,  agility: 22,  required_exp: 1300,  spells_learned: ['radiant'] },
        { max_hp: 54,  max_mp: 40,  strength: 35,  agility: 31,  required_exp: 2000,  spells_learned: ['stopspell'] },
        { max_hp: 62,  max_mp: 50,  strength: 40,  agility: 35,  required_exp: 2900 },
        { max_hp: 63,  max_mp: 58,  strength: 48,  agility: 40,  required_exp: 4000,  spells_learned: ['outside'] },
        { max_hp: 70,  max_mp: 64,  strength: 52,  agility: 48,  required_exp: 5500,  spells_learned: ['return'] },
        { max_hp: 78,  max_mp: 70,  strength: 60,  agility: 55,  required_exp: 7500 },
        { max_hp: 86,  max_mp: 72,  strength: 68,  agility: 64,  required_exp: 10000, spells_learned: ['repel'] },
        { max_hp: 92,  max_mp: 95,  strength: 72,  agility: 70,  required_exp: 13000 },
        { max_hp: 100, max_mp: 100, strength: 72,  agility: 78,  required_exp: 16000, spells_learned: ['healmore'] },
        { max_hp: 115, max_mp: 108, strength: 85,  agility: 84,  required_exp: 19000 },
        { max_hp: 130, max_mp: 115, strength: 87,  agility: 86,  required_exp: 22000, spells_learned: ['hurtmore'] },
        { max_hp: 138, max_mp: 128, strength: 92,  agility: 88,  required_exp: 26000 },
        { max_hp: 149, max_mp: 135, strength: 95,  agility: 90,  required_exp: 30000 },
        { max_hp: 158, max_mp: 146, strength: 97,  agility: 90,  required_exp: 34000 },
        { max_hp: 165, max_mp: 153, strength: 99,  agility: 94,  required_exp: 38000 },
        { max_hp: 170, max_mp: 161, strength: 103, agility: 98,  required_exp: 42000 },
        { max_hp: 174, max_mp: 161, strength: 113, agility: 100, required_exp: 46000 },
        { max_hp: 180, max_mp: 168, strength: 117, agility: 105, required_exp: 50000 },
        { max_hp: 189, max_mp: 175, strength: 125, agility: 107, required_exp: 54000 },
        { max_hp: 195, max_mp: 180, strength: 130, agility: 115, required_exp: 58000 },
        { max_hp: 200, max_mp: 190, strength: 135, agility: 120, required_exp: 62000 },
        { max_hp: 210, max_mp: 200, strength: 140, agility: 130, required_exp: 65535 }
    ],
    weapons: {
        none:           { attack: 0,  price: 0 },
        bamboo_pole:    { attack: 2,  price: 10 },
        club:           { attack: 4,  price: 60 },
        copper_sword:   { attack: 10, price: 180 },
        hand_axe:       { attack: 15, price: 560 },
        broad_sword:    { attack: 20, price: 1500 },
        flame_sword:    { attack: 28, price: 9800 },
        erdricks_sword: { attack: 40, price: 0 }
    },
    armors: {
        none:           { defense: 0,  price: 0 },
        clothes:        { defense: 2,  price: 20 },
        leather_armor:  { defense: 4,  price: 70 },
        chain_mail:     { defense: 10, price: 300 },
        half_plate:     { defense: 16, price: 1000 },
        full_plate:     { defense: 24, price: 3000 },
        magic_armor:    { defense: 24, price: 7700 },
        erdricks_armor: { defense: 28, price: 0 }
    },
    shields: {
        none:           { defense: 0,  price: 0 },
        leather_shield: { defense: 4,  price: 90 },
        iron_shield:    { defense: 10, price: 800 },
        silver_shield:  { defense: 20, price: 14800 }
    },
    items: {
        herb: { price: 24 },
        torch: { price: 8 },
        magic_key: { price: [53, 83] },
        dragon_scale: { price: 20 },
        fairy_water: { price: 38 },
        wyvern_wings: { price: 70 },
        cursed_belt: { price: 0, sale_price: 180 },
        cursed_necklace: { price: 0, sale_price: 1250 },
        fairy_flute: { price: 0 },
        silver_harp: { price: 0 },
        stones_of_sunlight: { price: 0 },
        staff_of_rain: { price: 0 },
        rainbow_drop: { price: 0 },
        erdricks_tablet: { price: 0 },
        erdricks_token: { price: 0 },
        ball_of_light: { price: 0 },
        fighters_ring: { price: 0, sale_price: 15 },
        gwaelins_love: { price: 0 }
    },
    spells: {
        heal: {
            show_in_combat: true,
            show_in_explore: true,
            cost: 4,
            effect: function() { player.add_hp(Game.random_number(10, 17)); }
        },
        hurt: {
            show_in_combat: true,
            show_in_explore: false,
            cost: 2,
            effect: function() { combat.enemy_current_hp -= Game.random_number(5, 12); }
        },
        sleep: {
            show_in_combat: true,
            show_in_explore: false,
            cost: 2,
            effect: function() { combat.enemy_status = 'sleep'; }
        },
        radiant: {
            show_in_combat: false,
            show_in_explore: true,
            cost: 3,
            effect: function() {
                player.visibility = 3;
                player.radiant_in_effect = true;
                player.radiant_step_counter = 200;
            }
        },
        stopspell: {
            show_in_combat: true,
            show_in_explore: false,
            cost: 2,
            effect: function() { combat.enemy_status = 'stopspell'; }
        },
        outside: {
            show_in_combat: false,
            show_in_explore: true,
            cost: 6,
            effect: function() { }
        },
        'return': {
            show_in_combat: false,
            show_in_explore: true,
            cost: 8,
            effect: function() { }
        },
        repel: {
            show_in_combat: false,
            show_in_explore: true,
            cost: 2,
            effect: function() { }
        },
        healmore: {
            show_in_combat: true,
            show_in_explore: true,
            cost: 10,
            effect: function() { player.add_hp(Game.random_number(85, 100)); }
        },
        hurtmore: {
            show_in_combat: true,
            show_in_explore: false,
            cost: 5,
            effect: function() { combat.enemy_current_hp -= Game.random_number(58, 65); }
        }
    },
    enemies: [
        {
            index: 0,
            id: "slime",
            strength: 5,
            agility: 3,
            hp: 3,
            experience: 1,
            gold: 1,
            sleep_resist: 0,
            stopspell_resist: 15,
            hurt_resist: 0,
            dodge: 1,
            x: 248,
            y: 248,
            width: 32,
            height: 32
        },
        {
            index: 1,
            id: "red_slime",
            strength: 7,
            agility: 3,
            hp: 4,
            experience: 1,
            gold: 2,
            sleep_resist: 0,
            stopspell_resist: 15,
            hurt_resist: 0,
            dodge: 1,
            x: 312,
            y: 248,
            width: 32,
            height: 32
        },
        {
            index: 2,
            id: "drakee",
            strength: 9,
            agility: 6,
            hp: [5, 6],
            experience: 2,
            gold: 2,
            sleep_resist: 0,
            stopspell_resist: 15,
            hurt_resist: 0,
            dodge: 1,
            x: 240,
            y: 0,
            width: 48,
            height: 48
        },
        {
            index: 3,
            id: "ghost",
            strength: 11,
            agility: 8,
            hp: [6, 7],
            experience: 3,
            gold: [3, 4],
            sleep_resist: 0,
            stopspell_resist: 15,
            hurt_resist: 0,
            dodge: 4,
            x: 0,
            y: 112,
            width: 48,
            height: 56
        },
        {
            index: 4,
            id: "magician",
            strength: 11,
            agility: 12,
            hp: [10, 13],
            experience: 4,
            gold: [9, 11],
            special: ["hurt"],
            special_probability: [2],
            sleep_resist: 0,
            stopspell_resist: 0,
            hurt_resist: 0,
            dodge: 1,
            x: 0,
            y: 296,
            width: 48,
            height: 48
        },
        {
            index: 5,
            id: "magidrakee",
            strength: 14,
            agility: 14,
            hp: [12, 15],
            experience: 5,
            gold: [9, 11],
            special: ["hurt"],
            special_probability: [2],
            sleep_resist: 0,
            stopspell_resist: 0,
            hurt_resist: 0,
            dodge: 1,
            x: 304,
            y: 0,
            width: 40,
            height: 48
        },
        {
            index: 6,
            id: "scorpion",
            strength: 18,
            agility: 16,
            hp: [16, 20],
            experience: 6,
            gold: [12, 15],
            sleep_resist: 0,
            stopspell_resist: 15,
            hurt_resist: 0,
            dodge: 1,
            x: 240,
            y: 176,
            width: 48,
            height: 48
        },
        {
            index: 7,
            id: "druin",
            strength: 20,
            agility: 18,
            hp: [17, 22],
            experience: 7,
            gold: [12, 15],
            sleep_resist: 0,
            stopspell_resist: 15,
            hurt_resist: 0,
            dodge: 2,
            x: 240,
            y: 64,
            width: 48,
            height: 32
        },
        {
            index: 8,
            id: "poltergeist",
            strength: 18,
            agility: 20,
            hp: [18, 23],
            experience: 8,
            gold: [13, 17],
            special: ["hurt"],
            special_probability: [3],
            sleep_resist: 0,
            stopspell_resist: 0,
            hurt_resist: 0,
            dodge: 6,
            x: 64,
            y: 112,
            width: 40,
            height: 56
        },
        {
            index: 9,
            id: "droll",
            strength: 24,
            agility: 24,
            hp: [19, 25],
            experience: 10,
            gold: [18, 24],
            sleep_resist: 0,
            stopspell_resist: 14,
            hurt_resist: 0,
            dodge: 2,
            x: 0,
            y: 56,
            width: 48,
            height: 48
        },
        {
            index: 10,
            id: "drakeema",
            strength: 22,
            agility: 26,
            hp: [16, 20],
            experience: 11,
            gold: [15, 19],
            special: ["heal", "hurt"],
            special_probability: [1, 2],
            sleep_resist: 2,
            stopspell_resist: 0,
            hurt_resist: 0,
            dodge: 6,
            x: 368,
            y: 0,
            width: 32,
            height: 48
        },
        {
            index: 11,
            id: "skeleton",
            strength: 28,
            agility: 22,
            hp: [23, 30],
            experience: 11,
            gold: [22, 29],
            sleep_resist: 0,
            stopspell_resist: 15,
            hurt_resist: 0,
            dodge: 4,
            x: 0,
            y: 232,
            width: 48,
            height: 56
        },
        {
            index: 12,
            id: "warlock",
            strength: 28,
            agility: 22,
            hp: [23, 30],
            experience: 13,
            gold: [26, 34],
            special: ["sleep", "hurt"],
            special_probability: [1, 2],
            sleep_resist: 3,
            stopspell_resist: 1,
            hurt_resist: 0,
            dodge: 2,
            x: 64,
            y: 296,
            width: 40,
            height: 48
        },
        {
            index: 13,
            id: "metal_scorpion",
            strength: 36,
            agility: 42,
            hp: [17, 22],
            experience: 14,
            gold: [30, 39],
            sleep_resist: 0,
            stopspell_resist: 15,
            hurt_resist: 0,
            dodge: 2,
            x: 296,
            y: 176,
            width: 56,
            height: 48
        },
        {
            index: 14,
            id: "wolf",
            strength: 40,
            agility: 30,
            hp: [26, 34],
            experience: 16,
            gold: [37, 49],
            sleep_resist: 1,
            stopspell_resist: 15,
            hurt_resist: 0,
            dodge: 2,
            x: 240,
            y: 296,
            width: 48,
            height: 48
        },
        {
            index: 15,
            id: "wraith",
            strength: 44,
            agility: 34,
            hp: [28, 36],
            experience: 17,
            gold: [45, 59],
            special: ["heal"],
            special_probability: [1],
            sleep_resist: 7,
            stopspell_resist: 0,
            hurt_resist: 0,
            dodge: 4,
            x: 64,
            y: 232,
            width: 40,
            height: 56
        },
        {
            index: 16,
            id: "metal_slime",
            strength: 10,
            agility: 255,
            hp: 4,
            experience: 115,
            gold: [4, 5],
            special: ["hurt"],
            special_probability: [3],
            sleep_resist: 15,
            stopspell_resist: 15,
            hurt_resist: 15,
            dodge: 1,
            x: 368,
            y: 248,
            width: 32,
            height: 24
        },
        {
            index: 17,
            id: "specter",
            strength: 40,
            agility: 38,
            hp: [28, 36],
            experience: 18,
            gold: [52, 69],
            special: ["sleep", "hurt"],
            special_probability: [1, 3],
            sleep_resist: 3,
            stopspell_resist: 1,
            hurt_resist: 0,
            dodge: 4,
            x: 128,
            y: 112,
            width: 32,
            height: 56
        },
        {
            index: 18,
            id: "wolflord",
            strength: 50,
            agility: 36,
            hp: [29, 38],
            experience: 20,
            gold: [60, 79],
            special: ["stopspell"],
            special_probability: [2],
            sleep_resist: 4,
            stopspell_resist: 7,
            hurt_resist: 0,
            dodge: 2,
            x: 296,
            y: 296,
            width: 56,
            height: 48
        },
        {
            index: 19,
            id: "druinlord",
            strength: 47,
            agility: 40,
            hp: [27, 35],
            experience: 20,
            gold: [63, 84],
            special: ["heal", "hurt"],
            special_probability: [3, 1],
            sleep_resist: 15,
            stopspell_resist: 0,
            hurt_resist: 0,
            dodge: 4,
            x: 304,
            y: 64,
            width: 48,
            height: 32
        },
        {
            index: 20,
            id: "drollmagi",
            strength: 52,
            agility: 50,
            hp: [29, 38],
            experience: 22,
            gold: [67, 89],
            special: ["stopspell"],
            special_probability: [2],
            sleep_resist: 2,
            stopspell_resist: 2,
            hurt_resist: 0,
            dodge: 1,
            x: 64,
            y: 56,
            width: 40,
            height: 48
        },
        {
            index: 21,
            id: "wyvern",
            strength: 56,
            agility: 48,
            hp: [32, 42],
            experience: 24,
            gold: [75, 99],
            sleep_resist: 4,
            stopspell_resist: 15,
            hurt_resist: 0,
            dodge: 2,
            x: 0,
            y: 352,
            width: 48,
            height: 56
        },
        {
            index: 22,
            id: "rogue_scorpion",
            strength: 60,
            agility: 90,
            hp: [27, 35],
            experience: 26,
            gold: [82, 109],
            sleep_resist: 7,
            stopspell_resist: 15,
            hurt_resist: 0,
            dodge: 2,
            x: 360,
            y: 184,
            width: 46,
            height: 40
        },
        {
            index: 23,
            id: "wraith_knight",
            strength: 68,
            agility: 56,
            hp: [35, 46],
            experience: 28,
            gold: [90, 119],
            special: ["heal"],
            special_probability: [3],
            sleep_resist: 5,
            stopspell_resist: 0,
            hurt_resist: 3,
            dodge: 4,
            x: 120,
            y: 232,
            width: 48,
            height: 56
        },
        {
            index: 24,
            id: "golem",
            strength: 120,
            agility: 60,
            hp: [53, 70],
            experience: 5,
            gold: [7, 9],
            sleep_resist: 15,
            stopspell_resist: 15,
            hurt_resist: 15,
            dodge: 0,
            x: 296,
            y: 112,
            width: 56,
            height: 56
        },
        {
            index: 25,
            id: "goldman",
            strength: 48,
            agility: 40,
            hp: [38, 50],
            experience: 6,
            gold: [150, 199],
            sleep_resist: 13,
            stopspell_resist: 15,
            hurt_resist: 0,
            dodge: 1,
            x: 240,
            y: 112,
            width: 48,
            height: 56
        },
        {
            index: 26,
            id: "knight",
            strength: 76,
            agility: 78,
            hp: [42, 55],
            experience: 33,
            gold: [97, 129],
            special: ["stopspell"],
            special_probability: [2],
            sleep_resist: 6,
            stopspell_resist: 7,
            hurt_resist: 0,
            dodge: 1,
            x: 0,
            y: 176,
            width: 48,
            height: 56
        },
        {
            index: 27,
            id: "magiwyvern",
            strength: 78,
            agility: 68,
            hp: [44, 58],
            experience: 34,
            gold: [105, 139],
            special: ["sleep"],
            special_probability: [2],
            sleep_resist: 2,
            stopspell_resist: 0,
            hurt_resist: 0,
            dodge: 2,
            x: 64,
            y: 352,
            width: 40,
            height: 56
        },
        {
            index: 28,
            id: "demon_knight",
            strength: 79,
            agility: 64,
            hp: [38, 50],
            experience: 37,
            gold: [112, 149],
            sleep_resist: 15,
            stopspell_resist: 15,
            hurt_resist: 15,
            dodge: 15,
            x: 184,
            y: 232,
            width: 40,
            height: 56
        },
        {
            index: 29,
            id: "werewolf",
            strength: 86,
            agility: 70,
            hp: [46, 60],
            experience: 40,
            gold: [116, 154],
            sleep_resist: 7,
            stopspell_resist: 15,
            hurt_resist: 0,
            dodge: 7,
            x: 360,
            y: 296,
            width: 46,
            height: 48
        },
        {
            index: 30,
            id: "green_dragon",
            strength: 88,
            agility: 74,
            hp: [49, 65],
            experience: 45,
            gold: [120, 159],
            special: ["breathe_fire"],
            special_probability: [1],
            sleep_resist: 7,
            stopspell_resist: 15,
            hurt_resist: 2,
            dodge: 2,
            x: 0,
            y: 0,
            width: 48,
            height: 48
        },
        {
            index: 31,
            id: "starwyvern",
            strength: 86,
            agility: 80,
            hp: [49, 65],
            experience: 43,
            gold: [120, 159],
            special: ["healmore", "breathe_fire"],
            special_probability: [3, 1],
            sleep_resist: 8,
            stopspell_resist: 0,
            hurt_resist: 1,
            dodge: 2,
            x: 120,
            y: 352,
            width: 48,
            height: 64
        },
        {
            index: 32,
            id: "wizard",
            strength: 80,
            agility: 70,
            hp: [49, 65],
            experience: 50,
            gold: [123, 164],
            special: ["hurtmore"],
            special_probability: [2],
            sleep_resist: 15,
            stopspell_resist: 7,
            hurt_resist: 15,
            dodge: 2,
            x: 120,
            y: 296,
            width: 48,
            height: 48
        },
        {
            index: 33,
            id: "axe_knight",
            strength: 94,
            agility: 82,
            hp: [53, 70],
            experience: 54,
            gold: [123, 164],
            special: ["sleep"],
            special_probability: [1],
            sleep_resist: 15,
            stopspell_resist: 3,
            hurt_resist: 1,
            dodge: 1,
            x: 56,
            y: 168,
            width: 56,
            height: 64
        },
        {
            index: 34,
            id: "blue_dragon",
            strength: 98,
            agility: 84,
            hp: [53, 70],
            experience: 60,
            gold: [112, 149],
            special: ["breathe_fire"],
            special_probability: [1],
            sleep_resist: 15,
            stopspell_resist: 15,
            hurt_resist: 7,
            dodge: 2,
            x: 48,
            y: 0,
            width: 64,
            height: 48
        },
        {
            index: 35,
            id: "stoneman",
            strength: 100,
            agility: 40,
            hp: [121, 160],
            experience: 65,
            gold: [105, 139],
            sleep_resist: 2,
            stopspell_resist: 15,
            hurt_resist: 7,
            dodge: 1,
            x: 357,
            y: 112,
            width: 50,
            height: 56
        },
        {
            index: 36,
            id: "armored_knight",
            strength: 105,
            agility: 86,
            hp: [68, 90],
            experience: 70,
            gold: [105, 139],
            special: ["healmore", "hurtmore"],
            special_probability: [3, 1],
            sleep_resist: 15,
            stopspell_resist: 7,
            hurt_resist: 1,
            dodge: 2,
            x: 112,
            y: 168,
            width: 64,
            height: 64
        },
        {
            index: 37,
            id: "red_dragon",
            strength: 120,
            agility: 90,
            hp: [76, 100],
            experience: 100,
            gold: [105, 139],
            special: ["sleep", "breathe_fire"],
            special_probability: [1, 1],
            sleep_resist: 15,
            stopspell_resist: 7,
            hurt_resist: 15,
            dodge: 2,
            x: 112,
            y: 0,
            width: 64,
            height: 48
        },
        {
            index: 38,
            id: "dragonlord_first_form",
            strength: 90,
            agility: 75,
            hp: [76, 100],
            experience: 0,
            gold: 0,
            special: ["stopspell", "hurtmore"],
            special_probability: [1, 3],
            sleep_resist: 15,
            stopspell_resist: 15,
            hurt_resist: 15,
            dodge: 0,
            x: 248,
            y: 360,
            width: 32,
            height: 40
        },
        {
            index: 39,
            id: "dragonlord_second_form",
            strength: 140,
            agility: 200,
            hp: 130,
            experience: 0,
            gold: 0,
            special: ["breathe_fire2"],
            special_probability: [2],
            sleep_resist: 15,
            stopspell_resist: 15,
            hurt_resist: 15,
            dodge: 0,
            x: 312,
            y: 360,
            width: 88,
            height: 97
        }
    ],
    maps: {
        /* Map template
            "Map Name": {
                type: "world", "town" (no combat), or "dungeon"
                zone: zone number for enemy set, dungeon type only
                player_offset: player.offset_x/y starting point
                player_start: player.x/y starting point
                width: width of map in tiles
                height: height of map in tiles
                music: background music to be played on this map
                layout: [
                    array of tile numbers - actual map data
                ]
                npcs: [
                    array of npcs - ["character type", "direction facing", x, y]
                ]
            }
        */

        "World": {
            type: "world",
            player_offset: [34, 41],
            player_start: [12, 6],
            width: 128,
            height: 128,
            map_links: [
                { offset_x: 35, offset_y: 41, map: "Tantegel1F" },
                { offset_x: 40, offset_y: 39, map: "Brecconary" },
                { offset_x: 96, offset_y: 8, map: "Kol" },
                { offset_x: 0,  offset_y: 0, x: 6, y: 6, map: "Garinham" },
                { offset_x: 94, offset_y: 70, map: "Rimuldar" },
                { offset_x: 65, offset_y: 100, map: "Cantlin" },
                { offset_x: 17, offset_y: 87, map: "Hauksness" },
                { offset_x: 20, offset_y: 10, map: "ErdricksCaveB1" },
                { offset_x: 96, offset_y: 42, map: "SwampCave" },
                { offset_x: 96, offset_y: 47, map: "SwampCave", set_offsets: [0, 17], set_xy: [9, 13] },
                { offset_x: 21, offset_y: 55, map: "MountainCaveB1" },
                { offset_x: 40, offset_y: 46, map: "CharlockCastle1F" },
                { offset_x: 73, offset_y: 0, y: 5, map: "NorthShrine" },
                { offset_x: 100, offset_y: 107, map: "SouthShrine" }
            ],
            music: "overworld",
            layout: [
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 33, 15, 15, 15, 15, 15, 15, 27, 26, 25, 25, 25, 25, 25, 25, 25, 25, 26, 33, 15, 15, 15, 15, 15, 15, 15, 27, 26, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 33, 15, 15, 15, 15, 15, 15, 15, 15, 27, 26, 26, 26, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 33, 16, 16, 16, 16, 16, 15, 15, 15, 28, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 33, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 27, 26, 26, 26, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 33, 15, 15, 15, 16, 16, 16, 16, 15, 15, 27, 25, 25, 25, 25, 25, 26, 33, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 27, 25, 25, 25, 25, 25, 25, 25, 25, 25, 33, 15, 15, 15, 15, 15, 15, 17, 17, 17, 17, 17, 17, 17, 17, 27, 26, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 33, 16, 16, 16, 16, 16, 16, 16, 16, 15, 20, 15, 28, 25, 25, 25, 25, 25, 25, 25, 33, 18, 18, 18, 18, 18, 18, 18, 17, 17, 17, 17, 17, 15, 15, 15, 15, 15, 15, 15, 27, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 15, 15, 14, 16, 16, 16, 16, 16, 16, 15, 15, 27, 26, 26, 26, 33, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 15, 15, 15, 27, 25, 25, 25, 25, 25, 25, 25, 32, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 27, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 33, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 29, 25, 25, 25, 25, 25, 25, 25, 33, 18, 18, 18, 18, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 15, 15, 15, 15, 15, 15, 15, 27, 26, 26, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 27, 25, 25, 25, 25, 25, 25, 33, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 27, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 29, 25, 25, 25, 25, 25, 25, 26, 33, 18, 18, 18, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 15, 15, 15, 15, 15, 15, 15, 15, 15, 27, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 27, 26, 25, 25, 26, 33, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 28, 25, 25, 25, 25, 25, 25, 25, 25, 25, 33, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 28, 25, 25, 25, 25, 25, 33, 18, 18, 18, 17, 17, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 27, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 27, 33, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 29, 30, 31, 16, 16, 16, 16, 16, 17, 17, 17, 17, 28, 25, 25, 25, 25, 25, 25, 25, 26, 33, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 29, 25, 25, 25, 25, 25, 33, 18, 18, 18, 17, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 28, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 16, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 34, 25, 25, 25, 35, 16, 16, 16, 17, 17, 17, 17, 29, 25, 25, 25, 25, 25, 25, 25, 33, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 34, 25, 25, 25, 25, 25, 32, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 27, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 16, 16, 16, 16, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 28, 25, 33, 17, 17, 17, 17, 17, 17, 17, 29, 25, 25, 25, 25, 25, 25, 25, 32, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 27, 25, 25, 25, 25, 25, 35, 17, 17, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 28, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 17, 17, 17, 17, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 34, 26, 33, 17, 17, 17, 17, 17, 17, 17, 17, 28, 25, 25, 25, 25, 25, 25, 25, 26, 35, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 27, 25, 25, 25, 32, 17, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 18, 18, 18, 16, 16, 16, 18, 18, 18, 16, 16, 16, 16, 16, 16, 15, 15, 15, 27, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 17, 17, 17, 17, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 16, 16, 16, 16, 16, 16, 21, 21, 21, 21, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 29, 25, 25, 25, 25, 25, 25, 25, 33, 16, 16, 16, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 27, 25, 25, 32, 17, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 18, 18, 16, 16, 16, 16, 16, 16, 18, 18, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 28, 25, 25, 25, 25,
                25, 25, 25, 32, 17, 17, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 16, 16, 16, 16, 16, 21, 21, 21, 21, 21, 21, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 29, 25, 25, 25, 25, 25, 25, 25, 32, 16, 16, 16, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 28, 25, 25, 31, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 14, 16, 16, 16, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 34, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 30, 31, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 16, 16, 16, 21, 21, 21, 21, 21, 21, 21, 21, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 34, 26, 25, 25, 25, 25, 25, 25, 25, 33, 16, 16, 16, 16, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 28, 25, 25, 25, 31, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 27, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 31, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 16, 16, 21, 21, 21, 21, 19, 21, 21, 21, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 27, 25, 25, 25, 25, 25, 33, 16, 16, 16, 16, 16, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 27, 25, 25, 25, 32, 17, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 31, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 16, 16, 21, 21, 21, 21, 21, 21, 21, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 27, 25, 25, 25, 33, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 27, 25, 25, 32, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 35, 16, 16, 16, 16, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 16, 16, 16, 21, 21, 21, 21, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 15, 15, 28, 25, 33, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 27, 25, 25, 31, 17, 17, 17, 17, 17, 17, 17, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 32, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 15, 15, 15, 28, 32, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 27, 25, 25, 31, 17, 17, 17, 17, 17, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 29, 30, 30, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 26, 12, 35, 16, 16, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 27, 32, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 18, 18, 18, 18, 16, 16, 16, 16, 16, 18, 18, 18, 27, 25, 25, 12, 35, 16, 16, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 29, 30, 30, 30, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 33, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 27, 31, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 18, 18, 18, 16, 16, 16, 16, 16, 18, 18, 18, 28, 33, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 34, 26, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 27, 31, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 18, 18, 18, 18, 16, 16, 16, 16, 34, 12, 33, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 27, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 33, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 23, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 16, 16, 18, 18, 18, 18, 18, 18, 18, 16, 16, 16, 21, 21, 21, 21, 27, 26, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 33, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 27, 31, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 16, 16, 15, 15, 15, 15, 15, 15, 16, 16, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 21, 21, 21, 21, 21, 21, 21, 27, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 36, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 16, 16, 18, 18, 18, 18, 18, 18, 18, 18, 18, 29, 31, 15, 15, 15, 15, 15, 16, 18, 18, 18, 18, 18, 18, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 27, 26, 25, 25, 25, 25,
                25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 36, 15, 15, 16, 16, 16, 16, 16, 17, 17, 17, 17, 16, 16, 16, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 34, 30, 25, 25, 31, 15, 15, 15, 15, 15, 18, 18, 18, 18, 18, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 28, 25, 25, 25,
                25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 29, 30, 31, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 27, 31, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 15, 15, 15, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 27, 25, 25, 32, 15, 15, 15, 15, 15, 15, 18, 18, 18, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 16, 16, 21, 21, 21, 21, 21, 28, 25, 25, 25,
                25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 29, 30, 25, 25, 25, 30, 31, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 27, 31, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 15, 15, 15, 15, 16, 16, 17, 17, 17, 17, 17, 17, 17, 27, 25, 25, 31, 15, 15, 15, 15, 15, 15, 15, 15, 21, 21, 21, 21, 21, 21, 21, 21, 21, 16, 16, 16, 16, 21, 21, 21, 21, 28, 25, 25, 25,
                25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 29, 25, 25, 25, 25, 25, 25, 25, 31, 17, 17, 17, 17, 17, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 15, 15, 15, 15, 15, 15, 27, 31, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 17, 17, 17, 17, 17, 17, 17, 27, 25, 25, 31, 15, 15, 15, 15, 15, 15, 15, 21, 21, 21, 21, 21, 21, 21, 21, 21, 16, 16, 16, 16, 21, 21, 21, 21, 28, 25, 25, 25,
                25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 29, 25, 25, 25, 25, 25, 25, 25, 25, 33, 17, 17, 17, 17, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 15, 15, 15, 15, 15, 27, 31, 16, 16, 16, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 28, 25, 32, 15, 15, 15, 15, 15, 15, 15, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 16, 16, 21, 21, 21, 21, 21, 28, 25, 25, 25,
                25, 25, 25, 25, 30, 31, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25, 25, 25, 25, 25, 33, 18, 18, 18, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 15, 15, 15, 15, 15, 27, 12, 12, 30, 31, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 29, 25, 25, 25, 35, 15, 15, 15, 15, 15, 15, 15, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 29, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 31, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 29, 25, 25, 25, 25, 26, 26, 26, 33, 18, 18, 18, 18, 18, 18, 18, 16, 16, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 15, 15, 15, 15, 15, 15, 15, 27, 25, 30, 30, 31, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 29, 25, 25, 25, 33, 15, 15, 15, 15, 15, 15, 15, 15, 15, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 29, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 30, 12, 12, 12, 31, 16, 16, 16, 16, 16, 16, 16, 29, 25, 25, 25, 26, 33, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 15, 15, 15, 15, 18, 18, 18, 18, 28, 25, 25, 25, 31, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 16, 16, 16, 29, 25, 25, 25, 33, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 29, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 33, 17, 17, 17, 27, 12, 31, 16, 16, 16, 16, 29, 26, 26, 26, 33, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 17, 17, 17, 17, 17, 17, 15, 15, 15, 18, 18, 18, 18, 18, 29, 25, 25, 25, 25, 25, 31, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 34, 30, 25, 25, 25, 32, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 21, 21, 21, 21, 21, 21, 21, 29, 30, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 33, 17, 17, 17, 17, 17, 17, 23, 16, 16, 29, 30, 33, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 34, 25, 25, 25, 25, 25, 25, 25, 35, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 28, 25, 25, 25, 25, 31, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 17, 17, 17, 17, 17, 17, 34, 26, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 32, 17, 17, 17, 17, 17, 17, 17, 27, 12, 12, 26, 33, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 27, 25, 25, 25, 25, 25, 33, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 27, 25, 25, 25, 25, 25, 35, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 27, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 32, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 18, 18, 18, 18, 18, 18, 18, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 18, 18, 27, 25, 25, 25, 33, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 27, 25, 25, 25, 33, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 17, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 27, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 32, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 18, 18, 18, 18, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 27, 26, 33, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 28, 25, 33, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 27, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 31, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 15, 15, 15, 15, 17, 17, 17, 17, 17, 17, 17, 18, 18, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 28, 33, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 27, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 26, 35, 17, 17, 17, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 17, 17, 17, 17, 17, 29, 31, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 29, 33, 15, 15, 15, 15, 15, 18, 18, 18, 18, 17, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25,
                25, 25, 25, 25, 25, 33, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 17, 17, 17, 29, 25, 25, 31, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 17, 17, 17, 17, 17, 17, 17, 17, 17, 22, 22, 22, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 23, 15, 15, 15, 16, 16, 18, 18, 18, 18, 18, 18, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 29, 25, 25, 25, 25,
                25, 25, 25, 25, 33, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 17, 17, 17, 17, 28, 25, 25, 25, 35, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 29, 30, 30, 31, 17, 17, 17, 17, 17, 22, 22, 22, 22, 22, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 29, 30, 30, 32, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25, 25,
                25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 29, 25, 25, 25, 32, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 17, 17, 17, 17, 29, 25, 25, 25, 25, 30, 30, 35, 22, 22, 22, 22, 22, 22, 22, 22, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 29, 30, 30, 25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 29, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 29, 25, 25, 25, 25, 32, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 29, 30, 25, 25, 25, 25, 25, 25, 32, 22, 22, 22, 22, 22, 22, 22, 22, 16, 16, 16, 16, 16, 16, 16, 29, 30, 30, 30, 30, 25, 25, 25, 25, 25, 25, 25, 31, 16, 16, 16, 16, 22, 22, 22, 22, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 29, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 29, 30, 25, 25, 25, 25, 26, 26, 35, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 14, 15, 15, 15, 15, 15, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 31, 22, 22, 22, 22, 22, 16, 16, 16, 16, 16, 16, 29, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 31, 22, 22, 22, 22, 22, 22, 22, 22, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 29, 30, 30, 30, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 29, 30, 30, 30, 25, 25, 25, 25, 25, 33, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 29, 30, 30, 30, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 30, 31, 16, 16, 16, 16, 16, 29, 30, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 30, 31, 22, 22, 22, 22, 22, 22, 18, 18, 18, 18, 18, 18, 18, 29, 30, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 31, 16, 16, 16, 16, 16, 15, 15, 15, 16, 16, 16, 16, 29, 30, 25, 25, 25, 25, 25, 25, 26, 26, 33, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 13, 15, 15, 15, 29, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 30, 30, 30, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 31, 22, 22, 22, 22, 22, 22, 22, 18, 18, 18, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 31, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 29, 25, 25, 25, 25, 25, 25, 25, 33, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 29, 30, 25, 25, 25, 25, 26, 26, 26, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 25, 25, 25, 25, 25, 25, 25, 25, 30, 30, 30, 31, 22, 19, 22, 18, 18, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 34, 26, 25, 25, 25, 25, 25, 25, 33, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 29, 30, 25, 25, 25, 25, 26, 33, 18, 18, 18, 27, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 33, 16, 16, 16, 16, 16, 16, 27, 26, 26, 26, 25, 25, 25, 25, 25, 25, 25, 25, 30, 30, 30, 30, 30, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 30, 35, 16, 16, 16, 16, 16, 16, 16, 16, 16, 27, 25, 25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 29, 30, 25, 25, 25, 25, 26, 33, 18, 18, 18, 18, 18, 18, 27, 26, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 33, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 27, 26, 26, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 33, 17, 17, 17, 17, 27, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 33, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 27, 25, 25, 25, 25, 30, 30, 31, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 29, 25, 25, 25, 25, 25, 33, 22, 22, 22, 18, 18, 18, 18, 18, 18, 18, 27, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 33, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 27, 26, 26, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 33, 17, 17, 17, 17, 17, 17, 28, 25, 25, 25,
                25, 25, 25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25, 25, 25, 25, 31, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 34, 25, 25, 25, 25, 25, 33, 18, 22, 13, 22, 18, 18, 18, 18, 18, 18, 18, 18, 27, 25, 25, 26, 26, 26, 25, 26, 26, 26, 25, 25, 33, 21, 21, 21, 21, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 27, 26, 26, 26, 26, 25, 25, 25, 25, 25, 25, 33, 17, 17, 17, 17, 17, 17, 17, 28, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 31, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 34, 26, 26, 25, 25, 25, 25, 25, 26, 35, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 28, 25, 25, 25, 33, 18, 18, 22, 22, 22, 21, 21, 18, 18, 18, 18, 18, 18, 18, 27, 33, 21, 21, 21, 36, 21, 21, 21, 27, 33, 21, 21, 21, 21, 21, 21, 21, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 22, 19, 22, 28, 25, 25, 25, 25, 33, 17, 17, 17, 17, 17, 17, 17, 17, 28, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 27, 26, 26, 26, 33, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 28, 25, 25, 32, 18, 18, 18, 18, 18, 18, 18, 21, 21, 18, 18, 18, 18, 21, 21, 21, 21, 21, 21, 29, 25, 30, 31, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 22, 22, 22, 27, 26, 25, 25, 33, 16, 16, 16, 16, 17, 17, 17, 17, 17, 28, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 30, 35, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 28, 25, 25, 25, 35, 18, 18, 18, 18, 21, 21, 21, 21, 18, 18, 18, 21, 21, 21, 21, 21, 18, 18, 28, 25, 25, 32, 18, 18, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 17, 17, 17, 17, 17, 17, 27, 33, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 26, 33, 15, 15, 16, 16, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 29, 25, 25, 25, 32, 18, 18, 18, 18, 21, 21, 21, 21, 18, 18, 18, 18, 18, 21, 21, 21, 18, 18, 29, 25, 25, 25, 25, 31, 18, 18, 18, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25,
                25, 25, 25, 25, 25, 33, 15, 15, 15, 15, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 29, 25, 25, 25, 25, 25, 31, 18, 18, 21, 21, 21, 21, 21, 21, 18, 18, 18, 18, 18, 21, 18, 18, 34, 25, 25, 25, 25, 25, 25, 31, 18, 18, 18, 18, 21, 21, 21, 21, 21, 21, 21, 21, 21, 16, 16, 16, 16, 16, 16, 16, 29, 30, 30, 31, 18, 18, 18, 18, 18, 18, 17, 17, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25,
                25, 25, 25, 25, 33, 15, 15, 15, 15, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 17, 17, 17, 34, 25, 25, 25, 25, 25, 25, 32, 18, 18, 18, 21, 21, 21, 21, 21, 21, 18, 18, 18, 18, 17, 17, 18, 18, 28, 25, 25, 25, 25, 25, 25, 30, 31, 18, 18, 18, 21, 21, 21, 21, 21, 21, 21, 21, 16, 16, 16, 16, 16, 29, 30, 25, 25, 25, 25, 35, 18, 18, 18, 18, 18, 18, 18, 17, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25,
                25, 25, 25, 32, 15, 15, 15, 15, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 17, 17, 17, 27, 25, 25, 25, 25, 25, 25, 31, 18, 18, 21, 21, 21, 21, 21, 21, 18, 18, 18, 17, 17, 18, 18, 18, 28, 25, 25, 25, 25, 25, 25, 25, 25, 31, 18, 18, 18, 18, 21, 21, 21, 21, 21, 16, 16, 16, 16, 34, 30, 25, 25, 25, 26, 26, 33, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25,
                25, 25, 25, 32, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 22, 22, 22, 22, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 17, 17, 17, 28, 25, 25, 25, 25, 25, 32, 18, 18, 21, 21, 21, 21, 21, 18, 18, 18, 17, 17, 17, 18, 18, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 18, 18, 18, 18, 17, 17, 17, 17, 17, 16, 16, 16, 16, 27, 26, 26, 33, 18, 18, 18, 18, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 29, 25, 25, 25, 25,
                25, 25, 25, 32, 15, 15, 15, 16, 16, 16, 16, 16, 16, 22, 22, 22, 22, 22, 22, 22, 16, 16, 16, 16, 16, 18, 18, 18, 18, 15, 15, 15, 15, 19, 18, 18, 16, 16, 16, 17, 17, 17, 17, 28, 25, 25, 25, 25, 25, 32, 18, 18, 18, 21, 21, 21, 18, 18, 18, 17, 17, 17, 17, 18, 18, 27, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 35, 18, 18, 17, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 29, 30, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 15, 15, 15, 15, 16, 16, 16, 16, 22, 22, 22, 22, 22, 22, 22, 22, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 18, 18, 18, 17, 17, 17, 17, 17, 17, 17, 17, 28, 25, 25, 25, 25, 25, 25, 31, 18, 18, 21, 21, 18, 18, 18, 17, 17, 17, 17, 17, 17, 18, 18, 28, 25, 25, 25, 25, 25, 25, 25, 25, 25, 32, 18, 18, 18, 17, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 18, 18, 21, 21, 21, 16, 16, 16, 16, 29, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 15, 15, 15, 16, 16, 16, 16, 16, 16, 22, 22, 22, 22, 22, 22, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 18, 18, 18, 17, 17, 17, 17, 17, 17, 17, 17, 29, 25, 25, 25, 25, 25, 25, 25, 33, 18, 18, 22, 18, 18, 18, 18, 18, 18, 17, 18, 18, 18, 18, 18, 28, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 18, 18, 17, 17, 17, 17, 17, 17, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 18, 21, 21, 21, 21, 21, 21, 16, 16, 34, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 22, 22, 22, 22, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 18, 18, 18, 18, 17, 17, 17, 17, 17, 17, 29, 25, 25, 25, 25, 25, 25, 25, 32, 18, 18, 22, 22, 18, 18, 18, 18, 18, 15, 15, 15, 18, 18, 18, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 35, 18, 18, 17, 17, 17, 17, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 21, 21, 21, 21, 21, 21, 21, 21, 16, 16, 27, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 29, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 18, 18, 22, 22, 18, 18, 18, 15, 15, 15, 18, 18, 18, 34, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 32, 18, 18, 18, 17, 17, 17, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 21, 21, 21, 21, 21, 21, 21, 21, 16, 16, 16, 16, 28, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 34, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 18, 18, 22, 22, 18, 18, 18, 15, 15, 15, 18, 18, 18, 28, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 18, 18, 18, 17, 17, 17, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 21, 21, 21, 21, 21, 21, 16, 16, 16, 16, 16, 27, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 31, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 27, 26, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 32, 18, 18, 22, 22, 22, 22, 18, 18, 15, 15, 15, 18, 18, 28, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 18, 18, 18, 17, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 21, 21, 21, 21, 16, 16, 16, 16, 16, 16, 16, 27, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 31, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 27, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 18, 18, 22, 22, 22, 22, 22, 22, 18, 18, 18, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 18, 18, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 15, 15, 15, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 27, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 30, 31, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 28, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 18, 18, 18, 22, 22, 18, 18, 18, 29, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 30, 31, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 15, 15, 15, 15, 15, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 30, 31, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 31, 18, 18, 18, 18, 29, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 31, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 15, 15, 15, 15, 15, 15, 15, 15, 15, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 17, 17, 17, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 29, 25, 25, 26, 26, 26, 26, 26, 26, 26, 25, 25, 25, 25, 25, 25, 25, 30, 30, 30, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 31, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 15, 15, 15, 16, 16, 16, 16, 16, 15, 15, 15, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 29, 30, 25, 26, 33, 15, 15, 15, 15, 15, 15, 15, 28, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 12, 35, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 34, 30, 30, 25, 25, 33, 15, 15, 15, 15, 15, 15, 15, 29, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 33, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 16, 16, 29, 30, 30, 30, 31, 16, 16, 15, 15, 15, 15, 18, 18, 18, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 31, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 27, 26, 26, 33, 15, 15, 15, 15, 15, 15, 15, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 16, 16, 29, 25, 26, 26, 26, 25, 31, 16, 16, 15, 15, 15, 18, 18, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 16, 16, 29, 25, 32, 15, 15, 15, 27, 26, 35, 16, 16, 15, 15, 18, 18, 18, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 30, 31, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 29, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 30, 35, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 16, 16, 28, 25, 32, 15, 14, 15, 21, 21, 21, 16, 16, 15, 15, 18, 18, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 33, 18, 18, 18, 18, 18, 18, 27, 26, 30, 30, 30, 30, 30, 30, 31, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 34, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 27, 25, 32, 15, 15, 15, 29, 30, 35, 16, 16, 15, 15, 18, 18, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 33, 18, 18, 18, 16, 16, 16, 16, 16, 16, 27, 26, 26, 25, 25, 25, 25, 30, 35, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 27, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 25, 25, 25, 25, 25, 25, 25, 31, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 27, 25, 30, 30, 30, 25, 33, 16, 16, 15, 15, 18, 18, 16, 16, 16, 16, 16, 16, 16, 29, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 33, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 27, 25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 27, 26, 26, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 33, 18, 18, 18, 18, 18, 18, 18, 18, 27, 26, 25, 25, 25, 25, 25, 25, 31, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 27, 26, 26, 26, 33, 16, 16, 16, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 29, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 33, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 27, 26, 26, 25, 30, 31, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 27, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 33, 18, 18, 18, 18, 18, 21, 21, 21, 21, 21, 21, 21, 27, 25, 25, 25, 25, 25, 25, 30, 35, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 33, 18, 18, 18, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 27, 26, 25, 35, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 27, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 33, 21, 21, 21, 21, 21, 21, 21, 21, 18, 18, 18, 18, 21, 21, 27, 25, 25, 25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 34, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 33, 18, 18, 18, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 36, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 16, 16, 15, 15, 15, 15, 15, 27, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 33, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 21, 21, 28, 25, 25, 25, 25, 25, 31, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 27, 26, 25, 25, 25, 25,
                25, 25, 25, 32, 18, 18, 18, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 15, 15, 15, 23, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 16, 16, 16, 16, 15, 15, 15, 15, 15, 28, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 33, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 21, 21, 21, 21, 21, 21, 18, 18, 18, 18, 18, 18, 21, 27, 26, 25, 25, 25, 25, 25, 30, 35, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 28, 25, 25, 25,
                25, 25, 25, 32, 18, 18, 18, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 27, 31, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 27, 25, 25, 25, 25, 25, 25, 25, 25, 26, 33, 18, 18, 18, 18, 18, 18, 18, 18, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 18, 18, 18, 21, 18, 18, 28, 25, 25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 17, 17, 17, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 28, 25, 25, 25,
                25, 25, 25, 32, 18, 18, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 27, 35, 16, 16, 16, 16, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 28, 25, 25, 25, 25, 25, 25, 33, 18, 18, 18, 18, 18, 18, 18, 18, 18, 21, 21, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 21, 21, 18, 18, 21, 18, 18, 27, 25, 25, 25, 25, 25, 31, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 17, 17, 17, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 28, 25, 25, 25,
                25, 25, 25, 32, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 16, 16, 16, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 28, 25, 25, 25, 25, 25, 32, 18, 18, 18, 18, 18, 18, 18, 18, 18, 21, 21, 18, 18, 18, 18, 21, 21, 21, 21, 21, 21, 21, 21, 18, 18, 21, 18, 18, 21, 18, 18, 18, 27, 25, 25, 25, 25, 25, 30, 31, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 17, 17, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 28, 25, 25, 25,
                25, 25, 25, 32, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 18, 15, 15, 15, 15, 15, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 28, 25, 25, 25, 25, 25, 25, 31, 18, 18, 18, 18, 18, 18, 18, 18, 21, 18, 18, 18, 18, 18, 18, 18, 18, 18, 21, 21, 21, 18, 18, 18, 21, 21, 18, 21, 18, 18, 18, 18, 28, 25, 25, 25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 17, 17, 16, 16, 16, 16, 16, 15, 15, 15, 15, 28, 25, 25, 25,
                25, 25, 25, 32, 16, 16, 16, 16, 16, 15, 15, 15, 15, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 29, 25, 25, 25, 25, 25, 25, 25, 25, 12, 35, 17, 17, 21, 21, 21, 21, 21, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 21, 18, 18, 18, 18, 18, 21, 21, 21, 21, 18, 18, 18, 27, 25, 25, 25, 25, 25, 25, 31, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 17, 17, 17, 16, 16, 16, 16, 16, 15, 15, 29, 25, 25, 25, 25,
                25, 25, 25, 32, 16, 16, 16, 16, 16, 15, 15, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 15, 15, 15, 15, 15, 15, 15, 15, 29, 30, 25, 25, 25, 25, 25, 26, 26, 26, 33, 17, 17, 17, 17, 17, 18, 18, 18, 21, 21, 18, 18, 18, 18, 18, 18, 18, 18, 18, 21, 18, 18, 18, 18, 18, 18, 18, 18, 16, 18, 18, 18, 18, 28, 25, 25, 25, 25, 25, 25, 31, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 29, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 30, 31, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 21, 21, 21, 21, 21, 21, 21, 18, 18, 18, 18, 18, 18, 18, 15, 15, 15, 15, 29, 30, 25, 25, 25, 25, 25, 25, 33, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 21, 21, 21, 21, 21, 18, 18, 18, 18, 18, 21, 18, 18, 18, 18, 18, 18, 18, 16, 16, 16, 18, 18, 18, 27, 25, 25, 25, 25, 25, 25, 25, 30, 30, 31, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 35, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 16, 16, 18, 18, 18, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 18, 18, 18, 18, 18, 29, 30, 30, 30, 30, 25, 25, 25, 25, 25, 25, 26, 33, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 21, 21, 21, 21, 21, 21, 21, 16, 16, 16, 16, 16, 18, 18, 18, 28, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 31, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 26, 33, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 18, 18, 18, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 33, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 15, 15, 15, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 18, 18, 28, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 29, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 21, 21, 21, 21, 21, 21, 21, 21, 21, 14, 21, 21, 21, 21, 21, 18, 18, 29, 30, 25, 26, 26, 26, 26, 26, 26, 26, 26, 33, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 16, 16, 16, 15, 15, 15, 15, 34, 12, 30, 31, 18, 18, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 18, 18, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 35, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 16, 16, 16, 34, 30, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 29, 30, 30, 25, 26, 33, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 28, 26, 35, 22, 22, 22, 22, 22, 18, 18, 18, 18, 16, 16, 18, 18, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 16, 16, 16, 27, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 31, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 29, 30, 30, 25, 25, 26, 33, 16, 16, 16, 16, 16, 16, 16, 34, 12, 12, 12, 12, 12, 35, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 23, 22, 22, 22, 22, 22, 15, 15, 15, 15, 18, 18, 18, 16, 34, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 16, 16, 16, 16, 16, 28, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 30, 30, 30, 31, 16, 16, 16, 16, 16, 16, 16, 16, 16, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 34, 30, 25, 25, 25, 25, 33, 16, 16, 16, 16, 34, 12, 12, 31, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 34, 33, 22, 22, 22, 22, 15, 15, 15, 15, 15, 15, 18, 18, 15, 15, 27, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 16, 16, 16, 16, 16, 29, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 30, 30, 12, 12, 35, 16, 16, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 28, 25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 16, 27, 12, 12, 12, 12, 12, 12, 35, 17, 17, 17, 17, 17, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 29, 30, 30, 35, 22, 22, 22, 22, 22, 15, 15, 15, 15, 15, 15, 18, 18, 18, 18, 15, 15, 28, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 31, 16, 16, 16, 16, 17, 17, 17, 17, 16, 16, 16, 16, 16, 34, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 33, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 34, 12, 30, 25, 25, 25, 25, 26, 12, 35, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 29, 30, 30, 30, 25, 25, 32, 22, 22, 22, 22, 22, 15, 15, 15, 15, 15, 15, 18, 18, 18, 18, 18, 15, 34, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 33, 16, 16, 27, 31, 16, 16, 16, 16, 17, 17, 17, 17, 16, 16, 16, 16, 16, 28, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 26, 33, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 27, 26, 26, 26, 33, 16, 16, 16, 16, 16, 16, 16, 16, 29, 30, 30, 31, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 16, 16, 16, 16, 16, 29, 30, 30, 30, 25, 25, 25, 25, 25, 25, 25, 35, 22, 22, 22, 15, 15, 15, 15, 15, 15, 15, 16, 16, 18, 18, 15, 15, 15, 27, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 33, 16, 16, 16, 16, 36, 16, 16, 16, 16, 16, 17, 17, 16, 16, 16, 16, 16, 29, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 32, 21, 21, 21, 21, 21, 21, 17, 17, 17, 17, 17, 17, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 16, 16, 16, 16, 16, 34, 12, 12, 12, 12, 12, 12, 12, 26, 25, 25, 25, 35, 16, 16, 16, 16, 18, 18, 18, 16, 16, 16, 16, 16, 29, 30, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 33, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 18, 18, 15, 15, 15, 27, 25, 25, 25, 25, 25, 25, 25, 25, 32, 16, 16, 16, 16, 16, 27, 31, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 35, 21, 21, 21, 17, 17, 17, 17, 16, 16, 16, 16, 16, 21, 21, 21, 21, 21, 21, 21, 21, 21, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 27, 25, 33, 16, 16, 16, 18, 18, 16, 16, 16, 16, 16, 16, 16, 29, 25, 25, 25, 25, 25, 26, 26, 26, 26, 33, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 18, 18, 18, 15, 15, 27, 25, 25, 25, 25, 25, 25, 25, 25, 30, 35, 16, 16, 16, 16, 27, 31, 16, 16, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 33, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 21, 21, 21, 21, 21, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 23, 16, 16, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 29, 25, 25, 25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 15, 15, 28, 25, 25, 25, 25, 25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 27, 31, 16, 16, 16, 16, 16, 16, 16, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 33, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 21, 21, 21, 21, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 29, 30, 25, 31, 18, 18, 16, 16, 16, 16, 15, 15, 15, 15, 29, 25, 25, 25, 25, 25, 25, 25, 30, 35, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 18, 18, 15, 15, 15, 27, 25, 25, 25, 25, 25, 25, 25, 33, 16, 16, 22, 16, 16, 16, 16, 23, 16, 16, 16, 16, 16, 16, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 21, 21, 21, 21, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 29, 30, 25, 25, 25, 25, 30, 30, 35, 15, 15, 15, 15, 15, 15, 29, 25, 25, 25, 25, 25, 25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,  2,  2, 15,  2,  2, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 15, 15, 15, 27, 25, 25, 25, 25, 25, 32, 16, 16, 22, 22, 22, 16, 16, 16, 28, 31, 16, 16, 16, 16, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 17, 17, 17, 17, 17, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 21, 21, 21, 21, 21, 16, 16, 16, 16, 16, 16, 16, 34, 12, 30, 25, 25, 25, 26, 26, 26, 26, 33, 15, 15, 15, 15, 15, 15, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 16, 16, 16, 16, 16, 16, 16, 16, 16,  2, 15, 15, 15,  2, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 15, 15, 15, 27, 25, 25, 25, 25, 32, 16, 16, 16, 22, 22, 22, 16, 16, 27, 32, 16, 16, 16, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 21, 21, 21, 21, 21, 21, 21, 16, 16, 16, 16, 16, 16, 18, 18, 27, 25, 25, 33, 18, 18, 18, 18, 18, 15, 15, 15, 15, 15, 15, 28, 26, 26, 26, 26, 25, 25, 25, 25, 25, 25, 25, 30, 31, 16, 16, 16, 16, 16, 16, 16,  2, 15, 14, 15,  2, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 17, 17, 17, 27, 25, 25, 25, 25, 31, 16, 16, 16, 22, 22, 16, 16, 16, 27, 30, 30, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 21, 21, 21, 21, 21, 21, 21, 21, 16, 16, 16, 16, 16, 18, 18, 18, 27, 33, 18, 18, 18, 18, 16, 16, 15, 15, 15, 15, 15, 29, 33, 15, 15, 15, 15, 27, 26, 26, 26, 26, 25, 25, 25, 25, 30, 31, 16, 16, 16, 16, 16,  2, 15, 15, 15,  2, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 17, 17, 17, 17, 17, 27, 25, 25, 25, 32, 16, 16, 15, 15, 15, 15, 16, 16, 16, 27, 26, 26, 26, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 21, 21, 21, 21, 21, 21, 21, 21, 17, 17, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 15, 15, 15, 15, 23, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 27, 26, 26, 26, 26, 26, 35, 16, 16, 16, 16,  2,  2,  2,  2,  2, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 17, 17, 17, 17, 17, 17, 28, 25, 25, 25, 31, 16, 16, 15, 15, 15, 17, 17, 17, 17, 15, 15, 15, 27, 26, 26, 26, 26, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 32, 17, 17, 17, 17, 17, 17, 17, 18, 18, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 21, 21, 21, 21, 21, 17, 17, 17, 17, 17, 17, 16, 16, 16, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 15, 15, 15, 29, 33, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 17, 17, 17, 17, 17, 17, 29, 25, 25, 25, 25, 25, 30, 31, 15, 15, 17, 17, 17, 17, 17, 17, 17, 15, 15, 15, 15, 15, 15, 27, 26, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 31, 17, 17, 17, 17, 17, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 21, 21, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 29, 30, 33, 16, 16, 16, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 17, 17, 17, 17, 17, 34, 25, 25, 25, 25, 25, 25, 25, 25, 35, 17, 17, 17, 18, 18, 18, 18, 18, 17, 17, 17, 15, 15, 15, 15, 15, 28, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 30, 31, 17, 17, 17, 18, 18, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 18, 18, 18, 18, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 29, 25, 33, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 17, 17, 17, 17, 17, 17, 17, 27, 25, 25, 25, 25, 25, 25, 33, 17, 17, 17, 18, 18, 18, 16, 16, 18, 18, 18, 17, 17, 15, 15, 15, 15, 28, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 30, 35, 17, 17, 18, 18, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 29, 25, 32, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 17, 17, 17, 17, 17, 17, 17, 17, 17, 28, 25, 25, 25, 25, 33, 17, 17, 17, 18, 18, 18, 16, 16, 16, 16, 18, 18, 17, 17, 17, 15, 29, 30, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 33, 17, 17, 17, 17, 18, 18, 18, 15, 15, 15, 15, 15, 15, 15, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 29, 25, 25, 32, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 22, 22, 22, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 22, 22, 22, 22, 22, 17, 17, 17, 17, 17, 17, 34, 30, 25, 25, 25, 25, 32, 17, 17, 17, 18, 18, 18, 16, 16, 16, 20, 16, 16, 18, 18, 15, 15, 34, 26, 26, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 32, 17, 17, 17, 17, 17, 18, 18, 15, 15, 15, 15, 15, 15, 15, 15, 15, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 25, 35, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 22, 22, 22, 22, 22, 22, 22, 22, 18, 18, 18, 18, 18, 18, 18, 22, 22, 22, 22, 22, 22, 22, 17, 17, 17, 17, 17, 17, 28, 25, 25, 25, 25, 25, 31, 17, 17, 17, 18, 18, 16, 16, 16, 16, 16, 18, 18, 18, 18, 15, 15, 15, 15, 28, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 31, 17, 17, 17, 17, 18, 18, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 28, 25, 25, 32, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 22, 22, 22, 22, 22, 22, 22, 22, 22, 18, 18, 18, 18, 18, 22, 22, 22, 22, 22, 22, 22, 22, 22, 17, 17, 17, 17, 29, 25, 25, 25, 25, 25, 25, 25, 31, 17, 17, 17, 18, 18, 16, 16, 16, 16, 18, 18, 17, 17, 17, 15, 15, 15, 28, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 31, 17, 17, 17, 17, 17, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 29, 25, 25, 25, 25, 31, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 18, 18, 18, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 17, 17, 29, 25, 25, 25, 25, 25, 25, 25, 25, 32, 17, 17, 17, 18, 18, 18, 16, 18, 18, 18, 17, 17, 17, 15, 15, 15, 29, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 35, 17, 17, 17, 17, 15, 15, 15, 15, 15, 15, 15, 15, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 16, 16, 29, 25, 25, 25, 25, 25, 32, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 17, 17, 17, 18, 18, 16, 18, 18, 17, 17, 17, 15, 15, 15, 29, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 32, 17, 17, 17, 17, 17, 17, 15, 15, 15, 15, 15, 15, 17, 17, 17, 17, 29, 30, 31, 18, 18, 18, 18, 18, 18, 18, 18, 16, 16, 16, 16, 16, 16, 16, 29, 25, 25, 25, 25, 25, 25, 25, 31, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 16, 16, 16, 16, 16, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 29, 31, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 32, 17, 17, 17, 17, 17, 17, 17, 17, 17, 15, 15, 15, 15, 29, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 17, 17, 17, 17, 17, 17, 15, 15, 15, 15, 17, 17, 17, 17, 34, 25, 25, 25, 35, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 31, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 29, 25, 25, 31, 22, 22, 22, 22, 22, 22, 22, 22, 22, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 32, 17, 17, 17, 17, 17, 17, 22, 22, 22, 29, 30, 30, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 28, 26, 33, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 29, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 31, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 29, 25, 25, 25, 25, 30, 30, 31, 22, 22, 22, 22, 29, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 17, 17, 17, 17, 22, 22, 29, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 23, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 29, 30, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 31, 16, 16, 16, 16, 16, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 29, 25, 25, 25, 25, 25, 25, 25, 25, 30, 30, 30, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 17, 17, 22, 22, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 31, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 29, 25, 31, 17, 17, 17, 17, 17, 17, 17, 29, 30, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 30, 30, 31, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 32, 22, 22, 22, 22, 28, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 17, 17, 17, 17, 17, 17, 17, 29, 30, 25, 25, 25, 30, 30, 30, 30, 30, 30, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 31, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 29, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 32, 22, 22, 22, 29, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 30, 30, 30, 30, 30, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 30, 30, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25
            ]
        },

        "Tantegel1F": {
            type: "town",
            player_offset: [9, 29],
            player_start: [12, 6],
            width: 55,
            height: 45,
            map_links: [
                { offset_x: 29, map: "World", set_offsets: [35, 41] },
                { y: 5, map: "World", set_offsets: [35, 41] },
                { offset_y: 30, map: "World", set_offsets: [35, 41] },
                { offset_x: 6, offset_y: 7, map: "Tantegel2F" },
                { offset_x: 28, offset_y: 29, map: "TantegelB1" }
            ],
            music: "tantegel",
            layout: [
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  2,  2,  2,  2,  2,  2, 15, 15, 15, 15, 15, 15, 15, 15,  2,  2,  2,  2,  2,  2,  2, 15,  2,  2,  2, 15, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4,  4,  4,  4,  4,  2, 15, 16, 15, 16, 16, 15, 16, 15,  2,  4,  4,  4,  4,  4,  2, 15,  2,  4,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4,  4,  4,  4,  4,  2, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4,  4,  4,  4,  4,  2, 15,  2,  3,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4,  4,  2,  4,  4,  2,  2,  2,  2,  4,  4,  2,  2,  2,  2,  4,  4,  2,  4,  4,  2, 15, 15, 15, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2, 15, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4,  4,  4,  4,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  4,  4,  4,  4,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  2,  2,  2,  2,  4,  2,  4,  4,  4,  4,  4,  4,  4,  4,  2,  2,  2,  6,  2,  2,  2,  2,  2,  4,  2,  2,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4,  4,  4,  2,  4,  2,  8,  4,  4,  4,  4,  4,  2,  4,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4,  4,  4,  4,  4,  2,  4,  4,  4,  4,  4,  4,  4,  4,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4,  4,  4,  2,  4,  2,  2,  2,  4,  4,  4,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  4,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  2,  2,  2,  2,  4,  2, 16, 16,  4,  4,  4,  4, 16, 16,  2,  4,  4,  2,  4,  4,  2,  4,  4,  2,  4,  4,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4,  4,  4,  2,  4,  2, 16, 16,  4,  4,  4,  4, 16, 16,  2,  4,  4,  2,  4,  4,  2,  4,  4,  2,  4,  4,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4,  4,  4,  2,  4,  2, 16, 15,  4,  4,  4,  4, 15, 16,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  5,  4,  4,  6,  4,  2, 15, 15,  4,  4,  4,  4, 15, 15,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4,  5,  4,  2,  4,  2, 15, 15,  4,  4,  4,  4, 15, 15,  2,  4,  4,  2,  4,  4,  2,  4,  4,  2,  4,  4,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  5,  4,  5,  2,  4,  2, 15,  4,  4,  4,  4,  4,  4, 15,  2,  4,  4,  2,  4,  4,  2,  4,  4,  2,  4,  4,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  2,  2,  2,  2,  4,  2, 15,  4, 25, 25, 25, 25,  4, 15,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  2,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4,  4,  4,  4,  4,  4,  4,  4, 25,  9,  9, 25,  4,  4,  4,  4,  4,  4,  4,  4,  2,  4,  4,  4,  4,  4,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4,  4,  4,  4,  4,  4,  4,  4, 25,  9,  9, 25,  4,  4,  4,  4,  4,  4,  4,  4,  2,  9,  9,  9,  9,  9,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  2,  2,  4,  4,  2,  2,  2,  4, 25, 25, 25, 25,  4,  2,  2,  4,  4,  4,  4,  4,  2,  9,  9,  9,  9,  9,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4,  4,  4,  4,  4,  4,  2,  4,  4,  4,  4,  4,  4,  2,  4,  4,  4,  4,  4,  4,  2,  4,  4,  4,  4,  4,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4,  4,  4,  4,  4,  4,  2,  2,  4,  4,  4,  4,  2,  2,  2,  2,  2,  2,  4,  4,  2,  4,  4,  4,  4,  4,  2, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4,  4,  2,  4,  4,  4,  4,  2,  4,  4,  4,  4,  2,  4,  4,  4,  4,  4,  4,  4,  2,  2,  2,  2,  2,  2,  2, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4,  4,  4,  4,  4,  4,  4,  2,  4,  4,  4,  4,  2,  4,  4,  4,  4,  4,  4,  4,  2, 25, 25, 25, 25, 25, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4, 25, 25,  4,  4,  2,  4,  2,  4,  4,  4,  4,  2,  4,  4,  2,  2,  2,  2,  2,  2, 25, 25, 25, 25, 25, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 25, 25, 25, 25,  4,  4,  4,  2,  4,  4,  4,  4,  2,  4,  4,  2,  4,  4,  2,  4,  2, 25, 25, 25, 25, 25, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 25, 25, 25, 25,  4,  4,  4,  2,  2,  4,  4,  2,  2,  4,  4,  4,  4,  4,  3,  4,  2, 25, 25, 25, 25, 25, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 25, 25, 25, 25, 25,  4,  4,  2,  4,  4,  4,  4,  2,  4,  4,  2,  4,  4,  2,  4,  2, 25, 25, 25, 25, 25, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 25, 25, 25, 25, 25, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15,  4,  4, 15, 15, 15, 15, 15, 15, 15, 15, 25, 25, 25, 25, 25, 25, 25, 25, 25,  7, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15
            ],
            doors: [
                { id: "tantegel_door1", x: 15, y: 19 },
                { id: "tantegel_door2", x: 29, y: 12 }
            ],
            chests: [
                { id: "tantegel_chest1", x: 12, y: 19, take: function () {
                    player.add_gold(Game.random_number(6, 13));
                }},
                { id: "tantegel_chest2", x: 13, y: 20, take: function () {
                    player.add_gold(Game.random_number(6, 13));
                }},
                { id: "tantegel_chest3", x: 12, y: 21, take:function () {
                    player.add_gold(Game.random_number(6, 13));
                }},
                { id: "tantegel_chest4", x: 14, y: 21, take: function () {
                    player.add_gold(Game.random_number(6, 13));
                }}
            ],
            npcs: [
                //two by stairs
                { type: "soldier", facing: "down", x: 19, y: 12, talk: function (script) {
                    script.text("tantegel_soldier4");
                }},
                { type: "soldier", facing: "up", x: 19, y: 14, talk: function (script) {
                    script.text("tantegel_soldier5");
                }},
                { type: "townsman", facing: "down", x: 22, y: 17, wanders: true, talk: function (script) {
                    script.text("tantegel_man1");
                }},
                { type: "townswoman", facing: "down", x: 19, y: 19, wanders: true, talk: function (script) {
                    //TODO: conditional if player rescues princess
                    script.text("tantegel_woman1");
                }},
                //guy by chest
                { type: "soldier", facing: "down", x: 13, y: 18, talk: function (script) {
                    script.text("tantegel_soldier6");
                }},
                { type: "townsman", facing: "down", x: 13, y: 14, talk: function (script) {
                    script.text("tantegel_man2");
                }},
                //guy by locked door towards top right
                { type: "soldier", facing: "down", x: 30, y: 8, wanders: true, talk: function (script) {
                    script.text("tantegel_soldier7");
                }},
                //wandering old man, other side of door
                { type: "old_man", facing: "down", x: 27, y: 17, wanders: true, talk: function (script) {
                    script.text("tantagel_old_man2");
                } },
                //guards by old man that gives you MP
                { type: "soldier", facing: "right", x: 26, y: 26, talk: function (script) {
                    //TODO: conditional if player rescues princess
                    script.text("tantegel_soldier3");
                }},
                { type: "soldier", facing: "down", x: 29, y: 24, wanders: true, talk: function (script) {
                    script.text("tantegel_soldier2");
                }},
                //guy that gives you MP
                { type: "old_man", facing: "left", x: 31, y: 32, talk: function (script) {
                    script.text("tantagel_old_man1");
                    player.current_mp = player.max_mp;
                }},
                //front door guards
                { type: "soldier", facing: "right", x: 20, y: 33, talk: function (script) {
                    script.text("tantegel_soldier1");
                }},
                { type: "soldier", facing: "left", x: 23, y: 33, talk: function (script) {
                    script.text("tantegel_soldier1");
                }},
                //merchants near entrance
                { type: "merchant", facing: "down", x: 17, y: 31, wanders: true, talk: function (script) {
                    script.text("tantegel_merchant2");
                }},
                { type: "merchant", facing: "down", x: 15, y: 27, wanders: true, talk: function (script) {
                    script.text("tantegel_merchant1");
                }},
                //guy that sells keys
                { type: "merchant", facing: "down", x: 35, y: 7 },
                { type: "soldier_2", facing: "down", x: 36, y: 15, wanders: true, talk: function (script) {
                    script.text("tantegel_soldier9");
                }},
                { type: "townswoman", facing: "down", x: 38, y: 11, talk: function (script) {
                    script.text("tantegel_woman2");
                }},
                //by the barrier
                { type: "soldier", facing: "up", x: 37, y: 21, talk: function (script) {
                    script.text("tantegel_soldier8");
                }},
                { type: "soldier_2", facing: "up", x: 35, y: 27, wanders: true, talk: function (script) {
                    script.text("tantegel_soldier10");
                }}
            ]
        },

        "Tantegel2F": {
            type: "town",
            player_offset: [0, 0],
            player_start: [16, 11],
            width: 25,
            height: 15,
            map_links: [
                { x: 16, y: 11, map: "Tantegel1F", set_offsets: [6, 7] }
            ],
            music: "tantegel",
            layout: [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 4, 4, 4, 4, 5, 4, 4, 2, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 3, 3, 3, 3, 3, 3, 4, 2, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 3, 4, 3, 3, 4, 3, 4, 2, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 4, 4, 5, 5, 4, 4, 4, 2, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 6, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 4, 4, 4, 4, 4, 4, 7, 2, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
            ],
            doors: [
                { id: "tantegel_throne_door1", x: 12, y: 10 }
            ],
            chests: [
                { id: "tantegel_throne_chest1", x: 12, y: 7, take: function () {
                    player.add_gold(120);
                }},
                { id: "tantegel_throne_chest2", x: 13, y: 7, take: function () {
                    player.add_item("torch");
                }},
                { id: "tantegel_throne_chest3", x: 14, y: 4, take: function () {
                    player.add_item("magic_key");
                }}
            ],
            npcs: [
                { type: "king", facing: "down", x: 11, y: 6, talk: function (script) {
                    script.text("tantegel_throne_king1");
                    //TODO: proper menu
                }},
                { type: "soldier", facing: "right", x: 11, y: 9, talk: function (script) {
                    //TODO: these are conditional
                    script.text("tantegel_throne_guard1");
                }},
                { type: "soldier", facing: "left", x: 13, y: 9, talk: function (script) {
                    //TODO: these are conditional
                    script.text("tantegel_throne_guard2");
                }},
                { type: "soldier", facing: "down", x: 15, y: 7 },
                { type: "princess", facing: "down", x: 14, y: 6 }
            ]
        },

        "TantegelB1": {
            type: "town",
            player_offset: [0, 0],
            player_start: [7, 6],
            width: 25,
            height: 15,
            map_links: [
                { x: 7, y: 6, map: "Tantegel1F", set_offsets: [28, 29] }
            ],
            music: "tantegel",
            layout: [
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 4, 4, 4, 4, 4, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 8, 4, 4, 2, 4, 4, 2, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 5, 4, 2, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 4, 4, 2, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 4, 4, 4, 4, 4, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
            ],
            npcs: [
                { type: "old_man", facing: "down", x: 11, y: 8, talk: function (script) {
                    //TODO: conditional if you've already collected OR not collected OR not collected + have erdricks token
                    script.text("tantegel_basement_old_man1");
                }}
            ]
        },

        "Brecconary": {
            type: "town",
            player_offset: [0, 15],
            player_start: [12, 6],
            width: 54,
            height: 44,
            map_links: [
                { x: 11, map: "World", set_offsets: [40, 39] },
                { x: 13, map: "World", set_offsets: [40, 39] },
                { offset_y: 0, map: "World", set_offsets: [40, 39] }
            ],
            music: "village",
            layout: [
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 21,  4,  4, 21,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 16, 16, 16, 15, 15, 15, 15, 16, 16, 16, 16, 21, 21,  4,  4, 21, 21, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 16, 16, 15, 15, 15, 15, 15, 15, 16, 15, 16, 15, 21,  4,  4, 21, 15, 15, 16,  2,  2,  2,  2,  2,  2,  2,  2, 16,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 16, 15,  2,  2,  2,  2,  2, 15, 15, 15, 15, 15, 15,  4,  4, 15, 15, 15, 16,  2,  4,  4,  2,  4, 25, 25,  2, 16,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 16, 15,  2,  4,  4,  4,  2, 15, 15, 15, 15, 15, 15,  4,  4, 21, 15, 15, 15,  2,  4,  4,  3,  4, 25, 25,  2, 16,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 16, 15,  2,  4,  3,  4,  2, 15, 15, 15, 15, 15, 15,  4,  4, 21, 15, 16, 15,  2,  4,  4,  2,  4, 25, 25,  2, 16,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 16, 15,  2,  2,  4,  2,  2, 15, 15, 21, 21, 15, 15,  4,  4, 21, 21, 16, 15,  2,  6,  2,  2,  2,  2,  2,  2, 15,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 16, 15, 15, 15,  4, 10, 15, 15, 21, 21, 21, 21, 15,  4,  4, 21, 15, 16, 15, 15, 15, 15, 16, 15, 15, 16, 15, 15,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 16, 16, 15, 15,  4, 15, 15, 21, 21, 16, 21, 21, 15,  4,  4, 21, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 15,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 16, 15, 15, 15,  4, 15, 15, 21, 16, 16, 16, 21, 21,  4,  4, 15, 15,  2,  2,  2,  2,  2,  2,  2,  2,  2, 16, 15,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 16, 15, 15, 15,  4, 15, 21, 21, 21, 16, 16, 16, 21,  4,  4, 15, 15,  2,  4,  4,  4,  2,  4,  4,  4,  2, 15, 15,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 15, 15, 15, 15,  4, 15, 21, 21, 16, 16, 16, 21, 15,  4,  4, 15, 15,  2,  4,  4,  4,  2,  4,  4,  4,  2, 15, 15,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 16, 16, 15, 15,  4, 15, 15, 21, 21, 21, 21, 21, 15,  4,  4, 15, 15,  2,  2,  4,  2,  2,  2,  4,  2,  2, 15, 16,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 15, 15, 15,  4, 15, 15, 15, 15, 21, 21, 15, 15,  4,  4, 15, 15, 15, 15,  4, 15, 15, 15,  4, 15, 15, 15, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 15, 15, 15, 15, 15, 15,  4, 15, 15, 15, 15, 16, 15,  4, 15, 15, 15, 16, 15, 15, 15, 15, 15, 25, 25, 25, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 16, 16, 15, 15, 15, 15, 15,  4, 15, 15, 15, 16, 16, 15,  4, 15, 16, 16, 16, 16, 15, 25, 25, 25, 25, 25, 25, 25, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 16, 15, 15, 15, 15, 15, 15,  4, 15, 15, 16, 16, 15, 15,  4, 16, 16, 16, 15, 15, 25, 25, 25, 25, 25, 25, 25, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 15, 15, 15, 15, 15,  2, 11,  4,  2, 15, 15, 15, 15, 15,  4, 15, 16, 15, 15, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 15,  2,  2,  2,  2,  2,  2,  4,  2,  2,  2, 15, 15, 15,  4, 16, 15, 15, 25, 25, 25, 25, 15, 15, 25, 25, 25, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 15,  2,  4,  4,  2,  4,  4,  4,  3,  4,  2, 15, 15, 15,  4, 15, 15, 25, 25, 15, 15, 15, 15, 15, 15, 15, 25, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 15,  2,  4,  4,  2,  4,  2,  2,  2,  2,  2, 15, 16, 15,  4,  4,  4, 23, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 15,  2,  4,  4,  6,  4,  4,  4,  4,  4,  2, 15, 16, 15, 15, 15, 15, 25, 15, 15,  2,  4,  2,  2,  2,  2, 16, 15, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 15,  2,  4,  2,  2,  4,  2,  2,  4,  4,  2, 15, 16, 16, 15, 15, 25, 25, 15, 15,  2,  4,  4,  2,  4,  2, 16, 15, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 15,  2,  4,  4,  2,  4,  4,  2,  4,  4,  2, 16, 16, 16, 16, 15, 25, 25, 25, 15,  2,  4,  4,  3,  4,  2, 15, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 15,  2,  4,  4,  2,  4,  4,  2,  4,  4,  2, 15, 16, 16, 15, 15, 25, 25, 15, 15,  2,  4,  4,  2,  4,  2, 15, 16, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 15,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 15, 16, 15, 15, 25, 25, 25, 25, 15,  2,  2,  2,  2,  2,  2, 16, 16, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 25, 25, 25, 25, 15, 15, 15, 15, 15, 25, 25, 16, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15
            ],
            doors: [
                { id: "brecconary_door1", x: 17, y: 30 },
                { id: "brecconary_door2", x: 33, y: 13 }
            ],
            npcs: [
                //greeter
                { type: "townsman", facing: "down", x: 13, y: 20, talk: function (script) {
                    script.text("brecconary_man2");
                }},
                //inkeeper
                { type: "merchant", facing: "left", x: 22, y: 28, talk: function (script) {
                    script.text("innkeeper1");
                    //TODO: menu
                }},
                { type: "soldier", facing: "up", x: 22, y: 33, talk: function (script) {
                    script.text("brecconary_soldier4");
                }},
                { type: "soldier_2", facing: "down", x: 15, y: 33, wanders: true, talk: function (script) {
                    script.text("brecconary_soldier1");
                }},
                //armor/weapons store
                { type: "townswoman", facing: "down", x: 16, y: 14, talk: function (script) {
                    script.text("brecconary_woman1");
                }},
                { type: "merchant", facing: "down", x: 17, y: 11 },
                //wandering people
                { type: "old_man", facing: "down", x: 23, y: 12, wanders: true, talk: function (script) {
                    script.text("brecconary_old_man1");
                }},
                { type: "soldier_2", facing: "up", x: 24, y: 28, wanders: true, talk: function (script) {
                    script.text("brecconary_soldier2");
                }},
                { type: "townsman", facing: "down", x: 22, y: 21, wanders: true, talk: function (script) {
                    script.text("brecconary_man1");
                }},
                { type: "merchant", facing: "down", x: 29, y: 17, wanders: true, talk: function (script) {
                    script.text("save_us");
                }},
                { type: "soldier_2", facing: "down", x: 31, y: 26, wanders: true, talk: function (script) {
                    script.text("erdrick_proof");
                }},
                { type: "townswoman", facing: "up", x: 28, y: 32, wanders: true, talk: function (script) {
                    script.text("brecconary_woman2");
                }},
                { type: "soldier", facing: "down", x: 36, y: 21, talk: function (script) {
                    script.text("brecconary_soldier6");
                }},
                //item store
                { type: "merchant", facing: "left", x: 37, y: 32, wanders: true, talk: function (script) {
                    script.text("item_store1");
                    //TODO: menu
                }},
                { type: "townsman", facing: "left", x: 32, y: 31, wanders: true, talk: function (script) {
                    script.text("brecconary_man3");
                }},
                { type: "townsman", facing: "down", x: 37, y: 29, wanders: true, talk: function (script) {
                    script.text("brecconary_man4");
                }},
                //"there are keys" guy and curse removing old man
                { type: "townsman", facing: "down", x: 32, y: 17, talk: function (script) {
                    script.text("brecconary_man5");
                }},
                { type: "old_man", facing: "down", x: 36, y: 17, talk: function (script) {
                    //TODO: check for cursed item
                    script.text("brecconary_old_man2");
                }},
                //guy in the corner
                { type: "soldier_2", facing: "down", x: 40, y: 8, talk: function (script) {
                    script.text("brecconary_soldier5");
                }},
                //fairy water
                { type: "townswoman", facing: "left", x: 36, y: 11, wanders: true, talk: function (script) {
                    script.text("fairy_water1");
                    //TODO: menu
                }}
            ]
        },

        "Kol": {
            type: "town",
            player_offset: [19, 23],
            player_start: [12, 8],
            width: 48,
            height: 38,
            map_links: [
                { y: 9, map: "World", set_offsets: [96, 8] },
                { x: 11, map: "World", set_offsets: [96, 8] },
                { x: 13, map: "World", set_offsets: [96, 8] },
                { offset_y: 1, map: "World", set_offsets: [96, 8] }
            ],
            music: "village",
            layout: [
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,  2,  2,  2, 15, 16, 16, 16,  2,  2,  2,  2,  2, 16, 16, 16, 16, 16, 16, 16, 16,  2,  2,  2,  2, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,  2,  4,  2, 15, 15, 16, 16,  2,  4,  4,  4,  2, 16, 16, 16, 16, 16, 16,  2, 11,  2,  4,  4,  2, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,  2,  3,  2, 22, 15, 16, 16,  4,  4, 25,  4,  4, 21, 21, 21, 21, 21, 21,  4,  4,  4,  4,  4,  2, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 22,  4, 22, 22, 15, 16, 16,  2,  4,  4,  4,  2, 16, 21, 16, 16, 16, 16,  2,  3,  2,  2,  2,  2, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 22, 22, 22, 15, 15,  2,  2,  2,  2,  4,  2,  2, 16, 21, 16, 16, 16, 16,  2,  4,  2, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 22, 15, 15, 15,  2, 16, 16, 16, 16, 16, 16, 16, 21, 16, 16, 16, 16,  2,  2,  2, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 16,  2, 16, 16, 16, 16, 16, 16, 16, 21, 16, 16, 16, 16, 16, 16, 16, 16, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 16, 16,  2, 16, 16, 16, 16, 16, 16, 16, 21, 16, 16, 16, 16, 16, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,  2,  2,  2,  2,  2,  2, 16, 16, 16, 16, 21, 21, 21, 16, 16, 16, 15, 15, 15, 16, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,  2, 16, 16, 16, 21, 21, 21, 21, 21, 16, 16, 16, 15, 16, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,  2,  2,  2,  2,  2, 16, 16,  2, 16, 16, 21, 21, 21, 21, 21, 21, 21, 16,  2,  2,  2,  2,  2,  2, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,  2,  4,  4,  4,  2, 16, 16,  2, 16, 21, 21, 21, 21, 21, 21, 21, 21, 21,  2,  4,  4,  2,  4,  2, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,  2,  4,  4,  4,  2, 16, 21,  6, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,  4,  4,  4,  3,  4,  2, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,  2,  4,  4,  4,  2, 16, 21,  2, 16, 21, 21, 21, 21, 21, 21, 21, 21, 21,  2,  4,  4,  2,  4,  2, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,  2,  6,  2,  2,  2,  4, 21,  2, 16, 16, 21, 21, 21, 21, 21, 21, 21, 16,  2,  2,  2,  2,  2,  2, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,  2,  4,  2,  4,  4,  4,  4,  2, 16, 16, 16, 21, 21, 21, 21, 21, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,  2,  4,  2,  4,  2,  2,  2,  2,  2,  2,  2, 16, 21, 21, 21, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,  2,  4,  4,  4,  2,  4,  4,  4,  4,  4,  2, 16, 16, 21, 16, 16, 16, 16,  2,  2,  2,  2, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,  2,  4,  2,  4,  2,  4, 15,  4, 15,  4,  2, 16, 16, 21, 21, 21, 21, 21, 21, 21, 21,  2, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,  2,  4,  2,  4,  4,  4,  4,  4,  4,  4,  2, 16,  2,  2,  2,  2,  2, 16, 21, 21, 21,  2, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,  2,  4,  4,  4,  2,  4,  4,  4,  4,  4,  2,  2,  2,  4,  4,  5,  2, 16, 21, 21, 21,  2, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,  2,  2,  4,  2,  2,  4, 15,  4, 15,  4,  4,  4,  4,  3,  4,  5,  2, 16, 16, 21, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15,  2,  4,  4,  4,  4,  4,  2,  2,  2,  4,  4,  5,  2, 16, 16, 21, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15,  2,  2,  2,  2,  2,  2,  2, 16,  2,  2,  2,  2,  2, 16, 16, 21, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16
            ],
            doors: [
                { id: "kol_door1", x: 13, y: 22 },
                { id: "kol_door2", x: 19, y: 20 }
            ],
            npcs: [
                //entrance area / wandering people
                { type: "old_man", facing: "down", x: 32, y: 27, wanders: true, talk: function (script) {
                    script.text("kol_old_man3");
                }},
                { type: "townswoman", facing: "down", x: 23, y: 22, wanders: true, talk: function (script) {
                    script.text("save_us");
                }},
                { type: "old_man", facing: "left", x: 32, y: 17, wanders: true, talk: function (script) {
                    script.text("kol_old_man4");
                }},
                { type: "soldier_2", facing: "down", x: 32, y: 20, wanders: true, talk: function (script) {
                    script.text("kol_soldier3");
                }},
                { type: "townsman", facing: "down", x: 25, y: 20, wanders: true, talk: function (script) {
                    script.text("kol_man1");
                }},
                { type: "soldier", facing: "down", x: 23, y: 17, wanders: true, talk: function (script) {
                    script.text("kol_soldier2");
                }},
                //weapons
                { type: "merchant", facing: "left", x: 34, y: 20 },
                //by inn/spring
                { type: "townswoman", facing: "down", x: 24, y: 9, talk: function (script) {
                    script.text("kol_woman1");
                }},
                { type: "merchant", facing: "up", x: 31, y: 12 },
                //behind door
                { type: "townsman", facing: "right", x: 18, y: 20, wanders: true, talk: function (script) {
                    script.text("erdrick_proof");
                }},
                { type: "old_man", facing: "down", x: 14, y: 20, wanders: true, talk: function (script) {
                    script.text("kol_old_man1");
                    //TODO: yes/no menu
                }},
                { type: "merchant", facing: "down", x: 18, y: 26, wanders: true, talk: function (script) {
                    script.text("kol_merchant1");
                    //TODO: yes/no menu
                }},
                { type: "soldier", facing: "down", x: 13, y: 31, talk: function (script) {
                    script.text("kol_soldier1");
                }},
                { type: "merchant", facing: "left", x: 26, y: 29 },
                //old man in booth at top left
                { type: "old_man", facing: "down", x: 13, y: 9, talk: function (script) {
                    //TODO: conditional on armor
                    script.text("kol_old_man2");
                }}
            ]
        },

        "Garinham": {
            type: "town",
            player_offset: [0, 15],
            player_start: [12, 6],
            width: 44,
            height: 34,
            map_links: [
                { x: 11, map: "World", set_offsets: [0, 0], set_xy: [6, 6] },
                { x: 13, map: "World", set_offsets: [0, 0], set_xy: [6, 6] },
                { y: 8, map: "World", set_offsets: [0, 0], set_xy: [6, 6] },
                { offset_y: 0, map: "World", set_offsets: [0, 0], set_xy: [6, 6] },
                { offset_x: 19, offset_y: 1, map: "GarinhamsGraveB1" }
            ],
            music: "village",
            layout: [
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 25,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4, 25, 25,  2,  7, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 25,  2,  4, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,  4,  4, 23,  4,  4, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  2,  2,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 25,  2,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  2,  2,  2, 25, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4,  2,  2,  2,  2,  2,  4,  4,  4,  4,  4,  4, 25, 25, 25,  2, 25,  2,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4,  2,  4,  4,  4,  2,  4,  5,  5,  4,  4,  4,  2, 25, 25, 25, 25, 25,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4,  2,  2,  6,  2,  2,  4,  5,  4,  4,  4,  4,  2, 25,  2, 25,  2, 25,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  4,  4,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25,  2,  4,  4,  2,  4,  2, 16, 16, 16, 16, 16, 16, 16, 16,  2,  2,  6,  2,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25,  2,  4,  4,  3,  4,  2, 16, 16, 15,  4,  4,  4, 15, 16, 16, 16,  4, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  2,  4,  2,  2,  2,  2, 16, 15, 15,  4, 16,  4,  4,  4,  4,  4,  4,  4,  4, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  4, 15, 15, 15, 15, 15,  4,  4,  4,  4,  4, 15, 15,  4, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  4,  4,  4,  4,  4,  4,  4,  4,  4, 15,  4, 15, 15, 15, 11,  4,  2,  2,  2, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 15,  4, 15, 16, 15, 15, 15,  4, 10, 15, 15,  2,  4,  3,  4,  2,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,  2,  2,  2,  2,  4,  2, 16, 21,  2,  2,  4,  2,  2, 15,  2,  4,  2,  2,  2,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25,  2,  4,  4,  4,  2,  2, 21,  2,  4,  3,  4,  2, 15,  2,  4,  2,  4,  4,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25,  2,  2,  2,  2,  2, 25,  2,  2,  4,  4,  4,  2, 15,  2,  4,  4,  4,  4,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 25, 25, 25, 25, 25, 25, 25,  2,  2,  2,  2,  2, 15,  2,  2,  2,  2,  2,  2, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15
            ],
            doors: [
                { id: "garinham_door1", x: 16, y: 13 },
                { id: "garinham_door2", x: 29, y: 17 }
            ],
            npcs: [
                { type: "old_man", facing: "down", x: 14, y: 17, wanders: true, talk: function (script) {
                    script.text("garinham_old_man1");
                }},
                { type: "old_man", facing: "right", x: 14, y: 24, talk: function (script) {
                    script.text("garinham_old_man2");
                }},
                { type: "soldier_2", facing: "up", x: 19, y: 24, wanders: true, talk: function (script) {
                    script.text("garinham_soldier1");
                }},
                { type: "townsman", facing: "right", x: 30, y: 20, wanders: true, talk: function (script) {
                    script.text("garinham_man1");
                }},
                { type: "townswoman", facing: "down", x: 24, y: 20, wanders: true, talk: function (script) {
                    script.text("garinham_woman1");
                }},
                //merchants
                { type: "merchant", facing: "left", x: 17, y: 18 },
                { type: "merchant", facing: "up", x: 22, y: 25 },
                { type: "merchant", facing: "left", x: 29, y: 22 },
                //behind the door
                { type: "townswoman", facing: "down", x: 24, y: 11, wanders: true, talk: function (script) {
                    script.text("garinham_woman2");
                }},
                { type: "townsman", facing: "down", x: 22, y: 14, wanders: true, talk: function (script) {
                    script.text("garinham_man2");
                }},
                { type: "old_man", facing: "down", x: 24, y: 15, wanders: true, talk: function (script) {
                    script.text("garinham_old_man4");
                }},
                { type: "merchant", facing: "down", x: 21, y: 13, talk: function (script) {
                    script.text("garinham_merchant1");
                }},
                //behind door #2
                { type: "soldier", facing: "right", x: 15, y: 12, talk: function (script) {
                    script.text("garinham_soldier2");
                }},
                { type: "soldier", facing: "left", x: 17, y: 12, talk: function (script) {
                    script.text("garinham_soldier2");
                }},
                //by stairs down to grave
                { type: "old_man", facing: "down", x: 26, y: 8, wanders: true, talk: function (script) {
                    script.text("garinham_old_man3");
                }}
            ]
        },

        "Rimuldar": {
            type: "town",
            player_offset: [29, 15],
            player_start: [13, 6],
            width: 54,
            height: 44,
            map_links: [
                { x: 14, map: "World", set_offsets: [94, 70] },
                { offset_x: 0, map: "World", set_offsets: [94, 70] },
                { offset_y: 0, map: "World", set_offsets: [94, 70] },
                { y: 7, map: "World", set_offsets: [94, 70] }
            ],
            music: "village",
            layout: [
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 25, 25,  2,  2,  2, 16, 16, 15, 15, 15, 15, 15, 15, 15, 15, 25, 25, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 23, 15, 15,  4,  4,  2, 16, 15, 15, 15, 15, 15, 16, 16, 16, 15, 15, 15, 16, 25, 25, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 25, 15, 15,  4,  4,  2, 15, 15, 15, 15,  4,  4,  4,  4,  4,  4,  4,  4, 16, 16, 15, 15, 25, 25, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 16,  2,  4,  4,  4,  2, 15, 16, 15, 15,  4, 15, 16, 15,  4, 21, 21,  4, 15, 15, 15, 15, 15, 16, 16, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 16,  2,  2,  3,  2,  2, 15, 15,  2,  2,  4,  2,  2,  2,  4,  2,  2,  4, 15, 15,  2,  2,  2,  2,  2, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 15,  2,  4,  4,  4,  2, 15, 15,  2,  4,  4,  4,  2,  4,  4,  4,  2,  4, 15, 15,  2,  4,  4,  4,  2, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 15,  2,  2,  2,  2,  2, 15, 15,  2,  4,  4,  4,  2,  4,  4,  4,  2,  4, 16, 15,  2,  2,  3,  2,  2, 21, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 15, 15, 15, 15, 15, 15, 15, 15,  2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  4,  4,  4,  4,  4,  4,  2, 21, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 15, 15, 15, 15, 15, 15, 25, 25, 15, 15, 15, 15, 15, 15, 16, 15, 15,  4, 15, 10,  2,  4,  4,  4,  2, 21, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 15, 16, 15, 25, 25, 25, 25, 25, 25, 15, 15, 15,  4,  4,  4,  4,  4,  4,  4, 15,  2,  4,  4,  4,  2, 21, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 21, 15, 25, 25, 16, 16, 16, 25, 25, 15, 16,  4,  4,  4,  4,  4,  4,  4,  4, 15,  2,  2,  2,  2,  2, 16, 15, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 21, 25, 25, 16, 15, 15, 16, 25, 15, 15,  4,  4,  4, 15, 15, 15, 15,  4,  4, 15, 15, 15, 15, 16, 16, 16, 16, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 21, 21, 21, 16, 15, 16, 25, 25, 15,  4,  4,  4, 15, 15, 16, 15, 15,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4, 23,  4, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 21, 25, 25, 16, 16, 25, 25, 15, 15,  4,  4, 15, 15, 16, 16, 15, 15,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4, 23,  4, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 21, 15, 25, 25, 25, 25, 15, 15, 15,  4,  4, 15, 16, 16, 15,  2, 11,  4, 15, 15, 16, 16, 15, 15, 16, 16, 16, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 15, 16, 15, 15, 15, 15, 16, 15, 15,  4,  4, 15, 15, 16,  2,  2,  2,  4,  2,  2,  2,  2,  2,  2,  2, 16, 15, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 15, 15, 15, 15, 15, 16, 16, 16, 15,  4,  4, 15, 16, 16,  2,  4,  3,  4,  2,  4,  4,  2,  4,  4,  2, 15, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 15,  2,  2,  2,  2,  2,  2,  2,  2,  4,  4,  2, 15, 16,  2,  2,  2,  4,  4,  4,  4,  4,  4,  4,  2, 15, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 15,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2, 15, 15,  2,  4,  4,  4,  4,  4,  4,  2,  4,  4,  2, 16, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 15,  2,  4,  4,  4,  4,  2,  4,  4,  4,  4,  2, 15, 16,  2,  2,  4,  2,  2,  2,  6,  2,  2,  2,  2, 16, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 15,  2,  2,  2,  4,  4,  2,  4,  4,  4,  4,  2, 15, 21,  2,  4,  4,  4,  2,  4,  4,  2,  4,  4,  2, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 16,  2,  4,  3,  4,  4,  4,  4,  2,  2,  4,  2, 15, 21,  2,  4,  4,  4,  2,  4,  4,  6,  4,  5,  2, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 16,  2,  2,  2,  4,  4,  2,  4,  4,  4,  4,  2, 15, 21,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 25,  2,  4,  4,  4,  4,  2,  4,  4,  4,  4,  2, 16, 21, 21, 21, 21, 16, 15, 15, 16, 16, 25, 25, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2, 16, 16, 15, 15, 16, 15, 15, 25, 25, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 16, 16, 16, 16, 25, 25, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
                15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15
            ],
            doors: [
                { id: "rimuldar_door1", x: 34, y: 28 },
                { id: "rimuldar_door2", x: 35, y: 30 }
            ],
            npcs: [
                //by weapons store
                { type: "merchant", facing: "down", x: 36, y: 14 },
                { type: "soldier_2", facing: "down", x: 36, y: 18, wanders: true, talk: function (script) {
                    script.text("rimuldar_soldier1");
                }},
                //wandering, middle of town
                { type: "townswoman", facing: "down", x: 35, y: 21, wanders: true, talk: function (script) {
                    script.text("rimuldar_woman2");
                }},
                { type: "townsman", facing: "down", x: 27, y: 18, wanders: true, talk: function (script) {
                    script.text("rimuldar_man1");
                }},
                { type: "soldier", facing: "up", x: 22, y: 23, wanders: true, talk: function (script) {
                    script.text("rimuldar_soldier4");
                }},
                { type: "soldier_2", facing: "down", x: 30, y: 32, wanders: true, talk: function (script) {
                    //TODO: conditional on having fighters ring, I think?
                    script.text("rimuldar_soldier3");
                }},
                { type: "old_man", facing: "left", x: 19, y: 20, talk: function (script) {
                    script.text("rimuldar_old_man2");
                }},
                //inn
                { type: "merchant", facing: "right", x: 29, y: 25 },
                { type: "soldier_2", facing: "down", x: 37, y: 26, wanders: true, talk: function (script) {
                    script.text("rimuldar_soldier2");
                }},
                { type: "old_man", facing: "down", x: 33, y: 30, talk: function (script) {
                    script.text("rimuldar_old_man1");
                }},
                //two isolated people
                { type: "townswoman", facing: "up", x: 28, y: 15, talk: function (script) {
                    script.text("rimuldar_woman1");
                }},
                { type: "townsman", facing: "up", x: 24, y: 15, wanders: true, talk: function (script) {
                    script.text("erdrick_proof");
                }},
                //shed
                { type: "townswoman", facing: "right", x: 16, y: 27, wanders: true, talk: function (script) {
                    script.text("rimuldar_woman3");
                }},
                { type: "old_man", facing: "right", x: 16, y: 30, talk: function (script) {
                    script.text("rimuldar_old_man3");
                    //TODO: menu
                }},
                { type: "townsman", facing: "down", x: 22, y: 27, wanders: true, talk: function (script) {
                    script.text("rimuldar_man2");
                }},
                { type: "soldier_2", facing: "down", x: 22, y: 31, wanders: true, talk: function (script) {
                    script.text("rimuldar_soldier5");
                }},
                //key sales
                { type: "merchant", facing: "up", x: 15, y: 11, talk: function (script) {
                    script.text("rimuldar_merchant1");
                }},
                { type: "old_man", facing: "up", x: 17, y: 14, talk: function (script) {
                    script.text("key_sales1");
                    //TODO: menu
                }},
                //hiding girl and her boyfriend
                { type: "townswoman", facing: "down", x: 13, y: 33, talk: function (script) {
                    script.text("rimuldar_woman4");
                }},
                { type: "townsman", facing: "down", x: 40, y: 7, talk: function (script) {
                    script.text("rimuldar_man3");
                }}
            ]
        },

        "Cantlin": {
            type: "town",
            player_offset: [13, 0],
            player_start: [12, 6],
            width: 54,
            height: 44,
            map_links: [
                { y: 5, map: "World", set_offsets: [65, 100] },
                { offset_y: 29, map: "World", set_offsets: [65, 100] },
                { x: 11, map: "World", set_offsets: [65, 100] },
                { offset_x: 28, map: "World", set_offsets: [65, 100] }
            ],
            music: "village",
            layout: [
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  2,  2,  4,  4,  2,  2,  2,  2,  2,  2,  2,  2,  4,  4, 10, 21, 21, 21, 21, 21, 21, 21, 21,  4,  2,  2,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  4,  4,  4,  4,  2,  4,  4,  2,  4,  4,  4,  2,  4,  4, 21, 21,  2,  2,  2,  2,  2,  2, 21,  4,  2,  4,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  2,  2,  4,  4,  2,  4,  4,  2,  4,  4,  4,  2,  4,  4, 16, 16,  2,  4,  4,  2,  4,  2, 21,  4,  2,  4,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  2,  3,  2,  4,  4,  4,  2,  4,  4,  4,  4,  4,  4,  4,  3,  4,  2, 21,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  4,  4,  4,  4,  4,  4,  2,  4,  4,  4,  4,  4,  4,  4,  3,  4,  2, 21,  4,  2,  2,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  2,  2,  4,  4,  2,  2,  4,  2,  2,  4,  4,  2,  4,  4, 16, 16,  2,  4,  4,  2,  4,  2, 21,  4,  2,  4,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  4,  3,  4,  4, 21, 11, 21, 21,  2,  4,  4,  2,  4,  4, 21, 21,  2,  2,  2,  2,  2,  2, 21,  4,  2,  3,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  2,  2,  4,  4, 21, 21, 21, 21,  2,  2,  2,  2,  4,  4, 21, 21, 21, 21, 21, 21, 21, 21, 21,  4,  2,  4,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  6,  4,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  2,  4,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  2,  2,  4,  4,  2,  2,  2,  4,  4, 15, 25, 25, 25, 15, 15, 15, 15,  4,  4,  2,  2,  2,  2,  2,  4,  4,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  4,  3,  4,  4,  3,  4,  2,  4,  4, 25, 25, 25, 25, 25, 15, 15, 15,  4,  4,  2,  4,  2,  4,  3,  4,  4,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  2,  2,  4,  4,  2,  2,  2,  4,  4, 25, 25, 16, 25, 25, 25, 15, 15,  4,  4,  3,  4,  2,  4,  2,  4,  4,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  4,  3,  4,  4,  4,  4,  4,  4,  4, 15, 25, 25, 25, 15, 25, 25, 15,  4,  4,  2,  2,  2,  2,  2,  2,  2,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  2,  2,  4,  2,  2,  2,  2,  4,  4, 15, 15, 15, 15, 15, 15, 23, 15,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  4,  4,  4,  2,  4,  4,  2,  4,  4, 15, 15, 15, 15, 15, 15, 25, 15,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  4,  4,  4,  4,  4,  4,  2,  4,  4, 15, 15, 15, 15, 15, 25, 25, 15,  4,  4,  2,  2,  2,  4,  4,  2,  2,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  2,  2,  2,  2,  2,  2,  2,  4,  4, 15, 15, 15, 25, 25, 25, 25, 25,  4,  4,  3,  4,  2,  4,  4,  4,  4,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4, 15, 15, 25, 25, 25, 16, 25, 25,  4,  4,  2,  2,  2,  4,  4,  2,  4,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4, 15, 25, 25, 25, 16, 16, 25, 25,  4,  4,  4,  4,  4,  4,  4,  2,  2,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  2,  2,  6,  2,  2,  2,  2,  4,  4, 15, 25, 25, 16, 16, 25, 25, 15,  4,  4,  2,  2,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2, 21, 21, 21, 21, 21, 21,  2,  4,  4, 15, 15, 25, 25, 25, 25, 15, 15,  4,  4,  2,  4,  2,  2,  2,  2,  4,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2, 21, 21, 21, 21, 21, 21,  2,  4,  4, 15, 15, 15, 25, 25, 15, 15, 15,  4,  4,  2,  3,  2,  4,  4,  4,  4,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  2,  2,  2,  2, 21, 21,  2,  4,  4,  4,  2,  4,  4,  4,  4,  2,  4,  4,  4,  2,  4,  2,  2,  4,  2,  2,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  4,  4,  4,  2, 21, 21,  6,  4,  2,  2,  2,  2,  6,  6,  2,  2,  2,  2,  4,  4,  4,  2,  4,  4,  2,  5,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  4,  4,  4,  3, 21, 21,  2,  4,  2,  9,  9,  9,  9,  9,  9,  9,  9,  2,  4,  2,  4,  4,  4,  4,  3,  4,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  5,  4,  4,  2, 21, 21,  2,  4,  2,  9,  2,  2,  2,  2,  2,  2,  9,  2,  4,  2,  4,  2,  4,  4,  2,  5,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  2,  2,  2,  2,  2,  2,  2,  4,  2,  9,  9,  9,  4,  4,  9,  9,  9,  2,  4,  2,  2,  2,  2,  2,  2,  2,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,
                4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4
            ],
            doors: [
                { id: "cantlin_door1", x: 15, y: 26 },
                { id: "cantlin_door2", x: 19, y: 30 },
                { id: "cantlin_door3", x: 25, y: 30 },
                { id: "cantlin_door4", x: 26, y: 30 },
                { id: "cantlin_door5", x: 37, y: 14 }
            ],
            npcs: [
                //weapons store
                { type: "merchant", facing: "down", x: 33, y: 10, wandering: true, talk: function (script) {
                    //TODO: menu
                }},
                { type: "soldier", facing: "down", x: 26, y: 11, wanders: true, talk: function (script) {
                    script.text("cantlin_soldier1");
                }},
                { type: "soldier", facing: "down", x: 33, y: 14, wanders: true, talk: function (script) {
                    script.text("cantlin_soldier2");
                }},
                //inn
                { type: "merchant", facing: "down", x: 19, y: 8, talk: function (script) {
                    script.text("innkeeper1");
                    //TODO: menu
                }},
                //shops left of inn
                { type: "soldier", facing: "down", x: 16, y: 11, wanders: true, talk: function (script) {
                    script.text("cantlin_soldier3");
                    //TODO: yes/no menu
                    //if yes: cantlin_soldier4
                    //if no: cantlin_soldier5
                }},
                { type: "townsman", facing: "right", x: 13, y: 12, talk: function (script) {
                    script.text("item_store1");
                    //TODO: menu
                }},
                { type: "merchant", facing: "right", x: 13, y: 17, talk: function (script) {
                    script.text("cantlin_merchant2");
                }},
                { type: "merchant", facing: "left", x: 18, y: 17, talk: function (script) {
                    script.text("item_store1");
                    //TODO: menu
                }},
                { type: "townswoman", facing: "right", x: 15, y: 18, wanders: true, talk: function (script) {
                    script.text("cantlin_woman1");
                }},
                { type: "townswoman", facing: "left", x: 21, y: 20, wanders: true, talk: function (script) {
                    script.text("cantlin_woman2");
                }},
                //locked store area on right
                { type: "old_man", facing: "down", x: 38, y: 11, talk: function (script) {
                    script.text("key_sales1");
                    //TODO: menu
                }},
                { type: "soldier", facing: "right", x: 35, y: 17, talk: function (script) {
                    script.text("weapons_armor1");
                    //TODO: menu
                }},
                { type: "townswoman", facing: "left", x: 33, y: 18, talk: function (script) {
                    script.text("fairy_water1");
                    //TODO: menu
                }},
                //below locked store area
                { type: "merchant", facing: "right", x: 35, y: 20, wandering: true, talk: function (script) {
                    script.text("cantlin_merchant1");
                }},
                { type: "townsman", facing: "right", x: 30, y: 20, wandering: true, talk: function (script) {
                    script.text("cantlin_man1");
                }},
                //bottom right shops
                { type: "old_man", facing: "down", x: 33, y: 27, talk: function (script) {
                    script.text("cantlin_old_man1");
                }},
                { type: "merchant", facing: "left", x: 38, y: 31, talk: function (script) {
                    script.text("weapons_armor1");
                    //TODO: menu
                }},
                //middle shed area
                { type: "old_man", facing: "down", x: 26, y: 21, talk: function (script) {
                    script.text("cantlin_old_man2");
                }},
                { type: "old_man", facing: "down", x: 26, y: 33, wandering: true, talk: function (script) {
                    script.text("cantlin_old_man3");
                }},
                //bottom left merchant
                { type: "merchant", facing: "right", x: 15, y: 31, wandering: true, talk: function (script) {
                    script.text("cantlin_merchant3");
                }}
            ]
        },

        "Hauksness": {
            type: "dungeon",
            zone: 13,
            player_offset: [0, 9],
            player_start: [12, 6],
            width: 44,
            height: 34,
            map_links: [
                { x: 11, map: "World", set_offsets: [17, 87] },
                { x: 13, map: "World", set_offsets: [17, 87] },
                { y: 5, map: "World", set_offsets: [17, 87] },
                { y: 7, map: "World", set_offsets: [17, 87] }
            ],
            music: "dungeon1",
            layout: [
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,  2,  2, 21, 21, 15,  2,  2, 21,  2,  2,  2,  2,  2,  2,  2,  4,  4,  2, 22,  2, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,  2, 21, 21, 15, 16,  2, 21,  4,  4,  3,  4,  2, 16, 15, 15, 21,  4, 22, 22,  2, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 16, 15,  2,  2,  4,  4,  2,  4,  2, 15, 15, 15,  4, 22, 22, 21,  2, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 15, 15, 15, 22, 22,  2,  2,  4,  2,  2,  2, 15, 22, 15,  4,  4, 22, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 15, 15, 15, 22, 22, 15,  4, 15, 15, 15, 16, 15, 15,  4,  4, 15, 21,  2, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,  2, 15,  4,  4,  4, 21, 22, 21,  4,  4,  4, 21, 21,  4,  4, 21,  4, 15, 15,  2, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,  2, 15,  4,  4,  4,  4, 21,  4,  4, 21, 21, 21,  4,  4,  4,  4,  4, 15, 16, 15, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 15, 15,  4,  4, 15, 21, 21, 21, 15, 16, 15, 15, 15, 15, 15, 15,  4, 15, 15, 16, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,  2, 15,  4,  4, 15, 21,  2,  2,  2,  2, 21,  2,  4,  4,  4,  2,  4,  2,  2, 15, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,  4,  4, 21,  4, 15,  2,  4,  4,  4, 21, 21,  2, 22, 15,  2,  4,  3, 22,  2, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,  4, 21,  4,  4, 15,  2,  2,  2,  3,  2,  2,  2, 15, 22,  2,  4, 22, 22,  2, 22, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 16, 16,  4,  4, 16,  2, 21, 21,  4,  4,  4,  2, 16, 15,  2,  2, 22,  2,  2, 22, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 16, 15, 21,  4, 16,  2, 21,  2,  4,  2, 21,  2, 16, 16, 21, 21, 22, 22, 16,  2, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,  2, 15,  4, 21, 16,  2,  4,  4,  4, 21, 21, 21, 16, 21, 15,  2,  2,  2,  2, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,  2, 15,  4,  4, 15,  2,  2,  4,  4,  2,  2,  2, 21, 15, 15,  2, 21, 21, 21,  2, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,  2, 22, 21,  4, 15, 21, 21, 16,  4, 21,  4,  4,  4,  4, 21,  4,  4,  3, 21,  2, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22,  4,  4, 15, 15, 21, 15,  4, 16, 15, 15, 15, 15, 15,  2,  4,  2, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22,  4, 21,  4,  4,  4,  4, 15, 15, 15, 15, 22, 15, 15,  2,  2,  2,  2,  2, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,  2, 22, 22, 22, 15, 15, 15, 15, 15, 15, 15, 22, 22, 22, 15, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22,  2,  2,  2,  2, 15,  2, 22, 22, 22, 22,  2,  2,  2, 21,  2,  2,  2, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21
            ]
        },

        "ErdricksCaveB1": {
            type: "town",
            player_offset: [0, 0],
            player_start: [6, 2],
            width: 25,
            height: 15,
            map_links: [
                { x: 6, y: 2, map: "World", set_offsets: [20, 10] },
                { x: 15, y: 11, map: "ErdricksCaveB2", set_xy: [14, 11] }
            ],
            music: "dungeon1",
            layout: [
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 8, 4, 2, 4, 4, 4, 4, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 4, 2, 2, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 4, 2, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 4, 2, 4, 4, 4, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 4, 2, 2, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 4, 2, 4, 4, 4, 2, 7, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
            ]
        },

        "ErdricksCaveB2": {
            type: "town",
            player_offset: [0, 0],
            player_start: [14, 11],
            width: 25,
            height: 15,
            map_links: [
                { x: 14, y: 11, map: "ErdricksCaveB1", set_xy: [15, 11] }
            ],
            music: "dungeon2",
            layout: [
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 2, 4, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 4, 4, 4, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 2, 4, 2, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 2, 4, 2, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 2, 2, 4, 2, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 2, 2, 4, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 4, 4, 2, 4, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 4, 4, 4, 2, 8, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
            ]
        },

        "SwampCave": {
            type: "dungeon",
            zone: 19,
            player_offset: [0, 0],
            player_start: [9, 1],
            width: 25,
            height: 32,
            map_links: [
                { x: 9, y: 1, map: "World", set_offsets: [96, 42] },
                { offset_y: 17, x: 9, y: 13, map: "World", set_offsets: [96, 47] }
            ],
            music: "dungeon1",
            layout: [
                2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  8,  4,  4,  4,  4,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  2,  2,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  2,  4,  4,  2,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  2,  2,  4,  4,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  4,  4,  4,  2,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  2,  4,  2,  2,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  4,  2,  2,  4,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  2,  2,  4,  4,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  4,  4,  4,  2,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  2,  4,  2,  2,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  2,  4,  4,  4,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  2,  4,  4,  2,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  2,  4,  2,  2,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  2,  4,  4,  4,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  2,  2,  2,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  2,  4,  4,  4,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  2,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  2,  4,  2,  4,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  2,  4,  2,  4, 24,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  2,  4,  2,  4,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  2,  4,  2,  2,  6,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  2,  4,  4,  4,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  4,  4,  4,  2,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  2,  2,  4,  2,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  4,  2,  4,  4,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  4,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  4,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  4,  2,  4,  2,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  8,  4,  4,  4,  2,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
                2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2
            ],
            doors: [
                { id: "swamp_cave_door1", x: 14, y: 21 }
            ],
            npcs: [
            ]
        },

        "GarinhamsGraveB1": {
            type: "dungeon",
            zone: 14,
            player_offset: [0, 6],
            player_start: [8, 6],
            width: 25,
            height: 22,
            map_links: [
                { offset_y: 6, x: 8, map: "Garinham", set_offsets: [19, 1] },
                { offset_y: 7, x: 3, y: 12, map: "GarinhamsGraveB2" }
            ],
            music: "dungeon1",
            layout: [
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 2, 5, 5, 5, 2, 4, 4, 4, 4, 2, 2, 2, 2,
                2, 2, 4, 2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 4, 4, 4, 4, 4, 2, 2, 4, 4, 2, 2, 2,
                2, 2, 4, 2, 4, 4, 4, 4, 2, 4, 2, 4, 2, 4, 4, 4, 2, 4, 4, 4, 2, 4, 2, 2, 2,
                2, 2, 4, 2, 4, 2, 2, 4, 4, 4, 2, 4, 2, 4, 2, 2, 2, 2, 2, 4, 2, 4, 2, 2, 2,
                2, 2, 4, 2, 4, 4, 4, 4, 2, 2, 2, 4, 2, 2, 2, 4, 2, 4, 2, 4, 4, 4, 2, 2, 2,
                2, 2, 4, 2, 2, 2, 2, 4, 4, 4, 2, 4, 4, 4, 2, 4, 2, 4, 2, 4, 2, 4, 2, 2, 2,
                2, 2, 4, 4, 4, 4, 2, 2, 2, 2, 2, 4, 2, 4, 2, 4, 2, 4, 2, 4, 2, 4, 2, 2, 2,
                2, 2, 4, 2, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2,
                2, 2, 4, 2, 4, 2, 2, 4, 2, 2, 2, 4, 2, 2, 2, 2, 2, 4, 2, 2, 2, 4, 2, 2, 2,
                2, 2, 4, 2, 4, 2, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 2, 4, 4, 4, 2, 2, 2,
                2, 2, 4, 2, 4, 2, 4, 2, 4, 2, 2, 4, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 2, 2, 2,
                2, 2, 4, 2, 4, 4, 4, 2, 8, 4, 4, 4, 2, 4, 4, 4, 2, 4, 2, 2, 4, 4, 2, 2, 2,
                2, 2, 4, 2, 4, 2, 4, 2, 4, 4, 4, 4, 2, 4, 2, 4, 4, 4, 2, 2, 4, 2, 2, 2, 2,
                2, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 4, 4, 2, 4, 4, 2, 2, 2,
                2, 2, 4, 2, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 4, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 4, 2, 4, 2, 4, 2, 4, 2, 4, 2, 2, 2,
                2, 2, 4, 4, 4, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 2, 2, 2,
                2, 2, 4, 4, 2, 4, 2, 4, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 6, 2, 2, 2, 2, 2,
                2, 2, 4, 7, 4, 4, 2, 2, 2, 2, 2, 2, 4, 2, 4, 4, 4, 2, 4, 4, 4, 4, 2, 2, 2,
                2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 2, 4, 4, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
            ],
            doors: [
                { id: "grave_b1_door1", x: 19, y: 18 }
            ]
        },

        "GarinhamsGraveB2": {
            type: "dungeon",
            zone: 7,
            player_offset: [0, 0],
            player_start: [16, 3],
            width: 25,
            height: 15,
            map_links: [
                { x: 16, y: 3, map: "GarinhamsGraveB1", set_offsets: [0, 7], set_xy: [3, 12] },
                { x: 17, y: 2, map: "GarinhamsGraveB3" },
                { x: 6, y: 2, map: "GarinhamsGraveB3", set_xy: [16, 2] },
                { x: 6, y: 11, map: "GarinhamsGraveB3", set_offsets: [0, 7], set_xy: [4, 11] },
                { x: 17, y: 11, map: "GarinhamsGraveB3", set_offsets: [0, 7], set_xy: [20, 7] },
                { x: 10, y: 7, map: "GarinhamsGraveB3", set_offsets: [0, 6], set_xy: [8, 6] }
            ],
            music: "dungeon1",
            layout: [
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 4, 7, 2, 4, 2, 2, 2, 2, 2, 2, 2, 4, 7, 4, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 4, 2, 2, 4, 4, 4, 4, 4, 4, 4, 2, 8, 4, 4, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 4, 4, 2, 4, 2, 4, 2, 4, 2, 4, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 4, 4, 2, 4, 4, 7, 4, 4, 2, 4, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 4, 4, 2, 4, 2, 4, 2, 4, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 4, 4, 2, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 4, 7, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 7, 4, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
            ]
        },

        "GarinhamsGraveB3": {
            type: "dungeon",
            zone: 15,
            player_offset: [0, 0],
            player_start: [20, 2],
            width: 25,
            height: 22,
            map_links: [
                { x: 20, y: 2, map: "GarinhamsGraveB2", set_xy: [17, 2] },
                { x: 16, y: 2, map: "GarinhamsGraveB2", set_xy: [6, 2] },
                { offset_y: 0, x: 11, y: 6, map: "GarinhamsGraveB4" },
                { offset_y: 4, x: 12, y: 6, map: "GarinhamsGraveB4", set_xy: [12, 7] },
                { offset_y: 6, x: 8, map: "GarinhamsGraveB2", set_xy: [10, 7] },
                { offset_y: 7, x: 4, y: 11, map: "GarinhamsGraveB2", set_xy: [6, 11] },
                { offset_y: 7, x: 20, y: 7, map: "GarinhamsGraveB2", set_xy: [17, 11] }
            ],
            music: "dungeon3",
            layout: [
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 4, 4, 4, 2, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 2, 2, 2,
                2, 2, 4, 5, 4, 2, 4, 4, 4, 4, 4, 2, 4, 2, 4, 2, 8, 4, 2, 4, 8, 4, 2, 2, 2,
                2, 2, 4, 4, 4, 2, 4, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 2, 2, 2,
                2, 2, 4, 2, 2, 2, 4, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 4, 2, 4, 4, 4, 2, 4, 4, 4, 4, 2, 2, 4, 4, 4, 2, 2, 4, 4, 4, 2, 2, 2,
                2, 2, 4, 2, 4, 2, 2, 2, 4, 2, 4, 7, 2, 4, 4, 4, 4, 4, 2, 2, 2, 4, 2, 2, 2,
                2, 2, 4, 4, 4, 2, 4, 4, 4, 2, 2, 2, 2, 4, 4, 5, 4, 4, 2, 4, 2, 4, 2, 2, 2,
                2, 2, 4, 2, 2, 2, 4, 2, 4, 2, 4, 2, 2, 4, 4, 4, 4, 4, 2, 4, 2, 4, 2, 2, 2,
                2, 2, 4, 2, 4, 2, 4, 2, 4, 2, 4, 2, 4, 4, 4, 4, 4, 2, 2, 4, 4, 4, 2, 2, 2,
                2, 2, 4, 2, 4, 2, 4, 4, 4, 2, 4, 2, 7, 4, 2, 2, 2, 2, 2, 4, 2, 4, 2, 2, 2,
                2, 2, 4, 2, 4, 2, 4, 2, 2, 2, 4, 2, 2, 2, 2, 4, 2, 4, 4, 4, 2, 4, 2, 2, 2,
                2, 2, 4, 2, 4, 2, 4, 2, 8, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 2, 2, 4, 2, 2, 2,
                2, 2, 4, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 4, 4, 2, 2, 2,
                2, 2, 4, 2, 4, 2, 4, 2, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 2, 8, 4, 2, 2, 2,
                2, 2, 4, 2, 4, 4, 4, 2, 4, 4, 2, 4, 2, 4, 2, 2, 2, 4, 2, 2, 2, 4, 2, 2, 2,
                2, 2, 4, 2, 2, 4, 4, 2, 4, 4, 2, 4, 2, 4, 4, 4, 4, 4, 2, 4, 4, 4, 2, 2, 2,
                2, 2, 4, 2, 4, 4, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 4, 2, 4, 2, 4, 2, 2, 2,
                2, 2, 4, 2, 8, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 2, 4, 2, 4, 2, 2, 2,
                2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 4, 2, 2, 2,
                2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
            ]
        },

        "GarinhamsGraveB4": {
            type: "dungeon",
            zone: 15,
            player_offset: [0, 0],
            player_start: [7, 7],
            width: 25,
            height: 15,
            map_links: [
                { x: 7, y: 7, map: "GarinhamsGraveB3", set_xy: [11, 6] },
                { x: 12, y: 7, map: "GarinhamsGraveB3", set_offsets: [0, 4], set_xy: [12, 6] }
            ],
            music: "dungeon4",
            layout: [
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 2, 2, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 8, 4, 4, 2, 2, 8, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 2, 2, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
            ]
        },

        "MountainCaveB1": {
            type: "dungeon",
            zone: 19,
            player_offset: [0, 1],
            player_start: [6, 7],
            width: 25,
            height: 16,
            map_links: [
                { offset_y: 1, x: 6, y: 7, map: "World", set_offsets: [21, 55] },
                { x: 6, y: 1, map: "MountainCaveB2" },
                { offset_y: 0, x: 12, y: 6, map: "MountainCaveB2", set_xy: [12, 6] },
                { x: 18, y: 12, map: "MountainCaveB2", set_offsets: [0, 1], set_xy: [18, 12] }
            ],
            music: "dungeon1",
            layout: [
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 7, 4, 4, 4, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 2, 2, 4, 4, 4, 4, 4, 4, 2, 4, 2, 2, 4, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 4, 2, 4, 4, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 2, 4, 4, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 4, 2, 4, 4, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 2, 7, 4, 4, 4, 4, 2, 4, 5, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 8, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 4, 4, 4, 2, 4, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 2, 4, 4, 4, 2, 4, 4, 4, 4, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 4, 2, 4, 2, 4, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 2, 4, 2, 4, 2, 2, 2, 4, 2, 4, 4, 7, 4, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
            ]
        },

        "MountainCaveB2": {
            type: "dungeon",
            zone: 14,
            player_offset: [0, 0],
            player_start: [6, 1],
            width: 25,
            height: 16,
            map_links: [
                { x: 6, y: 1, map: "MountainCaveB1", set_offsets: [0, 0], set_xy: [6, 1] },
                { offset_y: 0, x: 12, y: 6, map: "MountainCaveB1", set_offsets: [0, 0], set_xy: [12, 6] },
                { x: 18, y: 12, map: "MountainCaveB1", set_xy: [18, 12] }
            ],
            music: "dungeon2",
            layout: [
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 8, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 4, 2, 4, 2, 4, 2, 4, 2, 2, 4, 2, 2, 4, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 2, 4, 2, 4, 2, 4, 4, 4, 2, 4, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 4, 4, 2, 2, 2, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 2, 4, 4, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 8, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 5, 4, 2, 4, 2, 4, 4, 2, 2, 4, 2, 2, 4, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 4, 2, 2, 2, 2, 4, 4, 2, 4, 4, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 4, 4, 4, 4, 2, 4, 4, 2, 4, 4, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 4, 4, 4, 4, 5, 2, 2, 4, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 2, 4, 4, 4, 2, 4, 4, 4, 2, 4, 4, 4, 4, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 4, 2, 4, 2, 8, 4, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
            ]
        },

        "CharlockCastle1F": {
            type: "dungeon",
            zone: 16,
            player_offset: [0, 11],
            player_start: [12, 11],
            width: 25,
            height: 26,
            map_links: [
                { x: 13, y: 4, map: "CharlockCastleB1" },
                { x: 7, y: 6, offset_y: 11, map: "CharlockCastleB1", set_offsets: [0, 7], set_xy: [11, 7] },
                { x: 18, y: 6, offset_y: 11, map: "CharlockCastleB1", set_offsets: [0, 7], set_xy: [20, 9] },
                { y: 12, map: "World", set_offsets: [40, 46] }
            ],
            music: "dungeon1",
            layout: [
                22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
                22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
                22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
                22, 22, 22, 22, 22,  2,  2,  2, 22, 22,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 22, 22, 22, 22,
                22, 22, 22, 22,  2,  2,  4,  2,  2, 22,  2,  9,  9,  9,  9,  9,  2,  4,  4,  4,  2,  2, 22, 22, 22,
                22, 22, 22,  2,  2,  4,  4,  4,  2,  2,  2,  9,  3,  3,  3,  9,  2,  4,  2,  4,  4,  2,  2, 22, 22,
                22, 22, 22,  2,  4,  4,  2,  4,  4,  4,  2,  9,  3,  4,  3,  9,  2,  4,  4,  4,  4,  4,  2, 22, 22,
                22, 22, 22,  2,  4,  2,  2,  2,  2,  4,  2,  9,  9,  9,  9,  9,  2,  2,  4,  2,  2,  4,  2, 22, 22,
                22, 22, 22,  2,  4,  2,  4,  4,  4,  4,  2,  9,  9,  9,  9,  9,  2,  4,  4,  4,  2,  4,  2, 22, 22,
                22, 22, 22,  2,  4,  2,  2,  4,  2,  4,  2,  2,  4,  4,  4,  2,  2,  4,  2,  4,  4,  4,  2, 22, 22,
                22, 22, 22,  2,  4,  2,  4,  4,  4,  4,  4,  2,  2,  9,  2,  2,  4,  4,  4,  4,  2,  4,  2, 22, 22,
                22, 22, 22,  2,  4,  2,  2,  6,  2,  2,  4,  2,  4,  4,  4,  2,  2,  2,  6,  2,  2,  4,  2, 22, 22,
                22, 22, 22,  2,  4,  2,  9,  9,  9,  2,  4,  2,  2,  9,  2,  2,  2,  9,  9,  9,  2,  4,  2, 22, 22,
                22, 22, 22,  2,  4,  2,  9,  2,  9,  2,  4,  2,  4,  4,  4,  2,  2,  9,  2,  9,  2,  4,  2, 22, 22,
                22, 22, 22,  2,  4,  2,  9,  9,  9,  2,  4,  2,  2,  9,  2,  2,  2,  9,  9,  9,  2,  4,  2, 22, 22,
                22, 22, 22,  2,  4,  2,  9,  2,  9,  2,  4,  4,  4,  4,  4,  2,  2,  9,  2,  9,  2,  4,  2, 22, 22,
                22, 22, 22,  2,  4,  2,  9,  9,  9,  2,  2,  2,  2,  2,  2,  2,  2,  9,  9,  9,  2,  4,  2, 22, 22,
                22, 22, 22,  2,  4,  2,  2,  7,  2,  2,  4,  4,  4,  4,  4,  4,  2,  2,  7,  2,  2,  4,  2, 22, 22,
                22, 22, 22,  2,  4,  4,  2,  2,  2,  4,  4,  2,  4,  4,  2,  4,  4,  2,  2,  2,  4,  4,  2, 22, 22,
                22, 22, 22,  2,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  2, 22, 22,
                22, 22, 22, 22,  2,  2,  4,  4,  4,  2,  2,  2,  4,  4,  2,  2,  2,  4,  4,  4,  2,  2, 22, 22, 22,
                22, 22, 22, 22, 22,  2,  2,  2,  2,  2, 22,  2,  4,  4,  2, 22,  2,  2,  2,  2,  2, 22, 22, 22, 22,
                22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,  2,  4,  4,  2, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
                22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
                22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
                22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22
            ],
            doors: [
                { id: "charlock_1f_door1", x: 7, y: 11 },
                { id: "charlock_1f_door2", x: 18, y: 11 }
            ],
        },

        "CharlockCastleB1": {
            type: "dungeon",
            zone: 16,
            player_offset: [0, 0],
            player_start: [12, 1],
            width: 25,
            height: 22,
            map_links: [
                { x: 12, y: 1, map: "CharlockCastle1F", set_offsets: [0, 0], set_xy: [13, 4] },
                { x: 11, y: 7, offset_y: 7, map: "CharlockCastle1F", set_offsets: [0, 11], set_xy: [7, 6] },
                { x: 20, y: 9, offset_y: 7, map: "CharlockCastle1F", set_offsets: [0, 11], set_xy: [18, 6] },
                { x: 18, y: 1, map: "CharlockCastleB2", set_xy: [15, 2] },
                { x: 5, y: 5, map: "CharlockCastleB2", set_xy: [7, 2] },
                { x: 16, offset_y:2, map: "CharlockCastleB2", set_xy: [11, 6] },
                { x: 22, offset_y: 2, map: "CharlockCastleB2", set_xy: [16, 10] },
                { x: 17, offset_y: 4, map: "CharlockCastleB2", set_xy: [15, 11] },
                { x: 5, y: 8, map: "CharlockCastleB2", set_xy: [7, 3] },
                { x: 11, y: 13, map: "CharlockCastleB2", set_xy: [12, 2] }
            ],
            music: "dungeon2",
            layout: [
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 8, 2, 4, 4, 4, 2, 7, 4, 4, 4, 4, 2, 2,
                2, 2, 2, 4, 2, 2, 2, 2, 2, 4, 4, 2, 4, 4, 4, 2, 4, 2, 2, 2, 2, 2, 4, 2, 2,
                2, 2, 2, 4, 2, 4, 4, 4, 2, 2, 4, 2, 2, 2, 2, 2, 4, 2, 2, 2, 4, 4, 4, 2, 2,
                2, 2, 2, 4, 2, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 2, 2, 4, 4, 2, 4, 2, 2,
                2, 2, 2, 4, 2, 7, 4, 2, 4, 2, 2, 4, 4, 4, 4, 4, 2, 2, 4, 4, 2, 2, 2, 2, 2,
                2, 2, 2, 4, 2, 2, 2, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2, 4, 4, 2, 2, 4, 4, 2, 2,
                2, 2, 2, 4, 4, 4, 4, 2, 2, 4, 2, 4, 4, 4, 4, 2, 4, 4, 2, 2, 4, 4, 4, 2, 2,
                2, 2, 2, 2, 2, 4, 4, 2, 4, 4, 2, 2, 4, 4, 2, 2, 7, 4, 2, 4, 4, 2, 7, 2, 2,
                2, 2, 2, 4, 2, 2, 4, 2, 4, 2, 2, 4, 4, 4, 4, 2, 2, 2, 2, 4, 4, 2, 2, 2, 2,
                2, 2, 2, 4, 4, 4, 4, 2, 4, 2, 4, 4, 2, 2, 4, 4, 2, 7, 2, 2, 4, 2, 4, 2, 2,
                2, 2, 2, 4, 2, 2, 2, 2, 4, 2, 4, 4, 2, 2, 4, 4, 2, 4, 4, 2, 4, 2, 4, 2, 2,
                2, 2, 2, 4, 2, 4, 4, 4, 4, 2, 2, 4, 4, 4, 4, 2, 2, 4, 4, 2, 4, 2, 4, 2, 2,
                2, 2, 2, 4, 2, 4, 2, 4, 4, 4, 2, 2, 4, 4, 2, 2, 4, 4, 2, 2, 4, 2, 4, 2, 2,
                2, 2, 2, 4, 2, 4, 2, 2, 2, 4, 2, 8, 4, 4, 4, 2, 4, 4, 4, 4, 4, 2, 4, 2, 2,
                2, 2, 2, 4, 2, 7, 2, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 4, 2, 2,
                2, 2, 2, 4, 2, 2, 2, 4, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 8, 4, 4, 2, 2,
                2, 2, 2, 4, 2, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 4, 2, 2, 2, 4, 4, 4, 2, 2,
                2, 2, 2, 4, 2, 4, 4, 2, 2, 2, 2, 4, 4, 4, 2, 4, 4, 4, 4, 2, 4, 4, 4, 2, 2,
                2, 2, 2, 4, 2, 2, 2, 2, 4, 4, 2, 2, 2, 4, 2, 2, 2, 2, 4, 4, 4, 2, 4, 2, 2,
                2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 7, 2, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
            ]
        },

        "CharlockCastleB2": {
            type: "dungeon",
            zone: 17,
            player_offset: [0, 0],
            player_start: [12, 6],
            width: 25,
            height: 15,
            map_links: [
                { x: 15, y: 2, map: "CharlockCastleB1", set_xy: [18, 1] },
                { x: 7, y: 2, map: "CharlockCastleB1", set_xy: [5, 5] },
                { x: 11, y: 6, map: "CharlockCastleB1", set_offsets: [0, 2], set_xy: [16, 6] },
                { x: 16, y: 10, map: "CharlockCastleB1", set_offsets: [0, 2], set_xy: [22, 6] },
                { x: 15, y: 11, map: "CharlockCastleB1", set_offsets: [0, 4], set_xy: [17, 6] },
                { x: 7, y: 3, map: "CharlockCastleB1", set_offsets: [0, 7], set_xy: [5, 8] },
                { x: 12, y: 2, map: "CharlockCastleB1", set_offsets: [0, 7], set_xy: [11, 13] },
                { x: 16, y: 3, map: "CharlockCastleB3", set_xy: [9, 4] },
                { x: 10, y: 2, map: "CharlockCastleB3", set_xy: [14, 2] },
                { x: 7, y: 10, map: "CharlockCastleB3", set_xy: [12, 6] },
                { x: 8, y: 11, map: "CharlockCastleB3", set_xy: [7, 11] }
            ],
            music: "dungeon3",
            layout: [
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 8, 4, 2, 7, 2, 8, 4, 2, 8, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 4, 2, 2, 4, 2, 2, 7, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 8, 4, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 4, 2, 4, 5, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 2, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 4, 2, 2, 4, 2, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 7, 2, 4, 4, 4, 4, 2, 8, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
            ],
            chests: [
                { id: "charlock_b2_chest1", x: 12, y: 7, take: function () {
                    player.add_item("erdricks_sword");
                }}
            ]
        },

        "CharlockCastleB3": {
            type: "dungeon",
            zone: 17,
            player_offset: [0, 0],
            player_start: [12, 6],
            width: 25,
            height: 15,
            map_links: [
                { x: 9, y: 4, map: "CharlockCastleB2", set_xy: [16, 3] },
                { x: 14, y: 2, map: "CharlockCastleB2", set_xy: [10, 2] },
                { x: 12, y: 6, map: "CharlockCastleB2", set_xy: [7, 10] },
                { x: 7, y: 11, map: "CharlockCastleB2", set_xy: [8, 11] },
                { x: 8, y: 8, map: "CharlockCastleB4", set_xy: [7, 11] },
                { x: 14, y: 9, map: "CharlockCastleB4", set_xy: [14, 9] }
            ],
            music: "dungeon4",
            layout: [
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 2, 8, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 4, 4, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 8, 2, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 4, 2, 2, 2, 4, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 4, 4, 2, 8, 4, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 4, 2, 2, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 7, 2, 4, 4, 4, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 7, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 8, 4, 2, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
            ]
        },

        "CharlockCastleB4": {
            type: "dungeon",
            zone: 17,
            player_offset: [0, 0],
            player_start: [12, 6],
            width: 25,
            height: 15,
            map_links: [
                { x: 7, y: 11, map: "CharlockCastleB3", set_xy: [8, 8] },
                { x: 14, y: 9, map: "CharlockCastleB3", set_xy: [14, 9] },
                { x: 9, y: 4, map: "CharlockCastleB5", set_xy: [16, 2] },
                { x: 15, y: 3, map: "CharlockCastleB5", set_xy: [11, 2] }
            ],
            music: "dungeon5",
            layout: [
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 4, 7, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 7, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 4, 4, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 2, 4, 4, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 4, 2, 2, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 4, 2, 8, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 2, 4, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 8, 4, 2, 2, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
            ]
        },

        "CharlockCastleB5": {
            type: "dungeon",
            zone: 18,
            player_offset: [0, 0],
            player_start: [12, 6],
            width: 25,
            height: 15,
            map_links: [
                { x: 16, y: 2, map: "CharlockCastleB4", set_xy: [9, 4] },
                { x: 11, y: 2, map: "CharlockCastleB4", set_xy: [15, 3] },
                { x: 12, y: 7, map: "CharlockCastleB6", set_xy: [7, 2] },
                { x: 7, y: 2, map: "CharlockCastleB6", set_xy: [7, 9] }
            ],
            music: "dungeon6",
            layout: [
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 7, 2, 4, 2, 8, 4, 4, 4, 2, 8, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 4, 2, 2, 2, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 4, 4, 4, 4, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 4, 2, 2, 4, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 4, 2, 4, 4, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 4, 2, 4, 7, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 4, 2, 2, 2, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 4, 4, 4, 4, 4, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
            ]
        },

        "CharlockCastleB6": {
            type: "dungeon",
            zone: 18,
            player_offset: [0, 0],
            player_start: [12, 6],
            width: 25,
            height: 15,
            map_links: [
                { x: 7, y: 2, map: "CharlockCastleB5", set_xy: [12, 7] },
                { x: 16, y: 2, map: "CharlockCastleB6", set_xy: [7, 2] },
                { x: 7, y: 9, map: "CharlockCastleB5", set_xy: [7, 2] },
                { x: 16, y: 9, map: "CharlockCastleB7" }
            ],
            music: "dungeon7",
            layout: [
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 8, 4, 4, 4, 4, 4, 4, 4, 4, 7, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 8, 4, 4, 4, 4, 4, 4, 4, 4, 7, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
            ]
        },

        "CharlockCastleB7": {
            type: "dungeon",
            zone: 18,
            player_offset: [0, 17],
            player_start: [11, 13],
            width: 32,
            height: 32,
            map_links: [
                { x: 11, y: 13, map: "CharlockCastleB6", set_xy: [16, 9] }
            ],
            music: "dungeon8",
            layout: [
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25,  2,  2,  2,  2, 25, 25, 25, 25, 25, 25, 25,  2,  2,  2,  2,  2,  2,  2,  2,  2, 25,  2,  2,  2, 25, 25, 25, 25,
                25, 25, 25,  2,  2,  4,  4,  2,  2,  2,  2,  2,  2,  2,  2,  2,  4,  4,  4,  2,  4,  4,  4,  2,  2,  2,  4,  2,  2, 25, 25, 25,
                25, 25,  2,  2,  4,  4,  4,  4,  2,  2,  4,  4,  4,  4,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  4,  4,  4,  2,  2, 25, 25,
                25, 25,  2,  4,  4,  4,  4,  4,  4,  2,  2,  4,  4,  2,  2,  4,  4,  4,  4,  2,  4,  4,  4,  4,  2,  4,  2,  4,  4,  2, 25, 25,
                25, 25,  2,  4,  4,  2,  4,  4,  4,  2,  4,  4,  4,  4,  4,  4,  4,  4,  2,  2,  2,  4,  4,  4,  4,  4,  4,  4,  4,  2, 25, 25,
                25, 25,  2,  4,  4,  4,  4,  4,  4,  2,  4,  4,  4,  4,  2,  2,  2,  2,  2,  4,  2,  2,  2,  2,  2,  4,  2,  4,  4,  2, 25, 25,
                25, 25,  2,  2,  4,  4,  4,  4,  2,  2,  4,  4,  4,  4,  2,  4,  4,  4,  2,  2,  2,  4,  4,  4,  2,  4,  4,  4,  2,  2, 25, 25,
                25, 25, 25,  2,  2,  4,  4,  2,  2,  4,  4,  4,  4,  4,  2,  2,  4,  4,  4,  4,  4,  4,  4,  2,  2,  2,  4,  2,  2, 21, 25, 25,
                25, 25, 25, 25,  2,  4,  2,  2,  4,  4,  2,  2,  2,  2,  2,  2,  2,  4,  4,  4,  4,  4,  2,  2, 21,  2,  4,  2, 21, 21, 25, 25,
                25, 25, 25, 25,  2,  4,  4,  4,  4,  4,  2,  4,  4,  4,  4,  4,  2,  2,  4,  4,  4,  2,  2, 21, 21, 21, 21, 21, 21, 25, 25, 25,
                25, 25, 25, 25,  2,  4,  2,  2,  2,  2,  2,  4,  5,  4,  4,  4,  2,  2,  2,  4,  2,  2, 21, 21, 25, 21, 21, 21, 25, 25, 25, 25,
                25, 25, 25, 25,  2,  4,  2,  4,  4,  4,  2,  4,  5,  5,  4,  4,  4,  4,  6,  4,  2, 21, 21, 25, 25, 25, 25, 21, 23, 21, 25, 25,
                25, 25, 25, 25,  2,  4,  2,  4,  2,  4,  2,  4,  5,  5,  5,  4,  2,  2,  2,  4,  2,  2, 21, 25, 25, 25, 25, 25, 25, 15, 25, 25,
                25, 25, 25, 25,  2,  4,  2,  4,  4,  4,  2,  4,  4,  4,  4,  4,  2,  2,  4,  4,  4,  2, 25, 25, 25, 21, 25, 25, 22, 15, 25, 25,
                25, 25, 25, 25,  2,  4,  2,  4,  2,  4,  2,  2,  2,  2,  2,  2,  2,  4,  4,  4,  2,  2, 25, 21, 25, 22, 21, 23, 21, 25, 25, 25,
                25, 25, 25, 25,  2,  4,  2,  4,  4,  4,  2,  2,  4,  4,  4,  4,  4,  4,  4,  2,  2, 25, 25, 25, 25, 15, 15, 25, 25, 25, 25, 25,
                25, 25, 25, 25,  2,  4,  2,  4,  2,  4,  2,  4,  4,  4,  2,  2,  2,  4,  2,  2, 25, 25, 25, 21, 25, 25, 22, 21, 25, 25, 25, 25,
                25, 25, 25, 25,  2,  4,  2,  4,  4,  4,  2,  4,  4,  2,  2, 25,  2,  2,  2, 25, 25, 25, 21, 21, 25, 21, 22, 15, 25, 21, 25, 25,
                25, 25, 25, 25,  2,  4,  2,  4,  2,  4,  2,  4,  2,  2, 25, 25, 25, 25, 25, 25, 25, 21, 21, 25, 25, 21, 21, 15, 21, 21, 25, 25,
                25, 25, 25, 25,  2,  4,  2,  4,  4,  4,  2,  4,  2, 25, 25, 25,  2,  2,  2, 25, 25, 25, 25, 25, 21, 21, 22, 22, 21, 25, 25, 25,
                25, 25, 25,  2,  2,  4,  2,  2,  4,  2,  2,  4,  2,  2, 25,  2,  2,  4,  2,  2, 25, 25, 25, 21, 21, 15, 15, 22, 21, 21, 25, 25,
                25, 25,  2,  2,  4,  4,  4,  2,  4,  2,  4,  4,  4,  2,  2,  2,  4,  4,  4,  2,  2, 25, 25, 21,  2,  2,  4,  2,  2, 21, 25, 25,
                25, 25,  2,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2,  2,  4,  3,  3,  4,  4,  2,  2,  2,  2,  2,  4,  4,  4,  2, 21, 25, 25,
                25, 25,  2,  4,  4,  2,  4,  4,  2,  2,  4,  4,  4,  2,  4,  4,  3,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  2, 15, 25, 25,
                25, 25,  2,  4,  4,  4,  4,  4,  2,  2,  2,  4,  2,  2,  2,  4,  3,  3,  4,  4,  2,  2,  2,  2,  2,  4,  4,  4,  2, 15, 25, 25,
                25, 25,  2,  2,  4,  4,  4,  2,  2, 25,  2,  4,  2, 25,  2,  2,  4,  4,  4,  2,  2, 25, 25, 22,  2,  2,  2,  2,  2, 21, 25, 25,
                25, 25, 25,  2,  2,  4,  2,  2, 25, 25,  2,  4,  2, 25, 25,  2,  2,  4,  2,  2, 25, 25, 25, 21, 21, 22, 22, 22, 21, 21, 25, 25,
                25, 25, 25, 25,  2,  2,  2, 25, 25, 22,  2,  4,  2, 22, 25, 25,  2,  2,  2, 25, 25, 25, 25, 25, 21, 21, 21, 21, 21, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 22, 22,  2,  8,  2, 22, 22, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
                25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25
            ],
            doors: [
                { id: "charlock_b7_door1", x: 18, y: 13 }
            ],
            chests: [
                { id: "charlock_b7_chest1", x: 14, y: 14, take: function () {
                    player.add_item("herb");
                }},
                { id: "charlock_b7_chest2", x: 13, y: 14, take: function () {
                    player.add_item("cursed_belt");
                }},
                { id: "charlock_b7_chest3", x: 12, y: 14, take: function () {
                    player.add_item("wyvern_wings");
                }},
                { id: "charlock_b7_chest4", x: 12, y: 13, take: function () {
                    player.add_gold(680);
                }},
                { id: "charlock_b7_chest5", x: 12, y: 12, take: function () {
                    player.add_item("herb");
                }},
                { id: "charlock_b7_chest6", x: 13, y: 13, take: function () {
                    player.add_item("magic_key");
                }}
            ],
            npcs: [
                { type: "dragonlord", facing: "down", x: 17, y: 25, talk: function (script) {
                    script.text("dragonlord1");
                    //TODO: menu
                }}
            ]
        },

        "NorthShrine": {
            type: "town",
            player_offset: [0, 0],
            player_start: [11, 11],
            width: 25,
            height: 15,
            map_links: [
                { x: 11, y: 11, map: "World", set_offsets: [73, 0], set_xy: [12, 5] }
            ],
            music: "town",
            layout: [
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 4, 2, 2, 2, 2, 2, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 4, 2, 4, 4, 2, 4, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 4, 2, 5, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 4, 2, 4, 4, 2, 4, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 4, 2, 2, 2, 2, 2, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
            ],
            npcs: [
                { type: "old_man", facing: "right", x: 11, y: 6, talk: function (script) {
                    //TODO:
                }}
            ]
        },

        "SouthShrine": {
            type: "town",
            player_offset: [0, 0],
            player_start: [8, 6],
            width: 25,
            height: 15,
            map_links: [
                { x: 8, y: 6, map: "World", set_offsets: [100, 107] }
            ],
            music: "town",
            layout: [
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 2, 4, 2, 4, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 4, 4, 4, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 8, 4, 2, 4, 2, 4, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 2, 4, 4, 5, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 4, 4, 4, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 2, 4, 2, 4, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
            ],
            npcs: [
                { type: "old_man", facing: "left", x: 12, y: 7, talk: function (script) {
                    //TODO:
                }}
            ]
        }
    }
};
