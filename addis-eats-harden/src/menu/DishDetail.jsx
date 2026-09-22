import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { fetchDishes } from "../api/menu";
import { useFetch } from "../hooks/useFetch";
import { useCart } from "../cart/CartContext";
import Spinner from "../ui/Spinner";

function DishDetail() {
  const { id } = useParams();
  const { data: dishes, loading, error } = useFetch(fetchDishes, []);
  const { addItem } = useCart();

  if (loading) {
    return <Spinner label="Loading dish..." />;
  }

  if (error) {
    return (
      <section className="container page-space">
        <div className="status error-state">
          <h2>Dish unavailable</h2>
          <p>{error.message}</p>
        </div>
      </section>
    );
  }

  const dish = dishes?.find((item) => item.id === id);

  if (!dish) {
    return (
      <section className="container page-space">
        <div className="status">
          <h2>Dish not found</h2>
          <p>The dish in this URL does not exist.</p>
          <Link to="/menu" className="button button-primary">Back to Menu</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container page-space">
      <Link to="/menu" className="back-link">
        <ArrowLeft size={16} /> Back to Menu
      </Link>

      <article className="detail-card">
        <div className="detail-image">
          <img src={dish.image} alt={dish.name} />
        </div>

        <div className="detail-content">
          <p className="eyebrow">{dish.category}</p>
          <h1>{dish.name}</h1>
          <p className="detail-price">{dish.price.toFixed(2)} ETB</p>
          <p className="detail-description">{dish.description}</p>

          <button
            type="button"
            className="button button-primary"
            onClick={() => addItem(dish)}
          >
            <Plus size={17} /> Add to Order
          </button>
        </div>
      </article>
    </section>
  );
}

export default DishDetail;