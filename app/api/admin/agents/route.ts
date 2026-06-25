import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createNewAgent } from "@/services/agent.service";
import { agentSchema } from "@/lib/validations/agent";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = agentSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid data" }, { status: 400 });

  const agent = await createNewAgent(parsed.data);
  return NextResponse.json(agent, { status: 201 });
}
