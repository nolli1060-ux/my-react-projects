import { Link } from "react-router-dom";

function NotFound({ message = "The page you requested was not found." }) {
  return (
    <section className="status">
      <h2>Not found</h2>
      <p>{message}</p>
      <Link className="primary-link" to="/menu">Back to menu</Link>
    </section>
  );
}

export default NotFound;
