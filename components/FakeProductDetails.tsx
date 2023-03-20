import { Rating } from '@/components/Rating';
import Link from 'next/link';
import Image from 'next/image';

interface FakeProductDetails {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
}

interface FakeProductDetailsProps {
  data: FakeProductDetails;
}

export const FakeProductDetails = (props: FakeProductDetailsProps) => {
  const { data } = props;
  return (
    <>
      <Image
        loader={({ src, width }) => `${src}?w=${width}`}
        src={data.thumbnailUrl}
        alt={data.thumbnailAlt}
        width={500}
        height={300}
        style={{
          maxWidth: '100%',
          height: 'auto',
          aspectRatio: '4/3',
          objectFit: 'contain',
        }}
      />
      <h2 className="text-2xl font-bold pt-8 pb-1">{data.title}</h2>
      <p>{data.description}</p>
      <Rating rating={data.rating} />
    </>
  );
};

type ProductListFakeItem = Pick<
  FakeProductDetails,
  'id' | 'title' | 'thumbnailUrl' | 'thumbnailAlt' | 'slug'
>;

interface FakeProductListItemProps {
  data: ProductListFakeItem;
}

export const FakeProductListItem = (props: FakeProductListItemProps) => {
  const { data } = props;
  return (
    <>
      <Image
        loader={({ src, width }) => `${src}?w=${width}`}
        src={data.thumbnailUrl}
        alt={data.thumbnailAlt}
        width={500}
        height={300}
        style={{
          maxWidth: '100%',
          height: 'auto',
          aspectRatio: '4/3',
          objectFit: 'contain',
        }}
      />
      <h2 className="text-2xl font-bold pt-8 pb-1">
        <Link href={`/products/${data.slug}`}>{data.title}</Link>
      </h2>
    </>
  );
};
