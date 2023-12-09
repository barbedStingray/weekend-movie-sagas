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
                    <label>Title:
                        <br />
                        <input
                            type='text'
                            placeholder="Movie Title"
                            value={alterMovie.title}
                            onChange={handleAlterMovie('title')}
                        >
                        </input></label>
                    {/* {alterMovie.title} */}

                </div>

                {/* navigation buttons */}
                <div id='nav-buttons'>
                    <div>
                        {/* edit your movie */}
                        <button
                            className={formView ? 'invisible' : 'visible'}
                            onClick={editMovie}
                        >Edit Movie</button>
                    </div>

                    <div>
                        {/* cancel your edits */}
                        <button
                            className={formView ? 'visible' : 'invisible'}
                            onClick={() => setFormView(!formView)}
                        >Cancel Edit</button>
                    </div>

                    <div>
                        {/* save your edits */}
                        <button
                            className={formView ? 'visible' : 'invisible'}
                            onClick={saveEdits}
                        >Save Edits</button>
                    </div>
                </div>

            </div>


            <div id='blank-div'>
                <button
                    onClick={backToMovies}
                    id='movies-back'
                >Back to Movies</button>
            </div>



            <div id='detailsSidebar-div'>


                {movieDetails.map((movie) =>
                    <div key={movie.id}>
                        <img className='movieImage' src={movie.poster} alt={movie.title} />
                    </div>
                )}

                <label className={formView ? 'visible' : 'invisible'}>Poster: <input
                    type='text'
                    placeholder="picture.jpg"
                    value={alterMovie.poster}
                    onChange={handleAlterMovie('poster')}
                >
                </input></label>
                {/* {alterMovie.poster} */}



                {/* genre map */}
                {genreDetails.map((genre, i) =>
                    <div key={i}>
                        <p>{genre.name}</p>
                        <p>Genre id: {genre.id}</p>
                        <p>movies_genres_id: {genre.movies_genres_id}</p>
                    </div>
                )}

            </div>



            <div id='detailsMain-div' >
                {/* movies map */}

                <div className={formView ? 'invisible' : 'visible'}>
                    <h3>Description:</h3>
                    {movieDetails.map((movie) =>
                        <div key={movie.id}>
                            <p>{movie.description}</p>
                        </div>
                    )}
                </div>

                <div className={formView ? 'visible' : 'invisible'}>

                    <label>Description: <textarea
                        type='text'
                        id='edit-description'
                        placeholder="Thoughts on the movie"
                        value={alterMovie.description}
                        onChange={handleAlterMovie('description')}
                    >
                    </textarea></label>
                    {/* {alterMovie.description} */}
                </div>




            </div>


            {/* <br />
            {JSON.stringify(alterMovie)} */}


        </div>
    )
}