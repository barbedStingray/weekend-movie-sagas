
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import './AddMovie.css';


export default function AddMovie(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [newMovie, setNewMovie] = useState({
        title: 'Your Movie Title Here',
        poster: '',
        description: '',
        genre_id: ''
    });

    const handleNewMovie = (key) => (event) => {
        console.log(`changing newMovie`);
        setNewMovie({ ...newMovie, [key]: event.target.value })
    }


    function addNewMovie() {
        console.log(`adding new movie`);
        dispatch({ type: 'ADD_NEW_MOVIE', payload: newMovie });
        navigate('/');
    }


    return (
        <div id='add-movie'>

            <Link to={'/'}><p>Return to Movies</p></Link>

            <div id='addHeader-div'>
                {JSON.stringify(newMovie.title)}
                <br />
                <button onClick={addNewMovie}>Add Movie</button>

            </div>

            <div id='addMain-div'>

                <div>
                    <label><input
                        type='text'
                        placeholder="Movie Title"
                        className='textInputs'
                        value={newMovie.title}
                        onChange={handleNewMovie('title')}
                    >
                    </input></label>
                    {newMovie.title}
                </div>

                <div>
                    <label><input
                        type='text'
                        placeholder="picture.jpg"
                        className='textInputs'
                        value={newMovie.poster}
                        onChange={handleNewMovie('poster')}
                    >
                    </input></label>
                    {newMovie.poster}
                </div>

                <div>
                    <label><textarea
                        type='text'
                        id='add-description'
                        className='textInputs'
                        placeholder="Description here..."
                        value={newMovie.description}
                        onChange={handleNewMovie('description')}
                    >
                    </textarea></label>
                    {newMovie.description}
                </div>

            </div>

            <div id='addSidebar-div'>

                <h4>Select Genre</h4>

                <select
                    value={newMovie.genre}
                    onChange={handleNewMovie('genre_id')}
                    name="genreType"
                    className='textInputs'

                >
                    {props.genreDropdown.map((genre) =>
                        <option
                            key={genre.id}
                            value={genre.id}
                        >{genre.name}</option>
                    )}
                </select>
                {newMovie.genre_id}
            </div>






        </div>
    )
}