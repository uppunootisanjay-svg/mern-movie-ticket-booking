import React, { useState, useEffect } from 'react';
import { apiClient } from '../api/client';
import MovieCard from '../components/MovieCard';
import { Search, MapPin, Sparkles } from 'lucide-react';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const moviesData = await apiClient('/movies');
        setMovies(moviesData);

        const citiesData = await apiClient('/theatres/cities');
        setCities(citiesData);
      } catch (err) {
        setError('Failed to load movies. Make sure your backend server is running.');
      } finally {
        setLoading(false);
      }
    };

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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(229, 9, 20, 0.12)', color: 'var(--primary)', padding: '0.4rem 0.9rem', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: '700', marginBottom: '1rem' }}>
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

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <p>Loading cinema schedules...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger" style={{ textAlign: 'center' }}>
            {error}
          </div>
        ) : filteredMovies.length === 0 ? (
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
