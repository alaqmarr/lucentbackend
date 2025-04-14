// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-commerce Admin',
  description: 'Admin dashboard for e-commerce store',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <SidebarProvider>
      <AppSidebar />
      <main
      className='flex flex-col items-center justify-between p-4 bg-gray-100'
      >
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
      </body>
    </html>
  );
}