///////////////////////////Global////////////////////////////////

var me, enemy, map, selection, socket, gui;

////////////////////////EventHandlers/////////////////////////////

var setEventHandlers = function () {
    //TODO:Restul handler-elor si interactiunilor dintre playeri

    {//client-related
        game.stage.disableVisibilityChange = true;
        game.canvas.oncontextmenu = function (e) {
            e.preventDefault();// disable right click
        };
        game.input.onDown.add(moveUnits2, this);
    }//end_client-related

    {//server-related
        socket.on('identify', onIdentify);
        socket.on('other_users', onOtherUsers);
        socket.on('new_player', onNewPlayer);
        socket.on('rem_player', onRemPlayer);

        socket.on('create_unit', onCreateUnit);
        socket.on('move_unit', onMoveUnit);
        socket.on('move_unit2', onMoveUnit2);
    }//end_server-related

};

function onIdentify(data) {

    me = new Player(data.id, data.startX, data.startY, data.name, 1000, []);
    console.log('I am ' + data.name + " start: " + data.startX + " " + data.startY);

    me.units.push(new Unit(game, 'unit1_'.concat(data.id), me.name, 100, 5, 10, 100, 100));

    me.units.push(new Unit(game, 'unit2_'.concat(data.id), me.name, 80, 6, 11, 150, 120));

    me.units.push(new Unit(game, 'unit3_'.concat(data.id), me.name, 150, 5, 15, 200, 200));

}

function onOtherUsers(data) {
    enemy = new Player(data.id, data.startX, data.startY, data.name, 1000, []);
    console.log('My Enemy (other_users): ' + data.name + " start: " + data.startX + " " + data.startY);
}

function onNewPlayer(data) {
    enemy = new Player(data.id, data.startX, data.startY, data.name, 1000, []);
    console.log('My Enemy (new_player): ' + data.name + " start: " + data.startX + " " + data.startY);
}

function onRemPlayer(data) {
    console.log('Enemy disconnected: ' + data.name);
}

function onCreateUnit(data) {
    console.log('un inamic a facut un unit !!! la ' + data.x + " " + data.y);

    var redSprite = data.sprite;
    redSprite[redSprite.length - 1] = '2';
    redSprite[redSprite.length - 2] = '_';
    var toCreate = new Unit(game, redSprite, data.owner, data.hp, data.minAtk, data.maxAtk, data.ms, data.coins);
    enemy.createdUnits.push(toCreate.create(enemy.createdUnits.length,data.x, data.y));
}

function onMoveUnit(data) {
    console.log('s-a miscat un unit inamic !!!!');

    enemy.createdUnits[data.id].targetTile.x = data.targetTileX;
    enemy.createdUnits[data.id].targetTile.y = data.targetTileY;
    enemy.createdUnits[data.id].initialTargetTile.x = data.targetTileX;
    enemy.createdUnits[data.id].initialTargetTile.y = data.targetTileY;
}

function onMoveUnit2(data) {
    game.physics.arcade.collide(enemy.createdUnits[data.id].unit, map.layer);

    enemy.createdUnits[data.id].isMoving = true;


    switch (data.goTo) {
        case 1:
            map.rawGrid[map.layer.getTileY(enemy.createdUnits[data.id].markerUnit.y + 32)][map.layer.getTileX(enemy.createdUnits[data.id].markerUnit.x + 32)] = 1;
            map.rawGrid[map.layer.getTileY(enemy.createdUnits[data.id].markerUnit.y)][map.layer.getTileX(enemy.createdUnits[data.id].markerUnit.x + 32)] = 0;
            map.graph = new Graph(map.rawGrid);
            var tweenUp = game.add.tween(enemy.createdUnits[data.id].unit).to({y: enemy.createdUnits[data.id].unit.y - 32}, 500 - enemy.createdUnits[data.id].ms, Phaser.Easing.Linear.None, true);
            enemy.createdUnits[data.id].unit.play('up');

            tweenUp.onComplete.addOnce(function () {
                enemy.createdUnits[data.id].markerUnit.x = map.layer.getTileX(enemy.createdUnits[data.id].unit.x) * 32;
                enemy.createdUnits[data.id].markerUnit.y = map.layer.getTileY(enemy.createdUnits[data.id].unit.y) * 32;
                enemy.createdUnits[data.id].isMoving = false;
                enemy.createdUnits[data.id].unit.animations.stop(true, this);
                enemy.createdUnits[data.id].unit.animations.frame = 0;
            }, this);
            break;
        case 2:
            map.rawGrid[map.layer.getTileY(enemy.createdUnits[data.id].markerUnit.y + 32)][map.layer.getTileX(enemy.createdUnits[data.id].markerUnit.x + 32)] = 1;
            map.rawGrid[map.layer.getTileY(enemy.createdUnits[data.id].markerUnit.y + 64)][map.layer.getTileX(enemy.createdUnits[data.id].markerUnit.x + 32)] = 0;
            map.graph = new Graph(map.rawGrid);
            var tweenDown = game.add.tween(enemy.createdUnits[data.id].unit).to({y: enemy.createdUnits[data.id].unit.y + 32}, 500 - enemy.createdUnits[data.id].ms, Phaser.Easing.Linear.None, true);
            enemy.createdUnits[data.id].unit.play('down');

            tweenDown.onComplete.addOnce(function () {
                enemy.createdUnits[data.id].markerUnit.x = map.layer.getTileX(enemy.createdUnits[data.id].unit.x) * 32;
                enemy.createdUnits[data.id].markerUnit.y = map.layer.getTileY(enemy.createdUnits[data.id].unit.y) * 32;
                enemy.createdUnits[data.id].isMoving = false;
                enemy.createdUnits[data.id].unit.animations.stop(true, this);
                enemy.createdUnits[data.id].unit.animations.frame = 4;
            }, this);
            break;
        case 3:
            map.rawGrid[map.layer.getTileY(enemy.createdUnits[data.id].markerUnit.y + 32)][map.layer.getTileX(enemy.createdUnits[data.id].markerUnit.x + 32)] = 1;
            map.rawGrid[map.layer.getTileY(enemy.createdUnits[data.id].markerUnit.y + 32)][map.layer.getTileX(enemy.createdUnits[data.id].markerUnit.x)] = 0;
            map.graph = new Graph(map.rawGrid);
            var tweenLeft = game.add.tween(enemy.createdUnits[data.id].unit).to({x: enemy.createdUnits[data.id].unit.x - 32}, 500 - enemy.createdUnits[data.id].ms, Phaser.Easing.Linear.None, true);
            enemy.createdUnits[data.id].unit.play('left');

            tweenLeft.onComplete.addOnce(function () {
                enemy.createdUnits[data.id].markerUnit.x = map.layer.getTileX(enemy.createdUnits[data.id].unit.x) * 32;
                enemy.createdUnits[data.id].markerUnit.y = map.layer.getTileY(enemy.createdUnits[data.id].unit.y) * 32;
                enemy.createdUnits[data.id].isMoving = false;
                enemy.createdUnits[data.id].unit.animations.stop(true, this);
                enemy.createdUnits[data.id].unit.animations.frame = 5;
            }, this);
            break;
        case 4:
            map.rawGrid[map.layer.getTileY(enemy.createdUnits[data.id].markerUnit.y + 32)][map.layer.getTileX(enemy.createdUnits[data.id].markerUnit.x + 32)] = 1;
            map.rawGrid[map.layer.getTileY(enemy.createdUnits[data.id].markerUnit.y + 32)][map.layer.getTileX(enemy.createdUnits[data.id].markerUnit.x + 64)] = 0;
            map.graph = new Graph(map.rawGrid);
            var tweenRight = game.add.tween(enemy.createdUnits[data.id].unit).to({x: enemy.createdUnits[data.id].unit.x + 32}, 500 - enemy.createdUnits[data.id].ms, Phaser.Easing.Linear.None, true);
            enemy.createdUnits[data.id].unit.play('right');

            tweenRight.onComplete.addOnce(function () {
                enemy.createdUnits[data.id].markerUnit.x = map.layer.getTileX(enemy.createdUnits[data.id].unit.x) * 32;
                enemy.createdUnits[data.id].markerUnit.y = map.layer.getTileY(enemy.createdUnits[data.id].unit.y) * 32;
                enemy.createdUnits[data.id].isMoving = false;
                enemy.createdUnits[data.id].unit.animations.stop(true, this);
                enemy.createdUnits[data.id].unit.animations.frame = 2;
            }, this);
            break;
        default:
            break;

    }

}


/////////////////////////End_EventHandlers/////////////////////////////

var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'phaser-wegas', {
    preload: preload,
    create: create,
    update: update,
    render: render
});


function preload() {
    game.load.tilemap('map', '/client/assets/mapWegasJSON.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', '/client/assets/img/summer.png');

    game.load.image('unit1_i', '/client/assets/img/unit1_i.png');
    game.load.image('unit2_i', '/client/assets/img/unit2_i.png');
    game.load.image('unit3_i', '/client/assets/img/unit3_i.png');
    game.load.image('mapWegas', '/client/assets/img/mapWegas.png');
    game.load.image('back', '/client/assets/img/guiBack.png');

    //TODO: Schimba baza de date (units,rooms)
    //TODO: Incarcare din baza de date, trimitere la player doar ce are nevoie
    game.load.spritesheet('unit1_1', '/client/assets/img/unit1_1.png', 70, 70);
    game.load.spritesheet('unit1_2', '/client/assets/img/unit1_2.png', 70, 70);
    game.load.spritesheet('unit2_1', '/client/assets/img/unit2_1.png', 70, 70);
    game.load.spritesheet('unit3_2', '/client/assets/img/unit2_2.png', 70, 70);
    game.load.spritesheet('unit3_1', '/client/assets/img/unit3_1.png', 70, 70);
    game.load.spritesheet('unit3_2', '/client/assets/img/unit3_2.png', 70, 70);
}


function create() {

    map = new Map();
    selection = new Selection(game);
    socket = io.connect();

    gui = new GUI();


    setEventHandlers();
}


function update() {
    map.updateCamera();
    map.updateMarkers();
    selection.update();

    if (me != null) {
        gui.update();
    }

    //TODO:Conditii de victorie

    if (me != null) {
        for (var i = 0; i < me.createdUnits.length; i++) {
            me.createdUnits[i].update2(); //TODO: fix la ultima miscare per unitate ce se pierde
            gui.updateGuiOverlap(me.createdUnits[i].unit);
        }
    }

    if (enemy != null) {
        for (var i = 0; i < enemy.createdUnits.length; i++) {
            //enemy.createdUnits[i].update2(); //TODO: fix la ultima miscare per unitate ce se pierde
            gui.updateGuiOverlap(enemy.createdUnits[i].unit);
        }
    }
    // if (game.physics.arcade.overlap(me.createdUnits[0].unit, me.createdUnits[1].unit)) {
    //     console.log('Se ating !');
    // }
}


function render() {
    /* Debugging Zone */
    //game.debug.bodyInfo(me.createdUnits[0].unit, 16, 24);
    //game.debug.spriteInfo(me.createdUnits[0].unit, 200, 200);

    if (me != null) {
        for (var i = 0; i < me.createdUnits.length; i++)
            game.debug.body(me.createdUnits[i].unit);
    }

    if (enemy != null) {
        for (var i = 0; i < enemy.createdUnits.length; i++)
            game.debug.body(enemy.createdUnits[i].unit);
    }
}





