import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useCart } from "../cart/useCart";

export function DishDetail() {
  const { id } = useParams();
  const { data: dishes, loading, error } = useFetch("/dishes.json");
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (loading) {
    return (
      <div className="skeleton" style={{ minHeight: "360px" }}>
        <p>Loading dish details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status error" role="alert">
        <h2>Could not load dish</h2>
        <p>{error}</p>
        <Link to="/menu" className="secondary-link">
          Back to Menu
        </Link>
      </div>
    );
  }

  const dish = (dishes || []).find((item) => String(item.id) === String(id));

  // Friendly failure state: Dish Not Found
  if (!dish) {
    return (
      <section className="status" role="region" aria-label="Dish not found">
        <h2>Dish not found</h2>
        <p>
          We could not find any dish with ID "{id}". It may have been removed or
          the link is incorrect.
        </p>
        <Link to="/menu" className="primary-link">
          ← Back to Menu
        </Link>
      </section>
    );
  }

  function handleAddToCart() {
    addItem(dish, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="detail-container">
      <Link to="/menu" className="back-link">
        ← Back to full menu
      </Link>

      <section className="detail-section">
        <div className="detail-image-wrapper">
          <img src={dish.image} alt={dish.name} className="detail-image" />
        </div>

        <div className="detail-content">
          <div className="detail-tags">
            <span className="detail-tag">{dish.category}</span>
            {dish.spicy ? (
              <span className="detail-tag spicy">Spicy 🌶️</span>
            ) : (
              <span className="detail-tag">Mild</span>
            )}
          </div>

          <h2>{dish.name}</h2>
          <p className="detail-description">{dish.description}</p>
          <div className="detail-price">{dish.price} ETB</div>

          <div className="quantity-row">
            <label htmlFor="dish-qty" style={{ fontWeight: 600, color: "#52616a" }}>
              Quantity:
            </label>
            <div className="quantity-controls" id="dish-qty">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <button
              type="button"
              className={added ? "primary-btn btn-added" : "primary-btn"}
              onClick={handleAddToCart}
            >
              {added
                ? `✓ Added ${quantity} to order!`
                : `Add to order (${dish.price * quantity} ETB)`}
            </button>
            <Link to="/cart" className="secondary-link">
              Go to Cart
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DishDetail;
