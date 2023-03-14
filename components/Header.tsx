import Link from 'next/link';
import { useRouter } from 'next/router';
import { CartIcon } from '@/components/Cart/CartIcon';

const links = [
  { label: 'Index', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'ISR Products', href: '/isr-product-list/1' },
  { label: 'SSG Products', href: '/product-list/1' },
  { label: 'CSR Products', href: '/csr-products' },
  { label: 'SSG Fake', href: '/ssg-fake-products' },
  { label: 'CSR Fake', href: '/csr-fake-products' },
];

type NavLinkProps = {
  href: string;
  isActive: boolean;
  children: string | JSX.Element;
};
const NavLink = (props: NavLinkProps) => {
  const { href, children, isActive } = props;
  const selected = 'font-bold';
  return (
    <Link className={`mr-2 ${isActive ? selected : ''}`} href={href}>
      {children}
    </Link>
  );
};
export const Header = () => {
  const router = useRouter();
  const pathname = router.pathname;
  return (
    <header className="flex bg-gray-300">
      <nav className=" px-4 py-2 mx-auto w-full flex justify-between">
        <div>
          {links.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              isActive={pathname === link.href}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <Link href="/cart">
          <CartIcon />
        </Link>
      </nav>
    </header>
  );
};
