import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useState } from 'react';
import { fetchProductsFrom } from '@/helpers/fetchProductsFrom';
import { getRange, usePagination } from '@/hooks/usePagination';
import { ProductDetailsCSR } from '@/components/ProductDetailsCSR';
import { ProductList } from '@/components/ProductList';
import { MarkdownResult } from '@/utilityTypes';

type ViewType = 'list' | 'item';
const link = 'product-list';
const API_URL = 'https://naszsklep-api.vercel.app/api';

export interface StoreApiResponse {
  longDescription: MarkdownResult | string;
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

const ProductListIdPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { Pagination } = usePagination(link);
  const [view, setView] = useState<ViewType>('list');
  const [selectedItem, setSelectedItem] = useState({} as StoreApiResponse);
  const { data } = props;

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
        <ProductList data={data} onClick={handleSelectProduct} />
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

export default ProductListIdPage;

export const getStaticPaths = () => {
  return {
    paths: getRange(1, 10).map((item) => {
      return {
        params: {
          productListId: `${item}`,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<InferGetStaticPathsType<typeof getStaticPaths>>) => {
  if (!params?.productListId) {
    return {
      props: {},
      notFound: true,
    };
  }
  const offset = Number.parseInt(params?.productListId) - 1;
  const getProducts = fetchProductsFrom(`${API_URL}/products`);
  const data = await getProducts<StoreApiResponse>(25, offset);

  return {
    props: {
      data,
    },
  };
};

export type InferGetStaticPathsType<T> = T extends () => {
  paths: Array<{ params: infer R }>;
}
  ? R
  : never;
