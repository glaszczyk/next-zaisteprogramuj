import Link from 'next/link';
import { CartIcon } from '@/components/Cart/CartIcon';
import { useCartState } from '@/components/Cart/CartContext';

export function CartBar() {
  const cartState = useCartState();

  return (
    <Link href="/cart" className="flex">
      <span className="pr-2">{cartState.items.length}</span>
      <CartIcon />
    </Link>
  );
}
