import React, { useState } from "react";
import { Link, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import EquipmentPanel from "./EquipmentPanel";
import BookingsPanel from "./BookingsPanel";
import ExportPanel from "./ExportPanel";
import useAutoLogout from "../../hooks/useAutoLogout";

const Admin = () => {
  const isLoggedIn = localStorage.getItem("isAdmin") === "true";
  const adminName = localStorage.getItem("adminName") || "Admin";
  const loginTime = localStorage.getItem("adminLoginTime") || "Unknown";
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");

  useAutoLogout();

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminLoginTime");
    navigate("/admin/login");
  };

  const handleChangePassword = () => {
    if (newPassword.length < 4) {
      alert("Password too short");
      return;
    }
    localStorage.setItem("admin_password", newPassword);
    alert("Password changed!");
    setNewPassword("");
  };

  return (
    <div className="admin-panel">
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h2>Admin Dashboard</h2>
          <p>👤 {adminName} | Logged in: {loginTime}</p>
        </div>
        <div>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ padding: 8, marginRight: 8 }}
          />
          <button onClick={handleChangePassword}>Change Password</button>
          <button onClick={handleLogout} style={{ marginLeft: 8 }}>Logout</button>
        </div>
      </div>

      <div className="admin-nav">
        <Link to="/admin/equipment">Manage Equipment</Link>
        <Link to="/admin/bookings">View Bookings</Link>
        <Link to="/admin/export">Export Reports</Link>
      </div>

      <div className="admin-content">
        <Routes>
          <Route path="/equipment" element={<EquipmentPanel />} />
          <Route path="/bookings" element={<BookingsPanel />} />
          <Route path="/export" element={<ExportPanel />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
