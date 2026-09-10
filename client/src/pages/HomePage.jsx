import React, { useState, useEffect } from 'react';
import { apiClient } from '../api/client';
import MovieCard from '../components/MovieCard';
import { FALLBACK_MOVIES } from '../data/fallbackData';
import { Search, MapPin, Sparkles, Wifi } from 'lucide-react';

const HomePage = () => {
  const [movies, setMovies] = useState(FALLBACK_MOVIES);
  const [cities, setCities] = useState(['Hyderabad']);
  const [selectedCity, setSelectedCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLiveConnected, setIsLiveConnected] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const moviesData = await apiClient('/movies');
      if (Array.isArray(moviesData) && moviesData.length > 0) {
        setMovies(moviesData);
        setIsLiveConnected(true);
      } else {
        setMovies(FALLBACK_MOVIES);
      }

      const citiesData = await apiClient('/theatres/cities');
      if (Array.isArray(citiesData) && citiesData.length > 0) {
        setCities(citiesData);
      }
    } catch (err) {
      console.warn('Backend sleeping or offline, loaded high-fidelity cinema data:', err.message);
      // Fallback guarantees the site never appears broken to visitors
      setMovies(FALLBACK_MOVIES);
      setCities(['Hyderabad']);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre?.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div>
      <section className="hero">
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(248, 68, 100, 0.15)', color: 'var(--primary)', padding: '0.4rem 0.9rem', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: '700', marginBottom: '1rem' }}>
            <Sparkles size={16} /> Instant Cinema Booking Platform
          </div>
          <h1>Experience Movies Like Never Before</h1>
          <p>Explore the latest blockbuster releases, select your preferred cinema halls, and reserve seats in real time.</p>
        </div>
      </section>

      <main className="container">
        <div className="filter-bar">
          <div style={{ position: 'relative', flex: 2, minWidth: '240px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search movies by title or genre..."
              className="filter-input"
              style={{ paddingLeft: '2.5rem', width: '100%' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
            <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <select
              className="filter-select"
              style={{ paddingLeft: '2.5rem', width: '100%' }}
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredMovies.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <h3>No movies found</h3>
            <p style={{ marginTop: '0.5rem' }}>Try searching with a different keyword.</p>
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
