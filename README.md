DragonWarriorJS
===============

The purpose of this project is to learn JavaScript and Canvas by recreating
the original NES Dragon Warrior. Given that purpose, this is a very rough
code base with plenty of room for improvements (refactoring, optimizations,
etc.). All in due time.

The "index.html" file loads all the scripts, testing elements, and the canvas.

The "assets" folder contains:
  Font file
  Music files
  Sound effect files
  Sprite sheets (characters, enemies, map tiles)
  
The "scripts" folder contains all the game objects. Here is a brief description
of each file:
audio.js - audio object, plays music and sound
enemies.js - enemy object, contains all enemy parameters (stats, attacks, etc.)
game.js - game loop, check input, draw assets, outputs test data
init.js - global functions and variables
items.js - weapon_list, armor_list, shield_list, and item objects - equipment
  and item data
map_functions.js - map object, map interaction functions
maps.js - maps object, contains data for each map (world, towns, dungeons)
menu.js - menu object, main or in game menu interaction functions
npcs.js - npc object, functions for in game NPCs
player.js - player object, properties and functions for the player
spells.js - spells object, functions for character spells

