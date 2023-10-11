$('.restart-btn').hide();
var buttonColors = ['blue', 'green', 'red', 'yellow'];

var gamePattern = [];
var userClickedPattern = [];

var level = gamePattern.length;

function επανεκκίνηση () {
  $('.restart-btn').addClass('pressed');
  gamePattern = [];
  userClickedPattern = [];
  level = gamePattern.length;

  setTimeout(function () {
    $('.restart-btn').removeClass('pressed');
    $('#level-title').text('Πατήστε το διάστημα για έναρξη');
  }, 250)

  setTimeout(function () {
    $('.restart-btn').hide();
  }, 350);
}

function αναλαμπήΠλήκτρου(πλήκτρο) {
  $('#' + πλήκτρο)
    .fadeOut(150)
    .fadeIn(150);
}

function αναπαραγωγήΉχου(πλήκτρο) {
  var ήχος = new Audio('sounds/' + πλήκτρο + '.mp3');
  ήχος.play();
}

function nextSequence() {
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);

  var randomColor = buttonColors[randomNumber];

  $('#level-title').text('Επίπεδο: ' + level);
  $('#' + randomColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  gamePattern.push(randomColor);
  αναπαραγωγήΉχου(randomColor);
  level++;
  return;
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      $('#level-title').text('Σωστό!');

      setTimeout(function () {
        $('#level-title').text('Επίπεδο: ' + level);
      }, 800);

      setTimeout(function () {
        nextSequence();
      }, 500);
    }
  } else {
    $('#level-title').text('Λάθος!');
    αναπαραγωγήΉχου('wrong');
    $('body').addClass('game-over');

    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 800);

    setTimeout(function () {
      $('#orange').show();
      $('#level-title').text('Τέλος Παιγνιδιού!');
    }, 2000);
  }
}

$('.btn').click(function () {
  var userChosenColor = $(this).attr('id');
  αναλαμπήΠλήκτρου(userChosenColor);
  αναπαραγωγήΉχου(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

$('.restart-btn').click(επανεκκίνηση);

$(document).keypress(function () {
  if (level === 0) {
    nextSequence();
  }
});
