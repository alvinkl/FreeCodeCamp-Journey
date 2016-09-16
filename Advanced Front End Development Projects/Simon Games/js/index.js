var strict = false;

$("#strict-on").click(function() {
  alert("Strict Mode: ON");
  strict = true;
})

$("#strict-off").click(function() {
  alert("Strict Mode: OFF");
  strict = false;
})

$("#reset").click(function() {
  stop("RESET!");
});

var computerBtn = [];
var userBtn = []
var level = 1;
var count = level;
var userInteract = true;
var gameStart = false;
var aiCurr = 0;
var play;
var flag = 0;
var speed = 2000;

function init() {
  userInteract = false;
  gameStart = true;
  play = true;
  level = 1;
  computerBtn = [];
  
  update();
}

function update() {
  if (level > 20) {
    stop("You Won!");
  } 
  $("#level").text(level);
  aiCurr = 0;
  if (!userInteract && gameStart) {
    if (play) getAiMove();
    if (level === 6) speed -= 500;
    if (level === 13) speed -= 500;
    var aiPlay = setInterval(function() {
      if (aiCurr < computerBtn.length) {
        pressBtn(computerBtn[aiCurr]);
        aiCurr++;
      }
      else clearInterval(aiPlay);
    }, speed);
  }
  userInteract = true;
}

function playAudio(id) {
  var audio = document.getElementById("sound-" + id);
  audio.play();
}

function pressBtn(id) {
  var div = $("#btn-" + id);
  div.animate({opacity: '0.5'}, "fast");
  div.animate({opacity: '1'}, "fast");
  playAudio(id);
}

$(".bt").click(function(e) {
  var id = e.currentTarget.id.charAt(4);
  pressBtn(id);
  
  if (userInteract && gameStart) {
    userBtn.push(parseInt(id));
    var length = userBtn.length - 1;

    if (userBtn[length] !== computerBtn[length]) {
      if (strict) {
        stop("You Lose!");
        return;
      }
      else {
        userInteract = false;
        play = false;
        userBtn = [];
        update();
      }
    }
    if (userBtn.length === computerBtn.length) {
      level++;
      play = true;
      userBtn = [];
      userInteract = false;
      update();
    } 
  }
})

$("#start").click(function() {
  gameStart = true;

  init();
});

function getAiMove() {
  var tap = Math.floor(Math.random() * 4);
  computerBtn.push(tap);
}

function stop(msg) {
  gameStart = false;
  $("#level").text(msg);
  level = 1;
  computerBtn = [];
  userBtn = [];
  play = false;
}