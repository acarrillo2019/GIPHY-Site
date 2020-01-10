/* 1. Before you can make any part of your site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
   * We chose animals for our theme, but you can make a list to your own liking.

2. Your app should take the topics in this array and create buttons in your HTML.
   * Try using a loop that appends a button for each string in the array.

3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

5. Under every gif, display its rating (PG, G, so on).
   * This data is provided by the GIPHY API.
   * Only once you get images displaying with button presses should you move on to the next step.

6. Add a form to your page that takes a value from a user input box and adds it to your `topics` array. Then make a function call that takes each topic in the array and remakes the buttons on the page.

*/

var topics = ["Batman", "Superman", "Spiderman", "X-men", "Deadpool", "Joker", "Hulk"];
var gifNum = 10;

addButtons();

// Adding click event listeners to all elements with a class of "theme"
$(document).on("click", ".theme", function() {
    $("#displayGif").empty(); // When new theme is selected, clear the displayed gifs,
    offset = 0;   // reset the offset to 0
    displayGifInfo($(this).attr("data-theme"))
});

var theme = "Comic Book";
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + theme + "&limit=10&offset=0&rating=G&lang=en&api_key=HbeuwKqfIIBRYZdteUvBd2Nwwp4GFQr4";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {

    console.log(response);


});

function addButtons() {
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("theme btn btn-primary m-1");
        a.text(topics[i]);
        $("#gifButtons").append(a);
    }
}

$("#addGif").on("click", function(event) {
    event.preventDefault();
    // Grab the input from the textbox
    var theme = $("#gifInput").val().trim();

    // Add button only if text field is not blank
    if (theme != "") {

        // The gif theme from the textbox is then added to gif array
        themes.push(theme);

        // Calling renderButtons which handles the processing of gif array
        renderButtons();

        // Clear input text field
        $("#gifInput").val("");
    }

});  