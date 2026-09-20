import { useParams, Link } from "react-router-dom";

export function OrderConfirmation() {
  const { id } = useParams();

  return (
    <section className="status" role="region" aria-label="Order confirmation">
      <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🎉</div>
      <h2>Order Successfully Placed!</h2>
      <p style={{ fontSize: "1.1rem", color: "#16232c", fontWeight: 700 }}>
        Order Reference: <span style={{ color: "#ed713f" }}>{id}</span>
      </p>
      <p style={{ maxWidth: "520px", margin: "0 auto 24px" }}>
        Our kitchen is already heating the clay pots and preparing your Ethiopian dishes.
        Our courier will contact your TeleBirr number when leaving the restaurant.
      </p>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <Link to="/menu" className="primary-link">
          Explore More Dishes
        </Link>
        <Link to="/" className="secondary-link">
          Return to Home
        </Link>
      </div>
    </section>
  );
}

export default OrderConfirmation;
