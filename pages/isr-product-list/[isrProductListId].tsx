import {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import {getRange, usePagination} from "@/hooks/usePagination";
import {ProductDetailsCSR, StoreApiResponse} from "@/components/ProductDetailsCSR";
import {useState} from "react";
import {ProductList} from "@/components/ProductList";

type ViewType = 'list' | 'item';
const siblings = 2;
const link =  'isr-product-list';

const IsrProductListIdPage = (props: InferGetStaticPropsType<typeof getStaticProps> ) => {
  const {Pagination} = usePagination(link);
  const [view, setView] = useState<ViewType>('list');
  const [selectedItem, setSelectedItem] = useState({} as StoreApiResponse);
  const {data, moreProducts} = props;

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
          <Pagination siblings={siblings} moreProducts={moreProducts}
                      />
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
  let moreProducts = true;
  if (!params?.isrProductListId) {
    return {
      props: {},
      notFound: true
    }
  }
  const offset = Number.parseInt(params?.isrProductListId) - 1;
  let promises = [
    fetch(`https://naszsklep-api.vercel.app/api/products?take=25&offset=${offset}`).then(r => r.json()),
    fetch(`https://naszsklep-api.vercel.app/api/products?take=25&offset=${offset+1}`).then(r => r.json())
  ];
  const [first, second]: StoreApiResponse[][] = await Promise.all(promises);
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