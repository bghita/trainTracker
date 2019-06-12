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

function Train(name, destination, time, group) {
    this.name = name,
        this.destination = destination,
        this.time = time,
        this.group = group
}

let trainArray = [];

connectedRef.on("value", function (snap) {

    if (snap.val()) {
        var con = connectionsRef.push(true);
        con.onDisconnect().remove();
    }
});

$('#submit-bid').on('click', function (event) {
    event.preventDefault()
    let trainName = $('#bidder-name').val()
    let trainDestination = $('#bidder-des').val()
    let trainTime = $('#bidder-time').val()
    let trainGroup = $('#bidder-freq').val()

    var train = new Train(trainName, trainDestination, trainGroup, trainTime);

    trainArray.push(train);

    database.ref().set({
        trains: trainArray
    })
});
database.ref().once("value", function (snap) {
    trainArray = snap.val().trains
    if (trainArray) {
        for (let i = 0; i < trainArray.length; i++) {
            const $tr = $("<tr>");
            const $td = $("<td>")
            $td.text(trainArray[i].name);
            const $td2 = $("<td>");
            $td2.text(trainArray[i].destination);
            const $td3 = $("<td>");
            $td3.text(trainArray[i].time);
            const $td4 = $("<td>");
            $td4.text("testing");
            const $td5 = $("<td>");
            $td5.text("testing");
            $tr.append($td, $td2, $td3, $td4, $td5);
            $(".table").append($tr)
        }
    }
})

database.ref("traintracker-3d01f/trains").on("child_added", function (snap) {
    data = snap.val().trains;
    trainArray = data;
    // trainArray // this is a array [] to access information in an array i used the [] and the index of the item i want.
    // trainArray[0] // this is an json object. We can tell it is an object since we used curly brackets. 
    // trainArray[0].destination // this is now a string "NewJersey"
    // const $tr =  $("<tr>");
    if (trainArray) {
        for (let i = trainArray.length - 1; i < trainArray.length; i++) {
            const $tr = $("<tr>");
            const $td = $("<td>")
            $td.text(trainArray[i].name);
            const $td2 = $("<td>");
            $td2.text(trainArray[i].destination);
            const $td3 = $("<td>");
            $td3.text(trainArray[i].time);
            const $td4 = $("<td>");
            $td4.text("testing");
            const $td5 = $("<td>");
            $td5.text("testing");
            $tr.append($td, $td2, $td3, $td4, $td5);
            $(".table").append($tr)
        }
    }

})