var MyGame = {};

MyGame.update_player_position = function(playerNumber) {
  if (this.game_over) return;

  var classname = '.player'+playerNumber;
  var current_pos = this['current_pos_'+playerNumber];
  current_pos++;
  this['current_pos_'+playerNumber] = current_pos;
  $(classname + ' li').removeClass('active');
  var select = classname+' li:nth-child('+current_pos+')';

  $(select).addClass('active');

  if (current_pos >= this.track_size){
    this.game_over = true;
    $('.race_track').append("<h2>Player "+playerNumber+" Wins!</h2>");
    $('#restart').show();
    // alert('player '+playerNumber+' WINS!');
  };
}

MyGame.start_race = function() {
  this.game_over = false;
  this.current_pos_1 = 1;
  this.current_pos_2 = 1;
  this.track_size = $("li").length / 2;
  console.log(this['track_size'])
  $('.race_track li').removeClass('active');
  $('.race_track li:nth-child(1)').addClass('active');
}

jQuery.prototype.jsRacer = function(opts) {
  opts = opts || {};
  var trackLength = opts.trackLength || 10;
  var players     = 2;
  var keys        = [16, 13];

  

  // MODEL!
  var keyMap          = {16: 0, 13: 1};
  var positions       = {0: 0, 1: 0};
  var winner          = null;

  
  // VIEW!
  var view = this;
  view.paint = function(){
    for(var i = 0; i < players; i++){
      this.append($('<ul>'));
      for(var j = 0; j < trackLength; j++){
        this.children().last().append($('<li>'));
      }
    }
  }

  view.updatePosition = function(){
    this.find('li').removeClass('active');
    for(var i = 0; i < players; i ++){
      console.log(i, positions[i])
      this.children().eq(i).children().eq([positions[i]]).addClass('active');
    }
  }

  //CONTROLLER!
  view.paint();
  view.updatePosition();
  
  $(document).on('keyup', function(event) {
    var key = event.which;
    var player = keyMap[key];
    positions[player] += 1;

    if (positions[player] >= trackLength) {
      winner = player;
      // stop the game somehow and eat juice
    }

    view.updatePosition();

  });

  this.reset = function(){
    positions = 0;
    winner = null;
  }


  return this;
}



$(document).ready(function() {
  var foo = $('.race-track').jsRacer({
    trackLength: 20
  });

  // $(document).on('keyup', function(event) {
  //   var key = event.which
  //   if (key == 16) {  
  //     MyGame.update_player_position(1);
  //   } else if (key == 13) {
  //     MyGame.update_player_position(2);
  //   };
  // });

  // $('#restart').on('click', function() {
  //   MyGame.start_race();
  //   $('.race_track h2').html(" ");
  // });
});
