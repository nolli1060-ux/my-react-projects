import { useEffect, useRef, useState } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import { loadDishes } from "./api";

function Menu() {
  const [category, setCategory] = useState("All");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    if (!loading) searchRef.current?.focus();
  }, [loading]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDishes() {
      setLoading(true);
      setError("");

      try {
        const loadedDishes = await loadDishes(category, controller.signal);
        setDishes(loadedDishes.map(dish => ({ ...dish, quantity: 0 })));
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message || "Could not load dishes.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchDishes();
    return () => controller.abort();
  }, [category]);

  function updateQuantity(dishId, change) {
    setDishes(currentDishes => currentDishes.map(dish => (
      dish.id === dishId
        ? { ...dish, quantity: Math.max(0, dish.quantity + change) }
        : dish
    )));
  }

  const visibleDishes = dishes.filter(dish =>
    dish.name.toLowerCase().includes(search.toLowerCase())
  );
  const total = dishes.reduce((sum, dish) => sum + dish.price * dish.quantity, 0);

  if (loading) return <p className="status">Loading dishes...</p>;
  if (error) return <p className="status error">Error: {error}</p>;

  return (
    <section className="menu-section">
      <CategoryBar selected={category} onSelect={setCategory} />
      <label htmlFor="search">Search dishes</label>
      <input
        ref={searchRef}
        id="search"
        value={search}
        onChange={event => setSearch(event.target.value)}
        placeholder="Search by name"
      />
      <h2>Total Order: {total} ETB</h2>
      <DishList
        dishes={visibleDishes}
        onAddToOrder={dish => updateQuantity(dish.id, 1)}
        onRemoveFromOrder={dish => updateQuantity(dish.id, -1)}
      />
    </section>
  );
}

export default Menu;
