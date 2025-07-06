import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


const faqItems = [
  {
    question: "Do you take commissions for custom games or websites?",
    answer: "Indeed. For the most part we toil alone in our cavernous digital spice mines doing what we will --that is not a complaint-- But with the right chemistry and - ahem - incentives - we love collaboration for unique projects. First, attempt to summon us by your preferred method. I always recommend including a prayer. Whatever it is we construct, I can promise you this: It will be something extraordinary.",
  },
  {
    question: "How do you honor the Hebrew God whose Ark it is?",
    answer: "We take back one kadam, obviously.",
  },
  {
    question: "Can your educational materials be integrated into our systems?",
    answer: "Probably. But rely less on systems and more on your heart. Turn off your targeting computer.",
  },
  {
    question: "What is your 'experimental' design protocol?",
    answer: "We employ a rapid-prototyping and iterative design philosophy. We build, simulate, analyze, and refine, allowing for emergent properties and creative detours to shape the final construct. It's a structured form of innovative chaos. Start the grind stone. We try to take up our cross, daily and follow in the footsteps of the Lord. We often fail. *shrug*",
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
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto font-body">
          You have questions. You seek answers. Some of them you may find here. Others, you surely will not. You may be surprised which is which, so contact us directly and we will share what knowledge or wisdom we have. If that still does not suffice, we will help you reformulate your questions or pray with you that clarity will come.
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
          <div className="lg:col-span-2 flex justify-center items-center">
            <img src="/images/blue-electric-quill.png" alt="Blue Electric Quill" className="object-contain w-full h-full" />
          </div>

          
        </div>
      </div>
    </section>
  );
}
