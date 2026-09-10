# 🎬 CinePass - Online Movie Ticket Booking System (MERN Stack)

A production-ready, full-stack online movie ticket booking platform developed strictly with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). It features real-time seat status synchronization, an atomic concurrency seat-locking mechanism (preventing double booking), JWT-based user authentication, and interactive cinema screen layouts.

---

## 🚀 Key Features

* **Real-Time Seat Locking & Concurrency Control:** Prevents race conditions where two users attempt to purchase the same seat simultaneously. Seats are held with a 7-minute TTL lock window before automatic release.
* **Interactive Cinema Seat Matrix:** Visual auditorium seating with distinction between standard and premium tiers, responsive selection, and status indicators (Available, Selected, Reserved, Booked).
* **Movie & Show Scheduling Engine:** Browse by city, theatre, release date, genre, and search keywords.
* **Complete Booking Flow:** Movie details ➔ Showtime selection ➔ Interactive seat picker ➔ Dynamic summary (base price + 18% GST + convenience fee) ➔ Mock checkout ➔ Confirmed e-ticket with unique booking code.
* **User Authentication & Role Management:** Secure signup/login using bcrypt password hashing and JWT authentication tokens.
* **My Bookings Dashboard:** View past tickets, auditorium information, and status.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, React Router v6, Lucide Icons, Pure CSS3 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB & Mongoose ODM |
| **Security** | JSON Web Tokens (JWT), Bcrypt.js, CORS |

---

## 📂 Project Architecture

```text
mern-movie-booking/
├── client/                      # React Frontend (Vite)
│   ├── src/
│   │   ├── api/client.js        # API connector with auth header
│   │   ├── components/          # Navbar, MovieCard, SeatGrid
│   │   ├── context/             # AuthContext (JWT session state)
│   │   ├── pages/               # Home, MovieDetail, SeatSelection, Summary, Confirmed, Bookings, Auth
│   │   ├── App.jsx              # Application router
│   │   └── index.css            # Dark cinema-themed styles
│   ├── package.json
│   └── vite.config.js
│
├── server/                      # Node.js + Express Backend
│   ├── config/db.js             # Mongoose MongoDB connection
│   ├── controllers/             # Auth, Movies, Theatres, Shows, Bookings
│   ├── middleware/              # JWT auth and error handling
│   ├── models/                  # User, Movie, Theatre, Show, Booking
│   ├── routes/                  # RESTful API route definitions
│   ├── seed.js                  # Sample data seeder (Movies, Theatres, Shows)
│   ├── server.js                # Express app entry point
│   ├── .env.example
│   └── package.json
│
├── .gitignore
├── package.json                 # Root script runner
└── README.md
```

---

## 💻 Running the Project in VS Code

### Prerequisites
1. **Node.js** (v18 or higher): Verify with `node -v`
2. **MongoDB**: Local MongoDB instance running on `mongodb://127.0.0.1:27017` or a MongoDB Atlas URI.

### Step 1: Open in VS Code
Open the project directory in VS Code:
```bash
code "/Users/sanjayuppunooti/Documents/cowork /mern-movie-booking"
```

### Step 2: Install Dependencies
Open the VS Code Terminal (`Ctrl + \`` or `Cmd + \``):

```bash
# Install root, backend, and frontend packages
npm run install-all
```
*(Alternatively, navigate to `server/` and run `npm install`, then `client/` and run `npm install`)*

### Step 3: Seed Initial Data
Populate movies, theatres, and showtimes into your MongoDB database:
```bash
npm run seed
```
> **Default Test Accounts:**
> - User: `demo@cinepass.com` / `password123`
> - Admin: `admin@cinepass.com` / `password123`

### Step 4: Run the Application
Open two terminal splits in VS Code:

* **Terminal 1 (Backend Server):**
  ```bash
  cd server
  npm run dev
  ```
  *Server starts at `http://localhost:5001`*

* **Terminal 2 (Frontend Client):**
  ```bash
  cd client
  npm run dev
  ```
  *Client starts at `http://localhost:5173`*

---

## 📡 REST API Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new account | No |
| `POST` | `/api/auth/login` | Login and receive JWT | No |
| `GET` | `/api/auth/profile` | Current user profile | Yes |
| `GET` | `/api/movies` | List all active movies | No |
| `GET` | `/api/movies/:id` | Get movie details | No |
| `GET` | `/api/theatres/cities` | List unique cities | No |
| `GET` | `/api/shows` | Query shows (by movie, city, date) | No |
| `GET` | `/api/shows/:id` | Seat matrix & live availability | No |
| `POST` | `/api/bookings/lock` | Temporarily hold selected seats (7 min) | Yes |
| `POST` | `/api/bookings/confirm` | Finalize ticket purchase | Yes |
| `GET` | `/api/bookings/my-bookings` | View booked tickets history | Yes |

---

## 🔒 Concurrency Strategy

Double booking is prevented using MongoDB atomic updates and seat lock timestamps:
```javascript
// Example: Lock selected seats atomically
const lockResult = await Show.findOneAndUpdate(
  {
    _id: showId,
    "seats.seatId": { $in: selectedSeatIds },
    "seats.status": "available"
  },
  {
    $set: {
      "seats.$[elem].status": "locked",
      "seats.$[elem].lockedAt": new Date(),
      "seats.$[elem].lockedBy": userId
    }
  },
  {
    arrayFilters: [{ "elem.seatId": { $in: selectedSeatIds }, "elem.status": "available" }]
  }
);
```
Expired seat locks are automatically recycled back to `available` after 7 minutes.

---

## 📄 License
MIT License. Built for educational and portfolio demonstration.
