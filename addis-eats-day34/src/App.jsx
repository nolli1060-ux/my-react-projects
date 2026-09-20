import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Menu from "./Menu";
import DishDetail from "./DishDetail";
import Cart from "./Cart";
import Home from "./Home";
import Login from "./Login";
import NotFound from "./NotFound";
import RequireAuth from "./auth/RequireAuth";
import { AuthProvider } from "./auth/AuthContext";
import ErrorBoundary from "./ErrorBoundary";
import "./index.css";

const Checkout = lazy(() => import("./checkout/Checkout"));
const Receipt = lazy(() => import("./OrderConfirmation"));

function MenuUnavailable() {
  return (
    <section className="status">
      <h2>Menu unavailable</h2>
      <p>The menu could not be rendered.</p>
      <button type="button" onClick={() => window.location.reload()}>Retry</button>
    </section>
  );
}

function CartUnavailable() {
  return (
    <section className="status">
      <h2>Cart unavailable</h2>
      <p>The cart could not be rendered.</p>
      <button type="button" onClick={() => window.location.reload()}>Retry</button>
    </section>
  );
}

function AppCrashed() {
  return (
    <section className="status">
      <h2>Something went wrong</h2>
      <p>Please reload the application.</p>
      <button type="button" onClick={() => window.location.reload()}>Reload</button>
    </section>
  );
}

function LoadingSkeleton() {
  return (
    <section className="status">
      <div className="skeleton" aria-label="Loading">Loading screen...</div>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary fallback={<AppCrashed />}>
          <Suspense fallback={<LoadingSkeleton />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route
                  path="menu"
                  element={
                    <ErrorBoundary fallback={<MenuUnavailable />}>
                      <Menu />
                    </ErrorBoundary>
                  }
                />
                <Route path="menu/:id" element={<DishDetail />} />
                <Route
                  path="cart"
                  element={
                    <ErrorBoundary fallback={<CartUnavailable />}>
                      <Cart />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="checkout"
                  element={
                    <RequireAuth>
                      <Checkout />
                    </RequireAuth>
                  }
                />
                <Route path="login" element={<Login />} />
                <Route path="orders/:id" element={<Receipt />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
