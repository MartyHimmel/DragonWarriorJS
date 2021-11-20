import Game from './game.js';
import GameState from './state.js';
import combat from './combat.js';
import config from './config.js';
import map from './map.js';
import player from './player.js';
import text from './text.js';

// display stats, equipment, commands, and other options (side bars)
function displayOutput() {
    document.querySelector('#output').innerHTML = `frame: ${Game.frameNumber}<br>
        player.x = ${player.x}<br>
        player.y = ${player.y}<br>
        steps = ${player.steps}<br>
        current tile = ${player.currentTile}<br>
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
        "Rescued Princess? = " + GameState.rescuedPrincess + "<br>";
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export {
    displayOutput,
    randomNumber,
};
