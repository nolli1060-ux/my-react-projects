import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useCart } from "../cart/CartContext";

function DishCard({ dish }) {
  const { addItem } = useCart();

  return (
    <article className="dish-card">
      <Link to={`/menu/${dish.id}`} className="dish-image-link">
        <img src={dish.image} alt={dish.name} />
      </Link>

      <div className="dish-card-body">
        <div className="dish-card-heading">
          <div>
            <p className="dish-category">{dish.category}</p>
            <h2>
              <Link to={`/menu/${dish.id}`}>{dish.name}</Link>
            </h2>
          </div>
          <strong>{dish.price.toFixed(2)} ETB</strong>
        </div>

        <p className="dish-description">{dish.description}</p>

        <button
          type="button"
          className="button button-secondary full-width"
          onClick={() => addItem(dish)}
        >
          <Plus size={17} />
          Add to order
        </button>
      </div>
    </article>
  );
}

export default DishCard;