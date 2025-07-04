import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CircuitBoard, Pyramid, Library, Globe, FlaskConical, Palette } from 'lucide-react';

const creations = [
  {
    icon: CircuitBoard,
    title: 'Game Development',
    description: 'Engineering immersive games with complex narratives and innovative mechanics for web and desktop.',
  },
  {
    icon: Pyramid,
    title: 'Web Architecture',
    description: 'Constructing bespoke, high-performance websites with a unique aesthetic and robust functionality.',
  },
  {
    icon: Library,
    title: 'Educational Platforms',
    description: 'Creating interactive learning modules and knowledge systems that make education an adventure.',
  },
  {
    icon: Globe,
    title: 'Interactive Experiences',
    description: 'Designing unique digital installations and web-based generative art that respond to user input.',
  },
  {
    icon: FlaskConical,
    title: 'Creative Prototyping',
    description: 'Rapidly materializing concepts into testable prototypes and simulations to validate bold ideas.',
  },
  {
    icon: Palette,
    title: 'Digital Asset Forging',
    description: 'Producing custom 2D/3D art, procedural animations, and generative assets for advanced projects.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground">Our Digital Forges</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            From generative art to complex game systems, here's what we construct in our labs.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {creations.map((service) => (
            <Card key={service.title} className="group overflow-hidden text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-background/50 border border-primary/20 hover:border-accent">
              <CardHeader className="items-center">
                 <div className="relative rounded-lg bg-primary/10 p-4 border border-primary/20 transition-all duration-300 group-hover:bg-accent/10 group-hover:border-accent/30">
                   <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-secondary to-primary opacity-10 blur transition duration-500 group-hover:opacity-40 group-hover:duration-200"></div>
                   <div className="relative">
                     <service.icon className="h-10 w-10 text-primary transition-colors group-hover:text-accent" />
                   </div>
                 </div>
                <CardTitle className="font-headline pt-4 text-primary transition-colors group-hover:text-accent">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
