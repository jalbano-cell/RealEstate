"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statuses = ["NEW", "CONTACTED", "QUALIFIED", "VIEWING_SCHEDULED", "CLOSED"] as const;

interface Props {
  id: string;
  current: string;
}

export function LeadStatusSelect({ id, current }: Props) {
  const router = useRouter();
  const [value, setValue] = useState(current);

  const handleChange = async (newStatus: string) => {
    setValue(newStatus);
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    router.refresh();
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="h-8 text-xs w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((s) => (
          <SelectItem key={s} value={s} className="text-xs">
            {s.replace("_", " ")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
