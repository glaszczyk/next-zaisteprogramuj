import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";

const AboutPage = () => {
    return (
        <div className='flex flex-col min-h-screen max-w-2xl'>
            <Header />
            <main className='bg-gray-50 flex-grow px-4 py-2 grid gap-6 sm:grid-cols-2'>
                <p>Cześć z nowej strony</p>
            </main>
            <Footer />
        </div>
    )
}

export default AboutPage;
