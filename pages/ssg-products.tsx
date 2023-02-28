import {InferGetStaticPropsType} from "next";
import {Product} from "@/components/Product";

const SSGProductsPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
	const {data} = props;
return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
		{data.map(product => (
			<li key={product.id}>
				<Product data={
					{
						description: product.description,
						rating: product.rating.rate,
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

export default SSGProductsPage;

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

