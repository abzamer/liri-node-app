require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");

var spotify = new Spotify(keys.spotify);

//concert-this 
var concertThis = function (band) {
    var url = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp"
    axios.get(url).then(function (response) {
        // var datetime = moment().format('MM DD YYYY');
        for (var i = 0; i < response.data.length && i < 3; i++) {
            console.log(
                "Venue: " + response.data[i].venue.name + "\n",
                "City: " + response.data[i].venue.city + "\n",
                "Time: " + response.data[i].datetime + "\n",
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
            debugger;
            console.log(
                " Artist: " + data.tracks.items[0].artists[0].name + "\n",
                "Song: " + data.tracks.items[0].name + "\n",
                "Preview: " + data.tracks.items[0].preview_url + "\n",
                "Album: " + data.tracks.items[0].album.name + "\n",
            );
        });
}

//user input & what is output
var whichCommand = function(action,value){

    if(action==="concert-this"){
        concertThis(value)
    }else if(action==="spotify-this-song"){
        spotifyThis(value);
    } else if(action === "movie-this"){
        movieThis(value);
    } else {
        console.log("Unrecognized action. Format needed: node liri.js concert-this, spotify-this-song, movie-this ");
    }
} 

var userCommand = process.argv[2];
var userValue = process.argv.splice(3).join("+");

whichCommand(userCommand,userValue);