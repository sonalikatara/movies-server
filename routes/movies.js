var axios = require('axios');
var express = require('express');
var router = express.Router();



const API_URL_POPULAR_MOVIES =
  "https://api.themoviedb.org/3/movie/popular?api_key="+process.env.TMBC_API_KEY+"&language=en-US&page=1";

/* GET moviess listing. */
router.get('/', function(req, res, next) {
axios.get(API_URL_POPULAR_MOVIES).then(response => res.send(response.data.results)).catch(err => {
  res.send(err);
});
  
});

module.exports = router;
