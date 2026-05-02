import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import "../globals.css";
import { requireAuth } from "@/lib/auth-utils";
import AppSidebar from "@/components/app-sidebar";
import { ReactQueryProvider } from "@/lib/query-provider";


const Layout = async ({ children }: { children: React.ReactNode }) => {
  await requireAuth()
  return (
    <html>
      <body>
       <ReactQueryProvider>
         <SidebarProvider>
          <TooltipProvider>
            <AppSidebar />
          </TooltipProvider>
          <SidebarInset className="bg-accent/20">{children}</SidebarInset>
        </SidebarProvider>
       </ReactQueryProvider>
      </body>
    </html>
  );
};

export default Layout;
