// src/pages/Equipment/Equipment.jsx - Equipment Page component
import React, { useState } from "react";
import EquipmentCard from "../../components/EquipmentCard/EquipmentCard"; // Corrected relative path

import './Equipment.css';

const equipmentList = [
  {
    id: 1,
    name: "Amaran P60C RGBWW LED Panel",
    price: 1000,
    image: "https://placehold.co/400x300/F0F0F0/6B46C1?text=Lights",
    category: "lights",
    availability: "1 available",
  },
  {
    id: 2,
    name: "Ulanzi VL49 RGB LED Light",
    price: 1500,
    image: "https://placehold.co/400x300/F0F0F0/6B46C1?text=Boombox",
    category: "lights",
    availability: "1 available",
  },
  {
    id: 3,
    name: "Canon EOS R5 Mirrorless Camera",
    price: 2000,
    image: "https://placehold.co/400x300/F0F0F0/6B46C1?text=Camera",
    category: "cameras",
    availability: "1 available",
  },
  {
    id: 4,
    name: "Sennheiser MKH 416 Shotgun Mic",
    price: 1200,
    image: "https://placehold.co/400x300/F0F0F0/6B46C1?text=Microphone",
    category: "audio",
    availability: "3 available",
  },
  {
    id: 5,
    name: "Godox V860III Speedlight",
    price: 3000,
    image: "https://placehold.co/400x300/F0F0F0/EF4444?text=Flash",
    category: "lights",
    availability: "Out of Stock",
  },
  {
    id: 6,
    name: "DJI Mavic 3 Drone",
    price: 2500,
    image: "https://placehold.co/400x300/F0F0F0/6B46C1?text=Drone",
    category: "drones",
    availability: "1 available",
  },
];

const Equipment = () => {
  const [priceRange, setPriceRange] = useState(100000);
  const [availabilityFilter, setAvailabilityFilter] = useState("All");

  const filteredEquipment = equipmentList.filter(item => {
    if (item.price > priceRange) {
      return false;
    }
    if (availabilityFilter === "In Stock") {
      return item.availability !== "Out of Stock";
    } else if (availabilityFilter === "Out of Stock") {
      return item.availability === "Out of Stock";
    }
    return true;
  });

  return (
    <div className="equipment-page-wrapper">
      {/* Filters Section */}
      <div className="filters-container">
        <h2 className="filters-title">Filters</h2>
        <div className="filter-controls">
          <div className="filter-group">
            <label className="filter-label">Price Range (KES)</label>
            <div className="price-values">
              <span>KES 0</span>
              <span>KES {priceRange.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="price-slider"
              style={{
                background: `linear-gradient(to right, var(--purple-main) 0%, var(--purple-main) ${(priceRange / 10000) * 100}%, var(--light-grey-bg) ${(priceRange / 10000) * 100}%, var(--light-grey-bg) 100%)`
              }}
            />
          </div>
          <div className="filter-group">
            <label className="filter-label">Availability</label>
            <div className="radio-options">
              <label className="radio-label-option">
                <input
                  type="radio"
                  name="availability"
                  value="All"
                  checked={availabilityFilter === "All"}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                /> All
              </label>
              <label className="radio-label-option">
                <input
                  type="radio"
                  name="availability"
                  value="In Stock"
                  checked={availabilityFilter === "In Stock"}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                /> In Stock
              </label>
              <label className="radio-label-option">
                <input
                  type="radio"
                  name="availability"
                  value="Out of Stock"
                  checked={availabilityFilter === "Out of Stock"}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                /> Out of Stock
              </label>
            </div>
          </div>
          <button className="reset-button" onClick={() => {
            setPriceRange(10000);
            setAvailabilityFilter("All");
          }}>
            Reset Filters
          </button>
        </div>
      </div>

      {/* Equipment Grid Section */}
      <div className="equipment-grid-section">
        <div className="equipment-grid">
          {filteredEquipment.length === 0 ? (
            <p className="no-results-message">No equipment matches your current filters.</p>
          ) : (
            filteredEquipment.map((item) => (
              <EquipmentCard key={item.id} equipment={item} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Equipment;