'use strict';
const xMin = 0;
const xMax = 800;
const yMin = 0;
const yMax = 400;
const handSize = 30;
const handSize_2 = handSize/2;

class Mosquito{
	constructor(inputDomElement,speed){
		this.domElement=inputDomElement;
		moveToRandomPosition(this);
		this.angle= setRandomDirection();
		this.speed=speed;
		this.crashed = false;
		this.nextDirection = 0;
		this.dead = false;
		this.move();
	}
	move(){
		this.setIntervalId=setInterval(moveMosquito,1)
		const stopDulation = 100;
		var position = getPosition(this);
		var domElement=this.domElement;
		var me=this;
		var changeDirCount = 30;
		var nextDirection = 0;
		var stop = false;
		var stopcount = stopDulation;
		var direction = {"x": 0, "y":0};
		var speed = this.speed;

		function moveMosquito(){
			//console.log(carObj.direction);
			var angle = parseInt(me.angle);


			angle = degin360(angle);

			//console.log("deg:" + (carDirection));
			if(changeDirCount < 0){
				changeDirCount = Math.floor(Math.random()*100);
				nextDirection = (Math.random()  - 0.5) * 4;
				//console.log("changeDirCount:" + changeDirCount)
				//console.log("nextDirection:" + nextDirection)
				if(Math.random() > 0.8){
					stop = true;
				}
			}
			angle += nextDirection;
			//console.log("cd:" + carDirection);

			if(stop == false){
				direction = getDirection(angle);
				position = proceed(position, direction, speed);
				position = boarderCheck(position);
			} else{
				stopcount--;
				if(stopcount < 0){
					stopcount = stopDulation;
					stop = false;
				}
			}



			//console.log(carObj.crashed)
			if(me.crashed == false){
				me.speed = speed;
				me.angle = angle;
				domElement.css("transform", "rotate(" + (angle) + "deg)");
				domElement.css("left",position.x+'px');
				domElement.css("top",position.y+'px');
			}
			changeDirCount--;
		}

	}
	stop(){
		if (this.setIntervalId){
			clearInterval(this.setIntervalId);
		}
	}

	crash(){
		console.log("crashed");
		this.domElement.addClass("dead")
		this.crashed = true;
	}
	getPosition(){
		var position = {"x": 0, "y": 0};
		var x = parseInt(this.domElement.css("left"));
		var y = parseInt(this.domElement.css("top"));
		position.x = x;
		position.y = y;
		return position;
	}
}


class GameManager{

	constructor(){
		console.log("GameManager");
		var mosDomElement1=$('#mos1');
		var mosDomElement2=$('#mos2');
		this.mosquito1 = new Mosquito(mosDomElement1,0.5);
		this.mosquito2 = new Mosquito(mosDomElement2,0.3);
		this.score = 0;
	}

	click(e){
		var position={"x": parseInt($("#car").css("left")), "y": parseInt($("#car").css("top"))}
		//console.log(position);
		//console.log(e.clientX);
		//console.log(e.clientY);
			console.log(this.mosquito1.getPosition());
			var position = this.mosquito1.getPosition();
		if(e.clientX-handSize < position.x && position.x < e.clientX && e.clientY-handSize < position.y && position.y < e.clientY){
			this.mosquito1.crash();
		}
		position={"x": parseInt($("#car2").css("left")), "y": parseInt($("#car2").css("top"))}
		var position = this.mosquito2.getPosition();
		if(e.clientX-handSize < position.x && position.x < e.clientX && e.clientY-handSize < position.y && position.y < e.clientY){
			this.mosquito2.crash();
		}
	}
}

$(document).ready(function(){

	var manager = new GameManager();


	$(window).mousemove( function(e) {
	  $("#info").html(info);
		var x = e.clientX - handSize + "px";
		var y = e.clientY - handSize + "px";
		$("#hand").css({"left": x, "top":y});
	});

	$(window).click( function(e){
	//	position = getPosition($("#car"));
		manager.click(e);
	});

	$(document).keydown(function(key){
		//console.log(key.keyCode);
		switch(key.keyCode){
			case 37://Left Arrow
			break;
			case 39:// Right arrow
			break;
			case 38:// Up arrow
			break;
			case 40:// Down arrow
			break;
			case 32://When space, stop the car
			break;
			case 65: // accelerate when a is pressed
			break;
		}
	});
});

function radian(deg){
	return (2*Math.PI) * (deg/360);
}

function degin360(deg){
	while(deg < 0){
		deg += 360;
	}
	return deg % 360;
}

function getDirection(deg){
	var r = radian(deg);
	var result = {"x": 0, "y": 0};

	result["x"] = Math.cos(r);
	result["y"] = Math.sin(r);
	return result;
}

function proceed(position,direction,speed){
	position.x += speed * direction.x;
	position.y += speed * direction.y;
	return position;
}

function getPosition(element){
	var position = {"x": 0, "y": 0};
	position.x = parseInt(element.domElement.css("left"));
	position.y = parseInt(element.domElement.css("top"));
	return position;
}

function boarderCheck(position){
	if(position.x >= xMax){
		//				carDirection += 180
		position.x = xMin;
	} else if(position.x <= xMin){
		position.x = xMax;
	}

	if(position.y >= yMax){
		position.y = yMin;
	} else if(position.y <= yMin){
		position.y += yMax;
	}
	return position;
}


function moveToRandomPosition(element){
	var x = Math.floor(Math.random() * xMax);
	var y = Math.floor(Math.random() * yMax);
	console.log(element)
	element.domElement.css({"left": x + "px", "top": y+"px"});
}

function setRandomDirection(){
	return  Math.floor(Math.random() * 360);
}
