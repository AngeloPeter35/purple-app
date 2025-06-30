import React, { useEffect, useState } from "react";

const BookingsPanel = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookings_list")) || [];
    setBookings(saved);
  }, []);

  const updateStatus = (index, status) => {
    const updated = [...bookings];
    updated[index].status = status;
    setBookings(updated);
    localStorage.setItem("bookings_list", JSON.stringify(updated));
  };

  const handleExportCSV = () => {
    const rows = [
      ["KRA", "Start", "End", "Items", "Status", "Date"],
      ...bookings.map((b) => [
        b.kra,
        b.start,
        b.end,
        b.items.map((i) => i.name).join(", "),
        b.status || "Pending",
        b.date,
      ]),
    ];
    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bookings.csv";
    a.click();
  };

  const handleEmailBooking = (booking) => {
    const subject = `Booking from ${booking.kra}`;
    const body = `
KRA PIN: ${booking.kra}
Rental: ${booking.start} → ${booking.end}
Date Booked: ${booking.date}
Items:
${booking.items.map(i => `- ${i.name} (KES ${i.price})`).join("\n")}
Status: ${booking.status || "Pending"}
    `;
    const mailto = `mailto:admin@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailto, "_blank");
  };

  const handlePrint = () => {
    window.print();
  };

  const filtered = bookings.filter((b) =>
    b.kra.toLowerCase().includes(filter.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "date") return new Date(b.date) - new Date(a.date);
    if (sortBy === "name") return a.kra.localeCompare(b.kra);
    return 0;
  });

  return (
    <div>
      <h3>All Bookings</h3>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search by KRA PIN"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: 8, marginRight: 10 }}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: 8 }}>
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
        </select>
        <button onClick={handleExportCSV} style={{ marginLeft: 10 }}>📤 Export CSV</button>
        <button onClick={handlePrint} style={{ marginLeft: 10 }}>🖨️ Print</button>
      </div>

      {sorted.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        sorted.map((booking, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              padding: 16,
              marginBottom: 16,
              borderRadius: 10,
              boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
            }}
          >
            <p><strong>KRA:</strong> {booking.kra}</p>
            <p><strong>Start:</strong> {booking.start}</p>
            <p><strong>End:</strong> {booking.end}</p>
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Items:</strong> {booking.items.map(i => i.name).join(", ")}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span style={{
                padding: "4px 10px",
                borderRadius: 6,
                backgroundColor: booking.status === "Approved" ? "#d4edda" :
                                 booking.status === "Rejected" ? "#f8d7da" :
                                 "#fff3cd",
                color: booking.status === "Approved" ? "#155724" :
                       booking.status === "Rejected" ? "#721c24" :
                       "#856404",
                fontWeight: "bold",
              }}>
                {booking.status || "Pending"}
              </span>
            </p>
            <div style={{ marginTop: 10 }}>
              <button onClick={() => updateStatus(index, "Approved")}>✅ Approve</button>{" "}
              <button onClick={() => updateStatus(index, "Rejected")} style={{ background: "#dc3545" }}>❌ Reject</button>{" "}
              <button onClick={() => handleEmailBooking(booking)}>📧 Email</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookingsPanel;
