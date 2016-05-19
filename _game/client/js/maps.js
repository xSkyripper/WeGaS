/**
 * Created by dan.cehan on 5/16/2016.
 */
"iuma"
Maps = function(id,imgSrc,width,height){
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
        ctx.drawImage(self.image,0,0,2400,1400,0,0,2400,1400);
        
    }

    return self;
}

Maps.current = Maps('field','/client/img/level-one.png',2400,1600);
    