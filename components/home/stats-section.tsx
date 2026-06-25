import { TrendingUp, Users, Home, Award } from "lucide-react";

const stats = [
  { icon: Home, value: "500+", label: "Active Listings", description: "Properties across the GTA" },
  { icon: Users, value: "1,200+", label: "Satisfied Clients", description: "Happy families & investors" },
  { icon: TrendingUp, value: "$2.4B+", label: "Sales Volume", description: "Transacted in the last 5 years" },
  { icon: Award, value: "15+", label: "Years of Excellence", description: "Serving Toronto since 2009" },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-600/20 mb-4">
                  <Icon className="h-6 w-6 text-amber-400" />
                </div>
                <p className="text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</p>
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
