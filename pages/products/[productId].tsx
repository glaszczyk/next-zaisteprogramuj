import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { FakeProductDetails } from '@/components/FakeProductDetails';
import Link from 'next/link';
import { fetchProductFrom } from '@/helpers/fetchProductFrom';
import { fetchProductsFrom } from '@/helpers/fetchProductsFrom';

const API_URL = 'https://fakestoreapi.com/products/';

const ProductIdPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { data } = props;
  if (!data) {
    return <p>Something went wrong</p>;
  }
  return (
    <div>
      <Link href="/">Wróc na stronę główną</Link>
      <FakeProductDetails
        data={{
          id: `${data.id}`,
          title: data.title,
          rating: data.rating.rate,
          thumbnailAlt: data.description,
          thumbnailUrl: data.image,
          description: data.description,
        }}
      />
    </div>
  );
};

export default ProductIdPage;

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

export const getStaticPaths = async () => {
  const fetcher = fetchProductsFrom(API_URL);
  const data = await fetcher<StoreApiResponse>();
  return {
    paths: data.map((item) => {
      return {
        params: {
          productId: `${item.id}`,
        },
      };
    }),
    fallback: false,
  };
};

export type InferGetStaticPathsType<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? R
  : never;

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<InferGetStaticPathsType<typeof getStaticPaths>>) => {
  if (!params?.productId) {
    return {
      props: {},
      notFound: true,
    };
  }
  const fetcher = fetchProductFrom(API_URL);
  const data = await fetcher<StoreApiResponse | null>(params.productId);

  return {
    props: {
      data,
    },
  };
};
