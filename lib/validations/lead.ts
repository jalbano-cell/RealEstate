import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").optional(),
  propertyInterest: z.string().optional(),
  propertyId: z.string().optional(),
  agentId: z.string().optional(),
});

export const updateLeadStatusSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "VIEWING_SCHEDULED", "CLOSED"]),
});

export type LeadFormData = z.infer<typeof leadSchema>;
export type UpdateLeadStatusData = z.infer<typeof updateLeadStatusSchema>;
