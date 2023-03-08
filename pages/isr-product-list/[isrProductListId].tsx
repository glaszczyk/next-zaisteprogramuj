import {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import {useRouter} from "next/router";
import {getRange, usePagination} from "@/hooks/usePagination";
import {ProductList} from "@/components/ProductList";
import {StoreApiResponse} from "@/pages/product-list/[productListId]";
import {fetchProductsFrom} from "@/helpers/fetchProductsFrom";

const siblings = 2;
const link =  'isr-product-list';

const IsrProductListIdPage = (props: InferGetStaticPropsType<typeof getStaticProps> ) => {
  const router = useRouter();
  const {Pagination} = usePagination(link);
  const {data, moreProducts} = props;

  const handleSelectProduct = (id: string) => {
    router.push(`./products/${id}`).then(() => null )
  }

    return (
        <div className='bg-gray-100 p-4'>
          <Pagination siblings={siblings} moreProducts={moreProducts}/>
          <ProductList data={data} onClick={handleSelectProduct} />
        </div>
    )
}

export default IsrProductListIdPage;

export const getStaticPaths = () => {
  return {
    paths: getRange(1, siblings * 2 + 2).map(item => {
      return {
        params: {
          isrProductListId: `${item}`
        }
      }
    }),
    fallback: 'blocking',

  }
}

export const getStaticProps =  async ({params}: GetStaticPropsContext<InferGetStaticPathsType<typeof getStaticPaths>>) => {
  const productsFetcher = fetchProductsFrom('https://naszsklep-api.vercel.app/api/products');
  let moreProducts = true;
  if (!params?.isrProductListId) {
    return {
      props: {},
      notFound: true
    }
  }
  const offset = Number.parseInt(params?.isrProductListId) - 1;
  let promises = [
      await productsFetcher<StoreApiResponse>(25, offset),
      await productsFetcher<StoreApiResponse>(25, offset+1),
  ];
  const [first, second] = await Promise.all(promises);
  if (first.length < 24 && second.length < 24) {
    return {
      props: {},
      notFound: true
    }
  }
  if (first.length < 25 || first.length === 25 && second.length === 0) {
    moreProducts = false;
  }
  const data: StoreApiResponse[] = first;

  return ({
    props: {
      data,
      moreProducts,
    }
  })
}

export type InferGetStaticPathsType<T> = T extends () => {
      paths: Array<{ params: infer R }>;
    }
    ? R
    : never;