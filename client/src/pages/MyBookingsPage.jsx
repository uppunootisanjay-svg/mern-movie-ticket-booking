import React, { useState, useEffect } from 'react';
import { apiClient } from '../api/client';
import { Ticket, Calendar, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await apiClient('/bookings/my-bookings');
        setBookings(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch tickets');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '850px' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Ticket size={24} className="brand-red" /> My Booked Tickets
      </h1>

      {loading ? (
        <p style={{ color: 'var(--text-muted)' }}>Fetching your bookings...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : bookings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', borderRadius: '1rem', border: '1px solid var(--border)' }}>
          <h3>No tickets booked yet</h3>
          <p style={{ color: 'var(--text-muted)', margin: '0.75rem 0 1.5rem' }}>You haven't reserved any movie tickets yet.</p>
          <Link to="/" className="btn btn-primary">Browse Current Movies</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {bookings.map(booking => {
            const show = booking.show;
            const movie = show?.movie;
            const theatre = show?.theatre;

            return (
              <div key={booking._id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1.5rem', display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: '1.5rem', alignItems: 'center' }}>
                <img
                  src={movie?.posterUrl}
                  alt={movie?.title}
                  style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '0.5rem' }}
                />

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.35rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>{movie?.title}</h3>
                    <span className="badge">{booking.bookingCode}</span>
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
                    {theatre?.name}, {theatre?.city} • Screen {show?.screenNumber}
                  </p>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                    <Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} />
                    {new Date(show?.showDateTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>

                  <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                    Seats: <strong style={{ color: 'var(--accent)' }}>{booking.seats?.join(', ')}</strong>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)' }}>
                    ₹{booking.totalAmount?.toFixed(2)}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--seat-selected)', fontWeight: '700', textTransform: 'uppercase' }}>
                    {booking.bookingStatus}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
