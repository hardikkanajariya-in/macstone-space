import Image from "next/image";
import { SectionHeading } from "@/components/public/SectionHeading";
import { InquiryForm } from "@/components/public/InquiryForm";
import { createMetadata } from "@/lib/seo";
import { COMPANY, UNSPLASH_IMAGES } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata = createMetadata({
  title: "Contact Us",
  description: `Get in touch with ${COMPANY.name}. Schedule a consultation, request a callback, or visit our Ahmedabad office.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <Image
          src={UNSPLASH_IMAGES.contact}
          alt="Contact Makstone Space"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/75" />
        <div className="relative container-wide px-5 md:px-8">
          <p className="label text-accent-light mb-4">Contact</p>
          <h1 className="heading-xl text-white max-w-2xl">
            Let&apos;s Start a Conversation
          </h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
            <div>
              <SectionHeading
                label="Get in Touch"
                title="We're Here to Guide You"
                description="Whether you're exploring your first property investment or seeking a luxury residence, our team is ready to provide personalized guidance."
              />

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-accent shrink-0 mt-1" />
                  <div>
                    <p className="font-medium mb-1">Office Address</p>
                    <p className="text-sm text-muted">
                      {COMPANY.address.line1}<br />
                      {COMPANY.address.line2}<br />
                      {COMPANY.address.city} – {COMPANY.address.pincode}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone size={20} className="text-accent shrink-0 mt-1" />
                  <div>
                    <p className="font-medium mb-1">Phone</p>
                    <a href={`tel:+91${COMPANY.phone}`} className="text-sm text-muted hover:text-accent transition-colors">
                      {COMPANY.phoneDisplay}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail size={20} className="text-accent shrink-0 mt-1" />
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <a href={`mailto:${COMPANY.email}`} className="text-sm text-muted hover:text-accent transition-colors">
                      {COMPANY.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock size={20} className="text-accent shrink-0 mt-1" />
                  <div>
                    <p className="font-medium mb-1">Business Hours</p>
                    <p className="text-sm text-muted">{COMPANY.businessHours}</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-surface-warm border border-border-light">
                <p className="font-display text-lg mb-2">{COMPANY.founder}</p>
                <p className="text-xs text-muted mb-3">Founder & Principal Consultant</p>
                <p className="text-sm text-muted leading-relaxed">
                  Every consultation is personally overseen to ensure you receive the highest level of expertise and attention.
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <div className="border border-border p-8">
                <h3 className="font-display text-xl mb-2">Book a Consultation</h3>
                <p className="text-sm text-muted mb-6">
                  Schedule a complimentary consultation to discuss your real-estate goals.
                </p>
                <InquiryForm type="consultation" variant="consultation" />
              </div>

              <div className="border border-border p-8">
                <h3 className="font-display text-xl mb-2">General Inquiry</h3>
                <p className="text-sm text-muted mb-6">
                  Have a question? Send us a message and we&apos;ll respond within 24 hours.
                </p>
                <InquiryForm type="contact" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="h-80 md:h-96 bg-surface-warm relative">
        <iframe
          title="Makstone Space Office Location"
          src="https://maps.google.com/maps?q=305+Sampann+Complex+Navrangpura+Ahmedabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0 grayscale opacity-80"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
