"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface CodePreviewProps {
  title: string;
  code: string;
}

export function CodePreview({ title, code }: CodePreviewProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{title}</h3>
        <Button variant="ghost" size="sm" onClick={copyToClipboard}>
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </Button>
      </div>
      <pre className="bg-muted p-4 rounded-md overflow-x-auto">
        <code>{code}</code>
      </pre>
    </Card>
  );
}