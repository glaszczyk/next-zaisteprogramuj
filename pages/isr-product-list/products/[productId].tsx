import {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import {useRouter} from "next/router";
import {serialize} from "next-mdx-remote/serialize";
import {ProductDetailsCSR} from "@/components/ProductDetailsCSR";
import {fetchProductFrom} from "@/helpers/fetchProductFrom";
import {fetchProductsFrom} from "@/helpers/fetchProductsFrom";
import {StoreApiResponse} from "@/pages/product-list/[productListId]";

const API_URL = 'https://naszsklep-api.vercel.app/api/products';

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
    const productFetcher = fetchProductFrom(API_URL);
    return await productFetcher<StoreApiResponse>(id);
}


export const getStaticPaths = async () => {
    const productsFetcher = fetchProductsFrom(API_URL);
    const data = await  productsFetcher<StoreApiResponse>(500, 0);
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
                data: {...data, longDescription: await serialize(data.longDescription)}
            }
        }
    )
}

export type InferGetStaticPathsType<T> = T extends () => Promise<{
        paths: Array<{ params: infer R }>;
    }>
    ? R
    : never;