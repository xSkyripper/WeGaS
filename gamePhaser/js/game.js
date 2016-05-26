/**
 * Created by dan.cehan on 5/25/2016.
 */
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('map', 'assets/mapWegasJSON.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/img/summer.png');
    game.load.spritesheet('player', 'assets/img/Footman.png', 70, 70);
}

var map;
var layer;
var cursors;
var player;
var keys;
function create() {

    //  Because we're loading CSV map data we have to specify the tile size here or we can't render it
    map = game.add.tilemap('map');

    //  Now add in the tileset
    map.addTilesetImage('summer','tiles');
    map.setCollisionBetween(301,332);
    map.setCollisionBetween(17,86);
    map.setCollisionBetween(103,124);
    map.setCollisionBetween(128,140);
    map.setCollisionBetween(143,165);
    map.setCollisionBetween(168,178);
    map.setCollisionBetween(211,212);
    map.setCollisionBetween(200,221);
    map.setCollisionBetween(209,230);
    map.setCollisionBetween(233,235);

    //  Create our layer
    layer = map.createLayer('Layer1');
    //  Resize the world
    layer.resizeWorld();
    //  Allow cursors to scroll around the map
    cursors = game.input.keyboard.createCursorKeys();
    keys = {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        attack: game.input.keyboard.addKey(Phaser.Keyboard.K)
    };

    player = game.add.sprite(330, 420, 'player', 4);
    player.animations.add('left', [5,11,17,23], 5, true);
    player.animations.add('right', [2,8,14,20], 5, true);
    player.animations.add('up', [6,12,18,24], 5, true);
    player.animations.add('down', [10,16,22,28], 5, true);
    player.animations.add('attack', [30,36,42,48], 5, true);


    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.setSize(32, 32);




}

function update() {
    game.physics.arcade.collide(player, layer);

    updateCamera();
    updatePlayer(80);

}

function render() {

}

function updateCamera()
{

    if (cursors.left.isDown)
    {
        game.camera.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x += 4;
    }

    if (cursors.up.isDown)
    {
        game.camera.y -= 4;
    }
    else if (cursors.down.isDown)
    {
        game.camera.y += 4;
    }
}

function updatePlayer(speed)
{
    game.physics.arcade.collide(player, layer);
    player.body.velocity.set(0);
    var stopAct;

    if(keys.attack.isDown)
    {
        player.play('attack');
    } else if(keys.up.isDown)
    {
        player.body.velocity.y = -speed;
        player.play('up');
        stopAct = 0;
    }
    else if (keys.down.isDown) {
        player.body.velocity.y = speed;
        player.play('down');
        stopAct = 4;
    }
    else if (keys.left.isDown) {
        player.body.velocity.x = - speed;
        player.play('left');
        stopAct = 5;
    }
    else if (keys.right.isDown) {
        player.body.velocity.x = speed;
        player.play('right');
        stopAct = 2;
    }
    else
    {
        player.frame = stopAct;
        player.animations.stop(0, true);
    }

}