import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export function Login() {
  const { login } = useAuth();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const destination = location.state?.from?.pathname || "/checkout";

  function handleSubmit(e) {
    e.preventDefault();
    const cleanPhone = phone.trim();

    if (!cleanPhone) {
      setError("Please enter your phone number to sign in.");
      return;
    }

    if (!/^(?:\+251|0)9\d{8}$/.test(cleanPhone)) {
      setError("Please enter a valid Ethiopian phone number (e.g. 0911234567).");
      return;
    }

    login(cleanPhone);
    navigate(destination, { replace: true });
  }

  return (
    <section className="login-section">
      <h2>Sign In to Addis Eats</h2>
      <p>Enter your phone number to manage your deliveries and complete checkout.</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="login-phone">TeleBirr / Mobile Phone:</label>
          <input
            id="login-phone"
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setError("");
            }}
            placeholder="0911234567"
            autoFocus
          />
          {error && (
            <p className="field-error" role="alert">
              <span>⚠️</span> {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="primary-btn"
          style={{ width: "100%", padding: "12px", marginTop: "12px" }}
        >
          Continue to Checkout →
        </button>
      </form>
    </section>
  );
}

export default Login;
