const express = require('express');
const router = express.Router();
const { getTheatres, getCities, createTheatre } = require('../controllers/theatreController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/')
  .get(getTheatres)
  .post(protect, adminOnly, createTheatre);

router.get('/cities', getCities);

module.exports = router;
