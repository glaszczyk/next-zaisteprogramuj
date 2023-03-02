import {InferGetStaticPropsType} from "next";
import {ProductListItem} from "@/components/ProductDetails";

const SSGFakeProductsPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
	const {data} = props;
return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
		{data.map(product => (
			<li key={product.id} className='p-4 shadow-lg border-2 rounded-md'>
				<ProductListItem data={
					{
						id: `${product.id}`,
						title: product.title,
						thumbnailAlt: product.description,
						thumbnailUrl: product.image
					}
				} />
			</li>
		))}
	</ul>
)
}

// called when app is building
export const getStaticProps = async () => {
	const response = await fetch('https://fakestoreapi.com/products/');
	const data: StoreApiResponse[] = await response.json();
	return {
		props: {
			data
		}
	}
}

export default SSGFakeProductsPage;

interface  StoreApiResponse {
	image: string;
	price: number;
	rating: {
		rate: number;
		count: number;
	};
	description: string;
	id: number;
	title: string;
	category: string;
}

