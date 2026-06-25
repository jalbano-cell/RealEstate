import {
  findAllAgents,
  findAgentById,
  countAgents,
  createAgent,
  updateAgent,
  deleteAgent,
  getAllAgentsForSelect,
} from "@/repositories/agent.repository";
import type { AgentFormData } from "@/lib/validations/agent";
import type { Prisma } from "@/app/generated/prisma/client";

export async function getAgents() {
  return findAllAgents();
}

export async function getAgent(id: string) {
  return findAgentById(id);
}

export async function getAgentCount() {
  return countAgents();
}

export async function getAgentsForSelect() {
  return getAllAgentsForSelect();
}

export async function createNewAgent(data: AgentFormData) {
  const agentData: Prisma.AgentCreateInput = {
    name: data.name,
    title: data.title,
    email: data.email,
    phone: data.phone,
    bio: data.bio,
    photo: data.photo || null,
    areasServed: data.areasServed,
    licenseNo: data.licenseNo,
  };
  return createAgent(agentData);
}

export async function updateExistingAgent(id: string, data: Partial<AgentFormData>) {
  return updateAgent(id, data as Prisma.AgentUpdateInput);
}

export async function removeAgent(id: string) {
  return deleteAgent(id);
}
