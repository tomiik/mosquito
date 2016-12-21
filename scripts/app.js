'use strict';

$(document).ready(function(){
	var manager = new GameManager();
	playBgm();

	$(window).mousemove( function(e) {
		var offset = $("#playArea").position();
		var offsetX = offset["left"];
		var offsetY = offset["top"];
		//console.log(offsetX)
		var x = e.clientX -offsetX- handSize;
		var y = e.clientY - offsetY - handSize;
		//console.log(x);

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
		x = x+"px";
		y = y+"px";
		$("#hand").css({"left": x, "top":y});
	});

	$(window).mousedown( function(e){
	//	position = getPosition($("#car"));
		manager.click(e);
	});
});
