import AuthLayout from "@/feature/auth/components/auth-layout";
import { requireUnauth } from "@/lib/auth-utils";
import "../globals.css"

const Layout = async ({ children }: { children: React.ReactNode }) => {
    await requireUnauth()
  return (
    <html>
      <body>
        <AuthLayout>
        {children}
    </AuthLayout>
      </body>
    </html>
  );
};

export default Layout;
