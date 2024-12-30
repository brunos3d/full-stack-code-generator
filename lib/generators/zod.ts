import { Field, Model, PrismaScalarType } from '@/lib/types/model';

export function generateZodSchema(model: Model) {
  return `
import { z } from "zod";

export const ${model.name}Schema = z.object({
  ${model.fields.map((field) => `${field.name}: ${mapToZodField(field)}`).join(',\n  ')}
});

export type ${model.name} = z.infer<typeof ${model.name}Schema>;
`;
}

function mapToZodField(field: Field): string {
  const typeMap: Record<PrismaScalarType, string> = {
    String: 'z.string()',
    Int: 'z.number().int()',
    Float: 'z.number()',
    Boolean: 'z.boolean()',
    DateTime: 'z.date()',
    Json: 'z.any()',
    BigInt: 'z.bigint()',
    Decimal: 'z.number()',
  };

  let zodField = typeMap[field.type as PrismaScalarType] || 'z.string()';

  if (!field.required) {
    zodField += '.optional()';
  }

  return zodField;
}
