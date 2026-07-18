"use client";

import { useMemo, useState } from "react";
import { Package, Plus } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useWorkspace } from "@/lib/workspace/context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type InventoryItem = {
  id: string;
  workspaceId: string;
  name: string;
  notes: string;
};

const SEED: InventoryItem[] = [
  {
    id: "inv_nhm_1",
    workspaceId: "ws_nhmonline",
    name: "NHM Online — website & content brand kit",
    notes: "Logo pack, caption tone, assets for nhmonline.com",
  },
  {
    id: "inv_snb_1",
    workspaceId: "ws_siinbooth",
    name: "Siinbooth — event booth product kit",
    notes: "Booth renders, lighting presets, client logo wall assets",
  },
];

export default function InventarisPage() {
  const { t } = useI18n();
  const { activeWorkspace } = useWorkspace();
  const [items, setItems] = useState(SEED);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  const rows = useMemo(
    () => items.filter((i) => i.workspaceId === activeWorkspace.id),
    [items, activeWorkspace.id],
  );

  function addItem() {
    if (!name.trim()) return;
    setItems((prev) => [
      {
        id: `inv_${activeWorkspace.slug}_${Date.now()}`,
        workspaceId: activeWorkspace.id,
        name: name.trim(),
        notes: notes.trim() || "—",
      },
      ...prev,
    ]);
    setName("");
    setNotes("");
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {t("inventory.title")}
        </h1>
        <p className="mt-1 text-sm text-muted">
          {t("inventory.body")}{" "}
          <strong className="text-foreground">{activeWorkspace.name}</strong>
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">{t("inventory.add")}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
          <Input
            placeholder={t("inventory.namePh")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder={t("inventory.notesPh")}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <Button type="button" onClick={addItem}>
            <Plus className="size-4" />
            {t("inventory.addBtn")}
          </Button>
        </CardContent>
      </Card>

      <ul className="space-y-2">
        {rows.map((item) => (
          <li
            key={item.id}
            className="flex items-start gap-3 bg-panel px-4 py-3 ring-1 ring-line"
          >
            <Package className="mt-0.5 size-4 text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">{item.name}</p>
              <p className="mt-0.5 text-xs text-muted">{item.notes}</p>
            </div>
          </li>
        ))}
        {rows.length === 0 ? (
          <li className="py-8 text-center text-sm text-muted">
            {t("inventory.empty")}
          </li>
        ) : null}
      </ul>
    </div>
  );
}
