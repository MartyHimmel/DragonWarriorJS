import Data from './data.js';
import Game from './game.js';
import SaveState from './save-state.js';
import map from './map.js';
import player from './player.js';

// Random test stuff
// -------------------------------------------------------------------

document.querySelector('#add_exp').onclick = function() {
    player.add_experience(500);
};

document.querySelector('#equip_club').onclick = function() {
    SaveState.player.weapon = "club";
    SaveState.player.shield = "none";
};

document.querySelector('#equip_shield').onclick = function() {
    SaveState.player.weapon = "none";
    SaveState.player.shield = "leather_shield";
};

document.querySelector('#equip_best').onclick = function() {
    SaveState.player.weapon = "erdricks_sword";
    SaveState.player.armor = "erdricks_armor";
    SaveState.player.shield = "silver_shield";
};

document.querySelector('#equip_none').onclick = function() {
    SaveState.player.weapon = "none";
    SaveState.player.armor = "none";
    SaveState.player.shield = "none";
};

Object.keys(Data.maps).forEach(map => {
    let option = document.createElement('option');
    option.value = map;
    option.textContent = map;
    document.querySelector('#map_name').append(option);
});

document.querySelector('#move_to_map').onclick = function() {
    map.loadMap(document.querySelector('#map_name').value);
};

Game.begin();
