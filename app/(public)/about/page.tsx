import type { Metadata } from "next";
import { Award, TrendingUp, Users, Home, Shield, Star, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about PrimeRealty — Toronto's most trusted real estate brokerage since 2009.",
};

const stats = [
  { icon: Home, value: "500+", label: "Properties Sold" },
  { icon: Users, value: "1,200+", label: "Happy Clients" },
  { icon: TrendingUp, value: "$2.4B+", label: "Sales Volume" },
  { icon: Award, value: "15+", label: "Industry Awards" },
];

const values = [
  {
    icon: Shield,
    title: "Integrity First",
    description: "We operate with full transparency. No hidden fees, no pressure tactics — just honest advice.",
  },
  {
    icon: Star,
    title: "Market Expertise",
    description: "15+ years in Toronto real estate gives us an unmatched understanding of price trends and neighbourhoods.",
  },
  {
    icon: Users,
    title: "Client-Centred",
    description: "Your goals are our goals. We tailor every search, negotiation, and closing to your specific needs.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-20 pb-20 min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-24 bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(180,83,9,0.1),transparent)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-amber-500/40 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-amber-500" />
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em]">Our Story</span>
            <div className="h-px w-8 bg-amber-500" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Toronto&apos;s Most Trusted<br />Real Estate Brokerage
          </h1>
          <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl mx-auto font-light">
            Founded in 2009, PrimeRealty has helped over 1,200 families and investors navigate the Toronto real estate market with confidence. We combine deep local expertise with a client-first philosophy.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-amber-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-amber-500/40">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="bg-amber-600 text-center py-10 px-6">
                <Icon className="h-6 w-6 text-white/60 mx-auto mb-3" />
                <p className="text-3xl font-bold text-white mb-1 tabular-nums">{value}</p>
                <p className="text-sm text-white/75 tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-amber-500 shrink-0" />
                <span className="text-amber-600 text-xs font-semibold uppercase tracking-[0.2em]">
                  How We Got Here
                </span>
              </div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6 leading-tight">
                Built on Relationships,<br />Driven by Results
              </h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed text-sm">
                <p>
                  PrimeRealty was founded by James Hartley and Sofia Chen — two agents who believed that real estate should be about people, not just transactions. Starting with a small office on Bay Street, they built a team of specialists committed to exceptional service.
                </p>
                <p>
                  Today, our team of 20+ licensed agents serves buyers, sellers, and investors across Toronto, Mississauga, Vaughan, Richmond Hill, and Oakville. We specialize in residential resale, pre-construction, and investment properties.
                </p>
                <p>
                  Our award-winning track record includes recognition from TREB (Toronto Regional Real Estate Board) as a top-producing brokerage for seven consecutive years.
                </p>
              </div>
            </div>
            <div className="relative bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl aspect-[4/3] overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400">
                <Building2 className="h-16 w-16 mb-3 opacity-20" />
                <p className="text-sm font-medium opacity-40 tracking-wide">PrimeRealty Office</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-neutral-200/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 bg-amber-500" />
              <span className="text-amber-600 text-xs font-semibold uppercase tracking-[0.2em]">
                What We Stand For
              </span>
              <div className="h-px w-8 bg-amber-500" />
            </div>
            <h2 className="text-3xl font-bold text-neutral-900">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm hover:shadow-md hover:border-neutral-200 transition-all duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 mb-5">
                  <Icon className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-neutral-900 text-base mb-3">{title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 bg-amber-500" />
            <span className="text-amber-600 text-xs font-semibold uppercase tracking-[0.2em]">
              Recognition
            </span>
            <div className="h-px w-8 bg-amber-500" />
          </div>
          <h2 className="text-3xl font-bold text-neutral-900 mb-12">Awards &amp; Recognition</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              "TREB Top Producer 2024",
              "Best Brokerage — Toronto Life",
              "5-Star Google Rating",
              "RE Awards Platinum 2023",
            ].map((award) => (
              <div
                key={award}
                className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 text-center hover:border-amber-200 hover:bg-amber-50/50 transition-all duration-200"
              >
                <Award className="h-7 w-7 text-amber-500 mx-auto mb-3" />
                <p className="text-sm font-medium text-neutral-700 leading-snug">{award}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-neutral-950 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_60%,rgba(180,83,9,0.1),transparent)]" />
        <div className="relative max-w-2xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Work With Us?</h2>
          <p className="text-neutral-400 mb-8 text-sm leading-relaxed font-light">
            Book a free, no-obligation consultation with one of our agents today.
          </p>
          <Button asChild variant="primary" size="lg">
            <Link href="/contact">Book a Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
