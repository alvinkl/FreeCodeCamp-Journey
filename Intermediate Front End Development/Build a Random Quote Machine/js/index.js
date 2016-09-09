var url = "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?";

// var flickrUrl = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

function getQuote(json) {
  var tweetUrl = "https://twitter.com/intent/tweet?text=";
  var quote = "<i class='fa fa-quote-left' aria-hidden=true></i>  " + json.quoteText;
  var author = json.quoteAuthor;

  if(author === "") author = "unknown";

  var tweet = tweetUrl + json.quoteText + " -" + author + " #quoteOfTheDay";

  $(".quote").html(quote);
  $(".name").text(author);
  $("a").attr("href", tweet);
}

// function displayImages(data) {

//   //Get random photo from the api's items array
//   var randomPhoto = data.items[Math.floor(Math.random() * data.items.length)];

//   $("body").css({
//     backgroundImage: "url('" + randomPhoto.media.m + "')",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat"
//   });
// }

$(document).ready(function() {
  $.getJSON(url, getQuote);
  
  $(".newQuote").on("click", function() {
    $(".quote").css({display: "none"});
    $.getJSON(url, getQuote);
    $(".quote").fadeIn(2000);
  });
});