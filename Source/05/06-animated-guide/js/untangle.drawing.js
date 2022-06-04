if (untangleGame === undefined) {
  var untangleGame = {};
}

untangleGame.thinLineThickness = 1;
untangleGame.boldLineThickness = 5;
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
  // setup all lines based on the circles relationship
  var level = untangleGame.levels[untangleGame.currentLevel];
  untangleGame.lines.length = 0;
  for (var i in level.relationship) {
    var connectedPoints = level.relationship[i].connectedPoints;
    var startPoint = untangleGame.circles[i];
    for (var j in connectedPoints) {
      var endPoint = untangleGame.circles[connectedPoints[j]];
      untangleGame.lines.push(new untangleGame.Line(startPoint, endPoint, untangleGame.thinLineThickness));
    }
  }
};

untangleGame.drawAllLines = function(){
  // draw all remembered line
  for(var i=0;i<untangleGame.lines.length;i++) {
    var line = untangleGame.lines[i];
    var startPoint = line.startPoint;
    var endPoint = line.endPoint;
    var thickness = line.thickness;
    untangleGame.drawLine(startPoint.x, startPoint.y, endPoint.x,
    endPoint.y, thickness);
  }
};

untangleGame.drawAllCircles = function() {
  // draw all remembered circles
  for(var i=0;i<untangleGame.circles.length;i++) {
    var circle = untangleGame.circles[i];
    untangleGame.drawCircle(circle.x, circle.y, circle.radius);
  }
};

untangleGame.clear = function() {
  var ctx = untangleGame.ctx;
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
};

// draw the level progress text
untangleGame.drawLevelProgress = function() {
  var ctx = untangleGame.ctx;
  ctx.font = "26px 'Rock Salt'";
  ctx.fillStyle = "WHITE";
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  ctx.fillText("Puzzle "+untangleGame.currentLevel+", Completeness: " + untangleGame.levelProgress + "%", 60, ctx.canvas.height-60);
};

untangleGame.drawBackground = function() {
  // draw the image background
  untangleGame.ctx.drawImage(untangleGame.background, 0, 0);
};

untangleGame.loadImages = function() {
  // load the background image
  untangleGame.background = new Image();

  untangleGame.background.onerror = function() {
    console.log("Error loading the image.");
  }
  untangleGame.background.src = "images/board.png";

  // load the guide sprite image
  untangleGame.guide = new Image();
  untangleGame.guide.onload = function() {
    // setup timer to switch the display frame of the guide sprite
    untangleGame.guideFrame = 0;
    setInterval(untangleGame.guideNextFrame, 500);
  }
  untangleGame.guide.src = "images/guide_sprite.png";
};

untangleGame.guideNextFrame = function() {
  untangleGame.guideFrame += 1;
  // there are only 6 frames (0-5) in the guide animation.
  // we loop back the frame number to frame 0 after frame 5.
  if (untangleGame.guideFrame > 5)  {
    untangleGame.guideFrame = 0;
  }
};

untangleGame.drawGuide = function() {
  var ctx = untangleGame.ctx;
  // draw the guide animation
  if (untangleGame.currentLevel === 0) {
    // the dimension of each frame is 80x130.
    var nextFrameX = untangleGame.guideFrame * 80;
    ctx.drawImage(untangleGame.guide, nextFrameX, 0, 80, 130, 325,
    130, 80, 130);
  }
};



