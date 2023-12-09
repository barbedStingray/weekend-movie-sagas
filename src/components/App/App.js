import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import DetailsPage from '../DetailsPage/DetailsPage.jsx';
import AddMovie from '../AddMovie/AddMovie.jsx';

function App() {




  return (
    <div className="App">
      <h1>The Movies Saga!</h1>

        <Link to={'/addMovie'}><p>Add New Movie</p></Link>
        
      <Routes>

        <Route>
          <Route path={"/"} element={<MovieList />} />
          <Route path={"/details/:id"} element={<DetailsPage />} />
          <Route path={"/addMovie"} element={<AddMovie />} />
        </Route>

      </Routes>
    </div>
  );
}


export default App;
