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
  }




  $(function(){
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