export function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const existingItem = state.items.find(item => item.id === action.dish.id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.dish.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.dish, quantity: 1 }]
      };
    }

    case "remove": {
      if (typeof action.index === "number") {
        const nextItems = [...state.items];
        const item = nextItems[action.index];

        if (!item) {
          return state;
        }

        if (item.quantity > 1) {
          nextItems[action.index] = { ...item, quantity: item.quantity - 1 };
          return { ...state, items: nextItems };
        }

        return {
          ...state,
          items: nextItems.filter((_, i) => i !== action.index)
        };
      }

      const itemToRemove = state.items.find(item => item.id === action.id);

      if (!itemToRemove) {
        return state;
      }

      if (itemToRemove.quantity > 1) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        };
      }

      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      };
    }

    case "clear":
      return { items: [] };

    default:
      throw new Error("Unknown action: " + action.type);
  }
}
