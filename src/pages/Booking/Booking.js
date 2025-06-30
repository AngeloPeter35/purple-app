// src/pages/Booking/Booking.jsx - Booking Page component
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { differenceInCalendarDays, parseISO } from "date-fns";
import { CalendarToday, AddCircleOutline, RemoveCircleOutline, DeleteOutline, InfoOutlined } from "@mui/icons-material";

import './Booking.css';

const Booking = () => {
  const { cartItems, updateCartItem, removeFromCart } = useCart();
  const [kraPin, setKraPin] = useState("");

  const mainBookingItem = cartItems[0]; // For this detailed view, we display the first item

  const rentalDays = mainBookingItem && mainBookingItem.startDate && mainBookingItem.endDate
    ? Math.max(
        1,
        differenceInCalendarDays(
          parseISO(mainBookingItem.endDate),
          parseISO(mainBookingItem.startDate)
        )
      )
    : 1;

  const subtotal = mainBookingItem ? mainBookingItem.price * rentalDays * (mainBookingItem.quantity || 1) : 0;
  const deposit = subtotal * 0.3;
  const total = subtotal;

  const isValidKRA = /^[A-Z]\d{9}[A-Z]$/.test(kraPin);

  const handleDateChange = (field, value) => {
    if (mainBookingItem) {
      updateCartItem(mainBookingItem.id, {
        ...mainBookingItem,
        [field]: value,
      });
    }
  };

  const handleQuantityChange = (type) => {
    if (!mainBookingItem) return;

    let newQuantity = mainBookingItem.quantity || 1;
    if (type === 'increase') {
        newQuantity += 1;
    } else if (type === 'decrease' && newQuantity > 1) {
        newQuantity -= 1;
    }

    updateCartItem(mainBookingItem.id, {
        ...mainBookingItem,
        quantity: newQuantity,
    });
  };

  const handleDeleteItem = () => {
    if (mainBookingItem) {
        removeFromCart(mainBookingItem.id);
        // In a real app, use a custom modal for user feedback, not alert()
        alert("Item removed from booking.");
    }
  };

  const handleCompleteBooking = () => {
    if (!isValidKRA) {
      alert("Invalid KRA PIN. Please enter a valid one (e.g., A123456789B).");
      return;
    }

    if (!mainBookingItem || !mainBookingItem.startDate || !mainBookingItem.endDate) {
      alert("Please select both start and end dates for your booking.");
      return;
    }

    // In a real app, send data to your backend here
    alert(`Booking for ${mainBookingItem.name} completed successfully! Total: KES ${total.toLocaleString()}`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="booking-page-container">
        <p className="no-booking-item-message">No equipment selected for booking. Please add an item from the Equipment page.</p>
        <Link to="/equipment" className="back-to-equipment-button">Go to Equipment</Link>
      </div>
    );
  }

  return (
    <div className="booking-page-container">
      <div className="booking-content">
        {/* Left Section: Main Item Details & Rental Period & KRA PIN */}
        <div className="booking-details-section">
          <div className="main-item-header">
            <img src={mainBookingItem.image} alt={mainBookingItem.name} className="main-item-image" />
            <div className="main-item-info">
              <h1 className="main-item-name">{mainBookingItem.name}</h1>
              <p className="main-item-price">KES {mainBookingItem.price.toLocaleString()}/day</p>
            </div>
            {/* Quantity controls as seen in the image */}
            <div className="quantity-controls">
                <button onClick={() => handleQuantityChange('decrease')} className="quantity-button">
                    <RemoveCircleOutline />
                </button>
                <span className="quantity-display">{mainBookingItem.quantity || 1}</span>
                <button onClick={() => handleQuantityChange('increase')} className="quantity-button">
                    <AddCircleOutline />
                </button>
                <button onClick={handleDeleteItem} className="delete-button">
                    <DeleteOutline />
                </button>
            </div>
          </div>

          <div className="rental-period-section">
            <h2 className="section-title">Rental Period</h2>
            <div className="date-pickers">
              <div className="date-input-group">
                <label htmlFor="startDate">Start Date</label>
                <div className="input-with-icon">
                  <input
                    type="date"
                    id="startDate"
                    value={mainBookingItem.startDate || ""}
                    onChange={(e) => handleDateChange("startDate", e.target.value)}
                    className="date-input"
                  />
                  <CalendarToday className="input-icon" />
                </div>
              </div>
              <div className="date-input-group">
                <label htmlFor="endDate">End Date</label>
                <div className="input-with-icon">
                  <input
                    type="date"
                    id="endDate"
                    value={mainBookingItem.endDate || ""}
                    onChange={(e) => handleDateChange("endDate", e.target.value)}
                    className="date-input"
                  />
                  <CalendarToday className="input-icon" />
                </div>
              </div>
            </div>
          </div>

          <div className="kra-pin-section">
            <h2 className="section-title">KRA PIN Information</h2>
            <div className={`kra-info-message ${!isValidKRA && kraPin !== "" ? 'invalid' : ''}`}>
              <InfoOutlined className="info-icon" />
              <p className="kra-info-text">
                A valid KRA PIN is required to rent equipment from Purple Apple. This is used for verification and security purposes.
              </p>
            </div>
            <input
              type="text"
              placeholder="Enter KRA PIN (e.g., A123456789B)"
              value={kraPin}
              onChange={(e) => setKraPin(e.target.value.toUpperCase())}
              className={`kra-input ${!isValidKRA && kraPin !== "" ? 'invalid' : ''}`}
            />
            {!isValidKRA && kraPin !== "" && (
              <p className="kra-error">Invalid KRA PIN format. It should be A123456789B.</p>
            )}
          </div>
        </div>

        {/* Right Section: Order Summary Sidebar */}
        <div className="order-summary-sidebar">
          <h2 className="summary-title">Order Summary</h2>
          <div className="summary-details">
            <p>Subtotal: <span className="summary-value">KES {subtotal.toLocaleString()}</span></p>
            <p>Deposit (30%): <span className="summary-value">KES {deposit.toLocaleString()}</span></p>
            <p className="total-row">Total: <span className="summary-value">KES {total.toLocaleString()}</span></p>
          </div>
          <button onClick={handleCompleteBooking} className="complete-booking-button">
            Complete Booking &rarr;
          </button>
          <p className="terms-text">
            By proceeding, you agree to our <Link to="/terms" className="terms-link">Terms of Service</Link> and <Link to="/privacy" className="terms-link">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Booking;