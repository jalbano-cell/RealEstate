import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Calendar } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative py-28 bg-neutral-950 overflow-hidden">
      {/* Radial glow behind the headline */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_60%,rgba(180,83,9,0.12),transparent)]" />
      {/* Top centre accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-amber-500/40 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-amber-400 text-xs font-semibold uppercase tracking-[0.3em] mb-6">
          Ready to Begin?
        </p>
        <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Let&apos;s Find Your{" "}
          <span className="text-amber-400">Dream Home</span>{" "}
          Together
        </h2>
        <p className="text-neutral-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
          Our experienced agents are ready to guide you through every step of your real estate journey. No pressure, just results.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild variant="primary" size="xl">
            <Link href="/contact">
              <Calendar className="h-5 w-5" />
              Book a Free Consultation
            </Link>
          </Button>
          <Button
            asChild
            size="xl"
            className="bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-white/25 transition-all duration-200"
          >
            <a href="tel:+14165550100">
              <Phone className="h-5 w-5" />
              (416) 555-0100
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
