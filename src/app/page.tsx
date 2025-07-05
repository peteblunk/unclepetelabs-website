import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Services from '@/components/sections/services';
import Faq from '@/components/sections/faq';
import Contact from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="h-16"></div>
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
