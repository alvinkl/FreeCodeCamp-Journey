var html = '';

function Result(title, snippet) {
  this.title = title;
  this.snippet = snippet;
}

function search() {
  $.ajax({
    url: "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=" + $("#search").val(),
    dataType: "jsonp",
    type: "POST",
    headers: {
      "Api-User-Agent": "Example/1.0"
    },
    success: function(data) {
      $(".results").empty();
      
      var arr = data.query.search;
      
      for(var i in arr) {
        html = '<div id="articles" class="well" style="color:white"><a href="https://en.wikipedia.org/wiki/' + arr[i].title + '"target="_blank" style="color:black"><h3>' + arr[i].title + '</h3><p>' + arr[i].snippet + '</p></a></div>';
        
        $(".results").append(html);
      }
    }
  });
  
  $('#search').unbind('keyup');
  $('#search').keyup(function() {
    search();
  });
}

$('#search').keyup(function() {
  search();
});