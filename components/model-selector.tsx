'use client';

import { Card } from '@/components/ui/card';
import { useModels } from '@/contexts/ModelContext';
import { Button } from '@/components/ui/button';
import { Model } from '@/lib/types/model';

export function ModelSelector() {
  const { models, setCurrentModel, resetModels, deleteModels, getActiveModel } = useModels();
  const activeModel = getActiveModel();

  const deleteAllModels = () => {
    deleteModels(models);
  };

  const deleteActiveModel = () => {
    if (activeModel) {
      deleteModels([activeModel]);
    }
  };

  const toggleModelSelection = (model: Model) => {
    if (activeModel?.name === model.name) {
      setCurrentModel({ name: '', fields: [] });
    } else {
      setCurrentModel(model);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-7 gap-4 mb-4">
        {models.map((model) => (
          <Card
            key={model.name}
            className={`p-4 cursor-pointer hover:bg-accent ${activeModel?.name === model.name ? 'border-2 border-blue-500' : ''}`}
            onClick={() => toggleModelSelection(model)}
          >
            <h3 className="font-semibold mb-2">{model.name}</h3>
            <div className="text-sm text-muted-foreground">{model.fields.length} fields</div>
          </Card>
        ))}
      </div>
      <div className="flex space-x-2">
        <Button size="sm" onClick={resetModels}>
          Reset To Default Models
        </Button>
        <Button variant="destructive" size="sm" onClick={deleteAllModels}>
          Delete All Models
        </Button>
        <Button variant="destructive" size="sm" onClick={deleteActiveModel} disabled={!activeModel}>
          Delete Active Model
        </Button>
      </div>
    </div>
  );
}
