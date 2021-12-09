import Data from './data.js';
import Game from './game.js';

export default {
    text: function (string) {
        if (!string || !Data.text.script[string]) {
            return;
        }

        if (Data.text.script[string] instanceof Array) {
            Data.text.script[string].forEach((element, index, array) => {
                Game.displayText(element);
            });
        } else {
            Game.displayText(Data.text.script[string]);
        }
    },

    menu_yes_no: function (string, yes_handler, no_handler) {
        //..
    }
};
