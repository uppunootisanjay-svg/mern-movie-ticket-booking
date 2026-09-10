const mongoose = require('mongoose');

const screenSchema = new mongoose.Schema({
  screenNumber: { type: Number, required: true },
  name: { type: String, default: 'Screen 1' },
  rows: { type: Number, default: 6 },
  cols: { type: Number, default: 8 }
});

const theatreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Theatre name is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
    index: true
  },
  address: {
    type: String,
    required: true
  },
  screens: [screenSchema]
}, { timestamps: true });

module.exports = mongoose.model('Theatre', theatreSchema);
