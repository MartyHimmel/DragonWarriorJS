export default {
    heal: {
        showInCombat: true,
        showInExplore: true,
        cost: 4,
        effect() { player.add_hp(randomNumber(10, 17)); }
    },
    hurt: {
        showInCombat: true,
        showInExplore: false,
        cost: 2,
        effect() { combat.enemy_current_hp -= randomNumber(5, 12); }
    },
    sleep: {
        showInCombat: true,
        showInExplore: false,
        cost: 2,
        effect() { combat.enemy_status = 'sleep'; }
    },
    radiant: {
        showInCombat: false,
        showInExplore: true,
        cost: 3,
        effect() {
            player.visibility = 3;
            player.radiant_in_effect = true;
            player.radiant_step_counter = 200;
        }
    },
    stopspell: {
        showInCombat: true,
        showInExplore: false,
        cost: 2,
        effect() { combat.enemy_status = 'stopspell'; }
    },
    outside: {
        showInCombat: false,
        showInExplore: true,
        cost: 6,
        effect() { }
    },
    'return': {
        showInCombat: false,
        showInExplore: true,
        cost: 8,
        effect() { }
    },
    repel: {
        showInCombat: false,
        showInExplore: true,
        cost: 2,
        effect() { }
    },
    healmore: {
        showInCombat: true,
        showInExplore: true,
        cost: 10,
        effect() { player.add_hp(randomNumber(85, 100)); }
    },
    hurtmore: {
        showInCombat: true,
        showInExplore: false,
        cost: 5,
        effect() { combat.enemy_current_hp -= randomNumber(58, 65); }
    }
};
