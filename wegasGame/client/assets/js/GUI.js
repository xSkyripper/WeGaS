var GUI = function () {
    game.camera.width = 700;
    this.gui = game.add.group();


    this.backgroundBar = game.add.image(700, 0, 'back');
    this.miniMap = game.add.image(750, 20, 'mapWegas');
    this.textCoins = game.add.text(750, 230, "Coins: ");
    this.buttonSoldat = game.add.button(715, 500, 'unit1_i', this.actionOnClickSoldat, this);
    this.buttonArcas = game.add.button(815, 500, 'unit2_i', this.actionOnClickArcas, this);
    this.buttonCalaret = game.add.button(915, 500, 'unit3_i', this.actionOnClickCalaret, this);

    this.backgroundBar.fixedToCamera = true;
    this.miniMap.fixedToCamera = true;
    this.buttonSoldat.fixedToCamera = true;
    this.buttonArcas.fixedToCamera = true;
    this.buttonCalaret.fixedToCamera = true;
    this.textCoins.fixedToCamera = true;

    this.gui.add(this.backgroundBar);
    this.gui.add(this.buttonSoldat);
    this.gui.add(this.buttonCalaret);
    this.gui.add(this.buttonArcas);
    this.gui.add(this.miniMap);
    this.gui.add(this.textCoins);
    
};

GUI.prototype.actionOnClickSoldat = function () {
    console.log("Am apasat soldat");
    me.coins = 1300;
    var unitCreated2 = me.units[0].create(327, 391);
    me.createdUnits.push(unitCreated2);
};

GUI.prototype.actionOnClickArcas = function () {
    console.log("Am apasat arcas");
    var unitCreated2 = me.units[1].create(327, 391);
    me.createdUnits.push(unitCreated2);
    me.coins = 1200;
};

GUI.prototype.actionOnClickCalaret = function () {
    console.log("Am apasat calaret");
    me.coins = 1100;
    var unitCreated2 = me.units[2].create(327, 391);
    me.createdUnits.push(unitCreated2);
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
