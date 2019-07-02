require("dotenv").config();
var moment = require("moment")
var axios = require("axios");
var fs = require("fs");

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);


var startGame = function(firstArg,secondArg){
switch (firstArg) {
  case 'concert-this':
    // console.log("concert-this");
    concert(secondArg);
    break;
  case 'spotify-this-song':
    spotifyMusic(secondArg);
    break;
  case 'movie-this':
    movie(secondArg);
    break;
  case 'do-what-it-says':
    doWhatItSays();
    break;
  default:
    console.log("Please enter the right action to be performed.");
}
}

// Start Game Function
startGame(process.argv[2],process.argv[3]);

// Bands in Town
function concert (secondParameter) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + secondParameter + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(function(response) {
        // console.log(response.data);
        // limit to 5
        for (var i = 0; i < 5; i++){
            console.log(response.data[i].venue.name + " " + response.data[i].venue.country + " " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
        }
    })
}

// OMDB Movies
function movie(secondParameter) {
    var queryUrl = "http://www.omdbapi.com/?t=" + secondParameter + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(function(response) {
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Country: " + response.data.Country);
        console.log("Language : " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
    })
}

// Spotify Music
function spotifyMusic(secondParameter) {
    spotify.search({ type: 'track', query: secondParameter }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name); 
        console.log("Link to Song: " + data.tracks.items[0].external_urls.spotify);
        console.log("Album : " + data.tracks.items[0].album.name);
      });
}

// Do what it says
function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(err, data){
        console.log("data: " + data);
        var dataArr = data.split(",");
        console.log("data array: " + dataArr[1]);
        startGame(dataArr[0],dataArr[1]);
    })
}


