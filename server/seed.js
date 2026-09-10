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
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`DB Connection Error: ${err.message}`);
    process.exit(1);
  }
};

// Generates a realistic 3-tier BookMyShow Cinema Layout (Classic, Standard, Premium, Recliner)
const generateRealisticSeats = (rows = 8, cols = 10) => {
  const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seats = [];

  for (let r = 0; r < rows; r++) {
    const rowChar = rowLetters[r];
    let seatType = 'standard';

    if (r < 2) {
      seatType = 'classic';      // Rows A, B (₹175)
    } else if (r < 5) {
      seatType = 'standard';     // Rows C, D, E (₹220)
    } else if (r < 7) {
      seatType = 'premium';      // Rows F, G (₹295)
    } else {
      seatType = 'recliner';     // Row H (₹450)
    }

    for (let c = 1; c <= cols; c++) {
      // Simulate realistic occupied seats (randomly 15% booked)
      const isPreBooked = Math.random() < 0.15;

      seats.push({
        seatId: `${rowChar}${c}`,
        row: rowChar,
        col: c,
        seatType,
        status: isPreBooked ? 'booked' : 'available'
      });
    }
  }
  return seats;
};

const seedData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Movie.deleteMany();
    await Theatre.deleteMany();
    await Show.deleteMany();

    console.log('Cleared existing database records...');

    // 1. Seed Demo Accounts
    await User.create({
      name: 'Admin User',
      email: 'admin@cinepass.com',
      password: 'password123',
      role: 'admin'
    });

    await User.create({
      name: 'Demo User',
      email: 'demo@cinepass.com',
      password: 'password123',
      role: 'user'
    });

    console.log('✓ Created users: demo@cinepass.com & admin@cinepass.com');

    // 2. Seed Real BookMyShow Movies with Trailers & Ratings
    const movies = await Movie.insertMany([
      {
        title: 'Pushpa 2: The Rule',
        description: 'Pushpa Raj expands his red sandalwood empire into international waters while facing off against SP Bhanwar Singh Shekhawat in an explosive showdown.',
        genre: ['Action', 'Thriller', 'Drama'],
        language: 'Telugu / Hindi',
        duration: 200,
        releaseDate: new Date('2024-12-05'),
        posterUrl: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pushpa-2-the-rule-et00421959-1737184834.jpg',
        trailerUrl: 'https://www.youtube.com/embed/gPn_UuW8pB8',
        rating: 8.9,
        votes: '480K+'
      },
      {
        title: 'Kalki 2898 AD',
        description: 'Set in a dystopian post-apocalyptic future in Kasi, a bounty hunter named Bhairava and Ashwatthama clash over the unborn child who will become the Kalki avatar.',
        genre: ['Action', 'Sci-Fi', 'Mythology'],
        language: 'Telugu / Hindi',
        duration: 181,
        releaseDate: new Date('2024-06-27'),
        posterUrl: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kalki-2898-ad-et00402192-1718885399.jpg',
        trailerUrl: 'https://www.youtube.com/embed/kQDd1AhGIHk',
        rating: 8.5,
        votes: '350K+'
      },
      {
        title: 'Stree 2: Sarkate Ka Aatank',
        description: 'The peaceful town of Chanderi faces a terrifying new headless evil spirit known as Sarkata, who abducts women. Vicky and his gang reunite with Stree to defeat him.',
        genre: ['Comedy', 'Horror'],
        language: 'Hindi',
        duration: 147,
        releaseDate: new Date('2024-08-15'),
        posterUrl: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/stree-2-et00364249-1721725490.jpg',
        trailerUrl: 'https://www.youtube.com/embed/KVnheRhhLog',
        rating: 8.6,
        votes: '290K+'
      },
      {
        title: 'Mirzapur: The Movie',
        description: 'The intense, power-hungry war for control of the underworld and the throne of Purvanchal explodes onto the big screen with Kaleen Bhaiya and Guddu Pandit.',
        genre: ['Action', 'Crime', 'Drama'],
        language: 'Hindi',
        duration: 155,
        releaseDate: new Date('2025-01-10'),
        posterUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008/et00417686-slhjzpafpd-portrait.jpg',
        trailerUrl: 'https://www.youtube.com/embed/ZNeGMk_CW94',
        rating: 8.8,
        votes: '190K+'
      },
      {
        title: 'Hanu-Man',
        description: 'A young man in the village of Anjanadri accidentally discovers an ancient solar gem that grants him the divine powers of Lord Hanuman to defend his people.',
        genre: ['Action', 'Adventure', 'Fantasy'],
        language: 'Telugu',
        duration: 158,
        releaseDate: new Date('2024-01-12'),
        posterUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008/et00515338-hfermmaflw-portrait.jpg',
        trailerUrl: 'https://www.youtube.com/embed/dfnP5d_v_oQ',
        rating: 8.7,
        votes: '220K+'
      },
      {
        title: 'Sardar 2',
        description: 'Agent Chandra Bose returns for another globe-trotting espionage mission to uncover an international bio-chemical conspiracy targeting critical water reserves.',
        genre: ['Action', 'Spy', 'Thriller'],
        language: 'Telugu / Tamil',
        duration: 162,
        releaseDate: new Date('2025-03-20'),
        posterUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008/et00502829-mctejadlra-portrait.jpg',
        trailerUrl: 'https://www.youtube.com/embed/tQ02g3A2uHw',
        rating: 8.3,
        votes: '110K+'
      }
    ]);

    console.log(`✓ Seeded ${movies.length} Movies.`);

    // 3. Seed Real BookMyShow Hyderabad Theatres
    const theatres = await Theatre.insertMany([
      {
        name: 'AMB Cinemas: Gachibowli',
        city: 'Hyderabad',
        address: 'Sarath City Capital Mall, Gachibowli - Miyapur Road, Hyderabad, Telangana',
        screens: [
          { screenNumber: 1, name: 'Screen 1 (Laser 4K Dolby Atmos)', rows: 8, cols: 10 },
          { screenNumber: 2, name: 'Screen 2 (VIP Recliner)', rows: 8, cols: 10 }
        ]
      },
      {
        name: 'Prasads Multiplex: Necklace Road',
        city: 'Hyderabad',
        address: 'NTR Gardens, Khairatabad, Hyderabad, Telangana',
        screens: [
          { screenNumber: 1, name: 'Audi 1 (IMAX Experience)', rows: 8, cols: 10 }
        ]
      },
      {
        name: 'PVR: Atrium Mall, Gachibowli',
        city: 'Hyderabad',
        address: '4th Floor, Atrium Mall, Gachibowli, Hyderabad, Telangana',
        screens: [
          { screenNumber: 1, name: 'PVR P[XL] Audi 1', rows: 8, cols: 10 }
        ]
      },
      {
        name: 'Asian Radhika Multiplex: ECIL',
        city: 'Hyderabad',
        address: 'Dr. AS Rao Nagar Road, ECIL, Kapra, Hyderabad, Telangana',
        screens: [
          { screenNumber: 1, name: 'Screen 1 (Dolby 7.1)', rows: 8, cols: 10 }
        ]
      }
    ]);

    console.log(`✓ Seeded ${theatres.length} Hyderabad Theatres.`);

    // 4. Generate Multi-Day Show Schedules (Today, Tomorrow, Day After)
    const showsToInsert = [];
    const now = new Date();

    for (let dayOffset = 0; dayOffset <= 2; dayOffset++) {
      const showDate = new Date(now);
      showDate.setDate(now.getDate() + dayOffset);

      const morning = new Date(showDate); morning.setHours(10, 45, 0, 0);
      const matinee = new Date(showDate); matinee.setHours(14, 15, 0, 0);
      const evening = new Date(showDate); evening.setHours(18, 30, 0, 0);
      const night = new Date(showDate); night.setHours(21, 45, 0, 0);

      const timeSlots = [morning, matinee, evening, night];

      // Schedule shows for Pushpa 2
      timeSlots.forEach((slot, idx) => {
        showsToInsert.push({
          movie: movies[0]._id,
          theatre: theatres[idx % theatres.length]._id,
          screenNumber: 1,
          format: idx % 2 === 0 ? 'IMAX 2D' : '2D',
          language: 'Telugu',
          showDateTime: slot,
          ticketPrice: { classic: 175, standard: 250, premium: 350, recliner: 450 },
          seats: generateRealisticSeats(8, 10)
        });
      });

      // Schedule shows for Kalki 2898 AD
      [matinee, evening].forEach((slot, idx) => {
        showsToInsert.push({
          movie: movies[1]._id,
          theatre: theatres[1]._id, // Prasads
          screenNumber: 1,
          format: 'IMAX 3D',
          language: 'Telugu',
          showDateTime: slot,
          ticketPrice: { classic: 175, standard: 250, premium: 320, recliner: 450 },
          seats: generateRealisticSeats(8, 10)
        });
      });

      // Schedule shows for Stree 2
      [evening, night].forEach((slot, idx) => {
        showsToInsert.push({
          movie: movies[2]._id,
          theatre: theatres[2]._id, // PVR
          screenNumber: 1,
          format: '2D',
          language: 'Hindi',
          showDateTime: slot,
          ticketPrice: { classic: 160, standard: 220, premium: 300, recliner: 400 },
          seats: generateRealisticSeats(8, 10)
        });
      });

      // Schedule shows for Mirzapur
      [night].forEach(slot => {
        showsToInsert.push({
          movie: movies[3]._id,
          theatre: theatres[0]._id, // AMB Cinemas
          screenNumber: 2,
          format: '2D',
          language: 'Hindi',
          showDateTime: slot,
          ticketPrice: { classic: 180, standard: 250, premium: 350, recliner: 450 },
          seats: generateRealisticSeats(8, 10)
        });
      });

      // Schedule shows for Hanu-Man
      [morning, matinee].forEach((slot, idx) => {
        showsToInsert.push({
          movie: movies[4]._id,
          theatre: theatres[3]._id, // Asian Radhika
          screenNumber: 1,
          format: '2D',
          language: 'Telugu',
          showDateTime: slot,
          ticketPrice: { classic: 140, standard: 190, premium: 250, recliner: 350 },
          seats: generateRealisticSeats(8, 10)
        });
      });

      // Schedule shows for Sardar 2
      [matinee, evening].forEach(slot => {
        showsToInsert.push({
          movie: movies[5]._id,
          theatre: theatres[0]._id, // AMB
          screenNumber: 1,
          format: '2D',
          language: 'Telugu',
          showDateTime: slot,
          ticketPrice: { classic: 175, standard: 250, premium: 320, recliner: 420 },
          seats: generateRealisticSeats(8, 10)
        });
      });
    }

    await Show.insertMany(showsToInsert);
    console.log(`✓ Seeded ${showsToInsert.length} Multi-Day Show Schedules.`);

    console.log('---------------------------------------------------------');
    console.log('Real Cinema Database Ready!');
    console.log('Demo Login: demo@cinepass.com / password123');
    console.log('---------------------------------------------------------');

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
