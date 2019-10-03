require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");

var spotify = new Spotify(keys.spotify);


var concertThis = function(band){
    var url = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp"
    axios.get(url).then(function(response){
        for(i=0; i < response.length; i++){
        // debugger;
        //structure it & ensure path is correct
        console.log(response.data[0].venue.name);
        console.log(response.data[0].venue.location);
        console.log(response.data[0].venue.name)
        }
    })
}

// concertThis("lizzo");

//movie-this 
var movieThis = function (movie) {
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

// movieThis("Sharknado");


//Spotify
var spotifyThis = function(song){
    spotify.search({type: "track", query: song}, 
    function(err, data){
        if (err){
            return console.log("Error occurred" + err);
        };
        debugger;
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].name);
        // console.log(data.tracks.items[0].preview_url);
        console.log(`Album name: ${data.tracks.items[0].album.name}`)
        //if no song provided, play Ace of Base's The Sign
    });
}

var whichCommand = function(action,value){

    if(action==="concert-this"){
        concertThis(value)
    }else if(action==="spotify-this-song"){
        spotifyThis(value);
    } else if(action === "movie-this"){
        movieThis(value);
    }
} 

var userCommand = process.argv[2];
var userValue = process.argv.splice(3).join("+")

whichCommand(userCommand,userValue);