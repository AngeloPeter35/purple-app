// src/pages/About/About.jsx - About Us Page component
import React from 'react';
import { Camera, Users } from 'lucide-react'; // Changed CameraRetro to Camera

import './About.css';

const About = () => {
  return (
    <div className="about-page-container">
      <h1 className="about-page-heading">What Sets Us Apart</h1>
      <p className="about-page-description">
        At Purple Apple, we're committed to providing not just equipment, but a complete rental experience that helps you achieve your creative goals.
      </p>

      <div className="about-features-grid">
        <div className="feature-card">
          <Camera size={48} className="feature-icon" /> {/* Used Camera instead of CameraRetro */}
          <h2 className="feature-title">Premium Equipment</h2>
          <ul className="feature-list">
            <li>We stock only high-quality, well-maintained equipment from trusted brands that professionals reliably rely on.</li>
            <li>Every item in our inventory is regularly serviced and tested to ensure optimal performance.</li>
          </ul>
        </div>

        <div className="feature-card">
          <Users size={48} className="feature-icon" />
          <h2 className="feature-title">Expert Guidance</h2>
          <ul className="feature-list">
            <li>Our team consists of photography and videography enthusiasts who understand the technical aspects of the equipment we rent.</li>
            <li>We're here to help you choose the right gear for your specific needs.</li>
            <li>Personalized recommendations</li>
            <li>Technical support available</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;