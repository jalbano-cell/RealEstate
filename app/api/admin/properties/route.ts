import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createNewProperty } from "@/services/property.service";
import { propertySchema } from "@/lib/validations/property";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { imageUrls = [], ...rest } = body;

  const parsed = propertySchema.safeParse(rest);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
  }

  const property = await createNewProperty(parsed.data, imageUrls);
  return NextResponse.json(property, { status: 201 });
}
