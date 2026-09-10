import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient } from '../api/client';
import { useAuth } from '../context/AuthContext';
import SeatGrid from '../components/SeatGrid';
import { Clock, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

const SeatSelectionPage = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        setLoading(true);
        const data = await apiClient(`/shows/${showId}`);
        setShow(data);
      } catch (err) {
        setError('Failed to fetch seat layout');
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, [showId]);

  const handleToggleSeat = (seatId) => {
    setError(null);
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      if (selectedSeats.length >= 8) {
        setError('You can select a maximum of 8 seats per transaction');
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const calculateTotal = () => {
    if (!show) return 0;
    return selectedSeats.reduce((sum, seatId) => {
      const seat = show.seats.find(s => s.seatId === seatId);
      const price = show.ticketPrice?.[seat?.seatType] || show.ticketPrice?.standard || 250;
      return sum + price;
    }, 0);
  };

  const handleProceed = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/shows/${showId}/seats` } });
      return;
    }

    if (selectedSeats.length === 0) {
      setError('Please select your seats before proceeding');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // Lock seats on the server to prevent race conditions (atomic lock)
      await apiClient('/bookings/lock', {
        method: 'POST',
        body: {
          showId: show._id,
          seatIds: selectedSeats
        }
      });

      // Proceed to snacks and checkout summary
      navigate('/booking/summary', {
        state: {
          show,
          selectedSeats,
          totalAmount: calculateTotal()
        }
      });
    } catch (err) {
      setError(err.message || 'Seat lock failed. Selected seats may have just been reserved.');
      const refreshed = await apiClient(`/shows/${showId}`);
      setShow(refreshed);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading interactive auditorium grid...</div>;
  }

  if (!show) {
    return <div className="container" style={{ padding: '4rem 0' }}><div className="alert alert-danger">Show details not found.</div></div>;
  }

  const showTime = new Date(show.showDateTime).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: '800' }}>{show.movie?.title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            <strong style={{ color: 'var(--text-main)' }}>{show.theatre?.name}</strong> • Screen {show.screenNumber} • {show.format || '2D'} • {showTime}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', background: 'var(--bg-card)', padding: '0.6rem 1.25rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
          <span style={{ fontSize: '0.85rem' }}>Classic: <strong>₹{show.ticketPrice?.classic || 175}</strong></span>
          <span style={{ color: 'var(--border)' }}>|</span>
          <span style={{ fontSize: '0.85rem' }}>Prime: <strong>₹{show.ticketPrice?.standard || 250}</strong></span>
          <span style={{ color: 'var(--border)' }}>|</span>
          <span style={{ fontSize: '0.85rem' }}>Premium: <strong>₹{show.ticketPrice?.premium || 350}</strong></span>
          <span style={{ color: 'var(--border)' }}>|</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--accent)' }}>Recliner: <strong>₹{show.ticketPrice?.recliner || 450}</strong></span>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {/* Auditorium Seating Matrix with Aisles */}
      <div style={{ background: 'var(--bg-card)', padding: '2rem 1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '3rem' }}>
        <SeatGrid
          seats={show.seats}
          selectedSeats={selectedSeats}
          onToggleSeat={handleToggleSeat}
          ticketPrice={show.ticketPrice}
        />
      </div>

      {/* Floating Bottom Bar */}
      <div style={{
        position: 'sticky',
        bottom: '1rem',
        background: 'rgba(17, 23, 38, 0.95)',
        backdropFilter: 'blur(12px)',
        padding: '1.25rem 2rem',
        borderRadius: '1rem',
        border: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.25rem',
        boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
        zIndex: 40
      }}>
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Selected Seats: <strong style={{ color: 'var(--text-main)', fontSize: '1rem' }}>{selectedSeats.length ? selectedSeats.join(', ') : 'None'}</strong>
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)', marginTop: '2px' }}>
            Total: ₹{calculateTotal()}
          </div>
        </div>

        <button
          onClick={handleProceed}
          disabled={selectedSeats.length === 0 || submitting}
          className="btn btn-primary"
          style={{ padding: '0.85rem 2.25rem', fontSize: '1.05rem' }}
        >
          {submitting ? 'Holding Seats...' : `Proceed to Pay (₹${calculateTotal()})`}
        </button>
      </div>
    </div>
  );
};

export default SeatSelectionPage;
