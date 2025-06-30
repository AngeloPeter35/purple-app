// src/context/CartContext.jsx - Cart Provider
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to read cart from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      // Check if the item (by ID) is already in the cart, if so, just update its quantity
      // Otherwise, add it as a new item.
      const existingItemIndex = prev.findIndex(cartItem => cartItem.id === item.id);
      if (existingItemIndex > -1) {
        const updatedCart = [...prev];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: (updatedCart[existingItemIndex].quantity || 1) + 1 // Increment quantity
        };
        return updatedCart;
      } else {
        return [...prev, { ...item, quantity: 1 }]; // Add new item with quantity 1
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCartItem = (id, updatedFields) => {
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};