const express = require('express');
const router = express.Router();
const { lockSeats, confirmBooking, getMyBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.post('/lock', protect, lockSeats);
router.post('/confirm', protect, confirmBooking);
router.get('/my-bookings', protect, getMyBookings);

module.exports = router;
