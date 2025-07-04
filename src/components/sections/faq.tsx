import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


const faqItems = [
  {
    question: "Do you take commissions for custom games or websites?",
    answer: "Indeed. We thrive on collaboration for unique projects. Interface with us via our contact form with your project schematics, and let's construct something extraordinary together.",
  },
  {
    question: "How do you honor the Hebrew God whose Ark it is?",
    answer: "We take back one kadam, obviously.",
  },
  {
    question: "Can your educational materials be integrated into our systems?",
    answer: "Yes. Most of our educational modules are released under a flexible license for non-commercial integration. Please consult the documentation for each module for specific licensing protocols.",
  },
  {
    question: "What is your 'experimental' design protocol?",
    answer: "We employ a rapid-prototyping and iterative design philosophy. We build, simulate, analyze, and refine, allowing for emergent properties and creative detours to shape the final construct. It's a structured form of innovative chaos.",
  },
  {
    question: "I have a concept for a game/app. Are you open to partnerships?",
    answer: "We are always receptive to compelling proposals. Transmit your concept to us, and if it aligns with our current operational parameters and strategic vision, we would be interested in discussing a potential synergy.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Knowledge Base</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Have an inquiry? Access our records. If you don't find the data you seek, our AI can assist your query.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-primary/20">
                  <AccordionTrigger className="font-headline text-lg text-left text-primary/80 hover:text-accent">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
        </div>
      </div>
    </section>
  );
}
