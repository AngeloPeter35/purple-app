// src/pages/Home/Home.jsx - Home Page component
import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';

import './Home.css';

const Home = () => {
  return (
    <div className="home-page-container">
      <div className="hero-section">
        <div className="hero-content">
          <p className="hero-tagline">Premier Equipment Rental in Kenya</p>
          <h1 className="hero-title">
            Capture your vision with <br />
            <span className="purple-text">professional gear</span>
          </h1>
          <p className="hero-description">
            Purple Apple provides high-quality photography and videography equipment rentals for professionals and enthusiasts in Nairobi, Kenya.
          </p>
          <div className="hero-buttons">
            <Link to="/equipment" className="primary-button">
              Browse Equipment
            </Link>
            <Link to="/contact" className="secondary-button">
              Get in Touch
            </Link>
          </div>
        </div>
        <div className="hero-image-wrapper">
            <div className="lightbulb-icon-container">
                <Lightbulb size={64} className="lightbulb-icon" />
            </div>
          <img
            src="https://placehold.co/600x400/e0e0e0/505050?text=Camera+Shoot"
            alt="Photographer with camera"
            className="hero-image"
          />
        </div>
      </div>

      {/* Add more sections here like testimonials, how it works, etc. */}
    </div>
  );
};

export default Home;
