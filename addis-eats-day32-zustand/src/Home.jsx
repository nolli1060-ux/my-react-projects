import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home-section">
      <div className="hero-content">
        <p className="hero-kicker">Taste Us, Taste Ethiopia!!</p>
        <h2>Welcome to Addis Eats</h2>
        <p>Explore bold Ethiopian dishes, choose your favourites, and bring a little warmth to your table.</p>
        <Link className="primary-link" to="/menu">Explore the menu</Link>
        <div className="hero-details" aria-label="Addis Eats highlights">
          <span><strong>100%</strong> made with care</span>
        </div>
      </div>
    </section>
  );
}

export default Home;
