import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usePagination } from '@/hooks/usePagination';
import { ProductList } from '@/components/ProductList';
import { fetchProductsFrom } from '@/helpers/fetchProductsFrom';
import { ProductDetailsCSR } from '@/components/ProductDetailsCSR';
import { StoreApiResponse } from '@/pages/product-list/[productListId]';

const fetchProducts = async (currentPage: number) => {
  const offset = currentPage - 1;
  const fetcher = fetchProductsFrom(
    'https://naszsklep-api.vercel.app/api/products'
  );
  return await fetcher<StoreApiResponse>(25, offset);
};

type ViewType = 'list' | 'item';

const CsrProductsPage = () => {
  const { currentPage, Pagination } = usePagination();
  const [view, setView] = useState<ViewType>('list');
  const [selectedItem, setSelectedItem] = useState({} as StoreApiResponse);
  const { data, error, isLoading } = useQuery(['products', currentPage], () =>
    fetchProducts(currentPage)
  );

  const handleSelectProduct = (id: string) => {
    const filtered = data?.filter((item) => item.id === id);
    if (filtered?.length) {
      setSelectedItem({ ...filtered[0] });
      setView('item');
    }
  };
  const handleBack = () => {
    setView('list');
  };

  if (view === 'list') {
    return (
      <div className="bg-gray-100 p-4">
        <Pagination siblings={2} last={10} />
        <ProductList
          isLoading={isLoading}
          data={data}
          onClick={handleSelectProduct}
          error={error}
        />
      </div>
    );
  }

  if (view === 'item') {
    return (
      <div className="bg-gray-100 p-4">
        <button
          className="p-2 bg-white border-2 border-grey-200 rounded-md"
          onClick={handleBack}
        >
          Go back to the list
        </button>
        <ProductDetailsCSR data={selectedItem} />
      </div>
    );
  }
};

export default CsrProductsPage;
