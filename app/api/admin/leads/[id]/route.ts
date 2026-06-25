import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { changeLeadStatus } from "@/services/lead.service";
import { updateLeadStatusSchema } from "@/lib/validations/lead";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const parsed = updateLeadStatusSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid status" }, { status: 400 });

  await changeLeadStatus(id, parsed.data.status);
  return NextResponse.json({ success: true });
}
