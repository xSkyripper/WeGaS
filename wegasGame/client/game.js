///////////////////////////Global////////////////////////////////

var me, enemy, map, selection, socket, gui;

////////////////////////EventHandlers/////////////////////////////

var setEventHandlers = function () {
    //TODO:Restul handler-elor si interactiunilor dintre playeri

    {//client-related
        game.canvas.oncontextmenu = function (e) {
            e.preventDefault();// disable right click
        };
        game.input.onDown.add(moveUnits, this);
    }//end_client-related

    {//server-related
        socket.on('identify', onIdentify);
        socket.on('other_users', onOtherUsers);
        socket.on('new_player', onNewPlayer);
        socket.on('rem_player', onRemPlayer);
    }//end_server-related

};

function onIdentify(data) {
    console.log('My name is ' + data.name);
    me = new Player(0, 327, 391, data.name, 1000, []);

    me.units.push(new Unit(game, 'unit1_1', 'unit1', me.name, 1, 100, 10, 100, 100));

    me.units.push(new Unit(game, 'unit2_1', 'unit2', me.name, 1, 100, 10, 150, 100));

    me.units.push(new Unit(game, 'unit3_1', 'unit3', me.name, 1, 100, 10, 200, 100));


    var startTileMe = {
        x: map.layer.getTileX(me.startX+32),
        y: map.layer.getTileY(me.startY+32)
    };
//teste
    console.log("Veche libera"+map.rawGrid[startTileMe.x][startTileMe.y]+"X:="+startTileMe.x+"Y:="+startTileMe.y);

    var availableTile = map.getAvailableTile(startTileMe);

    var unitCreated = me.units[0].create(availableTile.x * 32-32, availableTile.y * 32-32);

    me.createdUnits.push(unitCreated);

    availableTile = map.getAvailableTile(startTileMe);

    var unitCreated2 = me.units[0].create(availableTile.x * 32-32, availableTile.y * 32-32);

    me.createdUnits.push(unitCreated2);

    availableTile = map.getAvailableTile(startTileMe);

    var unitCreated3 = me.units[0].create(availableTile.x * 32-32, availableTile.y * 32-32);

    me.createdUnits.push(unitCreated3);

    availableTile = map.getAvailableTile(startTileMe);

    var unitCreated4 = me.units[0].create(availableTile.x * 32-32, availableTile.y * 32-32);

    me.createdUnits.push(unitCreated4);

    availableTile = map.getAvailableTile(startTileMe);

    var unitCreated5 = me.units[0].create(availableTile.x * 32-32, availableTile.y * 32-32);

    me.createdUnits.push(unitCreated5);

    availableTile = map.getAvailableTile(startTileMe);

    var unitCreated6 = me.units[0].create(availableTile.x * 32-32, availableTile.y * 32-32);

    me.createdUnits.push(unitCreated6);

    availableTile = map.getAvailableTile(startTileMe);

    var unitCreated7 = me.units[0].create(availableTile.x * 32-32, availableTile.y * 32-32);
    //
    // var unitCreated2 = me.units[1].create(391, 391);
    //
    // me.createdUnits.push(unitCreated2);
    //

    me.createdUnits.push(unitCreated7);
//sf teste
    
}

function onOtherUsers(data) {
    console.log('Other user online: ' + data.name);
    enemy = new Player(1, data.name, 1000, []);
    //enemy.createdUnits.push(new Unit(game, 'unit1_2', 1, enemy.name, 1, 320, 384, 10, 10, 10, 10))
}

function onNewPlayer(data) {
    console.log('A new player connected: ' + data.name);
}

function onRemPlayer(data) {
    console.log('A player disconnected: ' + data.name);
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
    game.stage.disableVisibilityChange = true;
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
            me.createdUnits[i].update(); //TODO: fix la ultima miscare per unitate ce se pierde
            gui.updateGuiOverlap(me.createdUnits[i].unit);
        }
        // if (game.physics.arcade.overlap(me.createdUnits[0].unit, me.createdUnits[1].unit)) {
        //     console.log('Se ating !');
        // }
    }

}

function render() {
    /* Debugging Zone */

    if (me != null) {
        for (var i = 0; i < me.createdUnits.length; i++)
            game.debug.body(me.createdUnits[i].unit);

        //game.debug.bodyInfo(me.createdUnits[0].unit, 16, 24);
        //game.debug.spriteInfo(me.createdUnits[0].unit, 200, 200);
    }
}





