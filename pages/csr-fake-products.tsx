import { useQuery } from '@tanstack/react-query';
import { FakeProductListItem } from '@/components/FakeProductDetails';
import { usePagination } from '@/hooks/usePagination';
import { fetchProductsFrom } from '@/helpers/fetchProductsFrom';

const getProducts = async () => {
  const fetcher = fetchProductsFrom('https://fakestoreapi.com/products/');
  return await fetcher<StoreApiResponse>();
};

const CSRFakeProductsPage = () => {
  const { Pagination } = usePagination();
  const { data, error, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  if (isLoading) {
    return <p>…Loading</p>;
  }
  if (!data || error) {
    return <p>Something went wrong…</p>;
  }
  return (
    <>
      <Pagination siblings={1} last={10} />
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((product) => (
          <li key={product.id} className="p-4 shadow-lg border-2 rounded-md">
            <FakeProductListItem
              data={{
                id: `${product.id}`,
                title: product.title,
                thumbnailUrl: product.image,
                thumbnailAlt: product.description,
              }}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default CSRFakeProductsPage;

interface StoreApiResponse {
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
