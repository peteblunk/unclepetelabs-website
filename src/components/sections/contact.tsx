import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground">Get In Touch</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            We're here to help with your industrial challenges. Reach out to us for quotes, consultations, or any inquiries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6">
                <Card className="hover:border-primary/50 transition-colors">
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                        <Mail className="h-6 w-6 text-primary" />
                        <CardTitle className="font-headline">Email Us</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">For general inquiries and service requests.</p>
                        <a href="mailto:services@unclepetelaboratories.net" className="font-semibold text-primary hover:underline">
                            services@unclepetelaboratories.net
                        </a>
                    </CardContent>
                </Card>
                <Card className="hover:border-primary/50 transition-colors">
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                        <Phone className="h-6 w-6 text-primary" />
                        <CardTitle className="font-headline">Call Us</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Mon - Fri, 9am - 5pm EST</p>
                        <p className="font-semibold text-foreground">(555) 123-4567</p>
                    </CardContent>
                </Card>
                <Card className="hover:border-primary/50 transition-colors">
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                        <MapPin className="h-6 w-6 text-primary" />
                        <CardTitle className="font-headline">Our Location</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">123 Industrial Parkway,</p>
                        <p className="font-semibold text-foreground">Steeltown, USA 12345</p>
                    </CardContent>
                </Card>
            </div>
             <div className="rounded-lg overflow-hidden shadow-lg h-full">
                 <Image
                    src="https://placehold.co/600x700.png"
                    alt="Industrial building exterior"
                    width={600}
                    height={700}
                    className="w-full h-full object-cover"
                    data-ai-hint="industrial building"
                    />
            </div>
        </div>
      </div>
    </section>
  );
}
