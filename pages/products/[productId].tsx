import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { gql } from '@apollo/client';
import { apolloClient } from '@/graphql/apolloClient';
import { FakeProductDetails } from '@/components/FakeProductDetails';

const GetAllProductsSlugs = gql`
  query GetAllProductsSlugs {
    products {
      slug
    }
  }
`;

const GetProductBySlug = gql`
  query GetProductBySlug($slug: String) {
    product(where: { slug: $slug }) {
      id
      slug
      title
      description
      longDescription
      images(first: 1) {
        url
        id
      }
      price
    }
  }
`;

const ProductIdPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { data } = props;
  if (!data?.product) {
    return <p>Something went wrong</p>;
  }
  const { product } = data;
  return (
    <div>
      <Link href="/">Wróc na stronę główną</Link>
      <FakeProductDetails
        data={{
          id: `${product.id}`,
          title: product.title,
          rating: 4,
          thumbnailAlt: product.description,
          thumbnailUrl: product.images[0].url,
          description: product.description,
          slug: product.slug,
        }}
      />
    </div>
  );
};

export default ProductIdPage;

export const getStaticPaths = async () => {
  const { data } = await apolloClient.query<GetAllProductsSlugsResponse>({
    query: GetAllProductsSlugs,
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

  const { data } = await apolloClient.query<GetProductBySlugResponse>({
    variables: {
      slug: params.productId,
    },
    query: GetProductBySlug,
  });

  return {
    props: {
      data,
    },
  };
};

export interface ProductSlug {
  slug: string;
}

export interface GetAllProductsSlugsResponse {
  products: Array<ProductSlug>;
}

export interface Image {
  id: string;
  url: string;
}

export interface Product {
  longDescription: string;
  images: Array<Image>;
  price: number;
  description: string;
  id: string;
  title: string;
  slug: string;
}

export interface GetProductBySlugResponse {
  product: Product;
}
