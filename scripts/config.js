var config = {
    levels: [
        { maxHp: 15,  maxMp: 0,   strength: 4,   agility: 4,   requiredExp: 0 },
        { maxHp: 22,  maxMp: 0,   strength: 5,   agility: 4,   requiredExp: 7 },
        { maxHp: 24,  maxMp: 5,   strength: 7,   agility: 6,   requiredExp: 23,    spellsLearned: ["heal"] },
        { maxHp: 31,  maxMp: 16,  strength: 7,   agility: 8,   requiredExp: 47,    spellsLearned: ["hurt"] },
        { maxHp: 35,  maxMp: 20,  strength: 12,  agility: 10,  requiredExp: 110 },
        { maxHp: 38,  maxMp: 24,  strength: 16,  agility: 10,  requiredExp: 220 },
        { maxHp: 40,  maxMp: 26,  strength: 18,  agility: 17,  requiredExp: 450,   spellsLearned: ["sleep"] },
        { maxHp: 46,  maxMp: 29,  strength: 22,  agility: 20,  requiredExp: 800 },
        { maxHp: 50,  maxMp: 36,  strength: 30,  agility: 22,  requiredExp: 1300,  spellsLearned: ["radiant"] },
        { maxHp: 54,  maxMp: 40,  strength: 35,  agility: 31,  requiredExp: 2000,  spellsLearned: ["stopspell"] },
        { maxHp: 62,  maxMp: 50,  strength: 40,  agility: 35,  requiredExp: 2900 },
        { maxHp: 63,  maxMp: 58,  strength: 48,  agility: 40,  requiredExp: 4000,  spellsLearned: ["outside"] },
        { maxHp: 70,  maxMp: 64,  strength: 52,  agility: 48,  requiredExp: 5500,  spellsLearned: ["return"] },
        { maxHp: 78,  maxMp: 70,  strength: 60,  agility: 55,  requiredExp: 7500 },
        { maxHp: 86,  maxMp: 72,  strength: 68,  agility: 64,  requiredExp: 10000, spellsLearned: ["repel"] },
        { maxHp: 92,  maxMp: 95,  strength: 72,  agility: 70,  requiredExp: 13000 },
        { maxHp: 100, maxMp: 100, strength: 72,  agility: 78,  requiredExp: 16000, spellsLearned: ["healmore"] },
        { maxHp: 115, maxMp: 108, strength: 85,  agility: 84,  requiredExp: 19000 },
        { maxHp: 130, maxMp: 115, strength: 87,  agility: 86,  requiredExp: 22000, spellsLearned: ["hurtmore"] },
        { maxHp: 138, maxMp: 128, strength: 92,  agility: 88,  requiredExp: 26000 },
        { maxHp: 149, maxMp: 135, strength: 95,  agility: 90,  requiredExp: 30000 },
        { maxHp: 158, maxMp: 146, strength: 97,  agility: 90,  requiredExp: 34000 },
        { maxHp: 165, maxMp: 153, strength: 99,  agility: 94,  requiredExp: 38000 },
        { maxHp: 170, maxMp: 161, strength: 103, agility: 98,  requiredExp: 42000 },
        { maxHp: 174, maxMp: 161, strength: 113, agility: 100, requiredExp: 46000 },
        { maxHp: 180, maxMp: 168, strength: 117, agility: 105, requiredExp: 50000 },
        { maxHp: 189, maxMp: 175, strength: 125, agility: 107, requiredExp: 54000 },
        { maxHp: 195, maxMp: 180, strength: 130, agility: 115, requiredExp: 58000 },
        { maxHp: 200, maxMp: 190, strength: 135, agility: 120, requiredExp: 62000 },
        { maxHp: 210, maxMp: 200, strength: 140, agility: 130, requiredExp: 65535 }
    ],
    weapons: {
        "None":            { attack: 0,  price: 0 },
        "Bamboo Pole":     { attack: 2,  price: 10 },
        "Club":            { attack: 4,  price: 60 },
        "Copper Sword":    { attack: 10, price: 180 },
        "Hand Axe":        { attack: 15, price: 560 },
        "Broad Sword":     { attack: 20, price: 1500 },
        "Flame Sword":     { attack: 28, price: 9800 },
        "Erdrick's Sword": { attack: 40, price: 0 }
    },
    armors: {
        "None":            { defense: 0,  price: 0 },
        "Clothes":         { defense: 2,  price: 20 },
        "Leather Armor":   { defense: 4,  price: 70 },
        "Chain Mail":      { defense: 10, price: 300 },
        "Half Plate":      { defense: 16, price: 1000 },
        "Full Plate":      { defense: 24, price: 3000 },
        "Magic Armor":     { defense: 24, price: 7700 },
        "Erdrick's Armor": { defense: 28, price: 0 }
    },
    shields: {
        "None":           { defense: 0,  price: 0 },
        "Leather Shield": { defense: 4,  price: 90 },
        "Iron Shield":    { defense: 10, price: 800 },
        "Silver Shield":  { defense: 20, price: 14800 }
    },
    items: {
    },
    spells: {
        "heal": {
            showInCombat: true,
            showInExplore: true,
            cost: 4,
            effect: function() { player.add_hp(random_number(10, 17)); }
        },
        "hurt": {
            showInCombat: true,
            showInExplore: false,
            cost: 2,
            effect: function() { combat.enemy_current_hp -= random_number(5, 12); }
        },
        "sleep": {
            showInCombat: true,
            showInExplore: false,
            cost: 2,
            effect: function() { combat.enemy_status = "sleep"; }
        },
        "radiant": {
            showInCombat: false,
            showInExplore: true,
            cost: 3,
            effect: function() {
                player.visibility = 3;
                player.radiant_in_effect = true;
                player.radiant_step_counter = 200;
            }
        },
        "stopspell": {
            showInCombat: true,
            showInExplore: false,
            cost: 2,
            effect: function() { combat.enemy_status = "stopspell"; }
        },
        "outside": {
            showInCombat: false,
            showInExplore: true,
            cost: 6,
            effect: function() { }
        },
        "return": {
            showInCombat: false,
            showInExplore: true,
            cost: 8,
            effect: function() { }
        },
        "repel": {
            showInCombat: false,
            showInExplore: true,
            cost: 2,
            effect: function() { }
        },
        "healmore": {
            showInCombat: true,
            showInExplore: true,
            cost: 10,
            effect: function() { player.add_hp(random_number(85, 100)); }
        },
        "hurtmore": {
            showInCombat: true,
            showInExplore: false,
            cost: 5,
            effect: function() { combat.enemy_current_hp -= random_number(58, 65); }
        }
    }
};