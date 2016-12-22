function generateStage(n){

  var num = (Math.floor(n % 4) + 1) * 4;
  var speed = Math.floor((n / 5)) * 0.2 + 0.5;
  var time = 10;
  var message = "stage " + n;
  return [[num, speed],time,message];
}
