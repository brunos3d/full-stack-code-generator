'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useModels } from '@/contexts/ModelContext';
import { generateFakeData } from '@/lib/generators/fakeData';

export function SeedTab() {
  const { models, getActiveModel } = useModels();
  const [fakeData, setFakeData] = useState<string>('');
  const [count, setCount] = useState<number>(1);
  const activeModel = getActiveModel();

  const handleGenerate = () => {
    if (activeModel) {
      const data = generateFakeData(activeModel, count, models);
      setFakeData(JSON.stringify(data, null, 2));
    }
  };

  return (
    <div>
      <div className="mb-4">
        <Input type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} min={1} placeholder="Number of records" />
      </div>
      <Button onClick={handleGenerate} disabled={!activeModel}>
        Generate Fake Data
      </Button>
      {fakeData && <pre className="mt-4 p-4 bg-gray-100 rounded">{fakeData}</pre>}
    </div>
  );
}
