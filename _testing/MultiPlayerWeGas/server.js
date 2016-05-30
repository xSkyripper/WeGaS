/**
 * Created by dan.cehan on 5/26/2016.
 */
var express = require('express');
var app = express();
var serv = require('http').Server(app);
serv.listen(2000);
app.use('/client', express.static(__dirname + '/client'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
var io = require('socket.io')(serv, {});

console.log("Server started on port 2000.");

// var SOCKET_LIST = {};
//
//
// io.sockets.on('connection', function(socket){
//     socket.id = Math.random();
//     socket.x = 0;
//     socket.y = 0;
//     socket.number = "" + Math.floor(10 * Math.random());
//     SOCKET_LIST[socket.id] = socket;
//
//     socket.on('disconnect',function(){
//         delete SOCKET_LIST[socket.id];
//     });
//
// });
//
// setInterval(function(){
//     var pack = [];
//     for(var i in SOCKET_LIST){
//         var socket = SOCKET_LIST[i];
//         socket.x++;
//         socket.y++;
//         pack.push({
//             x:socket.x,
//             y:socket.y,
//             number:socket.number
//         });
//     }
//     for(var i in SOCKET_LIST){
//         var socket = SOCKET_LIST[i];
//         socket.emit('newPositions',pack);
//     }
// },1000/25);


var setEventHandlers = function () {
    io.sockets.on('connection', onSocketConn);
};

function onSocketConn(client) {
    console.log('Connected: ' + client.id);
    client.on('create_unit', createUnit);
    client.on('move_unit', moveUnit);
}

function createUnit(data) {
    console.log('createUnit ' + data.x + " " + data.y);
    this.broadcast.emit('create_unit', {x: data.x, y: data.y});
}

function moveUnit(data) {
    console.log('moveUnit ' + data.id + " : x=" + data.x + " y=" + data.y);
    this.broadcast.emit('move_unit', {id: data.id, x: data.x, y: data.y});
}

function init() {
    console.log('Init !');
    setEventHandlers();
}

init();