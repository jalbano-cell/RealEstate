import { prisma } from "@/lib/prisma";
import type { PropertyFilters, PaginatedResult, PropertyWithImages, PropertyWithDetails } from "@/types";
import type { Prisma } from "@/app/generated/prisma/client";

export async function findProperties(
  filters: PropertyFilters = {}
): Promise<PaginatedResult<PropertyWithImages>> {
  const {
    city,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    propertyType,
    listingType,
    page = 1,
    limit = 12,
    sort = "newest",
  } = filters;

  const where: Prisma.PropertyWhereInput = {
    status: "ACTIVE",
    ...(city && { city: { contains: city, mode: "insensitive" } }),
    ...(minPrice && { price: { gte: minPrice } }),
    ...(maxPrice && { price: { lte: maxPrice } }),
    ...(bedrooms && { bedrooms: { gte: bedrooms } }),
    ...(bathrooms && { bathrooms: { gte: bathrooms } }),
    ...(propertyType && { propertyType }),
    ...(listingType && { listingType }),
  };

  const orderBy: Prisma.PropertyOrderByWithRelationInput =
    sort === "price_asc"
      ? { price: "asc" }
      : sort === "price_desc"
        ? { price: "desc" }
        : sort === "oldest"
          ? { createdAt: "asc" }
          : { createdAt: "desc" };

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.property.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        images: { orderBy: { order: "asc" } },
      },
    }),
    prisma.property.count({ where }),
  ]);

  return {
    data: data as PropertyWithImages[],
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function findFeaturedProperties(limit = 6): Promise<PropertyWithImages[]> {
  const properties = await prisma.property.findMany({
    where: { featured: true, status: "ACTIVE" },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { images: { orderBy: { order: "asc" } } },
  });
  return properties as PropertyWithImages[];
}

export async function findPropertyBySlug(slug: string): Promise<PropertyWithDetails | null> {
  const property = await prisma.property.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { order: "asc" } },
      agent: true,
    },
  });
  return property as PropertyWithDetails | null;
}

export async function findPropertyById(id: string): Promise<PropertyWithDetails | null> {
  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      images: { orderBy: { order: "asc" } },
      agent: true,
    },
  });
  return property as PropertyWithDetails | null;
}

export async function countProperties(): Promise<number> {
  return prisma.property.count({ where: { status: "ACTIVE" } });
}

export async function getDistinctCities(): Promise<string[]> {
  const results = await prisma.property.findMany({
    where: { status: "ACTIVE" },
    select: { city: true },
    distinct: ["city"],
    orderBy: { city: "asc" },
  });
  return results.map((r) => r.city);
}

export async function createProperty(data: Prisma.PropertyCreateInput) {
  return prisma.property.create({ data, include: { images: true, agent: true } });
}

export async function updateProperty(id: string, data: Prisma.PropertyUpdateInput) {
  return prisma.property.update({ where: { id }, data });
}

export async function deleteProperty(id: string) {
  return prisma.property.delete({ where: { id } });
}

export async function getAllPropertiesAdmin() {
  return prisma.property.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      agent: { select: { name: true } },
      _count: { select: { leads: true } },
    },
  });
}
