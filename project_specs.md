# project_specs.md

## Project Overview

**Application:** Premium Real Estate Agency Website & Lead Generation Platform
**Target Users:** Home buyers, home sellers, property renters, and investors seeking premium real estate services
**Core Business Goal:** Generate qualified leads through property discovery, agent engagement, and consultation booking. Every page drives users toward a conversion action.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | Next.js 15+ (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Component Library | shadcn/ui |
| Backend | Next.js API Routes + Server Actions |
| ORM | Prisma |
| Database | PostgreSQL |
| Validation | Zod + React Hook Form |
| Auth (Admin) | NextAuth.js v5 (Credentials provider) |
| Image Handling | Next.js Image + Cloudinary (or local uploads) |
| Deployment | Vercel |
| Email | Resend (lead notification emails) |

---

## Architecture

### Folder Structure

```
/
├── app/
│   ├── (public)/               # Public-facing routes
│   │   ├── page.tsx            # Homepage
│   │   ├── properties/
│   │   │   ├── page.tsx        # Listings page
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Property detail page
│   │   ├── agents/
│   │   │   └── page.tsx        # Agents directory
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   ├── (admin)/                # Protected admin area
│   │   ├── layout.tsx          # Admin shell + auth guard
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── properties/
│   │   │   ├── page.tsx        # List + manage
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/edit/page.tsx
│   │   ├── leads/
│   │   │   └── page.tsx
│   │   └── agents/
│   │       ├── page.tsx
│   │       ├── new/page.tsx
│   │       └── [id]/edit/page.tsx
│   ├── api/
│   │   ├── leads/route.ts
│   │   ├── properties/route.ts
│   │   └── upload/route.ts
│   └── layout.tsx              # Root layout
│
├── components/
│   ├── ui/                     # shadcn/ui primitives
│   ├── layout/                 # Header, Footer, Nav
│   ├── property/               # PropertyCard, PropertyGallery, MortgageCalc, ViewingForm
│   ├── agent/                  # AgentCard, AgentContact
│   ├── home/                   # Hero, FeaturedListings, Stats, Testimonials
│   ├── forms/                  # ContactForm, LeadForm, SearchBar
│   └── admin/                  # Admin-specific components
│
├── lib/
│   ├── prisma.ts               # Prisma client singleton
│   ├── auth.ts                 # NextAuth config
│   ├── validations/            # Zod schemas
│   └── utils.ts
│
├── services/
│   ├── property.service.ts     # Business logic for properties
│   ├── lead.service.ts         # Lead creation, status updates
│   └── agent.service.ts
│
├── repositories/
│   ├── property.repository.ts  # DB queries for properties
│   ├── lead.repository.ts
│   └── agent.repository.ts
│
├── hooks/
│   ├── usePropertySearch.ts
│   └── useMortgageCalculator.ts
│
├── types/
│   └── index.ts                # Shared TypeScript types
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
└── public/
    └── images/
```

### Data Flow

```
UI Component
  → Server Action / API Route
    → Service Layer (business logic)
      → Repository Layer (DB queries via Prisma)
        → PostgreSQL
```

---

## Pages

### Public Pages

| Route | Page | Key Components |
|---|---|---|
| `/` | Homepage | Hero, PropertySearch, FeaturedListings, Stats, Testimonials, AgentSpotlight, LeadCapture, CTA |
| `/properties` | Listings | Filters sidebar, PropertyGrid, Pagination, SortControls |
| `/properties/[slug]` | Property Detail | ImageGallery, Specs, Amenities, MapPlaceholder, MortgageCalc, ViewingForm, AgentCard |
| `/agents` | Agents Directory | AgentCard grid, contact buttons |
| `/about` | About | Story, Team, Awards, Stats |
| `/contact` | Contact | ContactForm, Office info, MapPlaceholder |

### Admin Pages (protected — `/admin/*`)

| Route | Page |
|---|---|
| `/admin/dashboard` | Overview stats |
| `/admin/properties` | List, add, edit, delete properties |
| `/admin/leads` | View leads, update status, search |
| `/admin/agents` | Manage agent profiles |

---

## User Flows

### Lead Generation Flow
1. User arrives on Homepage → sees hero + search bar
2. User searches for properties → Listings page with filters
3. User clicks property → Property Detail page
4. User fills out "Schedule a Viewing" form → Lead created in DB → Email notification sent
5. Admin reviews lead in dashboard → Updates status → Follows up

### Admin Flow
1. Admin navigates to `/admin` → Redirected to login if unauthenticated
2. After login → Dashboard with lead and property stats
3. Admin can CRUD properties, manage leads, manage agents

---

## Data Models

### Prisma Schema

```prisma
model Property {
  id            String          @id @default(cuid())
  slug          String          @unique
  title         String
  description   String
  price         Decimal
  listingType   ListingType     // FOR_SALE | FOR_RENT
  status        PropertyStatus  // ACTIVE | SOLD | RENTED | OFF_MARKET
  propertyType  PropertyType    // HOUSE | CONDO | TOWNHOUSE | LAND | COMMERCIAL
  bedrooms      Int
  bathrooms     Float
  squareFeet    Int?
  lotSize       Float?
  yearBuilt     Int?
  address       String
  city          String
  province      String
  postalCode    String
  latitude      Float?
  longitude     Float?
  featured      Boolean         @default(false)
  amenities     String[]
  images        PropertyImage[]
  leads         Lead[]
  agentId       String
  agent         Agent           @relation(fields: [agentId], references: [id])
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
}

model PropertyImage {
  id         String   @id @default(cuid())
  url        String
  alt        String?
  isPrimary  Boolean  @default(false)
  order      Int      @default(0)
  propertyId String
  property   Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)
}

model Agent {
  id          String     @id @default(cuid())
  name        String
  title       String
  email       String     @unique
  phone       String
  bio         String
  photo       String?
  areasServed String[]
  licenseNo   String?
  properties  Property[]
  leads       Lead[]
  createdAt   DateTime   @default(now())
}

model Lead {
  id               String     @id @default(cuid())
  name             String
  email            String
  phone            String?
  message          String?
  propertyInterest String?
  propertyId       String?
  property         Property?  @relation(fields: [propertyId], references: [id])
  agentId          String?
  agent            Agent?     @relation(fields: [agentId], references: [id])
  status           LeadStatus @default(NEW)
  source           LeadSource @default(WEBSITE)
  createdAt        DateTime   @default(now())
  updatedAt        DateTime   @updatedAt
}

model Testimonial {
  id        String   @id @default(cuid())
  name      String
  role      String?
  content   String
  rating    Int      @default(5)
  photo     String?
  featured  Boolean  @default(false)
  createdAt DateTime @default(now())
}

model AdminUser {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // bcrypt hashed
  name      String
  createdAt DateTime @default(now())
}

enum ListingType    { FOR_SALE FOR_RENT }
enum PropertyStatus { ACTIVE SOLD RENTED OFF_MARKET }
enum PropertyType   { HOUSE CONDO TOWNHOUSE LAND COMMERCIAL }
enum LeadStatus     { NEW CONTACTED QUALIFIED VIEWING_SCHEDULED CLOSED }
enum LeadSource     { WEBSITE REFERRAL PHONE SOCIAL }
```

---

## APIs

### Public API Routes

| Method | Route | Description |
|---|---|---|
| GET | `/api/properties` | Fetch properties with filters + pagination |
| GET | `/api/properties/[slug]` | Fetch single property |
| POST | `/api/leads` | Submit a new lead |

### Admin API Routes (authenticated)

| Method | Route | Description |
|---|---|---|
| GET/POST | `/api/admin/properties` | List / create properties |
| PUT/DELETE | `/api/admin/properties/[id]` | Update / delete property |
| GET/PUT | `/api/admin/leads` | List leads / update status |
| GET/POST | `/api/admin/agents` | List / create agents |
| PUT/DELETE | `/api/admin/agents/[id]` | Update / delete agent |
| POST | `/api/upload` | Handle image uploads |

---

## SEO Strategy

- Dynamic `generateMetadata()` on all pages
- Open Graph tags on all pages
- JSON-LD structured data on property detail pages (`RealEstateListing` schema)
- `/sitemap.xml` — dynamic, generated from DB
- `/robots.txt` — exclude admin routes

---

## Environment Variables

```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
CLOUDINARY_CLOUD_NAME=       # optional — for image uploads
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RESEND_API_KEY=              # for lead notification emails
ADMIN_EMAIL=                 # email to notify on new lead
```

---

## Seed Data

The seed script will create:
- 2 admin users
- 5 agents
- 20 properties (mix of FOR_SALE / FOR_RENT, various types)
- 30 property images
- 10 testimonials
- 10 sample leads in various statuses

---

## Future Expansion

- MLS / IDX feed integration
- Saved properties (user accounts)
- Email drip campaigns for leads
- Virtual tour embedding (Matterport)
- Neighbourhood stats integration
- Multi-language support (EN/FR for Canadian market)
- SMS follow-up via Twilio

---

## Build Order

1. Prisma schema + seed
2. Shared types + validation schemas
3. Repository + service layers
4. Layout: Header, Footer, Nav
5. Homepage
6. Listings page
7. Property detail page
8. Agents page
9. About page
10. Contact page
11. Admin auth (NextAuth)
12. Admin layout + dashboard
13. Admin: Properties CRUD
14. Admin: Leads management
15. Admin: Agents management
16. SEO: metadata, sitemap, robots
17. Final QA: lint, build, accessibility
