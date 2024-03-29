export default [
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
];
