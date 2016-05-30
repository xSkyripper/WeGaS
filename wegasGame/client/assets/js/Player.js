var Player = function (id, x, y, name, coins, units) {
    this.startX = x;
    this.startY = y;
    this.id = id;
    this.name = name;
    this.coins = coins;
    this.units = units;
    this.createdUnits = [];
};

window.Player = Player;