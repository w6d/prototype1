"use strict";

const bootstrap = require('../src/manager/bootstrap.js');
const BlackCircle = require('../src/activity/black-circle.js');
const Arrow = require('../src/activity/arrow.js');
const RoundedRectangle = require('../src/activity/rounded-rectangle.js');
const Diamond = require('../src/activity/diamond.js');

describe.only('manager bootstrap', () => {
    it('inicia o manager', () => {
        let bc = new BlackCircle({
            cron: '0 9-18 * 1-5'
        });
        bc.arrowToRoundedRectangle({
            name: "carregar as tarefas do usuario",
            run: (proccess) => {
                // carrega uma tarefa do trello, por exemplo
                return { target: 'user.task', value: { name: 'lavar o carro' } };
            }
        }).arrowToSysDiamond({
            check: (proccess) => {
                return { target: 'user.task' };
            },
            with: (diamond) => {
                diamond.arrowToUserDiamond({
                    guard: (result) => {
                        return result !== null;
                    },
                    ask: (proccess) => {
                        return `Você já acabou a tarefa ${proccess.user.task.name}?`;
                    }
                }).arrowToRoundedRectangle({
                    guard: (result) => {
                        return result === null;
                    }
                })
            }
        });
        bootstrap();
    });
});