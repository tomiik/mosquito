
function radian(deg){
	return (2*Math.PI) * (deg/360);
}

function degin360(deg){
	while(deg < 0){
		deg += 360;
	}
	return deg % 360;
}

function getDirection(deg){
	var r = radian(deg);
	var result = {"x": 0, "y": 0};

	result["x"] = Math.cos(r);
	result["y"] = Math.sin(r);
	return result;
}

function moveToRandomPosition(element){
	var x = Math.floor(Math.random() * xMax);
	var y = Math.floor(Math.random() * yMax);
	//console.log(element);
	element.domElement.css({"left": x + "px", "top": y+"px"});
}

function setRandomDirection(){
	return  Math.floor(Math.random() * 360);
}

function redrawProgressBar(progress){
  if(progress < 20){
    $("#timebar").removeClass("progress-bar-success");
    $("#timebar").removeClass("progress-bar-warning");
    $("#timebar").addClass("progress-bar-danger");
  } else if(progress < 50){
    $("#timebar").removeClass("progress-bar-success");
    $("#timebar").addClass("progress-bar-warning");
    $("#timebar").removeClass("progress-bar-danger");
  } else{
    $("#timebar").addClass("progress-bar-success");
    $("#timebar").removeClass("progress-bar-warning");
    $("#timebar").removeClass("progress-bar-danger");
  }
  console.log("renewprogress():" + progress)
  $("#timebar").css("width",progress + "%");
  $("#timebar").attr("aria-valuenow", progress);
}
