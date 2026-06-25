import { z } from "zod";

export const agentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  title: z.string().min(2, "Title is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  bio: z.string().min(20, "Bio must be at least 20 characters"),
  photo: z.string().url().optional().or(z.literal("")),
  areasServed: z.array(z.string()).optional(),
  licenseNo: z.string().optional(),
});

export type AgentFormData = z.infer<typeof agentSchema>;
