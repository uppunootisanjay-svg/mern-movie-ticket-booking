// Complete BookMyShow India Cities, Theatres, Movies & Food Data

export const ALL_CITIES = [
  'All Cities',
  'Hyderabad',
  'Bengaluru',
  'Mumbai',
  'Delhi-NCR',
  'Chennai',
  'Pune',
  'Kolkata',
  'Ahmedabad',
  'Chandigarh',
  'Kochi',
  'Visakhapatnam',
  'Vijayawada',
  'Warangal',
  'Nizamabad',
  'Karimnagar',
  'Godavarikhani'
];

export const FALLBACK_MOVIES = [
  {
    _id: 'm1',
    title: 'Pushpa 2: The Rule',
    description: 'Pushpa Raj expands his red sandalwood empire into international waters while facing off against SP Bhanwar Singh Shekhawat in an explosive showdown.',
    genre: ['Action', 'Thriller', 'Drama', 'Crime'],
    language: 'Telugu / Hindi / Tamil',
    duration: 200,
    releaseDate: '2024-12-05',
    posterUrl: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pushpa-2-the-rule-et00421959-1737184834.jpg',
    trailerUrl: 'https://www.youtube.com/embed/gPn_UuW8pB8',
    rating: 8.9,
    votes: '480K+',
    cities: ['Hyderabad', 'Bengaluru', 'Mumbai', 'Delhi-NCR', 'Chennai', 'Visakhapatnam', 'Warangal', 'Godavarikhani']
  },
  {
    _id: 'm2',
    title: 'Devara: Part 1',
    description: 'A fearless chieftain of the coastal lands fights to protect his people from illicit arms smugglers and personal betrayal across the stormy Red Sea.',
    genre: ['Action', 'Drama', 'Thriller'],
    language: 'Telugu / Hindi',
    duration: 177,
    releaseDate: '2024-09-27',
    posterUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008:l-image,i-discovery-catalog@@icons@@pt-v1.png,t-false,lfo-top_right,lx-N0,ly-0,w-200,l-end/et00506432-unrywylcuz-portrait.jpg',
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rating: 8.4,
    votes: '330K+',
    cities: ['Hyderabad', 'Bengaluru', 'Visakhapatnam', 'Vijayawada', 'Warangal', 'Karimnagar']
  },
  {
    _id: 'm3',
    title: 'Kalki 2898 AD',
    description: 'Set in a dystopian post-apocalyptic future in Kasi, a bounty hunter named Bhairava and Ashwatthama clash over the unborn child who will become the Kalki avatar.',
    genre: ['Action', 'Sci-Fi', 'Mythological'],
    language: 'Telugu / Hindi',
    duration: 181,
    releaseDate: '2024-06-27',
    posterUrl: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kalki-2898-ad-et00402192-1718885399.jpg',
    trailerUrl: 'https://www.youtube.com/embed/kQDd1AhGIHk',
    rating: 8.5,
    votes: '350K+',
    cities: ['Hyderabad', 'Bengaluru', 'Mumbai', 'Delhi-NCR', 'Chennai', 'Pune']
  },
  {
    _id: 'm4',
    title: 'Stree 2: Sarkate Ka Aatank',
    description: 'The peaceful town of Chanderi faces a terrifying new headless evil spirit known as Sarkata, who abducts women. Vicky and his gang reunite with Stree to defeat him.',
    genre: ['Comedy', 'Horror'],
    language: 'Hindi',
    duration: 147,
    releaseDate: '2024-08-15',
    posterUrl: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/stree-2-et00364249-1721725490.jpg',
    trailerUrl: 'https://www.youtube.com/embed/KVnheRhhLog',
    rating: 8.6,
    votes: '290K+',
    cities: ['Hyderabad', 'Mumbai', 'Delhi-NCR', 'Bengaluru', 'Pune', 'Ahmedabad', 'Chandigarh']
  },
  {
    _id: 'm5',
    title: 'Sardar 2',
    description: 'Agent Chandra Bose returns for another globe-trotting espionage mission to uncover an international bio-chemical conspiracy targeting critical water reserves.',
    genre: ['Action', 'Thriller'],
    language: 'Tamil / Telugu',
    duration: 162,
    releaseDate: '2025-03-20',
    posterUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008/et00502829-mctejadlra-portrait.jpg',
    trailerUrl: 'https://www.youtube.com/embed/tQ02g3A2uHw',
    rating: 8.3,
    votes: '110K+',
    cities: ['Hyderabad', 'Chennai', 'Bengaluru', 'Visakhapatnam', 'Vijayawada']
  },
  {
    _id: 'm6',
    title: 'Mirzapur: The Movie',
    description: 'The intense, power-hungry war for control of the underworld and the throne of Purvanchal explodes onto the big screen with Kaleen Bhaiya and Guddu Pandit.',
    genre: ['Action', 'Crime', 'Drama'],
    language: 'Hindi',
    duration: 155,
    releaseDate: '2025-01-10',
    posterUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008/et00417686-slhjzpafpd-portrait.jpg',
    trailerUrl: 'https://www.youtube.com/embed/ZNeGMk_CW94',
    rating: 8.8,
    votes: '190K+',
    cities: ['Hyderabad', 'Mumbai', 'Delhi-NCR', 'Pune', 'Kolkata', 'Chandigarh']
  },
  {
    _id: 'm7',
    title: 'Mahendragiri Vaaraahi',
    description: 'A suspenseful ancient archaeological expedition uncovers mythological secrets guarding the divine temple of Mahendragiri against modern thieves.',
    genre: ['Mystery', 'Mythological', 'Thriller'],
    language: 'Telugu',
    duration: 142,
    releaseDate: '2026-09-04',
    posterUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008/et00508816-dmgkqanrha-portrait.jpg',
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rating: 8.2,
    votes: '65K+',
    cities: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Visakhapatnam']
  },
  {
    _id: 'm8',
    title: 'Aavesham',
    description: 'Three college students arriving in Bangalore encounter a quirky, flamboyant local gangster named Ranga who turns their lives into an uproarious roller-coaster.',
    genre: ['Action', 'Comedy'],
    language: 'Malayalam',
    duration: 158,
    releaseDate: '2024-04-11',
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800',
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rating: 8.6,
    votes: '180K+',
    cities: ['Kochi', 'Bengaluru', 'Chennai', 'Hyderabad']
  },
  {
    _id: 'm9',
    title: 'Manjummel Boys',
    description: 'A group of close-knit friends from Kochi embark on a vacation to Kodaikanal, where one slips into the deadly Guna Caves, triggering an extraordinary rescue.',
    genre: ['Adventure', 'Drama', 'Survival', 'Thriller'],
    language: 'Malayalam / Telugu',
    duration: 135,
    releaseDate: '2024-02-22',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rating: 8.8,
    votes: '240K+',
    cities: ['Kochi', 'Hyderabad', 'Bengaluru', 'Chennai', 'Mumbai']
  },
  {
    _id: 'm10',
    title: 'Kantara: Chapter 1',
    description: 'Delving into the ancient origins of the demigod Bhoota Kola ritual and the royal legends of the divine forest spirits of coastal Karnataka.',
    genre: ['Action', 'Mythological', 'Thriller', 'Historical'],
    language: 'Kannada / Telugu / Hindi',
    duration: 165,
    releaseDate: '2025-10-02',
    posterUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008/et00505015-yfyexxggck-portrait.jpg',
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rating: 9.1,
    votes: '420K+',
    cities: ['Bengaluru', 'Hyderabad', 'Mumbai', 'Chennai', 'Pune']
  },
  {
    _id: 'm11',
    title: 'Jatt & Juliet 3',
    description: 'Fateh and Pooja, two police officers from Punjab, travel across the United Kingdom on a chaotic extradition case filled with romance and laughter.',
    genre: ['Romance', 'Comedy', 'Family'],
    language: 'Punjabi',
    duration: 140,
    releaseDate: '2024-06-27',
    posterUrl: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800',
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rating: 8.2,
    votes: '95K+',
    cities: ['Chandigarh', 'Delhi-NCR', 'Mumbai']
  },
  {
    _id: 'm12',
    title: 'Baipan Bhaari Deva',
    description: 'Six estranged sisters reunite to take part in a traditional Mangalagaur dance competition, rediscovering their unbreakable sisterhood and strength.',
    genre: ['Family', 'Comedy', 'Drama'],
    language: 'Marathi',
    duration: 139,
    releaseDate: '2024-06-30',
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800',
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rating: 8.4,
    votes: '110K+',
    cities: ['Mumbai', 'Pune', 'Hyderabad', 'Ahmedabad']
  },
  {
    _id: 'm13',
    title: 'Tekka',
    description: 'An intense high-stakes hostage situation in central Kolkata spirals into a complex political scandal involving undercover agents and media frenzy.',
    genre: ['Crime', 'Mystery', 'Thriller'],
    language: 'Bengali',
    duration: 130,
    releaseDate: '2024-10-08',
    posterUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008/et00513649-xtvvxfgagv-portrait.jpg',
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rating: 8.1,
    votes: '40K+',
    cities: ['Kolkata', 'Delhi-NCR', 'Mumbai']
  },
  {
    _id: 'm14',
    title: 'Kasoombo',
    description: 'The valorous story of 51 brave soldiers led by Dadu Barot who stood valiantly against Alauddin Khilji’s vast invading army to defend the sacred Shatrunjaya hills.',
    genre: ['Historical', 'Action'],
    language: 'Gujarati',
    duration: 145,
    releaseDate: '2024-02-16',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rating: 8.5,
    votes: '52K+',
    cities: ['Ahmedabad', 'Mumbai', 'Pune']
  },
  {
    _id: 'm15',
    title: 'Inside Out 2',
    description: 'Teenager Riley navigates high school with her familiar emotions, only to be surprised by new headquarters guests including Anxiety, Envy, and Ennui.',
    genre: ['Animation', 'Family', 'Comedy'],
    language: 'English / Hindi',
    duration: 96,
    releaseDate: '2024-06-14',
    posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rating: 8.7,
    votes: '310K+',
    cities: ['Hyderabad', 'Bengaluru', 'Mumbai', 'Delhi-NCR', 'Chennai', 'Pune']
  },
  {
    _id: 'm16',
    title: 'Chandu Champion',
    description: 'The triumphant true life journey of Murlikant Petkar, India’s first Paralympic gold medalist, rising against relentless adversity across battlefield and track.',
    genre: ['Biography', 'Sports', 'Drama'],
    language: 'Hindi',
    duration: 143,
    releaseDate: '2024-06-14',
    posterUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC/et00493836-svelcnneeq-portrait.jpg',
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rating: 8.5,
    votes: '140K+',
    cities: ['Mumbai', 'Delhi-NCR', 'Hyderabad', 'Bengaluru', 'Chandigarh']
  },
  {
    _id: 'm17',
    title: 'Hi Nanna',
    description: 'A single father and his precocious daughter find their lives forever transformed when a compassionate woman enters their world with secrets of her own.',
    genre: ['Romance', 'Family', 'Drama'],
    language: 'Telugu / Hindi',
    duration: 155,
    releaseDate: '2023-12-07',
    posterUrl: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800',
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rating: 8.8,
    votes: '280K+',
    cities: ['Hyderabad', 'Visakhapatnam', 'Bengaluru', 'Vijayawada', 'Warangal']
  },
  {
    _id: 'm18',
    title: 'Fall 2: Deadpoint',
    description: 'Two adrenaline-seeking climbers find themselves stranded thousands of feet above sea level with failing ropes and harsh mountain storms.',
    genre: ['Adventure', 'Thriller', 'Survival'],
    language: 'English',
    duration: 110,
    releaseDate: '2026-09-01',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    rating: 7.9,
    votes: '88K+',
    cities: ['Hyderabad', 'Bengaluru', 'Mumbai', 'Delhi-NCR', 'Chennai']
  }
];

// Rich Food & Beverage menu with real high-res photography posters
export const SNACKS_MENU = [
  {
    id: 'f1',
    name: 'Jumbo Butter Popcorn Tub',
    price: 190,
    category: 'Popcorn',
    desc: 'Freshly popped warm gourmet popcorn layered with rich melted dairy butter.',
    posterUrl: 'https://images.unsplash.com/photo-1572177191856-3cde618dee1f?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'f2',
    name: 'Golden Caramel Gourmet Popcorn',
    price: 230,
    category: 'Popcorn',
    desc: 'Crisp mushroom-kernel popcorn coated with artisanal brown sugar caramel glaze.',
    posterUrl: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'f3',
    name: 'Loaded Mexican Cheese Nachos',
    price: 180,
    category: 'Snacks',
    desc: 'Crispy stone-ground corn tortilla chips served with piping hot jalapeño cheese sauce & salsa.',
    posterUrl: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'f4',
    name: 'Blockbuster Combo (Large Popcorn + 2 Drinks)',
    price: 340,
    category: 'Combos',
    desc: 'Best value! 1 Large Salted Butter Popcorn Tub + 2 Chilled Fountain Coca-Cola (500ml).',
    posterUrl: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'f5',
    name: 'Crispy Paneer / Chicken Burger',
    price: 195,
    category: 'Hot Meals',
    desc: 'Crisp spiced patty nestled in toasted sesame brioche with fresh lettuce & spicy chipotle mayo.',
    posterUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'f6',
    name: 'Chilled Fountain Coca-Cola (500ml)',
    price: 90,
    category: 'Beverages',
    desc: 'Refreshing ice-cold carbonated beverage served with lemon twist and crushed ice.',
    posterUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'f7',
    name: 'Crunchy French Fries Basket',
    price: 130,
    category: 'Snacks',
    desc: 'Deep-fried golden potato fries dusted with peri-peri seasoned sea salt and dipping mayo.',
    posterUrl: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80'
  }
];

export const FALLBACK_THEATRES = [
  { _id: 't1', name: 'AMB Cinemas: Gachibowli', city: 'Hyderabad', address: 'Sarath City Capital Mall, Gachibowli - Miyapur Road, Hyderabad' },
  { _id: 't2', name: 'Prasads Multiplex: Necklace Road', city: 'Hyderabad', address: 'NTR Gardens, Khairatabad, Hyderabad' },
  { _id: 't3', name: 'PVR: Atrium Mall, Gachibowli', city: 'Hyderabad', address: '4th Floor, Atrium Mall, Gachibowli, Hyderabad' },
  { _id: 't4', name: 'Asian Radhika Multiplex: ECIL', city: 'Hyderabad', address: 'Dr. AS Rao Nagar Road, ECIL, Kapra, Hyderabad' },
  { _id: 't5', name: 'PVR: Forum Mall, Koramangala', city: 'Bengaluru', address: 'Hosur Road, Koramangala, Bengaluru' },
  { _id: 't6', name: 'Cinepolis: Orion Mall, Rajajinagar', city: 'Bengaluru', address: 'Brigade Gateway, Malleshwaram, Bengaluru' },
  { _id: 't7', name: 'PVR: Phoenix Palladium, Lower Parel', city: 'Mumbai', address: 'Senapati Bapat Marg, Lower Parel, Mumbai' },
  { _id: 't8', name: 'INOX: Megaplex, Malad', city: 'Mumbai', address: 'Inorbit Mall, Malad West, Mumbai' },
  { _id: 't9', name: 'PVR: Select Citywalk, Saket', city: 'Delhi-NCR', address: 'Saket District Centre, New Delhi' },
  { _id: 't10', name: 'PVR: Escape, Express Avenue Mall', city: 'Chennai', address: 'Whites Road, Royapettah, Chennai' },
  { _id: 't11', name: 'Asian Urvasi 70MM: Godavarikhani', city: 'Godavarikhani', address: 'Main Road, Godavarikhani, Telangana' },
  { _id: 't12', name: 'MGM Multiplex: Warangal', city: 'Warangal', address: 'Hunter Road, Warangal, Telangana' },
  { _id: 't13', name: 'Cinepolis: CMR Central, Maddilapalem', city: 'Visakhapatnam', address: 'National Highway 16, Visakhapatnam, AP' },
  { _id: 't14', name: 'PVR: Ripples Mall, MG Road', city: 'Vijayawada', address: 'MG Road, Labbipet, Vijayawada, AP' }
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

export const getFallbackShowsForMovie = (movieId, city = 'Hyderabad') => {
  const movie = FALLBACK_MOVIES.find(m => m._id === movieId) || FALLBACK_MOVIES[0];
  const matchingTheatres = FALLBACK_THEATRES.filter(t => t.city.toLowerCase() === city.toLowerCase());
  const selectedTheatres = matchingTheatres.length > 0 ? matchingTheatres : FALLBACK_THEATRES.slice(0, 3);
  const now = new Date();
  const shows = [];

  [0, 1, 2].forEach(dayOffset => {
    const d = new Date(now);
    d.setDate(now.getDate() + dayOffset);

    const m = new Date(d); m.setHours(10, 45, 0, 0);
    const mat = new Date(d); mat.setHours(14, 15, 0, 0);
    const e = new Date(d); e.setHours(18, 30, 0, 0);
    const n = new Date(d); n.setHours(21, 45, 0, 0);

    selectedTheatres.forEach((theatre, tIdx) => {
      shows.push({
        _id: `s_${movie._id}_${dayOffset}_${tIdx}_1`,
        movie,
        theatre,
        screenNumber: 1,
        format: tIdx === 0 ? 'IMAX 2D' : '2D',
        language: movie.language.split('/')[0].trim(),
        showDateTime: m.toISOString(),
        ticketPrice: { classic: 175, standard: 250, premium: 350, recliner: 450 },
        seats: generateFallbackSeats()
      });

      shows.push({
        _id: `s_${movie._id}_${dayOffset}_${tIdx}_2`,
        movie,
        theatre,
        screenNumber: 1,
        format: '2D',
        language: movie.language.split('/')[0].trim(),
        showDateTime: e.toISOString(),
        ticketPrice: { classic: 175, standard: 250, premium: 350, recliner: 450 },
        seats: generateFallbackSeats()
      });

      shows.push({
        _id: `s_${movie._id}_${dayOffset}_${tIdx}_3`,
        movie,
        theatre,
        screenNumber: 2,
        format: 'Laser 4K',
        language: movie.language.split('/')[0].trim(),
        showDateTime: n.toISOString(),
        ticketPrice: { classic: 160, standard: 220, premium: 320, recliner: 420 },
        seats: generateFallbackSeats()
      });
    });
  });

  return shows;
};
