import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>🌍 Safarii</h2>
      <div>
        <Link to="/plan">Plan a Trip</Link>
        <Link to="/saved">Saved Plans</Link>
      </div>
    </nav>
  );
};

export default Navbar;
