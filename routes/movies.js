var axios = require('axios');
var express = require('express');
var router = express.Router();



const API_URL_POPULAR_MOVIES =
  "https://api.themoviedb.org/3/movie/popular?api_key="+process.env.TMBC_API_KEY+"&language=en-US";
  
/* GET moviess listing. */
router.get('/', function(req, res, next) {
  let page =  req.query.page ? req.query.page : 1;
  let reqUrl = API_URL_POPULAR_MOVIES + '&page='+ page;
  axios.get(reqUrl).then(response => res.send(response.data.results)).catch(err => {
    res.send(err);
  });
  
});

module.exports = router;
