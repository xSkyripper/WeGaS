var exp = require('express');
var app = exp();
var http = require('http').Server(app).listen(2000);
var io = require('socket.io')(http, {});

app.use('/client', exp.static(__dirname + '/client'));

app.get('/', function (req, res) {
    res.send('Use this : /room/user/ !');
});

var playerNo = 0;

app.get('/:room/:user/', function (req, res) {

    if (playerNo < 2) {
        res.sendFile(__dirname + '/client/index.html');
        players.push(new Player(playerNo++, req.params.user, 1000, []));
    }
    else {
        res.send('Room is full !');
    }

});

////////////////////////////////////////////////////////////

var Player = function (id, name, coins, units) {
    this.id = id;
    this.name = name;
    this.coins = coins;
    this.units = units;
    this.createdUnits = [];
    this.selectedUnits = [];

};

var players = [];

function initServer() {
    console.log('Server: listening on 2000 ...');
    setEventHandlers();
}

var setEventHandlers = function () {
    io.sockets.on('connection', onSocketConnect);
};

function onSocketConnect(client) {
    players[players.length - 1].id = client.id;

    console.log('Connected a user : ' + players[players.length - 1].name);

    client.emit('identify', {name: players[players.length - 1].name});
    for (var i = 0; i < players.length - 1; i++) {
        client.emit('other_users', {name: players[i].name});
    }
    client.broadcast.emit('new_player', {name: players[players.length - 1].name});

    client.on('disconnect', onSocketDisconnect);
}

function onSocketDisconnect() {
    var playerDisconnected = getPlayerById(this.id);

    console.log('A user disconnected : ' + playerDisconnected.name);

    players.splice(players.indexOf(playerDisconnected), 1);
    playerNo--;
    this.broadcast.emit('rem_player', {name: playerDisconnected.name});
}

function getPlayerById(id) {
    for (var i = 0; i < players.length; i++) {
        if (players[i].id == id)
            return players[i];
    }
    return null;
}

initServer();





