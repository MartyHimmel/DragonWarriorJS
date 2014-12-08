Game.script = {
    text: function (string) {
        if (typeof string !== 'undefined') {
            if (typeof text.script[string] !== 'undefined') {
                if (text.script[string] instanceof Array) {
                    text.script[string].forEach(function (element, index, array) {
                        Game.display_text(element);
                    });
                } else {
                    Game.display_text(text.script[string]);
                }
            }
        }
    },

    menu_yes_no: function (string, yes_handler, no_handler) {
        //..
    }
};