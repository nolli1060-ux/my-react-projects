import React from "react";

/**
 * React Error Boundary component.
 * Catches JavaScript errors anywhere in the child component tree,
 * logs them, and displays a fallback UI instead of crashing the whole app.
 * Demonstrates Days 33-34 (Error Boundaries in React).
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Addis Eats ErrorBoundary caught an error:", error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        if (typeof this.props.fallback === "function") {
          return this.props.fallback({
            error: this.state.error,
            resetErrorBoundary: this.resetErrorBoundary,
          });
        }
        return this.props.fallback;
      }

      return (
        <section className="status error" role="alert">
          <h2>Something went wrong</h2>
          <p>
            {this.state.error?.message ||
              "An unexpected error occurred while displaying this section."}
          </p>
          <button
            type="button"
            className="primary-btn"
            onClick={this.resetErrorBoundary}
          >
            Try again
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
