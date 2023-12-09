import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';

import './DetailsPage.css';


export default function DetailsPage() {

    const movieDetails = useSelector(store => store.detailsMovie);
    const genreDetails = useSelector(store => store.genres);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    // form view for the edits to appear
    const [formView, setFormView] = useState(false);

    // variable to pass the update
    const [alterMovie, setAlterMovie] = useState({
        id: '',
        title: '',
        poster: '',
        description: '',
        genre_id: ''
    });

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


    // build your new movie details
    const handleAlterMovie = (key) => (event) => {
        console.log(`editing yoru movie`);
        setAlterMovie({ ...alterMovie, [key]: event.target.value });
    }

    // editMovie button
    function editMovie() {
        console.log(`editing your movie`);
        setAlterMovie({
            id: movieDetails[0].id,
            title: movieDetails[0].title,
            poster: movieDetails[0].poster,
            description: movieDetails[0].description,
        });
        console.log(`new alterMovie`, alterMovie);
        setFormView(!formView);
    }


    // save your edits 
    function saveEdits() {
        console.log('saving your edits:', alterMovie);

        // send your edits to the server
        dispatch({ type: 'UPDATE_DETAILS_MOVIE', payload: alterMovie });

        // refresh page after edit to redisplay
        setTimeout(refreshPage, 50);

        // hide formView
        setFormView(!formView);
    }



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
                    <p>Genre id: {genre.id}</p>
                    <p>movies_genres_id: {genre.movies_genres_id}</p>
                </div>
            )}




            {/* edit your movie */}
            <button
                className={formView ? 'invisible' : 'visible'}
                onClick={editMovie}
            >Edit Movie</button>

            {/* cancel your edits */}
            <button
                className={formView ? 'visible' : 'invisible'}
                onClick={() => setFormView(!formView)}
            >Cancel Edit</button>

            {/* save your edits */}
            <button
                className={formView ? 'visible' : 'invisible'}
                onClick={saveEdits}
            >Save Edits</button>


            <br />
            {JSON.stringify(alterMovie)}

            <div
                className={formView ? 'visible' : 'invisible'}
                id='movieEdit-form'
            >
                <h3>Edit Your Movie!</h3>

                <label>Title: <input
                    type='text'
                    placeholder="Movie Title"
                    value={alterMovie.title}
                    onChange={handleAlterMovie('title')}
                >
                </input></label>
                {alterMovie.title}

                <label>Poster: <input
                    type='text'
                    placeholder="picture.jpg"
                    value={alterMovie.poster}
                    onChange={handleAlterMovie('poster')}
                >
                </input></label>
                {alterMovie.poster}

                <label>Description: <textarea
                    type='text'
                    placeholder="Thoughts on the movie"
                    value={alterMovie.description}
                    onChange={handleAlterMovie('description')}
                >
                </textarea></label>
                {alterMovie.description}


                {/* input for genres */}


            </div>


        </div>
    )
}