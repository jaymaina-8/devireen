import { SectionHeading } from "@/components/layout/SectionHeading";

export const metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-3xl flex-1">
      <SectionHeading title="Terms of Service" subtitle="Rules for using our platform." />
      <div className="prose prose-sm md:prose-base text-text-body mt-8">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h3>1. Acceptance of Terms</h3>
        <p>By accessing the Devireen Enterprise website, you agree to be bound by these terms.</p>
        <h3>2. Quotes and Pricing</h3>
        <p>All quotes are subject to final confirmation by our sales team. Prices displayed are estimates and may vary based on stock and volume.</p>
        <h3>3. Delivery</h3>
        <p>Delivery timelines are estimates. We are not liable for delays caused by third-party logistics.</p>
      </div>
    </div>
  );
}
