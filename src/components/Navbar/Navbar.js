import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ShoppingCart, Sun, Moon, User, Menu, X } from 'lucide-react';

import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";

import './Navbar.css';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { cartItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalCartItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <nav className="navbar">
      {/* Mobile Menu Overlay (unchanged) */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
        <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
          <button className="close-mobile-menu" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
          <NavLink to="/equipment" onClick={() => setIsMobileMenuOpen(false)}>Equipment</NavLink>
          <NavLink to="/booking" onClick={() => setIsMobileMenuOpen(false)}>Booking</NavLink>
          <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</NavLink>
          <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink>
          <Link to="/login" className="mobile-login-link" onClick={() => setIsMobileMenuOpen(false)}>
            <User size={20} /> Login
          </Link>
        </div>
      </div>

      {/* Main Navbar Content */}
      {/* Logo - now a direct child of navbar */}
      <Link to="/" className="navbar-logo">
        <span className="logo-purple">purple</span>
        <span className="logo-apple">apple</span>
      </Link>

      {/* Navigation Links - now a direct child of navbar */}
      <div className="nav-links-main">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/equipment" className="nav-link">Equipment</NavLink>
        <NavLink to="/booking" className="nav-link">Booking</NavLink>
        <NavLink to="/about" className="nav-link">About</NavLink>
        <NavLink to="/contact" className="nav-link">Contact</NavLink>
      </div>

      {/* Right side icons - remains a direct child of navbar */}
      <div className="navbar-right">
        <button className="icon-button theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <Link to="/login" className="nav-link-icon login-link">
          <User size={20} /> Login
        </Link>

        <Link to="/cart" className="icon-button cart-button">
          <ShoppingCart size={20} />
          {totalCartItems > 0 && <span className="cart-badge">{totalCartItems}</span>}
        </Link>

        <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;