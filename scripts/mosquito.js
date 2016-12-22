class Mosquito{
	constructor(inputDomElement,num,speed){
		this.domElement=$(inputDomElement);
		this.size = 10
		this.setSize(this.size);
		this.position = Util.getRandomPosition();
		this.angle = Util.getRandomDirection();
		this.num = num;
		this.speed=speed;
		this.created();
		this.nextDirection = 0;
		this.dead = false;
		this.move();
	}
}
Mosquito.prototype.setSize = function(size){
	$(this.domElement[0]).css("width",size+'px');
	$(this.domElement[0]).css("height",size+'px');
}

Mosquito.prototype.move = function(){
	this.setIntervalId=setInterval(moveMosquito,1)
	const stopDulation = 100;
	var domElement = this.domElement;
	var me = this;
	var timer = 30;
	var nextDirection = 0;
	var stop = false;
	var stopcount = stopDulation;
	var direction = {"x": 0, "y":0};
	var position = this.position;
	var speed = this.speed;
	var angle = this.angle;

	function moveMosquito(){
		//angle calc
		angle += nextDirection;
		angle = Util.degin360(angle);

		if(stop == false){
			//calc direction
			direction = Util.getDirection(angle);

			//proceed
			this.position = me.proceed(direction, speed, position);
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
			View.redrawMosquito(me);
		}
		if(timer < 0){
			timer = me.getNextSleep();
			nextDirection = me.getNextDirection();
			stop = me.iWantToStop();
		}
		timer--;
	}
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

Mosquito.prototype.iWantToStop = function(){
	return Math.random() > 0.8;
}

Mosquito.prototype.stop = function(){
	if (this.setIntervalId){
		clearInterval(this.setIntervalId);
	}
}

Mosquito.prototype.proceed = function(direction,speed, position){
	position.x += speed * direction.x;
	position.y += speed * direction.y;
	position = this.borderCheck(position);
	return position;
}

Mosquito.prototype.borderCheck = function(position){
	if(position.x >= xMax - this.size){
		//				carDirection += 180
		position.x = xMin;
	} else if(position.x <= xMin){
		position.x = xMax - this.size;
	}

	if(position.y >= yMax - this.size){
		position.y = yMin;
	} else if(position.y <= yMin){
		position.y += yMax - this.size;
	}
	return position;
}

Mosquito.prototype.created = function(){
	this.domElement.addClass("exist")

}

Mosquito.prototype.crash = function(){
	if(this.dead != true){
		this.dead = true;
		this.domElement.addClass("dead")
		this.stop();
		return true;
	}
	return false;
}

Mosquito.prototype.reset = function(){
	this.stop();
  this.domElement.removeClass("dead");
  this.domElement.removeClass("exist");
}

Mosquito.prototype.remove = function(){
  this.domElement.remove();
}

Mosquito.prototype.getCenterPosition = function(){
	var x = this.position.x;
	var y = this.position.y;
	x += this.size/2;
	y += this.size/2;
  return {"x": x, "y":y}
}
