import { useState, useEffect } from 'react';
import { products } from '../data/products';
import type { CartItem } from '../types';

const loadCartFromStorage = (): CartItem[] => {
  try {
    const saved = localStorage.getItem('cart');
    const parsed = saved ? (JSON.parse(saved) as Partial<CartItem>[]) : [];

    // Ensure legacy cart entries gain productId for translations/merging
    return parsed.map((item) => {
      if (!item.productId) {
        const match = products.find((p) => p.name === item.name);
        return {
          productId: match?.id || item.name || 'unknown',
          name: item.name || 'Unknown',
          price: item.price || 0,
          qty: item.qty || 1,
        } as CartItem;
      }
      return item as CartItem;
    });
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

  const addToCart = (
    productId: string,
    name: string,
    price: number,
    qty: number = 1
  ) => {
    setCart((prevCart) => {
      const idx = prevCart.findIndex((i) => i.productId === productId);
      if (idx > -1) {
        const updated = [...prevCart];
        updated[idx].qty += qty;
        return updated;
      } else {
        return [...prevCart, { productId, name, price, qty }];
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
