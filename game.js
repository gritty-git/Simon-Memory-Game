var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var go = 0;
var gamePattern = [];
var userClickedPattern = [];

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").html("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var ranButtom = $("#" + randomChosenColour);
  $(ranButtom).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
$(".btn").click(function() {
  var userChosenColour = $(this).attr('id');
  //console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});

function playSound(name) {
  var audio = new Audio("sounds\\" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
$(document).keydown(function() {
  if (level == 0) {


    $("h1").html("Level 0");
    nextSequence();
  }
});
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      //console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    }else{
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      var failure = new Audio("sounds\\wrong.mp3");
      failure.play();
      $("h1").html("Game Over, Press Any Key to Restart");
      startOver();
    }

}
function startOver(){
  level = 0;
  gamePattern = [];

}
