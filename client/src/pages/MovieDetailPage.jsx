import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiClient } from '../api/client';
import { Star, Clock, Globe, Calendar, MapPin } from 'lucide-react';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetailsAndShows = async () => {
      try {
        setLoading(true);
        const movieData = await apiClient(`/movies/${id}`);
        setMovie(movieData);

        const showsData = await apiClient(`/shows?movieId=${id}`);
        setShows(showsData);
      } catch (err) {
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetailsAndShows();
  }, [id]);

  if (loading) {
    return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading details...</div>;
  }

  if (error || !movie) {
    return <div className="container" style={{ padding: '4rem 0' }}><div className="alert alert-danger">{error || 'Movie not found'}</div></div>;
  }

  // Group shows by Theatre
  const theatreMap = {};
  shows.forEach(show => {
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
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: '2.5rem', marginBottom: '3.5rem', background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
        <img
          src={movie.posterUrl}
          alt={movie.title}
          style={{ width: '100%', borderRadius: '0.75rem', objectFit: 'cover', height: '440px' }}
        />
        
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '1rem' }}>{movie.title}</h1>
          
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginBottom: '1.25rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent)', fontWeight: '700' }}>
              <Star size={18} fill="currentColor" /> {movie.rating}/10
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

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {movie.genre?.map((g, idx) => (
              <span key={idx} className="badge" style={{ fontSize: '0.85rem', padding: '0.3rem 0.75rem' }}>{g}</span>
            ))}
          </div>

          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>About the Movie</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.5rem' }}>{movie.description}</p>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={22} className="brand-red" /> Available Theatres & Showtimes
        </h2>

        {Object.keys(theatreMap).length === 0 ? (
          <div className="alert alert-info">
            No shows currently scheduled for this movie. Check back soon or seed sample shows!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {Object.values(theatreMap).map(({ theatre, shows }) => (
              <div key={theatre?._id} style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--border)' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '700' }}>{theatre?.name || 'Local Multiplex'}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <MapPin size={14} /> {theatre?.address}, {theatre?.city}
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {shows.map(show => {
                    const timeString = new Date(show.showDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    return (
                      <Link
                        key={show._id}
                        to={`/shows/${show._id}/seats`}
                        className="btn btn-outline"
                        style={{ borderColor: 'rgba(229, 9, 20, 0.4)', padding: '0.5rem 1rem' }}
                      >
                        <span style={{ color: 'var(--text-main)', fontWeight: '700' }}>{timeString}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '6px' }}>Screen {show.screenNumber}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
