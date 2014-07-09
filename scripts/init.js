var tile_width = 32;
var tile_height = 32;

var time = Date.now();
var delta_time = Date.now();

// Main game window
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

// In game menu window
var canvas_menu = document.getElementById("game_menu");
var ctx_menu = canvas_menu.getContext("2d");

function clear() {
	return context.clearRect(0, 0, canvas.width, canvas.height);
}

function getId(id) {
	return document.getElementById(id);
}

// Initialize game state
var game_state = "";

function change_state(input) {
	var possible_states = ["exploration", "menu", "combat"];
	if (possible_states.indexOf(input) > -1) {
		game_state = input;
		change_command_set();
	}
}

function change_command_set() {
	if (game_state === "exploration") {
		getId('commands').innerHTML =
			"<input type='button' id='talk' value='Talk'>" +
			"<input type='button' id='spell' value='Spell'><br>" +
			"<input type='button' id='item' value='Item'>" +
			"<input type='button' id='door' value='Door'><br>" +
			"<input type='button' id='search' value='Search'>" +
			"<input type='button' id='take' value='Take'>";
	}

	if (game_state === "combat") {
		getId('commands').innerHTML =
			"<input type='button' id='fight' value='Fight'>" +
			"<input type='button' id='spell' value='Spell'><br>" +
			"<input type='button' id='run' value='Run'>" +
			"<input type='button' id='item' value='Item'>";
	}
}

// Keyboard inputs
var keysDown = {};
window.addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
});
window.addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
});

function random_number(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
