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
import { ArrowRight, Shield, TrendingUp, Users, Compass, Award } from "lucide-react";
import { FaqAccordion } from "@/components/public/FaqAccordion";

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
      {/* Hero */}
      <section className="relative min-h-[100svh] flex items-end">
        <Image
          src={UNSPLASH_IMAGES.hero}
          alt="Luxury property"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/20" />
        <div className="relative container-wide w-full px-5 md:px-8 pb-16 md:pb-24 pt-32">
          <div className="max-w-3xl">
            <p className="label text-accent-light mb-6 fade-in">
              Premium Real Estate Consultancy
            </p>
            <h1 className="heading-xl text-white mb-6 fade-in">
              {content.hero_headline || "Where Vision Meets Exceptional Real Estate"}
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-xl mb-10 leading-relaxed fade-in">
              {content.hero_subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 fade-in">
              <Link href="/properties" className="btn-primary bg-white text-charcoal border-white hover:bg-transparent hover:text-white">
                Explore Properties
              </Link>
              <Link href="/contact" className="btn-secondary border-white/30 text-white hover:border-white hover:text-white">
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-background">
        <div className="container-editorial px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionHeading
                label="Who We Are"
                title={content.intro_title || "Advisory Excellence in Real Estate"}
                description={content.intro_text}
              />
              <Link href="/about" className="inline-flex items-center gap-2 text-sm tracking-wide text-accent hover:text-accent-dark transition-colors mt-4">
                Learn More About Us
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative aspect-[4/5] image-reveal">
              <Image
                src={UNSPLASH_IMAGES.about}
                alt="Makstone Space"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      {featured.length > 0 && (
        <section className="section-padding bg-surface-warm">
          <div className="container-wide px-5 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
              <SectionHeading
                label="Curated Collection"
                title="Featured Properties"
                description="Handpicked residences and investments that exemplify our standards of excellence."
              />
              <Link href="/properties" className="btn-secondary shrink-0 self-start md:self-auto">
                View All Properties
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {featured.map((property, i) => (
                <div key={property.id} className={i === 0 ? "md:row-span-2" : ""}>
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

      {/* Categories */}
      <section className="section-padding">
        <div className="container-wide px-5 md:px-8">
          <SectionHeading
            label="Our Expertise"
            title="Property Categories"
            description="Specialized advisory across every segment of premium real estate."
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
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
                <Link
                  key={cat.slug}
                  href={`/properties?category=${cat.slug}`}
                  className="group relative bg-background p-8 md:p-10 hover:bg-surface-warm transition-colors duration-500"
                >
                  <div className="relative aspect-[16/10] mb-6 overflow-hidden image-reveal">
                    <Image
                      src={images[cat.slug]}
                      alt={cat.label}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="font-display text-2xl mb-2 group-hover:text-accent transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-sm text-muted">{cat.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Makstone Space */}
      <section className="section-padding bg-charcoal text-white">
        <div className="container-wide px-5 md:px-8">
          <SectionHeading
            label="Why Choose Us"
            title="The Makstone Difference"
            description="We don't just facilitate transactions — we build lasting relationships founded on trust and expertise."
            align="center"
            light
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {whyUs.map((item) => (
              <div key={item.title} className="text-center lg:text-left">
                <item.icon size={24} className="text-accent mx-auto lg:mx-0 mb-4" />
                <h3 className="font-display text-xl mb-3">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Advisory */}
      <section className="section-padding">
        <div className="container-editorial px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[4/3] image-reveal order-2 lg:order-1">
              <Image
                src={UNSPLASH_IMAGES.investment}
                alt="Investment advisory"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeading
                label="Investment Advisory"
                title="Intelligent Real-Estate Decisions"
                description="Real estate is one of the most significant investments you'll make. Our advisory approach combines market analytics, location intelligence, and personalized strategy to help you identify opportunities aligned with your financial goals."
              />
              <ul className="space-y-4 mb-8">
                {[
                  "Comprehensive market analysis and trend forecasting",
                  "ROI projections and rental yield assessments",
                  "Portfolio diversification strategies",
                  "Pre-launch and emerging corridor opportunities",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-primary">
                Discuss Your Goals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Market Insights */}
      <section className="section-padding bg-surface-warm">
        <div className="container-wide px-5 md:px-8">
          <SectionHeading
            label="Market Insights"
            title="Knowledge That Empowers"
            description="Stay informed with expert perspectives on Ahmedabad's real-estate landscape."
            align="center"
          />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Ahmedabad's Premium Corridor Growth",
                excerpt: "How SG Highway and Bodakdev continue to drive premium property values with infrastructure expansion.",
                date: "March 2026",
              },
              {
                title: "Weekend Homes: The New Investment Frontier",
                excerpt: "Why discerning investors are turning to Sanand and surrounding areas for lifestyle and returns.",
                date: "February 2026",
              },
              {
                title: "Dholera SIR: A Decade of Transformation",
                excerpt: "Analyzing the investment trajectory of India's first smart industrial city.",
                date: "January 2026",
              },
            ].map((article) => (
              <article key={article.title} className="bg-background p-8 border border-border-light">
                <p className="label text-[0.625rem] mb-4">{article.date}</p>
                <h3 className="font-display text-xl mb-3">{article.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{article.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Client Journey */}
      <section className="section-padding">
        <div className="container-wide px-5 md:px-8">
          <SectionHeading
            label="Your Journey"
            title="From Discovery to Closure"
            description="A seamless, guided experience at every step of your property journey."
            align="center"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {CLIENT_JOURNEY.map((step) => (
              <div key={step.step} className="text-center">
                <span className="font-display text-3xl md:text-4xl text-accent/30 block mb-3">
                  {step.step}
                </span>
                <h3 className="font-display text-lg mb-2">{step.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section-padding bg-charcoal text-white">
          <div className="container-wide px-5 md:px-8">
            <SectionHeading
              label="Client Stories"
              title="Trusted by Discerning Clients"
              align="center"
              light
            />
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <blockquote key={t.id} className="border border-white/10 p-8">
                  <p className="text-white/80 text-sm leading-relaxed mb-6 italic">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <footer>
                    <p className="font-display text-lg">{t.name}</p>
                    {t.role && <p className="text-xs text-white/50 mt-1">{t.role}</p>}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Preview */}
      {previewFaqs.length > 0 && (
        <section className="section-padding">
          <div className="container-narrow px-5 md:px-8">
            <SectionHeading
              label="Questions"
              title="Frequently Asked"
              align="center"
            />
            <FaqAccordion faqs={previewFaqs} />
            <div className="text-center mt-8">
              <Link href="/faq" className="btn-secondary">
                View All FAQs
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="relative py-24 md:py-32">
        <Image
          src={UNSPLASH_IMAGES.heroAlt}
          alt="Consultation"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/85" />
        <div className="relative container-narrow text-center px-5 md:px-8">
          <p className="label text-accent-light mb-4">Begin Your Journey</p>
          <h2 className="heading-lg text-white mb-6">
            Ready to Make an Intelligent Decision?
          </h2>
          <p className="text-white/60 mb-10 max-w-lg mx-auto">
            Schedule a complimentary consultation with {COMPANY.founder} and discover how Makstone Space can guide your real-estate journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-accent">
              Book Consultation
            </Link>
            <a href={`tel:+91${COMPANY.phone}`} className="btn-secondary border-white/30 text-white hover:border-white hover:text-white">
              Call {COMPANY.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
