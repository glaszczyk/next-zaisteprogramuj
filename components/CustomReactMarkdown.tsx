import ReactMarkdown from "react-markdown";
import Link from "next/link";

export const CustomReactMarkdown = ({children}: { children: string }) => {
    return (
        <ReactMarkdown
            components={{
                a: ({href, ...props}) => {
                    if (!href) {
                        return <a {...props}></a>
                    }
                    return <Link href={href} {...props} />
                }
            }}
        >{children}</ReactMarkdown>
    )
}