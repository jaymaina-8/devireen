import { SectionHeading } from "@/components/layout/SectionHeading";
import { QuoteForm } from "./QuoteForm";

export const metadata = {
  title: "Request Quote",
  description: "Review your selected items and request a quotation for bulk purchasing.",
};

export default function QuotePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl flex-1">
      <SectionHeading 
        title="Request Quotation" 
        subtitle="Review your items and provide your contact details to receive a customized quote."
        className="mb-8"
      />
      <QuoteForm />
    </div>
  );
}
