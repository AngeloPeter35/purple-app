import React, { useEffect, useState } from "react";

const BOOKINGS_KEY = "bookings_list"; // simulate saved bookings

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(BOOKINGS_KEY);
    if (saved) setBookings(JSON.parse(saved));
  }, []);

  return (
    <div>
      <h2>All Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b, index) => (
          <div key={index} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
            <p><strong>Client:</strong> {b.kra}</p>
            <p><strong>Start:</strong> {b.start}</p>
            <p><strong>End:</strong> {b.end}</p>
            <ul>
              {b.items.map((item, i) => (
                <li key={i}>
                  {item.name} - {item.price} KES/day
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default BookingsList;
