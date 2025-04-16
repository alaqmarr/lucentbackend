import { Calendar, Home, Inbox, Layers, Search, Settings, ShoppingCart, Tags } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ModeToggle } from "./theme-toggle";
import { Card, CardContent, CardFooter } from "./ui/card";
import { prisma } from "@/lib/prisma";

// Menu items.
const items = [
    { href: '/', icon: Home, label: 'Dashboard' },
    { href: '/products', icon: ShoppingCart, label: 'Products' },
    { href: '/categories', icon: Tags, label: 'Categories' },
    { href: '/subcategories', icon: Layers, label: 'Subcategories' },
    { href: '/settings', icon: Settings, label: 'Settings' },
];

export async function AppSidebar() {
    const settings = await prisma.settings.findMany()
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.href}>
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <div
                className="flex flex-col items-start justify-center p-4"
                >
<ModeToggle/>
                </div>
            </SidebarContent>
            <SidebarFooter>
                {
                    settings.map((setting) => (
                        <Card key={setting.id} className={`${!setting.toggle ? 'bg-emerald-500 text-emerald-800' : 'bg-red-400 text-red-800'} w-full h-fit`} >
                            <CardFooter className="flex gap-x-3 align-middle items-center">
                                <p className="text-md">{!setting.toggle ? (<span className="logged-in">●</span>
                                    ) : (
<span className="logged-out">●</span>)}</p>
                                <div
                                className="flex gap-x-1"
                                >
                                <h3 className="text-xs font-bold">{setting.name}</h3>
                                <p className="text-xs">{!setting.toggle ? "(Operational)" : "(Suspended)"}</p>
                                </div>
                            </CardFooter>
                        </Card>
                    ))
                }
            </SidebarFooter>
        </Sidebar>
    )
}
