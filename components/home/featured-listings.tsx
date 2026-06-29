import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PropertyCard } from "@/components/property/property-card";
import { Button } from "@/components/ui/button";
import type { PropertyWithImages } from "@/types";

interface FeaturedListingsProps {
  properties: PropertyWithImages[];
}

export function FeaturedListings({ properties }: FeaturedListingsProps) {
  if (properties.length === 0) return null;

  return (
    <section id="featured" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-amber-500 shrink-0" />
              <span className="text-amber-600 text-xs font-semibold uppercase tracking-[0.2em]">
                Hand-Picked
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight">
              Featured Properties
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/properties" className="flex items-center gap-2 shrink-0">
              View All Listings
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
