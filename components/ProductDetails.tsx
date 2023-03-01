import {Rating} from "@/components/Rating";
import Link from "next/link";

interface ProductDetails {
    id: number;
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

type ProductListItem = Pick<ProductDetails, 'id' | 'title' | 'thumbnailUrl' | 'thumbnailAlt'>

interface ProductListItemProps {
    data: ProductListItem
}

export const ProductListItem = (props: ProductListItemProps) => {
    const {data} = props;
    return (
        <>
            <img src={data.thumbnailUrl} alt={data.thumbnailAlt}/>
            <h2 className='text-2xl font-bold pt-2 pb-1'><Link href={`/products/${data.id}`}>{data.title}</Link></h2>
        </>
    )
}