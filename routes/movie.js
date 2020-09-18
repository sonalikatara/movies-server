var axios = require('axios');
var express = require('express');
var router = express.Router();

const API_URL_MOVIE_DETAILS = "https://api.themoviedb.org/3/movie/{movie_id}?api_key="+process.env.TMBC_API_KEY+"&language=en-US";

/* GET movie details. */
router.get('/', function(req, res, next) {
  let movieId =  req.query.id ? req.query.id : 1;
  let reqUrl = API_URL_MOVIE_DETAILS.replace("{movie_id}",movieId);

  // todo: filter the data needed before sending it to client
  axios.get(reqUrl).then(
      response => res.send( 
        {...response.data, rating : Math.round(response.data.vote_average/2 )}
        )).catch(err => {
    res.send("error while getting movie results "+ err);
  });
}
);

module.exports = router;
