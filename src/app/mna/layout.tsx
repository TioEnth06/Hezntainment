import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Sidebar } from "@/components/Sidebar";
import { WorkspaceProvider } from "@/lib/workspace/context";

export default async function MnaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/mna/dashboard");

  return (
    <WorkspaceProvider>
      <div className="app-shell-bg flex min-h-screen flex-col md:flex-row">
        {/* Mobile: top bar first. Desktop: right rail via order-2 */}
        <Sidebar
          role={session.user.role}
          userName={session.user.name ?? session.user.email ?? "User"}
        />
        <div className="order-2 flex min-w-0 flex-1 flex-col md:order-1">
          <main className="flex-1 px-3 py-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-4 sm:py-6 md:px-8">
            {children}
          </main>
        </div>
      </div>
    </WorkspaceProvider>
  );
}
