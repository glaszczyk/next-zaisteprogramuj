import Link from "next/link";

export const Header = () => {
  return (
      <header className='mx-auto w-full'>
          <nav className='bg-gray-300 px-4 py-2'>
              <Link href='/about'>About</Link>
              <Link href='/'>Index</Link>
          </nav>
      </header>
  )
}