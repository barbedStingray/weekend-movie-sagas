import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';


export default function DetailsPage() {

    const movieDetails = useSelector(store => store.detailsMovie);
    const genreDetails = useSelector(store => store.genres);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // use useParams and make a Get request from the details page
    // use params
    const { id } = useParams();
    console.log(`useParams Id`, id);

    // get request using use params
    function refreshPage() {
        console.log(`refreshing page id:`, id);
        dispatch({ type: 'FETCH_DETAILS_PAGE', payload: id });
        dispatch({ type: 'FETCH_DETAILS_GENRE', payload: id });
    }

    useEffect(() => {
        refreshPage()
    }, []);


    return (
        <div id='details-page'>

            <Link to="/" relative="path">
                <p>Back to Movies</p>
            </Link>

            {/* movies map */}
            {movieDetails.map((movie) =>
                <div key={movie.id}>
                    <img src={movie.poster} alt={movie.title} />
                    <h2>{movie.title}</h2>
                    <p>{movie.description}</p>
                </div>
            )}

            {/* genre map */}
            {genreDetails.map((genre, i) =>
                <div key={i}>
                    <p>{genre.name}</p>
                </div>
            )}

        </div>
    )
}