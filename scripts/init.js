/*
Most of the contents will be refactored and removed from here.
The only thing that'll stay is the Game.begin() at the bottom.
*/

var tile_width = 32,
    tile_height = 32,
    time = Date.now(),
    delta_time = Date.now();

function getId(id) {
	return document.getElementById(id);
}

function add_option(name, value, list_id) {
	var option_to_add = document.createElement('option');
	option_to_add.id = name;
	option_to_add.text = name;
	option_to_add.value = value;

	if (getId(list_id).namedItem(name) === null) {
		getId(list_id).add(option_to_add);
	}
}

function change_command_set() {
	if (Game.state === "exploration") {
		getId('commands').innerHTML =
			"<input type='button' id='talk' value='Talk'>" +
			"<input type='button' id='door' value='Door'><br>" +
			"<input type='button' id='search' value='Search'>" +
			"<input type='button' id='take' value='Take'><br>" +
			"<select id='spell' size='6'></select>" +
			"<select id='item' size='6'></select><br>" +
			"<input type='button' id='cast_spell' value='Cast'>" +
			"<input type='button' id='use_item' value='Use'>";
	}

	if (Game.state === "combat") {
		getId('commands').innerHTML =
			"<input type='button' id='fight' value='Fight'>" +
			"<input type='button' id='run' value='Run'><br>" +
			"<select id='spell' size='6'></select>" +
			"<select id='item' size='6'></select>" +
			"<input type='button' id='cast_spell' value='Cast'>" +
			"<input type='button' id='use_item' value='Use'>";
	}
}

function add_text(text) {
	setTimeout(function() {
		getId('dialog').innerHTML += text + "\n";
		getId('dialog').scrollTop = getId('dialog').scrollHeight;
	}, 500);
}

// display stats, equipment, commands, and other options (side bars)
function display_output() {
    getId('character_name').innerHTML = player.name;
    getId('level').innerHTML = player.level;
    getId('max_hp').innerHTML = player.max_hp;
    getId('current_hp').innerHTML = player.current_hp;
    getId('max_mp').innerHTML = player.max_mp;
    getId('current_mp').innerHTML = player.current_mp;
    getId('strength').innerHTML = player.strength;
    getId('agility').innerHTML = player.agility;
    getId('experience').innerHTML = player.experience;
    getId('gold').innerHTML = player.gold;
    getId('attack_power').innerHTML = player.attack_power;
    getId('defense_power').innerHTML = player.defense_power;
    getId('weapon').innerHTML = text.weapons[player.weapon];
    getId('armor').innerHTML = text.armors[player.armor];
    getId('shield').innerHTML = text.shields[player.shield];

    getId('output').innerHTML = "player.x / 32 = " + player.x / tile_width + "<br>" +
        "player.y / 32 = " + player.y / tile_height + "<br>" +
        "player.offset_x = " + player.offset_x + "<br>" +
        "player.offset_y = " + player.offset_y + "<br>" +
        "steps = " + player.steps + "<br>" +
        "current tile = " + player.current_tile + "<br>" +
        "combat random = " + Game.combat.random_num + "<br>" +
        "current zone = " + map.current_zone + "<br>" +
        "player turn = " + Game.combat.player_turn + "<br>";

    var npc_count = 0;
    if (typeof map.map_ptr.npcs !== 'undefined') {
        npc_count = map.map_ptr.npcs.length;
    }

    getId('output2').innerHTML = "Current Map = " + map.current_map + "<br>" +
        "Game State = " + Game.state + "<br>" +
        "Number of NPCS = " + npc_count + "<br>" +
        "<hr>" +
        "Rescued Princess? = " + player.rescued_princess + "<br>" +
        "<hr>";

    // Commands
    if (Game.state === "combat") {
        getId('fight').onclick = function() {
            Game.combat.player_attack();
        };
        getId('run').onclick = function() {
            Game.combat.player_run();
        };
    } else {
        getId('door').onclick = function() {
            player.door();
        };
        getId('talk').onclick = function() {
            player.talk();
        };
    }
}

// Random test stuff
// -------------------------------------------------------------------

getId('add_exp').onclick = function() {
    player.add_experience(500);
};
getId('equip_club').onclick = function() {
    player.weapon = "club";
    player.shield = "none";
};
getId('equip_shield').onclick = function() {
    player.weapon = "none";
    player.shield = "leather_shield";
};
getId('equip_both').onclick = function() {
    player.weapon = "erdricks_sword";
    player.shield = "leather_shield";
};
getId('equip_none').onclick = function() {
    player.weapon = "none";
    player.shield = "none";
};
getId('move_to_map').onclick = function() {
    map.load_map(getId('map_name').value);
};

Game.begin();