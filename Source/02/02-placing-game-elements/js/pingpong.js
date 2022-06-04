(function($){

  // data definition
  var pingpong = {
    paddleA: {
      x: 50,
      y: 100,
      width: 20,
      height: 70
    },
    paddleB: {
      x: 320,
      y: 100,
      width: 20,
      height: 70
    },
  };

  // view rendering
  function renderPaddles() {
    $("#paddleB").css("top", pingpong.paddleB.y);
    $("#paddleA").css("top", pingpong.paddleA.y);
  }

  renderPaddles();

})(jQuery);
