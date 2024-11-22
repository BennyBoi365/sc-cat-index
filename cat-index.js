$("#submit").click(function(){
    // Input name
    var catName = $("#catName").val();
    console.log("Cat's Name:", catName);
   
    // Selected breed
    var selectedBreed = $("#breedOptions").val();
    console.log("Selected Breed:", selectedBreed);
    if (selectedBreed === "Other") {$("#otherBreed").show();} else {$("#otherBreed").hide();};
    var otherBreed = $("#otherBreed").val();
    console.log("Other Breed:", otherBreed);

    // Input color
    var catColor = $("#catColor").val();
    console.log("Cat's Color:", catColor);

    // Yes or No tags selection
    var selectedTags = $("#tagsYesOrNo").val();
    console.log("Does they have tags?:", selectedTags);

    // Selected last time fed
    var lastFed = $("#lastFed").val();
    console.log("Last time fed:", lastFed);

    // Friendly? Selection
    var selectedFriendly = $("#friendlyYesOrNo").val();
    console.log("Is the cat friendly?:", selectedFriendly);

    $("#output").append('<div>' + "Name: " + catName + '<br>' + 
        "Breed: " + selectedBreed + otherBreed + '<br>' + "Color: " + catColor + 
        '<br>' + "Do they have tags? " + selectedTags + '<br>' + "When were they last fed? " + 
        lastFed + '<br>' + "Are they friendly? " + selectedFriendly);
});

$(document).ready(function() {
    // Listen for changes on the dropdown
    $("#breedOptions").change(function() {
        // Get the selected option's value
        var selectedBreed = $("#breedOptions").val();

       // Toggle visibility of input field based on selection/conditions met.
       if (selectedBreed === "") {$("#otherBreed").show();} else {$("#otherBreed").hide();}
   });
});
