import {Rating} from "@/components/Rating";
import Link from "next/link";

interface FakeProductDetails {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    thumbnailAlt: string;
    rating: number;
}

interface FakeProductDetailsProps {
    data: FakeProductDetails
}

export const FakeProductDetails = (props: FakeProductDetailsProps) => {
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

type ProductListFakeItem = Pick<FakeProductDetails, 'id' | 'title' | 'thumbnailUrl' | 'thumbnailAlt'>

interface FakeProductListItemProps {
    data: ProductListFakeItem
}

export const FakeProductListItem = (props: FakeProductListItemProps) => {
    const {data} = props;
    return (
        <>
            <img src={data.thumbnailUrl} alt={data.thumbnailAlt}/>
            <h2 className='text-2xl font-bold pt-2 pb-1'><Link href={`/products/${data.id}`}>{data.title}</Link></h2>
        </>
    )
}