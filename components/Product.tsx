import {Rating} from "@/components/Rating";

interface ProductProps {
    data: {
        description: string,
        thumbnailUrl: string,
        thumbnailAlt: string,
        rating: number
    }
}

export const Product = (props: ProductProps) => {
    const {data} = props;
    return (
        <>
            <img src={data.thumbnailUrl} alt={data.thumbnailAlt}/>
            <p>{data.description}</p>
            <Rating rating={data.rating}/>
        </>
    )
}