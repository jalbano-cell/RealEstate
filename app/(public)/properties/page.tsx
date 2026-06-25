export const dynamic = "force-dynamic";
import { Suspense } from "react";
import type { Metadata } from "next";
import { PropertyCard } from "@/components/property/property-card";
import { PropertyCardSkeleton } from "@/components/property/property-card-skeleton";
import { PropertyFilters } from "@/components/property/property-filters";
import { getProperties } from "@/services/property.service";
import { getDistinctCities } from "@/repositories/property.repository";
import type { PropertyFilters as Filters, PropertyType, ListingType } from "@/types";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Property Listings",
  description: "Browse premium homes, condos, and investment properties for sale and rent in Toronto and the GTA.",
};

interface SearchParams {
  city?: string;
  minPrice?: string;
  maxPrice?: string;
  bedrooms?: string;
  bathrooms?: string;
  propertyType?: string;
  listingType?: string;
  page?: string;
  sort?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function PropertiesPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const filters: Filters = {
    city: params.city,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    bedrooms: params.bedrooms ? Number(params.bedrooms) : undefined,
    bathrooms: params.bathrooms ? Number(params.bathrooms) : undefined,
    propertyType: params.propertyType as PropertyType | undefined,
    listingType: params.listingType as ListingType | undefined,
    page: params.page ? Number(params.page) : 1,
    sort: (params.sort as Filters["sort"]) ?? "newest",
    limit: 12,
  };

  const [{ data: properties, total, page, totalPages }, cities] = await Promise.all([
    getProperties(filters),
    getDistinctCities(),
  ]);

  const buildPageUrl = (p: number) => {
    const sp = new URLSearchParams(params as Record<string, string>);
    sp.set("page", String(p));
    return `/properties?${sp.toString()}`;
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-1">Property Listings</h1>
          <p className="text-neutral-500">
            {total} {total === 1 ? "property" : "properties"} found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-72 shrink-0">
            <Suspense fallback={null}>
              <PropertyFilters cities={cities} />
            </Suspense>
          </aside>

          <div className="flex-1 min-w-0">
            {properties.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">No properties found</h3>
                <p className="text-neutral-500 text-sm max-w-xs">
                  Try adjusting your filters to see more results.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {properties.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    {page > 1 && (
                      <Link
                        href={buildPageUrl(page - 1)}
                        className="flex items-center gap-1 px-4 py-2 rounded-lg border border-neutral-200 text-sm text-neutral-600 hover:bg-white hover:shadow-sm transition-all"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Link>
                    )}
                    <span className="px-4 py-2 text-sm text-neutral-500">
                      Page {page} of {totalPages}
                    </span>
                    {page < totalPages && (
                      <Link
                        href={buildPageUrl(page + 1)}
                        className="flex items-center gap-1 px-4 py-2 rounded-lg border border-neutral-200 text-sm text-neutral-600 hover:bg-white hover:shadow-sm transition-all"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Loading() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-72 shrink-0">
            <div className="bg-white border border-neutral-200 rounded-xl p-5 h-96 animate-pulse" />
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
