import React, { useState, useEffect } from 'react';
import { apiClient } from '../api/client';
import MovieCard from '../components/MovieCard';
import { Search, MapPin, Sparkles, RefreshCw } from 'lucide-react';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const moviesData = await apiClient('/movies');
      setMovies(moviesData);

      const citiesData = await apiClient('/theatres/cities');
      setCities(citiesData);
    } catch (err) {
      setError(err.message || 'Connecting to backend... Render free tier may take ~30s to wake up on first visit.');
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

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <div style={{ display: 'inline-block', width: '36px', height: '36px', border: '3px solid rgba(248,68,100,0.3)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '1rem' }} />
            <p>Loading cinema schedules and BookMyShow posters...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger" style={{ textAlign: 'center', padding: '2rem', maxWidth: '600px', margin: '2rem auto' }}>
            <p style={{ marginBottom: '1rem', fontSize: '1rem' }}>{error}</p>
            <button onClick={fetchData} className="btn btn-primary">
              <RefreshCw size={16} /> Retry Connection
            </button>
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
