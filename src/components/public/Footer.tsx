import Link from "next/link";
import { COMPANY, PROPERTY_CATEGORIES } from "@/lib/constants";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white">
      <div className="container-wide section-padding !pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="font-display text-2xl tracking-wide">Makstone</span>
              <span className="font-display text-2xl tracking-wide text-accent ml-1">Space</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {COMPANY.tagline}. Trusted advisory for premium properties in Ahmedabad & Gujarat.
            </p>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              <a href={`tel:+91${COMPANY.phone}`} className="flex items-center gap-3 hover:text-accent transition-colors">
                <Phone size={14} className="text-accent shrink-0" />
                {COMPANY.phoneDisplay}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 hover:text-accent transition-colors">
                <Mail size={14} className="text-accent shrink-0" />
                {COMPANY.email}
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-accent shrink-0 mt-1" />
                <span>{COMPANY.address.full}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="label text-accent mb-6">Explore</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link href="/properties" className="hover:text-white transition-colors">All Properties</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="label text-accent mb-6">Categories</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {PROPERTY_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/properties?category=${cat.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label text-accent mb-6">Consultation</h4>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Ready to make an intelligent real-estate decision? Schedule a personalized consultation with our principal consultant.
            </p>
            <Link href="/contact" className="btn-accent text-xs">
              Book Consultation
            </Link>
            <p className="text-xs text-white/40 mt-6">{COMPANY.businessHours}</p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>&copy; {year} {COMPANY.name}. All rights reserved.</p>
          <p>Founded by {COMPANY.founder}</p>
        </div>
      </div>
    </footer>
  );
}
