import AuthLayout from "@/feature/auth/components/auth-layout";
import { requireUnauth } from "@/lib/auth-utils";
import "../globals.css"

const Layout = async ({ children }: { children: React.ReactNode }) => {
    await requireUnauth()
  return (
        <AuthLayout>
        {children}
        </AuthLayout>
  );
};

export default Layout;
