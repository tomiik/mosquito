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
  }
}
