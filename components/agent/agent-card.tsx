import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AgentWithProperties } from "@/types";

interface AgentCardProps {
  agent: AgentWithProperties;
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-lg hover:border-neutral-300 transition-all duration-300 hover:-translate-y-0.5">
      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center mb-4 overflow-hidden shrink-0 ring-2 ring-white shadow-md">
        {agent.photo ? (
          <Image
            src={agent.photo}
            alt={agent.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <span className="text-2xl font-bold text-amber-700">{agent.name.charAt(0)}</span>
        )}
      </div>

      <h3 className="font-semibold text-neutral-900 text-base mb-0.5">{agent.name}</h3>
      <p className="text-xs text-amber-600 font-semibold uppercase tracking-widest mb-3">{agent.title}</p>

      {agent.areasServed.length > 0 && (
        <div className="flex items-center gap-1 text-xs text-neutral-400 mb-4">
          <MapPin className="h-3 w-3" />
          <span>{agent.areasServed.slice(0, 2).join(", ")}</span>
        </div>
      )}

      <p className="text-sm text-neutral-500 leading-relaxed mb-4 line-clamp-3">{agent.bio}</p>

      <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-100 rounded-full px-3 py-1 text-xs text-amber-700 font-medium mb-5">
        <span className="font-bold">{agent._count.properties}</span>
        active {agent._count.properties === 1 ? "listing" : "listings"}
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
