if (untangleGame === undefined) {
  var untangleGame = {};
}

untangleGame.drawCircle = function(x, y, radius) {
  var ctx = untangleGame.ctx;
  ctx.fillStyle = "GOLD";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
};
