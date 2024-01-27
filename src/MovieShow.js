// MovieShow.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MovieShow = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Make API call to get details for a specific movie based on the ID
    var server = "";
    server = "http://localhost:5556"
    axios.get(server+`/movie/${id}/show`)
      .then(response => {
        // Update state with fetched movie details
        setMovie(response.data);
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
      });
  }, [id]); // Dependency array includes 'id' to fetch details when 'id' changes

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div class="row">
        <div class="col-3">
            <img class="w-100" src={movie.poster}></img>
        </div>
        <div class="col-9">
            <h1>{movie.title}</h1>

            <p>{movie.fullplot==undefined?movie.plot:movie.fullplot}</p>
            <p>Year: {movie.year}</p>
            <p>Rating: {movie.imdb.rating}</p>
            <p>Cast:</p>
            <ul>
                {movie.cast.map(actor=>(
                    <li>{actor}</li>
                ))}
            </ul>
            <p>Genre:</p>
            <ul>
                {movie.genres.map(g=>(
                    <li>{g}</li>
                ))}
            </ul>
        </div>
        <hr></hr>
        <Link to={`/movies/list`}>Go to List</Link>
    </div>
  
  );
};

export default MovieShow;
