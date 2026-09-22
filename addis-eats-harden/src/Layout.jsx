import { Link, NavLink, Outlet } from "react-router-dom";
import { ShoppingBag} from "lucide-react";
import { useCart } from "./cart/CartContext";
    
function Layout() {
  const { totalItems } = useCart();

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="Addis Eats home">
          <span>Addis Eats</span>
          </Link>

          <nav className="main-nav" aria-label="Main navigation">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/menu">Menu</NavLink>
            <NavLink to="/cart" className="cart-link">
              <ShoppingBag size={17} />
              <span>Cart</span>
              {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <strong>Addis Eats</strong>
            <p>Local dishes, simple ordering.</p>
          </div>
          <p>© 2026 Addis Eats</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;