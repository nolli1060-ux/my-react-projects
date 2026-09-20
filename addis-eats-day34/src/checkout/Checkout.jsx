import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../cart/cartStore";
import Field from "./Field";
import { AREAS, validate } from "./validate";
import { placeOrder } from "../api/orders";

function Checkout() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) =>
    s.items.reduce((sum, dish) => sum + dish.price * (dish.quantity ?? 1), 0),
  );
  const clear = useCartStore((s) => s.clear);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    notes: "",
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const errors = { ...validate(form), ...serverErrors };
  const hasErrors = Object.keys(errors).length > 0;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setServerErrors((current) => {
      const next = { ...current };
      delete next[name];
      return next;
    });
    setServerError("");
  }

  function handleBlur(name) {
    setTouched((t) => ({ ...t, [name]: true }));
  }

  function showError(name) {
    return (touched[name] || submitted) && errors[name];
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;

    setSubmitted(true);
    setServerError("");
    setServerErrors({});

    const currentErrors = validate(form);
    if (Object.keys(currentErrors).length > 0) {
      const firstError = Object.keys(currentErrors)[0];
      document.getElementById(firstError)?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const order = await placeOrder(form);
      clear();
      navigate(`/orders/${order.id}`, { replace: true });
    } catch (error) {
      if (error.status === 422) {
        setServerErrors(error.fieldErrors || {});
        const firstError = Object.keys(error.fieldErrors || {})[0];
        if (firstError) {
          setTouched((t) => ({ ...t, [firstError]: true }));
          document.getElementById(firstError)?.focus();
        }
      } else {
        setServerError("We could not place your order. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <section className="order-section">
        <h2>Checkout</h2>
        <p>Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="order-section">
      <h2>Complete your order</h2>
      {submitted && hasErrors && (
        <div role="alert" className="summary">
          <p>Please fix {Object.keys(errors).length} fields:</p>
          <ul>
            {Object.entries(errors).map(([field, message]) => (
              <li key={field}>
                <a href={`#${field}`}>{message}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="checkout-grid">
        <div className="checkout-panel">
          <h3>Your cart</h3>
          <ul className="cart-list">
            {items.map((dish) => (
              <li key={dish.id}>
                <span>
                  {dish.name} x {dish.quantity ?? 1}
                </span>
                <span>{dish.price * (dish.quantity ?? 1)} ETB</span>
              </li>
            ))}
          </ul>
          <strong>Total: {total} ETB</strong>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <Field label="Name" id="name" error={showError("name")}>
            {(props) => (
              <input
                {...props}
                name="name"
                value={form.name}
                onChange={handleChange}
                onBlur={() => handleBlur("name")}
                autoComplete="name"
              />
            )}
          </Field>

          <Field label="TeleBirr number" id="phone" error={showError("phone")}>
            {(props) => (
              <input
                {...props}
                name="phone"
                value={form.phone}
                onChange={handleChange}
                onBlur={() => handleBlur("phone")}
                inputMode="tel"
                autoComplete="tel"
              />
            )}
          </Field>

          <Field label="Delivery area" id="area" error={showError("area")}>
            {(props) => (
              <select
                {...props}
                name="area"
                value={form.area}
                onChange={handleChange}
                onBlur={() => handleBlur("area")}
              >
                <option value="">Choose a delivery area</option>
                {AREAS.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            )}
          </Field>

          <Field label="Notes (optional)" id="notes" error={showError("notes")}>
            {(props) => (
              <textarea
                {...props}
                name="notes"
                value={form.notes}
                onChange={handleChange}
                onBlur={() => handleBlur("notes")}
                maxLength={200}
                rows="4"
              />
            )}
          </Field>

          <button type="submit" disabled={submitting || hasErrors}>
            {submitting ? "Sending your order…" : `Order — ${total} ETB`}
          </button>

          {serverError && (
            <p role="alert" className="err">
              {serverError}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Checkout;
