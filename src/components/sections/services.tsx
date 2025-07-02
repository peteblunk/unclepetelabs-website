import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Beaker, FlaskConical, ClipboardList, Settings, ShieldCheck, Microscope } from 'lucide-react';
import TigerClawIcon from '../icons/tiger-claw';

const services = [
  {
    icon: Beaker,
    title: 'Chemical Analysis',
    description: 'Precise analysis of chemical compounds and materials using state-of-the-art equipment.',
  },
  {
    icon: FlaskConical,
    title: 'Formulation Development',
    description: 'Creating and optimizing chemical formulations for industrial and commercial applications.',
  },
  {
    icon: ClipboardList,
    title: 'Regulatory Compliance Testing',
    description: 'Ensuring your products meet all required industry standards and safety regulations.',
  },
  {
    icon: Settings,
    title: 'Process Optimization',
    description: 'Improving your manufacturing processes for increased efficiency, yield, and safety.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    description: 'Comprehensive testing protocols to guarantee the quality and consistency of your products.',
  },
  {
    icon: Microscope,
    title: 'Materials Science',
    description: 'In-depth study and testing of material properties for advanced applications.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground">Our Services</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Delivering robust, reliable, and reproducible results for every project.
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
