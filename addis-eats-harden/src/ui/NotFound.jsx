import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="container page-space">
      <div className="status">
        <h2>Page not found</h2>
        <p>The page you requested does not exist.</p>
        <Link to="/" className="button button-primary">Return Home</Link>
      </div>
    </section>
  );
}

export default NotFound;