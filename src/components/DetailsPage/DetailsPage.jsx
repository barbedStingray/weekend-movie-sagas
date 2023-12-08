
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';


export default function DetailsPage() {

    const movieDetails = useSelector(store => store.detailsMovie);
    const navigate = useNavigate();


    // const { movieId } = useParams();


    function returnToMovies() {
        console.log(`returning to movies`);
        navigate('/');
    }

    return (
        <div id='details-page'>

            <button onClick={returnToMovies}>Return To Movies</button>

            {/* <p>movieID: {movieId}</p> */}

            {movieDetails.map((movie) =>
                <div key={movie.id}>
                    {/* <img src={movie.poster} alt={movie.title} /> */}
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