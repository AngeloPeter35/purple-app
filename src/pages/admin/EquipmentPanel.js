import React, { useState, useEffect } from "react";

const EquipmentPanel = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [newEquipment, setNewEquipment] = useState({
    name: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("equipment_list")) || [];
    setEquipmentList(stored);
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("equipment_list", JSON.stringify(data));
  };

  const handleAdd = () => {
    if (!newEquipment.name || !newEquipment.price || !newEquipment.image) return;

    const addedBy = localStorage.getItem("adminName") || "Unknown";
    const updated = [...equipmentList, {
      ...newEquipment,
      id: Date.now(),
      addedBy
    }];

    setEquipmentList(updated);
    saveToStorage(updated);
    setNewEquipment({ name: "", price: "", image: "" });
  };

  const handleDelete = (id) => {
    const updated = equipmentList.filter((item) => item.id !== id);
    setEquipmentList(updated);
    saveToStorage(updated);
  };

  return (
    <div>
      <h3>Manage Equipment</h3>
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Name"
          value={newEquipment.name}
          onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price"
          value={newEquipment.price}
          onChange={(e) => setNewEquipment({ ...newEquipment, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newEquipment.image}
          onChange={(e) => setNewEquipment({ ...newEquipment, image: e.target.value })}
        />
        <button onClick={handleAdd}>Add Equipment</button>
      </div>

      {equipmentList.map((item) => (
        <div key={item.id} style={{ marginBottom: 10 }}>
          <strong>{item.name}</strong> – KES {item.price}
          <br />
          <img src={item.image} alt={item.name} width={120} />
          <p><small>Added by: {item.addedBy || "Unknown"}</small></p>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default EquipmentPanel;
