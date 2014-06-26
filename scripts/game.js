// update stats and equipment
function stats() {
	getId("level").innerHTML = player.level();
	getId("max_hp").innerHTML = player.max_hp();
	getId("current_hp").innerHTML = player.current_hp;
	getId("max_mp").innerHTML = player.max_mp();
	getId("current_mp").innerHTML = player.current_mp;
	getId("strength").innerHTML = player.strength();
	getId("agility").innerHTML = player.agility();
	getId("experience").innerHTML = player.experience;
	getId("gold").innerHTML = player.gold;
	getId("attack_power").innerHTML = player.attack_power();
	getId("defense_power").innerHTML = player.defense_power();
	getId("weapon").innerHTML = player.weapon;
	getId("armor").innerHTML = player.armor;
	getId("shield").innerHTML = player.shield;
}

function update() {
	map.check_location();
	if (65 in keysDown && game_state === "exploration") {
		game_state = "menu";
		menu.open_menu();
	}
	if (66 in keysDown && game_state === "menu") {
		game_state = "exploration";
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
	tick();
}

function draw() {
	clear();
	map.draw_viewport(map.current_map, player.offset_x, player.offset_y);
	npc.draw_npcs();
	update();
}

// The main game loop
function main() {
	requestAnimationFrame(main);
	draw();
	stats();

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
		"Rescued Princess? = " + player.rescued_princess + "<br>";
}

// Start the game!
map.load_map("World");
main();

// Random test stuff
getId('b_music_intro').onclick = function() {
	getId('music_intro').play();
};
getId('b_music_overworld').onclick = function() {
	getId('music_overworld').play();
};
getId('add_exp').onclick = function() {
	player.gain_experience(5);
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