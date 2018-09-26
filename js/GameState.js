
var platforms;
var stars;
var player;
var cursors;

var score = 0;
var scoreText;

var GameState = function(game) {
};

GameState.prototype.preload = function() {
    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    this.game.load.image('sky', 'assets/sky.png');
    this.game.load.image('ground', 'assets/platform.png');
    this.game.load.image('star', 'assets/star.png');
    this.game.load.spritesheet('coin', 'assets/coin.png', 32, 32);
}

GameState.prototype.create = function() {
    //  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    this.game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, this.game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    // The player and its settings
    player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');
    this.game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    player.animations.add('idle', [4], 10, true);

    //  Finally some stars to collect
    stars = this.game.add.group();
    stars.enableBody = true;
    for (var i = 0; i < 12; i++) {
        var star = stars.create(i * 70, 0, 'coin');
        star.animations.add('idle', [0, 1, 2, 3, 4, 5], 10, true);
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
        star.animations.play('idle');
    }

    //  The score
    scoreText = this.game.add.text(16, 16, 'score: 0', {
        fontSize: '32px',
        fill: '#000'
    });

    //  Our controls.
    cursors = this.game.input.keyboard.createCursorKeys();

    // Stretch to fill
    //game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    // Keep original size
    // game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

    // Maintain aspect ratio
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    this.game.input.onDown.add(gofull, this);

}

GameState.prototype.update = function() {
    //  Collide the player with the platforms
    var hitPlatform = this.game.physics.arcade.collide(player, platforms);
    this.game.physics.arcade.collide(stars, platforms);

    this.game.physics.arcade.overlap(player, stars, collectStar, null, this);
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    if (cursors.left.isDown) {
        //  Move to the left
        player.body.velocity.x = -150;
        player.animations.play('left');
    } else if (cursors.right.isDown) {
        //  Move to the right
        player.body.velocity.x = 150;
        player.animations.play('right');
    } else {
        player.animations.play('idle');
    }
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -320;
    }
}

//function render() {}

function gofull() {

    if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen(false);
    }

}

function collectStar(player, star) {
    // Removes the star from the screen
    star.kill();
    score += 10;
    scoreText.text = 'Score: ' + score;
}

/*
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
});
*/
