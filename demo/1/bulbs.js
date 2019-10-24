
// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
    apiKey: "AIzaSyCJ9AQpvnY3_lJV6ftffAT6yJzEExuQq",
    authDomain: "test-43776.firebaseapp.com",
    databaseURL: "https://test-43776.firebaseio.com",
    storageBucket: "test-43776.appspot.com"
};

firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

// firebase.database().ref("bulbs").set({
//     "bulb1":"0",
//     "bulb2":"0"
// });
