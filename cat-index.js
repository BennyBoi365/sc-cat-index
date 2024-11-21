$("#submit").click(function(){
    // Input name
    var catName = $("#catName").val();
    console.log("Cat's Name:", catName);
   
    // Selected breed
    var selectedBreed = $("#breedOptions").val();
    console.log("Selected Breed:", selectedBreed);

    // Input color
    var catColor = $("#catColor").val();
    console.log("Cat's Color:", catColor);

    // Yes or No tags selection
    var selectedTags = $("#tagsYesOrNo").val();
    console.log("Does they have tags?:", selectedTags);

    // Selected last time fed
    var lastFed = $("#lastFed").val();
    console.log("Last time fed:", lastFed);
});
