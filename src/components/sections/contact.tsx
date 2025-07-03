import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import EyeOfHorusIcon from '../icons/eye-of-horus-icon';

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground">Establish a Connection</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Have a project schematic, an inquiry, or simply wish to interface? We welcome the signal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6">
                <Card className="hover:border-accent/50 transition-colors border-primary/20 bg-background/50">
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                        <EyeOfHorusIcon className="h-6 w-6 text-accent" />
                        <CardTitle className="font-headline text-primary">Email Transmission</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">For project proposals and general inquiries.</p>
                        <a href="mailto:services@unclepetelaboratories.net" className="font-semibold text-accent hover:underline">
                            services@unclepetelaboratories.net
                        </a>
                    </CardContent>
                </Card>
                <Card className="hover:border-accent/50 transition-colors border-primary/20 bg-background/50">
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                        <Phone className="h-6 w-6 text-accent" />
                        <CardTitle className="font-headline text-primary">Audio Comms</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Mon - Fri, 0900 - 1700 EST</p>
                        <p className="font-semibold text-foreground">(555) 123-4567</p>
                    </CardContent>
                </Card>
                <Card className="hover:border-accent/50 transition-colors border-primary/20 bg-background/50">
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                        <MapPin className="h-6 w-6 text-accent" />
                        <CardTitle className="font-headline text-primary">Physical Coordinates</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">123 Creative Parkway,</p>
                        <p className="font-semibold text-foreground">Funville, USA 12345</p>
                    </CardContent>
                </Card>
            </div>
             <div className="rounded-lg overflow-hidden shadow-lg h-full border border-primary/20">
                 <Image
                    src="https://placehold.co/600x700.png"
                    alt="A high-tech lab with glowing data screens and metallic surfaces"
                    width={600}
                    height={700}
                    className="w-full h-full object-cover"
                    data-ai-hint="futuristic laboratory"
                    />
            </div>
        </div>
      </div>
    </section>
  );
}
