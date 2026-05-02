import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { requireAuth } from "@/lib/auth-utils";
import AppSidebar from "@/components/app-sidebar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  await requireAuth();
  return (
    <SidebarProvider>
      <TooltipProvider>
        <AppSidebar />
      </TooltipProvider>
      <SidebarInset className="bg-accent/20">{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
