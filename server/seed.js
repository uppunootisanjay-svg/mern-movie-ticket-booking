const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Movie = require('./models/Movie');
const Theatre = require('./models/Theatre');
const Show = require('./models/Show');

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/movie_booking_db');
    console.log(`MongoDB Connected for Seeding: ${conn.connection.host}`);
  } catch (err) {
    console.error(`DB Connection Error: ${err.message}`);
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

    // Reset collections
    await User.deleteMany();
    await Movie.deleteMany();
    await Theatre.deleteMany();
    await Show.deleteMany();

    console.log('Cleared existing database records...');

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

    console.log('✓ Users created: demo@cinepass.com / password123');

    // 2. Seed Real BookMyShow Running Movies with Exact Official CDN Posters
    const movies = await Movie.insertMany([
      {
        title: 'Pushpa 2: The Rule',
        description: 'Pushpa Raj expands his red sandalwood empire into international waters while facing off against SP Bhanwar Singh Shekhawat in an explosive showdown.',
        genre: ['Action', 'Thriller', 'Drama'],
        language: 'Telugu / Hindi',
        duration: 200,
        releaseDate: new Date('2024-12-05'),
        posterUrl: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pushpa-2-the-rule-et00421959-1737184834.jpg',
        rating: 8.5
      },
      {
        title: 'Kalki 2898 AD',
        description: 'Set in a dystopian post-apocalyptic future in Kasi, a bounty hunter named Bhairava and Ashwatthama clash over the unborn child who will become the Kalki avatar.',
        genre: ['Action', 'Sci-Fi', 'Mythology'],
        language: 'Telugu / Hindi',
        duration: 181,
        releaseDate: new Date('2024-06-27'),
        posterUrl: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kalki-2898-ad-et00402192-1718885399.jpg',
        rating: 8.4
      },
      {
        title: 'Stree 2: Sarkate Ka Aatank',
        description: 'The peaceful town of Chanderi faces a terrifying new headless evil spirit known as Sarkata, who abducts women. Vicky and his gang reunite with Stree to defeat him.',
        genre: ['Comedy', 'Horror'],
        language: 'Hindi',
        duration: 147,
        releaseDate: new Date('2024-08-15'),
        posterUrl: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/stree-2-et00364249-1721725490.jpg',
        rating: 8.6
      },
      {
        title: 'Mirzapur: The Movie',
        description: 'The intense, power-hungry war for control of the underworld and the throne of Purvanchal explodes onto the big screen with Kaleen Bhaiya and Guddu Pandit.',
        genre: ['Action', 'Crime', 'Drama'],
        language: 'Hindi',
        duration: 155,
        releaseDate: new Date('2025-01-10'),
        posterUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008/et00417686-slhjzpafpd-portrait.jpg',
        rating: 8.8
      },
      {
        title: 'Hanu-Man',
        description: 'A young man in the village of Anjanadri accidentally discovers an ancient solar gem that grants him the divine powers of Lord Hanuman to defend his people.',
        genre: ['Action', 'Adventure', 'Fantasy'],
        language: 'Telugu',
        duration: 158,
        releaseDate: new Date('2024-01-12'),
        posterUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008/et00515338-hfermmaflw-portrait.jpg',
        rating: 8.7
      },
      {
        title: 'Sardar 2',
        description: 'Agent Chandra Bose returns for another globe-trotting espionage mission to uncover an international bio-chemical conspiracy targeting critical water reserves.',
        genre: ['Action', 'Spy', 'Thriller'],
        language: 'Telugu / Tamil',
        duration: 162,
        releaseDate: new Date('2025-03-20'),
        posterUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008/et00502829-mctejadlra-portrait.jpg',
        rating: 8.3
      }
    ]);

    console.log(`✓ Seeded ${movies.length} Real BookMyShow Movies with exact posters.`);

    // 3. Seed Real BookMyShow Hyderabad Theatres
    const theatres = await Theatre.insertMany([
      {
        name: 'AMB Cinemas: Gachibowli',
        city: 'Hyderabad',
        address: 'Sarath City Capital Mall, Gachibowli - Miyapur Road, Hyderabad, Telangana',
        screens: [
          { screenNumber: 1, name: 'Screen 1 (Laser 4K)', rows: 6, cols: 8 },
          { screenNumber: 2, name: 'Screen 2 (Dolby Atmos)', rows: 6, cols: 8 }
        ]
      },
      {
        name: 'Prasads Multiplex: Necklace Road',
        city: 'Hyderabad',
        address: 'NTR Gardens, Khairatabad, Hyderabad, Telangana',
        screens: [
          { screenNumber: 1, name: 'Large Screen (IMAX Experience)', rows: 6, cols: 8 }
        ]
      },
      {
        name: 'PVR: Atrium Mall, Gachibowli',
        city: 'Hyderabad',
        address: 'Survey No 136, 4th Floor, Atrium Mall, Gachibowli, Hyderabad, Telangana',
        screens: [
          { screenNumber: 1, name: 'PVR P[XL] Audi 1', rows: 6, cols: 8 }
        ]
      },
      {
        name: 'Asian Radhika Multiplex: ECIL',
        city: 'Hyderabad',
        address: 'Dr. AS Rao Nagar Road, ECIL, Kapra, Secunderabad, Telangana',
        screens: [
          { screenNumber: 1, name: 'Screen 1 (Dolby 7.1)', rows: 6, cols: 8 }
        ]
      }
    ]);

    console.log(`✓ Seeded ${theatres.length} Hyderabad Theatres.`);

    // 4. Generate Live Shows for Today and Tomorrow across theatres
    const showsToInsert = [];
    const morning = new Date();
    morning.setHours(11, 15, 0, 0);

    const matinee = new Date();
    matinee.setHours(14, 30, 0, 0);

    const evening = new Date();
    evening.setHours(18, 45, 0, 0);

    const night = new Date();
    night.setHours(21, 45, 0, 0);

    // Pushpa 2 at AMB Cinemas and Prasads
    showsToInsert.push({
      movie: movies[0]._id,
      theatre: theatres[0]._id,
      screenNumber: 1,
      showDateTime: morning,
      ticketPrice: { standard: 250, premium: 350 },
      seats: generateSeats(6, 8)
    });

    showsToInsert.push({
      movie: movies[0]._id,
      theatre: theatres[0]._id,
      screenNumber: 1,
      showDateTime: evening,
      ticketPrice: { standard: 295, premium: 395 },
      seats: generateSeats(6, 8)
    });

    showsToInsert.push({
      movie: movies[0]._id,
      theatre: theatres[1]._id,
      screenNumber: 1,
      showDateTime: night,
      ticketPrice: { standard: 250, premium: 350 },
      seats: generateSeats(6, 8)
    });

    // Kalki 2898 AD at Prasads and PVR
    showsToInsert.push({
      movie: movies[1]._id,
      theatre: theatres[1]._id,
      screenNumber: 1,
      showDateTime: matinee,
      ticketPrice: { standard: 250, premium: 350 },
      seats: generateSeats(6, 8)
    });

    showsToInsert.push({
      movie: movies[1]._id,
      theatre: theatres[2]._id,
      screenNumber: 1,
      showDateTime: evening,
      ticketPrice: { standard: 220, premium: 320 },
      seats: generateSeats(6, 8)
    });

    // Stree 2 at PVR and Asian Radhika
    showsToInsert.push({
      movie: movies[2]._id,
      theatre: theatres[2]._id,
      screenNumber: 1,
      showDateTime: night,
      ticketPrice: { standard: 200, premium: 300 },
      seats: generateSeats(6, 8)
    });

    showsToInsert.push({
      movie: movies[2]._id,
      theatre: theatres[3]._id,
      screenNumber: 1,
      showDateTime: evening,
      ticketPrice: { standard: 175, premium: 250 },
      seats: generateSeats(6, 8)
    });

    // Mirzapur: The Movie at AMB Cinemas
    showsToInsert.push({
      movie: movies[3]._id,
      theatre: theatres[0]._id,
      screenNumber: 2,
      showDateTime: night,
      ticketPrice: { standard: 295, premium: 395 },
      seats: generateSeats(6, 8)
    });

    // Hanu-Man at Asian Radhika
    showsToInsert.push({
      movie: movies[4]._id,
      theatre: theatres[3]._id,
      screenNumber: 1,
      showDateTime: matinee,
      ticketPrice: { standard: 150, premium: 200 },
      seats: generateSeats(6, 8)
    });

    // Sardar 2 at AMB Cinemas
    showsToInsert.push({
      movie: movies[5]._id,
      theatre: theatres[0]._id,
      screenNumber: 2,
      showDateTime: evening,
      ticketPrice: { standard: 250, premium: 350 },
      seats: generateSeats(6, 8)
    });

    await Show.insertMany(showsToInsert);
    console.log(`✓ Seeded ${showsToInsert.length} Show Schedules.`);

    console.log('---------------------------------------------------------');
    console.log('BookMyShow Cinema Data Loaded Successfully!');
    console.log('Sample User Login: demo@cinepass.com / password123');
    console.log('Admin User Login:  admin@cinepass.com / password123');
    console.log('---------------------------------------------------------');

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
