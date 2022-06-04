if (untangleGame === undefined) {
  var untangleGame = {};
}

untangleGame.createRandomCircles = function(width, height) {
  // randomly draw 5 circles
  var circlesCount = 5;
  var circleRadius = 10;
  for (var i=0;i<circlesCount;i++) {
    var x = Math.random()*width;
    var y = Math.random()*height;
    untangleGame.drawCircle(x, y, circleRadius);
  }
};
