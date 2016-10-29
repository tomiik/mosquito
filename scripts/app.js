'use strict';

$(document).ready(function(){
	var manager = new GameManager();

	$(window).mousemove( function(e) {
		var offset = $("#playArea").position();
		var offsetX = offset["left"];
		var offsetY = offset["top"];
		//console.log(offsetX)
		var x = e.clientX -offsetX- handSize + "px";
		var y = e.clientY - offsetY - handSize + "px";
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
