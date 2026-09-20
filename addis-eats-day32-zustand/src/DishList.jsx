import { Link } from "react-router-dom";

function DishList({ dishes, onAddToOrder, onRemoveFromOrder }) {
  if (dishes.length === 0) {
    return <p>No dishes in this category yet.</p>;
  }

  return (
    <div className="dish-grid">
      {dishes.map(dish => (
        <article className="dish-card" key={dish.id}>
          <Link to={`/menu/${dish.id}`} className="dish-link">
            <img src={dish.image} alt={dish.name} className="dish-image" />
            <div className="dish-info">
              <h3>{dish.name}</h3>
              <p>{dish.category}{dish.spicy ? " - spicy" : ""}</p>
            </div>
          </Link>
          <strong>{dish.price} ETB</strong>
          <div className="dish-actions">
            <button type="button" onClick={() => onRemoveFromOrder(dish)}>Remove</button>
            <button type="button" onClick={() => onAddToOrder(dish)}>Add</button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default DishList;
