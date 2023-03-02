import {useQuery} from "@tanstack/react-query";
import {FakeProductListItem} from "@/components/FakeProductDetails";

const fetchProducts = async () => {
  const response = await fetch('https://naszsklep-api.vercel.app/api/products?take=25&offset=0');
  const data: StoreApiResponse[] = await response.json();
  return data;
}

const CsrProductsPage = () => {
  const {data, error, isLoading} = useQuery(['products'], fetchProducts);


  if (isLoading) {
      return <p>…Loading</p>
  }
  if (!data || error) {
      return <p>Something went wrong</p>
  }
  return (
      <ul>
      {
        data.map(item => <FakeProductListItem key={item.id} data={{
            id: item.id,
            title: item.title,
            thumbnailAlt: item.description,
            thumbnailUrl: item.image
        }}/>)
      }
      </ul>
  )
}

export default CsrProductsPage;

export interface StoreApiResponse {
	longDescription: string;
	image: string;
	price: number;
	rating: {
      rate: number;
      count: number;
    };
	description: string;
	id: string;
	title: string;
	category: string;
}

