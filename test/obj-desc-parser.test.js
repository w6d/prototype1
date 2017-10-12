"use strict";
const parser = require('../src/obj-desc-parser.js');
const assert = require('assert');

describe('ObjDescParser', () => {
    let context, user;
    beforeEach(() => {
        user = {name: "Turing"};
        context = {user: user};
        context.words_path = {
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
        context.words_path['o'] = {meu: context.words_path['meu']};
    });
    it('transforma "eu tenho um fusca" em json', () => {
        let res = parser("eu tenho um fusca", context);
        assert.deepEqual(res, {target: "user.inventory", value: {name: "fusca"}});
    });
    it('transforma "eu tenho uma caneta" em json', () => {
        let res = parser("eu tenho uma caneta", context);
        assert.deepEqual(res, {target: "user.inventory", value: {name: "caneta"}});
    });
    it('transforma "meu fusca é creme" em json', () => {
        let res = parser("meu fusca é creme", context);
        assert.deepEqual(res, {target: "user.inventory.fusca.color", value: {name: "creme"}});
    });
    it('transforma "meu coelho é branco" em json', () => {
        let res = parser("meu coelho é branco", context);
        assert.deepEqual(res, {target: "user.inventory.coelho.color", value: {name: "branco"}});
    });
    it('transforma "meu fusca é 1500" em json', () => {
        let res = parser("meu fusca é 1500", context);
        assert.deepEqual(res, {target: "user.inventory.fusca.engine", value: {name: "1500"}});
    });
    it('transforma "o meu fusca é 1500" em json', () => {
        let res = parser("o meu fusca é 1500", context);
        assert.deepEqual(res, {target: "user.inventory.fusca.engine", value: {name: "1500"}});
    });
});