import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/public/SectionHeading";
import { getMultipleSiteContent } from "@/lib/data";
import { COMPANY, UNSPLASH_IMAGES } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/public/MotionComponents";

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
      {/* Cinematic Header */}
      <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <Image
          src={UNSPLASH_IMAGES.about}
          alt="About Makstone Space"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0F1115]/85" />
        <div className="relative container-wide px-5 md:px-8">
          <FadeInUp>
            <span className="label text-xs tracking-[0.25em] text-accent mb-4 block font-semibold">
              Our Legacy
            </span>
            <h1 className="heading-xl text-foreground max-w-4xl font-display font-light">
              A Legacy of Trust in Premium Real Estate
            </h1>
          </FadeInUp>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-background border-b border-border/10">
        <div className="container-editorial px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeInUp>
              <SectionHeading label="Our Story" title="Built on Experience & Trust" />
              <div className="prose-editorial text-muted text-base md:text-lg leading-relaxed font-light space-y-6">
                <p>{content.about_story || "Founded by industry veteran Maulik Patel, Macstone Space represents a paradigm shift in real estate consulting. We approach transactions through a strict investment framework, ensuring our clients acquire not just beautiful properties, but durable financial assets."}</p>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.2} className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border/30 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
              <Image
                src={UNSPLASH_IMAGES.architecture}
                alt="Bespoke Architecture"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Founder Message */}
      <section className="section-padding bg-surface">
        <div className="container-editorial px-5 md:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <FadeInUp className="lg:col-span-2 relative aspect-square max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-border/30 shadow-[0_8px_25px_rgba(0,0,0,0.3)]">
              <Image
                src={UNSPLASH_IMAGES.founder}
                alt={COMPANY.founder}
                fill
                className="object-cover"
                sizes="400px"
              />
            </FadeInUp>
            <FadeInUp delay={0.3} className="lg:col-span-3">
              <SectionHeading
                label="Founder"
                title={`A Message from ${COMPANY.founder}`}
              />
              <div className="mb-8 border-l-2 border-accent pl-6 py-2">
                <p className="text-xl italic text-foreground/90 font-light leading-relaxed">
                  &ldquo;{content.founder_message || "Real estate represents legacy and security. Our goal is to advise you with the same rigor we would apply to our own family capital."}&rdquo;
                </p>
              </div>
              <p className="font-display text-2xl text-foreground">{COMPANY.founder}</p>
              <p className="text-xs text-accent uppercase tracking-widest font-semibold mt-1">Founder & Principal Consultant</p>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-background border-t border-b border-border/10">
        <div className="container-wide px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <FadeInUp className="bg-surface border border-border/35 p-8 md:p-10 rounded-2xl">
              <SectionHeading label="Vision" title="Our Vision" />
              <p className="text-muted leading-relaxed text-sm md:text-base font-light">
                {content.vision || "To be recognized as the premier private office real estate consultancy in Gujarat, known for unmatched investment analytical rigor, absolute transaction integrity, and bespoke client support."}
              </p>
            </FadeInUp>
            <FadeInUp delay={0.2} className="bg-surface border border-border/35 p-8 md:p-10 rounded-2xl">
              <SectionHeading label="Mission" title="Our Mission" />
              <p className="text-muted leading-relaxed text-sm md:text-base font-light">
                {content.mission || "To guide high-net-worth clients and corporations systematically through real estate complexity, maximizing portfolio growth and asset stability while prioritizing confidentiality and alignment of interest."}
              </p>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-surface">
        <div className="container-wide px-5 md:px-8">
          <SectionHeading
            label="Corporate Values"
            title="What We Stand For"
            align="center"
          />
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="text-center bg-background border border-border/40 p-8 rounded-xl h-full flex flex-col justify-between hover:border-accent/40 transition-all duration-300">
                  <h3 className="font-display text-xl mb-4 text-foreground">{v.title}</h3>
                  <p className="text-sm text-muted leading-relaxed font-light">{v.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Market Expertise */}
      <section className="section-padding bg-background">
        <div className="container-editorial px-5 md:px-8">
          <SectionHeading
            label="Expertise"
            title="Market Knowledge & Investment Approach"
            description="Our deep roots in Ahmedabad's real-estate market give us unparalleled insight into emerging corridors, premium addresses, and investment opportunities. We combine qualitative understanding with quantitative analysis to guide every recommendation."
          />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { title: "Local Intelligence", desc: "Intimate knowledge of Ahmedabad, Gandhinagar, and Gujarat developer networks." },
              { title: "Investment Model", desc: "Every portfolio asset evaluated for future rental yields and pricing indexation." },
              { title: "Bespoke Relationships", desc: "Long-term client representations that extend far beyond simple transaction closures." },
            ].map((item) => (
              <FadeInUp key={item.title} className="border border-border/50 bg-surface/30 p-8 rounded-xl hover:border-accent/30 transition-all duration-300">
                <h3 className="font-display text-xl mb-3 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed font-light">{item.desc}</p>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding bg-surface text-center border-t border-border/20">
        <div className="container-narrow px-5 md:px-8">
          <span className="label block text-xs tracking-widest text-accent mb-4">Start Your Journey</span>
          <h2 className="heading-md mb-6 font-display text-foreground font-normal">Experience the Macstone Difference</h2>
          <p className="text-muted mb-8 leading-relaxed font-light">
            Join the growing list of family offices and private clients who trust us with their real-estate capital allocations.
          </p>
          <Link href="/contact" className="btn-accent rounded-lg font-semibold">
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
