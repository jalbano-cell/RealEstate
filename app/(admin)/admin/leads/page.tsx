export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { getLeads } from "@/services/lead.service";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { LeadStatusSelect } from "@/components/admin/lead-status-select";
import { Mail, Phone } from "lucide-react";

export const metadata: Metadata = { title: "Leads | Admin" };

interface PageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function AdminLeadsPage({ searchParams }: PageProps) {
  const { search } = await searchParams;
  const leads = await getLeads(search);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Leads</h1>
          <p className="text-sm text-neutral-500 mt-1">{leads.length} total</p>
        </div>
        <form method="GET" className="flex gap-2">
          <input
            name="search"
            defaultValue={search}
            placeholder="Search by name or email…"
            className="h-9 px-3 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 w-56"
          />
          <button
            type="submit"
            className="h-9 px-4 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        {leads.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-neutral-400">No leads found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Contact</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Property Interest</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Message</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Source</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Date</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium text-neutral-900">{lead.name}</p>
                      <div className="flex flex-col gap-0.5 mt-1">
                        <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-xs text-neutral-500 hover:text-amber-600">
                          <Mail className="h-3 w-3" />
                          {lead.email}
                        </a>
                        {lead.phone && (
                          <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-xs text-neutral-500 hover:text-amber-600">
                            <Phone className="h-3 w-3" />
                            {lead.phone}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-neutral-600 text-xs max-w-[160px]">
                      <p className="line-clamp-2">{lead.propertyInterest ?? lead.property?.title ?? "—"}</p>
                    </td>
                    <td className="px-5 py-4 text-neutral-500 text-xs max-w-[200px]">
                      <p className="line-clamp-2">{lead.message ?? "—"}</p>
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant="secondary">{lead.source}</Badge>
                    </td>
                    <td className="px-5 py-4 text-neutral-400 text-xs">{formatDate(lead.createdAt)}</td>
                    <td className="px-5 py-4">
                      <LeadStatusSelect id={lead.id} current={lead.status} />
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
