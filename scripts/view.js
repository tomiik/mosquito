var View = {
  refreshNumOfMosquitoes: function(number){
    $("#num_of_mosquitoes").text(number);
  },
  refreshScore: function(number){
    $("#score").text(number);
  },
  setMessage: function(str,time){
    $("#message").text(str);
    View.messageFadeIn();
    setTimeout(function(){
      //console.log("fadeout")
      View.messageFadeOut();
    },time)

  },
  messageFadeIn: function(){
    $("#message").removeClass("bounceOutDown");
    $("#message").addClass("bounceInDown");
  },
  messageFadeOut: function(){
    $("#message").removeClass("bounceInDown");
    $("#message").addClass("bounceOutDown");
  },
	redrawProgressBar: function(progress){
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
	  //console.log("renewprogress():" + progress)
	  $("#timebar").css("width",progress + "%");
	  $("#timebar").attr("aria-valuenow", progress);
	},
  redrawMosquito: function(element){
    var mosquito = element.domElement[0]
    $(mosquito).css("transform", "rotate(" + (element.angle) + "deg)");
    $(mosquito).css("left",element.position.x+'px');
  	$(mosquito).css("top",element.position.y+'px');
  }
}
