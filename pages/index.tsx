const Home = () => {
  return (
  <div className='flex flex-col min-h-screen max-w-md'>
    <header className='mx-auto w-full'>
      <nav className='bg-gray-300 px-4 py-2'>Nawigacja</nav>
    </header>
    <main className='bg-gray-50 flex-grow px-4 py-2'>Treść strony</main>
    <footer className='bg-gray-400 px-4 py-2'>Stopka</footer>
  </div>  )
}

export default Home;