import { create } from "zustand";
import { persist } from "zustand/middleware";

function normalizeItems(items) {
  return items.reduce((normalized, dish) => {
    const existing = normalized.find((item) => item.id === dish.id);
    const quantity = dish.quantity ?? 1;

    if (existing) {
      existing.quantity += quantity;
    } else {
      normalized.push({ ...dish, quantity });
    }

    return normalized;
  }, []);
}

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (dish) =>
        set((state) => ({
          items: normalizeItems([...state.items, dish]),
        })),
      increase: (id) =>
        set((state) => ({
          items: state.items.map((dish) =>
            dish.id === id
              ? { ...dish, quantity: (dish.quantity ?? 1) + 1 }
              : dish,
          ),
        })),
      decrease: (id) =>
        set((state) => ({
          items: state.items.flatMap((dish) => {
            if (dish.id !== id) return [dish];

            const quantity = (dish.quantity ?? 1) - 1;
            return quantity > 0 ? [{ ...dish, quantity }] : [];
          }),
        })),
      remove: (id) =>
        set((state) => ({
          items: state.items.filter((dish) => dish.id !== id),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "addis-eats-cart" },
  ),
);
