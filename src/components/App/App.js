import { Routes, Route, useParams } from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import DetailsPage from '../DetailsPage/DetailsPage.jsx';

function App() {




  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Routes>

        <Route>
          <Route path={"/"} element={<MovieList />} />
          <Route path={"/details/:id"} element={<DetailsPage />} />
        </Route>

      </Routes>
    </div>
  );
}


export default App;
