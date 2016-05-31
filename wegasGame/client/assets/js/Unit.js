var Unit = function (game, sprite, id, owner, team, hp, atk, ms, coins) {
    this.id = id;
    this.owner = owner;
    this.team = team;
    this.game = game;

    this.x = 0;
    this.y = 0;
    this.markerUnit = this.game.add.graphics();
    this.lastDir = 0;
    this.sprite = sprite;

    this.hp = hp;
    this.atk = atk;
    this.ms = ms;
    this.coins = coins;

    this.isAlive = true;
    this.isMoving = false;
    this.isAttacking = false;
    this.isSelected = false;
    this.path = [];
};

// Unit.prototype.createMarker = function () {
//     this.markerUnit = this.game.add.graphics();
// };

Unit.prototype.create = function (x, y) {

    var toCreate = new Unit(this.game, this.sprite, this.id, this.owner, this.team, this.hp, this.atk, this.ms, this.coins);
    toCreate.x = x;
    toCreate.y = y;
    toCreate.unit = this.game.add.sprite(x, y, toCreate.sprite, 4);
    toCreate.unit.animations.add('left', [5, 11, 17, 23], 5+(this.ms/100), true);
    toCreate.unit.animations.add('right', [2, 8, 14, 20], 5+(this.ms/100), true);
    toCreate.unit.animations.add('up', [6, 12, 18, 24], 5+(this.ms/100), true);
    toCreate.unit.animations.add('down', [10, 16, 22, 28], 5+(this.ms/100), true);
    toCreate.game.physics.enable(toCreate.unit, Phaser.Physics.ARCADE);
    toCreate.unit.body.setSize(32, 32, 25, 25);
    toCreate.markerUnit.x = map.layer.getTileX(toCreate.unit.x) * 32;
    toCreate.markerUnit.y = map.layer.getTileY(toCreate.unit.y) * 32;

    var X = map.layer.getTileX(toCreate.markerUnit.x + 32);
    var Y = map.layer.getTileY(toCreate.markerUnit.y + 32);

    map.rawGrid[Y][X] = 0;

    map.graph = new Graph(map.rawGrid);


    /*
     unit ~= markerUnit
     */

    return toCreate;
};

Unit.prototype.update = function () {
    this.game.physics.arcade.collide(this.unit, map.layer);

    if (!this.isMoving && this.path.length == 0) {
        map.rawGrid[map.layer.getTileY(this.markerUnit.y + 32)][map.layer.getTileX(this.markerUnit.x + 32)] = 0;
        map.graph = new Graph(map.rawGrid);
    }

    if (this.path.length != 0) { // vectorul nu e gol
        if (this.path.length == 1) {
            this.lastDir = this.path[0]; //ultima pozitie ca sa stiu pe ce frame ma opresc
        }

        if (!this.isMoving) { //daca nu ma misca (nu am terminat tweenul)

            //TODO:verifica daca urmatorul tile este

            this.isMoving = true;

            switch (this.path[0]) {
                case 1:
                    //plec de la > pun pe 1
                    map.rawGrid[map.layer.getTileY(this.markerUnit.y + 32)][map.layer.getTileX(this.markerUnit.x + 32)] = 1;
                    //ajung la > pun pe 0
                    map.rawGrid[map.layer.getTileY(this.markerUnit.y)][map.layer.getTileX(this.markerUnit.x + 32)] = 0;
                    map.graph = new Graph(map.rawGrid);
                    tweenUp = game.add.tween(this.unit).to({y: this.unit.y - 32}, 500-this.ms, Phaser.Easing.Linear.None, true);
                    this.unit.play('up');

                    tweenUp.onComplete.addOnce(function () {

                        this.markerUnit.x = map.layer.getTileX(this.unit.x) * 32;
                        this.markerUnit.y = map.layer.getTileY(this.unit.y) * 32;
                        this.path.shift();
                        //sa isi updateze pozitia abia dupa ce termina

                        // console.log('M-am dus in 1');
                        // console.log('Path curent: ' + this.path);
                        this.isMoving = false;
                    }, this);
                    break;

                case 2:
                    //plec de la > pun pe 1
                    map.rawGrid[map.layer.getTileY(this.markerUnit.y + 32)][map.layer.getTileX(this.markerUnit.x + 32)] = 1;
                    //ajung la > pun pe 0
                    map.rawGrid[map.layer.getTileY(this.markerUnit.y + 64)][map.layer.getTileX(this.markerUnit.x + 32)] = 0;
                    map.graph = new Graph(map.rawGrid);
                    tweenDown = game.add.tween(this.unit).to({y: this.unit.y + 32}, 500-this.ms, Phaser.Easing.Linear.None, true);
                    this.unit.play('down');
                    tweenDown.onComplete.addOnce(function () {

                        this.markerUnit.x = map.layer.getTileX(this.unit.x) * 32;
                        this.markerUnit.y = map.layer.getTileY(this.unit.y) * 32;
                        this.path.shift();
                        //sa isi updateze pozitia abia dupa ce termina

                        // console.log('M-am dus in 2');
                        // console.log('Path curent: ' + this.path);
                        this.isMoving = false;
                    }, this);
                    break;

                case 3:
                    //plec de la > pun pe 1
                    map.rawGrid[map.layer.getTileY(this.markerUnit.y + 32)][map.layer.getTileX(this.markerUnit.x + 32)] = 1;
                    //ajung la > pun pe 0
                    map.rawGrid[map.layer.getTileY(this.markerUnit.y + 32)][map.layer.getTileX(this.markerUnit.x)] = 0;
                    map.graph = new Graph(map.rawGrid);
                    tweenLeft = game.add.tween(this.unit).to({x: this.unit.x - 32}, 500-this.ms, Phaser.Easing.Linear.None, true);
                    this.unit.play('left');
                    tweenLeft.onComplete.addOnce(function () {

                        this.markerUnit.x = map.layer.getTileX(this.unit.x) * 32;
                        this.markerUnit.y = map.layer.getTileY(this.unit.y) * 32;
                        this.path.shift();
                        //sa isi updateze pozitia abia dupa ce termina

                        // console.log('M-am dus in 3');
                        // console.log('Path curent: ' + this.path);
                        this.isMoving = false;
                    }, this);
                    break;

                case 4:
                    //plec de la > pun pe 1
                    map.rawGrid[map.layer.getTileY(this.markerUnit.y + 32)][map.layer.getTileX(this.markerUnit.x + 32)] = 1;
                    //ajung la > pun pe 0
                    map.rawGrid[map.layer.getTileY(this.markerUnit.y + 32)][map.layer.getTileX(this.markerUnit.x + 64)] = 0;
                    map.graph = new Graph(map.rawGrid);
                    tweenRight = game.add.tween(this.unit).to({x: this.unit.x + 32}, 500-this.ms, Phaser.Easing.Linear.None, true);
                    this.unit.play('right');
                    tweenRight.onComplete.addOnce(function () {

                        this.markerUnit.x = map.layer.getTileX(this.unit.x) * 32;
                        this.markerUnit.y = map.layer.getTileY(this.unit.y) * 32;
                        this.path.shift();
                        //sa isi updateze pozitia abia dupa ce termina

                        // console.log('M-am dus in 4');
                        // console.log('Path curent: ' + this.path);
                        this.isMoving = false;
                    }, this);
                    break;
            }
        } else { // m-am "oprit" - am terminat tweenul

        }
    } else { // vectorul path e gol
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
        if (game.input.activePointer.x >= 700) { //daca pointerul este in GUI, nu-l lasa sa dea move-uri
            return;
        }
        tileMouseX = map.layer.getTileX(map.marker.x);
        tileMouseY = map.layer.getTileX(map.marker.y);

        for (var i = 0; i < me.createdUnits.length; i++) {
            if (me.createdUnits[i].isSelected == true) {
                X = map.layer.getTileX(me.createdUnits[i].markerUnit.x + 32);
                Y = map.layer.getTileX(me.createdUnits[i].markerUnit.y + 32);

                me.createdUnits[i].path = map.getPath(tileMouseX, tileMouseY, X, Y);

                if (me.createdUnits[i].isMoving) {
                    me.createdUnits[i].path.unshift(0);
                } // ca sa nu taie aiurea din noul path


            }
        }
    }
}

window.Unit = Unit;
window.moveUnits = moveUnits;