/**
 * Created by dan.cehan on 5/20/2016.
 */
Bar = function(id,imgSrc,width,height){
    var self = {
        id:id,
        image:new Image(),
        width:width,
        height:height
    }
    self.image.src = imgSrc;
    self.x=0;
    self.y=0;
    self.draw = function(){
        //console.log("");
        ctx.drawImage(self.image,0,0,400,547,0,800,200,100);
        ctx.strokeRect(0, 800, 200, 100);

    }

    return self;
}

Bar.current = Bar('field','/client/img/Soldat.png',400,547);