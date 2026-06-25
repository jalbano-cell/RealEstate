"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface PropertyFiltersProps {
  cities: string[];
}

export function PropertyFilters({ cities }: PropertyFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      params.delete("page");
      return params.toString();
    },
    [searchParams]
  );

  const handleChange = (key: string, value: string | undefined) => {
    router.push(`${pathname}?${createQueryString({ [key]: value })}`);
  };

  const clearAll = () => router.push(pathname);

  const hasFilters = searchParams.size > 0;

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm space-y-5 sticky top-24">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-neutral-900">Filters</h2>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-amber-600 hover:text-amber-700 flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>Listing Type</Label>
        <Select
          value={searchParams.get("listingType") ?? "all"}
          onValueChange={(v) => handleChange("listingType", v === "all" ? undefined : v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any</SelectItem>
            <SelectItem value="FOR_SALE">For Sale</SelectItem>
            <SelectItem value="FOR_RENT">For Rent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label>City</Label>
        <Select
          value={searchParams.get("city") ?? "all"}
          onValueChange={(v) => handleChange("city", v === "all" ? undefined : v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any city" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any city</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label>Property Type</Label>
        <Select
          value={searchParams.get("propertyType") ?? "all"}
          onValueChange={(v) => handleChange("propertyType", v === "all" ? undefined : v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any type</SelectItem>
            <SelectItem value="HOUSE">House</SelectItem>
            <SelectItem value="CONDO">Condo</SelectItem>
            <SelectItem value="TOWNHOUSE">Townhouse</SelectItem>
            <SelectItem value="LAND">Land</SelectItem>
            <SelectItem value="COMMERCIAL">Commercial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label>Bedrooms (min)</Label>
        <Select
          value={searchParams.get("bedrooms") ?? "any"}
          onValueChange={(v) => handleChange("bedrooms", v === "any" ? undefined : v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label>Min Price (CAD)</Label>
        <Input
          type="number"
          placeholder="e.g. 500000"
          defaultValue={searchParams.get("minPrice") ?? ""}
          onBlur={(e) => handleChange("minPrice", e.target.value || undefined)}
        />
      </div>

      <div className="space-y-1.5">
        <Label>Max Price (CAD)</Label>
        <Input
          type="number"
          placeholder="e.g. 2000000"
          defaultValue={searchParams.get("maxPrice") ?? ""}
          onBlur={(e) => handleChange("maxPrice", e.target.value || undefined)}
        />
      </div>

      <div className="space-y-1.5">
        <Label>Sort By</Label>
        <Select
          value={searchParams.get("sort") ?? "newest"}
          onValueChange={(v) => handleChange("sort", v)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="primary" className="w-full" onClick={clearAll}>
        Reset Filters
      </Button>
    </div>
  );
}
