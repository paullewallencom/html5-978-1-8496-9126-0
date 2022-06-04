(function($){
  var audiogame = {
    // game init method
    initGame: function() {
      this.initMedia();
      this.handlePlayButton();
    },
    // init medias
    initMedia: function() {
      // get the references of the audio element.
      this.buttonOverSound = document.getElementById("buttonover");
      this.buttonOverSound.volume = .3;
      this.buttonActiveSound = document.getElementById("buttonactive");
      this.buttonActiveSound.volume = .3;

    },

    handlePlayButton: function() {
      var game = this;

      // listen the button event that links to #game
      $("a[href='#game']")
      .hover(function(){
        game.buttonOverSound.currentTime = 0;
        game.buttonOverSound.play();
      },function(){
        game.buttonOverSound.pause();
      })
      .click(function(){
        game.buttonActiveSound.currentTime = 0;
        game.buttonActiveSound.play();

        return false;
      });

    }

  };

  // init function when the DOM is ready
  $(function(){
    audiogame.initGame();
  });
})(jQuery);
