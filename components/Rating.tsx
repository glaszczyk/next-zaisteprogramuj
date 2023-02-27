interface RatingProps {
    rating: number
}

export const Rating = (props: RatingProps) => {
    const {rating} = props;
    return (
        <p className='text-blue-500 font-bold'>{rating}</p>
    )
};