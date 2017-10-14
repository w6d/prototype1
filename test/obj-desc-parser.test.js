"use strict";
const parser = require('../src/obj-desc-parser.js');
const assert = require('assert');

describe('ObjDescParser', () => {
    let context, user;
    beforeEach(() => {
        user = {name: "Turing", knowledge: {fusca: {classification: {car: {}}}}};
        context = {user: user};
        context.words_path = require('../src/pt-br.js');
    });

    test("eu tenho um fusca", (res) => {
        assert.deepEqual(res, {target: "user.inventory", value: {name: "fusca"}});
    });

    test("eu tenho uma caneta", (res) => {
        assert.deepEqual(res, {target: "user.inventory", value: {name: "caneta"}});
    });
    
    test("meu fusca é creme", (res) => {
        assert.deepEqual(res, {target: "user.inventory.fusca.color", value: {name: "creme"}});
    });

    test("meu coelho é branco", (res) => {
        assert.deepEqual(res, {target: "user.inventory.coelho.color", value: {name: "branco"}});
    });
    
    test("meu fusca é 1500", (res) => {
        assert.deepEqual(res, {target: "user.inventory.fusca.engine", value: {name: "1500"}});
    });
    
    test("o meu fusca é 1500", (res) => {
        assert.deepEqual(res, {target: "user.inventory.fusca.engine", value: {name: "1500"}});
    });

    test("a minha caneta é azul", (res) => {
        assert.deepEqual(res, {target: "user.inventory.caneta.color", value: {name: "azul"}});
    });

    test("a minha mochila é preta e vermelha", (res) => {
        assert.deepEqual(res, {target: "user.inventory.mochila.color", value: {name: "preta"}});
    });

    function test(phrase, callback) {
        it('transforma "' + phrase + '" em json', (done) => {
            parser(phrase, context).then(res => {
                callback(res);
                done();
            }).catch(err => {
                done(err);
            });
        });
    }
});