import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

        dispatch({ type: 'FETCH_DETAILS_PAGE', payload: id});
        navigate(`/details/${id}`);
    }


    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                                <img onClick={() => goToDetailsPage(movie.id)} src={movie.poster} alt={movie.title} />
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;