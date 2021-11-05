DragonWarriorJS
===============

Recreating the original NES Dragon Warrior using JavaScript

##Files

The "index.html" file loads all the scripts, testing elements, and the canvas.

The "assets" folder contains:
* Font file
* Music files
* Sound effect files
* Sprite sheets (characters, enemies, map tiles)

The "scripts" folder contains all the game objects. Here is a brief description
of each file:
* audio.js - audio object, plays music and sound
* combat.js - combat related functions (player attack, enemy attack, run, etc.)
* config.js - all configurable values:
    * sprites
    * level data
    * weapons, armor, and items
    * spell data
    * enemy data
    * map data (world, towns, dungeons)
* game.js - game loop, rendering, script processing
* init.js - initialize the game
* map.js - map object, map interaction functions
* player.js - player object, properties and functions for the player
* text.js - all in-game displayed text

##Grunt setup (optional)

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started guide](http://gruntjs.com/getting-started).

Supported options:

```bash
grunt lint #check source for errors, etc
grunt      #build a combined/minified "release" version of the project
```

##References
* English text dump by [Blueberry Buttface](http://www.gamefaqs.com/nes/563408-dragon-warrior/faqs/54647)
* Enemy stats by [x_loto](http://www.gamefaqs.com/nes/563408-dragon-warrior/faqs/69121)
* Most formulas by [Ryan8bit](http://www.gamefaqs.com/nes/563408-dragon-warrior/faqs/61640)
