import Menu from "./Menu";
import OrderForm from "./OrderForm";
import { dishes } from "./data";

function App() {
  return (
    <main>
      <header>
        <h1>Addis Eats</h1>
        <p>Your favourite dishesh with a special recipe.</p>
      </header>
      <Menu dishes={dishes} />
      <section>
        <h2>Complete your order</h2>
        <OrderForm />
      </section>
    </main>
  );
}

export default App;