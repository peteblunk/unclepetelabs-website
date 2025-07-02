import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import FaqSuggester from '@/components/faq-suggester';

const faqItems = [
  {
    question: "Do you do custom game or website development?",
    answer: "Absolutely! We love collaborating on unique projects. Get in touch via our contact form with your idea, and let's see what we can create together.",
  },
  {
    question: "What platforms do you develop games for?",
    answer: "We primarily focus on web-based games (HTML5) that can be played anywhere, and desktop games for PC and Mac. We're always experimenting, so this may expand in the future!",
  },
  {
    question: "Can I use your educational materials in my classroom?",
    answer: "Yes! Most of our educational content is released under a Creative Commons license for non-commercial use. Please check the specific material for its license details before using.",
  },
  {
    question: "How does your 'experimental' process work?",
    answer: "We embrace a rapid-prototyping and iterative design philosophy. We build, test, play, and refine, allowing happy accidents and creative detours to shape the final product. It's organized chaos, and it's a lot of fun!",
  },
  {
    question: "I have a great idea for a game/app. Can we partner up?",
    answer: "We're always open to interesting proposals. Pitch us your concept, and if it aligns with our vision and current workload, we'd be excited to discuss a potential partnership.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Have a question? We've got answers. If you don't find what you're looking for, try our AI assistant.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="font-headline text-lg text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="lg:col-span-2">
            <FaqSuggester />
          </div>
        </div>
      </div>
    </section>
  );
}
