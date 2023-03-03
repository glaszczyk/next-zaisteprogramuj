import {ProductListItem, StoreApiResponse} from "@/components/ProductDetailsCSR";

interface ProductListProps {
    data: StoreApiResponse[] | undefined,
    isLoading?: boolean,
    error?: unknown,
    onClick: (value: string) => void,
}

export const ProductList = (props: ProductListProps) => {
    const {data, isLoading, error, onClick} = props
    if (isLoading) {
        return <p className='bg-gray-100'>…Loading</p>
    }
    if (!data || error) {
        return <p className='bg-gray-100'>Something went wrong</p>
    }
    return (
        <ul className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {
                data.map(item => {
                    return (
                        <li key={item.id}>
                            <ProductListItem
                                data={{
                                    id: item.id,
                                    title: item.title,
                                    image: item.image,
                                    description: item.description
                                }}
                                onClick={onClick}
                            />
                        </li>)
                })
            }
        </ul>
    )
}