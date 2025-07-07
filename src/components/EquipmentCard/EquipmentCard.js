import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { useCart } from "../../context/CartContext";

import './EquipmentCard.css';

export default function EquipmentCard({ equipment }) {
  const { addToCart, cartItems } = useCart();

  // Find the current item in the cart to get its quantity
  const currentItemInCart = cartItems.find((cartItem) => String(cartItem.id) === String(equipment.id));
  const currentQuantityInCart = currentItemInCart ? currentItemInCart.quantity : 0;

  // Parse available quantity from the availability string
  const parseAvailability = (availabilityString) => {
    if (availabilityString === "Out of Stock") {
      return 0;
    }
    const match = availabilityString.match(/(\d+)\s+available/);
    return match ? parseInt(match[1], 10) : 0; // Default to 0 if no number found
  };

  const availableStock = parseAvailability(equipment.availability);

  // Calculate remaining stock
  const remainingStock = Math.max(0, availableStock - currentQuantityInCart);

  // Determine if the add to cart button should be disabled
  // It's disabled if:
  // 1. The item is explicitly "Out of Stock"
  // 2. The quantity in the cart is equal to or exceeds the available stock
  const isAddToCartDisabled = equipment.availability === "Out of Stock" || currentQuantityInCart >= availableStock;

  // Determine the text to display in the availability tag
  const availabilityTagText = remainingStock > 0
    ? `${remainingStock} available`
    : "Out of Stock";

  const availabilityTagClass = remainingStock > 0 ? 'in-stock' : 'out-of-stock';


  return (
    <div className="equipment-card">
      <div className="image-wrapper">
        <img src={equipment.image} alt={equipment.name} className="card-image" />
        {equipment.category && (
          <span className="category-tag">{equipment.category}</span>
        )}
      {/* Updated availability tag to show remaining stock */}
      {equipment.availability && (
        <span className={`availability-tag ${availabilityTagClass}`}>
          {availabilityTagText}
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