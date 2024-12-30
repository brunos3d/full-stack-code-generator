"use client";

import { CodePreview } from "@/components/code-preview";
import { useModels } from "@/contexts/ModelContext";
import { generateZodSchema } from "@/lib/generators/zod";

export function ValidationTab() {
  const { getActiveModel } = useModels();
  const activeModel = getActiveModel();

  return (
    <CodePreview
      title="Zod Schema"
      code={activeModel ? generateZodSchema(activeModel) : "// Select a model first"}
    />
  );
}