const express = require('express');
const router = express.Router();
const { getMovies, getMovieById, createMovie, deleteMovie } = require('../controllers/movieController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/')
  .get(getMovies)
  .post(protect, adminOnly, createMovie);

router.route('/:id')
  .get(getMovieById)
  .delete(protect, adminOnly, deleteMovie);

module.exports = router;
