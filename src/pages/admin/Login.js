import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const savedPassword = localStorage.getItem("admin_password") || "admin123";

  const handleLogin = () => {
    if (!name) {
      alert("Enter your admin name.");
      return;
    }

    if (password === savedPassword) {
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("adminName", name);
      localStorage.setItem("adminLoginTime", new Date().toLocaleString());
      navigate("/admin/equipment");
    } else {
      alert("Wrong password!");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Admin Login</h2>
      <input
        type="text"
        placeholder="Admin Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ maxWidth: 300, padding: 10, marginBottom: 10 }}
      />
      <br />
      <input
        type="password"
        placeholder="Enter admin password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ maxWidth: 300, padding: 10 }}
      />
      <br /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
