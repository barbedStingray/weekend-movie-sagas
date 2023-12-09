
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';


export default function AddMovie() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const genreDropdown = useSelector(store => store.genreDropdown);
    console.log(`dropdown`, genreDropdown);

    function populateGenres() {
        console.log(`populating <select>`);
        dispatch({ type: 'FETCH_SELECT_GENRE_MENU' });
    }
    useEffect(() => {
        populateGenres()
    }, []);


    const [newMovie, setNewMovie] = useState({
        title: '',
        poster: '',
        description: '',
        genre_id: ''
    });

    const handleNewMovie = (key) => (event) => {
        console.log(`changing newMovie`);
        setNewMovie({ ...newMovie, [key]: event.target.value })
    }


    function addNewMovie(e) {
        e.preventDefault();
        console.log(`adding new movie`);
        dispatch({ type: 'ADD_NEW_MOVIE', payload: newMovie });
        navigate('/');
    }


    return (
        <div id='add-movie'>

            <Link to={'/'}><p>Return to Movies</p></Link>
            <h3>Add your New Movie Here!</h3>

            <form onSubmit={addNewMovie}>

                {JSON.stringify(newMovie)}
                <br />

                <label>Title: <input
                    type='text'
                    placeholder="Movie Title"
                    value={newMovie.title}
                    onChange={handleNewMovie('title')}
                >
                </input></label>
                {newMovie.title}

                <label>Poster: <input
                    type='text'
                    placeholder="picture.jpg"
                    value={newMovie.poster}
                    onChange={handleNewMovie('poster')}
                >
                </input></label>
                {newMovie.poster}

                <label>Description: <textarea
                    type='text'
                    placeholder="Thoughts on the movie"
                    value={newMovie.description}
                    onChange={handleNewMovie('description')}
                >
                </textarea></label>
                {newMovie.description}

                <select
                    value={newMovie.genre}
                    onChange={handleNewMovie('genre_id')}
                    name="genreType"
                >
                    {genreDropdown.map((genre) => 
                    <option 
                        key={genre.id}
                        value={genre.id}
                    >{genre.name}</option>
                    )}
                </select>
                {newMovie.genre_id}

                <button>Add Movie</button>

            </form>



        </div>
    )
}