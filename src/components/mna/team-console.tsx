"use client";

import { useMemo, useState } from "react";
import { AGENCY_SEATS, AGENCY_STAFF } from "@/lib/mock/agency-team";
import { roleLabel, type AppRole } from "@/lib/rbac";
import { cn } from "@/lib/utils";

export function TeamConsole() {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | AppRole>("ALL");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<AppRole>("EDITOR");
  const [bulkEmails, setBulkEmails] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return AGENCY_STAFF.filter((member) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        member.name.toLowerCase().includes(q) ||
        member.email.toLowerCase().includes(q);
      const matchesRole = roleFilter === "ALL" || member.role === roleFilter;
      return matchesQuery && matchesRole;
    });
  }, [query, roleFilter]);

  const seatPct = Math.min(100, Math.round((AGENCY_SEATS.used / AGENCY_SEATS.seatLimit) * 100));

  function inviteOne() {
    if (!inviteEmail.includes("@")) {
      setNotice("Enter a valid email.");
      return;
    }
    setNotice(
      `Invite queued for ${inviteEmail} as ${roleLabel(inviteRole)} (Phase 1 stub — wire email provider next).`,
    );
    setInviteEmail("");
  }

  function inviteBulk() {
    const emails = bulkEmails
      .split(/[\n,;]+/)
      .map((e) => e.trim())
      .filter(Boolean);
    if (emails.length === 0) {
      setNotice("Paste one email per line (or comma-separated).");
      return;
    }
    setNotice(
      `${emails.length} invites queued as ${roleLabel(inviteRole)}. Remaining seats: ${AGENCY_SEATS.seatLimit - AGENCY_SEATS.used}.`,
    );
    setBulkEmails("");
  }

  return (
    <div className="space-y-8">
      <div className="bg-panel p-5 ring-1 ring-line">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">
              {AGENCY_SEATS.plan} plan · seat usage
            </p>
            <p className="font-mono mt-1 text-2xl font-semibold">
              {AGENCY_SEATS.used}
              <span className="text-base text-muted"> / {AGENCY_SEATS.seatLimit}</span>
            </p>
          </div>
          <p className="text-xs text-muted">
            Staff log into a separate workspace — they never see this console.
          </p>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface">
          <div className="h-full bg-primary transition-all" style={{ width: `${seatPct}%` }} />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="bg-panel p-5 ring-1 ring-line">
          <p className="text-sm font-bold">Invite one teammate</p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="teammate@agency.com"
              className="flex-1 rounded-sm border border-line px-3 py-2 text-sm outline-none ring-primary focus:ring-2"
            />
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as AppRole)}
              className="rounded-sm border border-line px-3 py-2 text-sm"
            >
              <option value="SOSMED">Sosmed</option>
              <option value="EDITOR">Editor</option>
            </select>
            <button
              type="button"
              onClick={inviteOne}
              className="btn-primary rounded-sm px-4 py-2 text-sm font-bold"
            >
              Invite
            </button>
          </div>
        </div>

        <div className="bg-panel p-5 ring-1 ring-line">
          <p className="text-sm font-bold">Bulk invite (many staff)</p>
          <textarea
            value={bulkEmails}
            onChange={(e) => setBulkEmails(e.target.value)}
            rows={3}
            placeholder={"editor1@agency.com\neditor2@agency.com\nsosmed@agency.com"}
            className="mt-3 w-full rounded-sm border border-line px-3 py-2 font-mono text-xs outline-none ring-primary focus:ring-2"
          />
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as AppRole)}
              className="rounded-sm border border-line px-3 py-2 text-sm"
            >
              <option value="SOSMED">All as Sosmed</option>
              <option value="EDITOR">All as Editor</option>
            </select>
            <button
              type="button"
              onClick={inviteBulk}
              className="btn-warm rounded-sm px-4 py-2 text-sm font-bold"
            >
              Queue bulk invites
            </button>
          </div>
        </div>
      </div>

      {notice ? (
        <p className="rounded-sm bg-warm/25 px-3 py-2 text-sm text-ink">{notice}</p>
      ) : null}

      <div className="bg-panel ring-1 ring-line">
        <div className="flex flex-col gap-3 border-b border-line p-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm font-bold">
            Directory{" "}
            <span className="font-normal text-muted">({filtered.length})</span>
          </p>
          <div className="flex flex-wrap gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name or email…"
              className="min-w-[200px] flex-1 rounded-sm border border-line px-3 py-2 text-sm outline-none ring-primary focus:ring-2"
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as "ALL" | AppRole)}
              className="rounded-sm border border-line px-3 py-2 text-sm"
            >
              <option value="ALL">All roles</option>
              <option value="SOSMED">Sosmed</option>
              <option value="EDITOR">Editor</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-surface text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Last active</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((member) => (
                <tr key={member.id} className="border-t border-line/80">
                  <td className="px-4 py-3 font-medium">{member.name}</td>
                  <td className="px-4 py-3 text-muted">{member.email}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      {roleLabel(member.role)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "text-xs font-semibold uppercase tracking-wide",
                        member.status === "active" ? "text-primary" : "text-accent",
                      )}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted">{member.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
