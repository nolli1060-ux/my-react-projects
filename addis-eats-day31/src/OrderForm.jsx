import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./cart/CartProvider";

function OrderForm() {
  const { items, total, dispatch } = useContext(CartContext);
  const [form, setForm] = useState({ name: "", phone: "", area: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm(currentForm => ({ ...currentForm, [name]: value }));
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (items.length === 0) return;

    setSubmitted(true);
    dispatch({ type: "clear" });
  }

  if (items.length === 0 && !submitted) {
    return (
      <section className="order-section">
        <h2>Checkout</h2>
        <p>Your cart is empty.</p>
        <Link className="primary-link" to="/menu">Back to menu</Link>
      </section>
    );
  }

  return (
    <section className="order-section">
      <h2>Complete your order</h2>
      <div className="checkout-grid">
        <div className="checkout-panel">
          <h3>Your cart</h3>
          <ul className="cart-list">
            {items.map((dish, index) => (
              <li key={`${dish.id}-${index}`}>
                <span>{dish.name}</span>
                <span>{dish.price} ETB</span>
              </li>
            ))}
          </ul>
          <strong>Total: {total} ETB</strong>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />

          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone (+2519........)" inputMode="tel" required />

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

          <button type="submit" disabled={items.length === 0}>Pay with TeleBirr</button>
          {submitted && <p className="success" role="status">Order received for {form.name} in {form.area}.</p>}
        </form>
      </div>
    </section>
  );
}

export default OrderForm;
