var topics = ["birds", "dogs", "carrots", "bugs", "cars", "boats", "batman"];
var gifNum = 10;


var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=HbeuwKqfIIBRYZdteUvBd2Nwwp4GFQr4";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
});