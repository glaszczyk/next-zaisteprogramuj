import {Rating} from "@/components/Rating";

export interface StoreApiResponse {
    longDescription: string;
    image: string;
    price: number;
    rating: {
        rate: number;
        count: number;
    };
    description: string;
    id: string;
    title: string;
    category: string;
}

interface ProductDetailsCSRProps  {
    data: StoreApiResponse
}
export const ProductDetailsCSR = (props: ProductDetailsCSRProps) => {
    const {data} = props;
  return (
      <div className='mt-4 bg-white p-4 flex sm:w-full md:w-[75%] w-[50%] flex-col'>
          <div className=''>
            <img className='object-contain aspect-auto h-92 w-64' src={data.image} alt={data.description}/>
          </div>
          <h2 className='text-3xl font-bold pt-8 pb-4'>{data.title}</h2>
          <p className='mb-4'>{data.longDescription}</p>
          <Rating rating={data.rating.rate} />
      </div>
  )
}

type ProductListItemData = Pick<StoreApiResponse, 'id' | 'title' | 'description' | 'image'>
interface ProductListItemProps {
    data: ProductListItemData
    onClick: (value: string) => void
}

export const ProductListItem = (props: ProductListItemProps) => {
    const {data, onClick} = props
    return (
        <div className='p-4 flex flex-col h-full shadow-md rounded-md bg-white'>
            <div className='flex justify-center pb-4 w-full h-full'>
                <img className='object-contain aspect-auto h-92 w-64' src={data.image} alt={data.description}/>
            </div>
            <h2 className='text-2xl font-bold'>
            <button onClick={() => onClick(data.id)}>
                {data.title}
            </button>
            </h2>
        </div>
    )
}

