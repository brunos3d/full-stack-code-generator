'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Edit } from 'lucide-react';
import { useModels } from '@/contexts/ModelContext';
import { Model, Field, Relation } from '@/lib/types/model';
import { TypeSelector } from '@/components/model-editor/type-selector';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

export function ModelEditor() {
  const { models, addModel, setActiveModelId, activeModelId, updateModel } = useModels();
  const [currentModel, setCurrentModel] = useState<Model>({
    name: '',
    fields: [],
  });
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [fieldIndex, setFieldIndex] = useState<number | null>(null);
  const [fieldDetails, setFieldDetails] = useState<Partial<Field>>({});

  useEffect(() => {
    const activeModel = models.find((model) => model.name === activeModelId);
    if (activeModel) {
      setCurrentModel(activeModel);
    }
  }, [activeModelId, models, setCurrentModel]);

  const addField = () => {
    setCurrentModel({
      ...currentModel,
      fields: [
        ...currentModel.fields,
        {
          name: '',
          type: 'String',
          required: true,
          isRelation: false,
          label: '',
          description: '',
          placeholder: '',
          defaultValue: '',
        },
      ],
    });
  };

  const removeField = (index: number) => {
    setCurrentModel({
      ...currentModel,
      fields: currentModel.fields.filter((_, i) => i !== index),
    });
  };

  const updateField = (index: number, updates: Partial<Field>) => {
    setCurrentModel({
      ...currentModel,
      fields: currentModel.fields.map((f, i) => (i === index ? { ...f, ...updates } : f)),
    });
  };

  const handleTypeChange = (index: number, value: string, isRelation: boolean) => {
    if (isRelation) {
      const [modelName, relationType] = value.split(':');
      const relation: Relation = {
        type: relationType as any,
        model: modelName,
        required: true,
        list: relationType !== 'one-to-one',
      };
      updateField(index, { type: relation, isRelation: true });
    } else {
      updateField(index, { type: value, isRelation: false });
    }
  };

  const saveModel = () => {
    if (!currentModel.name) return;

    const existingModel = models.find((model) => model.name === currentModel.name);
    if (existingModel) {
      updateModel(currentModel);
    } else {
      addModel(currentModel);
      setActiveModelId(currentModel.name);
    }
    setCurrentModel({ name: '', fields: [] });
  };

  const clearEditor = () => {
    setCurrentModel({ name: '', fields: [] });
  };

  const openFieldDialog = (index: number) => {
    setFieldIndex(index);
    setFieldDetails(currentModel.fields[index]);
    setDialogOpen(true);
  };

  const saveFieldDetails = () => {
    if (fieldIndex !== null) {
      updateField(fieldIndex, fieldDetails);
    }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="modelName">Model Name</Label>
            <Input
              id="modelName"
              value={currentModel.name}
              onChange={(e) => setCurrentModel({ ...currentModel, name: e.target.value })}
              placeholder="e.g., User, Product, Order"
            />
          </div>

          <div className="space-y-4">
            <Label>Model Fields</Label>
            {currentModel.fields.map((field, index) => (
              <div key={index} className="flex gap-4 items-center">
                <Input value={field.name} onChange={(e) => updateField(index, { name: e.target.value })} placeholder="Field name" />
                <TypeSelector
                  value={typeof field.type === 'string' ? field.type : `${field.type.model}:${field.type.type}`}
                  onChange={(value, isRelation) => handleTypeChange(index, value, isRelation)}
                />
                <Button variant="outline" size="icon" onClick={() => openFieldDialog(index)}>
                  <Edit />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => removeField(index)}>
                  <Trash2 />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <Button onClick={addField} variant="outline">
              <Plus />
              Add Field
            </Button>
            <Button onClick={clearEditor}>New Model</Button>
            {currentModel.name && <Button onClick={saveModel}>Save Model</Button>}
            {!!currentModel.fields.length && (
              <Button variant="destructive" onClick={clearEditor}>
                Clear Editor
              </Button>
            )}
          </div>
        </div>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Field Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Label htmlFor="hideInForm">Hide in Form</Label>
              <Checkbox
                id="hideInForm"
                checked={fieldDetails.hideInForm || false}
                onCheckedChange={(checked) => setFieldDetails({ ...fieldDetails, hideInForm: checked === true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={fieldDetails.label || ''}
                onChange={(e) => setFieldDetails({ ...fieldDetails, label: e.target.value })}
                placeholder="Field label"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={fieldDetails.description || ''}
                onChange={(e) => setFieldDetails({ ...fieldDetails, description: e.target.value })}
                placeholder="Field description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="placeholder">Placeholder</Label>
              <Input
                id="placeholder"
                value={fieldDetails.placeholder || ''}
                onChange={(e) => setFieldDetails({ ...fieldDetails, placeholder: e.target.value })}
                placeholder="Field placeholder"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultValue">Default Value</Label>
              <Input
                id="defaultValue"
                value={fieldDetails.defaultValue || ''}
                onChange={(e) => setFieldDetails({ ...fieldDetails, defaultValue: e.target.value })}
                placeholder="Field default value"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={saveFieldDetails}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
