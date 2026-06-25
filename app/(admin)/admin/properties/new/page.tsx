export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { getAgentsForSelect } from "@/services/agent.service";
import { PropertyForm } from "@/components/admin/property-form";

export const metadata: Metadata = { title: "Add Property | Admin" };

export default async function NewPropertyPage() {
  const agents = await getAgentsForSelect();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Add New Property</h1>
      </div>
      <div className="max-w-3xl">
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-8">
          <PropertyForm agents={agents} />
        </div>
      </div>
    </div>
  );
}
