import { FakeProductDetails } from '@/components/FakeProductDetails';
import { useQuery, gql } from '@apollo/client';

const GetProducts = gql`
  query GetAllProducts {
    products {
      id
      slug
      title
      description
      thumbnail {
        url
      }
    }
  }
`;

const HomePage = () => {
  const { loading, error, data } = useQuery(GetProducts);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(data);
  const product = data.products[0];
  return (
    <FakeProductDetails
      data={{
        slug: product.slug,
        id: product.id,
        title: product.title,
        thumbnailAlt: product.slug,
        description: product.description,
        rating: 4,
        thumbnailUrl: product.thumbnail.url,
      }}
    />
  );
};

export default HomePage;
