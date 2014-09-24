var tile_width = 32;
var tile_height = 32;

var time = Date.now();
var delta_time = Date.now();

// Main game window
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

function clear() {
	return context.clearRect(0, 0, canvas.width, canvas.height);
}

function getId(id) {
	return document.getElementById(id);
}

function add_option(name, value, list_id) {
	var option_to_add = document.createElement('option');
	option_to_add.text = name;
	option_to_add.value = value;
	getId(list_id).add(option_to_add);
}

// Initialize game state
var game_state = "";

function change_state(input) {
	var possible_states = ["exploration", "combat"];
	if (possible_states.indexOf(input) > -1) {
		game_state = input;
		change_command_set();
	}
}

function change_command_set() {
	if (game_state === "exploration") {
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

	if (game_state === "combat") {
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
