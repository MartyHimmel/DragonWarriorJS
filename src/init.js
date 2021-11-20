import Data from './data.js';
import Game from './game.js';
import GameState from './state.js';
import map from './map.js';
import player from './player.js';

// Random test stuff
// -------------------------------------------------------------------

document.querySelector('#add_exp').onclick = function() {
    player.add_experience(500);
};

document.querySelector('#equip_club').onclick = function() {
    GameState.player.weapon = "club";
    GameState.player.shield = "none";
};

document.querySelector('#equip_shield').onclick = function() {
    GameState.player.weapon = "none";
    GameState.player.shield = "leather_shield";
};

document.querySelector('#equip_best').onclick = function() {
    GameState.player.weapon = "erdricks_sword";
    GameState.player.armor = "erdricks_armor";
    GameState.player.shield = "silver_shield";
};

document.querySelector('#equip_none').onclick = function() {
    GameState.player.weapon = "none";
    GameState.player.armor = "none";
    GameState.player.shield = "none";
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
