import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Cpu, Dna } from 'lucide-react';

export default function About() {
  return (
    <section id="about">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Decoding Our Purpose</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto font-body">
            We are a creative laboratory where futuristic technology and ancient inspiration collide to produce games, websites, and educational tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative rounded-lg overflow-hidden shadow-lg border border-primary/20">
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/10 opacity-30 z-10" />
            <img
              src="/images/our-mission-our-vision-image.png"
              alt="Futuristic glowing hieroglyphs on a dark metal wall"
              width={600}
              height={400}
              className="w-full h-auto object-cover"              
            />
          </div>
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Uncle Pete's Labs was founded to bridge the gap between imagination and digital reality. We are a passionate team of developers, designers, and storytellers who believe in the power of play and the joy of creation. We experiment with emerging tech to turn bold ideas into polished, interactive experiences.
            </p>
            <div className="space-y-4">
                <Card className="p-4 flex items-start gap-4 bg-card/50 border-primary/20">
                    <Cpu className="h-8 w-8 text-accent mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-headline font-bold text-lg text-primary">Our Mission</h3>
                        <p className="text-sm text-muted-foreground">To engineer engaging and memorable digital experiences that spark curiosity and a sense of futuristic wonder.</p>
                    </div>
                </Card>
                <Card className="p-4 flex items-start gap-4 bg-card/50 border-primary/20">
                    <Dna className="h-8 w-8 text-accent mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-headline font-bold text-lg text-primary">Our Vision</h3>
                        <p className="text-sm text-muted-foreground">To build a vibrant community around our creations and inspire the next generation of digital artisans and innovators.</p>
                    </div>
                </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
