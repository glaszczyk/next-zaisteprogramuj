import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {ProductDetailsCSR, ProductListItem, StoreApiResponse} from "@/components/ProductDetailsCSR";
import {Pagination} from "@/components/Pagination";

const fetchProducts = async (currentPage: number) => {
    const offset = currentPage - 1;
    const response = await fetch(`https://naszsklep-api.vercel.app/api/products?take=25&offset=${offset}`);
    const data: StoreApiResponse[] = await response.json();
    return data;
}

interface ProductListProps {
    data: StoreApiResponse[] | undefined,
    isLoading: boolean,
    error: unknown,
    onClick: (value: string) => void,
}

const ProductList = (props: ProductListProps) => {
    const {data, isLoading, error, onClick} = props
    if (isLoading) {
        return <p>…Loading</p>
    }
    if (!data || error) {
        return <p>Something went wrong</p>
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

const CsrProductsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [view, setView] = useState<'list' | 'item'>('list');
    const [selectedItem, setSelectedItem] = useState({} as StoreApiResponse);
    const {data, error, isLoading} = useQuery(['products', currentPage], () => fetchProducts(currentPage));

    const handleSelectProduct = (id: string) => {
        console.log(id)
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
            <div>
                <Pagination current={currentPage} siblings={2} last={10}
                            onClick={(newPage) => setCurrentPage(newPage)}/>
                <ProductList isLoading={isLoading} data={data} onClick={handleSelectProduct} error={error}/>
            </div>
        )
    }

    if (view === 'item') {
        return (
            <div>
                <button onClick={handleBack}>Go back to the list</button>
                <ProductDetailsCSR data={selectedItem}/>
            </div>
        )
    }
}

export default CsrProductsPage;
