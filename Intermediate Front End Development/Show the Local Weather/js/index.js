var url = "http://api.apixu.com/v1/current.json?key=42622a5bd8744f9781b73502162908&q="
var ipApi = "http://ip-api.com/json";

function getWeather(data) {
  var city = data.city;
  url += city;
  
  $.getJSON(url, function(json) {
    var degree = [json.current.temp_c, json.current.temp_f];
    
    $("#city").text(json.location.name);
    
    $("#icon").html("<img src='" + json.current.condition.icon + "' />");
    
    $("#degree").html(degree[0] + "<span>&deg</span>"+ "<button id='changeDeg' style='background-color: rgba(0,0,0,0); border: 0; color: #f1c40f' onclick='convert()'>C</btn>");
  })
}

function convert() {
    degree = $("#changeDeg").html();
    value = parseFloat($('#degree').html());
    if (degree == "C") {
        F = value * 9 / 5 + 32;
        F = Math.round(F * 100) / 100
        $("#degree").html(F + "&deg"+ "<button id='changeDeg' style='background-color: rgba(0,0,0,0); border: 0; color: #f1c40f' onclick='convert()'>F</btn>");
    } else {
        C = (value - 32) * 5 / 9;
        C = Math.round(C * 100) / 100;
        $("#degree").html(C + "&deg"+ "<button id='changeDeg' style='background-color: rgba(0,0,0,0); border: 0; color: #f1c40f' onclick='convert()'>C</btn>");
    }
}


$(document).ready(function() {
  $.getJSON(ipApi, getWeather);
   $("#changeDeg").on(click, function() {
    alert("he");
   })
})