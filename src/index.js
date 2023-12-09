import { BrowserRouter } from 'react-router-dom';


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';


// Create the rootSaga generator function
function* rootSaga() {
    yield takeLatest('FETCH_MOVIES', fetchAllMovies);
    yield takeLatest('FETCH_DETAILS_PAGE', fetchDetailsPage);
    yield takeLatest('FETCH_DETAILS_GENRE', fetchDetailsGenre);
    yield takeLatest('ADD_NEW_MOVIE', addNewMovie);
    yield takeLatest('FETCH_SELECT_GENRE_MENU', fetchGenreMenu);
    yield takeLatest('UPDATE_DETAILS_MOVIE', updateDetailsMovie);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
}


function* fetchDetailsPage(action) {
    try {
        const results = yield axios.get(`/api/movie/details/${action.payload}`);
        console.log(`getting details response:`, results.data);
        yield put({ type: 'SET_DETAILS', payload: results.data });


    } catch (error) {
        console.log(`error in get details`, error);
        alert(`error in details gET`);
    }
}

// set Genres generator
function* fetchDetailsGenre(action) {
    try {
        const results = yield axios.get(`/api/genre/details/${action.payload}`);
        console.log(`getting details response:`, results.data);
        yield put({ type: 'SET_GENRES', payload: results.data });


    } catch (error) {
        console.log(`error in get details`, error);
        alert(`error in details gET`);
    }
}

// fetch the Genre dropdown menu
function* fetchGenreMenu() {
    try {
        const genres = yield axios.get('/api/genre/menu');
        console.log(`genres results`, genres.data);
        yield put({ type: 'SET_GENRE_DROPDOWN', payload: genres.data });

    } catch (error) {
        console.log(`error in fetching dropdown genres`, error);
        alert(`something went wrong`);
    }
}

// PUT route update details of a movie
function* updateDetailsMovie(action) {
    try {
        yield axios.put(`/api/movie/edit`, action.payload);
        yield put({ type: 'FETCH_MOVIES' });

    } catch (error) {
        console.log(`error in updating single ${action.payload.id} movie`, error);
        alert(`something went wrong`);
    }
}





// POST new movie
function* addNewMovie(action) {
    try {
        yield axios.post('/api/movie', action.payload);
        yield put({ type: 'FETCH_MOVIES' });

    } catch (error) {
        console.log(`error in POST addNewMovie`, error);
        alert(`error in POST addNewMovie`);
    }
}




// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to display details of a movie
const detailsMovie = (state = [], action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// genres dropdown menu
const genreDropdown = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRE_DROPDOWN':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        detailsMovie,
        genres,
        genreDropdown
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={storeInstance}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
