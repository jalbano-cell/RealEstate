export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Users } from "lucide-react";
import { getAgents } from "@/services/agent.service";
import { AgentCard } from "@/components/agent/agent-card";

export const metadata: Metadata = {
  title: "Our Agents",
  description: "Meet the PrimeRealty team — experienced real estate professionals serving Toronto and the GTA.",
};

export default async function AgentsPage() {
  const agents = await getAgents().catch(() => []);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 bg-amber-500" />
            <span className="text-amber-600 text-xs font-semibold uppercase tracking-[0.2em]">
              The PrimeRealty Team
            </span>
            <div className="h-px w-8 bg-amber-500" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Meet Our Agents</h1>
          <p className="text-neutral-500 max-w-xl mx-auto text-sm leading-relaxed">
            Our agents combine deep local knowledge with proven results to help you buy, sell, or rent with confidence.
          </p>
        </div>

        {agents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mb-5">
              <Users className="h-8 w-8 text-neutral-300" />
            </div>
            <p className="text-neutral-500 text-sm">No agents listed yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
