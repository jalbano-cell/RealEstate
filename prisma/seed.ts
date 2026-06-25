import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const agents = [
  {
    name: "James Hartley",
    title: "Principal Broker & Founder",
    email: "james@primerealty.ca",
    phone: "(416) 555-0201",
    bio: "James founded PrimeRealty in 2009 with a vision to deliver unmatched client experiences. With over 15 years in Toronto real estate, he has closed more than $400M in transactions and earned TREB's Top Producer award seven years running.",
    areasServed: ["Toronto", "North York", "Etobicoke"],
    licenseNo: "4512890",
  },
  {
    name: "Sofia Chen",
    title: "Co-Founder & Luxury Specialist",
    email: "sofia@primerealty.ca",
    phone: "(416) 555-0202",
    bio: "Sofia specializes in luxury residential and pre-construction properties across Rosedale, Forest Hill, and Yorkville. Her architectural background gives her clients a unique advantage when evaluating design and renovation potential.",
    areasServed: ["Rosedale", "Forest Hill", "Yorkville", "Midtown"],
    licenseNo: "4512891",
  },
  {
    name: "Marcus Webb",
    title: "Investment Properties Specialist",
    email: "marcus@primerealty.ca",
    phone: "(416) 555-0203",
    bio: "Marcus has helped over 200 investors build profitable real estate portfolios in the GTA. He focuses on multi-unit residential, commercial conversions, and high-cap-rate rental properties.",
    areasServed: ["Scarborough", "East York", "Pickering"],
    licenseNo: "4512892",
  },
  {
    name: "Priya Sharma",
    title: "First-Time Buyer Specialist",
    email: "priya@primerealty.ca",
    phone: "(416) 555-0204",
    bio: "Priya is passionate about helping first-time buyers navigate the market with confidence. She walks every client through financing, inspections, and negotiations with patience and clarity.",
    areasServed: ["Mississauga", "Brampton", "Oakville"],
    licenseNo: "4512893",
  },
  {
    name: "David Okafor",
    title: "Condo Market Expert",
    email: "david@primerealty.ca",
    phone: "(416) 555-0205",
    bio: "David is Toronto's go-to agent for condo buyers and sellers. He tracks every new development and resale opportunity from the Waterfront to Liberty Village to King West.",
    areasServed: ["Downtown Toronto", "Waterfront", "Liberty Village", "King West"],
    licenseNo: "4512894",
  },
];

const propertyTemplates = [
  {
    title: "Stunning 4-Bedroom Detached Home in Rosedale",
    description: "An exceptional family home in one of Toronto's most prestigious neighbourhoods. This beautifully renovated property features an open-concept main floor, chef's kitchen with marble countertops, and a landscaped backyard oasis. Located steps from Craigleigh Gardens Park and top-rated schools.",
    price: 3200000,
    listingType: "FOR_SALE" as const,
    propertyType: "HOUSE" as const,
    bedrooms: 4,
    bathrooms: 3.5,
    squareFeet: 3200,
    yearBuilt: 1940,
    address: "42 Elm Avenue",
    city: "Toronto",
    province: "ON",
    postalCode: "M4W 1N5",
    featured: true,
    amenities: ["Garage", "Backyard", "Fireplace", "Hardwood Floors", "Central Air", "Chef's Kitchen", "Finished Basement"],
    images: [
      { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80", alt: "Front exterior", isPrimary: true, order: 0 },
      { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80", alt: "Living room", isPrimary: false, order: 1 },
      { url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80", alt: "Kitchen", isPrimary: false, order: 2 },
    ],
  },
  {
    title: "Modern 2-Bed + Den Condo at Waterfront",
    description: "Wake up to stunning lake views from this bright, south-facing condo at Toronto's premier Waterfront community. Floor-to-ceiling windows, engineered hardwood, and a gourmet kitchen make this unit feel like a luxury hotel year-round.",
    price: 1150000,
    listingType: "FOR_SALE" as const,
    propertyType: "CONDO" as const,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 980,
    yearBuilt: 2019,
    address: "15 Queens Quay E, Unit 1802",
    city: "Toronto",
    province: "ON",
    postalCode: "M5E 0C5",
    featured: true,
    amenities: ["Concierge", "Gym", "Rooftop Terrace", "Lake Views", "Underground Parking", "Locker", "Pet-Friendly"],
    images: [
      { url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80", alt: "Condo exterior", isPrimary: true, order: 0 },
      { url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80", alt: "Living area", isPrimary: false, order: 1 },
    ],
  },
  {
    title: "Spacious 3-Bed Townhouse in Leslieville",
    description: "A rarely offered freehold townhouse in the heart of Leslieville. Recently updated with a new kitchen, spa-inspired bathrooms, and a private rooftop deck. Walk to Queen Street cafes, parks, and the TTC.",
    price: 1580000,
    listingType: "FOR_SALE" as const,
    propertyType: "TOWNHOUSE" as const,
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 1750,
    yearBuilt: 2005,
    address: "88 Carlaw Avenue",
    city: "Toronto",
    province: "ON",
    postalCode: "M4M 2R7",
    featured: true,
    amenities: ["Rooftop Deck", "Private Garage", "Modern Kitchen", "Two-Car Parking"],
    images: [
      { url: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=80", alt: "Townhouse", isPrimary: true, order: 0 },
    ],
  },
  {
    title: "Luxury 1-Bed Condo for Rent — King West",
    description: "Live in style at one of King West's most sought-after addresses. This professionally designed suite features exposed concrete, polished concrete floors, and a chef-grade kitchen. All-inclusive building amenities included.",
    price: 2800,
    listingType: "FOR_RENT" as const,
    propertyType: "CONDO" as const,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 620,
    yearBuilt: 2021,
    address: "550 Wellington Street W, Unit 410",
    city: "Toronto",
    province: "ON",
    postalCode: "M5V 2V4",
    featured: true,
    amenities: ["Concierge", "Co-Working Space", "Gym", "Party Room", "Pet-Friendly", "Bike Storage"],
    images: [
      { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80", alt: "Condo interior", isPrimary: true, order: 0 },
    ],
  },
  {
    title: "Classic 5-Bed Home in Forest Hill",
    description: "A timeless Georgian-style home on a quiet, tree-lined street in Forest Hill South. Grand principal rooms, original architectural details, and a chef's kitchen make this property a rare opportunity for discerning buyers.",
    price: 5800000,
    listingType: "FOR_SALE" as const,
    propertyType: "HOUSE" as const,
    bedrooms: 5,
    bathrooms: 4,
    squareFeet: 4500,
    yearBuilt: 1935,
    address: "7 Dunvegan Road",
    city: "Toronto",
    province: "ON",
    postalCode: "M5P 2P3",
    featured: false,
    amenities: ["Three-Car Garage", "Wine Cellar", "Library", "Formal Dining Room", "Nanny Suite", "Garden"],
    images: [
      { url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80", alt: "Forest Hill home", isPrimary: true, order: 0 },
    ],
  },
  {
    title: "Investment Triplex in East York",
    description: "A turn-key triplex with three self-contained units, all currently tenanted. Strong cap rate and significant upside through a planned rezoning. Fully renovated in 2022 with new roof, HVAC, and electrical.",
    price: 2100000,
    listingType: "FOR_SALE" as const,
    propertyType: "HOUSE" as const,
    bedrooms: 6,
    bathrooms: 3,
    squareFeet: 2800,
    yearBuilt: 1955,
    address: "124 Cosburn Avenue",
    city: "Toronto",
    province: "ON",
    postalCode: "M4J 2N1",
    featured: false,
    amenities: ["Three Units", "Three Hydro Meters", "Laneway Access", "Large Lot"],
    images: [
      { url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80", alt: "Triplex exterior", isPrimary: true, order: 0 },
    ],
  },
  {
    title: "Bright 2-Bed Condo for Rent — Midtown",
    description: "Spacious and sun-drenched, this Midtown rental is steps from Yonge & Eglinton's restaurants, shops, and the new LRT. In-suite laundry, parking, and a large private balcony included.",
    price: 3400,
    listingType: "FOR_RENT" as const,
    propertyType: "CONDO" as const,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 890,
    yearBuilt: 2017,
    address: "33 Heather Street, Suite 505",
    city: "Toronto",
    province: "ON",
    postalCode: "M4G 3J1",
    featured: false,
    amenities: ["Parking Included", "In-Suite Laundry", "Private Balcony", "Gym", "Guest Suite"],
    images: [
      { url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80", alt: "Midtown condo", isPrimary: true, order: 0 },
    ],
  },
  {
    title: "Executive 4-Bed Home in Mississauga",
    description: "A magnificent executive home in the prestigious Churchill Meadows neighbourhood. Soaring ceilings, a double-height foyer, and a custom kitchen with quartz island are just a few of the standout features. Close to top schools and Hwy 403.",
    price: 1850000,
    listingType: "FOR_SALE" as const,
    propertyType: "HOUSE" as const,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 3000,
    yearBuilt: 2010,
    address: "1024 Churchill Meadows Blvd",
    city: "Mississauga",
    province: "ON",
    postalCode: "L5M 7A1",
    featured: false,
    amenities: ["Double Garage", "Smart Home", "Main Floor Office", "Backyard Pool", "Central Vacuum"],
    images: [
      { url: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=80", alt: "Mississauga home", isPrimary: true, order: 0 },
    ],
  },
  {
    title: "New Build Semi-Detached in Vaughan",
    description: "Brand new never-lived-in semi-detached home by Fieldgate Homes in Vaughan's most desirable master-planned community. Tarion-warranted, 9-ft ceilings, and premium finishes throughout.",
    price: 1290000,
    listingType: "FOR_SALE" as const,
    propertyType: "HOUSE" as const,
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 1900,
    yearBuilt: 2024,
    address: "45 Vellore Village Blvd",
    city: "Vaughan",
    province: "ON",
    postalCode: "L4H 4G1",
    featured: false,
    amenities: ["Tarion Warranty", "9-ft Ceilings", "Quartz Counters", "EV Charger Rough-In"],
    images: [
      { url: "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=1200&q=80", alt: "New build home", isPrimary: true, order: 0 },
    ],
  },
  {
    title: "Studio Condo for Rent — Downtown Core",
    description: "An efficiently designed studio in the heart of the Financial District. Floor-to-ceiling windows, built-in storage, and a fully equipped kitchen. Walk to Union Station, PATH, and all major banks.",
    price: 1950,
    listingType: "FOR_RENT" as const,
    propertyType: "CONDO" as const,
    bedrooms: 0,
    bathrooms: 1,
    squareFeet: 420,
    yearBuilt: 2022,
    address: "20 Bay Street, Unit 1201",
    city: "Toronto",
    province: "ON",
    postalCode: "M5J 2W3",
    featured: false,
    amenities: ["Gym", "Rooftop Lounge", "24/7 Concierge", "Bike Storage"],
    images: [
      { url: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200&q=80", alt: "Downtown studio", isPrimary: true, order: 0 },
    ],
  },
];

const testimonials = [
  {
    name: "Jennifer & Mark Torres",
    role: "First-Time Buyers, Leslieville",
    content: "James and his team made buying our first home completely stress-free. He was patient, knowledgeable, and always available to answer our questions. We can't imagine working with anyone else.",
    rating: 5,
    featured: true,
  },
  {
    name: "Raymond Liu",
    role: "Investor, East York",
    content: "Marcus helped me acquire three income properties in two years. His market knowledge is unmatched — he identified opportunities I would never have found on my own. The ROI has been exceptional.",
    rating: 5,
    featured: true,
  },
  {
    name: "Amanda Forsythe",
    role: "Seller, Forest Hill",
    content: "Sofia listed our home on a Thursday and we had 9 offers by Monday. She achieved 18% over asking. Her staging advice and network of buyers is simply extraordinary.",
    rating: 5,
    featured: true,
  },
  {
    name: "Chen Wei & Li Na",
    role: "Buyers, Vaughan",
    content: "Priya was incredibly patient throughout our search. She showed us dozens of homes, never rushed us, and negotiated hard when we found the one. We got exactly what we wanted at the right price.",
    rating: 5,
    featured: false,
  },
  {
    name: "Patrick O'Brien",
    role: "Renter, King West",
    content: "David found my apartment the same week I reached out. Clean process, no surprises. I've already referred two colleagues to him.",
    rating: 4,
    featured: false,
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.lead.deleteMany();
  await prisma.propertyImage.deleteMany();
  await prisma.property.deleteMany();
  await prisma.agent.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.adminUser.deleteMany();

  const hashedPassword = await bcrypt.hash("admin123", 12);
  await prisma.adminUser.create({
    data: {
      email: "admin@primerealty.ca",
      password: hashedPassword,
      name: "Admin User",
    },
  });
  console.log("✅ Admin user created: admin@primerealty.ca / admin123");

  const createdAgents = await Promise.all(
    agents.map((a) => prisma.agent.create({ data: a }))
  );
  console.log(`✅ ${createdAgents.length} agents created`);

  for (let i = 0; i < propertyTemplates.length; i++) {
    const template = propertyTemplates[i];
    const { images, ...rest } = template;
    const agentIndex = i % createdAgents.length;
    const slug = rest.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    await prisma.property.create({
      data: {
        ...rest,
        slug,
        agentId: createdAgents[agentIndex].id,
        images: { create: images },
      },
    });
  }
  console.log(`✅ ${propertyTemplates.length} properties created`);

  await Promise.all(
    testimonials.map((t) => prisma.testimonial.create({ data: t }))
  );
  console.log(`✅ ${testimonials.length} testimonials created`);

  const properties = await prisma.property.findMany({ take: 5 });
  const sampleLeads = [
    { name: "Emily Carter", email: "emily@example.com", phone: "(647) 555-0301", message: "I would love to schedule a viewing this weekend if possible.", status: "NEW" as const, propertyId: properties[0]?.id, agentId: createdAgents[0].id },
    { name: "Robert Kim", email: "robert@example.com", phone: "(647) 555-0302", message: "Is there flexibility on the price? Very interested.", status: "CONTACTED" as const, propertyId: properties[1]?.id, agentId: createdAgents[1].id },
    { name: "Fatima Al-Rashid", email: "fatima@example.com", message: "Looking for a 3-bed home in Etobicoke under $1.4M.", status: "QUALIFIED" as const, agentId: createdAgents[2].id },
    { name: "Thomas Nguyen", email: "thomas@example.com", phone: "(416) 555-0304", message: "Viewing confirmed for Saturday at 2pm.", status: "VIEWING_SCHEDULED" as const, propertyId: properties[3]?.id, agentId: createdAgents[3].id },
    { name: "Sandra Mills", email: "sandra@example.com", message: "We accepted the offer. Thank you!", status: "CLOSED" as const, propertyId: properties[4]?.id, agentId: createdAgents[0].id },
  ];

  await Promise.all(
    sampleLeads.map((lead) =>
      prisma.lead.create({
        data: {
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          message: lead.message,
          status: lead.status,
          source: "WEBSITE",
          ...(lead.propertyId && { property: { connect: { id: lead.propertyId } } }),
          ...(lead.agentId && { agent: { connect: { id: lead.agentId } } }),
        },
      })
    )
  );
  console.log(`✅ ${sampleLeads.length} sample leads created`);

  console.log("\n🎉 Seed complete!");
  console.log("   Admin login: admin@primerealty.ca / admin123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
