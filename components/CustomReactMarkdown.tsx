import Link from "next/link";
import {MDXRemote, MDXRemoteSerializeResult} from "next-mdx-remote";

export const CustomReactMarkdown = ({children}: { children: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>> }) => {
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