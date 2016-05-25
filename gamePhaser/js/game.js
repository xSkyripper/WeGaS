/**
 * Created by dan.cehan on 5/25/2016.
 */
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('map', 'assets/mapWegas.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/img/summer.png');

}

var map;
var layer;
var cursors;

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



}

function update() {

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

function render() {

}