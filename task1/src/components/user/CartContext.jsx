import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../AuthContext"; // Import AuthContext

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { userId } = useAuth(); // Get userId from AuthContext

  // Reload cart for current user
  useEffect(() => {
    if (userId) {
      const cart = localStorage.getItem(`cart_${userId}`);
      setCartItems(cart ? JSON.parse(cart) : []);
    } else {
      setCartItems([]);
    }
  }, [userId]);

  // Save cart to localStorage
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
    }
  }, [cartItems, userId]);

  const addToCart = (item) =>{
    setCartItems((prev) => [...prev, item]);
    alert('product added to cart');
  }

  const removeFromCart = (id) => setCartItems((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => {
    if (userId) {
      localStorage.removeItem(`cart_${userId}`);
    }
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};