export type PrismaScalarType = 
  | "String" 
  | "Int" 
  | "Float" 
  | "Boolean" 
  | "DateTime" 
  | "Json" 
  | "BigInt" 
  | "Decimal";

export type RelationType = "one-to-one" | "one-to-many" | "many-to-many";

export interface Relation {
  type: RelationType;
  model: string;
  required: boolean;
  list: boolean;
}

export interface Field {
  name: string;
  type: string | Relation;
  required: boolean;
  isRelation: boolean;
}

export interface Model {
  name: string;
  fields: Field[];
}