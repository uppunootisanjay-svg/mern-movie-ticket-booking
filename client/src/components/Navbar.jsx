import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Film, User, LogOut, Ticket, MapPin } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="container nav-container">
        <Link to="/" className="brand">
          <Film className="brand-red" size={28} />
          <span>Cine<span className="brand-red">Pass</span></span>
        </Link>

        <nav className="nav-links">
          <Link to="/movies" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Film size={16} /> Movies
          </Link>
          <Link to="/theatres" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <MapPin size={16} /> Cinemas
          </Link>
          {user && (
            <Link to="/my-bookings" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Ticket size={16} /> My Tickets
            </Link>
          )}

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Hi, <strong>{user.name}</strong>
              </span>
              <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem' }}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link to="/login" className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
