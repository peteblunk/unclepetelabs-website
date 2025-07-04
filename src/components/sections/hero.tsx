import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import SineWaveIcon from '@/components/icons/sine-wave-icon';

export default function Hero() {
  return (
    <section id="home" className="relative bg-background overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
       {/* <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5 opacity-50"
      />
       <div
        aria-hidden="true"
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-primary/5 blur-3xl animate-pulse"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-accent/5 blur-3xl animate-pulse delay-500"
      />
 */}
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-4 p-3 bg-primary/10 rounded-full border border-primary/20">
            <img src="/images/unclepetelogoblue.png" alt="Uncle Pete's Labs Logo" className="h-120 w-120" />
          </div>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 text-electric-purple">
            Digital Creation. Ancient Inspiration.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            We are a creative studio decoding the fun of the future. We build games, websites, and educational experiences that fuse modern tech with timeless wonder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20">
              <a href="#services">
                Explore Our Creations <ArrowRight className="ml-2" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 hover:text-primary-foreground">
              <a href="#contact">Interface with Us</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
