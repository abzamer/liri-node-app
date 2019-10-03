require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");

var spotify = new Spotify(keys.spotify);


var concertThis = function(band){
    var url = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp"
    axios.get(url).then(function(response){
        debugger;
        console.log(response.data[0].venue.name);
    })
}

concertThis("lizzo");