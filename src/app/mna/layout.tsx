import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { MnaSidebar } from "@/components/mna/sidebar";
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
        <MnaSidebar
          role={session.user.role}
          userName={session.user.name ?? session.user.email ?? "User"}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <main className="flex-1 px-4 py-6 md:px-8">{children}</main>
        </div>
      </div>
    </WorkspaceProvider>
  );
}
