const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const viewUsers = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/movie_booking_db');
    console.log(`Connected to Database: ${conn.connection.host}\n`);

    const users = await User.find().select('+password');

    if (users.length === 0) {
      console.log('No registered users found in the database. Run "npm run seed" or register via the website.');
    } else {
      console.log(`Found ${users.length} registered user(s):\n`);
      console.table(users.map(u => ({
        Name: u.name,
        Email: u.email,
        Role: u.role,
        HashedPassword: u.password.substring(0, 20) + '...',
        RegisteredAt: u.createdAt.toLocaleString()
      })));
      console.log('\nNote: Passwords are automatically hashed with bcrypt for security.');
    }

    process.exit(0);
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
    process.exit(1);
  }
};

viewUsers();
