// src/App.js - Main Application Entry Point
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Equipment from './pages/Equipment/Equipment';
import EquipmentDetail from './pages/EquipmentDetail/EquipmentDetail'; // New import
import Booking from './pages/Booking/Booking';
import CartPage from './pages/CartPage/CartPage';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';

import './App.css'; // Global application styles
import './index.css'; // Minimal index styles

function App() {
  return (
    <Router>
      <ThemeProvider>
        <CartProvider>
          <Navbar />
          <main className="content-area">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/equipment/:id" element={<EquipmentDetail />} /> {/* New Route */}
              <Route path="/booking" element={<Booking />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              {/* Placeholder routes for Terms and Privacy */}
              <Route path="/terms" element={
                <div className="info-page-container">
                  <h2 className="info-page-title">Terms of Service</h2>
                  <p className="info-page-text">These are our terms and conditions. Please read them carefully.</p>
                  <p className="info-page-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
              } />
              <Route path="/privacy" element={
                 <div className="info-page-container">
                 <h2 className="info-page-title">Privacy Policy</h2>
                 <p className="info-page-text">This is our privacy policy, detailing how we handle your data.</p>
                 <p className="info-page-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
               </div>
              } />
            </Routes>
          </main>
        </CartProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
