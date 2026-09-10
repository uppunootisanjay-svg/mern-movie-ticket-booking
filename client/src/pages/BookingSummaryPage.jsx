import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiClient } from '../api/client';
import { ShieldCheck, Ticket, CreditCard, Smartphone, CheckCircle } from 'lucide-react';

const BookingSummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { show, selectedSeats, totalAmount } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(420); // 7 minutes countdown

  useEffect(() => {
    if (!show || !selectedSeats || selectedSeats.length === 0) {
      navigate('/');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          alert('Seat lock expired! Returning to movie selection.');
          navigate(`/shows/${show._id}/seats`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [show, selectedSeats, navigate]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const convenienceFee = Number((selectedSeats?.length * 15).toFixed(2));
  const gst = Number((convenienceFee * 0.18).toFixed(2));
  const grandTotal = totalAmount + convenienceFee + gst;

  const handleConfirmPayment = async () => {
    try {
      setLoading(true);
      setError(null);

      const booking = await apiClient('/bookings/confirm', {
        method: 'POST',
        body: {
          showId: show._id,
          seatIds: selectedSeats,
          paymentMethod
        }
      });

      navigate('/booking/confirmed', { state: { booking } });
    } catch (err) {
      setError(err.message || 'Payment confirmation failed');
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '800px' }}>
      <div style={{
        background: 'rgba(245, 158, 11, 0.12)',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        color: 'var(--accent)',
        padding: '0.75rem 1.25rem',
        borderRadius: '0.5rem',
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>Your selected seats are temporarily locked.</span>
        <strong>Time left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</strong>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
          Booking Summary
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <img
            src={show.movie?.posterUrl}
            alt={show.movie?.title}
            style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '0.5rem' }}
          />
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{show.movie?.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              {show.theatre?.name}, {show.theatre?.city}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Screen {show.screenNumber} • {new Date(show.showDateTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
            </p>
            <div style={{ marginTop: '0.75rem' }}>
              <span className="badge" style={{ fontSize: '0.85rem' }}>Seats: {selectedSeats.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div style={{ borderTop: '1px dashed var(--border)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
            <span>Ticket Base Price ({selectedSeats.length} Tickets)</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
            <span>Convenience Fees</span>
            <span>₹{convenienceFee.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>
            <span>Integrated GST (18%)</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border)', fontSize: '1.25rem', fontWeight: '800' }}>
            <span>Total Payable</span>
            <span style={{ color: 'var(--accent)' }}>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '700', fontSize: '0.95rem' }}>
            Choose Payment Method (Mock Gateway)
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {['UPI', 'Credit/Debit Card', 'Net Banking'].map(method => (
              <button
                key={method}
                type="button"
                onClick={() => setPaymentMethod(method)}
                className={`btn ${paymentMethod === method ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '0.75rem', fontSize: '0.85rem' }}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button
          onClick={handleConfirmPayment}
          disabled={loading}
          className="btn btn-primary"
          style={{ width: '100%', padding: '0.85rem', fontSize: '1.05rem' }}
        >
          {loading ? 'Processing Payment...' : `Confirm & Pay ₹${grandTotal.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
};

export default BookingSummaryPage;
