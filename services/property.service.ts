import {
  findProperties,
  findFeaturedProperties,
  findPropertyBySlug,
  findPropertyById,
  countProperties,
  getDistinctCities,
  createProperty,
  updateProperty,
  deleteProperty,
  getAllPropertiesAdmin,
} from "@/repositories/property.repository";
import { slugify } from "@/lib/utils";
import type { PropertyFilters } from "@/types";
import type { Prisma } from "@/app/generated/prisma/client";
import type { PropertyFormData } from "@/lib/validations/property";

export async function getProperties(filters: PropertyFilters) {
  return findProperties(filters);
}

export async function getFeaturedProperties(limit?: number) {
  return findFeaturedProperties(limit);
}

export async function getPropertyBySlug(slug: string) {
  return findPropertyBySlug(slug);
}

export async function getPropertyById(id: string) {
  return findPropertyById(id);
}

export async function getPropertyStats() {
  const [total, cities] = await Promise.all([countProperties(), getDistinctCities()]);
  return { total, cities };
}

export async function createNewProperty(data: PropertyFormData, imageUrls: string[]) {
  const slug = slugify(data.title);

  const propertyData: Prisma.PropertyCreateInput = {
    slug,
    title: data.title,
    description: data.description,
    price: data.price,
    listingType: data.listingType,
    status: data.status,
    propertyType: data.propertyType,
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    squareFeet: data.squareFeet,
    lotSize: data.lotSize,
    yearBuilt: data.yearBuilt,
    address: data.address,
    city: data.city,
    province: data.province,
    postalCode: data.postalCode,
    featured: data.featured,
    amenities: data.amenities,
    agent: { connect: { id: data.agentId } },
    images: {
      create: imageUrls.map((url, i) => ({
        url,
        isPrimary: i === 0,
        order: i,
      })),
    },
  };

  return createProperty(propertyData);
}

export async function updateExistingProperty(id: string, data: Partial<PropertyFormData>) {
  const updateData: Prisma.PropertyUpdateInput = { ...data };
  if (data.agentId) {
    updateData.agent = { connect: { id: data.agentId } };
    delete (updateData as Record<string, unknown>).agentId;
  }
  return updateProperty(id, updateData);
}

export async function removeProperty(id: string) {
  return deleteProperty(id);
}

export async function getAdminProperties() {
  return getAllPropertiesAdmin();
}
