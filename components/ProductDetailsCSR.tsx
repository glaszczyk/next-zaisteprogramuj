import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { StoreApiResponse } from '@/pages/product-list/[productListId]';
import { Rating } from '@/components/Rating';
import { CustomReactMarkdown } from '@/components/CustomReactMarkdown';

interface ProductDetailsCSRProps {
  data: StoreApiResponse;
}
export const ProductDetailsCSR = (props: ProductDetailsCSRProps) => {
  const { data } = props;
  const router = useRouter();
  return (
    <div className="mt-4 bg-white p-4 flex sm:w-full md:w-[75%] w-[50%] flex-col">
      <NextSeo
        title={data.title}
        description={data.description}
        canonical={`${router.basePath}/${router.asPath}`}
        openGraph={{
          url: `${router.basePath}/${router.asPath}`,
          title: data.title,
          description: data.description,
          images: [
            {
              url: data.image,
              alt: data.description,
              type: 'image/jpeg',
            },
          ],
          siteName: 'SiteName',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <div className="">
        <Image
          loader={({ src, width }) => `${src}?w=${width}`}
          src={data.image}
          alt={data.description}
          width={500}
          height={300}
          style={{
            maxWidth: '100%',
            height: 'auto',
            aspectRatio: '4/3',
            objectFit: 'contain',
          }}
        />
      </div>
      <h2 className="text-3xl font-bold pt-8 pb-4">{data.title}</h2>
      <article className="prose prose-base xl:prose-xl">
        <CustomReactMarkdown>{data.longDescription}</CustomReactMarkdown>
      </article>
      <Rating rating={data.rating.rate} />
    </div>
  );
};

type ProductListItemData = Pick<
  StoreApiResponse,
  'id' | 'title' | 'description' | 'image'
>;
interface ProductListItemProps {
  data: ProductListItemData;
  onClick: (value: string) => void;
}

export const ProductListItem = (props: ProductListItemProps) => {
  const { data, onClick } = props;
  return (
    <div className="p-4 flex flex-col h-full shadow-md rounded-md bg-white">
      <div className="flex justify-center pb-4 w-full h-full">
        <Image
          loader={({ src, width, quality }) => `${src}?w=${width}&q=${quality}`}
          src={data.image}
          alt={data.description}
          width={500}
          height={300}
          quality={70}
          style={{
            maxWidth: '100%',
            height: 'auto',
            aspectRatio: '4/3',
            objectFit: 'contain',
          }}
        />
      </div>
      <h2 className="text-2xl font-bold">
        <button onClick={() => onClick(data.id)}>{data.title}</button>
      </h2>
    </div>
  );
};
