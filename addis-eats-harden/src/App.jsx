import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Menu from "./menu/Menu";
import DishDetail from "./menu/DishDetail";
import Cart from "./cart/Cart";
import Login from "./auth/Login";
import RequireAuth from "./auth/RequireAuth";
import ErrorBoundary from "./ui/ErrorBoundary";
import Spinner from "./ui/Spinner";

const NotFound = lazy(() => import("./ui/NotFound"));
const Checkout = lazy(() =>
  Promise.all([
    import("./checkout/Checkout"),
    new Promise((resolve) => setTimeout(resolve, 2000))
  ]).then(([module]) => module)
);

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<DishDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/checkout"
            element={
              <Suspense fallback={<Spinner label="Loading checkout..." />}>
                <RequireAuth>
                  <Checkout />
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Spinner label="Loading page..." />}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;