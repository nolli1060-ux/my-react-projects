function CategoryBar({ selected, onSelect }) {
  const categories = ["All", "Main", "Vegan", "Grill"];

  return (
    <nav className="category-nav" aria-label="Dish categories">
      {categories.map(category => (
        <button
          key={category}
          type="button"
          className={category === selected ? "chip on" : "chip"}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </nav>
  );
}

export default CategoryBar;
