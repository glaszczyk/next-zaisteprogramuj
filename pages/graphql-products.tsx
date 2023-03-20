import { InferGetStaticPropsType } from 'next';
import { FakeProductListItem } from '@/components/FakeProductDetails';
import { gql } from '@apollo/client';
import { apolloClient } from '@/graphql/apolloClient';

const GetAllProducts = gql`
  query GetAllProducts {
    products {
      id
      slug
      title
      description
      images(first: 1) {
        id
        url
      }
    }
  }
`;

const GraphqlProductsPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { data } = props;
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.products.map((product) => (
        <li key={product.id} className="p-4 shadow-lg border-2 rounded-md">
          <FakeProductListItem
            data={{
              id: `${product.id}`,
              title: product.title,
              thumbnailAlt: product.description,
              thumbnailUrl: product.images[0].url,
              slug: product.slug,
            }}
          />
        </li>
      ))}
    </ul>
  );
};

// called when app is building
export const getStaticProps = async () => {
  const { data } = await apolloClient.query<GetAllProductsResponse>({
    query: GetAllProducts,
  });
  return {
    props: {
      data,
    },
  };
};

export default GraphqlProductsPage;

export interface Image {
  id: string;
  url: string;
}

export interface GetAllProductsResponse {
  products: Array<Product>;
}

export interface Product {
  images: Array<Image>;
  description: string;
  id: string;
  title: string;
  slug: string;
}
