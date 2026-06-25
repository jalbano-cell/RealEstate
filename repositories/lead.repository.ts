import { prisma } from "@/lib/prisma";
import type { LeadWithRelations } from "@/types";
import type { Prisma } from "@/app/generated/prisma/client";

export async function createLead(data: Prisma.LeadCreateInput): Promise<LeadWithRelations> {
  const lead = await prisma.lead.create({
    data,
    include: { property: true, agent: true },
  });
  return lead as LeadWithRelations;
}

export async function findAllLeads(search?: string): Promise<LeadWithRelations[]> {
  const where: Prisma.LeadWhereInput = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { phone: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { property: true, agent: true },
  });
  return leads as LeadWithRelations[];
}

export async function updateLeadStatus(id: string, status: Prisma.LeadUpdateInput["status"]) {
  return prisma.lead.update({ where: { id }, data: { status } });
}

export async function countLeads() {
  return prisma.lead.count();
}

export async function countLeadsByStatus() {
  return prisma.lead.groupBy({
    by: ["status"],
    _count: { status: true },
  });
}

export async function countNewLeads() {
  return prisma.lead.count({ where: { status: "NEW" } });
}
