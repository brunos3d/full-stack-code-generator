import { Model, Field, Relation } from '@/lib/types/model';

function isRelation(type: string | Relation): type is Relation {
  return typeof type === 'object' && 'type' in type;
}

function generateRelationField(field: Field, modelName: string): string {
  if (!isRelation(field.type)) return '';

  const relation = field.type;
  const fieldType = relation.list ? `${relation.model}[]` : relation.model;
  const required = relation.required ? '' : '?';
  const relationDirective = `@relation(fields: [${field.name}Id], references: [id])`;

  return `  ${field.name} ${fieldType} ${relationDirective}
  ${field.name}Id String${required}`;
}

function generateField(field: Field): string {
  if (isRelation(field.type)) return '';

  const required = field.required ? '' : '?';
  const defaultValue = field.defaultValue ? ` @default(${field.defaultValue})` : '';
  return `  ${field.name} ${field.type}${required}${defaultValue}`;
}

export function generatePrismaSchema(models: Model[]): string {
  const schema = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

${models
  .map(
    (model) => `model ${model.name} {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
${model.fields
  .map((field) => (field.isRelation ? generateRelationField(field, model.name) : generateField(field)))
  .filter(Boolean)
  .join('\n')}
}`
  )
  .join('\n\n')}`;

  return schema;
}
