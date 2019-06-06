const firebaseConfig = {
    apiKey: "AIzaSyBzaA1A4HrT0VD1oSzkV7srcaqAiKd3Aws",
    authDomain: "traintracker-3d01f.firebaseapp.com",
    databaseURL: "https://traintracker-3d01f.firebaseio.com",
    projectId: "traintracker-3d01f",
    storageBucket: "traintracker-3d01f.appspot.com",
    messagingSenderId: "979853419701",
    appId: "1:979853419701:web:d1b7112647548973"
  };

  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  var connectionsRef = database.ref("/connections");

  var connectedRef = database.ref(".info/connected");

  connectedRef.on("value", function(snap) {

    if (snap.val()) {
    var con = connectionsRef.push(true);

    con.onDisconnect().remove();
  }
});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function(snapshot) {

  // Display the viewer count in the html.
  $("#watchers").text(snapshot.numChildren());
});
