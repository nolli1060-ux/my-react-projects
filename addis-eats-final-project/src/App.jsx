import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import DishDetail from "./pages/DishDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import RequireAuth from "./auth/RequireAuth";
import { AuthProvider } from "./auth/AuthProvider";
import { CartProvider } from "./cart/CartProvider";
import ErrorBoundary from "./ui/ErrorBoundary";

// Lazy-loaded routes demonstrating React.lazy & Suspense (Days 33-34)
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));

function LoadingFallback({ message = "Loading..." }) {
  return (
    <div className="skeleton" role="status" aria-live="polite">
      <p>{message}</p>
    </div>
  );
}

function SectionCrashFallback({ error, resetErrorBoundary }) {
  return (
    <div className="status error" role="alert">
      <h2>Section temporarily unavailable</h2>
      <p>{error?.message || "An unexpected rendering error occurred."}</p>
      <button type="button" className="primary-btn" onClick={resetErrorBoundary}>
        Retry Section
      </button>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback message="Loading page content..." />}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  {/* Home */}
                  <Route index element={<Home />} />

                  {/* Menu with localized error boundary */}
                  <Route
                    path="menu"
                    element={
                      <ErrorBoundary fallback={SectionCrashFallback}>
                        <Menu />
                      </ErrorBoundary>
                    }
                  />

                  {/* Dynamic Dish Detail */}
                  <Route path="menu/:id" element={<DishDetail />} />

                  {/* Cart */}
                  <Route path="cart" element={<Cart />} />

                  {/* Protected Checkout */}
                  <Route
                    path="checkout"
                    element={
                      <RequireAuth>
                        <Suspense fallback={<LoadingFallback message="Loading checkout form..." />}>
                          <Checkout />
                        </Suspense>
                      </RequireAuth>
                    }
                  />

                  {/* Order Confirmation Receipt */}
                  <Route
                    path="orders/:id"
                    element={
                      <Suspense fallback={<LoadingFallback message="Loading order receipt..." />}>
                        <OrderConfirmation />
                      </Suspense>
                    }
                  />

                  {/* Login */}
                  <Route path="login" element={<Login />} />

                  {/* 404 Catch-All */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
