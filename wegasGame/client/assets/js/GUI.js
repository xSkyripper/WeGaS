var GUI = function () {
    game.camera.width = 700;
    this.gui = game.add.group();

    this.backgroundBar = game.add.image(700, 0, 'back');
    //this.miniMap = game.add.image(750, 20, 'mapWegas');
    this.textCoins = game.add.text(750, 230, "Coins: ");
    this.backgroundBar.fixedToCamera = true;
    //this.miniMap.fixedToCamera = true;
    this.textCoins.fixedToCamera = true;
    this.gui.add(this.backgroundBar);
    // this.gui.add(this.miniMap);
    this.gui.add(this.textCoins);

    this.buttonUnit1 = game.add.button(715, 500, 'unit1_i', this.actionOnClickUnit1, this);
    this.buttonUnit2 = game.add.button(815, 500, 'unit2_i', this.actionOnClickUnit2, this);
    this.buttonUnit3 = game.add.button(915, 500, 'unit3_i', this.actionOnClickUnit3, this);
    this.buttonUnit1.fixedToCamera = true;
    this.buttonUnit2.fixedToCamera = true;
    this.buttonUnit3.fixedToCamera = true;
    this.gui.add(this.buttonUnit1);
    this.gui.add(this.buttonUnit2);
    this.gui.add(this.buttonUnit3);
};

GUI.prototype.actionOnClickUnit1 = function () {

    var avTile = map.getAvailableTile(me.startTile);
    var newUnit = me.units[0].create(me.createdUnits.length, avTile.x * 32 - 24, avTile.y * 32 - 24);
    me.createdUnits.push(newUnit);
    console.log(me.name + ": Created a unit1 (footman) la " + newUnit.x + " " + newUnit.y);
    socket.emit('create_unit', {
        sprite: newUnit.sprite,
        owner: newUnit.owner,
        hp: newUnit.hp,
        minAtk: newUnit.minAtk,
        maxAtk: newUnit.maxAtk,
        ms: newUnit.ms,
        coins: newUnit.coins,
        x: newUnit.x,
        y: newUnit.y
    });
};

GUI.prototype.actionOnClickUnit2 = function () {
    var avTile = map.getAvailableTile(me.startTile);
    var newUnit = me.units[1].create(me.createdUnits.length, avTile.x * 32 - 24, avTile.y * 32 - 24);
    me.createdUnits.push(newUnit);
    console.log(me.name + ": Created a unit2 (archer) la " + newUnit.x + " " + newUnit.y);
    socket.emit('create_unit', {
        sprite: newUnit.sprite,
        owner: newUnit.owner,
        hp: newUnit.hp,
        minAtk: newUnit.minAtk,
        maxAtk: newUnit.maxAtk,
        ms: newUnit.ms,
        coins: newUnit.coins,
        x: newUnit.x,
        y: newUnit.y
    });
};

GUI.prototype.actionOnClickUnit3 = function () {
    var avTile = map.getAvailableTile(me.startTile);
    var newUnit = me.units[2].create(me.createdUnits.length, avTile.x * 32 - 24, avTile.y * 32 - 24);
    me.createdUnits.push(newUnit);
    console.log(me.name + ": Created a unit3 (knight) la " + newUnit.x + " " + newUnit.y);
    socket.emit('create_unit', {
        sprite: newUnit.sprite,
        owner: newUnit.owner,
        hp: newUnit.hp,
        minAtk: newUnit.minAtk,
        maxAtk: newUnit.maxAtk,
        ms: newUnit.ms,
        coins: newUnit.coins,
        x: newUnit.x,
        y: newUnit.y
    });
};

GUI.prototype.update = function () {
    this.textCoins.setText('Coins: ' + me.coins);
};

GUI.prototype.updateGuiOverlap = function (anotherSprite) {
    anotherSprite.renderable = !checkOverlap(this.gui, anotherSprite);
};

function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

window.GUI = GUI;
