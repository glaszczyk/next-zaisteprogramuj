import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { apolloClient } from '@/graphql/apolloClient';
import { ProductDetailsCSR } from '@/components/ProductDetailsCSR';
import { useRouter } from 'next/router';
import {
  GetAllProductsSlugsDocument,
  GetAllProductsSlugsQuery,
  GetProductBySlugDocument,
  GetProductBySlugQuery,
  GetProductBySlugQueryVariables,
} from '@/generated/graphql';

const ProductIdPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const router = useRouter();
  const { data } = props;
  if (!data?.product) {
    return <p>Something went wrong</p>;
  }
  const { product } = data;
  return (
    <div className="bg-gray-100 p-4">
      <button
        className="p-2 bg-white border-2 border-grey-200 rounded-md"
        onClick={() => router.back()}
      >
        Go back to the list
      </button>
      <ProductDetailsCSR
        data={{
          id: `${product.id}`,
          title: product.title,
          rating: { rate: 4, count: 0 },
          longDescription: product.longDescription || '',
          image: product.images[0].url,
          description: product.description || '',
          price: 0,
          category: '',
        }}
      />
    </div>
  );
};

export default ProductIdPage;

export const getStaticPaths = async () => {
  const { data } = await apolloClient.query<GetAllProductsSlugsQuery>({
    query: GetAllProductsSlugsDocument,
  });
  return {
    paths: data.products.map((item) => {
      return {
        params: {
          productId: `${item.slug}`,
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

  const { data } = await apolloClient.query<
    GetProductBySlugQuery,
    GetProductBySlugQueryVariables
  >({
    variables: {
      slug: params.productId,
    },
    query: GetProductBySlugDocument,
  });

  return {
    props: {
      data,
    },
  };
};
