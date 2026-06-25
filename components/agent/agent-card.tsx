import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AgentWithProperties } from "@/types";

interface AgentCardProps {
  agent: AgentWithProperties;
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
      <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mb-4 overflow-hidden shrink-0">
        {agent.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={agent.photo} alt={agent.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-2xl font-bold text-amber-700">{agent.name.charAt(0)}</span>
        )}
      </div>

      <h3 className="font-semibold text-neutral-900 text-lg mb-0.5">{agent.name}</h3>
      <p className="text-sm text-amber-600 font-medium mb-3">{agent.title}</p>

      {agent.areasServed.length > 0 && (
        <div className="flex items-center gap-1 text-xs text-neutral-500 mb-4">
          <MapPin className="h-3 w-3" />
          <span>{agent.areasServed.slice(0, 2).join(", ")}</span>
        </div>
      )}

      <p className="text-sm text-neutral-500 leading-relaxed mb-5 line-clamp-3">{agent.bio}</p>

      <div className="text-sm text-neutral-600 mb-5">
        <span className="font-semibold text-neutral-900">{agent._count.properties}</span>{" "}
        active listings
      </div>

      <div className="flex gap-2 w-full mt-auto">
        <Button asChild variant="outline" size="sm" className="flex-1">
          <a href={`tel:${agent.phone}`}>
            <Phone className="h-3.5 w-3.5" />
            Call
          </a>
        </Button>
        <Button asChild variant="primary" size="sm" className="flex-1">
          <a href={`mailto:${agent.email}`}>
            <Mail className="h-3.5 w-3.5" />
            Email
          </a>
        </Button>
      </div>
    </div>
  );
}
