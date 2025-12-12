import { useState, useEffect } from 'react';
import type { CartItem } from '../types';

const loadCartFromStorage = (): CartItem[] => {
  try {
    const saved = localStorage.getItem('cart');
    return saved ? (JSON.parse(saved) as CartItem[]) : [];
  } catch (e) {
    console.error('Failed to parse cart from localStorage', e);
    return [];
  }
};

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>(loadCartFromStorage);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (name: string, price: number, qty: number = 1) => {
    setCart((prevCart) => {
      const idx = prevCart.findIndex((i) => i.name === name);
      if (idx > -1) {
        const updated = [...prevCart];
        updated[idx].qty += qty;
        return updated;
      } else {
        return [...prevCart, { name, price, qty }];
      }
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const changeQty = (index: number, qty: number) => {
    setCart((prevCart) => {
      if (qty <= 0) {
        return prevCart.filter((_, i) => i !== index);
      }
      const updated = [...prevCart];
      updated[index].qty = qty;
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  return { cart, addToCart, removeFromCart, changeQty, clearCart, getTotal };
};
