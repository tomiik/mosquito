'use strict';
const xMin = 0;
const xMax = 800;
const yMin = 0;
const yMax = 400;
const handSize = 60;
const handSize_2 = handSize/2;
const maxMosquitoes = 100;

class Mosquito{
	constructor(inputDomElement,speed, power){
		this.domElement=inputDomElement;
		moveToRandomPosition(this);
		this.created();
		this.angle= setRandomDirection();
		this.speed=speed;
		this.power=power;
		this.nextDirection = 0;
		this.dead = false;
		this.move();
		this.position = {"x":0, "y":0};
	}
	move(){
		this.setIntervalId=setInterval(moveMosquito,1)
		const stopDulation = 100;
		var domElement=this.domElement;
		var me=this;
		var position = me.getPosition(this);
		var timer = 30;
		var nextDirection = 0;
		var stop = false;
		var stopcount = stopDulation;
		var direction = {"x": 0, "y":0};
		var speed = this.speed;
		var angle = this.angle;

		function moveMosquito(){
			//angle calc
			angle += nextDirection;
			angle = degin360(angle);

			if(stop == false){
				//calc direction
				direction = getDirection(angle);

				//proceed
				me.proceed(direction, speed);
			} else{
				stopcount--;
				if(stopcount < 0){
					stopcount = stopDulation;
					stop = false;
				}
			}

			//console.log(carObj.crashed)
			if(me.dead == false){
				me.refreshParams(speed,angle,position);
				me.redraw();
			}
			if(timer < 0){
				timer = me.getNextSleep();
				nextDirection = me.getNextDirection();
				stop = me.iWantStop();
			}
			timer--;
		}
	}
	redraw(){
		this.domElement.css("transform", "rotate(" + (this.angle) + "deg)");
		this.domElement.css("left",this.position.x+'px');
		this.domElement.css("top",this.position.y+'px');
	}
	refreshParams(speed, angle, position){
		this.angle = angle;
		this.speed = speed;
		this.position = position;
	}
	getNextSleep(){
		return Math.floor(Math.random()*100);;
	}
	getNextDirection(){
		return (Math.random()  - 0.5) * 4;
	}
	iWantStop(){
		return Math.random() > 0.8;
	}
	stop(){
		if (this.setIntervalId){
			clearInterval(this.setIntervalId);
		}
	}
	proceed(direction,speed){
		this.position.x += speed * direction.x;
		this.position.y += speed * direction.y;
		this.borderCheck();
	}
	borderCheck(){
		if(this.position.x >= xMax){
			//				carDirection += 180
			this.position.x = xMin;
		} else if(this.position.x <= xMin){
			this.position.x = xMax;
		}

		if(this.position.y >= yMax){
			this.position.y = yMin;
		} else if(this.position.y <= yMin){
			this.position.y += yMax;
		}
	}
	created(){
		this.domElement.addClass("exist")
	}
	crash(){
		console.log("crashed");
		this.domElement.addClass("dead")
		this.dead = true;
		var score = this.speed * this.power * 100;
		console.log(score);
		return score;
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
		this.mosquitoes = [];
		this.numOfMosquitoes = this.createMosquitoes(3,0.5,1);
		this.killed = 0;
		this.score = 0;
		//this.generateMosquitoes(3,1);
		this.refreshStatus();
		this.start();
	}

	start(){
		var mosquitoes = this.mosquitoes.length;
		var killed = this.killed
		this.setIntervalId=setInterval(statusChecker,100)
		function statusChecker(){
			if(parseInt($("#num_of_mosquitoes").text()) <= 0){
				$("#message").text("Clear");
			}
		}
	}



	click(e){
		var killed = 0;
		var score = 0;
		this.mosquitoes.forEach(function(mosquito, index){
			var position = mosquito.getPosition();
			if(e.clientX-handSize < position.x && position.x < e.clientX && e.clientY-handSize < position.y && position.y < e.clientY){
				if(!mosquito.dead)
				{
					score += mosquito.crash();
					killed++;
				}
			}
		});
		this.killed += killed;
		this.score += score;
		this.refreshStatus();
	}

	createMosquitoes(number, speed, power){
		var count = 0;
		var offset = this.mosquitoes.length;
		var max = Math.min(maxMosquitoes, number + offset);
		for(var i = offset + 1; i <= max; i++){
			this.mosquitoes.push(new Mosquito($('#mos' + i), speed, power));
			count++;
		}
		return count;
	}

	refreshStatus(){
		//var str_mos = "mosquitoes:" + (this.numOfMosquitoes - this.killed);
		//var str_score = ",score:" + this.score;
		//$("#info").text(str_mos + str_score);
		$("#num_of_mosquitoes").text(this.numOfMosquitoes - this.killed);
		$("#score").text(this.score);
	}
}

$(document).ready(function(){
	var manager = new GameManager();

	$(window).mousemove( function(e) {
		var x = e.clientX - handSize + "px";
		var y = e.clientY - handSize + "px";
		$("#hand").css({"left": x, "top":y});
	});

	$(window).mousedown( function(e){
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







function moveToRandomPosition(element){
	var x = Math.floor(Math.random() * xMax);
	var y = Math.floor(Math.random() * yMax);
	console.log(element)
	element.domElement.css({"left": x + "px", "top": y+"px"});
}

function setRandomDirection(){
	return  Math.floor(Math.random() * 360);
}
