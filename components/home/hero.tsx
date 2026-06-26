import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0f1e]" />
      <div className="absolute inset-0 bg-[url('/images/hero-bg.svg')] bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="inline-flex items-center gap-2 bg-amber-600/20 border border-amber-500/30 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-300 text-sm font-medium">Toronto&apos;s Most Trusted Brokerage</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
          Find Your{" "}
          <span className="text-amber-400">Perfect</span>{" "}
          Home
        </h1>

        <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
          Discover thousands of premium properties across Toronto and the GTA.
          Expert agents. Trusted results.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild variant="primary" size="xl">
            <Link href="/properties">
              Browse Properties
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="xl" className="border-white/30 text-white bg-white/10 hover:bg-white/20">
            <Link href="/contact">Book Consultation</Link>
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-sm mx-auto">
          {[
            { value: "500+", label: "Properties" },
            { value: "15+", label: "Years" },
            { value: "1,200+", label: "Happy Clients" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/50 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#featured"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  );
}
