'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Model } from '@/lib/types/model';
import { MOCKED_MODELS } from '@/lib/constants/model';

interface ModelContextType {
  models: Model[];
  activeModelId: string | null;
  addModel: (model: Model) => void;
  setActiveModelId: (id: string | null) => void;
  getActiveModel: () => Model | null;
  setCurrentModel: (model: Model) => void;
  updateModel: (model: Model) => void;
  resetModels: () => void;
  deleteModels: (modelsToDelete: Model[]) => void;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export function ModelProvider({ children }: { children: ReactNode }) {
  const [models, setModels] = useState<Model[]>(() => {
    if (typeof localStorage !== 'undefined') {
      const storedModels = localStorage.getItem('models');
      return storedModels ? JSON.parse(storedModels) : MOCKED_MODELS;
    }
    return MOCKED_MODELS;
  });
  const [activeModelId, setActiveModelId] = useState<string | null>(() => {
    if (typeof localStorage !== 'undefined') {
      const storedModels = localStorage.getItem('models');
      const models = storedModels ? JSON.parse(storedModels) : MOCKED_MODELS;
      return models.length > 0 ? models[0].name : null;
    }
    return MOCKED_MODELS.length > 0 ? MOCKED_MODELS[0].name : null;
  });

  const addModel = (model: Model) => {
    setModels((prev) => {
      const updatedModels = [...prev, model];
      localStorage.setItem('models', JSON.stringify(updatedModels));
      return updatedModels;
    });
  };

  const getActiveModel = () => {
    return models.find((model) => model.name === activeModelId) || null;
  };

  const setCurrentModel = (model: Model) => {
    setActiveModelId(model.name);
    setModels((prev) => {
      const updatedModels = prev.map((m) => (m.name === model.name ? model : m));
      localStorage.setItem('models', JSON.stringify(updatedModels));
      return updatedModels;
    });
  };

  const updateModel = (model: Model) => {
    setModels((prev) => {
      const updatedModels = prev.map((m) => (m.name === model.name ? model : m));
      localStorage.setItem('models', JSON.stringify(updatedModels));
      return updatedModels;
    });
  };

  const resetModels = () => {
    setModels(MOCKED_MODELS);
    localStorage.setItem('models', JSON.stringify(MOCKED_MODELS));
  };

  const deleteModels = (modelsToDelete: Model[]) => {
    setModels((prev) => {
      const updatedModels = prev.filter((model) => !modelsToDelete.includes(model));
      localStorage.setItem('models', JSON.stringify(updatedModels));
      return updatedModels;
    });
  };

  return (
    <ModelContext.Provider
      value={{
        models,
        activeModelId,
        addModel,
        setActiveModelId,
        getActiveModel,
        setCurrentModel,
        updateModel,
        resetModels,
        deleteModels,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
}

export function useModels() {
  const context = useContext(ModelContext);
  if (context === undefined) {
    throw new Error('useModels must be used within a ModelProvider');
  }
  return context;
}
