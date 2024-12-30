"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useModels } from "@/contexts/ModelContext";
import { Model, Field, Relation } from "@/lib/types/model";
import { TypeSelector } from "@/components/model-editor/type-selector";

export function ModelEditor() {
  const { models, addModel, setActiveModelId } = useModels();
  const [currentModel, setCurrentModel] = useState<Model>({
    name: "",
    fields: [],
  });

  const addField = () => {
    setCurrentModel({
      ...currentModel,
      fields: [...currentModel.fields, { 
        name: "", 
        type: "String", 
        required: true,
        isRelation: false
      }],
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
      fields: currentModel.fields.map((f, i) => 
        i === index ? { ...f, ...updates } : f
      ),
    });
  };

  const handleTypeChange = (index: number, value: string, isRelation: boolean) => {
    if (isRelation) {
      const [modelName, relationType] = value.split(":");
      const relation: Relation = {
        type: relationType as any,
        model: modelName,
        required: true,
        list: relationType !== "one-to-one"
      };
      updateField(index, { type: relation, isRelation: true });
    } else {
      updateField(index, { type: value, isRelation: false });
    }
  };

  const saveModel = () => {
    if (!currentModel.name) return;
    
    addModel(currentModel);
    setActiveModelId(currentModel.name);
    setCurrentModel({ name: "", fields: [] });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="modelName">Model Name</Label>
            <Input
              id="modelName"
              value={currentModel.name}
              onChange={(e) => setCurrentModel({ ...currentModel, name: e.target.value })}
              placeholder="e.g., User, Product, Order"
            />
          </div>

          <div className="space-y-4">
            {currentModel.fields.map((field, index) => (
              <div key={index} className="flex gap-4">
                <Input
                  value={field.name}
                  onChange={(e) => updateField(index, { name: e.target.value })}
                  placeholder="Field name"
                />
                <TypeSelector
                  value={typeof field.type === "string" ? field.type : `${field.type.model}:${field.type.type}`}
                  onChange={(value, isRelation) => handleTypeChange(index, value, isRelation)}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeField(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <Button onClick={addField} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Field
            </Button>
            <Button onClick={saveModel}>Save Model</Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        {models.map((model) => (
          <Card
            key={model.name}
            className="p-4 cursor-pointer hover:bg-accent"
            onClick={() => setActiveModelId(model.name)}
          >
            <h3 className="font-semibold mb-2">{model.name}</h3>
            <div className="text-sm text-muted-foreground">
              {model.fields.length} fields
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}