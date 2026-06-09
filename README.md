# Makstone Space

Premium real-estate consultancy and investment advisory website with admin management portal.

## Features

### Public Website
- Premium, editorial design with luxury typography and spacing
- Homepage with hero, featured properties, categories, testimonials, FAQ, and CTAs
- Property listing with search and filters
- Immersive property detail pages with gallery, investment perspective, and inquiry forms
- About, FAQ, and Contact pages
- Full SEO: metadata, Open Graph, JSON-LD structured data, sitemap, robots.txt

### Admin Portal (`/admin`)
- Dashboard with property and inquiry statistics
- Property management (CRUD, gallery, SEO, publishing)
- Inquiry management with status tracking and notes
- Invoice generation with print and PDF export
- Content management for homepage and about page

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Run database migrations
npm run db:migrate

# Seed sample data
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site.

Admin login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Email: `admin@makstonespace.com`
- Password: `admin123`

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | SQLite connection string (use PostgreSQL in production) |
| `AUTH_SECRET` | NextAuth secret key |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for SEO and sitemap |
| `CLOUDINARY_*` | Optional cloud image storage |

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **Prisma** (SQLite dev / PostgreSQL production)
- **NextAuth.js v5**
- **Cloudinary** (optional image storage)

## Production Deployment

1. Switch `DATABASE_URL` to PostgreSQL
2. Set a strong `AUTH_SECRET`
3. Configure Cloudinary for image storage
4. Set `NEXT_PUBLIC_SITE_URL` to your domain
5. Run `npm run build && npm start`
