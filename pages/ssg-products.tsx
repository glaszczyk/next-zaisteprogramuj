import {InferGetStaticPropsType} from "next";

const SSGProductsPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
	const {data} = props;
return (
    <p>{data[0].title}</p>
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

