import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ProcessTimeline } from "@/components/shared/ProcessTimeline";
import { LogoCarousel } from "@/components/shared/LogoCarousel";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { IndustryCard } from "@/components/shared/IndustryCard";
import { TrustBadge } from "@/components/shared/TrustBadge";
import { fetchProducts } from "@/actions/product.actions";
import { fetchCategories } from "@/actions/category.actions";
import {
  ArrowRight,
  Package,
  Truck,
  ShieldCheck,
  Clock,
  PackageSearch,
  LayoutGrid,
  Search,
  Award,
  Users,
  Tag,
  DollarSign,
  Star,
  CheckCircle2,
} from "lucide-react";
import { StockStatus } from "@/components/products/StockIndicator";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = {
  title: "Office Supplies, Stationery & School Essentials | Devireen",
  description:
    "Kenya's trusted B2B supplier of office supplies, stationery, school supplies and office equipment. Request bulk quotes for schools, businesses, NGOs, hospitals and government.",
};

/* ─── Category imagery (AI-generated, stored locally) ─── */
const categoryImages: Record<string, string> = {
  "office-furniture":   "/images/category_office_furniture.png",
  "printer-supplies":   "/images/category_printer_supplies.png",
  stationery:           "/images/category_stationery.png",
  technology:           "/images/category_technology.png",
  cleaning:             "/images/category_cleaning.png",
  "school-supplies":    "/images/category_school_supplies.png",
  "paper-products":     "/images/category_stationery.png",
  "office-equipment":   "/images/category_office_equipment.png",
  "office-supplies":    "/images/category_office_supplies.png",
  packaging:            "/images/category_office_supplies.png",
};

const defaultCategoryImage = "/images/category_office_supplies.png";

/* ─── Category descriptions ─── */
const categoryDescriptions: Record<string, string> = {
  "office-furniture":   "Desks, chairs, shelves and ergonomic solutions.",
  "printer-supplies":   "Toner cartridges, ink, paper and printer accessories.",
  stationery:           "Pens, notebooks, markers, rulers and writing essentials.",
  technology:           "Laptops, accessories, cables and tech peripherals.",
  cleaning:             "Disinfectants, paper towels, sanitizers and hygiene supplies.",
  "school-supplies":    "Exercise books, sets, backpacks and classroom tools.",
  "school-accessories": "Pencil cases, rulers, geometry sets and art supplies.",
  "paper-products":     "Notebooks, exercise books, copy paper and writing pads.",
  "office-equipment":   "Printers, shredders, laminators and copiers.",
  "office-supplies":    "Folders, staplers, clips, tape and daily essentials.",
  packaging:            "Boxes, tape, labels and wrapping materials.",
};

/* ─── Testimonials ─── */
const testimonials = [
  {
    quote:
      "Devireen has transformed how we manage office procurement. Their quote system saves us hours every month, and deliveries are always on schedule.",
    name: "Grace Wanjiku",
    role: "Procurement Manager",
    company: "KCB Group",
    rating: 5,
  },
  {
    quote:
      "We switched from three separate vendors to Devireen for all our school supplies. The catalogue depth and competitive pricing are unmatched in Kenya.",
    name: "James Ochieng",
    role: "Head of Operations",
    company: "Alliance Schools",
    rating: 5,
  },
  {
    quote:
      "Their dedicated account manager understands our needs perfectly. Bulk ordering for our 12 branches has never been this seamless.",
    name: "Amina Hassan",
    role: "Office Administrator",
    company: "Nairobi Hospital",
    rating: 5,
  },
];

/* ─── Value Proposition Cards ─── */
const whyCards = [
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: "Competitive Pricing",
    description:
      "Wholesale rates and volume pricing across all 500+ products in our catalogue.",
  },
  {
    icon: <Truck className="h-6 w-6" />,
    title: "Nationwide Delivery",
    description: "Fast, reliable delivery to all 47 counties across Kenya.",
  },
  {
    icon: <Tag className="h-6 w-6" />,
    title: "Bulk Discounts",
    description:
      "The more you order, the more you save — automatic volume pricing on large orders.",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Trusted Brands",
    description:
      "Only verified manufacturers and quality-assured products in our catalogue.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "24hr Quotations",
    description:
      "Receive detailed, itemized quotations within one business day of your request.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Dedicated Account Support",
    description:
      "A personal account manager for your school, business, hospital, or institution.",
  },
];

/* ─── Industries ─── */
const industries = [
  {
    name: "Schools & Universities",
    description: "Exercise books, chalk, markers, printers and all classroom essentials.",
    imageUrl: "/images/industry_schools.png",
  },
  {
    name: "Hospitals & Clinics",
    description: "Administrative supplies, printing and stationery for medical facilities.",
    imageUrl: "/images/industry_hospitals.png",
  },
  {
    name: "Corporate Offices",
    description: "Office supplies, technology and furniture for productive workplaces.",
    imageUrl: "/images/industry_corporate.png",
  },
  {
    name: "Government Agencies",
    description: "Bulk procurement of stationery, equipment and office essentials.",
    imageUrl: "/images/industry_government.png",
  },
];

export default async function HomePage() {
  const [{ data: products }, { data: categories }] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  const featuredProducts =
    products?.filter((p: any) => p.stock_status === "IN_STOCK").slice(0, 4) || [];

  const FEATURED_CATEGORY_SLUGS = ["paper-products", "office-supplies", "school-supplies"];
  const displayCategories = FEATURED_CATEGORY_SLUGS
    .map((slug) => categories?.find((c: any) => c.slug === slug))
    .filter(Boolean) || [];

  return (
    <div className="flex flex-col min-h-screen">

      {/* ─────────────────────────────────────────────────
          1. HERO
      ───────────────────────────────────────────────── */}
      <section className="bg-hero-gradient border-b border-border-subtle">
        <div className="container mx-auto px-4 py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — Copy */}
            <div className="max-w-xl">
              <div className="flex flex-wrap gap-2 mb-6">
                <TrustBadge label="500+ Products"        icon={<Package     className="h-3.5 w-3.5" />} />
                <TrustBadge label="24hr Quote Turnaround" icon={<Clock       className="h-3.5 w-3.5" />} />
                <TrustBadge label="Nationwide Delivery"  icon={<Truck       className="h-3.5 w-3.5" />} />
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-text-main tracking-tight leading-[1.1]">
                Office Supplies, Stationery &amp; School Essentials{" "}
                <span className="text-primary-600">— Delivered Across Kenya.</span>
              </h1>

              <p className="mt-5 text-lg text-text-body leading-relaxed">
                Devireen supplies{" "}
                <strong>businesses, schools, NGOs, hospitals,</strong> and{" "}
                <strong>government institutions</strong> with 500+ quality-assured products
                — from pens and printer paper to furniture and classroom supplies.
              </p>

              {/* Search bar */}
              <form
                action="/products"
                method="GET"
                className="mt-7 flex items-center border-2 border-primary-200 rounded-xl bg-white shadow-sm hover:border-primary-400 focus-within:border-primary-600 focus-within:ring-4 focus-within:ring-primary-100 transition-all duration-200"
              >
                <Search className="h-5 w-5 text-text-muted ml-4 shrink-0" />
                <input
                  type="text"
                  name="q"
                  placeholder="Search — printer paper, exercise books, pens..."
                  className="w-full bg-transparent px-3 py-3.5 text-sm text-text-main placeholder:text-text-muted focus:outline-none"
                  aria-label="Search products"
                />
                <button
                  type="submit"
                  className="mr-2 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 active:scale-[0.98] transition-all shrink-0"
                  aria-label="Search"
                >
                  Search
                </button>
              </form>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Link href="/products">
                  <Button size="lg" variant="primary">
                    Browse Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/quote">
                  <Button size="lg" variant="outline">
                    Request Bulk Quote
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right — Hero Image */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero_main.png"
                  alt="Premium office supplies and stationery — organized desk with notebooks, pens and supplies"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              {/* Floating cards */}
              <div className="absolute -bottom-4 -left-4 bg-surface rounded-xl shadow-lg border border-border-subtle p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-success/10 text-success flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-text-main">Trusted by 200+</div>
                  <div className="text-xs text-text-muted">organizations across Kenya</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-surface rounded-xl shadow-lg border border-border-subtle p-3 flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-text-main">24-hr</div>
                  <div className="text-xs text-text-muted">Quote turnaround</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────
          2. STOREFRONT SHOWCASE
      ───────────────────────────────────────────────── */}
      <section className="bg-surface border-b border-border-subtle py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border-subtle flex justify-center bg-gray-50">
              <Image
                src="/images/storefront.jpg"
                alt="Devireen Stationers Wholesale & Retail Storefront"
                width={1200}
                height={900}
                className="w-full h-auto object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      {/* ─────────────────────────────────────────────────
          2. TRUST STRIP
      ───────────────────────────────────────────────── */}
      <section className="py-8 bg-surface border-b border-border-subtle">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-text-muted mb-5">
            Trusted by organizations across Kenya
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { icon: <Package      className="h-4 w-4 shrink-0" />, label: "500+ Products" },
              { icon: <Truck        className="h-4 w-4 shrink-0" />, label: "Nationwide Delivery" },
              { icon: <Clock        className="h-4 w-4 shrink-0" />, label: "24hr Quotations" },
              { icon: <ShieldCheck  className="h-4 w-4 shrink-0" />, label: "Secure Procurement" },
              { icon: <Star         className="h-4 w-4 shrink-0" />, label: "98% Satisfaction" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-primary-50 text-primary-700 border border-primary-100 text-xs font-semibold"
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 overflow-hidden">
          <LogoCarousel />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────
          3. CATEGORIES
      ───────────────────────────────────────────────── */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <SectionHeading
              title="Browse Categories"
              subtitle="Office supplies, stationery, school supplies, equipment and more — everything your organization needs."
              action={
                displayCategories.length > 0 && (
                  <Link href="/products" className="hidden sm:inline-flex">
                    <Button variant="ghost">
                      View All <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )
              }
              className="mb-10"
            />
          </AnimatedSection>

          {displayCategories.length === 0 ? (
            <EmptyState
              icon={LayoutGrid}
              title="No categories available"
              description="Our catalog is currently being updated. Please check back later."
              className="bg-surface border border-border-subtle"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              {displayCategories.map((c: any, i: number) => (
                <AnimatedSection key={c.id} animation="fade-up" delay={i * 80}>
                  <Link href={`/products?category=${c.slug}`} className="block group">
                    <div className="relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300">
                      <Image
                        src={categoryImages[c.slug] || defaultCategoryImage}
                        alt={c.name}
                        fill
                        className="object-cover img-zoom"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                      <div className="absolute inset-0 flex flex-col justify-end p-4">
                        <h3 className="text-white font-bold text-base md:text-lg">{c.name}</h3>
                        <p className="text-white/70 text-xs mt-0.5 line-clamp-1">
                          {categoryDescriptions[c.slug] || "Browse our full range."}
                        </p>
                        {c.productCount !== undefined && (
                          <p className="text-white/55 text-xs mt-0.5">{c.productCount} Products</p>
                        )}
                        <div className="flex items-center gap-1 text-white/80 text-xs mt-1.5 transition-transform duration-300 group-hover:translate-x-1">
                          <span>Shop now</span>
                          <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}

          {displayCategories.length > 0 && (
            <Link href="/products" className="w-full mt-6 sm:hidden block">
              <Button variant="ghost" className="w-full">
                View All Categories <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────
          4. FEATURED PRODUCTS
      ───────────────────────────────────────────────── */}
      <section className="py-12 md:py-24 bg-surface border-y border-border-subtle">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <SectionHeading
              title="Featured Products"
              subtitle="Top picks for your procurement needs."
              action={
                <Link href="/products" className="hidden sm:inline-flex">
                  <Button variant="ghost">
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              }
              className="mb-10"
            />
          </AnimatedSection>

          {featuredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-background rounded-2xl border border-border-subtle">
              <div className="h-16 w-16 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mb-4">
                <PackageSearch className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-text-main mb-2">
                Featured products coming soon
              </h3>
              <p className="text-text-muted text-sm max-w-xs mb-6">
                We are currently curating our featured product selection. In the meantime, browse our full catalogue.
              </p>
              <Link href="/products">
                <Button variant="primary">
                  Browse All Products <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product: any, i: number) => {
                const primaryImage = product.product_images?.find((img: any) => img.is_primary) || product.product_images?.[0];
                return (
                  <AnimatedSection key={product.id} animation="fade-up" delay={i * 80}>
                    <ProductCard
                      id={product.id}
                      slug={product.slug}
                      name={product.name}
                      sku={product.sku}
                      price={product.price}
                      imageUrl={primaryImage?.url || null}
                      stockStatus={product.stock_status as StockStatus}
                    />
                  </AnimatedSection>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────
          5. HOW IT WORKS
      ───────────────────────────────────────────────── */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-main">How it works</h2>
              <p className="mt-3 text-text-muted text-lg max-w-2xl mx-auto">
                From browsing to delivery — procurement in five simple steps.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={200}>
            <ProcessTimeline />
          </AnimatedSection>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────
          6. WHY CHOOSE US
      ───────────────────────────────────────────────── */}
      <section className="py-12 md:py-24 bg-surface border-y border-border-subtle">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-main">
                Why choose Devireen
              </h2>
              <p className="mt-3 text-text-muted text-lg max-w-2xl mx-auto">
                Built for procurement teams, school administrators and business owners who need reliability.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyCards.map((card, i) => (
              <AnimatedSection key={card.title} animation="fade-up" delay={i * 80}>
                <div className="flex flex-col bg-background border border-border-subtle rounded-xl p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary-200">
                  <div className="h-12 w-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 shrink-0">
                    {card.icon}
                  </div>
                  <h3 className="text-base font-bold text-text-main mb-2">{card.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{card.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Stats strip */}
          <AnimatedSection animation="fade-up" delay={400}>
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center border-t border-border-subtle pt-12">
              {[
                { value: "500+", label: "Products",     sub: "Across all categories" },
                { value: "98%",  label: "Satisfaction", sub: "Customer rating" },
                { value: "24hr", label: "Quote Time",   sub: "Average turnaround" },
                { value: "47",   label: "Counties",     sub: "Delivery coverage" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl md:text-4xl font-extrabold text-primary-600 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="mt-1.5 text-sm font-semibold text-text-main uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="mt-0.5 text-xs text-text-muted">{stat.sub}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────
          7. INDUSTRIES
      ───────────────────────────────────────────────── */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-main">
                Industries we serve
              </h2>
              <p className="mt-3 text-text-muted text-lg max-w-2xl mx-auto">
                From classrooms to boardrooms — supplying organizations across every sector.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {industries.map((industry, i) => (
              <AnimatedSection key={industry.name} animation="fade-up" delay={i * 80}>
                <IndustryCard
                  name={industry.name}
                  description={industry.description}
                  imageUrl={industry.imageUrl}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────
          8. TESTIMONIALS
      ───────────────────────────────────────────────── */}
      <section className="py-12 md:py-24 bg-surface border-y border-border-subtle">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-main">
                What our clients say
              </h2>
              <p className="mt-3 text-text-muted text-lg max-w-2xl mx-auto">
                Trusted by procurement teams, school administrators and business owners across Kenya.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                <TestimonialCard
                  quote={t.quote}
                  name={t.name}
                  role={t.role}
                  company={t.company}
                  rating={t.rating}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────
          9. BULK PROCUREMENT CTA
      ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-[#7f1d1d] min-h-[380px] flex items-center">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/5" aria-hidden="true" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/5" aria-hidden="true" />

        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 font-medium mb-6">
            <Package className="h-4 w-4" />
            Bulk &amp; Enterprise Procurement
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 max-w-3xl leading-tight">
            Need Procurement Support for Your Organization?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mb-6 leading-relaxed">
            Our dedicated B2B team provides custom quotes, bulk discounts, and priority delivery for schools,
            businesses, hospitals, government agencies, and NGOs.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-sm text-white/70 mb-8">
            {[
              "Dedicated account managers",
              "Bulk discounts",
              "Custom sourcing",
              "Fast quotations",
              "Large order handling",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary-200 shrink-0" />
                {item}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/quote">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary-700 hover:bg-gray-50 font-semibold"
              >
                Request a Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
