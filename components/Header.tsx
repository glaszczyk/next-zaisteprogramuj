import Link from "next/link";
import {useRouter} from "next/router";

const links = [
    {label: 'Index', href: '/'},
    {label: 'About', href: '/about'},
    {label: 'SSG Fake', href: '/ssg-fake-products'},
    {label: 'CSR Fake', href: '/csr-fake-products'},
]

type NavLinkProps = {
    href: string,
    isActive: boolean,
    children: string | JSX.Element
}
const NavLink = (props: NavLinkProps) => {
    const {href, children, isActive} = props;
    const selected = 'font-bold';
    return (
        <Link className={`mr-2 ${isActive ? selected : ''}`} href={href}>{children}</Link>
    )
}
export const Header = () => {

  const router = useRouter();
  const pathname = router.pathname;
  return (
      <header className='mx-auto w-full'>
          <nav className='bg-gray-300 px-4 py-2'>
              {links.map((link) => (
                  <NavLink key={link.href} href={link.href} isActive={pathname === link.href}>{link.label}</NavLink>
              ))}
          </nav>
      </header>
  )
}