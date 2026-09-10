const Show = require('../models/Show');
const Theatre = require('../models/Theatre');

// @desc    Get shows filtered by movieId, date, or city
// @route   GET /api/shows
const getShows = async (req, res) => {
  try {
    const { movieId, date, city } = req.query;
    let query = {};

    if (movieId) {
      query.movie = movieId;
    }

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      query.showDateTime = { $gte: startOfDay, $lte: endOfDay };
    }

    let shows = await Show.find(query)
      .populate('movie', 'title posterUrl duration language genre')
      .populate('theatre', 'name city address')
      .sort({ showDateTime: 1 });

    if (city) {
      shows = shows.filter(show => 
        show.theatre && show.theatre.city.toLowerCase() === city.toLowerCase()
      );
    }

    res.json(shows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get show details with seat matrix & release expired locks
// @route   GET /api/shows/:id
const getShowById = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id)
      .populate('movie', 'title posterUrl duration language genre rating')
      .populate('theatre', 'name city address');

    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    // Clean up any expired locks
    const hasExpiredLocks = show.releaseExpiredLocks();
    if (hasExpiredLocks) {
      await show.save();
    }

    res.json(show);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new show with generated seat grid (Admin)
// @route   POST /api/shows
const createShow = async (req, res) => {
  try {
    const { movieId, theatreId, screenNumber, showDateTime, ticketPrice } = req.body;

    const theatre = await Theatre.findById(theatreId);
    if (!theatre) {
      return res.status(404).json({ message: 'Theatre not found' });
    }

    const screen = theatre.screens.find(s => s.screenNumber === Number(screenNumber)) || { rows: 6, cols: 8 };

    // Generate seats grid
    const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'];
    const seats = [];

    for (let r = 0; r < screen.rows; r++) {
      const rowChar = rowLetters[r] || `R${r + 1}`;
      const isPremium = r >= screen.rows - 2; // Last 2 rows are premium
      for (let c = 1; c <= screen.cols; c++) {
        seats.push({
          seatId: `${rowChar}${c}`,
          row: rowChar,
          col: c,
          seatType: isPremium ? 'premium' : 'standard',
          status: 'available'
        });
      }
    }

    const show = await Show.create({
      movie: movieId,
      theatre: theatreId,
      screenNumber,
      showDateTime,
      ticketPrice: ticketPrice || { standard: 150, premium: 250 },
      seats
    });

    res.status(201).json(show);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getShows, getShowById, createShow };
