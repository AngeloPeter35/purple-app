import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './EquipmentDetail.css';

const equipmentList = [
  {
    id: 1,
    name: "Amaran P60C RGBWW LED Panel",
    price: 1000,
    image: "/Images/Amaran P60C.jpeg",
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
    price: 1500,
    image: "/Images/ULANZI.jpeg",
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
    price: 2000,
    image: "/Images/Canon-EOS-R5.jpeg",
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
    price: 1200,
    image: "/Images/Sennheiser-MKH-416 Shotgun Mic.jpeg",
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
    price: 3000,
    image: "/Images/Godox speed light.jpeg",
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
    price: 2500,
    image: "/Images/DJI Mavic 3.jpeg",
    category: "drones",
    availability: "1 available",
    description: "A professional-grade camera drone with a Hasselblad camera, 4/3 CMOS sensor, and omnidirectional obstacle sensing. Perfect for cinematic aerial footage.",
    features: [
      "4/3 CMOS Hasselblad Camera",
      "5.1K Video Recording",
      "46-Minute Max Flight Flight Time",
      "Omnidirectional Obstacle Sensing",
      "Advanced RTH"
    ]
  },
];

const EquipmentDetail = () => {
  const { id } = useParams();
  const equipment = equipmentList.find(item => item.id === parseInt(id));
  const { addToCart, cartItems, updateCartItem } = useCart(); // Import updateCartItem
  const navigate = useNavigate();

  // Find the current item in the cart to get its quantity
  const currentItemInCart = cartItems.find((cartItem) => String(cartItem.id) === String(equipment?.id));
  const currentQuantityInCart = currentItemInCart ? currentItemInCart.quantity : 0;

  // Parse available quantity from the availability string
  const parseAvailability = (availabilityString) => {
    if (availabilityString === "Out of Stock") {
      return 0;
    }
    const match = availabilityString.match(/(\d+)\s+available/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const availableStock = parseAvailability(equipment?.availability);

  // Determine if the "Add to Cart" button should be disabled
  const isAddToCartDisabled = equipment?.availability === "Out of Stock" || currentQuantityInCart >= availableStock;

  // Determine if the "Book Now" button should be disabled
  const isBookNowDisabled = equipment?.availability === "Out of Stock";


  // Handle "Book Now" button click
  const handleBookNow = () => {
    console.log("Book Now button clicked!");
    if (equipment) {
      // Check if the item is already in the cart
      const itemAlreadyInCart = cartItems.some((cartItem) => String(cartItem.id) === String(equipment.id));

      // If the item is not in the cart, add one instance of it
      if (!itemAlreadyInCart && !isBookNowDisabled) {
        addToCart({ ...equipment, startDate: "", endDate: "" }); // Add with quantity 1
        console.log("Item added to cart for booking.");
      } else if (itemAlreadyInCart && currentQuantityInCart === 0 && !isBookNowDisabled) {
        // This case handles if an item was removed from cart but still has a placeholder,
        // ensuring it's added back with quantity 1 if available.
        updateCartItem(equipment.id, { quantity: 1 });
        console.log("Item quantity reset to 1 in cart for booking.");
      } else if (itemAlreadyInCart) {
        // If item is already in cart with a quantity > 0, do nothing to its quantity
        console.log("Item already in cart. Proceeding to booking page.");
      } else {
        console.log("Cannot book: Item is out of stock.");
      }
      
      // Always navigate to the booking page, unless it's genuinely out of stock
      if (!isBookNowDisabled) {
        navigate('/booking');
      }
    } else {
      console.error("No equipment found to book.");
    }
  };

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
            <button
              onClick={handleBookNow}
              className="book-now-button"
              disabled={isBookNowDisabled}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      <Link to="/equipment" className="back-to-list-button">← Back to Equipment List</Link>
    </div>
  );
};

export default EquipmentDetail;