import Game from './game.js';
import GameState from './state.js';
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
    document.querySelector('#character_name').innerHTML = GameState.player.name;
    document.querySelector('#level').innerHTML = GameState.player.level;
    document.querySelector('#max_hp').innerHTML = GameState.player.maxHp;
    document.querySelector('#current_hp').innerHTML = GameState.player.currentHp;
    document.querySelector('#max_mp').innerHTML = GameState.player.maxMp;
    document.querySelector('#current_mp').innerHTML = GameState.player.currentMp;
    document.querySelector('#strength').innerHTML = GameState.player.strength;
    document.querySelector('#agility').innerHTML = GameState.player.agility;
    document.querySelector('#experience').innerHTML = GameState.player.experience;
    document.querySelector('#gold').innerHTML = GameState.player.gold;
    document.querySelector('#attack_power').innerHTML = GameState.player.attackPower;
    document.querySelector('#defense_power').innerHTML = GameState.player.defensePower;
    document.querySelector('#weapon').innerHTML = text.weapons[GameState.player.weapon];
    document.querySelector('#armor').innerHTML = text.armors[GameState.player.armor];
    document.querySelector('#shield').innerHTML = text.shields[GameState.player.shield];

    document.querySelector('#output').innerHTML = `player.x / 32 = ${player.x / config.tileWidth}<br>
        player.y / 32 = ${player.y / config.tileHeight}<br>
        player.offset_x = ${player.offset_x}<br>
        player.offset_y = ${player.offset_y}<br>
        steps = ${player.steps}<br>
        current tile = ${player.current_tile}<br>
        combat random = ${combat.random_num}<br>
        current zone = ${map.current_zone}<br>
        player turn = ${combat.player_turn}<br>`;

    let npcCount = 0;
    if (typeof map.map_ptr.npcs !== 'undefined') {
        npcCount = map.map_ptr.npcs.length;
    }

    document.querySelector('#output2').innerHTML = "Current Map = " + map.current_map + "<br>" +
        "Game State = " + Game.state + "<br>" +
        "Number of NPCS = " + npcCount + "<br>" +
        "<hr>" +
        "Rescued Princess? = " + GameState.rescuedPrincess + "<br>" +
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

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function deltaTime() {
    return config.lastUpdateTime - config.lastMoveTime;
}

export {
    addOption,
    addText,
    displayOutput,
    randomNumber,
    deltaTime,
};
