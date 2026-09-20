import { useCartStore } from "./cart/cartStore";

function CartBadge() {
  const itemCount = useCartStore((s) => s.items.length);

  return <strong className="cart-badge">Cart: {itemCount}</strong>;
}

export default CartBadge;
