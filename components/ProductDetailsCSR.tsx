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
      <div>
          <img src={data.image} alt={data.description}/>
          <h2>{data.title}</h2>
          <p>{data.longDescription}</p>
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
        <div>
            <img src={data.image} alt={data.description}/>
            <h2>
            <button onClick={() => onClick(data.id)}>
                {data.title}
            </button>
            </h2>
        </div>
    )
}

