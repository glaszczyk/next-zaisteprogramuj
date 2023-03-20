import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import { MarkdownResult } from '@/utilityTypes';
import ReactMarkdown from 'react-markdown';

const isInternalLink = (app: URL, url: string) => {
  try {
    const urlToCheck = new URL(url);
    return app.hostname === urlToCheck.hostname;
  } catch (e) {
    const re = /\w+?[?#;/]/;
    return (
      ['.', './', '/', '?', '#', ';'].some((start) => url.startsWith(start)) ||
      re.test(url)
    );
  }
};

const mappedComponents = (envUrl: URL) => ({
  a: ({ href, ...props }: { href?: string }) => {
    if (!href) {
      return <a {...props}></a>;
    }
    if (!isInternalLink(envUrl, href)) {
      return <a href={href} {...props} rel="noopener noreferrer"></a>;
    }
    return <Link href={href} {...props} />;
  },
});

export const CustomReactMarkdown = ({
  children,
}: {
  children: string | MarkdownResult;
}) => {
  try {
    const envUrl = new URL('/', process.env.NEXT_PUBLIC_HOST);
    if (typeof children === 'string') {
      return (
        <ReactMarkdown components={mappedComponents(envUrl)}>
          {children}
        </ReactMarkdown>
      );
    }
    return <MDXRemote {...children} components={mappedComponents(envUrl)} />;
  } catch (e) {
    throw Error('Host env variable not defined');
  }
};
