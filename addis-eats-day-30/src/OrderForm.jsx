import { useContext, useState } from "react";
import { CartContext } from "./cart/CartProvider";

function OrderForm() {
  const { items, total, dispatch } = useContext(CartContext);
  const [form, setForm] = useState({ name: "", phone: "", area: "" });
  const [submitted, setSubmitted] = useState(false);
  const phoneValid = /^(?:\+251|0)9\d{8}$/.test(form.phone);
  const valid = form.name.trim().length > 0 && phoneValid && form.area && items.length > 0;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm(currentForm => ({ ...currentForm, [name]: value }));
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (valid) setSubmitted(true);
  }

  return (
    <div className="checkout-grid">
      <div className="checkout-panel">
        <h3>Your cart</h3>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="cart-list">
            {items.map((dish, index) => (
              <li key={`${dish.id}-${index}`} className="cart-item">
                <div className="cart-item-main">
                  <span>{dish.name}</span>
                  <span>{dish.price * dish.quantity} ETB</span>
                </div>

                <div className="cart-quantity-controls">
                  <button
                    type="button"
                    className="qty-button"
                    onClick={() => dispatch({ type: "remove", index })}
                    aria-label={`Decrease ${dish.name}`}
                  >
                    −
                  </button>
                  <span className="qty-number">{dish.quantity}</span>
                  <button
                    type="button"
                    className="qty-button"
                    onClick={() => dispatch({ type: "add", dish })}
                    aria-label={`Increase ${dish.name}`}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <strong>Total: {total} ETB</strong>
        {items.length > 0 && (
          <button
            className="clear-button"
            type="button"
            onClick={() => dispatch({ type: "clear" })}
          >
            Clear cart
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />

        <label htmlFor="phone">Phone</label>
        <input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone (+2519........)" inputMode="tel" required />
        {form.phone && !phoneValid && <p className="err">Use +2519...</p>}

        <label htmlFor="area">Delivery area</label>
        <select id="area" name="area" value={form.area} onChange={handleChange} required>
          <option value="">Select an area</option>
          <option>Bole</option>
          <option>Megenagna</option>
          <option>4 Killo</option>
          <option>6 Killo</option>
          <option>Piassa</option>
          <option>Kasanchis</option>
          <option>CMC</option>
          <option>Ayat</option>
        </select>

        <button type="submit" disabled={!valid}>Pay with TeleBirr</button>
        {submitted && <p className="success" role="status">Order received for {form.name} in {form.area}.</p>}
      </form>
    </div>
  );
}

export default OrderForm;
