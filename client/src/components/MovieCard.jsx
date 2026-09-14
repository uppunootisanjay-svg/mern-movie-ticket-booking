import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Play, X, ExternalLink } from 'lucide-react';

const MovieCard = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);
  const [imgSrc, setImgSrc] = useState(movie.posterUrl);

  useEffect(() => {
    setImgSrc(movie.posterUrl);
  }, [movie.posterUrl]);

  const handleTrailerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };

  const getEmbedUrl = (url) => {
    if (!url) return '';
    let videoId = url;
    if (url.includes('embed/')) {
      videoId = url.split('embed/')[1].split('?')[0];
    } else if (url.includes('v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&enablejsapi=1&rel=0`;
  };

  const getYoutubeWatchUrl = (url) => {
    if (!url) return 'https://www.youtube.com';
    let videoId = url;
    if (url.includes('embed/')) {
      videoId = url.split('embed/')[1].split('?')[0];
    } else if (url.includes('v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    return `https://www.youtube.com/watch?v=${videoId}`;
  };

  return (
    <>
      <div className="movie-card">
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src={imgSrc}
            alt={movie.title}
            className="movie-poster"
            loading="lazy"
            onError={() => {
              // Fallback to high quality cinema graphic if link fails
              setImgSrc('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800');
            }}
          />

          {/* Direct Watch Trailer Button on Card Poster */}
          {movie.trailerUrl && (
            <button
              onClick={handleTrailerClick}
              className="btn"
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(0, 0, 0, 0.78)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '2rem',
                padding: '0.35rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                backdropFilter: 'blur(6px)',
                cursor: 'pointer',
                zIndex: 2
              }}
            >
              <Play size={13} fill="#f84464" color="#f84464" /> Trailer
            </button>
          )}

          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
            padding: '1.5rem 1rem 0.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent)', fontWeight: '800', fontSize: '0.9rem' }}>
              <Star size={15} fill="currentColor" /> {movie.rating || '8.5'}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              {movie.duration ? `${movie.duration}m` : '150m'}
            </span>
          </div>
        </div>

        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
            <span>{movie.language}</span>
          </div>

          <div className="genre-tags" style={{ marginBottom: '1rem' }}>
            {movie.genre?.slice(0, 3).map((g, idx) => (
              <span key={idx} className="genre-tag">{g}</span>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: movie.trailerUrl ? '1fr 1fr' : '1fr', gap: '0.5rem', marginTop: 'auto' }}>
            {movie.trailerUrl && (
              <button
                onClick={handleTrailerClick}
                className="btn btn-outline"
                style={{ padding: '0.5rem 0.6rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontWeight: '700' }}
              >
                <Play size={14} fill="currentColor" /> Trailer
              </button>
            )}
            <Link
              to={`/movie/${movie._id}`}
              className="btn btn-primary"
              style={{ padding: '0.5rem 0.6rem', fontSize: '0.8rem', textAlign: 'center' }}
            >
              Book Tickets
            </Link>
          </div>
        </div>
      </div>

      {/* Trailer Video Player Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)} style={{ zIndex: 9999 }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px', background: '#0b0f19', border: '1px solid var(--border)', borderRadius: '1rem', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
              <strong style={{ fontSize: '1.15rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Play size={18} color="var(--primary)" fill="var(--primary)" /> {movie.title} - Official Trailer
              </strong>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '4px' }}>
                <X size={22} />
              </button>
            </div>

            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, background: '#000000' }}>
              <iframe
                src={getEmbedUrl(movie.trailerUrl)}
                title={`${movie.title} Official Trailer`}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div style={{ padding: '0.9rem 1.5rem', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Playing official HD trailer
              </span>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <a
                  href={getYoutubeWatchUrl(movie.trailerUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem', display: 'flex', alignItems: 'center', gap: '5px' }}
                >
                  <ExternalLink size={14} /> Open in YouTube
                </a>
                <Link
                  to={`/movie/${movie._id}`}
                  className="btn btn-primary"
                  style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}
                >
                  Book Tickets
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
