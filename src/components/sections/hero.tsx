import { Button } from '@/components/ui/button';
import { ArrowRight, Wand2 } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative bg-card overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
       <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-transparent to-primary/10 opacity-30"
      />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-4">
             <Wand2 className="h-12 w-12 text-primary" />
          </div>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 text-foreground">
            Uncle Pete's Labs
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Crafting delightful games, websites, and educational experiences with a dash of experimentation and a whole lot of fun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <a href="#services">
                Explore Our Creations <ArrowRight className="ml-2" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
