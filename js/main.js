
var IDE_HOOK = false;
var VERSION = '2.6.2';

var platforms;

function preload() {
    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';

    game.load.image('phaser', 'sprites/phaser-dude.png');
    game.load.image('sky', 'skies/sky1.png');
    game.load.image('ground', 'sprites/platform.png');
    game.load.image('carrot', 'sprites/carrot.png');
}

function create() {
    var sprite = game.add.sprite(0, 0, 'phaser');
    var carrot = game.add.sprite(400, 300, 'carrot');
}

function update() {
}

function render() {
}

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
                           { preload: preload, create: create, update: update, render: render });
