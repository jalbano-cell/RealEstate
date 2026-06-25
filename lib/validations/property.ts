import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  listingType: z.enum(["FOR_SALE", "FOR_RENT"]),
  status: z.enum(["ACTIVE", "SOLD", "RENTED", "OFF_MARKET"]).optional(),
  propertyType: z.enum(["HOUSE", "CONDO", "TOWNHOUSE", "LAND", "COMMERCIAL"]),
  bedrooms: z.coerce.number().int().min(0),
  bathrooms: z.coerce.number().min(0),
  squareFeet: z.coerce.number().int().positive().optional(),
  lotSize: z.coerce.number().positive().optional(),
  yearBuilt: z.coerce.number().int().min(1800).max(new Date().getFullYear()).optional(),
  address: z.string().min(5),
  city: z.string().min(2),
  province: z.string().min(2),
  postalCode: z.string().min(3),
  featured: z.boolean().optional(),
  amenities: z.array(z.string()).optional(),
  agentId: z.string().min(1, "Agent is required"),
});

export type PropertyFormData = z.infer<typeof propertySchema>;
