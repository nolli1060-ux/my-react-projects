import React from "react";

class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Addis Eats render error:", error, info);
  }

  render() {
    if (this.state.error) return this.props.fallback;
    return this.props.children;
  }
}

export default ErrorBoundary;
