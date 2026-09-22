import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("Application error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="container page-space">
          <div className="status error-state">
            <h2>Something went wrong</h2>
            <p>We could not display this page. Please refresh and try again.</p>
            <button className="button button-primary" onClick={() => window.location.reload()}>
              Refresh page
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;