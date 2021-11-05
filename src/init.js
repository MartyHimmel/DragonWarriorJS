import map from './map.js';
import player from './player.js';
import Game from './game.js';

// Random test stuff
// -------------------------------------------------------------------

document.querySelector('#add_exp').onclick = function() {
    player.add_experience(500);
};

document.querySelector('#equip_club').onclick = function() {
    player.weapon = "club";
    player.shield = "none";
};

document.querySelector('#equip_shield').onclick = function() {
    player.weapon = "none";
    player.shield = "leather_shield";
};

document.querySelector('#equip_both').onclick = function() {
    player.weapon = "erdricks_sword";
    player.shield = "leather_shield";
};

document.querySelector('#equip_none').onclick = function() {
    player.weapon = "none";
    player.shield = "none";
};

document.querySelector('#move_to_map').onclick = function() {
    map.load_map(document.querySelector('#map_name').value);
};

Game.begin();
