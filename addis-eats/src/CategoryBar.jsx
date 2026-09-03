function CategoryBar({ selected, onSelect }) {
  const cats = ["All", "Main", "Vegan", "Grill"];

  return (
    <nav className="category-nav" aria-label="Dish categories">
      {cats.map(cat => (
        <button
          key={cat}
          className={cat === selected ? "chip on" : "chip"}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
}

export default CategoryBar;