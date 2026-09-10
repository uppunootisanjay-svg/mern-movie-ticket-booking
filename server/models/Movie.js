const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Movie title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Movie description is required']
  },
  genre: [{
    type: String,
    trim: true
  }],
  language: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  posterUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800'
  },
  rating: {
    type: Number,
    default: 8.5
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
