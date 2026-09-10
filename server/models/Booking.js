const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  show: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show',
    required: true
  },
  seats: [{
    type: String,
    required: true
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  bookingStatus: {
    type: String,
    enum: ['confirmed', 'cancelled'],
    default: 'confirmed'
  },
  bookingCode: {
    type: String,
    required: true,
    unique: true
  },
  paymentDetails: {
    method: { type: String, default: 'UPI' },
    status: { type: String, default: 'PAID' },
    transactionId: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
