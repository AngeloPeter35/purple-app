// src/pages/EquipmentDetail/EquipmentDetail.jsx - Individual Equipment Detail Page
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // Import useCart for adding to cart
import './EquipmentDetail.css';

// This is the same hardcoded list from Equipment.jsx
const equipmentList = [
  {
    id: 1,
    name: "Amaran P60C RGBWW LED Panel",
    price: 45000,
    image: "",
    category: "lights",
    availability: "1 available",
    description: "A professional RGBWW LED panel light offering full color control, high CRI, and a wide CCT range for superior lighting effects. Perfect for studio and on-location shoots.",
    features: [
      "2500K-7500K CCT Range",
      "Full Green-Magenta Control",
      "High CRI/TLCI (95+)",
      "Built-in FX Modes",
      "Sidus Link App Compatible"
    ]
  },
  {
    id: 2,
    name: "Ulanzi VL49 RGB LED Light",
    price: 28000,
    image: "",
    category: "lights",
    availability: "1 available",
    description: "Compact and portable RGB LED light with adjustable color temperature and brightness. Ideal for vlogging, product photography, and creative lighting.",
    features: [
      "2500K-9000K CCT Range",
      "RGB Full Color",
      "Built-in 2000mAh Battery",
      "Magnetic Adsorption Design",
      "Lightweight and Pocket-sized"
    ]
  },
  {
    id: 3,
    name: "Canon EOS R5 Mirrorless Camera",
    price: 85000,
    image: "",
    category: "cameras",
    availability: "1 available",
    description: "A high-performance full-frame mirrorless camera offering stunning 8K video recording and high-resolution stills. A versatile tool for demanding professionals.",
    features: [
      "45MP Full-Frame CMOS Sensor",
      "8K DCI Raw Video Recording",
      "12 fps Mech. Shutter, 20 fps E. Shutter",
      "5-Axis Sensor-Shift Image Stabilization",
      "Dual Pixel CMOS AF II"
    ]
  },
  {
    id: 4,
    name: "Sennheiser MKH 416 Shotgun Mic",
    price: 15000,
    image: "",
    category: "audio",
    availability: "3 available",
    description: "A compact pressure-gradient microphone with a short interference tube, highly immune to humidity and perfect for film, radio, and television, especially for outdoor broadcasting applications.",
    features: [
      "Hypercardioid Pick-up Pattern",
      "Low Noise",
      "High Sennheiser Quality",
      "Excellent Directivity",
      "Rugged and Weather-Resistant"
    ]
  },
  {
    id: 5,
    name: "Godox V860III Speedlight",
    price: 10000,
    image: "",
    category: "lights",
    availability: "Out of Stock",
    description: "A versatile TTL Li-ion round head camera flash with a powerful battery and fast recycling. Ideal for events and portrait photography.",
    features: [
      "Built-in Godox 2.4G Wireless X System",
      "1.5s Recycle Time",
      "650 Full Power Flashes",
      "TTL, Manual, Multi Flash Modes",
      "High-Speed Sync (1/8000s)"
    ]
  },
  {
    id: 6,
    name: "DJI Mavic 3 Drone",
    price: 30000,
    image: "",
    category: "drones",
    availability: "1 available",
    description: "A professional-grade camera drone with a Hasselblad camera, 4/3 CMOS sensor, and omnidirectional obstacle sensing. Perfect for cinematic aerial footage.",
    features: [
      "4/3 CMOS Hasselblad Camera",
      "5.1K Video Recording",
      "46-Minute Max Flight Time",
      "Omnidirectional Obstacle Sensing",
      "Advanced RTH"
    ]
  },
];

const EquipmentDetail = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const equipment = equipmentList.find(item => item.id === parseInt(id));
  const { addToCart, cartItems } = useCart();

  const itemIsInCart = cartItems.some((cartItem) => cartItem.id === equipment?.id);
  const isAddToCartDisabled = itemIsInCart || equipment?.availability === "Out of Stock";


  if (!equipment) {
    return (
      <div className="equipment-detail-container">
        <p className="not-found-message">Equipment not found.</p>
        <Link to="/equipment" className="back-button">Back to Equipment List</Link>
      </div>
    );
  }

  return (
    <div className="equipment-detail-container">
      <div className="equipment-detail-card">
        <div className="detail-image-section">
          <img src={equipment.image} alt={equipment.name} className="detail-image" />
          {equipment.category && (
            <span className="detail-category-tag">{equipment.category}</span>
          )}
          {equipment.availability && (
            <span className={`detail-availability-tag ${equipment.availability === "Out of Stock" ? 'out-of-stock' : 'in-stock'}`}>
              {equipment.availability}
            </span>
          )}
        </div>
        <div className="detail-content-section">
          <h1 className="detail-name">{equipment.name}</h1>
          <p className="detail-price">KES {equipment.price.toLocaleString()}/day</p>

          <h2 className="section-heading">Description</h2>
          <p className="detail-description">{equipment.description}</p>

          {equipment.features && equipment.features.length > 0 && (
            <>
              <h2 className="section-heading">Key Features</h2>
              <ul className="detail-features-list">
                {equipment.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </>
          )}

          <div className="detail-actions">
            <button
              onClick={() => addToCart(equipment)}
              className={`add-to-cart-button ${isAddToCartDisabled ? 'added' : ''}`}
              disabled={isAddToCartDisabled}
            >
              {isAddToCartDisabled ? 'Added to Cart' : 'Add to Cart'}
            </button>
            <Link to="/booking" className="book-now-button">
              Book Now
            </Link>
          </div>
        </div>
      </div>
      <Link to="/equipment" className="back-to-list-button">← Back to Equipment List</Link>
    </div>
  );
};

export default EquipmentDetail;