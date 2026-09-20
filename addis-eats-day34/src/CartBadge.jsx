import { useCartStore } from "./cart/cartStore";

function CartBadge() {
  const itemCount = useCartStore((s) =>
    s.items.reduce((count, dish) => count + (dish.quantity ?? 1), 0),
  );

  return <strong className="cart-badge">Cart: {itemCount}</strong>;
}

export default CartBadge;
