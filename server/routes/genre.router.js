const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  res.sendStatus(500)
});


// router to get Genres for reducer
router.get('/details/:id', (req, res) => {
  console.log(`getting details by id`, req.params.id);

  const queryText = `SELECT 
	"genres"."id",
	"genres"."name",
	"movies_genres"."id" AS "movies_genres_id"

FROM "movies"
JOIN "movies_genres" ON "movies_genres"."movie_id" = "movies"."id"
JOIN "genres" ON "genres"."id" = "movies_genres"."genre_id"

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
});

// router to get genres for dropdown menu
router.get('/menu', (req, res) => {
  console.log(`getting genres for dropdown`);

  const queryText = `SELECT * FROM "genres";`;

  pool.query(queryText).then((result) => {
    console.log('success in dropdown results', result.rows);
    res.send(result.rows);
  }).catch((error) => {
    console.log(`error in getting dropdown`);
    res.sendStatus(500);
  });
});


module.exports = router;