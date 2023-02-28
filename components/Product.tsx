import {Rating} from "@/components/Rating";

interface ProductProps {
    data: {
        title: string,
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
            <h2 className='text-2xl font-bold pt-2 pb-1'>{data.title}</h2>
            <p>{data.description}</p>
            <Rating rating={data.rating}/>
        </>
    )
}