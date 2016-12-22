var Util = {
	degToRadian: function(deg){
		return (2*Math.PI) * (deg/360);
	},

	degin360: function(deg){
		while(deg < 0){
			deg += 360;
		}
		return deg % 360;
	},

	getDirection: function(deg){
		var r = this.degToRadian(deg);
		var result = {"x": 0, "y": 0};

		result["x"] = Math.cos(r);
		result["y"] = Math.sin(r);
		return result;
	},

	getRandomPosition: function(){
		var x = Math.floor(Math.random() * xMax);
		var y = Math.floor(Math.random() * yMax);
		return {"x": x, "y":y};
	},
	getRandomDirection: function(){
		return  Math.floor(Math.random() * 360);
	},
	moveHand: function(pos, type){
		var offset = $("#playArea").position();
		var offsetX = offset["left"];
		var offsetY = offset["top"];
		//console.log(offsetX)
		//console.log(x);
		var x = pos.x - offsetX - handSize/2;
		var y = pos.y - offsetY - handSize/2;
		if(type === "mouse"){
			if(x < 0){
				x = 0;
			}
			if(y < 0){
				y = 0;
			}
			if(x > xMax - handSize +1 ){
				x = xMax - handSize + 1;
			}
			if(y > yMax - handSize + 1){
				y = yMax - handSize + 1;
			}
		}else{
			//x -= handSize/2
			//y -= handSize/2
		}
		x = x+"px";
		y = y+"px";
		$("#hand").css({"visibility": "visible"});
		$("#hand").css({"left": x, "top":y});
	}

}
