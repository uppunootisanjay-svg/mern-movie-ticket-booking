const express = require('express');
const router = express.Router();
const { getShows, getShowById, createShow } = require('../controllers/showController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/')
  .get(getShows)
  .post(protect, adminOnly, createShow);

router.get('/:id', getShowById);

module.exports = router;
