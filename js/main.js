
var IDE_HOOK = false;
var VERSION = '2.6.2';

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';
    game.load.image('phaser', 'sprites/phaser-dude.png');
    console.log ( "preload done" );
}

function create() {
    var sprite = game.add.sprite(0, 0, 'phaser');
}

function update() {
}

function render() {
}

console.log ("This is a test" );
