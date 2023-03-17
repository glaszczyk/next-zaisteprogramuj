import { FakeProductDetails } from '@/components/FakeProductDetails';
import { useQuery, gql } from '@apollo/client';

const DATA = {
  id: '123',
  title: 'My new great product',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis ipsum dolor. Vestibulum pulvinar lobortis mi, sit amet ultrices ante dapibus ac. Curabitur a pellentesque libero, sit amet volutpat tortor. Nullam congue arcu eleifend, auctor dolor in, sodales ipsum. In at augue ac dolor posuere interdum ac non odio. Mauris arcu quam, imperdiet eu justo id, feugiat rutrum mauris. Pellentesque lobortis sagittis condimentum. Fusce molestie orci ante, eleifend semper dui ullamcorper ac. Donec cursus lacus ex, at dapibus urna volutpat eu. Quisque urna dui, varius quis ultricies mattis, ullamcorper et augue. Nulla volutpat tincidunt ultricies.',
  thumbnailUrl: 'https://picsum.photos/id/29/400/267',
  thumbnailAlt: 'This is image description',
  rating: 4.5,
};

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
