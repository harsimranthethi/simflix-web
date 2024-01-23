
// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MovieList from './MovieList';
import MovieEdit from './MovieEdit'; // Create MovieEdit component for editing movies
import MovieShow from './MovieShow'; // Create MovieShow component for showing movie details

function App() {
  return (
    <div className="App" class="container p-5">
      <BrowserRouter>
        <Routes>
            {/* Route for the MovieList component */}
            <Route path="/" element={<Navigate to="/movies/list" replace={true} />}/>
            <Route path="/movies/list" exact element={<MovieList/>} />

            {/* Route for editing a movie */}
            <Route path="/movies/:id/edit" element={<MovieEdit/>} />

            {/* Route for showing movie details */}
            <Route path="/movies/:id/show" element={<MovieShow/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
