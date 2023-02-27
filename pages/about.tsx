import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';
import {Main} from "@/components/Main";

const AboutPage = () => {
    return (
        <div className='flex flex-col min-h-screen max-w-2xl'>
            <Header />
            <Main>
                <p>Hello World!</p>
            </Main>
            <Footer />
        </div>
    )
}

export default AboutPage;
