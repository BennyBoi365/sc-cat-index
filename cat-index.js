
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
    // Leaflet Map
    var map = L.map('map').setView([36.9741,-122.0308], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
         maxZoom: 19,
         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Submit button click event listener
    $("#submit").click(function(){
        // Input name
        var catName = $("#catName").val();
        console.log("Cat's Name:", catName);
       
        // Selected breed
        var selectedBreed = $("#breedOptions").val();
        console.log("Selected Breed:", selectedBreed);
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
});

// Firebase Configuration (Replace with your Firebase project details)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

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
    const storageRef = storage.ref();
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