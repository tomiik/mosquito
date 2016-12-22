function generateStage(n){

  var num = (Math.floor(n % 4) + 1) * 3;
  var speed = Math.floor((n / 5)) * 0.2 + 0.2;
  var time = 10 + Math.floor((n/3));
  var message = "stage " + n;
  return [[num, speed],time,message];
}
