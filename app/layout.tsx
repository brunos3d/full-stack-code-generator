import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ModelProvider } from '@/contexts/ModelContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Full-Stack Code Generator',
  description: 'Generate type-safe, full-stack code with Prisma, Zod, and React',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ModelProvider>{children}</ModelProvider>
      </body>
    </html>
  );
}
