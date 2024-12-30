"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Model } from "@/lib/types/model";

interface ModelContextType {
  models: Model[];
  activeModelId: string | null;
  addModel: (model: Model) => void;
  setActiveModelId: (id: string | null) => void;
  getActiveModel: () => Model | null;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export function ModelProvider({ children }: { children: ReactNode }) {
  const [models, setModels] = useState<Model[]>([]);
  const [activeModelId, setActiveModelId] = useState<string | null>(null);

  const addModel = (model: Model) => {
    setModels((prev) => [...prev, model]);
  };

  const getActiveModel = () => {
    return models.find((model) => model.name === activeModelId) || null;
  };

  return (
    <ModelContext.Provider
      value={{
        models,
        activeModelId,
        addModel,
        setActiveModelId,
        getActiveModel,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
}

export function useModels() {
  const context = useContext(ModelContext);
  if (context === undefined) {
    throw new Error("useModels must be used within a ModelProvider");
  }
  return context;
}