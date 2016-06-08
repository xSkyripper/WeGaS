/**
 * Created by Geo on 07.06.2016.
 */
var Building = function (game, sprite, hp, x, y, id) {
    this.game = game;
    this.id = id;
    this.x = x;
    this.y = y;
    this.hp = hp;
    this.maxHp = hp;
    this.markerUnit = this.game.add.graphics();
    this.sprite = sprite;
    if (this.id == 1) {
        console.log("build1");
        this.building = this.game.add.sprite(x, y, this.sprite, 1);
        this.game.physics.enable(this.building, Phaser.Physics.ARCADE);
        this.building.body.setSize(132, 130, 0, 0);
        this.building.hpBarContainer = this.game.add.graphics(0, 0);
        //toCreate.hpBarContainer.lineStyle(2, 0x000000, 1);
        this.building.hpBarContainer.beginFill(0x000000, 0.8);
        this.building.hpBarContainer.drawRect(23, 7, 34, 9);

        this.building.hpBar = this.game.add.graphics(0, 0);
        //toCreate.hpBar.lineStyle(2, 0x000000, 1);
        this.building.hpBar.beginFill(0xe60000, 0.8);
        this.building.hpBar.drawRect(25, 9, 32, 6);

        this.building.addChild(this.building.hpBarContainer);
        this.building.addChild(this.building.hpBar);
    }
    if (this.id == 2) {
        console.log("build2");
        this.building = this.game.add.sprite(x, y, this.sprite, 3);
        this.game.physics.enable(this.building, Phaser.Physics.ARCADE);
        this.building.body.setSize(150, 140);
        this.building.hpBarContainer = this.game.add.graphics(0, 0);
        //toCreate.hpBarContainer.lineStyle(2, 0x000000, 1);
        this.building.hpBarContainer.beginFill(0x000000, 0.8);
        this.building.hpBarContainer.drawRect(23, 7, 34, 9);

        this.building.hpBar = this.game.add.graphics(0, 0);
        //toCreate.hpBar.lineStyle(2, 0x000000, 1);
        this.building.hpBar.beginFill(0xe60000, 0.8);
        this.building.hpBar.drawRect(25, 9, 32, 6);

        this.building.addChild(this.building.hpBarContainer);
        this.building.addChild(this.building.hpBar);
    }

};


Building.prototype.update = function () {

    for (var i = 0; i < enemy.createdUnits.length; i++) {
        var X = map.layer.getTileX(enemy.createdUnits[i].markerUnit.x + 32);
        var Y = map.layer.getTileY(enemy.createdUnits[i].markerUnit.y + 32);

        if (this.id == 1) {
            if (X == 11 && Y == 6) {
                console.log('A castigat player 2');
                socket.emit('victory', {id: 2});
            }
        } else {
            if (X == 57 && Y == 60) {
                console.log('A castigat player ');
                socket.emit('victory', {id: 1});
            }
        }
    }
};