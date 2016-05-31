var Player = function (id, x, y, name, coins, units) {
    this.start = {
        x: x,
        y: y
    };
    this.startTile = {
        x: map.layer.getTileX(x + 32),
        y: map.layer.getTileY(y + 32)
    };
    this.id = id;
    this.name = name;
    this.coins = coins;
    this.units = units;
    this.createdUnits = [];
};

window.Player = Player;