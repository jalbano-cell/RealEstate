"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { agentSchema, type AgentFormData } from "@/lib/validations/agent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface AgentFormProps {
  defaultValues?: Partial<AgentFormData>;
  agentId?: string;
}

export function AgentForm({ defaultValues, agentId }: AgentFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AgentFormData>({
    resolver: zodResolver(agentSchema),
    defaultValues,
  });

  const onSubmit = async (data: AgentFormData) => {
    const url = agentId ? `/api/admin/agents/${agentId}` : "/api/admin/agents";
    const method = agentId ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        areasServed: typeof data.areasServed === "string"
          ? (data.areasServed as string).split(",").map((s) => s.trim()).filter(Boolean)
          : data.areasServed,
      }),
    });
    if (res.ok) {
      router.push("/admin/agents");
      router.refresh();
    } else {
      alert("Failed to save agent. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Full Name *</Label>
          <Input placeholder="Sarah Johnson" {...register("name")} />
          {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Title *</Label>
          <Input placeholder="Senior Sales Representative" {...register("title")} />
          {errors.title && <p className="text-xs text-red-600">{errors.title.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Email *</Label>
          <Input type="email" placeholder="sarah@primerealty.ca" {...register("email")} />
          {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Phone *</Label>
          <Input type="tel" placeholder="(416) 555-0200" {...register("phone")} />
          {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Bio *</Label>
        <Textarea
          rows={4}
          placeholder="Sarah has 10 years of experience in the Toronto real estate market…"
          {...register("bio")}
        />
        {errors.bio && <p className="text-xs text-red-600">{errors.bio.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>Photo URL</Label>
        <Input placeholder="https://example.com/photo.jpg" {...register("photo")} />
      </div>

      <div className="space-y-1.5">
        <Label>Areas Served (comma-separated)</Label>
        <Input
          placeholder="Toronto, Mississauga, Vaughan"
          defaultValue={defaultValues?.areasServed?.join(", ")}
          {...register("areasServed")}
        />
      </div>

      <div className="space-y-1.5">
        <Label>License Number</Label>
        <Input placeholder="4567890" {...register("licenseNo")} />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving…
            </>
          ) : agentId ? "Update Agent" : "Add Agent"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
