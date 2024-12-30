import { Model, Field, Relation } from '@/lib/types/model';
import { faker } from '@faker-js/faker';

const MAX_RELATION_DEPTH = 2;

function generateFakeField(field: Field, models: Model[], depth: number) {
  if (depth > MAX_RELATION_DEPTH) {
    return null;
  }

  if (typeof field.type === 'object') {
    const relation = field.type as Relation;
    const relatedModel = models.find((model) => model.name === relation.model);
    if (relatedModel) {
      const fakeRelatedModel: any = {};
      relatedModel.fields.forEach((relatedField) => {
        fakeRelatedModel[relatedField.name] = generateFakeField(relatedField, models, depth + 1);
      });
      return relation.list ? [fakeRelatedModel] : fakeRelatedModel;
    }
    return null;
  }

  switch (field.type) {
    case 'String':
      return faker.lorem.words();
    case 'Int':
      return faker.number.int();
    case 'Float':
      return faker.number.float();
    case 'Boolean':
      return faker.datatype.boolean();
    case 'DateTime':
      return faker.date.recent().toISOString();
    case 'Json':
      return JSON.stringify({ key: faker.lorem.word() });
    case 'BigInt':
      return faker.number.bigInt().toString();
    case 'Decimal':
      return faker.number.float().toFixed(2);
    default:
      return null;
  }
}

export function generateFakeData(model: Model, count: number, models: Model[]) {
  const data = [];
  for (let i = 0; i < count; i++) {
    const fakeModel: any = {};
    model.fields.forEach((field) => {
      fakeModel[field.name] = generateFakeField(field, models, 0);
    });
    data.push(fakeModel);
  }
  return data;
}
