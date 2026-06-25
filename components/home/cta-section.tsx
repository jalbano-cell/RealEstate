import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Calendar } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 bg-neutral-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-4">
          Ready to Begin?
        </p>
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Let&apos;s Find Your{" "}
          <span className="text-amber-400">Dream Home</span>{" "}
          Together
        </h2>
        <p className="text-neutral-400 text-lg mb-10 max-w-2xl mx-auto">
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
            className="bg-white/10 border border-white/20 text-white hover:bg-white/20"
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
