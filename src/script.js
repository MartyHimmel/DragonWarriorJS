import Game from './game.js';
import text from './text.js';

export default {
    text: function (string) {
        if (!string || !text.script[string]) {
            return;
        }

        if (text.script[string] instanceof Array) {
            text.script[string].forEach((element, index, array) => {
                Game.display_text(element);
            });
        } else {
            Game.display_text(text.script[string]);
        }
    },

    menu_yes_no: function (string, yes_handler, no_handler) {
        //..
    }
};
