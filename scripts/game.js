// Start the game!
player.name = prompt("What is thy name?");
if (player.name === "") player.name = "Yuji Horii";
change_state("exploration");
map.load_map("World");
player.load_player();
player.set_current_tile();
add_text("Welcome, descendent of Erdrick.");
main();

// The main game loop
function main() {
	requestAnimationFrame(main);
	if (game_state === "exploration") draw();
	update();
	display_output();
}

function draw() {
	clear();
	map.draw_viewport(map.current_map, player.offset_x, player.offset_y);
	npc.draw_npcs();
}

function update() {
	delta_time = Date.now();
	map.check_location();
	player.load_player();
	if (game_state === "exploration") {
		if (38 in keysDown) { // Player holding up
			player.move("up");
		}
		else if (40 in keysDown) { // Player holding down
			player.move("down");
		}
		else if (37 in keysDown) { // Player holding left
			player.move("left");
		}
		else if (39 in keysDown) { // Player holding right
			player.move("right");
		}
		else {
			player.draw_player();
		}
	}
	if (game_state === "combat") {
		combat.draw_screen();
		combat.draw_enemy();
		if (combat.initiative_round === true) {
			combat.initiative();
		}
		if (combat.player_turn === false) {
			setTimeout(function() {
				combat.enemy_attack();
			}, 1000);
		}

		if (88 in keysDown) { // Player presses 'x'
			combat.enemy_id = "";
			change_state("exploration");
		}
	}
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
		"combat random = " + combat.random_num + "<br>" +
		"current zone = " + map.current_zone + "<br>" +
		"player turn = " + combat.player_turn + "<br>";

	getId('output2').innerHTML = "Current Map = " + map.current_map + "<br>" +
		"Game State = " + game_state + "<br>" +
		"Number of NPCS = " + maps[map.current_map].npcs.length + "<br>" +
		"<hr>" +
		"Rescued Princess? = " + player.rescued_princess + "<br>" +
		"<hr>";

	// Commands
	if (game_state === "combat") {
		getId('fight').onclick = function() {
			combat.player_attack();
		};
		getId('run').onclick = function() {
			combat.player_run();
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
	player.weapon = "club";
	player.shield = "leather_shield";
};
getId('equip_none').onclick = function() {
	player.weapon = "none";
	player.shield = "none";
};
getId('move_to_map').onclick = function() {
	map.load_map(getId('map_name').value);
};
