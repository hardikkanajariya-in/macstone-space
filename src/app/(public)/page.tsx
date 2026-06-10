import Link from "next/link";
import Image from "next/image";
import {
  getFeaturedProperties,
  getTestimonials,
  getFaqs,
  getMultipleSiteContent,
} from "@/lib/data";
import { SectionHeading } from "@/components/public/SectionHeading";
import { PropertyCard } from "@/components/public/PropertyCard";
import {
  COMPANY,
  PROPERTY_CATEGORIES,
  CLIENT_JOURNEY,
  UNSPLASH_IMAGES,
} from "@/lib/constants";
import { createMetadata } from "@/lib/seo";
import { ArrowRight, Shield, TrendingUp, Users, Compass, Award, Check, Clock } from "lucide-react";
import { FaqAccordion } from "@/components/public/FaqAccordion";
import { FadeInUp, StaggerContainer, StaggerItem, AnimatedCounter, ParallaxHeroImage } from "@/components/public/MotionComponents";

export const metadata = createMetadata({
  title: `${COMPANY.name} – Premium Real Estate Consultancy & Investment Advisory`,
  description: COMPANY.description,
  path: "/",
});

const whyUs = [
  {
    icon: Shield,
    title: "Trusted Advisory",
    description: "Honest, transparent guidance backed by decades of market experience.",
  },
  {
    icon: Compass,
    title: "Market Intelligence",
    description: "Deep understanding of Ahmedabad and Gujarat real-estate dynamics.",
  },
  {
    icon: Users,
    title: "Personalized Service",
    description: "Every client receives dedicated attention from our principal consultant.",
  },
  {
    icon: TrendingUp,
    title: "Investment Expertise",
    description: "Strategic insights for properties that deliver lasting value.",
  },
  {
    icon: Award,
    title: "Premium Portfolio",
    description: "Curated selection of exceptional residential and commercial properties.",
  },
];

export default async function HomePage() {
  const [featured, testimonials, faqs, content] = await Promise.all([
    getFeaturedProperties(4),
    getTestimonials(),
    getFaqs(),
    getMultipleSiteContent([
      "hero_headline",
      "hero_subheadline",
      "intro_title",
      "intro_text",
    ]),
  ]);

  const previewFaqs = faqs.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center pt-24 pb-16 overflow-hidden">
        <ParallaxHeroImage src={UNSPLASH_IMAGES.hero} alt="Luxury mansion" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
        
        <div className="relative container-wide w-full px-5 md:px-8 pt-12 md:pt-20">
          <div className="max-w-4xl">
            <FadeInUp delay={0.2}>
              <span className="label text-xs tracking-[0.25em] text-accent mb-6 block font-semibold">
                Premium Real Estate Advisory
              </span>
            </FadeInUp>
            <FadeInUp delay={0.4}>
              <h1 className="heading-xl text-foreground font-display font-light leading-[1.1] mb-6">
                {content.hero_headline || "Where Vision Meets Exceptional Real Estate"}
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.6}>
              <p className="text-muted text-base md:text-lg max-w-2xl mb-10 leading-relaxed font-light">
                {content.hero_subheadline || "We guide discerning clients through premium residential acquisitions, high-yield commercial investments, and wealth preservation strategies."}
              </p>
            </FadeInUp>
            <FadeInUp delay={0.8} className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link href="/contact" className="btn-primary rounded-lg text-center font-semibold">
                Book Consultation
              </Link>
              <Link href="/properties" className="btn-secondary rounded-lg text-center font-semibold">
                Explore Services
              </Link>
            </FadeInUp>

            {/* Floating Statistics */}
            <FadeInUp delay={1.0} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 border-t border-border/20 pt-10">
              {[
                { label: "Properties Closed", value: 500, suffix: "+" },
                { label: "Transaction Value", value: 250, prefix: "₹", suffix: "Cr+" },
                { label: "Years Experience", value: 10, suffix: "+" },
                { label: "Client Satisfaction", value: 98, suffix: "%" },
              ].map((stat, i) => (
                <div key={i} className="bg-surface/30 backdrop-blur-md border border-border/20 rounded-xl p-5 md:p-6 hover:border-accent/40 transition-all duration-300">
                  <p className="font-numbers text-2xl md:text-3xl font-bold text-accent mb-1.5">
                    <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </p>
                  <p className="text-[10px] md:text-xs text-muted uppercase tracking-wider font-semibold">{stat.label}</p>
                </div>
              ))}
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section-padding bg-background border-t border-border/10">
        <div className="container-editorial px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeInUp>
              <SectionHeading
                label="Corporate Profile"
                title={content.intro_title || "Advisory Excellence in Real Estate"}
                description={content.intro_text || "Macstone Space is a premium consulting partner rather than a property catalog. We help modern investors build wealth, preserve legacy assets, and acquire architectural masterpieces across Ahmedabad and Gujarat."}
              />
              <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-accent hover:text-accent-light transition-all uppercase mt-6 group">
                Discover Our Heritage
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeInUp>
            <FadeInUp delay={0.3} className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border/30 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
              <Image
                src={UNSPLASH_IMAGES.about}
                alt="Maulik Patel Principal Office"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-103"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Featured Properties Portfolio */}
      {featured.length > 0 && (
        <section className="section-padding bg-surface/50 border-t border-b border-border/30">
          <div className="container-wide px-5 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
              <SectionHeading
                label="Curated Collection"
                title="Featured Portfolios"
                description="Handpicked properties of architectural significance and exceptional yield potential."
              />
              <Link href="/properties" className="btn-secondary shrink-0 rounded-lg self-start md:self-auto font-semibold">
                View All Properties
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {featured.map((property, i) => (
                <div key={property.id} className={i === 0 ? "md:col-span-2 md:h-[600px]" : "md:h-[500px]"}>
                  <PropertyCard
                    property={property}
                    variant={i === 0 ? "featured" : "default"}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Specialization Areas / Categories */}
      <section className="section-padding bg-background">
        <div className="container-wide px-5 md:px-8">
          <SectionHeading
            label="Bespoke Services"
            title="Areas of Specialization"
            description="Our primary commitment is strategic advisory and wealth creation. We provide specialized consultation across premium segments."
            align="center"
          />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROPERTY_CATEGORIES.map((cat) => {
              const images: Record<string, string> = {
                residential: UNSPLASH_IMAGES.residential,
                commercial: UNSPLASH_IMAGES.commercial,
                plots: UNSPLASH_IMAGES.plots,
                "weekend-homes": UNSPLASH_IMAGES.weekend,
                investment: UNSPLASH_IMAGES.investment,
                luxury: UNSPLASH_IMAGES.luxury,
              };
              return (
                <StaggerItem key={cat.slug}>
                  <Link
                    key={cat.slug}
                    href={`/properties?category=${cat.slug}`}
                    className="group block relative overflow-hidden rounded-xl border border-border/40 bg-surface/30 hover:border-accent/40 transition-all duration-500"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={images[cat.slug]}
                        alt={cat.label}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 h-[1px] bg-accent/30 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </div>
                    <div className="p-6 md:p-8">
                      <h3 className="font-display text-xl mb-2 text-foreground group-hover:text-accent transition-colors duration-300">
                        {cat.label}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed mb-4">{cat.description}</p>
                      <span className="inline-flex items-center gap-1.5 text-xs text-accent font-semibold tracking-wider uppercase group-hover:gap-2.5 transition-all duration-300">
                        Explore Collection
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-surface">
        <div className="container-wide px-5 md:px-8">
          <SectionHeading
            label="The Macstone Difference"
            title="Sophisticated Trust. Decades of Integrity."
            description="We build deep relationships with developers, high-net-worth families, and funds to secure proprietary access."
            align="center"
          />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUs.map((item, i) => (
              <StaggerItem key={i}>
                <div className="bg-background border border-border/35 p-8 rounded-2xl hover:border-accent/30 hover:translate-y-[-4px] transition-all duration-500 group h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-surface border border-border/50 flex items-center justify-center mb-6 group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-300">
                      <item.icon size={20} className="text-accent" />
                    </div>
                    <h3 className="font-display text-xl mb-3 text-foreground group-hover:text-accent-light transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                  </div>
                  <div className="mt-8 border-t border-border/20 pt-4 text-xs text-accent/60 tracking-widest uppercase font-semibold">
                    Verified Competence
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Investment Advisory Section */}
      <section className="section-padding bg-background">
        <div className="container-editorial px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Luxury Image */}
            <FadeInUp className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <Image
                src={UNSPLASH_IMAGES.investment}
                alt="Investment Advisory Portfolio"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-103"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
              <div className="absolute bottom-6 left-6 bg-surface/90 backdrop-blur-md border border-border/40 p-5 rounded-lg max-w-[280px]">
                <p className="text-accent font-numbers text-xl font-bold mb-1">Portfolio Advisory</p>
                <p className="text-xs text-muted">Focused on structural capital allocation and commercial diversification.</p>
              </div>
            </FadeInUp>

            {/* Right ROI Panel */}
            <div className="flex flex-col justify-center">
              <SectionHeading
                label="Strategic Advisory"
                title="Intelligent Real-Estate Capital Allocation"
                description="We offer systematic investment consulting. Every asset undergoes careful evaluation of cash flow yields, municipal master plans, and capital protection."
              />
              <ul className="space-y-4 mb-8">
                {[
                  "Detailed location mapping and demographic projections",
                  "Verified ROI assessments and rental indexation forecasting",
                  "Direct access to off-market portfolios and development plots",
                  "Structured support in documentation, taxation and compliance",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted">
                    <div className="w-5 h-5 rounded-full border border-accent/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={10} className="text-accent" />
                    </div>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div>
                <Link href="/contact" className="btn-accent rounded-lg text-center font-semibold">
                  Request Private Briefing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Insights Section */}
      <section className="section-padding bg-surface/50 border-t border-b border-border/20">
        <div className="container-wide px-5 md:px-8">
          <SectionHeading
            label="Editorial Intelligence"
            title="Real Estate Market Insights"
            description="Authoritative reports and data-driven reviews on premium real estate corridors."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured Article Card */}
            <FadeInUp className="lg:col-span-2 bg-background border border-border/40 rounded-2xl overflow-hidden group flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={UNSPLASH_IMAGES.skyline}
                  alt="Ahmedabad Prime Space Skyline"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-accent text-[#0F1115] text-[0.625rem] font-bold uppercase tracking-widest px-3 py-1 rounded">
                  Cover Feature
                </span>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-muted mb-4 font-medium">
                    <span className="text-accent uppercase tracking-widest">Market Analysis</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> 6 min read</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl mb-4 text-foreground group-hover:text-accent transition-colors duration-300">
                    Ahmedabad&apos;s Premium Corridor Growth: A Multi-Year Analysis
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-6">
                    How SG Highway, Bodakdev, and the Gota extensions continue to attract primary developer capital and corporate headquarters relocations, driving premium rentals.
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-border/30 pt-6 mt-auto">
                  <span className="text-xs text-muted">Published March 2026</span>
                  <Link href="/contact" className="inline-flex items-center gap-1.5 text-xs text-accent font-semibold uppercase hover:gap-2.5 transition-all">
                    Read Report <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </FadeInUp>

            {/* Secondary Articles */}
            <div className="space-y-8 lg:col-span-1 flex flex-col justify-between">
              {[
                {
                  title: "Weekend Retreats: The Rise of Luxury Estates",
                  excerpt: "Why discerning investors are deploying family capital in Sanand and surrounding corridors.",
                  category: "Lifestyle",
                  readTime: "4 min read",
                  date: "Feb 2026",
                },
                {
                  title: "Dholera SIR: Decoupling Hype from Pricing Growth",
                  excerpt: "An objective financial analysis of the absorption indexes and land parcel capitalization rates.",
                  category: "Investment",
                  readTime: "5 min read",
                  date: "Jan 2026",
                },
              ].map((article, index) => (
                <FadeInUp key={index} className="bg-background border border-border/40 p-6 rounded-2xl group flex flex-col justify-between flex-1 hover:border-accent/40 transition-all duration-350">
                  <div>
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-muted mb-3 font-semibold">
                      <span className="text-accent">{article.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock size={10} className="text-accent" /> {article.readTime}</span>
                    </div>
                    <h4 className="font-display text-lg mb-2 text-foreground group-hover:text-accent transition-colors duration-300">
                      {article.title}
                    </h4>
                    <p className="text-muted text-xs leading-relaxed line-clamp-2">{article.excerpt}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-border/20 pt-4 mt-6">
                    <span className="text-[10px] text-muted">{article.date}</span>
                    <Link href="/contact" className="inline-flex items-center gap-1 text-[10px] text-accent font-semibold uppercase hover:text-accent-light">
                      Read <ArrowRight size={10} />
                    </Link>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Journey / Process Timeline */}
      <section className="section-padding bg-background overflow-x-hidden">
        <div className="container-wide px-5 md:px-8">
          <SectionHeading
            label="Client Journey"
            title="The Process of Acquisition"
            description="A systematic, highly structured journey engineered to guarantee discretion and transaction security."
            align="center"
          />
          <div className="relative">
            {/* Timeline horizontal connector line (desktop) */}
            <div className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-accent/5 via-accent/35 to-accent/5" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {CLIENT_JOURNEY.slice(0, 4).map((step) => (
                <div key={step.step} className="group relative text-center lg:text-left">
                  <div className="relative z-10 w-14 h-14 mx-auto lg:mx-0 rounded-full border border-accent bg-background flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-charcoal group-hover:shadow-[0_0_15px_rgba(199,163,106,0.4)] transition-all duration-500">
                    <span className="font-numbers text-lg font-bold text-accent group-hover:text-charcoal">{step.step}</span>
                  </div>
                  <h3 className="font-display text-lg mb-2 text-foreground group-hover:text-accent transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed max-w-xs mx-auto lg:mx-0">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 lg:mt-16">
              {CLIENT_JOURNEY.slice(4).map((step) => (
                <div key={step.step} className="group relative text-center lg:text-left">
                  <div className="relative z-10 w-14 h-14 mx-auto lg:mx-0 rounded-full border border-accent bg-background flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-charcoal group-hover:shadow-[0_0_15px_rgba(199,163,106,0.4)] transition-all duration-500">
                    <span className="font-numbers text-lg font-bold text-accent group-hover:text-charcoal">{step.step}</span>
                  </div>
                  <h3 className="font-display text-lg mb-2 text-foreground group-hover:text-accent transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed max-w-xs mx-auto lg:mx-0">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="section-padding bg-surface border-t border-b border-border/20">
          <div className="container-wide px-5 md:px-8">
            <SectionHeading
              label="Trust Profiles"
              title="Endorsements from Refined Clients"
              align="center"
            />
            <StaggerContainer className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <StaggerItem key={t.id}>
                  <blockquote className="border border-border/40 bg-background/50 rounded-2xl p-8 h-full flex flex-col justify-between group hover:border-accent/30 transition-all duration-350">
                    <p className="text-muted text-sm leading-relaxed mb-6 italic">
                      &ldquo;{t.content}&rdquo;
                    </p>
                    <footer className="border-t border-border/20 pt-4 mt-auto">
                      <p className="font-display text-lg text-foreground group-hover:text-accent transition-colors">{t.name}</p>
                      {t.role && <p className="text-xs text-muted/60 mt-1 uppercase tracking-wider font-semibold">{t.role}</p>}
                    </footer>
                  </blockquote>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* FAQ Preview Accordion */}
      {previewFaqs.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-narrow px-5 md:px-8">
            <SectionHeading
              label="Advisory FAQ"
              title="Frequently Answered Questions"
              align="center"
            />
            <FaqAccordion faqs={previewFaqs} />
            <div className="text-center mt-10">
              <Link href="/faq" className="btn-secondary rounded-lg font-semibold">
                View All FAQs
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Final Call to Action */}
      <section className="relative py-28 md:py-36 overflow-hidden border-t border-border/25">
        <Image
          src={UNSPLASH_IMAGES.heroAlt}
          alt="Consultation Office"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0F1115]/90 backdrop-blur-[2px]" />
        <div className="relative container-narrow text-center px-5 md:px-8">
          <span className="label block text-xs font-semibold tracking-[0.25em] text-accent mb-4">Private Office</span>
          <h2 className="heading-lg text-foreground mb-6 font-display font-normal">
            Your Next Real Estate Decision Deserves Expert Guidance
          </h2>
          <p className="text-muted text-base mb-10 max-w-lg mx-auto font-light leading-relaxed">
            Focused on wealth creation, strategic investments, and premium opportunities. Schedule a private, confidential advisory session with our Principal Consultant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact" className="btn-accent rounded-lg text-sm px-8 py-3.5 font-semibold">
              Schedule Private Consultation
            </Link>
            <a href={`tel:+91${COMPANY.phone}`} className="btn-secondary rounded-lg text-sm px-8 py-3.5 font-semibold">
              Direct Office: {COMPANY.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
