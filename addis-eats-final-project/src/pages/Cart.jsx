import { Link } from "react-router-dom";
import { useCart } from "../cart/useCart";

export function Cart() {
  const { items, itemCount, totalAmount, increase, decrease, remove, clear } =
    useCart();

  if (items.length === 0) {
    return (
      <section className="status" role="region" aria-label="Empty cart">
        <h2>Your order is empty</h2>
        <p>You haven't added any Ethiopian delicacies to your order yet.</p>
        <Link to="/menu" className="primary-link">
          Browse Menu Now →
        </Link>
      </section>
    );
  }

  return (
    <section className="cart-section">
      <div className="section-header">
        <div>
          <h2>Your Cart</h2>
          <p>
            Review your selected dishes ({itemCount} {itemCount === 1 ? "item" : "items"}).
          </p>
        </div>
        <button
          type="button"
          className="btn-remove"
          onClick={clear}
          title="Remove all items from your order"
        >
          Clear entire cart
        </button>
      </div>

      <div className="cart-table-wrapper">
        <ul className="cart-list">
          {items.map((dish) => {
            const itemSubtotal = dish.price * (dish.quantity || 1);
            return (
              <li key={dish.id} className="cart-item">
                <div className="cart-item-main">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="cart-item-thumb"
                  />
                  <div className="cart-item-details">
                    <strong>{dish.name}</strong>
                    <span>
                      {dish.category} • {dish.price} ETB each
                    </span>
                  </div>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() => decrease(dish.id)}
                      aria-label={`Decrease quantity of ${dish.name}`}
                    >
                      -
                    </button>
                    <span>{dish.quantity || 1}</span>
                    <button
                      type="button"
                      onClick={() => increase(dish.id)}
                      aria-label={`Increase quantity of ${dish.name}`}
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-item-subtotal">
                    {itemSubtotal} ETB
                  </div>

                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => remove(dish.id)}
                    aria-label={`Remove ${dish.name} from order`}
                  >
                    Remove
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="cart-summary-bar">
        <div className="cart-total-info">
          <span className="cart-total-label">Total to pay:</span>
          <span className="cart-total-amount">{totalAmount} ETB</span>
        </div>

        <div className="cart-buttons">
          <Link to="/menu" className="secondary-link">
            ← Add more dishes
          </Link>
          <Link to="/checkout" className="primary-link">
            Proceed to Checkout →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cart;
