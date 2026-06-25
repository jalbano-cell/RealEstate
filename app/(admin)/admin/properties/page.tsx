export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Pencil, Star } from "lucide-react";
import { getAdminProperties } from "@/services/property.service";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils";
import { DeletePropertyButton } from "@/components/admin/delete-property-button";

export const metadata: Metadata = { title: "Properties | Admin" };

export default async function AdminPropertiesPage() {
  const properties = await getAdminProperties();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Properties</h1>
          <p className="text-sm text-neutral-500 mt-1">{properties.length} total</p>
        </div>
        <Button asChild variant="primary" size="sm">
          <Link href="/admin/properties/new">
            <Plus className="h-4 w-4" />
            Add Property
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        {properties.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-neutral-400 mb-4">No properties yet.</p>
            <Button asChild variant="primary" size="sm">
              <Link href="/admin/properties/new">Add Your First Property</Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Property</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Price</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Type</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Agent</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Leads</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Added</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {properties.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {p.images[0] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={p.images[0].url}
                            alt={p.title}
                            className="w-10 h-10 rounded-lg object-cover shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-neutral-100 shrink-0" />
                        )}
                        <div>
                          <p className="font-medium text-neutral-900 line-clamp-1">{p.title}</p>
                          <p className="text-xs text-neutral-400">{p.city}</p>
                        </div>
                        {p.featured && (
                          <Star className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 font-medium text-neutral-800">
                      {formatPrice(p.price.toString())}
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant={p.listingType === "FOR_SALE" ? "sale" : "rent"}>
                        {p.listingType === "FOR_SALE" ? "Sale" : "Rent"}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <Badge
                        variant={
                          p.status === "ACTIVE"
                            ? "success"
                            : p.status === "SOLD" || p.status === "RENTED"
                              ? "secondary"
                              : "warning"
                        }
                      >
                        {p.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-neutral-600">{p.agent.name}</td>
                    <td className="px-5 py-4 text-neutral-600">{p._count.leads}</td>
                    <td className="px-5 py-4 text-neutral-400 text-xs">{formatDate(p.createdAt)}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Button asChild variant="ghost" size="icon">
                          <Link href={`/admin/properties/${p.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <DeletePropertyButton id={p.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
