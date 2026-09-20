import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../cart/useCart";
import { useAuth } from "../auth/useAuth";
import Field from "../checkout/Field";
import { DELIVERY_AREAS, validateCheckoutForm } from "../checkout/validate";
import { placeOrder } from "../api/orders";

export function Checkout() {
  const { items, totalAmount, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: user?.phone || "",
    area: "Bole",
    notes: "",
  });

  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const summaryAlertRef = useRef(null);

  const clientErrors = validateCheckoutForm(form);
  const errors = { ...clientErrors, ...serverErrors };
  const hasErrors = Object.keys(errors).length > 0;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (serverErrors[name]) {
      setServerErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    setServerError("");
  }

  function handleBlur(name) {
    setTouched((t) => ({ ...t, [name]: true }));
  }

  function getFieldError(name) {
    return (touched[name] || submitted) ? errors[name] : undefined;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;

    setSubmitted(true);
    setServerError("");
    setServerErrors({});

    const validation = validateCheckoutForm(form);
    if (Object.keys(validation).length > 0) {
      const firstErrorField = Object.keys(validation)[0];
      document.getElementById(firstErrorField)?.focus();
      summaryAlertRef.current?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const order = await placeOrder(form, items);
      clear();
      navigate(`/orders/${order.id}`, { replace: true });
    } catch (err) {
      if (err.status === 422 && err.fieldErrors) {
        setServerErrors(err.fieldErrors);
        const first = Object.keys(err.fieldErrors)[0];
        if (first) {
          setTouched((t) => ({ ...t, [first]: true }));
          document.getElementById(first)?.focus();
        }
      } else {
        setServerError("Could not place order. Please verify details and try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  // Handle empty cart
  if (items.length === 0) {
    return (
      <section className="status" role="region" aria-label="Empty cart at checkout">
        <h2>Your order is empty</h2>
        <p>You cannot checkout with an empty cart. Please add dishes from our menu first.</p>
        <Link to="/menu" className="primary-link">
          Browse Menu Now →
        </Link>
      </section>
    );
  }

  return (
    <section className="checkout-section">
      <div className="section-header">
        <div>
          <h2>Checkout & Delivery</h2>
          <p>Provide your delivery details to complete your order in Addis Ababa.</p>
        </div>
      </div>

      <div className="checkout-grid">
        {/* Checkout Form */}
        <div className="checkout-card">
          <h3>Delivery Details</h3>

          {submitted && hasErrors && (
            <div
              ref={summaryAlertRef}
              role="alert"
              className="summary-alert"
              tabIndex="-1"
              aria-labelledby="summary-alert-title"
            >
              <p id="summary-alert-title">
                ⚠️ Please correct the following {Object.keys(errors).length}{" "}
                {Object.keys(errors).length === 1 ? "field" : "fields"} before
                proceeding:
              </p>
              <ul>
                {Object.entries(errors).map(([field, message]) => (
                  <li key={field}>
                    <a
                      href={`#${field}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(field)?.focus();
                      }}
                    >
                      {message}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <Field label="Full Name" id="name" error={getFieldError("name")}>
              {(props) => (
                <input
                  {...props}
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur("name")}
                  autoComplete="name"
                  placeholder="e.g. Abebe Bikila"
                />
              )}
            </Field>

            <Field
              label="TeleBirr Phone Number"
              id="phone"
              error={getFieldError("phone")}
            >
              {(props) => (
                <input
                  {...props}
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={() => handleBlur("phone")}
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="0911234567 or +251911234567"
                />
              )}
            </Field>

            <Field
              label="Delivery Area in Addis Ababa"
              id="area"
              error={getFieldError("area")}
            >
              {(props) => (
                <select
                  {...props}
                  name="area"
                  value={form.area}
                  onChange={handleChange}
                  onBlur={() => handleBlur("area")}
                >
                  <option value="">Select a neighbourhood</option>
                  {DELIVERY_AREAS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              )}
            </Field>

            <Field
              label="Delivery Notes & Specific Directions (Optional)"
              id="notes"
              error={getFieldError("notes")}
            >
              {(props) => (
                <textarea
                  {...props}
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  onBlur={() => handleBlur("notes")}
                  maxLength={200}
                  rows={3}
                  placeholder="e.g. Near Edna Mall, House #104, call upon arrival"
                />
              )}
            </Field>

            {serverError && (
              <p className="field-error" role="alert" style={{ marginBottom: "16px" }}>
                <span>⚠️</span> {serverError}
              </p>
            )}

            <button
              type="submit"
              className="primary-btn"
              disabled={submitting}
              style={{ width: "100%", padding: "14px" }}
            >
              {submitting
                ? "Placing your order with Addis Eats..."
                : `Place Order — ${totalAmount} ETB`}
            </button>
          </form>
        </div>

        {/* Order Summary on right */}
        <div className="checkout-card">
          <h3>Your Order Summary</h3>
          <ul className="order-items-preview">
            {items.map((item) => (
              <li key={item.id}>
                <span>
                  {item.name} × {item.quantity || 1}
                </span>
                <strong>{item.price * (item.quantity || 1)} ETB</strong>
              </li>
            ))}
          </ul>

          <div className="order-total-row">
            <span>Total:</span>
            <span>{totalAmount} ETB</span>
          </div>

          <div style={{ background: "#f7f9fa", padding: "14px", borderRadius: "10px", fontSize: "0.85rem", color: "#687780" }}>
            <p style={{ margin: "0 0 6px", fontWeight: 700, color: "#16232c" }}>
              💳 Payment on Delivery
            </p>
            <p style={{ margin: 0 }}>
              Payment is accepted via TeleBirr, CBE Birr, or cash when your hot food arrives at your door.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
