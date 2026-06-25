export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { Home, Users, UserCheck, TrendingUp, Plus, ArrowRight } from "lucide-react";
import { getLeadStats } from "@/services/lead.service";
import { getPropertyStats } from "@/services/property.service";
import { getAgentCount } from "@/services/agent.service";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Dashboard | Admin" };

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  href,
}: {
  icon: typeof Home;
  label: string;
  value: number | string;
  sub?: string;
  href: string;
}) {
  return (
    <Link href={href} className="block group">
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
            <Icon className="h-5 w-5 text-amber-600" />
          </div>
          <ArrowRight className="h-4 w-4 text-neutral-300 group-hover:text-amber-500 transition-colors" />
        </div>
        <p className="text-3xl font-bold text-neutral-900 mb-1">{value}</p>
        <p className="text-sm font-medium text-neutral-500">{label}</p>
        {sub && <p className="text-xs text-neutral-400 mt-0.5">{sub}</p>}
      </div>
    </Link>
  );
}

const leadStatusColors: Record<string, "secondary" | "warning" | "primary" | "success" | "danger"> = {
  NEW: "warning",
  CONTACTED: "secondary",
  QUALIFIED: "primary",
  VIEWING_SCHEDULED: "success",
  CLOSED: "danger",
};

export default async function DashboardPage() {
  const [leadStats, propertyStats, agentCount] = await Promise.all([
    getLeadStats(),
    getPropertyStats(),
    getAgentCount(),
  ]);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-sm text-neutral-500 mt-1">
            {formatDate(new Date())}
          </p>
        </div>
        <Button asChild variant="primary" size="sm">
          <Link href="/admin/properties/new">
            <Plus className="h-4 w-4" />
            Add Property
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatCard
          icon={Home}
          label="Active Properties"
          value={propertyStats.total}
          sub={`${propertyStats.cities.length} cities`}
          href="/admin/properties"
        />
        <StatCard
          icon={Users}
          label="Total Leads"
          value={leadStats.total}
          sub={`${leadStats.newCount} new`}
          href="/admin/leads"
        />
        <StatCard
          icon={UserCheck}
          label="Agents"
          value={agentCount}
          href="/admin/agents"
        />
        <StatCard
          icon={TrendingUp}
          label="New Leads"
          value={leadStats.newCount}
          sub="Requires follow-up"
          href="/admin/leads"
        />
      </div>

      {/* Lead status breakdown */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-neutral-900">Lead Pipeline</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/leads">View all</Link>
          </Button>
        </div>
        <div className="space-y-3">
          {leadStats.byStatus.map((s) => (
            <div key={s.status} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
              <Badge variant={leadStatusColors[s.status] ?? "secondary"}>
                {s.status.replace("_", " ")}
              </Badge>
              <span className="text-sm font-semibold text-neutral-700">
                {s._count.status}
              </span>
            </div>
          ))}
          {leadStats.byStatus.length === 0 && (
            <p className="text-sm text-neutral-400 py-4 text-center">No leads yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
