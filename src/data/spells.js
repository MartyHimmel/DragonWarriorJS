export default {
    heal: {
        show_in_combat: true,
        show_in_explore: true,
        cost: 4,
        effect: function() { player.add_hp(randomNumber(10, 17)); }
    },
    hurt: {
        show_in_combat: true,
        show_in_explore: false,
        cost: 2,
        effect: function() { combat.enemy_current_hp -= randomNumber(5, 12); }
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
        effect: function() { player.add_hp(randomNumber(85, 100)); }
    },
    hurtmore: {
        show_in_combat: true,
        show_in_explore: false,
        cost: 5,
        effect: function() { combat.enemy_current_hp -= randomNumber(58, 65); }
    }
};
