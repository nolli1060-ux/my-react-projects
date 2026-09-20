import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home-section">
      <div className="hero-content">
        <h2>Welcome to Addis Eats</h2>
        <p>
          Explore Ethiopian dishes, add your favourites to the cart, and place
          your order.
        </p>
        <Link className="primary-link" to="/menu">
          View menu
        </Link>
      </div>
    </section>
  );
}

export default Home;
