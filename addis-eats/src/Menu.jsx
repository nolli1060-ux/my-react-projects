import { useState } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

function Menu({ dishes }) {
  const [category, setCategory] = useState("All");
  const [total, setTotal] = useState(0);

  const shown = category === "All"
    ? dishes
    : dishes.filter(d => d.category === category);

  function addToOrder(price) {
    setTotal(currentTotal => currentTotal + price);
  }

  function removeFromOrder(price) {
    setTotal(currentTotal => Math.max(0, currentTotal - price));
  }

  return (
    <section className="menu-section">
      <CategoryBar selected={category} onSelect={setCategory} />
      <h2>Total Order: {total} ETB</h2>
      <DishList
        dishes={shown}
        onAddToOrder={addToOrder}
        onRemoveFromOrder={removeFromOrder}
      />
    </section>
  );
}

export default Menu;