import { useState } from "react";
import { Link } from "react-router-dom";
import { Flame, Check } from "lucide-react";

export function DishCard({ dish, onAddToCart, onQuickView }) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    onAddToCart(dish);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article className="dish-card">
      <div className="dish-image-wrapper">
        <img src={dish.image} alt={dish.name} className="dish-image" loading="lazy" />
        {dish.spicy ? (
          <span className="dish-badge spicy">
            <Flame size={12} aria-hidden="true" /> Spicy
          </span>
        ) : (
          <span className="dish-badge">Mild</span>
        )}
      </div>

      <div className="dish-info">
        <Link to={`/menu/${dish.id}`} className="dish-link">
          <h3>{dish.name}</h3>
        </Link>
        <p className="dish-description">{dish.description}</p>
      </div>

      <div className="dish-meta">
        <span className="dish-category">{dish.category}</span>
        <span className="dish-price">{dish.price} ETB</span>
      </div>

      <div className="dish-actions">
        <button
          type="button"
          className={added ? "btn-added" : ""}
          onClick={handleAdd}
          aria-label={`Add ${dish.name} to cart`}
        >
          {added ? (
            <>
              <Check size={14} aria-hidden="true" /> Added
            </>
          ) : (
            "Add to order"
          )}
        </button>
        <button
          type="button"
          className="btn-detail"
          onClick={() => onQuickView(dish)}
          title="Quick preview"
        >
          Preview
        </button>
        <Link to={`/menu/${dish.id}`} className="btn-detail" title="View full details">
          Details
        </Link>
      </div>
    </article>
  );
}

export default DishCard;
