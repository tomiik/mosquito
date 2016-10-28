'use strict';
const xMin = 0;
const xMax = 800;
const yMin = 0;
const yMax = 400;

class Car{
	constructor(inputDomElement,model){
		this.domElement=inputDomElement;
		this.domElement.css('left','10px');
		this.domElement.css('top','10px');
		this.direction=0;
		this.increment=true;
		this.speed=1;
		this.crashed = false;
		this.nextDirection = 0;
		this.move();
	}
	move(){
		this.setIntervalId=setInterval(moveMosquito,1)
		const stopDulation = 100;
		var position = getPosition(this);
		var domElement=this.domElement;
		var carObj=this;
		var changeDirCount = 30;
		var nextDirection = 0;
		var stop = false;
		var stopcount = stopDulation;
		var direction = {"x": 0, "y":0};
		var speed = this.speed;

		function moveMosquito(){
			//console.log(carObj.direction);
			var carDirection = parseInt(carObj.direction);


			carDirection = degin360(carDirection);

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
			carDirection += nextDirection;
			//console.log("cd:" + carDirection);

			if(stop == false){
				direction = getDirection(carDirection);
			} else{
				stopcount--;
				if(stopcount < 0){
					stopcount = stopDulation;
					stop = false;
				}
			}
			console.log(direction)
			//console.log(directionX + "," + directionY);
			//console.log("currentspeed:" + speed);

			position = proceed(position, direction, speed);

			position = boarderCheck(position);


			//console.log(carObj.crashed)
			if(carObj.crashed == false){
				carObj.speed = speed;
				carObj.direction = carDirection;
				domElement.css("transform", "rotate(" + (carDirection) + "deg)");
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
		$(car).css({"background-image":"url('./images/crashed.png')"});
		this.crashed = true;
	}

	increaseSpeed(){
		if (this.speed<=5){
			this.speed++;
		}
	}
	decreaseSpeed(){
		if (this.speed>-1){
			this.speed--;
		}
	}
}


$(document).ready(function(){
	var carDomElement=$('#car');
	var carObject = new Car(carDomElement,"SUV");


	$(document).keydown(function(key){
		//console.log(key.keyCode);
		switch(key.keyCode){
			case 37://Left Arrow
			objControlSystem.turnLeft();
			break;
			case 39:// Right arrow
			objControlSystem.turnRight();
			break;
			case 38:// Up arrow

			objControlSystem.accelerate();
			objControlSystem2.accelerate();
			break;
			case 40:// Down arrow
			objControlSystem.slowDown();
			break;
			case 32://When space, stop the car
			objControlSystem.stop();
			break;
			case 65: // accelerate when a is pressed
			objControlSystem.respawn();
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
