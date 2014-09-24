var spells = {
	0: {
		"name": "Heal",
		"cost": 4,
		effect: function() {
			player.add_hp(random_number(10, 17));
		}
	},
	1: {
		"name": "Hurt",
		"cost": 2,
		effect: function() {
			combat.enemy_current_hp -= random_number(5, 12);
		}
	},
	2: {
		"name": "Sleep",
		"cost": 2,
		effect: function() {
			combat.enemy_status = "sleep";
		}
	},
	3: {
		"name": "Radiant",
		"cost": 3,
		effect: function() {
			player.visibility = 3;
			player.radiant_in_effect = true;
			player.radiant_step_counter = 200;
		}
	},
	4: {
		"name": "Stopspell",
		"cost": 2,
		effect: function() {
			combat.enemy_status = "stopspell";
		}
	},
	5: {
		"name": "Outside",
		"cost": 6,
		effect: function() {
			
		}
	},
	6: {
		"name": "Return",
		"cost": 8,
		effect: function() {

		}
	},
	7: {
		"name": "Repel",
		"cost": 2,
		effect: function() {

		}
	},
	8: {
		"name": "Healmore",
		"cost": 10,
		effect: function() {
			player.add_hp(random_number(85, 100));
		}
	},
	9: {
		"name": "Hurtmore",
		"cost": 5,
		effect: function() {
			combat.enemy_current_hp -= random_number(58, 65);
		}
	}
};