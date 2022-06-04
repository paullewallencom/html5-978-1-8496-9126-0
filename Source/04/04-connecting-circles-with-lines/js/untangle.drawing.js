if (untangleGame === undefined) {
  var untangleGame = {};
}

untangleGame.thinLineThickness = 1;
untangleGame.lines = [];

untangleGame.drawCircle = function(x, y, radius) {
  var ctx = untangleGame.ctx;
  ctx.fillStyle = "GOLD";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
};

untangleGame.drawLine = function(x1, y1, x2, y2, thickness) {
  var ctx = untangleGame.ctx;
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.lineWidth = thickness;
  ctx.strokeStyle = "#cfc";
  ctx.stroke();
};

untangleGame.connectCircles = function() {
  // connect the circles to each other with lines
  untangleGame.lines.length = 0;
  for (var i=0;i< untangleGame.circles.length;i++) {
    var startPoint = untangleGame.circles[i];
    for(var j=0;j<i;j++) {
      var endPoint = untangleGame.circles[j];
      untangleGame.drawLine(startPoint.x, startPoint.y, endPoint.x,
      endPoint.y, 1);
      untangleGame.lines.push(new untangleGame.Line(startPoint, endPoint,
      untangleGame.thinLineThickness));
    }
  }
};
