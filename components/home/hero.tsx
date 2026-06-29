import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Search } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0f1e]" />
      <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/85" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="inline-flex items-center gap-2.5 bg-amber-600/20 border border-amber-500/30 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-300 text-xs font-semibold tracking-[0.15em] uppercase">
            Toronto&apos;s Most Trusted Brokerage
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-5 leading-[1.1]">
          Find Your{" "}
          <span className="text-amber-400">Perfect</span>{" "}
          Home
        </h1>

        <p className="text-base sm:text-lg text-white/65 mb-10 max-w-xl mx-auto leading-relaxed font-light tracking-wide">
          Discover premium properties across Toronto and the GTA.
          Expert agents. Trusted results.
        </p>

        {/* Property search bar — primary CTA */}
        <form action="/properties" className="max-w-3xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 gap-2 shadow-2xl">
            <select
              name="city"
              aria-label="Select city"
              className="flex-1 bg-white/10 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/60 cursor-pointer appearance-none min-w-0"
            >
              <option value="" className="text-neutral-900 bg-white">Any City</option>
              <option value="Toronto" className="text-neutral-900 bg-white">Toronto</option>
              <option value="Mississauga" className="text-neutral-900 bg-white">Mississauga</option>
              <option value="Vaughan" className="text-neutral-900 bg-white">Vaughan</option>
              <option value="Richmond Hill" className="text-neutral-900 bg-white">Richmond Hill</option>
              <option value="Oakville" className="text-neutral-900 bg-white">Oakville</option>
            </select>

            <div className="hidden sm:block w-px bg-white/15 self-stretch my-1" />

            <select
              name="listingType"
              aria-label="Buy or rent"
              className="flex-1 bg-white/10 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/60 cursor-pointer appearance-none min-w-0"
            >
              <option value="" className="text-neutral-900 bg-white">Buy or Rent</option>
              <option value="FOR_SALE" className="text-neutral-900 bg-white">For Sale</option>
              <option value="FOR_RENT" className="text-neutral-900 bg-white">For Rent</option>
            </select>

            <div className="hidden sm:block w-px bg-white/15 self-stretch my-1" />

            <select
              name="propertyType"
              aria-label="Property type"
              className="flex-1 bg-white/10 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/60 cursor-pointer appearance-none min-w-0"
            >
              <option value="" className="text-neutral-900 bg-white">Any Type</option>
              <option value="HOUSE" className="text-neutral-900 bg-white">House</option>
              <option value="CONDO" className="text-neutral-900 bg-white">Condo</option>
              <option value="TOWNHOUSE" className="text-neutral-900 bg-white">Townhouse</option>
              <option value="COMMERCIAL" className="text-neutral-900 bg-white">Commercial</option>
            </select>

            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shrink-0 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1 focus:ring-offset-transparent whitespace-nowrap"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
          </div>
        </form>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <Button asChild variant="primary" size="xl">
            <Link href="/properties">
              Browse All Properties
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="xl"
            className="border-white/25 text-white bg-white/8 hover:bg-white/15 backdrop-blur-sm"
          >
            <Link href="/contact">Book Consultation</Link>
          </Button>
        </div>

        <div className="grid grid-cols-3 max-w-xs mx-auto">
          {[
            { value: "500+", label: "Properties" },
            { value: "15+", label: "Years" },
            { value: "1,200+", label: "Clients" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center py-2 ${i > 0 ? "border-l border-white/15 pl-6" : "pr-6"}`}
            >
              <p className="text-2xl font-bold text-white tabular-nums">{stat.value}</p>
              <p className="text-xs text-white/45 mt-0.5 tracking-[0.12em] uppercase font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#featured"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/35 hover:text-white/65 transition-colors duration-200 cursor-pointer"
        aria-label="Scroll to featured properties"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  );
}
