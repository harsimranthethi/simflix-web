import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

var currentPage = 1;

const MovieList = () => {
  const [items, setItems] = useState([]);


  function moveNext(){
    currentPage++;
    loadData()
  }
  function movePrevious(){
    if(currentPage>1){currentPage--}
    loadData()
  }

  function loadData(){
    axios.get('http://localhost:5555/movie/list?page='+currentPage)
      .then(response => {
        // Update state with fetched data
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  useEffect(loadData, []); // Empty dependency array ensures the effect runs once on mount

  const handleEditClick = (id) => {
    console.log(`Edit button clicked for movie with ID ${id}`);
  };

  return (
    <div >
      <h1>Simflix</h1>


      <div class="row">
        <div class="col-10">
        </div>
        <div class="col-2">
          <div class="pr-3">
            <button onClick={()=>movePrevious()}>&lt; Prev</button>
            <span class="p-2">{currentPage}</span>
            <button onClick={()=>moveNext()}>Next &gt;</button>
          </div>
        </div>
      </div>
      <br></br>
      <table class="table.table-bordered">
        <thead>
          <tr>
            <th width="25%" style={{ border: '1px solid black', padding: '8px' }}>Title</th>
            <th width="75%" style={{ border: '1px solid black', padding: '8px' }}>Plot</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <Link to={`/movies/${item._id}/show`}>{item.title}</Link>
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.plot}</td>
                {/*
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  <Link to={`/movies/${item._id}/edit`}>
                    <button>Edit</button>
                  </Link>
                </td>
                */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieList;
