import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Globe } from 'lucide-react';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        src={movie.posterUrl || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800'}
        alt={movie.title}
        className="movie-poster"
      />
      <div className="movie-body">
        <h3 className="movie-title">{movie.title}</h3>
        
        <div className="movie-meta">
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: 'var(--accent)' }}>
            <Star size={14} fill="currentColor" /> {movie.rating || '8.5'}
          </span>
          <span>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Clock size={14} /> {movie.duration}m
          </span>
          <span>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Globe size={14} /> {movie.language}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {movie.genre?.map((g, idx) => (
            <span key={idx} className="badge">{g}</span>
          ))}
        </div>

        <div style={{ marginTop: 'auto' }}>
          <Link to={`/movie/${movie._id}`} className="btn btn-primary" style={{ width: '100%' }}>
            Book Tickets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
