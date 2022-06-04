$(document).ready(function(){
  var canvas = document.getElementById("game");
  var ctx = canvas.getContext("2d");

  // draw a circle
  ctx.fillStyle = "GOLD";
  ctx.beginPath();
  ctx.arc(100, 100, 50 , 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();

});