'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ModelEditor } from '@/components/model-editor';
import { ValidationTab } from '@/components/tabs/ValidationTab';
import { UITab } from '@/components/tabs/UITab';
import { PrismaTab } from '@/components/tabs/PrismaTab';
import { APITab } from '@/components/tabs/APITab';
import { ModelSelector } from '@/components/model-selector';
import { FormTab } from '@/components/tabs/FormTab';
import { SeedTab } from '@/components/tabs/SeedTab';

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Full-Stack Code Generator</h1>
        <p className="text-muted-foreground">Generate type-safe, full-stack code with Prisma, Zod, and React</p>
      </header>

      <div className="mb-6">
        <ModelSelector />
      </div>

      <Tabs defaultValue="model" className="space-y-4">
        <TabsList>
          <TabsTrigger value="model">Data Model</TabsTrigger>
          <TabsTrigger value="prisma">Prisma Schema</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
          <TabsTrigger value="ui">UI Components</TabsTrigger>
          <TabsTrigger value="api">API Routes</TabsTrigger>
          <TabsTrigger value="form">Form</TabsTrigger>
          <TabsTrigger value="seed">Seed Data</TabsTrigger>
        </TabsList>

        <TabsContent value="model" forceMount className="data-[state=inactive]:hidden space-y-4">
          <ModelEditor />
        </TabsContent>

        <TabsContent value="prisma">
          <PrismaTab />
        </TabsContent>

        <TabsContent value="validation">
          <ValidationTab />
        </TabsContent>

        <TabsContent value="ui">
          <UITab />
        </TabsContent>

        <TabsContent value="api">
          <APITab />
        </TabsContent>

        <TabsContent value="form" forceMount className="data-[state=inactive]:hidden">
          <FormTab />
        </TabsContent>

        <TabsContent value="seed" forceMount className="data-[state=inactive]:hidden">
          <SeedTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
