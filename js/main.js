var IDE_HOOK = false;
var VERSION = '2.6.2';

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);

