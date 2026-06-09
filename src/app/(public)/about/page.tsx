import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/public/SectionHeading";
import { getMultipleSiteContent } from "@/lib/data";
import { COMPANY, UNSPLASH_IMAGES } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About Us",
  description: `Learn about ${COMPANY.name}, founded by ${COMPANY.founder}. Premium real-estate consultancy and investment advisory in Ahmedabad.`,
  path: "/about",
});

const values = [
  { title: "Integrity", description: "Honest advice, always. Your trust is our most valued asset." },
  { title: "Excellence", description: "We pursue the highest standards in every interaction and recommendation." },
  { title: "Knowledge", description: "Deep market expertise that empowers informed decisions." },
  { title: "Dedication", description: "Personal commitment to your success from discovery to beyond closure." },
];

export default async function AboutPage() {
  const content = await getMultipleSiteContent([
    "about_story",
    "founder_message",
    "vision",
    "mission",
  ]);

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <Image
          src={UNSPLASH_IMAGES.about}
          alt="About Makstone Space"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/70" />
        <div className="relative container-wide px-5 md:px-8">
          <p className="label text-accent-light mb-4">About Us</p>
          <h1 className="heading-xl text-white max-w-3xl">
            A Legacy of Trust in Premium Real Estate
          </h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-editorial px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <SectionHeading label="Our Story" title="Built on Experience & Trust" />
              <div className="prose-editorial">
                <p>{content.about_story}</p>
              </div>
            </div>
            <div className="relative aspect-[4/5] image-reveal">
              <Image
                src={UNSPLASH_IMAGES.architecture}
                alt="Architecture"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-warm">
        <div className="container-editorial px-5 md:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2 relative aspect-square max-w-sm">
              <Image
                src={UNSPLASH_IMAGES.founder}
                alt={COMPANY.founder}
                fill
                className="object-cover"
                sizes="400px"
              />
            </div>
            <div className="lg:col-span-3">
              <SectionHeading
                label="Founder"
                title={`A Message from ${COMPANY.founder}`}
              />
              <div className="prose-editorial mb-6">
                <p className="text-lg italic text-foreground/80">
                  &ldquo;{content.founder_message}&rdquo;
                </p>
              </div>
              <p className="font-display text-xl">{COMPANY.founder}</p>
              <p className="text-sm text-muted">Founder & Principal Consultant</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <SectionHeading label="Vision" title="Our Vision" />
              <p className="text-muted leading-relaxed">{content.vision}</p>
            </div>
            <div>
              <SectionHeading label="Mission" title="Our Mission" />
              <p className="text-muted leading-relaxed">{content.mission}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-charcoal text-white">
        <div className="container-wide px-5 md:px-8">
          <SectionHeading
            label="Values"
            title="What We Stand For"
            align="center"
            light
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.title} className="text-center">
                <h3 className="font-display text-xl mb-3">{v.title}</h3>
                <p className="text-sm text-white/60">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-editorial px-5 md:px-8">
          <SectionHeading
            label="Expertise"
            title="Market Knowledge & Investment Approach"
            description="Our deep roots in Ahmedabad's real-estate market give us unparalleled insight into emerging corridors, premium addresses, and investment opportunities. We combine qualitative understanding with quantitative analysis to guide every recommendation."
          />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { title: "Local Expertise", desc: "Intimate knowledge of Ahmedabad, Gandhinagar, and Gujarat markets." },
              { title: "Investment Lens", desc: "Every property evaluated for lifestyle value and investment potential." },
              { title: "Long-term Partnership", desc: "Relationships that extend beyond a single transaction." },
            ].map((item) => (
              <div key={item.title} className="border border-border p-8">
                <h3 className="font-display text-xl mb-3">{item.title}</h3>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-warm text-center">
        <div className="container-narrow px-5 md:px-8">
          <h2 className="heading-md mb-6">Experience the Makstone Difference</h2>
          <p className="text-muted mb-8">
            Join the growing community of clients who trust us with their most important real-estate decisions.
          </p>
          <Link href="/contact" className="btn-primary">
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
