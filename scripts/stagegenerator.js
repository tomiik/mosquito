function generateStage(n){

//  var num = (Math.floor((n-1) % 3) + 1)*2;
  var num = (Math.floor((n-1) % 10) + 1)*2;
  var speed = Math.floor((n / 10))*0.2 + 0.5;
  var time = 10;
  var message = "stage " + n;
  return [[num, speed],time,message];
}
