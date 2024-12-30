'use client';

import { CodePreview } from '@/components/code-preview';
import { useModels } from '@/contexts/ModelContext';
import { generateZodSchema } from '@/lib/generators/zod';

export function ValidationTab() {
  const { getActiveModel } = useModels();
  const activeModel = getActiveModel();

  return (
    <CodePreview
      title="Zod Schema"
      code={activeModel ? generateZodSchema(activeModel) : '// Select a model first'}
      filePath={activeModel ? `/schemas/${activeModel.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}.ts` : ''}
    />
  );
}
