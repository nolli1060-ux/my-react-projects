import { useContext, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import { useFetch } from "./hooks/useFetch";
import { CartContext } from "./cart/CartProvider";

function Menu() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") ?? "All";
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  const { data, loading, error } = useFetch("/dishes.json");
  const { dispatch } = useContext(CartContext);

  const shown = useMemo(() => {
    return (data ?? [])
      .filter(dish => category === "All" || dish.category === category)
      .filter(dish => dish.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.price - b.price);
  }, [data, category, search]);

  function choose(cat) {
    setParams({ category: cat });
  }

  function addToOrder(dish) {
    dispatch({ type: "add", dish });
  }

  function removeFromOrder(dish) {
    dispatch({ type: "remove", id: dish.id });
  }

  if (loading) return <p className="status">Loading dishes...</p>;
  if (error) return <p className="status error">Error: {error}</p>;

  return (
    <section className="menu-section">
      <h2>Menu</h2>
      <CategoryBar selected={category} onSelect={choose} />

      <label htmlFor="search">Search dishes</label>
      <input
        ref={searchRef}
        id="search"
        value={search}
        onChange={event => setSearch(event.target.value)}
        placeholder="Search by name"
      />

      <DishList
        dishes={shown}
        onAddToOrder={addToOrder}
        onRemoveFromOrder={removeFromOrder}
      />
    </section>
  );
}

export default Menu;
