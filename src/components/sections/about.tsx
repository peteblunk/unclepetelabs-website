import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Sparkles, Rocket } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground">Who We Are</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            We're a creative playground where ideas for games, websites, and educational tools come to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 opacity-50 z-10" />
            <Image
              src="https://placehold.co/600x400.png"
              alt="A creative workspace with computers and sketches"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
              data-ai-hint="creative studio"
            />
          </div>
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Uncle Pete's Labs was founded on the principle of bridging the gap between imagination and interaction. We're a passionate team of developers, designers, and storytellers who believe in the power of play and the joy of creation. We love to experiment, build prototypes, and turn quirky ideas into polished digital experiences.
            </p>
            <div className="space-y-4">
                <Card className="p-4 flex items-start gap-4 bg-card/50">
                    <Sparkles className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-headline font-bold text-lg">Our Mission</h3>
                        <p className="text-sm text-muted-foreground">To create engaging and memorable digital experiences that spark joy, curiosity, and a sense of wonder.</p>
                    </div>
                </Card>
                <Card className="p-4 flex items-start gap-4 bg-card/50">
                    <Rocket className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-headline font-bold text-lg">Our Vision</h3>
                        <p className="text-sm text-muted-foreground">To build a vibrant community around our creations and inspire the next generation of makers, thinkers, and dreamers.</p>
                    </div>
                </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
