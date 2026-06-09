export const COMPANY = {
  name: "Makstone Space",
  founder: "Maulik Patel",
  phone: "9537007777",
  phoneDisplay: "+91 95370 07777",
  email: "maulikpatel141977@gmail.com",
  address: {
    line1: "305 Sampann Complex",
    line2: "Navrangpura",
    city: "Ahmedabad",
    pincode: "380009",
    full: "305 Sampann Complex, Navrangpura, Ahmedabad – 380009",
  },
  businessHours: "Mon – Sat: 10:00 AM – 7:00 PM",
  tagline: "Premium Real Estate Consultancy & Investment Advisory",
  description:
    "Makstone Space is a trusted real-estate consultancy specializing in premium residential, commercial, and investment properties across Ahmedabad and Gujarat.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://makstonespace.com",
} as const;

export const PROPERTY_TYPES = [
  "Residential",
  "Commercial",
  "Plots",
  "Weekend Homes",
  "Investment",
  "Luxury",
] as const;

export const PROPERTY_CATEGORIES = [
  { slug: "residential", label: "Residential", description: "Premium apartments, villas & bespoke homes" },
  { slug: "commercial", label: "Commercial", description: "Office spaces, retail & corporate assets" },
  { slug: "plots", label: "Plots & Land", description: "Prime land parcels & development opportunities" },
  { slug: "weekend-homes", label: "Weekend Homes", description: "Retreat properties for refined living" },
  { slug: "investment", label: "Investment", description: "High-yield real-estate opportunities" },
  { slug: "luxury", label: "Luxury Collection", description: "Exceptional properties of distinction" },
] as const;

export const PROPERTY_STATUSES = ["available", "sold", "reserved", "upcoming"] as const;

export const INQUIRY_TYPES = [
  "general",
  "property",
  "consultation",
  "callback",
  "contact",
] as const;

export const INQUIRY_STATUSES = ["new", "contacted", "in_progress", "closed", "spam"] as const;

export const FAQ_CATEGORIES = [
  "general",
  "buying",
  "investment",
  "consultation",
  "documentation",
] as const;

export const UNSPLASH_IMAGES = {
  hero: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
  heroAlt: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
  residential: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  commercial: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  plots: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
  weekend: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  investment: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
  luxury: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  interior: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
  architecture: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cd2e?w=800&q=80",
  skyline: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80",
  founder: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
  about: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
  contact: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
} as const;

export const CLIENT_JOURNEY = [
  { step: "01", title: "Discovery", description: "Understanding your aspirations, requirements, and investment goals." },
  { step: "02", title: "Consultation", description: "Personalized advisory session with our principal consultant." },
  { step: "03", title: "Property Selection", description: "Curated shortlist of properties aligned with your criteria." },
  { step: "04", title: "Site Visits", description: "Guided property tours with expert insights at every location." },
  { step: "05", title: "Negotiation", description: "Strategic negotiation to secure optimal terms." },
  { step: "06", title: "Documentation", description: "Comprehensive support through legal and financial processes." },
  { step: "07", title: "Closure", description: "Seamless completion of your property acquisition." },
  { step: "08", title: "Post-Sale Support", description: "Continued guidance for investment management and future needs." },
] as const;
