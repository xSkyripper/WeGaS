var exp = require('express');
var app = exp();
var http = require('http').Server(app).listen(2000);
var io = require('socket.io')(http, {});

app.use('/client', exp.static(__dirname + '/client'));

app.get('/', function (req, res) {
    res.send('Use this : /room/user/ !');
});

app.get('/:room/:user/', function (req, res) {

    //TODO:Verifica daca exista, daca se afla in camera buna sau daca nu e deja aici

    if (playerNo == 0) {
        res.sendFile(__dirname + '/client/index.html');
        player1 = (new Player(playerNo++, req.params.user, 1000, []));
    } else if (playerNo == 1) {
        res.sendFile(__dirname + '/client/index.html');
        player2 = (new Player(playerNo++, req.params.user, 1000, []));
    } else {

        res.send('Room is full !');
    }

});


var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

connection.connect(function (err) {
    // connected! (unless `err` is set)
    if (err)
        throw err;
    console.log('You are now connected...')
});
////////////////////////////////////////////////////////////

var playerNo = 0;
var player1, player2;

var Player = function (id, name, coins, units) {
    this.id = id;
    this.name = name;
    this.coins = coins;
    this.units = units;
    this.createdUnits = [];
};


function initServer() {
    console.log('Server: listening on 2000 ...');
    setEventHandlers();
}

var setEventHandlers = function () {
    io.sockets.on('connection', onSocketConnect);
};

function onSocketConnect(client) {
    if (playerNo == 1) {

        player1.id = client.id;
        console.log('Player 1 connected ! Name = ' + player1.name);
        //TEST FUNCTION DB
        //getUserUnits(player1.name);
        getUserSkill(player1.name);
        //
        client.emit('identify', {id: playerNo, name: player1.name, startX: 455, startY: 135});
    }

    if (playerNo == 2) {
        player2.id = client.id;
        console.log('Player 2 connected ! Name = ' + player2.name);
        client.emit('identify', {id: playerNo, name: player2.name, startX: 1031, startY: 455});
        client.emit('other_users', {id: playerNo, name: player1.name, startX: 455, startY: 135});
        client.broadcast.emit('new_player', {id: playerNo, name: player2.name, startX: 1031, startY: 455});
    }

    client.on('disconnect', onSocketDisconnect);
    client.on('create_unit', onCreateUnit);
    client.on('move_unit', onMoveUnit);
    client.on('move_unit2', onMoveUnit2);
    client.on('attack_unit', onAttackUnit);
}

function onSocketDisconnect() {
    if (this.id == player1.id) {
        console.log('Player 1 disconnected : ' + player1.name);
        this.broadcast.emit('rem_player', {name: player1.name});
    } else if (this.id == player2.id) {
        console.log('Player 2 disconnected : ' + player2.name);
        this.broadcast.emit('rem_player', {name: player2.name});
    }
    playerNo--;
}

function onCreateUnit(data) {
    console.log('tre sa transmit ca s-a facut un unit la ' + data.x + " " + data.y);
    this.broadcast.emit('create_unit', {
        sprite: data.sprite,
        owner: data.owner,
        hp: data.hp,
        minAtk: data.minAtk,
        maxAtk: data.maxAtk,
        ms: data.ms,
        coins: data.coins,
        x: data.x,
        y: data.y
    });
}

function onMoveUnit(data) {
    console.log('tre sa transmit ca se misca o unitate');

    this.broadcast.emit('move_unit', {
        id: data.id,
        targetTileX: data.targetTileX,
        targetTileY: data.targetTileY
    });
}

function onMoveUnit2(data) {
    console.log('tre sa transmit ca se misca o unitate cu un tile');

    this.broadcast.emit('move_unit2', {
        id: data.id,
        goTo: data.goTo
    });
}

function onAttackUnit(data) {
    console.log('tre sa transmit ca se ataca o unitate');

    this.broadcast.emit('attack_unit', {
        id: data.id,
        damage: data.damage
    });
}

function getUserUnits(user) {
    //tre sa fii nebun sa pui campurile asa ! tinanad cont ca idu apare unic mereu!
    connection.query('SELECT * FROM unit_user Uu join users Us  on Uu.user_id = Us.id  join units Un on Un.id=Uu.unit_id  where Us.username=?', user, function (err, rows) {
        if (err)
            throw err;
        console.log('Data received from Db:\n');
        console.log(rows);
    });
}

function getUserSkill(user) {
    connection.query('SELECT * FROM skill_user Su join users Us  on Su.user_id = Us.id  join skills Sk on Sk.id=Su.skill_id  where Us.username=?', user, function (err, rows) {
        if (err)
            throw err;
        console.log('Data received from Db:\n');
        console.log(rows);
        //transformare in json
        // var  json = JSON.stringify(rows);
    });
}

initServer();






