var player = player || {};
var world = world || {};
var game = game || {};
var cursors;

var scoreText;

var GameState = function (game) {};

GameState.prototype.preload = function () {
}

GameState.prototype.create = function () {
    //  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);


    world.create ();
    player.create (32, this.game.world.height - 150);

    scoreText = this.game.add.text(16, 16, 'score: 0', {
        fontSize: '32px',
        fill: '#000'
    });
    cursors = this.game.input.keyboard.createCursorKeys();

    // Stretch to fill
    //game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    // Keep original size
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
    // Maintain aspect ratio
    //game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    //this.game.input.onDown.add(gofull, this);
}

GameState.prototype.update = function () {
    world.update ();
    player.update (world,cursors);
    scoreText.text = 'Score: ' + player.score;
}

function gofull() {

    if (game.scale.isFullScreen) {
        game.scale.stopFullScreen();
    } else {
        game.scale.startFullScreen(false);
    }

}
