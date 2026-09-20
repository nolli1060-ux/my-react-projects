import { Link, NavLink, Outlet } from "react-router-dom";
import { UtensilsCrossed, ShoppingCart, User, MapPin, Phone, Mail } from "lucide-react";
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
              <UtensilsCrossed size={22} />
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
            <ShoppingCart size={16} aria-hidden="true" />
            <span>Order</span>
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
          to="/about"
          className={({ isActive }) => (isActive ? "on" : "")}
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "on" : "")}
        >
          Contact
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
              <span className="user-label">
                <User size={14} aria-hidden="true" /> {user.phone}
              </span>
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
      <footer className="footer">
        <div className="footer-links">
          <div className="footer-brand">
            <strong>Addis Eats</strong>
            <p>Bringing traditional Ethiopian dining and hospitality directly to your door.</p>
          </div>
          <div className="footer-nav">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/cart">My Cart</Link>
          </div>
          <div className="footer-contact">
            <h4>Delivery Info</h4>
            <p>
              <MapPin size={14} aria-hidden="true" /> Addis Ababa, Ethiopia
            </p>
            <p>
              <Phone size={14} aria-hidden="true" /> +251 911 234 567
            </p>
            <p>
              <Mail size={14} aria-hidden="true" /> support@addiseats.et
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} Addis Eats. All rights reserved.</div>
          <div>Accepting TeleBirr, CBE Birr & Cash on Delivery.</div>
        </div>
      </footer>
    </main>
  );
}

export default Layout;
