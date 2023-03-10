import {ReactNode} from "react";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";

interface LayoutProps {
    children: ReactNode;
}
export const Layout = ({children}: LayoutProps) => {
    return (
        <div className='flex flex-col min-h-screen max-w-8xl'>
            <Header />
            <div className='flex-grow'>{children}</div>
            <Footer />
        </div>
    )
}