import {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import {ProductDetails} from "@/components/ProductDetails";
import Link from "next/link";

const ProductIdPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {data} = props;
  if (!data) {
    return <p>Something went wrong</p>
  }
  return (
      <div>
        <Link href='/'>Wróc na stronę główną</Link>
        <ProductDetails data={{
        id: data.id,
        title: data.title,
        rating: data.rating.rate,
        thumbnailAlt: data.description,
        thumbnailUrl: data.image,
        description: data.description
      }}/></div>
  )
}

export default ProductIdPage;

interface  StoreApiResponse {
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

export const  getStaticPaths = async () => {
  const response = await fetch('https://fakestoreapi.com/products/');
  const data: StoreApiResponse[] = await response.json();
  return ({
    paths: data.map(item => {
      return {
        params: {
          productId: `${item.id}`
        }
      }
    }),
    fallback: false
  })
}

export type InferGetStaticPathsType<T> = T extends () => Promise<{
      paths: Array<{ params: infer R }>;
    }>
    ? R
    : never;

export const getStaticProps = async ({params }: GetStaticPropsContext<InferGetStaticPathsType<typeof getStaticPaths>> ) => {
  if (!params?.productId) {
    return {
      props: {},
      notFound: true
    }
  }
  const response = await  fetch(`https://fakestoreapi.com/products/${params.productId}`);
  const data: StoreApiResponse | null = await response.json();

  return ({
    props: {
      data
    }
  })
}