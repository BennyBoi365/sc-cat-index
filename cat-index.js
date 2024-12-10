
// Code for making otherBreed text input appear from WesBot
$(document).ready(function() {
    // Listen for changes on the dropdown
    $("#breedOptions").change(function() {
        // Get the selected option's value
        var selectedBreed = $("#breedOptions").val();

       // Toggle visibility of input field based on selection/conditions met.
       if (selectedBreed === "") {$("#otherBreed").show();} else {$("#otherBreed").hide();}
   });
});

$(document).ready(function() {
    // Firebase Configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAveQFhXsL7T6-K-nSXsUI2Bw48glo3zL4",
        authDomain: "santa-cruz-cat-index.firebaseapp.com",
        projectId: "santa-cruz-cat-index",
        storageBucket: "santa-cruz-cat-index.firebasestorage.app",
        messagingSenderId: "664337673084",
        appId: "1:664337673084:web:3e9aab4d90c91bd85092f9",
        measurementId: "G-53Q617LNGS",
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    const catsRef = database.ref('cats');

    // Leaflet Map
    var map = L.map('map').setView([36.9741,-122.0308], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
         maxZoom: 19,
         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Add existing cats to map, code adapted from Wes Modes
    catsRef.on('child_added', (snapshot) => {
        const catData = snapshot.val();

        // Add marker to map
        const marker = L.marker([catData.location[0], catData.location[1]]).addTo(map);
        marker.bindPopup(`
            <h1>${catData.catName}</h1>
            <p>${catData.selectedBreed}</p>
            <p>${catData.otherBreed}</p>
            <p>${catData.catColor}</p>
            <p>${catData.selectedTags}</p>
            <p>${catData.lastFed}</p>
            <p>${catData.selectedFriendly}</p>
        `);
    });

    // Click on map to get coordinates, from Leaflet Quick Start Guide
    var popup = L.popup();
    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("Your Latitude and Longitude: " + e.latlng.toString())
            .openOn(map);
    };
    map.on('click', onMapClick);

    // Submit button click event listener
    $("#submit").click(function(){
        // Input name
        const catName = $("#catName").val();
        console.log("Cat's Name:", catName);
       
        // Selected breed
        const selectedBreed = $("#breedOptions").val();
        console.log("Selected Breed:", selectedBreed);
        const otherBreed = $("#otherBreed").val();
        console.log("Other Breed:", otherBreed);
    
        // Input color
        const catColor = $("#catColor").val();
        console.log("Cat's Color:", catColor);
    
        // Yes or No tags selection
        const selectedTags = $("#tagsYesOrNo").val();
        console.log("Does they have tags?:", selectedTags);
    
        // Selected last time fed
        const lastFed = $("#lastFed").val();
        console.log("Last time fed:", lastFed);
    
        // Friendly? Selection
        const selectedFriendly = $("#friendlyYesOrNo").val();
        console.log("Is the cat friendly?:", selectedFriendly);

        // Location data
        const latitude = parseFloat($("#latitude").val());
        console.log("Latitude:", latitude);
        const longitude = parseFloat($("#longitude").val());
        console.log("Longitude:", longitude);

        // When all necessary fields input, code adapted from Wes Modes
        if (catName && selectedBreed && catColor && selectedTags && lastFed && selectedFriendly && !isNaN(latitude) && !isNaN(longitude)) {
            // Push to firebase
            catsRef.push({
                catName,
                selectedBreed,
                otherBreed,
                catColor,
                selectedTags,
                lastFed,
                selectedFriendly,
                location: [latitude, longitude]
            });

            //Clear inputs
            $("#catName").val('');
            $("#breedOptions").val('');
            $("#otherBreed").val('');
            $("#catColor").val('');
            $("#tagsYesOrNo").val('');
            $("#lastFed").val('');
            $("#friendlyYesOrNo").val('');
            $("#latitude").val('');
            $("#longitude").val('');
        } else {
            alert('Please fill out all fields.');
        };
    });
});

