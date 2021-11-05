import Game from './game.js';
import combat from './combat.js';
import config from './config.js';
import map from './map.js';
import player from './player.js';
import text from './text.js';

function addOption(name, value, list_id) {
    var option_to_add = document.createElement('option');
    option_to_add.id = name;
    option_to_add.text = name;
    option_to_add.value = value;

    if (document.getElementById(list_id).namedItem(name) === null) {
        document.getElementById(list_id).add(option_to_add);
    }
}

function addText(text) {
    setTimeout(function() {
        document.querySelector('#dialog').innerHTML += text + "\n";
        document.querySelector('#dialog').scrollTop = document.querySelector('#dialog').scrollHeight;
    }, 500);
}

// display stats, equipment, commands, and other options (side bars)
function displayOutput() {
    document.querySelector('#character_name').innerHTML = player.name;
    document.querySelector('#level').innerHTML = player.level;
    document.querySelector('#max_hp').innerHTML = player.max_hp;
    document.querySelector('#current_hp').innerHTML = player.current_hp;
    document.querySelector('#max_mp').innerHTML = player.max_mp;
    document.querySelector('#current_mp').innerHTML = player.current_mp;
    document.querySelector('#strength').innerHTML = player.strength;
    document.querySelector('#agility').innerHTML = player.agility;
    document.querySelector('#experience').innerHTML = player.experience;
    document.querySelector('#gold').innerHTML = player.gold;
    document.querySelector('#attack_power').innerHTML = player.attack_power;
    document.querySelector('#defense_power').innerHTML = player.defense_power;
    document.querySelector('#weapon').innerHTML = text.weapons[player.weapon];
    document.querySelector('#armor').innerHTML = text.armors[player.armor];
    document.querySelector('#shield').innerHTML = text.shields[player.shield];

    document.querySelector('#output').innerHTML = "player.x / 32 = " + player.x / config.tile_width + "<br>" +
        "player.y / 32 = " + player.y / config.tile_height + "<br>" +
        "player.offset_x = " + player.offset_x + "<br>" +
        "player.offset_y = " + player.offset_y + "<br>" +
        "steps = " + player.steps + "<br>" +
        "current tile = " + player.current_tile + "<br>" +
        "combat random = " + combat.random_num + "<br>" +
        "current zone = " + map.current_zone + "<br>" +
        "player turn = " + combat.player_turn + "<br>";

    var npc_count = 0;
    if (typeof map.map_ptr.npcs !== 'undefined') {
        npc_count = map.map_ptr.npcs.length;
    }

    document.querySelector('#output2').innerHTML = "Current Map = " + map.current_map + "<br>" +
        "Game State = " + Game.state + "<br>" +
        "Number of NPCS = " + npc_count + "<br>" +
        "<hr>" +
        "Rescued Princess? = " + player.rescued_princess + "<br>" +
        "<hr>";

    // Commands
    if (Game.state === "combat") {
        document.querySelector('#fight').onclick = function() {
            combat.player_attack();
        };
        document.querySelector('#run').onclick = function() {
            combat.player_run();
        };
    } else {
        document.querySelector('#door').onclick = function() {
            player.door();
        };
        document.querySelector('#talk').onclick = function() {
            player.talk();
        };
    }
}

export {
    addOption,
    addText,
    displayOutput,
};
