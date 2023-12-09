import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import './MovieList.css'

function MovieList() {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    function goToDetailsPage(id) {
        console.log(`going to details`, id);

        dispatch({ type: 'FETCH_DETAILS_PAGE', payload: id });
        dispatch({ type: 'FETCH_DETAILS_GENRE', payload: id });
        navigate(`/details/${id}`);
    }


    return (
        <div id='movie-list'>

            <div id='movieHeader-div'>
                <h1>Favorite Movies!</h1>
            </div>

            <div id='movieSidebar-div'>
                <p>links to pages and searches here</p>
                <Link to={'/addMovie'}><p>Add New Movie</p></Link>
            </div>

            <div id='movieList-div'>
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <img className='movieImage' onClick={() => goToDetailsPage(movie.id)} src={movie.poster} alt={movie.title} />
                        </div>
                    );
                })}
            </div>


            {/* <main> */}
            {/* <h1>MovieList</h1> */}
            {/* <section className="movies"> */}
            {/* </section> */}
            {/* </main> */}
        </div>

    );
}

export default MovieList;