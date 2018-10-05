var IDE_HOOK = false;
var VERSION = '2.11.0';

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
game.state.add('GameState', GameState);
game.state.add('PreloadState', PreloadState);
game.state.add('BootState', BootState);
game.state.start('BootState');
