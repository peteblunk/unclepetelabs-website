import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Target, Eye, Atom } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground">About Us</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Forging the future of industrial science with relentless innovation and robust engineering.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 opacity-50 z-10" />
            <Image
              src="https://placehold.co/600x400.png"
              alt="Lab interior"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
              data-ai-hint="science laboratory"
            />
          </div>
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Uncle Pete Laboratories was founded on the principle of bridging the gap between theoretical science and practical industrial application. Our team of dedicated experts leverages cutting-edge technology and a first-principles approach to solve the toughest challenges.
            </p>
            <div className="space-y-4">
                <Card className="p-4 flex items-start gap-4 bg-card/50">
                    <Target className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-headline font-bold text-lg">Our Mission</h3>
                        <p className="text-sm text-muted-foreground">To provide unparalleled laboratory services and innovative solutions that drive efficiency, safety, and progress for our industrial partners.</p>
                    </div>
                </Card>
                <Card className="p-4 flex items-start gap-4 bg-card/50">
                    <Eye className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-headline font-bold text-lg">Our Vision</h3>
                        <p className="text-sm text-muted-foreground">To be the most trusted and sought-after name in industrial science, known for our integrity, precision, and transformative results.</p>
                    </div>
                </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
