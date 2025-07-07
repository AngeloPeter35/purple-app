import React, { useState } from "react";
import EquipmentCard from "../../components/EquipmentCard/EquipmentCard"; 

import './Equipment.css';

const equipmentList = [
  {
    id: 1,
    name: "Amaran P60C RGBWW LED Panel",
    price: 1000, 
    image: "/Images/Amaran P60C.jpeg", 
    category: "lights",
    availability: "4 available",
  },
  {
    id: 2,
    name: "Ulanzi VL49 RGB LED Light",
    price: 1500, 
    image: "/Images/ULANZI.jpeg", 
    category: "lights",
    availability: "1 available",
  },
  {
    id: 3,
    name: "Canon EOS R5 Mirrorless Camera",
    price: 2000, 
    image: "/Images/Canon-EOS-R5.jpeg", 
    category: "cameras",
    availability: "1 available",
  },
  {
    id: 4,
    name: "Sennheiser MKH 416 Shotgun Mic",
    price: 1200, 
    image: "/Images/Sennheiser-MKH-416 Shotgun Mic.jpeg", 
    category: "audio",
    availability: "3 available",
  },
  {
    id: 5,
    name: "Godox V860III Speedlight",
    price: 3000, 
    image: "/Images/Godox speed light.jpeg", 
    category: "lights",
    availability: "Out of Stock",
  },
  {
    id: 6,
    name: "DJI Mavic 3 Drone",
    price: 2500, 
    image: "/Images/DJI Mavic 3.jpeg", 
    category: "drones",
    availability: "1 available",
  },
];

const Equipment = () => {
  const [priceRange, setPriceRange] = useState(4000);
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
              max="4000"
              step="50"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="price-slider"
              style={{
                background: `linear-gradient(to right, var(--purple-main) 0%, var(--purple-main) ${(priceRange / 4000) * 100}%, var(--light-grey-bg) ${(priceRange / 4000) * 100}%, var(--light-grey-bg) 100%)`
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
            setPriceRange(4000);
            setAvailabilityFilter("All");
          }}>
            Reset Filters
          </button>
        </div>
      </div>

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