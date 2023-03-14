import Link from 'next/link';
import { CartIcon } from '@/components/Cart/CartIcon';

export function CartBar() {
  return (
    <Link href="/cart">
      <CartIcon />
    </Link>
  );
}
