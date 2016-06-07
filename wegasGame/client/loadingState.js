/**
 * Created by Vasiliu on 6/7/2016.
 */

var PreloadState = {

    preload : function(){
        this.logo = this.add.sprite(this.game.world.centerX,this.game.world.centerY,'logo');
        this.logo.anchor.setTo(0.5);

        game.load.tilemap('map', '/client/assets/summerWegassWar.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', '/client/assets/img/summer.png');

        game.load.image('unit1_i', '/client/assets/img/unit1_i.png');
        game.load.image('unit2_i', '/client/assets/img/unit2_i.png');
        game.load.image('unit3_i', '/client/assets/img/unit3_i.png');
        game.load.image('mapWegas', '/client/assets/img/summerWegassWar.png');
        game.load.image('back', '/client/assets/img/guiBack.png');

        //TODO: Schimba baza de date (units,rooms)
        //TODO: Incarcare din baza de date, trimitere la player doar ce are nevoie

        game.load.spritesheet('unit1_1', '/client/assets/img/unit1_1.png', 70, 70);
        game.load.spritesheet('unit1_2', '/client/assets/img/unit1_2.png', 70, 70);
        game.load.spritesheet('unit2_1', '/client/assets/img/unit2_1.png', 70, 70);
        game.load.spritesheet('unit3_2', '/client/assets/img/unit2_2.png', 70, 70);
        game.load.spritesheet('unit3_1', '/client/assets/img/unit3_1.png', 70, 70);
        game.load.spritesheet('unit3_2', '/client/assets/img/unit3_2.png', 70, 70);
    }

}