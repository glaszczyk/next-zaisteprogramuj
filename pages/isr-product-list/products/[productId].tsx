import {StoreApiResponse} from "@/components/ProductDetailsCSR";
import {GetStaticPropsContext, InferGetStaticPropsType} from "next";

const ProductIdPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const {data} = props;
    return (
        <div>{data?.title}</div>
    )
}

export default ProductIdPage;

const fetchProduct = async (id: string) => {
    const response = await fetch(`https://naszsklep-api.vercel.app/api/products/${id}`);
    const data: StoreApiResponse = await response.json();
    return data;
}


export const getStaticPaths = async () => {
    const response = await  fetch(`https://naszsklep-api.vercel.app/api/products?take=500&offset=0`);
    const data: StoreApiResponse[] = await response.json();
    return ({
        paths: data.map(item => {
            return {
                params: {
                    productId: `${item.id}`
                }
            }
        }),
        fallback: 'blocking'
    })
}


export const getStaticProps = async ({params}: GetStaticPropsContext<InferGetStaticPathsType<typeof getStaticPaths>>) => {
    if (!params?.productId) {
    return (
        {
            props: {},
            notFound: true
        }
    )}
    const data = await fetchProduct(params?.productId)
    return (
        {
            props: {
                data
            }
        }
    )
}

export type InferGetStaticPathsType<T> = T extends () => Promise<{
        paths: Array<{ params: infer R }>;
    }>
    ? R
    : never;