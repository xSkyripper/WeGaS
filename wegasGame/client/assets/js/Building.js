/**
 * Created by Geo on 07.06.2016.
 */
var Building = function (game, sprite, hp, x, y, id) {
    this.game = game;
    this.id = id;
    this.x = x;
    this.y = y;
    this.hp = hp;
    this.markerUnit = this.game.add.graphics();
    this.sprite = sprite;
    if (this.id == 1) {
        console.log("build1");
        this.building = this.game.add.sprite(x, y, this.sprite, 1);
        this.game.physics.enable(this.building, Phaser.Physics.ARCADE);
        this.building.body.setSize(132, 130, 0, 0);
    }
    if (this.id == 2) {
        console.log("build2");
        this.building = this.game.add.sprite(x, y, this.sprite, 3);
        this.game.physics.enable(this.building, Phaser.Physics.ARCADE);
        this.building.body.setSize(150, 140);
    }

};


