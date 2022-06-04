(function($){

  var matchingGame = {};
  matchingGame.deck = [
    'cardAK', 'cardAK',
    'cardAQ', 'cardAQ',
    'cardAJ', 'cardAJ',
    'cardBK', 'cardBK',
    'cardBQ', 'cardBQ',
    'cardBJ', 'cardBJ',
  ];

  function shuffle() {
    return 0.5 - Math.random();
  }

  function selectCard() {
    // we do nothing if there are already two card flipped.
    if ($(".card-flipped").size() > 1) {
      return;
    }
    $(this).addClass("card-flipped");
    // check the pattern of both flipped card 0.7s later.
    if ($(".card-flipped").size() === 2) {
      setTimeout(checkPattern, 700);
    }
  }

  function checkPattern() {
    if (isMatchPattern()) {
      $(".card-flipped").removeClass("card-flipped").addClass
       ("card-removed");
      $(".card-removed").bind("transitionend",
       removeTookCards);
    } else {
      $(".card-flipped").removeClass("card-flipped");
    }
  }

  function isMatchPattern() {
    var cards = $(".card-flipped");
    var pattern = $(cards[0]).data("pattern");
    var anotherPattern = $(cards[1]).data("pattern");
    return (pattern === anotherPattern);
  }

  function removeTookCards() {
    $(".card-removed").remove();
    // check if all cards are removed and show game over
    if ($(".card").length === 0) {
      gameover();
    }
  }

  function gameover() {
    // stop the timer
    clearInterval(matchingGame.timer);

    // display the elapsed time in the game over popup
    $(".score").html($("#elapsed-time"));

    // load the saved last score and save time from local storage
    var lastScore = localStorage.getItem("last-score");

    // check if there is no any saved record
    lastScoreObj = JSON.parse(lastScore);
    if (lastScoreObj === null) {
      // create an empty record if there is no any saved record
      lastScoreObj = {"savedTime": "no record", "score": 0};
    }
    var lastElapsedTime = lastScoreObj.score;

    // convert the elapsed seconds into minute:second format
    // calculate the minutes and seconds from elapsed time
    var minute = Math.floor(lastElapsedTime / 60);
    var second = lastElapsedTime % 60;

    // add padding 0 if minute and second is less then 10
    if (minute < 10) minute = "0" + minute;
    if (second < 10) second = "0" + second;

    // display the last elapsed time in game over popup
    $(".last-score").html(minute+":"+second);

    // display the saved time of last score
    var savedTime = lastScoreObj.savedTime;
    $(".saved-time").html(savedTime);

    // get the current datetime
    var currentTime = new Date();

    // convert the date time into string.
    var now = currentTime.toLocaleString();

    //construct the object of datetime and game score
    var obj = { "savedTime": now, "score":
      matchingGame.elapsedTime};

    // save the score into local storage
    localStorage.setItem("last-score", JSON.stringify(obj));

    // show the game over popup
    $("#popup").removeClass("hide");
  }

  function countTimer() {
    matchingGame.elapsedTime++;

    // calculate the minutes and seconds from elapsed time
    var minute = Math.floor(matchingGame.elapsedTime / 60);
    var second = matchingGame.elapsedTime % 60;

    // add padding 0 if minute and second is less then 10
    if (minute < 10) minute = "0" + minute;
    if (second < 10) second = "0" + second;

    // display the elapsed time
    $("#elapsed-time").html(minute+":"+second);
  }


  $(document).ready(function(){

    // reset the elapsed time to 0.
    matchingGame.elapsedTime = 0;

    // start the timer
    matchingGame.timer = setInterval(countTimer, 1000);


    matchingGame.deck.sort(shuffle);

    for(var i=0;i<11;i++){
      $(".card:first-child").clone().appendTo("#cards");
    }

    $("#cards").children().each(function(index) {
      var x = ($(this).width()  + 20) * (index % 4);
      var y = ($(this).height() + 20) * Math.floor(index / 4);
      $(this).css("transform", "translateX(" + x + "px) translateY(" + y + "px)");

      // get a pattern from the shuffled deck
      var pattern = matchingGame.deck.pop();

      // visually apply the pattern on the card's back side.
      $(this).find(".back").addClass(pattern);

      // embed the pattern data into the DOM element.
      $(this).attr("data-pattern",pattern);

      // listen the click event on each card DIV element.
      $(this).click(selectCard);
    });

  });
})(jQuery);
