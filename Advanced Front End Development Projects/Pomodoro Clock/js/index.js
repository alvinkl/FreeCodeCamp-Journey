var breakLength = $("#breakLength").text();
var sessionLength = $("#sessionLength").text();

"use strict";
  
var bigTime = (sessionLength * 60) - 1; // time in seconds
var mode = "normal";

var color = "0D5B85";
var percent;

var mins;
var secs;

var countdownID;

// get all the elements
var minutes = document.getElementById("minutes");
var seconds = document.getElementById("seconds");
var message = document.getElementById("message");

// register the buttons
var start = document.getElementById("start");
start.addEventListener("click", startTimer, false);  

var stop = document.getElementById("stop");
stop.addEventListener("click", stopTimer, false);

var reset = document.getElementById("reset");  
reset.addEventListener("click", resetTimer, false);

// COUNTER ========================================================
function counter() {
  
  // calculate the minutes and seconds from bigTime
  mins = Math.floor(bigTime/60);
  secs = bigTime - mins * 60;

  // change the HTML to show new minutes and seconds
  minutes.innerHTML = (mins < 10 ? '0' : '') + mins;
  seconds.innerHTML = (secs < 10 ? '0' : '') + secs;
  
  // handle the animations
    var divisor = 300;
  
    percent = secs / divisor;
    color = shadeColor(color, -percent);
    document.body.style.background = "#" + color;
    divisor - 100;
  
  // switch modes if timer ends
  if (bigTime == 0) {
    
    if (mode == "normal") {
      
      // cooldown is 5min 
      mode = "cooldown";    
      bigTime = (breakLength * 60);
      message.inerHTML = "Break!";
      
    } else if (mode == "cooldown") {
      
      // switch back to normal 25min mode
      mode = "normal";    
      bigTime = (sessionLength * 60) - 1;  
      
      minutes.innerHTML = sessionLength;
      seconds.innerHTML = "00";
      
      document.body.style.background = "#" + color;
      
      // show start button
      start.style.display = "block"; 
      stop.style.display = "none"; 
      reset.style.display = "none"; 
      $(".mod").prop("disabled", false);
      // stop timer
      clearInterval(countdownID);
    }    
     
  } else {
    // decrement
    bigTime = bigTime - 1; 
  }
        
}

// ACTIONS =======================================================

// start timer
function startTimer() {
  // start timer
  countdownID = setInterval("counter()", 1000);
  
  // show message
  message.innerHTML = "Session Started";
  
  // show stop button
  start.style.display = "none"; 
  stop.style.display = "block"; 
  reset.style.display = "none"; 
  $(".mod").prop("disabled", false);
} 

// stop timer
function stopTimer() {
  // change message
  message.innerHTML = "Stopped";
  
  // stop timer
  clearInterval(countdownID);
  
  // show reset button
  start.style.display = "none"; 
  stop.style.display = "none"; 
  reset.style.display = "block"; 
}

// reset timer
function resetTimer() {
  // reset big time
  bigTime = (sessionLength * 60) - 1;
  
  // change message
  message.innerHTML = "keep up the good work";
  
  // show start button
  start.style.display = "block"; 
  stop.style.display = "none"; 
  reset.style.display = "none"; 
}

function shadeColor(color, percent) {   
    var num = parseInt(color,16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    B = (num >> 8 & 0x00FF) + amt,
    G = (num & 0x0000FF) + amt;
    return (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
}

$("#plusB").on("click", function() {
  breakLength++;
  $("#breakLength").text(breakLength);
});

$("#minB").on("click", function() {
  if (breakLength > 1) {
    breakLength--;
    $("#breakLength").text(breakLength);
  }
});

$("#plusS").on("click", function() {
  sessionLength++;
  $("#sessionLength").text(sessionLength);
  $("#minutes").text(sessionLength);
});

$("#minS").on("click", function() {
  if (sessionLength > 1) {
    sessionLength--; 
    $("#sessionLength").text(sessionLength);
    $("#minutes").text(sessionLength);    
  }
});

$(document).ready(function() {
  $(".mod").prop("disabled", true);
})