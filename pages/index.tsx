import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';
import {Main} from "@/components/Main";
import {Product} from "@/components/Product";


const DATA = {
  title: 'My new great product',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis ipsum dolor. Vestibulum pulvinar lobortis mi, sit amet ultrices ante dapibus ac. Curabitur a pellentesque libero, sit amet volutpat tortor. Nullam congue arcu eleifend, auctor dolor in, sodales ipsum. In at augue ac dolor posuere interdum ac non odio. Mauris arcu quam, imperdiet eu justo id, feugiat rutrum mauris. Pellentesque lobortis sagittis condimentum. Fusce molestie orci ante, eleifend semper dui ullamcorper ac. Donec cursus lacus ex, at dapibus urna volutpat eu. Quisque urna dui, varius quis ultricies mattis, ullamcorper et augue. Nulla volutpat tincidunt ultricies.',
  thumbnailUrl: 'https://picsum.photos/id/29/400/267',
  thumbnailAlt: 'This is image description',
  rating: 4.5,
}

const HomePage = () => {
  return (
  <div className='flex flex-col min-h-screen max-w-2xl'>
    <Header/>
    <Main>
      <Product data={DATA} />
    </Main>
    <Footer/>
  </div>  )
}

export default HomePage;