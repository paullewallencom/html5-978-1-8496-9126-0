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
    playground: {
      offsetTop: $("#playground").offset().top,
    },
  };

  // winning logic
  function playerAWin() {
    // reset the ball;
    pingpong.ball.x = 250;
    pingpong.ball.y = 100;

    // update the ball location variables;
    pingpong.ball.directionX = -1;
  }
  function playerBWin() {
    // reset the ball;
    pingpong.ball.x = 150;
    pingpong.ball.y = 100;

    pingpong.ball.directionX = 1;
  }

  // view rendering
  function renderPaddles() {
    $("#paddleB").css("top", pingpong.paddleB.y);
    $("#paddleA").css("top", pingpong.paddleA.y);
  }

  // view inputs
  function handleMouseInputs() {
    // run the game when mouse moves in the playground.
    $('#playground').mouseenter(function(){
      pingpong.isPaused = false;
    });

    // pause the game when mouse moves out the playground.
    $('#playground').mouseleave(function(){
      pingpong.isPaused = true;
    });

    // calculate the paddle position by using the mouse position.
    $('#playground').mousemove(function(e){
      pingpong.paddleB.y = e.pageY - pingpong.playground.offsetTop;
    });
  }

  // browser render loop
  function render() {
    renderPaddles();

    window.requestAnimationFrame(render);
  }

  // starting point of entire game
  function init() {
    // view rendering
    window.requestAnimationFrame(render);

    // inputs
    handleMouseInputs();
  }

  // Execute the starting point
  init();

})(jQuery);
