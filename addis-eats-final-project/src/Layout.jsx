import { Link, NavLink, Outlet } from "react-router-dom";
import { useCart } from "./cart/useCart";
import { useAuth } from "./auth/useAuth";

function Header() {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <header>
      <div className="header-row">
        <Link to="/" className="brand-link">
          <div className="brand-row">
            <div className="brand-icon" aria-hidden="true">
              🥘
            </div>
            <div>
              <h1>Addis Eats</h1>
              <p className="header-tagline">
                Authentic Ethiopian Cuisine • Addis Ababa
              </p>
            </div>
          </div>
        </Link>

        <Link to="/cart" className="cart-badge-link" aria-label={`Cart with ${itemCount} items`}>
          <div className="cart-badge">
            <span>🛒 Order</span>
            <span className="cart-count">{itemCount}</span>
          </div>
        </Link>
      </div>

      <nav className="main-nav" aria-label="Main Navigation">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "on" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/menu"
          className={({ isActive }) => (isActive ? "on" : "")}
        >
          Menu
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? "on" : "")}
        >
          Cart ({itemCount})
        </NavLink>
        <NavLink
          to="/checkout"
          className={({ isActive }) => (isActive ? "on" : "")}
        >
          Checkout
        </NavLink>

        <div className="nav-user">
          {user ? (
            <>
              <span>👤 {user.phone}</span>
              <button
                type="button"
                className="btn-signout"
                onClick={logout}
                title="Sign out of Addis Eats"
              >
                Sign out
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "on" : "")}
            >
              Sign In
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}

export function Layout() {
  return (
    <main>
      <Header />
      <Outlet />
      <footer>
        <div>© {new Date().getFullYear()} Addis Eats — Bringing traditional flavours to your table.</div>
        <div>Addis Ababa, Ethiopia • TeleBirr & Cash on Delivery</div>
      </footer>
    </main>
  );
}

export default Layout;
