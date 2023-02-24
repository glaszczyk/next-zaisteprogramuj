import Link from "next/link";

export const Header = () => {
  return (
      <header className='mx-auto w-full'>
          <nav className='bg-gray-300 px-4 py-2'>
              <Link href='/'>Index</Link>
              <Link href='/about'>About</Link>
          </nav>
      </header>
  )
}