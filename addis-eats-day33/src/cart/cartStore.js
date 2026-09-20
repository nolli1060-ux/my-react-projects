import { create } from "zustand";
import { persist } from "zustand/middleware";

function normalizeItems(items = []) {
  return items.reduce((cart, dish) => {
    const existing = cart.find((item) => item.id === dish.id);
    const quantity = dish.quantity ?? 1;

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...dish, quantity });
    }

    return cart;
  }, []);
}

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (dish) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === dish.id);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === dish.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return { items: [...state.items, { ...dish, quantity: 1 }] };
        }),
      increase: (id) =>
        set((state) => ({
          items: state.items.map((dish) =>
            dish.id === id ? { ...dish, quantity: dish.quantity + 1 } : dish
          ),
        })),
      decrease: (id) =>
        set((state) => ({
          items: state.items
            .map((dish) =>
              dish.id === id ? { ...dish, quantity: dish.quantity - 1 } : dish
            )
            .filter((dish) => dish.quantity > 0),
        })),
      remove: (id) =>
        set((state) => ({
          items: state.items.filter((dish) => dish.id !== id),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "addis-eats-cart",
      version: 1,
      migrate: (persistedState) => ({
        ...persistedState,
        items: normalizeItems(persistedState.items),
      }),
    }
  )
);
