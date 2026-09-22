import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../api/orders";
import { useCart } from "../cart/CartContext";
import Field from "../ui/Field";
import { validateCheckout } from "./validate";

function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: ""
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  if (items.length === 0) {
    return (
      <section className="container page-space">
        <div className="status">
          <h2>Your cart is empty</h2>
          <p>Add at least one dish before checking out.</p>
          <button
            className="button button-primary"
            onClick={() => navigate("/menu")}
          >
            Browse Menu
          </button>
        </div>
      </section>
    );
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  }

  function handleBlur(event) {
    const { name } = event.target;

    setTouched((current) => ({
      ...current,
      [name]: true
    }));

    const nextErrors = validateCheckout(form);

    if (nextErrors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: nextErrors[name]
      }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateCheckout(form);

    setErrors(validationErrors);
    setTouched({
      name: true,
      phone: true,
      address: true
    });

    if (Object.keys(validationErrors).length > 0) {
      document.getElementById(Object.keys(validationErrors)[0])?.focus();
      return;
    }

    setSubmitting(true);

    try {
      const order = await placeOrder(form, items);
      setSuccess(order);
      clearCart();
    } catch (error) {
      setErrors(error.fieldErrors || {
        form: "We could not place your order. Please try again."
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <section className="container page-space">
        <div className="status success-state">
          <h2>Order placed successfully</h2>
          <p>
            Your order reference is <strong>{success.id}</strong>.
          </p>
          <button
            className="button button-primary"
            onClick={() => navigate("/menu")}
          >
            Back to Menu
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container page-space narrow-page">
      <div className="page-title">
        <p className="eyebrow">CHECKOUT</p>
        <h1>Complete your order</h1>
        <p>Enter your details and confirm the order.</p>
      </div>

      {errors.form && (
        <div className="form-alert" role="alert">
          {errors.form}
        </div>
      )}

      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        <Field label="Full name" id="name" error={touched.name ? errors.name : undefined}>
          {(props) => (
            <input
              {...props}
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your name"
            />
          )}
        </Field>

        <Field label="Phone number" id="phone" error={touched.phone ? errors.phone : undefined}>
          {(props) => (
            <input
              {...props}
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="09XXXXXXXX"
            />
          )}
        </Field>

        <Field label="Delivery address" id="address" error={touched.address ? errors.address : undefined}>
          {(props) => (
            <textarea
              {...props}
              name="address"
              rows="4"
              value={form.address}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your delivery address"
            />
          )}
        </Field>

        <div className="checkout-total">
          <span>Order total</span>
          <strong>{total.toFixed(2)} ETB</strong>
        </div>

        <button
          type="submit"
          className="button button-primary full-width"
          disabled={submitting}
        >
          {submitting ? "Placing order..." : "Place Order"}
        </button>
      </form>
    </section>
  );
}

export default Checkout;