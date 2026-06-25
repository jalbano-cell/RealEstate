import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { removeAgent } from "@/services/agent.service";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await removeAgent(id);
  return NextResponse.json({ success: true });
}
