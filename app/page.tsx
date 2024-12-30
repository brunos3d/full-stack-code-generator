"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModelEditor } from "@/components/model-editor";
import { ValidationTab } from "@/components/tabs/ValidationTab";
import { UITab } from "@/components/tabs/UITab";
import { PrismaTab } from "@/components/tabs/PrismaTab";
import { APITab } from "@/components/tabs/APITab";
import { ModelProvider } from "@/contexts/ModelContext";

export default function Home() {
  return (
    <ModelProvider>
      <div className="container mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Full-Stack Code Generator</h1>
          <p className="text-muted-foreground">
            Generate type-safe, full-stack code with Prisma, Zod, and React
          </p>
        </header>

        <Tabs defaultValue="model" className="space-y-4">
          <TabsList>
            <TabsTrigger value="model">Data Model</TabsTrigger>
            <TabsTrigger value="prisma">Prisma Schema</TabsTrigger>
            <TabsTrigger value="validation">Validation</TabsTrigger>
            <TabsTrigger value="ui">UI Components</TabsTrigger>
            <TabsTrigger value="api">API Routes</TabsTrigger>
          </TabsList>

          <TabsContent value="model" forceMount className="data-[state=inactive]:hidden space-y-4">
            <ModelEditor />
          </TabsContent>

          <TabsContent value="prisma" forceMount className="data-[state=inactive]:hidden">
            <PrismaTab />
          </TabsContent>
          
          <TabsContent value="validation" forceMount className="data-[state=inactive]:hidden">
            <ValidationTab />
          </TabsContent>

          <TabsContent value="ui" forceMount className="data-[state=inactive]:hidden">
            <UITab />
          </TabsContent>

          <TabsContent value="api" forceMount className="data-[state=inactive]:hidden">
            <APITab />
          </TabsContent>
        </Tabs>
      </div>
    </ModelProvider>
  );
}