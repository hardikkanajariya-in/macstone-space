import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import { UNSPLASH_IMAGES } from "../src/lib/constants";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 12);

  await prisma.admin.upsert({
    where: { email: "admin@makstonespace.com" },
    update: {},
    create: {
      email: "admin@makstonespace.com",
      passwordHash,
      name: "Administrator",
    },
  });

  const properties = [
    {
      slug: "skyline-residence-navrangpura",
      title: "Skyline Residence",
      shortDescription: "An architectural masterpiece overlooking Ahmedabad's finest skyline.",
      description:
        "Skyline Residence represents the pinnacle of urban luxury living in Navrangpura. This meticulously designed 4 BHK penthouse offers panoramic city views, bespoke interiors, and world-class amenities. Crafted for discerning homeowners who appreciate architectural excellence and refined living spaces.\n\nEvery detail has been considered — from the Italian marble flooring to the floor-to-ceiling windows that frame the cityscape. The residence features a private terrace, smart home automation, and access to an exclusive clubhouse with infinity pool and wellness center.",
      propertyType: "Residential",
      category: "residential",
      status: "available",
      price: 45000000,
      priceLabel: "₹4.50 Cr",
      area: 3200,
      configuration: "4 BHK Penthouse",
      possession: "Ready to Move",
      ownership: "Freehold",
      facing: "North-East",
      propertyId: "MS-2026-1001",
      location: "Navrangpura",
      address: "Skyline Towers, CG Road, Navrangpura",
      featured: true,
      published: true,
      highlights: JSON.stringify([
        "Panoramic city views",
        "Private terrace",
        "Smart home automation",
        "Italian marble flooring",
        "Exclusive clubhouse access",
      ]),
      amenities: JSON.stringify([
        "Infinity Pool",
        "Fitness Center",
        "Concierge Service",
        "24/7 Security",
        "Covered Parking",
        "Landscaped Gardens",
        "Children's Play Area",
        "Party Hall",
      ]),
      investmentNotes:
        "Navrangpura remains one of Ahmedabad's most prestigious addresses with consistent capital appreciation of 8-12% annually. This property offers both lifestyle excellence and strong investment fundamentals.",
      locationAdvantages: JSON.stringify({
        landmarks: ["CG Road (2 min)", "Law Garden (5 min)", "Ahmedabad Railway Station (10 min)"],
        schools: ["Delhi Public School", "Ahmedabad International School"],
        hospitals: ["Sterling Hospital", "CIMS Hospital"],
        commercial: ["One42 Business District", "Navrangpura Commercial Hub"],
        lifestyle: ["Law Garden Night Market", "Fine Dining District"],
      }),
      images: [
        { url: UNSPLASH_IMAGES.luxury, alt: "Skyline Residence exterior", isPrimary: true, order: 0 },
        { url: UNSPLASH_IMAGES.interior, alt: "Living room", order: 1 },
        { url: UNSPLASH_IMAGES.architecture, alt: "Architecture detail", order: 2 },
      ],
    },
    {
      slug: "corporate-heights-sg-highway",
      title: "Corporate Heights",
      shortDescription: "Premium Grade-A office space on Ahmedabad's fastest-growing commercial corridor.",
      description:
        "Corporate Heights offers exceptional Grade-A office space on SG Highway, Ahmedabad's premier commercial destination. This 5,000 sq.ft. furnished office suite features modern infrastructure, ample natural light, and proximity to major corporate hubs.\n\nIdeal for established businesses seeking a prestigious address with excellent connectivity and growth potential.",
      propertyType: "Commercial",
      category: "commercial",
      status: "available",
      price: 28000000,
      priceLabel: "₹2.80 Cr",
      area: 5000,
      configuration: "Open Plan Office",
      possession: "Ready to Move",
      ownership: "Freehold",
      facing: "East",
      propertyId: "MS-2026-1002",
      location: "SG Highway",
      address: "Corporate Heights, SG Highway, Ahmedabad",
      featured: true,
      published: true,
      highlights: JSON.stringify([
        "Grade-A office space",
        "Fully furnished",
        "Dedicated parking",
        "24/7 power backup",
        "High-speed elevators",
      ]),
      amenities: JSON.stringify([
        "Central AC",
        "Conference Rooms",
        "Cafeteria",
        "Visitor Parking",
        "Fire Safety Systems",
        "CCTV Surveillance",
      ]),
      investmentNotes:
        "SG Highway commercial properties have shown 10-15% rental yields with strong tenant demand from IT and corporate sectors.",
      locationAdvantages: JSON.stringify({
        landmarks: ["Iscon Crossroads (3 min)", "Prahlad Nagar (5 min)"],
        schools: [],
        hospitals: ["Zydus Hospital"],
        commercial: ["One Ahmedabad", "Iscon Mega Mall"],
        lifestyle: ["Restaurants & Cafes District"],
      }),
      images: [
        { url: UNSPLASH_IMAGES.commercial, alt: "Corporate Heights", isPrimary: true, order: 0 },
        { url: UNSPLASH_IMAGES.skyline, alt: "City view", order: 1 },
      ],
    },
    {
      slug: "emerald-villa-sanand",
      title: "Emerald Villa",
      shortDescription: "A secluded weekend retreat surrounded by nature, minutes from Ahmedabad.",
      description:
        "Emerald Villa is a stunning 3 BHK weekend home nestled in the serene landscapes of Sanand. Designed for those who seek respite from urban life without compromising on luxury, this property features expansive lawns, a private pool, and thoughtfully curated interiors.\n\nPerfect for families seeking a premium getaway or investors looking at the growing weekend home market near Ahmedabad.",
      propertyType: "Weekend Homes",
      category: "weekend-homes",
      status: "available",
      price: 18500000,
      priceLabel: "₹1.85 Cr",
      area: 4500,
      configuration: "3 BHK Villa",
      possession: "Ready to Move",
      ownership: "Freehold",
      facing: "South",
      propertyId: "MS-2026-1003",
      location: "Sanand",
      address: "Emerald Estates, Sanand, Ahmedabad",
      featured: true,
      published: true,
      highlights: JSON.stringify([
        "Private swimming pool",
        "Landscaped gardens",
        "Gated community",
        "Mountain views",
        "Fully furnished",
      ]),
      amenities: JSON.stringify([
        "Private Pool",
        "Garden",
        "BBQ Area",
        "Servant Quarters",
        "Covered Parking",
        "Security",
      ]),
      investmentNotes:
        "Weekend homes near Ahmedabad are experiencing 15-20% annual appreciation driven by lifestyle demand and infrastructure development.",
      locationAdvantages: JSON.stringify({
        landmarks: ["Sanand Industrial Zone (10 min)", "Ahmedabad Airport (25 min)"],
        schools: [],
        hospitals: [],
        commercial: [],
        lifestyle: ["Nature trails", "Farm-to-table restaurants"],
      }),
      images: [
        { url: UNSPLASH_IMAGES.weekend, alt: "Emerald Villa", isPrimary: true, order: 0 },
        { url: UNSPLASH_IMAGES.residential, alt: "Villa exterior", order: 1 },
      ],
    },
    {
      slug: "prime-plots-dholera-sir",
      title: "Prime Plots – Dholera SIR",
      shortDescription: "Strategic land investment in India's first smart industrial city.",
      description:
        "Secure your position in Dholera Special Investment Region, India's most ambitious smart city project. These prime residential plots offer exceptional long-term investment potential with government-backed infrastructure development.\n\nDholera SIR is positioned as a global manufacturing and trading hub with world-class connectivity, making these plots a compelling investment opportunity.",
      propertyType: "Plots",
      category: "plots",
      status: "available",
      price: 3500000,
      priceLabel: "₹35 Lakh onwards",
      area: 1200,
      configuration: "Residential Plot",
      possession: "Immediate",
      ownership: "Freehold",
      facing: "Multiple",
      propertyId: "MS-2026-1004",
      location: "Dholera SIR",
      address: "Dholera Special Investment Region, Gujarat",
      featured: false,
      published: true,
      highlights: JSON.stringify([
        "Government-backed development",
        "Clear title",
        "Road connectivity",
        "High appreciation potential",
        "Flexible plot sizes",
      ]),
      amenities: JSON.stringify(["Road Access", "Electricity Connection", "Water Supply Planning"]),
      investmentNotes:
        "Dholera SIR plots have appreciated 3-5x since launch. With metro and expressway connectivity underway, long-term growth potential remains exceptional.",
      locationAdvantages: JSON.stringify({
        landmarks: ["Dholera International Airport (planned)", "DMIC Corridor"],
        schools: [],
        hospitals: [],
        commercial: ["Industrial Hub", "Smart City Infrastructure"],
        lifestyle: [],
      }),
      images: [
        { url: UNSPLASH_IMAGES.plots, alt: "Dholera plots", isPrimary: true, order: 0 },
      ],
    },
    {
      slug: "the-pinnacle-bodakdev",
      title: "The Pinnacle",
      shortDescription: "Ultra-luxury duplex residence in Bodakdev's most exclusive address.",
      description:
        "The Pinnacle defines ultra-luxury living in Bodakdev. This 5 BHK duplex spanning 6,500 sq.ft. features private elevator access, a rooftop infinity pool, home theatre, and interiors by a renowned design studio.\n\nReserved for those who accept nothing less than extraordinary.",
      propertyType: "Luxury",
      category: "luxury",
      status: "available",
      price: 85000000,
      priceLabel: "₹8.50 Cr",
      area: 6500,
      configuration: "5 BHK Duplex",
      possession: "Under Construction",
      ownership: "Freehold",
      facing: "West",
      propertyId: "MS-2026-1005",
      location: "Bodakdev",
      address: "The Pinnacle, Bodakdev, Ahmedabad",
      featured: true,
      published: true,
      highlights: JSON.stringify([
        "Private elevator",
        "Rooftop infinity pool",
        "Home theatre",
        "Designer interiors",
        "Wine cellar",
      ]),
      amenities: JSON.stringify([
        "Private Pool",
        "Home Theatre",
        "Wine Cellar",
        "Smart Home",
        "Concierge",
        "Valet Parking",
        "Spa Room",
        "Private Gym",
      ]),
      investmentNotes:
        "Ultra-luxury segment in Bodakdev commands premium pricing with limited supply ensuring sustained value appreciation.",
      locationAdvantages: JSON.stringify({
        landmarks: ["Bodakdev Circle (2 min)", "SG Highway (5 min)"],
        schools: ["Udgam School", "Ahmedabad International School"],
        hospitals: ["Apollo Hospital"],
        commercial: ["Bodakdev Commercial Hub"],
        lifestyle: ["Premium dining", "Golf Club"],
      }),
      images: [
        { url: UNSPLASH_IMAGES.luxury, alt: "The Pinnacle", isPrimary: true, order: 0 },
        { url: UNSPLASH_IMAGES.interior, alt: "Interior", order: 1 },
        { url: UNSPLASH_IMAGES.architecture, alt: "Architecture", order: 2 },
      ],
    },
    {
      slug: "investment-tower-prahlad-nagar",
      title: "Investment Tower – Pre-Launch",
      shortDescription: "Pre-launch investment opportunity in Prahlad Nagar's premium commercial tower.",
      description:
        "An exclusive pre-launch opportunity to invest in a premium commercial tower in Prahlad Nagar. With assured rental returns and capital appreciation potential, this investment-grade property is ideal for portfolio diversification.\n\nMinimum investment units available with flexible payment plans.",
      propertyType: "Investment",
      category: "investment",
      status: "upcoming",
      price: 12000000,
      priceLabel: "₹1.20 Cr onwards",
      area: 1500,
      configuration: "Commercial Unit",
      possession: "Dec 2027",
      ownership: "Freehold",
      facing: "North",
      propertyId: "MS-2026-1006",
      location: "Prahlad Nagar",
      address: "Investment Tower, Prahlad Nagar, Ahmedabad",
      featured: false,
      published: true,
      highlights: JSON.stringify([
        "Pre-launch pricing",
        "Assured rental returns",
        "Flexible payment plan",
        "Prime location",
        "Grade-A developer",
      ]),
      amenities: JSON.stringify([
        "High-Speed Elevators",
        "Multi-level Parking",
        "Food Court",
        "Business Center",
      ]),
      investmentNotes:
        "Pre-launch commercial investments in Prahlad Nagar historically deliver 25-40% appreciation by possession. Assured rental yield of 8% post-completion.",
      locationAdvantages: JSON.stringify({
        landmarks: ["Prahlad Nagar Garden (3 min)", "SG Highway (2 min)"],
        schools: [],
        hospitals: ["Shalby Hospital"],
        commercial: ["Prahlad Nagar Corporate Hub", "Iscon Mega Mall"],
        lifestyle: ["Dining & Entertainment District"],
      }),
      images: [
        { url: UNSPLASH_IMAGES.investment, alt: "Investment Tower", isPrimary: true, order: 0 },
        { url: UNSPLASH_IMAGES.commercial, alt: "Commercial view", order: 1 },
      ],
    },
  ];

  for (const prop of properties) {
    const { images, ...data } = prop;
    await prisma.property.upsert({
      where: { slug: prop.slug },
      update: {},
      create: {
        ...data,
        images: { create: images },
      },
    });
  }

  const faqs = [
    {
      question: "What services does Makstone Space provide?",
      answer:
        "Makstone Space offers comprehensive real-estate consultancy including property acquisition advisory, investment consulting, market analysis, site visit coordination, negotiation support, and documentation assistance for residential, commercial, and investment properties.",
      category: "general",
      order: 1,
    },
    {
      question: "How is Makstone Space different from a typical broker?",
      answer:
        "We position ourselves as trusted advisors rather than transactional brokers. Our approach focuses on understanding your goals, providing market intelligence, and guiding you toward intelligent real-estate decisions. Every recommendation is personalized and backed by deep local market expertise.",
      category: "general",
      order: 2,
    },
    {
      question: "What areas do you specialize in?",
      answer:
        "We specialize in premium properties across Ahmedabad and Gujarat, including Navrangpura, Bodakdev, SG Highway, Prahlad Nagar, Sanand, and emerging investment corridors like Dholera SIR.",
      category: "general",
      order: 3,
    },
    {
      question: "How do I schedule a consultation?",
      answer:
        "You can schedule a consultation by calling us at +91 95370 07777, emailing maulikpatel141977@gmail.com, or filling out the consultation form on our contact page. We typically respond within 24 hours.",
      category: "consultation",
      order: 1,
    },
    {
      question: "Is the initial consultation free?",
      answer:
        "Yes, we offer a complimentary initial consultation to understand your requirements and discuss how we can assist with your real-estate goals.",
      category: "consultation",
      order: 2,
    },
    {
      question: "What should I prepare for a consultation?",
      answer:
        "It's helpful to have a general idea of your budget, preferred locations, property type, and timeline. However, our consultant will guide you through the process even if you're at the early exploration stage.",
      category: "consultation",
      order: 3,
    },
    {
      question: "What documents are required for property purchase?",
      answer:
        "Typically, you'll need identity proof (Aadhaar/PAN), address proof, income documents, bank statements, and photographs. For specific properties, additional documents may be required. We provide complete documentation guidance throughout the process.",
      category: "documentation",
      order: 1,
    },
    {
      question: "Do you assist with home loans?",
      answer:
        "Yes, we work with leading banks and financial institutions to help you secure the best home loan options. We guide you through the application process and documentation requirements.",
      category: "buying",
      order: 1,
    },
    {
      question: "What is the typical property buying process?",
      answer:
        "Our process includes discovery, consultation, property selection, site visits, negotiation, documentation, and closure — with post-sale support. The entire journey is guided by our principal consultant.",
      category: "buying",
      order: 2,
    },
    {
      question: "Is real estate a good investment in Ahmedabad?",
      answer:
        "Ahmedabad has consistently shown strong real-estate growth driven by infrastructure development, industrial growth, and increasing demand for premium housing. Specific returns vary by location and property type — we provide detailed market analysis for informed decisions.",
      category: "investment",
      order: 1,
    },
  ];

  for (const faq of faqs) {
    await prisma.faq.create({ data: faq });
  }

  const testimonials = [
    {
      name: "Rajesh & Priya Shah",
      role: "Residential Buyers, Navrangpura",
      content:
        "Maulik's guidance was invaluable in finding our dream home. His market knowledge and negotiation skills saved us significant time and money. We felt genuinely cared for throughout the entire process.",
      rating: 5,
      order: 1,
    },
    {
      name: "Amit Mehta",
      role: "Commercial Investor",
      content:
        "As a first-time commercial property investor, I needed someone I could trust. Makstone Space provided thorough market analysis and helped me secure a property with excellent rental yields.",
      rating: 5,
      order: 2,
    },
    {
      name: "Dr. Kavita Desai",
      role: "Weekend Home Buyer",
      content:
        "The personalized approach made all the difference. From understanding our lifestyle needs to coordinating site visits, every step was handled with professionalism and warmth.",
      rating: 5,
      order: 3,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  const siteContent = [
    { key: "hero_headline", value: "Where Vision Meets Exceptional Real Estate" },
    { key: "hero_subheadline", value: "Premium consultancy for discerning property investors and homeowners in Ahmedabad & beyond." },
    { key: "intro_title", value: "Advisory Excellence in Real Estate" },
    { key: "intro_text", value: "Makstone Space is a boutique real-estate consultancy founded on the principles of trust, expertise, and personalized service. We don't just show properties — we guide you toward intelligent decisions that align with your lifestyle aspirations and investment goals." },
    { key: "about_story", value: "Founded by Maulik Patel, Makstone Space was born from a vision to elevate real-estate consultancy in Ahmedabad. With decades of combined market experience, we bridge the gap between property listings and intelligent investment decisions." },
    { key: "founder_message", value: "Real estate is not merely a transaction — it is one of the most significant decisions in a person's life. At Makstone Space, I personally ensure that every client receives honest advice, thorough market analysis, and unwavering support from discovery to closure and beyond." },
    { key: "vision", value: "To be Ahmedabad's most trusted name in premium real-estate advisory, setting the standard for integrity, expertise, and client success." },
    { key: "mission", value: "To empower clients with knowledge, curated opportunities, and personalized guidance that transforms real-estate decisions into lasting value." },
  ];

  for (const content of siteContent) {
    await prisma.siteContent.upsert({
      where: { key: content.key },
      update: { value: content.value },
      create: content,
    });
  }

  console.log("Seed completed successfully");
  console.log("Admin login: admin@makstonespace.com / admin123");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
