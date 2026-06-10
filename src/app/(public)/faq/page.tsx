import { getFaqs } from "@/lib/data";
import { SectionHeading } from "@/components/public/SectionHeading";
import { FaqSearch } from "@/components/public/FaqSearch";
import { createMetadata, faqJsonLd } from "@/lib/seo";
import { COMPANY } from "@/lib/constants";
import Link from "next/link";
import { FadeInUp } from "@/components/public/MotionComponents";

export const metadata = createMetadata({
  title: "Frequently Asked Questions",
  description: `Find answers to common questions about ${COMPANY.name} services, property buying, investment, and consultation.`,
  path: "/faq",
});

export default async function FaqPage() {
  const faqs = await getFaqs();

  const categories = [...new Set(faqs.map((f) => f.category))];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(faqs)),
        }}
      />

      {/* Header Section */}
      <section className="pt-40 pb-16 md:pt-48 md:pb-24 bg-surface border-b border-border/20">
        <div className="container-narrow px-5 md:px-8 text-center">
          <FadeInUp>
            <span className="label block text-xs font-semibold tracking-[0.25em] text-accent mb-4">
              Client FAQ
            </span>
            <h1 className="heading-xl text-foreground font-display font-light mb-6">
              Questions &amp; Answers
            </h1>
            <p className="text-muted text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
              Everything you need to know about our premium consulting advisory services.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Search & Accordion Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-narrow px-5 md:px-8">
          <FadeInUp delay={0.15}>
            <FaqSearch faqs={faqs} categories={categories} />
          </FadeInUp>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="section-padding bg-surface text-center border-t border-border/20">
        <div className="container-narrow px-5 md:px-8">
          <FadeInUp>
            <h2 className="heading-sm text-foreground mb-4 font-display font-normal">Still have questions?</h2>
            <p className="text-muted text-sm mb-8 max-w-md mx-auto font-light leading-relaxed">
              Our Private Office team is here to assist with tailored portfolios or documentation questions.
            </p>
            <Link href="/contact" className="btn-accent rounded-lg font-semibold">
              Contact Private Office
            </Link>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
