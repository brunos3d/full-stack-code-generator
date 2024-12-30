"use client";

import { CodePreview } from "@/components/code-preview";
import { useModels } from "@/contexts/ModelContext";
import { generateApiRoutes } from "@/lib/generators/api";

export function APITab() {
  const { getActiveModel } = useModels();
  const activeModel = getActiveModel();

  return (
    <CodePreview
      title="API Routes"
      code={activeModel ? generateApiRoutes(activeModel) : "// Select a model first"}
    />
  );
}