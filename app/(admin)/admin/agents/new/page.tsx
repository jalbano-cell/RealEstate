import type { Metadata } from "next";
import { AgentForm } from "@/components/admin/agent-form";

export const metadata: Metadata = { title: "Add Agent | Admin" };

export default function NewAgentPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Add New Agent</h1>
      </div>
      <div className="max-w-2xl">
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-8">
          <AgentForm />
        </div>
      </div>
    </div>
  );
}
