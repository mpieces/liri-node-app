require("dotenv").config();
var moment = require("moment")
var axios = require("axios");
var fs = require("fs");

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// node liri.js concert-this <artist/band name here>

// This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:

// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")
var startGame = function(firstArg,secondArg){
switch (firstArg) {
  case 'concert-this':
    console.log("concert-this");
    concert(secondArg);
    break;
  case 'spotify-this-song':
    // spotify(secondArg);
    spotify.search({ type: 'track', query: secondArg }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      console.log(data.tracks.items[0].artists[0].name);
      console.log(data.tracks.items[0].name); 
      console.log(data.tracks.items[0].external_urls.spotify);
      console.log(data.tracks.items[0].album.name);
      });
    break;
  case 'movie-this':
    movie(secondArg);
    break;
  case 'do-what-it-says':
    doWhatItSays();
    break;
  default:
    console.log("Please enter the right action to be perforemd.");
}
}

startGame(process.argv[2],process.argv[3]);

function concert (secondParameter) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + secondParameter + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(function(response) {
        console.log(response.data);
        for(var i=0; i<5; i++){
            console.log(response.data[i].venue.name +" " +response.data[i].venue.country + " " +moment(response.data[i].datetime).format("MM/DD/YYYY"));
        }
    })
}

function movie(secondParameter) {
    var queryUrl = "http://www.omdbapi.com/?t=" + secondParameter + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(function(response) {
        console.log(response.data);
    })
}

// function spotify(secondParameter) {
    
// }

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(err, data){
        console.log("data: " +data);
        var dataArr = data.split(",");
        console.log("data ARR: " + dataArr[1]);
        startGame(dataArr[0],dataArr[1]);
    })
}

// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.
