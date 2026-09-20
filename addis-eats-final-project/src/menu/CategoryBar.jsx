export function CategoryBar({ categories = ["All", "Main", "Grill", "Vegan"], selected, onSelect }) {
  return (
    <nav className="category-nav" aria-label="Dish categories">
      {categories.map((cat) => {
        const isSelected = selected.toLowerCase() === cat.toLowerCase();
        return (
          <button
            key={cat}
            type="button"
            className={isSelected ? "chip on" : "chip"}
            onClick={() => onSelect(cat)}
            aria-pressed={isSelected}
          >
            {cat}
          </button>
        );
      })}
    </nav>
  );
}

export default CategoryBar;
