(function($){
  $(function(){
    // clone 12 copies of the card
    for(var i=0; i<11; i++){
      $(".card:first-child").clone().appendTo("#cards");
    }
    // initialize each card's position
    $("#cards").children().each(function(index) {
      // align the cards to be 4x3 ourselves.
      var x = ($(this).width()  + 20) * (index % 4);
      var y = ($(this).height() + 20) * Math.floor(index / 4);
      $(this).css("-webkit-transform", "translateX(" + x + "px) translateY(" + y + "px)");
    });
  });
})(jQuery);