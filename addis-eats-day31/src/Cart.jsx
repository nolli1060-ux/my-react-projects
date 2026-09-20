import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./cart/CartProvider";

function Cart() {
  const { items, total, dispatch } = useContext(CartContext);

  return (
    <section className="cart-section">
      <h2>Your cart</h2>
      {items.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <Link className="primary-link" to="/menu">Browse menu</Link>
        </>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((dish, index) => (
              <li key={`${dish.id}-${index}`}>
                <span>{dish.name}</span>
                <span>{dish.price} ETB</span>
                <button type="button" onClick={() => dispatch({ type: "remove", id: dish.id })}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <strong>Total: {total} ETB</strong>
          <div className="cart-actions">
            <button type="button" onClick={() => dispatch({ type: "clear" })}>Clear cart</button>
            <Link className="primary-link" to="/checkout">Checkout</Link>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;
