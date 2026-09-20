import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import { useFetch } from "./hooks/useFetch";
import { useCartStore } from "./cart/cartStore";

function Menu() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") ?? "All";
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  const { data, loading, error } = useFetch("/dishes.json");
  const addItem = useCartStore((s) => s.addItem);
  const remove = useCartStore((s) => s.remove);

  const shown = useMemo(() => {
    return (data ?? [])
      .filter((dish) => category === "All" || dish.category === category)
      .filter((dish) => dish.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.price - b.price);
  }, [data, category, search]);

  function choose(cat) {
    setParams({ category: cat });
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
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by name"
      />

      <DishList
        dishes={shown}
        onAddToOrder={addItem}
        onRemoveFromOrder={(dish) => remove(dish.id)}
      />
    </section>
  );
}

export default Menu;
