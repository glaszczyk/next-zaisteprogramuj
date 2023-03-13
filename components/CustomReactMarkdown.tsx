import Link from "next/link";
import {MDXRemote} from "next-mdx-remote";
import {MarkdownResult} from "@/utilityTypes";

export const CustomReactMarkdown = ({children}: { children: MarkdownResult }) => {
    return (
        <MDXRemote
            {...children}
            components={{
                a: ({href, ...props}: {href?: string}) => {
                    if (!href) {
                        return <a {...props}></a>
                    }
                    return <Link href={href} {...props} />
                }
            }}
        />
    )
}