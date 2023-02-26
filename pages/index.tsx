import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';


const DATA = {
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis ipsum dolor. Vestibulum pulvinar lobortis mi, sit amet ultrices ante dapibus ac. Curabitur a pellentesque libero, sit amet volutpat tortor. Nullam congue arcu eleifend, auctor dolor in, sodales ipsum. In at augue ac dolor posuere interdum ac non odio. Mauris arcu quam, imperdiet eu justo id, feugiat rutrum mauris. Pellentesque lobortis sagittis condimentum. Fusce molestie orci ante, eleifend semper dui ullamcorper ac. Donec cursus lacus ex, at dapibus urna volutpat eu. Quisque urna dui, varius quis ultricies mattis, ullamcorper et augue. Nulla volutpat tincidunt ultricies.',
  thumbnailUrl: 'https://picsum.photos/id/29/400/267',
  thumbnailAlt: 'This is image description',
  rating: 4.5,
}

interface RatingProps {
  rating: number
}

const Rating = (props: RatingProps) => {
  const {rating} = props;
  return (
      <p className='text-blue-500 font-bold'>{rating}</p>
  )
};

interface ProductProps {
  data: {
    description: string,
    thumbnailUrl: string,
    thumbnailAlt: string,
    rating: number
  }
}

const Product = (props: ProductProps) => {
  const {data} = props;
  return(
    <>
      <img src={data.thumbnailUrl} alt={data.thumbnailAlt}/>
      <p>{data.description}</p>
      <Rating rating={data.rating} />
    </>
  )
}

const Home = () => {
  return (
  <div className='flex flex-col min-h-screen max-w-2xl'>
    <Header/>
    <main className='bg-gray-50 flex-grow px-4 py-2 grid gap-6 sm:grid-cols-2'>
      <Product data={DATA} />
    </main>
    <Footer/>
  </div>  )
}

export default Home;