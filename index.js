// variables
var started = false;
var level = 0;
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var sequencelist = [];
var currentButtonColor = '';
var userSequence = [];
var userChosenColor = '';

// functions
function nextSequence() {
  var num = Math.floor(Math.random() * 4);
  level += 1;
  $('h1').text('level ' + level.toString());
  currentButtonColor = buttonColors[num];
  sequencelist.push(currentButtonColor);
  started = true;
  userSequence.splice(0, userSequence.length);
}

function restart() {
  var audio = new Audio('sounds/wrong.mp3');
  audio.play();
  $('body').addClass('red');

  setTimeout(function(){
    $('body').removeClass('red')},100);
  started = false;
  sequencelist.splice(0,sequencelist.length);
  level = 0;
  $('h1').text('Game over! Press any key to restart');
}

function playButton(color) {
  $('#' + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(color);
  $('#' + color).addClass('pressed');

  setTimeout(function() {
    $('#' + color).removeClass('pressed');
  }, 100);
}

function playsound(color) {
  var audio = new Audio('sounds/' + color + '.mp3')
  audio.play()
}

function checkAnswer(level) {
  var index = level - 1
  if (sequencelist.length === userSequence.length) {
    if (sequencelist.slice(index).toString() === userSequence.slice(index).toString()) {

      return true;
    } else {
      restart();
    }
  } else {

      if (sequencelist.slice(0,userSequence.length).toString() === userSequence.slice(0,userSequence.length).toString()) {
    } else {
      restart();
      return false
    }
  }
}

// event callers

$('body').keypress(function() {
  if (started === false) {
    nextSequence();
    playButton(currentButtonColor);

  }
})

$('.btn').on('click', function() {
  userChosenColor = this.id;
  userSequence.push(userChosenColor);

  playButton(this.id);
  if (checkAnswer(level) === true) {
    setTimeout(function() {
      nextSequence();
      playButton(currentButtonColor);
    }, 1000)
  }
})
