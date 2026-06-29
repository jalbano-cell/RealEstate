import { TrendingUp, Users, Home, Award } from "lucide-react";

const stats = [
  { icon: Home, value: "500+", label: "Active Listings", description: "Properties across the GTA" },
  { icon: Users, value: "1,200+", label: "Satisfied Clients", description: "Happy families & investors" },
  { icon: TrendingUp, value: "$2.4B+", label: "Sales Volume", description: "Transacted in the last 5 years" },
  { icon: Award, value: "15+", label: "Years of Excellence", description: "Serving Toronto since 2009" },
];

export function StatsSection() {
  return (
    <section className="bg-neutral-950 border-t border-amber-600/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gap-px + bg trick creates 1px dividers between grid cells */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-800/60">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-neutral-950 text-center py-12 px-6">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-amber-600/10 border border-amber-600/20 mb-4">
                  <Icon className="h-5 w-5 text-amber-400" />
                </div>
                <p className="text-3xl lg:text-4xl font-bold text-white mb-1 tabular-nums">{stat.value}</p>
                <p className="text-sm font-medium text-neutral-300 mb-1">{stat.label}</p>
                <p className="text-xs text-neutral-500">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
