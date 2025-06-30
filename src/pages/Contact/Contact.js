// src/pages/Contact/Contact.jsx - Contact Us Page component
import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react'; // Removed Mail as it was unused

import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page-container">
      <h1 className="contact-page-heading">
        We're here to assist you with all your photography and videography equipment rental needs.
      </h1>
      <p className="contact-page-description">
        Reach out to us with any questions or inquiries.
      </p>

      <div className="contact-info-grid">
        <div className="contact-card">
          <MapPin size={48} className="contact-icon" />
          <h2 className="contact-card-title">Our Location</h2>
          <p className="contact-card-text">
            Visit us at Cianda House, Koinange Street, near CJ's in Town CBD, Nairobi, Kenya
          </p>
          <a href="https://maps.app.goo.gl/your-google-maps-link-here" target="_blank" rel="noopener noreferrer" className="view-map-link">
            View on Map
          </a>
        </div>

        <div className="contact-card">
          <Phone size={48} className="contact-icon" />
          <h2 className="contact-card-title">Phone & Email</h2>
          <p className="contact-card-text">
            Call us or send an email with your inquiries
          </p>
          <p className="contact-detail">0716546107</p>
          <p className="contact-detail">info@pupleapple.biz</p>
        </div>

        <div className="contact-card">
          <Clock size={48} className="contact-icon" />
          <h2 className="contact-card-title">Opening Hours</h2>
          <p className="contact-card-text">
            We're open at the following times
          </p>
          <p className="contact-detail">Monday - Friday</p>
          <p className="contact-detail">Saturday: 9:00 AM</p>
          <p className="contact-detail">Sunday: Closed</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
