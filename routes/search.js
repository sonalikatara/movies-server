var express = require('express');
var router = express.Router();
var axios = require('axios');

const API_URL_SEARCH_MOVIES = "https://api.themoviedb.org/3/search/movie?api_key="+process.env.TMBC_API_KEY+"&language=en-US";

/*  GET popular movies listing based on a QUERY. */
router.get('/',function(req,res,next){
  let query =  req.query.query ? req.query.query : "";
  let page =  req.query.page ? req.query.page : 1;
  let reqUrl = API_URL_SEARCH_MOVIES + '&page='+ page+'&query='+query;
  axios.get(reqUrl).then(
    response => res.send(
      response.data.results.map(
        movie => ({...movie, rating : Math.round(movie.vote_average/2 )})
        )
      )
    ).catch(err => {
      res.send("error while getting search results " + err);
    });
}
);

module.exports = router;
