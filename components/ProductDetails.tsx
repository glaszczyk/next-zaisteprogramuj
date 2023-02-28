import {Rating} from "@/components/Rating";

interface ProductDetails {
    title: string;
    description: string;
    thumbnailUrl: string;
    thumbnailAlt: string;
    rating: number;
}

interface ProductDetailsProps {
    data: ProductDetails
}

export const ProductDetails = (props: ProductDetailsProps) => {
    const {data} = props;
    return (
        <>
            <img src={data.thumbnailUrl} alt={data.thumbnailAlt}/>
            <h2 className='text-2xl font-bold pt-2 pb-1'>{data.title}</h2>
            <p>{data.description}</p>
            <Rating rating={data.rating}/>
        </>
    )
}

type ProductListItem = Pick<ProductDetails, 'title' | 'thumbnailUrl' | 'thumbnailAlt'>

interface ProductListItemProps {
    data: ProductListItem
}

export const ProductListItem = (props: ProductListItemProps) => {
    const {data} = props;
    return (
        <>
            <img src={data.thumbnailUrl} alt={data.thumbnailAlt}/>
            <h2 className='text-2xl font-bold pt-2 pb-1'>{data.title}</h2>
        </>
    )
}