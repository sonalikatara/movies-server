var express = require('express');
var router = express.Router();
var axios = require('axios');

const API_URL_DISCOVER_MOVIES = "https://api.themoviedb.org/3/discover/movie?api_key="+process.env.TMBC_API_KEY+"&language=en-US&include_adult=false&include_video=false&sort_by=popularity.desc&page=1";

/*  GET popular movies listing based on a QUERY. */
router.get('/',function(req,res,next){
  let query =  req.query.query ? req.query.query : "sort_by";
  let queryValue = req.query.queryValue ? req.query.queryValue : "popularity.desc";
  let page =  req.query.page ? req.query.page : 1;
  let reqUrl = `${API_URL_DISCOVER_MOVIES}&page=${page}&${query}=${queryValue}`;
  console.log("####",reqUrl);

  axios.get(reqUrl).then(
    response => res.send(
      response.data.results.map(
        movie => ({...movie, rating : Math.round(movie.vote_average/2 )})
        )
      )
    ).catch(err => {
      res.send("error while getting discover results " + err  );
    });
}
);

module.exports = router;