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
import { bFont } from '@/lib/utils';
import { AppFooter } from '@/components/app-footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_SHORT_NAME} | Manage`,
  description: `Manage ${process.env.NEXT_PUBLIC_SHORT_NAME}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <main
              className='max-w-[100vw] p-4'
            >
              <Toaster/>
              <div
              className='flex items-center justify-between p-4 rounded-lg shadow-md'
              >
              <SidebarTrigger />
              <p
              className={`${bFont.className} text-2xl font-extrabold uppercase`}
              >
                {process.env.NEXT_PUBLIC_SHORT_NAME}
              </p>
              <ModeToggle />
              </div>
              {children}
            <AppFooter/>
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}