import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How many calculators are available?",
      answer: "We have over 560 precision calculators covering financial planning, mathematics, health metrics, and everyday calculations."
    },
    {
      question: "Are the calculators free to use?",
      answer: "Yes, all our calculators are completely free to use. No registration or payment required."
    },
    {
      question: "How accurate are the calculations?",
      answer: "Our calculators use industry-standard formulas and are regularly updated to ensure maximum accuracy for all calculations."
    },
    {
      question: "Can I use these calculators on mobile devices?",
      answer: "Absolutely! All our calculators are fully responsive and work perfectly on smartphones, tablets, and desktop computers."
    },
    {
      question: "Do you add new calculators regularly?",
      answer: "Yes, we continuously expand our collection based on user feedback and emerging calculation needs across various industries."
    },
    {
      question: "Can I save or share my calculations?",
      answer: "Many of our calculators allow you to save results and share them via URL or export to PDF for your records."
    }
  ];

  // Structured data for FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-16 bg-card/50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about our calculator tools
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;