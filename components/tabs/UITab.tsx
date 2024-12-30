"use client";

import { CodePreview } from "@/components/code-preview";
import { useModels } from "@/contexts/ModelContext";
import { generateReactComponents } from "@/lib/generators/react";

export function UITab() {
  const { getActiveModel } = useModels();
  const activeModel = getActiveModel();

  return (
    <CodePreview
      title="React Components"
      code={activeModel ? generateReactComponents(activeModel) : "// Select a model first"}
    />
  );
}