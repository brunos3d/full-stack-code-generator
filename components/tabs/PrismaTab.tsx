"use client";

import { CodePreview } from "@/components/code-preview";
import { useModels } from "@/contexts/ModelContext";
import { generatePrismaSchema } from "@/lib/generators/prisma";

export function PrismaTab() {
  const { models } = useModels();

  return (
    <CodePreview
      title="Prisma Schema"
      code={models.length > 0 ? generatePrismaSchema(models) : "// Add a model to generate schema"}
    />
  );
}