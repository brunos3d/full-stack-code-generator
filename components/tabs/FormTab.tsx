'use client';

import { useForm, FormProvider, Controller } from 'react-hook-form';
import { useModels } from '@/contexts/ModelContext';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Field } from '@/lib/types/model';
import { Form, FormControl, FormField, FormDescription, FormMessage, FormLabel, FormItem } from '@/components/ui/form';

export function FormTab() {
  const form = useForm();
  const { getActiveModel, models } = useModels();
  const activeModel = getActiveModel();

  if (!activeModel) {
    return <p>Select a model first</p>;
  }

  const renderInput = (field: Field, formField: any) => {
    switch (field.type) {
      case 'String':
        return <Input placeholder={field.placeholder || `Enter ${field.name}`} {...formField} />;
      case 'Boolean':
        return <Checkbox defaultChecked={field.defaultValue === 'true'} {...formField} />;
      case 'Int':
      case 'Float':
      case 'BigInt':
      case 'Decimal':
        return <Input type="number" placeholder={field.placeholder || `Enter ${field.name}`} {...formField} />;
      case 'DateTime':
        return <Input type="datetime-local" placeholder={field.placeholder || `Enter ${field.name}`} {...formField} />;
      default:
        if (field.isRelation) {
          const relatedModel = models.find((model) => model.name === (typeof field.type !== 'string' ? field.type.model : ''));
          return (
            <Select {...formField}>
              <SelectTrigger>
                <SelectValue placeholder={field.placeholder || `Select ${field.name}`} />
              </SelectTrigger>
              <SelectContent>
                {relatedModel?.fields.map((relatedField) => (
                  <SelectItem key={relatedField.name} value={relatedField.name}>
                    {relatedField.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }
        return <Input placeholder={field.placeholder || `Enter ${field.name}`} {...formField} />;
    }
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form className="space-y-2">
          {activeModel.fields
            .filter((field) => !field.hideInForm) // Filter out fields that should be hidden
            .map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel className="capitalize">{field.label || field.name}</FormLabel>
                    <FormControl>{renderInput(field, formField)}</FormControl>
                    {field.description && <FormDescription>{field.description}</FormDescription>}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
        </form>
      </Form>
    </Card>
  );
}
