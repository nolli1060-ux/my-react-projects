import { Link } from "react-router-dom";
import { ArrowRight, MapPin, ShieldCheck, Utensils } from "lucide-react";

function Home() {
  return (
    <div>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">ORDER YOUR FAV FOOD FROM ADDIS EATS</p>
            <h1>Delicious Ethiopian food, ordered without the hassle.</h1>
            <p className="hero-text">
              Browse the menu of Ethiopian favourites, choose what you want,
              and complete your order in a few simple steps.
            </p>
            <Link to="/menu" className="button button-primary">
              View Menu <ArrowRight size={17} />
            </Link>
          </div>

          <div className="hero-panel">
            <div className="hero-panel-top">
              <Utensils size={22} />
              <span>Today's kitchen</span>
            </div>
            <h2>Prepared fresh for Addis Ababa.</h2>
            <p>From breakfast plates to classic wot and tibs, choose a dish and build your order.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;