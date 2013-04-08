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



$(document).ready(function() {
  MyGame.start_race();

  $(document).on('keyup', function(event) {
    var key = event.which
    if (key == 16) {  
      MyGame.update_player_position(1);
    } else if (key == 13) {
      MyGame.update_player_position(2);
    };
  });

  $('#restart').on('click', function() {
    MyGame.start_race();
    $('.race_track h2').html(" ");
  });
});
