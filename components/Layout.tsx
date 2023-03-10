import {ReactNode} from "react";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import Head from "next/head";

interface LayoutProps {
    children: ReactNode;
}
export const Layout = ({children}: LayoutProps) => {
    return (
        <div className='flex flex-col min-h-screen max-w-8xl'>
            <Head>
                <title>Nasz sklep z next</title>
                <meta name='description' content='To jest projekt sklepu przygotowany przy pomocy Next js, Tailwind i GraphQL'></meta>
            </Head>
            <Header />
            <div className='flex-grow'>{children}</div>
            <Footer />
        </div>
    )
}