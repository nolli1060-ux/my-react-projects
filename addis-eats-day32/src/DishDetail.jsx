import { Link, useParams } from "react-router-dom";
import { useCartStore } from "./cart/cartStore";
import { useFetch } from "./hooks/useFetch";
import NotFound from "./NotFound";

function DishDetail() {
  const { id } = useParams();
  const { data, loading, error } = useFetch("/dishes.json");
  const addItem = useCartStore((s) => s.addItem);

  if (loading) return <p className="status">Loading dish...</p>;
  if (error) return <p className="status error">Error: {error}</p>;

  const dish = (data ?? []).find((item) => String(item.id) === id);

  if (!dish) return <NotFound message={`No dish called ${id}`} />;

  return (
    <section className="detail-section">
      <img src={dish.image} alt={dish.name} className="detail-image" />
      <div>
        <p className="detail-category">{dish.category}{dish.spicy ? " - spicy" : ""}</p>
        <h2>{dish.name}</h2>
        <p>Price: {dish.price} ETB</p>
        <div className="detail-actions">
          <button type="button" onClick={() => addItem(dish)}>Add to cart</button>
          <Link className="secondary-link" to="/menu">Back to menu</Link>
        </div>
      </div>
    </section>
  );
}

export default DishDetail;
