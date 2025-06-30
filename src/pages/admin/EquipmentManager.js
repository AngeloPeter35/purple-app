import React, { useEffect, useState } from "react";

const STORAGE_KEY = "equipment_list";

const EquipmentManager = () => {
  const [equipments, setEquipments] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", image: "" });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setEquipments(JSON.parse(saved));
  }, []);

  const saveToStorage = (list) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  const handleAdd = () => {
    if (!form.name || !form.price || !form.image) return alert("All fields required");
    const newItem = { ...form, id: Date.now() };
    const updated = [...equipments, newItem];
    setEquipments(updated);
    saveToStorage(updated);
    setForm({ name: "", price: "", image: "" });
  };

  const handleDelete = (id) => {
    const updated = equipments.filter((item) => item.id !== id);
    setEquipments(updated);
    saveToStorage(updated);
  };

  return (
    <div>
      <h2>Equipment Manager</h2>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price (KES)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <button onClick={handleAdd}>Add Equipment</button>
      </div>

      <div className="equipment-grid">
        {equipments.map((item) => (
          <div key={item.id} className="equipment-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>KES {parseInt(item.price).toLocaleString()} / day</p>
            <button
              style={{ background: "crimson", color: "white" }}
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentManager;
