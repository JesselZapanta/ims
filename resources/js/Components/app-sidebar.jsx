import * as React from "react";
import {
    GalleryVerticalEnd,
    Calendar,
    Home,
    Inbox,
    Search,
    Settings,
    User,
    ArrowUpNarrowWide,
    ShoppingCart,
    NotebookText,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "User",
        url: "/admin/user",
        icon: User,
    },
    {
        title: "Supplier",
        url: "/admin/supplier/index",
        icon: ArrowUpNarrowWide,
    },
    {
        title: "Categories",
        url: "/admin/category/index",
        icon: Search,
    },
    {
        title: "Products",
        url: "/admin/product/index",
        icon: ShoppingCart,
    },
    // {
    //     title: "Invoice",
    //     url: "/admin/invoice/index",
    //     icon: NotebookText,
    // },
];

export function AppSidebar({ ...props }) {
    const currentPath = window.location.pathname; // Get current route
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/">
                                <img
                                    src="/images/logo.svg"
                                    alt="Ims"
                                    className="h-12 w-12 rounded-full border-2 border-gray-300"
                                />
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">IMS</span>
                                    <span className="">Inventory MS</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={currentPath === item.url}
                                >
                                    <a href={item.url}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={props.auth.user} />
            </SidebarFooter>
            <SidebarRail />
            <SidebarRail />
        </Sidebar>
    );
}
