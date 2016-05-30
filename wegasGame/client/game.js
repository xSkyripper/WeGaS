///////////////////////////Global////////////////////////////////

var me, enemy, map, selection, socket;

////////////////////////EventHandlers/////////////////////////////

var setEventHandlers = function () {
    //TODO:Restul handler-elor si interactiunilor dintre playeri

    //client-related
    {
        game.canvas.oncontextmenu = function (e) {
            e.preventDefault();// disable right click
        };
        game.input.onDown.add(moveUnits, this);
    }
    //end_client-related

    //server-related
    {
        socket.on('identify', onIdentify);
        socket.on('other_users', onOtherUsers);
        socket.on('new_player', onNewPlayer);
        socket.on('rem_player', onRemPlayer);
    }
    //end_server-related
};

function onIdentify(data) {
    console.log('My name is ' + data.name);
    me = new Player(0, data.name, 1000, []);
    me.createdUnits.push(new Unit(game, 'unit1_1', 1, me.name, 1, 329, 384, 10, 10, 10, 10));
}

function onOtherUsers(data) {
    console.log('Other user online: ' + data.name);
    enemy = new Player(1, data.name, 1000, []);
    enemy.createdUnits.push(new Unit(game, 'unit1_2', 1, enemy.name, 1, 320, 384, 10, 10, 10, 10))
}

function onNewPlayer(data) {
    console.log('A new player connected: ' + data.name);
}

function onRemPlayer(data) {
    console.log('A player disconnected: ' + data.name);
}


/////////////////////////End_EventHandlers/////////////////////////////

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-wegas', {
    preload: preload,
    create: create,
    update: update,
    render: render
});


function preload() {
    game.load.tilemap('map', '/client/assets/mapWegasJSON.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', '/client/assets/img/summer.png');

    //TODO: Schimba baza de date (units,rooms)
    //TODO: Incarcare din baza de date, trimitere la player doar ce are nevoie
    game.load.spritesheet('unit1_1', '/client/assets/img/footman1.png', 70, 70);
    game.load.spritesheet('unit1_2', '/client/assets/img/footman2.png', 70, 70);
}


function create() {
    map = new Map();
    selection = new Selection(game);
    socket = io.connect();

    //TODO:Interfata GUI

    setEventHandlers();
}

function update() {
    map.updateCamera();
    map.updateMarkers();
    selection.update();

    //TODO:Conditii de victorie

    if (me != null)
        for (var i = 0; i < me.createdUnits.length; i++) {
            me.createdUnits[i].update(); //TODO: fix la ultima miscare per unitate ce se pierde
        }
}

function render() {
    /* Debugging Zone */

    // if (me != null) {
    //     game.debug.bodyInfo(me.createdUnits[0].unit, 16, 24);
    //     game.debug.spriteInfo(me.createdUnits[0].unit, 200, 200);
    // }
}





