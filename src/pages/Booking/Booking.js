import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { differenceInCalendarDays, parseISO, isValid } from "date-fns";
import { AddCircleOutline, RemoveCircleOutline, DeleteOutline, InfoOutlined } from "@mui/icons-material"; // Removed CalendarToday

import './Booking.css';

const Booking = () => {
  const { cartItems, updateCartItem, removeFromCart } = useCart();
  const [kraPin, setKraPin] = useState("");
  const [bookingStartDate, setBookingStartDate] = useState(cartItems[0]?.startDate || "");
  const [bookingEndDate, setBookingEndDate] = useState(cartItems[0]?.endDate || "");

  const rentalDays = (() => {
    if (bookingStartDate && bookingEndDate) {
      const start = parseISO(bookingStartDate);
      const end = parseISO(bookingEndDate);
      if (isValid(start) && isValid(end) && end >= start) {
        return Math.max(1, differenceInCalendarDays(end, start));
      }
    }
    return 1;
  })();

  const calculateTotals = () => {
    let currentSubtotal = 0;
    cartItems.forEach(item => {
      currentSubtotal += item.price * (item.quantity || 1) * rentalDays;
    });
    const currentTotal = currentSubtotal;

    return { subtotal: currentSubtotal, total: currentTotal };
  };

  const { subtotal, total } = calculateTotals();

  const isValidKRA = /^[A-Z]\d{9}[A-Z]$/.test(kraPin);

  const handleDateChange = (field, value) => {
    if (field === "startDate") {
      setBookingStartDate(value);
    } else {
      setBookingEndDate(value);
    }
  };

  const handleQuantityChange = (itemId, type) => {
    const itemToUpdate = cartItems.find(item => String(item.id) === String(itemId));
    if (!itemToUpdate) return;

    let newQuantity = itemToUpdate.quantity || 1;
    if (type === 'increase') {
      newQuantity += 1;
    } else if (type === 'decrease' && newQuantity > 1) {
      newQuantity -= 1;
    }

    updateCartItem(itemId, { quantity: newQuantity });
  };

  const handleDeleteItem = (itemId) => {
    removeFromCart(itemId);
    console.log(`Item with ID ${itemId} removed from booking.`);
  };

  const handleCompleteBooking = () => {
    if (!isValidKRA) {
      console.error("Invalid KRA PIN. Please enter a valid one (e.g., A123456789B).");
      return;
    }

    if (cartItems.length === 0) {
      console.error("Your cart is empty. Please add items to book.");
      return;
    }

    if (!bookingStartDate || !bookingEndDate) {
      console.error("Please select both start and end dates for your booking.");
      return;
    }

    console.log(`Booking completed successfully! Total: KES ${total.toLocaleString()}`);
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
        <div className="booking-details-section">
          {cartItems.map((item) => (
            <div key={item.id} className="main-item-header">
              <img src={item.image} alt={item.name} className="main-item-image" />
              <div className="main-item-info">
                <h1 className="main-item-name">{item.name}</h1>
                <p className="main-item-price">KES {item.price.toLocaleString()}/day</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(item.id, 'decrease')} className="quantity-button">
                  <RemoveCircleOutline />
                </button>
                <span className="quantity-display">{item.quantity || 1}</span>
                <button onClick={() => handleQuantityChange(item.id, 'increase')} className="quantity-button">
                  <AddCircleOutline />
                </button>
                <button onClick={() => handleDeleteItem(item.id)} className="delete-button">
                  <DeleteOutline />
                </button>
              </div>
            </div>
          ))}

          <div className="rental-period-section">
            <h2 className="section-title">Rental Period</h2>
            <div className="date-pickers">
              <div className="date-input-group">
                <label htmlFor="startDate">Start Date</label>
                <div className="input-with-icon">
                  <input
                    type="date"
                    id="startDate"
                    value={bookingStartDate}
                    onChange={(e) => handleDateChange("startDate", e.target.value)}
                    className="date-input"
                  />
                </div>
              </div>
              <div className="date-input-group">
                <label htmlFor="endDate">End Date</label>
                <div className="input-with-icon">
                  <input
                    type="date"
                    id="endDate"
                    value={bookingEndDate}
                    onChange={(e) => handleDateChange("endDate", e.target.value)}
                    className="date-input"
                  />
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

        <div className="order-summary-sidebar">
          <h2 className="summary-title">Order Summary</h2>
          <div className="summary-details">
            {cartItems.map(item => (
              <p key={item.id} className="summary-item-row">
                {item.name} (x{item.quantity || 1}): <span className="summary-value">KES {(item.price * (item.quantity || 1) * rentalDays).toLocaleString()}</span>
              </p>
            ))}
            <hr className="summary-divider" />
            <p>Subtotal: <span className="summary-value">KES {subtotal.toLocaleString()}</span></p>
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