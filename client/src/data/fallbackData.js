// High-fidelity fallback data matching BookMyShow Hyderabad real cinema data
// Ensures the app works smoothly on Vercel even when Render free tier is sleeping (cold start)

export const FALLBACK_MOVIES = [
  {
    _id: 'm1',
    title: 'Pushpa 2: The Rule',
    description: 'Pushpa Raj expands his red sandalwood empire into international waters while facing off against SP Bhanwar Singh Shekhawat in an explosive showdown.',
    genre: ['Action', 'Thriller', 'Drama'],
    language: 'Telugu / Hindi',
    duration: 200,
    releaseDate: '2024-12-05',
    posterUrl: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pushpa-2-the-rule-et00421959-1737184834.jpg',
    trailerUrl: 'https://www.youtube.com/embed/gPn_UuW8pB8',
    rating: 8.9,
    votes: '480K+'
  },
  {
    _id: 'm2',
    title: 'Kalki 2898 AD',
    description: 'Set in a dystopian post-apocalyptic future in Kasi, a bounty hunter named Bhairava and Ashwatthama clash over the unborn child who will become the Kalki avatar.',
    genre: ['Action', 'Sci-Fi', 'Mythology'],
    language: 'Telugu / Hindi',
    duration: 181,
    releaseDate: '2024-06-27',
    posterUrl: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kalki-2898-ad-et00402192-1718885399.jpg',
    trailerUrl: 'https://www.youtube.com/embed/kQDd1AhGIHk',
    rating: 8.5,
    votes: '350K+'
  },
  {
    _id: 'm3',
    title: 'Stree 2: Sarkate Ka Aatank',
    description: 'The peaceful town of Chanderi faces a terrifying new headless evil spirit known as Sarkata, who abducts women. Vicky and his gang reunite with Stree to defeat him.',
    genre: ['Comedy', 'Horror'],
    language: 'Hindi',
    duration: 147,
    releaseDate: '2024-08-15',
    posterUrl: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/stree-2-et00364249-1721725490.jpg',
    trailerUrl: 'https://www.youtube.com/embed/KVnheRhhLog',
    rating: 8.6,
    votes: '290K+'
  },
  {
    _id: 'm4',
    title: 'Mirzapur: The Movie',
    description: 'The intense, power-hungry war for control of the underworld and the throne of Purvanchal explodes onto the big screen with Kaleen Bhaiya and Guddu Pandit.',
    genre: ['Action', 'Crime', 'Drama'],
    language: 'Hindi',
    duration: 155,
    releaseDate: '2025-01-10',
    posterUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008/et00417686-slhjzpafpd-portrait.jpg',
    trailerUrl: 'https://www.youtube.com/embed/ZNeGMk_CW94',
    rating: 8.8,
    votes: '190K+'
  },
  {
    _id: 'm5',
    title: 'Hanu-Man',
    description: 'A young man in the village of Anjanadri accidentally discovers an ancient solar gem that grants him the divine powers of Lord Hanuman to defend his people.',
    genre: ['Action', 'Adventure', 'Fantasy'],
    language: 'Telugu',
    duration: 158,
    releaseDate: '2024-01-12',
    posterUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008/et00515338-hfermmaflw-portrait.jpg',
    trailerUrl: 'https://www.youtube.com/embed/dfnP5d_v_oQ',
    rating: 8.7,
    votes: '220K+'
  },
  {
    _id: 'm6',
    title: 'Sardar 2',
    description: 'Agent Chandra Bose returns for another globe-trotting espionage mission to uncover an international bio-chemical conspiracy targeting critical water reserves.',
    genre: ['Action', 'Spy', 'Thriller'],
    language: 'Telugu / Tamil',
    duration: 162,
    releaseDate: '2025-03-20',
    posterUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008/et00502829-mctejadlra-portrait.jpg',
    trailerUrl: 'https://www.youtube.com/embed/tQ02g3A2uHw',
    rating: 8.3,
    votes: '110K+'
  }
];

export const FALLBACK_THEATRES = [
  { _id: 't1', name: 'AMB Cinemas: Gachibowli', city: 'Hyderabad', address: 'Sarath City Capital Mall, Gachibowli - Miyapur Road, Hyderabad' },
  { _id: 't2', name: 'Prasads Multiplex: Necklace Road', city: 'Hyderabad', address: 'NTR Gardens, Khairatabad, Hyderabad' },
  { _id: 't3', name: 'PVR: Atrium Mall, Gachibowli', city: 'Hyderabad', address: '4th Floor, Atrium Mall, Gachibowli, Hyderabad' },
  { _id: 't4', name: 'Asian Radhika Multiplex: ECIL', city: 'Hyderabad', address: 'Dr. AS Rao Nagar Road, ECIL, Kapra, Hyderabad' }
];

export const generateFallbackSeats = () => {
  const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seats = [];

  for (let r = 0; r < 8; r++) {
    const rowChar = rowLetters[r];
    let seatType = 'standard';
    if (r < 2) seatType = 'classic';
    else if (r < 5) seatType = 'standard';
    else if (r < 7) seatType = 'premium';
    else seatType = 'recliner';

    for (let c = 1; c <= 10; c++) {
      const isPreBooked = (r === 3 && c === 4) || (r === 3 && c === 5) || (r === 6 && c === 7);
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

export const getFallbackShowsForMovie = (movieId) => {
  const movie = FALLBACK_MOVIES.find(m => m._id === movieId) || FALLBACK_MOVIES[0];
  const now = new Date();
  const shows = [];

  [0, 1, 2].forEach(dayOffset => {
    const d = new Date(now);
    d.setDate(now.getDate() + dayOffset);

    const m = new Date(d); m.setHours(11, 15, 0, 0);
    const e = new Date(d); e.setHours(18, 45, 0, 0);
    const n = new Date(d); n.setHours(21, 45, 0, 0);

    shows.push({
      _id: `s_${movie._id}_${dayOffset}_1`,
      movie,
      theatre: FALLBACK_THEATRES[0],
      screenNumber: 1,
      format: 'IMAX 2D',
      language: 'Telugu',
      showDateTime: m.toISOString(),
      ticketPrice: { classic: 175, standard: 250, premium: 350, recliner: 450 },
      seats: generateFallbackSeats()
    });

    shows.push({
      _id: `s_${movie._id}_${dayOffset}_2`,
      movie,
      theatre: FALLBACK_THEATRES[1],
      screenNumber: 1,
      format: '2D',
      language: 'Telugu',
      showDateTime: e.toISOString(),
      ticketPrice: { classic: 175, standard: 250, premium: 350, recliner: 450 },
      seats: generateFallbackSeats()
    });

    shows.push({
      _id: `s_${movie._id}_${dayOffset}_3`,
      movie,
      theatre: FALLBACK_THEATRES[2],
      screenNumber: 2,
      format: 'Laser 4K',
      language: 'Hindi',
      showDateTime: n.toISOString(),
      ticketPrice: { classic: 160, standard: 220, premium: 320, recliner: 420 },
      seats: generateFallbackSeats()
    });
  });

  return shows;
};
