import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FALLBACK_THEATRES, FALLBACK_MOVIES, ALL_CITIES } from '../data/fallbackData';
import { MapPin, Film, Sparkles, Smartphone, Popcorn, Accessibility, Car, Volume2, Monitor } from 'lucide-react';

const TheatresPage = () => {
  const [selectedCity, setSelectedCity] = useState('Hyderabad');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTheatres = FALLBACK_THEATRES.filter(theatre => {
    const matchesCity = selectedCity === 'All Cities' || theatre.city.toLowerCase() === selectedCity.toLowerCase();
    const matchesSearch = theatre.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theatre.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 6rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          <Film size={20} /> CINEMAS & MULTIPLEXES NEAR YOU
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: '900', letterSpacing: '-0.02em' }}>
              Theatres & Multiplexes ({filteredTheatres.length})
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
              Find luxury multiplexes, IMAX auditoriums, and single-screen theatres with available amenities
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={18} style={{ color: 'var(--primary)' }} />
            <select
              className="filter-select"
              style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: '700' }}
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {ALL_CITIES.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Theatres List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {filteredTheatres.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', background: 'var(--bg-card)', borderRadius: '1rem', border: '1px solid var(--border)' }}>
            <h3>No theatres found in {selectedCity}</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Try switching to "Hyderabad", "Bengaluru", or "Mumbai".</p>
          </div>
        ) : (
          filteredTheatres.map(theatre => {
            // Pick sample active movies for this theatre
            const runningMovies = FALLBACK_MOVIES.slice(0, 4);

            return (
              <div key={theatre._id} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '1.25rem',
                padding: '2rem',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>{theatre.name}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '4px' }}>
                      <MapPin size={15} color="var(--primary)" /> {theatre.address}, {theatre.city}
                    </p>
                  </div>

                  {/* Cinema Amenities */}
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', background: 'rgba(255,255,255,0.03)', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <Monitor size={14} color="#60a5fa" /> Laser 4K
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <Volume2 size={14} color="#10b981" /> Dolby Atmos
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <Popcorn size={14} color="#f59e0b" /> F&B Counter
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <Smartphone size={14} color="#ec4899" /> M-Ticket
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <Car size={14} color="#9ca3af" /> Parking
                    </span>
                  </div>
                </div>

                {/* Movies Currently Showing in this Cinema */}
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700', display: 'block', marginBottom: '1rem' }}>
                    NOW SHOWING AT THIS CINEMA:
                  </span>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
                    {runningMovies.map(movie => (
                      <div key={movie._id} style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid var(--border)' }}>
                        <img
                          src={movie.posterUrl}
                          alt={movie.title}
                          style={{ width: '65px', height: '90px', objectFit: 'cover', borderRadius: '0.4rem' }}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                          <strong style={{ fontSize: '0.95rem' }}>{movie.title}</strong>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                            {movie.language} • {movie.genre[0]}
                          </span>
                          <div style={{ marginTop: 'auto', paddingTop: '6px' }}>
                            <Link to={`/movie/${movie._id}`} className="btn btn-primary" style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem', width: '100%' }}>
                              Check Showtimes
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TheatresPage;
