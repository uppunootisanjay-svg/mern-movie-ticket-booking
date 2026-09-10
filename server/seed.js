const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Movie = require('./models/Movie');
const Theatre = require('./models/Theatre');
const Show = require('./models/Show');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/movie_booking_db');
    console.log('MongoDB Connected for Seeding...');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const generateSeats = (rows = 6, cols = 8) => {
  const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seats = [];
  for (let r = 0; r < rows; r++) {
    const rowChar = rowLetters[r];
    const isPremium = r >= rows - 2;
    for (let c = 1; c <= cols; c++) {
      seats.push({
        seatId: `${rowChar}${c}`,
        row: rowChar,
        col: c,
        seatType: isPremium ? 'premium' : 'standard',
        status: 'available'
      });
    }
  }
  return seats;
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Movie.deleteMany();
    await Theatre.deleteMany();
    await Show.deleteMany();

    console.log('Cleared existing collections...');

    // 1. Seed Users
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@cinepass.com',
      password: 'password123',
      role: 'admin'
    });

    const user = await User.create({
      name: 'Demo User',
      email: 'demo@cinepass.com',
      password: 'password123',
      role: 'user'
    });

    console.log('Seeded Users: Admin and Demo User created.');

    // 2. Seed Movies
    const movies = await Movie.insertMany([
      {
        title: 'Interstellar',
        description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity survival.',
        genre: ['Sci-Fi', 'Adventure', 'Drama'],
        language: 'English',
        duration: 169,
        releaseDate: new Date('2024-11-07'),
        posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800',
        rating: 8.7
      },
      {
        title: 'Inception',
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.',
        genre: ['Action', 'Sci-Fi', 'Thriller'],
        language: 'English',
        duration: 148,
        releaseDate: new Date('2024-07-16'),
        posterUrl: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800',
        rating: 8.8
      },
      {
        title: 'Kalki 2898 AD',
        description: 'A modern-day avatar of Vishnu, a Hindu god, who is believed to have descended to the earth to protect the world from evil forces.',
        genre: ['Action', 'Sci-Fi', 'Mythology'],
        language: 'Telugu / Hindi',
        duration: 181,
        releaseDate: new Date('2024-06-27'),
        posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
        rating: 8.2
      },
      {
        title: 'The Dark Knight',
        description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest tests.',
        genre: ['Action', 'Crime', 'Drama'],
        language: 'English',
        duration: 152,
        releaseDate: new Date('2024-07-18'),
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800',
        rating: 9.0
      }
    ]);

    console.log(`Seeded ${movies.length} Movies.`);

    // 3. Seed Theatres
    const theatres = await Theatre.insertMany([
      {
        name: 'PVR Cinemas: Forum Mall',
        city: 'Hyderabad',
        address: 'Kukatpally Housing Board Colony, Hyderabad, Telangana',
        screens: [
          { screenNumber: 1, name: 'Audi 1 (IMAX)', rows: 6, cols: 8 },
          { screenNumber: 2, name: 'Audi 2 (4DX)', rows: 6, cols: 8 }
        ]
      },
      {
        name: 'INOX: GVK One Mall',
        city: 'Hyderabad',
        address: 'Banjara Hills, Hyderabad, Telangana',
        screens: [
          { screenNumber: 1, name: 'Screen 1', rows: 6, cols: 8 }
        ]
      },
      {
        name: 'Cinepolis: Orion Mall',
        city: 'Bengaluru',
        address: 'Rajajinagar, Bengaluru, Karnataka',
        screens: [
          { screenNumber: 1, name: 'Audi 1 (Dolby Atmos)', rows: 6, cols: 8 }
        ]
      }
    ]);

    console.log(`Seeded ${theatres.length} Theatres.`);

    // 4. Seed Shows for today and tomorrow
    const showsToInsert = [];
    const today = new Date();
    today.setHours(11, 30, 0, 0);

    const evening = new Date();
    evening.setHours(18, 45, 0, 0);

    const night = new Date();
    night.setHours(21, 30, 0, 0);

    // Shows for Interstellar
    showsToInsert.push({
      movie: movies[0]._id,
      theatre: theatres[0]._id,
      screenNumber: 1,
      showDateTime: today,
      ticketPrice: { standard: 180, premium: 280 },
      seats: generateSeats(6, 8)
    });

    showsToInsert.push({
      movie: movies[0]._id,
      theatre: theatres[0]._id,
      screenNumber: 1,
      showDateTime: night,
      ticketPrice: { standard: 200, premium: 320 },
      seats: generateSeats(6, 8)
    });

    // Shows for Inception
    showsToInsert.push({
      movie: movies[1]._id,
      theatre: theatres[0]._id,
      screenNumber: 2,
      showDateTime: evening,
      ticketPrice: { standard: 160, premium: 260 },
      seats: generateSeats(6, 8)
    });

    // Shows for Kalki 2898 AD
    showsToInsert.push({
      movie: movies[2]._id,
      theatre: theatres[1]._id,
      screenNumber: 1,
      showDateTime: evening,
      ticketPrice: { standard: 200, premium: 300 },
      seats: generateSeats(6, 8)
    });

    showsToInsert.push({
      movie: movies[3]._id,
      theatre: theatres[2]._id,
      screenNumber: 1,
      showDateTime: night,
      ticketPrice: { standard: 190, premium: 290 },
      seats: generateSeats(6, 8)
    });

    await Show.insertMany(showsToInsert);
    console.log(`Seeded ${showsToInsert.length} Show Schedules.`);

    console.log('-------------------------------------------');
    console.log('Seed Completed Successfully!');
    console.log('Login credentials:');
    console.log('User: demo@cinepass.com / password123');
    console.log('Admin: admin@cinepass.com / password123');
    console.log('-------------------------------------------');

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
