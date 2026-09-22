import { useSearchParams } from "react-router-dom";
import { fetchDishes } from "../api/menu";
import { useFetch } from "../hooks/useFetch";
import Spinner from "../ui/Spinner";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedCategory = searchParams.get("category");
  const selectedCategory =
    requestedCategory === "Breakfast" || !requestedCategory
      ? "All"
      : requestedCategory;
  const { data: dishes, loading, error } = useFetch(fetchDishes, []);

  const categories = dishes
    ? [
        "All",
        ...new Set(
          dishes
            .map((dish) => dish.category)
            .filter((category) => category !== "Breakfast")
        )
      ]
    : ["All"];

  const filteredDishes =
    dishes?.filter(
      (dish) =>
        selectedCategory === "All" || dish.category === selectedCategory
    ) || [];

  function handleCategoryChange(category) {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  }

  return (
    <section className="container page-space">
      <div className="page-title">
        <p className="eyebrow">THE MENU</p>
        <h1>Choose something from the kitchen.</h1>
        <p>Browse Ethiopian dishes and open any item for more details.</p>
      </div>

      <CategoryBar
        categories={categories}
        selected={selectedCategory}
        onSelect={handleCategoryChange}
      />

      {loading && <Spinner label="Loading the menu..." />}

      {error && (
        <div className="status error-state" role="alert">
          <h2>Menu unavailable</h2>
          <p>{error.message}</p>
          <button className="button button-secondary" onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      )}

      {!loading && !error && filteredDishes.length === 0 && (
        <div className="status">
          <h2>No dishes in this category</h2>
          <p>Choose another category to see more of the menu.</p>
        </div>
      )}

      {!loading && !error && filteredDishes.length > 0 && (
        <DishList dishes={filteredDishes} />
      )}
    </section>
  );
}

export default Menu;