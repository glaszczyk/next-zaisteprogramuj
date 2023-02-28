import {useQuery} from "@tanstack/react-query";
import {Product} from "@/components/Product";

const getProducts =async () => {
  const response = await fetch('https://fakestoreapi.com/products/');
  if (!response.ok) {
    throw ('Something went wrong');
  }
  const data: StoreApiResponse[] = await response.json();
  return data;
}

const CSRProductsPage = () => {
  const {data, error, isLoading} = useQuery({queryKey: ['products'], queryFn: getProducts})

  if (isLoading) {
    return (<p>…Loading</p>)
  }
  if (!data || error) {
    return <p>Something went wrong…</p>
  }
  return (
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {data.map(product => (
            <li key={product.id} className='p-4 shadow-lg border-2 rounded-md'>
              <Product data={{
                title: product.title,
                rating: product.rating.rate,
                thumbnailUrl: product.image,
                thumbnailAlt: product.description,
                description: product.description
              }} />
            </li>
        ))}
      </ul>
  )
}

export default CSRProductsPage

interface  StoreApiResponse {
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  description: string;
  id: number;
  title: string;
  category: string;
}
