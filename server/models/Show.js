const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatId: { type: String, required: true }, // e.g. "A1", "C4"
  row: { type: String, required: true },
  col: { type: Number, required: true },
  seatType: {
    type: String,
    enum: ['standard', 'premium'],
    default: 'standard'
  },
  status: {
    type: String,
    enum: ['available', 'locked', 'booked'],
    default: 'available'
  },
  lockedAt: { type: Date, default: null },
  lockedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
});

const showSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
    index: true
  },
  theatre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theatre',
    required: true,
    index: true
  },
  screenNumber: {
    type: Number,
    required: true
  },
  showDateTime: {
    type: Date,
    required: true,
    index: true
  },
  ticketPrice: {
    standard: { type: Number, default: 150 },
    premium: { type: Number, default: 250 }
  },
  seats: [seatSchema]
}, { timestamps: true });

// Auto unlock expired seats (older than 7 minutes)
showSchema.methods.releaseExpiredLocks = function() {
  const sevenMinutesAgo = new Date(Date.now() - 7 * 60 * 1000);
  let changed = false;

  this.seats.forEach(seat => {
    if (seat.status === 'locked' && seat.lockedAt && seat.lockedAt < sevenMinutesAgo) {
      seat.status = 'available';
      seat.lockedAt = null;
      seat.lockedBy = null;
      changed = true;
    }
  });

  return changed;
};

module.exports = mongoose.model('Show', showSchema);
