/**
 * Created by dan.cehan on 5/28/2016.
 */


var ControlAnotherPlayer = function (index, game, player, startX, startY) {

    var x = startX;
    var y = startY;
    console.log(x+' AICI '+y);
    this.game = game;
    this.health = 3;
    this.player = player;
    this.alive = true;
    this.player= game.add.sprite(x, y, 'player',4);
    this.player.animations.add('left', [5, 11, 17, 23], 5, true);
    this.player.animations.add('right', [2, 8, 14, 20], 5, true);
    this.player.animations.add('up', [6, 12, 18, 24], 5, true);
    this.player.animations.add('down', [10, 16, 22, 28], 5, true);
    this.player.animations.add('attack', [30, 36, 42, 48], 5, true);
    this.player.body.setSize(32, 27, 25, 25);


    this.player.anchor.setTo(0.5, 0.5);

    this.player.name = index.toString();
    this.player.body.immovable = true;
    this.player.body.collideWorldBounds = true;

    this.player.angle = game.rnd.angle();

    this.lastPosition = { x: x, y: y }
}

ControlAnotherPlayer.prototype.update = function () {
    console.log("Update la inamici");
    if (this.player.x !== this.lastPosition.x || this.player.y !== this.lastPosition.y) {
        this.player.play('left')
        this.player.rotation = Math.PI + game.physics.arcade.angleToXY(this.player, this.lastPosition.x, this.lastPosition.y)
    } else {
        this.player.play('stop')
    }

    this.lastPosition.x = this.player.x;
    this.lastPosition.y = this.player.y;
}

