import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "./CartContext";

function Cart() {
  const navigate = useNavigate();
  const {
    items,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeItem
  } = useCart();

  if (items.length === 0) {
    return (
      <section className="container page-space">
        <div className="page-title">
          <p className="eyebrow">YOUR ORDER</p>
          <h1>Cart</h1>
        </div>

        <div className="status">
          <h2>Your cart is empty</h2>
          <p>Add a dish from the menu before continuing to checkout.</p>
          <Link to="/menu" className="button button-primary">Browse Menu</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container page-space">
      <div className="page-title">
        <p className="eyebrow">YOUR ORDER</p>
        <h1>Cart</h1>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <div className="cart-item-image">
                <img src={item.image} alt="" />
              </div>

              <div className="cart-item-info">
                <h2>{item.name}</h2>
                <p>{item.price.toFixed(2)} ETB each</p>

                <div className="quantity-controls">
                  <button
                    type="button"
                    aria-label={`Decrease ${item.name} quantity`}
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    <Minus size={16} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() => increaseQuantity(item.id)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="cart-item-total">
                <strong>{(item.price * item.quantity).toFixed(2)} ETB</strong>
                <button
                  type="button"
                  className="icon-button danger"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order summary</h2>
          <div className="summary-row">
            <span>Items</span>
            <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </div>
          <div className="summary-row total-row">
            <strong>Total</strong>
            <strong>{total.toFixed(2)} ETB</strong>
          </div>

          <button
            type="button"
            className="button button-primary full-width"
            onClick={() => navigate("/checkout")}
          >
            Continue to Checkout
          </button>
        </aside>
      </div>
    </section>
  );
}

export default Cart;