'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useState } from 'react';

interface CodePreviewProps {
  title: string;
  code: string;
  filePath: string;
}

export function CodePreview({ title, code, filePath }: CodePreviewProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{title}</h3>
        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(code)}>
          <Copy className="h-4 w-4 mr-2" />
          Copy Code
        </Button>
      </div>
      <div className="flex items-center mb-4">
        <input type="text" readOnly value={filePath} className="p-2 border rounded flex-1 mr-2" />
        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(filePath)}>
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      <pre className="bg-muted p-4 rounded-md overflow-x-auto">
        <code>{code}</code>
      </pre>
    </Card>
  );
}
