export const dynamic = "force-dynamic";
import type { Metadata } from "next";
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
        <div className="text-center mb-12">
          <p className="text-amber-600 text-sm font-semibold uppercase tracking-widest mb-2">
            The PrimeRealty Team
          </p>
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Meet Our Agents</h1>
          <p className="text-neutral-500 max-w-xl mx-auto">
            Our agents combine deep local knowledge with proven results to help you buy, sell, or rent with confidence.
          </p>
        </div>

        {agents.length === 0 ? (
          <div className="text-center py-20 text-neutral-400">
            <p>No agents listed yet. Check back soon.</p>
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
