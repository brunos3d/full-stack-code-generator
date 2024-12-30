import { Model } from "@/lib/types/model";

export function generateApiRoutes(model: Model): string {
  return `// Generated API routes for ${model.name}
import { NextResponse } from "next/server";
import { ${model.name}Schema } from "@/schemas/${model.name}";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const items = await db.${model.name.toLowerCase()}.findMany();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = ${model.name}Schema.parse(body);
    
    const item = await db.${model.name.toLowerCase()}.create({
      data: validated,
    });
    
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create item" }, { status: 400 });
  }
}`;
}