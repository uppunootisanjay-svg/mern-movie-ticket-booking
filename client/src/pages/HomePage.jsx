import React, { useState, useEffect } from 'react';
import { apiClient } from '../api/client';
import MovieCard from '../components/MovieCard';
import { FALLBACK_MOVIES, ALL_CITIES } from '../data/fallbackData';
import { Search, MapPin, Sparkles, Film } from 'lucide-react';

const mergeMovies = (backendMovies, catalogMovies) => {
  if (!Array.isArray(backendMovies) || backendMovies.length === 0) return catalogMovies;
  const map = new Map();
  catalogMovies.forEach(m => map.set(m.title.toLowerCase().trim(), m));
  backendMovies.forEach(m => {
    const key = m.title.toLowerCase().trim();
    if (map.has(key)) {
      map.set(key, { ...map.get(key), ...m });
    } else {
      map.set(key, m);
    }
  });
  return Array.from(map.values());
};

const HomePage = () => {
  const [movies, setMovies] = useState(FALLBACK_MOVIES);
  const [cities, setCities] = useState(ALL_CITIES);
  const [selectedCity, setSelectedCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState('All');

  useEffect(() => {
    const syncBackend = async () => {
      try {
        const moviesData = await apiClient('/movies');
        if (Array.isArray(moviesData) && moviesData.length > 0) {
          // Merge to retain all catalog movies across all languages & genres
          setMovies(mergeMovies(moviesData, FALLBACK_MOVIES));
        }
        const citiesData = await apiClient('/theatres/cities');
        if (Array.isArray(citiesData) && citiesData.length > 0) {
          const mergedCities = Array.from(new Set([...ALL_CITIES, ...citiesData]));
          setCities(mergedCities);
        }
      } catch (err) {
        console.log('Running in client-optimized mode with full cities and cinema data.');
      }
    };

    syncBackend();
  }, []);

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre?.some(g => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
      movie.language?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCity = !selectedCity || selectedCity === 'All Cities' ||
      !movie.cities || movie.cities.some(c => c.toLowerCase() === selectedCity.toLowerCase());

    const matchesLang = selectedLang === 'All' ||
      movie.language?.toLowerCase().includes(selectedLang.toLowerCase());

    return matchesSearch && matchesCity && matchesLang;
  });

  return (
    <div>
      <section className="hero">
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(248, 68, 100, 0.15)', color: 'var(--primary)', padding: '0.4rem 0.9rem', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: '700', marginBottom: '1rem' }}>
            <Sparkles size={16} /> Instant Cinema Booking Platform
          </div>
          <h1>Experience Movies Like Never Before</h1>
          <p>Explore the latest blockbuster releases across all major cities, select your preferred multiplex, and reserve seats in real time.</p>
        </div>
      </section>

      <main className="container" id="movies-section">
        <div className="filter-bar">
          <div style={{ position: 'relative', flex: 2, minWidth: '240px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search movies by title, genre, or language..."
              className="filter-input"
              style={{ paddingLeft: '2.5rem', width: '100%' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
            <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
            <select
              className="filter-select"
              style={{ paddingLeft: '2.5rem', width: '100%', fontWeight: '600' }}
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Language Filter Bar */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.75rem', marginBottom: '2rem' }}>
          {['All', 'Telugu', 'Hindi', 'English', 'Tamil', 'Malayalam', 'Kannada', 'Punjabi', 'Marathi', 'Gujarati'].map(lang => (
            <button
              key={lang}
              onClick={() => setSelectedLang(lang)}
              className={`btn ${selectedLang === lang ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '0.35rem 0.9rem', fontSize: '0.8rem', borderRadius: '2rem', whiteSpace: 'nowrap' }}
            >
              {lang}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Film size={22} className="brand-red" /> Running Movies ({filteredMovies.length})
          </h2>
        </div>

        {filteredMovies.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <h3>No movies found</h3>
            <p style={{ marginTop: '0.5rem' }}>Try selecting "All" or searching with a different title.</p>
          </div>
        ) : (
          <div className="movie-grid">
            {filteredMovies.map(movie => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
