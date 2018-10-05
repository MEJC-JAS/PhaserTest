
var World = function (game) {
    this.game = game;
    this.sky = null;
    this.platforms = null;
    this.stars = null;
};

World.prototype.preload = function () {
    this.game.load.image('sky', 'assets/sky.png');
    this.game.load.image('ground', 'assets/platform.png');
    this.game.load.image('star', 'assets/star.png');
    this.game.load.spritesheet('coin', 'assets/coin.png', 32, 32);
}

World.prototype.create = function () {
    //  A simple background for our game
    this.sky = this.game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;
    var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    var ledge = this.platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = this.platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    this.stars = this.game.add.group();
    this.stars.enableBody = true;
    for (var i = 0; i < 12; i++) {
        var star = this.stars.create(i * 70, 0, 'coin');
        star.animations.add('idle', [0, 1, 2, 3, 4, 5], 10, true);
        star.body.collideWorldBounds = true;
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
        star.animations.play('idle');
    }
}

World.prototype.update = function () {
    this.game.physics.arcade.collide(this.stars, this.platforms);
    this.game.physics.arcade.collide(this.stars);
}
