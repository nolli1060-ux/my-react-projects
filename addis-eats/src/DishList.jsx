import Dish from "./Dish";

function DishList({ dishes, onAddToOrder, onRemoveFromOrder }) {
  if (dishes.length === 0) {
    return <p>No dishes in this category yet.</p>;
  }

  return (
    <div className="dish-grid">
      {dishes.map(d => (
        <Dish
          key={d.id}
          dish={d}
          onAddToOrder={onAddToOrder}
          onRemoveFromOrder={onRemoveFromOrder}
        />
      ))}
    </div>
  );
}

export default DishList;
