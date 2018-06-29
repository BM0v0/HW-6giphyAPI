$( document ).ready(function() {

var gifs = ["Shrek", "Iron Man", "Angry", "Hungry", "Coding", "Punching", "Darth Vader", "Joking", "Master Chiff", "Gordon Ramsay"];
function displayGifButtons(){
    $("#gifButtonsView").empty(); // erasing anything in this div id so that it doesnt duplicate the results
    for (var i = 0; i < gifs.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("gifs");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", gifs[i]);
        gifButton.text(gifs[i]);
        $("#gifButtonsView").append(gifButton);
    }
}

function addNewButton(){
    $("#addGif").on("click", function(){
    var gifs = $("#gif-input").val().trim();
    if (gifs == ""){
      return false; 
    }
    gifs.push(gifs);

    displayGifButtons();
    return false;
    });
}
// Function to remove last button
function removeLastButton(){
    $("removeGif").on("click", function(){
    gifs.pop(gifs);
    displayGifButtons();
    return false;
    });
}
// Function that displays all of the gifs
function displayGifs(){
    var gifs = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=BUxTVU6CUWQw089uI8EkF3MtFIuDMDwY&limit=10";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        $("#gifsView").empty(); 
        var results = response.data;
        if (results == ""){
          alert("There isn't a gif for this selected button");
        }
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");
            
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
           
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
            gifImage.attr("data-state", "still"); 
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            
            $("#gifsView").prepend(gifDiv);
        }
    });
}

displayGifButtons(); 
addNewButton();
removeLastButton();
// Document Event Listeners
$(document).on("click", ".gifs", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});