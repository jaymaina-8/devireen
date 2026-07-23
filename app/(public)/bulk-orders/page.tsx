import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { TrustBadge } from "@/components/shared/TrustBadge";
import { fetchProducts } from "@/actions/product.actions";
import { ProductCard } from "@/components/products/ProductCard";
import {
  Percent,
  Package,
  Truck,
  Shield,
  ArrowRight,
  UserCheck,
} from "lucide-react";

export const metadata = {
  title: "Wholesale & Bulk Orders | Devireen Enterprise",
  description: "Browse our wholesale catalog and enjoy a 20% flat discount on all bulk orders.",
};

const benefits = [
  {
    icon: <Percent className="h-6 w-6" />,
    title: "Flat 20% Discount",
    description: "Enjoy an automatic 20% off retail pricing on all items in our wholesale catalog.",
  },
  {
    icon: <Truck className="h-6 w-6" />,
    title: "Priority Logistics",
    description: "Expedited processing and dedicated nationwide delivery for all corporate orders.",
  },
  {
    icon: <UserCheck className="h-6 w-6" />,
    title: "Account Manager",
    description: "A single point of contact dedicated to your organization's procurement needs.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Quality Assured",
    description: "Every product is inspected before dispatch to meet strict corporate standards.",
  },
];

export default async function BulkOrdersPage() {
  const { data: products } = await fetchProducts();

  // For this page, we display all IN_STOCK products
  const availableProducts = products?.filter((p: any) => p.stock_status !== "DISCONTINUED") || [];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden min-h-[400px] flex items-center bg-primary-700">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-600 via-primary-700 to-black opacity-80 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 mix-blend-overlay">
          <Image
            src="/images/hero_main.png"
            alt="Wholesale inventory"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <AnimatedSection animation="fade-up">
            <TrustBadge label="B2B Wholesale Portal" variant="subtle" className="bg-white/10 text-white border-white/20 mb-6" />
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white max-w-3xl leading-tight tracking-tight mb-6">
              Exclusive wholesale pricing for your organization
            </h1>
            <p className="text-lg md:text-xl text-primary-100 max-w-2xl mb-8 leading-relaxed">
              Browse our complete catalog with an automatic <strong className="text-white">20% discount</strong> applied. Add items to your quote for fast processing and priority delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#catalog">
                <Button size="lg" variant="secondary" className="bg-white text-primary-700 hover:bg-gray-50 font-bold px-8">
                  View Wholesale Catalog
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Benefits Banner ─── */}
      <section className="py-12 bg-surface border-b border-border-subtle">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <AnimatedSection key={b.title} animation="fade-up" delay={i * 100}>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center shrink-0">
                    {b.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-text-main mb-1">{b.title}</h3>
                    <p className="text-sm text-text-muted leading-relaxed">{b.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Wholesale Catalog ─── */}
      <section id="catalog" className="py-12 md:py-24 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-text-main tracking-tight">Wholesale Products</h2>
              <p className="text-text-muted mt-2">All prices reflect a 20% volume discount.</p>
            </div>
            <div className="text-sm font-medium text-primary-600 bg-primary-50 px-4 py-2 rounded-lg">
              {availableProducts.length} Products Available
            </div>
          </div>

          {availableProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {availableProducts.map((product: any) => {
                // Apply a 20% discount for wholesale
                const originalPrice = product.price;
                const wholesalePrice = originalPrice * 0.8;
                const primaryImage = product.product_images?.find((img: any) => img.is_primary) || product.product_images?.[0];

                return (
                  <AnimatedSection key={product.id} animation="fade-up">
                    <ProductCard
                      id={product.id}
                      slug={product.slug}
                      name={product.name}
                      sku={product.sku}
                      price={wholesalePrice}
                      originalPrice={originalPrice}
                      imageUrl={primaryImage?.url || "/placeholder.svg"}
                      stockStatus={product.stock_status}
                    />
                  </AnimatedSection>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-surface rounded-2xl border border-border-subtle">
              <Package className="h-12 w-12 text-border-strong mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-main">No products available</h3>
              <p className="text-text-muted mt-1">Please check back later.</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA Bottom ─── */}
      <section className="py-12 md:py-24 bg-primary-700 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Need something not listed?</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto text-lg">
            Our sourcing team can acquire specific items in bulk tailored to your organization's exact requirements.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="bg-white text-primary-700 hover:bg-gray-50 px-8">
              Contact Procurement Desk
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
