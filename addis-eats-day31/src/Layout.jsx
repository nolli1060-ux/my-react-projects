import { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { CartContext } from "./cart/CartProvider";

function Header() {
  const { items } = useContext(CartContext);

  return (
    <header>
      <div className="header-row">
        <div>
          <Link to="/" className="brand-link">
            <h1>Addis Eats</h1>
          </Link>
          <p>Your favourite dishes with a special recipe!</p>
        </div>
        <strong className="cart-badge">Cart: {items.length}</strong>
      </div>
    </header>
  );
}

function Layout() {
  return (
    <main>
      <Header />
      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/" end className={({ isActive }) => isActive ? "on" : ""}>
          Home
        </NavLink>
        <NavLink to="/menu" className={({ isActive }) => isActive ? "on" : ""}>
          Menu
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => isActive ? "on" : ""}>
          Cart
        </NavLink>
        <NavLink to="/checkout" className={({ isActive }) => isActive ? "on" : ""}>
          Checkout
        </NavLink>
      </nav>
      <Outlet />
      <footer>© Addis Eats</footer>
    </main>
  );
}

export default Layout;
