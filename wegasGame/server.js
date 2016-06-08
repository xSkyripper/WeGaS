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
    console.log('SQL: You are now connected...')
});
////////////////////////////////////////////////////////////


var player1, player2;

var Player = function (id, name, coins) {
    this.id = id;
    this.sock = null;
    this.name = name;
    this.coins = coins;
    this.units = null;
    this.skills = null;
    this.killed = 0;
    this.reward_xp = 0;
    this.reward_gold = 0;
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
        player1.sock = client;
        console.log('Player 1 connected ! Name = ' + player1.name);
        //TEST FUNCTION DB
        player1.units = getUserUnits(player1);
        player1.skills = getUserSkill(player1);

        for (var skill in player1.skills) {
            console.log("skill " + skill);
        }
        //
        client.emit('identify', {id: playerNo, name: player1.name, startX: 455, startY: 135});
    }

    if (playerNo == 2) {
        player2.id = client.id;
        player2.sock = client;
        console.log('Player 2 connected ! Name = ' + player2.name);

        player2.units = getUserUnits(player2);
        player2.skills = getUserSkill(player2);
        client.emit('identify', {id: playerNo, name: player2.name, startX: 1703, startY: 1863});
        client.emit('other_users', {id: playerNo - 1, name: player1.name, startX: 455, startY: 135});
        client.broadcast.emit('new_player', {id: playerNo, name: player2.name, startX: 1703, startY: 1863});
    }

    client.on('disconnect', onSocketDisconnect);
    client.on('create_unit', onCreateUnit);
    client.on('move_unit', onMoveUnit);
    client.on('move_unit2', onMoveUnit2);
    client.on('attack_unit', onAttackUnit);
    client.on('die_unit', onDieUnit);
    client.on('victory', onVictory);
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
    //console.log('tre sa transmit ca s-a facut un unit la ' + data.x + " " + data.y);
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
    // console.log('tre sa transmit ca se misca o unitate');

    this.broadcast.emit('move_unit', {
        id: data.id,
        targetTileX: data.targetTileX,
        targetTileY: data.targetTileY
    });
}

function onMoveUnit2(data) {
    //console.log('tre sa transmit ca se misca o unitate cu un tile');

    this.broadcast.emit('move_unit2', {
        id: data.id,
        goTo: data.goTo
    });
}

function onAttackUnit(data) {
    // console.log('tre sa transmit ca se ataca o unitate');

    this.broadcast.emit('attack_unit', {
        id: data.id,
        damage: data.damage
    });
}

function onDieUnit(data) {
    if (player1.name == data.name) {
        player1.killed++;
    } else if (player2.name == data.name) {
        player2.killed++;
    }

    console.log('player1 score: ' + player1.killed);
    console.log('player2 score: ' + player2.killed);
}

function onVictory(data) {
    //TODO: scrie in baza de date rewardurile;

    if (data.id == 2) {
        console.log('a castigat player2');
        player2.reward_xp = 10;
        player2.reward_gold = 10;
        player1.reward_xp = 5;
        player1.reward_gold = 5;


    }
    if (data.id == 1) {
        console.log('a castigat player1');
        player2.reward_xp = 5;
        player2.reward_gold = 5;
        player1.reward_xp = 10;
        player1.reward_gold = 10;
    }

    for (var skill in player1.skills) {

        player1.reward_xp += (player1.reward_xp * skill.xp) / 100;
        player1.reward_gold += (player1.reward_gold * skill.gold) / 100;
    }
    for (var skill in player2.skills) {
        player2.reward_xp += (player2.reward_xp * skill.xp) / 100;
        player2.reward_gold += (player2.reward_gold * skill.gold) / 100;
    }

    player2.sock.emit('victory_stats', {xp: player2.reward_xp, gold: player2.reward_gold});
    player1.sock.emit('victory_stats', {xp: player1.reward_xp, gold: player1.reward_gold});

    connection.query('UPDATE users SET gold = gold + ?, xp = xp + ? WHERE username = ?', player1.reward_gold, player1.reward_xp, player1.name, function (err, rows) {
        if (err)
            throw err;
    });

    connection.query('UPDATE users SET gold = gold + ?, xp = xp + ? WHERE username = ?', player2.reward_gold, player2.reward_xp, player2.name, function (err, rows) {
        if (err)
            throw err;
    });

}

function getUserUnits(user) {
    //tre sa fii nebun sa pui campurile asa ! tinanad cont ca idu apare unic mereu!
    connection.query('SELECT * FROM unit_user Uu join users Us  on Uu.user_id = Us.id  join units Un on Un.id=Uu.unit_id  where Us.username=?', user.name, function (err, rows) {
        if (err)
            throw err;
        console.log('Data received from Db:\n');
        console.log(rows);

        return rows;
    });
}

function getUserSkill(user) {
    connection.query('SELECT Sk.gold,Sk.xp,Sk.hp,Sk.atk,Sk.ms FROM skill_user Su join users Us  on Su.user_id = Us.id  join skills Sk on Sk.id=Su.skill_id  where Us.username=?', user.name, function (err, rows) {
        if (err)
            throw err;
        console.log('Data received from Db:\n');
        //transformare in json


        return rows;
    });
}

initServer();






