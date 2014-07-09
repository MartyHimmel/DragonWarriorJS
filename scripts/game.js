// Start the game!
player.name = prompt("What is thy name?");
if (player.name === "") player.name = "Yuji Horii";
change_state("exploration");
map.load_map("World");
main();

// The main game loop
function main() {
	requestAnimationFrame(main);
	draw();
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
	if (65 in keysDown && game_state === "exploration") { // Player presses 'a'
		change_state("menu");
		menu.open_menu();
	}
	if (66 in keysDown && game_state === "menu") { // Player presses 'b'
		change_state("exploration");
		menu.close_menu();
	}
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
			player.key_input = false;
		}
	}
	if (game_state === "menu") {
		player.draw_player();
	}
	if (game_state === "combat") {
		combat.player_turn = true;
		combat.draw_screen();
		combat.draw_enemy();
		combat.battle_text();
		if (88 in keysDown) { // Player presses 'x'
			combat.enemy_id = "";
			change_state("exploration");
		}
	}
}

// display stats, equipment, commands, and other options (side bars)
function display_output() {
	getId('character_name').innerHTML = player.name;
	getId('level').innerHTML = player.level();
	getId('max_hp').innerHTML = player.max_hp();
	getId('current_hp').innerHTML = player.current_hp;
	getId('max_mp').innerHTML = player.max_mp();
	getId('current_mp').innerHTML = player.current_mp;
	getId('strength').innerHTML = player.strength();
	getId('agility').innerHTML = player.agility();
	getId('experience').innerHTML = player.experience;
	getId('gold').innerHTML = player.gold;
	getId('attack_power').innerHTML = player.attack_power();
	getId('defense_power').innerHTML = player.defense_power();
	getId('weapon').innerHTML = player.weapon;
	getId('armor').innerHTML = player.armor;
	getId('shield').innerHTML = player.shield;

	getId('output').innerHTML = "Time = " + Math.floor(Date.now()/1000) + "<br>" +
		"Player input = " + player.key_input + "<br>" +
		"player.x / 32 = " + player.x / tile_width + "<br>" +
		"player.y / 32 = " + player.y / tile_height + "<br>" +
		"player.offset_x = " + player.offset_x + "<br>" +
		"player.offset_y = " + player.offset_y + "<br>" +
		"steps = " + player.steps + "<br>";

	getId('output2').innerHTML = "Current Map = " + map.current_map + "<br>" +
		"Game State = " + game_state + "<br>" +
		"Number of NPCS = " + maps[map.current_map].npcs.length + "<br>" +
		"<hr>" +
		"Rescued Princess? = " + player.rescued_princess + "<br>" +
		"<hr>";
	if (combat.enemy_id !== "") {
		getId('output2').innerHTML +=
		"Enemy = " + enemy[combat.enemy_id].name + "<br>" +
		"HP = " + combat.enemy_current_hp + "<br>" +
		"Strength = " + enemy[combat.enemy_id].strength + "<br>" +
		"Agility = " + enemy[combat.enemy_id].agility + "<br>" +
		"Sleep Res. = " + enemy[combat.enemy_id].sleep_resist + "<br>" +
		"Stopspell Res. = " + enemy[combat.enemy_id].stopspell_resist + "<br>" +
		"Hurt Res. = " + enemy[combat.enemy_id].hurt_resist + "<br>" +
		"Dodge = " + enemy[combat.enemy_id].dodge + "<br>" +
		"Exp. = " + enemy[combat.enemy_id].experience + "<br>" +
		"Gold = " + combat.gold_reward + "<br>";
	}

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

getId('add_exp').onclick = function() {
	player.add_experience(500);
};
getId('equip_club').onclick = function() {
	player.weapon = "Club";
	player.shield = "None";
};
getId('equip_shield').onclick = function() {
	player.weapon = "None";
	player.shield = "Leather Shield";
};
getId('equip_both').onclick = function() {
	player.weapon = "Club";
	player.shield = "Leather Shield";
};
getId('equip_none').onclick = function() {
	player.weapon = "None";
	player.shield = "None";
};
getId('move_to_map').onclick = function() {
	map.load_map(getId('map_name').value);
};
