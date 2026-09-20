import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useCart } from "../cart/useCart";
import CategoryBar from "../menu/CategoryBar";
import DishList from "../menu/DishList";

const CATEGORIES = ["All", "Main", "Grill", "Vegan"];

export function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";
  const [searchQuery, setSearchQuery] = useState("");

  const { data: dishes, loading, error } = useFetch("/dishes.json");
  const { addItem } = useCart();

  function handleCategoryChange(cat) {
    const nextParams = new URLSearchParams(searchParams);
    if (cat.toLowerCase() === "all") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", cat);
    }
    setSearchParams(nextParams);
  }

  function handleResetFilters() {
    setSearchQuery("");
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("category");
    setSearchParams(nextParams);
  }

  const filteredDishes = useMemo(() => {
    if (!dishes) return [];

    return dishes
      .filter((dish) => {
        if (selectedCategory.toLowerCase() === "all") return true;
        return dish.category.toLowerCase() === selectedCategory.toLowerCase();
      })
      .filter((dish) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          dish.name.toLowerCase().includes(q) ||
          dish.description.toLowerCase().includes(q)
        );
      });
  }, [dishes, selectedCategory, searchQuery]);

  return (
    <section className="menu-section">
      <div className="section-header">
        <div>
          <h2>Our Menu</h2>
          <p>Authentic Ethiopian dishes prepared fresh to order.</p>
        </div>
      </div>

      {/* Category filter bar stored in URL query string */}
      <CategoryBar
        categories={CATEGORIES}
        selected={selectedCategory}
        onSelect={handleCategoryChange}
      />

      {/* Search Input */}
      <div className="search-container">
        <label htmlFor="dish-search">Search dishes by name or ingredients:</label>
        <input
          id="dish-search"
          type="search"
          placeholder="e.g. Tibs, Kurt, Kitfo, Shiro..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Status states */}
      {loading && (
        <div className="skeleton">
          <p>Loading menu items from Addis Eats...</p>
        </div>
      )}

      {error && (
        <div className="status error" role="alert">
          <h3>Failed to load menu</h3>
          <p>{error}</p>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <DishList
          dishes={filteredDishes}
          onAddToCart={addItem}
          searchTerm={searchQuery}
          onResetFilter={handleResetFilters}
        />
      )}
    </section>
  );
}

export default Menu;
