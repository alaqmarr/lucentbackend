// components/sidebar.tsx
'use client';

import Link from 'next/link';
import { Home, ShoppingCart, Tags, Layers, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Dashboard' },
    { href: '/products', icon: ShoppingCart, label: 'Products' },
    { href: '/categories', icon: Tags, label: 'Categories' },
    { href: '/subcategories', icon: Layers, label: 'Subcategories' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="hidden md:flex md:w-64 md:flex-col fixed inset-y-0 border-r">
      <div className="flex flex-col h-full">
        <div className="flex h-16 items-center px-4 border-b">
          <h1 className="text-xl font-bold">E-commerce Admin</h1>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md',
                  pathname === item.href
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}