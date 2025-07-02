import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import FaqSuggester from '@/components/faq-suggester';

const faqItems = [
  {
    question: "What is the standard turnaround time for sample analysis?",
    answer: "Our standard turnaround time is 5-7 business days. Expedited services are available for an additional fee. Please contact us for a specific quote on your project.",
  },
  {
    question: "How should I prepare and ship my samples?",
    answer: "Proper sample preparation is crucial. Please refer to our detailed 'Sample Submission Guide' available on our resources page, or contact our support team for specific instructions related to your sample type.",
  },
  {
    question: "Do you offer consultation on test results?",
    answer: "Yes, all our testing services include a detailed report. A complimentary consultation with one of our lead scientists to discuss the results and their implications is also included.",
  },
  {
    question: "Are your laboratory procedures accredited?",
    answer: "Absolutely. Uncle Pete Laboratories is accredited under ISO/IEC 17025 and we adhere to strict quality control protocols to ensure the highest standard of accuracy and reliability.",
  },
  {
    question: "Can you develop a custom testing method for our product?",
    answer: "Yes, our R&D team specializes in creating and validating custom testing methodologies tailored to unique products and regulatory requirements. Contact us to discuss your project needs.",
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
