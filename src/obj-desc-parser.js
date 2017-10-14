"use strict";

module.exports = function parse(text, context) {
    return new Promise((resolve, reject) => {
        try {
            let tokens = text.split(/ /);
            let current = context.words_path;
            forContext(tokens, 0, current, resolve, reject);
        } catch(e) {
            reject(e);
        }
    });

    function forContext(tokens, i, acurrent, resolve, reject) {
        if (acurrent && acurrent.result) {
            resolve(acurrent.result);
            return;
        }
        if (acurrent && typeof acurrent.then === 'function') {
            acurrent.then(current_res => {
                forContext(tokens, i, current_res, resolve, reject);
            }).catch(err => {
                reject(err);
            });
            return;
        }
        if (i < tokens.length) {
            let next_token = tokens[i+1];
            let current_token = tokens[i];
            console.log('current_token', current_token);
            let current = acurrent[current_token];
            if (!current) {
                console.log('sem', current_token, 'em', acurrent);
            }
            if (typeof current === 'function') {
                forContext(tokens, i + 2, current(text, next_token, context), resolve, reject);
            }
            else {
                forContext(tokens, i + 1, current, resolve, reject);
            }
        } else {
            resolve(acurrent);
        }
    }
};
