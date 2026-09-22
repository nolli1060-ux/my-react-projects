import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/checkout";

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setError("");
    await signIn({ email });
    navigate(from, { replace: true });
  }

  return (
    <section className="container page-space narrow-page">
      <div className="page-title">
        <p className="eyebrow">SIGN IN</p>
        <h1>Sign in to continue</h1>
        <p>You need to sign in before checking out.</p>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
            }}
            placeholder="you@example.com"
          />
          {error && <p className="field-error">{error}</p>}
        </div>

        <button className="button button-primary full-width" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </section>
  );
}

export default Login;