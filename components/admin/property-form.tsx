"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { propertySchema, type PropertyFormData } from "@/lib/validations/property";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Controller } from "react-hook-form";

interface Agent {
  id: string;
  name: string;
  title: string;
}

interface PropertyFormProps {
  agents: Agent[];
  defaultValues?: Partial<PropertyFormData>;
  propertyId?: string;
}

export function PropertyForm({ agents, defaultValues, propertyId }: PropertyFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema) as Resolver<PropertyFormData>,
    defaultValues: { status: "ACTIVE", featured: false, amenities: [], ...defaultValues },
  });

  const onSubmit = async (data: PropertyFormData) => {
    const url = propertyId ? `/api/admin/properties/${propertyId}` : "/api/admin/properties";
    const method = propertyId ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        amenities: typeof data.amenities === "string"
          ? (data.amenities as string).split(",").map((s) => s.trim()).filter(Boolean)
          : data.amenities,
        imageUrls: [],
      }),
    });
    if (res.ok) {
      router.push("/admin/properties");
      router.refresh();
    } else {
      alert("Failed to save property. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-1.5">
        <Label>Title *</Label>
        <Input placeholder="Stunning 3-Bedroom Detached Home in Rosedale" {...register("title")} />
        {errors.title && <p className="text-xs text-red-600">{errors.title.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>Description *</Label>
        <Textarea rows={5} placeholder="Property description…" {...register("description")} />
        {errors.description && <p className="text-xs text-red-600">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Price (CAD) *</Label>
          <Input type="number" placeholder="1250000" {...register("price")} />
          {errors.price && <p className="text-xs text-red-600">{errors.price.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Listing Type *</Label>
          <Controller
            name="listingType"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="FOR_SALE">For Sale</SelectItem>
                  <SelectItem value="FOR_RENT">For Rent</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Property Type *</Label>
          <Controller
            name="propertyType"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="HOUSE">House</SelectItem>
                  <SelectItem value="CONDO">Condo</SelectItem>
                  <SelectItem value="TOWNHOUSE">Townhouse</SelectItem>
                  <SelectItem value="LAND">Land</SelectItem>
                  <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Status</Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="SOLD">Sold</SelectItem>
                  <SelectItem value="RENTED">Rented</SelectItem>
                  <SelectItem value="OFF_MARKET">Off Market</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label>Bedrooms *</Label>
          <Input type="number" min={0} {...register("bedrooms")} />
        </div>
        <div className="space-y-1.5">
          <Label>Bathrooms *</Label>
          <Input type="number" min={0} step={0.5} {...register("bathrooms")} />
        </div>
        <div className="space-y-1.5">
          <Label>Sq Ft</Label>
          <Input type="number" min={0} {...register("squareFeet")} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Year Built</Label>
          <Input type="number" placeholder="2018" {...register("yearBuilt")} />
        </div>
        <div className="space-y-1.5">
          <Label>Lot Size (acres)</Label>
          <Input type="number" step="0.01" {...register("lotSize")} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Address *</Label>
        <Input placeholder="12 Maple Street" {...register("address")} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label>City *</Label>
          <Input placeholder="Toronto" {...register("city")} />
        </div>
        <div className="space-y-1.5">
          <Label>Province *</Label>
          <Input placeholder="ON" {...register("province")} />
        </div>
        <div className="space-y-1.5">
          <Label>Postal Code *</Label>
          <Input placeholder="M4W 1A1" {...register("postalCode")} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Amenities (comma-separated)</Label>
        <Input
          placeholder="Garage, Pool, Central Air, Hardwood Floors"
          {...register("amenities")}
        />
      </div>

      <div className="space-y-1.5">
        <Label>Assigned Agent *</Label>
        <Controller
          name="agentId"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger><SelectValue placeholder="Select agent" /></SelectTrigger>
              <SelectContent>
                {agents.map((a) => (
                  <SelectItem key={a.id} value={a.id}>{a.name} — {a.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.agentId && <p className="text-xs text-red-600">{errors.agentId.message}</p>}
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="featured" {...register("featured")} className="rounded" />
        <Label htmlFor="featured">Mark as Featured</Label>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving…
            </>
          ) : propertyId ? "Update Property" : "Add Property"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
