//variables
var URLstart = "https://api.giphy.com/v1/gifs/trending?api_key=3o5diAlhFPmPMiRGo7orE73yVThITW45";
var topics = ["English Bulldog", "Gamers", "Starcraft", "Magic the Gathering", "Gambling", "Pugs", "Game of Thrones", "Seahawks"];



// Function for displaying topic data
function renderButtons() {
  // Deleting the topics buttons prior to adding new topics buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each topic in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("topic");
    // Adding a data-attribute with a value of the topic at index i
    a.attr("data-name", topics[i]);
    // Providing the button's text with a value of the topic at index i
    a.text(topics[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(a);
  }
}

// This function handles events where let me find it is clicked
$("#add-topic").on("click", function (event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var inputtedSearch = $("#search-input").val();
  console.log($("#search-input").val())

  // The topic from the textbox is then added to our array
  topics.push(inputtedSearch);
  renderButtons();
  displayTopicInfo(inputtedSearch)
  console.log(topics)

  // calling renderButtons which handles the processing of our topic array
  //renderButtons();

});


renderButtons();

//Make an event listener that gives displaytopicinfo

$(".topic").on("click", function () {
  var topic = $(this).attr("data-name");
  displayTopicInfo(topic)
})

function displayTopicInfo(topic) {
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=3o5diAlhFPmPMiRGo7orE73yVThITW45&q=" + topic + "&limit=10&rating=pg";

  // Creating an AJAX call for the specific topic button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    console.log(response.data[0].images.downsized)
    console.log(queryURL)
    for (var i = 0; i < response.data.length; i++) {

      // Creating a div to hold the topic
      var topicDiv = $("<div class='topic'>");
      console.log(topicDiv)
      // Storing the rating data
      var rating = response.data[i].rating;

      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rated: " + rating);

      // Displaying the rating
      topicDiv.append(pOne);
      // Retrieving the URL for the image
      var stillUrl = response.data[i].images.fixed_height_still.url
      var animateUrl = response.data[i].images.fixed_height.url

      // Creating an element to hold the image
      var image = $("<img class = 'gif'>").attr("src", stillUrl);
      image.attr("data-still", stillUrl);
      image.attr("data-animate", animateUrl);
      image.attr("data-state", "still")
      topicDiv.prepend(image)
      $('#topic').prepend(topicDiv)
    }
  });

}

$(document).on("click", ".gif", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});














//loop the words from the topic array onto the buttons

// you include q: for subject
// you include limit:10 for qnt
// you include rating:g for g rated gifs


//write api call with quantity and rating required
/* <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript">
  // Example queryURL for Giphy API
  var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=3o5diAlhFPmPMiRGo7orE73yVThITW45";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });
</script> */

//make button execute the call

//show giphy rating under gif

//make onclick event to start gif playing, and another to make it stop

//add form to take text input and add it to topics array



