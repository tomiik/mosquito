function generateStage(n){

  var num = (Math.floor((n-1) % 3) + 1)*2;
  var speed = ((n / 6)) + 0.5;
  var time = 10;
  var message = "stage " + n;
  return [[num, speed],time,message];
}
