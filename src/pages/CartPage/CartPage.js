import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import './CartPage.css';

export default function CartPage() {
  const { cartItems, removeFromCart, updateCartItem } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const deposit = subtotal * 0.3;
  const total = subtotal;

  const handleQuantityChange = (id, type) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    let newQuantity = item.quantity || 1;
    const availableStockMatch = item.availability ? item.availability.match(/(\d+)\s+available/) : null;
    const availableStock = availableStockMatch ? parseInt(availableStockMatch[1], 10) : 0;

    if (type === 'increase') {
      if (availableStock > 0 && newQuantity < availableStock) {
        newQuantity += 1;
      } else if (availableStock === 0) {
        console.warn(`Cannot increase quantity for ${item.name}: Out of Stock.`);
      } else {
        console.warn(`Cannot increase quantity for ${item.name}: Maximum stock (${availableStock}) reached.`);
      }
    } else if (type === 'decrease' && newQuantity > 1) {
      newQuantity -= 1;
    }

    if (newQuantity !== (item.quantity || 1)) {
        updateCartItem(id, { quantity: newQuantity });
    }
  };

  return (
    <div className="cart-page-container">
      <h2 className="cart-page-title">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty. Go to <Link to="/equipment" className="empty-cart-link">Equipment</Link> to add items.</p>
      ) : (
        <>
          <ul className="cart-items-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-list-item">
                <div className="item-details">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">KES {item.price.toLocaleString()}/day</span>
                    <div className="item-quantity-controls">
                        <button onClick={() => handleQuantityChange(item.id, 'decrease')} disabled={(item.quantity || 1) <= 1}>-</button>
                        <span>{item.quantity || 1}</span>
                        <button
                            onClick={() => handleQuantityChange(item.id, 'increase')}
                            disabled={
                                (item.availability && item.availability.toLowerCase().includes('out of stock')) ||
                                ((item.quantity || 1) >= (parseInt(item.availability?.match(/(\d+)\s+available/)?.[1], 10) || 0))
                            }
                        >+</button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-item-button"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p>Subtotal: <span className="summary-value">KES {subtotal.toLocaleString()}</span></p>
            <p>Deposit (30%): <span className="summary-value">KES {deposit.toLocaleString()}</span></p>
            <p className="total-amount">Total: <span className="summary-value">KES {total.toLocaleString()}</span></p>
            <Link to="/booking" className="checkout-button">
              Proceed to Booking
            </Link>
          </div>
        </>
      )}
    </div>
  );
}