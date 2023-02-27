import {ReactNode} from "react";

interface MainProps {
    children: ReactNode
}

export const Main = (props: MainProps) => {
    const {children} = props;
    return (
        <main className='bg-gray-50 flex-grow px-4 py-2 grid gap-6 sm:grid-cols-2'>
            {children}
        </main>
    )
}