var axios = require('axios');
var express = require('express');
var router = express.Router();

const API_URL_MOVIE_DETAILS = "https://api.themoviedb.org/3/movie/{movie_id}?api_key="+process.env.TMBC_API_KEY+"&language=en-US";
const API_SIMILAR_MOVIES = "https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key="+process.env.TMBC_API_KEY+"&language=en-US&page=1";

/* GET movie details. */
router.get('/', function(req, res, next) {
  let movieId =  req.query.id ? req.query.id : 1;
  let reqUrl = API_URL_MOVIE_DETAILS.replace("{movie_id}",movieId);
  let reqSimilarUrl = API_SIMILAR_MOVIES.replace("{movie_id}",movieId);

  // todo: filter the data needed before sending it to client

    let movieDetails = null; 
    let similarMovies = null;  
    let reqArr = [] 
    
     reqArr.push(
       axios.get(reqUrl).then(
        response => {
          movieDetails={...response.data, rating : Math.round(response.data.vote_average/2 )}
        }).catch(err => {
            res.send("error while getting movie results "+ err);
          })
      );

      reqArr.push(
        axios.get(reqSimilarUrl).then(
          response => {
            similarMovies = response.data.results.map(
                movie => ({...movie, rating : Math.round(movie.vote_average/2 )})
            )}).catch(err => {
            res.send("error while getting similar movies results "+ err);
          })
       );  
      
       axios.all(reqArr).then(
         resonse=>
             res.send({...movieDetails,similar_movies: similarMovies})
       ).catch(err => {
        res.send("error while getting all Movie details "+ err);
      })

       

}
);

module.exports = router;
