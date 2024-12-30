export function generateZodSchema(model: any) {
  return `
import { z } from "zod";

export const ${model.name}Schema = z.object({
  ${model.fields
    .map((field: any) => `${field.name}: ${mapToZodType(field.type)}`)
    .join(",\n  ")}
});

export type ${model.name} = z.infer<typeof ${model.name}Schema>;
`;
}

function mapToZodType(type: string): string {
  const typeMap: Record<string, string> = {
    string: "z.string()",
    number: "z.number()",
    boolean: "z.boolean()",
    date: "z.date()",
  };
  return typeMap[type] || "z.string()";
}