import AppHeader from "@/components/auth-header"


const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <AppHeader />
    <main className="flex-1">
      {children}
    </main>
    </>
  )
}

export default Layout
