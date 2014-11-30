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
	option_to_add.id = name;
	option_to_add.text = name;
	option_to_add.value = value;

	if (getId(list_id).namedItem(name) === null) {
		getId(list_id).add(option_to_add);
	}
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
	if (text instanceof Array) {
		//TODO: ...
	} else {
		setTimeout(function() {
			getId('dialog').innerHTML += text + "\n";
			getId('dialog').scrollTop = getId('dialog').scrollHeight;
		}, 500);
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

//Polyfill; providing JavaScript methods which may not be present in older browsers.

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(searchElement, fromIndex) {

		var k;

		// 1. Let O be the result of calling ToObject passing
		//    the this value as the argument.
		if (this == null) {
		  	throw new TypeError('"this" is null or not defined');
		}

    	var O = Object(this);

    	// 2. Let lenValue be the result of calling the Get
    	//    internal method of O with the argument "length".
    	// 3. Let len be ToUint32(lenValue).
    	var len = O.length >>> 0;

    	// 4. If len is 0, return -1.
    	if (len === 0) {
      		return -1;
    	}

    	// 5. If argument fromIndex was passed let n be
    	//    ToInteger(fromIndex); else let n be 0.
    	var n = +fromIndex || 0;

    	if (Math.abs(n) === Infinity) {
      		n = 0;
    	}

    	// 6. If n >= len, return -1.
    	if (n >= len) {
      		return -1;
    	}

    	// 7. If n >= 0, then Let k be n.
    	// 8. Else, n<0, Let k be len - abs(n).
    	//    If k is less than 0, then let k be 0.
    	k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    	// 9. Repeat, while k < len
    	while (k < len) {
			// a. Let Pk be ToString(k).
			//   This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the
			//    HasProperty internal method of O with argument Pk.
			//   This step can be combined with c
			// c. If kPresent is true, then
			//    i.  Let elementK be the result of calling the Get
			//        internal method of O with the argument ToString(k).
			//   ii.  Let same be the result of applying the
			//        Strict Equality Comparison Algorithm to
			//        searchElement and elementK.
			//  iii.  If same is true, return k.
      		if (k in O && O[k] === searchElement) {
        		return k;
      		}
      		k++;
    	}
    	return -1;
  	};
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(callback, thisArg) {

		var T, k;

		if (this == null) {
			throw new TypeError(' this is null or not defined');
		}

		// 1. Let O be the result of calling ToObject passing the |this| value as the argument.
		var O = Object(this);

		// 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
		// 3. Let len be ToUint32(lenValue).
		var len = O.length >>> 0;

		// 4. If IsCallable(callback) is false, throw a TypeError exception.
		// See: http://es5.github.com/#x9.11
		if (typeof callback !== "function") {
			throw new TypeError(callback + ' is not a function');
		}

		// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
		if (arguments.length > 1) {
			T = thisArg;
		}

		// 6. Let k be 0
		k = 0;

		// 7. Repeat, while k < len
		while (k < len) {

			var kValue;

			// a. Let Pk be ToString(k).
			//   This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
			//   This step can be combined with c
			// c. If kPresent is true, then
			if (k in O) {

				// i. Let kValue be the result of calling the Get internal method of O with argument Pk.
				kValue = O[k];

				// ii. Call the Call internal method of callback with T as the this value and
				// argument list containing kValue, k, and O.
				callback.call(T, kValue, k, O);
			}
			// d. Increase k by 1.
			k++;
		}
		// 8. return undefined
	};
}