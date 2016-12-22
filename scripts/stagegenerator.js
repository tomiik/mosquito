function generateStage(n){

  var num = (Math.floor((n-1) % 3) + 1);
  var speed = Math.floor((n / 3)) * 0.2 + 0.2;
  var time = 10;
  var message = "stage " + n;
  return [[num, speed],time,message];
}
