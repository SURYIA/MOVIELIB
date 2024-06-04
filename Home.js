import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Ensure this import is present to apply styles

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [movieLists, setMovieLists] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMovieLists();
  }, []);

  const fetchMovieLists = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/movies/lists', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMovieLists(response.data);
    } catch (error) {
      setError('Error fetching movie lists.');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=415218d&s=${searchTerm}`);
      setMovies(response.data.Search);
    } catch (error) {
      setError('Error searching for movies.');
    }
  };

  return (
    <div className="home-container">
      <h2>Welcome to Movie Library</h2>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label>Search for a movie:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
        </div>
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="movies">
        {movies && movies.map((movie) => (
          <div key={movie.imdbID}>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
      <div className="movie-lists">
        <h2>Your Movie Lists</h2>
        {movieLists.map((list) => (
          <div key={list._id}>
            <h3>{list.name}</h3>
            <p>{list.movies.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
