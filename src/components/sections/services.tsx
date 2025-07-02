import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Gamepad2, MousePointerClick, BookOpen, ToyBrick, DraftingCompass, Paintbrush } from 'lucide-react';

const services = [
  {
    icon: Gamepad2,
    title: 'Game Development',
    description: 'Crafting fun and immersive games for web and desktop platforms.',
  },
  {
    icon: MousePointerClick,
    title: 'Web Design & Development',
    description: 'Building beautiful, modern, and responsive websites that tell your story.',
  },
  {
    icon: BookOpen,
    title: 'Educational Content',
    description: 'Creating interactive materials and tools that make learning an adventure.',
  },
  {
    icon: ToyBrick,
    title: 'Interactive Experiences',
    description: 'Designing unique digital installations and web-based interactive art.',
  },
  {
    icon: DraftingCompass,
    title: 'Creative Prototyping',
    description: 'Rapidly bringing your ideas to life with playable prototypes and mockups.',
  },
  {
    icon: Paintbrush,
    title: 'Digital Art & Assets',
    description: 'Producing custom 2D/3D art, animations, and assets for your projects.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground">Our Creations</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            From whimsical games to polished websites, here's what we cook up in our lab.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <Card key={service.title} className="group overflow-hidden text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="items-center">
                 <div className="relative rounded-lg bg-primary/10 p-4">
                   <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-secondary to-primary opacity-20 blur transition duration-500 group-hover:opacity-80 group-hover:duration-200"></div>
                   <div className="relative">
                     <service.icon className="h-10 w-10 text-primary" />
                   </div>
                 </div>
                <CardTitle className="font-headline pt-4">{service.title}</CardTitle>
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
