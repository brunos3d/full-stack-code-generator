"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useModels } from "@/contexts/ModelContext";
import { PrismaScalarType, RelationType } from "@/lib/types/model";

const PRISMA_TYPES: PrismaScalarType[] = [
  "String",
  "Int",
  "Float",
  "Boolean",
  "DateTime",
  "Json",
  "BigInt",
  "Decimal"
];

const RELATION_TYPES: RelationType[] = [
  "one-to-one",
  "one-to-many",
  "many-to-many"
];

interface TypeSelectorProps {
  value: string;
  onChange: (value: string, isRelation: boolean) => void;
}

export function TypeSelector({ value, onChange }: TypeSelectorProps) {
  const { models } = useModels();

  return (
    <Select
      value={value}
      onValueChange={(newValue) => {
        const isRelation = models.some(m => m.name === newValue.split(":")[0]);
        onChange(newValue, isRelation);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Scalar Types</SelectLabel>
          {PRISMA_TYPES.map(type => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectGroup>
        {models.length > 0 && (
          <SelectGroup>
            <SelectLabel>Models</SelectLabel>
            {models.map(model => (
              RELATION_TYPES.map(relationType => (
                <SelectItem 
                  key={`${model.name}:${relationType}`} 
                  value={`${model.name}:${relationType}`}
                >
                  {model.name} ({relationType})
                </SelectItem>
              ))
            ))}
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  );
}