export async function fetchDishes(signal) {
  const response = await fetch("/menu.json", { signal });

  if (!response.ok) {
    throw new Error("We could not load the menu. Please try again.");
  }

  return response.json();
}