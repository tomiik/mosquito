'use strict';

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
