/**
 * Created by dan.cehan on 5/25/2016.
 */
var imported = document.createElement('astar.js');



var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    game.load.tilemap('map', './client/assets/mapWegasJSON.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', './client/assets/img/summer.png');
    game.load.spritesheet('player', './client/assets/img/Footman.png', 70, 70);
}

var map;
var layer;
var cursors;
var player;
var keys;
var socket = io.connect();
var enemies;

var marker; // cursor rectangle and position
var markerPlayer; // player tile position
var currentTile;
var rawGrid = []; // collision matrix
var graph; // for astar
var tileWidth;
var tileHeight;
var movingX = 0; //x coordinates for moving the ball
var movingY = 0; //y coordinates for moving the ball
var temp; //variable for storing the next tile to move towards
var mauseX=0;
var mauseY=0;
var playerX=0;
var playerY=0;
function create() {
    //  Because we're loading CSV map data we have to specify the tile size here or we can't render it
    map = game.add.tilemap('map');

    //  Now add in the tileset
    map.addTilesetImage('summer', 'tiles');
    addCollisionMap();
    collisionMatrix2();
    graph = new Graph(rawGrid);
    console.log(graph);
    tileWidth = map.tileWidth;
    tileHeight = map.tileHeight;

    console.log(tileHeight);


    //  Create our layer
    layer = map.createLayer('Layer1');
    //  Resize the world
    layer.resizeWorld();
    marker = game.add.graphics();
    markerPlayer = game.add.graphics();
    marker.lineStyle(2, 0x000000, 1);
    marker.drawRect(0, 0, 32, 32);

    //  Allow cursors to scroll around the map
    cursors = game.input.keyboard.createCursorKeys();
    keys = {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        attack: game.input.keyboard.addKey(Phaser.Keyboard.K)
    };

    enemies = [];

    player = game.add.sprite(330, 420, 'player', 4);
    player.animations.add('left', [5, 11, 17, 23], 5, true);
    player.animations.add('right', [2, 8, 14, 20], 5, true);
    player.animations.add('up', [6, 12, 18, 24], 5, true);
    player.animations.add('down', [10, 16, 22, 28], 5, true);
    player.animations.add('attack', [30, 36, 42, 48], 5, true);
    game.physics.enable(player, Phaser.Physics.ARCADE);


    player.body.setSize(32, 27, 25, 25);

    setEventHandlers();
}

socket.emit('create_unit', {x: '330', y: '420'});

function update() {
    game.physics.arcade.collide(player, layer);
    marker.x = layer.getTileX(game.input.activePointer.worldX) * 32; // Mouse x coordinate
    marker.y = layer.getTileY(game.input.activePointer.worldY) * 32; // Mouse y coordinate
    markerPlayer.x = layer.getTileX(player.x) * 32; // Player x coordinate
    markerPlayer.y = layer.getTileY(player.y) * 32; // Player y coordinate

    mouseAndPlayerPosition();
    updateCamera();
    //updatePlayer(80);
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].update();
        game.physics.arcade.collide(player, enemies[i].player)
    }
}


function render() {

}

function updateCamera() {

    if (cursors.left.isDown) {
        game.camera.x -= 4;
    }
    else if (cursors.right.isDown) {
        game.camera.x += 4;
    }

    if (cursors.up.isDown) {
        game.camera.y -= 4;
    }
    else if (cursors.down.isDown) {
        game.camera.y += 4;
    }
}

function updatePlayer(speed) {
    game.physics.arcade.collide(player, layer);
    player.body.velocity.set(0);
    var stopAct;

    if (keys.attack.isDown) {
        player.play('attack');
    } else if (keys.up.isDown) {
        player.body.velocity.y = -speed;
        player.play('up');
        socket.emit('move_unit', {id: 1, x: player.x, y: player.y});
        stopAct = 0;
    }
    else if (keys.down.isDown) {
        player.body.velocity.y = speed;
        player.play('down');
        socket.emit('move_unit', {id: 1, x: player.x, y: player.y});
        stopAct = 4;
    }
    else if (keys.left.isDown) {
        player.body.velocity.x = -speed;
        player.play('left');
        socket.emit('move_unit', {id: 1, x: player.x, y: player.y});
        stopAct = 5;
    }
    else if (keys.right.isDown) {
        player.body.velocity.x = speed;
        player.play('right');
        socket.emit('move_unit', {id: 1, x: player.x, y: player.y});
        stopAct = 2;
    }
    else {
        player.frame = stopAct;
        player.animations.stop(0, true);
    }
}

function updatePlayerAuto(traseu,speed) {
    game.physics.arcade.collide(player, layer);
    player.body.velocity.set(0);
    var stopAct;
    for(var i = 0 ; i < traseu.length; i++) {
        if (keys.attack.isDown) {
            player.play('attack');
        } else if (traseu[i] == 1) {
            player.body.velocity.y = -speed;
            player.play('up');
            socket.emit('move_unit', {id: 1, x: player.x, y: player.y});
            stopAct = 0;
            traseu[i] = 0;
        }
        else if (traseu[i] == 2) {
            player.body.velocity.y = speed;
            player.play('down');
            socket.emit('move_unit', {id: 1, x: player.x, y: player.y});
            stopAct = 4;
            traseu[i] = 0;
        }
        else if (traseu[i] == 3) {
            player.body.velocity.x = -speed;
            player.play('left');
            socket.emit('move_unit', {id: 1, x: player.x, y: player.y});
            stopAct = 5;
            traseu[i] = 0;
        }
        else if (traseu[i] == 4) {
            player.body.velocity.x = speed;
            player.play('right');
            socket.emit('move_unit', {id: 1, x: player.x, y: player.y});
            stopAct = 2;
            traseu[i] = 0;
        }
        else {
            player.frame = stopAct;
            player.animations.stop(0, true);
        }
    }
}

var setEventHandlers = function () {
    socket.on('create_unit', createUnit);
    socket.on('move_unit', moveUnit);
};

function createUnit(data) {
    //console.log('createUnit ' + data.x + " " + data.y);
    enemies.push(new ControlAnotherPlayer("test", game, player, data.x, data.y))
   }

function moveUnit(data) {
    //console.log('moveUnit : ' + data.id + " " + data.x + " " + data.y);
}


function addCollisionMap() {
    map.setCollisionBetween(301, 332);
    map.setCollisionBetween(17, 86);
    map.setCollisionBetween(103, 124);
    map.setCollisionBetween(128, 140);
    map.setCollisionBetween(143, 165);
    map.setCollisionBetween(168, 178);
    map.setCollisionBetween(211, 212);
    map.setCollisionBetween(200, 221);
    map.setCollisionBetween(209, 230);
    map.setCollisionBetween(233, 235);
}

function collisionMatrix(){ // version 1
    var data = map.layer.data;
    console.log( (data[14][13].collideUp == false));
    for (var i = 0; i < data.length; i++) {
        rawGrid[i] = [];
        for (var j = 0; j < data[i].length; j++) {
            // console.log(data[i][j].index);
            if (data[i][j].index >= 301 && data[i][j].index <= 332) rawGrid[i][j] = 0;
            else if (data[i][j].index >= 17 && data[i][j].index <= 86) rawGrid[i][j] = 0;
            else if (data[i][j].index >= 103 && data[i][j].index <= 124) rawGrid[i][j] = 0;
            else if (data[i][j].index >= 128 && data[i][j].index <= 140) rawGrid[i][j] = 0;
            else if (data[i][j].index >= 143 && data[i][j].index <= 165) rawGrid[i][j] = 0;
            else if (data[i][j].index >= 168 && data[i][j].index <= 178) rawGrid[i][j] = 0;
            else if (data[i][j].index >= 211 && data[i][j].index <= 212) rawGrid[i][j] = 0;
            else if (data[i][j].index >= 200 && data[i][j].index <= 221) rawGrid[i][j] = 0;
            else if (data[i][j].index >= 209 && data[i][j].index <= 230) rawGrid[i][j] = 0;
            else if (data[i][j].index >= 233 && data[i][j].index <= 235) rawGrid[i][j] = 0;
            else rawGrid[i][j] = 1;
        }
    }
    for (var j = 0; j < rawGrid.length; j++)
        console.log(rawGrid[j]);
}

function collisionMatrix2(){ // version 2 (in use)
    var data = map.layer.data;
    console.log("in collisionMatrix2 function");
    for (var i = 0; i < data.length; i++) {
        rawGrid[i] = [];
        for (var j = 0; j < data[i].length; j++) {
            // console.log(data[i][j].index);
            if (data[i][j].collideUp == false &&  data[i][j].collideDown == false &&
                data[i][j].collideRight == false && data[i][j].collideLeft == false){
                rawGrid[i][j] = 1;   // colision
            }else{
                rawGrid[i][j] = 0;   // free
            }
        }
    }
    //for (var j = 0; j < rawGrid.length; j++)
    //    console.log(rawGrid[j]);
}

function mouseAndPlayerPosition(){ //on press SHIFT + click
    if (game.input.mousePointer.isDown)
    {
        if (game.input.keyboard.isDown(Phaser.Keyboard.SHIFT))
        {

            mauseX = layer.getTileX(marker.x);
            mauseY = layer.getTileX(marker.y);
            playerX = layer.getTileX(markerPlayer.x+32);
            playerY = layer.getTileX(markerPlayer.y+32);
            getPath(mauseX,mauseY,playerX,playerY);
            currentTile = map.getTile(layer.getTileX(marker.x), layer.getTileY(marker.y));
            console.log("Click tile:"+ (layer.getTileX(marker.x)) + ", "+(layer.getTileX(marker.y)) );
            console.log("Player tile:"+ layer.getTileX(markerPlayer.x+32) + ", "+layer.getTileX(markerPlayer.y+32) );
        }
    }
}

function getPath(mouseX, mouseY, playerX, playerY) {
    var start = graph.grid[playerY][playerX];
    var end = graph.grid[mouseY][mouseX];
    console.log("S:"+start.x );
    console.log("F:"+end );
    var result = astar.search(graph, start, end);
    var aux = start;
    var traseu = [];
    updatePlayerAuto(80,0);
    for(var i = 0 ; i < result.length; i++){
        if(aux.x > result[i].x ){
            console.log("sus");
            traseu.push(1);
        }
        if(aux.x < result[i].x){
            console.log("jos");
            traseu.push(2);
        }

        if(aux.y > result[i].y){
            console.log("stanga");
            traseu.push(3);
        }
        if(aux.y < result[i].y){
            console.log("dreapta");
            traseu.push(4);
        }
        aux = result[i];
    }
    //updatePlayerAuto(traseu,80);
    console.log("Drum depistat:"+ result);
    console.log("Result:"+ traseu);
}










// javascript-astar 0.4.1
// http://github.com/bgrins/javascript-astar
// Freely distributable under the MIT License.
// Implements the astar search algorithm in javascript using a Binary Heap.
// Includes Binary Heap (with modifications) from Marijn Haverbeke.
// http://eloquentjavascript.net/appendix2.html
(function(definition) {
    /* global module, define */
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = definition();
    } else if (typeof define === 'function' && define.amd) {
        define([], definition);
    } else {
        var exports = definition();
        window.astar = exports.astar;
        window.Graph = exports.Graph;
    }
})(function() {

    function pathTo(node) {
        var curr = node;
        var path = [];
        while (curr.parent) {
            path.unshift(curr);
            curr = curr.parent;
        }
        return path;
    }

    function getHeap() {
        return new BinaryHeap(function(node) {
            return node.f;
        });
    }

    var astar = {
        /**
         * Perform an A* Search on a graph given a start and end node.
         * @param {Graph} graph
         * @param {GridNode} start
         * @param {GridNode} end
         * @param {Object} [options]
         * @param {bool} [options.closest] Specifies whether to return the
         path to the closest node if the target is unreachable.
         * @param {Function} [options.heuristic] Heuristic function (see
         *          astar.heuristics).
         */
        search: function(graph, start, end, options) {
            graph.cleanDirty();
            options = options || {};
            var heuristic = options.heuristic || astar.heuristics.manhattan;
            var closest = options.closest || false;

            var openHeap = getHeap();
            var closestNode = start; // set the start node to be the closest if required

            start.h = heuristic(start, end);
            graph.markDirty(start);

            openHeap.push(start);

            while (openHeap.size() > 0) {

                // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
                var currentNode = openHeap.pop();

                // End case -- result has been found, return the traced path.
                if (currentNode === end) {
                    return pathTo(currentNode);
                }

                // Normal case -- move currentNode from open to closed, process each of its neighbors.
                currentNode.closed = true;

                // Find all neighbors for the current node.
                var neighbors = graph.neighbors(currentNode);

                for (var i = 0, il = neighbors.length; i < il; ++i) {
                    var neighbor = neighbors[i];

                    if (neighbor.closed || neighbor.isWall()) {
                        // Not a valid node to process, skip to next neighbor.
                        continue;
                    }

                    // The g score is the shortest distance from start to current node.
                    // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
                    var gScore = currentNode.g + neighbor.getCost(currentNode);
                    var beenVisited = neighbor.visited;

                    if (!beenVisited || gScore < neighbor.g) {

                        // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                        neighbor.visited = true;
                        neighbor.parent = currentNode;
                        neighbor.h = neighbor.h || heuristic(neighbor, end);
                        neighbor.g = gScore;
                        neighbor.f = neighbor.g + neighbor.h;
                        graph.markDirty(neighbor);
                        if (closest) {
                            // If the neighbour is closer than the current closestNode or if it's equally close but has
                            // a cheaper path than the current closest node then it becomes the closest node
                            if (neighbor.h < closestNode.h || (neighbor.h === closestNode.h && neighbor.g < closestNode.g)) {
                                closestNode = neighbor;
                            }
                        }

                        if (!beenVisited) {
                            // Pushing to heap will put it in proper place based on the 'f' value.
                            openHeap.push(neighbor);
                        } else {
                            // Already seen the node, but since it has been rescored we need to reorder it in the heap
                            openHeap.rescoreElement(neighbor);
                        }
                    }
                }
            }

            if (closest) {
                return pathTo(closestNode);
            }

            // No result was found - empty array signifies failure to find path.
            return [];
        },
        // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
        heuristics: {
            manhattan: function(pos0, pos1) {
                var d1 = Math.abs(pos1.x - pos0.x);
                var d2 = Math.abs(pos1.y - pos0.y);
                return d1 + d2;
            },
            diagonal: function(pos0, pos1) {
                var D = 1;
                var D2 = Math.sqrt(2);
                var d1 = Math.abs(pos1.x - pos0.x);
                var d2 = Math.abs(pos1.y - pos0.y);
                return (D * (d1 + d2)) + ((D2 - (2 * D)) * Math.min(d1, d2));
            }
        },
        cleanNode: function(node) {
            node.f = 0;
            node.g = 0;
            node.h = 0;
            node.visited = false;
            node.closed = false;
            node.parent = null;
        }
    };

    /**
     * A graph memory structure
     * @param {Array} gridIn 2D array of input weights
     * @param {Object} [options]
     * @param {bool} [options.diagonal] Specifies whether diagonal moves are allowed
     */
    function Graph(gridIn, options) {
        options = options || {};
        this.nodes = [];
        this.diagonal = !!options.diagonal;
        this.grid = [];
        for (var x = 0; x < gridIn.length; x++) {
            this.grid[x] = [];

            for (var y = 0, row = gridIn[x]; y < row.length; y++) {
                var node = new GridNode(x, y, row[y]);
                this.grid[x][y] = node;
                this.nodes.push(node);
            }
        }
        this.init();
    }

    Graph.prototype.init = function() {
        this.dirtyNodes = [];
        for (var i = 0; i < this.nodes.length; i++) {
            astar.cleanNode(this.nodes[i]);
        }
    };

    Graph.prototype.cleanDirty = function() {
        for (var i = 0; i < this.dirtyNodes.length; i++) {
            astar.cleanNode(this.dirtyNodes[i]);
        }
        this.dirtyNodes = [];
    };

    Graph.prototype.markDirty = function(node) {
        this.dirtyNodes.push(node);
    };

    Graph.prototype.neighbors = function(node) {
        var ret = [];
        var x = node.x;
        var y = node.y;
        var grid = this.grid;

        // West
        if (grid[x - 1] && grid[x - 1][y]) {
            ret.push(grid[x - 1][y]);
        }

        // East
        if (grid[x + 1] && grid[x + 1][y]) {
            ret.push(grid[x + 1][y]);
        }

        // South
        if (grid[x] && grid[x][y - 1]) {
            ret.push(grid[x][y - 1]);
        }

        // North
        if (grid[x] && grid[x][y + 1]) {
            ret.push(grid[x][y + 1]);
        }

        if (this.diagonal) {
            // Southwest
            if (grid[x - 1] && grid[x - 1][y - 1]) {
                ret.push(grid[x - 1][y - 1]);
            }

            // Southeast
            if (grid[x + 1] && grid[x + 1][y - 1]) {
                ret.push(grid[x + 1][y - 1]);
            }

            // Northwest
            if (grid[x - 1] && grid[x - 1][y + 1]) {
                ret.push(grid[x - 1][y + 1]);
            }

            // Northeast
            if (grid[x + 1] && grid[x + 1][y + 1]) {
                ret.push(grid[x + 1][y + 1]);
            }
        }

        return ret;
    };

    Graph.prototype.toString = function() {
        var graphString = [];
        var nodes = this.grid;
        for (var x = 0; x < nodes.length; x++) {
            var rowDebug = [];
            var row = nodes[x];
            for (var y = 0; y < row.length; y++) {
                rowDebug.push(row[y].weight);
            }
            graphString.push(rowDebug.join(" "));
        }
        return graphString.join("\n");
    };

    function GridNode(x, y, weight) {
        this.x = x;
        this.y = y;
        this.weight = weight;
    }

    GridNode.prototype.toString = function() {
        return "[" + this.x + " " + this.y + "]";
    };

    GridNode.prototype.getCost = function(fromNeighbor) {
        // Take diagonal weight into consideration.
        if (fromNeighbor && fromNeighbor.x != this.x && fromNeighbor.y != this.y) {
            return this.weight * 1.41421;
        }
        return this.weight;
    };

    GridNode.prototype.isWall = function() {
        return this.weight === 0;
    };

    function BinaryHeap(scoreFunction) {
        this.content = [];
        this.scoreFunction = scoreFunction;
    }

    BinaryHeap.prototype = {
        push: function(element) {
            // Add the new element to the end of the array.
            this.content.push(element);

            // Allow it to sink down.
            this.sinkDown(this.content.length - 1);
        },
        pop: function() {
            // Store the first element so we can return it later.
            var result = this.content[0];
            // Get the element at the end of the array.
            var end = this.content.pop();
            // If there are any elements left, put the end element at the
            // start, and let it bubble up.
            if (this.content.length > 0) {
                this.content[0] = end;
                this.bubbleUp(0);
            }
            return result;
        },
        remove: function(node) {
            var i = this.content.indexOf(node);

            // When it is found, the process seen in 'pop' is repeated
            // to fill up the hole.
            var end = this.content.pop();

            if (i !== this.content.length - 1) {
                this.content[i] = end;

                if (this.scoreFunction(end) < this.scoreFunction(node)) {
                    this.sinkDown(i);
                } else {
                    this.bubbleUp(i);
                }
            }
        },
        size: function() {
            return this.content.length;
        },
        rescoreElement: function(node) {
            this.sinkDown(this.content.indexOf(node));
        },
        sinkDown: function(n) {
            // Fetch the element that has to be sunk.
            var element = this.content[n];

            // When at 0, an element can not sink any further.
            while (n > 0) {

                // Compute the parent element's index, and fetch it.
                var parentN = ((n + 1) >> 1) - 1;
                var parent = this.content[parentN];
                // Swap the elements if the parent is greater.
                if (this.scoreFunction(element) < this.scoreFunction(parent)) {
                    this.content[parentN] = element;
                    this.content[n] = parent;
                    // Update 'n' to continue at the new position.
                    n = parentN;
                }
                // Found a parent that is less, no need to sink any further.
                else {
                    break;
                }
            }
        },
        bubbleUp: function(n) {
            // Look up the target element and its score.
            var length = this.content.length;
            var element = this.content[n];
            var elemScore = this.scoreFunction(element);

            while (true) {
                // Compute the indices of the child elements.
                var child2N = (n + 1) << 1;
                var child1N = child2N - 1;
                // This is used to store the new position of the element, if any.
                var swap = null;
                var child1Score;
                // If the first child exists (is inside the array)...
                if (child1N < length) {
                    // Look it up and compute its score.
                    var child1 = this.content[child1N];
                    child1Score = this.scoreFunction(child1);

                    // If the score is less than our element's, we need to swap.
                    if (child1Score < elemScore) {
                        swap = child1N;
                    }
                }

                // Do the same checks for the other child.
                if (child2N < length) {
                    var child2 = this.content[child2N];
                    var child2Score = this.scoreFunction(child2);
                    if (child2Score < (swap === null ? elemScore : child1Score)) {
                        swap = child2N;
                    }
                }

                // If the element needs to be moved, swap it, and continue.
                if (swap !== null) {
                    this.content[n] = this.content[swap];
                    this.content[swap] = element;
                    n = swap;
                }
                // Otherwise, we are done.
                else {
                    break;
                }
            }
        }
    };

    return {
        astar: astar,
        Graph: Graph
    };

});