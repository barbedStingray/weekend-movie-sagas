const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


// GET route
router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })
});

// GET movie details /details
router.get('/details/:id', (req, res) => {
  console.log(`getting details by id`, req.params.id);


  const queryText = `SELECT 
	"movies"."id",
	"movies"."title",
	"movies"."description",
	"movies"."poster"

FROM "movies" 
WHERE "movies"."id" = $1

;`;

  pool.query(queryText, [req.params.id])
    .then((result) => {
      console.log(`success GET`);
      console.log(`results:`, result.rows);
      res.send(result.rows);
    }).catch((error) => {
      console.log(`error in GET details`);
      res.sendStatus(500);
    });
})

// get Genres here








// POST
router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
    .then(result => {
      console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
      console.log(`request body`, req.body);
      console.log('genre_id:', req.body.genre_id);

      const createdMovieId = result.rows[0].id

      // Now handle the genre reference
      const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

      // Catch for first query
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
})






// PUT route /api/movie/edit
router.put('/edit', (req, res) => {
  console.log(`requestPUT body:`, req.body);

  const movieQuery = `
  UPDATE "movies"
    SET "title" = $1, "poster" = $2, "description" = $3 
    WHERE "id" = $4;`;  

  pool.query(movieQuery, [req.body.title, req.body.poster, req.body.description, req.body.id])
    .then((result) => {

      // handle genre query here

      // handle genre query here
      res.sendStatus(201);
    }).catch((error) => {
        console.log(`error in PUT /edit movie`);
        res.sendStatus(500);
    });
});

module.exports = router;