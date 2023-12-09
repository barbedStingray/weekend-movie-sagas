import { Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './App.css';
import MovieList from '../MovieList/MovieList'
import DetailsPage from '../DetailsPage/DetailsPage.jsx';
import AddMovie from '../AddMovie/AddMovie.jsx';

function App() {

  const dispatch = useDispatch();

  const genreDropdown = useSelector(store => store.genreDropdown);
  console.log(`dropdown`, genreDropdown);


  // populating the dropbox
  function populateGenres() {
    console.log(`populating <select>`);
    dispatch({ type: 'FETCH_SELECT_GENRE_MENU' });
  }
  useEffect(() => {
    populateGenres()
  }, []);





  return (
    <div 
      id='web-display'
      className="App">

      <Routes>
        <Route>
          <Route path={"/"} element={<MovieList />} />
          <Route path={"/details/:id"} element={<DetailsPage />} />
          <Route path={"/addMovie"} element={<AddMovie genreDropdown={genreDropdown} />} />
        </Route>

      </Routes>
    </div>
  );
}


export default App;
