var Unit = function (game, sprite, id, owner, team, x, y, hp, atk, ms, coins) {
    this.id = id;
    this.owner = owner;
    this.team = team;
    this.game = game;

    this.x = x;
    this.y = y;
    this.markerUnit = this.game.add.graphics();
    this.targetTileX = 0;
    this.targetTileY = 0;

    this.hp = hp;
    this.atk = atk;
    this.ms = ms;
    this.coins = coins;

    this.lastDir = 0;
    this.isAlive = true;
    this.isMoving = false;
    this.isAttacking = false;
    this.isSelected = false;
    this.path = [];

    this.unit = this.game.add.sprite(x, y, sprite, 4);
    this.unit.animations.add('left', [5, 11, 17, 23], 5, true);
    this.unit.animations.add('right', [2, 8, 14, 20], 5, true);
    this.unit.animations.add('up', [6, 12, 18, 24], 5, true);
    this.unit.animations.add('down', [10, 16, 22, 28], 5, true);

    this.game.physics.enable(this.unit, Phaser.Physics.ARCADE);
    this.unit.body.setSize(32, 27, 25, 25);

};

Unit.prototype.createMarker = function () {
    this.markerUnit = this.game.add.graphics();
};

Unit.prototype.update = function () {
    this.game.physics.arcade.collide(this.unit, map.layer);
    this.markerUnit.x = map.layer.getTileX(this.unit.x) * 32;
    this.markerUnit.y = map.layer.getTileY(this.unit.y) * 32;

    if (this.path.length != 0) {
        if (this.path.length == 1) {
            this.lastDir = this.path[0];
        }
        if (!this.isMoving) {
            this.isMoving = true;

            switch (this.path[0]) {
                case 1:
                    tweenUp = game.add.tween(this.unit).to({y: this.unit.y - 32}, 500, Phaser.Easing.Linear.None, true);
                    this.unit.play('up');
                    tweenUp.onComplete.addOnce(function () {
                        this.isMoving = false;
                        this.path.shift();
                        // this.x = this.unit.x;
                        // this.y = this.unit.y;
                    }, this);

                    break;

                case 2:
                    tweenDown = game.add.tween(this.unit).to({y: this.unit.y + 32}, 500, Phaser.Easing.Linear.None, true);
                    this.unit.play('down');
                    tweenDown.onComplete.addOnce(function () {
                        this.isMoving = false;
                        this.path.shift();
                        // this.x = this.unit.x;
                        // this.y = this.unit.y;
                    }, this);
                    break;

                case 3:
                    tweenLeft = game.add.tween(this.unit).to({x: this.unit.x - 32}, 500, Phaser.Easing.Linear.None, true);
                    this.unit.play('left');
                    tweenLeft.onComplete.addOnce(function () {
                        this.isMoving = false;
                        this.path.shift();
                        // this.x = this.unit.x;
                        // this.y = this.unit.y;
                    }, this);
                    break;

                case 4:
                    tweenRight = game.add.tween(this.unit).to({x: this.unit.x + 32}, 500, Phaser.Easing.Linear.None, true);
                    this.unit.play('right');
                    tweenRight.onComplete.addOnce(function () {
                        this.isMoving = false;
                        this.path.shift();
                        // this.x = this.unit.x;
                        // this.y = this.unit.y;
                    }, this);
                    break;
            }
        }
    } else {
        this.path = [];
        this.unit.animations.stop(true, this);
        switch (this.lastDir) {
            case 1:
                this.unit.animations.frame = 0;
                break;
            case 2:
                this.unit.animations.frame = 4;
                break;
            case 3:
                this.unit.animations.frame = 5;
                break;
            case 4:
                this.unit.animations.frame = 2;
                break;
        }
    }
};

function moveUnits() {
    if (game.input.activePointer.button == 2) {
        tileMouseX = map.layer.getTileX(map.marker.x);
        tileMouseY = map.layer.getTileX(map.marker.y);

        for (var i = 0; i < me.createdUnits.length; i++) {
            if (me.createdUnits[i].isSelected == true) {
                X = map.layer.getTileX(me.createdUnits[i].markerUnit.x + 32);
                Y = map.layer.getTileX(me.createdUnits[i].markerUnit.y + 32);

                me.targetTileX = X;
                me.targetTileY = Y;
                me.createdUnits[i].path = map.getPath(tileMouseX, tileMouseY, X, Y);
            }
        }
    }
}

window.Unit = Unit;
window.moveUnits = moveUnits;