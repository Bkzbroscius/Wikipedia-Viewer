/* When the page loads and the search button is clicked, store the data in a variable called value. If
the value is not empty make a JSON call to the wikipedia api and search for the data representing the value. Then call the function to format the data */

$(document).ready(function() {
     $("#searchBut").click(function() {
     var value = $("#data").val(); 
     if (value !== " ") {
        $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&search=" + value + "&limit=20&namespace=0&format=json&callback=?", function(json) {
              formatData(json); 
        
         });
    
       }
      
  }); 
                     
});
/* Get data that corresponds to search 
Every third json array row is a link
so get that link if it's not undefined
and add it to json string and display in the body of page */
var formatData = function (json) {
    
    var jsonStr = "";
              var linkStr = "";
              var j = 0;
              while (j < json.length) {
              for (var i = 1; i < json.length; i++) {
                console.log(json[i][j]);
             
                  if (i === 3 && json[i][j] !== undefined){
                      linkStr = "<a href=" + json[i][j] + ">Wikipedia article for " + json[1][j] + "</a>";
                      jsonStr += linkStr + "<br><br><hr>";

                  }
                  else if (json[i][j] !== undefined) {
                      jsonStr += json[i][j] + "<br><br>";
                  }
                  
                 }
                 j++
              }
              $("body").html(jsonStr);
}
