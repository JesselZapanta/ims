import AppSidebar from "@/Components/ui/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";

export default function Layout({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
