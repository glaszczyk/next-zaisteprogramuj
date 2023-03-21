import { InferGetStaticPropsType } from 'next';
import { FakeProductListItem } from '@/components/FakeProductDetails';
import { apolloClient } from '@/graphql/apolloClient';
import {
  GetAllProductsDocument,
  GetAllProductsQuery,
} from '@/generated/graphql';

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
              thumbnailAlt: product.title,
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
  const { data } = await apolloClient.query<GetAllProductsQuery>({
    query: GetAllProductsDocument,
  });
  return {
    props: {
      data,
    },
  };
};

export default GraphqlProductsPage;
