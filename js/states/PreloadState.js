var player = player || {};
var world = world || {};
var game = game || {};

var PreloadState = function (game) {};

var currentTime;

PreloadState.prototype.init = function () {
}

PreloadState.prototype.preload = function () {
    currentTime = game.time.time;
    world.preload ();
    player.preload ();
}

PreloadState.prototype.create = function () {
    loadingText.kill ();
    this.state.start('GameState');
}
