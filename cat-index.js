
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
    // Firebase Configuration (Replace with your Firebase project details)
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
            <p>${catData.catName}</p>
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
        if (catName && selectedBreed && catColor && selectedTags && selectedFriendly && !isNaN(latitude) && !isNaN(longitude)) {
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
    
        /*$("#output").append('<div>' + "Name: " + catName + '<br>' + 
            "Breed: " + selectedBreed + otherBreed + '<br>' + "Color: " + catColor + 
            '<br>' + "Do they have tags? " + selectedTags + '<br>' + "When were they last fed? " + 
            lastFed + '<br>' + "Are they friendly? " + selectedFriendly);*/
    });
});


/*
// DOM Elements
const imageUploadInput = document.getElementById('imageUpload');
const previewImg = document.getElementById('previewIMG');
const uploadBtn = document.getElementById('uploadBtn');

// Preview the image after selection
imageUploadInput.addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get the first file selected

    if (file) {
        const reader = new FileReader(); // FileReader is used to read the image file
        reader.onload = function(e) {
            previewImg.src = e.target.result; // Set the image source to the file's data URL
            previewImg.style.display = 'block'; // Display the image preview
        };
        reader.readAsDataURL(file); // Read the file as a data URL (Base64 encoded string)
    }
});

// Handle Upload Button click
uploadBtn.addEventListener('click', function() {
    const file = imageUploadInput.files[0]; // Get the selected file

    if (!file) {
        alert("Please select an image first!");
        return;
    }

    // Create a reference to Firebase Storage
    const databaseRef = database.ref();
    const fileRef = storageRef.child('cats/' + file.name); // The path inside Firebase Storage

    // Upload file to Firebase Storage
    const uploadTask = fileRef.put(file);

    // Monitor upload progress
    uploadTask.on('state_changed', function(snapshot) {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
    }, function(error) {
        // Handle error
        console.error("Error uploading image:", error);
        alert("Error uploading image!");
    }, function() {
        // Upload completed successfully
        console.log("Upload successful!");
        alert("Image uploaded successfully!");

        // Get the download URL and log it (You can save it to your database or display it)
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            // You can display the download URL or save it to a database
        });
    });
});
const express = require('express');
const app2 = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Dummy in-memory storage for pins
let pins = [];

// Middleware to parse JSON bodies
app2.use(bodyParser.json());
app2.use(cors());

// Serve the static files (HTML, CSS, JS)
app2.use(express.static('public'));

// API to get all saved pins
app2.get('/api/getPins', (req, res) => {
    res.json(pins);
});

// API to save a new pin
app2.post('/api/savePin', (req, res) => {
    const { x, y } = req.body;
    if (x !== undefined && y !== undefined) {
        pins.push({ x, y });
        res.status(200).json({ message: 'Pin saved successfully' });
    } else {
        res.status(400).json({ message: 'Invalid pin data' });
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
*/