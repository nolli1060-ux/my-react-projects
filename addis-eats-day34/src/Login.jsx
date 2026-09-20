import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./auth/useAuth";

function Login() {
  const { login } = useAuth();
  const [phone, setPhone] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname ?? "/menu";

  async function signIn(event) {
    event.preventDefault();
    await login(phone);
    navigate(from, { replace: true });
  }

  return (
    <section className="login-section">
      <h2>Sign in to checkout</h2>
      <p>Enter your phone number to continue.</p>
      <form onSubmit={signIn}>
        <label htmlFor="login-phone">Phone</label>
        <input
          id="login-phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="09..."
          required
        />
        <button type="submit">Sign in</button>
      </form>
    </section>
  );
}

export default Login;
