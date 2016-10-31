
var sfxHitObj = new Audio("sounds/hit.wav");
var sfxDieObj = new Audio("sounds/die.wav");
var sfxMissObj = new Audio("sounds/miss.wav");
var cymbalObj = new Audio("sounds/cymbal.wav");
var cowbellObj = new Audio("sounds/cowbell.wav");
var bgm = new Audio("sounds/melodyloops-adrenaline.mp3");
function SfxHit(){
  console.log("sfxhit")
  sfxHitObj.play();
}
function SfxDie(){
  console.log("sfxdie")
  sfxDieObj.play();
}
function SfxMiss(){
  console.log("sfxmiss")
  sfxMissObj.play();
}
function playBgm(){
  bgm.loop = true;
  bgm.volume = 0.4;
  bgm.play();
}
function sfxStageStart(){
  cymbalObj.play();
}
function sfxCowbell(){
  cowbellObj.play();
}
