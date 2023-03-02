import {useQuery} from "@tanstack/react-query";
import {ProductListItem} from "@/components/ProductDetails";
import {Pagination} from "@/components/Pagination";
import {useState} from "react";

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
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  if (isLoading) {
    return (<p>…Loading</p>)
  }
  if (!data || error) {
    return <p>Something went wrong…</p>
  }
  return (
      <div>
      <Pagination current={currentPage} onClick={handlePageChange} siblings={1} last={10}/>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {data.map(product => (
            <li key={product.id} className='p-4 shadow-lg border-2 rounded-md'>
              <ProductListItem data={{
                id: product.id,
                title: product.title,
                thumbnailUrl: product.image,
                thumbnailAlt: product.description,
              }} />
            </li>
        ))}
      </ul>
      </div>
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
