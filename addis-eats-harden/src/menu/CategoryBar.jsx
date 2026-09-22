function CategoryBar({ categories, selected, onSelect }) {
  return (
    <div className="category-bar" aria-label="Menu categories">
      {categories.map((category) => (
        <button
          type="button"
          key={category}
          className={selected === category ? "category active" : "category"}
          onClick={() => onSelect(category)}
          aria-pressed={selected === category}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;