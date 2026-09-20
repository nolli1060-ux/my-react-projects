import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";

export function NotFound({ message = "The page or dish you requested could not be found." }) {
  return (
    <section className="status" role="region" aria-label="Page not found">
      <div style={{ display: "grid", placeItems: "center", marginBottom: "12px", color: "#ed713f" }}>
        <SearchX size={52} aria-hidden="true" />
      </div>
      <h2>Page Not Found (404)</h2>
      <p>{message}</p>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <Link to="/menu" className="primary-link">
          Browse Addis Eats Menu
        </Link>
        <Link to="/" className="secondary-link">
          Return to Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
