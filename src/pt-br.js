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
        meu: (text, next_token, context) => {
            console.log("meu ->", next_token);
            let target = "user.inventory." + next_token;
            let subject = next_token;
            let res = {
                "é": (text, next_token, context) => {
                    let user_subject = context.user.knowledge[subject] || {classification: {}};
                    if (user_subject.classification['car'] && !isNaN(next_token)) {
                        return { result: { target: target + '.engine', value: {name: next_token} }};
                    }
                    else {
                        return {result: {target: target + ".color", value: {name: next_token}}};
                    }
                }
            };
            return res;
        },
        a: {
            minha: (text, next_token, context) => {
                console.log('a minha ->', next_token);
                return new Promise((resolve, reject) => {
                    let new_path = {
                        'é': (text, next_token2, context) => {
                            return {result: {target: 'user.inventory.' + next_token + '.color', value: {name: next_token2}}};
                        }
                    };
                    resolve(new_path);
                });
            }
        }
    };
    words_path['o'] = {meu: words_path['meu']};
    module.exports = words_path;
})();
 