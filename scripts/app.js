'use strict';

$(document).ready(function(){
	var manager = new GameManager();
	playBgm();

	function preventScroll(event) {

	  // li要素だけは、タップイベントに反応したいので、抑止しない。
	  if (event.touches[0].target.tagName.toLowerCase() == "li") {return;}

	  // preventDefaultでブラウザ標準動作を抑止する。
	  event.preventDefault();
	}

	// タッチイベントの初期化
	document.addEventListener("touchstart", preventScroll, false);
	document.addEventListener("touchmove", preventScroll, false);
	document.addEventListener("touchend", preventScroll, false);
	// ジェスチャーイベントの初期化
	document.addEventListener("gesturestart", preventScroll, false);
	document.addEventListener("gesturechange", preventScroll, false);
	document.addEventListener("gestureend", preventScroll, false);

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
