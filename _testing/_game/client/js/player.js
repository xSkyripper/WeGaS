/**
 * Created by dan.cehan on 5/16/2016.
 */



Player = function(type,id,x,y,width,height,img,hp) {
    var self = {
        type: type,
        id: id,
        x: x,
        y: y,
        width: width,
        height: height,
        img: img,
        hp:hp
    };

    self.hp = 20;
    self.hpMax = 20;
    self.atkSpd = 20;
    self.attackCounter = 50;
    self.aimAngle = 0;
    self.spriteAnimCounter = 0;
    self.flip=false;
    self.pressingQ= false;
    self.pressingMouseLeft = false;
    self.pressingMouseRight = false;
    self.flag=6;
    self.isSelected=false;


    self.v1 = 0;
    self.v2 = 0;
    self.OA = 0;
    self.OB = 0;
    self.OF = 0;

    self.directionMod=0;
    self.x1=0;
    var direction;

    self.update = function () {
        self.draw();
        if (self.pressingQ) {
            self.performAttack();
        }

    }
    self.performAttack = function () {
        if (self.attackCounter > 25) {	//every 1 sec
            //Bullet.generate();
        }
    }

    self.getDirection = function () {
        if( self.aimAngle >= 355 &&  self.aimAngle <=360 ||  self.aimAngle >= 0 &&  self.aimAngle <= 15)
            direction = 2;	//draw right
        else if( self.aimAngle > 15 &&  self.aimAngle < 75)
            direction = 5;	//draw right
        if( self.aimAngle >= 75 &&  self.aimAngle <= 110)	//down
            direction = 4;
        else if( self.aimAngle > 110 &&  self.aimAngle < 160)
            direction = 6;	//draw right
        else if( self.aimAngle >= 160 &&  self.aimAngle < 195)	//left
            direction = 3;
        else if( self.aimAngle >= 195 &&  self.aimAngle < 247)	//left
            direction = 7;
        else if( self.aimAngle >= 247 &&  self.aimAngle < 295)	//left
            direction = 0;
        else if( self.aimAngle >= 295 &&  self.aimAngle < 355)	//left
            direction = 8;


        if (self.x < self.width / 2)
        {
            self.x = self.width / 2;
        }

        if (self.x > (Maps.current.width/2 - self.width / 2)) {
            self.x = Maps.current.width/2 - self.width / 2 ;
        }

        if (self.y < self.height / 2) {
            self.y = self.height / 2;
        }
        if(self.y > (Maps.current.height/2 - self.height/2))
        {
            self.y = Maps.current.height/2 - self.height/2-50;
        }

        console.log(direction);

        return direction;
    }



    self.draw = function () {      
        if(self.directionMod == 0) // UP
            ctx.drawImage(Img.player,0,(self.flag*Img.player.height)/11.5,Img.player.width/5,Img.player.height/13,self.x,self.y,75,75);
        if(self.directionMod == 4) //DOWN
            ctx.drawImage(Img.player,(4*Img.player.width)/5,(self.flag*Img.player.height)/11.5,Img.player.width/5,Img.player.height/13,self.x,self.y,85,85);
        if(self.directionMod == 2) //RIGHT
            ctx.drawImage(Img.player,(2*Img.player.width)/5,(self.flag*Img.player.height)/11.6,Img.player.width/5,Img.player.height/11,self.x,self.y,85,85);
        if(self.directionMod == 3) //LEFT
        {
            ctx.scale(-1,1);
            ctx.drawImage(Img.player,(2*Img.player.width)/5,(self.flag*Img.player.height)/11.6,Img.player.width/5,Img.player.height/11,-self.x-60,self.y,85,85);
            self.flip=true;
        }
        if(self.directionMod == 5){ // DOWN RIGHT
            ctx.drawImage(Img.player,(3*Img.player.width)/5,(self.flag*Img.player.height)/11.6,Img.player.width/5,Img.player.height/11,self.x,self.y,85,85);
        }
        if(self.directionMod == 6){ //DOWN LEFT
            ctx.scale(-1,1);
            ctx.drawImage(Img.player,(3*Img.player.width)/5,(self.flag*Img.player.height)/11.6,Img.player.width/5,Img.player.height/11,-self.x-60,self.y,85,85);
            self.flip=true;
        }
        if(self.directionMod == 7){ // UP LEFT
            ctx.scale(-1,1);
            ctx.drawImage(Img.player,(Img.player.width)/5,(self.flag*Img.player.height)/11.6,Img.player.width/5,Img.player.height/11,-self.x-60,self.y,85,85);
            self.flip=true;
    }
        if(self.directionMod == 8){ //UP RIGHT
            ctx.drawImage(Img.player,(Img.player.width)/5,(self.flag*Img.player.height)/11.6,Img.player.width/5,Img.player.height/11,self.x,self.y,85,85);
        }

        if(self.flip===false) {
            var x = self.x;
            var y = self.y - self.height / 2;
            ctx.fillStyle = 'red';
            var width = 100 * self.hp / self.hpMax;
            if (width < 0)
                width = 0;
            ctx.fillRect(x - 10, y, width, 10);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(x - 10, y, 100, 10);
        }
        else {
            var x = -self.x;
            var y = self.y - self.height/2 ;
            ctx.fillStyle = 'red';
            var width = 100*self.hp/self.hpMax;
            if(width < 0)
                width = 0;
            ctx.fillRect(x-50,y,width,10);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(x-50,y,100,10);
            self.flip=false;
        }

        if(self.x1 == self.x && gameStart)
        {
            self.isSelected=false;

        }

        ctx.restore();
      
    }





    self.pressingMouseLeft = false;
    self.pressingMouseRight = false;

return self;

}

