'use strict';

$(document).ready(function(){
	var manager = new GameManager();
	playBgm();


	document.body.addEventListener( "touchstart", function( e ) {
		// タッチの情報を含むオブジェクト
		var touchObj = e.changedTouches[0] ;

		// タッチ位置を取得する
		var touchX = touchObj.pageX ;	// X座標
		var touchY = touchObj.pageY ;	// Y座標
		console.log(touchX, touchY)
		var clickPos = {"x": touchX, "y": touchY};
		manager.tap(clickPos);
	} ) ;

	document.body.addEventListener('touchend', event => {
  event.preventDefault();
}, false);

	$(window).mousemove( function(e) {
		var offset = $("#playArea").position();
		var offsetX = offset["left"];
		var offsetY = offset["top"];
		//console.log(offsetX)
		var x = e.clientX - offsetX - handSize/2;
		var y = e.clientY - offsetY - handSize/2;
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
		$("#hand").css({"visibility": visible});
		$("#hand").css({"left": x, "top":y});
	});

	$(window).mousedown( function(e){
	//	position = getPosition($("#car"));
	console.log(e)
		var clickPos={"x": e.clientX, "y": e.clientY};
		console.log(clickPos)
		manager.click(clickPos);
	});

});
