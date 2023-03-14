import Link from "next/link";
import {MDXRemote} from "next-mdx-remote";
import {MarkdownResult} from "@/utilityTypes";

const isInternalLink = (app: URL, url:string) => {
    try {
        const urlToCheck = new URL(url);
        return  app.hostname === urlToCheck.hostname;
    } catch (e) {
        const re = /\w+?[?#;/]/;
        return ['.', './', '/', '?', '#', ';'].some(start => url.startsWith(start)) || re.test(url);
    }

}

export const CustomReactMarkdown = ({children}: { children: MarkdownResult }) => {
    try {
        console.log(process.env.NEXT_PUBLIC_HOST);
        const envUrl = new URL('/', process.env.NEXT_PUBLIC_HOST);
        return (
            <MDXRemote
                {...children}
                components={{
                    a: ({href, ...props}: {href?: string}) => {
                        if (!href) {
                            return <a {...props}></a>
                        }
                        if (!isInternalLink(envUrl, href)) {
                            return <a href={href} {...props} rel="noopener noreferrer"></a>
                        }
                        return <Link href={href} {...props} />
                    }
                }}
            />
        )
    } catch (e) {
        throw Error('Host env variable not defined');
    }
}