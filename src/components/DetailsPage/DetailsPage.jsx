
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


export default function DetailsPage() {

    const movieDetails = useSelector(store => store.detailsMovie);
    const history = useHistory();

    function returnToMovies() {
        console.log(`returning to movies`);
        history.push('/');
    }

    return (
        <div id='details-page'>

            <button onClick={returnToMovies}>Return To Movies</button>


            {movieDetails.map((movie) =>
                <div key={movie.id}>
                    <img src={movie.poster} alt={movie.title} />
                    <h2>{movie.title}</h2>
                    <p>{movie.description}</p>
                    <p>{movie.name}</p>
                </div>
            )}
            {/* {movieDetails.map((movie) =>
                <div key={movie.id}>
                    <img src={movie.poster} alt={movie.title} />
                    <h2>{movie.title}</h2>
                    <p>{movie.description}</p>
                </div>
            )} */}

        </div>
    )
}