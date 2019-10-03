require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");

var spotify = new Spotify(keys.spotify);


var concertThis = function(band){
    var url = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp"
    axios.get(url).then(function(response){
        // debugger;
        //structure it & ensure path is correct
        console.log(response.data[0].venue.name);
        console.log(response.data[0].venue.location);
        console.log(response.data[0].venue.name)
    })
}

// concertThis("lizzo");

//movie-this 
var movieThis = function(movie){
    var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"
    axios.get(url).then(function(response){
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
var song = "All the small things"
spotify.search({type: "track", query: song}, 
function(err, data){
    if (err){
        return console.log("Error occurred" + err);
    };
    console.log(data);
});


