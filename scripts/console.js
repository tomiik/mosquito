function consoleClear(){
  $("console-line1").text("");
  $("console-line2").text("");
  $("console-line3").text("");
  $("console-line4").text("");
}

function consoleWrite(str){
  console.log("consoleWrite():" + str);
  $("#console-line4").text($("#console-line3").text());
  $("#console-line3").text($("#console-line2").text());
  $("#console-line2").text($("#console-line1").text());
  $("#console-line1").text("> " + str);
}
