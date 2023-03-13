import { DefaultSeoProps } from 'next-seo';

const title = 'To jest sklep na podstawie kursu zaisteprogramuj';
const description = 'To jest opis dla robotów. Sklep na podstawie kursu zaisteprogramuj';

const config: DefaultSeoProps = {
    title,
    description,
    openGraph: {
        title,
        description,
        type: 'website',
        locale: 'en_IE',
        siteName: 'Sklep next',
    },
    twitter: {
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
    },
};

export default config;