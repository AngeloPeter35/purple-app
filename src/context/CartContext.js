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
      // Validate item and its ID
      if (!item || item.id === undefined || item.id === null) {
        console.error("Attempted to add an item without a valid ID:", item);
        return prev; // Return previous state if item or ID is invalid
      }

      // Normalize item ID to string for consistent comparison
      const itemId = String(item.id);

      // Check if the item (by normalized ID) is already in the cart
      const existingItemIndex = prev.findIndex(cartItem => String(cartItem.id) === itemId);

      if (existingItemIndex > -1) {
        // If item exists, create a new array with updated quantity for the existing item
        const updatedCart = [...prev];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          // Increment quantity, defaulting to 0 if quantity is undefined/null, then add 1
          quantity: (updatedCart[existingItemIndex].quantity || 0) + 1
        };
        return updatedCart;
      } else {
        // If item does not exist, add it as a new item with quantity 1
        return [...prev, { ...item, quantity: 1 }];
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
