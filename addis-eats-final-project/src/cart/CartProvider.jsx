import { useState, useEffect, useMemo } from "react";
import { CartContext } from "./cartContext";

const CART_STORAGE_KEY = "addis-eats-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [items]);

  function addItem(dish, quantityToAdd = 1) {
    const qty = Math.max(1, Number(quantityToAdd) || 1);
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === dish.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: (updated[existingIndex].quantity || 1) + qty,
        };
        return updated;
      }
      return [...prevItems, { ...dish, quantity: qty }];
    });
  }

  function increase(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  }

  function decrease(id) {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: (item.quantity || 1) - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function remove(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function clear() {
    setItems([]);
  }

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + (item.quantity || 1), 0),
    [items]
  );

  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0),
    [items]
  );

  const value = {
    items,
    itemCount,
    totalAmount,
    addItem,
    increase,
    decrease,
    remove,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
