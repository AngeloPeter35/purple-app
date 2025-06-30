import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (Not really — demo only)");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div style={{ padding: "60px 40px", maxWidth: "600px", margin: "auto" }}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          style={inputStyle}
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows="5"
          required
          style={{ ...inputStyle, height: "120px" }}
        />
        <button type="submit" style={{ marginTop: "10px" }}>
          Send Message
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #ccc",
};

export default Contact;

