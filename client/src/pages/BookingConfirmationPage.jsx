import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, QrCode, Printer, Home, Film } from 'lucide-react';

const BookingConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};

  if (!booking) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>No booking details found</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Return to Movies</Link>
      </div>
    );
  }

  const show = booking.show;
  const movie = show?.movie;
  const theatre = show?.theatre;

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '720px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <CheckCircle2 size={64} style={{ color: 'var(--seat-selected)', marginBottom: '0.75rem' }} />
        <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Booking Confirmed!</h1>
        <p style={{ color: 'var(--text-muted)' }}>Your e-ticket has been generated and confirmed.</p>
      </div>

      <div className="ticket-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Booking ID</span>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '1px' }}>{booking.bookingCode}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Status</span>
            <div style={{ color: 'var(--seat-selected)', fontWeight: '700' }}>CONFIRMED</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <img
            src={movie?.posterUrl}
            alt={movie?.title}
            style={{ width: '100%', height: '130px', objectFit: 'cover', borderRadius: '0.5rem' }}
          />
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.35rem' }}>{movie?.title}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{movie?.language} • {movie?.duration} mins</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              <strong>{theatre?.name}</strong>, {theatre?.city}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Screen {show?.screenNumber} • {new Date(show?.showDateTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
            </p>
          </div>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>RESERVED SEATS</span>
            <strong style={{ fontSize: '1.25rem', color: 'var(--accent)' }}>{booking.seats?.join(', ')}</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', textAlign: 'right' }}>AMOUNT PAID</span>
            <strong style={{ fontSize: '1.25rem' }}>₹{booking.totalAmount?.toFixed(2)}</strong>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <QrCode size={20} /> Show this confirmation at the cinema box office counter or scanner.
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
        <button onClick={() => window.print()} className="btn btn-outline">
          <Printer size={16} /> Print Ticket
        </button>
        <Link to="/" className="btn btn-primary">
          <Home size={16} /> Back to Movies
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
