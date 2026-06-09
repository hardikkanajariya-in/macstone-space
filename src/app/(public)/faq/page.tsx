import { getFaqs } from "@/lib/data";
import { SectionHeading } from "@/components/public/SectionHeading";
import { FaqSearch } from "@/components/public/FaqSearch";
import { createMetadata, faqJsonLd } from "@/lib/seo";
import { COMPANY } from "@/lib/constants";
import Link from "next/link";

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

      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-narrow px-5 md:px-8 text-center">
          <p className="label mb-4">FAQ</p>
          <h1 className="heading-xl mb-6">Questions & Answers</h1>
          <p className="text-muted max-w-lg mx-auto">
            Everything you need to know about working with Makstone Space.
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-narrow px-5 md:px-8">
          <FaqSearch faqs={faqs} categories={categories} />
        </div>
      </section>

      <section className="section-padding bg-surface-warm text-center">
        <div className="container-narrow px-5 md:px-8">
          <h2 className="heading-sm mb-4">Still have questions?</h2>
          <p className="text-muted text-sm mb-8">
            Our team is here to help. Reach out for personalized assistance.
          </p>
          <Link href="/contact" className="btn-primary">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
