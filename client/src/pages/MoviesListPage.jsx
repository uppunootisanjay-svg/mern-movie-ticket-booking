import React, { useState, useEffect } from 'react';
import { apiClient } from '../api/client';
import MovieCard from '../components/MovieCard';
import { FALLBACK_MOVIES, ALL_CITIES } from '../data/fallbackData';
import { Search, MapPin, Film, SlidersHorizontal, Sparkles } from 'lucide-react';

const LANGUAGES = [
  'All',
  'Telugu',
  'Hindi',
  'English',
  'Tamil',
  'Malayalam',
  'Kannada',
  'Marathi',
  'Bengali',
  'Punjabi',
  'Gujarati'
];

const GENRES = [
  'All',
  'Action',
  'Adventure',
  'Animation',
  'Biography',
  'Comedy',
  'Crime',
  'Drama',
  'Family',
  'Fantasy',
  'Historical',
  'Horror',
  'Mystery',
  'Mythological',
  'Romance',
  'Sci-Fi',
  'Sports',
  'Survival',
  'Thriller'
];

const MoviesListPage = () => {
  const [movies, setMovies] = useState(FALLBACK_MOVIES);
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLiveMovies = async () => {
      try {
        const data = await apiClient('/movies');
        if (Array.isArray(data) && data.length > 0) {
          setMovies(data);
        }
      } catch (err) {
        console.log('Using optimized offline-first movie catalog.');
      }
    };

    fetchLiveMovies();
  }, []);

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre?.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLanguage = selectedLanguage === 'All' ||
      movie.language?.toLowerCase().includes(selectedLanguage.toLowerCase());

    const matchesGenre = selectedGenre === 'All' ||
      movie.genre?.some(g => g.toLowerCase() === selectedGenre.toLowerCase());

    const matchesCity = selectedCity === 'All Cities' ||
      !movie.cities || movie.cities.some(c => c.toLowerCase() === selectedCity.toLowerCase());

    return matchesSearch && matchesLanguage && matchesGenre && matchesCity;
  });

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 6rem' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          <Film size={20} /> ALL MOVIES ACROSS ALL GENRES & LANGUAGES
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: '900', letterSpacing: '-0.02em' }}>
              All Movies ({filteredMovies.length})
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
              Filter by Telugu, Hindi, English, Tamil, Malayalam, Kannada, Punjabi, Marathi, Gujarati & 18+ Genres
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

      {/* Filter Controls */}
      <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2.5rem' }}>
        {/* Search Bar */}
        <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search any title across all languages and genres..."
            className="filter-input"
            style={{ paddingLeft: '2.75rem', width: '100%', fontSize: '0.95rem' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* All Languages Filter Chips */}
        <div style={{ marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700', display: 'block', marginBottom: '0.5rem' }}>
            Filter by Language ({LANGUAGES.length - 1} Languages):
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {LANGUAGES.map(lang => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`btn ${selectedLanguage === lang ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '0.35rem 0.9rem', fontSize: '0.8rem', borderRadius: '2rem' }}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* All Genres Filter Chips */}
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700', display: 'block', marginBottom: '0.5rem' }}>
            Filter by Genre ({GENRES.length - 1} Genres):
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {GENRES.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`btn ${selectedGenre === genre ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '0.35rem 0.9rem', fontSize: '0.8rem', borderRadius: '2rem' }}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      {filteredMovies.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', background: 'var(--bg-card)', borderRadius: '1rem', border: '1px solid var(--border)' }}>
          <Film size={40} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
          <h3>No movies match the selected filters</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            Try choosing a different language or genre combination
          </p>
          <button
            onClick={() => { setSelectedLanguage('All'); setSelectedGenre('All'); setSelectedCity('All Cities'); setSearchQuery(''); }}
            className="btn btn-primary"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="movie-grid">
          {filteredMovies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesListPage;
