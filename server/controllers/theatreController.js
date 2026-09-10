const Theatre = require('../models/Theatre');

// @desc    Get all theatres, optionally filter by city
// @route   GET /api/theatres
const getTheatres = async (req, res) => {
  try {
    const { city } = req.query;
    let query = {};
    if (city) {
      query.city = { $regex: new RegExp(`^${city}$`, 'i') };
    }
    const theatres = await Theatre.find(query);
    res.json(theatres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get unique cities where theatres exist
// @route   GET /api/theatres/cities
const getCities = async (req, res) => {
  try {
    const cities = await Theatre.distinct('city');
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new theatre (Admin)
// @route   POST /api/theatres
const createTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.create(req.body);
    res.status(201).json(theatre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getTheatres, getCities, createTheatre };
