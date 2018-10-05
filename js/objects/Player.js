
var Player = function (game) {
    this.game = game;
    this.sprite = null;
    this.jump = 0;
    this.canJump = false;
    this.score = 0;
};

Player.prototype.preload = function () {
    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

Player.prototype.create = function (x,y) {
    this.sprite = this.game.add.sprite(x, y, 'dude');
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 300;
    this.sprite.body.collideWorldBounds = true;
    //  Our two animations, walking left and right.
    this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
    this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
    this.sprite.animations.add('idle', [4], 10, true);
}

Player.prototype.update = function (world,cursors) {
    //  Collide the player with the platforms
    var hitPlatform = this.game.physics.arcade.collide(this.sprite, world.platforms);

    this.game.physics.arcade.overlap(this.sprite, world.stars, this.collectStar, null, this);
    //  Reset the players velocity (movement)
    this.sprite.body.velocity.x = 0;
    if (cursors.left.isDown) {
        //  Move to the left
        this.sprite.body.velocity.x = -150;
        this.sprite.animations.play('left');
    } else if (cursors.right.isDown) {
        //  Move to the right
        this.sprite.body.velocity.x = 150;
        this.sprite.animations.play('right');
    } else {
        this.sprite.animations.play('idle');
    }
    if (this.sprite.body.touching.down || hitPlatform)
        this.jump = 2;
    //  Allow the player to jump if they are touching the ground.
    if (this.canJump && cursors.up.isDown && this.jump > 0) {
        this.sprite.body.velocity.y += -180;
        this.jump--;
        this.canJump = false;
    } else if (!cursors.up.isDown ) {
        this.canJump = true;
    }
}

Player.prototype.collectStar = function (player,star) {
    // Removes the star from the screen
    star.kill();
    this.score += 10;
}
