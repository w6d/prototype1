"use strict";



module.exports = function parse(text, context) {
    let object = {}, target = "user.inventory";
    let tokens = text.split(/ /);
    object.name = tokens[tokens.length-1];

    let current = context.words_path;
    for (let i = 0; i < tokens.length; i ++) {
        let next_token = tokens[i+1];
        current = current[tokens[i]];
        if (typeof current === 'function') {
            current = current(text, next_token);
            if (current.result) {
                return current.result;
            }
        }
    }
    return current;
};
