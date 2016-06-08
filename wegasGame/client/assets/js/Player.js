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

    if (id == 1) {
        this.base = map.base1;
    } else {
        this.base = map.base2;
    }

    this.createdUnits = [];
};

window.Player = Player;