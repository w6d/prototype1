"use strict";

(function() {
    let words_path = {
        eu: {
            tenho: {
                um: (text, next_token) => {
                    console.log("um ->", next_token);
                    return {result: {target: "user.inventory", value: {name: "fusca"}}};
                },
                uma: (text, next_token) => {
                    console.log("uma ->", next_token);
                    return {result: {target: "user.inventory", value: {name: "caneta"}}};
                }
            }
        },
        meu: (text, next_token) => {
            console.log("meu ->", next_token);
            let target = "user.inventory." + next_token;
            let subject = next_token;
            let res = {};
            res[subject] = {
                "é": (text, next_token) => {
                    if (subject === 'fusca' && !isNaN(next_token)) {
                        return { result: { target: target + '.engine', value: {name: next_token} }};
                    }
                    else {
                        return {result: {target: target + ".color", value: {name: next_token}}};
                    }
                }
            };
            return res;
        }
    };
    words_path['o'] = {meu: words_path['meu']};
    module.exports = words_path;
})();
 