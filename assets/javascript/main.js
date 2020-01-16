// The following pseudo code are homework assignment directiions



/* 1. Before you can make any part of your site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
   * We chose animals for our theme, but you can make a list to your own liking.*/
/* 2. Your app should take the topics in this array and create buttons in your HTML.
   * Try using a loop that appends a button for each string in the array. */
/* 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page. */
/* 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing. */

/* 5. Under every gif, display its rating (PG, G, so on).
   * This data is provided by the GIPHY API.
   * Only once you get images displaying with button presses should you move on to the next step. */

/* 6. Add a form to your page that takes a value from a user input box and adds it to your `topics` array. Then make a function call that takes each topic in the array and remakes the buttons on the page.
*/




// The following code is paired with the directions above


/* 1. Before you can make any part of your site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
   * We chose animals for our theme, but you can make a list to your own liking.*/
var topics = ["Batman", "Superman", "Spiderman", "X-men", "Deadpool", "Joker", "Hulk"];
var gifNum = 10;
var offset = 0;

// Display initial buttons
renderButtons();

// Adding click event listeners to all elements with a class of "theme"
$(document).on("click", ".theme", function() {
    $("#displayGif").empty(); // When new theme is selected, clear the displayed gifs,
    offset = 0;   // reset the offset to 0
    displayGifInfo($(this).attr("data-theme"))
});

// Add click event listners to all elemements with a class of "gifImage"
$(document).on("click",".gifImage", toggleGif);





/* 6. Add a form to your page that takes a value from a user input box and adds it to your `topics` array. Then make a function call that takes each topic in the array and remakes the buttons on the page.
*/
// Handles events when the add gif button is clicked
$("#addGif").on("click", function(event) {
    event.preventDefault();
    // Grab the input from the textbox
    var theme = $("#gifInput").val().trim();

    // Add button only if text field is not blank
    if (theme != "") {

        // The gif theme from the textbox is then added to gif array
        topics.push(theme);

        // Calling renderButtons which handles the processing of gif array
        renderButtons();

        // Clear input text field
        $("#gifInput").val("");
    }

});  

$("#moreGifs").on("click", function(event) {
    event.preventDefault();
    offset += 10;
    displayGifInfo($(this).attr("data-theme"));
});







/* 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page. */

// displayGifInfo function re-renders the HTML to display the appropriate content
function displayGifInfo(theme) {

    // var theme = $(this).attr("data-theme");
    console.log("offset: "+offset)

    //var theme = "Comic Book";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + theme + "&limit=10&offset=" + offset + "&rating=G&lang=en&api_key=HbeuwKqfIIBRYZdteUvBd2Nwwp4GFQr4";

    // Creates AJAX call for the specific gif theme button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        for (var i = 0; i < gifNum; i++){

            var gifDiv = $("<div class='card my-2'>");
            var div = $("<div class='card-body'>").html("<h5 class='card-title'>" + response.data[i].title.toUpperCase() + '</h5>');
            var ul = $("<ul class='list-group list-group-flush'>");
            var gifImage = $("<img class='card-img-top gifImage hover-outline' alt="+theme+">");
            gifImage.attr("src",response.data[i].images.fixed_height_small_still.url);
            gifImage.attr("still",response.data[i].images.fixed_height_small_still.url)
            gifImage.attr("gif",response.data[i].images.fixed_height_small.url);
            gifDiv.append(ul);

/* 5. Under every gif, display its rating (PG, G, so on).
   * This data is provided by the GIPHY API.
   * Only once you get images displaying with button presses should you move on to the next step. */
            ul.append("<li class='list-group-item'><strong>Source:</strong> " + response.data[i].source_tld + "<br/>")
            div.append("<h6>Rating: " + response.data[i].rating.toUpperCase() + "</h6>")
            gifDiv.prepend(div);
            gifDiv.prepend(gifImage);
            console.log(gifDiv)
            $("#displayGif").prepend(gifDiv);

        }
        $("#moreGifs").show().attr("data-theme",theme);  // Add current theme to more button
    });
}






/* 2. Your app should take the topics in this array and create buttons in your HTML.
   * Try using a loop that appends a button for each string in the array. */

// Function for displaying gif theme buttons
function renderButtons() {

    // Clear current buttons and re-render the buttons to prevent button duplication
    $("#gifButtons").empty();
    $("#moreGifs").hide();

    // Loops through the array of gif themes
    for (var i = 0; i < topics.length; i++) {
        // Dynamicaly generate buttons for each gif theme in the array
        var a = $("<button>");
        // Add a class of theme to button
        a.addClass("theme btn btn-primary m-1");
        // Add a data-attribute
        a.attr("data-theme", topics[i]);
        // Display initial button text
        a.text(topics[i]);
        // Add the button to the gifButtons div
        $("#gifButtons").append(a);
    }   
}






/* 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing. */

// Function to toggle between still image and gif
function toggleGif () {
    if ($(this).attr("src") === $(this).attr("still")) {
        $(this).attr("src",$(this).attr("gif"));
    }
    else {
        $(this).attr("src",$(this).attr("still"));
    }
}