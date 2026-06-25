export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Calendar,
  Home,
  Check,
  ArrowLeft,
  Phone,
  Mail,
} from "lucide-react";
import { getPropertyBySlug } from "@/services/property.service";
import { MortgageCalculator } from "@/components/property/mortgage-calculator";
import { LeadForm } from "@/components/forms/lead-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice, formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return {};
  return {
    title: property.title,
    description: property.description.slice(0, 160),
    openGraph: {
      title: property.title,
      description: property.description.slice(0, 160),
      images: property.images[0] ? [property.images[0].url] : [],
    },
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const primaryImage = property.images.find((i) => i.isPrimary) ?? property.images[0];
  const galleryImages = property.images.slice(0, 5);

  const specs = [
    { icon: Bed, label: "Bedrooms", value: `${property.bedrooms}` },
    { icon: Bath, label: "Bathrooms", value: `${property.bathrooms}` },
    property.squareFeet && {
      icon: Maximize,
      label: "Living Area",
      value: `${property.squareFeet.toLocaleString()} ft²`,
    },
    property.yearBuilt && {
      icon: Calendar,
      label: "Year Built",
      value: `${property.yearBuilt}`,
    },
    { icon: Home, label: "Property Type", value: property.propertyType.replace("_", " ") },
    { icon: MapPin, label: "City", value: property.city },
  ].filter(Boolean) as { icon: typeof Bed; label: string; value: string }[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `https://primerealty.ca/properties/${property.slug}`,
    image: primaryImage?.url,
    offers: {
      "@type": "Offer",
      price: property.price.toString(),
      priceCurrency: "CAD",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.city,
      addressRegion: property.province,
      postalCode: property.postalCode,
      addressCountry: "CA",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-20 pb-20 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-6 pt-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Listings
          </Link>

          {/* Gallery */}
          <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-xl overflow-hidden mb-8 h-[400px] lg:h-[500px]">
            <div className="col-span-4 lg:col-span-2 row-span-2 relative bg-neutral-100">
              {primaryImage && (
                <Image
                  src={primaryImage.url}
                  alt={primaryImage.alt ?? property.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}
            </div>
            {galleryImages.slice(1, 5).map((img, i) => (
              <div key={img.id} className={`hidden lg:block relative bg-neutral-100 ${i >= 2 ? "row-start-2" : ""}`}>
                <Image
                  src={img.url}
                  alt={img.alt ?? property.title}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant={property.listingType === "FOR_SALE" ? "sale" : "rent"}>
                    {property.listingType === "FOR_SALE" ? "For Sale" : "For Rent"}
                  </Badge>
                  {property.featured && <Badge variant="primary">Featured</Badge>}
                  <Badge variant="secondary">{property.propertyType.replace("_", " ")}</Badge>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">
                  {property.title}
                </h1>
                <p className="flex items-center gap-1.5 text-neutral-500 mb-4">
                  <MapPin className="h-4 w-4 shrink-0" />
                  {property.address}, {property.city}, {property.province} {property.postalCode}
                </p>
                <p className="text-3xl font-bold text-neutral-900">
                  {formatPrice(property.price.toString())}
                  {property.listingType === "FOR_RENT" && (
                    <span className="text-base font-normal text-neutral-500">/month</span>
                  )}
                </p>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-neutral-50 rounded-xl p-4 border border-neutral-100">
                    <Icon className="h-5 w-5 text-amber-600 mb-2" />
                    <p className="text-xs text-neutral-500">{label}</p>
                    <p className="font-semibold text-neutral-900 capitalize">{value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-3">About This Property</h2>
                <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              {property.amenities.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-neutral-900 mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2 text-sm text-neutral-700">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Map Placeholder */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">Location</h2>
                <div className="bg-neutral-100 rounded-xl h-64 flex items-center justify-center border border-neutral-200">
                  <div className="text-center text-neutral-400">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">{property.address}</p>
                    <p className="text-xs">{property.city}, {property.province}</p>
                  </div>
                </div>
              </div>

              {/* Mortgage Calculator */}
              <MortgageCalculator propertyPrice={Number(property.price)} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Viewing Form */}
              <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm sticky top-24">
                <h2 className="font-semibold text-neutral-900 mb-1">Schedule a Viewing</h2>
                <p className="text-sm text-neutral-500 mb-5">
                  Listed {formatDate(property.createdAt)}
                </p>
                <LeadForm
                  propertyId={property.id}
                  agentId={property.agentId}
                  propertyTitle={property.title}
                />
              </div>

              {/* Agent Card */}
              <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-4">Listed By</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    {property.agent.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={property.agent.photo}
                        alt={property.agent.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-amber-700 font-bold">
                        {property.agent.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">{property.agent.name}</p>
                    <p className="text-sm text-neutral-500">{property.agent.title}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <a href={`tel:${property.agent.phone}`}>
                      <Phone className="h-4 w-4" />
                      {property.agent.phone}
                    </a>
                  </Button>
                  <Button asChild variant="primary" size="sm" className="w-full">
                    <a href={`mailto:${property.agent.email}`}>
                      <Mail className="h-4 w-4" />
                      Email Agent
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
