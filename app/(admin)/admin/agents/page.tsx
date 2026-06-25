export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Pencil, Mail, Phone } from "lucide-react";
import { getAgents } from "@/services/agent.service";
import { Button } from "@/components/ui/button";
import { DeleteAgentButton } from "@/components/admin/delete-agent-button";

export const metadata: Metadata = { title: "Agents | Admin" };

export default async function AdminAgentsPage() {
  const agents = await getAgents();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Agents</h1>
          <p className="text-sm text-neutral-500 mt-1">{agents.length} agents</p>
        </div>
        <Button asChild variant="primary" size="sm">
          <Link href="/admin/agents/new">
            <Plus className="h-4 w-4" />
            Add Agent
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        {agents.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-neutral-400 mb-4">No agents yet.</p>
            <Button asChild variant="primary" size="sm">
              <Link href="/admin/agents/new">Add Your First Agent</Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Agent</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Contact</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Areas</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Listings</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {agents.map((agent) => (
                  <tr key={agent.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                          <span className="text-amber-700 font-bold text-sm">{agent.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900">{agent.name}</p>
                          <p className="text-xs text-neutral-400">{agent.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="space-y-1">
                        <a href={`mailto:${agent.email}`} className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-amber-600">
                          <Mail className="h-3 w-3" />
                          {agent.email}
                        </a>
                        <a href={`tel:${agent.phone}`} className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-amber-600">
                          <Phone className="h-3 w-3" />
                          {agent.phone}
                        </a>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-neutral-600 text-xs">
                      {agent.areasServed.slice(0, 3).join(", ")}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-neutral-700">{agent._count.properties}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Button asChild variant="ghost" size="icon">
                          <Link href={`/admin/agents/${agent.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <DeleteAgentButton id={agent.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
