import { Link, useParams } from "react-router-dom";

function OrderConfirmation() {
  const { id } = useParams();

  return (
    <section className="order-section">
      <h2>Order received</h2>
      <p>Your order number is {id}.</p>
      <Link className="primary-link" to="/menu">Back to menu</Link>
    </section>
  );
}

export default OrderConfirmation;
