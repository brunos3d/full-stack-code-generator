import { Model } from "@/lib/types/model";

export function generateReactComponents(model: Model): string {
  return `// Generated React components for ${model.name}
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ${model.name}Schema } from "@/schemas/${model.name}";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export function ${model.name}Form() {
  const form = useForm({
    resolver: zodResolver(${model.name}Schema),
  });

  const onSubmit = async (data: any) => {
    // Implement form submission
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        ${model.fields
          .map(
            (field) => `
        <FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.name}</FormLabel>
              <Input {...field} type="${mapTypeToInputType(field.type)}" />
              <FormMessage />
            </FormItem>
          )}
        />`
          )
          .join("\n")}
        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}`;
}

function mapTypeToInputType(type: string): string {
  const typeMap: Record<string, string> = {
    string: "text",
    number: "number",
    boolean: "checkbox",
    date: "date",
  };
  return typeMap[type] || "text";
}