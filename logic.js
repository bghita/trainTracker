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

  function Train(name, destination, time, group){
      this.name = name,
      this.destination = destination,
      this.time = time,
      this.group = group
  }

  let trainArray = []

  connectedRef.on("value", function(snap) {

    if (snap.val()) {
    var con = connectionsRef.push(true);
    con.onDisconnect().remove();
  }
});

$('#submit-bid').on('click', function(event){
    event.preventDefault()
    let trainName = $('#bidder-name').val()
    let trainDestination = $('#bidder-des').val()
    let trainTime = $('#bidder-time').val()
    let trainGroup = $('#bidder-freq').val()

    var train = new Train(trainName, trainDestination, trainGroup, trainTime);
    trainArray.push(train)

    database.ref().set({
        trains: trainArray
    })
});

database.ref().on('value', function(snap) {
    trainArray = snap.val().trains
    console.log(trainArray)
})