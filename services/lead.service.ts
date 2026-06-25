import {
  createLead,
  findAllLeads,
  updateLeadStatus,
  countLeads,
  countLeadsByStatus,
  countNewLeads,
} from "@/repositories/lead.repository";
import type { LeadFormData } from "@/lib/validations/lead";
import type { Prisma } from "@/app/generated/prisma/client";

export async function submitLead(data: LeadFormData) {
  const leadData: Prisma.LeadCreateInput = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
    propertyInterest: data.propertyInterest,
    source: "WEBSITE",
    ...(data.propertyId && { property: { connect: { id: data.propertyId } } }),
    ...(data.agentId && { agent: { connect: { id: data.agentId } } }),
  };

  return createLead(leadData);
}

export async function getLeads(search?: string) {
  return findAllLeads(search);
}

export async function changeLeadStatus(id: string, status: string) {
  return updateLeadStatus(id, status as Prisma.LeadUpdateInput["status"]);
}

export async function getLeadStats() {
  const [total, byStatus, newCount] = await Promise.all([
    countLeads(),
    countLeadsByStatus(),
    countNewLeads(),
  ]);
  return { total, byStatus, newCount };
}
