var Unit = function (game, sprite, owner, hp, minAtk, maxAtk, ms, coins) {
    //this.id = id;
    this.owner = owner;
    this.game = game;

    this.x = 0;
    this.y = 0;
    this.markerUnit = this.game.add.graphics();
    this.lastDir = 0;
    this.sprite = sprite;

    this.maxHp = hp;
    this.hp = hp;
    this.minAtk = minAtk;
    this.maxAtk = maxAtk;
    this.ms = ms;
    this.coins = coins;

    this.isSelected = false;
    this.isMoving = false;
    this.isAlive = true;
    this.isAttacking = false;
    this.attackDir = 0;

    this.path = [];
};

// Unit.prototype.createMarker = function () {
//     this.markerUnit = this.game.add.graphics();
// };

Unit.prototype.create = function (id, x, y) {

    var toCreate = new Unit(this.game, this.sprite, /*this.id,*/ this.owner, this.hp, this.minAtk, this.maxAtk, this.ms, this.coins);
    toCreate.id = id;
    toCreate.x = x;
    toCreate.y = y;
    toCreate.unit = this.game.add.sprite(x, y, toCreate.sprite, 4);


    toCreate.attLeft = toCreate.unit.animations.add('attackLeft', [35, 41, 47, 53], 5, true);
    toCreate.attRight = toCreate.unit.animations.add('attackRight', [32, 38, 44, 50], 5, true);
    toCreate.attUp = toCreate.unit.animations.add('attackUp', [30, 36, 42, 48], 5, true);
    toCreate.attDown = toCreate.unit.animations.add('attackDown', [34, 40, 46, 52], 5, true);

    toCreate.attLeft.onLoop.add(function () {
        console.log('am facut un loop de left')
    }, this);
    toCreate.attRight.onLoop.add(function () {
        console.log('am facut un loop de right')
    }, this);
    toCreate.attUp.onLoop.add(function () {
        console.log('am facut un loop de up')
    }, this);
    toCreate.attDown.onLoop.add(function () {
        console.log('am facut un loop de down')
    }, this);

    toCreate.unit.animations.add('left', [5, 11, 17, 23], 5 + (this.ms / 100), true);
    toCreate.unit.animations.add('right', [2, 8, 14, 20], 5 + (this.ms / 100), true);
    toCreate.unit.animations.add('up', [6, 12, 18, 24], 5 + (this.ms / 100), true);
    toCreate.unit.animations.add('down', [10, 16, 22, 28], 5 + (this.ms / 100), true);


    toCreate.game.physics.enable(toCreate.unit, Phaser.Physics.ARCADE);
    toCreate.unit.body.setSize(32, 32, 25, 25);
    toCreate.markerUnit.x = map.layer.getTileX(toCreate.unit.x) * 32;
    toCreate.markerUnit.y = map.layer.getTileY(toCreate.unit.y) * 32;


    //hpBar
    toCreate.hpBarContainer = this.game.add.graphics(0, 0);
    //toCreate.hpBarContainer.lineStyle(2, 0x000000, 1);
    toCreate.hpBarContainer.beginFill(0x000000, 0.8);
    toCreate.hpBarContainer.drawRect(23, 7, 34, 9);

    toCreate.hpBar = this.game.add.graphics(0, 0);
    //toCreate.hpBar.lineStyle(2, 0x000000, 1);
    toCreate.hpBar.beginFill(0xe60000, 0.8);
    toCreate.hpBar.drawRect(25, 9, 32, 6);

    toCreate.unit.addChild(toCreate.hpBarContainer);
    toCreate.unit.addChild(toCreate.hpBar);


    var X = map.layer.getTileX(toCreate.markerUnit.x + 32);
    var Y = map.layer.getTileY(toCreate.markerUnit.y + 32);

    map.rawGrid[Y][X] = 0;
    map.graph = new Graph(map.rawGrid);
    //coliziune dinamica pe harta

    toCreate.targetTile = {
        x: X,
        y: Y
    };

    toCreate.targetAttack = {
        x: 0,
        y: 0
    };

    toCreate.initialTargetTile = toCreate.targetTile;//pozitia unde trebuie sa ajung

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
                    tweenUp = game.add.tween(this.unit).to({y: this.unit.y - 32}, 500 - this.ms, Phaser.Easing.Linear.None, true);
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
                    tweenDown = game.add.tween(this.unit).to({y: this.unit.y + 32}, 500 - this.ms, Phaser.Easing.Linear.None, true);
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
                    tweenLeft = game.add.tween(this.unit).to({x: this.unit.x - 32}, 500 - this.ms, Phaser.Easing.Linear.None, true);
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
                    tweenRight = game.add.tween(this.unit).to({x: this.unit.x + 32}, 500 - this.ms, Phaser.Easing.Linear.None, true);
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

/*
 nu ma misc, marker = target
 apas click > marker != target
 generez drum pana la target
 */

//TODO: fix blocaj la mai multe unitati ? 
Unit.prototype.update2 = function () {
    this.updateAlive();

    if (this.isAlive) {
        this.game.physics.arcade.collide(this.unit, map.layer);
        var X = map.layer.getTileX(this.markerUnit.x + 32);
        var Y = map.layer.getTileX(this.markerUnit.y + 32);

        //console.log(this.id + ": sunt la ->" + X + " " + Y);
        //console.log(this.id + ": merg la ->" + this.targetTile.x + " " + this.targetTile.y);

        // if (!this.isMoving && this.path.length == 0) {
        //     map.rawGrid[map.layer.getTileY(this.markerUnit.y + 32)][map.layer.getTileX(this.markerUnit.x + 32)] = 0;
        //     map.graph = new Graph(map.rawGrid);
        // }

        if (this.targetTile.x != X || this.targetTile.y != Y) { // am primit alt targetTile != markerUnit

            if (!this.isMoving) {
                //nu ma misc inca ori am termina o animatie
                //recalculez un path de la tile-ul curent si pun ca "ma misc"

                //this.moveComplete = false;
                this.targetTile = map.getAvailableTile(this.initialTargetTile);
                //this.targetTile = map.getEnemyTile(this.initialTargetTile);
                //  console.log("Targetul este x= " + this.targetTile.x + "   y="+this.targetTile.y);

                this.path = map.getPath(this.targetTile.x, this.targetTile.y, X, Y);

                if (this.path.length != 0) {
                    this.isMoving = true;
                }//daca e blocat imprejur cu totul

                //console.log("Path: " + this.path);
            } else {
                switch (this.path[0]) {
                    case 1:
                        //plec de la > pun pe 1
                        //ajung la > pun pe 0
                        if (map.rawGrid[map.layer.getTileY(this.markerUnit.y)][map.layer.getTileX(this.markerUnit.x + 32)] == 0) {
                            this.targetTile = map.getAvailableTile(this.initialTargetTile);

                            this.path = map.getPath(this.targetTile.x, this.targetTile.y, X, Y);
                            this.unit.animations.stop(true, this);

                            // this.isMoving = false;
                            break;
                        }
                        map.rawGrid[map.layer.getTileY(this.markerUnit.y + 32)][map.layer.getTileX(this.markerUnit.x + 32)] = 1;
                        map.rawGrid[map.layer.getTileY(this.markerUnit.y)][map.layer.getTileX(this.markerUnit.x + 32)] = 0;
                        map.graph = new Graph(map.rawGrid);
                        var tweenUp = game.add.tween(this.unit).to({y: this.unit.y - 32}, 500 - this.ms, Phaser.Easing.Linear.None, true);
                        this.unit.play('up');
                        this.lastDir = this.path[0];
                        this.path = [];

                        //trimite la server fiecare tile - unu cate unu - parcurs
                        socket.emit('move_unit2', {
                            id: this.id,
                            goTo: this.lastDir
                        });

                        tweenUp.onComplete.addOnce(function () {
                            this.markerUnit.x = map.layer.getTileX(this.unit.x) * 32;
                            this.markerUnit.y = map.layer.getTileY(this.unit.y) * 32;
                            this.isMoving = false;
                        }, this);
                        break;

                    case 2:
                        //plec de la > pun pe 1
                        //ajung la > pun pe 0
                        if (map.rawGrid[map.layer.getTileY(this.markerUnit.y + 64)][map.layer.getTileX(this.markerUnit.x + 32)] == 0) {
                            this.targetTile = map.getAvailableTile(this.initialTargetTile);

                            this.path = map.getPath(this.targetTile.x, this.targetTile.y, X, Y);
                            this.unit.animations.stop(true, this);
                            // this.isMoving = false;
                            break;
                        }
                        map.rawGrid[map.layer.getTileY(this.markerUnit.y + 32)][map.layer.getTileX(this.markerUnit.x + 32)] = 1;
                        map.rawGrid[map.layer.getTileY(this.markerUnit.y + 64)][map.layer.getTileX(this.markerUnit.x + 32)] = 0;
                        map.graph = new Graph(map.rawGrid);
                        var tweenDown = game.add.tween(this.unit).to({y: this.unit.y + 32}, 500 - this.ms, Phaser.Easing.Linear.None, true);
                        this.unit.play('down');
                        this.lastDir = this.path[0];
                        this.path = [];

                        //trimite la server fiecare tile - unu cate unu - parcurs
                        socket.emit('move_unit2', {
                            id: this.id,
                            goTo: this.lastDir
                        });

                        tweenDown.onComplete.addOnce(function () {
                            this.markerUnit.x = map.layer.getTileX(this.unit.x) * 32;
                            this.markerUnit.y = map.layer.getTileY(this.unit.y) * 32;
                            this.isMoving = false;

                        }, this);
                        break;

                    case 3:
                        //plec de la > pun pe 1
                        //ajung la > pun pe 0
                        if (map.rawGrid[map.layer.getTileY(this.markerUnit.y + 32)][map.layer.getTileX(this.markerUnit.x)] == 0) {
                            this.targetTile = map.getAvailableTile(this.initialTargetTile);

                            this.path = map.getPath(this.targetTile.x, this.targetTile.y, X, Y);
                            this.unit.animations.stop(true, this);
                            // this.isMoving = false;
                            break;
                        }
                        map.rawGrid[map.layer.getTileY(this.markerUnit.y + 32)][map.layer.getTileX(this.markerUnit.x + 32)] = 1;
                        map.rawGrid[map.layer.getTileY(this.markerUnit.y + 32)][map.layer.getTileX(this.markerUnit.x)] = 0;
                        map.graph = new Graph(map.rawGrid);
                        var tweenLeft = game.add.tween(this.unit).to({x: this.unit.x - 32}, 500 - this.ms, Phaser.Easing.Linear.None, true);
                        this.unit.play('left');
                        this.lastDir = this.path[0];
                        this.path = [];

                        //trimite la server fiecare tile - unu cate unu - parcurs
                        socket.emit('move_unit2', {
                            id: this.id,
                            goTo: this.lastDir
                        });

                        tweenLeft.onComplete.addOnce(function () {
                            this.markerUnit.x = map.layer.getTileX(this.unit.x) * 32;
                            this.markerUnit.y = map.layer.getTileY(this.unit.y) * 32;
                            this.isMoving = false;

                        }, this);
                        break;

                    case 4:
                        //plec de la > pun pe 1
                        //ajung la > pun pe 0
                        if (map.rawGrid[map.layer.getTileY(this.markerUnit.y + 32)][map.layer.getTileX(this.markerUnit.x + 64)] == 0) {
                            this.targetTile = map.getAvailableTile(this.initialTargetTile);

                            this.path = map.getPath(this.targetTile.x, this.targetTile.y, X, Y);
                            this.unit.animations.stop(true, this);
                            // this.isMoving = false;
                            break;
                        }
                        map.rawGrid[map.layer.getTileY(this.markerUnit.y + 32)][map.layer.getTileX(this.markerUnit.x + 32)] = 1;
                        map.rawGrid[map.layer.getTileY(this.markerUnit.y + 32)][map.layer.getTileX(this.markerUnit.x + 64)] = 0;
                        map.graph = new Graph(map.rawGrid);
                        var tweenRight = game.add.tween(this.unit).to({x: this.unit.x + 32}, 500 - this.ms, Phaser.Easing.Linear.None, true);
                        this.unit.play('right');
                        this.lastDir = this.path[0];
                        this.path = [];

                        //trimite la server fiecare tile - unu cate unu - parcurs
                        socket.emit('move_unit2', {
                            id: this.id,
                            goTo: this.lastDir
                        });

                        tweenRight.onComplete.addOnce(function () {
                            this.markerUnit.x = map.layer.getTileX(this.unit.x) * 32;
                            this.markerUnit.y = map.layer.getTileY(this.unit.y) * 32;
                            this.isMoving = false;

                        }, this);
                        break;

                    default:

                        break;
                }
            }
        } else { //daca markerUnit == targetTile
            if (!this.isAttacking) {
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

function moveUnits2() {
    if (game.input.activePointer.button == 2) {
        if (game.input.activePointer.x >= 700) { //daca pointerul este in GUI, nu-l lasa sa dea move-uri
            return;
        }
        var tileMouseX = map.layer.getTileX(map.marker.x);
        var tileMouseY = map.layer.getTileX(map.marker.y);

        for (var i = 0; i < me.createdUnits.length; i++) {
            if (me.createdUnits[i].isSelected == true) {
                //console.log("moveUnits2: trimit la " + tileMouseX + " " + tileMouseY)
                me.createdUnits[i].targetTile.x = tileMouseX;
                me.createdUnits[i].targetTile.y = tileMouseY;
                me.createdUnits[i].initialTargetTile.x = tileMouseX;
                me.createdUnits[i].initialTargetTile.y = tileMouseY;

                //TODO: implementeaza asta cu id-uri unice si pozitii succesive (goTo in loc de X,Y)
                // socket.emit('move_unit', {
                //     id: i,
                //     targetTileX: tileMouseX,
                //     targetTileY: tileMouseY
                // });
            }
        }

    }
}

Unit.prototype.updateAlive = function () {

    if (this.isAlive) {
        if (this.hp <= 0) {
            this.isAlive = false;
            this.hpBar.destroy(1);
            this.hpBarContainer.destroy(1);
            this.unit.animations.frame = 60;
            me.createdUnits[this.id].isSelected = false;

            map.rawGrid[map.layer.getTileY(this.markerUnit.y + 32)][map.layer.getTileX(this.markerUnit.x + 32)] = 1;
            map.graph = new Graph(map.rawGrid);

            this.unit.animations.frame = 60;
            var sprite = this.unit;
            setTimeout(function () {
                sprite.kill();
            }, 10000);
        }
        else {
            this.hpBar.width = (this.hp * 32 ) / this.maxHp;
            this.hpBar.x = 25 * (1 - this.hp / this.maxHp);
        }

    } else {
        if (this.unit != null)
            this.unit.animations.frame = 60;
    }
}

function attackUnits() {

    if (game.input.activePointer == 1) {
        if (game.input.activePointer.x >= 700) {
            return;
        }
        else {

        }
    }
}

Unit.prototype.updateAttack = function () {
    var currentTile = {
        x: map.layer.getTileX(this.markerUnit.x + 32),
        y: map.layer.getTileY(this.markerUnit.y + 32)
    };


    this.isAttacking = false;
    if (this.targetTile.x == currentTile.x && this.targetTile.y == currentTile.y) {
        var targetAttack = map.getEnemyTile(currentTile, 2);


        //TODO: implement range de scanare & range de attack (2,1)


        if (!this.isAttacking) {
            if (targetAttack != null) {
                if (currentTile.x == targetAttack.x && Math.abs(targetAttack.y - currentTile.y) <= 1) {
                    if (targetAttack.y > currentTile.y) {
                        //jos
                        this.attackDir = 2;
                        this.isAttacking = true;
                    }
                    else {
                        //sus
                        this.attackDir = 1;
                        this.isAttacking = true;
                    }
                } else if (currentTile.y == targetAttack.y && Math.abs(targetAttack.x - currentTile.x) <= 1) {
                    if (targetAttack.x > currentTile.x) {
                        //dreapta
                        this.attackDir = 4;
                        this.isAttacking = true;
                    }
                    else {
                        this.attackDir = 3;
                        this.isAttacking = true;
                        //stanga
                    }
                }
            }
        }

        if (this.isAttacking) {//isAttacking == true
            switch (this.attackDir) {
                case 1:
                    console.log('Tre sa atac in ' + this.attackDir);
                    this.unit.play('attackUp');
                    // this.attUp.play();

                    break;
                case 2:
                    console.log('Tre sa atac in ' + this.attackDir);
                    this.unit.play('attackDown');
                    // this.attDown.play();
                    break;
                case 3:
                    console.log('Tre sa atac in ' + this.attackDir);
                    this.unit.play('attackLeft');
                    // this.attLeft.play();
                    break;
                case 4:
                    console.log('Tre sa atac in ' + this.attackDir);
                    this.unit.play('attackRight');
                    // this.attRight.play();
                    break;

                default:
                    break;
            }


            //console.log('scanez si stau pe loc');

        }
    }
//gaseste inamic intr-o zona de "range" de la currentTile
};

window.Unit = Unit;
window.moveUnits = moveUnits;
window.moveUnits = moveUnits2;