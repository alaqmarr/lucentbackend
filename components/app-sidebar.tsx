import { Home, Settings, ShoppingCart, Tags, Layers } from "lucide-react"
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
import { ModeToggle } from "./theme-toggle"
import { Card, CardFooter } from "./ui/card"
import { prisma } from "@/lib/prisma"
import { Switch } from "./ui/switch"
import { updateSetting } from "@/actions/settings"
import SettingsSwitch from "./settings-switch"
import { formatRelativeTime } from "@/lib/utils"

// Menu items
const items = [
    { href: '/', icon: Home, label: 'Dashboard' },
    { href: '/products', icon: ShoppingCart, label: 'Products' },
    { href: '/categories', icon: Tags, label: 'Categories' },
    { href: '/subcategories', icon: Layers, label: 'Subcategories' },
    { href: '/settings', icon: Settings, label: 'Settings' },
]

export async function AppSidebar() {
    const settings = await prisma.settings.findMany({
        orderBy: {
            name: 'asc'
        }
    })

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

                <div className="flex flex-col items-start justify-center p-4">
                    <ModeToggle />
                </div>
            </SidebarContent>
            <SidebarFooter className="space-y-2 p-2 mb-4">
                {settings.map((setting) => (
                    <Card
                        key={setting.id}
                        className={`${!setting.toggle ? 'border-emerald-500' : 'border-red-400'} w-full h-fit p-1`}
                    >
                        <CardFooter className="flex items-center justify-between gap-x-2 p-2">
                            <div className="flex items-center gap-x-2">
                                <span className={`flex h-2 w-2 rounded-full ${!setting.toggle
                                    ? 'bg-emerald-500 animate-pulse shadow-[0_0_6px_2px_rgba(16,185,129,0.5)]'
                                    : 'bg-red-500 shadow-[0_0_6px_2px_rgba(248,113,113,0.5)]'
                                    }`} />
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-x-1">
                                        <h3 className="text-xs font-semibold leading-none">{setting.name}</h3>
                                        <p className="text-xs text-muted-foreground">
                                            {!setting.toggle ? "(Operational)" : "(Suspended)"}
                                        </p>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Updated: {formatRelativeTime(new Date(setting.updatedAt))}
                                    </p>
                                    {
                                        setting.value === 'admin' && (
                                            <p
                                                className="text-xs font-extrabold text-red-300"
                                            >
                                                (Cannot change this setting)
                                            </p>
                                        )
                                    }
                                </div>
                            </div>
                            <SettingsSwitch setting={setting} />
                        </CardFooter>
                    </Card>
                ))}
            </SidebarFooter>
        </Sidebar>
    )
}