//app.js
var express = require('express');
var app = express();
var serv = require('http').Server(app);

// app.get('/',function(req, res) {
// 	res.sendFile(__dirname + '/client/index.html');
// });

var usernames = [];
var k = -1;
// localhost:2000/prostiiprostii

app.get('/:user', function (req, res) {
    usernames[k++] = req.params.user;

    // if(exista user in baza de date && user este logat)
    // 	res.sendFile(__dirname + '/client/index.html');
    // else
    // 	res.sendFile(__dirname +'/client/eroare.html');

    res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

serv.listen(2000);
console.log("Server started.");

var SOCKET_LIST = {};
var PLAYER_LIST = {};
var xStartPlayer = 100;
var yStartPlayer = 100;
/**
 * Created by dan.cehan on 5/16/2016.
 */



<<<<<<< HEAD
Player = function(type,id,x,y,width,height,img,hp) {
	var self = {
		type: type,
		id: id,
		x: x,
		y: y,
		width: width,
		height: height,
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
	self.flag=6;
	self.isSelected=false;
	self.mouseX;
	self.mouseY;
	self.v1 = 0;
	self.v2 = 0;
	self.OA = 0;
	self.OB = 0;
	self.OF = 0;

	self.directionMod=0;
	self.x1=0;
	var direction;

	self.updatePosition = function () {
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
		self.aimAngle= Math.atan2((self.mouseY-self.y),(self.mouseX-self.x)) / Math.PI * 180;
		if(self.aimAngle<0)
			self.aimAngle+=360;
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

		if (self.x > (1200 - self.width / 2)) {
			self.x = 1200 - self.width / 2 ;
		}

		if (self.y < self.height / 2) {
			self.y = self.height / 2;
		}
		if(self.y > (800 - self.height/2))
		{
			self.y = 800- self.height/2-50;
		}

		//console.log(direction);

		return direction;
	}



	self.draw = function () {

		if (self.x != self.x1) {
			self.flag++;
			self.flag = self.flag % 5;
			if (self.flag == 0) {
				self.flag++;
			}


		}


		self.directionMod = self.getDirection();
		self.OF = Math.sqrt((self.mouseX - self.x) * (self.mouseX - self.x) + (self.mouseY - self.y) * (self.mouseY - self.y));
		self.OA = Math.abs(self.mouseX - self.x);
		self.OB = Math.abs(self.mouseY - self.y);
		self.v2 = self.OA / self.OF * 6;//OA
		self.v1 = self.OB / self.OF * 6;
		self.x1 = self.x;
		if (self.x < self.mouseX)
				self.x += self.v2;
		if (self.y < self.mouseY)
				self.y += self.v1;
		if (self.x > self.mouseX)
				self.x -= self.v2;
		if (self.y > self.mouseY)
				self.y -= self.v1;



		//console.log(self.directionMod);
		/*if(self.directionMod == 0) // UP
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

		}*/



	}






	self.pressingMouseLeft = false;
	self.pressingMouseRight = false;

	return self;
=======
Player = function (type, id, x, y, width, height, img, hp) {
    var self = {
        type: type,
        id: id,
        x: x,
        y: y,
        width: width,
        height: height,
        hp: hp
    };

    self.hp = 20;
    self.hpMax = 20;
    self.atkSpd = 20;
    self.attackCounter = 50;
    self.aimAngle = 0;
    self.spriteAnimCounter = 0;
    self.flip = false;
    self.pressingQ = false;
    self.flag = 6;
    self.isSelected = false;
    self.mouseX;
    self.mouseY;
    self.v1 = 0;
    self.v2 = 0;
    self.OA = 0;
    self.OB = 0;
    self.OF = 0;

    self.directionMod = 0;
    self.x1 = 0;
    var direction;

    self.updatePosition = function () {
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
        self.aimAngle = Math.atan2((self.mouseY - self.y), (self.mouseX - self.x)) / Math.PI * 180;
        if (self.aimAngle < 0)
            self.aimAngle += 360;
        if (self.aimAngle >= 355 && self.aimAngle <= 360 || self.aimAngle >= 0 && self.aimAngle <= 15)
            direction = 2;	//draw right
        else if (self.aimAngle > 15 && self.aimAngle < 75)
            direction = 5;	//draw right
        if (self.aimAngle >= 75 && self.aimAngle <= 110)	//down
            direction = 4;
        else if (self.aimAngle > 110 && self.aimAngle < 160)
            direction = 6;	//draw right
        else if (self.aimAngle >= 160 && self.aimAngle < 195)	//left
            direction = 3;
        else if (self.aimAngle >= 195 && self.aimAngle < 247)	//left
            direction = 7;
        else if (self.aimAngle >= 247 && self.aimAngle < 295)	//left
            direction = 0;
        else if (self.aimAngle >= 295 && self.aimAngle < 355)	//left
            direction = 8;


        if (self.x < self.width / 2) {
            self.x = self.width / 2;
        }

        if (self.x > (1200 - self.width / 2)) {
            self.x = 1200 - self.width / 2;
        }

        if (self.y < self.height / 2) {
            self.y = self.height / 2;
        }
        if (self.y > (800 - self.height / 2)) {
            self.y = 800 - self.height / 2 - 50;
        }

        //console.log(direction);

        return direction;
    }


    self.draw = function () {

        if (self.x != self.x1) {
            self.flag++;
            self.flag = self.flag % 5;
            if (self.flag == 0) {
                self.flag++;
            }
            self.directionMod = self.getDirection();

        }


        self.OF = Math.sqrt((self.mouseX - self.x) * (self.mouseX - self.x) + (self.mouseY - self.y) * (self.mouseY - self.y));
        self.OA = Math.abs(self.mouseX - self.x);
        self.OB = Math.abs(self.mouseY - self.y);
        self.v2 = self.OA / self.OF * 6;//OA
        self.v1 = self.OB / self.OF * 6;
        self.x1 = self.x;
        if (self.x < self.mouseX)
            self.x += self.v2;
        if (self.y < self.mouseY)
            self.y += self.v1;
        if (self.x > self.mouseX)
            self.x -= self.v2;
        if (self.y > self.mouseY)
            self.y -= self.v1;


        //console.log(self.directionMod);
        /*if(self.directionMod == 0) // UP
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

         }*/


    }


    self.pressingMouseLeft = false;
    self.pressingMouseRight = false;

    return self;
>>>>>>> 0c549a585ab7548e53f5e2c334f904d2e6b76157

}


<<<<<<< HEAD
var startPlayerX=100;
var startPlayerY=100;
var io = require('socket.io')(serv,{});
io.sockets.on(	'connection', function(socket) {
	socket.id = Math.random();
	SOCKET_LIST[socket.id] = socket;

	var player = Player("player",socket.id,startPlayerX,startPlayerY,64,64,20,5);
	startPlayerX+=50;
	startPlayerY+=50;
	PLAYER_LIST[socket.id] = player;
	socket.on('disconnect', function () {
		delete SOCKET_LIST[socket.id];
		delete PLAYER_LIST[socket.id];
	});

	/*socket.on('keyPress',function(data){
	 if(data.inputId === 'left')
	 player.pressingLeft = data.state;
	 else if(data.inputId === 'right')
	 player.pressingRight = data.state;
	 else if(data.inputId === 'up')
	 player.pressingUp = data.state;
	 else if(data.inputId === 'down')
	 player.pressingDown = data.state;
	 });*/

	socket.on('mousePress', function (data) {
		if (data.input === 'click1') {

			PLAYER_LIST[socket.id].mouseX=data.coordX;
			PLAYER_LIST[socket.id].mouseY = data.coordY;
			//console.log(mouseX+" "+mouseY);
		}
		else if (data.input === 'click2') {

		}
	});

	setInterval(function () {
		var pack = [];
		for (var i in PLAYER_LIST) {
			var player = PLAYER_LIST[i];
			player.updatePosition();
			pack.push({
				x: player.x,
				y: player.y,
				directionMod : player.directionMod,
				flag: player.flag,
				flip: player.flip,
				hp:player.hp,
				hpMax:player.hpMax,
				number: player.number
			});
		}
		for (var i in SOCKET_LIST) {
			var socket = SOCKET_LIST[i];
			socket.emit('newPositions', pack);
		}
	}, 80);
}
=======
var startPlayerX = 100;
var startPlayerY = 100;
var io = require('socket.io')(serv, {});
io.sockets.on('connection', function (socket) {
        socket.id = Math.random();
        SOCKET_LIST[socket.id] = socket;

        console.log("users: " + usernames);

        var player = Player("player", socket.id, startPlayerX, startPlayerY, 64, 64, 20, 5);
        startPlayerX += 50;
        startPlayerY += 50;
        PLAYER_LIST[socket.id] = player;
        socket.on('disconnect', function () {
            delete SOCKET_LIST[socket.id];
            delete PLAYER_LIST[socket.id];
        });

        /*socket.on('keyPress',function(data){
         if(data.inputId === 'left')
         player.pressingLeft = data.state;
         else if(data.inputId === 'right')
         player.pressingRight = data.state;
         else if(data.inputId === 'up')
         player.pressingUp = data.state;
         else if(data.inputId === 'down')
         player.pressingDown = data.state;
         });*/

        socket.on('mousePress', function (data) {
            if (data.input === 'click1') {

                PLAYER_LIST[socket.id].mouseX = data.coordX;
                PLAYER_LIST[socket.id].mouseY = data.coordY;
                //console.log(mouseX+" "+mouseY);
            }
            else if (data.input === 'click2') {

            }
        });

        setInterval(function () {
            var pack = [];
            for (var i in PLAYER_LIST) {
                var player = PLAYER_LIST[i];
                player.updatePosition();
                pack.push({
                    x: player.x,
                    y: player.y,
                    directionMod: player.directionMod,
                    flag: player.flag,
                    flip: player.flip,
                    hp: player.hp,
                    hpMax: player.hpMax,
                    number: player.number
                });
            }
            for (var i in SOCKET_LIST) {
                var socket = SOCKET_LIST[i];
                socket.emit('newPositions', pack);
            }
        }, 40);
    }
>>>>>>> 0c549a585ab7548e53f5e2c334f904d2e6b76157
);