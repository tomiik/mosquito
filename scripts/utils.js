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
	}




}
