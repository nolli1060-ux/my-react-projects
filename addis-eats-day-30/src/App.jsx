import { useContext } from "react";
import Menu from "./Menu";
import OrderForm from "./OrderForm";
import { CartContext, CartProvider } from "./cart/CartProvider";
import "./index.css";

function Header() {
  const { items } = useContext(CartContext);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header>
      <div className="header-row">
        <div>
          <h1>Addis Eats</h1>
          <p>Your favourite dishesh with a special recipe!</p>
        </div>
        <strong className="cart-badge">Cart: {totalQuantity}</strong>
      </div>
    </header>
  );
}

function AppContent() {
  return (
    <main>
      <Header />
      <Menu />
      <section className="order-section">
        <h2>Complete your order</h2>
        <OrderForm />
      </section>
    </main>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
