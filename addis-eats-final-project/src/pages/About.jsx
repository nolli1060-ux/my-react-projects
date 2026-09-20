import { Link } from "react-router-dom";
import { UtensilsCrossed, Clock, ShieldCheck, Truck, Sparkles, MapPin } from "lucide-react";

export function About() {
  return (
    <div className="about-container">
      {/* Hero Header */}
      <section className="about-hero">
        <span className="hero-badge">About Addis Eats</span>
        <h2>Connecting Addis Ababa With Authentic Traditional Flavours</h2>
        <p>
          Addis Eats is a student-built food ordering web platform created to showcase
          how modern web technology can make ordering authentic Ethiopian cuisine simple,
          reliable, and delightful.
        </p>
      </section>

      {/* Mission & What We Are */}
      <section className="about-grid">
        <div className="about-card">
          <div className="about-icon-wrapper" aria-hidden="true">
            <UtensilsCrossed size={24} />
          </div>
          <h3>What Is Addis Eats?</h3>
          <p>
            Addis Eats is a focused food ordering showcase for Addis Ababa. We bring
            popular Ethiopian staples — from sizzling Shekla Tibs and spicy Doro Wat
            to nutrient-rich fasting Beyaynetu and fresh Kitfo — straight to your table
            with transparent pricing in Ethiopian Birr (ETB).
          </p>
        </div>

        <div className="about-card">
          <div className="about-icon-wrapper" aria-hidden="true">
            <Sparkles size={24} />
          </div>
          <h3>Our Purpose</h3>
          <p>
            Our goal is to demonstrate a clean, accessible, and responsive user experience
            tailored to local needs. By supporting TeleBirr validation, local neighbourhood
            delivery zones, and intuitive cart management, we bridge everyday convenience
            with beloved cultural recipes.
          </p>
        </div>

        <div className="about-card">
          <div className="about-icon-wrapper" aria-hidden="true">
            <Clock size={24} />
          </div>
          <h3>The Ordering Experience</h3>
          <p>
            Browse our curated daily menu, filter dishes by category (Main, Grill, or Vegan),
            view full ingredient descriptions, and adjust portions in seconds. When you are
            ready, check out with ease and track your order reference.
          </p>
        </div>

        <div className="about-card">
          <div className="about-icon-wrapper" aria-hidden="true">
            <Truck size={24} />
          </div>
          <h3>Local Neighbourhood Delivery</h3>
          <p>
            We focus on core central districts including Bole, Kazanchis, Megenagna,
            Piassa, Sarbet, CMC, and Gerji. Food is packed in heat-retaining containers so
            it arrives piping hot.
          </p>
        </div>

        <div className="about-card">
          <div className="about-icon-wrapper" aria-hidden="true">
            <ShieldCheck size={24} />
          </div>
          <h3>Fair Pricing & Payment</h3>
          <p>
            No hidden fees. Pay upon delivery using your preferred TeleBirr account,
            CBE mobile banking, or cash on hand. Every transaction is transparent and direct.
          </p>
        </div>

        <div className="about-card">
          <div className="about-icon-wrapper" aria-hidden="true">
            <MapPin size={24} />
          </div>
          <h3>Proudly Made in Ethiopia</h3>
          <p>
            Developed as a comprehensive Day 35 React showcase, Addis Eats is designed
            with love for Ethiopian culinary tradition, accessibility standards, and
            performance excellence.
          </p>
        </div>
      </section>

      {/* Call to action */}
      <section className="about-cta">
        <h3>Ready to Taste the Tradition?</h3>
        <p>Explore today's freshly prepared specials and build your order in minutes.</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/menu" className="primary-link">
            Explore the Menu
          </Link>
          <Link to="/contact" className="secondary-link">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
