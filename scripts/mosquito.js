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
		this.stop();
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
