export async function loadDishes(category, signal) {
  const query = category === "All" ? "" : `?category=${encodeURIComponent(category)}`;
  const response = await fetch(`/dishes.json${query}`, { signal });

  if (!response.ok) {
    throw new Error(`Could not load dishes (HTTP ${response.status}).`);
  }

  const dishes = await response.json();
  return category === "All"
    ? dishes
    : dishes.filter(dish => dish.category === category);
}
