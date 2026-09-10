const Show = require('../models/Show');
const Booking = require('../models/Booking');

// Helper to generate unique booking code in BookMyShow style (e.g. BMS-HYD-98421)
const generateBookingCode = () => {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `BMS-HYD-${num}`;
};

// @desc    Lock selected seats temporarily (7 minutes) to prevent concurrent bookings
// @route   POST /api/bookings/lock
const lockSeats = async (req, res) => {
  try {
    const { showId, seatIds } = req.body;
    const userId = req.user._id;

    if (!showId || !seatIds || !seatIds.length) {
      return res.status(400).json({ message: 'Show ID and seat IDs are required' });
    }

    const show = await Show.findById(showId);
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    // First purge expired locks
    show.releaseExpiredLocks();

    // Check if any of the requested seats are already booked or locked by someone else
    const now = new Date();
    const sevenMinutesAgo = new Date(now.getTime() - 7 * 60 * 1000);

    for (const seatId of seatIds) {
      const seat = show.seats.find(s => s.seatId === seatId);
      if (!seat) {
        return res.status(400).json({ message: `Seat ${seatId} does not exist in this screen layout` });
      }
      if (seat.status === 'booked') {
        return res.status(409).json({ message: `Seat ${seatId} has already been booked by another user.` });
      }
      if (seat.status === 'locked' && seat.lockedBy && seat.lockedBy.toString() !== userId.toString() && seat.lockedAt > sevenMinutesAgo) {
        return res.status(409).json({ message: `Seat ${seatId} is currently reserved by another customer. Try again shortly.` });
      }
    }

    // Apply lock
    seatIds.forEach(seatId => {
      const seat = show.seats.find(s => s.seatId === seatId);
      seat.status = 'locked';
      seat.lockedAt = now;
      seat.lockedBy = userId;
    });

    await show.save();

    res.json({
      message: 'Seats locked successfully for 7 minutes',
      showId,
      seatIds,
      lockedUntil: new Date(now.getTime() + 7 * 60 * 1000)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Confirm booking and finalize ticket purchase
// @route   POST /api/bookings/confirm
const confirmBooking = async (req, res) => {
  try {
    const { showId, seatIds, paymentMethod, snacks = [], upiId } = req.body;
    const userId = req.user._id;

    if (!showId || !seatIds || !seatIds.length) {
      return res.status(400).json({ message: 'Show ID and seat IDs are required' });
    }

    const show = await Show.findById(showId).populate('movie theatre');
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    show.releaseExpiredLocks();

    // Validate that all seats are either locked by this user or available
    let ticketAmount = 0;
    const sevenMinutesAgo = new Date(Date.now() - 7 * 60 * 1000);

    for (const seatId of seatIds) {
      const seat = show.seats.find(s => s.seatId === seatId);
      if (!seat) {
        return res.status(400).json({ message: `Invalid seat ${seatId}` });
      }
      if (seat.status === 'booked') {
        return res.status(409).json({ message: `Seat ${seatId} is already booked` });
      }
      if (seat.status === 'locked' && seat.lockedBy && seat.lockedBy.toString() !== userId.toString() && seat.lockedAt > sevenMinutesAgo) {
        return res.status(409).json({ message: `Lock on seat ${seatId} expired or held by another user` });
      }

      // Calculate price based on seat tier
      const price = show.ticketPrice[seat.seatType] || show.ticketPrice.standard || 200;
      ticketAmount += price;
    }

    // Mark seats as permanently booked
    seatIds.forEach(seatId => {
      const seat = show.seats.find(s => s.seatId === seatId);
      seat.status = 'booked';
      seat.lockedAt = null;
      seat.lockedBy = null;
    });

    await show.save();

    // Calculate snacks amount
    const snacksAmount = snacks.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // BookMyShow standard convenience fee: ₹15 per ticket + 18% GST
    const convenienceFee = Number((seatIds.length * 15.00).toFixed(2));
    const gst = Number((convenienceFee * 0.18).toFixed(2));
    const totalAmount = Number((ticketAmount + snacksAmount + convenienceFee + gst).toFixed(2));

    // Create booking record
    const booking = await Booking.create({
      user: userId,
      show: showId,
      seats: seatIds,
      snacks,
      ticketAmount,
      convenienceFee,
      gst,
      totalAmount,
      bookingCode: generateBookingCode(),
      paymentDetails: {
        method: paymentMethod || 'UPI',
        status: 'PAID',
        transactionId: `TXN${Date.now()}${Math.floor(100 + Math.random() * 900)}`,
        upiId: upiId || 'customer@upi'
      }
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate({
        path: 'show',
        populate: [
          { path: 'movie', select: 'title posterUrl duration language genre rating' },
          { path: 'theatre', select: 'name city address' }
        ]
      });

    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's personal booking history
// @route   GET /api/bookings/my-bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate({
        path: 'show',
        populate: [
          { path: 'movie', select: 'title posterUrl duration language genre rating' },
          { path: 'theatre', select: 'name city address' }
        ]
      })
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { lockSeats, confirmBooking, getMyBookings };
