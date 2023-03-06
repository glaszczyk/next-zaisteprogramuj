import {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import {getRange, usePagination} from "@/components/usePagination";
import {ProductDetailsCSR, StoreApiResponse} from "@/components/ProductDetailsCSR";
import {useState} from "react";
import {ProductList} from "@/components/ProductList";

type ViewType = 'list' | 'item';
const link =  'product-list';

const ProductListIdPage = (props: InferGetStaticPropsType<typeof getStaticProps> ) => {
  const {Pagination} = usePagination(link)
  const [view, setView] = useState<ViewType>('list');
  const [selectedItem, setSelectedItem] = useState({} as StoreApiResponse);
  const {data} = props;

  const handleSelectProduct = (id: string) => {
    const filtered = data?.filter(item => item.id === id);
    if (filtered?.length) {
      setSelectedItem({...filtered[0]});
      setView('item');
    }
  }

  const handleBack = () => {
    setView('list');
  }

  if (view === 'list') {
    return (
        <div className='bg-gray-100 p-4'>
          <Pagination siblings={2} last={10}/>
          <ProductList data={data} onClick={handleSelectProduct} />
        </div>
    )
  }

  if (view === 'item') {
    return (
        <div className='bg-gray-100 p-4'>
          <button className='p-2 bg-white border-2 border-grey-200 rounded-md' onClick={handleBack}>Go back to the list</button>
          <ProductDetailsCSR data={selectedItem}/>
        </div>
    )
  }
}

export default ProductListIdPage;

export const getStaticPaths = () => {
  return {
    paths: getRange(1,10).map(item => {
      return {
        params: {
          productListId: `${item}`
        }
      }
    }),
    fallback: false
  }
}

export const getStaticProps =  async ({params}: GetStaticPropsContext<InferGetStaticPathsType<typeof getStaticPaths>>) => {
  if (!params?.productListId) {
    return {
      props: {},
      notFound: true
    }
  }
  const offset = Number.parseInt(params?.productListId) - 1;
  const response = await  fetch(`https://naszsklep-api.vercel.app/api/products?take=25&offset=${offset}`);
  const data: StoreApiResponse[] = await response.json();

  return ({
    props: {
      data
    }
  })
}

export type InferGetStaticPathsType<T> = T extends () => {
      paths: Array<{ params: infer R }>;
    }
    ? R
    : never;