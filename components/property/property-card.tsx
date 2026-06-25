"use client";

import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Maximize, MapPin, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import type { PropertyWithImages } from "@/types";

interface PropertyCardProps {
  property: PropertyWithImages;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const primaryImage = property.images.find((img) => img.isPrimary) ?? property.images[0];

  return (
    <Link href={`/properties/${property.slug}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt ?? property.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-100">
              <MapPin className="h-10 w-10 text-neutral-300" />
            </div>
          )}

          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant={property.listingType === "FOR_SALE" ? "sale" : "rent"}>
              {property.listingType === "FOR_SALE" ? "For Sale" : "For Rent"}
            </Badge>
            {property.featured && (
              <Badge variant="primary">Featured</Badge>
            )}
          </div>

          <button
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-neutral-400 hover:text-red-500 transition-colors shadow-sm"
            aria-label="Save property"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5">
          <div className="mb-1">
            <p className="text-xl font-bold text-neutral-900">
              {formatPrice(property.price.toString())}
              {property.listingType === "FOR_RENT" && (
                <span className="text-sm font-normal text-neutral-500">/mo</span>
              )}
            </p>
          </div>

          <h3 className="font-semibold text-neutral-900 mb-1 line-clamp-1 group-hover:text-amber-600 transition-colors">
            {property.title}
          </h3>

          <p className="text-sm text-neutral-500 flex items-center gap-1 mb-4">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {property.address}, {property.city}
          </p>

          <div className="flex items-center gap-4 text-sm text-neutral-600 border-t border-neutral-100 pt-4">
            <span className="flex items-center gap-1.5">
              <Bed className="h-4 w-4 text-neutral-400" />
              {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="h-4 w-4 text-neutral-400" />
              {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
            </span>
            {property.squareFeet && (
              <span className="flex items-center gap-1.5">
                <Maximize className="h-4 w-4 text-neutral-400" />
                {property.squareFeet.toLocaleString()} ft²
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
