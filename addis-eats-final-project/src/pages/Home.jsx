import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useFetch } from "../hooks/useFetch";
import { useCart } from "../cart/useCart";
import DishCard from "../menu/DishCard";

export function Home() {
  const { data: dishes, loading, error } = useFetch("/dishes.json");
  const { addItem } = useCart();

  // Pick today's curated specials (e.g. Special Kurt, Shekla Tibs, and Kitfo)
  const specials = (dishes || []).slice(0, 3);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="home-section">
        <div className="hero-content">
          <span className="hero-badge">Addis Ababa Dining</span>
          <h2>Authentic Flavours of Ethiopia</h2>
          <p>
            From sizzling clay pot Shekla Tibs to rich, slow-simmered Doro Wat
            and fresh Beyaynetu — explore Addis Ababa's finest dishes prepared
            with traditional spices and pure hospitality.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/menu" className="primary-link">
              <span>Browse Full Menu</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/cart" className="secondary-link">
              View Your Cart
            </Link>
          </div>
        </div>
      </section>

      {/* Today's Specials Section */}
      <section className="specials-section">
        <div className="section-header">
          <div>
            <h2>Today's Specials</h2>
            <p>Freshly prepared daily specials recommended by our head chef.</p>
          </div>
          <Link to="/menu" className="secondary-link">
            See all meals ({dishes?.length || 0})
          </Link>
        </div>

        {loading && (
          <div className="skeleton">
            <p>Loading chef's specials...</p>
          </div>
        )}

        {error && (
          <div className="status error">
            <p>Could not load specials: {error}</p>
          </div>
        )}

        {!loading && !error && specials.length > 0 && (
          <div className="dish-grid">
            {specials.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onAddToCart={addItem}
                onQuickView={() => {}}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
