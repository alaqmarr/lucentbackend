// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/theme-toggle';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ACME Flow Control | Manage',
  description: 'Manage ACME Flow Control',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-full flex flex-col items-center justify-center`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <div>
            <AppSidebar />
            </div>
            <main
              className='max-w-[100vw] flex flex-col p-4 items-center justify-center'
            >
              <Toaster/>
              <div
              className='flex items-center justify-between w-full max-w-[100vw] p-4'
              >
              <SidebarTrigger />
              </div>
              <div
              className='w-full flex flex-col items-center justify-center'
              >
{children}
              </div>
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}