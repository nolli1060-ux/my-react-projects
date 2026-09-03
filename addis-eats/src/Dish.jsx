import { useState } from "react";

function Dish({ dish, onAddToOrder, onRemoveFromOrder }) {
  const [count, setCount] = useState(0);

  function handleAdd() {
    setCount(currentCount => currentCount + 1);
    onAddToOrder(dish.price);
  }

  function handleRemove() {
    if (count === 0) return;

    setCount(currentCount => currentCount - 1);
    onRemoveFromOrder(dish.price);
  }

  return (
    <article className="dish-card">
      <div>
        <h3>{dish.name}</h3>
        <p>{dish.category}{dish.spicy ? " - spicy" : ""}</p>
      </div>
      <strong>{dish.price} ETB</strong>
      <div className="dish-actions">
        <button type="button" onClick={handleRemove} disabled={count === 0}>
          Remove
        </button>
        <span className="dish-count">{count}</span>
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>
    </article>
  );
}

export default Dish;