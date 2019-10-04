require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

//concert-this 
var concertThis = function (band) {
    var url = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp"
    axios.get(url).then(function (response) {
        for (var i = 0; i < response.data.length && i < 3; i++) {
            console.log(
                "Venue: " + response.data[i].venue.name + "\n",
                "City: " + response.data[i].venue.city + "\n",
                "Time: " + moment(response.data[i].datetime).format('MM/DD/YYYY') + "\n",
            );
        }
    });
}

//movie-this 
var movieThis = function (movie) {
    //sets the default as The Sign by Ace of Base if no input
    if (movie === null || movie.trim().length === 0) {
        movie = "Mr. Nobody";
    }
    var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"
    axios.get(url).then(function (response) {
        var movie = response.data;
        console.log(
            " Movie: " + movie.Title + "\n",
            "Year: " + movie.Year + "\n",
            "Rating: " + movie.Ratings[1].Value + "\n",
            "Country: " + movie.Country + "\n",
            "Language: " + movie.Language + "\n",
            "Plot: " + movie.Plot + "\n",
            "Actors: " + movie.Actors + "\n",
        );
    })
}

//spotify-this-song
var spotifyThis = function (song) {
    //sets the default as The Sign by Ace of Base if no input
    if (song === null || song.trim().length === 0) {
        song = "The Sign ace of base";
    }
    spotify.search({ type: "track", query: song },
        function (err, data) {
            if (err) {
                return console.log("Error occurred" + err);
            };
            // debugger;
            console.log(
                " Artist: " + data.tracks.items[0].artists[0].name + "\n",
                "Song: " + data.tracks.items[0].name + "\n",
                "Preview: " + data.tracks.items[0].preview_url + "\n",
                "Album: " + data.tracks.items[0].album.name + "\n",
            );
        });
}

//do-what-it-says
var doWhatItSays = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        } console.log(data);
        //set a var to the text & have it call the appropriate function
    })
} 


//user input & what is output
var whichCommand = function(action,value){

    if(action==="concert-this"){
        concertThis(value)
    }else if(action==="spotify-this-song"){
        spotifyThis(value);
    } else if(action === "movie-this"){
        movieThis(value);
    } 
    //this needs sets what the output would be "I want it that way"
    // else if(action === "do-what-it-says"){
    //     doWhatItSays(value); 
    // } 
    else {
        console.log("Unrecognized action. Format needed: node liri.js concert-this, spotify-this-song, movie-this ");
    }
} 

var userCommand = process.argv[2];
var userValue = process.argv.splice(3).join("+");

whichCommand(userCommand,userValue);