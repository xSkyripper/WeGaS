/**
 * Created by dan.cehan on 5/30/2016.
 */
var menuBar = function()
{
    game.camera.width=700;

    this.backgroundBar = game.add.image(700,0,'back');
    this.buttonSoldat=game.add.button(715, 500, 'soldat', this.actionOnClickSoldat, this);
    this.buttonArcas=game.add.button(815, 500, 'arcas', this.actionOnClickArcas, this);
    this.buttonCalaret=game.add.button(915, 500, 'calaret', this.actionOnClickCalaret, this);
    this.miniMap = game.add.image(750,75,'mapWegas');
    this.textGold= game.add.text(775,350,"Gold");
    this.backgroundBar.fixedToCamera=true;
    this.miniMap .fixedToCamera=true;
    this.buttonSoldat.fixedToCamera=true;
    this.buttonArcas.fixedToCamera=true;
    this.buttonCalaret.fixedToCamera=true;
    this.textGold.fixedToCamera=true;

 return this;
}

menuBar.prototype.actionOnClickSoldat = function()
{
    console.log("Am apasat soldat");


}

menuBar.prototype.actionOnClickArcas = function()
{
    console.log("Am apasat arcas");
}
menuBar.prototype.actionOnClickCalaret = function()
{
    console.log("Am apasat calaret");
}

window.menuBar= menuBar;