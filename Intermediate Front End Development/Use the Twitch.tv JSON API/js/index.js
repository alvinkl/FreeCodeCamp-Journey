var url = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

var html = "";

$.each(url, function(i, url) {
    $.getJSON('https://api.twitch.tv/kraken/streams/' + url + '?callback=?', insertToHtml);
});

$("#all").on("click", function() {
  $(".stream").show();
})

$("#online").on("click", function() {
  $(".online").show();
  $(".offline").hide();
})

$("#offline").on("click", function() {
  $(".offline").show();
  $(".online").hide();
})

function insertToHtml(data) {
  var status = data.stream;
  var link = data._links.self;
  var name = link.slice(37, link.length);
  var ref = "https://www.twitch.tv/" + name;
  var logo = data.logo;
  
  html.length = 0;
  
  if (status !== null) {
    status = status.game;
    
    html = "<div class='stream online'><a href='" + ref + "' target='_blank'><h4 class='text-left'>" + name + "</h4>" + "<h4 class='text-right small'>" + status + "</h4></a></div>";
  }
  
  else {
    status = "Offline";
    html = "<div class='stream offline'><a href='" + ref + "' target='_blank'><h4 class='text-left'>" + name + "</h4>" + "<h4 class='text-right small'>" + status + "</h4></a></div>";
  }
  
  $(".results").append(html);
}