import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./ui/Modal";

function DishCard({ dish, onAddToOrder, onRemoveFromOrder, onOpen }) {
  const [forceError, setForceError] = useState(false);

  if (forceError) {
    throw new Error(`Deliberate render error in ${dish.name}`);
  }

  return (
    <article className="dish-card">
      <Link to={`/menu/${dish.id}`} className="dish-link">
        <img src={dish.image} alt={dish.name} className="dish-image" />
        <div className="dish-info">
          <h3>{dish.name}</h3>
          <p>{dish.category}{dish.spicy ? " - spicy" : ""}</p>
        </div>
      </Link>
      <strong>{dish.price} ETB</strong>
      <div className="dish-actions">
        <button type="button" onClick={() => onRemoveFromOrder(dish)}>
          Remove
        </button>
        <button type="button" onClick={() => onAddToOrder(dish)}>
          Add
        </button>
        <button type="button" onClick={() => onOpen(dish)}>
          Quick view
        </button>
        {dish.id === 1 && (
          <button type="button" onClick={() => setForceError(true)}>
            Test error boundary
          </button>
        )}
      </div>
    </article>
  );
}

function DishList({ dishes, onAddToOrder, onRemoveFromOrder }) {
  const [selectedDish, setSelectedDish] = useState(null);

  if (dishes.length === 0) {
    return <p>No dishes in this category yet.</p>;
  }

  return (
    <>
      <div className="dish-grid">
        {dishes.map((dish) => (
          <DishCard
            key={dish.id}
            dish={dish}
            onAddToOrder={onAddToOrder}
            onRemoveFromOrder={onRemoveFromOrder}
            onOpen={setSelectedDish}
          />
        ))}
      </div>

      {selectedDish && (
        <Modal
          titleId="dish-modal-title"
          onClose={() => setSelectedDish(null)}
        >
          <img
            src={selectedDish.image}
            alt={selectedDish.name}
            className="modal-image"
          />
          <h2 id="dish-modal-title">{selectedDish.name}</h2>
          <p>{selectedDish.category}{selectedDish.spicy ? " - spicy" : ""}</p>
          <p>{selectedDish.price} ETB</p>
          <div className="modal-actions">
            <button
              type="button"
              onClick={() => {
                onAddToOrder(selectedDish);
                setSelectedDish(null);
              }}
            >
              Add to cart
            </button>
            <button type="button" onClick={() => setSelectedDish(null)}>
              Close
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default DishList;
