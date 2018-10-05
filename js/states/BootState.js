var player = player || {};
var world = world || {};
var game = game || {};

var BootState = function (game) {};

var loadingText;

BootState.prototype.init = function () {
    world = new World ( this.game );
    player = new Player ( this.game );
}

BootState.prototype.preload = function () {

}

BootState.prototype.create = function () {
    loadingText = this.game.add.text(16, 16, 'Chargement', {
        fontSize: '32px',
        fill: '#fff'
    });
    this.game.state.start('PreloadState');
}
