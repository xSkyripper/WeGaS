/**
 * Created by dan.cehan on 5/25/2016.
 */
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('map', 'assets/mapWegas.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/img/summer.png');
    game.load.spritesheet('player', 'assets/img/Footman.png', 74, 57);
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
    //  Create our layer
    layer = map.createLayer('World1');
    //  Resize the world
    layer.resizeWorld();
    //  Allow cursors to scroll around the map
    cursors = game.input.keyboard.createCursorKeys();
    keys = {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D),
    };

    player = game.add.sprite(330, 240, 'player', 4);
    player.animations.add('left', [8,9], 10, true);
    player.animations.add('right', [1,2], 10, true);
    player.animations.add('up', [5,10,15,20,10], 10, true);
    player.animations.add('down', [4,5,6], 10, true);

    game.physics.enable(player, Phaser.Physics.ARCADE);


    player.body.setSize(10, 14, 2, 1);
    player.arcade.gravity = 0;

}

function update() {

    updateCamera();
    updatePlayer();

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

function updatePlayer()
{
    //game.physics.arcade.collide(player, layer);
    player.body.velocity.set(0);
    if(keys.up.isDown)
    {
        player.body.velocity.y = -50;
        player.play('up');
    }
    else if (keys.down.isDown) {
        player.body.velocity.x = 50;
        player.play('down');
    }
    else if (keys.left.isDown) {
        player.body.velocity.x = 50;
        player.play('down');
    }
    else if (keys.right.isDown) {
        player.body.velocity.x = 50;
        player.play('down');
    }
    else
    {
        player.animations.stop();
    }
}