if (untangleGame === undefined) {
  var untangleGame = {};
}

// Entry point
$(document).ready(function(){
  var canvas = document.getElementById("game");
  untangleGame.ctx = canvas.getContext("2d");

  var width = canvas.width;
  var height = canvas.height;

  untangleGame.createRandomCircles(width, height);

});
