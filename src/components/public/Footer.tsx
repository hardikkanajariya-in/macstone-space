import Link from "next/link";
import Image from "next/image";
import { COMPANY, PROPERTY_CATEGORIES } from "@/lib/constants";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border/80 text-foreground">
      <div className="container-wide section-padding !pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo-with-text.png"
                alt="Macstone Space Logo"
                width={180}
                height={45}
                className="h-10 w-auto object-contain brightness-110"
              />
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Quiet luxury in real estate consultancy. Delivering bespoke property advisory and strategic portfolio construction for high-net-worth clients across Ahmedabad and Gujarat.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 border border-border rounded-full hover:border-accent hover:text-accent transition-colors duration-300" aria-label="LinkedIn">
                <LinkedinIcon size={16} />
              </a>
              <a href="#" className="p-2 border border-border rounded-full hover:border-accent hover:text-accent transition-colors duration-300" aria-label="Instagram">
                <InstagramIcon size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="label text-accent text-xs font-semibold mb-6 tracking-widest">Expertise</h4>
            <ul className="space-y-3.5 text-sm text-muted">
              {PROPERTY_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/properties?category=${cat.slug}`}
                    className="hover:text-foreground hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label text-accent text-xs font-semibold mb-6 tracking-widest">Private Office</h4>
            <ul className="space-y-3.5 text-sm text-muted">
              <li><Link href="/properties" className="hover:text-foreground hover:translate-x-1 inline-block transition-all duration-300">All Properties</Link></li>
              <li><Link href="/about" className="hover:text-foreground hover:translate-x-1 inline-block transition-all duration-300">About Us</Link></li>
              <li><Link href="/faq" className="hover:text-foreground hover:translate-x-1 inline-block transition-all duration-300">Client FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-foreground hover:translate-x-1 inline-block transition-all duration-300">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="label text-accent text-xs font-semibold mb-6 tracking-widest">Newsletter</h4>
            <p className="text-sm text-muted leading-relaxed mb-6">
              Subscribe to receive curated investment reports and pre-launch notifications from our Principal Advisor.
            </p>
            <div className="relative mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-background border border-border px-4 py-3 text-sm focus:border-accent focus:outline-none transition-colors pr-10 text-foreground"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-accent transition-colors cursor-pointer" aria-label="Subscribe">
                <ArrowRight size={18} />
              </button>
            </div>
            <p className="text-xs text-muted/60">{COMPANY.businessHours}</p>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-b border-border/50 text-sm text-muted mb-12">
          <div className="flex items-center gap-3">
            <Phone size={16} className="text-accent shrink-0" />
            <a href={`tel:+91${COMPANY.phone}`} className="hover:text-accent transition-colors">
              {COMPANY.phoneDisplay}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-accent shrink-0" />
            <a href={`mailto:${COMPANY.email}`} className="hover:text-accent transition-colors">
              {COMPANY.email}
            </a>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
            <span>{COMPANY.address.full}</span>
          </div>
        </div>

        <div className="pt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted/60">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p>&copy; {year} {COMPANY.name}. All rights reserved.</p>
            <span className="hidden md:inline text-muted/40">|</span>
            <p className="text-accent-light font-medium tracking-wide">RERA Compliant Advisory</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p className="tracking-wide">Principal Advisory under {COMPANY.founder}</p>
            <span className="hidden md:inline text-muted/40">|</span>
            <p className="tracking-wide">
              Created by{" "}
              <a
                href="https://hardikkanajariya.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-dark transition-colors font-medium"
              >
                hardikkanajariya.in
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
