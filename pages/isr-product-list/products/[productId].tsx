import {ProductDetailsCSR, StoreApiResponse} from "@/components/ProductDetailsCSR";
import {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import {useRouter} from "next/router";

const ProductIdPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const {data} = props;
    const router = useRouter();
    if (!data) {
        return (
            <div className='bg-gray-100 p-4'>
                <button className='p-2 bg-white border-2 border-grey-200 rounded-md' onClick={() => router.back()}>Go back to the list</button>
                <div>Something went wrong!</div>
            </div>
        )}
    return (
        <div className='bg-gray-100 p-4'>
            <button className='p-2 bg-white border-2 border-grey-200 rounded-md' onClick={() => router.back()}>Go back to the list</button>
            <ProductDetailsCSR data={data} />
        </div>
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