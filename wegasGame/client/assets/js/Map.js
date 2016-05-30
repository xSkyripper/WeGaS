var Map = function () {
    this.map = game.add.tilemap('map');
    this.map.addTilesetImage('summer', 'tiles');
    //adaugare mapJson & tiles
    this.map.setCollisionBetween(301, 332);
    this.map.setCollisionBetween(17, 86);
    this.map.setCollisionBetween(103, 124);
    this.map.setCollisionBetween(128, 140);
    this.map.setCollisionBetween(143, 165);
    this.map.setCollisionBetween(168, 178);
    this.map.setCollisionBetween(211, 212);
    this.map.setCollisionBetween(200, 221);
    this.map.setCollisionBetween(209, 230);
    this.map.setCollisionBetween(233, 235);
    //adaugare coliziuni

    this.layer = this.map.createLayer('Layer1');
    this.layer.resizeWorld();
    //this.layer.debug = true;
    //creare layer

    //collisionMatrix
    var data = this.map.layer.data;
    this.rawGrid = [];
    for (var i = 0; i < data.length; i++) {
        this.rawGrid[i] = [];
        for (var j = 0; j < data[i].length; j++) {
            if (data[i][j].collideUp == false && data[i][j].collideDown == false &&
                data[i][j].collideRight == false && data[i][j].collideLeft == false) {
                this.rawGrid[i][j] = 1;   // colision
            } else {
                this.rawGrid[i][j] = 0;   // free
            }
        }
    }
    this.graph = new Graph(this.rawGrid);
    //end_collisionMatrix

    this.cursors = game.input.keyboard.createCursorKeys();
    //adaugare control sageti ptr harta

    this.marker = game.add.graphics();
    this.marker.lineStyle(2, 0x000000, 1);
    this.marker.drawRect(0, 0, 32, 32);
    //adaugare marker ptr. mouse hover

};

Map.prototype.updateCamera = function () {
    if (this.cursors.left.isDown) {
        game.camera.x -= 4;
    }
    else if (this.cursors.right.isDown) {
        game.camera.x += 4;
    }

    if (this.cursors.up.isDown) {
        game.camera.y -= 4;
    }
    else if (this.cursors.down.isDown) {
        game.camera.y += 4;
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

    console.log('Path: ' + path);
    return path;
};

window.Map = Map;