'use strict';

$(document).ready(function(){
	var manager = new GameManager();
	playBgm();


	document.body.addEventListener( "touchstart", function( e ) {
		var touchObj = e.changedTouches[0] ;

		var touchX = touchObj.pageX ;
		var touchY = touchObj.pageY ;
		var clickPos = {"x": touchX, "y": touchY};
		manager.tap(clickPos);
		Util.moveHand(clickPos,"tap");
	} ) ;

	document.body.addEventListener('touchend', event => {
  event.preventDefault();
}, false);

	$(window).mousemove( function(e) {
		var pos = {"x": e.clientX, "y": e.clientY};
		Util.moveHand(pos,"mouse");
	});



	$(window).mousedown( function(e){
	//	position = getPosition($("#car"));
	console.log(e)
		var clickPos={"x": e.clientX, "y": e.clientY};
		console.log(clickPos)
		manager.click(clickPos);
	});

});
