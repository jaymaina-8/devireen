import Image from "next/image";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { StatCounter } from "@/components/shared/StatCounter";
import { TrustBadge } from "@/components/shared/TrustBadge";
import { ShieldCheck, Target, Eye, Heart, Truck, Award, Users, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "About Us | Devireen Enterprise",
  description: "Learn more about Devireen Enterprise, Kenya's trusted B2B office supplier.",
};

const values = [
  {
    icon: <ShieldCheck className="h-7 w-7" />,
    title: "Quality First",
    description: "We partner only with trusted manufacturers to ensure every product meets corporate standards.",
  },
  {
    icon: <Users className="h-7 w-7" />,
    title: "Customer Focus",
    description: "Every decision we make starts with our clients' needs. Your success is our success.",
  },
  {
    icon: <Award className="h-7 w-7" />,
    title: "Reliability",
    description: "Consistent delivery, transparent pricing, and dependable stock levels you can count on.",
  },
  {
    icon: <Heart className="h-7 w-7" />,
    title: "Integrity",
    description: "Honest pricing, no hidden fees, and straightforward business relationships.",
  },
];

const milestones = [
  { year: "2018", title: "Founded", description: "Devireen Enterprise launched in Nairobi CBD." },
  { year: "2019", title: "100+ Products", description: "Expanded catalogue to serve corporate offices." },
  { year: "2021", title: "Nationwide Delivery", description: "Extended logistics to all 47 counties." },
  { year: "2023", title: "Digital Platform", description: "Launched B2B procurement platform with quote system." },
  { year: "2024", title: "500+ Products", description: "Catalogue expansion across 8 major categories." },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ─── Hero ─── */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-surface overflow-hidden border-b border-border-subtle">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-50/50 via-surface to-surface pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection animation="slide-right">
              <TrustBadge 
                label="About Devireen Enterprise" 
                variant="default" 
                className="mb-6" 
              />
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-text-main leading-tight tracking-tight mb-6">
                Your trusted partner in <span className="text-primary-600">corporate procurement</span>
              </h1>
              <p className="text-lg md:text-xl text-text-muted leading-relaxed mb-8 max-w-lg">
                Simplifying how businesses, schools, and organizations source office supplies, stationery, and equipment across Kenya since 2018.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-text-main">
                  <CheckCircle2 className="h-5 w-5 text-primary-600" /> Fast Delivery
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-text-main">
                  <CheckCircle2 className="h-5 w-5 text-primary-600" /> Wholesale Pricing
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-text-main">
                  <CheckCircle2 className="h-5 w-5 text-primary-600" /> Premium Quality
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={200} className="relative hidden lg:block">
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-primary-100 rounded-full blur-3xl opacity-50 mix-blend-multiply" />
                <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                  <Image
                    src="/images/category_office_supplies.png"
                    alt="Office supplies and stationery products"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── Our Story & Stats ─── */}
      <section className="py-12 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <AnimatedSection animation="slide-right">
              <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-6">Our Story</h2>
              <div className="space-y-6 text-text-body leading-relaxed text-lg">
                <p>
                  Founded in Nairobi, Devireen Enterprise has grown to become one of Kenya&apos;s most reliable B2B suppliers for office supplies, stationery, and equipment.
                </p>
                <p>
                  We understand that efficient procurement is the backbone of any successful business, school, or NGO. That&apos;s why we&apos;ve built a streamlined platform that lets you browse, compare, and request quotes in minutes — not hours.
                </p>
                <p>
                  From single-office startups to multi-branch corporations, our catalogue of 500+ products, competitive wholesale pricing, and nationwide delivery network is designed to serve organizations of every size.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="bg-surface rounded-3xl p-8 md:p-12 shadow-xl border border-border-subtle relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary-50 rounded-full blur-3xl opacity-50" />
                
                <h3 className="text-2xl font-bold text-text-main mb-8 relative z-10">Devireen by the Numbers</h3>
                
                <div className="grid grid-cols-2 gap-8 relative z-10">
                  <div className="bg-background rounded-2xl p-6 border border-border-subtle hover:border-primary-200 transition-colors">
                    <StatCounter value={500} suffix="+" label="Products" className="[&>div:first-child]:text-primary-600 [&>div:nth-child(2)]:text-primary-600 [&>div:nth-child(3)]:text-text-muted" />
                  </div>
                  <div className="bg-background rounded-2xl p-6 border border-border-subtle hover:border-primary-200 transition-colors">
                    <StatCounter value={200} suffix="+" label="Clients" className="[&>div:first-child]:text-primary-600 [&>div:nth-child(2)]:text-primary-600 [&>div:nth-child(3)]:text-text-muted" />
                  </div>
                  <div className="bg-background rounded-2xl p-6 border border-border-subtle hover:border-primary-200 transition-colors">
                    <StatCounter value={47} suffix="" label="Counties Served" className="[&>div:first-child]:text-primary-600 [&>div:nth-child(2)]:text-primary-600 [&>div:nth-child(3)]:text-text-muted" />
                  </div>
                  <div className="bg-background rounded-2xl p-6 border border-border-subtle hover:border-primary-200 transition-colors">
                    <StatCounter value={6} suffix="+" label="Years Experience" className="[&>div:first-child]:text-primary-600 [&>div:nth-child(2)]:text-primary-600 [&>div:nth-child(3)]:text-text-muted" />
                  </div>
                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* ─── Mission & Vision ─── */}
      <section className="py-12 md:py-32 bg-primary-700 relative overflow-hidden text-white">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[150%] bg-white opacity-5 rotate-12 blur-3xl rounded-full" />
          <div className="absolute top-[50%] -left-[20%] w-[40%] h-[100%] bg-primary-900 opacity-30 -rotate-12 blur-3xl rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            
            <AnimatedSection animation="fade-up">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 h-full hover:bg-white/15 transition-colors">
                <div className="h-14 w-14 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/10 shadow-inner">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight">Our Mission</h3>
                <p className="text-white/80 leading-relaxed text-lg font-medium">
                  To simplify the procurement process for modern businesses by providing a comprehensive catalog of high-quality products, transparent pricing, and fast nationwide delivery. We aim to be the silent engine behind every productive workspace.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={150}>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 h-full hover:bg-white/15 transition-colors">
                <div className="h-14 w-14 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/10 shadow-inner">
                  <Eye className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight">Our Vision</h3>
                <p className="text-white/80 leading-relaxed text-lg font-medium">
                  To become East Africa&apos;s leading B2B procurement platform, empowering businesses with seamless access to quality supplies at competitive prices. We envision a future where sourcing office essentials is entirely frictionless.
                </p>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* ─── Core Values ─── */}
      <section className="py-12 md:py-32 bg-surface">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <span className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-3 block">What Drives Us</span>
              <h2 className="text-3xl md:text-5xl font-bold text-text-main tracking-tight">Our Core Values</h2>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} animation="fade-up" delay={i * 100}>
                <div className="group bg-background border border-border-subtle rounded-3xl p-8 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary-200">
                  <div className="h-14 w-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary-100 group-hover:text-primary-700">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-text-main mb-3">{value.title}</h3>
                  <p className="text-text-muted leading-relaxed font-medium">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Timeline ─── */}
      <section className="py-12 md:py-32 bg-background border-t border-border-subtle">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-text-main tracking-tight">Our Journey</h2>
              <p className="mt-4 text-xl text-text-muted">Growing alongside Kenyan businesses since 2018.</p>
            </div>
          </AnimatedSection>
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-100 via-primary-300 to-primary-100 transform md:-translate-x-1/2 rounded-full" />
            
            <div className="space-y-12 relative">
              {milestones.map((m, i) => (
                <AnimatedSection key={m.year} animation="fade-up" delay={i * 100}>
                  <div className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Content */}
                    <div className={`flex-1 md:w-1/2 ${i % 2 === 0 ? 'md:text-left pl-20 md:pl-0 md:pr-12' : 'md:text-right pl-20 md:pl-12'}`}>
                      <div className="bg-surface border border-border-subtle rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-3xl font-extrabold text-primary-100/20 absolute -z-10 -mt-2 -ml-2 select-none pointer-events-none">{m.year}</div>
                        <div className="text-lg font-bold text-primary-600 mb-1">{m.year}</div>
                        <h4 className="text-xl font-bold text-text-main mb-2">{m.title}</h4>
                        <p className="text-text-muted font-medium">{m.description}</p>
                      </div>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-background border-4 border-primary-600 shadow-sm z-10" />
                    </div>
                    
                    {/* Empty Space for layout */}
                    <div className="hidden md:block flex-1" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Operations Gallery ─── */}
      <section className="py-12 md:py-32 bg-surface border-t border-border-subtle">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <span className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-3 block">Inside Devireen</span>
              <h2 className="text-3xl md:text-5xl font-bold text-text-main tracking-tight">Our Operations</h2>
              <p className="mt-4 text-xl text-text-muted max-w-2xl mx-auto">From quality sourcing to careful packaging and swift delivery.</p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 max-w-6xl mx-auto">
            {/* Large Image */}
            <AnimatedSection animation="scale-in" delay={100} className="md:col-span-8 h-64 md:h-[400px]">
              <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-lg group">
                <Image src="/images/hero_main.png" alt="Premium desk setup" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 66vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </AnimatedSection>
            
            {/* Small Top Right */}
            <AnimatedSection animation="scale-in" delay={200} className="md:col-span-4 h-64 md:h-[400px]">
              <div className="flex flex-col gap-4 lg:gap-6 h-full">
                <div className="relative flex-1 rounded-3xl overflow-hidden shadow-lg group">
                  <Image src="/images/category_office_equipment.png" alt="Office Equipment" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="relative flex-1 rounded-3xl overflow-hidden shadow-lg group">
                  <Image src="/images/category_stationery.png" alt="Stationery" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
