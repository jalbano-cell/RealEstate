import type {
  Property,
  PropertyImage,
  Agent,
  Lead,
  Testimonial,
  ListingType,
  PropertyStatus,
  PropertyType,
  LeadStatus,
  LeadSource,
} from "@/app/generated/prisma/client";

export type {
  Property,
  PropertyImage,
  Agent,
  Lead,
  Testimonial,
  ListingType,
  PropertyStatus,
  PropertyType,
  LeadStatus,
  LeadSource,
};

export type PropertyWithImages = Property & {
  images: PropertyImage[];
};

export type PropertyWithDetails = Property & {
  images: PropertyImage[];
  agent: Agent;
};

export type AgentWithProperties = Agent & {
  properties: PropertyWithImages[];
  _count: { properties: number };
};

export type LeadWithRelations = Lead & {
  property: Property | null;
  agent: Agent | null;
};

export interface PropertyFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: PropertyType;
  listingType?: ListingType;
  page?: number;
  limit?: number;
  sort?: "price_asc" | "price_desc" | "newest" | "oldest";
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
