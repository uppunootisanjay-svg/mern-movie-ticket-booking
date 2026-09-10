const mongoose = require('mongoose');

const snackItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true }
});

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
  snacks: [snackItemSchema],
  ticketAmount: {
    type: Number,
    required: true
  },
  convenienceFee: {
    type: Number,
    default: 0
  },
  gst: {
    type: Number,
    default: 0
  },
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
    transactionId: { type: String },
    upiId: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
