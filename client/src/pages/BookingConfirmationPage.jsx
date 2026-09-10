import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, QrCode, Printer, Home, Share2, Ticket, Popcorn, MapPin, Calendar, Clock } from 'lucide-react';

const BookingConfirmationPage = () => {
  const location = useLocation();
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Movie Ticket - ${movie?.title}`,
        text: `Booked tickets for ${movie?.title} at ${theatre?.name}! Booking ID: ${booking.bookingCode}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`Booking ID: ${booking.bookingCode} | Movie: ${movie?.title} | Seats: ${booking.seats?.join(', ')} | Cinema: ${theatre?.name}`);
      alert('Ticket details copied to clipboard!');
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 5rem', maxWidth: '720px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <CheckCircle2 size={56} style={{ color: '#10b981', marginBottom: '0.5rem' }} />
        <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Booking Confirmed!</h1>
        <p style={{ color: 'var(--text-muted)' }}>An electronic M-Ticket has been issued for your reservation.</p>
      </div>

      {/* BookMyShow Style Digital M-Ticket */}
      <div className="m-ticket">
        <div className="m-ticket-header">
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.9 }}>M-Ticket Confirmation</span>
            <div style={{ fontSize: '1.4rem', fontWeight: '900', letterSpacing: '1px' }}>{booking.bookingCode}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.25)', padding: '3px 8px', borderRadius: '4px', fontWeight: '800' }}>
              CONFIRMED
            </span>
          </div>
        </div>

        <div className="m-ticket-body">
          <div style={{ display: 'grid', gridTemplateColumns: '95px 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <img
              src={movie?.posterUrl}
              alt={movie?.title}
              style={{ width: '100%', height: '135px', objectFit: 'cover', borderRadius: '0.5rem', boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }}
            />
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111827', marginBottom: '0.25rem' }}>{movie?.title}</h2>
              <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>{movie?.language} • {show?.format || '2D'}</p>
              <p style={{ color: '#374151', fontSize: '0.9rem', fontWeight: '600', marginTop: '6px' }}>
                {theatre?.name}
              </p>
              <p style={{ color: '#6b7280', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                <MapPin size={12} /> {theatre?.address}
              </p>
            </div>
          </div>

          <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.75rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase' }}>Date & Time</span>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#111827', marginTop: '2px' }}>
                {new Date(show?.showDateTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase' }}>Auditorium</span>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#111827', marginTop: '2px' }}>
                Screen {show?.screenNumber} (Laser 4K)
              </div>
            </div>
          </div>

          <div style={{ background: '#fffbeb', border: '1px dashed #f59e0b', padding: '1rem', borderRadius: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#b45309', fontWeight: '700', textTransform: 'uppercase' }}>SEAT NUMBERS ({booking.seats?.length} Tickets)</span>
              <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#b45309' }}>{booking.seats?.join(', ')}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase' }}>Total Paid</span>
              <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#111827' }}>₹{booking.totalAmount?.toFixed(2)}</div>
            </div>
          </div>

          {booking.snacks && booking.snacks.length > 0 && (
            <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '0.85rem 1rem', borderRadius: '0.5rem', marginBottom: '1.25rem' }}>
              <strong style={{ fontSize: '0.85rem', color: '#374151', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '0.4rem' }}>
                <Popcorn size={14} color="#f59e0b" /> Food & Beverage Ordered:
              </strong>
              {booking.snacks.map((s, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#6b7280' }}>
                  <span>{s.qty}x {s.name}</span>
                  <span>₹{(s.price * s.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          <div className="m-ticket-divider" />

          {/* QR Code Validation */}
          <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=CINEPASS:${booking.bookingCode}:${booking.seats?.join(',')}`}
              alt="M-Ticket Scannable QR"
              style={{ width: '130px', height: '130px', margin: '0 auto', display: 'block' }}
            />
            <p style={{ color: '#6b7280', fontSize: '0.75rem', marginTop: '0.75rem' }}>
              Scan at cinema gate or usher barcode terminal
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
        <button onClick={() => window.print()} className="btn btn-outline">
          <Printer size={16} /> Print M-Ticket
        </button>
        <button onClick={handleShare} className="btn btn-outline">
          <Share2 size={16} /> Share Ticket
        </button>
        <Link to="/" className="btn btn-primary">
          <Home size={16} /> Back to Movies
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
