import { prisma } from "@/lib/prisma";
import type { AgentWithProperties } from "@/types";
import type { Prisma } from "@/app/generated/prisma/client";

export async function findAllAgents(): Promise<AgentWithProperties[]> {
  const agents = await prisma.agent.findMany({
    orderBy: { name: "asc" },
    include: {
      properties: {
        where: { status: "ACTIVE" },
        include: { images: { where: { isPrimary: true }, take: 1 } },
        take: 3,
      },
      _count: { select: { properties: true } },
    },
  });
  return agents as AgentWithProperties[];
}

export async function findAgentById(id: string) {
  return prisma.agent.findUnique({
    where: { id },
    include: {
      properties: {
        where: { status: "ACTIVE" },
        include: { images: { where: { isPrimary: true }, take: 1 } },
      },
      _count: { select: { properties: true } },
    },
  });
}

export async function countAgents(): Promise<number> {
  return prisma.agent.count();
}

export async function createAgent(data: Prisma.AgentCreateInput) {
  return prisma.agent.create({ data });
}

export async function updateAgent(id: string, data: Prisma.AgentUpdateInput) {
  return prisma.agent.update({ where: { id }, data });
}

export async function deleteAgent(id: string) {
  return prisma.agent.delete({ where: { id } });
}

export async function getAllAgentsForSelect() {
  return prisma.agent.findMany({
    select: { id: true, name: true, title: true },
    orderBy: { name: "asc" },
  });
}
