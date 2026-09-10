import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiClient } from '../api/client';
import { FALLBACK_MOVIES, getFallbackShowsForMovie } from '../data/fallbackData';
import { Star, Clock, Globe, Calendar, MapPin, Play, X, Sparkles, Popcorn, Smartphone } from 'lucide-react';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);

  // Generate 4 calendar days starting from today
  const dates = [0, 1, 2, 3].map(offset => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return {
      day: offset === 0 ? 'TODAY' : offset === 1 ? 'TOM' : d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNum: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
      fullDate: d.toISOString().split('T')[0]
    };
  });

  useEffect(() => {
    const fetchMovieDetailsAndShows = async () => {
      try {
        setLoading(true);
        const movieData = await apiClient(`/movies/${id}`);
        setMovie(movieData);

        const showsData = await apiClient(`/shows?movieId=${id}`);
        setShows(showsData);
      } catch (err) {
        console.warn('Using high-fidelity fallback movie & show data:', err.message);
        const fallbackMovie = FALLBACK_MOVIES.find(m => m._id === id) || FALLBACK_MOVIES[0];
        setMovie(fallbackMovie);
        setShows(getFallbackShowsForMovie(id));
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetailsAndShows();
  }, [id]);

  if (loading) {
    return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading showtimes...</div>;
  }

  if (!movie) {
    return <div className="container" style={{ padding: '4rem 0' }}><div className="alert alert-danger">Movie not found</div></div>;
  }

  // Filter shows by selected date
  const targetDateStr = dates[selectedDateIdx].fullDate;
  const filteredShows = shows.filter(show => {
    const showDateStr = new Date(show.showDateTime).toISOString().split('T')[0];
    return showDateStr === targetDateStr;
  });

  // Group shows by Theatre
  const theatreMap = {};
  const activeShows = filteredShows.length > 0 ? filteredShows : shows.slice(0, 4); // show shows even if dates shift
  activeShows.forEach(show => {
    const theatreId = show.theatre?._id || 'unknown';
    if (!theatreMap[theatreId]) {
      theatreMap[theatreId] = {
        theatre: show.theatre,
        shows: []
      };
    }
    theatreMap[theatreId].shows.push(show);
  });

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 5rem' }}>
      {/* Movie Details Banner */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 320px) 1fr',
        gap: '2.5rem',
        marginBottom: '3rem',
        background: 'var(--bg-card)',
        padding: '2rem',
        borderRadius: '1.25rem',
        border: '1px solid var(--border)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        <div style={{ position: 'relative' }}>
          <img
            src={movie.posterUrl}
            alt={movie.title}
            style={{ width: '100%', borderRadius: '1rem', objectFit: 'cover', height: '440px' }}
          />
          {movie.trailerUrl && (
            <button
              onClick={() => setShowTrailer(true)}
              className="btn"
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0,0,0,0.85)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(6px)',
                width: '85%',
                padding: '0.65rem'
              }}
            >
              <Play size={16} fill="white" /> Watch Trailer
            </button>
          )}
        </div>

        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(248,68,100,0.15)', color: 'var(--primary)', padding: '0.3rem 0.75rem', borderRadius: '2rem', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.75rem' }}>
            <Sparkles size={14} /> Certified Blockbuster
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.75rem' }}>{movie.title}</h1>

          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginBottom: '1.25rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent)', fontWeight: '800', fontSize: '1.1rem' }}>
              <Star size={20} fill="currentColor" /> {movie.rating}/10
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '400', marginLeft: '4px' }}>({movie.votes || '250K+'} Votes)</span>
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={16} /> {movie.duration} mins
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Globe size={16} /> {movie.language}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            {movie.genre?.map((g, idx) => (
              <span key={idx} className="badge" style={{ fontSize: '0.85rem', padding: '0.35rem 0.8rem' }}>{g}</span>
            ))}
            <span className="badge" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>2D, IMAX, 4DX</span>
          </div>

          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>About the Movie</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            {movie.description}
          </p>

          <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Release Date: <strong style={{ color: 'var(--text-main)' }}>{new Date(movie.releaseDate).toLocaleDateString([], { dateStyle: 'medium' })}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Date Picker Carousel like BookMyShow */}
      <div style={{ borderBottom: '1px solid var(--border)', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-muted)' }}>
          SELECT DATE
        </h3>
        <div className="date-selector">
          {dates.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedDateIdx(idx)}
              className={`date-pill ${selectedDateIdx === idx ? 'active' : ''}`}
            >
              <span className="day">{item.day}</span>
              <span className="date-num">{item.dateNum}</span>
              <span className="day" style={{ opacity: 0.6 }}>{item.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Available Theatres & Showtimes */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Calendar size={22} className="brand-red" /> Theatres & Show Timings in Hyderabad
        </h2>

        {Object.keys(theatreMap).length === 0 ? (
          <div className="alert alert-info" style={{ textAlign: 'center', padding: '2rem' }}>
            No shows scheduled for {dates[selectedDateIdx].day}. Please choose another date above.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {Object.values(theatreMap).map(({ theatre, shows }) => (
              <div key={theatre?._id} style={{
                background: 'var(--bg-card)',
                padding: '1.75rem',
                borderRadius: '1rem',
                border: '1px solid var(--border)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{theatre?.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                      <MapPin size={14} /> {theatre?.address}
                    </p>
                  </div>

                  {/* Amenities */}
                  <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Smartphone size={14} color="#10b981" /> M-Ticket</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Popcorn size={14} color="#f59e0b" /> F&B Available</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  {shows.map(show => {
                    const timeString = new Date(show.showDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    return (
                      <Link
                        key={show._id}
                        to={`/shows/${show._id}/seats`}
                        className="btn btn-outline"
                        style={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          padding: '0.65rem 1.15rem',
                          borderColor: 'rgba(248, 68, 100, 0.4)',
                          background: 'rgba(255,255,255,0.02)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: '#10b981', fontWeight: '800', fontSize: '1rem' }}>{timeString}</span>
                          <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.1)', padding: '1px 5px', borderRadius: '3px' }}>
                            {show.format || '2D'}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          Screen {show.screenNumber} • Laser 4K
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Embedded YouTube Trailer Modal */}
      {showTrailer && (
        <div className="modal-overlay" onClick={() => setShowTrailer(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.5rem', background: 'var(--bg-dark)', borderBottom: '1px solid var(--border)' }}>
              <strong style={{ fontSize: '1.1rem' }}>{movie.title} - Official Trailer</strong>
              <button onClick={() => setShowTrailer(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={movie.trailerUrl + '?autoplay=1'}
                title={movie.title}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailPage;
