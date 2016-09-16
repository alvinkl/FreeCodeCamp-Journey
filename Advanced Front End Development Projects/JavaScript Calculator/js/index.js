var result = 0;
var temp = 0;
var display = "";
var lastClicked;
var counter = 0;

$(".number").click(function() {
  var num = this.id;
  display += num;
  $(".display").text(display);
  if (lastClicked === "eq") {
    temp = 0;
    result = 0;
    counter = 0;
  }
});  

$("#ac").click(function() {
  result = 0;
  temp = 0;
  counter = 0;
  display = "";
  $(".display").text(display);
  lastClicked = undefined;
});

$("#ce").click(function() {
  display = "";
  $(".display").text("");
});

$("#add").click(function() {
  if (lastClicked === "eq") display += 0;
  if (display.length > 0) {
    temp = parseFloat(display);
    display = "";    

    result += temp;
    temp = 0;

    lastClicked = this.id;
    counter ++;
  }
});

$("#sub").click(function() {
   if (lastClicked === "eq") display += 0;
   if (display.length > 0) {
    temp = parseFloat(display);
    display = "";    
     
    if (counter === 0) result += temp;
    else result -= temp;
    temp = 0;

    lastClicked = this.id;
     counter ++
  }
});


$("#divide").click(function() {
   if (lastClicked === "eq") { display += 0; counter = 0; }
   if (display.length > 0) {
    temp = parseFloat(display);
    display = "";    
    
    if (counter === 0) result += temp;
    else result /= temp;
    temp = 0;

    lastClicked = this.id;
    counter++;
  }
});


$("#time").click(function() {
   if (lastClicked === "eq") { display += 0; counter = 0; }
   if (display.length > 0) {
    temp = parseFloat(display);
    display = "";    
    
    if (counter === 0) result += temp;
    else result *= temp;
    temp = 0;

    lastClicked = this.id;
    counter++;
  }
});

$("#eq").click(function() {
  temp = parseFloat(display);
  if (temp !== NaN) {
    switch (lastClicked) {
      case "add": result += temp; break;
      case "sub": result -= temp; break;
      case "divide": result /= temp; break;
      case "time": result *= temp; break;
      default: display = ""; break;
    }
  }
  display = result.toFixed(2);
  lastClicked = this.id;
      
  $(".display").text(display);
  display = "";
});