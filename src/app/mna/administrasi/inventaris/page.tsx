export const metadata = { title: "Inventaris Brand · MNA Content" };

export default function InventarisPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Inventaris Brand</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Admin only — brand assets & notes per workspace (`brand_inventory`
        table). UI stub for Phase 1 presentation.
      </p>
      <ul className="mt-6 space-y-2 text-sm">
        <li className="bg-panel px-4 py-3 ring-1 ring-line">
          Jeparanesia — furniture export brand kit
        </li>
        <li className="bg-panel px-4 py-3 ring-1 ring-line">
          Siinbooth — event booth product kit
        </li>
      </ul>
    </div>
  );
}
