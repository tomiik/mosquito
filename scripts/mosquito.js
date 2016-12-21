class Mosquito{
	constructor(inputDomElement,num,speed, hp){
		this.domElement=$(inputDomElement);
		console.log(this.domElement)
		moveToRandomPosition(this);
		this.angle= setRandomDirection();
		this.num = num;
		this.speed=speed;
		this.hp=hp;
		this.initialhp = hp;
		this.created();
		this.nextDirection = 0;
		this.dead = false;
		this.move();

		this.position = {"x":0, "y":0};
	}
}

Mosquito.prototype.move = function(){
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

Mosquito.prototype.redraw = function(){
	var temp = this.domElement[0];
	this.domElement.css("transform", "rotate(" + (this.angle) + "deg)");
	$(temp).css("left",this.position.x+'px');
	$(temp).css("top",this.position.y+'px');
}

Mosquito.prototype.refreshParams = function(speed, angle, position){
	this.angle = angle;
	this.speed = speed;
	this.position = position;
}

Mosquito.prototype.getNextSleep = function(){
	return Math.floor(Math.random()*100);;
}

Mosquito.prototype.getNextDirection = function(){
	return (Math.random()  - 0.5) * 4;
}

Mosquito.prototype.iWantStop = function(){
	return Math.random() > 0.8;
}

Mosquito.prototype.stop = function(){
	if (this.setIntervalId){
		clearInterval(this.setIntervalId);
	}
}

Mosquito.prototype.proceed = function(direction,speed){
	this.position.x += speed * direction.x;
	this.position.y += speed * direction.y;
	this.borderCheck();
}

Mosquito.prototype.borderCheck = function(){
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

Mosquito.prototype.created = function(){
	this.domElement.addClass("exist")

}

Mosquito.prototype.crash = function(damage){
	//this.hp -= damage;
	this.hp -= 1;

	if(this.hp <= 0){
		this.domElement.addClass("dead")
		this.dead = true;
		//var score = this.speed * this.initialhp * 100;
		var score = 1
		this.stop();
		return score;
	}

	return 0;
}

Mosquito.prototype.getPosition = function(){
	var position = {"x": 0, "y": 0};

	//var temp = this.domElement.parent();
	var temp = this.domElement[0];
	//console.log(temp)

	var x = parseInt($(temp).css("left"));
	var y = parseInt($(temp).css("top"));
	position.x = x;
	position.y = y;
	return position;
}

Mosquito.prototype.reset = function(){
	this.stop();
  this.domElement.removeClass("dead");
  this.domElement.removeClass("exist");
}

Mosquito.prototype.remove = function(){
  this.domElement.remove();
}
