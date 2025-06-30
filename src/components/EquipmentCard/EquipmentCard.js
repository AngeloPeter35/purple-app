// src/components/EquipmentCard/EquipmentCard.jsx - Equipment Card component
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material"; // Keep using MUI icons for this specific button
import { useCart } from "../../context/CartContext";

import './EquipmentCard.css';

export default function EquipmentCard({ equipment }) {
  const { addToCart, cartItems } = useCart();

  const itemIsInCart = cartItems.some((cartItem) => cartItem.id === equipment.id);
  const isAddToCartDisabled = itemIsInCart || equipment.availability === "Out of Stock";

  return (
    <div className="equipment-card">
      <div className="image-wrapper">
        <img src={equipment.image} alt={equipment.name} className="card-image" />
        {equipment.category && (
          <span className="category-tag">{equipment.category}</span>
        )}
        {equipment.availability && (
          <span className={`availability-tag ${equipment.availability === "Out of Stock" ? 'out-of-stock' : 'in-stock'}`}>
            {equipment.availability}
          </span>
        )}
      </div>

      <h3 className="equipment-name">{equipment.name}</h3>
      <p className="equipment-price">KES {equipment.price.toLocaleString()}/day</p>

      <div className="card-actions">
        <Link to={`/equipment/${equipment.id}`} className="details-button">
          View details
        </Link>
        <button
          onClick={() => addToCart(equipment)}
          className={`add-to-cart-button ${isAddToCartDisabled ? 'added' : ''}`}
          disabled={isAddToCartDisabled}
        >
          <ShoppingCart className="cart-icon" />
        </button>
      </div>
    </div>
  );
}
