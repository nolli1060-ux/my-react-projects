import { useState } from "react";
import { Flame, Check } from "lucide-react";
import DishCard from "./DishCard";
import Modal from "../ui/Modal";

export function DishList({ dishes, onAddToCart, searchTerm, onResetFilter }) {
  const [selectedDish, setSelectedDish] = useState(null);
  const [modalAdded, setModalAdded] = useState(false);

  if (!dishes || dishes.length === 0) {
    return (
      <div className="status" role="region" aria-label="No dishes found">
        <h3>No dishes found</h3>
        <p>
          {searchTerm
            ? `No meals matched "${searchTerm}". Try another search term or select "All".`
            : "There are currently no dishes available in this category."}
        </p>
        {onResetFilter && (
          <button type="button" className="secondary-btn" onClick={onResetFilter}>
            View All Dishes
          </button>
        )}
      </div>
    );
  }

  function handleModalAddToCart(dish) {
    onAddToCart(dish);
    setModalAdded(true);
    setTimeout(() => {
      setModalAdded(false);
      setSelectedDish(null);
    }, 900);
  }

  return (
    <>
      <div className="dish-grid">
        {dishes.map((dish) => (
          <DishCard
            key={dish.id}
            dish={dish}
            onAddToCart={onAddToCart}
            onQuickView={setSelectedDish}
          />
        ))}
      </div>

      {selectedDish && (
        <Modal
          titleId="dish-modal-heading"
          onClose={() => setSelectedDish(null)}
        >
          <img
            src={selectedDish.image}
            alt={selectedDish.name}
            className="modal-image"
          />
          <h2 id="dish-modal-heading">{selectedDish.name}</h2>
          <div className="detail-tags" style={{ marginBottom: "12px" }}>
            <span className="detail-tag">{selectedDish.category}</span>
            {selectedDish.spicy && (
              <span className="detail-tag spicy">
                <Flame size={12} aria-hidden="true" /> Spicy
              </span>
            )}
          </div>
          <p className="detail-description">{selectedDish.description}</p>
          <p className="detail-price">{selectedDish.price} ETB</p>
          <div className="modal-actions">
            <button
              type="button"
              className={modalAdded ? "primary-btn btn-added" : "primary-btn"}
              onClick={() => handleModalAddToCart(selectedDish)}
            >
              {modalAdded ? (
                <>
                  <Check size={16} aria-hidden="true" /> Added to Order
                </>
              ) : (
                "Add to Order"
              )}
            </button>
            <button
              type="button"
              className="secondary-btn"
              onClick={() => setSelectedDish(null)}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default DishList;
