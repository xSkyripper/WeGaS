var Map = function () {
    this.map = game.add.tilemap('map');
    this.map.addTilesetImage('summer', 'tiles');
    //adaugare mapJson & tiles
    this.map.setCollisionBetween(301, 332);
    this.map.setCollisionBetween(17, 86);
    this.map.setCollisionBetween(103, 126);
    this.map.setCollisionBetween(128, 142);
    this.map.setCollisionBetween(143, 166);
    this.map.setCollisionBetween(168, 178);
    this.map.setCollisionBetween(211, 212);
    this.map.setCollisionBetween(200, 221);
    this.map.setCollisionBetween(209, 232);
    this.map.setCollisionBetween(233, 236);
    //adaugare coliziuni

    this.layer = this.map.createLayer('Layer1');
    this.layer.resizeWorld();
    //this.layer.debug = true;
    //creare layer

    //add bases
    this.base1 = new Building(game, 'base1', 2000, 250, 70, 1);
    this.base2 = new Building(game, 'base2', 2000, 1850, 1800, 2);


    //collisionMatrix
    var data = this.map.layer.data;
    this.rawGrid = [];
    for (var i = 0; i < data.length; i++) {
        this.rawGrid[i] = [];
        for (var j = 0; j < data[i].length; j++) {
            if (data[i][j].collideUp == false && data[i][j].collideDown == false &&
                data[i][j].collideRight == false && data[i][j].collideLeft == false) {
                this.rawGrid[i][j] = 1;  // free
            } else {
                this.rawGrid[i][j] = 0;  // colision
            }
        }
    }

    //add collide base 1
    this.rawGrid[2][8] = 0;
    this.rawGrid[3][8] = 0;
    this.rawGrid[4][8] = 0;
    this.rawGrid[5][8] = 0;
    this.rawGrid[2][9] = 0;
    this.rawGrid[3][9] = 0;
    this.rawGrid[4][9] = 0;
    this.rawGrid[5][9] = 0;
    this.rawGrid[2][10] = 0;
    this.rawGrid[3][10] = 0;
    this.rawGrid[4][10] = 0;
    this.rawGrid[5][10] = 0;
    this.rawGrid[2][11] = 0;
    this.rawGrid[3][11] = 0;
    this.rawGrid[4][11] = 0;
    this.rawGrid[5][11] = 0;

    //add collide base 2
    this.rawGrid[56][58] = 0;
    this.rawGrid[57][58] = 0;
    this.rawGrid[58][58] = 0;
    this.rawGrid[59][58] = 0;
    this.rawGrid[57][58] = 0;
    this.rawGrid[56][59] = 0;
    this.rawGrid[57][59] = 0;
    this.rawGrid[58][59] = 0;
    this.rawGrid[59][59] = 0;
    this.rawGrid[56][60] = 0;
    this.rawGrid[57][60] = 0;
    this.rawGrid[58][60] = 0;
    this.rawGrid[59][60] = 0;
    this.rawGrid[57][61] = 0;
    this.rawGrid[58][61] = 0;
    this.rawGrid[59][61] = 0;

    this.graph = new Graph(this.rawGrid);
    //end_collisionMatrix

    this.cursors = game.input.keyboard.createCursorKeys();
    //adaugare control sageti ptr harta

    this.marker = game.add.graphics();
    this.marker.lineStyle(1, 0xffffff, 1);
    this.marker.drawRect(0, 0, 32, 32);
    //adaugare marker ptr. mouse hover

};

Map.prototype.updateCamera = function () {
    if (this.cursors.left.isDown) {
        game.camera.x -= 6;
    }
    else if (this.cursors.right.isDown) {
        game.camera.x += 6;
    }

    if (this.cursors.up.isDown) {
        game.camera.y -= 6;
    }
    else if (this.cursors.down.isDown) {
        game.camera.y += 6;
    }
};

Map.prototype.updateMarkers = function () {
    this.marker.x = this.layer.getTileX(game.input.activePointer.worldX) * 32; // Mouse x coordinate
    this.marker.y = this.layer.getTileY(game.input.activePointer.worldY) * 32; // Mouse y coordinate

};

Map.prototype.getPath = function (tileMouseX, tileMouseY, tileX, tileY) {
    var start = this.graph.grid[tileY][tileX];
    var end = this.graph.grid[tileMouseY][tileMouseX];
    var result = astar.search(this.graph, start, end);
    var aux = start;
    var path = [];

    //console.log("Start :" + start);
    //console.log("Final :" + end);

    for (var i = 0; i < result.length; i++) {
        if (aux.x > result[i].x) {
            path.push(1);
        }
        if (aux.x < result[i].x) {
            path.push(2);
        }
        if (aux.y > result[i].y) {
            path.push(3);
        }
        if (aux.y < result[i].y) {
            path.push(4);
        }
        aux = result[i];
    }

    //console.log('Path: ' + path);
    return path;
};


Map.prototype.getAvailableTile = function (tile) {
    var tileY = tile.y;
    var tileX = tile.x;


    if (this.rawGrid[tileY][tileX] == 1) {
        return tile; // daca nu exista coliziune pe pozitia curenta
    }
    else {
        var l = 2;

        var tileYcurrent = tileY - 1;
        var tileXcurrent = tileX - 1;

        while (1) {
            for (var i = tileYcurrent; i <= tileYcurrent + l; i++) {
                if (this.rawGrid[i][tileXcurrent] == 1) {
                    var resultTile = {x: 0, y: 0};
                    resultTile.y = i;
                    resultTile.x = tileXcurrent;
                    //console.log("Am pus  "+i+" "+tileXcurrent);
                    return resultTile;
                }

                if (this.rawGrid[i][tileXcurrent + l] == 1) {
                    var resultTile = {x: 0, y: 0};
                    resultTile.y = i;
                    resultTile.x = tileXcurrent + l;
                    //console.log("Am pus  "+i+" "+tileXcurrent+"opus");
                    return resultTile;
                }
            }

            for (var j = tileXcurrent; j <= tileXcurrent + l; j++) {
                if (this.rawGrid[tileYcurrent][j] == 1) {
                    var resultTile = {x: 0, y: 0};
                    resultTile.y = tileYcurrent;
                    resultTile.x = j;
                    //console.log("Am pus  "+j+" "+tileYcurrent);
                    return resultTile;
                }

                if (this.rawGrid[tileYcurrent + l][j] == 1) {
                    var resultTile = {x: 0, y: 0};
                    resultTile.y = tileYcurrent + l;
                    resultTile.x = j;
                    //console.log("Am pus  "+j+" "+tileYcurrent+"opus");
                    return resultTile;
                }

            }

            l = l + 2;
            tileYcurrent = tileYcurrent - 1; //se cauta din stanga sus
            tileXcurrent = tileXcurrent - 1;
        }

    }//sf else -> caut in jurul pozitiei "tile" curente
};

Map.prototype.isEnemy = function (tile, player)//la poztitia asta este inamic pe tile=ul respectiv
{
    if (player != null)
        for (var i = 0; i < player.createdUnits.length; i++) {
            var X = map.layer.getTileX(player.createdUnits[i].markerUnit.x + 32);
            var Y = map.layer.getTileX(player.createdUnits[i].markerUnit.y + 32);

            if (tile.x == X && tile.y == Y) {
                return {is: true, unit: player.createdUnits[i]};
            }
        }

    return {is: false, unit: null};
};


Map.prototype.getEnemyTile = function (tile, range, player)  /// tile este pozitita unitului
{
    var tileY = tile.y - range;
    var tileX = tile.x - range;
    var n = range * 2 + 1;

    for (var i = tileX; i < tileX + n; i++)
        for (var j = tileY; j < tileY + n; j++) {

            var checkEnemy = this.isEnemy({x: i, y: j}, player);
            if (checkEnemy.is) {
                var resultTile = {x: 0, y: 0};
                resultTile.x = i;
                resultTile.y = j;
                return {tile: resultTile, unit: checkEnemy.unit};
            }
        }

    return {tile: null, unit: null};

    /*


     var l = 2;
     var limit = 6;

     var tileYcurrent = tileY - 1;
     var tileXcurrent = tileX - 1;

     while (1) {
     for (var i = tileYcurrent; i <= tileYcurrent + l; i++) {
     if (this.rawGrid[i][tileXcurrent] == 0 && this.isEnemy({x: tileXcurrent, y: i})) {
     console.log("exista eney -------" + this.isEnemy({x: tileXcurrent, y: i}));
     var resultTile = {x: 0, y: 0};
     resultTile.y = i;
     resultTile.x = tileXcurrent;
     //console.log("Am pus  "+i+" "+tileXcurrent);
     return resultTile;
     }

     if (this.rawGrid[i][tileXcurrent + l] == 0 && this.isEnemy({x: tileXcurrent + l, y: i})) {
     console.log("exista eney -------" + this.isEnemy({x: tileXcurrent + l, y: i}));
     var resultTile = {x: 0, y: 0};
     resultTile.y = i;
     resultTile.x = tileXcurrent + l;
     //console.log("Am pus  "+i+" "+tileXcurrent+"opus");
     return resultTile;
     }
     }

     for (var j = tileXcurrent; j <= tileXcurrent + l; j++) {
     if (this.rawGrid[tileYcurrent][j] == 0 && this.isEnemy({x: j, y: tileYcurrent[j]})) {
     console.log("exista eney -------" + this.isEnemy({x: j, y: tileYcurrent[j]}));
     var resultTile = {x: 0, y: 0};
     resultTile.y = tileYcurrent;
     resultTile.x = j;
     //console.log("Am pus  "+j+" "+tileYcurrent);
     return resultTile;
     }

     if (this.rawGrid[tileYcurrent + l][j] == 0 && this.isEnemy({x: j, y: tileYcurrent + l})) {
     console.log("exista eney -------" + this.isEnemy({x: j, y: tileYcurrent + l}));
     var resultTile = {x: 0, y: 0};
     resultTile.y = tileYcurrent + l;
     resultTile.x = j;
     //console.log("Am pus  "+j+" "+tileYcurrent+"opus");
     return resultTile;
     }

     }

     l = l + 2;

     tileYcurrent = tileYcurrent - 1; //se cauta din stanga sus
     tileXcurrent = tileXcurrent - 1;

     if (l > limit) return null;//daca nu a gasit si a depasit range-ul
     }
     */
};

window.Map = Map;