// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var vis = require('vis');
var container = document.getElementById('visualization');

var options = {
    manipulation: false,
    
    physics: {
        enabled: false
    }
};

var colors = {
    computer: {
        background: '#EEFFEE',
        border: '#000000'
    },
    human: {
        background: '#FFE0C4',
        border: '#000000'
    }
};

var rectangle_color = '#FAB100';

var nodes = [
    {
        id: 'start_node',
        size: 21,
        color: colors.computer,
        shape: 'dot',
        x: 200, y: 35
    },
    {
        'id': 'load_tasks', 'size': 150, 'label': "carregar tarefas", 'color': colors.computer, 'shape': 'box', 'font': { 'face': 'monospace', 'align': 'left' },
        x: 200, y: 135
    },
    {
        id: 'decision',
        shape: 'diamond',
        label: 'Escolha uma tarefa',
        size: 25,
        borderWidth: 1,
        x: 200, y: 335,
        color: colors.human
    },
    {
        'id': 'back_rec', 'size': 150, 'label': "outra coisa", 'color': rectangle_color, 'shape': 'box', 'font': { 'face': 'monospace', 'align': 'left' },
        x: 10, y: 135
    }
];

//
// Note: there are a couple of node id's present here which do not exist
// - cfg_0x00417563 
// - cfg_0x00403489
// - cfg_0x0042f03f
//
// The edges with these id's will not load into the Network instance.
//
var edges = [
    { 'color': {color: "#000000"}, 'from': "start_node", 'to': "load_tasks", 'arrows': 'to', 'physics': false, 'smooth': { 'type': 'cubicBezier' } },
    { 'color': {color: "#000000"}, 'from': "load_tasks", 'to': "decision", 'arrows': 'to', 'physics': false, 'smooth': { 'type': 'cubicBezier' } },
    {
        'color': {color: "#000000"},
        'label': 'true',
        'from': "decision", 'to': "back_rec", 'arrows': 'to', 'physics': false, 'smooth': { 'type': 'cubicBezier' } },
    { 
        'color': {color: "#000000"},
        'from': "back_rec", 'to': "cfg_0x00405a2e", 'arrows': 'to', 'physics': false, 'smooth': { 'type': 'cubicBezier' } 
    }
];

var data = { 'nodes': nodes, 'edges': edges }
var gph = new vis.Network(container, data, options);
window.gph = gph;


