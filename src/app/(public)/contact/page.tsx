import Image from "next/image";
import { SectionHeading } from "@/components/public/SectionHeading";
import { InquiryForm } from "@/components/public/InquiryForm";
import { createMetadata } from "@/lib/seo";
import { COMPANY, UNSPLASH_IMAGES } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FadeInUp } from "@/components/public/MotionComponents";

export const metadata = createMetadata({
  title: "Contact Us",
  description: `Get in touch with ${COMPANY.name}. Schedule a consultation, request a callback, or visit our Ahmedabad office.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      {/* Cinematic Header */}
      <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <Image
          src={UNSPLASH_IMAGES.contact}
          alt="Contact Makstone Space"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/85" />
        <div className="relative container-wide px-5 md:px-8">
          <FadeInUp>
            <span className="label text-xs tracking-[0.25em] text-accent mb-4 block font-semibold">
              Contact Us
            </span>
            <h1 className="heading-xl text-foreground max-w-2xl font-display font-light">
              Let&apos;s Start a Conversation
            </h1>
          </FadeInUp>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="section-padding bg-background">
        <div className="container-wide px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <FadeInUp className="space-y-12">
              <div>
                <SectionHeading
                  label="Private Office"
                  title="We're Here to Guide You"
                  description="Whether you're exploring your first property investment or seeking a luxury residence, our team is ready to provide personalized guidance."
                />
              </div>

              {/* Contact Information Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border border-border/50 bg-surface/30 p-6 rounded-xl flex items-start gap-4">
                  <MapPin size={20} className="text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1 text-foreground">Office Address</p>
                    <p className="text-xs text-muted leading-relaxed">
                      {COMPANY.address.line1}<br />
                      {COMPANY.address.line2}<br />
                      {COMPANY.address.city} – {COMPANY.address.pincode}
                    </p>
                  </div>
                </div>
                
                <div className="border border-border/50 bg-surface/30 p-6 rounded-xl flex items-start gap-4">
                  <Phone size={20} className="text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1 text-foreground">Phone Support</p>
                    <a href={`tel:+91${COMPANY.phone}`} className="text-xs text-muted hover:text-accent transition-colors block leading-relaxed">
                      {COMPANY.phoneDisplay}
                    </a>
                    <span className="text-[10px] text-muted/60">Mon – Sat: 10AM – 7PM</span>
                  </div>
                </div>

                <div className="border border-border/50 bg-surface/30 p-6 rounded-xl flex items-start gap-4">
                  <Mail size={20} className="text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1 text-foreground">Email Channels</p>
                    <a href={`mailto:${COMPANY.email}`} className="text-xs text-muted hover:text-accent transition-colors block truncate max-w-[200px] leading-relaxed">
                      {COMPANY.email}
                    </a>
                  </div>
                </div>

                <div className="border border-border/50 bg-surface/30 p-6 rounded-xl flex items-start gap-4">
                  <Clock size={20} className="text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1 text-foreground">Business Hours</p>
                    <p className="text-xs text-muted leading-relaxed">
                      {COMPANY.businessHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Founder Highlight Box */}
              <div className="border border-accent/25 bg-surface/50 p-8 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full pointer-events-none" />
                <p className="font-display text-xl text-foreground mb-1">{COMPANY.founder}</p>
                <p className="text-xs text-accent uppercase tracking-wider font-semibold mb-3">Founder & Principal Consultant</p>
                <p className="text-xs md:text-sm text-muted leading-relaxed font-light">
                  Every consultation is personally overseen to ensure you receive the highest level of expertise, asset screening, and strategic advice.
                </p>
              </div>
            </FadeInUp>

            {/* Inquiry Form Blocks */}
            <FadeInUp delay={0.2} className="space-y-10">
              <div className="border border-border/60 bg-surface/40 p-8 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.15)]">
                <h3 className="font-display text-xl mb-1.5 text-foreground">Book a Private Consultation</h3>
                <p className="text-xs text-muted mb-6">
                  Schedule a complimentary session to discuss portfolio targets or property listings.
                </p>
                <InquiryForm type="consultation" variant="consultation" />
              </div>

              <div className="border border-border/60 bg-surface/40 p-8 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.15)]">
                <h3 className="font-display text-xl mb-1.5 text-foreground">General Inquiry</h3>
                <p className="text-xs text-muted mb-6">
                  Have an asset you want to market or general questions? Send us a brief message.
                </p>
                <InquiryForm type="contact" />
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Map Zone */}
      <section className="h-96 bg-surface relative overflow-hidden border-t border-border/20">
        <iframe
          title="Makstone Space Office Location"
          src="https://maps.google.com/maps?q=305+Sampann+Complex+Navrangpura+Ahmedabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0 grayscale invert opacity-60"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
