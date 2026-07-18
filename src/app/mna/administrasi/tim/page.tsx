import { TeamConsole } from "@/components/mna/team-console";

export const metadata = { title: "Manajemen Tim · MNA Content" };

export default function ManajemenTimPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Manajemen Tim</h1>
        <p className="mt-1 text-sm text-muted">
          Admin only — invite Sosmed/Editor seats across agency staff.
        </p>
      </div>
      <TeamConsole />
    </div>
  );
}
