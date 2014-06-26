var tile_width = 32;
var tile_height = 32;

// Main game window
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

// In game menu window
var canvas_menu = document.getElementById("game_menu");
var ctx_menu = canvas_menu.getContext("2d");

// Initialize game state
var game_state = "exploration";

function clear() {
	return context.clearRect(0, 0, canvas.width, canvas.height);
}

function getId(id) {
	return document.getElementById(id);
}

// Keyboard inputs
var keysDown = {};
window.addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
});
window.addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
});

var ticks = 0;
function tick() {
	ticks++;
	if (ticks === 60) {
		ticks = 0;
	}
	return ticks;
}

function random_number(min, max) {
	return Math.floor(Math.random() * max) + min;
}

