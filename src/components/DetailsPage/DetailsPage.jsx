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

    function backToMovies() {
        console.log(`go back to movies`);
        navigate('/');
    }


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

    // delete the movie
    function deleteMovie() {
        console.log('deleting movie');
    }



    return (
        <div id='details-page'>

            <div id='detailsHeader-div'>

                {/* Display title */}
                <div className={formView ? 'invisible' : 'visible'}>
                    {movieDetails.map((movie, i) =>
                        <h1 key={i}>{movie.title}</h1>
                    )}
                </div>

                <div className={formView ? 'visible' : 'invisible'}>
                    {/* Edit title */}
                    <label><h1>Title:</h1>
                        <input
                            type='text'
                            placeholder="Movie Title"
                            className='textInputs'
                            value={alterMovie.title}
                            onChange={handleAlterMovie('title')}
                        >
                        </input></label>
                    {/* {alterMovie.title} */}

                </div>


            </div>



            <div id='detailsSidebar-div'>
                <div>
                    <button
                        onClick={backToMovies}
                        id='movies-back'
                        className='normalButton'
                    >Back to Movies</button>
                </div>

                {/* navigation buttons */}
                <div id='nav-buttons'>
                    <div className={formView ? 'invisible' : 'visible'}>
                        {/* edit your movie */}
                        <button
                            className='editButton'
                            onClick={editMovie}
                        >Edit Movie</button>
                    </div>

                    <div className={formView ? 'visible' : 'invisible'}>
                        {/* cancel your edits */}
                        <button
                            className='editButton'
                            onClick={() => setFormView(!formView)}
                        >Cancel Edit</button>
                    </div>

                    <div className={formView ? 'visible' : 'invisible'}>
                        {/* save your edits */}
                        <button
                            className='submitButton'
                            onClick={saveEdits}
                        >Save Edits</button>
                    </div>

                    <div className={formView ? 'visible' : 'invisible'}>
                        {/* delete your movie */}
                        <button
                            className='deleteButton'
                            onClick={deleteMovie}
                        >Delete Movie</button>
                    </div>
                </div>




            </div>



            <div id='detailsMain-div' >
                {/* movies map */}

                <div id='photo-one'>
                    {movieDetails.map((movie) =>
                        <div key={movie.id}>
                            <img className='movieImage' src={movie.poster} alt={movie.title} />
                        </div>
                    )}
                </div>

                <div className={formView ? 'invisible' : 'visible'}>
                    <h3>Description:</h3>
                    {movieDetails.map((movie) =>
                        <div id='text-description' key={movie.id}>
                            <p>{movie.description}</p>
                        </div>
                    )}
                </div>

                <div className={formView ? 'visible' : 'invisible'}>

                    <label><h3>Description:</h3> <textarea
                        type='text'
                        id='edit-description'
                        className='textInputs'
                        value={alterMovie.description}
                        onChange={handleAlterMovie('description')}
                    >
                    </textarea></label>
                    {/* {alterMovie.description} */}
                </div>

                <div>
                    {/* genre map */}
                    {genreDetails.map((genre, i) =>
                        <div key={i}>
                            <p>{genre.name}</p>
                            <p>Genre id: {genre.id}</p>
                            <p>movies_genres_id: {genre.movies_genres_id}</p>
                        </div>
                    )}
                </div>


                <div>
                    <label className={formView ? 'visible' : 'invisible'}><h3>Poster:</h3> <input
                        type='text'
                        id='edit-poster'
                        placeholder="picture.jpg"
                        className='textInputs'
                        value={alterMovie.poster}
                        onChange={handleAlterMovie('poster')}
                    >
                    </input></label>
                    {/* {alterMovie.poster} */}
                </div>







            </div>


            {/* <br />
            {JSON.stringify(alterMovie)} */}


        </div>
    )
}