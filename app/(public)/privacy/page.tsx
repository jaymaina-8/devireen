import { SectionHeading } from "@/components/layout/SectionHeading";

export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-3xl flex-1">
      <SectionHeading title="Privacy Policy" subtitle="How we handle your data." />
      <div className="prose prose-sm md:prose-base text-text-body mt-8">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h3>1. Information We Collect</h3>
        <p>We collect information you provide directly to us when you request a quote, create an account, or contact support.</p>
        <h3>2. How We Use Information</h3>
        <p>We use the information to process your quotes, communicate with you, and improve our platform.</p>
        <h3>3. Information Sharing</h3>
        <p>We do not sell your personal data. We only share information with trusted delivery partners to fulfill your orders.</p>
      </div>
    </div>
  );
}
