import { Link } from "react-router-dom";
import { useCartStore } from "./cart/cartStore";

function Cart() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) =>
    s.items.reduce((sum, dish) => sum + dish.price * (dish.quantity ?? 1), 0),
  );
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);

  return (
    <section className="cart-section">
      <h2>Your cart</h2>
      {items.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <Link className="primary-link" to="/menu">
            Browse menu
          </Link>
        </>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((dish) => (
              <li key={dish.id}>
                <div className="cart-item-info">
                  <strong>{dish.name}</strong>
                  <span>Price: {dish.price} ETB</span>
                  <div className="quantity-controls">
                    <button
                      type="button"
                      aria-label={`Decrease ${dish.name} quantity`}
                      onClick={() => decrease(dish.id)}
                    >
                      -
                    </button>
                    <span>{dish.quantity ?? 1}</span>
                    <button
                      type="button"
                      aria-label={`Increase ${dish.name} quantity`}
                      onClick={() => increase(dish.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button type="button" onClick={() => remove(dish.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <strong>Total: {total} ETB</strong>
          <div className="cart-actions">
            <button type="button" onClick={clear}>
              Clear cart
            </button>
            <Link className="primary-link" to="/checkout">
              Checkout
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;
