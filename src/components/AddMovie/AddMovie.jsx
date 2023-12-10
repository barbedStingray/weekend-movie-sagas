
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
        genre_id: '1'
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

    function backToMovies() {
        console.log('going back to movielist');
        navigate('/');
    }


    return (
        <div id='add-movie'>

            <div id='addHeader-div'>
                <div>
                    <h2>{JSON.stringify(newMovie.title)}</h2>
                </div>
                <div>
                    <button
                        onClick={addNewMovie}
                        className='submitButton'
                    >Add Movie</button>
                </div>

            </div>

            <div id='addMain-div'>


                <div>
                    <label><input
                        type='text'
                        placeholder="Movie Title"
                        className='textInputs'
                        required
                        value={newMovie.title}
                        onChange={handleNewMovie('title')}
                    >
                    </input></label>
                    {/* {newMovie.title} */}
                </div>

                <div>
                    <label><input
                        type='text'
                        placeholder="picture.jpg"
                        className='textInputs'
                        required
                        value={newMovie.poster}
                        onChange={handleNewMovie('poster')}
                    >
                    </input></label>
                    {/* {newMovie.poster} */}
                </div>

                <div>
                    <label><textarea
                        type='text'
                        id='add-description'
                        className='textInputs'
                        placeholder="Description here..."
                        required
                        value={newMovie.description}
                        onChange={handleNewMovie('description')}
                    >
                    </textarea></label>
                    {/* {newMovie.description} */}
                </div>

                <div>
                    <h4>Select Genre</h4>

                    <select
                        value={newMovie.genre}
                        onChange={handleNewMovie('genre_id')}
                        name="genreType"
                        className='textInputs'
                        required
                    >
                        {props.genreDropdown.map((genre) =>
                            <option
                                key={genre.id}
                                value={genre.id}
                            >{genre.name}</option>
                        )}
                    </select>
                    {/* {newMovie.genre_id} */}

                </div>



            </div>


            <div id='addSidebar-div'>

                <div>
                    <button
                        onClick={backToMovies}
                        className='normalButton'
                    >Back to Movies</button>
                </div>

            </div>






        </div>
    )
}